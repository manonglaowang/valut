---
author: 彭少
source: 微信公众号
url: https://mp.weixin.qq.com/s?__biz=Mzg3NzU2NjY3OQ==&mid=2247491745&idx=1&sn=7b54ad9ce13e4afae5f495a4f87ae354&chksm=ce70adba7ed5f15be1051abc8126fbc153ade440a93dafb807e8356a00e1abd345c9c82f6987&mpshare=1&scene=1&srcid=0527YGI47eIKAK9lUDURjkux&sharer_shareinfo=45be645d99a357a2f2760e90bc0fc0bd&sharer_shareinfo_first=45be645d99a357a2f2760e90bc0fc0bd#rd
saved: 2026-05-27 16:26:42
tags:
  - 笔记同步助手
id: 799d133c-ab4b-4c94-a719-bba261917f14
---

公众号名称：彭少

作者名称：彭少

发布时间：2026-05-27 12:25

原文链接：[https://l0aerbtrigp.feishu.cn/wiki/WKagwkl4Ai7kf1kdHvfcUironPe?from=from\_copylink](https://l0aerbtrigp.feishu.cn/wiki/WKagwkl4Ai7kf1kdHvfcUironPe?from=from_copylink)

**点击上方卡片关注我**

**设置星标 学习更多AI出海知识**

这两天看到一个挺有意思的小工具，叫 **skill-cleaner**。

它不是帮你写 Skill 的，而是反过来帮你检查现有的 Skills：哪些描述太长，哪些 Skill 重复了，哪些很久没用过，哪些会占掉太多 prompt budget。

每个人手里都装了不少 Claude Code、Codex、OpenClaw 相关的 Skills 吧，这个工具就挺值得看一下。

![[笔记同步助手/images/9aa2eef3562227e53b4972455d21e8a9_MD5.png]]

## Skill 多了以后，也会变成负担

Skills 这个机制很好用。

它可以把一套固定工作流写成 Markdown 文件，让 Agent 在遇到相关任务时自动加载，比如代码审查、写文章、操作飞书、处理图片、发布内容等等。

但用久了之后，一个新问题会出现：Skill 会越来越多。

一开始可能只有几个全局 Skill，后来装了插件，又从 GitHub 上下载了一些别人分享的 Skill，再加上项目里自己写的 `.codex/skills` 或 `.claude/skills`，最后很容易变成几十个甚至上百个。

这时候问题不是有没有 Skill，而是 Agent 能不能准确找到该用的那个 Skill。

Skill 的名字、描述、位置都会影响模型判断。如果两个 Skill 功能很像，描述又写得差不多，Agent 就可能选错。描述写太长，也会占用 prompt budget。长期不用的 Skill 留在那里，也会让整个工具系统越来越臃肿。

这也是 skill-cleaner 这个工具的价值点。

## 它主要检查什么

从 GitHub 仓库里的说明看，skill-cleaner 主要做几类检查。

它会先统计 Skill Budget，也就是这些 Skill 描述在模型上下文里占了多少空间。

它按 Codex 的规则估算 token 成本，默认参考 GPT-5.5 的 context size，并按 2% skills budget 来看当前 Skills 列表是否太重。

它还会找 description candidates，也就是描述过长、可以压缩的 Skill。

Skill 的 description 不是越详细越好，真正重要的是保留触发词，让 Agent 知道“什么任务该用它”。如果把完整工作流都塞进 description，反而会浪费模型可见上下文。

另一个实用点是重复检测。它会检查同名 Skill，或者描述、正文高度相似的 Skill。

比如 Codex 内置已经有一个能力，你又在个人目录或项目目录里放了一个近似版本，就可能造成重复。

它还会给出 unused candidates，也就是最近日志里没有明显使用痕迹的 Skill。这个判断是启发式的，会扫近期 Codex / OpenClaw 日志，看有没有 `$skill` 提及、`SKILL.md` 读取记录或显式调用痕迹。

最后还有 root summary，用来告诉你这些 Skills 分别来自哪里，哪些是 Codex 系统 Skill，哪些来自插件缓存，哪些来自个人目录或项目目录。

![[笔记同步助手/images/819215e99cebee0c7726023417b4a8cf_MD5.png]]

## 用 AI Agent 跑就行

这类工具现在已经不太需要人手动记命令了。

直接把仓库地址丢给 AI，让它自己去读说明、判断怎么安装、怎么运行，然后把结果整理给你。

比如可以直接对 Codex 或 Claude Code 说：

```
请阅读这个仓库：
https://github.com/steipete/agent-scripts/tree/main/skills/skill-cleaner

帮我理解 skill-cleaner 是做什么的，并在不删除任何文件的前提下，对我本地的 Skills 做一次体检。
最后请输出一份报告，告诉我：
1. 哪些 Skill description 太长
2. 哪些 Skill 可能重复
3. 哪些 Skill 最近没有使用痕迹
4. 哪些 Skill 来自系统、插件、个人目录或项目目录
5. 哪些只建议观察，哪些可以考虑合并或删除
```

这样用会更符合 AI Agent 的工作方式。

让 Agent 先读仓库里的 `SKILL.md` 和脚本说明，再决定应该用哪个参数跑。跑完以后，也不要让它直接删文件，而是先让它输出体检报告。

![[笔记同步助手/images/3d4779a273c308bc16cd624415099eb5_MD5.png]]

## 不要把它当成一键清理

这个工具不是帮你“一键删除无用 Skill”。

恰恰相反，仓库说明里也写得比较克制：先建议，再编辑。真正要删除或修改之前，最好确认保留的那一份确实存在，而且是当前环境会加载的版本。

这点很重要。

有些项目级 Skill 看起来和全局 Skill 重复，但它里面可能写了项目自己的规则，比如部署流程、数据库规范、线上事故处理方式。这种 Skill 不能随便删。

有些 OpenClaw 或 Codex 相关的维护 Skill，也可能和通用 Skill 名字接近，但里面有具体的运维约束。它们不是“重复”，而是特定场景下的安全边界。

所以更合理的用法是，把 skill-cleaner 当成一次体检。

它帮你指出哪里可能有问题，但最后要不要删、要不要合并、要不要改 description，还是要结合自己的工作流判断。

## 我觉得它适合谁

如果你只是刚开始用 Claude Code 或 Codex，本地只有两三个 Skill，这个工具暂时不用急。

但如果你已经开始大量使用 Skills，尤其是同时用了全局 Skill、项目 Skill、插件 Skill、别人分享的 Skill，那就很适合定期跑一下。

AI Agent 的能力变强之后，很多人会关注怎么继续加工具、加 MCP、加 Skill。但从实际使用来看，工具不是越多越好。

能被准确触发、能稳定执行、能在合适的时候加载，才是真正有用的工具。

相关链接：

-   GitHub 仓库：https://github.com/steipete/agent-scripts/tree/main/skills/skill-cleaner
    

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

**[从海外公司注册到 Stripe 收款，跑通了出海收付款全流程（实操分享）](https://mp.weixin.qq.com/s?__biz=Mzg3NzU2NjY3OQ==&mid=2247489551&idx=1&sn=08058b274add835f37b3374fa43b6757&scene=21#wechat_redirect)**

---

![[笔记同步助手/images/3b6f7c73c8a0c7522aa61e20e1f9e731_MD5.jpg|cover_image]]

Original 彭少 彭少

Read more

---

内容效果不满意？[点此反馈](https://feedback.notebooksyncer.com/feedback/06bdb3af_1779870399922?u=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzg3NzU2NjY3OQ%3D%3D%26mid%3D2247491745%26idx%3D1%26sn%3D7b54ad9ce13e4afae5f495a4f87ae354%26chksm%3Dce70adba7ed5f15be1051abc8126fbc153ade440a93dafb807e8356a00e1abd345c9c82f6987%26mpshare%3D1%26scene%3D1%26srcid%3D0527YGI47eIKAK9lUDURjkux%26sharer_shareinfo%3D45be645d99a357a2f2760e90bc0fc0bd%26sharer_shareinfo_first%3D45be645d99a357a2f2760e90bc0fc0bd%23rd&s=obsidian)