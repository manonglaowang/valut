---
author: 从今天开始做自己
source: 微信公众号
url: https://mp.weixin.qq.com/s?__biz=MzU1MTk2NDE4Mg==&mid=2247496540&idx=1&sn=89dfcfbdae76742a8936c56d311605a6&chksm=faa3ba89028e2501b0617c0fba31a4a668583b7c5edfe88f95d0810049a7d8f39f088d7f03de&mpshare=1&scene=1&srcid=0531uilfHyxjX0caBzZkOic4&sharer_shareinfo=c43ba3dd375d001ca282833795c6d407&sharer_shareinfo_first=3964a31aab5d969d265fd20f650d536e#rd
saved: 2026-05-31 10:00:00
tags:
  - 笔记同步助手
id: 64d0d111-1ae2-454e-bddb-ec2296252b5a
---

公众号名称：禾刀AI笔记

作者名称：从今天开始做自己

发布时间：2026-05-31 07:58

![[笔记同步助手/images/770025e97127951e5303121a5226d140_MD5.png]]

哈喽，朋友们好，我是禾刀。

就在凌晨，OpenAI扔了个两个重磅更新：

-     
    1、Codex可以操控Windows电脑啦！
-     
    2、手机也能远程指挥Windows上的Codex干活啦！

是不是很激动？

激动过后，是不是刷了半天，还是不知道咋装？Computer Use到底怎么开？安卓扫码为啥死活连不上？

如果是的话，那今天这篇文章，你一定要码住！

Codex现在太火了，火到连我搞材料的老公都在问我，有没有用过。

但实话说，禾刀之前还真没用过，因为我既没有MAC电脑，也没有iphone手机。甚至，我手机上都没有ChatGPT。

但今天这个更新，让我狠狠心动了。整整一天，哪都没去，折腾来折腾去，中间好几次想放弃，终于全给跑通啦！

禾刀踩了一整天的坑，一个一个全给朋友们整明白，照着我的这个步骤来，保管你顺顺利利搞定它！

## 我们先看看，搞定它有啥用？

其实codex也不是才有windows版本，但之前是没有电脑操控功能的。我们只能用codex编程。

今天这个版本，它可以操控windows电脑啦！

我们只需要给codex发一条命令，它能自己打开电脑上的软件，自己操作鼠标、键盘去完成任务。

比如禾刀让它打开微信，自动帮我整理群聊，它完成的相当好！

![[笔记同步助手/images/bed3f2f19df1d5b411951e48ad3b9cbe_MD5.png]]

如果只能坐在电脑前，看着它干活的话，也就那么回事了。

但今天这个版本，用手机就可以遥控，不仅iphone，安卓也OK。

不管我们在咖啡厅、在公园，还是在地铁上，随时都可以用手机，给电脑上的codex发送任务命令，查看执行进度等，简直不要太方便。

比如我吃晚饭的时候，用手机让它给我做了3页PPT。

![[笔记同步助手/images/6a9c70d005a823ddeeaaf2079da8b15e_MD5.png]]

做出来的效果，我觉得还挺不错的。

![[笔记同步助手/images/e0caba3610b13855d8ba2d120d8bd632_MD5.png]]

![[笔记同步助手/images/1080fdfd10102e395b7d8ae10abb9d9a_MD5.png]]

![[笔记同步助手/images/721ff4116b7923745411c2a6cd101f16_MD5.png]]

而且，现在免费版也可以试用，我今天做了一天测试，也没告诉我超额度。

所以，不要犹豫，只要你有魔法（自行搞定哈），就可以一试！

## 第一步：装Codex，嘘，教你过验证

官网左侧找Codex，下载Windows版。

![[笔记同步助手/images/42d6249703eaa11738640a7cc265afeb_MD5.png]]

双击安装，登录验证。

![[笔记同步助手/images/26863e6e1cdbeb6ce2e193024da13af3_MD5.png]]

据说就需要验证一次，某宝搜一下，成本8元。亲测顺利，这一步没坑。

![[笔记同步助手/images/bcb2cb106c9099ce5dd0e4fc3f239e31_MD5.png]]

## 第二步：先搞定电脑操控（Computer Use），别急着连手机

这是今天一个很大的教训：一定先装Computer Use，再连手机。

因为连手机的时候有个"启动电脑操控"的开关，Computer Use没搞定，这个开关你点都点不了。

安装很简单，左下角“设置”里找到“电脑操控”，把两个“安装”都点一遍。

![[笔记同步助手/images/612000849cc5d4fd6f43a16f788f3b6d_MD5.png]]

![[笔记同步助手/images/71fd952455fa9f31366df4222b3ebd31_MD5.png]]

Google Chrome这里，需要在浏览器里装一个插件。

点“打开”自动跳转，再点“Add to Chrome”就行。装好后，Google下的小红点会变成小绿点。

![[笔记同步助手/images/669eda79198d1c9aeea621e4f66f0983_MD5.png]]

![[笔记同步助手/images/38c50bf329997cc28e790413a6754a60_MD5.png]]

安装到这里就可以了。

### 最大的坑来了！

无论我让它干啥，它都会报错：

没能连接到Windows桌面自动化通道，连续两次初始化都失败了。

## Windows sandbox failed：spawn setup refresh

![[笔记同步助手/images/88a28079e0d88058e72cbd13ddeb665d_MD5.png]]

然后再点进“电脑操控”，它就变成“Compute Use 插件不可用了”。

如果我重启电脑、重启Codex，它又会变成好的，一执行任务，又报错、又不可用……

这个大坑，差点让我放弃！

### 🔑 最快解法（多数人靠这个就恢复了）

### 1、关掉杀毒和电脑管家，不关可能会拦截。

### 2、清掉残留状态，让它重新初始化 sandbox

关闭 Codex 桌面 App，在资源管理器地址栏进：

> C:\\Users\\你的用户名\\.codex\\

把以下内容删掉或改名备份：

![[笔记同步助手/images/3f9645d4322910348d333dc1cae2c594_MD5.png]]

### 3、重启电脑，用管理员身份启动Codex，让它重新走一遍 sandbox setup。

![[笔记同步助手/images/be4aaa140da9dbf21fc07e0571eb4acf_MD5.png]]

提示“沙盒已就绪”，就OK啦。

![[笔记同步助手/images/eddbd580c1d988d83898c8f651232aec_MD5.png]]

### 4、去“电脑操控”确认下插件状态，没有的话就再装一下

### 测试“电脑操控”功能

在对话框里输入@符号，选择“电脑”，让它执行一下试试，比如新建个文件。

![[笔记同步助手/images/86ebbce277781a44c5de5e8e6be823bb_MD5.png]]

## 第三步：安卓手机连电脑Codex

电脑上Codex左侧菜单找到「Codex移动版」，点「开始设置」。

![[笔记同步助手/images/e831a0ebd61d722e16dd5c1abd6c6d9a_MD5.png]]

“允许”一下，就会出现批准二维码。

![[笔记同步助手/images/2b8478ed22bcb809280a8401851cab68_MD5.png]]

![[笔记同步助手/images/a509aca7f23e440a760dee23baaea5dd_MD5.png]]

iPhone用户扫一下就完事。禾刀的安卓手机，咋扫就是屁用没有。

其实已经看到电脑了，电脑Codex明明已经打开，但就是提示错误：

> 无法连接：确保这台电脑已唤醒且Codex已打开。

![[笔记同步助手/images/836ef27c88594f3829c3906383f6b167_MD5.png]]

![[笔记同步助手/images/8596a0f2aa722db3adaa970accae7668_MD5.png]]

这里真的崩溃，真的真的差点就要放弃了。

你猜结果怎么着？根本不用扫码！

### 🔑 最快解法

### 1、电脑上：霍格沃兹魔法里的 “TUN模式” 打开

各个工具位置不同，找一下应该能找到。

![[笔记同步助手/images/edddf63d62999aa267b0b14e5a01995b_MD5.png]]

### 2、电脑上：用管理员身份重启Codex，重新进到 “连接” 二维码页面

如果“Codex移动版”没了的话，可以“设置 —— 连接”里找到。

### 3、手机上：ChatGPT点进Codex，会自动连接到电脑，显示“需要身份验证”

### （1）需要身份验证：点“继续”

### （2）登录或注册：登录和电脑一样的账号

### （3）在此设备上授权Codex：授权

（4）电脑上的小点点变成绿色，就是成功了。如果账号里已经有其他项目，也会显示在这里。

![[笔记同步助手/images/9f52311242f10f16fed68c546bcad670_MD5.png]]

![[笔记同步助手/images/b8cbb56e59748188d4dba8cb109ce168_MD5.png]]

![[笔记同步助手/images/fec43527b0bd2fe6ef556e3919b15ce4_MD5.png]]

![[笔记同步助手/images/9c5a522d245188b3d819e9ab02060b0c_MD5.png]]

就这么个问题，卡了禾刀好几个小时！真是难了不会，会了不难。

### 更改连接选项：授权后，电脑上显示已连接，把三个选项都打开，完成。

![[笔记同步助手/images/4d1917ee71bfff6026704282a92a75ad_MD5.png]]

## 第四步：测试

在手机上发送任务

![[笔记同步助手/images/6a9c70d005a823ddeeaaf2079da8b15e_MD5.png]]

电脑上会同步显示执行进度

![[笔记同步助手/images/7f8462c52827925a7ee3c870958d1a29_MD5.png]]

执行任务时，Codex会接管桌面，鼠标键盘都被控制，我们不能干别的，但能看到它在做的每一件事。

![[笔记同步助手/images/5cf04d4fde488f22c07c1f8cc51b5e38_MD5.png]]

据说，Mac上的Computer Use是能后台跑的，windows还是有些局限性。

## 最后

以前干活，人必须坐在电脑前面。人一走，事儿就停了。

但现在，一台电脑放在那，AI在里面跑，我们可以在任何地方，想起来的时候，掏手机看一眼进度，补一句指令，就够了。

对OPC来说，肯定是好事儿。

对牛马来说，就真不好说了。

以后老板要求牛马24小时干活儿，好像更有理由了，哈哈哈，开个玩笑。

好了，今天分享到这里啦。禾刀踩了一整天的坑，希望能帮你省下这一天。

喜欢就点个关注吧。

你装Codex还遇到什么问题，评论区告诉禾刀，看到必回。

> 😘
> 
> 我是生命不止、折腾不休的禾刀。立志在有生之年，用自己微薄的生命之光，照亮更多人的路。和有缘之人一路同行，一起破茧成蝶🦚，用 AI 点亮未来✨，用科技逆袭人生🚀

  

---

![[笔记同步助手/images/e8b111f46d0106df52c02e1617c40fe3_MD5.jpg|cover_image]]

Original 从今天开始做自己 禾刀AI笔记

---

内容效果不满意？[点此反馈](https://feedback.notebooksyncer.com/feedback/7a7320bb_1780192798106?u=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzU1MTk2NDE4Mg%3D%3D%26mid%3D2247496540%26idx%3D1%26sn%3D89dfcfbdae76742a8936c56d311605a6%26chksm%3Dfaa3ba89028e2501b0617c0fba31a4a668583b7c5edfe88f95d0810049a7d8f39f088d7f03de%26mpshare%3D1%26scene%3D1%26srcid%3D0531uilfHyxjX0caBzZkOic4%26sharer_shareinfo%3Dc43ba3dd375d001ca282833795c6d407%26sharer_shareinfo_first%3D3964a31aab5d969d265fd20f650d536e%23rd&s=obsidian)