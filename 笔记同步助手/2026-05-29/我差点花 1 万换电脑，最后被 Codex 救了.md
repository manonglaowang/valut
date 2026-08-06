---
author: 键盘说AI
source: 微信公众号
url: https://mp.weixin.qq.com/s?__biz=MzkzODE3MDUyNg==&mid=2247487552&idx=1&sn=6b15f549ab0e920911dfffdf473fbe81&chksm=c35a101b028496c2dfbac5e20dddc4e99d2097df4a9180bf7dda15a928da35bb38b10e2f3f39&mpshare=1&scene=1&srcid=0529VZdxXrk4x7FeqYWRxPAu&sharer_shareinfo=1bd9662966e991f32fe904605952a32a&sharer_shareinfo_first=e3ffa21b297e4fc8c1cf24d633800298#rd
saved: 2026-05-29 17:18:51
tags:
  - 笔记同步助手
id: 3e057ab8-23a1-4dcf-8548-01eb7e58ea12
---

公众号名称：键盘AI编程

作者名称：键盘说AI

发布时间：2026-05-29 16:59

大家好，我是键盘。

## 01 以为电脑老了，结果是我把它塞爆了

昨天晚上，我在用 Hermes 写东西，写着写着，微信突然弹窗，提示电脑内存不足，需要清理内存才能继续使用。那一瞬间，我下意识看了一眼磁盘占用——500G 的硬盘，已经用了 499G。

说实话，我当时已经开始看新电脑了。配置、价格、库存，我都翻了一遍。结果越看越心凉：想要的配置要 1w+，还得预约，短时间根本拿不到。

![[笔记同步助手/images/ffc601bb1483b4b3391146ad9ef00b41_MD5.png]]

那种感觉很真实：不是“想换”，是“感觉不得不换”。

可冷静下来以后，我又觉得不对。我平时就是写稿、跑工具、做智能体，这台电脑真的已经不行了吗？还是说，根本不是电脑的问题，而是我自己把它塞爆了？

于是我先没急着花钱，而是去看 Hermes 的磁盘空间。结果一查，37G。

![[笔记同步助手/images/6cf159e6d0a2f38eea5384a0e86d890c_MD5.png]]

一个写作工具，怎么能长这么大？

## 02 真正的罪魁祸首，不是文件，是缓存和临时垃圾

我立刻让 Codex 帮我排查。

![[笔记同步助手/images/48205b1fe8441dc9c5cabbae55f9d74f_MD5.png]]

很快，问题就出来了。

![[笔记同步助手/images/b04005a17fdae0faaadd8a36fff3aeeb_MD5.png]]

原来是我建了多个 profile，每个 profile 都会留下缓存、备份包和临时文件。看起来只是几个目录，实际往下一挖，空间一层层往外冒。

我继续追问。

![[笔记同步助手/images/439eae000a061460f6e3984e0e05ca02_MD5.png]]

![[笔记同步助手/images/ca758a92d37c1a1f35d76978d10ee7dc_MD5.png]]

这时候我才真正明白：很多时候，问题不是“东西多”，而是“东西没收拾”。看着像是系统变慢了、设备老了，实际上只是长期堆积的缓存和临时文件，把空间悄悄吃光了。

我继续让 Codex 往下查。

![[笔记同步助手/images/39c7e6c3af9518448cea7c9164dd8860_MD5.png]]

![[笔记同步助手/images/9d498e3f5f90e14fa2b03e0ed33e7db1_MD5.png]]

罪魁祸首终于找到了。一轮清理下来，直接删掉 31G 的垃圾。

![[笔记同步助手/images/3dd915015a0b2e1910ec5ac92be0d36b_MD5.png]]

![[笔记同步助手/images/89ac9d91756539b3c01f1575e96342d8_MD5.png]]

那一刻我特别有感觉：原来不是机器老了，是我把它养胖了。清完之后，Hermes 终于瘦身成功，空间从 37G 直接降到 3.7G。

![[笔记同步助手/images/230da83819f63330a3734efe8408323f_MD5.png]]

## 03 61G 缓存摆在眼前，清理也不能瞎删

我本来以为这件事就到这儿了，结果我又顺手想到：那我现在这台电脑里，是不是还有一堆缓存、临时文件、无用数据，也可以一起清？

于是我又直接问 Codex。

![[笔记同步助手/images/4b1e778ff0adca7a0408e6e274f88fe6_MD5.png]]

好家伙，又给我惊到了——61G 的缓存。

![[笔记同步助手/images/e6b07e3ead7b61d01dff44dfc75ff25d_MD5.png]]

这一次，我没有让它一股脑全删。因为我很清楚，清理不是越狠越好，关键是要知道哪些该留，哪些能动。比如微信数据，我就不让它删，因为我知道自己后面还可能用到。

![[笔记同步助手/images/bda59d251eaca89090c54478ea4ff829_MD5.png]]

![[笔记同步助手/images/d058ac111758e27b0009292d95388b57_MD5.png]]

![[笔记同步助手/images/6f987cf23ac2341cb79553fda831b0d1_MD5.png]]

最后一轮处理下来，硬盘从 499G 直接回到 271G，清掉了 100G 以上的垃圾数据。

![[笔记同步助手/images/f12dda116fe811de79f3b12c2af6a339_MD5.png]]

## 04 AI 真正厉害的，不是替你干完，而是先帮你看明白

这件事让我特别有感触。

以前我们遇到电脑卡、空间满，第一反应往往是：设备是不是不行了？要不要换新的？但现在我越来越觉得，AI 真正改变的，不只是写作、编程、剪视频这些“正事”，它连你生活里那些琐碎但麻烦的小事，也能帮你处理。

Codex 不只是一个写代码工具。它还可以帮我排查本地问题、分析目录占用、判断哪些文件能删、哪些不能动，甚至让我少花一万多去换一台新电脑。

很多时候，AI 最值钱的地方，不是替你做完，而是先帮你看明白。

你不知道该不该删的，先问 Codex。你不知道该怎么排查的，先问 Codex。你以为是设备问题的时候，先让 AI 帮你看一眼。

也许这就是 AI 真正进入日常工作的方式：不是炫技，是真正帮你省时间、省钱、也省一次冲动消费。

不是炫技，是救命。

好了，今天的分享就到此结束，咱们下回见！

如果觉得文章对你有用，**点赞、转发、推荐**

如果不想错过精彩内容，记得**关注 + 星标**

如果你对 AI 编程变现、OPC(一人公司)实战感兴趣，欢迎添加我的微信。

![[笔记同步助手/images/176bc1f9d2063f8559688e0241b9cef0_MD5.png]]

---

![[笔记同步助手/images/d71b6f768bd0948a580cd33fa55e1799_MD5.jpg|cover_image]]

Original 键盘说AI 键盘AI编程

---

内容效果不满意？[点此反馈](https://feedback.notebooksyncer.com/feedback/2c552ee2_1780046329990?u=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzkzODE3MDUyNg%3D%3D%26mid%3D2247487552%26idx%3D1%26sn%3D6b15f549ab0e920911dfffdf473fbe81%26chksm%3Dc35a101b028496c2dfbac5e20dddc4e99d2097df4a9180bf7dda15a928da35bb38b10e2f3f39%26mpshare%3D1%26scene%3D1%26srcid%3D0529VZdxXrk4x7FeqYWRxPAu%26sharer_shareinfo%3D1bd9662966e991f32fe904605952a32a%26sharer_shareinfo_first%3De3ffa21b297e4fc8c1cf24d633800298%23rd&s=obsidian)