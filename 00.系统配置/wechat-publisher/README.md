# 微信公众号草稿箱发布工具

把 vault 中的 Markdown 文章推送到微信公众号草稿箱。

## 文件

- `.env`：本地密钥，已加入 `.gitignore`，不要分享。
- `.env.example`：配置模板。
- `wechat_draft.py`：推送脚本。
- `requirements.txt`：依赖。

## 安装依赖

```powershell
cd 00.系统配置/wechat-publisher
python -m pip install -r requirements.txt
```

## 先本地预览，不调用微信 API

```powershell
cd 00.系统配置/wechat-publisher
python .\wechat_draft.py `
  --article "..\..\03.选题决策\文案草稿\我理解的 AI 一人公司：深度聚焦，和 AI 共创-公众号排版版.md" `
  --cover "..\..\03.选题决策\文案草稿\assets\AI一人公司公众号封面.png" `
  --dry-run
```

会生成 `.wechat-preview.html`，用于检查 HTML。

## 推送到公众号草稿箱

```powershell
cd 00.系统配置/wechat-publisher
python .\wechat_draft.py `
  --article "..\..\03.选题决策\文案草稿\我理解的 AI 一人公司：深度聚焦，和 AI 共创-公众号排版版.md" `
  --cover "..\..\03.选题决策\文案草稿\assets\AI一人公司公众号封面.png" `
  --title "普通人做 AI 一人公司，第一步不是辞职" `
  --author "码农老王"
```

成功后，去微信公众号后台草稿箱检查排版。

## 常见问题

### invalid appid / secret

检查 `.env` 中 AppID 和 AppSecret 是否正确。

### ip not in whitelist

微信公众号后台可能需要配置 IP 白名单。把当前电脑出口公网 IP 加到公众号后台的 IP 白名单。

### 封面上传失败

检查图片格式和大小。建议 JPG/PNG，大小不要过大。

### 正文图片

当前脚本主要处理封面图。正文内如果要插图，需要先上传到微信图文图片接口，再替换正文 HTML 中的图片 URL。
