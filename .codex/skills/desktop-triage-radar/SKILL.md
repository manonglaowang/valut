---
name: desktop-triage-radar
description: Scan Windows Desktop/Downloads folders, infer work context from filenames, classify files, and generate safe PowerShell organization scripts. Use when the user asks to organize desktop, clean downloads, classify messy files, or infer work patterns from local files.
---

# Desktop Triage Radar

## Workflow
1. Scan only shallow structure first: top-level files and folders, then depth 1-2 for suspicious folders.
2. Never delete files. Move uncertain items to `99_待确认`.
3. Do not move `.lnk`, `desktop.ini`, or app folders containing `.exe/.dll/runtimes` unless the user explicitly confirms.
4. Classify by work context, not only file extension: AI training, RF testing, reports, installers, data/logs, temporary Office locks.
5. Generate a PowerShell script using `Move-Item -LiteralPath`; include a clear summary and recovery notes.

## Output
- File inventory summary.
- Human identity/work inference with evidence.
- Safe organization script.
- Follow-up checklist for items requiring confirmation.
