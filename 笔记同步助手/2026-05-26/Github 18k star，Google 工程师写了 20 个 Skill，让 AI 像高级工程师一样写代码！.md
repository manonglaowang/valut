---
author: 彭涛主创团队
source: 微信公众号
url: https://mp.weixin.qq.com/s?__biz=Mzg3NzU2NjY3OQ==&mid=2247491701&idx=1&sn=275299d93b780a046300bced1d53dd1c&chksm=cebcb5b41b732b60f47c3a8ca7e77d0f8c01d6b4fd2c92e67b5a796f107f59a2543d30231975&mpshare=1&scene=1&srcid=0526Dne0MEPcPWMN2VPniSX7&sharer_shareinfo=bf56f3d537d973848d6c963e35ba0806&sharer_shareinfo_first=bf56f3d537d973848d6c963e35ba0806#rd
saved: 2026-05-26 21:28:35
tags:
  - 笔记同步助手
id: 7a3acbca-a000-4776-9f79-271814c8957e
---

公众号名称：彭少

作者名称：彭涛主创团队

发布时间：2026-05-21 15:59

原文链接：[https://l0aerbtrigp.feishu.cn/wiki/WKagwkl4Ai7kf1kdHvfcUironPe?sessionid=](https://l0aerbtrigp.feishu.cn/wiki/WKagwkl4Ai7kf1kdHvfcUironPe?sessionid=)

**点击上方卡片关注我**

## 设置星标 学习更多项目

用 Claude Code 或者 Cursor 写代码，最常遇到的问题不是模型不够聪明，而是它不讲规矩，跳过测试、过度设计、改了不该改的东西、写完就跑不管后果。

Google Chrome 团队的 Addy Osmani 做了一套叫 agent-skills 的项目，思路不是教你怎么写 prompt，而是直接给 AI 装上一套高级工程师的工作流程。

20 个结构化 Skill，覆盖从需求定义到上线发布的完整开发周期。

![[笔记同步助手/images/7c2bc3d99e5e31205f15eff293c19af0_MD5.jpg]]

## 7 个命令，对应完整开发周期

装好之后，多了 7 个 slash 命令：

**/spec** — 先写 PRD 再动手。覆盖目标、命令、结构、代码风格、测试策略和边界条件。

**/plan** — 把 spec 拆成小的、可验证的任务单元。每个任务有验收标准和依赖排序。

**/build** — 一次只做一个薄切片。实现、测试、验证、提交。Feature flag，安全默认值，可回滚。

**/test** — Red-Green-Refactor。测试金字塔 80/15/5（单元/集成/E2E），DAMP 优于 DRY。

**/review** — 五轴 code review。变更控制在 ～100 行，严重等级标签。

**/code-simplify** — Chesterton’s Fence 原则。先理解为什么这样写，再决定要不要改。

**/ship** — 上线清单、Feature flag 生命周期、分阶段发布、回滚流程、监控配置。

这些命令不是 prompt 模板——每个命令背后是一套完整的步骤、检查点和退出标准，AI 按流程走，不是靠灵感发挥。

举个例子：敲 /build，AI 不会直接开始写代码,它会先确认当前要实现的是哪个 task，检查依赖是否就绪，然后按“实现 → 写测试 → 跑测试 → 验证通过 → 提交”的流程走。

如果测试没过，它不会跳过继续写下一个功能,这种硬约束在日常使用中比任何 prompt 技巧都管用。

![[笔记同步助手/images/ffe275859b62545439b7fafe525c66fb_MD5.jpg]]

## 20 个 Skill 长什么样

每个 Skill 都是一个 SKILL.md 文件，结构固定：Overview、When to Use、Process、Rationalizations、Red Flags、Verification。

其中 Rationalizations 是最巧妙的设计，比如 AI 经常说“我一会儿再加测试”，Skill 里直接列了这个借口和反驳：“如果现在不测，后面永远不会测，先写测试再写代码。”

再比如“这段代码以后会用到”——反驳是“YAGNI。删掉。现在只写需要的东西。”

这些反模式表格直接堵住了 AI 偷懒的常见路径，每个 Skill 还有 Red Flags 部分——列出“如果出现这些信号，说明流程已经偏了”。

比如 incremental-implementation 的 Red Flag 是“一个 PR 超过 300 行”、“多个功能混在一个 commit 里”，Verification 部分则要求 AI 提供具体证据：不是说“测试通过了”，而是要贴出测试运行的输出。

![[笔记同步助手/images/8f2197978f4e45febbd121f1c3399c93_MD5.jpg]]

## 除了流程，还有专家角色

项目还提供了 3 个预配置的 Agent 角色：

**code-reviewer** — 高级 Staff Engineer 视角。五轴评审，标准是“Staff Engineer 会不会批准这个”。

**test-engineer** — QA 专家视角。测试策略、覆盖率分析、Prove-It 模式。

**security-auditor** — 安全工程师视角。漏洞检测、威胁建模、OWASP 评估。

另外有 4 份参考清单：测试模式、安全检查、性能检查、无障碍检查，Skill 运行时会自动引用。

## Skill 也会自动激活

不只是手动敲命令，在设计 API 时，api-and-interface-design 自动触发；做前端时，frontend-ui-engineering 自动激活；调试时，debugging-and-error-recovery 自己顶上来。

几个值得单独说的 Skill：

context-engineering：教 AI 在正确的时机获取正确的信息，当输出质量下降的时候激活。

source-driven-development：要求 AI 的每个框架决策都基于官方文档，引用来源，标注未验证的部分。

deprecation-and-migration：“代码即负债”思维，强制弃用和建议弃用的区分，迁移模式，僵尸代码清理。

![[笔记同步助手/images/3f421d1ad8a9665495d5387338ba1dc9_MD5.jpg]]

## 支持几乎所有 AI 编程工具

Claude Code 用 marketplace 一键安装：

```
/plugin marketplace add addyosmani/agent-skills
/plugin install agent-skills@addy-agent-skills
```

Cursor 把 SKILL.md 复制到 .cursor/rules/。Gemini CLI 用 gemini skills install，Windsurf、OpenCode、GitHub Copilot、Kiro 都有对应的配置方式。

因为底层就是 Markdown 文件，所以任何能接受 system prompt 或指令文件的 Agent 都能用，这个兼容性设计很聪明，Skill 不依赖任何特定工具的 API 或插件架构，就是纯文本，甚至可以把某个 Skill 的内容直接粘贴到 ChatGPT 的 system prompt 里，照样生效。

## 写在最后

这不是一个 prompt 集合，是一套工程纪律系统，它解决的核心问题是AI 编程工具的能力已经很强了，但缺乏人类高级工程师那种“不该做什么”的判断力。

agent-skills 用结构化流程 + 反模式表格补上了这块，如果你觉得 AI 写代码总是“差点意思”，能跑但不讲究，能用但不规范，试试装上这套 Skills。

它不会让模型变聪明，但会让模型变得有纪律。

> GitHub 仓库：https://github.com/addyosmani/agent-skills

****欢迎关注，这个账号还会持续分享更多AI编程、出海工具、实战经验、踩坑记录。  
****

****想了解更多可以加我 vx: 257735 聊。****

![[笔记同步助手/images/3a677d9927787c9a67ec5ec0924a8572_MD5.png]]

**[电商图、海报、Logo 全搞定！10 个 GPT Image 2 提示词模板，直接抄](https://mp.weixin.qq.com/s?__biz=Mzg3NzU2NjY3OQ==&mid=2247491697&idx=1&sn=3097ea37e97c8a94e8f385f0a4424a2b&scene=21#wechat_redirect)**

**[想让 Claude Code 彻底完成一个任务，试试 /goal](https://mp.weixin.qq.com/s?__biz=Mzg3NzU2NjY3OQ==&mid=2247491579&idx=1&sn=f45e5d17a70641047124ff305d75c7cf&scene=21#wechat_redirect)**

**[Codex 这次跑进了 Chrome，AI 编码 Agent 的战场变了](https://mp.weixin.qq.com/s?__biz=Mzg3NzU2NjY3OQ==&mid=2247491539&idx=1&sn=deb24c520f3159d9857608386309adf9&scene=21#wechat_redirect)**

**[Claude Code 装上这个插件，我不用再当中间人了](https://mp.weixin.qq.com/s?__biz=Mzg3NzU2NjY3OQ==&mid=2247491506&idx=1&sn=4966f2518a58f96c36ee3fee577c7e18&scene=21#wechat_redirect)**

**[Mac mini 走起！手机随时随地AI编程，太爽了](https://mp.weixin.qq.com/s?__biz=Mzg3NzU2NjY3OQ==&mid=2247491349&idx=1&sn=0b49c445974b7f575f538f6f258118ca&scene=21#wechat_redirect)**

**[飞书开源CLI，我用Claude Code一句话读了12篇文档、建了66条选题表！](https://mp.weixin.qq.com/s?__biz=Mzg3NzU2NjY3OQ==&mid=2247491225&idx=1&sn=94d8167fa5672fc1b77f7477aee53990&scene=21#wechat_redirect)**

**[推荐一个牛逼免费的 markdown 工具！](https://mp.weixin.qq.com/s?__biz=Mzg3NzU2NjY3OQ==&mid=2247491174&idx=1&sn=f2f76899ec44c45c9cef98a8e5eb629a&scene=21#wechat_redirect)**

**[Google Stitch 2.0 太牛了！UI 丑的问题有救了](https://mp.weixin.qq.com/s?__biz=Mzg3NzU2NjY3OQ==&mid=2247491164&idx=1&sn=b13843862a6efa78d7e87624f3d77f1a&scene=21#wechat_redirect)**

**[我们出海社区终于有自己的网站了！](https://mp.weixin.qq.com/s?__biz=Mzg3NzU2NjY3OQ==&mid=2247490919&idx=1&sn=975a80f7a8f8805296fc917b6c18b89c&scene=21#wechat_redirect)**

​

****[从海外公司注册到 Stripe 收款，跑通了出海收付款全流程（实操分享）](https://mp.weixin.qq.com/s?__biz=Mzg3NzU2NjY3OQ==&mid=2247489551&idx=1&sn=08058b274add835f37b3374fa43b6757&scene=21#wechat_redirect)****

---

![[笔记同步助手/images/8ea76dd4d518f3a21b49c7f1a685d66d_MD5.jpg|cover_image]]

彭涛主创团队 彭少

阅读原文

---

内容效果不满意？[点此反馈](https://feedback.notebooksyncer.com/feedback/369265da_1779802112811?u=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzg3NzU2NjY3OQ%3D%3D%26mid%3D2247491701%26idx%3D1%26sn%3D275299d93b780a046300bced1d53dd1c%26chksm%3Dcebcb5b41b732b60f47c3a8ca7e77d0f8c01d6b4fd2c92e67b5a796f107f59a2543d30231975%26mpshare%3D1%26scene%3D1%26srcid%3D0526Dne0MEPcPWMN2VPniSX7%26sharer_shareinfo%3Dbf56f3d537d973848d6c963e35ba0806%26sharer_shareinfo_first%3Dbf56f3d537d973848d6c963e35ba0806%23rd&s=obsidian)