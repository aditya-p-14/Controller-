"""修复 SCREENS.ui 的循环依赖。

策略：
1. core.js 中 SCREENS 定义时，ui 字段设为 null
2. core.js 中所有 `SCREENS.xxx.ui = ...` 移到对应 ui-*.js 末尾
"""
from pathlib import Path

ROOT = Path(r"C:/Workspace/Documents/无人机/原型")
JS = ROOT / "js"

# 读取所有相关 JS
core = (JS / "core.js").read_text(encoding='utf-8')
core_lines = core.split('\n')

# core.js 中需要处理的 SCREENS 项
SCREENS_IN_CORE = [
    'home', 'work', 'logs', 'devices', 'account',
    'droneSettings', 'settings', 'linkQuality',
]

# ui-*.js 末尾需要追加的赋值
UI_FILES = {
    'ui-home.js': [
        "SCREENS.home.ui = homeUI;",
    ],
    'ui-work.js': [
        "SCREENS.work.ui = workUI;",
    ],
    'ui-logs.js': [
        "SCREENS.logs.ui = logsUI;",
    ],
    'ui-devices.js': [
        "SCREENS.devices.ui = devicesUI;",
    ],
    'ui-account.js': [
        "SCREENS.account.ui = accountUI;",
        "SCREENS.flightRecords.ui = flightRecordsUI;",
        "SCREENS.insurance.ui = insuranceUI;",
        "SCREENS.noFly.ui = noFlyUI;",
        "SCREENS.noFlyDownload.ui = noFlyDownloadUI;",
        "SCREENS.noFlyMap.ui = noFlyMapUI;",
        "SCREENS.noFlyPreview.ui = noFlyPreviewUI;",
    ],
    'ui-settings.js': [
        "SCREENS.settings.ui = settingsUI;",
        "SCREENS.unitSettings.ui = unitSettingsUI;",
        "SCREENS.voiceSettings.ui = voiceSettingsUI;",
        "SCREENS.policySettings.ui = policySettingsUI;",
        "SCREENS.realNameSettings.ui = realNameSettingsUI;",
        "SCREENS.systemSettings.ui = systemSettingsUI;",
        "SCREENS.offlineMap.ui = offlineMapUI;",
    ],
    'ui-drone.js': [
        "SCREENS.droneSettings.ui = droneSettingsUI;",
        "SCREENS.airAdvanced.ui = droneSubUI();",
        "SCREENS.rockerCalibration.ui = rockerCalibrationUI;",
        "SCREENS.customKeys.ui = customKeysUI;",
        "SCREENS.remoteDiagnosis.ui = remoteDiagnosisUI;",
        "SCREENS.workRealtime.ui = workRealtimeUI;",
        "SCREENS.nozzleConfig.ui = nozzleConfigUI;",
        "SCREENS.ntripConfig.ui = ntripConfigUI;",
        "SCREENS.rtkDiagnosis.ui = rtkDiagnosisUI;",
        "SCREENS.satelliteSignal.ui = rtkSnrUI;",
        "SCREENS.dotAccuracy.ui = rtkDotUI;",
        "SCREENS.linkQuality.ui = linkQualityUI;",
        "SCREENS.frontVideoStream.ui = ()=>otherSettingsUI('frontVideo');",
        "SCREENS.rearVideoStream.ui = ()=>otherSettingsUI('rearVideo');",
        "SCREENS.droneLanguage.ui = droneLanguageUI;",
        "SCREENS.droneInsurance.ui = otherInsuranceUI;",
        "SCREENS.maintenance.ui = maintenanceUI;",
    ],
    'ui-flight.js': [
        "SCREENS.flightManual.ui = flightManualUIV7;",
    ],
}

# === 步骤 1: 修复 core.js ===
# 替换 ui:homeUI → ui:null
import re

# ui:homeUI, ui:workUI 等
patterns = [
    (r',ui:homeUI,', ',ui:null,'),
    (r',ui:workUI,', ',ui:null,'),
    (r',ui:logsUI,', ',ui:null,'),
    (r',ui:devicesUI,', ',ui:null,'),
    (r',ui:accountUI,', ',ui:null,'),
    (r',ui:droneSettingsUI,', ',ui:null,'),
    (r',ui:settingsUI,', ',ui:null,'),
    (r',ui:\(\)=>droneSubUI\(.+?\)\),', ',ui:null,'),
]
core = core_lines if isinstance(core_lines, str) else '\n'.join(core_lines)
if isinstance(core_lines, list):
    core = '\n'.join(core_lines)
for pat, rep in patterns:
    new_core = re.sub(pat, rep, core)
    if new_core != core:
        # 统计替换次数
        cnt = len(re.findall(pat, core))
        print(f'替换 {pat} → {cnt} 次')
        core = new_core

# 删除 core.js 中的 SCREENS.xxx.ui = ... 赋值语句
# 找到所有 SCREENS.xxx.ui=... 行，删除（保留其他 SCREENS.xxx 行）
lines = core.split('\n')
new_lines = []
removed = 0
for line in lines:
    if re.match(r'^SCREENS\.\w+\.ui=', line):
        removed += 1
        continue
    new_lines.append(line)
print(f'移除 SCREENS.xxx.ui 赋值: {removed} 行')
core = '\n'.join(new_lines)

(JS / "core.js").write_text(core, encoding='utf-8')
print('core.js 已更新')

# === 步骤 2: 在 ui-*.js 末尾追加 SCREENS.ui 赋值 ===
for fname, assigns in UI_FILES.items():
    path = JS / fname
    text = path.read_text(encoding='utf-8')
    addition = '\n\n/* === SCREENS.ui 绑定（从 core.js 搬移至此，确保本模块的 UI 函数已加载） === */\n'
    addition += '\n'.join(assigns) + '\n'
    path.write_text(text.rstrip() + addition, encoding='utf-8')
    print(f'{fname}: 追加 {len(assigns)} 行赋值')

print('\n✅ 完成')