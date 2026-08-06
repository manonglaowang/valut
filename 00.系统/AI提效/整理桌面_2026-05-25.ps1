# 整理桌面_2026-05-25.ps1
# 安全原则：只移动文件；不移动快捷方式；不移动完整应用程序文件夹；不删除文件。
# 生成时间：2026-05-25
$ErrorActionPreference = "Continue"
$desktop = [Environment]::GetFolderPath('Desktop')

$folders = @(
  '01_AI与培训材料',
  '02_RF测试与自动化文档',
  '03_安装包与工具',
  '04_测试数据与数据库',
  '05_Office临时锁文件_待确认',
  '99_待确认'
)
foreach($f in $folders){
  $p = Join-Path $desktop $f
  if(!(Test-Path -LiteralPath $p)){ New-Item -ItemType Directory -Path $p | Out-Null }
}

function Move-ExactFile($name, $folder){
  $src = Join-Path $desktop $name
  $dst = Join-Path $desktop $folder
  if(Test-Path -LiteralPath $src){
    Move-Item -LiteralPath $src -Destination $dst -Force
    Write-Host "已移动: $name -> $folder"
  }
}

Write-Host "=== 开始整理桌面：只移动文件，不删除 ==="
Write-Host "保留不动：*.lnk 快捷方式、desktop.ini、Hermes、scrcpy-win64-v3.3.4 等完整应用文件夹。"

# AI / 培训材料
Move-ExactFile '基于通义灵码与 AI Skill 的测试自动化新范式培训.pptx' '01_AI与培训材料'
Move-ExactFile '通义灵码最佳实践培训_对客.pptx' '01_AI与培训材料'

# RF / 测试 / 自动化文档
Move-ExactFile '可靠性测试报告自动化生成要求.xlsx' '02_RF测试与自动化文档'
Move-ExactFile 'AX626需实现自动化脚本用例.xlsx' '02_RF测试与自动化文档'

# 安装包与工具
Move-ExactFile '软件.exe' '03_安装包与工具'
Move-ExactFile 'scrt-x64-bsafe.9.6.3.3599.exe' '03_安装包与工具'
Move-ExactFile 'Steinmetz64.exe' '03_安装包与工具'

# 测试数据与数据库
Move-ExactFile '869521070413245_20260509_091016.db' '04_测试数据与数据库'
Move-ExactFile 'setting.txt' '04_测试数据与数据库'

# Office 临时锁文件：这些通常是 Office 打开文档时生成的隐藏小文件，不直接删除，先集中待确认
Get-ChildItem -LiteralPath $desktop -Force -File -ErrorAction SilentlyContinue |
  Where-Object { $_.Name -like '~$*' } |
  ForEach-Object {
    Move-Item -LiteralPath $_.FullName -Destination (Join-Path $desktop '05_Office临时锁文件_待确认') -Force
    Write-Host "已移动: $($_.Name) -> 05_Office临时锁文件_待确认"
  }

# 空文件夹 share1：不删除，先移动到待确认，避免误删
$share = Join-Path $desktop 'share1'
if(Test-Path -LiteralPath $share){
  $count = (Get-ChildItem -LiteralPath $share -Force -Recurse -ErrorAction SilentlyContinue | Measure-Object).Count
  if($count -eq 0){
    Move-Item -LiteralPath $share -Destination (Join-Path $desktop '99_待确认') -Force
    Write-Host "已移动空文件夹: share1 -> 99_待确认"
  }
}

Write-Host "=== 整理完成 ==="
Write-Host "建议复查 05_Office临时锁文件_待确认 和 99_待确认；确认无用后再手动删除。"
Write-Host "脚本执行完毕。"

