# Skill 沉淀清单（.claude/skills）

> 源路径：`D:\Code\plaud_qa_auto_test\.claude\skills\`。这 5 个 skill 是把 [[01-硬件实测踩坑知识]] 里的经验固化成"遇到症状 → 直接查这个"的可执行清单，避免同样的坑靠记忆重新踩一遍。

| Skill | 触发时机 | 核心内容 |
|---|---|---|
| **sigma-smoke-run** | 跑真机冒烟/回归、准备测试环境，或遇到 COM3 拒绝访问、串口超时、用例全 skip、SELECTOR_DRIFT、adb 桥僵死 | 运行配方（前置服务/命令/报告/日志归档）+ 故障速查表，是"日常跑测"的入口 skill |
| **sigma-log-anchor-debugging** | 固件/UART 日志断言超时、`single_wait_fw_log` 等待失败、日志锚点找不到、怀疑 UART 停流 | 排查顺序（日志是否在流动 > 锚点漂移 > base64 截断 > 语义理解错），附关键锚点速查表 |
| **sigma-hardware-attribution** | 继电器通道标定、新传感器/按键接入验证、"继电器动作了但固件没反应"归因、设计硬件激励类实验 | 归因方法论（逐层验证根因链）+ 已定论坑清单（压感不能用继电器、红外可模拟佩戴等），避免重复实验 |
| **sigma-firmware-upgrade-checklist** | SIGMA 固件升级/OTA 后（T0.2.x 版本变更）需要校准环境，或升级后日志断言超时、APP 设备列表为空、trace 解码乱码、鉴权行为变化 | 升级后必做清单（trace 目录/版本号/重新绑定/复验锚点/重测鉴权）+ 常见误判对照表 |
| **sigma-wda-page-porting** | 移植/新增 iOS APP 页面对象到 WDA 元素树方案，或 WDA 元素找不到、isVisible 为 false、点击无效、同名多元素 | 移植套路（选择器进注册表→页面对象继承基座→single 层内聚断言→过预检）+ WDA 已知坑 |

## 使用原则

遇到问题先按"症状"对号入座到对应 skill，而不是凭记忆或重新实验——这几个 skill 本身就是"已知结论，别重新实验"的固化。skill 之间有交叉引用（如 sigma-smoke-run 的故障速查表会指向 sigma-log-anchor-debugging 和 sigma-firmware-upgrade-checklist），日常运行时以 sigma-smoke-run 为入口即可。
