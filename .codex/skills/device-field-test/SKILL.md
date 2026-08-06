---
name: device-field-test
description: Assist with device field testing, Android/ADB/scrcpy workflows, serial tools, modem logs, route-test data, SQLite/DB files, and post-test evidence packaging. Use when the user needs to collect, inspect, classify, or analyze device test data.
---

# Device Field Test

## Workflow
1. Identify device, firmware, IMEI/SN, test scenario, location/network, and toolchain.
2. Collect evidence: logs, screenshots, DB files, command output, and timestamps.
3. Normalize filenames using device + date + scenario.
4. Separate raw data, processed results, screenshots, and final conclusions.
5. Produce issue summary: symptom, reproduction path, evidence, suspected layer, next action.

## Safety
Never modify raw logs. Work on copies for parsing or transformation.
