/**
 * extract_graduated.js — 提取「已毕业/打卡达标」学员的全部历史作业
 *
 * 用法：node scripts/extract_graduated.js
 *
 * 工作流：
 * 1. 读取 data/students.json（由使用者填写：在志愿者后台识别出的已毕业学员名单）
 * 2. 关闭「仅显示未评分」（确保已评分作业也显示出来）
 * 3. 按「星球编号」逐个学员搜索 + 点开每条「评分」弹窗提取完整四字段
 * 4. 额外记录：星级（ant-rate-star-full 计数）、好事状态、打卡时间
 * 5. 输出：data/graduated_{星球编号}.json（每人一份）+ 桌面汇总 MD
 *
 * 注意：平台地址 aipoju.com/volunteer 与页面排版格局是固定的；若某天平台改版
 * 导致找不到页面元素/搜索框/列表，请停下来询问使用者引导正确位置（见 SKILL.md）。
 */
const _common = require('./common');
const launchVolunteer = _common.launchVolunteer;
const ensureLoggedIn = _common.ensureLoggedIn;
const goPendingTab = _common.goPendingTab;
const setPageSize100 = _common.setPageSize100;
const readTableFilters = _common.readTableFilters;
const sleep = _common.sleep;
const captureBestModalHtml = _common.captureBestModalHtml;
const extractDetailFromModalHtml = _common.extractDetailFromModalHtml;
const waitModal = _common.waitModal;
const closeModal = _common.closeModal;
const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'data');
const DESKTOP = process.env.USERPROFILE || process.env.HOME || '';

// 学员名单从 data/students.json 读取（使用者填写：在志愿者后台识别出的「已毕业/打卡达标」学员）
// 格式：[{ "id": "星球编号", "name": "微信昵称", "days": 毕业所需打卡天数 }]
let GRADUATED_STUDENTS = [];
try {
  GRADUATED_STUDENTS = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'students.json'), 'utf8'));
} catch (e) {
  console.error('✗ 未找到 data/students.json。请在 data/students.json 填写已毕业学员名单（参考 students.example.json）。');
  process.exit(1);
}
if (!Array.isArray(GRADUATED_STUDENTS) || GRADUATED_STUDENTS.length === 0) {
  console.error('✗ data/students.json 为空或格式错误，请检查。');
  process.exit(1);
}

// 关闭「仅显示未评分」（默认就是关的，这里确保已关闭）
async function ensureUnscoredOff(page) {
  const before = await readTableFilters(page);
  if (!before.unscoredOnly) return { changed: false, ok: true };
  const toggle = page.locator('button[role="switch"]').filter({ visible: true }).first();
  await toggle.click();
  await sleep(2000);
  const after = await readTableFilters(page);
  return { changed: true, ok: !after.unscoredOnly };
}

// 在「星球编号」搜索框输入编号，过滤出该学员的作业（精确匹配 placeholder）
async function searchStudentById(page, studentId) {
  const result = await page.evaluate((id) => {
    const inputs = Array.from(document.querySelectorAll('input')).filter(i => i.offsetParent !== null && i.type !== 'hidden');
    const target = inputs.find(i => (i.placeholder || '') === '星球编号');
    if (!target) return { ok: false, reason: 'NO_INPUT', available: inputs.map(i => i.placeholder || i.type) };
    // 先清空
    target.focus();
    target.value = '';
    target.dispatchEvent(new Event('input', { bubbles: true }));
    // 再填入新值
    const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    setter.call(target, id);
    target.dispatchEvent(new Event('input', { bubbles: true }));
    target.dispatchEvent(new Event('change', { bubbles: true }));
    return { ok: true };
  }, studentId);

  if (!result.ok) return result;
  await sleep(3000); // 等待搜索过滤生效
  // 验证：搜索后行数是否全是该学员
  const verify = await page.evaluate((id) => {
    const rows = Array.from(document.querySelectorAll('tr.ant-table-row'))
      .filter(r => (r.innerText || '').includes('评分') && r.offsetParent !== null);
    const matching = rows.filter(r => (r.innerText || '').includes(id));
    return { total: rows.length, matching: matching.length };
  }, studentId);
  console.log(`    搜索验证：${studentId} 匹配 ${verify.matching}/${verify.total} 行`);
  return { ok: true, verify };
}

// 读取当前表格中目标学员的所有作业行（含评分链接的行）
async function getStudentRows(page, studentId) {
  return await page.evaluate((id) => {
    return Array.from(document.querySelectorAll('tr.ant-table-row'))
      .filter(r => {
        const txt = r.innerText || '';
        return txt.includes('评分') && r.offsetParent !== null && txt.includes(id);
      })
      .map(r => {
        const cells = Array.from(r.querySelectorAll('td'));
        // 列：星球编号(0) / 微信昵称(1) / 评分(2) / 星级(3) / 好事状态(4) / 打卡时间(5)
        // 星级：ant-rate-star-full 的数量
        const starCell = cells[3] || null;
        const starCount = starCell ? starCell.querySelectorAll('li.ant-rate-star-full').length : 0;
        return {
          星球编号: (cells[0] ? cells[0].innerText : '').trim(),
          微信昵称: (cells[1] ? cells[1].innerText : '').trim(),
          星级: starCount,
          好事状态: (cells[4] ? cells[4].innerText : '').trim(),
          打卡时间: (cells[5] ? cells[5].innerText : '').trim(),
        };
      });
  }, studentId);
}

// 从弹窗中提取完整的四字段作业内容 + 头部信息
// 去噪：截掉字段末尾可能混入的弹窗 UI 噪声（评价/是否好事/取消/确定等）
function denoiseField(text) {
  if (!text) return text;
  // 截断在常见的 UI 噪声标记前
  const cutMarkers = ['* 评价', '评价：', '是否好事', '取 消', '确 定', '取消', '确定', '评论：', '图片'];
  let cutIdx = -1;
  for (const m of cutMarkers) {
    const idx = text.indexOf(m);
    if (idx > 0 && (cutIdx === -1 || idx < cutIdx)) cutIdx = idx;
  }
  return (cutIdx > 0 ? text.slice(0, cutIdx) : text).trim();
}

async function extractHomeworkFromModal(page) {
  const modalHtml = await captureBestModalHtml(page);
  if (!modalHtml) return null;
  const parts = extractDetailFromModalHtml(modalHtml);
  // 去噪四字段
  for (const k of ['今日行动', '今日收获', '好事分享', '下一步行动']) {
    if (parts[k]) parts[k] = denoiseField(parts[k]);
  }
  const headerInfo = await page.evaluate(() => {
    const m = document.querySelector('.ant-modal-content');
    if (!m) return {};
    const titleEl = m.querySelector('.ant-modal-title') || m.querySelector('[class*="header"]') || m.querySelector('[class*="title"]');
    const title = titleEl ? (titleEl.innerText || '').trim() : '';
    const match = title.match(/^(.+?)\s+(\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2})/);
    return {
      rawTitle: title,
      nickname: match ? match[1].trim() : '',
      time: match ? match[2].trim() : '',
    };
  });
  return { ...parts, _modalHeader: headerInfo };
}

// 将单个学员的所有作业汇总成 MD 文本
function generateStudentMD(student, homeworkList) {
  const lines = [];
  lines.push(`# ${student.name}（${student.id}）· 学习成长记录`);
  lines.push('');
  lines.push(`> 打卡天数：${student.days} 天 ｜ 学员编号：${student.id} ｜ 总打卡：${homeworkList.length} 次`);
  lines.push('');
  lines.push('---');
  lines.push('');

  const sorted = [...homeworkList].sort((a, b) =>
    (b.打卡时间 || '').localeCompare(a.打卡时间 || ''));

  sorted.forEach((hw, idx) => {
    const dateStr = hw.打卡时间 || hw._modalHeader?.time || '未知时间';
    const starNum = typeof hw.星级 === 'number' ? hw.星级 : 0;
    const starStr = starNum > 0 ? '⭐'.repeat(starNum) : '（无星级）';
    lines.push(`## 第 ${sorted.length - idx} 篇 · ${dateStr}`);
    lines.push('');
    lines.push(`**星级：** ${starStr}　**好事状态：** ${hw.好事状态 || '未知'}`);
    lines.push('');
    lines.push(`### 今日行动`);
    lines.push(hw.今日行动 || '（未填写）');
    lines.push('');
    lines.push(`### 今日收获`);
    lines.push(hw.今日收获 || '（未填写）');
    lines.push('');
    lines.push(`### 好事分享`);
    lines.push(hw.好事分享 || '（未填写）');
    lines.push('');
    lines.push(`### 下一步行动`);
    lines.push(hw.下一步行动 || '（未填写）');
    lines.push('');
    lines.push('---');
    lines.push('');
  });

  const total = homeworkList.length;
  const starTotal = homeworkList.reduce((s, h) => s + (typeof h.星级 === 'number' ? h.星级 : 0), 0);
  const avgStar = total > 0 ? (starTotal / total).toFixed(1) : '0';
  lines.push(`## 📊 学习统计`);
  lines.push('');
  lines.push(`- **总打卡次数：** ${total} 次`);
  if (total > 0) {
    lines.push(`- **时间跨度：** ${sorted[total - 1]?.打卡时间 || '?'} ～ ${sorted[0]?.打卡时间 || '?'}`);
  }
  lines.push(`- **平均星级：** ${avgStar} 星`);
  lines.push('');

  return lines.join('\n');
}

(async () => {
  console.log('═══════════════════════════════════════');
  console.log('  已毕业学员历史作业提取工具');
  console.log('  目标：', GRADUATED_STUDENTS.map(s => `${s.name}(${s.id})`).join(' / '));
  console.log('═══════════════════════════════════════');
  console.log('');

  const { browser, page } = await launchVolunteer({ headless: false });

  console.log('▶ 登录检测...');
  if (!await ensureLoggedIn(page)) {
    console.error('✗ 登录态已过期，请先 node login.js 扫码登录');
    await browser.close(); process.exit(1);
  }
  console.log('  ✓ 登录态正常');

  console.log('▶ 展开作业表 & 配置页面...');
  await goPendingTab(page);
  const filterResult = await ensureUnscoredOff(page);
  console.log('  「仅显示未评分」=', filterResult.ok ? 'OFF（已评分作业可见）' : 'OFF（已是）');
  const pageSizeResult = await setPageSize100(page);
  console.log('  每页=', pageSizeResult.ok ? '100条' : '未设置');
  await sleep(1500);

  const allResults = {};

  for (const student of GRADUATED_STUDENTS) {
    console.log('');
    console.log(`━━━ [${student.name}] (${student.id}) ━━━`);

    const searchOk = await searchStudentById(page, student.id);
    if (!searchOk.ok) {
      console.error(`  ✗ 搜索失败：${searchOk.reason}`, searchOk.available || '');
      allResults[student.id] = [];
      continue;
    }

    const rows = await getStudentRows(page, student.id);
    console.log(`  找到 ${rows.length} 条作业记录`);

    if (rows.length === 0) {
      console.log(`  ⚠ 该学员无作业数据，跳过`);
      allResults[student.id] = [];
      continue;
    }

    const studentHomeworks = [];
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];

      let clicked = false;
      for (let attempt = 0; attempt < 3 && !clicked; attempt++) {
        if (attempt > 0) { await closeModal(page); await sleep(800); }
        clicked = await page.evaluate((idx) => {
          const allRows = Array.from(document.querySelectorAll('tr.ant-table-row'))
            .filter(r => (r.innerText || '').includes('评分') && r.offsetParent !== null);
          const targetRow = allRows[idx];
          if (!targetRow) return false;
          const cell = Array.from(targetRow.querySelectorAll('td')).find(td => (td.innerText || '').includes('评分'));
          if (!cell) return false;
          const link = Array.from(cell.querySelectorAll('a, button, span')).find(e => (e.innerText || '').includes('评分'));
          if (link) { link.click(); return true; }
          return false;
        }, i);
        if (clicked) {
          const modalOk = await waitModal(page);
          if (!modalOk) clicked = false;
        }
      }

      if (!clicked) {
        console.log(`  ⚠ 第 ${i + 1}/${rows.length} 条无法打开弹窗，跳过`);
        continue;
      }

      await sleep(1200);
      const hwContent = await extractHomeworkFromModal(page);
      if (hwContent) {
        studentHomeworks.push({ ...row, ...hwContent });
        console.log(`  ✓ ${i + 1}/${rows.length} ${row.打卡时间} · ${starText(row.星级)} · ${(hwContent.今日行动 || '').slice(0, 14)}…`);
      } else {
        console.log(`  ⚠ 第 ${i + 1}/${rows.length} 条提取空`);
      }

      await closeModal(page);
      await sleep(600);
    }

    allResults[student.id] = studentHomeworks;
    const jsonPath = path.join(DATA_DIR, `graduated_${student.id}.json`);
    fs.writeFileSync(jsonPath, JSON.stringify({ student, homeworks: studentHomeworks }, null, 2), 'utf-8');
    console.log(`  💾 ${jsonPath} (${studentHomeworks.length} 条)`);
  }

  // 生成桌面 MD
  console.log('');
  console.log('▶ 生成桌面 MD 报告...');
  const desktopCandidates = [
    path.join(DESKTOP, 'Desktop'),
    DESKTOP,
    `C:\\Users\\${process.env.USERNAME || 'BLD'}\\Desktop`,
  ].filter(Boolean);

  for (const student of GRADUATED_STUDENTS) {
    const homeworks = allResults[student.id] || [];
    if (homeworks.length === 0) {
      console.log(`  ⚠ ${student.name} 无数据，跳过 MD`);
      continue;
    }
    const mdContent = generateStudentMD(student, homeworks);
    const mdFilename = `${student.name}_${student.id}_学习成长记录.md`;
    let saved = false;
    for (const dp of desktopCandidates) {
      try {
        const full = path.join(dp, mdFilename);
        fs.writeFileSync(full, mdContent, 'utf-8');
        console.log(`  ✓ ${mdFilename} → ${full}`);
        saved = true;
        break;
      } catch (e) { /* next */ }
    }
    if (!saved) {
      const fallback = path.join(DATA_DIR, mdFilename);
      fs.writeFileSync(fallback, mdContent, 'utf-8');
      console.log(`  ⚠ 桌面写入失败，已存 ${fallback}`);
    }
  }

  console.log('');
  console.log('═══════════════════════════════════════');
  console.log('  ✓ 全部完成！');
  console.log('═══════════════════════════════════════');

  await browser.close();
})().catch(e => { console.error('✗ 致命错误:', e && e.message); process.exit(1); });

function starText(n) {
  const num = typeof n === 'number' ? n : 0;
  return num > 0 ? '⭐'.repeat(num) : '无星';
}
