# 经验教训与踩坑清单（运营本 skill 必读）

本文件沉淀了从真实运行中踩过的坑，部署/改造时先读一遍，避免重蹈覆辙。

---

## 1. 时间序列必须升序（最高频 bug）

- **现象**：日历热力图 / 星级曲线的 D1→Dn 与真实日期错位，导致某天星级显示错误。
- **根因**：提取脚本存 `graduated_*.json` 时，`homeworks` 数组按打卡时间**倒序**（最新在前）。脚本若直接按数组顺序标 D1→Dn，等于把时间轴反了。
- **修复**：`generate_reports.js` 的 `loadHomeworks` 已按 `new Date(打卡时间)` **升序**排序；日历每格显示真实 `MM/DD` 便于核对。
- **铁律**：凡渲染时间序列（日历/曲线），必须先按真实时间字段升序，绝不直接用提取数组原始顺序。

---

## 2. 打卡地图溢出（排版 bug）

- **现象**：12–13 个日期格挤在一行，超出页面右侧边界。
- **根因**：`.cal` 用 `flex-wrap:nowrap`；且 `.cd` 显示完整时间戳 `07/10 23:34:49`，总宽超页面。
- **修复**：① 日期缩短为 `MM/DD`（`slice(5,10)` 去掉时间）；② `.cal` 加 `flex-wrap:wrap`（13 天自动折两行）；③ `.cell` 去掉 `flex:1` 避免拉伸变形。
- **效果**：12 天 = 10+2 两行；13 天 = 11+3 两行，均不溢出。

---

## 3. Edge 打印 PDF 的路径格式（静默失败坑）

- **现象**：`msedge --print-to-pdf` 跑完不报错，但 PDF 文件根本没生成。
- **根因**：输出路径用了 Git Bash 的 `/c/Users/...` 形式，Edge 无法识别，**静默失败**。
- **修复**：输出路径必须用 Windows 盘符格式 `C:/Users/...`（正斜杠或反斜杠均可，但必须带盘符）。
  `print_pdfs.js` 已用 `process.env.USERPROFILE` 取得 `C:\Users\...\Desktop` 并转成 `C:/...` 形式。
- **验证**：打印后用脚本检查目标 PDF 是否存在、页数是否为 2。

---

## 4. 登录态失效

- **现象**：`ensureLoggedIn` 返回 false，脚本退出。
- **处理**：使用者用自己的账号执行 `node scripts/login.js`，在弹出的 Edge 里微信扫码登录，
  登录态自动存到 `data/state.json`。之后提取脚本复用该 state。
- **注意**：`state.json` 含登录凭证，切勿随 skill 分享出去；分享时只给脚本/文档，不含 `data/state.json`。

---

## 5. 平台改版 / 找不到页面元素 / 找不到目标地址 → 停下来问用户

- **适用场景**（用户明确要求的行为）：
  - 搜索框 `星球编号` placeholder 找不到
  - 作业表格列结构变化、星级 `li.ant-rate-star-full` 失效
  - 弹窗四字段提取不到
  - 平台 URL 变了（如志愿者页路径调整）
- **正确做法**：**不要反复重试或盲改选择器**。立即暂停，用 AskUserQuestion 或直接询问用户：
  「在 aipoju.com/volunteer 页面，我找不到『星球编号』搜索框 / 作业列表，可能是平台改版了。
  你能截图或描述一下现在页面的样子、正确元素在哪吗？」待用户引导到正确位置后，再继续提取与汇总。
- **原则**：已知流程跑不通 → 不硬扛，及时升格给人 → 听指挥继续 → 成功后把修复固化回脚本与本文档。

---

## 6. Playwright 依赖

- `common.js` 启动系统 Edge（非下载 Chromium），依赖本机已装 **Playwright** 包。
- 加载顺序：本地 `require('playwright')` 优先；失败则回退多个常见全局路径（含 WorkBuddy 内置 agent-browser 的 playwright）。
- 若都找不到：在 `scripts/` 下 `npm install playwright`，或确认全局已装。

---

## 7. 字体缺失

- 打印 PDF 依赖系统中文字体（Noto Sans SC / PingFang SC / Microsoft YaHei）。若服务器/容器无中文字体，
  打印出的 PDF 会缺字或乱码。需先确保中文字体可用。
