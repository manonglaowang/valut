---
author: 苍何
source: 微信公众号
url: https://mp.weixin.qq.com/s?__biz=MzU4NTE1Mjg4MA==&mid=2247498675&idx=1&sn=bde91929a4adf1d97b1d72e55f24aff6&chksm=fc93c2550cffdec6fa3b42494b76eb3fdd92b2d9aa52ade75998bb16debed38184f8e2d43cbb&mpshare=1&scene=1&srcid=0601kN4nAvdDdiQV62XQiSkz&sharer_shareinfo=63be8c3021731863c619ebfa97832a07&sharer_shareinfo_first=63be8c3021731863c619ebfa97832a07#rd
saved: 2026-06-01 19:59:24
tags:
  - 笔记同步助手
id: d0bca715-413b-41da-8984-4c943b364d1e
---

公众号名称：苍何

作者名称：苍何

发布时间：2026-06-01 19:26

这是苍何的第 541 篇原创！

大家好，我是苍何。

我的产品 WeSight 在 4 月 8 号推出后，邀请码就被炒到了 999 元一个。

![[笔记同步助手/images/a6edf9d4efc0b191fc28dc3d25b03135_MD5.png]]

虽然感觉有点滑稽的，但当时的 WeSight 可见直击多少人的痛点。

但它是不"光明的"，"上不了台面的"，于是我主动关停了这个项目。

在认真思考了一个月后，我在 5.1 号决定重启 WeSight 这个项目，让她能堂堂正正的可以和大家见面。

在长达一个多月的开发后，今天我想把 WeSight 作为儿童节礼物，送给大家。

**WeSight 今天正式开源，全新的功能，全新的入口。**

![[笔记同步助手/images/d5145d84781670f7986fe9592143f30a_MD5.png]]

官网的话同样是原先的官网，只是她将是全新的身份。

![[笔记同步助手/images/8516ad70151b3b2487b983455e6688d3_MD5.png]]

WeSight 现在是一个开源桌面 AI Agent 控制台。它可以安装或复用 Claude Code、Codex、OpenClaw、Hermes Agent、OpenCode、Qwen Code、DeepSeek-TUI 和内置 Agent runtime，

![[笔记同步助手/images/d1c2943ad1a90ae107b32d8afd07526b_MD5.png]]

把它们统一到一个可视化工作台里，覆盖对话、工具、文件、IM 通道、技能、模型供应商、运行监控和桌面宠物工作流。

**一个入口，管理你的所有 Agent。**

![[笔记同步助手/images/589342dde31e2d35047fa6ae7af3b817_MD5.png]]

你可以把你的 Claude Code、Codex、OpenClaw、Hermes Agent、OpenCode、Qwen Code 都交给 WeSight，它会帮你统一调度，统一管理。

![[笔记同步助手/images/d350a691397295d74d36892f49b29f08_MD5.png]]

WeSight 把 Claude Code、Codex、OpenClaw、Hermes Agent、OpenCode 等作为内置引擎，可以完全代理你的本地 Agent。

能帮你自动检测本地 Agent 环境，也可以一键帮你安装 Claude Code、Codex 等。

![[笔记同步助手/images/123064c8301e97ae469c4200ddea14f2_MD5.png]]

你甚至不需要在终端打开 Claude Code、Codex，你也无需再装个 cc-switch 来配置模型，WeSight 能帮你监测配置本地模型。

![[笔记同步助手/images/579014bc7608475299913f8957953360_MD5.png]]

你只需要新建任务，选择想要的引擎和模型就好了，WeSight 会帮你处理好任务。

![[笔记同步助手/images/e8e1d6fec58799f4f2c9c81632cbc4e9_MD5.png]]

特别是可以一键切换模型，我自己用着还蛮舒服的，不用每次再去打开一个新的软件切换模型了。

![[笔记同步助手/images/e71d38a442d7a82400fd20c11cbdb74a_MD5.png]]

当你把本地的 Agent 的模型选择交由 WeSight 统一管理，你会发现，更为丝滑，一个模型同样可以适配多个不同的 Agent，你不用去管你的 Claude Code 和 Codex 该怎么配置第三方模型。

![[笔记同步助手/images/da0fc90c9b3e33efb5f9e7f1cce28051_MD5.png]]

以前我写了很多关于 OpenClaw 或者 Hermes Agent 的多 Agent 解决方案，虽然写了教程，但还是不少人觉得有点麻烦。

一堆的配置，一堆的操作，根本不是普通人能快速上手的。

于是我在 WeSight 中定义了上层的 Harness，你可以选择不同的 Agent 也可以选择 Agent Team。

![[笔记同步助手/images/2762ae04e2fdbc7add3779fa8bc06559_MD5.png]]

拿开发团队为例，你可以为这个团队添加不同的 Agent，每一个 Agent 可以配置不同的引擎和模型，比如 Claude Code 引擎驱动的 Agent 作为产品经理，Codex 引擎驱动的 Agent 作为开发工程师。

![[笔记同步助手/images/a39416c221afbc2764bb0ebab1a168ca_MD5.png]]

你可以快速把这个 Agent 团队拉到一个任务里面，Agent Team 会参考人类 Team 的工作方式来进行协作，他们之间是可以互相通信的，但上下文是隔离的。

现在让你本地的 Claude Code、Codex 等 Agent 在飞书上控制，变得异常简单，你只需在在 WeSight 中简单完成绑定。

![[笔记同步助手/images/b46dc1f832853dec9105c398c1a69180_MD5.png]]

这里我设计了 2 个逻辑，一个是全全交给 WeSight 管理，你的 Claude Code 在飞书中的聊天对话就能直接在 WeSight 中显示。

![[笔记同步助手/images/057d830b5cfee730e6fd68206a271b20_MD5.png]]

但这个会受 WeSight 生命周期影响，比如 WeSight 关闭后，你就无法使用飞书来控制了，这对于像 OpenClaw、Hermes 这类的 Agent runtime 来说，有些时候会不方便。

所以，WeSight 也完全支持系统用户自行管理，什么意思呢，就是你在飞书中发送给 OpenClaw 这里的消息。

即使 WeSight 没启动，你也是可以正常使用的，WeSight 只是你的工作台，而非调度器，你的数据和使用权都还归属你本机。

![[笔记同步助手/images/719cfea5e6d7314e8fa610c40682951b_MD5.jpg]]

你可以看到我飞书同时连了本机的 OpenClaw、Hermes、Claude Code、Codex，他们可以受 WeSight 统一调度，也可以独立，但是 WeSight 会帮你把这些都配置好。

学 Codex，我给 WeSight 也加了桌面宠物，你也可以尽情玩耍。

![[笔记同步助手/images/c468413fc3dc633c415a3fdb692e3e1d_MD5.png]]

对于模型任务每次究竟使用多少 Token、TPS 是多少，上下文多少，耗时多少，我们往往是比较迷惑的。

所以 WeSight 加了运行监控的能力，他能对你本机所有 Agent 引擎做系统监控。

![[笔记同步助手/images/69b6de92a4d9b5a95803dd2d9b4023bb_MD5.png]]

也可以在单次任务做监控：

![[笔记同步助手/images/2bb55b2a99fa2b5e0899089b31da59e0_MD5.png]]

当然了，单次运行任务的运行概览你也能看到使用的技能、工具、文件变更和产出文件。

![[笔记同步助手/images/fbcc4ac5b77e766b44fa1e920cf98f11_MD5.png]]

学习 QClaw，我在每次对话中也加入了工作室的能力，你的 Agent 可以可视化看到他在办公室里面帮你干活，不同的 Agent 会有不同的效果。

![[笔记同步助手/images/3f3de7a5326b1d255b102054a539c57d_MD5.png]]

Skill 和 MCP 就没什么好说的，基本上该有的都有。

![[笔记同步助手/images/e6adfd74ed1d1032c84b16bbcbefcf0f_MD5.png]]

其实还有很多有意思的小细节的功能，可能需要你自己去慢慢探索了。

说实话，WeSight 现在就像一个刚出生的宝宝。

它有完整的骨架，有清晰的方向，但它还不够完美。

有些功能还在打磨，有些体验还需要优化，有些边界情况还没覆盖到。

但我觉得，开源的意义从来都是「让更多人一起定义什么是完美」，而非等到无懈可击才亮相。

这一个多月的独立开发，让我深刻体会到一件事：

**一个人可以走得很快，但一群人才能走得很远。**

所以今天，我把 WeSight 完整地交给社区。

如果你觉得这个方向有价值，欢迎去 GitHub 给个 Star，这对独立开发者来说，真的是最大的鼓励。

如果你有想法、有能力，更欢迎参与共建，提 Issue、提 PR，哪怕是一个小小的 typo 修复，都是这个项目向前走的一步。

最后，特别感谢有道龙虾（Lobster）开源项目。

WeSight 的整体框架基于有道龙虾构建，站在巨人的肩膀上，才能看得更远。开源世界最美好的地方就在于此，前人栽树，后人乘凉，而后人又可以把树种得更大。

我始终相信一句话：

**好的工具，就是让你少想一件事。**

WeSight 想做的，就是让你不再纠结该打开哪个终端、该配置哪个模型、该怎么让多个 Agent 协作。

你只需要专注于你的创意和想法，剩下的，交给 WeSight。

这条路还很长，但至少，第一步已经迈出去了。

感谢每一个愿意相信这个方向的人，这是 WeSight 的新 logo，希望你也能喜欢它。

![[笔记同步助手/images/6d2a9226e26a9b1dbfd862a41b27e70a_MD5.png]]

---

内容效果不满意？[点此反馈](https://feedback.notebooksyncer.com/feedback/e8a03366_1780315162461?u=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzU4NTE1Mjg4MA%3D%3D%26mid%3D2247498675%26idx%3D1%26sn%3Dbde91929a4adf1d97b1d72e55f24aff6%26chksm%3Dfc93c2550cffdec6fa3b42494b76eb3fdd92b2d9aa52ade75998bb16debed38184f8e2d43cbb%26mpshare%3D1%26scene%3D1%26srcid%3D0601kN4nAvdDdiQV62XQiSkz%26sharer_shareinfo%3D63be8c3021731863c619ebfa97832a07%26sharer_shareinfo_first%3D63be8c3021731863c619ebfa97832a07%23rd&s=obsidian)