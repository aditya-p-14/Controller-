/* Prototype language entry point. Both languages keep the same screen and interaction model. */
const LOCALE_STATE_NAMES = ["droneLayerOrigin","workTab","workStore","workMulti","workSync","workOrder","workImport","logTab","logPrompt","logManager","logManagerTab","logExpanded","logSelectedGroups","logTxSection","logTxSelected","logCrash","logUploadDialog","logTxSwitch","deviceView","deviceToast","droneTab","droneTabsScrollTop","otherValues","otherScrollTop","flightVisualState","flightMode","flightReturnState","flightMapBaseState","flightSideBaseState","cur","STORAGE_STATE"];
// Customer-facing settings expose the seven requested categories in both languages.
const CUSTOMER_SETTING_IDS = new Set(['air','radar','remote','spray','battery','rtk','video']);
const INTERNAL_SCREEN_IDS = new Set(['frontVideoStream','rearVideoStream','droneLanguage','droneInsurance','maintenance','gpsSnrDetail','gcsSatellite','hardwareArto','hardwareGps','hardwareWifi','hardwareCell','hardwareLora','hardwareNewData','hardwareP2p','frontRadarParams','rotateRadarParams','radarDistanceDetail','oldMotorDebug','swirlDebug','fcParams','debugAuth','rcParams','otherParams','mcuControl','tpControl','morningControl','otherRemoteId','aiRadar','aiLogUpload']);
window.isCustomerSettingTab = id => CUSTOMER_SETTING_IDS.has(id);
window.isCustomerScreen = id => !INTERNAL_SCREEN_IDS.has(id);
(() => {
  const languageKey = 'talos-prototype-language';
  const stateKey = 'talos-prototype-language-state';
  const read = (storage, key) => { try { return storage.getItem(key); } catch { return null; } };
  const requestedLanguage = new URLSearchParams(location.search).get('lang');
  const language = requestedLanguage === 'zh' || (requestedLanguage !== 'en' && read(localStorage, languageKey) === 'zh') ? 'zh' : 'en';
  document.documentElement.lang = language === 'en' ? 'en-US' : 'zh-CN';
  document.documentElement.dataset.language = language;
  let saved;
  try { saved = JSON.parse(read(sessionStorage, stateKey) || 'null', (_, value) => value?.__set ? new Set(value.__set) : value); } catch { saved = null; }
  window.__restoreLocaleState = !!saved;
  const forward = window.LOCALE_STATE_VALUES || {};
  const reverse = {};
  for (const [zh, en] of Object.entries(forward)) if (!(en in reverse)) reverse[en] = zh;
  const convert = value => {
    if (typeof value === 'string') return (language === 'en' ? forward : reverse)[value] ?? value;
    if (value instanceof Set) return new Set([...value].map(convert));
    if (Array.isArray(value)) return value.map(convert);
    if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, convert(item)]));
    return value;
  };
  const toggle = document.getElementById('languageToggle');
  toggle.querySelector(`[data-lang="${language}"]`).classList.add('active');
  toggle.setAttribute('aria-label', language === 'en' ? 'Switch to Chinese' : '切换为英文');
  if (language === 'zh') {
    document.title = 'Talos UAS · 交互原型';
    document.querySelector('.brand').lastChild.textContent = 'Talos UAS · 交互原型';
    document.querySelector('.top-note').textContent = '选择屏幕，体验交互原型。';
    document.getElementById('screenSelect').setAttribute('aria-label', '选择屏幕');
    document.querySelector('.fab.left').setAttribute('aria-label', '屏幕导航');
    document.querySelector('.fab.right').setAttribute('aria-label', '功能说明');
  }
  toggle.addEventListener('click', event => {
    const targetLanguage = event.target.closest('[data-lang]')?.dataset.lang || (language === 'en' ? 'zh' : 'en');
    if(targetLanguage === language) return;
    const state = {};
    for (const name of LOCALE_STATE_NAMES) {
      try { state[name] = (0, eval)(name); } catch { /* A screen may not have initialized this state yet. */ }
    }
    const inputs = [...document.querySelectorAll('#screen input,#screen select,#screen textarea')].map(el => ({value: el.value, checked: el.checked, selectedIndex: el.selectedIndex}));
    const scrolls = [...document.querySelectorAll('.nav-col,.prd-col,#screen *')].filter(el => el.scrollTop || el.scrollLeft).map(el => ({selector: el.id ? `#${CSS.escape(el.id)}` : el.classList.length ? '.'+[...el.classList].map(CSS.escape).join('.') : '', top: el.scrollTop, left: el.scrollLeft}));
    const snapshot = {state, inputs, scrolls, flightNative:window.PROTOTYPE_FLIGHT_UI, storageDialog: !!document.querySelector('.storage-full-modal')};
    try {
      sessionStorage.setItem(stateKey, JSON.stringify(snapshot, (_, value) => value instanceof Set ? {__set: [...value]} : value));
      localStorage.setItem(languageKey, targetLanguage);
    } catch { /* Language switching still works when state storage is unavailable. */ }
    const destination = new URL(location.href);
    destination.searchParams.set('lang', targetLanguage);
    location.replace(destination.href);
  });

  function addScreenshotLabels() {
    if(language==='zh')document.querySelectorAll('.flight-manual-screen').forEach(surface=>window.mountSharedMissionMenu?.(surface));
    if (language !== 'en') return;
    document.querySelectorAll('.flight-manual-screen,.map-prototype').forEach(surface => {
      const file = getComputedStyle(surface).backgroundImage.match(/([^/"()]+\.png)/)?.[1];
      const rects = surface.matches('.flight-manual-screen') ? (window.mountEnglishFlight?.(surface) || []) : [];
      const labels = window.SCREENSHOT_LABELS?.[file];
      if (!labels || surface.querySelector(':scope > .raster-label-layer')) return;
      const layer = document.createElement('div'); layer.className = 'raster-label-layer';
      for (const label of labels) {
        if (label.kind === 'map') continue;
        if (rects.some(r => label.x < r.x+r.w && label.x+label.w > r.x && label.y < r.y+r.h && label.y+label.h > r.y)) continue;
        const box = document.createElement('div'); box.className = `raster-label raster-${label.kind}`;
        box.style.cssText = `left:${label.x}px;top:${label.y}px;width:${label.w}px;height:${label.h}px;background:${label.bg};color:${label.fg};font-size:${label.size}px`;
        box.textContent=label.text;box.title=label.text;layer.appendChild(box);
      }
      layer.addEventListener('click', event => {
        event.stopPropagation();
        const target = document.elementsFromPoint(event.clientX,event.clientY).find(el=>el.matches('.flight-hotspot,.map-hit'));
        if(target)target.click();
      });surface.appendChild(layer);
    });
  }
  // Reference labels retain the original Chinese control widths. English
  // text pans inside those boxes instead of changing their intrinsic size.
  const referenceButtonLabels = {"Mission Resources":"作业资源","Log Management":"日志管理","Device ManagementUpdate Available":"设备管理版本有更新","Disconnected":"未连接","Start":"开始","Fields":"地块","In Progress":"进行中","Prescription Maps":"处方图","Local":"本地","Cloud":"云端","Time◆":"时间◆","✓Auto-sync to Cloud":"✓自动同步到云端","Select":"多选","Aircraft":"无人机","Controller":"遥控器","Charger":"充电器","Video":"视频","Repeater":"中继器","Video Link":"图传","Upload Manager":"上传管理","Upload":"上传","Check for Updates":"检测升级","Software Version: 4.4.0.18ControllerConnected":"软件版本:4.4.0.18遥控器已连接","AircraftDisconnected":"无人机未连接","ChargerDisconnected":"充电器未连接","BatteryDisconnected":"电池未连接","Update CheckDisconnected":"版本检查未连接","Software Version: CX6672-CD_V2.10.00_R84_20260607Video Link ModuleConnected":"软件版本:CX6672-CD_V2.10.00_R84_20260607图传模块已连接","Remote IDDisconnected":"运行识别未连接","My Flight Records ›":"我的飞行记录 ›","Chengxin Care ›":"橙心服务 ›","Temporary No-Fly Zones ›":"临时禁飞区 ›","Sign Out":"退出登录","Spraying":"喷洒","Spreading":"播撒","Lifting":"吊运","Renewal Inspection":"续费验机","Luzhou Yunlong AirportRegulatory No-Fly Zone12174.67 acres2020/05/20-2030/01/01":"Luzhou Yunlong Airport行政禁飞区12174.67英亩2020/05/20-2030/01/01","Luzhou Yunlong AirportRegulatory No-Fly Zone26218.64 acres2020/05/20-2030/01/01":"Luzhou Yunlong Airport行政禁飞区26218.64英亩2020/05/20-2030/01/01","Luzhou Yunlong AirportRegulatory No-Fly Zone12471.21 acres2020/05/20-2030/01/01":"Luzhou Yunlong Airport行政禁飞区12471.21英亩2020/05/20-2030/01/01","Time":"时间","Distance":"距离","Download":"下载","Map Planning ⌄":"地图规划⌄","＋Add":"＋添加","Undo":"撤销","Back":"返回","Save":"保存","Sensing":"感知","Battery":"电池","Hover":"悬停","Return to Home":"返航","Refresh":"刷新","Small":"小","Large":"大","Mode 1":"日本手","Mode 2":"美国手","Mode 3":"中国手","Calibrate":"校准","Multiple Controllers":"一机多控","Single Controller":"一机一控","Start Pairing":"开始对频","High-Pressure Nozzle":"高压喷头","Rotary Atomizer":"离心喷头","Dual Spray":"双喷","All Nozzles":"全喷","Speed-Based":"随速模式","On/Off":"开关模式","Prime Lines":"一键排气","Battery Level-":"电量-","Voltage-":"电压-","Current-":"电流-","Power--------":"功率--------","Temperature-":"温度-","Cycle Count-":"循环次数-","Renew":"续约","Auto":"自动","Start Calibration":"开始校准","Obstacle Avoidance Toggle":"避障开关","Mission Switch":"作业开关","Survey Device":"打点器","Units ›":"参数单位 ›","Voice Settings ›":"语音设置 ›","Open":"打开","Regulatory Compliance ›":"政策监管 ›","Offline Maps ›":"离线地图 ›","Clear":"清除","System Settings ›":"系统设置 ›","Storage ›":"存储空间 ›","Metric":"公制","Imperial":"英制","ft/s":"英尺/秒","mph":"英里/小时","Celsius":"摄氏度","Fahrenheit":"华氏度","Speech Engine i›":"语音引擎 i›","CAAC Real-Name Aircraft Registration ›":"无人机民航局实名登记 ›","Android System Settings›":"安卓系统设置›","All Apps›":"全部应用›","System Brightness›":"系统亮度›","System Volume›":"系统音量›","System Time Zone›":"系统时区›","New":"新建","Delete":"删除","＋ Add Area":"＋ 添加区域","None":"无","OK":"确定","IMU Calibration":"IMU校准","Settings":"设置","AB Points":"AB点","Free Route":"自由航线","Clear Cache":"放心清理","▾ August 2026 1 day · 341.0 MB":"▾ 2026-08 月 1 天 · 341.0 MB","› July 2026 2 days · 406.0 MB":"› 2026-07 月 2 天 · 406.0 MB"};
  const controlMeasure=document.createElement('canvas').getContext('2d');
  function stabilizeButtonGeometry(){
    const root=document.getElementById('screen');if(!root)return;
    root.querySelectorAll('.work-cloud').forEach(button=>[...button.childNodes].filter(n=>n.nodeType===3&&n.textContent.trim()).forEach(node=>{const label=document.createElement('span');label.className='text-action-label';node.replaceWith(label);label.appendChild(node)}));
    const selector='.drone-segment>button,.real-outline-btn,.insurance-action,.open-btn,.cache-btn,.setting-segments>button,.storage-clean-small,.trace-act,.rocker-start,.download-tools>button';
    root.querySelectorAll(selector).forEach(button=>{
      const value=button.textContent.replace(/\s+/g,' ').trim();
      const reference=language==='en'?(referenceButtonLabels[value]||reverse[value]||value):value;
      const style=getComputedStyle(button);controlMeasure.font=`${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      const padding=parseFloat(style.paddingLeft)+parseFloat(style.paddingRight),border=parseFloat(style.borderLeftWidth)+parseFloat(style.borderRightWidth);
      const width=Math.max(parseFloat(style.minWidth)||0,controlMeasure.measureText(reference).width+padding+border);
      button.style.width=`${width}px`;button.style.flex=`0 0 ${width}px`;
    });
  }
  const animations = new Map();
  let refreshFrame = 0;
  function applyOverflow() {
    refreshFrame=0;
    if(language!=='en')return;
    const root=document.getElementById('screen');if(!root)return;
    root.querySelectorAll('.drone-tab').forEach(button=>[...button.childNodes].filter(n=>n.nodeType===3&&n.textContent.trim()).forEach(node=>{
      const span=document.createElement('span');span.className='menu-label';node.replaceWith(span);span.appendChild(node);
    }));
    root.querySelectorAll('button').forEach(button=>{
      if(button.childElementCount===0&&/[A-Za-z]/.test(button.textContent)){
        const label=document.createElement('span');label.className='text-action-label';
        label.textContent=button.textContent;button.replaceChildren(label);button.classList.add('is-text-action');
      }
    });
    const selector='.text-action-label,.menu-label,.home-connect-label,.home-nav-text,.home-nav-tip,.version-ribbon,.device-row-label,.device-row-value,.log-footer-text,.log-group-name,.log-child span:first-child,.nofly-row span,.work-card-info p,.other-popup-trigger span,.debug-custom-select>button>span,.debug-status-cell>span:first-child,.debug-gps-cell>span:first-child,.other-debug-status>span:first-child,.native-label,.raster-label';
    root.querySelectorAll(selector).forEach(node=>{
      if(node.querySelector('button,input,select,svg,img')||!node.textContent.trim())return;
      node.classList.add('marquee-window');node.title=node.textContent.trim();
      let track=node.querySelector(':scope > .marquee-track');
      if(!track){track=document.createElement('span');track.className='marquee-track';while(node.firstChild)track.appendChild(node.firstChild);node.appendChild(track);}
      const distance=Math.ceil(track.scrollWidth-node.clientWidth+2),old=animations.get(node);
      if(old&&old.distance===distance&&old.width===node.clientWidth&&old.text===track.textContent)return;
      old?.animation?.cancel();animations.delete(node);node.classList.toggle('is-overflowing',distance>2);
      if(distance<=2||node.clientWidth<1){track.style.transform='none';return;}
      const duration=Math.max(4200,(distance/28)*2000+1800),hold=900/duration;
      const animation=track.animate([{transform:'translateX(0)',offset:0},{transform:'translateX(0)',offset:hold},{transform:`translateX(-${distance}px)`,offset:.5},{transform:`translateX(-${distance}px)`,offset:.5+hold},{transform:'translateX(0)',offset:1}],{duration,iterations:Infinity,easing:'linear'});
      animations.set(node,{animation,distance,width:node.clientWidth,text:track.textContent});
    });
    for(const [node,data]of animations)if(!node.isConnected){data.animation.cancel();animations.delete(node);}
  }
  const scheduleOverflow=()=>{if(!refreshFrame)refreshFrame=requestAnimationFrame(applyOverflow)};
  function fitResponsiveTablet(){
    const col=document.querySelector('.proto-col'),shell=document.getElementById('tabletShell'),tablet=document.getElementById('tablet');if(!col||!shell||!tablet)return;
    const css=getComputedStyle(col),width=col.clientWidth-parseFloat(css.paddingLeft)-parseFloat(css.paddingRight),height=col.clientHeight-parseFloat(css.paddingTop)-parseFloat(css.paddingBottom);
    const scale=Math.max(.05,Math.min(1,width/960,height/600));
    tablet.style.transform=`scale(${scale})`;shell.style.width=`${960*scale}px`;shell.style.height=`${600*scale}px`;scheduleOverflow();
  }
  const source = document.createElement('script');
  source.src = `app.${language}.js?v=bilingual-geometry-4`;
  source.onload = () => {
    window.installHomeScreen();
    if (saved) {
      for (const [name, value] of Object.entries(saved.state || {})) {
        if (LOCALE_STATE_NAMES.includes(name)) {
          try { window.__localeValue = convert(value); (0, eval)(`${name} = window.__localeValue`); } catch { /* Preserve other valid state if a field is unavailable. */ }
        }
      }
      delete window.__localeValue;
      sessionStorage.removeItem(stateKey);
    }
    if(saved?.flightNative)window.PROTOTYPE_FLIGHT_UI=saved.flightNative;
    if(!window.isCustomerScreen(cur))cur='droneSettings';
    if(!window.isCustomerSettingTab(droneTab)){droneTab='air';droneTabsScrollTop=0;}
    window.fitTablet=fitResponsiveTablet;
    const originalRender = window.renderAll;
    window.renderAll = function (...args) {
      const result = originalRender.apply(this, args);
      addScreenshotLabels();
      stabilizeButtonGeometry();
      scheduleOverflow();
      return result;
    };
    window.renderAll();
    if (saved) {
      const inputs = document.querySelectorAll('#screen input,#screen select,#screen textarea');
      saved.inputs?.forEach((state, i) => {
        const el = inputs[i]; if (!el) return;
        if (el.tagName === 'SELECT') el.selectedIndex = state.selectedIndex;
        else el.value = convert(state.value);
        if ('checked' in el) el.checked = state.checked;
      });
      requestAnimationFrame(() => saved.scrolls?.forEach(s => {
        if (!s.selector) return;
        const el = document.querySelector(s.selector); if (el) { el.scrollTop = s.top; el.scrollLeft = s.left; }
      }));
      if (saved.storageDialog) showStorageFullDialog();
    }
    const observer=new MutationObserver(scheduleOverflow);
    observer.observe(document.getElementById('screen'),{childList:true,subtree:true,characterData:true});
    const resize=new ResizeObserver(()=>{fitResponsiveTablet();scheduleOverflow()});resize.observe(document.querySelector('.proto-col'));resize.observe(document.getElementById('screen'));
    window.addEventListener('resize',fitResponsiveTablet);
    document.fonts.ready.then(()=>{stabilizeButtonGeometry();fitResponsiveTablet();scheduleOverflow()});

  };
  source.onerror = () => { document.querySelector('#screen').textContent = language === 'en' ? 'Unable to load the prototype. Refresh to try again.' : '原型加载失败，请刷新重试。'; };
  document.body.appendChild(source);
})();
