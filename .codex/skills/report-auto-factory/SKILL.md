---
name: report-auto-factory
description: Build automated test-report workflows from Excel templates, YAML/JSON mappings, databases, logs, and raw measurement data. Use when the user needs reliability/RF/GNSS report generation, template field mapping, export debugging, or report data validation.
---

# Report Auto Factory

## Workflow
1. Identify report template, source data, mapping rules, and output format.
2. List every single-value field and table field that must be populated.
3. Validate source row counts before export; report missing/extra records.
4. Preserve template formatting; avoid overwriting formulas unless required.
5. Generate mapping YAML/JSON suggestions and test cases for export verification.

## Checks
- Database count vs exported count.
- EUT/Sample result mapping.
- Unit conversion and precision.
- Empty cells that should be populated.
