---
author: 孟健的AI编程认知
source: 微信公众号
url: https://mp.weixin.qq.com/s?__biz=Mzk0ODM5NTEyNA==&mid=2247506000&idx=1&sn=20550e5667180d614ad77e089af5441f&chksm=c2833bff63acf9b5d61ac65e8004794959be8e58215177317c3cfb98b66f20fb7daa38c9b312&mpshare=1&scene=1&srcid=0526iAGU3nWUOejAxcm0S2t9&sharer_shareinfo=4d90158fae80d1887eefec61250d03fe&sharer_shareinfo_first=4d90158fae80d1887eefec61250d03fe#rd
saved: 2026-05-26 21:28:54
tags:
  - 笔记同步助手
id: 6a6f1e0e-7527-4853-a4a3-96d544a8e921
---

公众号名称：孟健AI编程

作者名称：孟健的AI编程认知

发布时间：2026-05-26 18:57

大家好，我是孟健。

AI 时代，最先应该被淘汰的工作方式，是把自己当执行机器。

昨天我的滴答清单统计：完成 11 个任务，完成率 100%，同时覆盖了 IP 自媒体、出海基建、领航计划、财务、杂事五个方向。专注时长 3h45m，任务明细里有读书、Hermes 排障、skill 机制研究、定时任务修复。

![[笔记同步助手/images/39279317bb71ae19dcf4463bedd70835_MD5.jpg]]

这一天的产出，靠的不是更强的自律，也不是更长的工作时间。大部分执行任务，有人在帮我跑。

01 过去的时间管理，是工业时代的自我压榨

​

过去很多时间管理方法的共同预设是：所有事情都必须自己做，所以要把自己的时间切得更细、更满、更高效。

问题就在这里。当所有任务都必须亲自执行，时间管理能提升的上限，就是你自己的执行速度。顶多做到工作更久、每小时更集中。人被这套系统驱动，越来越像机器。

很多人说时间管理没用，往往不是工具的问题。是这个预设在 AI 时代已经过时了。

**执行链路里，人占的比例太高了，这才是核心问题。**

Todo list 本身没错，它记录的是"要做什么"。但以前的逻辑，默认"要做什么"和"你要亲自做什么"是同一件事。现在这个等号，可以去掉了。

02 任务变并行以后，人的位置变了

​

以前我做一篇公众号，流程大概是：找选题 → 查资料 → 写提纲 → 写正文 → 排版 → 配图 → 发布。每一步都要亲自操盘，全程串行，完成一步才能做下一步。

现在的工作流：确认选题 → 把资料搜集、截图整理、数据摘要这类任务丢给 Agent 并行跑 → 我去判断方向、写核心观点 → Agent 整理结果给我验收 → 发布。

中间那段时间，Agent 在跑，我可以放一个深度任务进来，比如读书、想清楚某个产品判断、处理另一条业务线的阻塞。

这背后的逻辑很简单：任务从串行变成了并行流动。

AI 是干活的那个人，我相当于项目经理。项目经理的价值，是决定做什么、分配谁做、什么标准算完成、哪里有阻塞要介入。项目经理不应该自己去搬砖。

人的价值，从"亲手完成每件事"，变成了"决定什么值得做、谁来做、做到什么标准"。

**AI 时代的时间利用率提升，来自更多任务同时在路上，而不是更长的工作时间。**

一旦想清楚这一点，你看待任务清单的方式就会变：清单里的事，哪些必须我做，哪些可以 Agent 做，哪些是我来验收？这三个问题，比"今天有多少件事"重要得多。

03 滴答清单的角色：控制塔

​

很多人用滴答清单当备忘录，记了一堆事，看到就焦虑，完成率极差。

我现在把它当控制塔用，逻辑变了。

每个任务进清单前，我会想三件事：这件事该谁做？人做还是 Agent 做？什么时候回报结果，验收标准是什么？

能 Agent 做的，任务描述里写清楚目标和边界，然后分出去。需要我深度投入的，给一个专注时段。需要我验收的，标注一个 check-in 节点。

看昨天的完成任务分类：IP 自媒体 3 个、出海基建优化 3 个、杂事 2 个、领航计划 2 个、财务 1 个。五条业务线同时在走，每条都有推进。

任何一条单独看都不算大，但加在一起，这是一个多线程创业者该有的一天的样子。做到这个，不是因为效率更高，是因为执行层有人在撑着。

**任务管理的关键动作，从"怎么让自己完成更多"，变成了"怎么让更多任务同时在跑"。**

04 Hermes + MCP：让任务系统长出手

​

Hermes 是我日常用的 Agent 系统，它支持通过 MCP（Model Context Protocol）连接外部工具服务器，让 Agent 能操作 GitHub、数据库、文件系统、浏览器，以及任何包了 MCP 接口的服务。

Hermes 会在启动时自动发现和注册 MCP 工具，工具名用 `mcp_<服务名>_<工具名>` 的格式命名，避免和内置工具冲突。每个 server 可以单独配置只暴露哪些工具，不用把所有权限都给 Agent。

![[笔记同步助手/images/419daa7e43f0a6ab8227bdc039efbd54_MD5.png]]

顺带说一下滴答清单 MCP。滴答清单已经有官方帮助文档，接入方式、服务器地址和授权方式都写得很清楚。MCP 服务器地址是 [https://mcp.dida365.com](https://mcp.dida365.com)，支持 Streamable HTTP 远程传输协议，也支持 OAuth 和 Bearer Token 授权。

![[笔记同步助手/images/c4d582a47a164b6756ee2d727534d1e7_MD5.png]]

官方文档里写得很直接：接入后，AI 助手可以读取、创建和管理任务，成为专属「任务管家」。它还给了 Claude Desktop、ChatGPT、Claude Code、Cursor、VS Code、Codex 等客户端的连接方式。这说明任务系统接入 AI，已经从折腾派的小众玩法，进入主流产品能力。

这个方向有意思的地方在于：滴答清单从一个人看的清单，变成了 Agent 可以读取、执行和回报的接口。Agent 可以拉今日任务，创建任务，更新完成状态，管理清单、习惯和专注记录，而不需要我亲自打开 app。

MCP 在这里充当的是任务系统和执行层之间的接口。人在清单里写任务、看进度；Agent 通过接口拿任务、汇报结果。这才是让控制塔真正"长出手"的方式。

05 真实的一天怎么跑

​

具体来说，我的工作日大概是这样走的：

早上梳理任务，分成三类：人来做、Agent 来做、人验收。能分出去的分出去，分不出去的估一个专注时段，放进番茄钟。

然后并行开启：Agent 的任务在后台跑，我进入第一个深度时段。昨天的专注明细里：看会计入门书 28 分钟，Hermes 磁盘排障 51 分钟，skill 机制确认 25 分钟，定时任务修复 25 分钟。这些里面，有些是我必须亲自做的判断，有些是 Agent 做完后我在确认结果、补漏洞。

![[笔记同步助手/images/4e268cc4c560bea00261ba516ae36d52_MD5.jpg]]

昨天累计专注 3h45m，这段时间里，Agent 同时在跑的任务包括自媒体内容创作、代码问题排查、工具站数据维护等。人的深度时间没有消失，被重新安排了——我做只有我能做的那些事，其他的交出去。

**check 节奏很重要。** 任务开了、分出去了，要定时回来看：进度对不对，卡在哪里了，结果够不够用，有没有需要我介入的判断。项目经理如果不 check，团队等于没有管理。

我的节奏大概是：开始前确认任务边界，中途看一次状态，完成后验收，出问题随时介入。不是开了 Agent 就可以放羊。

06 风险和边界

​

有几件事要说清楚。

Agent 会犯错。写错路径、判断跑偏、漏掉边界条件，这些都发生过。不能把 Agent 的输出直接当结论，必须验收。

滴答官方有 MCP，但接入前仍然要看清楚授权方式、token 存储方式、API 调用限制，也要测一下异常情况下的行为。建议先从读取、创建任务、更新状态这几类操作开始，删除和批量操作谨慎开放。改错了麻烦，风险要控制住。

还有一个心理陷阱：用了 Agent 之后，人会倾向于开启更多任务。任务列表越来越长，失控的速度也越来越快。

所以控制塔的逻辑，得一直在。任务进来要拆清楚，分出去要跟踪，验收完才算完成。开启更多任务，前提是管得住。

**人是项目经理，但项目经理失职，整个团队就乱套了。**

我现在跑一人公司，同时维护多条业务线，靠自律全部亲自执行是不可能的。滴答清单帮我看清任务全貌，Hermes 帮我跑执行层，MCP 是两者之间的接口。

工具都摆在那里。继续把自己当执行机器，还是把 AI 当团队，这是一个主动的选择，跟工具够不够好没有太大关系。

如果今天看完只想试一件事：打开你的任务清单，把今天的任务里，哪些可以交给 AI 做、哪些是只有你能做的，区分一下。

光是这一步，已经跟大多数人不一样了。

🚀 想要与更多AI爱好者交流，共同成长吗？

[和一群志同道合的人，持续精进 AI 的每一天](https://mp.weixin.qq.com/s?__biz=Mzk0ODM5NTEyNA==&mid=2247500204&idx=1&sn=8623ff02362512fb3c63cc6d183a9793&scene=21#wechat_redirect)

![[笔记同步助手/images/95563c8a23a1b8b67cdef433c8313a0f_MD5.jpg]]

📚 精选文章推荐

​

-   [Hermes 升级后，我的 Telegram 附件突然发不出来了](https://mp.weixin.qq.com/s?__biz=Mzk0ODM5NTEyNA==&mid=2247505991&idx=1&sn=cde00c3bf18616e4713cfda08652bdea&scene=21#wechat_redirect)
    
-   [DeepSeek V4 上线火山方舟：Agent Plan 和 Coding Plan 都能用了](https://mp.weixin.qq.com/s?__biz=Mzk0ODM5NTEyNA==&mid=2247505982&idx=1&sn=fbd4c7f20ede545681eef1338c9e2c5c&scene=21#wechat_redirect)
    
-   [光会写提示词，用不好 AI Agent](https://mp.weixin.qq.com/s?__biz=Mzk0ODM5NTEyNA==&mid=2247505980&idx=1&sn=a21e9cd06deb695a4314ea08bcc73677&scene=21#wechat_redirect)
    
-   [我把多 Agent 协作搬进 Hermes Kanban，才发现群聊派活真的不够用了](https://mp.weixin.qq.com/s?__biz=Mzk0ODM5NTEyNA==&mid=2247505962&idx=1&sn=6322706214ec38fcfec146aa666e0df2&scene=21#wechat_redirect)
    
-   [两个免费工具站月访 118 万，它们到底靠什么赚钱？](https://mp.weixin.qq.com/s?__biz=Mzk0ODM5NTEyNA==&mid=2247505952&idx=1&sn=801d59f87168771cbeedf333fb96a636&scene=21#wechat_redirect)
    
-   [ShipSolo 上线：我最近在帮学员把 AI 编程变成出海产品](https://mp.weixin.qq.com/s?__biz=Mzk0ODM5NTEyNA==&mid=2247505941&idx=1&sn=2509617bc6b9b7e19256fb82c628857d&scene=21#wechat_redirect)
    
-   [程序员创业半年：顺的事、不顺的事，和我一直没想清楚的事](https://mp.weixin.qq.com/s?__biz=Mzk0ODM5NTEyNA==&mid=2247505930&idx=1&sn=a0ea9a54481e7914e0efcd9eb00bb20a&scene=21#wechat_redirect)
    
-   [DeepSeek-V4-Pro 写代码到底行不行？我拿 GLM-5.1 跟它硬碰硬比了一轮](https://mp.weixin.qq.com/s?__biz=Mzk0ODM5NTEyNA==&mid=2247505920&idx=1&sn=63a29df56c8d87a5bc92ae8c25a531b3&scene=21#wechat_redirect)
    
-   [我把 Hermes 里的模型几乎测了一遍，得出一个很扎心的结论：越贵的，往往越强](https://mp.weixin.qq.com/s?__biz=Mzk0ODM5NTEyNA==&mid=2247505890&idx=1&sn=1b9cab00f4438d43ca57266af233ae08&scene=21#wechat_redirect)
    
-   [hermes101.dev 上线了！5 分钟装完、7 天入门、OpenClaw 老用户无痛迁移](https://mp.weixin.qq.com/s?__biz=Mzk0ODM5NTEyNA==&mid=2247505880&idx=1&sn=f1a5297d812535a2bffac2d7e0d7a9b0&scene=21#wechat_redirect)
    

---

![[笔记同步助手/images/b457d5dc3509ad0f3cef0a7433edeb0a_MD5.jpg|cover_image]]

原创 孟健的AI编程认知 孟健AI编程

---

内容效果不满意？[点此反馈](https://feedback.notebooksyncer.com/feedback/37a55980_1779802130750?u=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzk0ODM5NTEyNA%3D%3D%26mid%3D2247506000%26idx%3D1%26sn%3D20550e5667180d614ad77e089af5441f%26chksm%3Dc2833bff63acf9b5d61ac65e8004794959be8e58215177317c3cfb98b66f20fb7daa38c9b312%26mpshare%3D1%26scene%3D1%26srcid%3D0526iAGU3nWUOejAxcm0S2t9%26sharer_shareinfo%3D4d90158fae80d1887eefec61250d03fe%26sharer_shareinfo_first%3D4d90158fae80d1887eefec61250d03fe%23rd&s=obsidian)