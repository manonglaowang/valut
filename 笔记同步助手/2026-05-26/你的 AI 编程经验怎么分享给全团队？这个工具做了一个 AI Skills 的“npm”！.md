---
author: 彭涛主创团队
source: 微信公众号
url: https://mp.weixin.qq.com/s?__biz=Mzg3NzU2NjY3OQ==&mid=2247491724&idx=1&sn=98fbfb8cbd911d55ef24b8b7c87ddb45&chksm=ceef3ba2195bfcb1638509c270b9e10bb93cd2840fdb79397d875c12eccf4c2adca9e61bce5a&mpshare=1&scene=1&srcid=0526q8cfWm2XGgwMSvbYg8e7&sharer_shareinfo=dcaa37fe4852f49ac3c2652570e6880a&sharer_shareinfo_first=dcaa37fe4852f49ac3c2652570e6880a#rd
saved: 2026-05-26 21:28:14
tags:
  - 笔记同步助手
id: 4e9c4244-dab2-43c3-a031-ae861a8ffec9
---

公众号名称：彭少

作者名称：彭涛主创团队

发布时间：2026-05-24 20:34

原文链接：[https://l0aerbtrigp.feishu.cn/wiki/WKagwkl4Ai7kf1kdHvfcUironPe?sessionid=](https://l0aerbtrigp.feishu.cn/wiki/WKagwkl4Ai7kf1kdHvfcUironPe?sessionid=)

**点击上方卡片关注我**

​

**设置星标 学习更多AI出海知识**

用 AI 写代码久了以后，你会积累很多“经验”，哪些 prompt 写法效果好、哪些 MCP 配置能解决特定问题、哪些 slash command 能省大量时间。

这些东西散落在你的 .claude 目录、.cursor/rules 或者某个本地文件夹里。

问题是团队里只有你知道这些。

新人来了，得自己摸索，同事问你“你那个 AI 写代码怎么配的”，你发一堆文件过去，对方还得自己放对地方，改了一个 skill，别人的还是旧版本。

这个问题和十年前前端开发的情况很像，每个人的工具链配置都不一样，直到有了 package.json 和 npm install。

现在，AI Skills 也有了类似的工具，它叫 sx。

![[笔记同步助手/images/0e9a7e58f4699d2599aec4f14f473089_MD5.png]]

## sx 是什么

简单说，sx 是 AI 编程资产的包管理器，就像 npm 管理 JavaScript 包一样，sx 管理你团队的 AI skills、MCP 配置、slash commands、hooks 等。

它解决的核心问题：

• 分享：一个人的发现变成团队资产

• 同步：改一处，所有人自动更新

• 不膨胀：按项目/团队/个人维度按需安装，不会把无关的 skill 塞给所有人

• 跨客户端：同一套资产可以同时给 Claude Code、Cursor、Copilot、Gemini 用

它的运作模式和 npm 很像，有一个 manifest 文件（sx.toml）定义有哪些资产、谁能用，有 lock file 保证版本一致，有 install 命令拉取到本地。

​

## 三分钟上手

安装：

```
# macOS / Linux
brew tap sleuth-io/tap
brew install sx

# 或者一键脚本
curl -fsSL https://raw.githubusercontent.com/sleuth-io/sx/main/install.sh | bash
```

初始化一个 vault（存放 skills 的仓库）：

```
# 本地模式（个人用）
sx init --type path --path ～/my-ai-skills

# Git 模式（小团队共享）
sx init --type git --repo git@github.com:yourteam/ai-skills.git

# skills.new 平台（大团队，带 UI 和统计）
sx init --type sleuth
```

把现有的 skills 加进去：

```
# 自动识别类型（skill/command/plugin）
sx add ～/.claude/commands/my-command
sx add ～/.claude/skills/my-skill
sx add code-review@claude-plugins-official
```

其他人拉取：

```
sx install  # 一行命令，同步所有团队 skills
```

就这么简单，你发现了一个好用的 skill，加到 vault，团队里所有人 sx install 一下就有了。

​

## 按需分发，不塞垃圾

sx 最有意思的设计是它的“作用域”机制，不是所有 skill 都发给所有人，而是可以精确控制谁在什么场景下拿到哪个 skill。

```
# 全组织都能用
sx install code-review --org

# 只在特定仓库里生效
sx install django-patterns --repo github.com/acme/backend

# 只在仓库的某个目录下生效
sx install api-design --path github.com/acme/backend#src/api/

# 只给特定团队
sx install infra-ops --team platform

# 只给某个人
sx install experimental-prompt --user alice@acme.com

# 给 CI/bot 用
sx install deploy-check --bot python-backend
```

这个设计解决了一个很实际的问题，如果把所有 skill 都塞给 AI，上下文会膨胀，模型表现反而会变差，按项目、团队、人分发，确保每次只加载相关的 skill。

​

## 连 claude.ai 和 chatgpt.com 也能用

除了本地的 Claude Code、Cursor 等工具，sx 还支持通过一个 cloud relay 让你在 claude.ai 和 chatgpt.com 网页版上也能用团队的 skills：

```
sx cloud connect   # 打开 skills.new，获取连接凭证
sx cloud serve     # 保持运行，它会通过 WebSocket 转发请求
sx cloud status    # 获取 MCP URL，粘贴到 claude.ai 的 MCP 配置里
```

原理是把你本地的 vault 作为一个 MCP server 暴露出去。数据始终留在你本地，只是通过 WebSocket 转发请求。

![[笔记同步助手/images/e7053ec329a65cc8fa64f6f125b6afc8_MD5.png]]

## 接入 skills.sh 社区：8.5 万个现成 skill

sx 还集成了 skills.sh，这是一个社区驱动的 AI skill 目录，目前有 85000+ 个 skill。

可以直接从社区拉取 skill 到自己的 vault 里：

```
# 添加 Anthropic 官方的前端设计 skill
sx add anthropics/skills/frontend-design

# 添加 Vercel 的 agent skills
sx add vercel-labs/agent-skills

# 浏览搜索社区
sx add --browse
```

这意味着不用从零开始写 skill，社区里有大量现成的——前端、后端、DevOps、安全审计等各种方向都有。

找到适合的，sx add 一行命令加到团队 vault，所有人就能用。

​

## 能分享哪些类型的资产

sx 支持 7 种类型的 AI 编程资产：

• **Skills** — 针对特定任务的自定义 prompt 和行为（比如“写代码前先写测试”）

• **Rules** — 编码规范，可以按文件类型或路径生效

• **Agents** — 有特定目标的自主 AI agent

• **Commands** — slash 命令，快速触发特定操作

• **Hooks** — 生命周期事件触发器（比如每次 commit 前自动检查）

• **MCP Servers** — 外部集成配置

• **Plugins** — Claude Code 插件包（包含 commands + skills + hooks 的组合）

原来放在 .claude 目录或 .cursor/rules 里的文件不需要改格式，sx add 的时候会自动识别类型，只是加一层元数据用于版本管理。

​

## 用量统计和审计

对于团队管理者来说，sx 还提供了用量统计和审计功能：

```
sx stats                  # 查看采用情况面板
sx stats --since 7d --json  # 最近 7 天的数据，JSON 格式

sx audit                  # 查看最近的操作记录
sx audit --actor alice@acme.com --since 30d --event install.set
```

你能看到哪些 skill 被用得最多、谁在用、什么时候安装的，这对于衡量团队 AI 工具采用率很有用。

![[笔记同步助手/images/3b3c752d4e751433b8a783efdf1208d6_MD5.png]]

## 一个实际场景

假设团队有三个项目：一个 Python 后端、一个 React 前端、一个基础设施仓库，每个项目需要不同的 AI 编程规范。

也可以这样配置：

```
# 全组织通用的代码审查 skill
sx install code-review --org

# Python 项目专用
sx install python-best-practices --repo github.com/acme/backend
sx install django-patterns --repo github.com/acme/backend

# 前端项目专用
sx install react-patterns --repo github.com/acme/frontend
sx install tailwind-rules --repo github.com/acme/frontend

# 基础设施团队专用
sx install terraform-standards --team infra
```

每个开发者打开对应项目时，sx install 会自动解析当前仓库、团队归属、个人身份，只拉取相关的 skills，开后端的不会拿到 React 规则，前端的不会拿到 Django 模式。

​

## 写在最后

sx 做的事情本身不复杂，把散落在各人机器上的 AI 编程配置集中管理，按需分发，但它解决的问题很实际——随着团队里用 AI 写代码的人越来越多，“每个人的配置都不一样”这件事会越来越痛。

目前 sx 支持三种分发模式：本地路径、Git 仓库、skills.new 平台，可以根据团队规模选择。

如果已经在用 Claude Code 或 Cursor，而且积累了一些自己觉得好用的 skill 和配置，可以试试用 sx 管理起来，即使不在团队里用，多台机器之间同步也很方便。

> 项目地址：https://github.com/sleuth-io/sx
> 
> 官网：https://skills.new skills.sh

****欢迎关注，这个账号还会持续分享更多AI编程、出海工具、实战经验、踩坑记录。  
****

****想了解更多可以加我 vx: 257735 聊。****

![[笔记同步助手/images/3a677d9927787c9a67ec5ec0924a8572_MD5.png]]

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

![[笔记同步助手/images/39aeeb1db530107447d3723d1833f456_MD5.jpg|cover_image]]

彭涛主创团队 彭少

阅读原文

---

内容效果不满意？[点此反馈](https://feedback.notebooksyncer.com/feedback/12d91c8e_1779802088448?u=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzg3NzU2NjY3OQ%3D%3D%26mid%3D2247491724%26idx%3D1%26sn%3D98fbfb8cbd911d55ef24b8b7c87ddb45%26chksm%3Dceef3ba2195bfcb1638509c270b9e10bb93cd2840fdb79397d875c12eccf4c2adca9e61bce5a%26mpshare%3D1%26scene%3D1%26srcid%3D0526q8cfWm2XGgwMSvbYg8e7%26sharer_shareinfo%3Ddcaa37fe4852f49ac3c2652570e6880a%26sharer_shareinfo_first%3Ddcaa37fe4852f49ac3c2652570e6880a%23rd&s=obsidian)