---
author: sitin
source: 微信公众号
url: https://mp.weixin.qq.com/s?__biz=Mzg3NzU2NjY3OQ==&mid=2247491726&idx=1&sn=e7408117c41ee8826c623134e5989964&chksm=cee39c945af699089a322e5cc344584e6f0f05f22ff439910cb6335d19ff8539753daa7f206f&mpshare=1&scene=1&srcid=0526uDINPLpLuX5u8E6qo7A2&sharer_shareinfo=653ddfe7f368788a28309acf5c80a33a&sharer_shareinfo_first=653ddfe7f368788a28309acf5c80a33a#rd
saved: 2026-05-26 21:28:03
tags:
  - 笔记同步助手
id: add3ec72-1ac2-4899-960a-6a3a4fb65f41
---

公众号名称：彭少

作者名称：sitin

发布时间：2026-05-25 20:56

Codex 手机端连接这件事，前面其实已经写过了。

我今天再看了一遍 OpenAI 官方 release notes，真正值得单独拎出来讲的，是 5 月 21 日这一波更新。

这不是单纯多了几个按钮。

它说明 Codex 正在从“帮你写代码的聊天框”，往“能理解上下文、带着目标跑流程、能被远程监督的 AI 工位”演进。

![[笔记同步助手/images/aef0ef9d1ca532019b98606c0cc1ebf9_MD5.png]]

官方这次列了 5 个点：Appshots、Goal mode、浏览器批注、locked computer use、browser use improvements。

![[笔记同步助手/images/94d96ba07d2a716b017da9bec81bc820_MD5.png]]

## 1\. Appshots：少写背景，让它直接看现场

以前我们让 AI 改一个页面、看一个报错、理解一个设置面板，经常要写一大段背景。

比如“左边那个按钮有点歪”“弹窗遮住了图表”“这个窗口里第二行参数不对”。

这些话写出来都很别扭。

Appshots 做的事情很简单：在 Mac 上把当前 app 窗口发给 Codex，里面包括截图和可读取文本。

这意味着 Codex 不只是读代码，它开始能读你正在看的工作现场。

![[笔记同步助手/images/796509994808f490853f3c7e2ccf36b3_MD5.png]]

这个能力对前端、桌面软件、调试工具尤其有用。

很多时候，AI 缺的不是智商，而是现场感。

​

## 2\. Goal mode：从“帮我改改”变成“按目标交付”

这次 Goal mode 也正式扩到 Codex app、IDE extension 和 CLI。

我觉得这是这次更新里最重要的一个点。

以前我们给 AI 发任务，常见说法是“帮我优化一下这个页面”“把这个 bug 修一下”。

这种 prompt 最大的问题是没有验收标准。

Goal mode 的核心，是让你定义 outcome 和 success criteria。

比如：迁移到 TypeScript，严格模式能编译通过，不允许出现显式 any；或者修复移动端布局，375px 宽度下按钮不能溢出。

![[笔记同步助手/images/7050f64273941f1109fe035e1ab3f53b_MD5.png]]

这就不是闲聊了。

它更像给一个人安排任务：目标是什么、完成标准是什么、做到什么程度算结束。

AI 编程下一阶段，拼的不是谁会写更玄的 prompt，而是谁更会定义任务终局。

​

## 3\. 浏览器批注：前端反馈开始变短

前端问题最怕纯文字描述。

你说“这个卡片不协调”，AI 可能不知道你指的是高度、留白、阴影，还是按钮位置。

这次 in-app browser annotations 就是为这个场景准备的。

你可以在 Codex 内置浏览器里打开页面，直接圈出某个按钮、某个区域，然后让它改。

![[笔记同步助手/images/0d7656b39671d79d83e18d8d0babe0f8_MD5.png]]

![[笔记同步助手/images/14ed77b8e7c158e703ec3d27668cb1ab_MD5.png]]

官方这次还提到 browser use improvements，包括高级批注模式、更快的资产提取、只读 JavaScript context、标签页分组可用性、减少 Chrome 扩展标签页干扰，以及可靠性提升。

这些都不是大词，但很实用。

因为 AI 写前端，真正耗时间的不是生成第一版，而是来回指出“哪里不对”。

​

## 4\. 锁屏执行：它要跑更长的任务

![[笔记同步助手/images/7e75ba6e5c63ec42695017bb226853dd_MD5.png]]

简单说，Mac 锁屏以后，在你开启权限的情况下，Codex 仍然可以通过 Computer Use 继续处理任务。

官方也强调，这不是通用远程解锁，而是给 Codex 当前任务用的受限能力。

![[笔记同步助手/images/a10ae69fe54887de23ab44419e66b7bc_MD5.png]]

这个点很关键。

AI 以前经常像一个“你盯着它才干活”的实习生。

锁屏执行、手机远程审批、host 保持唤醒这些能力放在一起，就说明 OpenAI 想让 Codex 跑更长的任务。

比如复现桌面 App bug、跑浏览器测试、看页面、执行命令、等你手机上批准下一步。

​

## 5\. 手机端只是入口，host 才是工位

手机端我前面不展开了，因为这部分之前已经讲过。

但把 5 月 14 日的 mobile preview 和 5 月 21 日这波更新连起来看，逻辑就很清楚了。

手机不是一个新 IDE，它更像方向盘。

真正干活的是 host：你的 Mac、Mac mini，或者 devbox。

![[笔记同步助手/images/36d59028e20d2587a53460ccee1a6d0a_MD5.png]]

项目文件、凭据、权限、插件、浏览器环境、本地工具，都在 host 上。

你在手机上做的是监督、审批、纠偏。

这个模式和远程桌面不一样。

远程桌面是你在操作电脑。Codex 这个模式是 AI 在电脑上干活，你在关键节点接管方向。

​

## 官方视频素材

OpenAI Developers 有几条 Codex 官方视频，可以作为这篇的延伸素材。

​

> 📹 此处为视频内容（vid: wxv\_4530510902558638081），未能直接提取，请前往原文查看：[在公众号原文中观看](https://mp.weixin.qq.com/s?__biz=Mzg3NzU2NjY3OQ==&mid=2247491726&idx=1&sn=e7408117c41ee8826c623134e5989964&chksm=cee39c945af699089a322e5cc344584e6f0f05f22ff439910cb6335d19ff8539753daa7f206f&mpshare=1&scene=1&srcid=0526uDINPLpLuX5u8E6qo7A2&sharer_shareinfo=653ddfe7f368788a28309acf5c80a33a&sharer_shareinfo_first=653ddfe7f368788a28309acf5c80a33a#rd)

Introducing the Codex app：  
https://www.youtube.com/watch?v=HFM3se4lNiw

​

> 📹 此处为视频内容（vid: wxv\_4530511606933504004），未能直接提取，请前往原文查看：[在公众号原文中观看](https://mp.weixin.qq.com/s?__biz=Mzg3NzU2NjY3OQ==&mid=2247491726&idx=1&sn=e7408117c41ee8826c623134e5989964&chksm=cee39c945af699089a322e5cc344584e6f0f05f22ff439910cb6335d19ff8539753daa7f206f&mpshare=1&scene=1&srcid=0526uDINPLpLuX5u8E6qo7A2&sharer_shareinfo=653ddfe7f368788a28309acf5c80a33a&sharer_shareinfo_first=653ddfe7f368788a28309acf5c80a33a#rd)

Automate tasks with the Codex app：  
https://www.youtube.com/watch?v=xHnlzAPD9QI

​

> 📹 此处为视频内容（vid: wxv\_4530512206400077826），未能直接提取，请前往原文查看：[在公众号原文中观看](https://mp.weixin.qq.com/s?__biz=Mzg3NzU2NjY3OQ==&mid=2247491726&idx=1&sn=e7408117c41ee8826c623134e5989964&chksm=cee39c945af699089a322e5cc344584e6f0f05f22ff439910cb6335d19ff8539753daa7f206f&mpshare=1&scene=1&srcid=0526uDINPLpLuX5u8E6qo7A2&sharer_shareinfo=653ddfe7f368788a28309acf5c80a33a&sharer_shareinfo_first=653ddfe7f368788a28309acf5c80a33a#rd)

Multitasking with the Codex app：  
https://www.youtube.com/watch?v=9ohXlkbXiM4

​

## 我的判断

这次 Codex 最近 3-4 天的更新，不要只看功能名。

真正的变化是：它在补齐一个 AI 工位需要的东西。

Appshots 解决现场上下文。

Goal mode 解决任务终局。

浏览器批注解决视觉反馈。

锁屏执行和手机审批解决长任务监督。

所以以后拉开差距的，不是“你会不会打开 Codex”。

而是你有没有一套自己的 AI 工作系统：哪些任务可以交给它跑，验收标准怎么写，哪些命令可以自动批准，哪些节点必须等你看一眼。

取法乎上，得乎其中。你把 Codex 当聊天框，它就是聊天框；你把它当一个 AI 工位，它才可能真的开始替你跑事。

往期：[Codex 牛逼：MacBook 接管 Mac mini 黑科技](https://mp.weixin.qq.com/s?__biz=MzkzNzYyMTMyOQ==&mid=2247494154&idx=1&sn=25fd27597e7d772ffd3083a4c9042c64&scene=21#wechat_redirect)

  

---

资料来源：OpenAI Help Center、OpenAI 官方 Blog、OpenAI Developers Codex docs、OpenAI Developers Codex Videos。

前 Python 程序员，现在做 AI 编程出海方向的创业。

-   • 需要 AI 生图/生视频？ → HiAPI.ai，新人 50 张gpt image2 免费
    
-   • 想聊 AI、独立开发、副业？ → 加微信 257735，备注【AI】
    

---

![[笔记同步助手/images/be39fb3a47aa719db0ab01eef40a7695_MD5.jpg|cover_image]]

sitin 彭少

---

内容效果不满意？[点此反馈](https://feedback.notebooksyncer.com/feedback/898aa903_1779802081314?u=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzg3NzU2NjY3OQ%3D%3D%26mid%3D2247491726%26idx%3D1%26sn%3De7408117c41ee8826c623134e5989964%26chksm%3Dcee39c945af699089a322e5cc344584e6f0f05f22ff439910cb6335d19ff8539753daa7f206f%26mpshare%3D1%26scene%3D1%26srcid%3D0526uDINPLpLuX5u8E6qo7A2%26sharer_shareinfo%3D653ddfe7f368788a28309acf5c80a33a%26sharer_shareinfo_first%3D653ddfe7f368788a28309acf5c80a33a%23rd&s=obsidian)