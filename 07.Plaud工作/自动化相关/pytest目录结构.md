### 一、推荐目录结构

script/  
└── sigma/ # 项目  
├── [conftest.py](http://conftest.py/) # 项目级能力装配  
├── fun
│ ├── bind/ # 一级分类：功能测试  / # 二级分类：绑定  
│ │ ├── test_fun_bind.py  
│ │ └── test_unbind.py  
│ ├── ota/  
│ │ └── test_ota.py  
│ └── recording/  
├── IN/ # 一级分类：接口测试  
├── PR/ # 一级分类：性能测试  
└── LT/ # 一级分类：长稳测试

将来多项目：

script/  
├── sigma/  
├── note/  
├── pin/  
└── future_product/

目录使用稳定英文编码，中文显示名称放在分类配置中，避免路径重命名。

### 二、层级如何对应

维度 pytest结构 Allure层级 职责

━━━━━━━━━━ ━━━━━━━━━━━━━━━━━━━━━━━━ ━━━━━━━━━━━━━ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
项目 script/sigma Epic Sigma、Note、Pin  
────────── ──────────────────────── ───────────── ──────────────────────────────────  
一级分类 FN Feature 功能、接口、性能、长稳  
────────── ──────────────────────── ───────────── ──────────────────────────────────  
二级分类 bind Story 绑定、OTA、录音  
────────── ──────────────────────── ───────────── ──────────────────────────────────  
Module test_bind.py Suite 一组执行环境和状态策略相同的用例  
────────── ──────────────────────── ───────────── ──────────────────────────────────  
Class TestBindFromUnbound Sub-suite 相同前置状态的一组用例  
────────── ──────────────────────── ───────────── ──────────────────────────────────  
Case test_sigma_fn_bind_003 Test case 一条独立、可执行、可追踪用例  
────────── ──────────────────────── ───────────── ──────────────────────────────────  
Scene scene_bind_device() Allure Step 完整业务流程  
────────── ──────────────────────── ───────────── ──────────────────────────────────  
Single single_xxx() 嵌套 Step 原子动作

一级、二级分类由你提供；Module 和 Class 应按执行生命周期划分，而不是为了目录美观强行建立。

### 三、Module、Class、Case规则

Module 表示“共享同一执行策略的一批用例”。

例如：

bind/  
├── test_bind_from_unbound.py  
├── test_rebind_from_bound.py  
└── test_unbind_from_bound.py

Class 只在确实存在相同生命周期时使用：

class TestBindFromUnbound:  
"""每条用例都从未绑定状态开始。"""

class TestUnbindFromBound:  
"""每条用例都从已绑定状态开始。"""

如果一个文件只有三五条用例，而且前置相同，可以不用 Class。不要为了层级完整而创建空壳 Class。

Case 永远是一条独立测试：

@pytest.mark.case_id("sigma_fn_bind_003")  
@pytest.mark.initial_state("unbound")  
@pytest.mark.final_state("bound")  
def test_bind_device(target_sn, bind_scene):  
bind_scene.ensure_bound(target_sn)

Case ID 必须永久稳定。目录、标题、分类可以变化，但 ID 不应变化。

### 四、setup/teardown分层

pytest作用域 适合负责 不应该负责

━━━━━━━━━━━━━━━━━ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ━━━━━━━━━━━━━━━━━━━━━━━━  
Session 测试工站、配置、CDC采集进程、报告服务 改变某条用例的设备状态  
───────────────── ───────────────────────────────────────────── ────────────────────────  
Project/Package 项目插件、产品配置、固件协议 绑定/解绑等业务状态  
───────────────── ───────────────────────────────────────────── ────────────────────────  
Module 当前模块所需设备和资源检查 假设所有用例执行成功  
───────────────── ───────────────────────────────────────────── ────────────────────────  
Class 代价较高且可安全共享的环境 会被用例修改的绑定状态  
───────────────── ───────────────────────────────────────────── ────────────────────────  
Function 初始状态归一化、CDC游标、失败取证、恢复状态 全局服务启停

硬件状态最安全的原则是：每条 Case 在 function setup 中确认前置状态，不能依赖上一条用例留下的状态。

### 五、状态驱动，不让分类控制前后置

建议建立统一状态标记：

@pytest.mark.initial_state("unbound")  
@pytest.mark.final_state("unbound")

框架用一个 function-scope fixture 处理：

读取 initial_state  
↓  
状态检查  
↓  
不满足则通过 Scene 恢复  
↓  
记录 CDC 游标  
↓  
执行 Case  
↓  
失败现场采集  
↓  
按 final_state 恢复

支持的状态可以逐步扩展：

unbound  
bound  
idle  
recording  
charging  
buds_in_case  
buds_out_of_case  
ota_ready

这样即使“绑定”将来从 FN 调整到其他分类，setup/teardown 完全不用修改。

### 六、分类配置建议

新增一个受控分类表，例如：

projects:  
sigma:  
name: Sigma  
categories:  
FN:  
name: 功能测试  
subcategories:  
bind:  
name: 绑定与解绑  
ota:  
name: OTA升级  
recording:  
name: 录音

它只负责：

- 分类合法性校验
- Allure 中文名称
- TMS同步映射
- 用例统计

它不直接配置硬件动作和 setup/teardown，避免 YAML 变成难以调试的执行引擎。

### 七、当前框架需要调整的地方

目前 script_driver.py 同时包含：

- autouse fixture
- Case编排
- Scene调用
- 公共标签

而测试文件还需要手动导入 case_setup 才能生效。用例达到几万条时，这种隐式依赖很难管理。

建议逐步调整为：

1. script_driver.py 只保留 Case到Scene的薄编排。
2. fixture 全部进入 fixtures/ 或对应项目的 [conftest.py](http://conftest.py/)。
3. 用例通过 initial_state/final_state 显式声明生命周期。
4. 收集阶段自动校验项目、分类、Case ID、状态和能力标签。
5. Allure 的 Epic/Feature/Story 由路径和分类表自动注入，不要求每条用例手写。
6. 禁止跨 Case 依赖执行顺序。
7. 同一硬件工站默认串行；未来并行以工站/设备资源为调度单位。

最终建议的数据模型是：

项目 → 一级分类 → 二级分类 → Module → 状态组Class → Case  
↓  
生命周期Profile  
↓  
Scene → Single → Driver

这套结构能支撑数万条用例，也能保证分类变化不会破坏 setup/teardown。等你提供一级、二级分类后，下一步应先完成“分类注册表 + 路径规范 + 生命周期标记  
规范”，再迁移现有绑定、OTA、录音用例作为标准样板。