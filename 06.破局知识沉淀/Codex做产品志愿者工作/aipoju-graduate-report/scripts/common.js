/**
 * aipoju-homework 共享模块 v4
 * 浏览器管理：storageState 复用登录态 + 系统 Edge；Playwright 本地优先、全局回退。
 */
const path = require('path');
const fs = require('fs');

// --- Playwright 加载：本地 require 优先，依次回退多个常见全局路径 ---
const PLAYWRIGHT_CANDIDATES = [
  'playwright',
  'C:\\Users\\BLD\\AppData\\Roaming\\QClaw\\npm-global\\node_modules\\playwright',
  process.env.APPDATA ? path.join(process.env.APPDATA, 'npm', 'node_modules', 'playwright') : '',
  'C:\\Program Files\\nodejs\\node_modules\\playwright',
  'C:\\Users\\BLD\\AppData\\Local\\Programs\\WorkBuddy\\resources\\app.asar.unpacked\\resources\\builtin-skills\\agent-browser\\node_modules\\playwright',
].filter(Boolean);
let chromium;
for (const p of PLAYWRIGHT_CANDIDATES) {
  try { ({ chromium } = require(p)); break; }
  catch (e) { /* try next */ }
}
if (!chromium) {
  console.error('✗ Playwright 未找到。请在 skill 的 scripts/ 目录下执行  npm install playwright  ，或确认全局已安装 Playwright。');
  process.exit(1);
}

// --- Edge 路径：候选列表，取首个存在者 ---
const EDGE_CANDIDATES = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
];
const EDGE_PATH = EDGE_CANDIDATES.find(p => fs.existsSync(p)) || EDGE_CANDIDATES[0];

const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const STATE_FILE = path.join(DATA_DIR, 'state.json');
const HOMEWORKS_FILE = path.join(DATA_DIR, 'homeworks.json');
const REVIEWS_FILE = path.join(DATA_DIR, 'reviews.json');
const REVIEWS_SCAFFOLD = path.join(DATA_DIR, 'reviews_scaffold.json');
const PENDING_FILE = path.join(DATA_DIR, 'pending.json');
const VOLUNTEER_URL = 'https://aipoju.com/volunteer';
const USER_JOINED_URL = 'https://aipoju.com/user/joined';

const sleep = ms => new Promise(r => setTimeout(r, ms));

// 启动 Edge（可见窗口），复用登录态；无 state.json 时需先 node login.js
async function launchVolunteer({ headless = false } = {}) {
  const args = ['--no-first-run', '--no-default-browser-check'];
  const browser = await chromium.launch({ executablePath: EDGE_PATH, headless, args });
  const contextOpts = fs.existsSync(STATE_FILE) ? { storageState: STATE_FILE } : {};
  const context = await browser.newContext({ ...contextOpts, viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();
  return { browser, context, page };
}

// 登录态前置检测：进入页面后确认已登录，过期则立即停（避免 extract 0跳过/submit 全 skip 的静默失败）
// 登录信号：志愿者看板必出现「待评分N / 全部组员N」统计（仅登录态可见），或右上角用户名。
// 不能用「查看作业」判断登录——作业评分表默认收起在「待评分N」统计块后，落地页永远没有该文字。
// 未登录的明确信号才是页面出现「扫码登录 / 微信扫码」。
async function ensureLoggedIn(page) {
  await page.goto(VOLUNTEER_URL, { waitUntil: 'networkidle', timeout: 45000 }).catch(() => {});
  for (let i = 0; i < 15; i++) {
    await sleep(2000);
    const txt = await page.evaluate(() => document.body ? document.body.innerText : '');
    if (/扫码登录|微信扫码/.test(txt)) { console.error('✗ 登录态已过期，请先 node login.js 扫码登录'); return false; }
    if (/待评分\d+|全部组员\d+/.test(txt) || txt.includes('白兰度')) return true;
  }
  const snap = await page.evaluate(() => document.body ? document.body.innerText.replace(/\s+/g, ' ').slice(0, 200) : '');
  console.error('✗ 无法确认登录态（30s 内未渲染看板）。页面片段:', snap);
  console.error('  若含「扫码登录」→ 登录态过期，先 node login.js；否则可能官网改版，先 node diagnose.js 看结构。');
  return false;
}

// 展开「待评分」作业评分表：落地页默认是组员管理表，作业表收起在「待评分N」统计块后，
// 必须点该统计块才会渲染带「查看作业 / 评分」链接的作业表。点开后轮询等「查看作业」出现。
// （旧逻辑去点名为「待评分」的 tab，但页面根本没有这种 tab，所以永远点不开 → 静默失败）
async function goPendingTab(page) {
  for (let i = 0; i < 5; i++) {
    const has = await page.evaluate(() => (document.body ? document.body.innerText : '').includes('查看作业'));
    if (has) return true;
    const clicked = await page.evaluate(() => {
      const el = Array.from(document.querySelectorAll('div, span, a, button')).find(e =>
        (e.childNodes || []).length <= 2 && /^待评分\d+$/.test((e.innerText || '').replace(/\s/g, '')));
      if (el) { el.click(); return true; }
      return false;
    });
    if (clicked) await sleep(2200);
  }
  const snap = await page.evaluate(() => {
    const b = document.body ? document.body.innerText.replace(/\s+/g, ' ') : '';
    return { hasScan: /扫码登录|微信扫码/.test(b), stats: b.match(/待评分\d+|全部组员\d+|待提醒\d+/g) || [] };
  });
  console.error('✗ 未能展开作业评分表。扫码登录?', snap.hasScan, '| 看板统计:', JSON.stringify(snap.stats));
  console.error('  看板正常但无作业表 → 可能官网改版，先 node diagnose.js 看结构再修选择器。');
  return false;
}

// 读取当前列表过滤状态：仅显示未评分开关 + 每页条数
async function readTableFilters(page) {
  return await page.evaluate(() => {
    const sw = Array.from(document.querySelectorAll('button[role="switch"]')).find(e => e.offsetParent !== null);
    const aria = sw ? sw.getAttribute('aria-checked') : null;
    const m = (document.body ? document.body.innerText : '').match(/(\d+)\s*条\/页/);
    return { unscoredOnly: aria === 'true', pageSize: m ? m[0] : '' };
  });
}

// 开启「仅显示未评分」（待评分页首个 switch）。返回 {changed, ok}
async function enableUnscoredOnly(page) {
  const before = await readTableFilters(page);
  if (before.unscoredOnly) return { changed: false, ok: true };
  const toggle = page.locator('button[role="switch"]').filter({ visible: true }).first();
  await toggle.click();
  await sleep(2000);
  const after = await readTableFilters(page);
  return { changed: true, ok: after.unscoredOnly };
}

// 设 100 条/页。返回 {changed, ok}
async function setPageSize100(page) {
  const before = await readTableFilters(page);
  if (before.pageSize.includes('100')) return { changed: false, ok: true };
  try {
    const sel = page.locator('li.ant-pagination-options:visible .ant-select').first();
    await sel.scrollIntoViewIfNeeded({ timeout: 8000 });
    await sel.click();
    await sleep(1500);
    await page.locator('.ant-select-dropdown:visible .ant-select-item-option').filter({ hasText: '100 条/页' }).first().click();
    await sleep(2500);
  } catch (e) {
    // 分页器「条/页」控件不可见/缺失：通常是筛选后 0 行导致分页消失，无需翻页，视为已满足。
    const rows = await page.evaluate(() => Array.from(document.querySelectorAll('tr.ant-table-row')).filter(r => (r.innerText || '').includes('评分') && r.offsetParent !== null).length).catch(() => 0);
    return { changed: false, ok: rows === 0 };
  }
  const after = await readTableFilters(page);
  return { changed: true, ok: after.pageSize.includes('100') };
}

// 一键把页面调到「待评分 + 仅显示未评分 + 100/页」，并返回过滤状态 + 是否全部生效。
// 关键：统计数据前必须确认这两个按钮状态，否则会把已评过分的作业误当成待评分收集。
// 顺序：先设 100/页（此时未过滤、分页器可见可点），再开「仅显示未评分」（可能使行变 0、分页器消失）。
async function setupPendingTable(page, { onlyUnscored = true, verbose = true } = {}) {
  await goPendingTab(page);
  let u = { changed: false, ok: true }, p = { changed: false, ok: true };
  const before = await readTableFilters(page);          // 未过滤时读取（分页器可见）
  p = await setPageSize100(page);                       // 此时未过滤、有行 → 分页器可见，可设 100
  if (onlyUnscored) u = await enableUnscoredOnly(page); // 再开仅显示未评分（可能使行变 0、分页器消失）
  const finalUnscored = u.ok;
  if (verbose) {
    if (!finalUnscored) console.error('⚠ 未能开启「仅显示未评分」开关 → 可能把已评分作业误当待评分收集！');
    if (!p.ok) console.error('⚠ 未能将每页设为 100 条 → 可能遗漏分页后的作业！');
    console.log(`[setup] 仅显示未评分=${finalUnscored ? 'ON' : 'OFF'} 每页=${p.ok ? '100' : (before.pageSize || '未知')}`);
  }
  return { unscoredOnly: finalUnscored, pageSize100: p.ok };
}

// 读取当前可见的待评分行（过滤出带「评分」链接的行）
// 注：列索引 [0,1,5] 对应 星球编号/微信昵称/打卡时间，平台列序稳定；若日后平台改列序需改此处。
async function getPendingRows(page) {
  return await page.evaluate(() => Array.from(document.querySelectorAll('tr.ant-table-row'))
    .filter(r => (r.innerText || '').includes('评分') && r.offsetParent !== null)
    .map(r => {
      const c = Array.from(r.querySelectorAll('td'));
      return {
        星球编号: (c[0] ? c[0].innerText : '').trim(),
        微信昵称: (c[1] ? c[1].innerText : '').trim(),
        打卡时间: (c[5] ? c[5].innerText : '').trim(),
      };
    }));
}

// 点击第 idx 个待评分行的「评分」链接，返回是否成功
async function clickScoreLink(page, idx) {
  return await page.evaluate(i => {
    const rows = Array.from(document.querySelectorAll('tr.ant-table-row')).filter(r => (r.innerText || '').includes('评分') && r.offsetParent !== null);
    const row = rows[i];
    if (!row) return false;
    const cell = Array.from(row.querySelectorAll('td')).find(td => (td.innerText || '').includes('评分'));
    if (!cell) return false;
    const t = Array.from(cell.querySelectorAll('a, button, span')).find(e => (e.innerText || '').includes('评分'));
    if (!t) return false;
    t.click();
    return true;
  }, idx);
}

async function waitModal(page, timeout = 10000) {
  try { await page.waitForSelector('.ant-modal-content', { state: 'visible', timeout }); return true; } catch { return false; }
}

// 判断抓取到的 modal HTML 是否其实是「通知」类弹窗（而非日志详情）。
// 通知框特征：含「志愿者评分通知 / 未读 / 志愿者评价 / 全部已读」等字样，且不含四字段标签。
function isNotificationHtml(html) {
  const clean = (html || '').replace(/<[^>]+>/g, ' ');
  const isNotif = /志愿者评分通知|未读|志愿者评价|全部已读|关\s*闭/.test(clean);
  const hasLogFields = /今日行动|今日收获|好事分享|下一步行动/.test(clean);
  return isNotif && !hasLogFields;
}

// 从当前所有打开的弹窗中挑出「日志详情」弹窗的 HTML。
// 一层通知框 + 一层日志详情框叠加时，DOM 里第一个往往是通知框，必须按「是否含四字段标签」精准挑选，
// 找不到含四字段的弹窗时回退到最后一个（最新打开的）弹窗，避免抓到通知框导致四字段全空。
function captureBestModalHtml(page) {
  return page.evaluate(() => {
    const modals = Array.from(document.querySelectorAll('.ant-modal-content'));
    if (!modals.length) return '';
    const logModal = modals.find(m => /今日行动|今日收获|好事分享|下一步行动/.test(m.innerText || ''));
    const target = logModal || modals[modals.length - 1];
    return target ? target.innerHTML : '';
  });
}

// 关闭可能自动弹出的「通知」类弹窗（如志愿者评分通知），避免它盖住日志卡片、干扰「查看详情」点击与 modal 捕获。
// 优先点「全部已读」从源头消除未读（内容仍保留在通知中心，可回看），否则点「关闭」或右上角 X。返回是否处理过。
async function dismissNotificationModal(page) {
  for (let pass = 0; pass < 3; pass++) {
    const found = await page.evaluate(() => {
      const modals = Array.from(document.querySelectorAll('.ant-modal-content'));
      for (const m of modals) {
        const titleEl = m.querySelector('.ant-modal-title') || m.querySelector('[class*="title"]');
        const title = titleEl ? (titleEl.innerText || '') : '';
        const bodyText = m.innerText || '';
        if (/通知|未读|志愿者/.test(title) || /志愿者评价|全部已读/.test(bodyText)) {
          // 优先点「全部已读」：标记已读、从源头消除未读，避免通知框反复弹出干扰后续捕获
          const readAll = Array.from(m.querySelectorAll('button')).find(b => /全部已读/.test(b.innerText || ''));
          if (readAll) { readAll.click(); return { dismissed: true, via: '全部已读' }; }
          const closeBtn = Array.from(m.querySelectorAll('button')).find(b => /关\s*闭/.test(b.innerText || ''));
          if (closeBtn) { closeBtn.click(); return { dismissed: true, via: '关闭' }; }
          const x = m.querySelector('.ant-modal-close');
          if (x) { x.click(); return { dismissed: true, via: 'X' }; }
        }
      }
      return { dismissed: false };
    });
    if (!found.dismissed) break;
    console.log('  ⓘ 已关闭自动弹出的通知弹窗（' + found.via + '）');
    await sleep(1200);
  }
  return true;
}

async function closeModal(page) {
  const open = await page.evaluate(() => { const m = document.querySelector('.ant-modal-content'); return m && m.offsetParent !== null; });
  if (!open) return;
  const cancel = page.locator('.ant-modal-content button').filter({ hasText: /取消/ }).first();
  if (await cancel.count() > 0) await cancel.click().catch(() => {});
  await sleep(500);
  const still = await page.evaluate(() => { const m = document.querySelector('.ant-modal-content'); return m && m.offsetParent !== null; });
  if (still) await page.keyboard.press('Escape').catch(() => {});
  await sleep(800);
}

// 快速诊断：打开页面后结构化报告当前状态，无副作用，供「无反应 / 0 结果 / 数据异常」时秒级定位根因。
// 2026-07-13 复盘：官网落地页是组员管理表，作业表收起在「待评分N」统计块后，必须点开才显「查看作业」。
// 2026-07-13(2) 复盘：列表默认不开启「仅显示未评分」、默认 10 条/页；未开启时可见的「评分」行是已评过分的作业，
//   与看板「待评分0」一致属正常。统计数据前必须确认这两个按钮状态，否则会收集到错误信息。
async function diagnosePage(page) {
  return await page.evaluate(() => {
    const b = document.body ? document.body.innerText : '';
    const flat = b.replace(/\s+/g, ' ');
    const sw = Array.from(document.querySelectorAll('button[role="switch"]')).find(e => e.offsetParent !== null);
    const aria = sw ? sw.getAttribute('aria-checked') : null;
    const pageMatch = flat.match(/(\d+)\s*条\/页/);
    const nav = Array.from(document.querySelectorAll('[role="tab"], .ant-tabs-tab, a, button'))
      .map(e => (e.innerText || '').trim()).filter(t => t && t.length < 20);
    const ths = Array.from(document.querySelectorAll('th')).map(t => (t.innerText || '').trim());
    const rows = Array.from(document.querySelectorAll('tr.ant-table-row'))
      .filter(r => (r.innerText || '').includes('评分') && r.offsetParent !== null).length;
    return {
      login: /扫码登录|微信扫码/.test(flat) ? 'loggedout'
        : (/待评分\d+|全部组员\d+/.test(flat) || flat.includes('白兰度')) ? 'loggedin' : 'unknown',
      hasHomeworkTable: flat.includes('查看作业'),
      pendingRows: rows,
      unscoredOnly: aria === 'true',
      pageSize: pageMatch ? pageMatch[0] : '',
      stats: flat.match(/待评分\d+|全部组员\d+|待提醒\d+/g) || [],
      navSample: [...new Set(nav)].slice(0, 20),
      tableHeaders: ths.slice(0, 12),
    };
  });
}

// 按 星球编号 + 打卡时间 打开评分 modal；成功返回 {matched:true}，否则 {matched:false,reason}
async function openReviewModal(page, targetId, targetTime) {
  const res = await page.evaluate(({ targetId, targetTime }) => {
    const rows = Array.from(document.querySelectorAll('tr.ant-table-row')).filter(r => (r.innerText || '').includes('评分') && r.offsetParent !== null);
    for (const r of rows) {
      const c = Array.from(r.querySelectorAll('td'));
      if (c[0] && c[0].innerText.trim() === targetId && c[5] && c[5].innerText.trim() === targetTime) {
        const cell = c.find(td => (td.innerText || '').includes('评分'));
        const t = cell ? Array.from(cell.querySelectorAll('a, button, span')).find(e => (e.innerText || '').includes('评分')) : null;
        if (t) { t.click(); return { matched: true }; }
        return { matched: false, reason: 'NO_TARGET' };
      }
    }
    return { matched: false, reason: 'NO_MATCH' };
  }, { targetId, targetTime });
  if (!res.matched) return res;
  const ok = await waitModal(page);
  return ok ? { matched: true } : { matched: false, reason: 'MODAL_TIMEOUT' };
}

// 裁剪 modalText 末尾的表单 UI 噪声（是否好事/评价/取消确定），省 token
function denoiseModalText(t) {
  if (!t) return t;
  const cut = t.indexOf('是否好事');
  return (cut > 0 ? t.slice(0, cut) : t).trim();
}

// 通用：按可见文字点击元素（tab/按钮/div/span）。文字需精确匹配（含去空白）。
async function clickText(page, text) {
  return await page.evaluate((t) => {
    const el = Array.from(document.querySelectorAll('[role="tab"], .ant-tabs-tab, a, button, div, span'))
      .find(e => (e.innerText || '').replace(/\s/g, '').trim() === t || (e.innerText || '').trim() === t);
    if (el) { el.click(); return true; }
    return false;
  }, text);
}

// 进入「已报名」项目详情：从 /user/joined 点目标项目的「查看详情」，轮询等待跳到 /details/ 路由。
// 返回 true/false。登录态过期（出现扫码登录）直接返回 false。
// 项目名匹配（2026-07-20 升级：双卡片防混）：/user/joined 页面有公众号漫画工作流 + AI小红书虚拟产品两个卡片并排，
// 都带「查看详情」按钮。新逻辑：四级标题匹配（全等>前缀>独立词>松散子串）+ 多卡片时打印全部候选 +
// 歧义检测（多卡片同级别命中则中止报警）+ 点击前日志确认选中卡片的标题和报名人数。
async function openProjectJoined(page, name) {
  await page.goto(USER_JOINED_URL, { waitUntil: 'networkidle', timeout: 45000 }).catch(() => {});
  await sleep(3500);
  const loggedout = await page.evaluate(() => /扫码登录|微信扫码/.test(document.body ? document.body.innerText : ''));
  if (loggedout) { console.error('✗ 登录态已过期，请先 node login.js 扫码登录'); return false; }
  for (let i = 0; i < 4; i++) {
    const result = await page.evaluate((nm) => {
      // 第一步：收集所有带「查看详情」的卡片
      let cards = Array.from(document.querySelectorAll('.ant-card')).filter(c => {
        const t = c.innerText || '';
        return t.includes('查看详情') && t.length < 800;
      });
      if (!cards.length) {
        cards = Array.from(document.querySelectorAll('div, li, section, article')).filter(c => {
          const t = c.innerText || '';
          return t.includes('查看详情') && t.length < 500;
        });
      }
      // 打印所有候选卡片标题（防混关键）
      const candidateInfo = cards.map((c, idx) => {
        const raw = (c.innerText || '').replace(/\s+/g, ' ').trim();
        const beforeDetail = raw.split('查看详情')[0].trim();
        const peopleMatch = raw.match(/(\d+)\s*人报名/);
        return { idx, titlePreview: beforeDetail.slice(0, 60), peopleCount: peopleMatch ? peopleMatch[1] : '?' };
      });
      // 第二步：四级严格标题匹配（由高到低）
      const normalize = t => t.replace(/\s+/g, ' ').trim();
      let matchedCard = null;
      let matchLevel = -1;
      for (const c of cards) {
        const raw = (c.innerText || '');
        const normalized = normalize(raw);
        const titleLine = normalize(raw.split('查看详情')[0].trim().split('\n')[0]);
        if (titleLine === nm && matchLevel < 0) { matchedCard = c; matchLevel = 0; }
        else if (titleLine.startsWith(nm + ' ') && matchLevel < 1) { matchedCard = c; matchLevel = 1; }
        else if (normalized.includes(' ' + nm + ' ') && matchLevel < 2) { matchedCard = c; matchLevel = 2; }
        else if (normalized.includes(nm) && matchLevel < 3) { matchedCard = c; matchLevel = 3; }
      }
      // 歧义检测：level 3 松散匹配且多卡片同命中时报警
      if (matchLevel >= 3 && cards.length >= 2) {
        const level3Count = cards.filter(c => normalize(c.innerText).includes(nm)).length;
        if (level3Count > 1) {
          return { clicked: false, reason: 'AMBIGUOUS', candidates: candidateInfo,
            message: '多个卡片都含项目名「' + nm + '」，无法确定唯一目标' };
        }
      }
      if (!matchedCard) return { clicked: false, reason: 'NOT_FOUND', candidates: candidateInfo };
      // 第三步：点击该卡片内第一个「查看详情」按钮
      const btn = Array.from(matchedCard.querySelectorAll('a, button, span, div'))
        .find(e => (e.innerText || '').trim() === '查看详情');
      if (!btn) return { clicked: false, reason: 'NO_BUTTON', candidates: candidateInfo };
      // 提取选中卡片的识别信息用于日志
      const selectedRaw = (matchedCard.innerText || '').replace(/\s+/g, ' ').trim();
      const selectedTitle = selectedRaw.split('查看详情')[0].trim().slice(0, 80);
      const selectedPeople = (selectedRaw.match(/(\d+)\s*人报名/) || [,'?'])[1];
      btn.click();
      return { clicked: true, matchLevel, selectedTitle, selectedPeople,
        candidateCount: cards.length, candidates: candidateInfo };
    }, name);
    await sleep(3000);
    if (page.url().includes('/details/')) {
      console.log('  ✓ 已选中的项目:', result.selectedTitle, '| 报名人数:', result.selectedPeople + '人', '| 匹配等级 Lv' + result.matchLevel);
      if (result.candidateCount >= 2) {
        console.log('  ℹ 本页共', result.candidateCount, '个候选项目:', result.candidates.map(c => '"' + c.titlePreview + '" (' + c.peopleCount + '人)').join(' / '));
      }
      return true;
    }
    if (!result.clicked) {
      if (result.reason === 'AMBIGUOUS') {
        console.error('✗ 项目名歧义！「' + name + '」匹配到多个卡片，无法唯一确定。');
        console.error('  候选列表:', JSON.stringify(result.candidates));
        console.error('  建议：使用更完整的名称，如「公众号漫画工作流」或「AI小红书虚拟产品」。');
        return false;
      }
      const titles = await page.evaluate(() => Array.from(document.querySelectorAll('.ant-card'))
        .map(c => (c.innerText || '').replace(/\s+/g, ' ').split('查看详情')[0].trim())
        .filter(Boolean).slice(0, 20));
      console.error('✗ 未找到项目「' + name + '」的查看详情，可能项目名不匹配或官网改版。已报名项目（复制粘贴用）：', JSON.stringify(titles));
      return false;
    }
  }
  console.error('✗ 点击查看详情后未跳转到详情页（URL 仍为', page.url() + '）');
  return false;
}

// 打开详情页后二次校验：读详情页标题，确认确实属于目标项目，避免「进错页面」静默收集错项目数据。
// 详情页标题选择器随官网版本可能变化，多取几个候选，任一含 name 即通过。
async function verifyProjectDetail(page, name) {
  await sleep(2000);
  // 先查标题元素（原有逻辑）
  const titles = await page.evaluate(() => {
    const sels = ['.ant-page-header-heading-title', '.ant-page-header-title', 'h1', 'h2', '.ant-typography', '[class*="title"]', '.ant-breadcrumb'];
    const out = [];
    for (const s of sels) {
      document.querySelectorAll(s).forEach(e => {
        const t = (e.innerText || '').replace(/\s+/g, ' ').trim();
        if (t && t.length < 80) out.push(t);
      });
    }
    return [...new Set(out)].slice(0, 8);
  });
  let hit = titles.some(t => t.includes(name));
  if (hit) { console.log('  ✓ 详情页校验通过（标题元素），当前项目：', titles.find(t => t.includes(name))); return true; }
  // 标题元素未命中 → 兜底检查页面正文与URL（详情页项目名常在tab/面包屑/正文首段而非h1-h2）
  const fallback = await page.evaluate((nm) => {
    const bodyText = (document.body ? document.body.innerText : '').replace(/\s+/g, ' ').trim().substring(0, 500);
    const url = window.location.href;
    return { bodyHit: bodyText.includes(nm), url, bodySample: bodyText.substring(0, 200) };
  }, name);
  if (fallback.bodyHit) {
    console.log('  ✓ 详情页校验通过（正文兜底），项目名出现在页面内容中');
    return true;
  }
  console.error('✗ 详情页标题未包含「' + name + '」，疑似进错项目。当前可见标题:', JSON.stringify(titles));
  console.error('  正文前200字:', JSON.stringify(fallback.bodySample));
  console.error('  当前URL:', fallback.url);
  return false;
}

// 提取 modal 中四字段文本。弹窗结构固定：ant-modal-body > section > div*4，依次对应四字段。
// 每个 section div 内含 <b>标题</b> + <p>内容</p>；空字段（如未写好事分享）可能没有 <b>标题，
// 但顺序稳定，因此按 index 兜底。
function decodeEntities(s) {
  if (!s) return s;
  return s
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(+d))
    .replace(/\u200b/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractDetailFromModalHtml(html) {
  const labels = ['今日行动', '今日收获', '好事分享', '下一步行动'];
  const result = { '今日行动': '', '今日收获': '', '好事分享': '', '下一步行动': '' };
  // 1. 先尝试用顺序解析 HTML 结构
  try {
    const bodyMatch = html.match(/<div class="ant-modal-body">([\s\S]*?)<\/div>\s*<div[^>]*class="ant-modal-footer"|<div class="ant-modal-body">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>\s*$/);
    const bodyHtml = bodyMatch ? (bodyMatch[1] || bodyMatch[2]) : html;
    // 取出 modal-body 内第一个 <section> 的所有直接子 div
    const sectionMatch = bodyHtml.match(/<section>([\s\S]*?)<\/section>/);
    const sectionHtml = sectionMatch ? sectionMatch[1] : bodyHtml;
    // 匹配所有 "<div>...<b>标题</b><p>文本</p>...</div>" 或空字段 "<div><!----><p></p></div>"
    const divs = sectionHtml.match(/<div[\s\S]*?<\/div>/g) || [];
    let labelIdx = 0;
    for (const div of divs) {
      if (labelIdx >= labels.length) break;
      // 如果当前 div 包含图片/上传控件，跳过
      if (/<img|ant-upload|_dynamicUpload_/.test(div)) continue;
      const pMatch = div.match(/<p>([\s\S]*?)<\/p>/);
      const text = pMatch ? decodeEntities(pMatch[1].replace(/<[^>]+>/g, '')) : '';
      // 尝试从 <b> 里读标题，否则按顺序
      const bMatch = div.match(/<b>([^<]*)<\/b>/);
      const label = bMatch ? bMatch[1].trim() : labels[labelIdx];
      if (labels.includes(label)) {
        result[label] = text;
        labelIdx = labels.indexOf(label) + 1;
      } else {
        result[labels[labelIdx]] = text;
        labelIdx++;
      }
    }
  } catch (e) { /* fallback below */ }
  // 2. fallback：用纯文本正则兜底
  const clean = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  for (let i = 0; i < labels.length; i++) {
    const l = labels[i];
    const next = labels[i + 1];
    if (result[l]) continue; // 结构解析已拿到
    const re = new RegExp(l + '[:：]?\\s*(.*?)(?=' + (next || '评论：|图片|\\*\\*\\*') + '|$)', 's');
    const m = clean.match(re);
    if (m) result[l] = decodeEntities(m[1]);
  }
  return result;
}

// 点击卡片内的「查看详情」按钮。点击事件实际绑定在带 cursor-pointer 的 div 上。
async function clickDetailBtn(page, cardSelector) {
  return await page.evaluate((sel) => {
    const card = document.querySelector(sel);
    if (!card) return { ok: false, reason: 'CARD_NOT_FOUND' };
    // 1. 优先点击带 cursor-pointer 且文本为「查看详情」的元素
    const candidates = Array.from(card.querySelectorAll('div, span, a, button, i'));
    const pointer = candidates.find(e => (e.className || '').includes('cursor-pointer') && (e.innerText || '').trim() === '查看详情');
    if (pointer) { pointer.click(); return { ok: true, method: 'cursor-pointer' }; }
    // 2. 次选：文本完全匹配的最深子元素
    const deepest = candidates.reverse().find(e => (e.innerText || '').trim() === '查看详情' && e.children.length === 0);
    if (deepest) { deepest.click(); return { ok: true, method: 'deepest-text' }; }
    // 3. 兜底：任何文本包含「详情」的元素
    const any = candidates.find(e => (e.innerText || '').includes('详情'));
    if (any) { any.click(); return { ok: true, method: 'contains-detail' }; }
    return { ok: false, reason: 'NO_BUTTON' };
  }, cardSelector);
}

// 提取最新 n 篇日志（顶部=最新，向下递减）。
// 关键：列表卡片只显示摘要，必须点击「查看详情」打开弹窗，才能拿到完整四字段。
async function collectLogCards(page, n = 15) {
  if (!await clickText(page, '日 志')) { console.error('✗ 未找到「日 志」tab'); return null; }
  await sleep(3500);
  // 滚动加载足够卡片
  for (let i = 0; i < 12; i++) {
    const cnt = await page.evaluate(() => Array.from(document.querySelectorAll('.ant-card'))
      .filter(c => { const t = c.innerText || ''; const d = (t.match(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/g) || []).length; return d === 1 && t.includes('今日行动'); }).length);
    if (cnt >= n) break;
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await sleep(2000);
  }
  // 先给每张卡片分配稳定索引，避免滚动后 DOM 变化导致错位
  const cardSelectors = await page.evaluate((n) => {
    const cards = Array.from(document.querySelectorAll('.ant-card'))
      .filter(c => { const t = c.innerText || ''; const d = (t.match(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/g) || []).length; return d === 1 && t.includes('今日行动'); });
    const seen = new Set(); const out = [];
    for (let i = 0; i < cards.length; i++) {
      const c = cards[i];
      let t = (c.innerText || '').replace(/\s+/g, ' ').replace(/查看详情/g, '').trim();
      if (!t) continue;
      const dm = t.match(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/);
      const date = dm ? dm[0] : '';
      const author = date ? t.slice(0, t.indexOf(date)).trim() : '';
      const key = author + '|' + date;
      if (seen.has(key)) continue; seen.add(key);
      // 给卡片加稳定 class，用于后续 selector
      c.classList.add('__wb_log_card_' + i);
      out.push({ selector: '.__wb_log_card_' + i, author, date, idx: i });
      if (out.length >= n) break;
    }
    return out;
  }, n);
  if (!cardSelectors.length) { console.error('✗ 未找到日志卡片'); return []; }
  console.log('  找到', cardSelectors.length, '张日志卡片，逐条打开详情提取...');
  // 先清掉页面加载时自动弹出的「通知」弹窗（如志愿者评分通知），否则会盖住卡片、干扰点击与 modal 捕获
  await dismissNotificationModal(page);
  const logs = [];
  for (const info of cardSelectors) {
    // 滚动卡片到视口中央，确保按钮可点
    try { await page.locator(info.selector).scrollIntoViewIfNeeded({ timeout: 5000 }); } catch {}
    await sleep(300);
    // 每次开详情前再确认没有残留通知弹窗
    await dismissNotificationModal(page);
    let clickRes = await clickDetailBtn(page, info.selector);
    if (!clickRes.ok) { console.error('  ✗ 无法打开', info.author, info.date, '的详情:', clickRes.reason); continue; }
    await sleep(1500);
    let modalHtml = await captureBestModalHtml(page);
    // 若抓到的是通知弹窗（四字段特征缺失），关掉重试一次
    if (modalHtml && isNotificationHtml(modalHtml)) {
      console.log('  ⓘ 捕获到通知弹窗，重试一次');
      await dismissNotificationModal(page);
      await sleep(600);
      await clickDetailBtn(page, info.selector);
      await sleep(1500);
      modalHtml = await captureBestModalHtml(page);
    }
    if (!modalHtml) { console.error('  ✗ 弹窗未出现', info.author, info.date); continue; }
    const parts = extractDetailFromModalHtml(modalHtml);
    logs.push({
      author: info.author,
      date: info.date,
      今日行动: parts['今日行动'] || '',
      今日收获: parts['今日收获'] || '',
      好事分享: parts['好事分享'] || '',
      下一步行动: parts['下一步行动'] || '',
    });
    console.log('  ✓', info.author, '|', parts['今日行动'].slice(0, 20) + '…');
    // 关闭弹窗：优先点右上角 X（aria-label=Close）
    try {
      await page.locator('.ant-modal-close').click({ timeout: 3000 });
    } catch {
      await page.keyboard.press('Escape').catch(() => {});
    }
    await sleep(800);
  }
  return logs;
}

// 在「立即打卡」页填入 4 个字段（内容来自 draft JSON，由 Agent 汇总日志后生成）。不点提交。
// draft 字段：todayAction / todayAchievement / goodThingsShare / nextAction
async function fillCheckin(page, draft) {
  if (!await clickText(page, '立即打卡')) { console.error('✗ 未找到「立即打卡」tab'); return false; }
  await sleep(3500);
  const map = {
    todayAction: 'form_item_todayAction',
    todayAchievement: 'form_item_todayAchievement',
    goodThingsShare: 'form_item_goodThingsShare',
    nextAction: 'form_item_nextAction',
  };
  for (const [key, id] of Object.entries(map)) {
    const val = (draft && draft[key]) || '';
    if (!val) continue;
    const sel = '#' + id;
    try { await page.fill(sel, val); }
    catch (e) {
      const el = page.locator(sel);
      await el.click().catch(() => {});
      await page.keyboard.press('Control+A');
      await page.keyboard.type(val);
    }
    await sleep(900);
  }
  return true;
}

module.exports = {
  EDGE_PATH, PLAYWRIGHT_FALLBACK, DATA_DIR, STATE_FILE, HOMEWORKS_FILE, REVIEWS_FILE, REVIEWS_SCAFFOLD, PENDING_FILE, VOLUNTEER_URL, USER_JOINED_URL,
  sleep, launchVolunteer, ensureLoggedIn, goPendingTab, enableUnscoredOnly, setPageSize100, setupPendingTable,
  getPendingRows, clickScoreLink, waitModal, closeModal, openReviewModal, denoiseModalText, diagnosePage,
  clickText, openProjectJoined, verifyProjectDetail, collectLogCards, fillCheckin,
  dismissNotificationModal, isNotificationHtml, clickDetailBtn, captureBestModalHtml, readTableFilters, extractDetailFromModalHtml,
};
