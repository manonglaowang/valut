// generate_reports.js — 读取 data/graduated_{id}.json（作业数据）+ data/profiles.json（侧写内容），
// 渲染每位学员一份「两页 A4 结营成长报告」HTML 到 build/，并写 build/manifest.json 供 print_pdfs.js 打印。
//
// profiles.json 由调用本 skill 的 Agent 按 references/methodology.md 的方法，基于作业原文撰写后写入。
// 若只想改文案/重排，直接改 profiles.json 再跑本脚本即可，无需重新提取作业。
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..');
const DATA = path.join(BASE, 'data');
const BUILD = path.join(BASE, 'build');
const DESKTOP = process.env.USERPROFILE
  ? path.join(process.env.USERPROFILE, 'Desktop')
  : (process.env.HOME ? path.join(process.env.HOME, 'Desktop') : '');
fs.mkdirSync(BUILD, { recursive: true });

// ===== 这两个常量使用者可改（行动营名称 / 年份）=====
const CAMP_YEAR = '2026';
const DEFAULT_CAMP = '破局行动营';

// 读取每位学员每次作业（按打卡时间升序，D1=最早一天）
function loadHomeworks(id) {
  try {
    const d = JSON.parse(fs.readFileSync(path.join(DATA, `graduated_${id}.json`), 'utf8'));
    const hw = (d.homeworks || []).slice().sort((a, b) => new Date(a.打卡时间) - new Date(b.打卡时间));
    return hw;
  } catch (e) { return []; }
}

// ====== 雷达图（五维） ======
function radar(dims) {
  const cx = 130, cy = 125, R = 88, LR = 108, n = dims.length;
  const ang = i => (-90 + i * 360 / n) * Math.PI / 180;
  const pt = (i, r) => [cx + r * Math.cos(ang(i)), cy + r * Math.sin(ang(i))];
  let grid = '';
  [1, 2, 3, 4, 5].forEach(l => {
    const r = R * l / 5;
    const p = dims.map((_, i) => pt(i, r).map(v => v.toFixed(1)).join(',')).join(' ');
    grid += `<polygon points="${p}" fill="none" stroke="#e8e8e8" stroke-width="1"/>`;
  });
  let axes = dims.map((_, i) => {
    const p = pt(i, R);
    return `<line x1="${cx}" y1="${cy}" x2="${p[0].toFixed(1)}" y2="${p[1].toFixed(1)}" stroke="#e8e8e8" stroke-width="1"/>`;
  }).join('');
  const dp = dims.map((d, i) => pt(i, R * d[1] / 5).map(v => v.toFixed(1)).join(',')).join(' ');
  const data = `<polygon points="${dp}" fill="rgba(214,48,49,.15)" stroke="#d63031" stroke-width="2.5"/>`;
  const dots = dims.map((d, i) => {
    const p = pt(i, R * d[1] / 5);
    return `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="3.5" fill="#d63031"/>`;
  }).join('');
  const labels = dims.map((d, i) => {
    const p = pt(i, LR);
    return `<text x="${p[0].toFixed(1)}" y="${p[1].toFixed(1)}" font-size="11" fill="#2d3436" text-anchor="middle" font-weight="800">${d[0]}</text><text x="${p[0].toFixed(1)}" y="${(p[1] + 14).toFixed(1)}" font-size="13" fill="#d63031" text-anchor="middle" font-weight="800">${d[1].toFixed(1)}</text>`;
  }).join('');
  return `<svg viewBox="0 0 260 260" width="100%" style="display:block;margin:0 auto">${grid}${axes}${data}${dots}${labels}</svg>`;
}

// ====== 打卡热力图（按真实日期升序） ======
function calendar(stars, dates) {
  const cells = stars.map((st, i) => {
    const full = st >= 3;
    const bg = full ? '#d63031' : '#fdeaea';
    const fg = full ? '#fff' : '#c0392b';
    const bd = full ? '#d63031' : '#f3c5c5';
    const starTxt = '★'.repeat(st) + '☆'.repeat(3 - st);
    const dt = dates && dates[i] ? dates[i].slice(5, 10).replace('-', '/') : 'D' + (i + 1);
    return `<div class="cell" style="background:${bg};color:${fg};border:1px solid ${bd}"><div class="cd">${dt}</div><div class="cs">${starTxt}</div></div>`;
  }).join('');
  return `<div class="calrow"><div class="cal">${cells}</div><div class="calleg"><span class="df"></span>满星3★ &nbsp; <span class="dt"></span>达标2★ &nbsp;·&nbsp; 共 ${stars.length} 次打卡（毕业线达成，✓）</div></div>`;
}

// ====== 星级曲线 ======
function sparkline(stars) {
  const w = 340, h = 110, pad = 12, n = stars.length;
  const x = i => pad + (n === 1 ? 0 : i * (w - 2 * pad) / (n - 1));
  const y = v => pad + (3 - v) * (h - 2 * pad) / 3;
  const pts = stars.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  const dots = stars.map((v, i) => `<circle cx="${x(i).toFixed(1)}" cy="${y(v).toFixed(1)}" r="3.5" fill="#d63031"/><text x="${x(i).toFixed(1)}" y="${(y(v) - 7).toFixed(1)}" font-size="9" fill="#d63031" text-anchor="middle" font-weight="700">${v}★</text>`).join('');
  const grid = [1, 2, 3].map(v => `<line x1="${pad}" y1="${y(v).toFixed(1)}" x2="${w - pad}" y2="${y(v).toFixed(1)}" stroke="#f0f0f0" stroke-width="1" stroke-dasharray="4,3"/><text x="${pad - 4}" y="${(y(v) + 3).toFixed(1)}" font-size="9" fill="#b2bec3" text-anchor="end">${v}★</text>`).join('');
  const areaPts = `${pts} ${x(n - 1).toFixed(1)},${(h - pad).toFixed(1)} ${pad},${(h - pad).toFixed(1)}`;
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" style="display:block;margin:0 auto"><defs><linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#d63031" stop-opacity=".12"/><stop offset="100%" stop-color="#d63031" stop-opacity=".02"/></linearGradient></defs>${grid}<polygon points="${areaPts}" fill="url(#areaGrad)"/><polyline points="${pts}" fill="none" stroke="#d63031" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>${dots}</svg>`;
}

// ====== CSS ======
const CSS = `<style>
@page { size: A4 portrait; margin: 0; }
* { margin:0; padding:0; box-sizing:border-box; -webkit-print-color-adjust:exact; print-color-adjust:exact; }
html,body { background:#fff; height:100%; }
body { font-family:"Noto Sans SC","PingFang SC","Microsoft YaHei","Hiragino Sans GB",sans-serif; color:#1a1a1a; }
.page { width:210mm; height:297mm; overflow:hidden; position:relative; }
.cover { background:linear-gradient(152deg,#b71c1c 0%,#d63031 35%,#e17055 100%); color:#fff; display:flex; flex-direction:column; justify-content:space-between; padding:22mm 18mm 16mm; height:297mm; }
.ctop { display:flex; justify-content:space-between; align-items:flex-start; }
.ceb { font-size:13px; letter-spacing:4px; font-weight:700; opacity:.92; text-transform:uppercase; }
.cbdg { font-size:12.5px; font-weight:700; background:rgba(255,255,255,.18); border:1px solid rgba(255,255,255,.5); border-radius:20px; padding:5px 15px; letter-spacing:1px; }
.chero { margin:4mm 0 0; }
.cname { font-size:52px; font-weight:900; line-height:1.12; letter-spacing:1px; }
.ctagline { font-size:17px; font-weight:600; opacity:.9; margin-top:8px; letter-spacing:1px; }
.coneliner { font-size:19px; font-weight:500; line-height:1.55; margin-top:14px; max-width:155mm; opacity:.95; }
.cstats { display:grid; grid-template-columns:repeat(4,1fr); gap:8px; margin-top:10mm; }
.cstat { background:rgba(255,255,255,.15); border:1px solid rgba(255,255,255,.25); border-radius:12px; padding:13px 8px; text-align:center; }
.cstat .cv { font-size:28px; font-weight:900; line-height:1; }
.cstat .ck { font-size:11.5px; opacity:.88; margin-top:6px; }
.ckeys { display:flex; gap:8px; flex-wrap:wrap; margin-top:10mm; }
.ckey { font-size:13px; font-weight:700; background:rgba(255,255,255,.16); border-radius:8px; padding:7px 15px; letter-spacing:.5px; }
.cfoot { font-size:11px; opacity:.75; margin-top:8mm; letter-spacing:.5px; }
.content { background:#fff; color:#1a1a1a; padding:10mm 14mm 8mm; height:297mm; display:flex; flex-direction:column; overflow:hidden; }
.chd { display:flex; align-items:baseline; justify-content:space-between; border-bottom:2.5px solid #d63031; padding-bottom:5px; margin-bottom:6px; flex-shrink:0; }
.chd .ct { font-size:17px; font-weight:900; color:#d63031; }
.chd .cm { font-size:10.5px; color:#b2bec3; }
.chd .ctag { background:#d63031; color:#fff; border-radius:4px; padding:2px 8px; font-weight:700; font-size:10px; margin-right:5px; }
.sh { font-size:11.5px; font-weight:900; color:#1a1a1a; border-left:4px solid #d63031; padding-left:7px; margin-bottom:4px; display:flex; align-items:center; gap:5px; flex-shrink:0; }
.sh .no { background:#d63031; color:#fff; font-size:9px; border-radius:4px; padding:1px 5px; font-weight:700; }
.calsec { flex:0 0 auto; margin-bottom:5px; }
.calrow { display:flex; align-items:center; gap:10px; }
.cal { display:flex; flex-wrap:wrap; gap:2.5px; flex:1; }
.cell { border-radius:5px; text-align:center; padding:4px 3px; min-width:0; }
.cell .cd { font-size:9px; font-weight:900; }
.cell .cs { font-size:8px; margin-top:1px; letter-spacing:1px; }
.calleg { font-size:9.5px; color:#999; white-space:nowrap; flex-shrink:0; }
.df { display:inline-block;width:10px;height:10px;border-radius:2px;background:#d63031;vertical-align:middle;margin-right:2px; }
.dt { display:inline-block;width:10px;height:10px;border-radius:2px;background:#fdeaea;border:1px solid #f3c5c5;vertical-align:middle;margin-right:2px; }
.ga { display:grid; grid-template-columns:1fr 1fr; gap:8px; flex:1 1 auto; min-height:0; margin-bottom:5px; }
.gcol { background:#fafbfc; border:1px solid #eee; border-radius:10px; padding:7px 8px; display:flex; flex-direction:column; overflow:hidden; }
.gsec { display:flex; flex-direction:column; flex:1; min-height:0; overflow:hidden; }
.radarbox { flex:1; display:flex; align-items:center; justify-content:center; min-height:0; }
.sparkbox { flex:1; display:flex; align-items:center; justify-content:center; min-height:0; }
.hlbox { background:linear-gradient(135deg,#fef6f3,#fdf0ed); border-left:4px solid #d63031; border-radius:0 8px 8px 0; padding:7px 9px; margin-top:4px; }
.hlq { font-size:12px; font-weight:700; line-height:1.45; color:#1a1a1a; }
.hlwho { font-size:9.5px; color:#e17055; font-weight:700; margin-top:3px; }
.grit { font-size:10px; color:#555; margin-top:4px; line-height:1.4; padding-left:4px; border-left:2px solid #fdeaea; }
.gb { display:grid; grid-template-columns:1fr 1fr; gap:8px; flex:1 1 auto; min-height:0; margin-bottom:5px; }
.chips { display:grid; grid-template-columns:1fr 1fr; gap:3px; flex:1; align-content:start; overflow:hidden; }
.chip { font-size:9.5px; line-height:1.28; background:#fff; border:1px solid #e8eaed; border-left:3px solid #e17055; border-radius:5px; padding:4px 6px; color:#2d3436; }
.chip b { color:#d63031; font-weight:900; }
.p3 { display:flex; flex-direction:column; gap:5px; flex:1; }
.pc { background:#fafafa; border-left:3px solid #e17055; border-radius:0 7px 7px 0; padding:6px 8px; flex:1; display:flex; flex-direction:column; }
.pch { font-size:10.5px; font-weight:900; color:#e17055; margin-bottom:3px; }
.pcb { font-size:10px; line-height:1.52; color:#2d3436; flex:1; }
.dstrip { display:grid; grid-template-columns:repeat(4,1fr); gap:7px; flex:0 0 auto; margin-bottom:5px; }
.ds { background:linear-gradient(145deg,#fff8f5,#fdeaea); border:1px solid #f5d5d0; border-radius:8px; text-align:center; padding:7px 3px; }
.ds .dv { font-size:20px; font-weight:900; color:#d63031; line-height:1; }
.ds .dk { font-size:9.5px; color:#e17055; margin-top:4px; }
.wish { background:linear-gradient(145deg,#fef9f5,#fdf3ef); border:1px solid #f5ddd3; border-radius:8px; padding:8px 12px; flex:0 0 auto; }
.wish .wt { font-size:10.5px; font-weight:900; color:#e17055; }
.wish .wx { font-size:11px; color:#1a1a1a; line-height:1.55; margin-top:3px; }
.cf { position:absolute; bottom:5mm; left:14mm; right:14mm; font-size:9px; color:#ccc; border-top:1px solid #f0f0f0; padding-top:3px; display:flex; justify-content:space-between; }
</style>`;

// ====== 读取侧写内容 ======
let profiles;
try {
  profiles = JSON.parse(fs.readFileSync(path.join(DATA, 'profiles.json'), 'utf8'));
} catch (e) {
  console.error('✗ 未找到 data/profiles.json。请先按 references/methodology.md 的方法，基于 data/graduated_*.json 撰写每位学员的侧写内容并写入 data/profiles.json。');
  process.exit(1);
}
if (!Array.isArray(profiles) || profiles.length === 0) {
  console.error('✗ data/profiles.json 为空或格式错误。');
  process.exit(1);
}

const manifest = [];

for (const s of profiles) {
  const key = s.key || s.id;
  const camp = s.campName || DEFAULT_CAMP;
  const volunteer = s.volunteer || '行动营志愿者';
  const hwSorted = loadHomeworks(s.id);
  const stars = hwSorted.map(h => h.星级);
  const dates = hwSorted.map(h => h.打卡时间);
  const statsHtml = (s.stats || []).map(x => `<div class="cstat"><div class="cv">${x.v}</div><div class="ck">${x.k}</div></div>`).join('');
  const keysHtml = (s.keys || []).map(k => `<span class="ckey">${k}</span>`).join('');
  const chipsHtml = (s.achievements || []).map(a => `<div class="chip"><b>✦</b> ${a}</div>`).join('');
  const profileHtml = (s.profile || []).map(p => `<div class="pc"><div class="pch">▸ ${p.l}</div><div class="pcb">${p.t}</div></div>`).join('');
  const fullCount = stars.filter(v => v >= 3).length;
  const avg = stars.length ? (stars.reduce((a, b) => a + b, 0) / stars.length).toFixed(1) : '0.0';
  const maxDim = [...(s.bars || [['—', 0]])].sort((a, b) => b[1] - a[1])[0];

  const html = `<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><title>${s.name} · 结营成长报告</title>${CSS}</head>
<body>
<div class="page cover">
  <div class="ctop">
    <div class="ceb">${CAMP_YEAR} ${camp} · 结营成长报告</div>
    <div class="cbdg">✓ 已毕业 · 上岸</div>
  </div>
  <div class="chero">
    <div class="cname">${s.name}</div>
    <div class="ctagline">${s.tagline || ''}</div>
    <div class="coneliner">${s.oneliner || ''}</div>
  </div>
  <div>
    <div class="cstats">${statsHtml}</div>
    <div class="ckeys">${keysHtml}</div>
  </div>
  <div class="cfoot">本报告由你的真实作业数据整理 · 仅供本人留存与结营纪念</div>
</div>

<div class="page content">
  <div class="chd"><div class="ct">你的结营报告 · ${s.name}</div><div class="cm"><span class="ctag">✓ 已毕业</span>星球编号 ${s.id}</div></div>

  <div class="calsec">
    <div class="sh"><span class="no">00</span>打卡地图 · 这十多天的足迹</div>
    ${calendar(stars, dates)}
  </div>

  <div class="ga">
    <div class="gcol">
      <div class="gsec">
        <div class="sh"><span class="no">01</span>能力画像 · 五维雷达</div>
        <div class="radarbox">${radar(s.bars || [])}</div>
      </div>
    </div>
    <div class="gcol">
      <div class="gsec">
        <div class="sh"><span class="no">02</span>星级成长曲线</div>
        <div class="sparkbox">${sparkline(stars)}</div>
      </div>
      <div class="hlbox">
        <div class="hlq">"${s.hl || ''}"</div>
        <div class="hlwho">${s.hlWho || ''}</div>
        <div class="grit">${s.grit || ''}</div>
      </div>
    </div>
  </div>

  <div class="gb">
    <div class="gcol">
      <div class="gsec">
        <div class="sh"><span class="no">03</span>小成果墙 · 你攒下的每一步</div>
        <div class="chips">${chipsHtml}</div>
      </div>
    </div>
    <div class="gcol">
      <div class="gsec">
        <div class="sh"><span class="no">04</span>学员侧写 · 你是谁 / 擅长什么 / 潜力在哪</div>
        <div class="p3">${profileHtml}</div>
      </div>
    </div>
  </div>

  <div class="dstrip">
    <div class="ds"><div class="dv">${stars.length}</div><div class="dk">打卡天数</div></div>
    <div class="ds"><div class="dv">${avg}</div><div class="dk">平均星级</div></div>
    <div class="ds"><div class="dv">${fullCount}</div><div class="dk">满星作业</div></div>
    <div class="ds"><div class="dv">${maxDim[0]}</div><div class="dk">最强维度</div></div>
  </div>

  <div class="wish"><span class="wt">结营寄语 ｜</span><span class="wx">${s.wish || ''}</span></div>

  <div class="cf"><span>${CAMP_YEAR} ${camp} · 结营成长报告</span><span>${volunteer}</span></div>
</div>
</body></html>`;

  const hf = path.join(BUILD, `rpt_${key}.html`);
  fs.writeFileSync(hf, html, 'utf8');
  manifest.push({ key, name: s.name, id: s.id });
  console.log('html:', hf, '| stars', JSON.stringify(stars));
}

fs.writeFileSync(path.join(BUILD, 'manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');
console.log('HTML DONE ->', BUILD, '| manifest:', manifest.length, '人');
