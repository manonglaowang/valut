---
name: weread
description: WeChat Reading / 微信读书 CLI assistant. Use when the user asks to connect, configure, search, export, summarize, or sync WeRead books, bookshelf, notes, highlights, reading stats, or WeRead-to-Obsidian workflows. Prefer local `weread` CLI from `weread-agent-cli`; use `--json --compact` for agent parsing.
---

# WeRead CLI

## Preconditions
- CLI command: `weread` from npm package `weread-agent-cli`.
- Auth requires WeRead API Key, usually `wrk-...`, from <https://weread.qq.com/r/weread-skills>.
- Save key with: `weread config set-key "wrk-..."`.
- Check status with: `weread doctor`.

## Agent rules
1. Use `weread --json --compact ...` when parsing output.
2. Do not ask for or print API Key unless user explicitly provides it for setup.
3. Prefer writing exported notes to an Obsidian folder such as `03.参考资料库/微信读书/`.
4. For large exports, write JSON/Markdown to files first, then summarize.
5. If auth is missing, guide user to obtain API Key and run `weread config set-key`.

## Common commands
```powershell
weread doctor
weread search "三体" --scope book
weread book resolve "三体"
weread shelf list
weread shelf recent --limit 10
weread book info <bookId>
weread book chapters <bookId>
weread book progress <bookId>
weread notes notebooks --count 100
weread notes top --limit 20
weread notes export <bookId> --format markdown --output notes.md
weread readdata detail --mode annually
weread readdata summary --mode monthly
weread discover recommend --count 12
```

## Obsidian workflow
1. Search/resolve a book.
2. Export notes as Markdown to `03.参考资料库/微信读书/<书名>.md`.
3. Add frontmatter: source, bookId, author, tags.
4. Link reading notes to projects or topic notes.
