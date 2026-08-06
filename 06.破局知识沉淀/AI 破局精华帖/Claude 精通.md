
这是一篇写给完全**不懂编程的小白的 Claude Code 入门指南**。如果你一直听说 Claude Code 很厉害，但不知道它是什么、怎么用，这篇文章就是为你准备的，全文 12000 字，用起来！

  

![](https://my.feishu.cn/space/api/box/stream/download/asynccode/?code=NzU0NTNjOTg1OGY2N2YyNGNhZmEzZTYxYzg5Yjk1ZDVfTzhuY05vUzIyN3M4RjRWZjV3YUh5Z2xQVkN5UlpCWTBfVG9rZW46VnhkMmJreElRb1JwTHZ4TGl4c2NIZWlFbmpjXzE3ODQ3NzE3ODA6MTc4NDc3NTM4MF9WNA&add_watermark=true&scene_type=CCM)

  

### 📖 文章目录

  

别担心内容太长抓不住重点！这篇文章将带你走完从入门到实操的全过程，你可以根据自己的情况，直接跳转到感兴趣的部分：

- **第一部分：概念入门（1-3 章）**
    
    - 用大白话讲清楚 Claude Code、Skills 和 MCP 到底是什么。
        

  

- **第二部分：安装配置（4-5 章）**
    
    - 保姆级教程，手把手教你安装软件、配置 API Key，解决最大拦路虎。
        

  

- **第三部分：上手使用（7-8 章）**
    
    - 教你怎么用 Skills，并推荐让体验更好的可视化工具。
        

  

---

  

## 前言：为什么我要写这篇文章

  

最近我每天都在用 Claude Code 来做很多工作。

给大家分享一下最近的使用场景：

- 用 Claude Code 做了一个教程，因为可以直接调用浏览器来录屏
    
- 用 Claude 来整理文件、整理启动项
    
- 用 Claude Code 来做给霸王茶姬的 AI 课程逐字稿和 PPT 内容
    
- 用 claude code 来写我的 OKR，根据我的 OKR 来做每天的任务规划和复盘
    

  

我发现 Claude Code 简直就是一个无所不能的智能体。过去很多想实现的想法，我都用 Claude Code 的 Skills 快速完成了。

  

但是也发现了一个问题：虽然我每天都在分享 Claude Code 的一些使用方法和 Skills，但还有大量的人没有用上它，甚至我的社群里也有好多人不知道到底怎么用。

![](https://my.feishu.cn/space/api/box/stream/download/asynccode/?code=MzJiOTQyYWEwMTA5YTMyZTAyMDQzYzBlOWNhNzhjNTJfRHllZGJxdWU0Z1NaRWF3dEppdU9YcmZJTGx6MENTRVhfVG9rZW46U3FBUmJkYUNPb1hGR0J4emFJSGNKeHRjbnNoXzE3ODQ3NzE3ODA6MTc4NDc3NTM4MF9WNA&add_watermark=true&scene_type=CCM)

  

所以这篇文章我想写给非程序员的小白，做一篇保姆级的入门教程。

我也是非程序员，我毕业是产品经理，后边做运营，也没写过代码。

我也是从零开始摸索，从最开始什么都不懂的小白，到后来安装 Claude Code。

最开始我也看不懂什么是终端，为什么那个黑黑的命令行输入东西就能出来结果，所以我很理解普通人的感受。

  

很多人反馈说程序员写的东西他们都看不懂，**我非常懂非程序员的痛苦，因为这些问题我都亲自遇到过！**

  

所以这篇文章，**我来跟大家分享一下文科生也能看懂的入门教程。**

（如果你已经知道 claude code、skills 、mcp 的一些概念了，可以直接跳到文章的第四部分进行 claude code 和 skills 的安装）

---

  

## 一、Claude Code 是什么？

  

首先，我们得知道现在的 Claude Code 或 Skills 是什么。

**Claude Code 就是一个非常厉害的 AI 智能体**。它能读取你电脑里的所有资料，然后使用很多工具去完成各种各样的任务，比如：

- 帮你对表格进行复杂的拆分
    
- 根据你本地的文件整理文件夹
    
- 调用各种工具来完成任务（剪视频、搜索、配图等等）
    
- 当你创建一个任务时，它能自己去执行，并最终把一些文件输出给你
    

  

所以，**大家不要被 Claude Code 的名字骗了，它不仅仅是写代码的工具**，它其实是能完成非常多任务的。比如我自己就很少用它来写代码，而是用它覆盖很多文档类的工作。

  

![](https://my.feishu.cn/space/api/box/stream/download/asynccode/?code=NmQ0MTEyYjlhYTQ3NzBmNzU2MDFkNjQzNjVkZDJiM2ZfY2xGM3lFanZISWlueE5FVU9Vd2NGUG1aOENKRUkwbFdfVG9rZW46S1dtQ2JRVWhyb1dtZGl4Mmg2Y2NPZk9MblZlXzE3ODQ3NzE3ODA6MTc4NDc3NTM4MF9WNA&add_watermark=true&scene_type=CCM)

  

### Claude Code 和 ChatGPT 有什么不同？

  

相比于 ChatGPT、DeepSeek，它有一个很大的好处：

- 过去你和 ChatGPT 更多是在聊天，它其实没办法帮你干活
    
- 而且你需要经常手动上传各种文件资料
    

  

Claude Code 非常厉害的点就在于，**它可以自主地处理文件**。

  

有一天我让 AI 帮我做一个优先级的规划，它直接找到了我的 OKR，然后根据我的 OKR 给了我建议。当时我都惊呆了。

  

一旦你体验了这种感受之后，你其实再也不想用各种网页版的 DeepSeek 了，因为你需要补充的上下文实在是太多了，每次开启对话，他都像是个傻子。

  

而且像网页版的 ChatGPT，它是比较难给你去干活的，基本上可能一分钟内就会给你答案，但没法真正执行任务。

  

**总结一下：你可以把 Claude Code 理解成一个能干活的实习生**——能去规划整个任务，能用你电脑的各种文件，然后能做 PPT、Word、Excel 等等这种资料，所以它是非常厉害的。

  

---

  

## 二、Skills 是什么？

  

第二个，最近很火的 Skills 是什么？

不知道大家过去有没有做过 SOP（标准操作流程）。Skills 本质上就像是我们在做工作时的 SOP。

比如说我要发布一篇文章，我可能要：

1. 首先确认选题
    
2. 选题完了之后，搜集资料
    
3. 搜完资料，做大纲
    
4. 大纲完了之后，先写初稿
    
5. 写完初稿，让别人帮我看一下
    
6. 做文章配图
    
7. 最后发布
    

  

这个其实是我的工作流。

### 过去没有 Skills 的时候

  

我可能会做好多个 AI 智能体：

- 一个智能体专门帮我做选题
    
- 一个智能体专门帮我写大纲、写文案
    
- 一个智能体专门帮我去做配图
    

  

你会发现一个问题：我需要做的事情，就是把各种上下文从 A 智能体复制到 B 智能体，然后 B 智能体的结果又复制到 C 智能体。

有人就会说了，这不就是工作流在做的事情吗？像过去的扣子、Dify 或者是 n8n。确实如此，所以我过去用扣子、 n8n、用 Dify 很多。

![](https://my.feishu.cn/space/api/box/stream/download/asynccode/?code=Y2U5MzhiMDQxMDgxYzgyNmJlNThmNTQ0YmUxY2RkY2JfRDR1TldsMjZ2WnpxUDV1UDdmWVRPZEJPQ2p2bkN3d0tfVG9rZW46UHhHUGJwSzZjb1JNOUx4T1JhcmN1dVc1bm5mXzE3ODQ3NzE3ODA6MTc4NDc3NTM4MF9WNA&add_watermark=true&scene_type=CCM)

  

### 传统工作流的问题

  

但用多了之后，你会发现：

1. **门槛很高**：使用这些工作流的门槛很高，拖拖拽拽也很费时间
    
2. **不够智能**：整个运行其实没那么智能，一旦遇到某一个小问题它就会报错
    
3. **像流水线工人**：我们把它理解成一个流水线。过去的话，你自己要把这整个流水线串起来，没有你不行。而且这个流水线上的工人都是“初中生”——不遇到问题还好，一遇到问题他就懵了，就没法工作了
    

  

### Skills 的优势

  

那 Skills 的优势是什么呢？

**第一**，灵活度：skills 是固定了一个大的流程，而且还能让他在这个过程中灵活地去用各种资料。

**第二**，智能度：如果 AI 遇到问题了，它就能像非常牛的专家一样，自己去做调试。比如说这个点遇到问题，它可能换一个方式，所以说它就非常的智能。

  

所以我现在的判断是：我已经不想去搭这种 Dify 或是 n8n 的节点工作流了，连来连去很费劲，而且最终也没那么好用。

### 一句话总结

  

**Skills 本质上是一个给 AI 的操作 SOP**，或者说我们给 AI 搭了一个流水线。

我们为了防止它每次任务都是自主地去行动质量不高，把一个最佳的标准化流程给它规定好，告诉它每一步怎么去做，以及用什么工具、参考什么标准文档。

### Skills 的目录结构

  

所以理解了上边为什么有 Skills，我们再来看看 Skills 的目录就明白了。

一个完整的 Skill 文件夹里，通常会有这些东西：

![](https://my.feishu.cn/space/api/box/stream/download/asynccode/?code=Mjc0MTQ0YWIzYzY4NDk1ZmRiMzg2NDIzY2VkYThmYjVfaXhqVEZxMVJZS0hIUFI2a1ZleWp6OUx3bFF0UDBRbEpfVG9rZW46WkczcWJZM1lJbzh4cXd4M3k4amNvMzRNblVkXzE3ODQ3NzE3ODA6MTc4NDc3NTM4MF9WNA&add_watermark=true&scene_type=CCM)

  

**📄** **[skill.md](http://skill.md)****（核心文件，必须有）**

  

这是整个 Skill 的“灵魂”，告诉 AI 应该怎么干这个活儿。里面会写清楚：

- 这个 Skill 是干什么的
    
- 具体的工作流程是什么
    
- 每一步要怎么做
    

  

你可以把它理解成**给 AI 的操作手册**。比如一个“写文章的 Skill”，[skill.md](http://skill.md) 里可能会写：第一步确认选题，第二步搜集资料，第三步写大纲……

  

**📄** **[README.md](http://README.md)****（说明书）**

  

这个文件是给**人看的**，不是给 AI 看的。它会告诉你：

  

- 这个 Skill 是做什么用的
    
- 怎么安装和使用
    
- 有什么注意事项
    

  

就像你买了一个新家电，包装盒里会有一份说明书，[README.md](http://README.md) 就是这个说明书。

  

**📁 reference/ 文件夹（知识库）**

  

这里面放的是 AI 可以参考的资料。比如：

- 你的写作风格样本
    
- 常用的模板
    
- 一些标准文档
    

  

继续用“写文章的 Skill”举例，你可以在这里放几篇你之前写得不错的文章，让 AI 学习你的风格。

**📁 examples/ 文件夹（案例库）**

  

这里放的是一些示例，告诉 AI“好的输出应该长什么样”。

比如你想让 AI 帮你写周报，你可以在这里放几份你之前写得好的周报，AI 就知道你想要什么格式、什么风格了。

**📁 scripts/ 文件夹（工具箱）**

  

这里放的是一些脚本，可以让 AI 调用来完成特定任务。

比如一个自动发布文章的脚本、一个批量处理图片的脚本。你可以把它理解成**给 AI 准备的工具箱**，里面放着各种趁手的工具。

  

**📄 .clinerules（配置文件）**

  

这是一些高级设置，比如告诉 AI 在执行这个 Skill 的时候要遵守哪些规则、有哪些限制。

一般小白用不太到，先知道有这么个东西就行。

---

  

**💡 小提示：不用担心记不住！**

  

看到这里你可能觉得有点多，别慌！你不需要一开始就全部理解。

实际上，很多 Skill 只需要一个 `skill.md` 文件就能跑起来，其他的都是可选的。等你用熟了之后，自然就知道什么时候需要加什么文件了。

  

就像学开车一样，你不需要先把发动机原理搞清楚才能上路，先会踩油门刹车就行，其他的慢慢来。

---

  

## 三、MCP 是什么？和 Skills 有什么关系？

  

很多人又会问：MCP 又是什么？它跟 Skills 的关系是什么？

**MCP 本质上就是一个 AI 的 USB 接口**，它解决的是 AI 使用**工具的问题**；**Skills 解决的是流程问题**。

  

在一个大的流程下，可以让 AI 去调用一些 MCP 工具去执行。所以它们俩的区别是互为补充，不冲突的。

![](https://my.feishu.cn/space/api/box/stream/download/asynccode/?code=ZTliMTk1YWY1NDk4OTM3N2Q1NzQzODNhMjI1YmMzY2JfZ0lqVXdhRmozYjNpMTFPRmdGOFpoR3puUGZoam1aYnhfVG9rZW46R2dLY2JuZmxpb05Gd1R4QlNHTmNLcXpqbmlqXzE3ODQ3NzE3ODA6MTc4NDc3NTM4MF9WNA&add_watermark=true&scene_type=CCM)

  

---

  

## 四、怎么安装 Claude Code？（保姆级教程）

  

我们知道了 Claude Code 和 Skills 很厉害，那么接下来就涉及到怎么用。

怎么用这个问题，我发现是大家都头疼的，因为**最大的卡点不是怎么用，核心是怎么把这个环境、怎么把这个软件安装上去**。这是很多人不懂的。

  

别担心，我会一步一步带你走完整个过程。**遇到问题很正常，我自己当初也折腾了好久。**

  

首先 claude code 需要**科学上网**，这块只能大家自行搞定了。

  

💡 **首先强调一下，大家可以通过 AI 来指导自己安装！遇到问题怎么办？（先看这里！）**

  

如果你在安装或配置过程中遇到任何问题，不要慌！你可以把错误信息复制下来，用下面这个“万能提示词”发给任何一个 AI（ChatGPT、Claude、DeepSeek 都可以），让它来指导你：

> 我是一个完全不懂编程的小白，我在【安装 Claude Code / 配置 API Key】的过程中遇到了这个错误：【把错误信息粘贴在这里】。我用的是 [Mac/Windows] 电脑。请用最简单的语言告诉我怎么解决，每一步要做什么。

  

![](https://my.feishu.cn/space/api/box/stream/download/asynccode/?code=MWIxM2RhZThhOTg3MzZlODYwYWQ4ZGNmZGZiMDg3OWZfY1VBcGlMaUlTd3N4b29xOFBFMFhUa2xMbE9oakJrazJfVG9rZW46R1NMWmJkaW5Cb1N2UGd4enREYWNhc1Y3bjZmXzE3ODQ3NzE3ODA6MTc4NDc3NTM4MF9WNA&add_watermark=true&scene_type=CCM)

  

记住：**遇到红色报错不要怕，复制错误信息问 AI 就行！**

  

![](https://my.feishu.cn/space/api/box/stream/download/asynccode/?code=MmFiMjFkMzMzMGNjNmVhZmFmYjNiNmZhMDkwNDgxNzhfUFBpWVJGYnNpSkM0RFFHWUR1MHh5Y25lQVJ1cEVaTDNfVG9rZW46U1VVQ2JJdHJEb1VXblZ4d2hFRGNnRkhqbm1oXzE3ODQ3NzE3ODA6MTc4NDc3NTM4MF9WNA&add_watermark=true&scene_type=CCM)

  

### 第一步：了解什么是终端

  

在开始之前，我先解释一下“终端”是什么。

  

你可以把终端理解成**电脑的“对话框”**。平时我们用鼠标点来点去操作电脑，但其实还有另一种方式——直接用文字命令告诉电脑要做什么。终端就是输入这些命令的地方。

  

它看起来是一个黑乎乎（或者白色）的窗口，里面可以打字。你输入一行命令，按回车，电脑就会执行。

  

**为什么 Claude Code 要用终端？** 因为 AI 更喜欢这种方式，它可以直接读取你电脑里的文件，执行各种操作，比图形界面高效得多。

  

### 第二步：打开终端

  

#### Mac 电脑用户

  

1. 按下键盘上的 `Command + 空格`（Command 键上有个 ⌘ 符号）
    
2. 会弹出一个搜索框（叫 Spotlight）
    
3. 输入“终端”或“Terminal”
    

  

![](https://my.feishu.cn/space/api/box/stream/download/asynccode/?code=Y2YzNjI2MDVmNDk5YjYwYjQwNWI0Yjc0NTkwNTE2MDRfalNiaHV4UGlGemdqcnp4RTVzajc5dDRnMlgzQnRvVExfVG9rZW46RmZjOGJvOUE5b0dGMmd4NUdGNGMzMURIblNnXzE3ODQ3NzE3ODA6MTc4NDc3NTM4MF9WNA&add_watermark=true&scene_type=CCM)

  

4. 点击出现的“终端”应用

5. 你会看到一个窗口打开，里面有一行字，最后有个闪烁的光标——这就是终端了！
    

  

#### Windows 电脑用户

  

1. 按下键盘上的 `Win + R`（Win 键就是那个有 Windows 图标的键）
    
2. 会弹出一个“运行”对话框
    
3. 输入 `cmd`，然后按回车
    
4. 你会看到一个黑色窗口打开——这就是命令提示符（Windows 的终端）
    

  

![](https://my.feishu.cn/space/api/box/stream/download/asynccode/?code=ODhlNjJhNGJlZDI2ZDNlMjg1ZGI4YzJjZWI4NGFiNDZfZjhSSVh3ajFVenU2UE1YZzdTZnhQUjc2a2hVUEpBQ3lfVG9rZW46UXloTWJpbXBBb3VXWFJ4TDNlbGM4aU5CblpiXzE3ODQ3NzE3ODA6MTc4NDc3NTM4MF9WNA&add_watermark=true&scene_type=CCM)

  

**或者另一种方式：**

  

1. 点击屏幕左下角的搜索图标
    
2. 输入“命令提示符”或“PowerShell”
    
3. 点击打开
    

  

### 第三步：安装 Node.js（必须先装这个）

  

Claude Code 需要一个叫 Node.js 的软件才能运行。你可以把它理解成 Claude Code 的“运行环境”，就像手机 App 需要安装在手机系统上一样。

#### 方法一：命令行安装（推荐，更快更简单）

  

命令行安装的好处是：**复制粘贴一行命令就搞定**，不用去网站下载、双击安装包、点下一步。

brew --version

##### Mac 用户

  

Mac 上有一个叫 **Homebrew** 的工具，你可以把它理解成**命令行版的应用商店**——用一行命令就能安装各种软件。

  

**第一步：检查有没有 Homebrew**

  

在终端里输入：

```Plain
brew --version
```

  

输入完毕后记得按回车键

![](https://my.feishu.cn/space/api/box/stream/download/asynccode/?code=N2FlMGE0NzVmYmQ1NmY0MTlkMzdiOTdjNTBhMDdmZTJfT3ZZeHJPQm5sakpRd0dIYjU2bkZrVkt2T21HeXU3dzVfVG9rZW46UWhqMmJqcjZBb2hXMnN4QWQxVGNNRmpDbnNiXzE3ODQ3NzE3ODA6MTc4NDc3NTM4MF9WNA&add_watermark=true&scene_type=CCM)

  

- 如果显示版本号（比如 `Homebrew 4.x.x`），说明已经有了，直接跳到第二步
    

  

- 如果显示“command not found”，说明没有，需要先安装 Homebrew
    

  

**安装 Homebrew（如果没有的话）：**

  

在终端里复制粘贴这一整行命令，然后按回车：

```Plain
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

  

安装过程中可能会让你输入电脑密码（输入时屏幕上不会显示任何字符，这是正常的），输完按回车就行。等几分钟，安装完成。

**第二步：用 Homebrew 安装 Node.js**

  

在终端里输入：

```Plain
brew install node
```

  

等它跑完就行了，可能需要 1-2 分钟。

##### Windows 用户

  

Windows 用户推荐直接从官网下载安装包，这是最简单稳定的方式。

**推荐方法：官网下载安装（最稳定）**

  

1. **访问 Node.js 官网**：[https://nodejs.org/](https://nodejs.org/)
    
2. **下载 LTS 版本**：
    

- 点击左边绿色的 “LTS” 按钮（推荐版本，更稳定）
    
- 会自动下载 Windows 安装包（.msi 文件）
    

  

![](https://my.feishu.cn/space/api/box/stream/download/asynccode/?code=YWZiNTUyZjQyM2EzODdkODNhMjZhMzcxMTM1MDEyM2RfanhnNERmdks0b09YWkZVZk5xRnBzM3Jxbm9tWjhvcXBfVG9rZW46SmRXaGJheERtbzZUczN4NzRqSGMwMzF5bjVnXzE3ODQ3NzE3ODA6MTc4NDc3NTM4MF9WNA&add_watermark=true&scene_type=CCM)

  

1. **运行安装程序**：
    

  

- 双击下载的 .msi 文件
    

![](https://my.feishu.cn/space/api/box/stream/download/asynccode/?code=MjhjYjVhY2NhM2E5ZTNmMjZmODNkN2MwNzljM2RjNThfMVRzeGdYeW9HT3JYZzZMU2g3ekhWRmxxMTRrb3hCY1dfVG9rZW46RldYeWJjTEpub3V0OTF4cTAzY2NSRXdDbmViXzE3ODQ3NzE3ODA6MTc4NDc3NTM4MF9WNA&add_watermark=true&scene_type=CCM)

  

- 一路点击“下一步”（Next）
    
- **重要**：确保勾选 “Add to PATH” 选项（默认已勾选）
    
- 使用默认安装路径即可
    

  

1. **等待安装完成**：
    

- 整个过程大约 1-2 分钟
    
- 完成后点击“完成”（Finish）
    

  

---

  

#### 验证是否安装成功

  

不管用哪种方式安装，装完之后都要验证一下。

**关闭之前打开的终端，重新打开一个新的终端**（这一步很重要！），然后输入：

  

```Plain
node --version
```

  

按回车。如果你看到类似 `v20.10.0` 这样的版本号，说明安装成功了！

  

![](https://my.feishu.cn/space/api/box/stream/download/asynccode/?code=ZmU2M2Q2M2NhNWY0YTBmNTc2MmQ4N2EwMzRhNGE5MGVfODlmT1AwWGRWbHFxZjYxclFpUWVDYU05eTZUaGxvdHBfVG9rZW46VXFWMWJJYVpib3NyYnZ4aVdPZmM3WkZUbnRjXzE3ODQ3NzE3ODA6MTc4NDc3NTM4MF9WNA&add_watermark=true&scene_type=CCM)

  

如果显示“不是内部或外部命令”之类的错误，说明没装好，换一种方式重新安装试试。

### Windows 用户额外步骤：安装 Git（mac 电脑可以跳过）

  

**💡 为什么 Windows 用户需要多这一步？** 因为我们稍后用来安装 Claude Code 的命令 (`npm`)，在下载某些复杂的软件包时，需要一个叫做 Git 的工具来帮忙。如果没有安装 Git，Windows 用户在安装过程中很可能会报错。

  

**安装 Git 非常简单：**

  

1. **下载安装包**：访问 Git 官网下载页面 [https://git-scm.com/download/win](https://git-scm.com/download/win)，网站会自动为你下载合适的安装程序（一个 `.exe` 文件）。
    

  

![](https://my.feishu.cn/space/api/box/stream/download/asynccode/?code=ZDE5YzBkZmE5ZGE0MzUwYjUzNWRkZjliY2FlNmU3YThfaHl6VmFjTnlNd0d4VmtBRFdrSjIxRUlZYjhvMlVuNEhfVG9rZW46Vkxxd2JMSVJsb201bWx4ZjZxRWNmVjdZbmxlXzE3ODQ3NzE3ODA6MTc4NDc3NTM4MF9WNA&add_watermark=true&scene_type=CCM)

  

1. **运行安装程序**：双击下载好的文件。
    
2. **一路 Next**：安装过程中会弹出很多窗口和选项，别担心，你不需要理解它们。**直接一路点击“Next”使用默认设置即可**。默认设置已经包含了我们所需要的一切（比如自动将 Git 添加到系统路径 PATH）。
    

  

**验证 Git 是否安装成功：**

  

安装完成后，我们来验证一下。

1. **重新打开终端**：关闭所有已打开的终端窗口，然后重新打开一个新的（这步非常重要！）。
    
2. 在新的终端里输入以下命令，然后按回车：
    

  

```Plain
git --version
```

  

3. 如果你看到类似 `git version 2.45.1.windows.1` 这样的版本号，就说明 Git 也安装成功了！
    

  

现在，你的 Windows 电脑已经准备就绪，可以进入下一步了。

### 第四步：安装 Claude Code

  

现在我们来安装 Claude Code 本体。

**官方安装地址：** [https://docs.anthropic.com/en/docs/claude-code](https://docs.anthropic.com/en/docs/claude-code)

  

在终端里输入以下命令，然后按回车：

```Plain
npm install -g @anthropic-ai/claude-code --registry=https://registry.npmmirror.com
```

  

你会看到终端开始刷出一堆文字，这是正常的，它在下载和安装。**耐心等待**，可能需要 1-3 分钟。

  

**看到什么说明成功了？**

  

当终端不再刷新，重新出现可以输入命令的光标时，安装就完成了。你可以输入：

![](https://my.feishu.cn/space/api/box/stream/download/asynccode/?code=YjUyMmU4MjdmMDc4ODdmZjE4YWI4YzVmNjBhNjhkNDBfTFZ3WjVDbUszU1lwUU5Nb2RnNU1pN09EOTNySnVpZkRfVG9rZW46T2gyVGJ0V0tmbzVPREJ4UEFWamNRbFpabnljXzE3ODQ3NzE3ODA6MTc4NDc3NTM4MF9WNA&add_watermark=true&scene_type=CCM)

  

```Plain
claude --version
```

  

如果显示版本号，恭喜你，安装成功了！🎉

有问题的话，可以用开头的提问，截图发给 AI 指导。如果你跟着设置到这里，你已经完成了一大半了工作了，加油，胜利就在前方！

---

  

## 五、怎么设置 API Key？（同样保姆级）

  

安装完 Claude Code 之后，你还需要设置一个叫“API Key”的东西。

### 什么是 API Key？

  

你可以把 API Key 理解成**一把钥匙**，或者**一张会员卡**。

  

### 为什么需要 API Key？

  

- Claude Code 本身只是一个“外壳”
    
- 真正干活的是云端的 AI 模型
    
- 每次你让它干活，都会消耗一点“算力”
    
- API Key 就是用来计费和验证身份的
    

  

### 为什么推荐智谱 AI？

  

对于国内用户来说，智谱 AI 有几个明显的优势：

1. **国内访问稳定**：不需要特殊网络，直接就能用
    
2. **价格实惠**：比官方 Claude API 便宜很多
    
3. **支持国内支付**：支付宝、微信都能充值
    
4. **有免费额度**：新用户注册送体验额度
    

  

---

  

### 第一步：获取智谱 AI 的 API Key

  

1. #### 注册智谱 AI 账号
    

  

打开智谱 AI 开放平台：[https://open.bigmodel.cn/](https://open.bigmodel.cn/)

  

点击右上角“注册/登录”，用手机号注册一个账号。

2. #### 实名认证（必须）
    

  

登录后，按照提示完成实名认证。这是国内 AI 服务的要求，不认证无法使用。

3. #### 购买套餐（强烈推荐年度套餐）
    

  

![](https://my.feishu.cn/space/api/box/stream/download/asynccode/?code=MTNkZWFkODEyZDVhMmNmMTQyZDhiNmQ4NmQ0NjA3YTNfMjR1d0FCUGNteW9oek5aVVc4VG1ONFJ5VDc1NXlQeVNfVG9rZW46TFZ4N2JQdW1QbzB4Q014NmlYU2NWOTczbjRHXzE3ODQ3NzE3ODA6MTc4NDc3NTM4MF9WNA&add_watermark=true&scene_type=CCM)

  

智谱 AI 针对 Claude Code 用户推出了 **GLM Coding Plan 套餐，**比按量付费划算很多。

  

**💡 推荐方案：GLM Coding Pro 连续包年套餐**

  

- **原价**：¥480/年
    
- **折扣价**：¥192/年
    
- **包含内容**：Claude Pro 套餐的 3 倍用量
    
- **适合人群**：日常使用 Claude Code 处理文档、整理资料、写作等工作的用户
    

  

**购买链接**：[https://www.bigmodel.cn/glm-coding?ic=IQKEJG5NOT](https://www.bigmodel.cn/glm-coding?ic=IQKEJG5NOT)

  

如果你只是想先试试水，也可以选择按量付费，充值 10-20 元体验一下。但如果打算长期使用，**年度套餐性价比最高**。而且最近 glm 用量不足，还限购了，估计后边还是会涨价的，能买到就是赚到。

  

---

2026年 2 月 14 号更新，GLM 涨价且限购了，基本上都抢不到，很尴尬。。。

  

建议大家可以买 minimax2.5 来配置，先买一个29 的Starter套餐试试自己的用量。

🎁 MiniMax 跨年福利来袭！邀好友享 Coding Plan 双重好礼，助力开发体验！

好友立享 9折 专属优惠 + Builder 权益，你赢返利 + 社区特权！

👉 立即参与：https://platform.minimaxi.com/subscribe/coding-plan?code=DWrHQBlnXg&source=link

  

购买完毕之后可以按照官方的教程配置 API都差不多：https://platform.minimaxi.com/docs/coding-plan/claude-code

  

4. #### 创建 API Key
    

  

5. 在控制台找到“API 管理”或“API Key”
    

![](https://my.feishu.cn/space/api/box/stream/download/asynccode/?code=ZDI5OGJiOWE5NjMzODdiNGI3NjE5NmFmZjJkZGE3NWNfZEpVdlpwZlZpNks1T3JVU05xVkFkaUJYeXdyWEJob2RfVG9rZW46VGJUcmJEUUNMb1M4YVZ4am9iSmMwdVVIbkZkXzE3ODQ3NzE3ODA6MTc4NDc3NTM4MF9WNA&add_watermark=true&scene_type=CCM)

  

1. 点击“创建新的 API Key”
    

![](https://my.feishu.cn/space/api/box/stream/download/asynccode/?code=ZjY4NDZlMzM4ZDljY2NmYjM4OGVjMWVlMDRlMzViMTFfaFJGOXl5WUlVYnViMDJtbUpFV0Q1V3RDVGNNeUNJTTZfVG9rZW46VUh3N2JDbTA3b2tKM3R4WDN6OWNQdXpQblBmXzE3ODQ3NzE3ODA6MTc4NDc3NTM4MF9WNA&add_watermark=true&scene_type=CCM)

  

1. 给这个 Key 起个名字（比如“Claude Code 专用”）
    
2. 点击创建
    
3. **重要：立即复制这个 API Key 并保存好**
    

  

![](https://my.feishu.cn/space/api/box/stream/download/asynccode/?code=ZmE4YzJjYjE3MWQ3MWQzMGJjZDg3NTQ4MzVkOGRkNjJfSUNmcEFSZjdDSFNNVnZ6cllucTZKN1N6WkduWFFmd3lfVG9rZW46WmIxS2JUb044b1Fmdjl4cElMRGNoaHVObndlXzE3ODQ3NzE3ODA6MTc4NDc3NTM4MF9WNA&add_watermark=true&scene_type=CCM)

  

---

  

### 第二步：配置 Claude Code

  

现在我们要告诉 Claude Code 使用智谱 AI 的服务。

智谱 AI 提供了三种配置方式，**我们强烈推荐使用方法一（自动化助手）**，最简单快捷。如果方法一不行，再尝试方法二和方法三。

  

---

  

#### 方法一：使用智谱自动化助手（强烈推荐，最简单）

  

智谱 AI 官方提供了一个叫 **Coding Tool Helper** 的自动化工具，可以一键帮你完成配置，非常适合小白。

  

**操作步骤：**

  

1. **在终端里输入以下命令，按回车**（复制粘贴即可）：
    

  

```Plain
npx @z_ai/coding-helper
```

  

![](https://my.feishu.cn/space/api/box/stream/download/asynccode/?code=MDY4ZjkxNTI3ZjYwZjM1NTc2YWJhZWVkODFiODAxYWNfQ0k1ZWwwTTkxY2VmWXQyYTlJTUl3eE1hUE1pc2tuVVJfVG9rZW46RlF0NmJVeEtTb0Fud2V4RFpPNmNwWHBzbjd1XzE3ODQ3NzE3ODA6MTc4NDc3NTM4MF9WNA&add_watermark=true&scene_type=CCM)

  

2. **按照界面提示操作**：
    

  

- 工具会自动检测你的系统，一般输入 Y，再按回车，或者直接按回车都可以
    
- 引导你选择编码套餐
    
- 自动配置 API Key，记得把刚才弄好的 API 输入进去
    
- 自动安装 MCP 服务器等（强烈建议安装他推荐的 MCP）
    

  

![](https://my.feishu.cn/space/api/box/stream/download/asynccode/?code=NTI5OTI1MmRmN2Y5OTM0ZjdiYmVmZjA1MGI3MzllMGNfcDdicFdsemk2S0R4ekVRaVdiUUxoc096dllySDdDVzNfVG9rZW46V1N3RmJPU2Vib2pYcUd4M2RQSWNGRlJhbmVjXzE3ODQ3NzE3ODA6MTc4NDc3NTM4MF9WNA&add_watermark=true&scene_type=CCM)

  

2. **完成！** 整个过程大约 1-2 分钟，全程图形化界面，非常友好。
    

  

**详细说明文档**：[https://docs.bigmodel.cn/cn/guide/develop/claude](https://docs.bigmodel.cn/cn/guide/develop/claude)

  

---

如果上面的自动化助手运行不了（比如网络问题、权限问题），可以尝试下面的手动配置方法。

---

  

#### 方法二：手动修改配置文件（备选方案）

  

如果自动化助手无法使用，可以手动修改配置文件。需要修改两个文件：`settings.json` 和 `.claude.json`。

---

  

**第一步：修改** `settings.json` **文件**

  

**文件位置：**

- **Mac/Linux**：`~/.claude/settings.json`
    
- **Windows**：`C:\Users\你的用户名\.claude\settings.json`
    

  

**怎么打开这个文件？**

  

**Mac 用户：**

  

在终端里输入：

```Plain
open ~/.claude/settings.json
```

  

如果提示文件不存在，先运行一次 `claude` 命令，Claude Code 会自动创建这个文件。

  

**Windows 用户：**

  

在文件资源管理器的地址栏输入：

```Plain
%USERPROFILE%\.claude
```

  

然后找到 `settings.json` 文件，用记事本打开。

  

---

  

**修改文件内容：**

  

在文件中添加或修改 `env` 字段（**注意：把下面的** `your_zhipu_api_key` **替换成你刚才复制的 API Key**）：

  

```Plain
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "your_zhipu_api_key",
    "ANTHROPIC_BASE_URL": "https://open.bigmodel.cn/api/anthropic",
    "API_TIMEOUT_MS": "3000000",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": 1
  }
}
```

  

**参数说明：**

  

- `ANTHROPIC_AUTH_TOKEN`：你的智谱 AI 的 API Key（必填）
    

  

- `ANTHROPIC_BASE_URL`：智谱 AI 的接口地址（必填，照抄就行）
    

  

- `API_TIMEOUT_MS`：超时时间设置，防止长任务被中断
    

  

- `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC`：禁用非必要流量
    

  

**保存文件**，然后关闭。

  

---

  

**第二步：修改** `.claude.json` **文件**

  

**文件位置：**

  

- **Mac/Linux**：`~/.claude.json`（注意：这个文件在用户目录下，不在 `.claude` 文件夹里）
    

  

- **Windows**：`C:\Users\你的用户名\.claude.json`
    

  

**怎么打开这个文件？**

  

**Mac 用户：**

  

在终端里输入：

```Plain
open ~/.claude.json
```

  

如果文件不存在，可以手动创建一个。

**Windows 用户：**

  

在文件资源管理器的地址栏输入：

```Plain
%USERPROFILE%
```

  

然后在这个目录下创建或编辑 `.claude.json` 文件。

  

---

  

**修改文件内容：**

  

在文件中添加以下内容：

```Plain
{
  "hasCompletedOnboarding": true
}
```

  

这个参数的作用是跳过首次启动的引导流程，让 Claude Code 直接使用智谱 AI 的配置。

**保存文件**，然后关闭。

  

---

  

**💡 重要提示：**

  

- 确保两个 JSON 文件的格式正确（注意逗号、引号、括号）
    

  

- 如果不确定格式是否正确，可以用在线 JSON 校验工具检查
    

  

- 修改完成后，必须重新打开终端才能生效
    

  

---

  

#### 方法三：使用环境变量配置（高级用户）

  

如果你熟悉终端操作，也可以通过设置环境变量的方式配置。

**Mac/Linux 用户：**

  

在终端输入：

```Plain
export ANTHROPIC_API_KEY="your-zhipu-api-key-here"
export ANTHROPIC_BASE_URL="https://open.bigmodel.cn/api/paas/v4"
```

  

要让配置永久生效，可以把上面两行命令添加到 `~/.zshrc` 或 `~/.bash_profile` 文件中。

  

**Windows 用户：**

  

1. 右键点击“此电脑”，选择“属性”
    
2. 点击“高级系统设置”
    
3. 点击“环境变量”
    
4. 在“用户变量”中添加：
    

- 变量名：`ANTHROPIC_API_KEY`，变量值：你的 API Key
    
- 变量名：`ANTHROPIC_BASE_URL`，变量值：`https://open.bigmodel.cn/api/paas/v4`
    

  

---

  

### 第三步：测试是否配置成功

  

配置完成后，我们来测试一下。

1. **重新打开一个终端**（这一步很重要，确保配置生效）
    

  

2. 在终端里输入：
    

  

```Plain
claude
```

  

![](https://my.feishu.cn/space/api/box/stream/download/asynccode/?code=YTY5MTk1MTRkOGRkNmI5OWM0M2FkYTMxYzY1OGEzMmNfWXB5cGxmUTZoZnM2cjhPUXdlQXBESUIxbFVtOGtJd25fVG9rZW46UnVSUWJveFhQb0lqT3F4dlhCSGMyeWU5bndjXzE3ODQ3NzE3ODA6MTc4NDc3NTM4MF9WNA&add_watermark=true&scene_type=CCM)

  

3. 第一次运行时，可能会提示 “Do you want to use this API key”，选择 **Yes**
    

  

4. 然后会提示你是否信任 Claude Code 访问当前文件夹，选择 **Trust**（信任）
    

  

5. 现在你可以试着问它一个问题，比如：
    

  

```Plain
请帮我看一下当前目录下有哪些文件
```

  

或者：

```Plain
你好，请做一个自我介绍
```

  

如果它能正常回答，恭喜你！**你已经成功入门了！** 🎉

  

![](https://my.feishu.cn/space/api/box/stream/download/asynccode/?code=ZmRjOGQ4MWZmYjQyMTUwMGEyYjliZGM0ODdlZGMwNjNfNjRuRlRUNWpud0djeFptOGIwNVlRSnZBUVBYUG5kdVRfVG9rZW46VGR2QWI5NGhqbzlwTWh4ZEdBbGNCS1JhbmJlXzE3ODQ3NzE3ODA6MTc4NDc3NTM4MF9WNA&add_watermark=true&scene_type=CCM)

  

---

  

## 七、Skills 的使用和配置

  

接下来我们讲 Skills 的使用和配置。

**大家不要把 Skills 想成一件非常困难的事情**，因为现在 Skills 的创建本身也可以让 AI 来帮我们做。

  

### 方法一：用 Skill Creator 创建

  

可以去安装一个别人做好的 Skill，叫“Skill Creator”，它可以一步步引导你去创建一个 Skill。

发给 AI 的内容是

> “请帮我安装这个 Skills：[https://github.com/anthropics/skills/blob/main/skills/skill-creator/SKILL.md](https://github.com/anthropics/skills/blob/main/skills/skill-creator/SKILL.md)”，

  

它就会一步步告诉你如何下载和安装，过程可能会问你 yes or no，你就按 yes 回车就好了。

![](https://my.feishu.cn/space/api/box/stream/download/asynccode/?code=YjMzNTVlN2Q5NzYyMTc4NjdlOGNmZmE0ZTg2YjM3MmJfbGpwZzFWY0JZSE1OMUQwc243elhBaGhLNmVRb2h4bTNfVG9rZW46SnQ5aGJJb1o2b1hrN294c0JJbmN3Sjc4bk1kXzE3ODQ3NzE3ODA6MTc4NDc3NTM4MF9WNA&add_watermark=true&scene_type=CCM)

  

### 方法二：安装现成的 Skills

  

现在市面上有很多好用的 Skills，你也可以直接用。怎么用呢？

![](https://my.feishu.cn/space/api/box/stream/download/asynccode/?code=NGI2MjU5NDJlZDVhNTk5N2Q2ZmFiZTg0YjZiZDZmZGZfN08zSzVuTkdTVUxaalZ4cGp4bzJ2Z05FOTVYSks2M3FfVG9rZW46WElaaWJOYmhxb0k3RHZ4YnF1NGN3ZDZQbnJlXzE3ODQ3NzE3ODA6MTc4NDc3NTM4MF9WNA&add_watermark=true&scene_type=CCM)

  

方法也是一样的，你可以去这个市场搜索你觉得比较好的 skills，[https://skillsmp.com/](https://skillsmp.com/).

  

![](https://my.feishu.cn/space/api/box/stream/download/asynccode/?code=ZGQzYTRjNWQ1ZDdjZWNlNDk1OTNlYjJjYjc2NmNiYWRfR2pDcFQ5QmE0MXZ3M2FFNzBhYlA4dGc3dVVMYXFyaDZfVG9rZW46UmhNd2JSOFdWbzRQemd4eFVvS2NjRUpxbjFkXzE3ODQ3NzE3ODA6MTc4NDc3NTM4MF9WNA&add_watermark=true&scene_type=CCM)

  

看到哪个比较好的，然后复制一下右边这个命令，发给一个新的终端按回车就行。

![](https://my.feishu.cn/space/api/box/stream/download/asynccode/?code=NzgzNDRiMzE0YmYxMjM3Yzc3ZDdjNWQ1YTFjZDYyMzJfeU8ycWM3ZHNEWnJGTk56WFpiNXhtbFI3WnZZUUt4Z2dfVG9rZW46UHZwWWI0OU0xb1RUVVd4TEJpU2MwWjZRbnljXzE3ODQ3NzE3ODA6MTc4NDc3NTM4MF9WNA&add_watermark=true&scene_type=CCM)

  

安装完毕后，你重新打开 claude code 就能使用了。

### 怎么调用 Skills？

  

如果你安装完了之后，怎么去使用它呢？也很简单：

> 请使用 【某个 Skill 的名字】 来执行 【什么任务】

  

[https://cdn.gooo.ai/web-images/446ad2a45e496ef611ca7655962f74ded0863298f7dfbaaf97f4f5e2b6109157](https://cdn.gooo.ai/web-images/446ad2a45e496ef611ca7655962f74ded0863298f7dfbaaf97f4f5e2b6109157)

  

就可以了。

比如上边这个就是我用 skills-creater 来创建一个 skills，他就会引导我继续输入创建 skills。

![](https://my.feishu.cn/space/api/box/stream/download/asynccode/?code=NzNiYWRhMGVmZGJkMGFiNzFjMThkODBlZWE0YzljNTVfOTFVZHk3NmhDMGh4WEZ2cUM0TENZNGdVTEFhNnhXZE9fVG9rZW46WUJGVmJvdkE0b3gzaW94RnlOUmNRMjAybjJjXzE3ODQ3NzE3ODA6MTc4NDc3NTM4MF9WNA&add_watermark=true&scene_type=CCM)

  

### 去哪里找好的 Skills？

  

除了自己创建，我们也可以从社区里寻找现成的优秀 Skills。这里推荐几个地方：

- **官方起点**：[Anthropic 官方仓库](https://github.com/anthropics/skills)。所有 Skills 的“源头”，适合学习和修改。
    

  

- **精选合集（强烈推荐）**：[awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills)。目前最全的 Skills 精选列表，分类清晰，更新频繁。
    

  

- **中文社区**：[Claude 中文社区](https://claudecn.com/)。有许多中文教程和可以直接下载使用的 Skills。
    

  

- **技能市场**：[Skills Marketplace](https://skillsmp.com/)。一个可以搜索和发现新 Skills 的网站。
    

  

**但是，我推荐大家不要去安装各种各样的 Skills。**

  

我觉得应该根据自己的需求，先把几个真正能对你发挥作用的 Skills 装上。别人的都是别人的，也不一定好，也不一定适合你。**最重要的还是你自己的任务，然后你根据任务去调用合适的 Skills。**

  

---

  

## 八、可视化界面推荐

  

![](https://my.feishu.cn/space/api/box/stream/download/asynccode/?code=YjgxZTdhNzI2YzAyMWYyMDUxY2MyYWVkNTJiYjVmOTdfZXZxa0VhVlI2ZXhnSHlMVTlnVG5vVE8zVGc1alhmNkpfVG9rZW46TXZwZmI5TGFRb3ZRY014SkFmbGNZU0xObmJlXzE3ODQ3NzE3ODA6MTc4NDc3NTM4MF9WNA&add_watermark=true&scene_type=CCM)

  

因为很多人对命令行这个概念确实会有点难受，因为你看不到改了什么文件，最好是能有一个可视化的界面，帮助我们直观地看到文件到底改了什么。所以推荐大家可以在代码编辑器里打开 claude code。

### 推荐使用代码编辑器

  

推荐大家去下载一个：

- **TREA:**[https://www.trae.ai/](https://www.trae.ai/)
    

  

- **Cursor**
    

  

- **VS Code**
    

  

- 或者其他的代码编辑器都可以
    

  

下载安装完成之后，它本身是一个代码编辑器。

### 怎么操作？

  

1. 在代码编辑器的最上方会有一个“终端”（Terminal）
    

  

![](https://my.feishu.cn/space/api/box/stream/download/asynccode/?code=NDk1MjIyOGY1ZDdhMTZhYjhhODIyNmQ0MTM3ZDg1YTNfdHAwdlNaTlo0aWNCaUx5WlpZamhJYTR0ZlNVUmZuaVFfVG9rZW46U1o1NGJsdEpnb0FXVHR4WjZJT2M3azBlbkZlXzE3ODQ3NzE3ODA6MTc4NDc3NTM4MF9WNA&add_watermark=true&scene_type=CCM)

  

1. 点击打开它，这实际上是在编辑器中打开了一个终端
    

  

2. 在这个终端里输入 `claude` 命令来启动
    

  

![](https://my.feishu.cn/space/api/box/stream/download/asynccode/?code=ZWU5ODVmMjBiNTJhNmY1MzVkZDIwNGZkODBmNWFjNWFfOTRXenZuRXppSG1GZkJhZHVFeVdPOUdpQ0luVTZra0tfVG9rZW46RTJuZ2JTbmw4b3RoYlV4S0xzWGNYQldnbmFiXzE3ODQ3NzE3ODA6MTc4NDc3NTM4MF9WNA&add_watermark=true&scene_type=CCM)

  

启动完成后，你会发现它已经帮你在这个环境中安装并可以使用 Claude 了。接下来，你就可以可视化地看到它具体修改了哪些内容。

  

**这就是两者搭配使用的过程。只要设置到这一步，基本上就完成了小白的入门，接下来就可以愉快地使用 claude code 了！**

  

---

  

## 总结

  

这篇文章我们讲了：

1. **Claude Code 是什么**：一个能干活的 AI 智能体，不只是写代码
    
2. **Skills 是什么**：给 AI 的操作 SOP，让它按照标准化流程执行任务
    
3. **MCP 是什么**：工具接口，和 Skills 互为补充
    
4. **怎么安装 Claude Code**：通过终端安装，遇到问题让 AI 指导
    
5. **怎么设置 API Key**：购买积分制 API，按照指南配置
    
6. **怎么使用 Skills**：安装现成的或用 Skill Creator 创建
    
7. **可视化界面：**推荐用 Cursor 或 VS Code 搭配使用
    

  

---

  

接下来还有一些更进阶的内容，比如怎么自动切换 API，如何使用 claude 原生的 API，skills 的管理、如何使用 obsidian+claude code、我们后边的文章再跟大家分享。

  

如果觉得有启发，希望大家多多支持，**点赞、收藏并转发给有需要的朋友**。我们将继续从小白和初学者的视角，来分享到底怎么使用它。