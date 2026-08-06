---
author: 彭少
source: 微信公众号
url: https://mp.weixin.qq.com/s?__biz=Mzg3NzU2NjY3OQ==&mid=2247491736&idx=1&sn=193cb5e9c52de3ad05fe816b71125482&chksm=ce1a46aa97249b553263374c57cfec1b2dad599a9dd9be43ca1a830a5c4838cf7bac9de75ac8&mpshare=1&scene=1&srcid=0526zzTxGElRRVYmSWtny7UB&sharer_shareinfo=f304446bad1b7994b6800002249e80d1&sharer_shareinfo_first=f304446bad1b7994b6800002249e80d1#rd
saved: 2026-05-26 21:28:05
tags:
  - 笔记同步助手
id: 891cd94a-e801-495a-aa09-e31b188aca0b
---

公众号名称：彭少

作者名称：彭少

发布时间：2026-05-26 17:38

原文链接：[https://l0aerbtrigp.feishu.cn/wiki/WKagwkl4Ai7kf1kdHvfcUironPe?from=from\_copylink](https://l0aerbtrigp.feishu.cn/wiki/WKagwkl4Ai7kf1kdHvfcUironPe?from=from_copylink)

**点击上方卡片关注我**

**设置星标 学习更多AI出海知识**

最近看到一个小工具，读书党有福了，微信读书推出了官方 Skill，可以让 AI Agent 接入你的微信读书数据。

它的价值不是让 AI 替你读书，而是让 AI 基于你真实读过什么、你的划线内容、最近读了多久来帮你整理和复盘。这个区别还挺重要的。

![[笔记同步助手/images/77bf139ad8f7ced7647bafc45abdca52_MD5.png]]

## 如何安装

把下面这一段指令发送给你的AI 助手 就可以自动安装了。

`npx skills add Tencent/WeChatReading -g`

![[笔记同步助手/images/99b800aefdfd8a4b7f69a8e15c48d197_MD5.png]]

## 它能拿到哪些数据

从目前公开的能力来看，这个 Skill 可以做的事情不少。

它可以搜索书籍、查看书籍信息和阅读进度，也可以读取你的书架。

可以查看某本书里的个人笔记和划线，还能获取阅读统计数据，比如阅读时长、阅读天数、偏好分类、读得最多的书等等。

如果你平时用微信读书比较多，这些数据其实很有价值。

以前它们只在你的微信读书app里面，现在接入 AI Agent 以后，这些数据可以被统一调出来，再由 AI 帮你整理成更容易复用的内容。

![[笔记同步助手/images/ce4d8c6b6b8fd362c150052046c37cbd_MD5.png]]

## 最直接的用法：整理划线和读书笔记

第一个场景就是整理划线。

很多人读书时都会划线，但划完之后很少再看。时间一久，微信读书里就堆了很多“当时觉得有用”的句子，真正写文章、做分享、复盘项目时，反而想不起来。

有了这个 Skill，可以直接让 AI 拉取某本书里的划线和想法，再按主题整理成一篇读书笔记。

比如读《置身事内》，可以让 AI 把划线拆成“地方政府”“土地财政”“产业政策”“招商引资”几个主题，然后每个主题下面保留关键划线，再补一段自己的理解。

这样整理出来的笔记，比单纯让 AI 总结一本书更实用，因为它基于的是你真正读过、划过、有感悟的内容。

可以直接这样问：

```
帮我导出《XXX》这本书的划线和想法，按主题整理成一篇读书笔记。不要泛泛总结，只保留我真正划过的内容。
```

## 还能分析你的阅读习惯

第二个比较有意思的场景，是让 AI 分析阅读统计。

微信读书本来就有阅读时长、阅读天数、偏好分类这些数据。接入 Skill 后，可以让 AI 帮你看最近一个月读了多久、主要读了哪些类型的书、有没有明显喜好。

这类分析有时候会比自己的感觉更诚实。

你可能以为自己最近一直在读商业和产品，结果统计一拉出来，发现大部分时间都花在小说和历史上。也可能你觉得自己最近没怎么读书，但实际每周碎片时间加起来已经不少了。

这个场景适合做月度阅读复盘，或者年底做阅读总结。

可以这样问：

```
根据我最近 30 天的阅读统计，分析一下我的阅读习惯，包括阅读时长、偏好主题、可能的知识盲区。
```

![[笔记同步助手/images/a2a577b9bfc35c7a0364d1607f975752_MD5.png]]

## 把书架变成个人知识库入口

第三个场景，是盘点书架。

书架其实很能反映一个人的长期兴趣。

现在可以让 AI 读取书架后，按主题帮你分类，比如 AI、产品、商业、心理学、历史、小说。

这个对做内容的人很有用。因为很多文章素材不是从热点里来的，而是从长期阅读、工作问题和反复出现的兴趣里出来的。

可以这样问：

```
帮我查看微信读书书架，把我的书按主题分成 5 类，并指出我最近阅读最集中的方向。
```

或者：

```
帮我从书架里找 5 本适合继续深入读的书，并说明推荐理由。
```

## 和 AI 讨论一本书，而不是让 AI 替你总结

我觉得这个 Skill 更好的用法，不是让 AI 生成一篇“某某书精华总结”。

这种总结网上太多了，而且很多都很空。真正有价值的是AI 可以基于你的划线和想法，继续追问你。

比如你刚读完一本书，可以让 AI 看你的划线，然后问它：

```
基于我在《XXX》里的划线，帮我提 5 个追问，帮助我把这本书和我的工作经验联系起来。
```

这时候 AI 就不只是一个总结工具，更像一个阅读陪跑。它可以帮你把“我觉得这段话有道理”，往前推一步，变成“这段话为什么打动我，它能解释我工作里的哪个问题，我能不能把它写进一篇文章里”。

这才是我觉得比较值得试的地方。

​

## 最后

微信读书这个 Skill，本质上是把个人阅读数据开放给 AI Agent 调用。

它不会替代阅读本身，也不会自动生成真正有判断力的读书笔记。AI 可以帮你整理划线、归类书架、分析阅读习惯、提出追问，但真正的理解还是要靠自己补上。

不过作为一个入口，它已经很有意思了。

如果你平时就用微信读书，可以试试把它接到 AI Agent 里。它最适合解决把已经读过、划过、想过的内容重新调出来，变成可以复盘和复用的素材。

相关链接：

-   微信读书 Skill 安装页：https://weread.qq.com/r/weread-skills
    
-   小众软件报道：https://www.appinn.com/weread-skills/
    

**欢迎关注，这个账号还会持续分享更多AI编程、出海工具、实战经验、踩坑记录。  
**

**想了解更多可以加我 vx: 257735 聊。**

![[笔记同步助手/images/3a677d9927787c9a67ec5ec0924a8572_MD5.png]]

[太牛逼，Codex 这波更新！可以放弃小龙虾和爱马仕了！](https://mp.weixin.qq.com/s?__biz=Mzg3NzU2NjY3OQ==&mid=2247491726&idx=1&sn=e7408117c41ee8826c623134e5989964&scene=21#wechat_redirect)

[想让 Claude Code 彻底完成一个任务，试试 /goal](https://mp.weixin.qq.com/s?__biz=Mzg3NzU2NjY3OQ==&mid=2247491579&idx=1&sn=f45e5d17a70641047124ff305d75c7cf&scene=21#wechat_redirect)

[Codex 这次跑进了 Chrome，AI 编码 Agent 的战场变了](https://mp.weixin.qq.com/s?__biz=Mzg3NzU2NjY3OQ==&mid=2247491539&idx=1&sn=deb24c520f3159d9857608386309adf9&scene=21#wechat_redirect)

[Claude Code 装上这个插件，我不用再当中间人了](https://mp.weixin.qq.com/s?__biz=Mzg3NzU2NjY3OQ==&mid=2247491506&idx=1&sn=4966f2518a58f96c36ee3fee577c7e18&scene=21#wechat_redirect)

[Mac mini 走起！手机随时随地AI编程，太爽了](https://mp.weixin.qq.com/s?__biz=Mzg3NzU2NjY3OQ==&mid=2247491349&idx=1&sn=0b49c445974b7f575f538f6f258118ca&scene=21#wechat_redirect)

[飞书开源CLI，我用Claude Code一句话读了12篇文档、建了66条选题表！](https://mp.weixin.qq.com/s?__biz=Mzg3NzU2NjY3OQ==&mid=2247491225&idx=1&sn=94d8167fa5672fc1b77f7477aee53990&scene=21#wechat_redirect)

[推荐一个牛逼免费的 markdown 工具！](https://mp.weixin.qq.com/s?__biz=Mzg3NzU2NjY3OQ==&mid=2247491174&idx=1&sn=f2f76899ec44c45c9cef98a8e5eb629a&scene=21#wechat_redirect)

[Google Stitch 2.0 太牛了！UI 丑的问题有救了](https://mp.weixin.qq.com/s?__biz=Mzg3NzU2NjY3OQ==&mid=2247491164&idx=1&sn=b13843862a6efa78d7e87624f3d77f1a&scene=21#wechat_redirect)

[我们出海社区终于有自己的网站了！](https://mp.weixin.qq.com/s?__biz=Mzg3NzU2NjY3OQ==&mid=2247490919&idx=1&sn=975a80f7a8f8805296fc917b6c18b89c&scene=21#wechat_redirect)

​

**[从海外公司注册到 Stripe 收款，跑通了出海收付款全流程（实操分享）](https://mp.weixin.qq.com/s?__biz=Mzg3NzU2NjY3OQ==&mid=2247489551&idx=1&sn=08058b274add835f37b3374fa43b6757&scene=21#wechat_redirect)**

---

![[笔记同步助手/images/fa48050840ecc068756080bec1d247b4_MD5.jpg|cover_image]]

Original 彭少 彭少

Read more

---

内容效果不满意？[点此反馈](https://feedback.notebooksyncer.com/feedback/6e48f2c2_1779802082360?u=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzg3NzU2NjY3OQ%3D%3D%26mid%3D2247491736%26idx%3D1%26sn%3D193cb5e9c52de3ad05fe816b71125482%26chksm%3Dce1a46aa97249b553263374c57cfec1b2dad599a9dd9be43ca1a830a5c4838cf7bac9de75ac8%26mpshare%3D1%26scene%3D1%26srcid%3D0526zzTxGElRRVYmSWtny7UB%26sharer_shareinfo%3Df304446bad1b7994b6800002249e80d1%26sharer_shareinfo_first%3Df304446bad1b7994b6800002249e80d1%23rd&s=obsidian)