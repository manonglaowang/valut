---
author: 刘小排
source: 微信公众号
url: https://mp.weixin.qq.com/s?__biz=MzI1MTUxNzgxMA==&mid=2247502156&idx=1&sn=95817eea758fc9078f96ff02f6829b00&chksm=e82764a64d4126f4c01d9104c1fc42118723e807d637af1ab372500bf977ae29453a6cbfa51e&mpshare=1&scene=1&srcid=052931QgRvGymJuYVdNsgBM2&sharer_shareinfo=7b842009b346977954a949d25c327d40&sharer_shareinfo_first=7b842009b346977954a949d25c327d40#rd
saved: 2026-05-29 09:31:43
tags:
  - 笔记同步助手
id: 28ed02e0-8d62-4477-8cb9-44e91b7a2cbd
---

公众号名称：刘小排r

作者名称：刘小排

发布时间：2026-05-29 02:47

今天朋友圈又被刷屏了：Claude Opus 4.8 发布，标题一片“炸裂”“碾压”。

但有意思的是，我去翻**Anthropic 官方博客，他们自己用的词是 modest—— 这是一次温和的、不大的更新。**

这个反差就尴尬了：离它最近、最该吹的厂商反而最克制，离它最远、最该客观的中文自媒体反而最亢奋，测都不测，就开始吹“炸裂”。

我找到了一个非常不体面的行为，很难想象Anthropic会这么做，但是它真的这么做了。

Anthropic 官方对比表里写 GPT-5.5 是 78.2%（没错，GPT-5.5已经比Opus 4.8的74.6%更高），但是！！往下翻一翻，翻到脚注，Anthropic自己承认—— **GPT-5.5 换成自家的测试框架跑，是 83.4%。**

**同一个模型、同一场考试，换个考场就差5分。**

**为了拉低竞争对手GPT-5.5的评分，Anthropic特意为GPT-5.5设计了一个考场。**

要脸吗？

Opus 4.8 那张跑分的大表我根本不想贴。因为真正的信息不在那张被疯转的大表里，在没人看的脚注里。

很有意思——至今没有任何一个中文AI自媒体注意到这一点。 这个圈子到底有多浮躁，不言而喻。

![[笔记同步助手/images/b296f507f8788672bb5845715c33933b_MD5.png]]

洗洗睡吧，我们只不过是再看一场大型的跑分表演而已。

✵

不过，说点客观的。挤牙膏归挤牙膏，这次Opus 4.8有几个改动，我认为是实在的：

**❶ Opus 4.8多了思考强度"Effort" 开关，**你可以自己决定它这次思考得深还是浅。Opus 4.7 最被吐槽的就是——明明你才是花钱的甲方，乙方却能自己决定今天要认真思考还是要敷衍你。现在这个决定权交回到你手里了。

![[笔记同步助手/images/5586b94e4120ad5b10c5ce681b680676_MD5.png]]

➋ **Claude Code 加了 dynamic workflows，**理论上能在一个任务里一口气拉起几百个子Agent 并行干活，最后自己核验结果。我还没测试出来几百个子Agent的情况，不过它确实还挺能卷自己的，比之前的Opus 4.7版本省心了很多。

![[笔记同步助手/images/4a3c12c1027f5dea28c33baf108a773c_MD5.png]]

**➌ Fast模式 2.5 倍速，价格只有上一代 fast 的三分之一。**挺好的，我这下Fast模式有点实用价值了。

![[笔记同步助手/images/0c598c6dd6bb29fbb948ab85f33db237_MD5.png]]

**➍****Opus 4.8写代码的能力的确比Opus 4.7强了些，**我认为它能和GPT-5.5打个平手，很接近。

**➎ Opus 4.7 那个“不太说人话”的老毛病，4.8 稍微缓解了一点** —— 下面两张对比图，你们自己感受一下。

这是Opus 4.7，我想说：一点也看不懂。

![[笔记同步助手/images/34dfa11e8940839c86172d1062e59031_MD5.png]]

这是Opus 4.8，呃，行吧，我能看懂超过一半了。

![[笔记同步助手/images/cb52ee43f842e4cb5a4ca1439fd7f2d1_MD5.png]]

关于“不说人话”的问题，Opus 4.8 也只是稍微缓解了一点，那种“我来给你最硬的一刀”的表达，在Opus 4.8里仍然会出现。 关于“说人话”，至今没有模型超过 Opus 4.6，可惜Opus 4.6已经永久下线了。

你测试Opus 4.8了吗？你怎么看？

---

![[笔记同步助手/images/392cf4672985252fa2bc0391a7772a53_MD5.jpg|cover_image]]

原创 刘小排 刘小排r

---

内容效果不满意？[点此反馈](https://feedback.notebooksyncer.com/feedback/71f5965c_1780018300339?u=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzI1MTUxNzgxMA%3D%3D%26mid%3D2247502156%26idx%3D1%26sn%3D95817eea758fc9078f96ff02f6829b00%26chksm%3De82764a64d4126f4c01d9104c1fc42118723e807d637af1ab372500bf977ae29453a6cbfa51e%26mpshare%3D1%26scene%3D1%26srcid%3D052931QgRvGymJuYVdNsgBM2%26sharer_shareinfo%3D7b842009b346977954a949d25c327d40%26sharer_shareinfo_first%3D7b842009b346977954a949d25c327d40%23rd&s=obsidian)