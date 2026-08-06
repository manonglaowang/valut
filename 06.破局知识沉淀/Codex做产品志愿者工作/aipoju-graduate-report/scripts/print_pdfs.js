// print_pdfs.js — 用系统 Edge 无头模式，把 build/rpt_*.html 打印成桌面上的两页 A4 PDF。
// 用法：node scripts/print_pdfs.js
//
// 重要坑（已踩过）：Edge --print-to-pdf 的「输出路径」必须用 Windows 盘符格式（C:/Users/...），
// 不能用 Git Bash 的 /c/Users/... 形式，否则会静默失败、文件不生成。
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const BASE = path.join(__dirname, '..');
const BUILD = path.join(BASE, 'build');
const DESKTOP = process.env.USERPROFILE
  ? path.join(process.env.USERPROFILE, 'Desktop')
  : (process.env.HOME ? path.join(process.env.HOME, 'Desktop') : '');

const EDGE_CANDIDATES = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
];
const EDGE = EDGE_CANDIDATES.find(p => fs.existsSync(p)) || EDGE_CANDIDATES[0];

if (!fs.existsSync(BUILD)) {
  console.error('✗ 未找到 build/ 目录。请先运行 node scripts/generate_reports.js 生成 HTML。');
  process.exit(1);
}
const manifestPath = path.join(BUILD, 'manifest.json');
if (!fs.existsSync(manifestPath)) {
  console.error('✗ 未找到 build/manifest.json。请先运行 node scripts/generate_reports.js。');
  process.exit(1);
}
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

console.log('Edge:', EDGE);
console.log('输出目录:', DESKTOP);
for (const m of manifest) {
  const htmlPath = path.join(BUILD, `rpt_${m.key}.html`);
  if (!fs.existsSync(htmlPath)) { console.error('  ⚠ 缺少', htmlPath, '，跳过'); continue; }
  const outWin = path.join(DESKTOP, `${m.name}_${m.id}_结营成长报告.pdf`).replace(/\\/g, '/');
  const url = 'file:///' + htmlPath.replace(/\\/g, '/');
  try {
    execFileSync(EDGE, [
      '--headless', '--disable-gpu', '--no-sandbox',
      '--print-to-pdf=' + outWin,
      '--print-to-pdf-no-header',
      url,
    ], { stdio: 'ignore', timeout: 120000 });
    console.log('  ✓', `${m.name}_${m.id}_结营成长报告.pdf`);
  } catch (e) {
    console.error('  ✗ 打印失败:', m.name, e.message);
  }
}
console.log('PDF 打印完成 ->', DESKTOP);
