---
author: Jianer
source: 微信公众号
url: https://mp.weixin.qq.com/s?__biz=MzU2NTg0OTY4NA==&mid=2247489290&idx=1&sn=5b33232f379be5bb8bb50402365d5edc&chksm=fd136825ffb0fabc5154bd32097c190070a379e284c94d4b432f41b3bf917cc442fc897f4909&mpshare=1&scene=1&srcid=0531R8DOrmU4Bb5KPCX2mJjt&sharer_shareinfo=96b5abfb9dc22925ec1e1e3aee5543e8&sharer_shareinfo_first=96b5abfb9dc22925ec1e1e3aee5543e8#rd
saved: 2026-05-31 21:46:09
tags:
  - 笔记同步助手
id: 9171ca85-4b25-4b0d-a649-9aba5289fc0e
---

公众号名称：无线通信标准解读

作者名称：Jianer

发布时间：2026-05-31 20:30

无线通信工程师，在很多时候要查找和计算各种数值，比如频点、信道、功率换算等等。虽说近年来AI工具大量普及，方便了很多，但毕竟是不敢全信，而且对于复杂计算，效率也不一定很高。所以今天推荐几款R&S公司的实用小工具，可以在手机上直接安装使用。

![[笔记同步助手/images/fc18ca041d73e8cbb383502720d61108_MD5.png]]

01

—

dB Calculator

这款APP适用于IOS和Android。一看名称，就基本能清楚它的用途了。以下是APP的主界面，红框里面的两个最有用。

![[笔记同步助手/images/72d8d1d497399be1cbd75cd56a30586e_MD5.png]]

点进去看一下，首先Unit Converter的界面如下。这个好在你输任意一个数，其它的就都跟着出来了：dBm、dBW、mW、mV、V、dBV、dBuV、dBu。来对比一下阻抗是75Ω跟阻抗是50Ω，在1dBm情况下对应的电压的差别。

![[笔记同步助手/images/e0ab0e7618c92516622a1cb8fd8d0f7c_MD5.png]]

其他单位大家都比较熟知，dBu和dBV是怎么回事儿呢？来看下面的公式对比，dBV的参考电压是 1V，就是当信号电压等于 1V 时，就是 0dBV。1V、10V、0.1V 可以直接用 0dBV、20dBV、-20dBV 表示。而dBu的参考电压是 0.775V，信号电压等于 0.775V时，就是 0dBu。因此，由于参考电压不同，同一个电压值用 dBu 和 dBV 表示时，读数会有一个固定差值2.22dB。这个奇怪的 0.775V 源自早期电话系统。当时600Ω的阻抗上消耗1mW功率时，其两端的电压正好是 √(1mW \* 600Ω) ≈ 0.775V。所以dBu实际上是 dBm（以 1mW 为参考）在600Ω系统下的电压替代品，u 代表 unloaded（无负载），意思是它不再假设负载必须是 600Ω，只表示电压。

```
dBV = 20 * log10 ( V/1 V )；
dBu = 20 * log10 ( V/0.775 V )；
0 dBu = 0.775 V ≈ -2.22 dBV
```

此外，还可以同时计算三种电压：Vrms，Vpp，Vavg。所以RMS和AVG是有区别的，RMS是均方根值，而AVG在这是指绝对平均值，如果不加绝对的话，那平均值一定为0，看下面的公式：

绝对平均值：

![[笔记同步助手/images/fb7464f79149c9e03448e7b621d988c0_MD5.png]]

RMS均方根值：

![[笔记同步助手/images/32925b45b95d180db8529560cf85e3b1_MD5.png]]

![[笔记同步助手/images/2a2bdf1fac054338677776caf18a50e0_MD5.png]]

还提供了具体的计算公式，可以更好地理解概念：

![[笔记同步助手/images/1b05f8fad56bddff10e2e6ccd92eef08_MD5.png]]

将三种电压用图示表示如下：

![[笔记同步助手/images/5adbc49132bf2700f80b3936e8307006_MD5.png]]

然后是VSWR的计算转换也很实用，从上至下依次是：驻波比VSWR、电压反射系数r、功率反射系数Prefl、回波损耗ar、传输损耗am，可以输入其中任意值，同时得到其他值：

![[笔记同步助手/images/70cf05ee15f6ca96fc50862d9db7ae33_MD5.png]]

同样有计算公式，还可以设置保留小数点后几位数字：

![[笔记同步助手/images/7b6f82d3e6248ad07eea2646d94d2ec0_MD5.png]]

02

—

WCC

这款APP也适用于IOS和Android。是某读者推荐的一款非常实用的小工具。全称叫做Wireless Comm. Calculator。看一下它的菜单和界面就能清楚地了解它的用途了。

主菜单：

![[笔记同步助手/images/6f8f1481fa0530f963acb03ac9343978_MD5.png]]

点击进入NR，看到的是NR各频段，从FR1的n1到FR2的n261：

![[笔记同步助手/images/38affe02bf1dff243688f89c00d14ef0_MD5.jpg]]

。。。。。。

![[笔记同步助手/images/c1a996e11ffdd377edec66495d748921_MD5.jpg]]

点击进入某频段，可以看到频点和ARFCN号的配置，并可以清晰地看到各频段的信道间隔以及上下行频率固定间隔：

> 📹 此处为视频内容（vid: wxv\_4539983568558571522），未能直接提取，请前往原文查看：[在公众号原文中观看](https://mp.weixin.qq.com/s?__biz=MzU2NTg0OTY4NA==&mid=2247489290&idx=1&sn=5b33232f379be5bb8bb50402365d5edc&chksm=fd136825ffb0fabc5154bd32097c190070a379e284c94d4b432f41b3bf917cc442fc897f4909&mpshare=1&scene=1&srcid=0531R8DOrmU4Bb5KPCX2mJjt&sharer_shareinfo=96b5abfb9dc22925ec1e1e3aee5543e8&sharer_shareinfo_first=96b5abfb9dc22925ec1e1e3aee5543e8#rd)

还可以查看功率等级及限值，灰掉的表示不适用：

![[笔记同步助手/images/7afbd900cd4b5f405f70b3306dec9063_MD5.jpg]]

以下是Wi-Fi各频段及其对应的频率和信道号：

![[笔记同步助手/images/bd50894b27b30396d1daf151c403bcb3_MD5.jpg]]

![[笔记同步助手/images/40a5ee861412c430e7370a53111a0b14_MD5.jpg]]

以及蓝牙频段及信道号：

![[笔记同步助手/images/97ca910edeca53101f0c15afa65bc6b8_MD5.jpg]]

![[笔记同步助手/images/601b960fb488f3ca4e2993aefc161a75_MD5.jpg]]

但缺点是，更新不够快，例如NR最新的频段和信道，还未包括在内。

03

—

Field Strength Estimator

这款APP可用于链路预算和场强的计算，但仅适用于IOS。以下的例子表示，5.8GHz的一个通信设备，发射天线增益和接收天线增益均为3dBi，距离10米情况下，如果发射功率为1W（30dBm），则接收到的功率为-31.716dBm，电场强度为0.774V/m，功率密度为1.588mW/m² 。

![[笔记同步助手/images/c3a1aa2b0a73bc04214536319685a3bf_MD5.jpg]]

在给定输入频率f、发射天线增益Gtx、接收天线增益Grx、距离R的前提下，其他参数给定一个就可以计算其余的：包括发射功率Ptx，接收功率Prx及电场强度E、磁场强度H和功率通量密度S，也提供了计算公式如下：

![[笔记同步助手/images/3543191ad2e7d0161327a4d4a1aa3fb6_MD5.jpg]]

![[笔记同步助手/images/b47278bf20054924b61dd29e23d202c3_MD5.jpg]]

![[笔记同步助手/images/e11063c7b952ac3c1bec3319783b10eb_MD5.jpg]]

相关的计算原理我们也曾经讨论过：

[趣味实验室系列—恼人的EMC单位换算（一）](https://mp.weixin.qq.com/s?__biz=MzU2NTg0OTY4NA==&mid=2247484772&idx=1&sn=5905007db5b2d30d032d7fd5101d56d1&scene=21#wechat_redirect)

[趣味实验室系列—恼人的EMC单位换算（二）](https://mp.weixin.qq.com/s?__biz=MzU2NTg0OTY4NA==&mid=2247484790&idx=1&sn=aad1bdfc3be8054616c1e5c32c480c79&scene=21#wechat_redirect)

[趣味实验室系列—恼人的EMC单位换算（三）](https://mp.weixin.qq.com/s?__biz=MzU2NTg0OTY4NA==&mid=2247484818&idx=1&sn=6b235497c46a2f5de25b0888099c17b5&scene=21#wechat_redirect)

[趣味实验室系列—恼人的EMC单位换算（四）](https://mp.weixin.qq.com/s?__biz=MzU2NTg0OTY4NA==&mid=2247484839&idx=1&sn=65332b11f10748fd1a53abeea6bb003a&scene=21#wechat_redirect)

  

---

  

![[笔记同步助手/images/61c604ff64b6b6d4ec26f9b658ff436d_MD5.png]]

近期发布：

[一起来学5G终端射频标准（其他类型5G设备的最大输入电平）](https://mp.weixin.qq.com/s?__biz=MzU2NTg0OTY4NA==&mid=2247489247&idx=1&sn=1e95498c12461a36b96c94a34f0fa2d7&scene=21#wechat_redirect)

[一起来学5G终端射频标准（CA的最大输入电平）](https://mp.weixin.qq.com/s?__biz=MzU2NTg0OTY4NA==&mid=2247489238&idx=1&sn=7255807b4d58d9bb78c53f210e81129d&scene=21#wechat_redirect)

[一起来学5G终端射频标准（接收机的最大输入电平）](https://mp.weixin.qq.com/s?__biz=MzU2NTg0OTY4NA==&mid=2247489229&idx=1&sn=3084e3a5c4f14b47b3b8a8b8192a0e91&scene=21#wechat_redirect)

[SAR值与Gy值](https://mp.weixin.qq.com/s?__biz=MzU2NTg0OTY4NA==&mid=2247489221&idx=1&sn=40dafe113964f23c621f334a91034110&scene=21#wechat_redirect)

[6G的功能和性能需求有哪些？](https://mp.weixin.qq.com/s?__biz=MzU2NTg0OTY4NA==&mid=2247489210&idx=1&sn=de922f85196788c861fd9b201ff56401&scene=21#wechat_redirect)

[6G将会启用哪些频段](https://mp.weixin.qq.com/s?__biz=MzU2NTg0OTY4NA==&mid=2247489200&idx=1&sn=cd1e6e2c0f600544d3e7abe56cc569b0&scene=21#wechat_redirect)

[6G标准已上线](https://mp.weixin.qq.com/s?__biz=MzU2NTg0OTY4NA==&mid=2247489192&idx=1&sn=de2430149a2231e6eb0153345b6cafbf&scene=21#wechat_redirect)

[NTN终端的OTA测试—配置的发射功率](https://mp.weixin.qq.com/s?__biz=MzU2NTg0OTY4NA==&mid=2247489184&idx=1&sn=faeb91473ec23d15e5c09e8e00b453a1&scene=21#wechat_redirect)

[NTN终端的OTA测试—离轴EIRP密度-3](https://mp.weixin.qq.com/s?__biz=MzU2NTg0OTY4NA==&mid=2247489176&idx=1&sn=a2caa846d36b6ad77647ea5c66afef7a&scene=21#wechat_redirect)

[NTN终端的OTA测试—离轴EIRP密度-2](https://mp.weixin.qq.com/s?__biz=MzU2NTg0OTY4NA==&mid=2247489169&idx=1&sn=48a96c37743706c83a918f3c052f3ad2&scene=21#wechat_redirect)

[NTN终端的OTA测试—离轴EIRP密度-1](https://mp.weixin.qq.com/s?__biz=MzU2NTg0OTY4NA==&mid=2247489154&idx=1&sn=4f8c711c9cd6011e2880fcad96ecb1e2&scene=21#wechat_redirect)

[NTN终端的OTA测试—EIRP和TRP测试](https://mp.weixin.qq.com/s?__biz=MzU2NTg0OTY4NA==&mid=2247489143&idx=1&sn=9f85fbe9a33b4a4a65369d311f05b383&scene=21#wechat_redirect)

[NTN终端的OTA测试—VSAT分类及其功率限值](https://mp.weixin.qq.com/s?__biz=MzU2NTg0OTY4NA==&mid=2247489133&idx=1&sn=23506d44d5dec9094dad9895ae085b79&scene=21#wechat_redirect)

[NTN终端的OTA测试—综述](https://mp.weixin.qq.com/s?__biz=MzU2NTg0OTY4NA==&mid=2247489124&idx=1&sn=12bff5adbb8fa5787f7dd83c9b136e39&scene=21#wechat_redirect)

[Wi-Fi中的DCM调制](https://mp.weixin.qq.com/s?__biz=MzU2NTg0OTY4NA==&mid=2247489114&idx=1&sn=2fd8e8cfb99cae387ba311f65fbbd19d&scene=21#wechat_redirect)

[Wi-Fi 7的最大速率究竟是多少？](https://mp.weixin.qq.com/s?__biz=MzU2NTg0OTY4NA==&mid=2247489088&idx=1&sn=2c8b419ae7f8743789b42a7038b78416&scene=21#wechat_redirect)

[夜空中最亮的星-是卫星还是流星？](https://mp.weixin.qq.com/s?__biz=MzU2NTg0OTY4NA==&mid=2247489078&idx=1&sn=70ae5271dc4f6d6def4cb3a6e7539aa4&scene=21#wechat_redirect)

[3GPP通感信道模型标准](https://mp.weixin.qq.com/s?__biz=MzU2NTg0OTY4NA==&mid=2247489065&idx=1&sn=e70cb5d4e20ba1dd07f01aa9ae92f114&scene=21#wechat_redirect)

2025年12月21号以前链接汇总：

[往期目录—截至2025年12月21日](https://mp.weixin.qq.com/s?__biz=MzU2NTg0OTY4NA==&mid=2247489065&idx=2&sn=7ac3f210053cdd1f773216238c63890e&scene=21#wechat_redirect)

2024年2月4号以前链接汇总：

[历史文章链接汇总-截至2024.02.04](https://mp.weixin.qq.com/s?__biz=MzU2NTg0OTY4NA==&mid=2247487655&idx=1&sn=235a62372b71bed9e242da853e439aa2&scene=21#wechat_redirect)

  

---

![[笔记同步助手/images/5d68428bd1e8df74aa1e45b68d5afae2_MD5.jpg|cover_image]]

Original Jianer 无线通信标准解读

---

内容效果不满意？[点此反馈](https://feedback.notebooksyncer.com/feedback/38e5673e_1780235166798?u=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzU2NTg0OTY4NA%3D%3D%26mid%3D2247489290%26idx%3D1%26sn%3D5b33232f379be5bb8bb50402365d5edc%26chksm%3Dfd136825ffb0fabc5154bd32097c190070a379e284c94d4b432f41b3bf917cc442fc897f4909%26mpshare%3D1%26scene%3D1%26srcid%3D0531R8DOrmU4Bb5KPCX2mJjt%26sharer_shareinfo%3D96b5abfb9dc22925ec1e1e3aee5543e8%26sharer_shareinfo_first%3D96b5abfb9dc22925ec1e1e3aee5543e8%23rd&s=obsidian)