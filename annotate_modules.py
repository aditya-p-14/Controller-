#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
按业务模块为 app.js 插入轻量级结构化注释

策略：
- 在每个模块第一个声明前插入一个简洁的注释块（含模块描述）
- 后续同模块切换回时，仅插入一行短分隔（不重复大注释块）
- 在每个 function 声明前加一行归属注释（说明归属模块 + 简述）
"""
import re
from pathlib import Path

APP = Path("app.js")
text = APP.read_text(encoding="utf-8")


def make_assign():
    A = {}

    # 共享工具/UI 工具
    items = [
        ("IMG", "🟢 共享", "图片资源（5 张）"),
        ("HOME_IMG", "🟢 共享", "首页诊断图标"),
        ("GCS_BATTERY_IMG", "🟢 共享", "遥控器电量图标"),
        ("ACCOUNT_IMG", "🟢 共享", "用户中心图标"),
        ("icon", "🟢 共享", "图标生成器（SVG）"),
        ("back", "🟢 共享", "通用返回按钮"),
        ("head", "🟢 共享", "页面顶部标题栏"),
        ("subHead", "🟢 共享", "页内 section 标题"),
        ("dSwitch", "🟢 共享", "开关控件工厂"),
        ("dStep", "🟢 共享", "步进器控件工厂"),
        ("debugSelect", "🟢 共享", "调试下拉选择器"),
        ("tabSegment", "🟢 共享", "Tab 切换栏"),
        ("customSelect", "🟢 共享", "自定义下拉选择器"),
        ("toggleSegment", "🟢 共享", "开关式分段器"),
        ("showSystemToast", "🟢 共享", "系统 Toast 提示"),
        ("showSettingsDialog", "🟢 共享", "通用设置弹窗"),
        ("sec", "🟢 共享", "HTML 转义（防 XSS）"),
        ("stripMarkup", "🟢 共享", "去除 HTML 标记"),
        ("fieldLabel", "🟢 共享", "字段标签提取"),
        ("controlKind", "🟢 共享", "控件类型推断"),
        ("buildControlSpec", "🟢 共享", "从控件 DOM 反推规格"),
        ("buildSubControlSpec", "🟢 共享", "子控件规格构建"),
        ("fitTablet", "🟢 共享", "平板尺寸自适应"),
        ("updateClock", "🟢 共享", "顶部时钟刷新"),
        ("renderPRD", "🟢 共享", "渲染 PRD 文档面板"),
        ("renderSwitcher", "🟢 共享", "渲染左侧导航栏"),
        ("renderAll", "🟢 共享", "全量渲染入口"),
        ("go", "🟢 共享", "屏幕跳转（路由）"),
        ("linkPRD", "🟢 共享", "PRD 双向联动"),
        ("toggleNav", "🟢 共享", "切换导航折叠"),
        ("highlightField", "🟢 共享", "高亮字段"),
        ("highlightWorkField", "🟢 共享", "高亮作业字段"),
        ("selectControlField", "🟢 共享", "选中控件字段"),
        ("selectDroneField", "🟢 共享", "选中无人机字段"),
        ("cur", "🟢 共享", "全局当前屏幕 ID"),
        # 共享数据
        ("DRONE_PRD", "🟢 共享-数据", "无人机 PRD"),
        ("DEBUG_PAGE_DATA", "🟢 共享-数据", "调试页数据"),
        ("WORK_PRD_FIELDS", "🟢 共享-数据", "作业资源 PRD 字段"),
        ("WORK_PRD_RULES", "🟢 共享-数据", "作业资源 PRD 规则"),
        ("DEVICE_DATA", "🟢 共享-数据", "设备数据"),
        ("DEVICE_ICONS", "🟢 共享-数据", "设备图标"),
        ("noFlyRows", "🟢 共享-数据", "禁飞区数据"),
        ("LOG_TABS", "🟢 共享-数据", "日志 Tab"),
        ("LOG_GROUPS", "🟢 共享-数据", "日志分组"),
        ("LOG_TX_FILES", "🟢 共享-数据", "日志上传清单"),
        ("DRONE_ICONS", "🟢 共享-数据", "无人机 Tab 图标"),
        ("DEBUG_MENU_ICONS", "🟢 共享-数据", "调试菜单图标"),
        ("RELEASE_MENU_STATE_ICONS", "🟢 共享-数据", "发布版状态图标"),
        ("REMOTE_ASSET", "🟢 共享-数据", "遥控器资源图标"),
        ("CUSTOM_KEY_405_IMAGE", "🟢 共享-数据", "自定义键 405 图像"),
        ("CUSTOM_KEY_405_IMAGE_FULL", "🟢 共享-数据", "自定义键 405 完整图"),
        ("NOZZLE_560_IMAGE", "🟢 共享-数据", "560 喷头图像"),
    ]
    for name, mod, desc in items:
        A[name] = (mod, desc)

    # 01
    for name, desc in [
        ("homeUI", "首页 UI"),
        ("homeWithDroneLayer", "首页叠加无人机小窗"),
        ("droneLayer", "无人机连接小窗"),
        ("toggleNetworkDiagnosis", "切换网络诊断"),
        ("droneLayerOrigin", "无人机小窗 origin"),
    ]:
        A[name] = ("🟡 01 作业核心", desc)

    # 02
    for name, desc in [
        ("workUI", "作业资源主 UI"),
        ("workAction", "作业资源操作"),
        ("setWorkTab", "切换作业 Tab"),
        ("setWorkStore", "切换本地/云端"),
        ("toggleWorkSync", "切换云同步"),
        ("toggleWorkMulti", "切换多选"),
        ("toggleWorkOrder", "切换排序"),
        ("workImportUI", "二维码导入弹窗"),
        ("workCloudCards", "云地块卡片"),
        ("workTab", "当前作业 Tab"),
    ]:
        A[name] = ("🟡 02 作业资源", desc)

    # 03
    for name, desc in [
        ("logsUI", "日志主 UI"),
        ("logAction", "日志操作"),
        ("logDisconnectedMessage", "断连提示"),
        ("setLogTab", "切换日志 Tab"),
        ("closeLogPrompt", "关闭日志提示"),
        ("toggleLogGroup", "展开日志分组"),
        ("toggleLogSelect", "切换日志选中"),
        ("toggleTxSelect", "切换已传日志选中"),
        ("logCanUpload", "判断可上传"),
        ("logTxTotal", "已传日志总数"),
        ("openLogRemark", "打开 30 字备注"),
        ("logTab", "当前日志 Tab"),
        ("logTabsUI", "日志 Tab UI"),
        ("logFooterUI", "日志底部操作"),
        ("logControllerUI", "日志控制面板"),
        ("logWarningUI", "日志警告面板"),
        ("logVideoUI", "视频日志面板"),
        ("logTransmissionUI", "传输日志面板"),
        ("logManagerUI", "日志管理员面板"),
        ("logUploadDialogUI", "上传弹窗"),
    ]:
        A[name] = ("🟡 03 日志管理", desc)

    # 04
    for name, desc in [
        ("devicesUI", "设备总览 UI"),
        ("deviceCard", "设备卡片"),
        ("deviceDetailUI", "设备详情页（29 行）"),
        ("deviceFieldId", "设备字段 ID"),
        ("deviceSetSpec", "设备规格配置"),
        ("deviceOpen", "打开设备详情"),
        ("deviceBack", "设备详情返回"),
        ("deviceFeedback", "设备反馈操作"),
        ("deviceHeader", "设备头部信息"),
        ("deviceRows", "设备行数据"),
        ("deviceView", "设备视图状态"),
    ]:
        A[name] = ("🟡 04 设备管理", desc)

    # 05
    for name, desc in [
        ("accountUI", "账户总览"),
        ("flightRecordsUI", "飞行记录页"),
        ("setFlightTab", "切换飞行 Tab"),
        ("showRenewalDialog", "显示续保弹窗"),
        ("insuranceUI", "保险页面"),
        ("noFlyUI", "禁飞区列表"),
        ("noFlyDownloadUI", "禁飞区下载 UI"),
        ("showMapToast", "地图 Toast"),
        ("noFlyMapUI", "禁飞区地图"),
        ("noFlyPreviewUI", "禁飞区详情预览"),
    ]:
        A[name] = ("🟡 05 用户中心", desc)

    # 06
    for name, desc in [
        ("settingsUI", "设置总览"),
        ("unitSettingsUI", "单位设置"),
        ("voiceSettingsUI", "语音设置"),
        ("changeSpeech", "切换语音播报"),
        ("policySettingsUI", "隐私政策"),
        ("realNameSettingsUI", "实名认证"),
        ("systemSettingsUI", "系统设置"),
        ("offlineMapUI", "离线地图管理"),
        ("openOfflineMap", "打开离线地图"),
    ]:
        A[name] = ("🟡 06 通用设置", desc)

    # 07 - 一组完成
    drone_items = [
        ("DRONE_TABS", "无人机 8 大 Tab"),
        ("RELEASE_TAB_IDS", "发布版可见 Tab"),
        ("isDebugTab", "判断调试 Tab"),
        ("DEBUG_TABS", "调试 Tab 配置"),
        ("droneTabs", "当前无人机 Tab"),
        ("setDroneTab", "切换无人机 Tab"),
        ("droneTabsScrollTop", "Tab 滚动位置"),
        ("fullPage", "full page 状态"),
        ("otherValues", "其他值状态"),
        ("otherScrollTop", "其他滚动位置"),
        ("customChoices", "自定义选择"),
        ("droneCurrentFocus", "无人机当前焦点"),
        ("radarActiveTab", "雷达活跃 Tab"),
        ("droneRowIndex", "无人机行索引"),
        ("ACTIVATE_SUB_ROWS", "激活子行"),
        ("ACTIVE_SUB_ROWS", "活跃子行"),
        ("advancedPage", "高级页状态"),
        ("advancedRows", "高级行配置"),
        ("droneSettingsUI", "无人机设置主 UI"),
        ("droneSubUI", "无人机子设置页"),
        ("droneRows", "无人机设置行"),
        ("baseDroneRows", "droneRows 原版"),
        ("legacyDroneRows", "droneRows 扩展版"),
        ("aircraftRowsOnly", "aircraft Tab 行"),
        ("REAL_TAB_ROWS", "真实 Tab 行配置"),
        ("bindControlFields", "绑定控件字段"),
        ("rockerCalibration", "摇杆校准"),
        ("customKeys", "自定义按键"),
        ("OTHER_VIDEO", "其他视频"),
        ("OTHER_LANGUAGE_OPTIONS", "其他语言选项"),
        ("OTHER_POPUP_OPTIONS", "其他弹窗选项"),
        ("otherTrigger", "其他触发器"),
        ("otherSettingsUI", "其他设置 UI"),
        ("otherInsuranceUI", "其他保险 UI"),
        ("otherPopupMarkup", "其他弹窗 HTML"),
        ("openOtherPopup", "打开其他弹窗"),
        ("closeOtherPopup", "关闭其他弹窗"),
        ("chooseOtherValue", "选择其他值"),
        ("rtkSubUI", "RTK 子 UI"),
        ("rtkRealShell", "RTK 真实外壳"),
        ("rtkDiagnosisUI", "RTK 诊断 UI"),
        ("rtkSnrUI", "RTK 信噪比 UI"),
        ("gcsSnrBars", "GCS 信噪比条"),
        ("gcsSatelliteUI", "GCS 卫星 UI"),
        ("rtkDotUI", "RTK 圆点 UI"),
        ("hardwareShell", "硬件测试外壳"),
        ("hardwareCells", "硬件测试单元格"),
        ("hardwareArtoUI", "硬件 Arto UI"),
        ("advancedRealShell", "高级真实外壳"),
        ("advancedRealList", "高级真实列表"),
        ("pwmRealUI", "PWM 实时 UI"),
        ("vibrationRealUI", "振动实时 UI"),
        ("attitudeRealUI", "姿态实时 UI"),
        ("rackRealUI", "机架实时 UI"),
        ("realRow", "实时数据行"),
        ("debugRow", "调试行"),
        ("sprayBody", "喷洒主体"),
        ("joystickChannel", "摇杆通道"),
        ("remoteBody", "遥控器主体"),
        ("showPointUploadDialog", "点位上传弹窗"),
        ("batteryBody", "电量主体"),
        ("videoBody", "视频主体"),
        ("showCalibrationDialog", "校准弹窗"),
        ("showRemoteAuthDialog", "遥控器授权弹窗"),
        ("remoteShell", "遥控器外壳"),
        ("safeCalibration", "安全校准"),
        ("customKeyDiagram", "自定义键图示"),
        ("sprayShell", "喷洒外壳"),
        ("debugAuthUI", "调试授权 UI"),
        ("otherRemoteIdUI", "其他 Remote ID UI"),
        ("radarRangeChart", "雷达距离图"),
        ("radarMainBody", "雷达主体"),
        ("radarControl", "雷达控制"),
        ("maintenanceUI", "维护 UI"),
        ("frontVideoStream", "前置视频流"),
        ("rearVideoStream", "后置视频流"),
        ("droneLanguage", "无人机语言"),
        ("droneInsurance", "无人机保险"),
        ("radarMenuUI", "雷达菜单 UI"),
        ("droneActions", "无人机操作"),
        ("droneOtherSettings", "无人机其他设置"),
        ("droneMenuActions", "无人机菜单操作"),
        ("droneMaintenanceBody", "无人机维护主体"),
        ("remoteUI", "遥控器 UI"),
        ("custom405", "自定义 405"),
    ]
    for name, desc in drone_items:
        A[name] = ("🟡 07 无人机设置", desc)
    # 07 补充
    extra_drone = [
        ("OTHER_VIDEO_OPTIONS", "其他视频选项"),
        ("cameraDebugPageBody", "相机调试主体"),
        ("chooseDebugSelect", "选择调试项"),
        ("debugBatteryPageBody", "电量调试主体"),
        ("debugDataButton", "调试数据按钮"),
        ("debugDataLabel", "调试数据标签"),
        ("debugDataPageBody", "调试数据页主体"),
        ("debugDataStep", "调试数据步进"),
        ("debugFtpButton", "调试 FTP 按钮"),
        ("debugGpsPageBody", "GPS 调试主体"),
        ("debugMotorPageBody", "电机调试主体"),
        ("debugNetworkPageBody", "网络调试主体"),
        ("debugOtherPageBody", "其他调试主体"),
        ("debugPageBody", "调试页主体"),
        ("debugSnrPageBody", "SNR 调试主体"),
        ("debugStatusGrid", "调试状态网格"),
        ("fcParamsUI", "飞控参数 UI"),
        ("frontRadarUI", "前雷达 UI"),
        ("hardwareCellUI", "硬件单元 UI"),
        ("hardwareNewDataUI", "硬件新数据 UI"),
        ("hardwareP2pUI", "硬件 P2P UI"),
        ("hardwareWifiUI", "硬件 WiFi UI"),
        ("mcuDebugUI", "MCU 调试 UI"),
        ("morningDebugUI", "晨间调试 UI"),
        ("oldMotorUI", "旧电机 UI"),
        ("otherDebugFieldRows", "其他调试字段行"),
        ("otherDebugShell", "其他调试外壳"),
        ("otherParamsUI", "其他参数 UI"),
        ("radarBallUI", "雷达球 UI"),
        ("radarParamRows", "雷达参数行"),
        ("radarParamUI", "雷达参数 UI"),
        ("radarShell", "雷达外壳"),
        ("rcDebugUI", "RC 调试 UI"),
        ("rotateRadarUI", "旋转雷达 UI"),
        ("swirlDebugUI", "漩涡调试 UI"),
        ("toggleDebugSelect", "切换调试选择"),
        ("tpDebugUI", "TP 调试 UI"),
    ]
    for name, desc in extra_drone:
        A[name] = ("🟡 07 无人机设置", desc)
    A["SCREENS"] = ("🟢 共享-数据", "SCREENS 主注册表")

    # 01.1 flight
    flight_items = [
        ("flightManualUI", "开始作业主 UI"),
        ("flightManualUIV2", "UI V2"),
        ("flightManualUIV3", "UI V3"),
        ("flightManualUIV4", "UI V4"),
        ("flightManualUIV5", "UI V5"),
        ("flightManualUIV6", "UI V6"),
        ("flightManualUIV7", "UI V7（最新）"),
        ("flightPlanWheel", "飞行计划轮盘"),
        ("flightChooseMode", "飞行模式选择"),
        ("flightModeState", "飞行模式状态"),
        ("flightSelectMode", "选中飞行模式"),
        ("flightOpenStatus", "打开飞行状态"),
        ("flightDeviceStatusUI", "飞行设备状态 UI"),
        ("flightOpenFormula", "打开处方公式"),
        ("flightFormulaType", "处方公式类型"),
        ("flightOpenLayer", "打开图层"),
        ("flightMapOverrideHits", "地图覆盖命中"),
        ("flightFormulaUI", "处方公式 UI"),
        ("flightLayerChoiceHits", "图层选择命中"),
        ("flightOpenSide", "打开侧边栏"),
        ("flightCloseSide", "关闭侧边栏"),
        ("flightSideOverrideHits", "侧边栏覆盖命中"),
        ("flightFocus", "飞行焦点"),
        ("flightSet", "飞行设置"),
        ("flightHot", "飞行热区"),
        ("flightVisualState", "飞行视觉状态"),
        ("FLIGHT_SHOTS", "飞行截图数据"),
        ("flightMode", "飞行模式"),
        ("flightReturnState", "飞行返回状态"),
        ("flightMapBaseState", "飞行地图基础状态"),
        ("flightSideBaseState", "飞行侧边栏基础状态"),
    ]
    for name, desc in flight_items:
        A[name] = ("🔵 01.1 开始作业", desc)

    return A


ASSIGN = make_assign()

# 扫描所有顶级声明
declarations = []
patterns = [
    (r'^function\s+(\w+)', 'function'),
    (r'^const\s+(\w+)\s*=', 'const'),
    (r'^let\s+(\w+)\s*=', 'let'),
    (r'^SCREENS\.(\w+)=\{num:', 'SCREENS_set'),
]
for pat, kind in patterns:
    for m in re.finditer(pat, text, re.MULTILINE):
        declarations.append((m.start(), kind, m.group(1)))

# 去重
seen = set()
unique = []
for d in declarations:
    if d[2] not in seen:
        seen.add(d[2])
        unique.append(d)
declarations = sorted(unique, key=lambda x: x[0])

print(f"识别 {len(declarations)} 个声明")

# 按归属分组（合并相邻相同模块，并跟踪已见过）
inserts = []  # [(pos, text_to_insert)]
seen_modules = set()

# 按声明顺序扫描
for pos, kind, name in declarations:
    module = ASSIGN.get(name, ("⚪ 未分类", name))
    module_label = module[0]

    # 模块级别注释：第一次见该模块时插入大块
    if module_label not in seen_modules:
        seen_modules.add(module_label)
        # 首次出现该模块：插入模块级注释块
        # 计算该模块的声明总数
        count = sum(1 for d in declarations
                    if ASSIGN.get(d[2], (None,))[0] == module_label)
        short = module[1]
        if len(short) > 40:
            short = short[:37] + "..."

        if module_label.startswith("⚪"):
            block = f"\n/* ─ {module_label} ─ */\n\n"
        else:
            block = (f"\n/* ===========================================\n"
                     f" * 【{module_label}】\n"
                     f" * ────────────────────────────────────────────\n"
                     f" * {short}（共 {count} 项）\n"
                     f" * ============================================ */\n\n")
        inserts.append((pos, block))

    # function 声明加单行标注（const/let 不加，避免太冗长）
    if kind == 'function':
        short = module[1]
        if len(short) > 50:
            short = short[:47] + "..."
        inserts.append((pos, f"// ── {name} — {short}\n"))

# 倒序应用
new_text = text
for pos, ins_text in sorted(inserts, key=lambda x: -x[0]):
    new_text = new_text[:pos] + ins_text + new_text[pos:]

Path("app.js").write_text(new_text, encoding="utf-8")
new_lines = new_text.count('\n') + 1
print(f"app.js: {new_lines} 行（+{new_lines - text.count(chr(10)) - 1} 行注释）")

# 输出模块分布
print("\n📊 模块分布：")
mod_count = {}
for d in declarations:
    mod = ASSIGN.get(d[2], ("⚪ 未分类",))[0]
    mod_count[mod] = mod_count.get(mod, 0) + 1
for mod, cnt in sorted(mod_count.items(), key=lambda x: -x[1]):
    print(f"  {mod}: {cnt} 项")
