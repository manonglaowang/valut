#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Push a local Markdown article to WeChat Official Account draft box.

Usage:
  python wechat_draft.py --article "../../03.选题决策/文案草稿/xxx-公众号排版版.md" \
    --cover "../../03.选题决策/文案草稿/assets/AI一人公司公众号封面.png"

Secrets are read from .env in this directory by default.
"""

from __future__ import annotations

import argparse
import json
import mimetypes
import os
import re
import sys
from pathlib import Path
from typing import Dict, Tuple

import requests
from bs4 import BeautifulSoup
import markdown

API_BASE = "https://api.weixin.qq.com"


def load_env(path: Path) -> Dict[str, str]:
    env: Dict[str, str] = {}
    if path.exists():
        for line in path.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            k, v = line.split("=", 1)
            env[k.strip()] = v.strip().strip('"').strip("'")
    for k in ("WECHAT_APP_ID", "WECHAT_APP_SECRET", "WECHAT_ACCOUNT"):
        if os.getenv(k):
            env[k] = os.getenv(k, "")
    return env


def api_get(url: str, **kwargs) -> dict:
    r = requests.get(url, timeout=20, **kwargs)
    r.raise_for_status()
    data = r.json()
    if data.get("errcode"):
        raise RuntimeError(f"WeChat API error: {data}")
    return data


def api_post_json(url: str, payload: dict) -> dict:
    r = requests.post(
        url,
        data=json.dumps(payload, ensure_ascii=False).encode("utf-8"),
        headers={"Content-Type": "application/json; charset=utf-8"},
        timeout=30,
    )
    r.raise_for_status()
    data = r.json()
    if data.get("errcode"):
        raise RuntimeError(f"WeChat API error: {data}")
    return data


def get_access_token(appid: str, secret: str) -> str:
    url = f"{API_BASE}/cgi-bin/token"
    data = api_get(url, params={"grant_type": "client_credential", "appid": appid, "secret": secret})
    return data["access_token"]


def upload_permanent_image(access_token: str, image_path: Path) -> str:
    if not image_path.exists():
        raise FileNotFoundError(image_path)
    mime = mimetypes.guess_type(str(image_path))[0] or "image/png"
    url = f"{API_BASE}/cgi-bin/material/add_material"
    with image_path.open("rb") as f:
        files = {"media": (image_path.name, f, mime)}
        r = requests.post(url, params={"access_token": access_token, "type": "image"}, files=files, timeout=60)
    r.raise_for_status()
    data = r.json()
    if data.get("errcode"):
        raise RuntimeError(f"Upload cover failed: {data}")
    if "media_id" not in data:
        raise RuntimeError(f"Upload cover returned unexpected data: {data}")
    return data["media_id"]


def upload_content_image(access_token: str, image_path: Path) -> str:
    """Upload an image for use inside article content and return WeChat CDN URL."""
    if not image_path.exists():
        raise FileNotFoundError(image_path)
    mime = mimetypes.guess_type(str(image_path))[0] or "image/png"
    url = f"{API_BASE}/cgi-bin/media/uploadimg"
    with image_path.open("rb") as f:
        files = {"media": (image_path.name, f, mime)}
        r = requests.post(url, params={"access_token": access_token}, files=files, timeout=60)
    r.raise_for_status()
    data = r.json()
    if data.get("errcode"):
        raise RuntimeError(f"Upload content image failed: {data}")
    if "url" not in data:
        raise RuntimeError(f"Upload content image returned unexpected data: {data}")
    return data["url"]


def strip_frontmatter(md: str) -> str:
    return re.sub(r"\A---\s*\n.*?\n---\s*\n", "", md, flags=re.S)


def parse_markdown_article(md_text: str) -> Tuple[str, str, str]:
    """Return title, digest, body markdown."""
    md_text = strip_frontmatter(md_text).replace("\r\n", "\n")
    lines = md_text.splitlines()
    title = ""
    body_start = 0
    for i, line in enumerate(lines):
        if line.startswith("# "):
            title = line[2:].strip()
            body_start = i + 1
            break
    if not title:
        title = "未命名文章"
    body = "\n".join(lines[body_start:]).strip()
    # Remove Obsidian metadata quote block at top if any
    body = re.sub(r"\A> .*?(?:\n> .*?)*\n\s*---\s*\n", "", body, flags=re.S)
    plain = re.sub(r"[`*_>#\-\[\]\(\)]", "", body)
    plain = re.sub(r"\s+", " ", plain).strip()
    digest = plain[:120]
    return title, digest, body


def markdown_to_wechat_html(md_body: str, article_path: Path | None = None, access_token: str | None = None) -> str:
    html = markdown.markdown(md_body, extensions=["extra", "sane_lists"])
    soup = BeautifulSoup(html, "html.parser")

    # Upload local images in Markdown content to WeChat and replace their src.
    # Supports normal markdown images like: ![alt](assets/foo.png)
    if article_path is not None and access_token:
        for img in soup.find_all("img"):
            src = (img.get("src") or "").strip()
            if not src or re.match(r"^https?://", src, flags=re.I):
                continue
            local_path = (article_path.parent / src).resolve()
            wx_url = upload_content_image(access_token, local_path)
            img["src"] = wx_url
            img["data-src"] = wx_url
            img["style"] = "max-width:100%;height:auto;display:block;margin:22px auto;border-radius:8px;"

    # Basic readable inline styles for WeChat editor.
    for h2 in soup.find_all("h2"):
        h2["style"] = "font-size:20px;font-weight:700;margin:32px 0 16px;color:#111;line-height:1.4;"
    for h1 in soup.find_all("h1"):
        h1["style"] = "font-size:22px;font-weight:700;margin:24px 0 18px;color:#111;line-height:1.4;"
    for p in soup.find_all("p"):
        p["style"] = "font-size:16px;line-height:1.9;margin:14px 0;color:#222;"
    for blockquote in soup.find_all("blockquote"):
        blockquote["style"] = "border-left:4px solid #2f80ed;padding:8px 14px;margin:20px 0;background:#f7f9fc;color:#333;"
        for p in blockquote.find_all("p"):
            p["style"] = "font-size:16px;line-height:1.8;margin:6px 0;color:#333;font-weight:600;"
    for li in soup.find_all("li"):
        li["style"] = "font-size:16px;line-height:1.9;margin:6px 0;color:#222;"
    for hr in soup.find_all("hr"):
        hr["style"] = "border:none;border-top:1px solid #eee;margin:28px 0;"
    for strong in soup.find_all("strong"):
        strong["style"] = "font-weight:700;color:#111;"

    return str(soup)


def add_draft(access_token: str, title: str, author: str, digest: str, content_html: str, thumb_media_id: str, source_url: str = "") -> str:
    url = f"{API_BASE}/cgi-bin/draft/add?access_token={access_token}"
    payload = {
        "articles": [
            {
                "title": title[:64],
                "author": author[:8],
                "digest": digest[:120],
                "content": content_html,
                "content_source_url": source_url,
                "thumb_media_id": thumb_media_id,
                "show_cover_pic": 0,
                "need_open_comment": 1,
                "only_fans_can_comment": 0,
            }
        ]
    }
    data = api_post_json(url, payload)
    if "media_id" not in data:
        raise RuntimeError(f"Add draft returned unexpected data: {data}")
    return data["media_id"]


def main() -> int:
    here = Path(__file__).resolve().parent
    parser = argparse.ArgumentParser(description="Push Markdown article to WeChat draft box")
    parser.add_argument("--article", required=True, help="Markdown article path")
    parser.add_argument("--cover", required=True, help="Cover image path")
    parser.add_argument("--env", default=str(here / ".env"), help=".env path")
    parser.add_argument("--author", default="码农老王", help="Author shown in WeChat")
    parser.add_argument("--title", default="", help="Override title")
    parser.add_argument("--digest", default="", help="Override digest")
    parser.add_argument("--source-url", default="", help="Read original URL")
    parser.add_argument("--dry-run", action="store_true", help="Only render HTML preview, do not call WeChat API")
    args = parser.parse_args()

    env = load_env(Path(args.env))
    appid = env.get("WECHAT_APP_ID", "")
    secret = env.get("WECHAT_APP_SECRET", "")
    if not appid or not secret:
        raise RuntimeError("Missing WECHAT_APP_ID or WECHAT_APP_SECRET in .env")

    article_path = Path(args.article).resolve()
    cover_path = Path(args.cover).resolve()
    md_text = article_path.read_text(encoding="utf-8")
    title, digest, body = parse_markdown_article(md_text)
    if args.title:
        title = args.title
    if args.digest:
        digest = args.digest
    token = ""
    if not args.dry_run:
        token = get_access_token(appid, secret)
        print("Access token acquired.")
    html = markdown_to_wechat_html(
        body,
        article_path=article_path,
        access_token=token or None,
    )

    preview_path = article_path.with_suffix(".wechat-preview.html")
    preview_path.write_text(html, encoding="utf-8")
    print(f"HTML preview written: {preview_path}")
    print(f"Title: {title}")
    print(f"Digest: {digest}")

    if args.dry_run:
        print("Dry run complete. No WeChat draft created.")
        return 0

    thumb_media_id = upload_permanent_image(token, cover_path)
    print(f"Cover uploaded. thumb_media_id={thumb_media_id}")
    draft_media_id = add_draft(token, title, args.author, digest, html, thumb_media_id, args.source_url)
    print(f"Draft created successfully. media_id={draft_media_id}")
    print("请到微信公众号后台草稿箱检查排版后再发布。")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as e:
        print(f"ERROR: {e}", file=sys.stderr)
        raise SystemExit(1)
