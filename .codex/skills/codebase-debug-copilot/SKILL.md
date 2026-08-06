---
name: codebase-debug-copilot
description: Analyze engineering tool codebases to trace bugs, explain architecture, locate call chains, assess change impact, and propose safe fixes. Use for .NET/C#/WPF, Excel export, database services, YAML configs, and test automation tools.
---

# Codebase Debug Copilot

## Workflow
1. Reproduce or restate the bug with inputs, expected behavior, and actual behavior.
2. Search for entry points, service methods, mappings, and tests before editing.
3. Trace data flow end-to-end: UI → service → database/file → exporter → report.
4. Make minimal changes and preserve existing contracts.
5. Run targeted tests/builds when available; summarize risk and rollback.

## Output
Root cause, changed files, risk, validation command, and next tests.
