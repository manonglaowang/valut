---
name: aipoju-graduate-report
agent_created: true
description: This skill generates a beautiful two-page A4 "graduation growth report" PDF for each graduated student of an AI Breakthrough (破局) action camp, using their real homework data scraped from the aipoju.com volunteer platform. Use it when a camp volunteer wants to produce personalized, data-rich, year-in-review-style结业 reports for students who met the check-in quota (e.g. ≥12 check-ins). It extracts each student's homework, then (guided by a methodology) writes a profile (highlights, achievement wall, persona sketch, five-dimension radar) and renders a designed PDF. Trigger phrases include 结营报告, 毕业学习报告, 学员成长报告, 上岸学员报告, graduate report, 给学员做报告.
---

# 结营成长报告生成器（aipoju-graduate-report）

为「破局行动营」等同类训练营的**志愿者**服务：给达到毕业标准（如打卡≥12 次）的学员，
批量生成**每人一份、独立、不公开**的两页 A4 结营成长报告 PDF。风格为「年度总结 / Spotify Wrapped」
式——数据高光 + 关键词 + 金句 + 宏观叙事，给学员本人留存与纪念，不是公开榜单、不是批改评语。

平台地址 `https://aipoju.com/volunteer` 与页面排版格局固定；**每位使用者用自己的账号登录**即可，
无需改动选择器/地址（除非平台改版，见下方「卡住怎么办」）。

---

## 适用场景

- 用户是某期行动营志愿者，想给本期**已毕业学员**做个性化结营报告。
- 用户说：「给学员做结营报告 / 毕业学习报告 / 上岸学员报告」「做一份结营成长总结」。
- 学员数据来自志愿者后台每位学员的历史作业（四字段 + 星级 + 好事状态 + 打卡时间）。

## 不适用

- 公开排名榜 / 横向对比（本 skill 强调每人独立、不公开、不互比）。
- 自动打分、自动标记好事（那是批改流程，与本报告无关）。

---

## 依赖（运行前确认）

- **Node.js**：执行提取与渲染脚本。
- **Playwright**：`scripts/common.js` 用它启动系统 Edge。本地 `require('playwright')` 优先；
  失败则回退多个常见全局路径。若都没有，在 `scripts/` 下 `npm install playwright`。
- **系统 Edge（msedge.exe）**：脚本自动探测 `C:\Program Files (x86)\Microsoft\Edge\...` 或
  `C:\Program Files\Microsoft\Edge\...`；无需单独安装。
- **中文字体**：打印 PDF 依赖系统中文（Noto Sans SC / PingFang SC / Microsoft YaHei），否则 PDF 缺字。
- **登录态**：首次需 `node scripts/login.js` 用各自账号微信扫码，态存 `data/state.json`（含凭证，**切勿分享**）。

---

## 标准流程（6 步）

### Step 0 · 准备与登录
1. 确认依赖就绪（Node / Playwright / Edge / 中文字体）。
2. 若 `data/state.json` 不存在或过期，提示使用者运行 `node scripts/login.js` 扫码登录。
   登录成功后继续。若 `ensureLoggedIn` 在提取时失败，停下来告知用户重新登录。

### Step 1 · 识别已毕业学员，写 `data/students.json`
- 让使用者在志愿者后台（或由其告知）列出**已毕业/打卡达标**学员的「星球编号 + 微信昵称 + 达标天数」。
- 写入 `data/students.json`（参考 `data/students.example.json`）：
  `[{ "id":"星球编号", "name":"微信昵称", "days": 12 }, ...]`
- 毕业标准因营而异（多为 ≥12 次打卡），按本期实际标准筛选。

### Step 2 · 提取作业 → `data/graduated_{id}.json`
- 运行 `node scripts/extract_graduated.js`：
  - 自动展开作业表、关闭「仅显示未评分」、设每页 100 条；
  - 按星球编号逐个搜索，点开每条「评分」弹窗，抓完整四字段 + 星级（ant-rate-star-full 计数）+ 好事状态 + 打卡时间；
  - 输出 `data/graduated_{星球编号}.json`（每人一份）+ 桌面汇总 MD。
- **卡住处理**：若某元素/搜索框/列结构找不到（疑似平台改版），**立即暂停问用户**（见「卡住怎么办」），不要硬扛。

### Step 3 · 撰写侧写 → `data/profiles.json`（核心创作环节）
- 读取每位学员的 `data/graduated_{id}.json`，**通读全部作业四字段**。
- 严格按 `references/methodology.md` 的方法，为每位学员撰写个性化内容：
  - 五维能力打分（工具攻坚/方法论/商业化/坚持韧性/输出质量，1–5）
  - 小成果墙（8–12 项具体动作/产出）
  - 高光金句（学员原话）+ 高光出处 + 咬牙瞬间
  - 学员侧写三问（是什么人 / 擅长什么 / 潜力）
  - 封面 tagline / oneliner / 4 个数据卡 / 关键词 / 结营寄语
- 写入 `data/profiles.json`（数组，每项对应一位学员；字段 schema 见 `references/report_template.md`；可参考 `data/profiles.example.json`）。
- **铁律**：所有内容必须基于作业原文，真实不编造；禁肉麻署名、禁批改腔「建议①②③」、禁「缺」字；时间序列按真实日期升序。

### Step 4 · 生成 HTML → `build/rpt_{key}.html`
- 运行 `node scripts/generate_reports.js`：
  - 读 `profiles.json` + 各 `graduated_{id}.json`（星/日期自动算、已按时间升序）；
  - 渲染每人一份两页 A4 HTML 到 `build/`，并写 `build/manifest.json`。
- 若只想改文案/重排：直接改 `profiles.json` 或 `generate_reports.js` 的 CSS/模板，重跑本步即可，**无需重提作业**。

### Step 5 · 打印 PDF → 桌面
- 运行 `node scripts/print_pdfs.js`：用系统 Edge 无头打印 `build/rpt_*.html` 为桌面上的
  `{姓名}_{星球编号}_结营成长报告.pdf`（每份恰好 2 页）。
- 打印后核验 PDF 存在且为 2 页。

### Step 6 · 交付与清理
- 把桌面 PDF 交给使用者（由志愿者发给对应学员，或自行留存）。
- 不分享 `data/state.json`（含登录凭证）。`graduated_*.json` / `profiles.json` 含学员数据，分享 skill 时建议清空或脱敏。

---

## 卡住怎么办（铁律）

用户明确要求：**提取/汇总过程中一旦卡住，就停下来直接问用户，让用户引导到正确位置，再继续。**
适用情形：
- 找不到「星球编号」搜索框 / 作业表格 / 星级元素 / 弹窗四字段（疑似平台改版）；
- 平台 URL 变了、页面布局与预期不符；
- 登录态失效、弹窗异常。

**做法**：不反复重试、不盲改选择器。用 AskUserQuestion 或直接询问用户，给出具体现象与已尝试动作，
请用户截图或描述正确元素位置；待用户引导到正确位置后，继续提取与汇总。成功修复后，把修复点固化回
`scripts/` 与 `references/lessons.md`。

---

## 文件地图

```
aipoju-graduate-report/
├── SKILL.md                      # 本文件
├── scripts/
│   ├── common.js                 # 浏览器自动化公共库（启动 Edge、登录态、表格筛选、弹窗提取）
│   ├── login.js                  # 首次登录：node login.js 扫码，存 data/state.json
│   ├── extract_graduated.js      # 提取已毕业学员作业 → data/graduated_{id}.json
│   ├── generate_reports.js       # 渲染两页 HTML → build/rpt_{key}.html + manifest.json
│   └── print_pdfs.js             # Edge 无头打印 HTML → 桌面 PDF
├── references/
│   ├── methodology.md            # 总结方法论（五维定义/小成果/侧写三问/口吻铁律）
│   ├── report_template.md        # 报告模板结构 + profiles.json 字段 Schema
│   └── lessons.md                # 踩坑清单（时间升序/溢出/Edge路径/登录/卡住问用户）
└── data/
    ├── students.example.json     # 学员名单示例
    └── profiles.example.json     # 侧写内容示例（字段全貌）
```

## 分享给他人

本 skill 自包含，可直接打包分享：
1. 确保 `data/` 下不含 `state.json`（登录凭证）与真实学员隐私数据（或已脱敏）；
2. 保留 `students.example.json` / `profiles.example.json` 作为模板；
3. 用 skill 打包工具生成 zip，对方解压到其 `~/.workbuddy/skills/` 即可，按其账号 `node login.js` 登录后使用。
