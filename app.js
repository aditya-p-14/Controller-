


/* ===========================================
 * 【🟢 共享】
 * ────────────────────────────────────────────
 * 图片资源（5 张）（共 35 项）
 * ============================================ */

const IMG={account:'./assets/IMG_account.png',leftSetting:'./assets/IMG_leftSetting.png',work:'./assets/IMG_work.png',logs:'./assets/IMG_logs.png',devices:'./assets/IMG_devices.png'};
const HOME_IMG={disconnect:'./assets/HOME_IMG_disconnect.png',diagGcs:'./assets/HOME_IMG_diagGcs.png',diagWifi:'./assets/HOME_IMG_diagWifi.png',diagSimOff:'./assets/HOME_IMG_diagSimOff.png',diagP2p:'./assets/HOME_IMG_diagP2p.png',diagWeb:'./assets/HOME_IMG_diagWeb.png'};
const GCS_BATTERY_IMG='./assets/GCS_BATTERY_IMG.png';
const icon=(id,cls='')=>`<svg class="svg-icon ${cls}"><use href="#${id}"/></svg>`;
const ACCOUNT_IMG={medalGreen:'./assets/ACCOUNT_IMG_medalGreen.png',medalRed:'./assets/ACCOUNT_IMG_medalRed.png',map:'./assets/ACCOUNT_IMG_map.png'};
const back=()=>`<button class="back" onclick="go('home')" aria-label="返回首页">${icon('i-back')}</button>`;
const head=(t,backTarget='home',fieldId='')=>`<div class="page-head"><button class="back" ${fieldId?`data-field-id="${fieldId}"`:''} onclick="${backTarget==='work'?`workImport=false;renderAll()`:`go('${backTarget}')`}" aria-label="返回">${icon('i-back')}</button><h2 class="page-title">${t}</h2></div>`;
const subHead=(title,target='account',extra='')=>`<div class="sub-head"><button class="sub-back" onclick="go('${target}')" aria-label="返回">${icon('i-back')}</button><h2 class="sub-title">${title}</h2>${extra}</div>`;

// ── toggleNetworkDiagnosis — 切换网络诊断

/* ===========================================
 * 【🟡 01 作业核心】
 * ────────────────────────────────────────────
 * 切换网络诊断（共 5 项）
 * ============================================ */

function toggleNetworkDiagnosis(event,forceClose=false){event?.stopPropagation();const layer=document.getElementById('networkDiagnosis');if(!layer)return;layer.classList.toggle('open',forceClose?false:!layer.classList.contains('open'))}
// ── homeUI — 首页 UI
function homeUI(){return `<section class="tablet-screen home-screen" onclick="linkPRD('prdsec1')"><div class="home-left"><button class="home-icon" data-field-id="home-account" onclick="event.stopPropagation();go('account')" aria-label="用户信息"><img src="${IMG.account}"></button><button class="home-icon" data-field-id="home-general" onclick="event.stopPropagation();go('settings')" aria-label="通用设置"><img src="${IMG.leftSetting}"></button></div><div class="home-status"><button class="network-trigger clickable" data-field-id="home-network" onclick="toggleNetworkDiagnosis(event);highlightWorkField('home-network',this,true)" aria-label="打开网络诊断"><span class="net">▫▫4G</span>${icon('i-wifi','wifi')}</button><img class="battery" data-field-id="home-battery" src="${GCS_BATTERY_IMG}" alt="遥控器电池充电中"><i class="sep"></i><span class="home-time" data-field-id="home-time" id="homeTime">05:30(GMT+08:00)</span><button class="home-gear" data-field-id="home-drone-settings" onclick="event.stopPropagation();go('droneSettings')" aria-label="无人机设置">${icon('i-gear')}</button></div><div class="home-bottom"><button class="home-nav" data-field-id="home-work" onclick="event.stopPropagation();go('work')"><img src="${IMG.work}"><span class="home-nav-text">作业资源</span></button><button class="home-nav" data-field-id="home-logs" onclick="event.stopPropagation();go('logs')"><img src="${IMG.logs}"><span class="home-nav-text">日志管理</span></button><button class="home-nav" data-field-id="home-devices" onclick="event.stopPropagation();go('devices')"><img src="${IMG.devices}"><span><span class="home-nav-text">设备管理</span><span class="home-nav-tip">版本有更新</span></span></button><button class="connect" data-field-id="home-connection" onclick="event.stopPropagation();highlightWorkField('home-connection',this,true)"><span class="connect-dot"><img src="${HOME_IMG.disconnect}" alt=""></span>未连接</button><button class="start-btn" data-field-id="home-start" onclick="event.stopPropagation();linkPRD('prdsec3')">开始</button></div><div class="network-diagnosis-layer" id="networkDiagnosis" onclick="toggleNetworkDiagnosis(event,true)"><div class="network-diagnosis-popup" role="dialog" aria-label="网络诊断" onclick="event.stopPropagation()"><div class="network-diagnosis-title"><span>网络诊断</span><span>›</span></div><div class="network-panel"><svg viewBox="0 0 318 216" aria-hidden="true"><g fill="none" stroke-linecap="round"><path d="M138 39H57V79" stroke="#078875" stroke-width="3"/><path d="M180 39H261V79" stroke="#d7dde2" stroke-width="3"/><path d="M57 106V149H159" stroke="#078875" stroke-width="3"/><path d="M261 106V149H159" stroke="#d7dde2" stroke-width="3"/><path d="M159 149V164" stroke="#078875" stroke-width="3"/><rect x="22" y="164" width="274" height="45" rx="3" stroke="#078875" stroke-width="1.8" stroke-dasharray="5 3"/></g></svg><img class="network-node rc" src="${HOME_IMG.diagGcs}"><img class="network-node wifi-node" src="${HOME_IMG.diagWifi}"><img class="network-node sim" src="${HOME_IMG.diagSimOff}"><img class="network-node video" src="${HOME_IMG.diagP2p}"><img class="network-node cloud" src="${HOME_IMG.diagWeb}"></div></div></div></section>`}
let droneLayerOrigin='home';
// ── homeWithDroneLayer — 首页叠加无人机小窗
function homeWithDroneLayer(layer){
  const background=droneLayerOrigin==='flightManual'&&SCREENS.flightManual
    ?SCREENS.flightManual.ui()
    :homeUI();
  return background.slice(0,-10)+layer+'</section>';
}
// ── droneLayer — 无人机连接小窗
function droneLayer(content){return homeWithDroneLayer(`<div class="drone-page" onclick="event.stopPropagation()"><div class="drone-panel">${content}</div></div><div class="system-toast" id="systemToast"></div>`)}


/* ===========================================
 * 【🟡 02 作业资源】
 * ────────────────────────────────────────────
 * 当前作业 Tab（共 10 项）
 * ============================================ */

let workTab='plot',workStore='local',workMulti=false,workSync=true,workOrder='desc',workImport=false;
// ── workAction — 作业资源操作
function workAction(id,action){const prd=document.querySelector('.prd-col'),top=prd?prd.scrollTop:0;action();renderAll();if(prd)prd.scrollTop=top;requestAnimationFrame(()=>highlightWorkField(id,document.querySelector(`[data-field-id="${id}"]`),false))}
// ── setWorkTab — 切换作业 Tab
function setWorkTab(tab,id){workAction(id,()=>{workTab=tab;workMulti=false})}
// ── setWorkStore — 切换本地/云端
function setWorkStore(store){workAction(`wstore-${store}`,()=>{workStore=store;workMulti=false})}
// ── toggleWorkSync — 切换云同步
function toggleWorkSync(){workAction('wsync',()=>workSync=!workSync)}
// ── toggleWorkMulti — 切换多选
function toggleWorkMulti(){workAction('wmulti',()=>workMulti=!workMulti)}
// ── toggleWorkOrder — 切换排序
function toggleWorkOrder(){workAction('wsort',()=>workOrder=workOrder==='desc'?'asc':'desc')}
// ── workImportUI — 二维码导入弹窗
function workImportUI(){return `<section class="tablet-screen page work-import-screen">${head('导入地块','work')}<div class="work-import-body"><div class="work-import-left"><svg class="work-qr" viewBox="0 0 120 120" aria-label="导入地块二维码"><rect width="120" height="120" fill="#fff"/><g fill="#000"><path d="M8 8h34v34H8zm7 7v20h20V15zM78 8h34v34H78zm7 7v20h20V15zM8 78h34v34H8zm7 7v20h20V85z"/><path d="M51 8h9v9h-9zm12 0h8v17h-8zm-12 21h8v9h-8zm12 5h9v17h-9zm-12 13h9v9h-9zm27 4h9v9h-9zm13-4h8v17h-8zm13 2h8v8h-8zM48 64h9v9h-9zm13-4h9v18h-9zm14 4h8v9h-8zm13 5h9v8h-9zm13-4h11v9h-11zM48 82h9v9h-9zm13 3h8v9h-8zm14-5h9v18h-9zm13 4h8v9h-8zm13-3h11v9h-11zM48 102h18v10H48zm25 1h9v9h-9zm15-4h9v13h-9zm13 4h11v9h-11z"/></g></svg><p>请扫描以上二维码或使用浏览器访问<br>172.30.77.230:7777/</p><em>请让遥控器和外部设备保持同网段</em></div><div class="work-import-divider"></div><div class="work-import-right"><div class="work-import-empty">暂无导入文件</div><div class="work-import-footer"><span class="work-box"></span><span>全部</span><button>删除</button></div></div></div></section>`}
// ── workCloudCards — 云地块卡片
function workCloudCards(){if(workStore!=='cloud')return '';if(workTab!=='plot')return `<div class="work-cloud-empty clickable" data-field-id="wlist-${workTab}" onclick="highlightWorkField('wlist-${workTab}',this)">${workTab==='running'?'暂无进行中地块':'暂无处方图'}</div>`;return `<div class="work-card-list"><article class="work-card clickable" data-field-id="wcloud-card" onclick="highlightWorkField('wcloud-card',this)"><div class="work-card-map"><svg viewBox="0 0 100 100"><path d="M18 64L52 13 45 42 77 43 80 57 66 68 58 54 39 62 38 88 23 82z"/></svg></div><div class="work-card-info"><small>2026-08-13 17:23:45</small><strong>2026-08-13-17:11:06</strong><p>上海市青浦区徐祥路685号靠近东方易云上海健康产业总部...</p></div><div class="work-card-meta"><strong>4.47英亩</strong><span>多边形地块</span></div></article><article class="work-card clickable" data-field-id="wcloud-card" onclick="highlightWorkField('wcloud-card',this)"><div class="work-card-map"><svg viewBox="0 0 100 100"><path d="M13 32L78 12 79 80 22 87z"/></svg></div><div class="work-card-info"><small>2026-08-13 13:45:08</small><strong>2026-08-12-16:33:05</strong><p>上海市青浦区徐祥路685号靠近东方易云上海健康产业总部...</p></div><div class="work-card-meta"><strong>1.31英亩</strong><span>多边形地块</span></div></article></div>`}
// ── workUI — 作业资源主 UI
function workUI(){if(workImport)return workImportUI();const isPlot=workTab==='plot',isLocal=workStore==='local';return `<section class="tablet-screen page work-screen">${head('作业资源')}${isPlot?`<button class="head-action head-plus clickable" data-field-id="wimport" onclick="workAction('wimport',()=>workImport=true)" aria-label="导入地块">＋</button>`:''}<div class="page-body"><aside class="work-side"><button data-field-id="wtab-plot" class="clickable ${workTab==='plot'?'on':''}" onclick="setWorkTab('plot','wtab-plot')">地块</button><button data-field-id="wtab-running" class="clickable ${workTab==='running'?'on':''}" onclick="setWorkTab('running','wtab-running')">进行中</button><button data-field-id="wtab-tif" class="clickable ${workTab==='tif'?'on':''}" onclick="setWorkTab('tif','wtab-tif')">处方图</button></aside><div class="work-main"><div class="segmented"><button data-field-id="wstore-local" class="clickable ${isLocal?'on':''}" onclick="setWorkStore('local')">本地</button><button data-field-id="wstore-cloud" class="clickable ${!isLocal?'on':''}" onclick="setWorkStore('cloud')">云端</button></div>${!workMulti&&isLocal?`<button data-field-id="wsort" class="work-sort clickable ${workOrder}" onclick="toggleWorkOrder()">时间<span class="work-sort-arrows">◆</span></button>`:''}${!workMulti&&isPlot&&isLocal?`<button data-field-id="wsync" class="work-cloud clickable" onclick="toggleWorkSync()"><span class="fake-check ${workSync?'checked':''}">${workSync?'✓':''}</span>自动同步到云端</button>`:''}<div class="work-search ${workMulti?'multi':''}">${!workMulti?`<label class="clickable" data-field-id="wsearch" onclick="highlightWorkField('wsearch',this)"><span class="work-search-icon"></span><input aria-label="按名称搜索" placeholder="请输入名称" onclick="event.stopPropagation();highlightWorkField('wsearch',this.parentElement)"></label>`:''}<button data-field-id="wmulti" class="outline-sm clickable" onclick="toggleWorkMulti()">多选</button></div>${workCloudCards()}${workMulti?`<div class="work-multi-footer clickable" data-field-id="wbatch" onclick="highlightWorkField('wbatch',this)"><label><span class="work-box"></span>全部</label>${isLocal?`<label><span class="work-box"></span>未同步</label>`:''}<span class="work-selected">已选:0</span><button class="work-delete">删除</button><button class="work-transfer">${isLocal?'上传':'下载'}</button></div>`:''}</div></div></section>`}


/* ===========================================
 * 【🟢 共享-数据】
 * ────────────────────────────────────────────
 * 日志 Tab（共 18 项）
 * ============================================ */

const LOG_TABS=[['drone','无人机'],['controller','遥控器'],['charger','充电器'],['video','视频'],['relay','中继器'],['transmission','图传']];
const LOG_GROUPS=[
 {name:'54400015__2026-08-14-09:12:28',time:'2026-08-14 09:12:28~2026-08-14 09:25:48',count:6,size:'9.835MB',children:[['54400015-2026-0814-091228_2026_08_14_cn.huidatech.gcs.log','4.177MB'],['54400015_20260814_091230.fpvstats','698.847KB'],['54400015-2026-0814-091231_mcuReceive.log','4.723MB'],['54400015-2026-0814-091231_mcuSend.log','5.710KB']]},
 {name:'54400015__2026-08-13-13:07:00',time:'2026-08-13 13:07:00~2026-08-13 18:15:53',count:8,size:'38.316MB'},
 {name:'54400015__2026-08-13-09:18:43',time:'2026-08-13 09:18:43~2026-08-13 12:01:50',count:7,size:'18.727MB'},
 {name:'54400015__2026-08-12-13:02:43',time:'2026-08-12 13:02:43~2026-08-12 18:08:11',count:8,size:'39.696MB'},
 {name:'54400015__2026-08-12-09:24:34',time:'2026-08-12 09:24:34~2026-08-12 12:05:12',count:7,size:'23.154MB'},
 {name:'54400015__2026-08-12-09:16:45',time:'2026-08-12 09:16:45~2026-08-12 09:24:32',count:6,size:'1.657MB'},
 {name:'54400015__2026-08-11-17:20:21',time:'2026-08-11 17:20:21~2026-08-11 18:06:56',count:6,size:'7.327MB'},
 {name:'54400015__2026-08-11-16:47:10',time:'2026-08-11 16:47:10~2026-08-11 17:20:06',count:6,size:'2.543MB'},
 {name:'54400015__2026-08-07-16:29:05',time:'2026-08-07 16:29:05~2026-08-07 16:50:15',count:6,size:'2.753MB'},
 {name:'54400015__2026-08-07-16:07:42',time:'2026-08-07 16:07:42~2026-08-07 16:10:27',count:4,size:'277.768KB'},
 {name:'54400015__2026-08-07-16:07:02',time:'2026-08-07 16:07:02~2026-08-07 16:07:40',count:4,size:'92.692KB'},
 {name:'54400015__2026-08-07-16:04:17',time:'2026-08-07 16:04:17~2026-08-07 16:07:00',count:6,size:'2.066MB'},
 {name:'54400015__2026-08-07-16:03:25',time:'2026-08-07 16:03:25~2026-08-07 16:04:09',count:6,size:'533.047KB'},
 {name:'54400015__2026-08-07-15:52:01',time:'2026-08-07 15:52:01~2026-08-07 16:02:35',count:6,size:'1.546MB'},
 {name:'54400015__2026-08-07-15:13:35',time:'2026-08-07 15:13:35~2026-08-07 15:51:42',count:6,size:'2.927MB'},
 {name:'54400015__2026-08-07-15:11:46',time:'2026-08-07 15:11:46~2026-08-07 15:12:51',count:6,size:'909.768KB'}
];
const LOG_TX_FILES=[['lighttpd','—',true],['boot_counter','5.000B'],['cluster_netfilter.log','287.000B'],['cluster_netfilter.log.1','287.000B'],['lighttpd.log','114.105KB'],['reboot_test.log','101.000B'],['sa.log','2.848KB'],['sa.log.1','2.848KB'],['sa.log.2','2.848KB'],['sa.log.3','2.848KB'],['sa.log.4','2.848KB'],['sa.log.5','2.848KB']];


/* ===========================================
 * 【🟡 03 日志管理】
 * ────────────────────────────────────────────
 * 当前日志 Tab（共 20 项）
 * ============================================ */

let logTab='controller',logPrompt='',logManager=false,logManagerTab='pending',logExpanded='',logSelectedGroups=new Set(),logTxSection='controller',logTxSelected=new Set(),logTxLoading=false,logCrash=false,logUploadDialog=false,logTxSwitch=false;
// ── logAction — 日志操作
function logAction(id,action,preserve=true){const prd=document.querySelector('.prd-col'),main=document.querySelector('.log-main'),pt=prd?prd.scrollTop:0,mt=main?main.scrollTop:0;action();renderAll();requestAnimationFrame(()=>{const p=document.querySelector('.prd-col'),m=document.querySelector('.log-main');if(p)p.scrollTop=pt;if(preserve&&m)m.scrollTop=mt;highlightWorkField(id,document.querySelector(`[data-field-id="${id}"]`),false)})}
// ── logDisconnectedMessage — 断连提示
function logDisconnectedMessage(tab){return tab==='drone'?'无人机未连接，请连接无人机后再上传日志':tab==='charger'?'充电器未连接，请连接充电器后再上传日志':'未搜索到日志列表'}
// ── setLogTab — 切换日志 Tab
function setLogTab(tab){logAction(`log-tab-${tab}`,()=>{logTab=tab;logPrompt='';logUploadDialog=false;if(tab==='transmission'){logTxLoading=true;setTimeout(()=>{logTxLoading=false;renderAll()},720)}},false)}
// ── closeLogPrompt — 关闭日志提示
function closeLogPrompt(){logAction(`log-tab-${logTab}`,()=>logPrompt='')}
// ── toggleLogGroup — 展开日志分组
function toggleLogGroup(name){logAction('log-group-expand',()=>logExpanded=logExpanded===name?'':name)}
// ── toggleLogSelect — 切换日志选中
function toggleLogSelect(name){logAction('log-group-select',()=>logSelectedGroups.has(name)?logSelectedGroups.delete(name):logSelectedGroups.add(name))}
// ── toggleTxSelect — 切换已传日志选中
function toggleTxSelect(name){logAction('log-tx-file',()=>logTxSelected.has(name)?logTxSelected.delete(name):logTxSelected.add(name))}
// ── logCanUpload — 判断可上传
function logCanUpload(){return logTab==='controller'?logSelectedGroups.size>0:logTab==='transmission'?logTxSelected.size>0:false}
// ── logTxTotal — 已传日志总数
function logTxTotal(){let bytes=0;LOG_TX_FILES.forEach(f=>{if(!logTxSelected.has(f[0])||f[1]==='—')return;const n=parseFloat(f[1]);bytes+=f[1].endsWith('KB')?n*1024:f[1].endsWith('MB')?n*1024*1024:n});const size=bytes>=1048576?`${(bytes/1048576).toFixed(3)}MB`:bytes>=1024?`${(bytes/1024).toFixed(3)}KB`:`${bytes.toFixed(3)}B`;return `已选择${logTxSelected.size}条图传日志${logTxSelected.size?`，共${size}`:''}`}
// ── openLogRemark — 打开 30 字备注
function openLogRemark(){if(!logCanUpload())return;logAction('log-upload',()=>logUploadDialog=true)}
// ── logTabsUI — 日志 Tab UI
function logTabsUI(){return `<div class="logs-tabs">${LOG_TABS.map(([id,label])=>`<button class="${logTab===id?'on':''}" data-field-id="log-tab-${id}" onclick="setLogTab('${id}')">${label}</button>`).join('')}</div>`}
// ── logFooterUI — 日志底部操作
function logFooterUI(){
 if(logTab==='video')return `<div class="log-footer"><div class="log-footer-spacer"></div><label class="log-check-label tx-all" data-field-id="log-video-all" onclick="logAction('log-video-all',()=>{})"><span class="log-check"></span>全选</label><button class="action delete disabled" data-field-id="log-delete" onclick="logAction('log-delete',()=>{})">删除</button><button class="action disabled" data-field-id="log-upload">上传</button></div>`;
 if(logTab==='charger')return `<div class="log-footer"><div class="log-footer-spacer"></div><button class="action delete disabled" data-field-id="log-delete" onclick="logAction('log-delete',()=>{})">删除</button><button class="action disabled" data-field-id="log-upload">上传</button></div>`;
 if(logTab==='transmission')return `<div class="log-footer"><span class="log-footer-text tx-total">${logTxTotal()}</span><label class="log-check-label tx-all" data-field-id="log-tx-all" onclick="logAction('log-tx-all',()=>{if(logTxSelected.size===LOG_TX_FILES.length)logTxSelected.clear();else LOG_TX_FILES.forEach(x=>logTxSelected.add(x[0]))})"><span class="log-check ${logTxSelected.size===LOG_TX_FILES.length?'on':''}">${logTxSelected.size===LOG_TX_FILES.length?'✓':''}</span>全选</label><button class="action delete ${logTxSelected.size?'':'disabled'}" data-field-id="log-delete" onclick="logAction('log-delete',()=>logTxSelected.clear())">删除</button><button class="action ${logCanUpload()?'':'disabled'}" data-field-id="log-upload" onclick="openLogRemark()">上传</button></div>`;
 const selected=[...logSelectedGroups].map(n=>LOG_GROUPS.find(g=>g.name===n)).filter(Boolean),total=selected.reduce((n,g)=>n+(g.size.endsWith('MB')?parseFloat(g.size):parseFloat(g.size)/1024),0),crash=logTab==='drone'?`<label class="log-check-label" data-field-id="log-crash" onclick="logAction('log-crash',()=>logCrash=!logCrash)"><span class="log-check ${logCrash?'on':''}">${logCrash?'✓':''}</span>炸机日志</label>`:'';
 return `<div class="log-footer"><span class="log-footer-text">${selected.length?`已选择${selected.length}组遥控器日志，共${total.toFixed(3)}MB`:''}</span><div class="log-footer-spacer"></div>${crash}<button class="action ${logCanUpload()?'':'disabled'}" data-field-id="log-upload" onclick="openLogRemark()">上传</button></div>`
}
// ── logControllerUI — 日志控制面板
function logControllerUI(){return `<div class="logs-summary" data-field-id="log-summary">共16组遥控器日志<button class="refresh" data-field-id="log-refresh" onclick="logAction('log-refresh',()=>{},false)">↻</button></div><div class="log-main">${LOG_GROUPS.map(g=>{const open=logExpanded===g.name,checked=logSelectedGroups.has(g.name);return `<article class="log-group ${open?'expanded':''}" data-field-id="log-group"><div class="log-group-head"><button class="log-group-select" data-field-id="log-group-select" onclick="event.stopPropagation();toggleLogSelect('${g.name}')"><span class="log-check ${checked?'on':''}">${checked?'✓':''}</span></button><button class="log-group-copy" onclick="toggleLogGroup('${g.name}')"><div class="log-group-name">${g.name}</div><div class="log-group-meta"><span>${g.time}</span><span>数量：${g.count}</span><span>大小：${g.size}</span></div></button><button data-field-id="log-group-expand" onclick="toggleLogGroup('${g.name}')"><span class="log-chevron"></span></button></div>${open?`<div class="log-children" data-field-id="log-child">${(g.children||[]).map(c=>`<div class="log-child"><span>${c[0]}</span><b>${c[1]}</b></div>`).join('')||'<div class="log-child"><span>该日志组文件信息已收起归档</span></div>'}</div>`:''}</article>`}).join('')}</div>${logFooterUI()}`}
// ── logWarningUI — 日志警告面板
function logWarningUI(message){return `<div class="logs-summary"><button class="refresh" data-field-id="log-refresh" onclick="logAction('log-refresh',()=>{},false)">↻</button></div><div class="log-main"><div class="log-warning"><i>!</i><span>${message}</span></div></div>${logFooterUI()}`}
// ── logVideoUI — 视频日志面板
function logVideoUI(){return `<div class="logs-summary"><button class="refresh" data-field-id="log-refresh" onclick="logAction('log-refresh',()=>{},false)">↻</button></div><div class="log-main"><div class="log-warning log-video-empty"><i>!</i><span>No video files</span></div></div>${logFooterUI()}`}
// ── logTransmissionUI — 传输日志面板
function logTransmissionUI(){if(logTxSection==='drone')return `<div class="logs-summary" data-field-id="log-summary">图传日志0项</div><div class="log-main"><div class="log-tx-layout"><aside class="log-tx-side"><button data-field-id="log-tx-device" onclick="logAction('log-tx-device',()=>logTxSection='controller',false)">遥控器</button><button class="on" data-field-id="log-tx-device">无人机</button></aside><div class="log-warning"><i>!</i><span>无人机未连接</span></div></div></div>${logFooterUI()}`;
 const tools=`<div class="log-tx-tools"><div class="log-link-state" data-field-id="log-tx-status"><span class="rc">▣</span><i class="ok"></i><span>—</span><i class="tri"></i><span>●</span></div><span>日志开关</span><button class="log-switch ${logTxSwitch?'on':''}" data-field-id="log-tx-switch" onclick="logAction('log-tx-switch',()=>logTxSwitch=!logTxSwitch)"></button><button class="refresh" data-field-id="log-refresh" onclick="logAction('log-refresh',()=>{},false)">↻</button></div>`;
 return `<div class="logs-summary" data-field-id="log-summary"><span>图传日志13项</span>${tools}</div><div class="log-main"><div class="log-tx-layout"><aside class="log-tx-side"><button class="on" data-field-id="log-tx-device">遥控器</button><button data-field-id="log-tx-device" onclick="logAction('log-tx-device',()=>logTxSection='drone',false)">无人机</button></aside><section class="log-tx-panel"><div class="log-tx-list">${LOG_TX_FILES.map(f=>`<button class="log-tx-row ${f[2]?'folder':''}" data-field-id="log-tx-file" onclick="toggleTxSelect('${f[0]}')"><span class="log-check ${logTxSelected.has(f[0])?'on':''}">${logTxSelected.has(f[0])?'✓':''}</span><span class="log-folder-arrow">${f[2]?'›':''}</span><i class="file-icon"></i><span>${f[0]}</span><b>${f[2]?'':f[1]}</b></button>`).join('')}</div></section></div></div>${logFooterUI()}`}
// ── logManagerUI — 日志管理员面板
function logManagerUI(){return `<section class="tablet-screen logs-screen"><div class="log-manager"><button class="back" aria-label="返回日志管理" data-field-id="log-upload-manager" onclick="logAction('log-upload-manager',()=>logManager=false,false)">${icon('i-back')}</button><div class="log-manager-tabs"><button class="${logManagerTab==='pending'?'on':''}" data-field-id="log-manager-pending" onclick="logAction('log-manager-pending',()=>logManagerTab='pending',false)">未上传</button><button class="${logManagerTab==='history'?'on':''}" data-field-id="log-manager-history" onclick="logAction('log-manager-history',()=>logManagerTab='history',false)">上传历史</button></div><div class="log-manager-line"></div><main class="log-manager-body">${logManagerTab==='pending'?`<div class="log-manager-summary"><span>无人机开启关闭为一条记录</span><span>0条记录</span></div>`:`<div class="log-manager-summary"><span>无人机开启关闭为一条记录</span><span>1条记录</span></div><div class="log-manager-card" data-field-id="log-manager-record"><span>54400015/crash/ann_20260807_155206.log</span><span>43.802KB</span><span class="qr-mini"></span></div>`}</main></div></section>`}
// ── logUploadDialogUI — 上传弹窗
function logUploadDialogUI(){return !logUploadDialog?'':`<div class="modal-mask"><div class="modal log-upload-dialog"><h3>日志上传</h3><input data-field-id="log-remark" maxlength="30" placeholder="请输入上传日志备注"><div class="dialog-actions"><button onclick="logAction('log-remark',()=>logUploadDialog=false)">取消</button><button onclick="logAction('log-upload',()=>logUploadDialog=false)">开始上传</button></div></div></div>`}
// ── logsUI — 日志主 UI
function logsUI(){if(logManager)return logManagerUI();let content=logTab==='controller'?logControllerUI():logTab==='video'?logVideoUI():logTab==='transmission'?logTransmissionUI():logWarningUI(logDisconnectedMessage(logTab));return `<section class="tablet-screen logs-screen"><div class="page-head">${back()}${logTabsUI()}<button class="upload-manage" data-field-id="log-upload-manager" onclick="logAction('log-upload-manager',()=>logManager=true,false)">上传管理</button></div><div class="logs-body">${content}</div>${logPrompt?`<div class="modal-mask"><div class="modal"><h3>提示</h3><p>${logPrompt}</p><button onclick="closeLogPrompt()">知道了</button></div></div>`:''}${logTxLoading?`<div class="log-query-mask"><div class="log-query-box"><strong>查询图传日志</strong><span>正在连接FTP...</span><i class="log-spinner"></i></div></div>`:''}${logUploadDialogUI()}</section>`}


/* ===========================================
 * 【🟡 04 设备管理】
 * ────────────────────────────────────────────
 * 设备视图状态（共 11 项）
 * ============================================ */

let deviceView='main',deviceDebug=false,deviceToast='';

const DEVICE_ICONS={rc:'./assets/DEVICE_ICONS_rc.png',drone:'./assets/DEVICE_ICONS_drone.png',charger:'./assets/DEVICE_ICONS_charger.png',battery:'./assets/DEVICE_ICONS_battery.png',check:'./assets/DEVICE_ICONS_check.png',transmission:'./assets/DEVICE_ICONS_transmission.png',remoteId:'./assets/DEVICE_ICONS_remoteId.png'};
const DEVICE_DATA={
 rc:{title:'遥控器',rows:[['型号','HD401B'],['当前操控模式','美国手'],['序列号','54400015'],['固件版本','Lahaina for arm64'],['系统版本','hd405_domestic_v2'],['MCU版本','0.0.0.31','升级'],['打点器版本','N/A'],['遥控器IP地址','172.30.77.230','刷新'],['app版本','V4.4.0.18']]},
 drone:{title:'无人机版本信息',rows:[['SN',''],['无人机ID',''],['主控ID',''],['型号',''],['整机版本',''],['主控版本',''],['飞控版本',''],['导航版本',''],['电调1版本',''],['电调2版本',''],['电调3版本',''],['电调4版本',''],['电调5版本',''],['电调6版本',''],['电调7版本',''],['电调8版本',''],['药箱',''],['离心喷头N1',''],['离心喷头N2',''],['离心喷头N3',''],['离心喷头N4',''],['播撒',''],['旋转雷达定子电调',''],['',''],['旋转雷达定高',''],['电池',''],['4g模组',''],['产品识别码','']]},
 transmission:{title:'图传模块',rows:[['遥控器','CX6672-CD_V2.10.00_R84_20260607'],['无人机','未连接']]},
 remoteId:{title:'运行识别',rows:[['型号','-'],['序列号：','-'],['版本',''],['网络状态','']]}
};
// ── deviceFieldId — 设备字段 ID
function deviceFieldId(view,i){return `device-${view}-${i}`}
// ── deviceSetSpec — 设备规格配置
function deviceSetSpec(view,rows=[]){let fields=[],rules=[];if(view==='main'){fields=[{id:'device-tip',cells:['版本检测结果','只读状态','版本检查服务','检测完成后更新','当前版本已是最新版本']},{id:'device-debug',cells:['Debug','布尔开关','设备管理调试配置','开/关','关闭']},{id:'device-check',cells:['检测升级','操作按钮','设备版本服务','仅检查版本，不自动升级','检测升级']},{id:'device-card',cells:['设备卡片','复合字段','设备连接与版本回报','固定 4 列；重复卡片共用一个字段','7 类设备']},{id:'device-version',cells:['软件版本','字符串','设备版本回报','连接后显示','4.4.0.18']},{id:'device-state',cells:['连接状态','枚举','实时通信','已连接/未连接','已连接']}];rules=[{id:'device-tip',text:'页面顶部显示本次版本检测结果。'},{id:'device-debug',text:'点击 Debug 开关切换调试状态，页面位置和卡片滚动位置保持不变。'},{id:'device-check',text:'点击“检测升级”只刷新检测结果，不会直接执行固件升级。'},{id:'device-card',text:'点击任一设备卡片进入对应 App 内详情页；7 张重复卡片共用“设备卡片”语义字段。'},{id:'device-version',text:'遥控器和图传模块在卡片顶部显示当前软件版本。'},{id:'device-state',text:'已连接设备使用正常图标与绿色状态；未连接设备整体灰化。'}]}else{fields=rows.map((r,i)=>({id:deviceFieldId(view,i),cells:[r[0]||'未命名模块','只读信息',`${DEVICE_DATA[view]?.title||view}版本回报`,'设备未连接时允许为空',r[1]||'-']}));rules=rows.map((r,i)=>({id:deviceFieldId(view,i),text:`“${r[0]||'未命名模块'}”按真机顺序显示，点击该行定位字段说明。`}));rows.forEach((r,i)=>{if(r[2])rules.push({id:`${deviceFieldId(view,i)}c0`,text:`点击“${r[2]}”操作“${r[0]}”；原型只显示反馈，不调用真机升级或写入接口。`})});if(view==='charger'||view==='battery'){fields=[{id:'device-search',cells:[view==='charger'?'搜索附近的充电器':'搜索附近的电池','操作按钮','蓝牙设备扫描','仅模拟，不访问真机','搜索']},{id:'device-refresh',cells:['刷新附近设备','图标按钮','蓝牙设备扫描','仅模拟，不访问真机','刷新']}];rules=[{id:'device-search',text:'点击居中的搜索按钮显示模拟反馈；真实蓝牙扫描不在原型中执行。'},{id:'device-refresh',text:'点击右上角刷新图标重新显示搜索反馈，详情窗口尺寸保持不变。'}]}if(view==='check'){fields=[{id:'device-check-empty',cells:['版本检查内容','空状态','版本检查服务','无可检查设备时为空','-']}];rules=[{id:'device-check-empty',text:'当前真机版本检查页为空白，仅保留固定标题与返回按钮。'}]}}SCREENS.devices.prd.controlSpec={fields,baseRules:[],rules}}
// ── deviceOpen — 打开设备详情
function deviceOpen(view){deviceView=view;deviceToast='';renderAll()}
// ── deviceBack — 设备详情返回
function deviceBack(){if(deviceView==='main')go('home');else deviceOpen('main')}
// ── deviceFeedback — 设备反馈操作
function deviceFeedback(text,id){deviceToast=text;renderAll();requestAnimationFrame(()=>{const el=document.querySelector(`[data-field-id="${id}"]`);if(el)selectControlField(id,el)});setTimeout(()=>{deviceToast='';if(cur==='devices')renderAll()},1300)}
// ── deviceHeader — 设备头部信息
function deviceHeader(title,refresh=false){return `<div class="device-detail-head"><button class="back" onclick="deviceBack()" aria-label="返回设备管理">${icon('i-back')}</button><h2 class="device-detail-title">${title}</h2>${refresh?`<button class="device-detail-refresh" data-field-id="device-refresh" onclick="deviceFeedback('已刷新附近设备','device-refresh')" aria-label="刷新">↻</button>`:''}</div>`}
// ── deviceRows — 设备行数据
function deviceRows(view,rows){return rows.map((r,i)=>{const id=deviceFieldId(view,i),action=r[2]?`<button class="device-row-action" data-field-id="${id}c0" onclick="event.stopPropagation();deviceFeedback('${r[2]==='升级'?'原型不会执行真实升级':'IP 地址已刷新'}','${id}c0')">${r[2]}</button>`:'';return `<div class="device-row ${view==='drone'?'device-drone-row':''}" data-field-id="${id}" onclick="highlightField('${id}',this,'prdsec2')"><span class="device-row-label">${r[0]||'&nbsp;'}</span><span class="device-row-value">${r[1]||''}</span>${action}</div>`}).join('')}
// ── deviceDetailUI — 设备详情页（29 行）
function deviceDetailUI(view){if(view==='charger'||view==='battery'){deviceSetSpec(view);const label=view==='charger'?'智能充电器':'电池',search=view==='charger'?'搜索附近的充电器':'搜索附近的电池';return `<section class="tablet-screen devices-screen">${deviceHeader(label,true)}<div class="device-empty"><button class="device-search-btn" data-field-id="device-search" onclick="deviceFeedback('正在搜索附近设备…','device-search')">${search}</button></div>${deviceToast?`<div class="device-toast">${deviceToast}</div>`:''}</section>`}if(view==='check'){deviceSetSpec(view);return `<section class="tablet-screen devices-screen">${deviceHeader('版本检查')}<div class="device-version-empty" data-field-id="device-check-empty" onclick="highlightField('device-check-empty',this,'prdsec2')"></div></section>`}const data=DEVICE_DATA[view];deviceSetSpec(view,data.rows);return `<section class="tablet-screen devices-screen">${deviceHeader(data.title)}<div class="device-detail-scroll">${deviceRows(view,data.rows)}</div>${deviceToast?`<div class="device-toast">${deviceToast}</div>`:''}</section>`}
// ── deviceCard — 设备卡片
function deviceCard(id,name,state,version=''){return `<button class="device-card ${state==='已连接'?'active':''}" data-field-id="device-card" onclick="deviceOpen('${id}')">${version?`<span class="version-ribbon" data-field-id="device-version">软件版本:${version}</span>`:''}<img class="device-icon" src="${DEVICE_ICONS[id]}" alt=""><span class="device-name">${name}</span><span class="device-state" data-field-id="device-state">${state}</span></button>`}
// ── devicesUI — 设备总览 UI
function devicesUI(){if(deviceView!=='main')return deviceDetailUI(deviceView);deviceSetSpec('main');return `<section class="tablet-screen devices-screen"><div class="devices-head"><button class="back" onclick="go('home')" aria-label="返回首页">${icon('i-back')}</button><h2 class="devices-title">设备管理</h2><div class="device-head-right"><button class="device-debug" data-field-id="device-debug" onclick="deviceDebug=!deviceDebug;deviceFeedback(deviceDebug?'Debug 已开启':'Debug 已关闭','device-debug')"><span>Debug</span><span class="switch ${deviceDebug?'on':''}"></span></button><button class="device-check" data-field-id="device-check" onclick="deviceFeedback('当前版本已是最新版本','device-check')">检测升级</button></div></div><div class="device-body"><div class="device-tip" data-field-id="device-tip" onclick="highlightField('device-tip',this,'prdsec2')">当前版本已是最新版本</div><div class="device-grid">${deviceCard('rc','遥控器','已连接','4.4.0.18')}${deviceCard('drone','无人机','未连接')}${deviceCard('charger','充电器','未连接')}${deviceCard('battery','电池','未连接')}${deviceCard('check','版本检查','未连接')}${deviceCard('transmission','图传模块','已连接','CX6672-CD_V2.10.00_R84_20260607')}${deviceCard('remoteId','运行识别','未连接')}</div></div>${deviceToast?`<div class="device-toast">${deviceToast}</div>`:''}</section>`}

// ── accountUI — 账户总览

/* ===========================================
 * 【🟡 05 用户中心】
 * ────────────────────────────────────────────
 * 账户总览（共 10 项）
 * ============================================ */

function accountUI(){return `<section class="tablet-screen page account-page">${head('用户信息','home','account-back')}<div class="account-body" data-field-id="account-scroll"><div class="sync-time" data-field-id="account-sync">信息同步时间:2026-08-12 09:24:39</div><div class="account-profile"><div class="avatar" data-field-id="account-avatar"></div><div><div class="account-name" data-field-id="account-name">张宣</div><div class="account-sub" data-field-id="account-role">无</div></div><div class="account-id" data-field-id="account-number"><div class="account-medals" data-field-id="account-medals"><img src="${ACCOUNT_IMG.medalGreen}" alt="基础勋章未获得"><img src="${ACCOUNT_IMG.medalRed}" alt="训练勋章未获得"></div>14752221887</div></div><div class="stats"><div class="clickable" data-field-id="account-weight" onclick="highlightWorkField('account-weight',this,true)"><div class="stat-label">吊运重量（磅）</div><div class="stat-value">0.00</div></div><div class="clickable" data-field-id="account-sorties" onclick="highlightWorkField('account-sorties',this,true)"><div class="stat-label">作业架次（次）</div><div class="stat-value">18</div></div><div class="clickable" data-field-id="account-duration" onclick="highlightWorkField('account-duration',this,true)"><div class="stat-label">作业时长（小时）</div><div class="stat-value">0.8</div></div></div><button class="account-row clickable" data-field-id="account-records" onclick="go('flightRecords')">我的飞行记录 <span class="chev">›</span></button><button class="account-row clickable" data-field-id="account-insurance" onclick="go('insurance')">橙心服务 <span class="chev">›</span></button><button class="account-row clickable" data-field-id="account-nofly" onclick="go('noFly')">临时禁飞区 <span class="chev">›</span></button><button class="logout-btn clickable" data-field-id="account-logout" onclick="highlightWorkField('account-logout',this,true)">退出登录</button></div></section>`}
// ── setFlightTab — 切换飞行 Tab
function setFlightTab(btn){btn.parentElement.querySelectorAll('button').forEach(x=>x.classList.remove('on'));btn.classList.add('on');document.getElementById('flightEmpty').textContent='暂无'+btn.textContent+'记录'}
// ── flightRecordsUI — 飞行记录页
function flightRecordsUI(){return `<section class="tablet-screen page">${subHead('飞行记录')}<div class="flight-body"><div class="flight-tabs"><button class="on" onclick="setFlightTab(this)">喷洒</button><button onclick="setFlightTab(this)">播撒</button><button onclick="setFlightTab(this)">吊运</button></div><div class="flight-unuploaded">未上传: 0</div><div class="flight-table-head"><span>位置/日期</span><span>作业面积</span><span>飞行时长</span><span>无人机ID</span><span>用药</span><span>作业模式</span></div><div class="flight-empty" id="flightEmpty">暂无喷洒记录</div></div></section>`}
// ── showRenewalDialog — 显示续保弹窗
function showRenewalDialog(){document.getElementById('renewalModal').style.display='flex'}
// ── insuranceUI — 保险页面
function insuranceUI(){return `<section class="tablet-screen page">${subHead('橙心服务','account','<button class="insurance-action" onclick="showRenewalDialog()">续费验机</button>')}<div class="insurance-body"><div class="insurance-row"><span>橙心服务</span><span>N/A</span></div><div class="insurance-row"><span>第三者责任保障</span><span>N/A</span></div></div><div class="local-modal" id="renewalModal" style="display:none"><div class="local-dialog"><h3>续费验机</h3><p>无人机未连接，请连接无人机后再进行续费</p><button onclick="document.getElementById('renewalModal').style.display='none'">确定</button></div></div></section>`}

const noFlyRows=()=>[['Luzhou Yunlong Airport','行政禁飞区','12174.67英亩','2020/05/20-2030/01/01'],['Luzhou Yunlong Airport','行政禁飞区','26218.64英亩','2020/05/20-2030/01/01'],['Luzhou Yunlong Airport','行政禁飞区','12471.21英亩','2020/05/20-2030/01/01']];
// ── noFlyUI — 禁飞区列表
function noFlyUI(){return `<section class="tablet-screen page">${subHead('临时禁飞区','account','<div class="nofly-actions"><button class="square-action" onclick="go(\'noFlyDownload\')" aria-label="下载">⇩</button><button class="square-action" onclick="go(\'noFlyMap\')" aria-label="新增">＋</button></div>')}<div class="nofly-body"><div class="nofly-head"><span>名称/位置</span><span>类型</span><span>面积</span><span>有效期</span></div>${noFlyRows().map((r,i)=>`<button class="nofly-row" onclick="go('noFlyPreview')">${r.map(x=>`<span>${x}</span>`).join('')}</button>`).join('')}</div></section>`}
// ── noFlyDownloadUI — 禁飞区下载 UI
function noFlyDownloadUI(){return `<section class="tablet-screen page">${subHead('下载禁飞区','noFly')}<div class="download-body"><div class="download-tools"><button>时间</button><button>距离</button></div><div class="nofly-head download-table"><span>名称/位置</span><span>类型</span><span>面积</span><span>有效期</span></div>${noFlyRows().slice(0,2).map(r=>`<div class="nofly-row">${r.map(x=>`<span>${x}</span>`).join('')}</div>`).join('')}<div class="download-footer">已选择 0 个<button onclick="linkPRD('prdsec3')">下载</button></div></div></section>`}
// ── showMapToast — 地图 Toast
function showMapToast(text){const toast=document.getElementById('mapToast');toast.textContent=text;toast.style.display='block';clearTimeout(window.mapToastTimer);window.mapToastTimer=setTimeout(()=>toast.style.display='none',1800)}
// ── noFlyMapUI — 禁飞区地图
function noFlyMapUI(preview=false){return `<section class="tablet-screen map-prototype" style="background-image:url('${ACCOUNT_IMG.map}')"><button class="map-hit map-plan" aria-label="地图规划">地图规划⌄</button>${preview?'':`<button class="map-hit map-add" aria-label="添加" onclick="showMapToast('请在地图上添加禁飞区边界点')">＋添加</button><button class="map-hit map-cancel" aria-label="撤销" onclick="showMapToast('已撤销上一步操作')">撤销</button>`}<button class="map-hit map-back" aria-label="返回" onclick="go('noFly')">返回</button>${preview?'':`<button class="map-hit map-save" aria-label="保存" onclick="showMapToast('原型不会向设备保存数据')">保存</button>`}<div class="map-toast" id="mapToast"></div></section>`}
// ── noFlyPreviewUI — 禁飞区详情预览
function noFlyPreviewUI(){return noFlyMapUI(true)}

const DRONE_ICONS={"aircraft":"./assets/DRONE_ICONS_aircraft.png","radar":"./assets/DRONE_ICONS_radar.png","remote_control":"./assets/DRONE_ICONS_remote_control.png","spray":"./assets/DRONE_ICONS_spray.png","battery":"./assets/DRONE_ICONS_battery.png","rtk":"./assets/DRONE_ICONS_rtk.png","hd":"./assets/DRONE_ICONS_hd.png","other":"./assets/DRONE_ICONS_other.png"};const DRONE_TABS=[['air','aircraft','无人机'],['radar','radar','感知'],['remote','remote_control','遥控器'],['spray','spray','喷洒'],['battery','battery','电池'],['rtk','rtk','RTK'],['video','hd','图传'],['other','other','其他设置']];let droneTab='air';
const DEBUG_MENU_ICONS={"artosyn":["./assets/DEBUG_MENU_ICONS_artosyn_nrm.png","./assets/DEBUG_MENU_ICONS_artosyn_sel.png"],"gps":["./assets/DEBUG_MENU_ICONS_gps_nrm.png","./assets/DEBUG_MENU_ICONS_gps_sel.png"],"work":["./assets/DEBUG_MENU_ICONS_work_nrm.png","./assets/DEBUG_MENU_ICONS_work_sel.png"],"info":["./assets/DEBUG_MENU_ICONS_info_nrm.png","./assets/DEBUG_MENU_ICONS_info_sel.png"],"ftp":["./assets/DEBUG_MENU_ICONS_ftp_nrm.png","./assets/DEBUG_MENU_ICONS_ftp_sel.png"],"batteryMenu":["./assets/DEBUG_MENU_ICONS_batteryMenu_nrm.png","./assets/DEBUG_MENU_ICONS_batteryMenu_sel.png"],"motor":["./assets/DEBUG_MENU_ICONS_motor_nrm.png","./assets/DEBUG_MENU_ICONS_motor_sel.png"],"sensor":["./assets/DEBUG_MENU_ICONS_sensor_nrm.png","./assets/DEBUG_MENU_ICONS_sensor_sel.png"],"activation":["./assets/DEBUG_MENU_ICONS_activation_nrm.png","./assets/DEBUG_MENU_ICONS_activation_sel.png"],"param":["./assets/DEBUG_MENU_ICONS_param_nrm.png","./assets/DEBUG_MENU_ICONS_param_sel.png"],"radarMenu":["./assets/DEBUG_MENU_ICONS_radarMenu_nrm.png","./assets/DEBUG_MENU_ICONS_radarMenu_sel.png"],"cameraMenu":["./assets/DEBUG_MENU_ICONS_cameraMenu_nrm.png","./assets/DEBUG_MENU_ICONS_cameraMenu_sel.png"]};
const RELEASE_MENU_STATE_ICONS={other:["./assets/RELEASE_MENU_STATE_ICONS_other_nrm.png","./assets/RELEASE_MENU_STATE_ICONS_other_sel.png"]};


/* ===========================================
 * 【🟡 07 无人机设置】
 * ────────────────────────────────────────────
 * Tab 滚动位置（共 102 项）
 * ============================================ */

let droneTabsScrollTop=0;
const DEBUG_TABS=[['air','aircraft','无人机'],['radar','radar','感知'],['remote','remote_control','遥控器'],['spray','spray','喷洒'],['battery','battery','电池'],['rtk','rtk','RTK'],['video','hd','图传'],['other','other','其他设置'],['data401','artosyn','数传'],['data','artosyn','数传'],['gps','gps','定位信息'],['ftp','work','文件传输'],['hardware','info','硬件测试'],['work','work','作业'],['radarDebug','radarMenu','雷达'],['network','ftp','FTP'],['snr','gps','信噪比'],['batteryDebug','batteryMenu','电池'],['motor','motor','电机'],['otherDebug','sensor','其他'],['activate','activation','激活'],['oam','param','远程锁定'],['radarDistance','radarMenu','雷达距离'],['camera','cameraMenu','摄像头'],['video4g','cameraMenu','4G图传'],['rotateRadar','radarMenu','旋转雷达']];
const RELEASE_TAB_IDS=new Set(DRONE_TABS.map(x=>x[0]));
const isDebugTab=()=>!RELEASE_TAB_IDS.has(droneTab);
// ── droneTabs — 当前无人机 Tab
function droneTabs(){return `<nav class="drone-tabs" onscroll="droneTabsScrollTop=this.scrollTop">${DEBUG_TABS.map(x=>{const selected=droneTab===x[0],menuIcon=DEBUG_MENU_ICONS[x[1]]||RELEASE_MENU_STATE_ICONS[x[1]],iconSrc=menuIcon?menuIcon[selected?1:0]:DRONE_ICONS[x[1]];return `<button class="drone-tab ${menuIcon?'debug-menu-state ':''}${selected?'on':''}" onclick="setDroneTab('${x[0]}')"><img src="${iconSrc}" alt="">${x[2]}</button>`}).join('')}</nav>`}
// ── setDroneTab — 切换无人机 Tab
function setDroneTab(id){const tabs=document.querySelector('.drone-tabs');if(tabs)droneTabsScrollTop=tabs.scrollTop;droneTab=id;if(typeof cur!=='undefined'&&cur!=='droneSettings')cur='droneSettings';renderAll();const nextTabs=document.querySelector('.drone-tabs');if(nextTabs)nextTabs.scrollTop=droneTabsScrollTop;setTimeout(()=>linkPRD('prdsec1'),0)}

const DRONE_PRD={
 air:{title:'无人机设置 · 无人机',desc:'配置启航、返航、失联与作业完成后的飞行器行为。',fields:[['返航参数','高度/速度','飞控参数','步进调节','范围校验'],['飞行策略','枚举/开关','飞控参数','悬停或返航','未连接不下发']],interactions:['点击步进按钮修改数值','切换返航与悬停策略','高级设置进入 App 内子页面'],edge:['作业中部分参数不可修改','设备未连接时只展示交互，不写入真机']},
 radar:{title:'无人机设置 · 感知',desc:'配置前雷达仿地、避障、自动绕障、水田模式、雷达提示与雷达球显示。',fields:[['雷达能力','开关','感知模块','依赖前雷达','按真机默认值'],['距离与延迟','数值','感知模块','步进调节','按页面范围限制'],['雷达球尺寸','枚举','界面显示','小或大','默认大']],interactions:['点击开关改变功能状态','点击加减按钮调整灵敏度、距离和延迟','点击“小/大”切换雷达球显示尺寸'],edge:['避障关闭时自动绕障不可用，绕障距离与速度置灰','仿地灵敏度范围20~200%，淡隐延迟范围5~10秒','未连接时只模拟页面交互，不向设备下发参数']},
 remote:{title:'无人机设置 · 遥控器',desc:'按真机配置摇杆、拨轮、连接与对频、按键、地图跟随、网络诊断及离线点位上传。',fields:[['摇杆模式','枚举','遥控器参数','日本手/美国手/中国手','美国手'],['连接与按键','开关/操作','遥控器配置','按设备状态','真机当前值'],['App 内子页面','页面入口','各 SettingFragment','可返回','4个入口']],interactions:['切换摇杆模式与连接方式','开关中继、避障按键和地图跟随','进入摇杆校准、拨轮校准、自定义按键及网络诊断','开始对频与点位上传只显示安全确认，不控制真机'],edge:['飞行过程中禁止切换摇杆模式','中继模式打开后连接方式与普通对频入口切换为中继对频视图','点位上传存在外部数据副作用，原型仅显示离线上传确认弹窗']},
 spray:{title:'无人机设置 · 喷洒',desc:'按真机完整还原喷洒设置长页面，覆盖作业系统、喷头、手控流量、药箱校准、流量校准与智能速度调节。',fields:[['喷洒设置','参数/状态/入口','SpraySettingFragment','按设备与作业状态','真机当前值']],interactions:['切换喷头类型、数量、喷洒模式和手控作业模式','调整流量、剩余药量阈值及F1/F2流量系数','执行排气、空箱/满箱/流量校准前先检查设备连接','进入作业系统实时数据与喷头配置子页面','页面可向下滑动到智能速度调节说明'],edge:['未连接无人机时校准与排气只显示安全提示','剩余药量阈值不计入剩余药量显示','智能速度调节只在自主作业且泵效能不足时介入']},
 battery:{title:'无人机设置 · 电池',desc:'按真机还原智能电池设置：顶部六类实时数据、低电量处理方式、两级告警阈值及当前电池ID。当前真机页面没有箭头型 App 内子页面。',fields:[['电池状态与保护','只读/枚举/百分比','BatterySettingFragment','按连接和机型动态显示','未连接显示 -']],interactions:['分别查看电量、电压、电流、功率、温度和循环次数','在悬停与返航之间切换低电量告警行为','以1%步长调整低电量告警设置和严重低电量告警','页面向下滑动到电池ID即结束'],edge:['低电量告警设置范围16~30%，手动模式及增强手动模式不触发保护行为','当前真机严重低电量范围10~15%；源码根据机型保留其他范围分支','未连接时电池ID为空','惠达自研电池在线时可条件显示电池区域、激活时间、剩余循环次数和激活按钮；它们是同页条件字段，不是子页面','580Max可显示第二块电池，5180四电池机型可显示第三、第四块电池']},
 rtk:{title:'无人机设置 · RTK',desc:'配置 RTK 检测与信号源，查看服务权益并进入各诊断页面。',fields:[['RTK检测','开关','定位模块','解锁前检测','默认开启'],['服务与诊断','状态/操作','网络RTK','进入子页面','权益到期提示']],interactions:['开关 RTK 检测','进入 NTRIP、RTK诊断、卫星信噪比和打点精度'],edge:['关闭检测后解锁不再校验固定状态']},
 video:{title:'无人机设置 · 图传',desc:'配置图传信道模式，查看链路信号质量与图传版本。',fields:[['信道模式','枚举','图传模块','自动/2G/5G','自动为默认'],['链路质量','诊断','图传模块','进入子页面','无连接显示占位']],interactions:['切换信道模式','点击链路信号质量进入详情'],edge:['频段可用性受硬件与地区限制']},
 other:{title:'无人机设置 · 其他设置',desc:'按当前真机还原“其他设置”可滑动长列表，并固定底部重启/关机操作栏。',fields:[['语音播报','开关','本机设置','布尔','开启'],['语速','数值','TTS配置','步进调节','1.0'],['语音引擎','系统入口','Android TTS','离开App','-'],['前摄界面','枚举弹层','相机显示','无/十字/九宫格','十字'],['后摄界面','枚举弹层','相机显示','无/十字/九宫格','无'],['前摄视频流参数','枚举弹层','MC_FRONT_VIDEO_CFG','12个组合','1280*720 20fps 2Mbps'],['后摄视频流参数','枚举弹层','MC_REAR_VIDEO_CFG','12个组合','1280*720 20fps 2Mbps'],['语言','枚举弹层','语言配置','19种语言','中文(简体)'],['橙心服务','App内入口','保险服务','进入子页面','-'],['Android系统位置信息服务','系统入口','Android定位','离开App','打开']],interactions:['开关语音播报并以加减按钮调整语速','点击前后摄界面、视频流参数和语言，在当前窗口上显示真机式浮层','进入橙心服务App内子页面','语音引擎与定位仅提示属于Android系统页面','底部重启和关机固定悬浮并弹出安全确认'],edge:['当前真机不显示屏幕亮度、音量大小、摄像头模式、维护和AI视频流字段','Android系统页面不在本原型还原范围','重启和关机不会操作真实设备']}
};
// ── dSwitch — 开关控件工厂
function dSwitch(on=true){return `<button class="setting-switch ${on?'on':''}" onclick="this.classList.toggle('on')"></button>`}
// ── dStep — 步进器控件工厂
function dStep(value,unit=''){return `<button class="drone-step">−</button><span class="drone-value">${value}${unit}</span><button class="drone-step">＋</button>`}
const DEBUG_PAGE_DATA={
 data401:{title:'数传通道P401',source:'DebugP401ArtosynFragment · fragment_debug_artosyn2.xml · 2026-08-12实机截图',fields:[['天空端功率','数值','P401模块','25~33','25'],['天空端功率开、闭环模式','枚举','P401模块','开环/闭环','开环模式'],['天空端功率自适应','枚举','P401模块','开启/关闭','关闭自适应'],['地面端区域','分区标题','P401模块','当前实机隐藏地面端控件','数传P401（地面端）']],rows:[['功率',dStep('25')],['功率开、闭环模式','<select class="debug-select"><option>开环模式</option><option>闭环模式</option></select>'],['功率自适应','<select class="debug-select"><option>关闭自适应</option><option>开启自适应</option></select>'],['数传P401（地面端）','']],interactions:['页面采用真机黑色内容区，顶部留出调试状态区域','天空端仅显示真机当前可见的功率、功率模式和功率自适应','加减按钮调节天空端功率','地面端保留分区标题，当前真机版本将其参数控件设为隐藏'],edge:['真机布局中通道模式和通道号为gone，不应在页面中显示','地面端功率及模式控件同样为gone','写参失败恢复设备回报值']},
 data:{title:'数传通道',source:'DebugArtosynFragment · fragment_debug_artosyn.xml',fields:[['总功率','数值','数传模块','设备范围','-'],['频段','枚举','数传模块','2G/5G/自动','自动'],['天空端2G/5G信道','整数','数传模块','合法信道','2406/5740'],['地面端2G/5G信道','整数','数传模块','合法信道','2405/5731'],['LNA状态','枚举','数传模块','0~3/开关','-'],['Mavlink状态','操作','数传模块','人工触发','重置']],rows:[['数传功率',dStep('20','dBm')],['功率复位','<button class="debug-action">复位</button>'],['数传修复','<button class="debug-action">修复</button>'],['Mavlink状态','<button class="debug-action">重置</button>'],['工作频段','<span class="drone-segment"><button>2G</button><button>5G</button><button class="on">自动</button></span>'],['地面端类型','自动'],['天空端类型','自动'],['天空端2G信道','2406'],['天空端2G功率',dStep('20','dBm')],['天空端5G信道','5740'],['天空端5G功率',dStep('20','dBm')],['地面端2G信道','2405'],['地面端5G信道','5731'],['MCU循环发送','<button class="debug-action">开始</button> <button class="debug-action">停止</button>'],['读取寄存器','<button class="debug-action">读取</button>']],interactions:['页面上下滑动查看全部参数','点击复位/修复/读取执行连接校验','选择2G、5G或自动频段','调整信道与发射功率'],edge:['未连接时操作给出提示','频段与信道写入失败恢复原值']},
 gps:{title:'定位信息',source:'DebugGpsFragment · fragment_debug_gps.xml',fields:[['RTCM转发','开关','定位模块','布尔','关闭'],['定位模块类型','操作','UM482/UBLOX','二选一','-'],['飞控卫星信噪比','导航','GNSS回报','只读','-'],['地面站卫星信号','导航','系统定位','只读','-'],['GNSS版本','文本','定位模块','只读','123'],['MQTT计数','整数','上报模块','只读','0'],['飞行轨迹点','操作','MQTT','人工触发','上传']],rows:[['RTCM数据转发',dSwitch(false)],['UM482配置','<button class="debug-action">设置</button>'],['UBLOX配置','<button class="debug-action">设置</button>'],['飞控卫星信噪比','<button class="chev" onclick="go(\'gpsSnrDetail\')">›</button>'],['地面站卫星信号','<button class="chev" onclick="go(\'gcsSatellite\')">›</button>'],['保存RTCM数据',dSwitch(false)],['中国无人机境外解锁',dSwitch(false)],['GNSS版本','123'],['MQTT轨迹点计数','0'],['上传MQTT飞行轨迹','<button class="debug-action">上传</button>']],interactions:['切换RTCM相关开关','进入飞控和地面站卫星详情','点击配置或上传先校验连接'],edge:['无卫星数据时详情显示空态','上传失败保留本地轨迹']},
 ftp:{title:'文件传输',source:'DebugMavlinkFtpFragment · fragment_debug_mavlink_ftp.xml',fields:[['目录路径','文本','用户输入','非空','/fs/microsd'],['本地/远端文件','文本','用户输入','合法路径','-'],['传输状态','状态','MavlinkFtpManager','只读','空闲']],rows:[['远端目录','<input class="debug-input" value="/fs/microsd">'],['创建目录','<button class="debug-action">创建</button>'],['删除目录','<button class="debug-action">删除</button>'],['列出目录','<button class="debug-action">列表</button>'],['上传文件','<button class="debug-action">上传</button>'],['下载文件','<button class="debug-action">下载</button>'],['删除文件','<button class="debug-action">删除</button>'],['取消传输','<button class="debug-action">取消</button>'],['传输状态','空闲']],interactions:['输入远端目录或文件路径','执行创建、删除、列表、上传、下载','取消进行中的传输'],edge:['路径为空禁止操作','未连接时不启动传输','原型不读写真实文件']},
 hardware:{title:'硬件测试',source:'DebugHardwareTestFragment · fragment_hardware_test.xml · 真机截图',fields:[['图数传','页面入口','设备信息','App内子页面','进入'],['GPS','页面入口','定位信息','App内子页面','进入'],['WIFI_BT','页面入口','网络信息','App内子页面','进入'],['2_3_4G','页面入口','蜂窝模组','App内子页面','进入'],['LORA','页面入口','LORA模组','App内子页面','进入'],['P401新数传','页面入口','P401模组','App内子页面','进入'],['4gP2P','页面入口','4G P2P','App内子页面','进入']],rows:[['图数传','<button class="chev" onclick="go(\'hardwareArto\')">›</button>'],['GPS','<button class="chev" onclick="go(\'hardwareGps\')">›</button>'],['WIFI_BT','<button class="chev" onclick="go(\'hardwareWifi\')">›</button>'],['2_3_4G','<button class="chev" onclick="go(\'hardwareCell\')">›</button>'],['LORA','<button class="chev" onclick="go(\'hardwareLora\')">›</button>'],['P401新数传','<button class="chev" onclick="go(\'hardwareNewData\')">›</button>'],['4gP2P','<button class="chev" onclick="go(\'hardwareP2p\')">›</button>']],interactions:['点击整行或右侧箭头进入对应硬件详情','列表在当前设置窗口内滚动','子页面保留设置窗口及左侧菜单'],edge:['硬件不存在时详情显示未检测','不同USB类型显示不同图数传详情']},
 work:{title:'作业调试',source:'DebugWorkFragment · fragment_debug_work.xml · 真机截图',fields:[['作业开关','状态','DroneWorkInfo.isWorkOpen','只读','---'],['作业类型','枚举','DroneWorkInfo.workType','只读','---'],['药量','当前/剩余','DroneWorkInfo','只读','---'],['速度','当前/目标','DroneWorkInfo','只读','---'],['ADC','数组','DroneWorkInfo.adc','只读','---'],['PWM','数组','DroneWorkInfo.pwmDutycycle','只读','---'],['称重','四路数值','DroneWorkInfo.g_weight','只读','---'],['模板','对象','DroneSowTemplateInfo','只读','---'],['海拔高度','数值','DroneWorkInfo.elevation','只读','---'],['限重(净重)','数值','DroneWorkInfo.max_limit_weight','只读','---']],rows:[['作业开关','---'],['作业类型','---'],['药量','---'],['速度','---'],['ADC','---'],['PWM','---'],['称重','---'],['模板','---'],['海拔高度','---'],['限重(净重)','---']],interactions:['页面只读展示十项实时作业数据','连接设备后自动刷新'],edge:['当前版本没有可点击的作业调试子页面','未连接时全部显示---']},
 radarDebug:{title:'雷达调试',source:'DebugRadarFragment · fragment_debug_radar.xml',fields:[['前雷达参数','导航','V2前雷达','只读/可写','-'],['旋转雷达参数','导航','旋转雷达','只读/可写','-'],['雷达距离','图表','雷达回报','实时','0~40m'],['静态目标','开关','雷达参数','布尔','关闭']],rows:[['V2前雷达参数设置','<button class="chev" onclick="go(\'frontRadarParams\')">›</button>'],['旋转雷达参数设置','<button class="chev" onclick="go(\'rotateRadarParams\')">›</button>'],['雷达距离球','<button class="chev" onclick="go(\'radarDistanceDetail\')">›</button>'],['前后障碍物显示',dSwitch(false)],['静态目标显示',dSwitch(false)],['雷达点云范围','X / Y 0~40m']],interactions:['进入两类雷达参数页','打开距离球查看实时点云','切换障碍物与静态目标显示'],edge:['无雷达回报时图表为空']},
 network:{title:'网络设置',source:'DebugNetWorkFragment · fragment_debug_net_work.xml · 真机截图',fields:[['主控网络','开关','GCSWifiManager','布尔','开启'],['FTP服务状态','只读','FTP服务','动态','已创建'],['Ping to UAV状态','只读','网络检测','动态','-'],['主控Wifi连接状态','只读','MCM','动态','-'],['Mcm wifi dbm','只读','MCM','动态','-'],['主控wifi频段','只读','MCM','动态','-'],['国家码','按钮','Android WiFi','CN/TR/ES/读取','-']],rows:[['主控网络','开启'],['FTP服务状态','已创建'],['FTP服务状态','-'],['Ping to UAV状态','-'],['主控Wifi连接状态','-'],['Mcm wifi dbm','-'],['主控wifi频段','-'],['设置国家码CN','按钮'],['设置国家码TR','按钮'],['设置国家码ES','按钮'],['获取当前国家码','按钮']],interactions:['切换主控网络','查看FTP、Ping、WiFi状态','设置CN/TR/ES国家码','获取当前国家码'],edge:['状态无回报时保留空值','原型不修改真实国家码']},
 snr:{title:'飞行器信噪比',source:'DebugGpsStatusFragment · fragment_debug_gps_status.xml · 真机截图',fields:[['卫星信噪比图表','横向图表','GNSS卫星','动态','空数据时显示灰色画布']],rows:[['卫星信噪比图表','当前无卫星数据']],interactions:['实时刷新飞行器卫星信噪比图表','图表内容过宽时横向滑动'],edge:['无回报时仅展示空白灰色图表区域']},
 batteryDebug:{title:'电池信息',source:'DebugBatteryFragment · fragment_debug_battery.xml · 真机截图',fields:[['禁用智安电池','开关','电池调试参数','布尔','开启'],['电池图表','图表','DebugBatteryFragment','动态','无数据']],rows:[['禁用智安电池',dSwitch(true)],['电池图表','No chart data available.']],interactions:['切换禁用智安电池开关','查看电池图表','图表内容过宽时横向滑动'],edge:['未收到电池数据时显示 No chart data available.','原型不向真实电池下发指令']},
 motor:{title:'电机诊断',source:'DebugEscNewFragment · fragment_debug_esc_new.xml · 真机截图',fields:[['旧的电机诊断界面','导航','DebugEscFragment','App内子页','-'],['电调转动持续时间','秒','电调测试','范围校验','120'],['电调1~4','百分比/开关','电调参数','-100~100','0.0%'],['全部电调','百分比/开关','电调参数','-100~100','0.0%'],['电调颜色','分组/颜色/时长','电调LED','设备能力','红色/2']],rows:[['旧的电机诊断界面','导航'],['电调转动持续时间','120秒'],['电调1','0.0% / 关闭'],['电调2','0.0% / 关闭'],['电调3','0.0% / 关闭'],['电调4','0.0% / 关闭'],['全部电调','0.0% / 关闭'],['电调颜色','电调1-4 / 电调5-8 / 红色 / 2']],interactions:['进入旧的电机诊断界面','调整持续时间','单独控制电调1~4','控制全部电调','选择电调分组、颜色和时长'],edge:['开启开关前显示远离无人机警告','当前设备为4电调配置','原型永不驱动真实电机']},
 otherDebug:{title:'其他调试',source:'DebugSensorFragment · fragment_debug_sensor.xml',fields:[['飞行模式','枚举','飞控参数','选项内','自主'],['强制解锁','开关','飞控参数','高风险','关闭'],['RTK偏差','数值','定位参数','范围校验','-'],['日志开关','布尔','各模块','动态','关闭'],['控制器入口','导航','调试模块','App内页面','MCU/TP/图传']],rows:[['飞行模式','自主'],['气压计融合类型','默认'],['强制解锁',dSwitch(false)],['显示作业调试信息',dSwitch(false)],['上传点间距',dStep('1','米')],['转弯航向',dSwitch(true)],['RTK偏差',dStep('0','米')],['无人机偏差',dStep('0','米')],['旋转雾化器调试','<button class="chev" onclick="go(\'swirlDebug\')">›</button>'],['飞控参数','<button class="chev" onclick="go(\'fcParams\')">›</button>'],['应用类型','默认'],['调试认证','<button class="chev" onclick="go(\'debugAuth\')">›</button>'],['数传调试',dSwitch(false)],['北云初始化','<button class="debug-action">初始化</button>'],['遥控参数','<button class="chev" onclick="go(\'rcParams\')">›</button>'],['其他参数','<button class="chev" onclick="go(\'otherParams\')">›</button>'],['Remote ID设置','<button class="chev" onclick="go(\'remoteId\')">›</button>'],['MCU控制','<button class="chev" onclick="go(\'mcuControl\')">›</button>'],['TP控制','<button class="chev" onclick="go(\'tpControl\')">›</button>'],['图传控制','<button class="chev" onclick="go(\'morningControl\')">›</button>'],['RTK日志',dSwitch(false)],['机架日志',dSwitch(false)],['激光雷达日志',dSwitch(false)],['雷达IMU日志',dSwitch(false)],['GPS日志',dSwitch(false)],['安装搜狗输入法','<button class="debug-action">安装</button>'],['开始抓取模组日志','<button class="debug-action">开始</button>'],['停止抓取模组日志','<button class="debug-action">停止</button>']],interactions:['长页面上下滑动查看全部调试参数','开关日志与调试选项','进入各控制器和参数子页面','高风险动作二次确认'],edge:['飞行中禁用危险参数','系统安装页面不继续还原','原型不执行解锁与日志抓取']},
 activate:{title:'激活',source:'DebugActivationFragment · fragment_debug_activation.xml',fields:[['无人机激活','操作','激活服务','连接校验','未激活'],['确认激活','操作','激活服务','二次确认','-'],['测试入口','操作','调试模块','内部使用','3项']],rows:[['无人机激活','<button class="debug-action">激活</button>'],['激活提示','请连接无人机'],['确认激活','<button class="debug-action">确认</button>'],['激活结果','-'],['测试1','<button class="debug-action">测试</button>'],['测试2','<button class="debug-action">测试</button>'],['测试3','<button class="debug-action">测试</button>']],interactions:['点击激活先校验连接','确认激活需二次确认','测试按钮仅展示反馈'],edge:['未连接时禁止激活','原型不调用真实激活服务']},
 oam:{title:'遥控锁定',source:'OAMDebugFragment · fragment_o_a_m_debug.xml',fields:[['WIFI频段','操作','OAM模块','2G/5G','-'],['WIFI信息','文本','OAM模块','只读','-'],['AP/Station','状态','OAM模块','可关闭','-']],rows:[['打开WIFI 5G','<button class="debug-action">打开</button>'],['打开WIFI 2G','<button class="debug-action">打开</button>'],['获取WIFI信息','<button class="debug-action">获取</button>'],['关闭AP/Station','<button class="debug-action">关闭</button>'],['5G信息','-']],interactions:['切换WIFI频段','读取WIFI信息','关闭AP/Station前确认'],edge:['未连接OAM时操作失败','原型不改真实WIFI状态']},
 radarDistance:{title:'雷达距离',source:'DebugRadarSnrFragment · fragment_debug_radar_snr.xml',fields:[['距离图','图表','雷达回报','实时','0~40m'],['前后显示','开关','本地显示','布尔','关闭']],rows:[['雷达距离图','暂无雷达数据'],['前方距离','-'],['后方距离','-'],['左侧距离','-'],['右侧距离','-'],['前后障碍物显示',dSwitch(false)]],interactions:['实时查看雷达距离图','切换前后障碍物显示'],edge:['无雷达时图表为空']},
 camera:{title:'摄像头参数设置',source:'DebugCameraFragment · fragment_debug_camera.xml · 真机截图',fields:[['标定类型','枚举','param_calibration_type','选项内单选','内外参标定'],['标定子类型','枚举','param_stator_type','选项内单选','标定左相机'],['图片标定参数','数值','HDSeekbar','各项范围和精度','4 / 0.20 / 60 / 10 / 256'],['校准检查与GPS','开关/数值','DebugCameraFragment','布尔及范围','关闭 / 开启'],['外参标定飞行参数','数值','HDSeekbar','圈数、半径、速度、高度','1 / 20m / 2m/s / 3m'],['标定与日志操作','操作','DebugCameraFragment','人工触发','10项'],['标定图像与状态','只读','ivDemarcate / calib_*','动态','空白'],['视频存储与录像','操作','saveCamData / saveUsbCam / tvRecord*','人工触发','存储 / 开始 / 停止']],rows:[['标定类型',debugSelect('内外参标定',['内外参标定','单目标定'])],['标定子类型',debugSelect('标定左相机',['标定左相机','标定右相机','标定外参'])],['图片标定开始数量',dStep('4','张')],['误差阈值',dStep('0.20')],['校准板大小',dStep('60')],['保存图片数量',dStep('10')],['scale',dStep('256')],['检查校准参数',dSwitch(false)],['检查阈值',dStep('0.2')],['取目标点附近个数',dStep('5')],['第二步过滤百分比数值',dStep('0.1')],['中位数和平均值的差值的阈值',dStep('0.1')],['循环过滤里的比例',dStep('0.1')],['安全数值',dStep('10')],['视觉GPS限制',dSwitch(true)],['外参标定飞行圈数',dStep('1')],['外参标定飞行半径',dStep('20','m')],['外参标定飞行速度',dStep('2.0','m/s')],['外参标定飞行高度',dStep('3','m')],['标定操作','<button>开始标定</button><button>结束标定</button><button>冻结</button><button>解冻</button><button>拍照</button><button>保存</button>'],['日志与视觉操作','<button>log开始</button><button>log结束</button><button>视觉避障</button><button>外参标定</button>'],['标定状态','误差: imgs: calib_type: calib_subtype:'],['标定图像','空白图像区'],['单目视频存储','<button>存储</button>'],['usb摄像视频存储','<button>存储</button>'],['录像控制32128','<button>开始</button><button>停止</button>']],interactions:['长页面滑动查看完整摄像头参数','选择标定类型和标定子类型','按范围加减调整标定、过滤和飞行参数','切换检查校准参数与视觉GPS限制','执行开始/结束标定、冻结/解冻、拍照和保存','控制日志、视觉避障和外参标定','存储单目或USB视频','开始或停止录像'],edge:['隐藏的旧版曝光、双目和VOA控件不显示','未连接相机时不下发','飞行中限制标定','原型不保存真实图片']},
 video4g:{title:'4G视频配置',source:'Debug4GVideoFragment · fragment_debug_4g_video.xml',fields:[['Sbus服务器','地址','4G视频模块','IP/域名','-'],['Sbus UDP端口','整数','4G视频模块','1~65535','-'],['视频UDP端口','整数','4G视频模块','1~65535','-']],rows:[['Sbus服务器','<input class="debug-input" placeholder="服务器地址">'],['Sbus UDP端口','<input class="debug-input" placeholder="端口">'],['视频UDP端口','<input class="debug-input" placeholder="端口">'],['读取参数','<button class="debug-action">读取</button>'],['写入参数','<button class="debug-action primary">写入</button>']],interactions:['读取现有4G视频参数','编辑服务器和端口','校验后写入'],edge:['端口越界禁止写入','未连接时读取失败','原型不写真实配置']},
 rotateRadar:{title:'旋转雷达',source:'DebugRotateRadarFragment · fragment_debug_rotate_radar.xml',fields:[['安装角度','角度','旋转雷达','范围校验','0'],['日志类型','位掩码','旋转雷达','多选','10项'],['雷达标记','开关','雷达参数','布尔','关闭'],['日志文件','列表','本地存储','动态','空']],rows:[['安装角度',dStep('0','°')],['开始雷达日志','<button class="debug-action">开始</button>'],['RTP_SSRC_RADARCUBE',dSwitch(false)],['RTP_SSRC_RDM',dSwitch(false)],['RTP_SSRC_PS_DETECT',dSwitch(false)],['RTP_SSRC_CFAR_DETECT',dSwitch(false)],['RTP_SSRC_PEAK_ANT',dSwitch(false)],['RTP_SSRC_DBF_DOA',dSwitch(false)],['RTP_SSRC_RDM_THRESHOLD',dSwitch(false)],['RTP_SSRC_CFAR_TARGET',dSwitch(false)],['RTP_SSRC_CFAR_THRESHOLD',dSwitch(false)],['RTP_SSRC_BEAMSAN',dSwitch(false)],['删除日志','<button class="debug-action">删除</button>'],['上传日志','<button class="debug-action">上传</button>'],['刷新日志','<button class="debug-action">刷新</button>'],['雷达标记',dSwitch(false)],['日志列表','暂无日志']],interactions:['调整旋转雷达安装角度','多选日志数据类型并开始记录','刷新、上传或删除日志','切换雷达标记'],edge:['未连接时不可开始记录','删除操作二次确认','原型不删除真实日志']}
};
// 数传通道采用真机专用布局，字段清单也必须按画面上的实际控件逐项建立，不能沿用旧版简表。
DEBUG_PAGE_DATA.data.rows=[
 ['遥控功率',dStep('0','dbm')],
 ['遥控功率下发','<button class="debug-action">遥控功率</button>'],
 ['GPIO重置','<button class="debug-action">GPIO重置</button>'],
 ['重置丢包','<button class="debug-action">重置丢包</button>'],
 ['重置模块','<button class="debug-action">重置模块</button>'],
 ['读取配置','<button class="debug-action">读取配置</button>'],
 ['地面LAN','<button class="debug-action">地面LAN打开</button>'],
 ['天空LAN','<button class="debug-action">天空LAN自动</button>'],
 ['无人机2g频点','<button class="debug-action">2406</button>'],
 ['主控2g功率',dStep('0','dbm')],
 ['无人机5g频点','<button class="debug-action">5740</button>'],
 ['主控5g功率',dStep('0','dbm')],
 ['遥控器2g频点','<button class="debug-action">2405</button>'],
 ['遥控器5g频点','<button class="debug-action">5731</button>'],
 ['遥控器串口 · 开始发送','<button class="debug-action">开始发送</button>'],
 ['遥控器串口 · 停止发送','<button class="debug-action">停止发送</button>'],
 ['AT · 28889','<button class="debug-action">28889</button>'],
 ['AT · 28914','<button class="debug-action">28914</button>'],
 ['AT · 29425','<button class="debug-action">29425</button>'],
 ['AT · 返回','<button class="debug-action">返回</button>'],
 ['模块角色 · Sky_Control','<button class="debug-action">Sky_Control</button>'],
 ['模块角色 · Ground_Control','<button class="debug-action">Ground_Control</button>'],
 ['模块复位 · Reset','<button class="debug-action">Reset</button>'],
 ['模块角色 · Sky_Drone','<button class="debug-action">Sky_Drone</button>'],
 ['模块角色 · Ground_Drone','<button class="debug-action">Ground_Drone</button>'],
 ['模块频段 · disable_234G','<button class="debug-action">disable_234G</button>'],
 ['模块频段 · enable_234G','<button class="debug-action">enable_234G</button>'],
 ['模块频段 · 禁用 234G','<button class="debug-action">禁用 234G</button>'],
 ['模块频段 · 启用 234G','<button class="debug-action">启用 234G</button>']
];
DEBUG_PAGE_DATA.gps.rows=[
 ['纬度','---'],['经度','---'],['高度','---'],['仿地高度','---'],['速度','---'],['垂直速度','---'],['水平速度','---'],['偏航角','---'],['使用板卡','---'],['　','---'],
 ['纬度1','---'],['经度1','---'],['海拔1','---'],['定位状态1','---'],['卫星数1','---'],['方向角1','---'],['差分延迟1','---'],['航向精度','---'],['水平精度','---'],['垂直精度','---'],['速度精度','---'],['RTK服务','QX:Success'],['RTK服务延迟','0s'],['GGA','---'],
 ['纬度2','---'],['经度2','---'],['海拔2','---'],['定位状态2','---'],['卫星数2','---'],['GNSS_FIX','---'],['　　','---'],['遥控器-纬度','31.1982095'],['遥控器-经度','121.2603685'],['打点器-纬度','0.0000000'],['打点器-经度','0.0000000'],['打点器-定位状态','0'],['打点器-卫星数','0'],['遥控器-GGA','$GNGGA,094239.00,3111.88180,N,12115.63967,E,0,00,99.99,93.4,M,,M,,*56'],['打点器-GGA','-'],['打点器-差分延迟','-1.0'],
 ['遥控器卫星信噪比','<button class="chev" onclick="go(\'gcsSatellite\')">›</button>'],['记录RTCM与无人机GGA数据',dSwitch(false)],['国内飞机可国外解锁',dSwitch(false)],['板卡版本：,',''],['剩余点数：0',''],['mqtt手动补点','<button class="debug-action">补点</button>']
];
DEBUG_PAGE_DATA.ftp.rows=[
 ['新建文件夹','<button class="debug-action">新建文件夹</button>'],
 ['删除文件夹','<button class="debug-action">删除文件夹</button>'],
 ['文件夹列表','<button class="debug-action">文件夹列表</button>'],
 ['上传文件','<button class="debug-action">上传文件</button>'],
 ['下载文件','<button class="debug-action">下载文件</button>'],
 ['删除文件','<button class="debug-action">删除文件</button>'],
 ['取消操作','<button class="debug-action">取消操作</button>']
];
DEBUG_PAGE_DATA.hardware.rows=[
 ['图数传','<button class="chev" onclick="go(\'hardwareArto\')">›</button>'],
 ['WIFI_BT','<button class="chev" onclick="go(\'hardwareWifi\')">›</button>'],
 ['2_3_4G','<button class="chev" onclick="go(\'hardwareCell\')">›</button>'],
 ['LORA','<button class="chev">›</button>'],
 ['P401新数传','<button class="chev" onclick="go(\'hardwareNewData\')">›</button>'],
 ['4gP2P','<button class="chev" onclick="go(\'hardwareP2p\')">›</button>']
];
// ── droneRows — 无人机设置行
function droneRows(){if(droneTab==='air')return [['启航/返航高度<br><small>作业飞行过程中不可修改<br>返航前无人机会先上升到此处设置的高度</small>',dStep('9.8','英尺')],['启航/返航速度<br><small>范围6.7英里/小时~22.4英里/小时</small>',dStep('11.2','英里/小时')],['返航降落开关',dSwitch(false)],['U型转弯',dSwitch(true)],['药量喷完后','<span class="drone-segment"><button class="on">悬停</button><button>返航</button></span>'],['无人机失联后','<span class="drone-segment"><button>悬停</button><button class="on">返航</button></span>'],['失联之后继续作业<br><small>该功能仅在AB作业和航线作业有效</small>',dSwitch(false)],['作业完成后','<span class="drone-segment"><button>悬停</button><button class="on">返航</button></span>'],['高级设置','<button class="chev" onclick="go(\'airAdvanced\')">›</button>']];if(droneTab==='radar')return [['前雷达',''],['仿地<br><small>开启后可按地形高度自动调整和作物相对高度</small>',dSwitch(false)],['避障<br><small>重启无人机会自动打开避障开关</small>',dSwitch(false)],['自动绕障<br><small>避障已关闭，绕障失效并自动关闭</small>',dSwitch(false)],['绕障距离',dStep('33','英尺')],['障碍物距离显示',dSwitch(true)]];if(droneTab==='remote')return [['摇杆模式<br><small>飞行过程中不允许修改摇杆模式</small>','<span class="drone-segment"><button class="on">美国手</button><button>日本手</button></span>'],['左摇杆<br><small>上升/下降　1500<br>左转/右转　1500</small>',''],['右摇杆<br><small>向前/向后　1500<br>向左/向右　1500</small>',''],['摇杆校准','<button class="cache-btn" onclick="go(\'rockerCalibration\')">校准</button>'],['自定义按键','<button class="chev" onclick="go(\'customKeys\')">›</button>'],['网络诊断','<button class="chev" onclick="go(\'remoteDiagnosis\')">›</button>']];if(droneTab==='spray')return [['作业系统',''],['作业类型','<span class="drone-value">自动识别</span>'],['作业系统实时数据','<button class="chev" onclick="go(\'workRealtime\')">›</button>'],['喷头类型','<span class="drone-value">离心喷头</span>'],['喷头数量','<span class="drone-value">2</span>'],['喷头配置','<button class="chev" onclick="go(\'nozzleConfig\')">›</button>'],['流量计校准','<button class="cache-btn" onclick="showSettingsDialog(\'无人机未连接，无法开始校准\')">校准</button>']];if(droneTab==='battery')return [['电量','<span class="drone-value">-</span>'],['电压 / 电流 / 功率','<span class="drone-value">- / - / -</span>'],['温度 / 循环次数','<span class="drone-value">- / -</span>'],['低电量告警<br><small>范围16~30%</small>',dStep('25','%')],['严重低电量告警<br><small>范围10~15%</small>',dStep('15','%')],['电池激活','<button class="cache-btn" onclick="showSettingsDialog(\'未检测到可激活电池\')">激活</button>']];if(droneTab==='rtk')return [['无人机RTK检测<br><small>关闭后无人机解锁时不再检测RTK是否固定</small>',dSwitch(true)],['RTK信号源','<span class="drone-value">网络RTK</span>'],['网络RTK服务权益<br><small>2028-05-14到期</small>','<button class="cache-btn">续约</button>'],['NTRIP配置','<button class="chev" onclick="go(\'ntripConfig\')">›</button>'],['RTK诊断','<button class="chev" onclick="go(\'rtkDiagnosis\')">›</button>'],['RTK卫星信噪比','<button class="chev" onclick="go(\'satelliteSignal\')">›</button>'],['打点精度','<button class="chev" onclick="go(\'dotAccuracy\')">›</button>']];if(droneTab==='video')return [['信道模式','<span class="drone-segment"><button class="on">自动</button><button>2G</button><button>5G</button></span>'],['链路信号质量','<button class="chev" onclick="go(\'linkQuality\')">›</button>'],['图传版本','<span class="drone-value">405</span>']];return [['语音播报<br><small>建议打开语音播报提醒功能</small>',dSwitch(true)],['语速',dStep('1.0')],['语音引擎<br><small>修改配置后需重启app才能生效</small>','<button class="chev" onclick="showSystemToast(\'语音引擎属于Android系统页面\')">›</button>'],['前摄界面','<span class="drone-value">十字</span>'],['后摄界面','<span class="drone-value">无</span>'],['重启','<button class="cache-btn" onclick="showSettingsDialog(\'确认重启遥控器？原型不会执行\')">重启</button>'],['关机','<button class="cache-btn" onclick="showSettingsDialog(\'确认关闭遥控器？原型不会执行\')">关机</button>']]}
const baseDroneRows=droneRows;
droneRows=function(){if(droneTab!=='other')return baseDroneRows();return [['屏幕亮度<br><small>范围0~100</small>',dStep('80')],['语音播报<br><small>建议打开语音播报提醒功能</small>',dSwitch(true)],['语速',dStep('1.0')],['音量大小<br><small>范围0~100</small>',dStep('80')],['语音引擎<br><small>修改配置后需重启app才能生效</small>','<button class="chev" onclick="showSystemToast(\'语音引擎属于Android系统页面\')">›</button>','prdsec6'],['前摄界面','<span class="drone-value">十字</span>'],['后摄界面','<span class="drone-value">无</span>'],['摄像头模式','<span class="drone-value">普通模式</span>'],['前摄视频流参数','<button class="chev" onclick="go(\'frontVideoStream\')">›</button>','prdsec3'],['后摄视频流参数','<button class="chev" onclick="go(\'rearVideoStream\')">›</button>','prdsec3'],['语言','<button class="chev" onclick="go(\'droneLanguage\')">简体中文 ›</button>','prdsec3'],['橙心服务','<button class="chev" onclick="go(\'droneInsurance\')">›</button>','prdsec3'],['Android系统定位服务','<button class="chev" onclick="showSystemToast(\'定位服务属于Android系统页面\')">›</button>','prdsec6'],['维护','<button class="chev" onclick="go(\'maintenance\')">›</button>','prdsec3'],['AI视频流',dSwitch(false)],['重启','<button class="cache-btn" onclick="showSettingsDialog(\'确认重启遥控器？原型不会执行\')">重启</button>','prdsec6'],['关机','<button class="cache-btn" onclick="showSettingsDialog(\'确认关闭遥控器？原型不会执行\')">关机</button>','prdsec6']]};
// ── bindControlFields — 绑定控件字段
function bindControlFields(html,rowIndex,prefix='r'){let n=0;return html.replace(/<(button|input|select)(\s[^>]*?)?>/g,(m,tag,attrs='')=>{if(/data-field-id=/.test(attrs))return m;const id=`${prefix}${rowIndex}c${n++}`;let a=attrs;if(/onclick="/.test(a))a=a.replace(/onclick="/,`onclick="event.stopPropagation();selectControlField('${id}',this);`);else a+=` onclick="event.stopPropagation();selectControlField('${id}',this)"`;return `<${tag}${a} data-field-id="${id}">`})}

/* ─ ⚪ 未分类 ─ */

/* ─ ⚪ 未分类 ─ */

const OTHER_VIDEO_OPTIONS=['1280*720 30fps 2Mbps','1280*720 25fps 2Mbps','1280*720 20fps 2Mbps','1280*720 30fps 1.5Mbps','1280*720 25fps 1.5Mbps','1280*720 20fps 1.5Mbps','1280*720 30fps 1Mbps','1280*720 25fps 1Mbps','1280*720 20fps 1Mbps','1280*720 30fps 0.6Mbps','1280*720 25fps 0.6Mbps','1280*720 20fps 0.6Mbps'];

const OTHER_LANGUAGE_OPTIONS=['中文(简体)','English','한국어','русский язык','Türkçe','Español','Tiếng Việt','ئۇيغۇر تىلى','Português','日本語','ภาษาไทย','فارسی','Bahasa Indonesia','ខ្មែរ','Deutsch','Română','Български','Polski','Српски'];
let otherValues={frontView:'十字',rearView:'无',frontVideo:'1280*720 20fps 2Mbps',rearVideo:'1280*720 20fps 2Mbps',language:'中文(简体)'};
const OTHER_POPUP_OPTIONS={frontView:['无','十字','九宫格'],rearView:['无','十字','九宫格'],frontVideo:OTHER_VIDEO_OPTIONS,rearVideo:OTHER_VIDEO_OPTIONS,language:OTHER_LANGUAGE_OPTIONS};
let otherScrollTop=0;
// ── otherTrigger — 其他触发器
function otherTrigger(key,field){return `<button type="button" class="other-popup-trigger" data-other-key="${key}" onpointerdown="event.preventDefault()" onclick="openOtherPopup(event,'${key}',this)"><span>${otherValues[key]}</span><img class="drop-arrow" src="./assets/RELEASE_MENU_STATE_ICONS_other_sel_1.png" alt=""></button>`}
// ── otherSettingsUI — 其他设置 UI
function otherSettingsUI(previewKey=''){droneTab='other';const rows=[['语音播报<br><small>建议打开语音播报提醒功能</small>',dSwitch(true)],['语速',dStep('1.0')],['语音引擎<br><small>修改语音引擎配置后,需重启app才能生效</small>','<button class="chev" onclick="showSystemToast(\'语音引擎属于Android系统页面\')">›</button>'],['前摄界面',otherTrigger('frontView','r3')],['后摄界面',otherTrigger('rearView','r4')],['前摄视频流参数',otherTrigger('frontVideo','r5')],['后摄视频流参数',otherTrigger('rearVideo','r6')],['语言',otherTrigger('language','r7')],['橙心服务<br><small>购机第一年惠达关怀服务随机赠送</small>','<button class="chev" onclick="go(\'droneInsurance\')">›</button>'],['Android系统位置信息服务','<button class="real-outline-btn" onclick="showSystemToast(\'定位服务属于Android系统页面\')">打开</button>']];const previewOptions=OTHER_POPUP_OPTIONS[previewKey];const popup=previewOptions?otherPopupMarkup(previewKey,previewOptions,previewKey==='language'?360:previewKey==='rearVideo'?315:250):'';return droneLayer(`${droneTabs()}<main class="drone-content other-real-content"><header class="drone-head">其他设置</header><button class="drone-close" onclick="go('home')">×</button><div class="other-real-body" onscroll="otherScrollTop=this.scrollTop">${rows.map((r,i)=>`<div class="drone-row other-real-row clickable" data-field-id="r${i}" onclick="selectDroneField(${i},'${i===2||i===9?'prdsec6':'prdsec2'}',this)"><div>${r[0]}</div><span class="right">${i<3||i>7?bindControlFields(r[1],i):r[1]}</span></div>`).join('')}</div><div class="other-real-footer"><button onclick="showSettingsDialog('确认重启遥控器？原型不会执行')">重启</button><i></i><button onclick="showSettingsDialog('确认关闭遥控器？原型不会执行')">关机</button></div></main>${popup}`)}
// ── otherInsuranceUI — 其他保险 UI
function otherInsuranceUI(){droneTab='other';ACTIVE_SUB_ROWS=[['橙心服务','N/A'],['第三者责任保障','N/A'],['续费验机','未连接不可用']];return droneLayer(`${droneTabs()}<main class="drone-content other-insurance-content"><header class="drone-head">橙心服务</header><button class="advanced-real-back" aria-label="返回其他设置" onclick="go('droneSettings')">‹</button><button class="other-insurance-renew clickable" data-field-id="s2" onclick="highlightField('s2',this,'prdsec3');showSettingsDialog('无人机未连接，请连接无人机后再进行续费')">续费验机</button><button class="drone-close" onclick="go('home')">×</button><div class="other-insurance-body"><div class="other-insurance-row clickable" data-field-id="s0" onclick="highlightField('s0',this,'prdsec2')"><span>橙心服务</span><span>N/A</span></div><div class="other-insurance-row clickable" data-field-id="s1" onclick="highlightField('s1',this,'prdsec2')"><span>第三者责任保障</span><span>N/A</span></div></div></main>`)}
// ── otherPopupMarkup — 其他弹窗 HTML
function otherPopupMarkup(key,options,top){return `<div class="other-popup-mask" onclick="closeOtherPopup()"><div class="other-popup-list" style="top:${Math.min(top,360)}px" onclick="event.stopPropagation()">${options.map(v=>`<button onclick="chooseOtherValue('${key}',this.textContent)">${v}</button>`).join('')}</div></div>`}
// ── openOtherPopup — 打开其他弹窗
function openOtherPopup(ev,key,trigger){ev.preventDefault();ev.stopImmediatePropagation();const body=document.querySelector('.other-real-body');otherScrollTop=body?.scrollTop||otherScrollTop;document.querySelector('.other-popup-mask')?.remove();body?.classList.add('popup-locked');if(body)body.scrollTop=otherScrollTop;const tablet=document.querySelector('.tablet'),tabletRect=tablet.getBoundingClientRect(),triggerRect=trigger.getBoundingClientRect(),scale=tabletRect.width/960||1;const rawTop=(triggerRect.bottom-tabletRect.top)/scale+5,top=Math.max(8,Math.min(360,rawTop));const options=OTHER_POPUP_OPTIONS[key]||[];const mask=document.createElement('div');mask.className='other-popup-mask';mask.onclick=closeOtherPopup;mask.innerHTML=`<div class="other-popup-list" style="top:${top}px" onclick="event.stopPropagation()">${options.map(v=>`<button type="button" onclick="chooseOtherValue('${key}',this.textContent)">${v}</button>`).join('')}</div>`;tablet.appendChild(mask);requestAnimationFrame(()=>{if(body)body.scrollTop=otherScrollTop})}
// ── closeOtherPopup — 关闭其他弹窗
function closeOtherPopup(){document.querySelector('.other-popup-mask')?.remove();const body=document.querySelector('.other-real-body');body?.classList.remove('popup-locked');if(body)body.scrollTop=otherScrollTop}
// ── chooseOtherValue — 选择其他值
function chooseOtherValue(key,value){otherValues[key]=value;const trigger=document.querySelector(`[data-other-key="${key}"] span`);if(trigger)trigger.textContent=value;closeOtherPopup()}
// ── droneSettingsUI — 无人机设置主 UI
function droneSettingsUI(){if(droneTab==='other')return otherSettingsUI();const titles={air:'无人机设置',radar:'感知设置',remote:'遥控器设置',spray:'喷洒设置',battery:'智能电池设置',rtk:'RTK设置',video:'图传设置405',other:'其他设置'};const debug=DEBUG_PAGE_DATA[droneTab];const title=debug?debug.title:titles[droneTab];const rows=debug?debug.rows:droneRows();return droneLayer(`${droneTabs()}<main class="drone-content ${debug?'debug-page':''}"><header class="drone-head">${title}</header><button class="drone-close" onclick="go('home')">×</button>${rows.map((r,i)=>`<div class="drone-row clickable" data-field-id="r${i}" onclick="selectDroneField(${i},'${r[2]||'prdsec2'}',this)"><div>${r[0]}</div><span class="right">${bindControlFields(r[1],i)}</span></div>`).join('')}</main>`)}
// ── selectDroneField — 选中无人机字段
function selectDroneField(i,section,row){highlightField(`r${i}`,row,'prdsec2')}
// ── selectControlField — 选中控件字段
function selectControlField(id,control){const fieldId=id.replace(/c\d+$/,'');highlightField(fieldId,control,'prdsec3',id)}
// ── highlightField — 高亮字段
function highlightField(id,target,section,ruleId=id){document.querySelectorAll('.prd-row-focus').forEach(x=>x.classList.remove('prd-row-focus'));linkPRD(section);const tr=document.querySelector(`.prd-table tbody tr[data-field-id="${id}"]`);if(tr)tr.classList.add('prd-row-focus');const rule=document.querySelector(`#prdsec3 [data-field-id="${ruleId}"]`);if(rule)rule.classList.add('prd-row-focus')}
// ── highlightWorkField — 高亮作业字段
function highlightWorkField(id,target,scroll=false){document.querySelectorAll('.ui-field-focus').forEach(x=>x.classList.remove('ui-field-focus'));if(target)target.classList.add('ui-field-focus');document.querySelectorAll('.prd-row-focus').forEach(x=>x.classList.remove('prd-row-focus'));const tr=document.querySelector(`.prd-table tbody tr[data-field-id="${id}"]`),rule=document.querySelector(`#prdsec3 [data-field-id="${id}"]`);if(tr)tr.classList.add('prd-row-focus');if(rule)rule.classList.add('prd-row-focus');if(scroll&&tr){const col=document.querySelector('.prd-col');col.scrollTo({top:Math.max(0,tr.offsetTop-col.offsetTop-90),behavior:'smooth'})}}

let ACTIVE_SUB_ROWS=null;
// ── droneSubUI — 无人机子设置页
function droneSubUI(title,target,rows){ACTIVE_SUB_ROWS=rows;return `<section class="tablet-screen page">${subHead(title,target)}<div class="drone-subbody">${rows.map((r,i)=>`<div class="drone-subrow clickable" data-field-id="s${i}" onclick="highlightField('s${i}',this,'${r[2]||'prdsec2'}')"><span>${r[0]}</span><span class="right">${bindControlFields(r[1]||'',i,'s')}</span></div>`).join('')}</div></section>`}
// ── rtkSubUI — RTK 子 UI
function rtkSubUI(title,rows){droneTab='rtk';ACTIVE_SUB_ROWS=rows;const body=rows.map((r,i)=>`<div class="advanced-real-row clickable" data-field-id="s${i}" onclick="highlightField('s${i}',this,'${r[2]||'prdsec2'}')"><span>${r[0]}</span><span class="right">${bindControlFields(r[1]||'',i,'s')}</span></div>`).join('');return droneLayer(`${droneTabs()}<main class="drone-content advanced-real-content rtk-sub-content" data-subpage-title="${title}"><header class="drone-head">RTK设置</header><button class="advanced-real-back" onclick="go('droneSettings')">‹</button><button class="drone-close" onclick="go('home')">×</button><div class="advanced-real-list">${body}</div></main>`)}
// ── rtkRealShell — RTK 真实外壳
function rtkRealShell(kind,body){droneTab='rtk';return droneLayer(`${droneTabs()}<main class="drone-content advanced-real-content rtk-sub-content" data-subpage-title="${kind}"><header class="drone-head">RTK设置</header><button class="advanced-real-back" onclick="go('droneSettings')">‹</button><button class="drone-close" onclick="go('home')">×</button><div class="rtk-real-body">${body}</div></main>`)}
// ── rtkDiagnosisUI — RTK 诊断 UI
function rtkDiagnosisUI(){ACTIVE_SUB_ROWS=[['卫星定位星数','0'],['无人机连接','未连接'],['遥控器连接','未连接'],['网络RTK连接','正常'],['无人机无法获取卫星定位信号','异常'],['遥控器和无人机断开连接','异常'],['遥控器正常连接网络RTK或移动基站','正常']];return rtkRealShell('RTK诊断',`<div class="rtk-diagnose-flow"><div class="rtk-flow-node clickable" data-field-id="s0" onclick="highlightField('s0',this,'prdsec2')"><span class="rtk-flow-icon sat">⌁<b>0</b></span><span>卫星定位<br>星数</span></div><i class="rtk-flow-line"></i><div class="rtk-flow-node clickable" data-field-id="s1" onclick="highlightField('s1',this,'prdsec2')"><span class="rtk-flow-icon asset"><img src="${DRONE_ICONS.aircraft}" alt=""></span><span>无人机</span></div><i class="rtk-flow-line"></i><div class="rtk-flow-node clickable" data-field-id="s2" onclick="highlightField('s2',this,'prdsec2')"><span class="rtk-flow-icon asset"><img src="${DRONE_ICONS.remote_control}" alt=""></span><span>遥控器</span></div><i class="rtk-flow-line on"></i><div class="rtk-flow-node clickable" data-field-id="s3" onclick="highlightField('s3',this,'prdsec2')"><span class="rtk-flow-icon rtk">RTK</span><span>网络RTK</span></div></div><div class="rtk-diagnose-results"><h3>诊断结果:</h3><p class="rtk-error clickable" data-field-id="s4" onclick="highlightField('s4',this,'prdsec2')">1.无人机无法获取卫星定位信号</p><p class="rtk-error clickable" data-field-id="s5" onclick="highlightField('s5',this,'prdsec2')">2.遥控器和无人机断开连接</p><p class="rtk-ok clickable" data-field-id="s6" onclick="highlightField('s6',this,'prdsec2')">3.遥控器正常连接网络RTK或移动基站</p></div>`)}
// ── rtkSnrUI — RTK 信噪比 UI
function rtkSnrUI(){ACTIVE_SUB_ROWS=[['日志开关','关闭'],['当前卫星数','0'],['平均信噪比','N/A'],['信号源','GNSS1 / GNSS2 / 打点器'],['信噪比图表','空'],['SNR色标','0 / 10 / 20 / 30 / 50']];return rtkRealShell('RTK卫星信噪比',`<div class="rtk-snr-toolbar"><label class="rtk-log clickable" data-field-id="s0" onclick="highlightField('s0',this,'prdsec2')">log <button class="setting-switch" onclick="event.stopPropagation();this.classList.toggle('on')"></button></label><div class="rtk-snr-summary clickable" data-field-id="s1" onclick="highlightField('s1',this,'prdsec2')">当前卫星数:0<br>平均信噪比:N/A</div><div class="rtk-snr-tabs clickable" data-field-id="s3" onclick="highlightField('s3',this,'prdsec2')"><button class="on" onclick="toggleSegment(this)">GNSS1</button><button onclick="toggleSegment(this)">GNSS2</button><button onclick="toggleSegment(this)">打点器</button></div><span class="rtk-help">?</span></div><div class="rtk-snr-chart clickable" data-field-id="s4" onclick="highlightField('s4',this,'prdsec2')"></div><div class="rtk-snr-legend clickable" data-field-id="s5" onclick="highlightField('s5',this,'prdsec2')"><span>snr</span><i class="bar"></i><div class="ticks"><b>00</b><b>10</b><b>20</b><b>30</b><b>50</b></div></div>`)}
// ── gcsSnrBars — GCS 信噪比条
function gcsSnrBars(){return [[11,26],[11,28],[9,31],[13,32]].map((x,i)=>`<div class="gcs-snr-bar ${i===2?'bad':''}"><span>${x[0]}</span><i style="height:${28+x[0]*2}px"></i><b>${x[1]}<br>G</b></div>`).join('')}
// ── gcsSatelliteUI — GCS 卫星 UI
function gcsSatelliteUI(){droneTab='gps';ACTIVE_SUB_ROWS=[['当前卫星数','8'],['平均信噪比','11'],['上半区卫星信噪比','4颗卫星'],['下半区卫星信噪比','4颗卫星'],['SNR色标','0 / 10 / 20 / 30 / 50']];return droneLayer(`${droneTabs()}<main class="drone-content advanced-real-content gcs-snr-content"><header class="drone-head">定位信息</header><button class="advanced-real-back" onclick="go('droneSettings')">‹</button><button class="drone-close" onclick="go('home')">×</button><div class="gcs-snr-body"><div class="gcs-snr-summary clickable" data-field-id="s0" onclick="highlightField('s0',this,'prdsec2')"><span>当前卫星数:8<br>平均信噪比:11</span><i class="gcs-snr-help">?</i></div><div class="gcs-snr-chart clickable" data-field-id="s2" onclick="highlightField('s2',this,'prdsec2')">${gcsSnrBars()}</div><div class="gcs-snr-chart second clickable" data-field-id="s3" onclick="highlightField('s3',this,'prdsec2')">${gcsSnrBars()}</div><div class="gcs-snr-legend clickable" data-field-id="s4" onclick="highlightField('s4',this,'prdsec2')"><span>snr</span><i class="bar"></i><div class="ticks"><b>00</b><b>10</b><b>20</b><b>30</b><b>50</b></div></div></div></main>`)}
// ── rtkDotUI — RTK 圆点 UI
function rtkDotUI(){ACTIVE_SUB_ROWS=[['RTK打点精度','1.6英尺'],['无人机打点精度','6.6英尺（禁用）']];return rtkRealShell('打点精度',`<div class="rtk-dot-row clickable" data-field-id="s0" onclick="highlightField('s0',this,'prdsec2')"><span>RTK打点精度</span><span class="right">${dStep('1.6','英尺')}</span></div><div class="rtk-dot-row disabled clickable" data-field-id="s1" onclick="highlightField('s1',this,'prdsec2')"><span>无人机打点精度</span><span class="right">${dStep('6.6','英尺')}</span></div>`)}
// ── toggleSegment — 开关式分段器
function toggleSegment(btn){btn.parentElement.querySelectorAll('button').forEach(x=>x.classList.remove('on'));btn.classList.add('on')}
// ── showSystemToast — 系统 Toast 提示
function showSystemToast(text='此入口将进入 Android 系统界面，原型不还原系统页面'){const el=document.getElementById('systemToast');el.textContent=text;el.style.display='block';clearTimeout(window.systemToastTimer);window.systemToastTimer=setTimeout(()=>el.style.display='none',2000)}
// ── showSettingsDialog — 通用设置弹窗
function showSettingsDialog(text){document.getElementById('tablet').insertAdjacentHTML('beforeend',`<div class="settings-modal"><div class="settings-dialog"><p>${text}</p><div class="actions"><button onclick="this.closest('.settings-modal').remove()">取消</button><button onclick="this.closest('.settings-modal').remove()">确定</button></div></div></div>`)}

// ── openOfflineMap — 打开离线地图

/* ===========================================
 * 【🟡 06 通用设置】
 * ────────────────────────────────────────────
 * 打开离线地图（共 9 项）
 * ============================================ */

function openOfflineMap(){const type=document.getElementById('mapType').value;if(type==='Mapbox')go('offlineMap');else showSettingsDialog('该功能目前仅支持mapbox地图，请先将地图类型修改为mapbox地图再使用该功能')}
// ── settingsUI — 设置总览
function settingsUI(){return `<section class="tablet-screen page">${head('通用设置')}<div class="settings-body"><button class="setting-row clickable" onclick="go('unitSettings')">参数单位 <span class="right chev">›</span></button><div class="setting-row">语言 <span class="right"><select class="lang-select" aria-label="语言"><option>中文(简体)</option></select></span></div><button class="setting-row clickable" onclick="go('voiceSettings')">语音设置 <span class="right chev">›</span></button><div class="setting-row">Android系统位置信息服务 <span class="right"><button class="open-btn" onclick="showSystemToast()">打开</button></span></div><div class="setting-row">地区 <span class="right">CN</span></div><button class="setting-row clickable" onclick="go('policySettings')">政策监管 <span class="right chev">›</span></button><div class="setting-row">地图类型 <span class="right"><select class="lang-select" id="mapType" aria-label="地图类型"><option>天地图</option><option>Mapbox</option></select></span></div><button class="setting-row clickable" onclick="openOfflineMap()">离线地图 <span class="right chev">›</span></button><div class="setting-row">缓存大小 <span class="right"><button class="cache-btn" onclick="showSettingsDialog('确定清除应用缓存？')">清除</button><span class="cache-size">171.20KB</span></span></div><button class="setting-row clickable" onclick="go('systemSettings')">系统设置 <span class="right chev">›</span></button><button class="setting-row clickable" onclick="go('storage')">存储空间 <span class="right chev">›</span></button></div><div class="system-toast" id="systemToast"></div></section>`}
// ── unitSettingsUI — 单位设置
function unitSettingsUI(){return `<section class="tablet-screen page">${subHead('参数单位','settings')}<div class="settings-body"><div class="setting-row">单位切换 <span class="setting-segments"><button onclick="toggleSegment(this)">公制</button><button class="on" onclick="toggleSegment(this)">英制</button></span></div><div class="setting-row">速度单位 <span class="setting-segments"><button onclick="toggleSegment(this)">英尺/秒</button><button class="on" onclick="toggleSegment(this)">英里/小时</button></span></div><div class="setting-row">温度单位 <span class="setting-segments"><button onclick="toggleSegment(this)">摄氏度</button><button class="on" onclick="toggleSegment(this)">华氏度</button></span></div></div></section>`}
// ── changeSpeech — 切换语音播报
function changeSpeech(delta){const out=document.getElementById('speechRate');out.value=Math.min(2,Math.max(.5,Number(out.value)+delta)).toFixed(1)}
// ── voiceSettingsUI — 语音设置
function voiceSettingsUI(){return `<section class="tablet-screen page">${subHead('语音设置','settings')}<div class="settings-body"><div class="setting-row">语音播报 <button class="right setting-switch on" aria-label="语音播报开关" onclick="this.classList.toggle('on')"></button></div><div class="setting-row">语速 <span class="right stepper"><button onclick="changeSpeech(-.1)">−</button><output id="speechRate" value="1.0">1.0</output><button onclick="changeSpeech(.1)">＋</button></span></div><button class="setting-row system-link" onclick="showSystemToast('语音引擎将进入 Android 系统界面，原型不还原系统页面')">语音引擎 <span class="info-dot" onclick="event.stopPropagation();document.getElementById('voiceTip').hidden=!document.getElementById('voiceTip').hidden">i</span><span class="right chev">›</span></button></div><div class="tip-bubble" id="voiceTip" hidden>修改语音引擎配置后,需重启app才能生效</div><div class="system-toast" id="systemToast"></div></section>`}
// ── policySettingsUI — 隐私政策
function policySettingsUI(){return `<section class="tablet-screen page">${subHead('政策监管','settings')}<div class="policy-body"><div class="policy-card"><div class="policy-row">飞行记录上报 <button class="right setting-switch on" aria-label="飞行记录上报开关" onclick="this.classList.toggle('on')"></button></div><p class="setting-tip">按照《中华人民共和国飞行基本规则》、《通用航空飞行管制条款》、《超小型民用无人机飞行动态数据管理规定》当你在中国大陆境内飞行时，需要实时上报飞行数据，请保持上报开关打开。您的数据会通过网络实时上报给民航局的UTMISS系统，或者在网络不良情况下缓存在您的设备本地，不会被惠达无人机存储或转发至其他服务</p></div><div class="policy-card"><button class="policy-row clickable" onclick="go('realNameSettings')">无人机民航局实名登记 <span class="right chev">›</span></button><p class="setting-tip">按照《无人驾驶航空器飞行管理暂行条例》，民用无人驾驶航空器所有人应当依法进行实名登记，无人驾驶航空器完成实名登记后方可使用</p></div></div></section>`}
// ── realNameSettingsUI — 实名认证
function realNameSettingsUI(){return `<section class="tablet-screen page">${subHead('无人机实名登记','policySettings')}<div class="realname-body"><div class="realname-layout"><div class="realname-text"><h3>步骤一：下载民航UOM APP</h3><p>手机扫右侧二维码，下载UOM APP（民用无人驾驶航空器综合管理平台）</p><h3>步骤二：完成实名登记</h3><p>1.打开UOM APP，注册并登录<br>2.在实名登记模块完成实名登记</p></div><div class="qr-faux" aria-label="UOM APP二维码示意"></div></div></div></section>`}
// ── systemSettingsUI — 系统设置
function systemSettingsUI(){const rows=['安卓系统设置','全部应用','系统亮度','系统音量','系统时区'];return `<section class="tablet-screen page">${subHead('系统设置','settings')}<div class="settings-body">${rows.map(x=>`<button class="setting-row system-link" onclick="showSystemToast('${x}将进入 Android 系统界面，原型不还原系统页面')">${x}<span class="right chev">›</span></button>`).join('')}</div><div class="system-toast" id="systemToast"></div></section>`}
// ── offlineMapUI — 离线地图管理
function offlineMapUI(){return `<section class="tablet-screen offline-shell"><div class="offline-map-bg"></div><div class="offline-top"><button onclick="go('settings')">‹</button><strong>离线地图</strong></div><div class="offline-panel"><h3>离线地图列表</h3><div class="offline-empty">暂无离线地图</div><div class="offline-actions"><button onclick="showSettingsDialog('输入离线地图名称后开始下载。原型不会产生真实下载。')">新建</button><button onclick="showSettingsDialog('当前未选择离线地图')">删除</button></div></div><div class="offline-tools"><button>地图规划⌄</button><button onclick="showSettingsDialog('请移动地图中心选择下载区域')">＋ 添加区域</button></div><div class="offline-cross">＋</div></section>`}


/* ===========================================
 * 【🔵 01.1 开始作业】
 * ────────────────────────────────────────────
 * 飞行视觉状态（共 31 项）
 * ============================================ */

let flightVisualState='plot';
const FLIGHT_SHOTS={plot:'./flight-assets/start-after2.png',ab:'./flight-assets/start-ab.png',free:'./flight-assets/start-free.png',side:'./flight-assets/start-side-plot.png',layer:'./flight-assets/start-layer.png',plan:'./flight-assets/start-new.png'};
// ── flightFocus — 飞行焦点
function flightFocus(id,msg){highlightField(String(id),null,'prdsec3');if(msg){const t=document.getElementById('flightToast');if(t){t.textContent=msg;t.classList.add('show');clearTimeout(window.flightToastTimer);window.flightToastTimer=setTimeout(()=>t.classList.remove('show'),1500)}}}
// ── flightSet — 飞行设置
function flightSet(state,id,msg=''){flightVisualState=state;renderAll();requestAnimationFrame(()=>flightFocus(id,msg))}
// ── flightHot — 飞行热区
function flightHot(cls,label,handler){return `<button class="flight-hotspot ${cls}" aria-label="${label}" onclick="event.stopPropagation();${handler}"></button>`}
// ── flightManualUI — 开始作业主 UI
function flightManualUI(){const s=flightVisualState in FLIGHT_SHOTS?flightVisualState:'plot';const plan=s==='plan';let hits='';if(plan){hits+=flightHot('flight-hit-back','返回首页',"go('home')");hits+=flightHot('flight-hit-gear','无人机设置',"go('droneSettings')");hits+=flightHot('flight-hit-plan-tab-basic','基础参数',"flightFocus(13,'已显示基础参数')");hits+=flightHot('flight-hit-plan-tab-point','航点参数',"flightFocus(13,'航点页签已联动字段说明')");hits+=flightHot('flight-hit-plan-tab-obstacle','障碍物参数',"flightFocus(13,'障碍物页签已联动字段说明')");hits+=flightHot('flight-hit-plan-inset','统一内缩开关',"flightFocus(14,'统一内缩开关已切换')");hits+=flightHot('flight-hit-plan-minus1','减小内缩距离',"flightFocus(15,'内缩距离按步长调整')");hits+=flightHot('flight-hit-plan-plus1','增大内缩距离',"flightFocus(15,'内缩距离按步长调整')");hits+=flightHot('flight-hit-plan-single','单边内缩开关',"flightFocus(16,'单边内缩开关已切换')");hits+=flightHot('flight-hit-plan-minus2','减小作业间距',"flightFocus(17,'作业间距按步长调整')");hits+=flightHot('flight-hit-plan-plus2','增大作业间距',"flightFocus(17,'作业间距按步长调整')");hits+=flightHot('flight-hit-plan-minus3','减小障碍物边距',"flightFocus(18,'障碍物边距按步长调整')");hits+=flightHot('flight-hit-plan-plus3','增大障碍物边距',"flightFocus(18,'障碍物边距按步长调整')");hits+=flightHot('flight-hit-plan-route','绕障方式',"flightFocus(19,'绕障方式在折返与绕行之间切换')");hits+=flightHot('flight-hit-plan-mode','地图规划方式',"flightFocus(20,'地图规划方式选择')");hits+=flightHot('flight-hit-plan-point-type','边界点类型',"flightFocus(21,'当前为边界点')");hits+=flightHot('flight-hit-plan-add','添加边界点',"flightFocus(22,'原型已进入添加边界点状态')");hits+=flightHot('flight-hit-plan-exit','退出规划',"flightSet('plot',23,'已退出地图规划')");hits+=flightHot('flight-hit-plan-save','保存规划',"flightFocus(24,'演示模式不写入真实设备')");}else{hits+=flightHot('flight-hit-back','退出作业页',"go('home')");hits+=flightHot('flight-hit-gear','无人机设置',"go('droneSettings')");hits+=flightHot('flight-hit-side','展开地块列表',"flightSet('side',7)");hits+=flightHot('flight-hit-side-close','收起地块列表',"flightSet('plot',7)");hits+=flightHot('flight-hit-folder','地块列表',"flightSet('side',7)");hits+=flightHot('flight-hit-eraser','清除轨迹',"flightFocus(5,'当前没有可清除的轨迹')");hits+=flightHot('flight-hit-home','返航点',"flightFocus(5,'无人机未连接，暂无返航点')");hits+=flightHot('flight-hit-rc','遥控器位置',"flightFocus(5,'已定位到遥控器位置')");hits+=flightHot('flight-hit-locate','地图定位',"flightFocus(5,'地图已回到当前位置')");hits+=flightHot('flight-hit-layer','图传布局',"flightSet('layer',8)");hits+=flightHot('flight-hit-layer-close','关闭图传布局',"flightSet('plot',8)");hits+=flightHot('flight-hit-type-plot','地块作业',"flightSet('plot',6)");hits+=flightHot('flight-hit-type-ab','AB点作业',"flightSet('ab',6)");hits+=flightHot('flight-hit-type-free','自由航线',"flightSet('free',6)");hits+=flightHot('flight-hit-new','新增作业',"flightSet('plan',11)");hits+=flightHot('flight-hit-edit','编辑作业',"flightFocus(12,'当前没有可编辑的作业')");hits+=flightHot('flight-hit-call','调用作业',"flightFocus(12,'当前没有可调用的作业')");hits+=flightHot('flight-hit-video','视频预览',"flightFocus(9,'无人机未连接，视频画面为空')");hits+=flightHot('flight-hit-hud','飞行HUD',"flightFocus(10,'飞行数据随设备连接状态更新')");if(s==='side'){hits+=flightHot('flight-hit-side-search','搜索地块',"flightFocus(7,'请输入地块名称')");hits+=flightHot('flight-hit-side-sort','地块排序',"flightFocus(7,'可按距离或时间排序')");}}
return `<section class="tablet-screen flight-manual-screen flight-state-${s}" style="background-image:url('${FLIGHT_SHOTS[s]}')" onclick="flightFocus(0)">${hits}<div class="flight-toast" id="flightToast"></div></section>`}

const SCREENS={
 home:{num:'01',title:'首页',source:'activity_launcher.xml · LauncherActivity.java · LauncherNetworkDiagnosisPopupWindow',ui:homeUI,prd:{desc:'GCS 启动首页。提供账户、设置、作业资源、日志、设备管理和开始作业入口，并展示通信、电量与系统时间。',value:'操作者在进入任务前一屏确认设备连接、版本与网络链路状态。',fields:[['连接状态','布尔','DroneReportDataManager.isConnected','实时','未连接'],['网络诊断','拓扑','NetworkDiagnosisManager.latestReport','点击信号打开','Wi‑Fi 活跃 / SIM 未活跃'],['系统时间','时间','TextClock','24小时制','05:30(GMT+08:00)'],['升级提示','字符串','updateCountLiveData','count > 0','版本有更新'],['开始按钮','动作','LauncherViewModel.navMission2','权限/自检/版本校验','开始']],interactions:['账户图标 → 用户信息','六边形与右上齿轮 → 通用设置','点击 4G/Wi‑Fi 信号 → 打开网络诊断窗口','底部三个入口 → 对应管理页面','开始 → 执行版本、自检、权限与登录校验'],state:['页面启动','监听设备与网络','显示未连接及诊断拓扑','进入作业'],src:'activity_launcher.xml 数据绑定 LauncherViewModel；顶部状态和网络诊断来自 FlightTitleFragment；连接来自 DroneReportDataManager。',edge:['未登录：弹出登录提示','设备未连接：保持未连接状态','网络链路不可用：拓扑节点及连线置灰','自检中或版本不匹配：禁止进入作业'],ac:['1920×1200 下背景、顶栏和 82dp 底栏比例与实机一致','设备管理入口、断连图标及字体比例与实机一致','点击网络信号显示 232dp 网络诊断窗口','诊断拓扑准确区分活跃与未活跃链路','三个管理入口可点击切屏','开始按钮仅演示 PRD 联动，不触发真实设备控制'] }},
 work:{num:'02',title:'作业资源',source:'PlotManagerActivity · activity_plot_manager.xml · PlotDownloadActivity · 实机截图',ui:workUI,prd:{desc:'管理地块、进行中任务和处方图；按真机状态联动本地/云端、同步、时间排序、搜索、多选、上传下载与文件导入。',value:'统一管理作业前置资源并支持遥控器本地与云端双向同步。',fields:[['资源类型','枚举','HDPlotTypeView','地块/进行中/处方图互斥','地块'],['存储位置','枚举','HDSegmentControlView','本地/云端互斥','本地'],['自动同步到云端','布尔','cbAutomaticSynchronization','仅本地地块显示','已勾选'],['时间排序','排序','srbPlotTime','升序/降序','时间'],['名称搜索','文本','svSearchPlot','多选状态隐藏','请输入名称'],['多选状态','布尔','ivPlotEdit / rllPlot','显示批量操作栏','未选择'],['批量操作','动作','rtvDeleteSure / rtvUploadSure / rtvDownloadSure','无选择时禁用','删除/上传/下载'],['导入地块','页面入口','ivPlotInsert / PlotDownloadActivity','仅地块页签显示','二维码与导入文件']],interactions:['切换左侧资源类型，地块页显示新增与同步，进行中/处方图隐藏','切换本地/云端；本地显示时间排序，云端显示资源卡片','点击同步复选框切换自动同步状态','搜索名称；点击多选切换底部批量操作栏','本地批量操作为删除/上传，云端为删除/下载','点击右上角加号进入导入地块页，返回后保持作业资源状态'],state:['进入作业资源','选择资源类型','选择本地或云端','搜索/排序/多选','上传下载或导入'],src:'LauncherViewModel.navPlot → RoutePath.PlotManagement.PAGER_PLOTMANAGEMENT；页面布局 activity_plot_manager.xml；文件导入由 PlotDownloadActivity 承载。',edge:['本地无数据：保持空白列表','进行中/处方图不显示右上角新增和自动同步','多选时隐藏排序、搜索及同步控件并显示批量栏','网络不可用：云端列表请求失败或保持旧数据','无登录态：返回首页并提示登录'],ac:['1920×1200 下标题、返回、加号及左右区域比例与实机一致','三个左侧页签的选中态和控件显隐与真机一致','本地/云端分段、时间排序、搜索和同步可操作','多选底栏的全部、未同步、已选、删除及上传/下载完整','云端资源卡片的缩略图、时间、名称、地址、面积和类型完整','导入地块页面的二维码、地址提示、空态及底部删除栏与真机一致'] }},
 logs:{num:'03',title:'日志管理',source:'LogManualUploadFragment2 · LogUploadManagerFragment · fragment_log_manual_upload.xml · item_log_manual_uploag_group.xml · 遥控器实机截图',ui:logsUI,prd:{desc:'按无人机、遥控器、充电器、视频、中继器和图传六类管理日志；完整还原遥控器日志组、图传 FTP 文件、上传管理及日志备注流程。',value:'为现场故障定位、炸机分析、售后诊断和日志追溯提供统一入口。',fields:[
 ['日志设备分类','枚举','顶部六类标签','单选','遥控器','log-tab-controller'],
 ['上传管理','入口','LogUploadManagerFragment','点击进入','未上传','log-upload-manager'],
 ['日志总数与列表','只读','设备扫描结果','按分类刷新','共16组遥控器日志','log-summary'],
 ['刷新日志','按钮','本地/FTP扫描','点击重新查询','↻','log-refresh'],
 ['日志组选框','布尔','用户选择','每组独立勾选','未勾选','log-group-select'],
 ['日志组展开','折叠','日志组文件清单','点击展开/收起','收起','log-group-expand'],
 ['日志子文件','列表','日志组扫描结果','随日志组展开','文件名/大小','log-child'],
 ['炸机日志','布尔','用户选择','遥控器日志页可选','未勾选','log-crash'],
 ['视频全选','布尔','视频文件清单','空列表时不产生选择','未勾选','log-video-all'],
 ['删除日志','按钮','当前分类选择集','无选择时浅粉色禁用','禁用','log-delete'],
 ['图传设备分类','枚举','遥控器/无人机','单选','遥控器','log-tx-device'],
 ['图传链路状态','只读','FTP连接状态','连接后更新','遥控器已连接','log-tx-status'],
 ['图传日志开关','布尔','图传模块配置','点击切换','关闭','log-tx-switch'],
 ['图传文件选择','列表选择','FTP目录','逐项或全选','未选择','log-tx-file'],
 ['底部选择统计','只读','当前选择集合','勾选后实时汇总','0项','log-tx-all'],
 ['上传日志备注','文本','用户输入','最多30字','请输入上传日志备注','log-remark'],
 ['上传动作','按钮','日志上传任务','有选择时可用','禁用','log-upload'],
 ['上传管理分类','枚举','未上传/上传历史','单选','未上传','log-manager-pending'],
 ['上传历史记录','列表','上传任务记录','只读','文件/大小/二维码','log-manager-record']
 ],interactions:['切换六类日志时保持在日志管理窗口内；无人机、充电器、中继器未连接时显示对应提示','遥控器日志支持完整纵向滚动、日志组独立勾选和展开；重复日志组共用同一语义字段','图传首次进入显示“查询图传日志/正在连接FTP”，随后展示遥控器与无人机分类、链路状态、日志开关和13项文件','视频空态显示“No video files”，全选、删除和上传均保持禁用','勾选日志后底部实时汇总，上传按钮启用；点击上传弹出备注框、取消和开始上传','上传管理在当前960×600设备视图内打开；未上传与上传历史可切换，返回不跳转首页','所有按钮点击仅联动右侧对应字段，不滚动右侧字段清单'],state:['进入日志管理并读取当前分类','分类扫描或连接FTP','选择日志组/文件并查看汇总','填写可选备注并开始上传','在上传管理查看未上传或历史记录'],src:'LogManualUploadFragment2；LogUploadManagerFragment；layout_log_remark_edit；遥控器1920×1200实机截图按0.5比例还原。',edge:['无人机未连接：提示“无人机未连接，请连接无人机后再上传日志”并禁用上传','充电器未连接：显示充电器连接提示','中继器未连接：提示上传前连接中继器','图传无人机端未连接：仅内容区显示提示，左侧图传分类仍可见','没有选择日志：上传和删除不可执行','上传备注最多30字；本原型不向真实设备发送或删除日志','飞行器已解锁、自检中或从机模式连接时由入口层阻止进入'],ac:['顶部六个分类宽高、标题栏和上传管理位置与遥控器截图一致','遥控器页显示16组真实日志数据，列表可滑动到底部，首组可展开真实子文件','无人机、充电器、视频、中继器和图传的空态/提示态与实机一致','图传页显示设备分类、连接状态、日志开关、文件选择、全选、删除和上传完整交互','上传管理未上传与上传历史完整；历史页显示实机文件名、43.802KB和二维码标识','上传备注弹窗文案、30字限制、取消/开始上传按钮与源码一致','所有子状态不全屏遮挡设备外框，返回、滚动和字段反馈均正常'] }},
 devices:{num:'04',title:'设备管理',source:'fragment_devices.xml · 遥控器 1920×1200 实机截图 · 2026-08-14',ui:devicesUI,prd:{desc:'按当前遥控器真实状态展示 7 类设备，并完整还原遥控器、无人机、智能充电器、电池、版本检查、图传模块和运行识别的 App 内详情页。',value:'统一查看连接状态与版本信息；所有详情保持在设备管理窗口内，长内容独立滚动。',fields:[],interactions:[],state:['进入设备管理','读取连接与版本','查看设备详情','返回设备列表'],src:'DevicesViewModel 与 fragment_devices.xml；详情来源为对应 Fragment 布局和已连接遥控器实机截图。',edge:['未连接设备卡片与图标灰化，但仍可进入真实空状态详情','检测升级和升级按钮在原型中仅反馈，不调用真机接口','无人机版本字段允许因设备未连接而为空','详情返回只回到设备管理列表，不跳回首页'],ac:['主页面 4 列卡片尺寸、间距、Debug 与检测升级位置符合真机','7 个设备入口、名称、连接状态和软件版本与实机一致','遥控器 9 行版本信息完整且可滚动','无人机完整长列表可滚动到底部产品识别码','充电器、电池、版本检查、图传模块、运行识别详情均与实机状态一致','所有按钮与信息行均能定位右侧字段或交互说明'] }},
 account:{num:'05',title:'用户信息',source:'UserFragment · fragment_user.xml · 实机滚动截图',ui:accountUI,prd:{desc:'展示账户身份、真实勋章状态、同步时间、作业统计，并通过内部滚动访问飞行记录、橙心服务、临时禁飞区和退出登录。',value:'汇总操作者身份和作业履历，并覆盖账号相关完整功能树。',fields:[['姓名','字符串','AccountDataManager','登录用户','张宣'],['账号','字符串','UserBaseInfo.getAccount','只读','14752221887'],['勋章','资源状态','iv_model_green / iv_model_red','未获得置灰','两枚灰色勋章'],['作业架次','数值','云端统计','非负','18'],['作业时长','小时','云端统计','一位小数','0.8']],interactions:['页面内容可上下滑动','我的飞行记录 → 喷洒/播撒/吊运记录','橙心服务 → 续费验机及未连接提示','临时禁飞区 → 列表/下载/新增/地图预览','退出登录仅定位异常说明，不执行真实退出'],state:['校验 Token','同步用户信息','滚动查看入口','进入多级子功能'],src:'LauncherViewModel.navAccount → AccountActivity/UserFragment；子页面来自 FlightRecordActivity、InsuranceSettingFragment、PlotFenceActivity、DownloadPlotFenceActivity 与 FenceMapPreviewActivity。',edge:['Token 失效：弹出登录','无人机未连接：续费验机显示红色提示','新增/保存：原型只反馈状态，不写入设备','退出登录：原型不改变实机账号'],ac:['用户页面固定 600px 外壳且内容区可滚动到底部','手机号上方使用真实灰色勋章资源','飞行记录三种类型可切换','橙心服务与续费未连接弹窗完整','临时禁飞区列表、下载、新增和预览可互相导航','所有子页面可返回上一级'] }},
 flightRecords:{num:'05.1',title:'飞行记录',source:'FlightRecordActivity · activity_flight_record.xml',ui:flightRecordsUI,prd:{desc:'查看喷洒、播撒和吊运三类飞行记录，展示未上传数量与记录字段。',value:'支持按作业类型追溯历史飞行数据。',fields:[['作业类型','枚举','HDSegmentControlView','三选一','喷洒'],['未上传','数量','本地数据库','非负','0'],['记录字段','表格','FlightRecordData','按类型变化','位置/日期等']],interactions:['切换喷洒/播撒/吊运','勾选记录后可进入上传流程','返回用户信息'],state:['读取本地记录','切换类型','选择记录','上传'],src:'DatabaseHelper.getFlightRecordByUserIdAndWorkType。',edge:['无记录：显示空列表','未选择记录：禁止上传'],ac:['三段切换比例与实机一致','空数据状态完整','返回进入用户信息']}},
 insurance:{num:'05.2',title:'橙心服务',source:'InsuranceSettingFragment · 实机截图',ui:insuranceUI,prd:{desc:'展示橙心服务与第三者责任保障状态，并提供续费验机入口。',value:'统一查看保障服务有效状态。',fields:[['橙心服务','状态','保险数据','可空','N/A'],['第三者责任保障','状态','保险数据','可空','N/A']],interactions:['点击续费验机','未连接时确认并关闭提示','返回用户信息'],state:['读取保障状态','点击续费','校验连接','提示或继续'],src:'UserFragment → insuranceSettingFragment。',edge:['无人机未连接：禁止续费并提示'],ac:['两条保障状态与实机一致','续费验机按钮可点击','未连接弹窗可关闭']}},
 noFly:{num:'05.3',title:'临时禁飞区',source:'PlotFenceActivity · activity_electronic_fence_no_fly_zone.xml',ui:noFlyUI,prd:{desc:'查看本地临时/行政禁飞区，支持下载、新增和地图预览。',value:'管理作业前必须遵守的禁飞边界数据。',fields:[['名称/位置','文本','NoFlyZonesManager','必填','Luzhou Yunlong Airport'],['类型','枚举','围栏数据','必填','行政禁飞区'],['面积','面积','围栏几何','正数','12174.67英亩'],['有效期','日期范围','围栏数据','起止有效','2020/05/20-2030/01/01']],interactions:['点击行进入地图预览','点击下载进入下载列表','点击加号进入地图新增','返回用户信息'],state:['加载列表','选择记录','预览/新增/下载'],src:'NoFlyZonesManager 与本地围栏数据库。',edge:['地图加载慢：保留规划工具','原型新增不保存真实数据'],ac:['四列列表与三条实机数据一致','下载与加号入口可用','地图页可安全返回']}},
 noFlyDownload:{num:'05.3.1',title:'下载禁飞区',source:'DownloadPlotFenceActivity · activity_download_plot_fence.xml',ui:noFlyDownloadUI,prd:{desc:'按时间或距离筛选可下载禁飞区，并支持选择后下载。',value:'将云端围栏同步到遥控器。',fields:[['排序','枚举','用户选择','互斥','时间'],['选择数量','整数','复选框','非负','0']],interactions:['切换时间/距离','选择围栏','点击下载','返回列表'],state:['查询云端','排序','选择','下载'],src:'DownloadPlotFenceActivity。',edge:['未选择：不发起下载','原型不产生真实下载'],ac:['排序与底部下载栏完整','返回临时禁飞区']}},
 noFlyMap:{num:'05.3.2',title:'新增临时禁飞区',source:'地图规划实机截图 · PlotFenceActivity.addNoFlyZone',ui:()=>noFlyMapUI(false),prd:{desc:'在地图上添加临时禁飞区边界点，支持撤销、返回和保存。',value:'快速定义现场临时安全边界。',fields:[['规划模式','枚举','地图工具','默认','地图规划'],['边界点','坐标列表','地图点击','至少3点','—']],interactions:['添加边界点','撤销一步','返回列表','保存仅做原型提示'],state:['打开地图','添加点','校验边界','保存'],src:'MapFragment 与地图规划工具。',edge:['少于3点：不能形成区域','原型不写入设备'],ac:['地图工具与按钮位置接近实机','保存不产生副作用','可返回列表']}},
 noFlyPreview:{num:'05.3.3',title:'禁飞区地图预览',source:'FenceMapPreviewActivity · activity_fence_map_preview.xml',ui:noFlyPreviewUI,prd:{desc:'在地图上查看选中禁飞区范围。',value:'在作业前确认限制区域空间位置。',fields:[['区域','几何','围栏记录','只读','行政禁飞区']],interactions:['查看地图','返回列表'],state:['加载地图','定位区域','返回'],src:'FenceMapPreviewActivity。',edge:['地图不可用：保留区域数据'],ac:['地图预览可进入并返回']}},
 droneSettings:{num:'07',title:'无人机设置',source:'DebugManager · 八个SettingFragment · 实机截图',ui:droneSettingsUI,prd:{desc:'首页右上齿轮打开的侧滑无人机设置面板，包含八个设置主标签及 App 内多级页面。',value:'集中配置飞行器、感知、遥控、喷洒、电池、RTK、图传和其他设备能力。',fields:[['主标签','枚举','DebugManager','动态','8项'],['连接状态','布尔','DroneReportDataManager','写参前校验','未连接']],interactions:['左侧八标签切换','内容独立滚动','箭头进入子页面','关闭返回首页'],state:['打开','切换','设置','关闭'],src:'DebugManager release menu 与各 SettingFragment。',edge:['系统语音引擎不还原','原型不写真实设备参数'],ac:['右上齿轮进入无人机设置','八标签完整','主页面可滚动','App内子页面可进入返回']}},
 airAdvanced:{num:'07.1',title:'无人机高级设置',source:'AircraftAdvancedSettingFragment',ui:()=>droneSubUI('高级设置','droneSettings',[['打点自动排序',dSwitch(true)],['返航精度检查',dSwitch(true)],['Remote ID设置','›'],['IMU校准','›'],['PWM检查','›'],['振动检查','›'],['飞机姿态','›'],['机架实时数据','›']]),prd:{desc:'无人机高级参数及检查入口。',value:'面向维护和高级飞控配置。',fields:[['高级项','设置/导航','AircraftAdvancedSettingFragment','动态','8项']],interactions:['切换开关','进入检查入口','返回'],state:['进入','调整','返回'],src:'AircraftAdvancedSettingFragment。',edge:['不写飞控参数'],ac:['高级项完整','可返回']}},
 rockerCalibration:{num:'07.2',title:'摇杆校准',source:'CalibrationRockerSettingFragment',ui:()=>droneSubUI('摇杆校准','droneSettings',[['左摇杆','请保持居中'],['右摇杆','请保持居中'],['校准状态','未开始'],['开始校准','原型演示']]),prd:{desc:'遥控器摇杆校准引导。',value:'校正摇杆中位和行程。',fields:[['摇杆通道','数值','遥控器','范围','1500']],interactions:['演示校准','返回'],state:['准备','采样','完成'],src:'CalibrationRockerSettingFragment。',edge:['不校准真实遥控器'],ac:['状态完整','可返回']}},
 customKeys:{num:'07.3',title:'自定义按键',source:'CustomKeysFragment',ui:()=>droneSubUI('自定义按键','droneSettings',[['按键C1','前摄/后摄切换'],['按键C2','地图/图传切换'],['滚轮按键','未设置']]),prd:{desc:'配置遥控器自定义按键。',value:'提高操作效率。',fields:[['按键','枚举','遥控器配置','唯一','C1']],interactions:['选择','返回'],state:['读取','选择','保存'],src:'CustomKeysFragment。',edge:['不写遥控器'],ac:['按键完整']}},
 remoteDiagnosis:{num:'07.4',title:'网络诊断',source:'NetworkDiagnosisFragment',ui:()=>droneSubUI('网络诊断','droneSettings',[['遥控器网络','已连接'],['图传链路','未连接'],['云端服务','可用'],['重新诊断','开始']]),prd:{desc:'诊断遥控器与无人机网络。',value:'定位连接异常。',fields:[['节点','状态','诊断管理器','实时','未连接']],interactions:['诊断','返回'],state:['检测','结果'],src:'NetworkDiagnosisFragment。',edge:['不真实诊断'],ac:['节点完整']}},
 workRealtime:{num:'07.5',title:'作业系统实时数据',source:'WorkSysRealDataFragment',ui:()=>droneSubUI('作业系统实时数据','droneSettings',[['液泵转速','-'],['实时流量','-'],['喷头转速','-'],['药箱重量','-']]),prd:{desc:'展示喷洒系统实时遥测。',value:'维护检查。',fields:[['遥测项','数值','无人机回报','只读','-']],interactions:['查看','返回'],state:['订阅','显示'],src:'WorkSysRealDataFragment。',edge:['断连显示-'],ac:['字段完整']}},
 nozzleConfig:{num:'07.6',title:'喷头配置',source:'NozzleConfigurationFragment',ui:()=>droneSubUI('喷头配置','droneSettings',[['喷头1','开启'],['喷头2','开启'],['喷头类型','离心喷头'],['旋转方向','默认']]),prd:{desc:'配置喷头。',value:'匹配喷洒机构。',fields:[['喷头','配置','作业系统','按机型','2']],interactions:['配置','返回'],state:['读取','调整'],src:'NozzleConfigurationFragment。',edge:['不写设备'],ac:['配置完整']}},
 ntripConfig:{num:'07.7',title:'NTRIP配置',source:'RTKNtripConfigFragment',ui:()=>rtkSubUI('NTRIP配置',[['服务器地址','请输入'],['端口','请输入'],['挂载点','请选择'],['用户名','请输入'],['密码','••••••'],['应用配置','确定']]),prd:{desc:'配置网络RTK服务。',value:'接入差分定位。',fields:[['字段','文本','用户输入','必填','地址']],interactions:['填写','确定','返回'],state:['编辑','校验'],src:'RTKNtripConfigFragment。',edge:['不保存凭据'],ac:['字段完整']}},
 rtkDiagnosis:{num:'07.8',title:'RTK诊断',source:'RTKDiagnoseFragment · fragment_setting_rtk_diagnose.xml · 真机截图',ui:rtkDiagnosisUI,prd:{desc:'按真机展示卫星定位、无人机、遥控器与网络RTK的连接链路，并逐条给出诊断结论。',value:'快速定位卫星、飞行器链路或差分服务异常。',fields:[['卫星定位星数','整数','RTK诊断','只读','0'],['无人机链路','状态','设备连接','只读','断开'],['遥控器链路','状态','设备连接','只读','断开'],['网络RTK链路','状态','网络RTK','只读','正常'],['诊断结果','列表','RTKDiagnoseFragment','红色异常/绿色正常','3条']],interactions:['查看四节点链路拓扑','查看三条彩色诊断结论','点击节点或结论联动字段说明','返回RTK设置'],state:['进入诊断','读取链路','绘制拓扑','输出结论'],src:'RTKDiagnoseFragment · fragment_setting_rtk_diagnose.xml · 实机截图',edge:['未连接时卫星星数为0','无人机与遥控器链路置灰','网络RTK正常时最后一段连线和结论显示绿色'],ac:['四节点拓扑与真机一致','三条诊断结论文字和颜色一致','顶部始终显示RTK设置','页面保持在右侧设置窗口内']}},
 satelliteSignal:{num:'07.9',title:'卫星信噪比',source:'DebugGpsStatusFragment2 · 真机截图',ui:rtkSnrUI,prd:{desc:'按真机展示GNSS1、GNSS2和打点器三种信号源的卫星信噪比图。',value:'通过卫星数量、平均信噪比和SNR色标判断定位环境。',fields:[['日志','布尔','调试配置','开关','关闭'],['当前卫星数','整数','GNSS回报','只读','0'],['平均信噪比','数值','GNSS回报','无数据N/A','N/A'],['信号源','枚举','HDSegmentControlView','三选一','GNSS1'],['信噪比图表','图表','DebugGpsStatusFragment2','动态','空图'],['SNR色标','分段色阶','固定图例','0/10/20/30/50','红到绿']],interactions:['切换日志开关','在GNSS1、GNSS2与打点器间切换','查看卫星数量及平均信噪比','按SNR色标判断信号质量','返回RTK设置'],state:['订阅卫星数据','选择信号源','刷新图表','查看色标'],src:'DebugGpsStatusFragment2 · 真机截图',edge:['无卫星数据时图表为空且平均信噪比显示N/A','信号源切换不改变顶部RTK设置标题'],ac:['三段切换与真机一致','灰色上下图表区域完整','底部SNR色标完整','页面保持在右侧设置窗口内']}},
 dotAccuracy:{num:'07.10',title:'打点精度',source:'RTKDotAccuracyFragment · 真机截图',ui:rtkDotUI,prd:{desc:'按真机配置RTK打点精度，并展示当前不可用的无人机打点精度。',value:'控制RTK采点的精度阈值。',fields:[['RTK打点精度','距离','设备参数','按范围和步长','1.6英尺'],['无人机打点精度','距离','设备能力','当前禁用','6.6英尺']],interactions:['使用减号和加号调整RTK打点精度','无人机打点精度保持灰色禁用','点击行联动字段说明','返回RTK设置'],state:['读取参数','调整RTK精度','校验范围','显示结果'],src:'RTKDotAccuracyFragment · 真机截图',edge:['未满足设备条件时无人机打点精度不可操作','原型仅更新显示，不写入真实设备'],ac:['两行高度与真机一致','RTK值为1.6英尺','无人机值为6.6英尺并禁用','顶部始终显示RTK设置']}},
 linkQuality:{num:'07.11',title:'链路信号质量',source:'LinkSignalQualityRealDataFragment',ui:()=>droneSubUI('链路信号质量','droneSettings',[['上行信号','-'],['下行信号','-'],['信道','自动'],['频段','5G']]),prd:{desc:'展示图传链路质量。',value:'辅助信道选择。',fields:[['信号','数值','图传','只读','-']],interactions:['查看','返回'],state:['订阅','展示'],src:'LinkSignalQualityRealDataFragment。',edge:['断连显示-'],ac:['字段完整']}}, settings:{num:'06',title:'通用设置',source:'SettingsFragment · fragment_settings.xml · 实机滚动截图',ui:settingsUI,prd:{desc:'完整配置参数单位、语言、语音、定位、地区、政策监管、地图类型、离线地图、缓存和系统设置入口。',value:'集中管理应用级全局偏好，并明确区分 App 内页面和 Android 系统页面。',fields:[['参数单位','枚举','本地设置','必选','英制'],['语言','枚举','LanguageDefaultUtil','必选','中文(简体)'],['地图类型','枚举','DroneParameters','必选','天地图'],['缓存大小','存储量','DataCleanManager','只读','171.20KB'],['地区','地区码','设备/账号','ISO 3166','CN']],interactions:['页面内部上下滑动查看全部十项','参数单位、语音、政策监管和系统设置进入 App 内详情','离线地图在非 Mapbox 状态显示提示弹窗','清除缓存显示确认弹窗','定位服务入口仅提示将进入 Android 系统页面'],state:['进入设置','读取当前配置','滚动或进入子页面','修改后本地应用'],src:'SettingsActivity / SettingsFragment；地图类型来自 DroneReportDataManager，缓存来自 DataCleanManager。',edge:['进入 Android 系统的入口不仿造系统页面','天地图状态点击离线地图：提示切换 Mapbox','清除缓存原型不删除真实数据'],ac:['首屏六项和滚动后的四项顺序与实机一致','设置内容区可内部滚动至系统设置','所有 App 内子页面可进入并返回','系统页面入口只反馈边界不仿造','缓存与离线地图弹窗无真实副作用'] }},
 unitSettings:{num:'06.1',title:'参数单位',source:'UnitSettingsFragment · fragment_unit_setting.xml · 实机截图',ui:unitSettingsUI,prd:{desc:'切换公制/英制，并在英制下选择速度和温度单位。',value:'保证飞行参数以操作者习惯的单位展示。',fields:[['单位切换','枚举','GcsConfigManager','二选一','英制'],['速度单位','枚举','本地设置','二选一','英里/小时'],['温度单位','枚举','本地设置','二选一','华氏度']],interactions:['点击分段控件切换选中项','返回通用设置'],state:['读取单位','切换','即时显示','保存'],src:'UnitSettingsFragment 与 HDSegmentControlView。',edge:['原型只更新显示，不改设备飞控参数'],ac:['三行位置、尺寸与实机一致','绿色选中状态可切换','可返回通用设置']}},
 voiceSettings:{num:'06.2',title:'语音设置',source:'VoiceSettingFragment · fragment_voice_setting.xml · 实机截图',ui:voiceSettingsUI,prd:{desc:'控制语音播报、调整 0.5–2.0 语速，并提供语音引擎系统入口。',value:'让告警语音符合现场环境和操作习惯。',fields:[['语音播报','布尔','GcsConfigManager','开关','开启'],['语速','小数','DroneParameters','0.5–2.0','1.0'],['语音引擎','系统入口','Android TTS Settings','外部页面','›']],interactions:['切换语音播报','加减语速','点击信息图标显示说明','点击语音引擎只提示将进入系统界面'],state:['读取配置','交互调整','本地显示','返回'],src:'VoiceSettingFragment / AlarmMessageSender。',edge:['语音引擎属于 Android 系统界面，不继续还原'],ac:['开关、步进器和语音引擎行与实机一致','语速限制在0.5–2.0','说明气泡可开关','系统入口不仿造']}},
 policySettings:{num:'06.3',title:'政策监管',source:'PolicySupervisionSettingFragment · fragment_policy_supervision_setting.xml · 实机截图',ui:policySettingsUI,prd:{desc:'管理飞行记录上报，并说明中国大陆监管规则和实名登记要求。',value:'帮助操作者遵守飞行数据上报与实名登记法规。',fields:[['飞行记录上报','布尔','GcsConfigManager','建议开启','开启'],['实名登记','导航','App内页面','只读说明','无人机民航局实名登记']],interactions:['切换上报开关','进入无人机实名登记','返回通用设置'],state:['加载法规状态','查看说明','进入实名登记'],src:'PolicySupervisionSettingFragment。',edge:['原型开关不执行真实上报策略'],ac:['两段说明文字与实机一致','上报开关可切换','实名登记可进入下一层']}},
 realNameSettings:{num:'06.3.1',title:'无人机实名登记',source:'RealNameSettingFragment · fragment_real_name_setting.xml · 实机截图',ui:realNameSettingsUI,prd:{desc:'分两步引导下载民航 UOM APP 并完成实名登记。',value:'为无人机依法使用提供实名登记指引。',fields:[['步骤一','说明','静态资源','只读','下载UOM APP'],['二维码','图像','icon_uom_real_name','扫码','UOM'],['步骤二','说明','静态资源','只读','注册并登记']],interactions:['阅读步骤','返回政策监管'],state:['打开说明','扫码下载','在UOM完成登记'],src:'RealNameSettingFragment。',edge:['UOM 属于外部 App，原型不继续还原'],ac:['标题和两步文案与实机一致','右侧二维码区域完整','返回政策监管']}},
 systemSettings:{num:'06.4',title:'系统设置',source:'SystemSettingsFragment · fragment_system_setting.xml · 实机截图',ui:systemSettingsUI,prd:{desc:'列出安卓系统设置、全部应用、亮度、音量和时区五个系统入口。',value:'从 App 内集中访问常用系统配置。',fields:[['系统入口','导航','Android Settings Intent','外部系统页面','5项']],interactions:['点击任一入口显示系统边界提示','返回通用设置'],state:['进入汇总页','选择系统入口','交由Android处理'],src:'SystemSettingsFragment 使用 ACTION_SETTINGS 等系统 Intent。',edge:['五个目标均不是该 App 页面，因此不还原后续系统界面'],ac:['五行顺序与实机一致','每个入口均有右箭头和点击反馈','不仿造 Android 系统页面','可返回通用设置']}},
 offlineMap:{num:'06.5',title:'离线地图',source:'FlightOfflineMapFragment · OfflineMapInvokeFragment · SaveOfflineMapboxDialog',ui:offlineMapUI,prd:{desc:'在 Mapbox 模式下管理离线地图区域，支持新建、选择、删除、更新和下载。',value:'为无网络作业现场预先保存地图底图。',fields:[['地图列表','列表','OfflineDatabaseHelper','可空','暂无离线地图'],['中心位置','坐标','地图中心点','有效坐标','十字准星'],['下载进度','百分比','MapboxOfflineManager','0–100','0%']],interactions:['新建离线地图并进入名称/下载确认','选择后删除或更新','返回通用设置'],state:['切换Mapbox','进入离线地图','选择区域','下载/删除'],src:'FlightOfflineMapFragment 与 MapboxOfflineManager。',edge:['天地图状态只显示需切换Mapbox提示','原型不启动真实下载、不删除真实离线数据'],ac:['Mapbox选择后可进入离线地图页','列表、地图和规划工具完整','新建与删除弹窗无真实副作用','可返回通用设置']}}
};
Object.assign(SCREENS,{
 frontVideoStream:{num:'07.12',title:'前摄视频流参数弹层',source:'OtherSettingFragment · NormalListPopup · setting_video_cfg',ui:()=>otherSettingsUI('frontVideo'),prd:{desc:'在其他设置原窗口上显示前摄视频流参数列表；不会进入独立全屏页面。',value:'按真机一次性选择分辨率、帧率和码率组合。',fields:[['前摄视频流参数','枚举弹层','MC_FRONT_VIDEO_CFG','12个固定组合','1280*720 20fps 2Mbps']],interactions:['点击参数值后显示灰色遮罩和右侧白色浮层','点击12个组合之一更新当前值并关闭弹层','点击遮罩关闭并返回其他设置'],state:['读取当前组合','打开弹层','选择并关闭'],src:'OtherSettingFragment.initFrontVideoCfg/onClick；R.array.setting_video_cfg。',edge:['未连接无人机时真机写参数会失败并恢复原值','原型只模拟选择，不向飞控写参数'],ac:['弹层在其他设置窗口之上','12项组合完整','不触发浏览器全屏选择']}},
 rearVideoStream:{num:'07.13',title:'后摄视频流参数弹层',source:'OtherSettingFragment · NormalListPopup · setting_video_cfg',ui:()=>otherSettingsUI('rearVideo'),prd:{desc:'在其他设置原窗口上显示后摄视频流参数列表；不会进入独立全屏页面。',value:'按真机一次性选择分辨率、帧率和码率组合。',fields:[['后摄视频流参数','枚举弹层','MC_REAR_VIDEO_CFG','12个固定组合','1280*720 20fps 2Mbps']],interactions:['点击参数值后显示灰色遮罩和右侧白色浮层','点击12个组合之一更新当前值并关闭弹层','点击遮罩关闭并返回其他设置'],state:['读取当前组合','打开弹层','选择并关闭'],src:'OtherSettingFragment.initRearVideoCfg/onClick；R.array.setting_video_cfg。',edge:['未连接无人机时真机写参数会失败并恢复原值','原型只模拟选择，不向飞控写参数'],ac:['弹层在其他设置窗口之上','12项组合完整','不触发浏览器全屏选择']}},
 droneLanguage:{num:'07.14',title:'语言',source:'OtherSettingFragment · LanguageDefaultUtil',ui:()=>droneSubUI('语言','droneSettings',[['简体中文','✓'],['English','']]),prd:{desc:'选择无人机设置模块的显示语言。',value:'适配操作员语言。',fields:[['语言','枚举','本地设置','单选','简体中文']],interactions:['点击语言切换选中项','返回其他设置'],state:['读取','选择','应用'],src:'LanguageDefaultUtil。',edge:['原型不重启 App'],ac:['语言选项可见','可返回']}},
 droneInsurance:{num:'07.15',title:'橙心服务',source:'OtherSettingFragment · InsuranceSettingFragment',ui:otherInsuranceUI,prd:{desc:'从其他设置进入橙心服务状态页，并保持在无人机设置右侧窗口内。',value:'查看保障权益。',fields:[['橙心服务','状态','保险服务','只读','N/A'],['第三者责任保障','状态','保险服务','只读','N/A'],['续费验机','操作','设备连接','未连接禁止','按钮']],interactions:['查看两项服务状态','点击续费验机显示未连接提示','左上角返回其他设置'],state:['加载','展示','续费校验','返回'],src:'InsuranceSettingFragment · fragment_debug_insurance.xml。',edge:['无人机未连接时禁止续费'],ac:['页面只占右侧设置窗口','左侧其他设置菜单保持可见','返回箭头固定显示','两条状态及续费按钮完整']}},
 maintenance:{num:'07.16',title:'维护',source:'OtherSettingFragment · HDMaintenanceDialog',ui:()=>droneSubUI('维护','droneSettings',[['应用版本','V4.0'],['设备序列号','1234567'],['日志导出','导出'],['检查更新','检查']]),prd:{desc:'提供遥控器应用与设备维护入口。',value:'集中完成版本检查和日志处理。',fields:[['版本/序列号','只读','本机信息','只读','V4.0'],['维护操作','按钮','App维护模块','人工触发','导出']],interactions:['点击日志导出或检查更新','返回其他设置'],state:['读取信息','执行操作','反馈结果'],src:'HDMaintenanceDialog。',edge:['原型不导出真实日志、不联网更新'],ac:['维护信息与操作完整','可返回']}}
});

const fullPage=(id,title,source,rows,extra={})=>({num:id,title,source,_rows:rows,ui:()=>droneSubUI(title,'droneSettings',rows),prd:{desc:extra.desc||`${title}的完整 App 内调试页面，所有内容可上下滑动查看。`,value:extra.value||'用于设备调试、状态核对与维护。',fields:extra.fields||rows.map(r=>[String(r[0]).replace(/<[^>]+>/g,''),'状态/操作',source,'按设备能力','-']),interactions:extra.interactions||['上下滑动查看全部内容','点击设置项联动右侧字段说明','执行操作前校验设备连接','返回无人机设置'],state:extra.state||['进入页面','读取数据','调整或执行','反馈结果'],src:source,edge:extra.edge||['设备未连接时只展示空态或错误提示','原型不向真实设备写入高风险参数'],ac:extra.ac||['页面可完整滚动','每个控件有独立字段','交互均有反馈','可返回上一级']}});
// ── hardwareShell — 硬件测试外壳
function hardwareShell(body,bodyClass='hardware-black'){droneTab='hardware';return droneLayer(`${droneTabs()}<main class="drone-content hardware-sub-content"><header class="drone-head">硬件测试</header><button class="advanced-real-back" onclick="go('droneSettings')">‹</button><button class="drone-close" onclick="go('home')">×</button><div class="hardware-sub-body ${bodyClass}">${body}</div></main>`)}
// ── hardwareCells — 硬件测试单元格
function hardwareCells(rows,start=0){return rows.map((r,i)=>`<div class="hardware-data-cell clickable" data-field-id="s${start+i}" onclick="highlightField('s${start+i}',this,'prdsec2')"><span>${r[0]}:</span><span>${r[1]}</span></div>`).join('')}
// ── hardwareArtoUI — 硬件 Arto UI
function hardwareArtoUI(){const stats=['RC_SNR','SKY_SNR','RC_MCS','SKY_MCS','RC_FRE','SKY_FRE','RC_CHANNEL','SKY_CHANNEL','RC_LDPC_ERROR','SKY_LDPC_ERROR','RC_PA_GAIN_A','SKY_PA_GAIN_A','RC_PA_GAIN_B','SKY_PA_GAIN_B','RC_Receiver_image_size','SKY_Sent_image_size','RC_Receiver_rate_modulation','SKY_Sent_rate_modulation','RC_Receiver_Bandwith','SKY_Sent_Bandwith','RC_Receiver_SkyGRD','LOCK','MASOIC','vtScore','rcScore','Channel','SNR','LdpcError','HarqCount','Agc0','Agc1','Agc2','Agc3','Bitrate','Modulation','LockStatus','频段','GRD_SNR','LDPC_ERROR','RC_Error','GRD_PA','GRD_PB','SKY_PA','SKY_PB','MCS','LOCK_STATE','GPIO','飞->遥收包','飞->遥丢包','飞->遥错包','飞->遥丢率'].map(x=>[x,'---']);const controls=[['RC_RF_MAX_POWER','24dbm'],['SKY_RF_MAX_POWER_2g','24dbm'],['SKY_RF_MAX_POWER_5g','24dbm']];ACTIVE_SUB_ROWS=[['信道模式','自动 / 2.4G / 5.8G'],['版本号','---'],['升级版本','按钮'],['链路曲线','0~90'],...stats,...controls];const n=4+stats.length;return hardwareShell(`<div class="hardware-channel clickable" data-field-id="s0" onclick="highlightField('s0',this,'prdsec2')"><span>信道模式</span><button class="on" onclick="event.stopPropagation();toggleSegment(this)">自动</button><button onclick="event.stopPropagation();toggleSegment(this)">2.4G</button><button onclick="event.stopPropagation();toggleSegment(this)">5.8G</button></div><div class="hardware-version clickable" data-field-id="s1" onclick="highlightField('s1',this,'prdsec2')"><span>版本号:</span><button class="debug-pill" data-field-id="s2" onclick="event.stopPropagation();highlightField('s2',this,'prdsec3')">升级版本</button></div><div class="hardware-chart-wrap"><div class="hardware-chart clickable" data-field-id="s3" onclick="highlightField('s3',this,'prdsec2')"></div></div><div class="hardware-data-grid hardware-arto-grid">${hardwareCells(stats,4)}</div><div class="hardware-dark-controls hardware-arto-controls">${controls.map((r,i)=>`<div class="hardware-control-row hardware-step-row clickable" data-field-id="s${n+i}" onclick="highlightField('s${n+i}',this,'prdsec2')"><span>${r[0]}</span><span class="right">${dStep('24','dbm')}</span></div>`).join('')}</div>`)}
// ── hardwareWifiUI — 硬件 WiFi UI
function hardwareWifiUI(){ACTIVE_SUB_ROWS=[['SKY_FRE','---'],['SKY_RSSI','---'],['SKY_Rate_Modulation','---'],['SKY_IP','---'],['SKY_Connect_state','---'],['空白分隔','---'],['RC_FRE','---'],['RC_RSSI','---'],['RC_Rate_Modulation','---'],['RC_IP','---'],['RC_Connect_state','---'],['RC_Connect_Range','---'],['BT_FRE','---'],['BT_RSSI','---'],['BT_Rate_Modulation','---'],['BT_IP','---'],['BT_Connect_state','---'],['BT_Connect_Range','---']];return hardwareShell(`<div class="hardware-data-grid hardware-wifi-grid">${hardwareCells(ACTIVE_SUB_ROWS)}</div>`)}
// ── hardwareCellUI — 硬件单元 UI
function hardwareCellUI(){ACTIVE_SUB_ROWS=[['SIM1_Band_234G','---'],['SIM2_Band_234G','---'],['SIM1_RSSI','---'],['SIM2_RSSI','---'],['SIM1_Communication_operator','---'],['SIM2_Communication_operator','---']];return hardwareShell(`<div class="hardware-data-grid hardware-cell-grid">${hardwareCells(ACTIVE_SUB_ROWS)}</div>`)}
// ── hardwareNewDataUI — 硬件新数据 UI
function hardwareNewDataUI(){const rows=[['摄像头FPS设置','20','step'],['摄像头GOP设置','5','step'],['摄像头码率设置','2000','step'],['摄像头QP设置','26','step'],['CamLandPitch','0','step'],['CamNolmalPitch','-90','step'],['主控存视频','关闭','switch'],['主控存视频2','打开 / 关闭','actions'],['防抖等级','1','step'],['裁减比例','90','step'],['防抖模式','2','step'],['防抖开关','开启','switch'],['畸变矫正开关','开启','switch'],['运动物体级别','0','step'],['果冻效应矫正','0','step'],['防抖强度','1024','step'],['时间延时','2856','step'],['命令参数','50001 / 0.00 × 7','command'],['发送到AI','开启','switch'],['功率设置','关闭','switch'],['降落圈向下偏移补偿','开启','switch']];ACTIVE_SUB_ROWS=rows.map(r=>[r[0],r[1]]);const normal=rows.slice(0,17).map((r,i)=>{let control=r[2]==='step'?dStep(r[1]):r[2]==='switch'?dSwitch(r[1]==='开启'):`<span class="p401-save-actions"><button onclick="event.stopPropagation();highlightField('s${i}',this,'prdsec3')">打开</button><button onclick="event.stopPropagation();highlightField('s${i}',this,'prdsec3')">关闭</button></span>`;return `<div class="p401-row ${r[2]==='switch'?'p401-switch-row':''} clickable" data-field-id="s${i}" onclick="highlightField('s${i}',this,'prdsec2')"><span>${r[0]}</span><span class="right">${control}</span></div>`}).join('');return hardwareShell(`${normal}<div class="p401-command clickable" data-field-id="s17" onclick="highlightField('s17',this,'prdsec2')"><input value="50001"><input value="0.00"><input value="0.00"><input value="0.00"><input value="0.00"><input value="0.00"><input value="0.00"><input value="0.00"><button class="setting-switch on" onclick="event.stopPropagation();this.classList.toggle('on');highlightField('s18',this,'prdsec2')"></button><button class="p401-send" onclick="event.stopPropagation();highlightField('s17',this,'prdsec3')">Send</button></div><div class="p401-row p401-switch-row clickable" data-field-id="s19" onclick="highlightField('s19',this,'prdsec2')"><span>功率设置</span><span class="right">${dSwitch(false)}</span></div><div class="p401-row p401-switch-row clickable" data-field-id="s20" onclick="highlightField('s20',this,'prdsec2')"><span>降落圈向下偏移补偿</span><span class="right">${dSwitch(true)}</span></div>`,'hardware-black hardware-newdata p401-real')}
// ── hardwareP2pUI — 硬件 P2P UI
function hardwareP2pUI(){ACTIVE_SUB_ROWS=[['无人机4g通道','关闭'],['禁用无人机P2P通道','按钮'],['恢复无人机P2P通道','按钮'],['遥控P2P通道','开启'],['sim卡状态','无上报时隐藏'],['服务器状态','无上报时隐藏'],['4g卡信号','无上报时隐藏'],['4g信号干扰情况','无上报时隐藏'],['4g信噪比','无上报时隐藏'],['4g信号强度','无上报时隐藏'],['4g卡误码率','无上报时隐藏'],['无人机单向延迟','无上报时隐藏'],['无人机单向延迟(subs)','无上报时隐藏'],['遥控器单向延迟','无上报时隐藏'],['双端延迟','无上报时隐藏'],['4g通道使用状态','无上报时隐藏'],['4g数传接收数据状态','无上报时隐藏'],['4g图传接收数据状态','无上报时隐藏'],['4g图传启动状态','无上报时隐藏'],['4g限制','无上报时隐藏'],['IMEI','无上报时隐藏'],['ICCID','无上报时隐藏'],['Version','无上报时隐藏'],['刷新时间','无上报时隐藏']];return hardwareShell(`<div class="p2p-real-row clickable" data-field-id="s0" onclick="highlightField('s0',this,'prdsec2')"><span>无人机4g通道</span>${dSwitch(false)}</div><div class="p2p-real-actions"><button class="clickable" data-field-id="s1" onclick="highlightField('s1',this,'prdsec3')">禁用无人机P2P通道</button><button class="clickable" data-field-id="s2" onclick="highlightField('s2',this,'prdsec3')">恢复无人机P2P通道</button></div><div class="p2p-real-row clickable" data-field-id="s3" onclick="highlightField('s3',this,'prdsec2')"><span>遥控P2P通道</span>${dSwitch(true)}</div><div class="p2p-real-status" aria-hidden="true">${hardwareCells(ACTIVE_SUB_ROWS.slice(4),4)}</div>`,'hardware-white p2p-real')}
// ── radarShell — 雷达外壳
function radarShell(body){droneTab='radarDebug';return droneLayer(`${droneTabs()}<main class="drone-content radar-sub-content"><header class="drone-head">雷达调试</header><button class="advanced-real-back" onclick="go('droneSettings')">‹</button><button class="drone-close" onclick="go('home')">×</button><div class="radar-sub-body">${body}</div></main>`)}
// ── otherDebugShell — 其他调试外壳
function otherDebugShell(body,rows=[]){droneTab='otherDebug';ACTIVE_SUB_ROWS=rows;return droneLayer(`${droneTabs()}<main class="drone-content radar-sub-content"><header class="drone-head">其他调试</header><button class="advanced-real-back" onclick="go('droneSettings')">‹</button><button class="drone-close" onclick="go('home')">×</button><div class="other-sub-body">${body}</div></main>`)}
// ── swirlDebugUI — 漩涡调试 UI
function swirlDebugUI(){const rows=[['离心喷头1','状态'],['离心喷头2','状态'],['离心喷头3','状态'],['离心喷头4','状态'],['作业模式',debugSelect('999',['999'])],['油门1',dStep('1150')],['油门2',dStep('1150')],['N1',dSwitch(false)],['N2',dSwitch(false)],['N3',dSwitch(false)],['N4',dSwitch(false)]];const spray=[1,2,3,4].map((n,i)=>`<span class="name clickable" data-field-id="s${i}" onclick="highlightField('s${i}',this,'prdsec2')">离心喷头${n}</span><span></span><span></span><span></span><span></span>`).join('');const nMap=[['N2',8],['N1',7],['N3',9],['N4',10]];return otherDebugShell(`<div class="swirl-status"><span></span><span class="head">电机转速</span><span class="head">逻辑状态</span><span class="head">电机子状态</span><span class="head">电机状态</span>${spray}</div><div class="swirl-controls"><div class="swirl-mode clickable" data-field-id="s4" onclick="highlightField('s4',this,'prdsec2')"><span>作业模式</span>${bindControlFields(debugSelect('999',['999']),4,'s')}</div><div class="swirl-throttles">${[5,6].map((i,j)=>`<div class="swirl-throttle clickable" data-field-id="s${i}" onclick="highlightField('s${i}',this,'prdsec2')"><span>油门${j+1}</span><span class="right">${bindControlFields(dStep('1150'),i,'s')}</span></div>`).join('')}</div></div><div class="swirl-n">${nMap.map(x=>`<span class="clickable" data-field-id="s${x[1]}" onclick="highlightField('s${x[1]}',this,'prdsec2')">${x[0]}${bindControlFields(dSwitch(false),x[1],'s')}</span>`).join('')}</div>`,rows)}
// ── fcParamsUI — 飞控参数 UI
function fcParamsUI(){const params=[['ATTI_CTRL_P','0.100'],['ATTI_CTRL_I','0.000'],['ATTI_CTRL_D','0.000'],['ATTI_CTRL_DAMP','0.000'],['ATTI_CTRL_FF','0.000'],['ATTI_CTRL_GAIN','4.000'],['ATTI_CTRL_ACCMAX','100']];return otherDebugShell(`<div class="param-debug-list">${params.map((r,i)=>`<div class="param-debug-row clickable" data-field-id="s${i}" onclick="highlightField('s${i}',this,'prdsec2')"><span>${r[0]}</span><span class="right">${bindControlFields(dStep(r[1]),i,'s')}</span></div>`).join('')}</div>`,params.map(r=>[r[0],dStep(r[1])]))}
// ── rcDebugUI — RC 调试 UI
function rcDebugUI(){const rows=[['风扇','0'],['震动开关','关闭'],['红灯开关','关闭'],['绿灯开关','关闭'],['SystemLauncher','按钮'],['GcsLauncher','按钮'],['选择时间','系统时间'],['继续作业不重传航线','关闭'],['Reset MC','按钮'],['国家码','无'],['当前遥控器CPU温度','44.638'],['调用启航返航算法','开启'],['电台类型','HX'],['平台接口类型','正式环境'],['编辑绘制换行喷洒颜色','关闭']];const extra=[['继续作业不重传航线',7,dSwitch(false)],['Reset MC',8,'<button>Reset MC</button>'],['国家码',9,debugSelect('无',['无'])],['当前遥控器CPU温度',10,'44.638'],['调用启航返航算法',11,dSwitch(true)],['电台类型',12,'HX'],['平台接口类型',13,debugSelect('正式环境',['正式环境'])],['编辑绘制换行喷洒颜色',14,dSwitch(false)]];return otherDebugShell(`<div class="rc-debug-real"><div class="rc-debug-note">小于90:关, 90-100:小, 100-115:中, 大于115:大</div><div class="rc-fan clickable" data-field-id="s0" onclick="highlightField('s0',this,'prdsec2')"><span>风扇:</span><span>0</span></div><div class="rc-scale"><span>0.0</span><span>255.0</span></div>${['震动开关','红灯开关','绿灯开关'].map((x,j)=>{const i=j+1;return `<div class="rc-switch-row clickable" data-field-id="s${i}" onclick="highlightField('s${i}',this,'prdsec2')"><span>${x}</span>${bindControlFields(dSwitch(false),i,'s')}</div>`}).join('')}<div class="rc-launchers">${bindControlFields('<button>SystemLauncher</button>',4,'s')}${bindControlFields('<button>GcsLauncher</button>',5,'s')}</div><div class="rc-time clickable" data-field-id="s6" onclick="highlightField('s6',this,'prdsec2')"><span>选择时间</span>${bindControlFields('<button>设置为系统时间</button>',6,'s')}</div>${extra.map(x=>`<div class="rc-extra-row clickable" data-field-id="s${x[1]}" onclick="highlightField('s${x[1]}',this,'prdsec2')"><span>${x[0]}</span><span class="right">${bindControlFields(x[2],x[1],'s')}</span></div>`).join('')}</div>`,rows)}
// ── otherParamsUI — 其他参数 UI
function otherParamsUI(){const speedToggle=`<button class="setting-switch" onclick="this.classList.toggle('on');this.closest('.other-speed-row')?.classList.toggle('enabled',this.classList.contains('on'))"></button>`,speedStep=dStep('22.4','英里/小时'),wifiToggle=dSwitch(true),rows=[['无人机类型',debugSelect('540',['540'])],['无人机总飞行时长','00'],['上传维保时长','00'],['RemoteId 临时开关','<button>开</button><button>关</button>'],['当前RemoteId','<button>刷新</button>'],['最大速度',speedToggle+speedStep],['解锁关闭WIFI(仅国内,海外不关WIFI)',wifiToggle]];const row=(i,cls,html)=>`<div class="${cls} clickable" data-field-id="s${i}" onclick="highlightField('s${i}',this,'prdsec2')">${html}</div>`;return otherDebugShell(`<div class="other-param-real">${row(0,'other-param-row',`<span>无人机类型</span><span class="right">${bindControlFields(debugSelect('540',['540']),0,'s')}</span>`)}${row(1,'other-param-row','<span>无人机总飞行时长</span><span class="right">00</span>')}${row(2,'other-param-row','<span>上传维保时长</span><span class="right">00</span>')}${row(3,'other-param-actions',`<span class="label">RemoteId 临时开关</span>${bindControlFields('<button class="teal-pill">开</button><button class="teal-pill">关</button>',3,'s')}`)}${row(4,'other-param-actions',`${bindControlFields('<button class="teal-pill">刷新</button>',4,'s')}<span>当前RemoteId:</span>`)}${row(5,'other-speed-row',`<span>最大速度</span>${bindControlFields(`<span class="other-speed-enable">${speedToggle}</span><span class="other-speed-step">${speedStep}</span>`,5,'s')}`)}${row(6,'other-wifi-row',`<span>解锁关闭WIFI(仅国内,海外不关WIFI)</span><span class="right">${bindControlFields(wifiToggle,6,'s')}</span>`)}</div>`,rows)}
// ── mcuDebugUI — MCU 调试 UI
function mcuDebugUI(){const a=`最大最小ADC:\ncalibrateState=1\n,leftVerticalUp=0.32061768, leftVerticalMedian=1.6004479,\nleftVerticalDown=2.8440673\n,leftHorizontalDown=0.40360108, leftHorizontalMedian=1.6546702,\nleftHorizontalUp=2.8870678\n,rightVerticalUp=0.2655469, rightVerticalMedian=1.4874775,\nrightVerticalDown=2.7007325\n,rightHorizontalDown=0.17351075, rightHorizontalMedian=1.4935125,\nrightHorizontalUp=2.5423095\n,gapEdgePercent=0.1, gapMedianPercent=0.1, rockerMode=0, version='0.0.0.31'}\n(2.46555， 2.5145478) ***(2.3354547，0.5288306),`;const b=`实时ADC:\nGPIOS=0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,1,0,1,1,0,1,1,1,1,1,0,0,1,\n,ADC3=1.6340185, ADC4=1.6822999\n,ADC5=1.470315, ADC6=1.4740869\n,ADC0=0.010561523}`;const c=`SBusPacket{, pitch=1500, roll=1500, thrust=1500, yaw=1500, flightMode=1500, pumpOnOFF=1000, traverseForward=1000, traverseRight=1000, traversePressed=1000, traverseLeft=1000, traverseBackward=1000, emergencyStop=1000, reserve1=1000, reserve2=0, returnToHome=1000, reserve3=0, digital=0, channel18=1000, channel19=1000, channel20=1000, channel21=1000, channel22=1000, channel23=1000, channel24=1000, channel25=1000, channel26=1000, channel27=1000, system=4787604, CRC16=[B@f7753ac}`;return otherDebugShell(`<div class="mcu-real">${[a,b,c].map((x,i)=>`<div class="mcu-block clickable" data-field-id="s${i}" onclick="highlightField('s${i}',this,'prdsec2')">${x}</div>`).join('')}</div>`,[['最大最小ADC','实时'],['实时ADC','实时'],['SBusPacket','实时']])}
// ── tpDebugUI — TP 调试 UI
function tpDebugUI(){return otherDebugShell(`<div class="tp-real"><span class="clickable" data-field-id="s0" onclick="highlightField('s0',this,'prdsec2')">${bindControlFields('<button>读取配置</button>',0,'s')}</span><div class="tp-line"></div></div>`,[['读取配置','按钮']])}
// ── morningDebugUI — 晨间调试 UI
function morningDebugUI(){return otherDebugShell(`<div class="morning-real"><div class="morning-row actions clickable" data-field-id="s0" onclick="highlightField('s0',this,'prdsec2')"><span>宸芯log开关</span>${bindControlFields('<button class="teal-pill">开</button><button class="teal-pill">关</button>',0,'s')}</div>${[['遥控功率','27',1],['主控功率','27',2]].map(x=>`<div class="morning-row clickable" data-field-id="s${x[2]}" onclick="highlightField('s${x[2]}',this,'prdsec2')"><span>${x[0]}</span><span class="right">${bindControlFields(dStep(x[1]),x[2],'s')}</span></div>`).join('')}<div class="morning-row clickable" data-field-id="s3" onclick="highlightField('s3',this,'prdsec2')"><span>[, ^DAPI: "CDB018D8", ]</span></div></div>`,[['宸芯log开关','开/关'],['遥控功率','27'],['主控功率','27'],['设备信息','CDB018D8']])}
// ── debugAuthUI — 调试授权 UI
function debugAuthUI(){const rows=[['认证状态','当前是否使用调试ID：没有使用'],['无人机ID','<input placeholder="输入无人机ID">'],['遥控ID','<input placeholder="输入遥控ID">'],['主控ID','<input placeholder="输入主控ID">'],['重置','<button>重置</button>'],['确定','<button>确定</button>']];return otherDebugShell(`<div class="debug-auth-real"><div class="debug-auth-status clickable" data-field-id="s0" onclick="highlightField('s0',this,'prdsec2')">当前是否使用调试ID：没有使用</div>${[['无人机ID','输入无人机ID',1],['遥控ID','输入遥控ID',2],['主控ID','输入主控ID',3]].map(x=>`<label class="debug-auth-row clickable" data-field-id="s${x[2]}" onclick="highlightField('s${x[2]}',this,'prdsec2')"><span>${x[0]}</span>${bindControlFields(`<input placeholder="${x[1]}">`,x[2],'s')}</label>`).join('')}<div class="debug-auth-actions">${bindControlFields('<button>重置</button>',4,'s')}${bindControlFields('<button>确定</button>',5,'s')}</div></div>`,rows)}
// ── otherRemoteIdUI — 其他 Remote ID UI
function otherRemoteIdUI(){const authSelect=debugSelect('特定认证方式',['无身份验证','美国ASTM','欧盟ASD-STAN','日本DIPS','中国民航','特定认证方式']);const rows=[['remoteID开关',dSwitch(true)],['remoteID授权时间','N/A'],['remoteID授权类型',authSelect],['remoteID授权码','<input maxlength="24" placeholder="请输入授权码">'],['授权','<button>授权</button>']];return otherDebugShell(`<div class="remote-id-real"><div class="remote-id-row clickable" data-field-id="s0" onclick="highlightField('s0',this,'prdsec2')"><span>remoteID开关</span><span class="right">${bindControlFields(dSwitch(true),0,'s')}</span></div><div class="remote-id-row clickable" data-field-id="s1" onclick="highlightField('s1',this,'prdsec2')"><span>remoteID授权时间</span><span class="remote-id-time">N/A</span></div><div class="remote-id-row clickable" data-field-id="s2" onclick="highlightField('s2',this,'prdsec2')"><span>remoteID授权类型</span><span class="right">${bindControlFields(authSelect,2,'s')}</span></div><label class="remote-id-row clickable" data-field-id="s3" onclick="highlightField('s3',this,'prdsec2')"><span>remoteID授权码</span>${bindControlFields('<input class="remote-id-code" maxlength="24" placeholder="请输入授权码">',3,'s')}</label><div class="remote-id-action">${bindControlFields('<button>授权</button>',4,'s')}</div></div>`,rows)}
// ── radarRangeChart — 雷达距离图
function radarRangeChart(){const bars=Array.from({length:30},(_,i)=>{const x=27+i*20.25;return `<rect class="radar-bar" x="${x}" y="8" width="4" height="244" rx="2"/><text class="radar-index" x="${x+2}" y="276">${i+1}</text>`}).join('');return `<svg class="radar-range-svg" viewBox="0 0 650 675" preserveAspectRatio="none" aria-label="实时雷达距离图"><g>${bars}</g><line class="radar-divider" x1="10" y1="291" x2="650" y2="291"/><g><text class="radar-axis" x="1" y="404">40</text><line class="radar-grid-line" x1="10" y1="400" x2="607" y2="400"/><text class="radar-axis" x="1" y="484">30</text><line class="radar-grid-line" x1="10" y1="480" x2="607" y2="480"/><text class="radar-axis" x="1" y="564">20</text><line class="radar-grid-line" x1="10" y1="560" x2="607" y2="560"/><text class="radar-axis" x="1" y="644">10</text><line class="radar-grid-line" x1="10" y1="640" x2="607" y2="640"/><text class="radar-axis" x="1" y="672">0</text></g></svg>`}
// ── radarMainBody — 雷达主体
function radarMainBody(){return `<div class="radar-main"><div class="radar-main-actions"><button onclick="go('frontRadarParams')">v2前雷达参数设置</button><button onclick="go('rotateRadarParams')">旋转雷达参数设置</button><button onclick="go('radarDistanceDetail')">雷达球</button></div><div class="radar-main-row clickable" data-field-id="r3" onclick="selectDroneField(3,'prdsec2',this)"><span>打开显示雷达前向距离，关闭显示后向距离:</span>${dSwitch(true)}</div><div class="radar-main-row clickable" data-field-id="r4" onclick="selectDroneField(4,'prdsec2',this)"><span>遥控器打的静态障碍物,是否要发给飞控</span>${dSwitch(false)}</div><div class="radar-preview">${radarRangeChart()}</div></div>`}
// ── radarControl — 雷达控制
function radarControl(kind,value,options=[]){if(kind==='select')return debugSelect(value,options.length?options:[value]);if(kind==='switch')return dSwitch(value===true);if(kind==='text')return `<span class="radar-id-value">${value}</span>`;return dStep(String(value),options||'')}
// ── radarParamRows — 雷达参数行
function radarParamRows(rows){return rows.map((r,i)=>`<div class="radar-param-row ${r[1]==='text'?'radar-id-row':''} clickable" data-field-id="s${i}" onclick="highlightField('s${i}',this,'prdsec2')"><span>${r[0]}</span><span class="right">${radarControl(r[1],r[2],r[3])}</span></div>`).join('')}
// ── radarParamUI — 雷达参数 UI
function radarParamUI(rows){ACTIVE_SUB_ROWS=rows.map(r=>[r[0],String(r[2])]);return radarShell(`<div class="radar-param-list">${radarParamRows(rows)}</div>`)}
// ── frontRadarUI — 前雷达 UI
function frontRadarUI(){return radarParamUI([
 ['避障-基带模式','select','正常',['正常','测试']],['避障-触发模式','select','角度触发',['角度触发','时间触发','固定角度']],['避障-触发角度间隔','step',0],['避障-时间间隔毫秒','step',5000],['避障-零度偏移','step',0],['避障-输入日志类型','step',0],['避障-雷达是否触发校准','switch',false],['避障-adc日志存储标志','switch',false],['避障-使用默认固定校准数据','switch',false],['避障-目标数据存在标志','switch',false],['避障-dbf阈值','step',0],['避障-ncc动态阈值1','step',0],['避障-ncc动态阈值2','step',0],['避障-ncc动态阈值3','step',0],['避障-ncc动态阈值4','step',0],['仿地-基带模式','select','正常',['正常','测试']],['仿地-时间间隔毫秒','step',100],['仿地-输入日志类型','step',0],['仿地-雷达是否触发校准','switch',false],['仿地-adc日志存储标志','switch',false],['仿地-hfrWindowSize','step',0],['仿地-hfrGuardInterval','step',0],['仿地-hfrDopplerRsl','step',0],['仿地-hfrThresholdF','step',0],['仿地-hfrThresholdFN','step',0],['仿地-hfrNThreshold1','step',0],['仿地-hfrNThreshold2','step',0],['仿地-hfrNThreshold3','step',0],['仿地-hfrNThreshold4','step',0]
 ])}
// ── rotateRadarUI — 旋转雷达 UI
function rotateRadarUI(){const rows=[['雷达WiFi信息读取','switch',false],['旋转雷达整机id:','text',''],['旋转雷达定子电调单板id:','text',''],['旋转雷达定高单板id:','text',''],['旋转雷达避障单板id:','text',''],['radarFAngle','step',45,'度'],['radarFSpeed','step','2.0','m/s'],['radarFRange','step',10,'m'],['关闭雷达告警','switch',false]];ACTIVE_SUB_ROWS=[...rows.map(r=>[r[0],String(r[2])]),['雷达校准参数修正','修正按钮']];return radarShell(`<div class="radar-param-list">${radarParamRows(rows)}<div class="radar-calibration">雷达校准参数修正<button class="clickable" data-field-id="s9" onclick="highlightField('s9',this,'prdsec3')">修 正</button></div></div>`)}
// ── radarBallUI — 雷达球 UI
function radarBallUI(){ACTIVE_SUB_ROWS=[['雷达距离球','一个圈5米，最大30米'],['信号强度','0-22 / 23-26 / 27-31 / 大于31 db'],['前后雷达','后雷达/前雷达']];return radarShell(`<div class="radar-ball"><div class="radar-ball-rings"></div><div class="radar-ball-info"><strong>说明：一个圈代表5米,最大30米</strong><strong>雷达点信号强度颜色说明：</strong><div class="radar-ball-legend"><i style="background:#d2ff94"></i><span>0-22 db</span><i style="background:#ffd400"></i><span>23-26 db</span><i style="background:#ff9b70"></i><span>27-31 db</span><i style="background:#c64400"></i><span>大于31 db</span></div></div><div class="radar-ball-toggle"><span>后雷达:</span>${dSwitch(true)}<span>:前雷达</span></div></div>`)}
Object.assign(SCREENS,{
 gpsSnrDetail:fullPage('07.20.1','飞控卫星信噪比','DebugGpsStatusFragment2',[['卫星列表','暂无卫星数据'],['PRN','-'],['已使用','-'],['高度角','-'],['方位角','-'],['SNR','-']]),
 gcsSatellite:{num:'07.20.2',title:'遥控器卫星信噪比',source:'DebugGcsGpsStatusFragment · fragment_debug_gcs_gps_status.xml · 真机截图',ui:gcsSatelliteUI,prd:{desc:'在定位信息设置窗口内部展示遥控器卫星信噪比双层图表，不进入全屏页面。',value:'查看遥控器当前卫星数量、平均信噪比和每颗卫星的信号强度。',fields:[['当前卫星数','整数','GNSS回报','只读','8'],['平均信噪比','数值','GNSS回报','只读','11'],['上半区卫星信噪比','图表','DebugGcsGpsStatusFragment','动态','4颗'],['下半区卫星信噪比','图表','DebugGcsGpsStatusFragment','动态','4颗'],['SNR色标','分段色阶','固定图例','0/10/20/30/50','红到绿']],interactions:['查看当前卫星数和平均信噪比','查看上下两组卫星柱状图','按底部SNR色标判断信号质量','点击左上返回定位信息'],state:['进入子页面','订阅GNSS数据','刷新图表','返回定位信息'],src:'DebugGcsGpsStatusFragment · 真机截图',edge:['没有卫星时图表为空','页面始终保留左侧菜单、定位信息标题和关闭按钮'],ac:['子页面保持在设置窗口内','标题仍为定位信息','左上返回箭头悬浮显示','黑底双层图表和SNR色标与真机一致']}},
 hardwareArto:{num:'07.22.1',title:'图数传硬件信息',source:'DebugP401InfoFragment / DebugP201InfoFragment · 真机截图',ui:hardwareArtoUI,prd:{desc:'在硬件测试设置窗口内展示图数传信道、版本、曲线、链路状态及模块调试参数。',value:'检查图数传硬件链路和模块状态。',fields:[['图数传详情','状态/操作','P401/P201模块','动态','完整长页面']],interactions:['切换信道','查看曲线与双列状态','调节功率','执行模块操作','返回硬件测试'],state:['进入','订阅状态','调整或执行','返回'],src:'DebugP401InfoFragment / DebugP201InfoFragment',edge:['页面可滚动','原型不写真实模块参数'],ac:['标题保持硬件测试','黑底布局与真机一致','页面保持在设置窗口内']}},
 hardwareGps:fullPage('07.22.2','GPS硬件信息','DebugGpsInfoFragment',[['模块型号','-'],['固件版本','-'],['串口状态','-'],['卫星数量','0'],['定位状态','未定位'],['刷新','<button class="debug-action">刷新</button>']]),
 hardwareWifi:{num:'07.22.3',title:'WIFI_BT信息',source:'DebugWifiBtInfoFragment · 真机截图',ui:hardwareWifiUI,prd:{desc:'黑底双列展示天空端、遥控器WIFI和蓝牙频率、信号、速率、IP与连接状态。',value:'检查无线与蓝牙硬件链路。',fields:[['无线状态','双列只读','DebugWifiBtInfoFragment','18项','---']],interactions:['查看双列状态','滚动查看全部内容','返回硬件测试'],state:['进入','读取','显示','返回'],src:'DebugWifiBtInfoFragment',edge:['无回报显示---'],ac:['18项完整','窗口内显示']}},
 hardwareCell:{num:'07.22.4',title:'2_3_4G信息',source:'Debug234GInfoFragment · 真机截图',ui:hardwareCellUI,prd:{desc:'黑底双列展示两张SIM卡的网络制式、信号和运营商。',value:'检查蜂窝网络硬件状态。',fields:[['SIM状态','双列只读','Debug234GInfoFragment','6项','---']],interactions:['查看SIM1和SIM2状态','返回硬件测试'],state:['进入','读取','显示'],src:'Debug234GInfoFragment',edge:['无服务显示---'],ac:['6项完整','窗口内显示']}},
 hardwareNewData:{num:'07.22.6',title:'P401新数传',source:'DebugNewDataInfoFragment · fragment_debug_new_data_info.xml · 真机截图',ui:hardwareNewDataUI,prd:{desc:'黑底长页面展示摄像头、稳像、命令与功率相关调试参数。',value:'调试P401新数传及相机链路。',fields:[['新数传参数','数值/开关/命令','DebugNewDataInfoFragment','18项','动态']],interactions:['使用加减按钮调整参数','切换功能开关','编辑并发送命令','上下滚动','返回硬件测试'],state:['进入','读取','调整','反馈'],src:'DebugNewDataInfoFragment',edge:['原型不向设备发命令'],ac:['首屏六项与真机一致','后续参数完整','窗口内滚动']}},
 hardwareP2p:{num:'07.22.7',title:'4gP2P',source:'Debug4gP2PFragment · fragment_debug_4g_p2p.xml · 真机截图',ui:hardwareP2pUI,prd:{desc:'白底展示无人机4G通道、遥控P2P通道及蜂窝链路状态。',value:'诊断和控制4G P2P链路。',fields:[['P2P参数','开关/按钮/状态','Debug4gP2PFragment','24项','动态']],interactions:['切换两项通道','禁用或恢复无人机P2P','查看下方完整状态','返回硬件测试'],state:['进入','读取','控制','刷新'],src:'Debug4gP2PFragment',edge:['原型不修改真实通道'],ac:['顶部控件与真机一致','状态完整可滚动','窗口内显示']}},
 frontRadarParams:{num:'07.24.1',title:'V2前雷达参数设置',source:'DebugV2FrontRadarParameterFragment · fragment_debug_v2_front_radar_parameter.xml · 真机截图',ui:frontRadarUI,prd:{desc:'雷达调试窗口内的V2前雷达完整参数长页面。',value:'调试避障和仿地雷达底层参数。',fields:[['V2前雷达参数','下拉/步进/开关','DebugV2FrontRadarParameterFragment','29项','动态']],interactions:['滚动查看全部参数','调整步进项与开关','读取或设置参数','返回雷达调试'],state:['进入','读取','调整','反馈'],src:'fragment_debug_v2_front_radar_parameter.xml',edge:['原型不写真实雷达参数'],ac:['标题保持雷达调试','窗口内滚动','真实字段完整']}},
 rotateRadarParams:{num:'07.24.2',title:'旋转雷达参数设置',source:'DebugRotatingRadarParameterFragment · fragment_debug_rotating_radar_parameter.xml · 真机源码',ui:rotateRadarUI,prd:{desc:'雷达调试窗口内的旋转雷达参数长页面。',value:'检查和调试旋转雷达CFAR、阈值、板卡ID及校准参数。',fields:[['旋转雷达参数','步进/开关/状态','DebugRotatingRadarParameterFragment','30项','动态']],interactions:['滚动查看全部参数','读取WiFi与板卡ID','调整阈值','读取或设置','返回雷达调试'],state:['进入','读取','调整','反馈'],src:'fragment_debug_rotating_radar_parameter.xml',edge:['原型不下发真实参数'],ac:['标题不变','窗口内显示','字段与源码一致']}},
 radarDistanceDetail:{num:'07.24.3',title:'雷达球',source:'DebugRadarSnrFragment · fragment_debug_radar_snr.xml · 真机截图',ui:radarBallUI,prd:{desc:'雷达调试窗口内显示雷达距离圆环、回波强度颜色图例和前后雷达切换。',value:'直观看到0~30米内雷达点及信号强度。',fields:[['距离圆环','图表','DebugRadarSnrFragment','每圈5米','最大30米'],['信号强度','四色图例','雷达回报','4档','db'],['前后雷达','开关','DebugRadarSnrFragment','布尔','前雷达']],interactions:['查看距离圆环','按颜色判断信号强度','切换前后雷达','返回雷达调试'],state:['进入','订阅雷达点','刷新','返回'],src:'fragment_debug_radar_snr.xml · 真机截图',edge:['无回报时只显示圆环和图例'],ac:['黑底布局与真机一致','标题保持雷达调试','窗口内显示']}},
 oldMotorDebug:{num:'07.27.1',title:'旧的电机诊断界面',source:'DebugEscFragment · fragment_debug_esc.xml · 真机截图',ui:oldMotorUI,prd:{desc:'电机诊断窗口内的旧版PWM诊断页面。',value:'查看和调试多路电机PWM、运行周期及诊断模式。',fields:[['旧版PWM诊断','输入/柱图/开关','DebugEscFragment','多路','动态']],interactions:['调整PWM最高值和周期','查看6路柱状控制','切换全选和999诊断','选择电调号','返回电机诊断'],state:['进入','调整','诊断','返回'],src:'fragment_debug_esc.xml · 真机截图',edge:['原型不驱动真实电机'],ac:['标题保持电机诊断','窗口内显示','左上返回固定']}},
 swirlDebug:{num:'07.28.1',title:'离心喷头',source:'DebugSwirlAtomizerFragment · 真机截图',ui:swirlDebugUI,prd:{desc:'其他调试窗口内的离心喷头状态和油门调试页。',value:'查看四路离心喷头状态并调节作业模式及油门。',fields:[['离心喷头调试','状态/枚举/步进','DebugSwirlAtomizerFragment','完整页面','动态']],interactions:['查看四路状态','选择作业模式','调节油门1/2','切换N1-N4','返回其他调试'],state:['进入','读取','调整','反馈'],src:'真机截图',edge:['原型不驱动真实喷头'],ac:['黑底布局','标题保持其他调试','窗口内显示','悬浮返回']}},
 fcParams:{num:'07.28.2',title:'飞控参数调试',source:'DebugFcParameterFragment · 真机截图',ui:fcParamsUI,prd:{desc:'其他调试窗口内的飞控PID参数长页面。',value:'调试飞控控制参数。',fields:[['飞控参数','步进参数','DebugFcParameterFragment','长列表','动态']],interactions:['上下滚动','加减调整参数','返回其他调试'],state:['进入','读取','调整','反馈'],src:'真机截图',edge:['原型不写真实飞控参数'],ac:['黑底参数列表','标题保持其他调试','窗口内滚动']}},
 debugAuth:{num:'07.28.3',title:'调试认证',source:'DebugAuthentication · fragment_debug_authentication.xml',ui:debugAuthUI,prd:{desc:'其他调试窗口内的调试ID认证页面。',fields:[['认证状态','只读','DebugAuthentication','动态','没有使用'],['无人机ID','文本','DebugAuthentication','510开头',''],['遥控ID','文本','DebugAuthentication','514开头',''],['主控ID','文本','DebugAuthentication','长度校验',''],['重置','按钮','DebugAuthentication','人工确认',''],['确定','按钮','DebugAuthentication','校验三项ID','']],interactions:['输入无人机、遥控器和主控ID','重置输入','确认并校验调试ID','返回其他调试'],state:['进入','输入','校验','反馈'],src:'fragment_debug_authentication.xml',edge:['ID长度或前缀错误时提示','原型不修改真实调试ID'],ac:['黑底布局与源码一致','三项输入与双按钮完整','窗口内显示']}},
 rcParams:{num:'07.28.4',title:'遥控器调试',source:'DebugParameterRcFragment · 真机截图',ui:rcDebugUI,prd:{desc:'其他调试窗口内的遥控器调试页。',fields:[['风扇和灯光','状态/开关','DebugParameterRcFragment','动态','当前值'],['启动器与时间','操作','DebugParameterRcFragment','人工触发','-']],interactions:['控制震动与灯光','切换启动器','设置系统时间','返回'],state:['进入','读取','调整'],src:'真机截图',edge:['原型不控制真实硬件'],ac:['黑底布局','字体间距与真机一致','窗口内显示']}},
 otherParams:{num:'07.28.5',title:'其他调试',source:'DebugOtherFragment · fragment_debug_setting_other.xml · 真机截图',ui:otherParamsUI,prd:{desc:'无人机类型、RemoteId、最大速度与解锁关闭WIFI参数调试页。',fields:[['无人机类型','枚举','debug_uav_type','机型列表','540'],['无人机总飞行时长','只读状态','uav_fly_total_time','动态','00'],['上传维保时长','只读状态','uav_fly_lastMaintenanceTime','动态','00'],['RemoteId 临时开关','操作','btnRemoteIdOpen / Close','设备状态','开/关'],['当前RemoteId','操作/只读','btnRemoteIdRefresh / tvRemoteId','刷新后读取',''],['最大速度','布尔+数值','switchSpeedMax / hdSeekBarSpeedMax','开关开启后允许调整','关闭 · 22.4英里/小时'],['解锁关闭WIFI(仅国内,海外不关WIFI)','布尔','switch_debug_arm_close_wifi','仅国内生效','开启']],interactions:['选择机型','切换RemoteId','刷新当前RemoteId','启用或关闭最大速度限制','最大速度开启后加减调整','切换解锁关闭WIFI','返回'],state:['进入','读取','调整','反馈'],src:'DebugOtherFragment · fragment_debug_setting_other.xml · 真机截图',edge:['最大速度开关关闭时右侧数值控件禁用','海外区域解锁后不关闭WIFI','原型不写真实参数'],ac:['黑底布局','最大速度开关与数值控件分列','解锁关闭WIFI行完整且默认开启','字段与交互说明逐项联动','窗口内显示']}},
 remoteId:fullPage('07.28.6','Remote ID设置','RemoteIdSettingFragment',[['Remote ID开关',dSwitch(false)],['广播状态','未连接'],['设备ID','-'],['详细信息','<button class="chev" onclick="go(\'remoteIdDetail\')">›</button>']]),
 remoteIdDetail:fullPage('07.28.6.1','Remote ID详细信息','RemoteIdDetailFragment',[['设备序列号','-'],['经度','-'],['纬度','-'],['高度','-'],['速度','-'],['航向','-']]),
 mcuControl:{num:'07.28.7',title:'遥控器MCU相关',source:'DebugControlMCUFragment · 真机截图',ui:mcuDebugUI,prd:{desc:'遥控器MCU实时ADC和SBus数据页。',fields:[['MCU实时数据','只读文本','DebugControlMCUFragment','动态','实时']],interactions:['滚动查看实时文本','返回'],state:['进入','订阅','刷新'],src:'真机截图',edge:['长文本换行显示'],ac:['黑底白字','窗口内滚动']}},
 tpControl:{num:'07.28.8',title:'TP',source:'DebugControlTPFragment · 真机截图',ui:tpDebugUI,prd:{desc:'TP读取配置页。',fields:[['读取配置','按钮','DebugControlTPFragment','人工触发','-']],interactions:['读取配置','返回'],state:['进入','读取','反馈'],src:'真机截图',edge:['无回报保持空白'],ac:['黑底单按钮','窗口内显示']}},
 morningControl:{num:'07.28.9',title:'宸芯debug',source:'DebugMorningFragment · 真机截图',ui:morningDebugUI,prd:{desc:'宸芯日志和功率调试页。',fields:[['宸芯参数','开关/步进/只读','DebugMorningFragment','动态','27']],interactions:['开关日志','调节功率','查看设备信息','返回'],state:['进入','读取','调整'],src:'真机截图',edge:['原型不写真实功率'],ac:['白底布局','窗口内显示']}},
 otherRemoteId:{num:'07.28.10',title:'Remote ID设置',source:'RemoteIdSettingFragment · fragment_remote_id_setting.xml',ui:otherRemoteIdUI,prd:{desc:'其他调试中的完整 Remote ID 授权设置页。',fields:[['remoteID开关','布尔','remoteEnable','设备连接','开启'],['remoteID授权时间','只读','remoteAuthTime','时间戳','N/A'],['remoteID授权类型','枚举','remoteauthtype','六种认证方式','特定认证方式'],['remoteID授权码','文本','remoteAuth','最多24字符',''],['授权','按钮','GcsHttpApi.remoteIdAuth','授权码非空','']],interactions:['切换Remote ID开关','选择授权类型','输入授权码并过滤特殊字符','点击授权保存','返回其他调试'],state:['进入','读取授权信息','编辑','授权','反馈'],src:'RemoteIdSettingFragment · fragment_remote_id_setting.xml',edge:['授权码不能为空','授权内容未变化时提示','设备未连接时写参失败','原型不广播真实数据'],ac:['五项控件完整','黑底比例与源码一致','每项联动右侧说明','窗口内显示','标题保持其他调试']}},
 aiRadar:fullPage('07.33.1','AI雷达','AiRadarDialogFragment',[['雷达图像','暂无数据'],['检测目标','0'],['置信度','-'],['刷新','<button class="debug-action">刷新</button>']]),
 aiLogUpload:fullPage('07.33.2','AI日志上传','DebugAiLogUploadFragment',[['日志列表','暂无日志'],['选择','-'],['上传','<button class="debug-action">上传</button>'],['进度','0%']])
});

/* 无人机页真机补全：作业完成后的全部设置，以及高级设置完整 App 内页面树。 */

const legacyDroneRows=droneRows;
droneRows=function(){
 if(droneTab!=='air')return legacyDroneRows();
 return [
  ['启航/返航高度<br><small>作业飞行过程中不可修改<br>返航前无人机会先上升到此处设置的高度</small>',dStep('9.8','英尺')],
  ['启航/返航速度<br><small>范围6.7英里/小时~22.4英里/小时</small>',dStep('11.2','英里/小时')],
  ['返航降落开关',dSwitch(false)],
  ['U型转弯',dSwitch(true)],
  ['药量喷完后<br><small>该功能手动模式不支持</small>','<span class="drone-segment"><button class="on" onclick="toggleSegment(this)">悬停</button><button onclick="toggleSegment(this)">返航</button></span>'],
  ['无人机失联后<br><small>失联后继续作业打开后，则该选项只对手动和M+模式生效，否则全模式生效</small>','<span class="drone-segment"><button onclick="toggleSegment(this)">悬停</button><button class="on" onclick="toggleSegment(this)">返航</button></span>'],
  ['失联之后继续作业<br><small>该功能仅在AB作业和航线作业有效<br>药量喷完后、作业完成后、低电量、失联后都为返航才能开启该功能<br>失联期间的飞行轨迹将在落地加锁后同步</small>',dSwitch(false)],
  ['作业完成后','<span class="drone-segment"><button onclick="toggleSegment(this)">悬停</button><button class="on" onclick="toggleSegment(this)">返航</button></span>'],
  ['限制最高飞行高度',dStep('98.4','英尺')],
  ['刷新','<button class="cache-btn" onclick="showSettingsDialog(\'已重新读取飞控限制参数\')">刷新</button>'],
  ['限制最远飞行距离<br><small>范围164~4920英尺</small>',dStep('3280.0','英尺')],
  ['前照明灯',dSwitch(false)],
  ['后照明灯',dSwitch(false)],
  ['底部照明灯',dSwitch(false)],
  ['高级设置','<button class="chev" onclick="go(\'airAdvanced\')">›</button>']
 ];
};

const aircraftRowsOnly=droneRows;
// ── tabSegment — Tab 切换栏
function tabSegment(labels,on=0){return `<span class="drone-segment">${labels.map((x,i)=>`<button class="${i===on?'on':''}" onclick="toggleSegment(this)">${x}</button>`).join('')}</span>`}

const REAL_TAB_ROWS={
 radar:[
  ['前雷达',''],
  ['仿地<br><small>开启后可按地形高度自动调整和作物相对高度,手控飞行时不生效</small>',dSwitch(false)],
  ['避障<br><small>重启无人机会自动打开避障开关<br>避障开关打开后无人机最大飞行速度不超过15.7英里/小时</small>',dSwitch(true)],
  ['自动绕障<br><small class="danger-tip">避障已关闭，绕障失效并自动关闭</small>',dSwitch(false)],
  ['绕障距离',dStep('33','英尺')],
  ['绕障速度',dStep('4.5','英里/小时')],
  ['水田模式<br><small>障碍物和飞行高度相近时，障碍物会被过滤掉，需提前将障碍物标记成静态障碍物；<br>仿地高度无效时，需关闭该模式；</small>',dSwitch(false)],
  ['仿地灵敏度<br><small>范围20~200%</small>',dStep('100','%')],
  ['避障雷达提示音',dSwitch(true)],
  ['雷达探测距离<br><small>无人机两侧雷达探测障碍物的距离，调整后会影响飞行安全，请谨慎操作</small>',dStep('131','英尺')],
  ['雷达告警距离<br><small>无人机前后遇到障碍物时，在告警距离内播放雷达告警音</small>',dStep('33','英尺')],
  ['淡隐延迟时间<br><small>范围5~10秒<br>当无人机周围无障碍物且超过设置时长时，雷达球将自动半透明化，单击可恢复显示</small>',dStep('5','秒')],
  ['雷达球显示尺寸',tabSegment(['小','大'],1)]
 ],
 remote:[
  ['摇杆模式<br><small>飞行过程中不允许修改摇杆模式</small>',tabSegment(['日本手','美国手','中国手'],1)],
  ['左摇杆','上升/下降　1500<br>左转/右转　1500'],
  ['右摇杆','向前/向后　1500<br>向左/向右　1500'],
  ['摇杆校准','<button class="real-outline-btn" onclick="go(\'rockerCalibration\')">校准</button>'],
  ['拨轮校准','<button class="chev" onclick="go(\'dialCalibration\')">›</button>'],
  ['中继模式',dSwitch(false)],
  ['连接方式',tabSegment(['一机多控','一机一控'],1)],
  ['遥控器和无人机对频','<button class="real-outline-btn" onclick="showSettingsDialog(\'检测到遥控器与无人机正在连接，请关闭正在连接无人机电源后开始对频\')">开始对频</button>'],
  ['避障按键',dSwitch(true)],
  ['地图跟随无人机旋转',dSwitch(false)],
  ['自定义按键','<button class="chev" onclick="go(\'customKeys\')">›</button>'],
  ['网络诊断','<button class="chev" onclick="go(\'remoteDiagnosis\')">›</button>'],
  ['点位上传','<button class="chev" onclick="showPointUploadDialog()">›</button>']
 ],
 spray:[
  ['作业系统',dSwitch(true)],
  ['作业类型','<select class="real-select"><option>自动识别</option></select>'],
  ['作业系统实时数据','<button class="chev" onclick="go(\'workRealtime\')">›</button>'],
  ['喷头类型',tabSegment(['高压喷头','离心喷头'],1)],
  ['喷头数量',tabSegment(['2','4'],1)],
  ['喷洒模式<br><small>前飞时只开启3号机臂和5号机臂上的喷头（N3+N4）<br>后飞时只开启2号机臂和6号机臂上的喷头（N1+N2）</small>',tabSegment(['双喷','全喷'],0)],
  ['喷头配置','<button class="chev" onclick="go(\'nozzleConfig\')">›</button>'],
  ['手控作业模式',tabSegment(['随速模式','开关模式'],0)],
  ['流量<br><small>仅手动作业生效</small>',dStep('0.4','加仑/分钟')],
  ['剩余药量阈值<br><small>此处剩余药量不计入剩余药量显示中</small>',dStep('0.3','加仑')],
  ['排出管道空气','<button class="real-outline-btn" onclick="showSettingsDialog(\'无人机未连接，无法执行一键排气\')">一键排气</button>'],
  ['当前药液容积','<span class="real-green-value">0.00<small>加仑</small></span>'],
  ['空箱重量校准<br><small>如空箱不为0，需做空箱校准</small>','<button class="real-outline-btn" onclick="showSettingsDialog(\'无人机未连接，无法进行空箱重量校准\')">校准</button>'],
  ['满箱重量校准(非必要)<br><small>如满箱重量不准确，需做满箱校准</small>','<button class="real-outline-btn" onclick="showSettingsDialog(\'无人机未连接，无法进行满箱重量校准\')">校准</button>'],
  ['流量校准','<button class="real-outline-btn" onclick="showSettingsDialog(\'无人机未连接，无法进行流量校准\')">校准</button>'],
  ['F1流量系数',dStep('100')],
  ['F2流量系数',dStep('100')],
  ['智能速度调节<br><small>打开开关后，自主作业中 如果水泵输出效能不够时，飞机能够自主降低飞行速度，来提高作业精准度</small>',dSwitch(true)]
 ],
 battery:[
  ['电量','-'],
  ['电压','-'],
  ['电流','-'],
  ['功率','---- / ----'],
  ['温度','-'],
  ['循环次数','-'],
  ['低电量告警',tabSegment(['悬停','返航'],1)],
  ['低电量告警设置<br><small>范围16~30%<br>在手动模式及增强手动模式下不触发保护行为</small>',dStep('25','%')],
  ['严重低电量告警<br><small>范围10~15%</small>',dStep('15','%')],
  ['电池ID','']
 ],
 rtk:[
  ['无人机RTK检测<br><small>关闭后无人机解锁时不再检测RTK是否固定，请注意安全飞行</small>',dSwitch(false)],
  ['RTK信号源','<select class="real-select"><option>网络RTK</option></select>'],
  ['网络RTK服务权益<br><small>2028-05-14到期</small>','<button class="real-outline-btn" onclick="showSettingsDialog(\'续约服务仅作原型展示\')">续约</button>'],
  ['RTK诊断','<button class="chev" onclick="go(\'rtkDiagnosis\')">›</button>'],
  ['RTK卫星信噪比','<button class="chev" onclick="go(\'satelliteSignal\')">›</button>'],
  ['打点精度','<button class="chev" onclick="go(\'dotAccuracy\')">›</button>']
 ],
 video:[
  ['信道模式',tabSegment(['自动','2G','5G'],0)],
  ['链路信号曲线','20 / 0 / -20 / -40 / -60 / -80 / -100 / -120 / -140']
 ],
 other:[
  ['语音播报<br><small>建议打开语音播报提醒功能</small>',dSwitch(true)],
  ['语速',dStep('1.0')],
  ['语音引擎<br><small>修改语音引擎配置后,需重启app才能生效</small>','<button class="chev" onclick="showSystemToast(\'语音引擎属于Android系统页面\')">›</button>'],
  ['前摄界面','<select class="real-select"><option>十字</option></select>'],
  ['后摄界面','<select class="real-select"><option>无</option></select>'],
  ['前摄视频流参数','<button class="real-select-btn" onclick="go(\'frontVideoStream\')">1280*720 20fps 2Mbps⌄</button>'],
  ['后摄视频流参数','<button class="real-select-btn" onclick="go(\'rearVideoStream\')">1280*720 20fps 2Mbps⌄</button>'],
  ['语言','<button class="real-select-btn" onclick="go(\'droneLanguage\')">中文(简体)⌄</button>'],
  ['橙心服务<br><small>购机第一年惠达关怀服务随机赠送</small>','<button class="chev" onclick="go(\'droneInsurance\')">›</button>'],
  ['Android系统位置信息服务','<button class="real-outline-btn" onclick="showSystemToast(\'定位服务属于Android系统页面\')">打开</button>'],
  ['重启','<button class="real-bottom-action" onclick="showSettingsDialog(\'确认重启遥控器？原型不会执行\')">重启</button>'],
  ['关机','<button class="real-bottom-action" onclick="showSettingsDialog(\'确认关闭遥控器？原型不会执行\')">关机</button>']
 ]
};
droneRows=function(){return droneTab==='air'?aircraftRowsOnly():REAL_TAB_ROWS[droneTab]||aircraftRowsOnly()};
const REMOTE_ASSET={joyV:'./assets/REMOTE_ASSET_joyV.png',joyH:'./assets/REMOTE_ASSET_joyH.png',thrust:'./assets/REMOTE_ASSET_thrust.png',yaw:'./assets/REMOTE_ASSET_yaw.png',pitch:'./assets/REMOTE_ASSET_pitch.png',roll:'./assets/REMOTE_ASSET_roll.png',custom405:'./assets/REMOTE_ASSET_roll_1.png…43930 tokens truncated…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'};
// ── realRow — 实时数据行
function realRow(r,i){return `<div class="real-setting-row clickable ${i===0&&droneTab==='radar'?'real-section-title':''}" data-field-id="r${i}" onclick="selectDroneField(${i},'prdsec2',this)"><div>${r[0]}</div><span class="right">${bindControlFields(r[1]||'',i)}</span></div>`}
// ── debugRow — 调试行
function debugRow(r,i,dark=false){return `<div class="${dark?'debug-dark-row':'debug-white-row'} clickable" data-field-id="r${i}" onclick="selectDroneField(${i},'prdsec2',this)"><div>${r[0]}</div><span class="right">${bindControlFields(r[1]||'',i)}</span></div>`}
// ── debugStatusGrid — 调试状态网格
function debugStatusGrid(items,dark=false){return `<div class="${dark?'debug-status-grid':'debug-live-grid'}">${items.map((r,i)=>`<div class="${dark?'debug-status-cell':'debug-live-cell'} clickable" data-field-id="r${i}" onclick="selectDroneField(${i},'prdsec2',this)"><span>${r[0]}</span><span>${r[1]}</span></div>`).join('')}</div>`}
// ── debugSelect — 调试下拉选择器
function debugSelect(value,options=[value],fieldId=''){const field=fieldId?` data-field-id="${fieldId}"`:'';const feedback=fieldId?`selectControlField('${fieldId}',this);`:'';return `<div class="debug-custom-select"><button type="button"${field} onclick="event.stopPropagation();${feedback}toggleDebugSelect(event,this)"><span>${value}</span></button><div class="debug-custom-options">${options.map(x=>`<button type="button" class="${x===value?'active':''}" onclick="chooseDebugSelect(event,this)">${x}</button>`).join('')}</div></div>`}
// ── toggleDebugSelect — 切换调试选择
function toggleDebugSelect(e,button){e.stopPropagation();const box=button.parentElement,open=!box.classList.contains('open');document.querySelectorAll('.debug-custom-select.open').forEach(x=>x.classList.remove('open'));box.classList.toggle('open',open)}
// ── chooseDebugSelect — 选择调试项
function chooseDebugSelect(e,option){e.stopPropagation();const box=option.closest('.debug-custom-select'),trigger=box.querySelector(':scope>button');trigger.querySelector('span').textContent=option.textContent;box.querySelectorAll('.debug-custom-options button').forEach(x=>x.classList.toggle('active',x===option));box.classList.remove('open');if(trigger.dataset.fieldId)selectControlField(trigger.dataset.fieldId,trigger)}
document.addEventListener('click',()=>document.querySelectorAll('.debug-custom-select.open').forEach(x=>x.classList.remove('open')))
// ── debugDataButton — 调试数据按钮
function debugDataButton(label,rowIndex,wide=false){const id=`r${rowIndex}c0`;return `<button type="button" class="debug-pill${wide?' wide':''}" data-field-id="${id}" onclick="event.stopPropagation();selectControlField('${id}',this)">${label}</button>`}
// ── debugFtpButton — 调试 FTP 按钮
function debugFtpButton(label,rowIndex){const id=`r${rowIndex}c0`;return `<button type="button" class="debug-pill" data-field-id="${id}" onclick="event.stopPropagation();selectControlField('${id}',this)">${label}</button>`}
// ── debugDataLabel — 调试数据标签
function debugDataLabel(label,rowIndex){return `<span class="clickable" data-field-id="r${rowIndex}" onclick="selectDroneField(${rowIndex},'prdsec2',this)">${label}</span>`}
// ── debugDataStep — 调试数据步进
function debugDataStep(value,unit,rowIndex){return `<span class="debug-data-step clickable" data-field-id="r${rowIndex}" onclick="selectDroneField(${rowIndex},'prdsec2',this)">${bindControlFields(dStep(value,unit),rowIndex)}</span>`}
// ── debugDataPageBody — 调试数据页主体
function debugDataPageBody(){
 const status=[['vtScore:','---'],['rcScore:','---'],['Channel:','---'],['SNR:','---'],['LdpcError:','---'],['HarqCount:','---'],['Agc0:','---'],['Agc1:','---'],['Agc2:','---'],['Agc3:','---'],['Bitrate:','---'],['Modulation:','---'],['LockStatus:','---'],['频段:','---'],['GRD_SNR:','---'],['SKY_SNR:','---'],['LDPC_ERROR:','---'],['RC_Error:','---'],['GRD_PA:','---'],['GRD_PB:','---'],['SKY_PA:','---'],['SKY_PB:','---'],['MASOIC:','---'],['MCS:','---'],['LOCK_STATE:','---'],['GPIO:','---'],['飞->遥收包:','---'],['飞->遥丢包:','---'],['飞->遥错包:','---'],['飞->遥丢率:','---'],['遥->飞收包:','---'],['遥->飞丢包:','---'],['遥->飞错包:','---'],['遥->飞丢率:','---'],['AP_MAC:','---'],['DEV_MAC:','---']];
 const select=(value,options,rowIndex)=>debugSelect(value,options,`r${rowIndex}c0`);
 return `<div class="debug-real-body dark"><div class="debug-status-grid debug-data-status">${status.map(r=>`<div class="debug-status-cell"><span>${r[0]}</span><span>${r[1]}</span></div>`).join('')}</div><section class="debug-data-controls">
  <div class="debug-data-power clickable" data-field-id="r0" onclick="selectDroneField(0,'prdsec2',this)"><span>遥控功率</span>${debugDataStep('0','dbm',0)}</div>
  <div class="debug-data-actions real"><i class="debug-indicator"></i>${debugDataButton('遥控功率',1)}${debugDataButton('GPIO重置',2)}${debugDataButton('重置丢包',3)}${debugDataButton('重置模块',4)}${debugDataButton('读取配置',5)}</div>
  <div class="debug-data-pair">${debugDataLabel('地面LAN',6)}${select('地面LAN打开',['地面LAN关闭','地面LAN自动','地面LAN打开'],6)}</div>
  <div class="debug-data-pair">${debugDataLabel('天空LAN',7)}${select('天空LAN自动',['天空LAN自动','天空LAN打开','天空LAN关闭'],7)}</div>
  <div class="debug-data-heading">无人机频点设置</div>
  <div class="debug-data-frequency">${debugDataLabel('无人机2g频点',8)}${select('2406',['2406'],8)}${debugDataLabel('主控2g功率',9)}${debugDataStep('0','dbm',9)}</div>
  <div class="debug-data-frequency">${debugDataLabel('无人机5g频点',10)}${select('5740',['5740'],10)}${debugDataLabel('主控5g功率',11)}${debugDataStep('0','dbm',11)}</div>
  <div class="debug-data-heading">遥控器频点设置</div>
  <div class="debug-data-remote-frequency">${debugDataLabel('遥控器2g频点',12)}${select('2405',['2405'],12)}</div>
  <div class="debug-data-remote-frequency">${debugDataLabel('遥控器5g频点',13)}${select('5731',['5731'],13)}</div>
  <div class="debug-data-heading">遥控器串口调试</div><div class="debug-data-serial">${debugDataButton('开始发送',14)}${debugDataButton('停止发送',15)}</div>
  <div class="debug-data-at"><div class="debug-data-heading">AT</div><div class="debug-data-at-buttons">${debugDataButton('28889',16)}${debugDataButton('28914',17)}${debugDataButton('29425',18)}${debugDataButton('返回',19)}</div></div>
  <div class="debug-data-role-buttons">${debugDataButton('Sky_Control',20,true)}${debugDataButton('Ground_Control',21,true)}${debugDataButton('Reset',22)}${debugDataButton('Sky_Drone',23,true)}${debugDataButton('Ground_Drone',24,true)}${debugDataButton('disable_234G',25,true)}${debugDataButton('enable_234G',26,true)}${debugDataButton('禁用 234G',27,true)}${debugDataButton('启用 234G',28,true)}</div><div class="debug-data-bottom-spacer"></div>
 </section></div>`
}
// ── debugGpsPageBody — GPS 调试主体
function debugGpsPageBody(rows){
 const telemetry=rows.slice(0,40),actions=rows.slice(40);
 const cells=telemetry.map((r,i)=>`<div class="debug-gps-cell${i===37?' gps-gga-cell':''}" data-field-id="r${i}" onclick="selectDroneField(${i},'prdsec2',this)"><span class="gps-label">${r[0]}:</span><span class="gps-value">${r[1]}</span></div>`).join('');
 const action=(r,i,cls='')=>`<div class="debug-gps-action-row ${cls}" data-field-id="r${i}" onclick="selectDroneField(${i},'prdsec2',this)"><span>${r[0]}</span><span>${bindControlFields(r[1]||'',i)}</span></div>`;
 return `<div class="debug-real-body light debug-gps-body"><div class="debug-gps-grid">${cells}</div><div class="debug-gps-actions">${action(actions[0],40,'debug-gps-nav')}${action(actions[1],41)}${action(actions[2],42)}${action(actions[3],43,'debug-gps-version')}${action(actions[4],44,'debug-gps-count')}${action(actions[5],45,'debug-gps-patch no-line')}</div></div>`
}
// ── debugNetworkPageBody — 网络调试主体
function debugNetworkPageBody(){return `<div class="debug-real-body dark network-real"><div class="network-wifi-line"><i class="network-wifi-icon"></i><span>SSID: hdIot Paw: Q862DxVa IP: 10.5.2.207</span></div><div class="network-status-panel"><div class="network-status-row switch-row clickable" data-field-id="r0" onclick="selectDroneField(0,'prdsec2',this)"><span>打开/关闭主控网络</span>${dSwitch(true)}</div><div class="network-status-row clickable" data-field-id="r1" onclick="selectDroneField(1,'prdsec2',this)">FTP服务状态: 已创建</div><div class="network-status-row clickable" data-field-id="r2" onclick="selectDroneField(2,'prdsec2',this)">FTP服务状态</div><div class="network-status-row clickable" data-field-id="r3" onclick="selectDroneField(3,'prdsec2',this)">Ping to UAV状态</div><div class="network-status-row clickable" data-field-id="r4" onclick="selectDroneField(4,'prdsec2',this)">主控Wifi连接状态</div><div class="network-status-row clickable" data-field-id="r5" onclick="selectDroneField(5,'prdsec2',this)">Mcm wifi dbm:</div><div class="network-status-row clickable" data-field-id="r6" onclick="selectDroneField(6,'prdsec2',this)">主控wifi频段</div></div><div class="network-country-actions"><button onclick="selectDroneField(7,'prdsec3',this)">设置国家<br>码:CN</button><button onclick="selectDroneField(8,'prdsec3',this)">设置国家<br>码:TR</button><button onclick="selectDroneField(9,'prdsec3',this)">设置国家<br>码:ES</button><button onclick="selectDroneField(10,'prdsec3',this)">获取当前国<br>家码</button></div></div>`}
// ── debugSnrPageBody — SNR 调试主体
function debugSnrPageBody(){return `<div class="debug-real-body light snr-real"><div class="snr-chart-frame"></div><div class="snr-chart-scroll"></div></div>`}
// ── debugBatteryPageBody — 电量调试主体
function debugBatteryPageBody(){return `<div class="debug-real-body battery-debug-real"><div class="battery-debug-top"><div class="battery-disable-row clickable" data-field-id="r0" onclick="selectDroneField(0,'prdsec2',this)"><span>禁用智安电池</span>${dSwitch(true)}</div></div><div class="battery-debug-empty">No chart data available.</div><div class="battery-debug-scroll"></div></div>`}
// ── debugMotorPageBody — 电机调试主体
function debugMotorPageBody(){const motor=(n,i)=>`<div class="motor-setting-row clickable" data-field-id="r${i}" onclick="selectDroneField(${i},'prdsec2',this)"><span>电调${n}</span><span class="right">${bindControlFields(dStep('0.0','%'),i)}</span>${dSwitch(false)}</div>`;return `<div class="debug-real-body motor-real"><div class="motor-old-entry clickable" data-field-id="r0" onclick="selectDroneField(0,'prdsec2',this);go('oldMotorDebug')">旧的电机诊断界面</div><div class="motor-warning"><span>注意:</span><span>开启开关前请远离无人机</span></div><div class="motor-setting-row duration clickable" data-field-id="r1" onclick="selectDroneField(1,'prdsec2',this)"><span>电调转动持续时间(单位秒)</span><span class="right">${bindControlFields(dStep('120','秒'),1)}</span></div>${motor(1,2)}${motor(2,3)}${motor(3,4)}${motor(4,5)}<div class="motor-info-gap"></div><div class="motor-setting-row clickable" data-field-id="r6" onclick="selectDroneField(6,'prdsec2',this)"><span>全部电调</span><span class="right">${bindControlFields(dStep('0.0','%'),6)}</span>${dSwitch(false)}</div><div class="motor-color-title">---电调颜色---</div><div class="motor-color-controls"><button>电调1-4</button><button>电调5-8</button>${debugSelect('红色',['红色','绿色','蓝色'])}<span class="motor-color-step">${dStep('2')}</span></div></div>`}
// ── oldMotorUI — 旧电机 UI
function oldMotorUI(){droneTab='motor';ACTIVE_SUB_ROWS=[['当前PWM','0'],['循环诊断','按钮'],['PWM最高值','22'],['PWM周期','0.3秒'],['RunTime','0.0~60.0'],['电机柱状值','6路'],['全选','关闭'],['999诊断','关闭'],['电调号','1号电调'],['电调PWM','1000'],['电调类型','0']];return droneLayer(`${droneTabs()}<main class="drone-content radar-sub-content"><header class="drone-head">电机诊断</header><button class="advanced-real-back" onclick="go('droneSettings')">‹</button><button class="drone-close" onclick="go('home')">×</button><div class="motor-old-body"><div class="motor-old-topline"><span>Current debug motor PWM [ 0 ]</span><button>循环诊断</button></div><div class="motor-old-inputs"><span>pwm最高值</span><input value="22"><span>pwm周期</span><input value="0.3"><span>秒</span></div><div class="motor-old-runtime"><span>RunTime:</span><span>2.0</span></div><div class="motor-old-bars"><i></i><i></i><i></i><i></i><i></i><i></i></div><div class="motor-old-switches"><span>全选 ${dSwitch(false)}</span><span>999诊断 ${dSwitch(false)}</span></div><div class="motor-old-controls"><div class="motor-old-control-row"><span>电调号</span><span class="right"><button class="drone-step">−</button>${debugSelect('1号电调',['1号电调','2号电调','3号电调','4号电调'])}<button class="drone-step">＋</button></span></div><div class="motor-old-control-row"><span>电调PWM</span><span class="right">${dStep('1000')}</span></div><div class="motor-old-control-row motor-old-type"><span>电调类型</span><span class="right">${debugSelect('0',['0','1','2'])}</span></div></div></div></main>`) }
// ── otherDebugFieldRows — 其他调试字段行
function otherDebugFieldRows(){
 const status=['滚转','俯仰','姿态源','速度源','位置源','imu陀螺仪源','imu加速度计源','气压计源','磁力计源','can0_stute','左前离心喷头','右前离心喷头','左后离心喷头','右后离心喷头','播撒模块','药箱','机架','定子电调','避障雷达','主控CPU占用','定高雷达','飞控温度','定高雷达'];
 return [
  ['飞行模式:自主',debugSelect('自主',['自主','手动'])],['气压计调试',debugSelect('默认',['默认','气压计1','气压计2'])],['强制解锁',dSwitch(false)],
  ...status.map(x=>[x,'---']),['MQTT无人机上点间隔','显示项'],['离心喷头','<button class="chev">›</button>'],['飞控参数调试','<button class="chev">›</button>'],
  ['品牌名称',debugSelect('惠达',['惠达'])],['认证','<button class="chev">›</button>'],['摄像头调试开关',dSwitch(false)],['北云板卡初始化','<button>初始化</button>'],
  ['遥控器调试','<button class="chev">›</button>'],['其他调试','<button class="chev">›</button>'],['遥控器MCU相关','<button class="chev">›</button>'],['TP','<button class="chev">›</button>'],['宸芯debug','<button class="chev">›</button>'],
  ['非作业区作业开关提前打开时间','显示项'],['非作业区作业开关提前关闭时间','显示项'],['RTK Type',debugSelect('5-16',['5-16'])],
  ...['雷达日志开关','机架日志开关','激光雷达日志开关','原始激光雷达日志开关','雷达imu全数据存储开关','GPS日志开关'].map(x=>[x,dSwitch(false)]),
  ['App首页图',debugSelect('无人机',['无人机'])],['安装搜狗输入法','<button>安装搜狗输入法</button>'],['清除紧急加锁提示弹窗时间','<button>清除</button>'],['美格4g模块日志抓取','<button>开始抓取</button><button>停止抓取</button>']
 ]
}
// ── debugOtherPageBody — 其他调试主体
function debugOtherPageBody(){
 const status=['滚转','俯仰','姿态源','速度源','位置源','imu陀螺仪源','imu加速度计源','气压计源','磁力计源','can0_stute','左前离心喷头','右前离心喷头','左后离心喷头','右后离心喷头','播撒模块','药箱','机架','定子电调','避障雷达','主控CPU占用','定高雷达','飞控温度','定高雷达'];
 let fieldIndex=0;
 const field=(cls,build,action='')=>{const i=fieldIndex++;return `<div class="${cls} clickable" data-field-id="r${i}" onclick="selectDroneField(${i},'prdsec2',this);${action}">${build(i)}</div>`};
 const topFlight=field('other-debug-select-row',i=>`<span>飞行模式:自主</span>${bindControlFields(debugSelect('自主',['自主','手动']),i)}`);
 const topBarometer=field('other-debug-select-row',i=>`<span>气压计调试</span>${bindControlFields(debugSelect('默认',['默认','气压计1','气压计2']),i)}`);
 const unlock=field('other-debug-unlock-head',i=>`<span>强制解锁</span>${bindControlFields(dSwitch(false),i)}`);
 const statusHtml=status.map(x=>field('other-debug-status',()=>`<span>${x}:</span><b>---</b>`)).join('');
 const mqtt=field('other-debug-nav no-arrow',()=>`MQTT无人机上点间隔`);
 const swirl=field('other-debug-nav',()=>`离心喷头`,`go('swirlDebug')`);
 const fc=field('other-debug-nav',()=>`飞控参数调试`,`go('fcParams')`);
 const brand=field('other-debug-brand',i=>`<span>品牌名称</span>${bindControlFields(debugSelect('惠达',['惠达']),i)}`);
 const auth=field('other-debug-nav',()=>`认证`,`go('debugAuth')`);
 const camera=field('other-debug-switch-row',i=>`<span>摄像头调试开关</span>${bindControlFields(dSwitch(false),i)}`);
 const board=field('other-debug-action-row',i=>`<span>北云板卡初始化</span>${bindControlFields('<button>初始化</button>',i)}`);
 const subPages=[['遥控器调试','rcParams'],['其他调试','otherParams'],['遥控器MCU相关','mcuControl'],['TP','tpControl'],['宸芯debug','morningControl']].map(x=>field('other-debug-nav',()=>x[0],`go('${x[1]}')`)).join('');
 const workOpen=field('other-debug-nav no-arrow',()=>`非作业区作业开关提前打开时间`);
 const workClose=field('other-debug-nav no-arrow',()=>`非作业区作业开关提前关闭时间`);
 const rtk=field('other-debug-select-wide',i=>`<span>RTK Type</span>${bindControlFields(debugSelect('5-16',['5-16']),i)}`);
 const logs=['雷达日志开关','机架日志开关','激光雷达日志开关','原始激光雷达日志开关','雷达imu全数据存储开关','GPS日志开关'].map(x=>field('other-debug-log-row',i=>`<span>${x}</span>${bindControlFields(dSwitch(false),i)}`)).join('');
 const appHome=field('other-debug-select-wide',i=>`<span>App首页图</span>${bindControlFields(debugSelect('无人机',['无人机']),i)}`);
 const install=field('other-debug-pill-row',i=>`<span></span>${bindControlFields('<button>安装搜狗输入法</button>',i)}`);
 const clear=field('other-debug-pill-row',i=>`<span>清除紧急加锁提示弹窗时间</span>${bindControlFields('<button>清除</button>',i)}`);
 const capture=field('other-debug-capture',i=>`<span>美格4g模块日志抓取</span>${bindControlFields('<button>开始抓取</button><button>停止抓取</button>',i)}`);
 return `<div class="debug-real-body light other-debug-real">${topFlight}${topBarometer}<section class="other-debug-unlock">${unlock}<div class="other-debug-status-grid">${statusHtml}</div></section>${mqtt}${swirl}${fc}${brand}${auth}${camera}${board}${subPages}${workOpen}${workClose}${rtk}${logs}${appHome}${install}${clear}${capture}</div>`
}
DEBUG_PAGE_DATA.oam.title='远程锁定调试';
DEBUG_PAGE_DATA.camera.title='摄像头参数设置';
DEBUG_PAGE_DATA.video4g.title='4G图传配置';
// ── cameraDebugPageBody — 相机调试主体
function cameraDebugPageBody(rows){
 const visibleParamControl=i=>i<2||i===7||i===14;
 const paramRows=rows.slice(0,19).map((r,i)=>`<div class="camera-debug-row ${i<2?'camera-select-row':''} clickable" data-field-id="r${i}" onclick="selectDroneField(${i},'prdsec2',this)"><span>${r[0]}</span><span class="right">${visibleParamControl(i)?bindControlFields(r[1]||'',i):''}</span></div>`).join('');
 const action=(i,cls='camera-debug-actions')=>`<div class="${cls} clickable" data-field-id="r${i}" onclick="selectDroneField(${i},'prdsec2',this)">${bindControlFields(rows[i][1]||'',i)}</div>`;
 return `<div class="debug-real-body light camera-debug-real">${paramRows}${action(19)}${action(20)}<div class="camera-debug-status clickable" data-field-id="r21" onclick="selectDroneField(21,'prdsec2',this)"><span>误差:</span><span>imgs:</span><span>calib_type:</span><span>calib_subtype:</span></div><div class="camera-debug-preview clickable" data-field-id="r22" onclick="selectDroneField(22,'prdsec2',this)"></div>${[23,24,25].map(i=>`<div class="camera-debug-storage clickable" data-field-id="r${i}" onclick="selectDroneField(${i},'prdsec2',this)"><span>${rows[i][0]}</span><span class="right">${bindControlFields(rows[i][1]||'',i)}</span></div>`).join('')}</div>`
}
// ── debugPageBody — 调试页主体
function debugPageBody(tab,rows){
 if(tab==='radarDebug')return radarMainBody();
 if(tab==='network')return debugNetworkPageBody();
 if(tab==='snr')return debugSnrPageBody();
 if(tab==='motor')return debugMotorPageBody();
 if(tab==='otherDebug')return debugOtherPageBody();
 if(tab==='data401')return `<div class="debug-real-body dark debug-p401"><section class="debug-p401-section"><div class="debug-p401-title">数传P401 （天空端）</div><div class="debug-p401-row clickable" data-field-id="r0" onclick="selectDroneField(0,'prdsec2',this)"><span>功率</span><span class="right">${bindControlFields(dStep('25'),0)}</span></div><div class="debug-p401-row clickable" data-field-id="r1" onclick="selectDroneField(1,'prdsec2',this)"><span>功率开、闭环模式</span><span class="right">${debugSelect('开环模式',['开环模式','闭环模式'])}</span></div><div class="debug-p401-row clickable" data-field-id="r2" onclick="selectDroneField(2,'prdsec2',this)"><span>功率自适应</span><span class="right">${debugSelect('关闭自适应',['关闭自适应','开启自适应'])}</span></div></section><section class="debug-p401-section debug-p401-ground"><div class="debug-p401-title">数传P401 （地面端）</div></section></div>`;
 if(tab==='data')return debugDataPageBody();
 if(tab==='data'){const status=[['vtScore:','---'],['rcScore:','---'],['Channel:','---'],['SNR:','---'],['LdpcError:','---'],['HarqCount:','---'],['Agc0:','---'],['Agc1:','---'],['Agc2:','---'],['Agc3:','---'],['Bitrate:','---'],['Modulation:','---'],['LockStatus:','---'],['频段:','---'],['GRD_SNR:','---'],['SKY_SNR:','---'],['LDPC_ERROR:','---'],['RC_Error:','---'],['GRD_PA:','---'],['GRD_PB:','---'],['SKY_PA:','---'],['SKY_PB:','---'],['MASOIC:','---'],['MCS:','---'],['LOCK_STATE:','---'],['GPIO:','---'],['飞->遥收包:','---'],['飞->遥丢包:','---'],['飞->遥错包:','---'],['飞->遥丢率:','---'],['遥->飞收包:','---'],['遥->飞丢包:','---'],['遥->飞错包:','---'],['遥->飞丢率:','---'],['AP_MAC:','---'],['DEV_MAC:','---']];const freqSelect=v=>debugSelect(v,[v]);return `<div class="debug-real-body dark"><div class="debug-status-grid debug-data-status">${status.map((r,i)=>`<div class="debug-status-cell clickable" data-field-id="r${i}" onclick="selectDroneField(${Math.min(i,rows.length-1)},'prdsec2',this)"><span>${r[0]}</span><span>${r[1]}</span></div>`).join('')}</div><section class="debug-data-controls"><div class="debug-data-power clickable" data-field-id="r0" onclick="selectDroneField(0,'prdsec2',this)"><span>遥控功率</span><span class="debug-data-step">${bindControlFields(dStep('0','dbm'),0)}</span></div><div class="debug-data-actions real"><i class="debug-indicator"></i><button class="debug-pill">遥控功率</button><button class="debug-pill">GPIO重置</button><button class="debug-pill">重置丢包</button><button class="debug-pill">重置模块</button><button class="debug-pill">读取配置</button></div><div class="debug-data-pair"><span>地面LAN</span>${debugSelect('地面LAN打开',['地面LAN关闭','地面LAN自动','地面LAN打开'])}</div><div class="debug-data-pair"><span>天空LAN</span>${debugSelect('天空LAN自动',['天空LAN自动','天空LAN打开','天空LAN关闭'])}</div><div class="debug-data-heading">无人机频点设置</div><div class="debug-data-frequency"><span>无人机2g频点</span>${freqSelect('2406')}<span>主控2g功率</span><span class="debug-data-step">${dStep('0','dbm')}</span></div><div class="debug-data-frequency"><span>无人机5g频点</span>${freqSelect('5740')}<span>主控5g功率</span><span class="debug-data-step">${dStep('0','dbm')}</span></div><div class="debug-data-heading">遥控器频点设置</div><div class="debug-data-remote-frequency"><span>遥控器2g频点</span>${freqSelect('2405')}</div><div class="debug-data-remote-frequency"><span>遥控器5g频点</span>${freqSelect('5731')}</div><div class="debug-data-heading">遥控器串口调试</div><div class="debug-data-serial"><button class="debug-pill">开始发送</button><button class="debug-pill">停止发送</button></div><div class="debug-data-at"><div class="debug-data-heading">AT</div><div class="debug-data-at-buttons"><button class="debug-pill">28889</button><button class="debug-pill">28914</button><button class="debug-pill">29425</button><button class="debug-pill">返回</button></div></div><div class="debug-data-role-buttons"><button class="debug-pill wide">Sky_Control</button><button class="debug-pill wide">Ground_Control</button><button class="debug-pill">Reset</button><button class="debug-pill wide">Sky_Drone</button><button class="debug-pill wide">Ground_Drone</button><button class="debug-pill wide">disable_234G</button><button class="debug-pill wide">enable_234G</button><button class="debug-pill wide">禁用 234G</button><button class="debug-pill wide">启用 234G</button></div><div class="debug-data-bottom-spacer"></div></section></div>`}
 if(tab==='gps')return debugGpsPageBody(rows);
 if(tab==='ftp')return `<div class="debug-real-body dark debug-ftp-real"><div class="debug-ftp-column">${debugFtpButton('新建文件夹',0)}${debugFtpButton('删除文件夹',1)}${debugFtpButton('文件夹列表',2)}</div><div class="debug-ftp-column">${debugFtpButton('上传文件',3)}${debugFtpButton('下载文件',4)}${debugFtpButton('删除文件',5)}${debugFtpButton('取消操作',6)}</div></div>`;
 if(tab==='hardware')return `<div class="debug-real-body light"><div class="debug-white-list debug-hardware-list">${rows.map((r,i)=>`<div class="debug-white-row debug-nav-row clickable" data-field-id="r${i}" onclick="${i===3?`selectDroneField(${i},'prdsec2',this)`:`selectDroneField(${i},'prdsec2',this);${['hardwareArto','hardwareWifi','hardwareCell','', 'hardwareNewData','hardwareP2p'][i]?`go('${['hardwareArto','hardwareWifi','hardwareCell','', 'hardwareNewData','hardwareP2p'][i]}')`:''}`}"><span>${r[0]}</span><span class="debug-nav-arrow">›</span></div>`).join('')}</div></div>`;
 if(tab==='work')return `<div class="debug-work-live">${rows.map((r,i)=>`<div class="debug-work-cell clickable" data-field-id="r${i}" onclick="selectDroneField(${i},'prdsec2',this)"><span>${r[0]}:</span><span>${r[1]}</span></div>`).join('')}</div>`;
 if(tab==='oam')return `<div class="oam-real">${['开启5GAP','开启2GAP','获取WIFI','关闭热点'].map((x,i)=>`<button class="clickable" data-field-id="r${i}" onclick="selectDroneField(${i},'prdsec2',this)">${x}</button>`).join('')}</div>`;
 if(tab==='radarDistance')return `<div class="debug-real-body dark"><div class="debug-radar-card"><div class="debug-radar-rings"></div><div class="debug-radar-legend">说明：一个圈代表5米,最大30米<br>雷达点信号强度颜色说明：<br><i style="background:#d2ff94"></i>0-22 db<br><i style="background:#ffd400"></i>23-26 db<br><i style="background:#ff9b70"></i>27-31 db<br><i style="background:#c64400"></i>大于31 db</div><div class="debug-radar-switch">后雷达：${dSwitch(true)}：前雷达</div></div></div>`;
 if(tab==='activate')return `<div class="activate-real">${['激活无人机','确认激活','升级文件上传','酷芯log打印rx0','酷芯log打印tx8'].map((x,i)=>`<button class="clickable" data-field-id="r${Math.min(i,rows.length-1)}" onclick="selectDroneField(${Math.min(i,rows.length-1)},'prdsec2',this)">${x}</button>`).join('')}</div>`;
 if(tab==='batteryDebug')return debugBatteryPageBody();
 if(tab==='camera')return cameraDebugPageBody(rows);
 if(tab==='video4g')return `<div class="video4g-real"><div class="video4g-title">4G图传配置</div><div class="video4g-row"><span>服务器IP</span><input placeholder="请输入或选择服务器IP地址"></div><div class="video4g-row"><span>SBUS端口</span><input placeholder="请输入SBUS端口"></div><div class="video4g-row"><span>图传端口</span><input placeholder="请输入图传端口"></div><div class="video4g-actions"><button>读取</button><button class="primary">写入</button></div><button class="video4g-reading">正在读取参数...</button></div>`;
 if(tab==='rotateRadar'){const checks=['RTP_SSRC_RADARCUBE','RTP_SSRC_RDM','RTP_SSRC_PS_DETECT','RTP_SSRC_CFAR_DETECT','RTP_SSRC_PEAK_ANT','RTP_SSRC_DBF_DOA'];return `<div class="rotate-real"><div class="rotate-top"><span>触发角度</span><button class="drone-step">−</button><span class="drone-value">0度</span><button class="drone-step">＋</button><button class="rotate-main-action">雷达开始抓取数据</button></div><div class="rotate-checks">${checks.map(x=>`<span class="rotate-check"><i></i>${x}</span>`).join('')}</div><div class="rotate-actions"><button>删除</button><button>上传</button><button>刷新列表</button><span class="mark">雷达标记${dSwitch(false)}</span></div><button class="video4g-reading">正在读取参数...</button></div>`;}
 return `<div class="debug-real-body light"><div class="debug-white-list">${rows.map((r,i)=>debugRow(r,i)).join('')}</div></div>`
}
// ── sprayBody — 喷洒主体
function sprayBody(rows){return rows.map((r,i)=>`<div class="real-setting-row spray-setting-row clickable ${i===11||i===12?'spray-cal-card':''} ${i===14||i===15?'spray-coeff-row':''}" data-field-id="r${i}" onclick="selectDroneField(${i},'prdsec2',this)"><div>${r[0]}</div><span class="right">${bindControlFields(r[1]||'',i)}</span></div>`).join('')}
// ── joystickChannel — 摇杆通道
function joystickChannel(axis,action,label,value){return `<div class="joystick-channel"><img class="joystick-axis" src="${REMOTE_ASSET[axis]}" alt=""><div class="joystick-reading"><b>${label}</b><i>${value}</i></div><img class="joystick-action" src="${REMOTE_ASSET[action]}" alt=""></div>`}
// ── remoteBody — 遥控器主体
function remoteBody(rows){return `<div class="real-mode-row">${realRow(rows[0],0)}</div><div class="joystick-grid"><div class="joystick-card clickable" data-field-id="r1" onclick="selectDroneField(1,'prdsec2',this)"><h3>左摇杆</h3>${joystickChannel('joyV','thrust','上升/下降','1500')}${joystickChannel('joyH','yaw','左转/右转','1500')}</div><div class="joystick-card clickable" data-field-id="r2" onclick="selectDroneField(2,'prdsec2',this)"><h3>右摇杆</h3>${joystickChannel('joyV','pitch','向前/向后','1500')}${joystickChannel('joyH','roll','向左/向右','1500')}</div></div>${rows.slice(3).map((r,j)=>realRow(r,j+3)).join('')}`}
// ── showPointUploadDialog — 点位上传弹窗
function showPointUploadDialog(){document.getElementById('tablet').insertAdjacentHTML('beforeend',`<div class="settings-modal"><div class="settings-dialog upload-dialog"><h3>离线上传</h3><p>剩余点数: 0</p><div class="actions"><button onclick="this.closest('.settings-modal').remove()">取消</button><button onclick="this.closest('.settings-dialog').querySelector('p').textContent='原型不会上传真实点位数据'">打包上传</button></div></div></div>`)}
// ── batteryBody — 电量主体
function batteryBody(rows){return `<div class="battery-telemetry">${rows.slice(0,6).map((r,i)=>`<button type="button" class="battery-telemetry-item clickable" data-field-id="r${i}" onclick="selectDroneField(${i},'prdsec2',this)"><b>${r[0]}</b><em>${i===3?'<span>----</span><span>----</span>':'<span>-</span>'}</em></button>`).join('')}</div>${rows.slice(6).map((r,j)=>realRow(r,j+6)).join('')}`}
// ── videoBody — 视频主体
function videoBody(rows){return `${realRow(rows[0],0)}<div class="link-chart clickable" data-field-id="r1" onclick="selectDroneField(1,'prdsec2',this)"><svg viewBox="0 0 520 260"><rect x="45" y="18" width="455" height="222" fill="#fff" stroke="#333" stroke-width="2"/>${[0,1,2,3,4,5,6,7,8].map((_,i)=>`<line x1="45" y1="${38+i*24}" x2="500" y2="${38+i*24}" stroke="#aaa"/>`).join('')}<text x="14" y="45">20</text><text x="22" y="69">0</text><text x="5" y="93">-20</text><text x="5" y="117">-40</text><text x="5" y="141">-60</text><text x="5" y="165">-80</text><text x="0" y="189">-100</text><text x="0" y="213">-120</text><text x="0" y="237">-140</text></svg></div>`}
droneSettingsUI=function(){if(droneTab==='other')return otherSettingsUI();const titles={air:'无人机设置',radar:'感知设置',remote:'遥控器设置',spray:'喷洒设置',battery:'智能电池设置',rtk:'RTK设置',video:'图传设置405',other:'其他设置'};const debug=DEBUG_PAGE_DATA[droneTab];const title=debug?debug.title:titles[droneTab];const rows=debug?(droneTab==='otherDebug'?otherDebugFieldRows():debug.rows):droneRows();let body=debug?debugPageBody(droneTab,rows):rows.map(realRow).join('');if(!debug&&droneTab==='remote')body=remoteBody(rows);if(!debug&&droneTab==='spray')body=sprayBody(rows);if(!debug&&droneTab==='battery')body=batteryBody(rows);if(!debug&&droneTab==='video')body=videoBody(rows);return droneLayer(`${droneTabs()}<main class="drone-content real-tab-content ${debug?'debug-page':''}"><header class="drone-head">${title}</header><button class="drone-close" onclick="go('home')">×</button><div class="real-tab-body">${body}</div></main>`)};
SCREENS.droneSettings.ui=()=>droneSettingsUI();
// ── showCalibrationDialog — 校准弹窗
function showCalibrationDialog(kind){
 const isMag=kind==='磁力计';
 const steps=isMag?'请将无人机放在空旷区域，按提示依次水平和垂直旋转机身。':'请将无人机放置在水平、静止且无振动的平台上，校准过程中不要移动机身。';
 document.getElementById('tablet').insertAdjacentHTML('beforeend',`<div class="settings-modal"><div class="settings-dialog"><h3>${kind}校准</h3><p>${steps}</p><p style="color:#8c9691">当前为交互原型，不向真实无人机下发校准命令。</p><div class="actions"><button onclick="this.closest('.settings-modal').remove()">取消</button><button onclick="this.closest('.settings-modal').querySelector('p').textContent='设备连接校验完成，等待校准数据…'">开始校准</button></div></div></div>`);
}
// ── showRemoteAuthDialog — 遥控器授权弹窗
function showRemoteAuthDialog(){
 document.getElementById('tablet').insertAdjacentHTML('beforeend',`<div class="settings-modal"><div class="settings-dialog"><h3>Remote ID认证</h3><p>开启 Remote ID 前需要完成认证。认证码应与当前无人机和认证类型匹配。</p><input class="debug-input" maxlength="23" placeholder="请输入认证码" style="width:100%;box-sizing:border-box"><div class="actions"><button onclick="this.closest('.settings-modal').remove()">取消</button><button onclick="this.closest('.settings-modal').querySelector('p').textContent='无人机未连接，无法完成认证'">认证</button></div></div></div>`);
}
const advancedPage=(id,title,source,rows,extra={})=>({num:id,title,source,_rows:rows,ui:()=>droneSubUI(title,'airAdvanced',rows),prd:{desc:extra.desc||`${title}为无人机高级设置中的 App 内页面，页面内容可上下滑动查看。`,value:extra.value||'用于飞行器校准、检测和维护，不进入 Android 系统页面。',fields:extra.fields||rows.map(r=>[String(r[0]).replace(/<[^>]+>/g,''),'状态/操作',source,'按设备能力','-']),interactions:extra.interactions||['上下滑动查看全部内容','点击任一行联动右侧字段说明','操作前校验无人机连接与飞行状态','返回高级设置'],state:extra.state||['进入页面','读取设备数据','执行检查或校准','显示结果'],src:source,edge:extra.edge||['无人机未连接时显示 N/A 或连接提示','飞行或电机运行时禁止校准','原型不写入真实飞控参数'],ac:extra.ac||['页面内容可滚动到底','每个控件归属于唯一字段','操作均有可见反馈','可返回高级设置']}});
// ── advancedRealShell — 高级真实外壳
function advancedRealShell(body,target='airAdvanced',bodyClass='advanced-real-body'){
 return droneLayer(`${droneTabs()}<main class="drone-content advanced-real-content"><header class="drone-head">无人机设置</header><button class="advanced-real-back" onclick="go('${target}')">‹</button><button class="drone-close" onclick="go('home')">×</button><div class="${bodyClass}">${body}</div></main>`);
}
// ── advancedRealList — 高级真实列表
function advancedRealList(rows,target='airAdvanced'){
 ACTIVE_SUB_ROWS=rows;
 const body=rows.map((r,i)=>`<div class="advanced-real-row clickable" data-field-id="s${i}" onclick="highlightField('s${i}',this,'prdsec2')"><span>${r[0]}</span><span class="right">${bindControlFields(r[1]||'',i,'s')}</span></div>`).join('');
 return advancedRealShell(body,target,'advanced-real-list');
}
// ── pwmRealUI — PWM 实时 UI
function pwmRealUI(){
 const rows=SCREENS.pwmCheck._rows;ACTIVE_SUB_ROWS=rows;
 const motors=rows.slice(2).map((r,i)=>`<div class="pwm-motor clickable" data-field-id="s${i+2}" onclick="highlightField('s${i+2}',this,'prdsec2')">${r[0]}</div>`).join('');
 return advancedRealShell(`<div class="pwm-explain clickable" data-field-id="s0" onclick="highlightField('s0',this,'prdsec2')">说明：检查结果仅在空旷场地9.84英尺以上悬停时生效，反映无人机电机装配情况</div><div class="pwm-yaw clickable" data-field-id="s1" onclick="highlightField('s1',this,'prdsec2')"><b>偏航控制输出值：</b><p>值小于0时，建议调大2、5电机角度或者调小3、6电机的角度<br>值大于0时，建议调小2、5电机角度或者调大3、6电机的角度</p></div><div class="pwm-motors">${motors}</div>`,'airAdvanced','advanced-pwm-body');
}
// ── vibrationRealUI — 振动实时 UI
function vibrationRealUI(){
 const rows=SCREENS.vibrationCheck._rows;ACTIVE_SUB_ROWS=rows;
 return advancedRealShell(`<div class="vibration-chart clickable" data-field-id="s0" onclick="highlightField('s0',this,'prdsec2')"><svg viewBox="0 0 500 240"><rect x="44" y="20" width="438" height="196" fill="#fff" stroke="#606060" stroke-width="2"/><line x1="44" y1="118" x2="482" y2="118" stroke="#999"/><text x="10" y="124">100</text><text x="28" y="222">0</text></svg></div>`,'airAdvanced','advanced-vibration-body');
}
// ── attitudeRealUI — 姿态实时 UI
function attitudeRealUI(){
 const rows=SCREENS.aircraftAttitude._rows;ACTIVE_SUB_ROWS=rows;
 return advancedRealShell(`<div class="attitude-line">${rows.map((r,i)=>`<span class="clickable" data-field-id="s${i}" onclick="highlightField('s${i}',this,'prdsec2')"><b>${r[0]}:</b><em>${r[1]}</em></span>`).join('')}</div>`,'airAdvanced','advanced-attitude-body');
}
// ── rackRealUI — 机架实时 UI
function rackRealUI(){
 const rows=SCREENS.rackRealData._rows;ACTIVE_SUB_ROWS=rows;
 const cell=(i)=>`<div class="rack-cell clickable" data-field-id="s${i}" onclick="highlightField('s${i}',this,'prdsec2')"><span>${rows[i][0]}</span><b>${rows[i][1]}</b></div>`;
 return advancedRealShell(`<div class="rack-grid rack-top">${cell(0)}${cell(1)}${cell(2)}</div><div class="rack-grid rack-lamps">${cell(3)}${cell(4)}${cell(5)}</div><h3>称重传感器</h3><div class="rack-grid rack-weight">${cell(6)}${cell(7)}${cell(8)}${cell(9)}</div><div class="rack-grid rack-voltage">${cell(10)}${cell(11)}</div>`,'airAdvanced','advanced-rack-body');
}

const advancedRows=[
 ['IMU校准','<button class="chev" onclick="go(\'imuCalibration\')">›</button>'],
 ['电机偏置角度检查','<button class="chev" onclick="go(\'pwmCheck\')">›</button>'],
 ['振动系数检查','<button class="chev" onclick="go(\'vibrationCheck\')">›</button>'],
 ['飞机姿态','<button class="chev" onclick="go(\'aircraftAttitude\')">›</button>'],
 ['行距自动微调<br><small>可优化任务边缘区域的喷洒覆盖</small>',dSwitch(false)],
 ['智能续航点<br><small>仅支持2.9.x.x（含）以后的App规划的地块</small>',dSwitch(false)],
 ['断点优化<br><small>开启后，每个作业架次将跳过非作业航线</small>',dSwitch(true)],
 ['返航精度检查<br><small>开启检查后，RTK不固定情况下，返航回来时将悬停在起飞点上空，需用户手控降落<br>关闭检查后，实际降落位置和起飞点位置偏差可能超过3.28英尺，会有炸机风险</small>',dSwitch(true)],
 ['机架实时数据','<button class="chev" onclick="go(\'rackRealData\')">›</button>'],
 ['地区','-'],
 ['无人机ID','54050011']
];

/* ─ ⚪ 未分类 ─ */

/* ─ ⚪ 未分类 ─ */

/* ─ ⚪ 未分类 ─ */


/* ─ ⚪ 未分类 ─ */

SCREENS.airAdvanced={num:'07.1',title:'无人机高级设置',source:'AircraftAdvancedSettingFragment · fragment_setting_aircraft_advanced.xml · 遥控器实机滚动截图',_rows:advancedRows,ui:()=>advancedRealList(advancedRows,'droneSettings'),prd:{desc:'按当前遥控器实机完整呈现高级设置：四个检查入口、三项航线优化、返航精度检查、机架实时数据、地区和无人机ID。',value:'集中完成飞控校准、健康检查和高级作业策略配置。',fields:advancedRows.map(r=>[String(r[0]).replace(/<[^>]+>/g,''),'设置/导航','AircraftAdvancedSettingFragment','按机型与连接状态','-']),interactions:['在右侧设置面板内上下滑动查看全部高级设置','进入 IMU、电机偏置角、振动系数、飞机姿态和机架实时数据页面','切换作业优化与返航精度开关','顶部返回键返回无人机设置'],state:['进入高级设置','读取机型能力','配置或进入检查','返回'],src:'遥控器当前机型实机截图；高级页面始终保留左侧分类栏和“无人机设置”标题。',edge:['当前机型不显示的条件入口不强行加入列表','设备未连接时状态数据为 N/A','原型不向真机写入飞控参数'],ac:['11 项顺序和开关状态与实机一致','页面外壳、返回键与实机一致','页面可滚动到无人机ID','五个可见 App 内子页均可进入','每行和每个控件均联动右侧说明']}};

Object.assign(SCREENS,{
 imuCalibration:(()=>{const s=advancedPage('07.1.1','IMU校准','IMUCalibrationFragment · 遥控器实机截图',[
  ['IMU','<button class="real-outline-btn" onclick="showSettingsDialog(\'请连接无人机\')">IMU校准</button>']
 ],{desc:'当前遥控器机型的 IMU 校准页仅显示 IMU 名称和右侧“IMU校准”按钮。',interactions:['点击 IMU校准前检查无人机连接','未连接时提示请连接无人机','顶部返回高级设置'],edge:['当前机型未显示消摆传感器和磁力计行，因此原型不添加','飞行或电机运行时禁止校准']});s.ui=()=>advancedRealList(s._rows,'airAdvanced');return s;})(),
 pwmCheck:(()=>{const s=advancedPage('07.1.2','电机偏置角度检查','AircraftPWMCheckFragment · 遥控器实机滚动截图',[
  ['检查生效说明','空旷场地9.84英尺以上悬停'],['偏航控制输出值','按正负值调整2/5与3/6电机角度'],
  ['电机1号',''],['电机2号',''],['电机3号',''],['电机4号',''],['电机5号',''],['电机6号',''],['电机7号',''],['电机8号','']
 ],{desc:'按真机连续说明文字和电机1号至8号纵向列表呈现偏航控制输出检查。',value:'用于在空旷场地悬停时判断电机装配角度。'});s.ui=pwmRealUI;return s;})(),
 vibrationCheck:(()=>{const s=advancedPage('07.1.3','振动系数检查','AircraftVibrationCheckFragment · 遥控器实机截图',[
  ['振动系数曲线','纵轴0–100，未连接时为空图']
 ],{desc:'真机未连接状态只显示一张纵轴 0–100 的空白振动曲线图。',value:'连接无人机后用于观察振动数据趋势。',interactions:['观察振动曲线','顶部返回高级设置']});s.ui=vibrationRealUI;return s;})(),
 aircraftAttitude:(()=>{const s=advancedPage('07.1.4','飞机姿态','AircraftAttitudeFragment · 遥控器实机截图',[
  ['偏航','---'],['滚转','---'],['俯仰','---']
 ],{desc:'真机在同一行展示偏航、滚转和俯仰三个姿态值；未连接时均为“---”。',value:'用于实时核对飞行器三轴姿态。',interactions:['查看偏航、滚转和俯仰值','顶部返回高级设置']});s.ui=attitudeRealUI;return s;})(),
 rackRealData:(()=>{const s=advancedPage('07.1.5','机架实时数据','RackRealDataFragment · 遥控器实机滚动截图',[
  ['机架类型','N/A'],['温度','N/A'],['故障码','N/A'],
  ['下灯','N/A'],['后灯','N/A'],['前灯','N/A'],
  ['左后','N/A'],['左前','N/A'],['右前','N/A'],['右后','N/A'],
  ['电池电压','N/A'],['参考电压','N/A']
 ],{desc:'按真机分组网格展示机架类型、温度、故障码、三路灯、四个称重传感器及两路电压。',value:'用于机架控制器、照明和称重传感器的实时维护诊断。',interactions:['上下滑动查看完整分组网格','连接后实时刷新','点击数据格联动字段说明','顶部返回高级设置']});s.ui=rackRealUI;return s;})(),
 hAdjustAngle:advancedPage('07.1.6','H角度调整','HAjustAngleFragment · fragment_setting_h_ajust_angle.xml',[
  ['H角度<br><small>仅支持具备该能力的机型</small>',dStep('0','°')],
  ['应用设置','<button class="cache-btn" onclick="showSettingsDialog(\'无人机未连接，无法设置H角度\')">设置</button>']
 ],{desc:'特定机型显示的 H 角度调整页面。',edge:['非支持机型不显示入口','无人机未连接时设置失败','原型不写入真实参数']}),
 remoteId:advancedPage('07.1.7','Remote ID设置','RemoteIdSettingFragment · fragment_setting_remote_id.xml',[
  ['Remote ID开关','<button class="setting-switch" onclick="showRemoteAuthDialog()"></button>'],
  ['认证时间','N/A'],
  ['认证类型','<span class="drone-segment"><button class="on" onclick="toggleSegment(this)">无</button><button onclick="toggleSegment(this)">UAS ID</button></span>'],
  ['认证码','<input class="debug-input" maxlength="23" placeholder="请输入认证码">'],
  ['保存认证','<button class="cache-btn" onclick="showRemoteAuthDialog()">确定</button>']
 ],{desc:'特定地区显示的 Remote ID 广播与认证配置页。',value:'满足适用地区对无人机远程识别广播的监管要求。',interactions:['切换 Remote ID 时打开 App 内认证弹窗','选择认证类型并输入认证码','点击确定校验并保存','返回高级设置'],edge:['非适用地区不显示入口','认证码最长23个字符','无人机未连接时不能完成认证','原型不执行真实广播']}),
 remoteIdDetail:advancedPage('07.1.7.1','Remote ID广播数据','RemoteIdDetailFragment',[
  ['设备序列号','N/A'],['经度','N/A'],['纬度','N/A'],['高度','N/A'],['速度','N/A'],['航向','N/A']
 ],{desc:'Remote ID 广播数据只读核对页。',interactions:['查看广播字段','返回高级设置']})
});
// ── remoteShell — 遥控器外壳
function remoteShell(body,bodyClass='remote-sub-body'){return droneLayer(`${droneTabs()}<main class="drone-content remote-sub-content"><header class="drone-head">遥控器设置</header><button class="advanced-real-back" onclick="go('droneSettings')">‹</button><button class="drone-close" onclick="go('home')">×</button><div class="${bodyClass}">${body}</div></main>`)}
// ── safeCalibration — 安全校准
function safeCalibration(btn,label){const old=btn.textContent;btn.textContent='准备中';setTimeout(()=>{btn.textContent=old;showSettingsDialog(`${label}为原型演示，不向真实遥控器写入校准数据`)},450)}
SCREENS.rockerCalibration._rows=[['左摇杆','实时位置'],['右摇杆','实时位置'],['校准说明','分别控制左摇杆和右摇杆划一圈填满方环形'],['开始校准','<button class="rocker-start" onclick="safeCalibration(this,\'摇杆校准\')">开始校准</button>']];
SCREENS.rockerCalibration.ui=()=>{ACTIVE_SUB_ROWS=SCREENS.rockerCalibration._rows;return remoteShell(`<div class="rocker-cal-grid"><div class="rocker-cal-card clickable" data-field-id="s0" onclick="highlightField('s0',this,'prdsec2')">左摇杆<div class="rocker-pad"></div></div><div class="rocker-cal-card clickable" data-field-id="s1" onclick="highlightField('s1',this,'prdsec2')">右摇杆<div class="rocker-pad"></div></div></div><div class="rocker-instruction clickable" data-field-id="s2" onclick="highlightField('s2',this,'prdsec2')">请分别控制左摇杆和右摇杆划一圈填满方环形<b>开始校准摇杆前请勿触碰摇杆</b></div><button class="rocker-start clickable" data-field-id="s3" onclick="highlightField('s3',this,'prdsec2');safeCalibration(this,'摇杆校准')">开始校准</button>`)};
SCREENS.rockerCalibration.prd={desc:'按真机还原左右摇杆校准引导页。',value:'校正两个摇杆的中位和完整行程。',fields:[['左摇杆','二维位置','遥控器ADC','实时','居中'],['右摇杆','二维位置','遥控器ADC','实时','居中'],['校准提示','说明','CalibrationRockerSettingFragment','只读','划满方环形'],['开始校准','操作','CalibrationRockerPresenter','人工触发','未开始']],interactions:['观察左右摇杆位置','点击开始校准演示准备反馈','返回遥控器设置'],state:['准备','开始采样','划满行程','完成或失败'],src:'CalibrationRockerSettingFragment · fragment_setting_calibration_rocker.xml · 真机截图',edge:['飞行器连接中禁止进入或继续校准','原型不调用真实遥控器校准接口'],ac:['左右摇杆卡片与真机布局一致','校准说明与开始按钮完整','操作有可见反馈','可返回遥控器设置']};
SCREENS.dialCalibration=advancedPage('07.3.1','拨轮校准','KnobCalibrationFragment · fragment_setting_knob_calibration.xml · 真机截图',[['左拨轮校准','<span class="real-green-value">中：0.930</span> <button class="real-outline-btn" onclick="safeCalibration(this,\'左拨轮校准\')">校准</button>'],['右拨轮校准','<span class="real-green-value">中：0.837</span> <button class="real-outline-btn" onclick="safeCalibration(this,\'右拨轮校准\')">校准</button>']],{desc:'按真机显示左右拨轮实时状态并分别校准。',value:'校正左右拨轮的左、中、右行程。',interactions:['查看左右拨轮实时方向与ADC值','分别点击左右校准按钮演示反馈','返回遥控器设置'],edge:['原型不调用 HDKnobCalibrateDialog','实时值使用本次真机截图值作为示例'],ac:['两行布局、绿色状态及校准按钮与真机一致','两个校准按钮可独立反馈','可返回遥控器设置']});
SCREENS.dialCalibration.ui=()=>advancedRealList(SCREENS.dialCalibration._rows,'droneSettings');
const customChoices=['未定义','边界点和障碍点切换','添加边界点或障碍点','打开/关闭避障','地图/FPV切换','前/后摄像头切换','添加A点','添加B点','打开前照灯','打开后照灯','增加亩用量','减少亩用量','切换视角','作业开关','左横移(M+模式生效)','右横移(M+模式生效)','摇杆锁定','一键升高/降低','自动脱锁','消摆'];
// ── customSelect — 自定义下拉选择器
function customSelect(value='未定义'){return `<select class="real-select" onchange="linkPRD('prdsec3')">${customChoices.map(x=>`<option ${x===value?'selected':''}>${x}</option>`).join('')}</select>`}

const CUSTOM_KEY_405_IMAGE='./assets/CUSTOM_KEY_405_IMAGE.png…43930 tokens truncated…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';
const CUSTOM_KEY_405_IMAGE_FULL='./assets/CUSTOM_KEY_405_IMAGE_FULL.png';
// ── customKeyDiagram — 自定义键图示
function customKeyDiagram(){return `<div class="custom-key-diagram"><img src="${CUSTOM_KEY_405_IMAGE_FULL}" alt="405遥控器正面与背面按键位置说明"></div>`}
SCREENS.customKeys._rows=[['左按键 A',tabSegment(['避障开关','作业开关'],0)],['右按键 B',tabSegment(['避障开关','作业开关'],1)],['L1',customSelect()],['L2',customSelect()],['L3',customSelect()],['五维按键 C',customSelect()],['五维按键 D','右横移(M+模式生效)'],['五维按键 E',customSelect()],['五维按键 F',customSelect()],['五维按键 G','左横移(M+模式生效)'],['后按键 H',customSelect()],['后按键 J',customSelect()]];
SCREENS.customKeys.ui=()=>{const rows=SCREENS.customKeys._rows;ACTIVE_SUB_ROWS=rows;return remoteShell(`${customKeyDiagram()}${rows.map((r,i)=>`<div class="custom-key-row clickable ${i<2?'top-key-segments':''}" data-field-id="s${i}" onclick="highlightField('s${i}',this,'prdsec2')"><span>${r[0]}</span><span class="right">${bindControlFields(r[1]||'',i,'s')}</span></div>`).join('')}`)};
SCREENS.customKeys.prd={desc:'按405遥控器真机还原完整按键示意图与全部自定义按键；后按键 J 是页面最后一项。',value:'将常用作业动作绑定到遥控器物理按键。',fields:SCREENS.customKeys._rows.map(r=>[String(r[0]).replace(/<[^>]+>/g,''),'枚举/只读','CustomKeysFragment','按真机选项','当前值']),interactions:['A/B顶部按键互斥配置避障开关与作业开关','L1/L2/L3、五维C/E/F、后按键H/J选择动作','D/G按真机固定为右横移/左横移','页面内部滑动至后按键J并返回'],state:['读取本地配置','选择按键动作','保存到本地配置'],src:'CustomKeysFragment · bg_custom_key_description_405.png · 真机分段截图',edge:['原型不写入真实物理按键配置','本机页面在后按键J结束，不追加拨轮字段','候选项来自 settings_custom_key_type_spinner'],ac:['使用工程内405遥控器正反面原始按键图','A/B配置完整','L1至L3、五维C至G、H/J全部呈现','J下方不出现其他设置项','选择项可交互且返回键始终可见']};
SCREENS.remoteDiagnosis._rows=[['遥控器接入','遥控器已连接WiFi：hdlot 5.8GHz'],['遥控器访问管理平台','遥控器正常访问管理平台：32ms'],['遥控器访问图传服务器','遥控器正常访问图传服务器：22ms'],['飞行器','飞行器未连接']];
SCREENS.remoteDiagnosis.ui=()=>{ACTIVE_SUB_ROWS=SCREENS.remoteDiagnosis._rows;return remoteShell(`<div class="network-topology clickable" data-field-id="s0" onclick="highlightField('s0',this,'prdsec2')"><svg viewBox="0 0 520 230"><g fill="none" stroke="#078875" stroke-width="3"><path d="M68 55H230M275 55H448M252 80V160H448"/><path d="M252 175V205H122" stroke="#d8dde1"/></g><g fill="#078875" font-size="18"><text x="18" y="48">▣</text><text x="8" y="80">遥控器</text><text x="232" y="55">▣</text><text x="262" y="100">hdlot</text><text x="455" y="63">管理平台</text><text x="455" y="166">4G图传</text></g><g fill="#bdc4c9" font-size="18"><text x="4" y="205">飞行器</text><text x="260" y="210">SIM</text></g></svg></div><div class="network-results"><h3>诊断结果:</h3>${SCREENS.remoteDiagnosis._rows.map((r,i)=>`<p class="clickable ${i===3?'error':''}" data-field-id="s${i}" onclick="highlightField('s${i}',this,'prdsec2')">${i+1} ${r[1]}</p>`).join('')}</div>`)};
SCREENS.remoteDiagnosis.prd={desc:'按本次真机实时状态还原网络拓扑和逐项诊断结果。',value:'快速定位遥控器、管理平台、图传服务器、飞行器及SIM链路异常。',fields:[['遥控器接入','状态','NetworkDiagnosisManager','实时','hdlot 5.8GHz'],['管理平台链路','延迟','网络诊断报告','毫秒','32ms'],['图传服务器链路','延迟','网络诊断报告','毫秒','22ms'],['飞行器链路','状态','DroneReportDataManager','实时','未连接']],interactions:['查看拓扑中的绿色可用链路与灰色断开链路','点击诊断结果联动字段说明','返回遥控器设置'],state:['采集网络报告','计算拓扑状态','列出诊断结果','持续刷新'],src:'NetworkDiagnosisFragment · NetworkDiagnosisTopologyView · fragment_network_diagnosis_v2.xml · 真机截图',edge:['飞行器未连接时飞行器与SIM链路置灰','延迟值随真机网络变化，原型展示截图时值'],ac:['拓扑节点与真机一致','四条诊断结果及颜色一致','页面可滚动','可返回遥控器设置']};
const NOZZLE_560_IMAGE='./assets/NOZZLE_560_IMAGE.png';
// ── sprayShell — 喷洒外壳
function sprayShell(body,bodyClass='spray-sub-body'){droneTab='spray';return droneLayer(`${droneTabs()}<main class="drone-content spray-sub-content"><header class="drone-head">喷洒设置</header><button class="advanced-real-back" onclick="go('droneSettings')">‹</button><button class="drone-close" onclick="go('home')">×</button><div class="${bodyClass}">${body}</div></main>`)}
SCREENS.workRealtime._rows=[['水泵P1 · 实时流量','N/A'],['水泵P1 · 流量计数','N/A'],['水泵P1 · 控制信号','N/A'],['水泵P1 · 故障码','N/A'],['水泵P2 · 实时流量','N/A'],['水泵P2 · 流量计数','N/A'],['水泵P2 · 控制信号','N/A'],['水泵P2 · 故障码','N/A'],['药箱 · 故障码','N/A'],['药箱 · 缺料告警','N/A'],['药箱 · 最大限制流速','N/A']];
SCREENS.workRealtime.ui=()=>{const rows=SCREENS.workRealtime._rows;ACTIVE_SUB_ROWS=rows;const cell=(text,idx='',head=false)=>`<div class="spray-data-cell clickable ${head?'head':''}" ${idx===''?'':`data-field-id="s${idx}" onclick="highlightField('s${idx}',this,'prdsec2')"`}>${text}</div>`;return sprayShell(`<div class="spray-data-table">${cell('', '',true)}${['实时流量','流量计数','控制信号','故障码'].map(x=>cell(x,'',true)).join('')}${cell('水泵P1')}${[0,1,2,3].map(i=>cell('N/A',i)).join('')}${cell('水泵P2')}${[4,5,6,7].map(i=>cell('N/A',i)).join('')}</div><div class="spray-data-table tank">${cell('', '',true)}${['故障码','缺料告警','最大限制流速'].map(x=>cell(x,'',true)).join('')}${cell('药箱')}${[8,9,10].map(i=>cell('N/A',i)).join('')}</div>`)};
SCREENS.workRealtime.prd={desc:'按真机还原作业系统实时数据表，分别展示两路水泵和药箱状态。',value:'用于喷洒系统维护、故障排查和流量核对。',fields:SCREENS.workRealtime._rows.map(r=>[r[0],'只读状态','WorkSysRealDataFragment','设备实时回报',r[1]]),interactions:['查看水泵P1的四项数据','查看水泵P2的四项数据','查看药箱三项数据','点击表格单元联动字段说明','使用固定悬浮返回键返回喷洒设置'],state:['进入页面','订阅作业系统回报','更新表格','持续刷新'],src:'WorkSysRealDataFragment · fragment_work_sys_real_data.xml · 真机截图',edge:['设备未连接或无回报时显示 N/A','页面只读，不向作业系统写参'],ac:['表头与真机一致','水泵P1和P2各四项完整','药箱三项完整','每项独立映射字段说明','返回键始终可见']};
SCREENS.nozzleConfig._rows=[['离心喷头1','N/A'],['离心喷头2','N/A'],['离心喷头3','N/A'],['离心喷头4','N/A']];
SCREENS.nozzleConfig.ui=()=>{const rows=SCREENS.nozzleConfig._rows;ACTIVE_SUB_ROWS=rows;return sprayShell(`<div class="nozzle-figure"><img src="${NOZZLE_560_IMAGE}" alt="560四喷头位置 N1 至 N4"></div>${rows.map((r,i)=>`<div class="nozzle-config-row clickable" data-field-id="s${i}" onclick="highlightField('s${i}',this,'prdsec2')"><span>${r[0]}：${r[1]}</span><button class="nozzle-test" onclick="showSettingsDialog('无人机未连接，无法发送离心喷头测试命令')">●</button><select class="nozzle-select" onclick="event.stopPropagation()"><option>N/A</option><option>N1</option><option>N2</option><option>N3</option><option>N4</option></select></div>`).join('')}<p class="nozzle-note">喷头测试与编址需要无人机和离心喷头在线；当前按真机所选“4 个离心喷头”显示 N1—N4。</p>`)};
SCREENS.nozzleConfig.prd={desc:'依据工程内 HDNozzleTypeView 和 560 机型原始示意图，还原四个离心喷头的物理位置、测试按钮与编址选择。',value:'核对喷头实物与 N1—N4 逻辑位置，便于喷洒模式按正确机臂启停。',fields:SCREENS.nozzleConfig._rows.map((r,i)=>[`离心喷头${i+1}`,'枚举/操作','HDNozzleTypeView','N/A 或 N1—N4',r[1]]),interactions:['查看560机型喷头位置示意图','为每个喷头选择N1至N4逻辑位置','点击测试按钮前检查设备连接','使用悬浮返回键返回喷洒设置'],state:['读取喷头数量与机型','显示四喷头示意图','读取喷头编址','选择或测试','反馈结果'],src:'NozzleConfigurationFragment · HDNozzleTypeView · ui_nozzle_type_view.xml · icon_nozzle_type_560.png',edge:['当前真机选择4个喷头，因此显示四行；果树模式代码支持八行但不属于本次真机状态','未连接时保持N/A且测试只提示','同一逻辑位置不应重复分配'],ac:['使用工程原始560机型图','N1至N4物理位置清晰','四行完整','每行测试与编址控件完整','返回键始终可见']};

const WORK_PRD_FIELDS=[
 {id:'wtab-plot',cells:['地块页签','资源类型按钮','HDPlotTypeView','与其他资源页签互斥','地块']},{id:'wtab-running',cells:['进行中页签','资源类型按钮','HDPlotTypeView','与其他资源页签互斥','进行中']},{id:'wtab-tif',cells:['处方图页签','资源类型按钮','HDPlotTypeView','与其他资源页签互斥','处方图']},
 {id:'wstore-local',cells:['本地按钮','存储位置按钮','HDSegmentControlView','与云端互斥','本地']},{id:'wstore-cloud',cells:['云端按钮','存储位置按钮','HDSegmentControlView','与本地互斥；内容限制在右侧区域','云端']},{id:'wsync',cells:['自动同步到云端','复选按钮','cbAutomaticSynchronization','仅本地地块、非多选状态显示','已勾选']},
 {id:'wsort',cells:['时间排序','排序按钮','srbPlotTime','本地、非多选状态显示','升序/降序']},{id:'wsearch',cells:['名称搜索','输入框','svSearchPlot','非多选状态显示','请输入名称']},{id:'wmulti',cells:['多选','状态按钮','ivPlotEdit','开关底部批量操作栏','多选']},{id:'wbatch',cells:['批量操作栏','组合控件','rllPlot','按本地/云端显示上传或下载','全部/未同步/已选/删除/上传下载']},
 {id:'wimport',cells:['导入地块','页面入口按钮','ivPlotInsert','仅地块页签显示','＋']},{id:'wcloud-card',cells:['云端地块卡片','资源条目','PlotDownloadRecycleAdapter','仅云端地块有数据时显示','名称/时间/地址/面积/类型']},{id:'wlist-running',cells:['云端进行中列表','资源列表','cloudWorkingRecycleAdapter','限制在右侧内容区','暂无进行中地块']},{id:'wlist-tif',cells:['云端处方图列表','资源列表','TifDownloadRecycleAdapter','限制在右侧内容区','暂无处方图']}
];
const WORK_PRD_RULES=[
 {id:'wtab-plot',text:'点击“地块”切换到地块资源；显示右上角导入按钮，本地状态显示自动同步。'},{id:'wtab-running',text:'点击“进行中”切换资源列表；隐藏导入和同步，保留本地/云端。'},{id:'wtab-tif',text:'点击“处方图”切换资源列表；隐藏导入和同步，保留本地/云端。'},
 {id:'wstore-local',text:'点击“本地”只刷新右侧内容区域，左侧资源导航保持原位置和选中状态。'},{id:'wstore-cloud',text:'点击“云端”只替换右侧列表；不得全屏，也不得覆盖左侧资源导航。'},{id:'wsync',text:'点击复选框切换自动同步；仅属于本地地块。'},{id:'wsort',text:'点击时间按钮切换升序/降序，不改变当前页签。'},{id:'wsearch',text:'输入名称过滤当前列表；多选时隐藏搜索框。'},
 {id:'wmulti',text:'点击多选显示或隐藏底部批量操作栏，并保持当前资源页签。'},{id:'wbatch',text:'本地批量栏提供删除/上传，云端提供删除/下载。'},{id:'wimport',text:'点击加号进入导入地块页；返回后恢复作业资源。'},{id:'wcloud-card',text:'点击云端地块卡片定位说明；卡片始终裁切在右侧内容区。'},{id:'wlist-running',text:'进行中切到云端后只在右侧展示列表或空状态。'},{id:'wlist-tif',text:'处方图切到云端后只在右侧展示列表或空状态。'}
];
SCREENS.home.prd.controlSpec={
 fields:[
  {id:'home-account',cells:['用户信息入口','页面入口','LauncherViewModel.navAccount','登录状态有效','用户信息']},
  {id:'home-general',cells:['通用设置入口','页面入口','LauncherViewModel.navSetting','App 内页面','通用设置']},
  {id:'home-network',cells:['网络状态与诊断','拓扑/操作','NetworkDiagnosisManager.latestReport','点击信号打开','Wi-Fi 活跃 / SIM 未活跃']},
  {id:'home-battery',cells:['遥控器电池状态','电量/充电状态','FlightTitleFragment / BatteryManager','0~100%，含充电状态','充电中']},
  {id:'home-time',cells:['系统时间','时间','TextClock','24 小时制与当前时区','05:30(GMT+08:00)']},
  {id:'home-drone-settings',cells:['无人机设置入口','页面入口','SettingActivity / DebugManager','App 内页面','无人机设置']},
  {id:'home-work',cells:['作业资源入口','页面入口','LauncherViewModel.navPlot','登录及权限校验','作业资源']},
  {id:'home-logs',cells:['日志管理入口','页面入口','LauncherViewModel.navLog','入口状态校验','日志管理']},
  {id:'home-devices',cells:['设备管理入口','页面入口','LauncherViewModel.navDevice','入口状态校验','设备管理']},
  {id:'home-connection',cells:['无人机连接状态','布尔','DroneReportDataManager.isConnected','实时，只读','未连接']},
  {id:'home-start',cells:['开始作业按钮','动作','LauncherViewModel.navMission2','版本/自检/权限/登录校验','开始']}
 ],
 baseRules:[],
 rules:[
  {id:'home-account',text:'点击左上角用户图标进入用户信息页面。'},
  {id:'home-general',text:'点击左上角六边形设置图标进入通用设置；该入口不与右上角无人机设置共用字段。'},
  {id:'home-network',text:'点击顶部 4G/Wi-Fi 信号，在首页上方打开网络诊断窗口；再次点击或点击遮罩关闭。'},
  {id:'home-battery',text:'遥控器电池图标只读展示电量及充电状态，点击不会进入页面或修改参数。'},
  {id:'home-time',text:'系统时间按当前时区自动刷新，为只读状态。'},
  {id:'home-drone-settings',text:'点击右上角齿轮进入无人机设置，不进入通用设置。'},
  {id:'home-work',text:'点击底部“作业资源”独立进入作业资源页面。'},
  {id:'home-logs',text:'点击底部“日志管理”独立进入日志管理页面。'},
  {id:'home-devices',text:'点击底部“设备管理”独立进入设备管理页面。'},
  {id:'home-connection',text:'“未连接”随无人机连接状态实时变化；原型点击仅定位字段说明，不发送连接或断开命令。'},
  {id:'home-start',text:'点击“开始”先执行版本、自检、权限与登录校验，再进入作业页面；原型不向真实设备发送飞行指令。'}
 ]
};
SCREENS.home.prd.fields=SCREENS.home.prd.controlSpec.fields.map(x=>x.cells);
SCREENS.home.prd.interactions=SCREENS.home.prd.controlSpec.rules.map(x=>x.text);
SCREENS.account.prd.controlSpec={
 fields:[
  {id:'account-sync',cells:['信息同步时间','时间','AccountDataManager.syncTime','云端同步完成后更新','2026-08-12 09:24:39']},
  {id:'account-avatar',cells:['用户头像','图片资源','UserBaseInfo.avatar','无头像时显示默认占位','默认头像']},
  {id:'account-name',cells:['姓名','字符串','AccountDataManager','登录用户，只读','张宣']},
  {id:'account-role',cells:['身份/备注','字符串','UserBaseInfo','可为空，只读','无']},
  {id:'account-medals',cells:['勋章状态','资源状态','iv_model_green / iv_model_red','未获得时置灰','两枚灰色勋章']},
  {id:'account-number',cells:['账号/手机号','字符串','UserBaseInfo.getAccount','只读','14752221887']},
  {id:'account-weight',cells:['吊运重量','重量','云端作业统计','非负，单位磅','0.00磅']},
  {id:'account-sorties',cells:['作业架次','整数','云端作业统计','非负整数','18次']},
  {id:'account-duration',cells:['作业时长','小时','云端作业统计','非负，一位小数','0.8小时']},
  {id:'account-records',cells:['我的飞行记录','页面入口','FlightRecordActivity','App 内页面','喷洒/播撒/吊运记录']},
  {id:'account-insurance',cells:['橙心服务','页面入口','InsuranceSettingFragment','App 内页面','保障状态与续费验机']},
  {id:'account-nofly',cells:['临时禁飞区','页面入口','PlotFenceActivity','App 内页面','禁飞区列表']},
  {id:'account-logout',cells:['退出登录','操作','AccountDataManager / Token','需用户确认；原型不执行','退出登录']}
 ],
 baseRules:[],
 rules:[
  {id:'account-back',text:'点击左上角返回按钮回到首页。'},
  {id:'account-scroll',text:'用户信息内容区可上下滑动；标题栏和返回按钮固定，向下可查看“退出登录”。'},
  {id:'account-sync',text:'信息同步时间由账户数据同步结果更新，为只读信息。'},
  {id:'account-avatar',text:'用户头像仅展示账户资源；资源为空时使用默认占位图。'},
  {id:'account-name',text:'姓名来自当前登录账户，为只读信息。'},
  {id:'account-role',text:'身份或备注为空时显示“无”，该页面不可编辑。'},
  {id:'account-medals',text:'两枚勋章按账户获得状态显示；未获得时使用真机灰色资源。'},
  {id:'account-number',text:'账号/手机号仅展示当前登录账户，不可在本页面修改。'},
  {id:'account-weight',text:'吊运重量显示云端累计值和磅单位；点击仅定位右侧字段说明。'},
  {id:'account-sorties',text:'作业架次显示云端累计次数；点击仅定位右侧字段说明。'},
  {id:'account-duration',text:'作业时长显示云端累计小时数并保留一位小数；点击仅定位右侧字段说明。'},
  {id:'account-records',text:'点击“我的飞行记录”进入喷洒、播撒和吊运记录页面。'},
  {id:'account-insurance',text:'点击“橙心服务”进入保障状态页面；续费验机时校验无人机连接状态。'},
  {id:'account-nofly',text:'点击“临时禁飞区”进入禁飞区列表，并可继续下载、新增或预览。'},
  {id:'account-logout',text:'点击“退出登录”仅定位本条规则；原型不会清除 Token、账户或真实设备状态。'}
 ]
};
SCREENS.account.prd.fields=SCREENS.account.prd.controlSpec.fields.map(x=>x.cells);
SCREENS.account.prd.interactions=SCREENS.account.prd.controlSpec.rules.map(x=>x.text);
SCREENS.work.prd.controlSpec={fields:WORK_PRD_FIELDS,baseRules:[],rules:WORK_PRD_RULES};
Object.assign(FLIGHT_SHOTS,{planMore:'./flight-assets/start-plan-more.png',planWaypoint:'./flight-assets/start-plan-waypoint.png',planObstacle:'./flight-assets/start-plan-obstacle.png'});
// ── flightPlanWheel — 飞行计划轮盘
function flightPlanWheel(e){if(e.clientX>580)return;if(e.deltaY>0&&flightVisualState==='plan')flightSet('planMore',25);else if(e.deltaY<0&&flightVisualState==='planMore')flightSet('plan',15)}
// ── flightManualUIV2 — UI V2
function flightManualUIV2(){if(!String(flightVisualState).startsWith('plan'))return flightManualUI();const s=FLIGHT_SHOTS[flightVisualState]?flightVisualState:'plan';let hits='';hits+=flightHot('flight-hit-back','返回首页',"go('home')");hits+=flightHot('flight-hit-gear','无人机设置',"go('droneSettings')");hits+=flightHot('flight-hit-plan-tab-basic','基础参数',"flightSet('plan',13)");hits+=flightHot('flight-hit-plan-tab-point','航点参数',"flightSet('planWaypoint',13)");hits+=flightHot('flight-hit-plan-tab-obstacle','障碍物参数',"flightSet('planObstacle',13)");hits+=flightHot('flight-hit-plan-mode','地图规划方式',"flightFocus(20,'地图规划方式选择')");hits+=flightHot('flight-hit-plan-point-type','边界点类型',"flightFocus(21,'当前为边界点')");hits+=flightHot('flight-hit-plan-add','添加边界点',"flightFocus(22,'原型已进入添加边界点状态')");hits+=flightHot('flight-hit-plan-exit','退出规划',"flightSet('plot',23,'已退出地图规划')");hits+=flightHot('flight-hit-plan-save','保存规划',"flightFocus(24,'演示模式不写入真实设备')");if(s==='plan'){hits+=flightHot('flight-hit-plan-inset','统一内缩开关',"flightFocus(14,'统一内缩开关已切换')");hits+=flightHot('flight-hit-plan-minus1','减小内缩距离',"flightFocus(15,'内缩距离按步长调整')");hits+=flightHot('flight-hit-plan-plus1','增大内缩距离',"flightFocus(15,'内缩距离按步长调整')");hits+=flightHot('flight-hit-plan-single','单边内缩开关',"flightFocus(16,'单边内缩开关已切换')");hits+=flightHot('flight-hit-plan-minus2','减小作业间距',"flightFocus(17,'作业间距按步长调整')");hits+=flightHot('flight-hit-plan-plus2','增大作业间距',"flightFocus(17,'作业间距按步长调整')");hits+=flightHot('flight-hit-plan-minus3','减小障碍物边距',"flightFocus(18,'障碍物边距按步长调整')");hits+=flightHot('flight-hit-plan-plus3','增大障碍物边距',"flightFocus(18,'障碍物边距按步长调整')");hits+=flightHot('flight-hit-plan-route','绕障方式',"flightFocus(19,'绕障方式在折返与绕行之间切换')");hits+=flightHot('flight-hit-plan-scroll','向下滚动参数',"flightSet('planMore',25)");}else if(s==='planMore'){hits+=flightHot('flight-hit-plan-scroll','向上滚动参数',"flightSet('plan',15)");hits+=flightHot('flight-hit-plan-route','绕障方式',"flightFocus(19,'绕障方式在折返与绕行之间切换')");hits+=flightHot('flight-hit-plan-scan','扫边类型',"flightFocus(25,'扫边类型在不扫边、扫边、仅扫边之间切换')");hits+=flightHot('flight-hit-plan-segment','航线分割设置',"flightFocus(26,'打开航线分割设置')");hits+=flightHot('flight-hit-plan-offset','航线偏移设置',"flightFocus(27,'打开航线偏移设置')");hits+=flightHot('flight-hit-plan-start','起始点设置',"flightFocus(28,'在地图上设置起始点')");hits+=flightHot('flight-hit-plan-heading','航向设置',"flightFocus(29,'在地图上设置航向')");}else if(s==='planWaypoint'){hits+=flightHot('flight-hit-waypoint-stick','航点偏移控制',"flightFocus(30,'按方向微调当前航点')");hits+=flightHot('flight-hit-waypoint-delete','删除航点',"flightFocus(33,'当前没有可删除的航点')");hits+=flightHot('flight-hit-waypoint-prev','上一个航点',"flightFocus(31,'切换到上一个航点')");hits+=flightHot('flight-hit-waypoint-next','下一个航点',"flightFocus(31,'切换到下一个航点')");hits+=flightHot('flight-hit-waypoint-before','前加航点',"flightFocus(32,'在当前航点前插入航点')");hits+=flightHot('flight-hit-waypoint-after','后加航点',"flightFocus(32,'在当前航点后插入航点')");}else{hits+=flightHot('flight-hit-obstacle-help','障碍物选择说明',"flightFocus(34,'请先在地图上选择障碍物')");}return `<section class="tablet-screen flight-manual-screen flight-state-${s}" style="background-image:url('${FLIGHT_SHOTS[s]}')" onwheel="flightPlanWheel(event)" onclick="flightFocus(0)">${hits}<div class="flight-toast" id="flightToast"></div></section>`}

SCREENS.flightManual={num:'01.1',title:'开始作业',source:'FlightMainActivity · activity_flight.xml · FlightMap/Title/HUD/NewWork · 遥控器实机截图',ui:flightManualUIV2,prd:{desc:'首页点击“开始”后进入的手动作业主界面。按真机 1920×1200 屏幕完整呈现卫星地图、连接状态、地图工具、作业类型、地块抽屉、视频预览、飞行 HUD，以及“新增”后的地图规划页。',value:'操作员在同一张地图上选择地块、AB 点或自由航线作业，查看飞行遥测，并进入本地地图规划；本原型的保存、调用和设备控制均为安全演示。',fields:[
['开始作业入口','页面入口','LauncherViewModel.navMission2','版本/自检/权限校验','FlightMainActivity'],
['无人机连接状态','只读状态','DroneReportDataManager.isConnected','实时','无人机未连接'],
['RTK 状态','只读状态','FlightTitleFragment','卫星数与定位状态','0 / RTK'],
['药箱容量','只读状态','喷洒设备上报','当前值/总容量','0.0加仑/14.5加仑'],
['遥控器电量','只读状态','系统电池广播','实时','充电中'],
['地图工具组','地图操作','FlightMapFragment','不改变真实设备参数','地块/清除/返航点/位置'],
['作业类型','单选','FlightNewWorkFragment','地块/AB点/自由航线互斥','地块'],
['地块抽屉','侧滑面板','地块资源列表','搜索并按距离/时间排序','暂无地块'],
['图传布局','弹出面板','FlightMapLayerPopup','前后摄像头各三种布局','前摄单画面/后摄四宫格'],
['视频预览','只读画面','视频流组件','断连显示黑屏','00:00'],
['飞行 HUD','遥测面板','FlightDataFragment','设备上报驱动','高度/流量/距离/速度/已作业'],
['新增作业','页面入口','FlightNewWorkFragment','按当前作业类型进入规划','地图规划'],
['编辑与调用','动作','当前地块/任务','无选中项时禁用','编辑/调用'],
['规划参数页签','枚举','FlightConfigManualFragment','基础/航点/障碍物','基础'],
['统一内缩','布尔','规划参数','开关控制全部边界内缩','开启'],
['内缩距离','数值','规划参数','按步长加减','0.0英尺'],
['单边内缩','布尔','规划参数','开启后单独设置边界','关闭'],
['作业间距','数值','规划参数','必须大于0','23.0英尺'],
['障碍物边距','数值','规划参数','必须大于等于0','9.8英尺'],
['绕障方式','枚举','规划参数','折返/绕行互斥','折返'],
['规划方式','下拉选择','地图规划工具','保持在当前作业窗口','地图规划'],
['点类型','下拉选择','地图规划工具','边界点/障碍物点','边界点'],
['添加点','地图动作','地图中心点','添加到当前未保存规划','＋添加'],
['退出规划','动作','FlightMainActivity','放弃本次未保存编辑','退出'],
['保存规划','动作','本地规划仓库','校验点数和参数后保存','保存'],
['扫边类型','枚举','规划参数','不扫边/扫边/仅扫边互斥','不扫边'],
['航线分割','设置入口','规划参数','进入当前窗口内子设置','设置'],
['航线偏移','设置入口','规划参数','进入当前窗口内子设置','设置'],
['起始点','地图设置','规划参数','从边界点中选择','设置'],
['航向','地图设置','规划参数','按地图方向设置','设置'],
['航点偏移','方向控制','航点参数','向上/下/左/右微调','0.0英尺'],
['航点切换','导航动作','航点列表','首尾边界校验','上一个/下一个'],
['航点插入','动作','航点列表','在当前点前后插入','前加/后加'],
['删除航点','动作','航点列表','无航点时禁用','删除'],
['障碍物选择','地图动作','障碍物参数','先在地图选择障碍物','请选择障碍物'],
['作业方式入口','页面入口','FlightTitleFragment.btnBack','左上角点击打开全屏选择页','请选择作业方式'],
['大田航线','作业方式','EnumFlightType.AUTO','单选；当前选中为彩色卡片','大田航线'],
['农业吊运','作业方式','EnumFlightType.LIFT','单选；按功能与设备条件校验','农业吊运'],
['手动作业','作业方式','EnumFlightType.MANUAL','单选；按解锁状态校验','手动作业'],
['手动增强','作业方式','EnumFlightType.MANUAL_PLUS','单选；按机型能力校验','手动增强'],
['二维航测','作业方式','EnumFlightType.SURVEY_2D','单选；进入航测作业流程','二维航测'],
['返回与关闭','动作','btn_work_type_back / btn_work_type_close','返回当前作业页且不退出 FlightMainActivity','‹ / ×']],
interactions:['首页开始按钮先执行版本、自检、权限与登录校验，再进入手动作业页','连接、RTK、药箱和遥控器电量随设备上报刷新','地图工具只改变地图视图或当前编辑内容，不直接发送飞行指令','地块、AB点和自由航线三种作业类型互斥，选中块为绿色','左侧箭头展开地块抽屉，可搜索并切换距离/时间排序','右上图层图标打开前后摄像头布局面板，再次点击或点面板关闭','断连时视频为黑屏，HUD 的高度、距离、速度、流量和面积均显示 0','新增进入地图规划页，左侧参数面板可滚动查看全部配置','基础、航点、障碍物页签保持同一地图背景并切换参数集','开关、加减和分段按钮联动对应字段，不造成页面跳动','地图规划方式和点类型的选择留在当前作业窗口内','添加以地图十字中心为坐标写入当前草稿','退出返回作业主界面，不遮挡主界面状态','保存前校验边界点数量、参数范围和设备条件','原型中的保存、调用和设备控制仅给出反馈，不写入真实遥控器'],state:['首页校验','手动作业地图','选择作业类型/地块','新增地图规划','保存或退出'],src:'LauncherViewModel.navMission2 → RoutePath.Flight.PAGER_MAIN / PAGE_FLIGHT_MANUAL；activity_flight.xml、fragment_flight_map.xml、fragment_flight_title.xml、fragment_flight_hud.xml、fragment_flight_data.xml、fragment_flight_new_work.xml、fragment_flight_config_manual.xml；最终比例以 2026-08-14 遥控器实机截图为准。',edge:['无人机未连接：保留地图浏览和本地规划，编辑/调用及真实飞行能力禁用','暂无地块：抽屉显示“暂无地块”，编辑与调用为灰色','无视频流：预览区保持黑色并显示 00:00','RTK 无定位：顶部红色显示 0/RTK，地图仍可浏览','规划点不足或参数超限：保存不提交并提示具体校验项','退出未保存规划：返回作业主界面且不写入任务','演示模式：任何按钮均不向真实无人机发送控制指令'],ac:['首页点击开始后进入与遥控器截图一致的卫星地图作业界面','顶部状态、六个地图工具、右侧作业类型、底部视频和 HUD 比例一致','地块、AB点、自由航线可切换且绿色选中块位置准确','左侧地块抽屉包含标题、搜索、距离/时间和暂无地块空态','图传布局面板完整呈现前摄像头与后摄像头的三种布局','新增后地图规划页的基础/航点/障碍物页签、参数和右侧工具完整','退出规划可返回作业主界面；保存只做安全反馈','所有可点击区域均能定位到右侧对应字段与交互规则']}};
Object.assign(FLIGHT_SHOTS,{workMode:'./flight-assets/start-work-mode.png'});
// ── flightChooseMode — 飞行模式选择
function flightChooseMode(id,label){flightVisualState='plot';renderAll();requestAnimationFrame(()=>flightFocus(id,`已选择${label}；演示模式不向无人机发送切换指令`))}
// ── flightManualUIV3 — UI V3
function flightManualUIV3(){if(flightVisualState!=='workMode')return flightManualUIV2().replace("go('home')","flightSet('workMode',35)");let hits='';hits+=flightHot('flight-hit-mode-back','返回作业页',"flightSet('plot',41)");hits+=flightHot('flight-hit-mode-close','关闭作业方式选择',"flightSet('plot',41)");hits+=flightHot('flight-hit-mode-auto','选择大田航线',"flightChooseMode(36,'大田航线')");hits+=flightHot('flight-hit-mode-lift','选择农业吊运',"flightChooseMode(37,'农业吊运')");hits+=flightHot('flight-hit-mode-manual','选择手动作业',"flightChooseMode(38,'手动作业')");hits+=flightHot('flight-hit-mode-plus','选择手动增强',"flightChooseMode(39,'手动增强')");hits+=flightHot('flight-hit-mode-survey','选择二维航测',"flightChooseMode(40,'二维航测')");return `<section class="tablet-screen flight-manual-screen flight-state-workMode" style="background-image:url('${FLIGHT_SHOTS.workMode}')" onclick="flightFocus(35)">${hits}<div class="flight-toast" id="flightToast"></div></section>`}
SCREENS.flightManual.ui=flightManualUIV3;
Object.assign(FLIGHT_SHOTS,{manual:'./flight-assets/start-mode-manual.png'});
// ── flightManualUIV4 — UI V4
function flightManualUIV4(){if(flightVisualState==='workMode'){let hits='';hits+=flightHot('flight-hit-mode-back','返回当前作业页',"flightSet('plot',41)");hits+=flightHot('flight-hit-mode-close','退出到首页',"go('home')");hits+=flightHot('flight-hit-mode-auto','选择大田航线',"flightSet('plot',36,'已返回大田航线')");hits+=flightHot('flight-hit-mode-lift','选择农业吊运',"flightFocus(37,'当前喷洒机型不支持切换农业吊运')");hits+=flightHot('flight-hit-mode-manual','选择手动作业',"flightSet('manual',38,'已进入手动作业')");hits+=flightHot('flight-hit-mode-plus','选择手动增强',"flightFocus(39,'当前设备状态不支持切换手动增强')");hits+=flightHot('flight-hit-mode-survey','选择二维航测',"flightFocus(40,'当前版本二维航测入口尚未开放')");return `<section class="tablet-screen flight-manual-screen flight-state-workMode" style="background-image:url('${FLIGHT_SHOTS.workMode}')" onclick="flightFocus(35)">${hits}<div class="flight-toast" id="flightToast"></div></section>`}if(flightVisualState==='manual'){let hits='';hits+=flightHot('flight-hit-back','请选择作业方式',"flightSet('workMode',35)");hits+=flightHot('flight-hit-status','设备实时状态',"flightFocus(1,'无人机未连接，设备实时状态暂无数据')");hits+=flightHot('flight-hit-gear','无人机设置',"go('droneSettings')");hits+=flightHot('flight-hit-side','展开手动作业面板',"flightFocus(38,'无人机未连接，暂无手动作业数据')");hits+=flightHot('flight-hit-video','视频预览',"flightFocus(9,'无人机未连接，视频画面为空')");hits+=flightHot('flight-hit-hud','飞行HUD',"flightFocus(10,'飞行数据随设备连接状态更新')");hits+=flightHot('flight-hit-edit','编辑作业',"flightFocus(12,'当前没有可编辑的作业')");hits+=flightHot('flight-hit-call','调用作业',"flightFocus(12,'当前没有可调用的作业')");return `<section class="tablet-screen flight-manual-screen flight-state-manual" style="background-image:url('${FLIGHT_SHOTS.manual}')" onclick="flightFocus(38)">${hits}<div class="flight-toast" id="flightToast"></div></section>`}return flightManualUIV3()}
SCREENS.flightManual.ui=flightManualUIV4;
let flightMode='auto';
Object.assign(FLIGHT_SHOTS,{
  manualStable:'./flight-assets/start-mode-manual-stable.png',
  workModeManual:'./flight-assets/start-work-mode-manual-selected.png',
  manualPlus:'./flight-assets/start-mode-manual-plus-stable.png',
  workModeManualPlus:'./flight-assets/start-work-mode-manual-plus-selected.png'
});
// ── flightModeState — 飞行模式状态
function flightModeState(){return flightMode==='manual'?'manual':flightMode==='manualPlus'?'manualPlus':'plot'}
// ── flightSelectMode — 选中飞行模式
function flightSelectMode(mode,id,label){
  flightMode=mode;
  flightVisualState=flightModeState();
  renderAll();
  requestAnimationFrame(()=>flightFocus(id,`已切换为${label}；左上角作业方式标志与选择页状态已同步`));
}
// ── flightManualUIV5 — UI V5
function flightManualUIV5(){
  if(flightVisualState==='workMode'){
    const shot=flightMode==='manual'?FLIGHT_SHOTS.workModeManual:flightMode==='manualPlus'?FLIGHT_SHOTS.workModeManualPlus:FLIGHT_SHOTS.workMode;
    let hits='';
    hits+=flightHot('flight-hit-mode-back','返回当前作业页',"flightSet(flightModeState(),41)");
    hits+=flightHot('flight-hit-mode-close','退出到首页',"go('home')");
    hits+=flightHot('flight-hit-mode-auto','选择大田航线',"flightSelectMode('auto',36,'大田航线')");
    hits+=flightHot('flight-hit-mode-lift','选择农业吊运',"flightFocus(37,'当前喷洒机型不支持切换农业吊运，作业方式保持不变')");
    hits+=flightHot('flight-hit-mode-manual','选择手动作业',"flightSelectMode('manual',38,'手动作业')");
    hits+=flightHot('flight-hit-mode-plus','选择手动增强',"flightSelectMode('manualPlus',39,'手动增强')");
    hits+=flightHot('flight-hit-mode-survey','选择二维航测',"flightFocus(40,'当前版本二维航测入口尚未开放，作业方式保持不变')");
    return `<section class="tablet-screen flight-manual-screen flight-state-workMode flight-mode-${flightMode}" style="background-image:url('${shot}')" onclick="flightFocus(35)">${hits}<div class="flight-toast" id="flightToast"></div></section>`;
  }
  if(flightVisualState==='manual'){
    let hits='';
    hits+=flightHot('flight-hit-back','请选择作业方式',"flightSet('workMode',35)");
    hits+=flightHot('flight-hit-status','设备实时状态',"flightOpenStatus()");
    hits+=flightHot('flight-hit-gear','无人机设置',"go('droneSettings')");
    hits+=flightHot('flight-hit-folder','地块列表',"flightFocus(38,'手动作业模式下显示作业文件入口')");
    hits+=flightHot('flight-hit-eraser','清除轨迹',"flightFocus(38,'当前没有可清除的轨迹')");
    hits+=flightHot('flight-hit-home','返航点',"flightFocus(38,'无人机未连接，暂无返航点')");
    hits+=flightHot('flight-hit-rc','遥控器位置',"flightFocus(38,'已定位到遥控器位置')");
    hits+=flightHot('flight-hit-locate','地图定位',"flightFocus(38,'地图已回到当前位置')");
    hits+=flightHot('flight-hit-layer','图传布局',"flightFocus(38,'手动作业图传布局入口')");
    hits+=flightHot('flight-hit-video','视频预览',"flightFocus(9,'无人机未连接，视频画面为空')");
    hits+=flightHot('flight-hit-hud','飞行HUD',"flightFocus(10,'飞行数据随设备连接状态更新')");
    hits+=flightHot('flight-hit-call','作业设置',"flightFocus(42,'打开手动作业设置')");
    return `<section class="tablet-screen flight-manual-screen flight-state-manual" style="background-image:url('${FLIGHT_SHOTS.manualStable}')" onclick="flightFocus(42)">${hits}<div class="flight-toast" id="flightToast"></div></section>`;
  }
  if(flightVisualState==='manualPlus'){
    let hits='';
    hits+=flightHot('flight-hit-back','请选择作业方式',"flightSet('workMode',35)");
    hits+=flightHot('flight-hit-status','设备实时状态',"flightOpenStatus()");
    hits+=flightHot('flight-hit-gear','无人机设置',"go('droneSettings')");
    hits+=flightHot('flight-hit-folder','地块列表',"flightFocus(43,'手动增强模式下显示作业文件入口')");
    hits+=flightHot('flight-hit-eraser','清除轨迹',"flightFocus(43,'当前没有可清除的轨迹')");
    hits+=flightHot('flight-hit-home','返航点',"flightFocus(43,'无人机未连接，暂无返航点')");
    hits+=flightHot('flight-hit-rc','遥控器位置',"flightFocus(43,'已定位到遥控器位置')");
    hits+=flightHot('flight-hit-locate','地图定位',"flightFocus(43,'地图已回到当前位置')");
    hits+=flightHot('flight-hit-layer','图传布局',"flightFocus(43,'手动增强图传布局入口')");
    hits+=flightHot('flight-hit-video','视频预览',"flightFocus(9,'无人机未连接，视频画面为空')");
    hits+=flightHot('flight-hit-hud','飞行HUD',"flightFocus(10,'飞行数据随设备连接状态更新')");
    hits+=flightHot('flight-hit-plus-panel','作业设置面板',"flightFocus(43,'手动增强作业设置面板保持展开')");
    hits+=flightHot('flight-hit-plus-collapse','收起作业设置',"flightFocus(43,'作业设置面板可收起')");
    hits+=flightHot('flight-hit-plus-spray-minus','减少喷洒用量',"flightFocus(44,'按步长减少喷洒用量')");
    hits+=flightHot('flight-hit-plus-spray-plus','增加喷洒用量',"flightFocus(44,'按步长增加喷洒用量')");
    hits+=flightHot('flight-hit-plus-mode-drizzle','切换呲溜模式',"flightFocus(45,'喷洒模式切换为呲溜')");
    hits+=flightHot('flight-hit-plus-mode-mist','切换雾滴模式',"flightFocus(45,'喷洒模式切换为雾滴')");
    hits+=flightHot('flight-hit-plus-droplet','雾滴大小',"flightFocus(46,'进入雾滴大小选择')");
    hits+=flightHot('flight-hit-plus-spacing-minus','减少作业间距',"flightFocus(47,'按步长减少作业间距')");
    hits+=flightHot('flight-hit-plus-spacing-plus','增加作业间距',"flightFocus(47,'按步长增加作业间距')");
    hits+=flightHot('flight-hit-plus-height-minus','降低相对作物高度',"flightFocus(48,'按步长降低相对作物高度')");
    hits+=flightHot('flight-hit-plus-height-plus','提高相对作物高度',"flightFocus(48,'按步长提高相对作物高度')");
    hits+=flightHot('flight-hit-plus-start','开始手动增强作业',"flightFocus(49,'无人机未连接，不能开始作业')");
    return `<section class="tablet-screen flight-manual-screen flight-state-manualPlus" style="background-image:url('${FLIGHT_SHOTS.manualPlus}')" onclick="flightFocus(43)">${hits}<div class="flight-toast" id="flightToast"></div></section>`;
  }
  return flightManualUIV4();
}
SCREENS.flightManual.ui=flightManualUIV5;
SCREENS.flightManual.prd.fields.push(['当前作业方式','持久单选状态','EnumFlightType / FlightTitleFragment','主界面、左上角标志与选择页选中卡片同步','大田航线 / 手动作业 / 手动增强']);
SCREENS.flightManual.prd.interactions.push('选择大田航线、手动作业或手动增强后保存当前作业方式；返回主界面和再次打开选择页时均保持一致，未支持的作业方式不会改变当前状态。');
SCREENS.flightManual.prd.fields.push(
  ['手动增强作业设置','侧滑面板','FlightManualPlusFragment','保持在作业地图内展开或收起','作业设置'],
  ['喷洒用量','数值步进','ManualPlusSprayConfig','设备能力与参数范围','0.0加仑/英亩'],
  ['喷洒模式','分段单选','ManualPlusSprayConfig','呲溜/雾滴互斥','雾滴'],
  ['雾滴大小','页面入口','ManualPlusSprayConfig','仅雾滴模式可用','50μm'],
  ['作业间距','数值步进','ManualPlusWorkConfig','设备能力与参数范围','23.0英尺'],
  ['相对作物高度','数值步进','ManualPlusWorkConfig','设备能力与参数范围','8.2英尺'],
  ['开始手动增强作业','动作按钮','FlightManualPlusFragment','无人机连接、自检与解锁条件','开始']
);
SCREENS.flightManual.prd.interactions.push('手动增强可正常进入；左上角显示 M⁺，作业设置面板中的喷洒用量、喷洒模式、雾滴大小、作业间距和相对作物高度均联动右侧对应字段。');
Object.assign(FLIGHT_SHOTS,{
  deviceRealtime:'./flight-assets/start-device-realtime-status.png',
  deviceFaults:'./flight-assets/start-device-fault-list.png'
});
let flightReturnState='plot';
// ── flightOpenStatus — 打开飞行状态
function flightOpenStatus(){
  flightReturnState=flightVisualState;
  flightVisualState='deviceStatusRealtime';
  renderAll();
  requestAnimationFrame(()=>flightFocus(50,'已进入设备实时状态'));
}
// ── flightDeviceStatusUI — 飞行设备状态 UI
function flightDeviceStatusUI(){
  const faults=flightVisualState==='deviceStatusFaults';
  let hits='';
  hits+=flightHot('flight-hit-device-back','返回作业界面',"flightSet(flightReturnState,50)");
  hits+=flightHot('flight-hit-device-realtime','设备实时状态',"flightSet('deviceStatusRealtime',51)");
  hits+=flightHot('flight-hit-device-faults','设备故障列表',"flightSet('deviceStatusFaults',60)");
  if(faults){
    hits+=flightHot('flight-hit-device-clear','清除故障记录',"flightFocus(61,'演示模式不清除真实设备故障记录')");
    hits+=flightHot('flight-hit-device-fault-list','设备故障记录',"flightFocus(60,'故障记录按时间、代码、系统和说明显示')");
  }else{
    hits+=flightHot('flight-hit-device-grid','设备系统连接状态',"flightFocus(52,'当前无人机未连接，各系统均显示未连接')");
  }
  const shot=faults?FLIGHT_SHOTS.deviceFaults:FLIGHT_SHOTS.deviceRealtime;
  return `<section class="tablet-screen flight-manual-screen flight-state-${faults?'deviceFaults':'deviceRealtime'}" style="background-image:url('${shot}')" onclick="flightFocus(${faults?60:50})">${hits}<div class="flight-toast" id="flightToast"></div></section>`;
}
// ── flightManualUIV6 — UI V6
function flightManualUIV6(){
  if(flightVisualState==='deviceStatusRealtime'||flightVisualState==='deviceStatusFaults')return flightDeviceStatusUI();
  const ui=flightManualUIV5();
  if(flightVisualState==='workMode'||flightVisualState==='manual'||flightVisualState==='manualPlus')return ui;
  return ui.replace('<div class="flight-toast"',`${flightHot('flight-hit-status','设备实时状态',"flightOpenStatus()")}<div class="flight-toast"`);
}
SCREENS.flightManual.ui=flightManualUIV6;
SCREENS.flightManual.prd.fields.push(
  ['设备状态入口','页面入口','FlightTitleFragment.tv_title','点击“无人机未连接”进入当前 App 内设备状态页','设备实时状态'],
  ['设备状态页签','分段单选','DeviceStatusActivity','设备实时状态/设备故障列表互斥','设备实时状态'],
  ['航电系统','只读状态','设备实时状态','设备上报连接状态','未连接'],
  ['动力系统','只读状态','设备实时状态','设备上报连接状态','未连接'],
  ['视觉系统','只读状态','设备实时状态','设备上报连接状态','未连接'],
  ['喷洒系统','只读状态','设备实时状态','设备上报连接状态','未连接'],
  ['雷达系统','只读状态','设备实时状态','设备上报连接状态','未连接'],
  ['飞行权限','只读状态','设备实时状态','设备上报授权状态','未连接'],
  ['电池','只读状态','设备实时状态','设备上报连接状态','未连接'],
  ['机架模块','只读状态','设备实时状态','设备上报连接状态','未连接'],
  ['设备故障列表','故障记录列表','DeviceStatusActivity','按时间、故障码、系统和说明显示','2号电机未识别'],
  ['清除故障记录','动作按钮','DeviceStatusActivity','需确认且不作用于演示设备','清除']
);
SCREENS.flightManual.prd.interactions.push('点击顶部“无人机未连接”进入设备状态页；设备实时状态与设备故障列表在同一全屏页面内切换，左上角返回后恢复进入前的作业方式。');
let flightMapBaseState='plot';
Object.assign(FLIGHT_SHOTS,{
  formulaPlot:'./flight-assets/map-formula-plot.png',
  formulaAb:'./flight-assets/map-formula-ab.png',
  formulaFree:'./flight-assets/map-formula-free.png'
});
// ── flightOpenFormula — 打开处方公式
function flightOpenFormula(){
  if(['plot','ab','free'].includes(flightVisualState))flightMapBaseState=flightVisualState;
  flightSet('formula',62);
}
// ── flightFormulaType — 处方公式类型
function flightFormulaType(state,id){flightMapBaseState=state;renderAll();requestAnimationFrame(()=>flightFocus(id))}
// ── flightOpenLayer — 打开图层
function flightOpenLayer(){
  if(['plot','ab','free'].includes(flightVisualState))flightMapBaseState=flightVisualState;
  flightSet('layer',8);
}
// ── flightMapOverrideHits — 地图覆盖命中
function flightMapOverrideHits(){
  let hits='';
  hits+=flightHot('flight-hit-folder flight-map-override','处方图',"flightOpenFormula()");
  hits+=flightHot('flight-hit-eraser flight-map-override','清除轨迹',"flightFocus(63)");
  hits+=flightHot('flight-hit-home flight-map-override','返航点',"flightFocus(64)");
  hits+=flightHot('flight-hit-rc flight-map-override','遥控器位置',"flightFocus(65)");
  hits+=flightHot('flight-hit-locate flight-map-override','当前位置',"flightFocus(66)");
  hits+=flightHot('flight-hit-layer flight-map-override','图传布局',"flightOpenLayer()");
  hits+=flightHot('flight-hit-edit flight-map-override','编辑作业（不可用）',"flightFocus(68)");
  hits+=flightHot('flight-hit-call flight-map-override','调用作业（不可用）',"flightFocus(68)");
  return hits;
}
// ── flightFormulaUI — 处方公式 UI
function flightFormulaUI(){
  const base=['plot','ab','free'].includes(flightMapBaseState)?flightMapBaseState:'plot';
  const shot=base==='ab'?FLIGHT_SHOTS.formulaAb:base==='free'?FLIGHT_SHOTS.formulaFree:FLIGHT_SHOTS.formulaPlot;
  let hits='';
  hits+=flightHot('flight-hit-back','退出作业页',"go('home')");
  hits+=flightHot('flight-hit-status','设备实时状态',"flightOpenStatus()");
  hits+=flightHot('flight-hit-gear','无人机设置',"go('droneSettings')");
  hits+=flightHot('flight-hit-eraser flight-map-override','清除轨迹',"flightFocus(63)");
  hits+=flightHot('flight-hit-home flight-map-override','返航点',"flightFocus(64)");
  hits+=flightHot('flight-hit-rc flight-map-override','遥控器位置',"flightFocus(65)");
  hits+=flightHot('flight-hit-locate flight-map-override','当前位置',"flightFocus(66)");
  hits+=flightHot('flight-hit-layer flight-map-override','图传布局',"flightOpenLayer()");
  hits+=flightHot('flight-hit-type-plot','地块作业',"flightFormulaType('plot',6)");
  hits+=flightHot('flight-hit-type-ab','AB点作业',"flightFormulaType('ab',6)");
  hits+=flightHot('flight-hit-type-free','自由航线',"flightFormulaType('free',6)");
  hits+=flightHot('flight-hit-new','新增作业',"flightSet('plan',11)");
  hits+=flightHot('flight-hit-formula-cancel','取消处方图',"flightSet(flightMapBaseState,62)");
  return `<section class="tablet-screen flight-manual-screen flight-state-formula flight-formula-${base}" style="background-image:url('${shot}')" onclick="flightFocus(62)">${hits}<div class="flight-toast" id="flightToast"></div></section>`;
}
// ── flightLayerChoiceHits — 图层选择命中
function flightLayerChoiceHits(){
  let hits=flightHot('flight-hit-layer flight-map-override','关闭图传布局',"flightSet(flightMapBaseState,8)");
  hits+=flightHot('flight-hit-layout-front1 flight-map-override','前摄像头单画面',"flightFocus(67)");
  hits+=flightHot('flight-hit-layout-front2 flight-map-override','前摄像头航向画面',"flightFocus(67)");
  hits+=flightHot('flight-hit-layout-front3 flight-map-override','前摄像头四宫格',"flightFocus(67)");
  hits+=flightHot('flight-hit-layout-back1 flight-map-override','后摄像头单画面',"flightFocus(67)");
  hits+=flightHot('flight-hit-layout-back2 flight-map-override','后摄像头航向画面',"flightFocus(67)");
  hits+=flightHot('flight-hit-layout-back3 flight-map-override','后摄像头四宫格',"flightFocus(67)");
  return hits;
}
Object.assign(FLIGHT_SHOTS,{
  sideAb:'./flight-assets/map-side-ab.png',
  sideFree:'./flight-assets/map-side-free.png'
});
let flightSideBaseState='plot';
// ── flightOpenSide — 打开侧边栏
function flightOpenSide(){
  const base=['plot','ab','free'].includes(flightVisualState)?flightVisualState:'plot';
  flightSideBaseState=base;
  flightSet(base==='ab'?'sideAb':base==='free'?'sideFree':'side',7);
}
// ── flightCloseSide — 关闭侧边栏
function flightCloseSide(){flightSet(flightSideBaseState,7)}
// ── flightSideOverrideHits — 侧边栏覆盖命中
function flightSideOverrideHits(){
  const expanded=['side','sideAb','sideFree'].includes(flightVisualState);
  let hits=expanded
    ?flightHot('flight-hit-side-close flight-side-override','收起地块列表',"flightCloseSide()")
    :flightHot('flight-hit-side flight-side-override','展开地块列表',"flightOpenSide()");
  if(expanded){
    hits+=flightHot('flight-hit-side-search flight-side-override','搜索地块',"flightFocus(7)");
    hits+=flightHot('flight-hit-side-sort flight-side-override','地块排序',"flightFocus(7)");
  }
  return hits;
}
// ── flightManualUIV7 — UI V7（最新）
function flightManualUIV7(){
  if(flightVisualState==='formula')return flightFormulaUI();
  const ui=flightManualUIV6();
  if(flightVisualState==='layer')return ui.replace('<div class="flight-toast"',`${flightLayerChoiceHits()}<div class="flight-toast"`);
  if(['plot','ab','free','side','sideAb','sideFree'].includes(flightVisualState))return ui.replace('<div class="flight-toast"',`${flightMapOverrideHits()}${flightSideOverrideHits()}<div class="flight-toast"`);
  return ui;
}
SCREENS.flightManual.ui=flightManualUIV7;
SCREENS.flightManual.prd.fields.push(
  ['处方图','侧栏入口','FlightMapFragment','覆盖左侧地图区域，取消后恢复原作业类型','暂无处方图'],
  ['清除轨迹','地图动作','FlightMapFragment','无轨迹时页面保持不变','清除'],
  ['返航点定位','地图动作','FlightMapFragment','无人机未连接时页面保持不变','H'],
  ['遥控器位置','地图定位','FlightMapFragment','移动地图中心，不打开新页面','遥控器'],
  ['当前位置','地图定位','FlightMapFragment','移动地图中心，不打开新页面','定位箭头'],
  ['图传布局选项','弹层单选','FlightMapLayerPopup','前后摄像头各三种布局，选择时弹层保持','单画面/航向/四宫格'],
  ['编辑与调用','禁用动作','当前地块/任务','无选中任务时不触发页面和提示','禁用']
);
SCREENS.flightManual.prd.interactions.push('地图工具按真机分别执行：处方图打开左侧栏；清除轨迹与返航点在断连空状态下保持页面；遥控器位置和当前位置仅移动地图；图传布局在弹层内选择前后摄像头布局。');

let cur='home';
// ── sec — HTML 转义（防 XSS）
function sec(n,t,c,ac=''){return `<section class="prd-sec" id="prdsec${n}"><h2><span class="sec-num ${ac}">${n}</span>${t}</h2>${c}</section>`}
// ── stripMarkup — 去除 HTML 标记
function stripMarkup(v){const d=document.createElement('div');d.innerHTML=String(v??'');return (d.textContent||'').replace(/\s+/g,' ').trim()}
// ── fieldLabel — 字段标签提取
function fieldLabel(v){const d=document.createElement('div');d.innerHTML=String(v??'');d.querySelectorAll('small').forEach(x=>x.remove());return (d.textContent||'').replace(/\s+/g,' ').trim()}
// ── controlKind — 控件类型推断
function controlKind(el){if(el.tagName==='INPUT')return '输入框';const txt=stripMarkup(el.textContent);if(el.classList.contains('setting-switch'))return '开关';if(el.classList.contains('drone-step'))return txt.includes('−')?'减少按钮':'增加按钮';if(el.classList.contains('chev'))return '导航按钮';if(el.closest('.drone-segment'))return '分组选项';return '操作按钮'}
// ── buildControlSpec — 从控件 DOM 反推规格
function buildControlSpec(rows,source,p,prefix='r'){const fields=[],rules=[];rows.forEach((r,ri)=>{const label=fieldLabel(r[0])||`设置项${ri+1}`,id=`${prefix}${ri}`,box=document.createElement('div');box.innerHTML=r[1]||'';const controls=[...box.querySelectorAll('button,input,select')];let type='只读状态',check='只读',example=stripMarkup(r[1])||'-';if(box.querySelector('.setting-switch')){type='布尔';check='布尔状态';example=box.querySelector('.setting-switch.on')?'开启':'关闭'}else if(box.querySelector('.drone-step')){type='数值';check='设备连接与参数范围';example=stripMarkup(box.querySelector('.drone-value')?.textContent)||'-'}else if(box.querySelector('input')){type='文本/数值';check='格式、必填与范围';example=box.querySelector('input').value||box.querySelector('input').placeholder||'-'}else if(box.querySelector('.drone-segment')){type='枚举';check='选项内单选';example=stripMarkup(box.querySelector('.drone-segment .on')?.textContent)||'-'}else if(box.querySelector('.chev')){type='页面入口';check='目标为 App 内页面';example='进入子页面'}else if(controls.length){type='操作';check='连接状态与操作前置条件';example=stripMarkup(controls[0].textContent)||'执行'}fields.push({id,cells:[label,type,source,check,example]});if(!controls.length)rules.push({id,text:`“${label}”为${type}，点击该行定位字段说明。`});controls.forEach((el,ci)=>{const kind=controlKind(el),txt=stripMarkup(el.value||el.textContent)||kind,cid=`${id}c${ci}`;let action=`操作“${label}”的${kind}“${txt}”`;if(kind==='减少按钮')action=`点击减号，按设定步长减少“${label}”`;if(kind==='增加按钮')action=`点击加号，按设定步长增加“${label}”`;if(kind==='导航按钮')action=`点击箭头进入“${label}”子页面`;if(kind==='开关')action=`切换“${label}”的开启/关闭状态`;if(kind==='输入框')action=`编辑“${label}”，失焦或确认时校验输入`;if(kind==='分组选项')action=`选择“${label}”的“${txt}”选项，同组其他选项取消选中`;rules.push({id:cid,text:`${action}；该操作归属于字段“${label}”，不会新增字段记录。`})})});return {fields,rules,baseRules:p.interactions}}
// ── buildSubControlSpec — 子控件规格构建
function buildSubControlSpec(rows,source,p){return buildControlSpec(rows,source,p,'s')}
// ── renderPRD — 渲染 PRD 文档面板
function renderPRD(s){const p=s.prd,cf=p.controlSpec;const fields=cf?cf.fields.map(x=>x.cells):p.fields;const fieldIds=cf?cf.fields.map(x=>x.id):fields.map((_,i)=>String(i));const ruleItems=cf?[...cf.baseRules.map((x,i)=>({id:`base${i}`,text:x})),...cf.rules]:p.interactions.map((x,i)=>({id:String(i),text:x}));return `<div class="prd-head"><div class="prd-crumb">惠达 GCS / ${s.title}</div><h1>${s.title}</h1><span class="prd-source">${s.source}</span></div>`+sec(1,'功能说明',`<p>${p.desc}</p><p class="value">${p.value}</p>`)+sec(2,'字段清单',`<div class="prd-table-wrap"><table class="prd-table"><thead><tr><th>字段</th><th>类型</th><th>来源</th><th>校验</th><th>示例</th></tr></thead><tbody>${fields.map((f,i)=>`<tr data-field-id="${fieldIds[i]}">${f.map(x=>`<td>${x}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`)+sec(3,'交互规则',`<ol>${ruleItems.map(x=>`<li data-field-id="${x.id}">${x.text}</li>`).join('')}</ol>`)+sec(4,'状态流转',`<div class="state-flow">${p.state.map((x,i)=>`${i?'<span class="state-arrow">›</span>':''}<span class="state-step ${i===1?'on':''}">${x}</span>`).join('')}</div>`)+sec(5,'数据来源',`<div class="source-box">${p.src}</div>`)+sec(6,'边界与异常',`<ul>${p.edge.map(x=>`<li>${x}</li>`).join('')}</ul>`)+sec(7,'AC 验收标准',`<ul class="ac-list">${p.ac.map((x,i)=>`<li><span class="ac-box" onclick="this.classList.toggle('checked')"></span><span class="ac-id">AC-${i+1}</span><span>${x}</span></li>`).join('')}</ul>`,'ac')}
// ── renderSwitcher — 渲染左侧导航栏
function renderSwitcher(){const el=document.getElementById('switcher');el.innerHTML=`<div class="nav-heading">实机屏幕 <span>6 屏</span></div>`+Object.entries(SCREENS).map(([id,s])=>`<div class="sw-item ${id===cur?'active':''}" onclick="go('${id}')"><span class="sw-num">${s.num}</span><span class="sw-title">${s.title}</span><span class="sw-dot"></span></div>`).join('');const sel=document.getElementById('screenSelect');sel.innerHTML=Object.entries(SCREENS).map(([id,s])=>`<option value="${id}" ${id===cur?'selected':''}>${s.num} · ${s.title}</option>`).join('');sel.onchange=e=>go(e.target.value)}
// ── renderAll — 全量渲染入口
function renderAll(){const base=SCREENS[cur];const release=DRONE_PRD[droneTab],debug=DEBUG_PAGE_DATA[droneTab];let s=base;ACTIVE_SUB_ROWS=null;if(cur==='droneSettings'){const rows=debug?(droneTab==='otherDebug'?otherDebugFieldRows():debug.rows):droneRows();const spec=debug?{title:`无人机设置 · ${debug.title}`,desc:`${debug.title}的完整调试页面；主内容与左侧菜单均可独立上下滑动。`,value:'用于工程调试、设备诊断和参数核对。',fields:debug.fields,interactions:debug.interactions,state:['切换菜单','读取回报','调整或执行','成功/失败反馈'],src:debug.source,edge:debug.edge,ac:[`${debug.title}字段完整呈现`,'每个按钮对应独立字段与交互规则','长内容可滚动到底部','危险操作不作用于真实设备']}:release;const merged={...base.prd,...spec};merged.controlSpec=buildControlSpec(rows,debug?debug.source:base.source,merged);s={...base,title:spec.title,source:debug?debug.source:base.source,prd:merged}}const ui=s.ui();if(cur!=='droneSettings'&&ACTIVE_SUB_ROWS&&s.prd){const prd={...s.prd};prd.controlSpec=buildSubControlSpec(ACTIVE_SUB_ROWS,s.source,prd);s={...s,prd}}document.getElementById('screen').innerHTML=ui;if(cur==='droneSettings'&&droneTab==='other'){const otherBody=document.querySelector('.other-real-body');if(otherBody)requestAnimationFrame(()=>otherBody.scrollTop=otherScrollTop)}document.getElementById('prd').innerHTML=renderPRD(s);renderSwitcher();document.querySelector('.prd-col').scrollTop=0;fitTablet();updateClock()}
// ── go — 屏幕跳转（路由）
function go(id){
  if(id==='droneSettings'){
    if(cur==='flightManual')droneLayerOrigin='flightManual';
    else if(cur==='home')droneLayerOrigin='home';
  }
  if(id==='home'&&droneLayerOrigin==='flightManual'&&cur!=='flightManual'){
    droneLayerOrigin='home';
    cur='flightManual';
    renderAll();
    closeDrawers();
    return;
  }
  cur=id;
  renderAll();
  closeDrawers();
}
// ── linkPRD — PRD 双向联动
function linkPRD(id){if(cur==='home'&&id==='prdsec3'){flightVisualState='plot';go('flightManual');return}const col=document.querySelector('.prd-col'),el=document.getElementById(id);if(!col||!el)return;col.scrollTo({top:el.offsetTop-col.offsetTop-10,behavior:'smooth'});document.querySelectorAll('.prd-sec.flash').forEach(x=>x.classList.remove('flash'));el.classList.add('flash');setTimeout(()=>el.classList.remove('flash'),1700)}
// ── toggleNav — 切换导航折叠
function toggleNav(){document.querySelector('.prd-col').classList.remove('open');const n=document.querySelector('.nav-col');n.classList.toggle('open');document.getElementById('overlay').classList.toggle('show',n.classList.contains('open'))}function togglePrd(){document.querySelector('.nav-col').classList.remove('open');const p=document.querySelector('.prd-col');p.classList.toggle('open');document.getElementById('overlay').classList.toggle('show',p.classList.contains('open'))}function closeDrawers(){document.querySelector('.nav-col').classList.remove('open');document.querySelector('.prd-col').classList.remove('open');document.getElementById('overlay').classList.remove('show')}
// ── fitTablet — 平板尺寸自适应
function fitTablet(){const col=document.querySelector('.proto-col'),shell=document.getElementById('tabletShell'),tablet=document.getElementById('tablet');if(!col||!shell||!tablet)return;const maxW=window.innerWidth<=1220?col.clientWidth-16:960;const scale=Math.min(1,maxW/960);tablet.style.transform=`scale(${scale})`;shell.style.width=`${960*scale}px`;shell.style.height=`${600*scale}px`}
// ── updateClock — 顶部时钟刷新
function updateClock(){const el=document.getElementById('homeTime');if(!el)return;const d=new Date(),h=String(d.getHours()).padStart(2,'0'),m=String(d.getMinutes()).padStart(2,'0');el.textContent=`${h}:${m}(GMT+08:00)`}
window.addEventListener('resize',fitTablet);setInterval(updateClock,30000);renderAll();

/* ===========================================
 * 【🟡 06.6 存储管理 · 新增】
 * 启动存储检查 + 存储管理页（离线轨迹/日志/缓存清理）
 * 数据为原型模拟值，不读取真实磁盘；接真实设备时
 * 可替换为 navigator.storage.estimate() 与各目录扫描结果。
 * ============================================ */
const GB = 1024 ** 3;
const MB = 1024 * 1024;
let STORAGE_STATE = {
  total: 32 * GB,
  used: 28.6 * GB,
  online: true,                       // 模拟网络状态（后台上传依赖；离线时自动暂停）
  traceTab: 'local',                  // 离线轨迹点子页当前 tab：local（本地）/ uploading（上传中）
  traceMonths: { '2026-08': true },   // 本地 tab 月份展开态（默认仅展开最新月份）
  selected: {},                       // 多选选中态（date -> true），用于批量上传/删除
  tracePoints: [
    { date: '2026-08-16', count: 86400, sizeMB: 337, status: 'uploading', uploaded: 43200 },
    { date: '2026-08-15', count: 86400, sizeMB: 330, status: 'waiting',   uploaded: 0 },
    { date: '2026-08-14', count: 72000, sizeMB: 281, status: 'paused',    uploaded: 30000 },
    { date: '2026-08-13', count: 86400, sizeMB: 341, status: 'pending',   uploaded: 0 },
    { date: '2026-08-12', count: 50000, sizeMB: 196, status: 'completed', uploaded: 50000 },
    { date: '2026-08-11', count: 40000, sizeMB: 157, status: 'completed', uploaded: 40000 },
    { date: '2026-08-10', count: 30000, sizeMB: 118, status: 'completed', uploaded: 30000 },
    { date: '2026-07-29', count: 60000, sizeMB: 230, status: 'pending',   uploaded: 0 },
    { date: '2026-07-20', count: 45000, sizeMB: 176, status: 'pending',   uploaded: 0 }
  ],
  logs: [
    { name: '遥控器日志(16组)', sizeMB: 42 },
    { name: 'RTK日志', sizeMB: 36 },
    { name: 'MCU串口日志', sizeMB: 18 },
    { name: '图传日志', sizeMB: 24 }
  ],
  cacheMB: 171.2
};
function fmtGB(b){ return (b / GB).toFixed(1) + ' GB'; }
function fmtMB(mb){ return mb >= 1024 ? (mb / 1024).toFixed(2) + ' GB' : mb.toFixed(1) + ' MB'; }
function traceTotalMB(){ return STORAGE_STATE.tracePoints.reduce((s, t) => s + t.sizeMB, 0); }
function logTotalMB(){ return STORAGE_STATE.logs.reduce((s, l) => s + l.sizeMB, 0); }
// ── 存储页辅助：月份分组 + 上传状态文案
function dayId(d){ return 'd' + d.replace(/-/g, ''); }
function groupTraceByMonth(){
  const map = {};
  STORAGE_STATE.tracePoints.forEach(t => { const k = t.date.slice(0, 7); (map[k] = map[k] || []).push(t); });
  return Object.keys(map).sort().reverse().map(m => ({ month: m, days: map[m] }));
}
function statusText(t){
  if(t.status === 'waiting') return '等待中';
  if(t.status === 'uploading') return '上传中';
  if(t.status === 'paused') return '已暂停';
  if(t.status === 'completed') return '已完成';
  return '待上传';
}
function statusClass(t){
  const allow = ['waiting','uploading','paused','completed'];
  return 'st-' + (allow.includes(t.status) ? t.status : 'pending');
}
function speedText(t){
  if(t.status === 'uploading') return (t.speedMBps || 0).toFixed(1) + ' MB/s';
  if(t.status === 'waiting') return '排队中';
  if(t.status === 'paused') return '已暂停';
  if(t.status === 'completed') return '已完成';
  return '';
}
// 剩余时间（HH:MM:SS；上传中按当前速度推算；其他状态返回占位）
function etaText(t){
  if(t.status !== 'uploading') return '';
  const sp = t.speedMBps || 0;
  if(sp <= 0) return '剩余 --:--:--';
  const remain = (t.sizeMB - (t.uploaded / t.count) * t.sizeMB) / sp;
  if(!isFinite(remain) || remain <= 0) return '剩余 00:00:00';
  const h = Math.floor(remain / 3600);
  const m = Math.floor((remain % 3600) / 60);
  const s = Math.floor(remain % 60);
  const pad = n => String(n).padStart(2, '0');
  return '剩余 ' + pad(h) + ':' + pad(m) + ':' + pad(s);
}
// 已传 / 总量（按文件大小）
function sizeProgressText(t){
  const up = (t.uploaded / t.count) * t.sizeMB;
  return fmtMB(up) + '，共 ' + fmtMB(t.sizeMB);
}
// 直接更新某天的进度条/徽章/速度（后台定时器每 500ms 调用，避免整页重绘闪烁）
function updateTraceDom(t){
  const pct = t.count ? Math.round(t.uploaded / t.count * 100) : 100;
  const prog = document.getElementById('prog-' + dayId(t.date));
  if(prog){
    const fill = prog.querySelector('.trace-prog-fill');
    if(fill) fill.style.width = pct + '%';
  }
  const sp = document.getElementById('speed-' + dayId(t.date));
  if(sp) sp.textContent = t.status === 'uploading' ? speedText(t) : '';
  const st = document.getElementById('status-' + dayId(t.date));
  if(st){ st.textContent = statusText(t); st.className = 'tu-status ' + statusClass(t); }
  const sz = document.getElementById('size-' + dayId(t.date));
  if(sz) sz.textContent = sizeProgressText(t);
  const eta = document.getElementById('eta-' + dayId(t.date));
  if(eta) eta.textContent = etaText(t);
}
// ── 后台上传引擎：全局定时器，离开存储页仍持续上传；按 uploaded 偏移续传（断点续传）
// 队列并发上限：超过上限的等待中(waiting)轨迹排队，体现“等待中”状态
let _uploadEngine = null;
const UPLOAD_MAX_CONCURRENT = 2;
function startUploadEngine(){
  if(_uploadEngine) return;
  _uploadEngine = setInterval(() => {
    const items = STORAGE_STATE.tracePoints;
    const before = items.map(t => t.status).join('|');   // 状态快照：仅当状态切换时才整页重绘（刷新按钮组）
    const active = items.filter(t => t.status === 'uploading').length;
    let slots = UPLOAD_MAX_CONCURRENT - active;
    items.forEach(t => {                          // 等待中 → 上传中（受并发上限约束）
      if(slots <= 0) return;
      if(t.status === 'waiting'){ t.status = 'uploading'; slots--; }
    });
    items.forEach(t => {
      if(t.status !== 'uploading') return;
      if(!STORAGE_STATE.online){ t.status = 'paused'; updateTraceDom(t); return; }
      const rate = Math.max(1, Math.round(t.count / 24));   // 每拍推进的点数（约 12s 传完一天）
      t.uploaded = Math.min(t.count, t.uploaded + rate);
      t.speedMBps = (rate / t.count) * t.sizeMB * 2;         // 2 拍/秒 → MB/s
      if(t.uploaded >= t.count){ t.status = 'completed'; t.speedMBps = 0; }
      updateTraceDom(t);
    });
    const after = items.map(t => t.status).join('|');
    if(before !== after) renderAll();   // 等待中↔上传中↔已暂停↔已完成 等状态变化时刷新按钮（暂停/继续/取消）
  }, 500);
}
// ── storageUI — 存储空间总览（参考系统存储空间：大标题 + 分段进度条 + 分类列表）
function storageUI(){
  const s = STORAGE_STATE;
  const cacheGB = s.cacheMB / 1024;
  const traceGB = traceTotalMB() / 1024;
  const logGB = logTotalMB() / 1024;
  const otherGB = Math.max(0, (s.used / GB) - cacheGB - traceGB - logGB);
  const availGB = (s.total - s.used) / GB;
  const cats = [
    { key:'cache', label:'缓存数据', sizeGB:cacheGB, color:'#3366ff', clean:'cache' },
    { key:'log', label:'日志', sizeGB:logGB, color:'#ff9500', clean:'log' },
    { key:'trace', label:'离线轨迹点', sizeGB:traceGB, color:'#7b4cff', page:'storageTrace' }
  ];
  const segs = [];
  cats.filter(c => c.sizeGB > 0).forEach(c => {
    segs.push(`<span style="width:${Math.max(0.3, c.sizeGB / (s.total / GB) * 100)}%;background:${c.color}"></span>`);
  });
  if(otherGB > 0.01) segs.push(`<span style="width:${Math.max(0.3, otherGB / (s.total / GB) * 100)}%;background:#bbbbbb"></span>`);
  if(availGB > 0.01) segs.push(`<span style="width:${Math.max(0.3, availGB / (s.total / GB) * 100)}%;background:#e8e8e8"></span>`);
  const rows = cats.map(c => {
    const right = c.clean === 'cache'
      ? `<span class="storage-size">${fmtGBFromGB(c.sizeGB)}</span><button class="storage-clean-small" onclick="cleanCacheFromSpace()">放心清理</button>`
      : c.clean === 'log'
      ? `<span class="storage-size">${fmtGBFromGB(c.sizeGB)}</span><button class="storage-clean-small warn" onclick="confirmCleanLogs()">清理</button>`
      : `<span class="storage-size">${fmtGBFromGB(c.sizeGB)}</span><span class="storage-chev">›</span>`;
    const clickable = c.page ? `onclick="enterStorageTrace()"` : '';
    return `<div class="storage-row ${c.page ? 'clickable' : ''}" ${clickable}>
      <span class="storage-dot" style="background:${c.color}"></span>
      <span class="storage-name">${c.label}</span>
      <span class="storage-right">${right}</span>
    </div>`;
  }).join('');
  return `<section class="tablet-screen page">${head('存储空间', 'settings')}
    <div class="storage-space-body">
      <div class="storage-space-card">
        <div class="storage-space-title">${fmtGB(s.used)} <span class="storage-space-total">| ${fmtGB(s.total)}</span></div>
        <div class="storage-space-bar">${segs.join('')}</div>
        <div class="storage-space-sub">已使用 / 总容量 · 可用 ${fmtGB(s.total - s.used)}</div>
      </div>
      <div class="storage-space-group">
        <div class="storage-space-group-title">用户数据</div>
        <div class="storage-row-list">${rows}</div>
      </div>
    </div></section>`;
}
function fmtGBFromGB(gb){ return gb >= 1 ? gb.toFixed(2) + ' GB' : (gb * 1024).toFixed(1) + ' MB'; }
function cleanCacheFromSpace(){ cleanCache(); toastStorage('已清理缓存数据'); }
function confirmCleanLogs(){
  const el = document.getElementById('tablet'); if(!el) return;
  const m = document.createElement('div');
  m.className = 'confirm-modal storage-confirm-modal';
  m.innerHTML = `<div class="confirm-dialog">
    <h3>清理日志文件</h3>
    <p>将删除遥控器内所有日志</p>
    <div class="confirm-actions"><button onclick="closeConfirmDialog()">取消</button><button class="confirm-primary" onclick="cleanLogs();closeConfirmDialog()">清理</button></div>
  </div>`;
  el.appendChild(m);
}
function closeConfirmDialog(){ document.querySelectorAll('.storage-confirm-modal').forEach(x => x.remove()); }
// ── storageTraceUI — 离线轨迹点管理（本地 / 上传中 两个 Tab）
function storageTraceUI(){
  const s = STORAGE_STATE;
  const tab = s.traceTab;
  const localList = s.tracePoints.filter(t => t.status === 'pending');
  const upList = s.tracePoints.filter(t => t.status !== 'pending');
  const localSel = localList.filter(t => s.selected[t.date]).length;
  const localAll = localList.length && localList.every(t => s.selected[t.date]);
  const tabs = `<div class="trace-tabs">
    <div class="trace-tab ${tab === 'local' ? 'on' : ''}" onclick="toggleTraceTab('local')">本地 <span class="tcount">${localList.length}</span></div>
    <div class="trace-tab ${tab === 'uploading' ? 'on' : ''}" onclick="toggleTraceTab('uploading')">上传中 <span class="tcount">${upList.length}</span></div>
  </div>`;
  let body;
  if(tab === 'local'){
    const months = groupTraceByMonth().filter(m => m.days.some(d => d.status === 'pending'));
    const monthHtml = months.map(m => {
      const days = m.days.filter(d => d.status === 'pending');
      const mExp = !!s.traceMonths[m.month];
      const monthChecked = days.length && days.every(d => s.selected[d.date]);
      const mSize = days.reduce((a, d) => a + d.sizeMB, 0);
      const daysHtml = mExp ? days.map(t => {
        const sel = !!s.selected[t.date];
        return `<div class="trace-local-row">
          <span class="trace-chk ${sel ? 'on' : ''}" onclick="toggleTraceSelect('${t.date}');event.stopPropagation()">${sel ? '✓' : ''}</span>
          <span class="tl-date">${t.date.slice(5)}</span>
          <span class="tl-meta">${t.count.toLocaleString()} 点 · ${fmtMB(t.sizeMB)}</span>
        </div>`;
      }).join('') : '';
      return `<div class="trace-month">
        <button class="trace-month-head" onclick="toggleTraceMonth('${m.month}')">
          <span class="trace-chk ${monthChecked ? 'on' : ''}" onclick="toggleMonthSelect('${m.month}');event.stopPropagation()">${monthChecked ? '✓' : ''}</span>
          <span class="tm-chev">${mExp ? '▾' : '›'}</span>
          <span class="tm-label">${m.month} 月</span>
          <span class="tm-meta">${days.length} 天 · ${fmtMB(mSize)}</span>
        </button>
        ${mExp ? `<div class="trace-days">${daysHtml}</div>` : ''}
      </div>`;
    }).join('');
    body = `<div class="storage-section">
      <div class="storage-sec-head">本地轨迹 <span class="size">${fmtMB(localList.reduce((a, t) => a + t.sizeMB, 0))}</span>
        <div class="trace-actions">
          <span class="trace-sel-all" onclick="toggleSelectAllTrace()"><span class="trace-chk ${localAll ? 'on' : ''}">${localAll ? '✓' : ''}</span><span>全选</span></span>
          <button class="trace-act up" ${localSel ? '' : 'disabled'} onclick="batchUploadTrace()">上传</button>
          <button class="trace-act del" ${localSel ? '' : 'disabled'} onclick="confirmDeleteTrace()">清理</button>
        </div>
      </div>
      <div class="trace-list">${monthHtml || '<div class="trace-empty">暂无本地轨迹</div>'}</div>
    </div>`;
  } else {
    const rows = upList.map(t => {
      const pct = t.count ? Math.round(t.uploaded / t.count * 100) : 100;
      const speed = t.status === 'uploading' ? speedText(t) : '';
      return `<div class="trace-up-row">
        <div class="tu-main">
          <div class="tu-head">
            <span class="tu-title">${t.date.slice(5)}<span class="tu-status ${statusClass(t)}" id="status-${dayId(t.date)}">${statusText(t)}</span></span>
          </div>
          <div class="tu-foot">
            <div class="trace-prog" id="prog-${dayId(t.date)}">
              <span class="trace-prog-fill" style="width:${pct}%"></span>
            </div>
            <span class="tu-actions">
              ${t.status === 'uploading' ? `<button class="tu-icon" title="暂停" onclick="togglePause('${t.date}')">⏸</button>` : ''}
              ${t.status === 'paused' ? `<button class="tu-icon" title="继续" onclick="togglePause('${t.date}')">▶</button>` : ''}
              ${t.status !== 'completed' ? `<button class="tu-icon" title="取消" onclick="cancelUpload('${t.date}')">✕</button>` : ''}
            </span>
          </div>
          <div class="tu-info">
            <span id="size-${dayId(t.date)}">${sizeProgressText(t)}</span>
            <span class="dot">·</span>
            <span id="speed-${dayId(t.date)}">${t.status === 'uploading' ? speedText(t) : ''}</span>
            <span class="dot">·</span>
            <span id="eta-${dayId(t.date)}">${etaText(t)}</span>
          </div>
        </div>
      </div>`;
    }).join('');
    body = `<div class="storage-section">
      <div class="storage-sec-head">上传队列 <span class="size">${fmtMB(upList.reduce((a, t) => a + t.sizeMB, 0))}</span>
        <div class="trace-actions">
          <button class="trace-act up" onclick="pauseAllUploading()">暂停全部</button>
          <button class="trace-act up" onclick="resumeAllUploading()">开始全部</button>
        </div>
      </div>
      <div class="trace-list">${rows || '<div class="trace-empty">上传队列为空</div>'}</div>
    </div>`;
  }
  return `<section class="tablet-screen page">${head('离线轨迹点', 'settings')}
    <div class="storage-body">
      ${tabs}
      ${body}
      <div class="system-toast" id="storageToast"></div>
    </div></section>`;
}
// ── 离线轨迹点 · Tab 切换与选择（日志清理确认框见上方 confirmCleanLogs）
function toggleTraceTab(tab){ STORAGE_STATE.traceTab = tab; STORAGE_STATE.selected = {}; renderAll(); }
function toggleTraceMonth(m){ STORAGE_STATE.traceMonths[m] = !STORAGE_STATE.traceMonths[m]; renderAll(); }
function toggleTraceSelect(d){ if(STORAGE_STATE.selected[d]) delete STORAGE_STATE.selected[d]; else STORAGE_STATE.selected[d] = true; renderAll(); }
function toggleMonthSelect(month){
  const days = STORAGE_STATE.tracePoints.filter(t => t.date.slice(0,7) === month && t.status === 'pending');
  const allSel = days.length && days.every(d => STORAGE_STATE.selected[d.date]);
  days.forEach(d => { if(allSel) delete STORAGE_STATE.selected[d.date]; else STORAGE_STATE.selected[d.date] = true; });
  renderAll();
}
function toggleSelectAllTrace(){
  const list = STORAGE_STATE.traceTab === 'local'
    ? STORAGE_STATE.tracePoints.filter(t => t.status === 'pending')
    : STORAGE_STATE.tracePoints.filter(t => t.status !== 'pending');
  const allSel = list.length && list.every(t => STORAGE_STATE.selected[t.date]);
  if(allSel) list.forEach(t => delete STORAGE_STATE.selected[t.date]);
  else list.forEach(t => STORAGE_STATE.selected[t.date] = true);
  renderAll();
}
// 上传中：取消上传，回到“本地”（保留本地副本，仅退出上传队列）
function cancelUpload(d){
  const t = STORAGE_STATE.tracePoints.find(x => x.date === d);
  if(!t || t.status === 'completed') return;
  t.status = 'pending';
  t.speedMBps = 0;
  STORAGE_STATE.traceTab = 'local';   // 取消后回到本地列表（状态已置回 pending）
  STORAGE_STATE.selected = {};
  renderAll();
  toastStorage('已取消上传：' + d);
}
// 进入离线轨迹点：清理已完成的本地副本（下次进入不再显示），并释放对应空间
function enterStorageTrace(){
  const s = STORAGE_STATE;
  let freed = 0;
  s.tracePoints = s.tracePoints.filter(t => {
    if(t.status === 'completed'){ freed += t.sizeMB; return false; }
    return true;
  });
  if(freed) s.used = Math.max(0, s.used - freed * MB);
  go('storageTrace');
}
// 上传中：暂停 / 继续（断点续传，保留 uploaded 偏移）
function togglePause(d){
  const t = STORAGE_STATE.tracePoints.find(x => x.date === d);
  if(!t) return;
  if(t.status === 'uploading') t.status = 'paused';
  else if(t.status === 'paused') t.status = 'uploading';
  else if(t.status === 'waiting') t.status = 'paused';
  startUploadEngine();
  renderAll();
}
// ── 暂停全部 / 开始全部（上传中 Tab 顶部工具栏）
function pauseAllUploading(){
  let n = 0;
  STORAGE_STATE.tracePoints.forEach(t => {
    if(t.status === 'uploading' || t.status === 'waiting'){ t.status = 'paused'; n++; }
  });
  startUploadEngine();
  renderAll();
  if(n) toastStorage('已暂停 ' + n + ' 个上传任务');
}
function resumeAllUploading(){
  let n = 0;
  STORAGE_STATE.tracePoints.forEach(t => {
    if(t.status === 'paused' || t.status === 'waiting'){ t.status = 'uploading'; n++; }
  });
  startUploadEngine();
  renderAll();
  if(n) toastStorage('已开始/续传 ' + n + ' 个上传任务');
}
function batchUploadTrace(){
  const sel = STORAGE_STATE.selected;
  const n = STORAGE_STATE.tracePoints.filter(t => sel[t.date] && t.status === 'pending').length;
  if(!n) return;
  STORAGE_STATE.tracePoints.forEach(t => { if(sel[t.date] && t.status === 'pending') t.status = 'waiting'; });
  startUploadEngine();
  STORAGE_STATE.selected = {};
  renderAll();
  toastStorage('已加入上传队列 ' + n + ' 天（支持断点续传）');
}
function confirmDeleteTrace(){
  const sel = STORAGE_STATE.selected;
  const keys = Object.keys(sel);
  if(!keys.length) return;
  const el = document.getElementById('tablet'); if(!el) return;
  const m = document.createElement('div');
  m.className = 'confirm-modal storage-confirm-modal';
  m.innerHTML = `<div class="confirm-dialog">
    <h3>清理离线轨迹点</h3>
    <p>将删除选中的 ${keys.length} 天离线轨迹</p>
    <div class="confirm-actions"><button onclick="closeConfirmDialog()">取消</button><button class="confirm-danger" onclick="batchDeleteTrace()">删除</button></div>
  </div>`;
  el.appendChild(m);
}
function batchDeleteTrace(){
  const sel = STORAGE_STATE.selected;
  const keys = Object.keys(sel);
  let freed = 0;
  STORAGE_STATE.tracePoints.forEach(t => { if(sel[t.date]) freed += t.sizeMB; });
  STORAGE_STATE.used = Math.max(0, STORAGE_STATE.used - freed * MB);
  STORAGE_STATE.tracePoints = STORAGE_STATE.tracePoints.filter(t => !sel[t.date]);
  STORAGE_STATE.selected = {};
  closeConfirmDialog();
  renderAll();
  toastStorage('已批量清理离线轨迹 ' + keys.length + ' 天（' + fmtMB(freed) + '）');
}
function cleanLogs(){ const total = logTotalMB(); STORAGE_STATE.used = Math.max(0, STORAGE_STATE.used - total * MB); STORAGE_STATE.logs = []; renderAll(); toastStorage('已清理日志文件 ' + fmtMB(total)); }
function cleanCache(){ const c = STORAGE_STATE.cacheMB; STORAGE_STATE.used = Math.max(0, STORAGE_STATE.used - c * MB); STORAGE_STATE.cacheMB = 0; renderAll(); toastStorage('已清理缓存 ' + fmtMB(c)); }
function toastStorage(msg){ const el = document.getElementById('storageToast'); if(!el) return; el.textContent = msg; el.classList.add('show'); clearTimeout(window._stTimer); window._stTimer = setTimeout(() => el.classList.remove('show'), 1600); }
// ── 启动存储检查弹框
function showStorageFullDialog(){
  const el = document.getElementById('tablet'); if(!el) return;
  const m = document.createElement('div');
  m.className = 'confirm-modal storage-full-modal';
  m.innerHTML = `<div class="confirm-dialog">
    <h3>遥控器存储空间不足</h3>
    <p>遥控器存储空间将满，请进入设置-存储空间进行清理不常用文件。</p>
    <div class="confirm-actions"><button onclick="closeStorageDialog()">取消</button><button class="confirm-primary" onclick="go('storage');closeStorageDialog()">文件清理</button></div>
  </div>`;
  el.appendChild(m);
}
function closeStorageDialog(){ document.querySelectorAll('.storage-full-modal,.storage-confirm-modal').forEach(x => x.remove()); }
function checkStorageOnLaunch(){
  startUploadEngine();   // 后台上传引擎随应用启动（即使未进入存储页也持续上传）
  const avail = STORAGE_STATE.total - STORAGE_STATE.used;
  if(avail < 5 * GB){ setTimeout(showStorageFullDialog, 400); }
}
// ── 注册存储屏幕
Object.assign(SCREENS, {
  storage: {
    num: '06.6',
    title: '存储空间',
    source: 'SettingsFragment · 存储空间（原型新增演示）',
    ui: storageUI,
    prd: {
      desc: '参考系统存储空间界面，展示总容量、已使用与可用空间，并提供缓存数据、离线轨迹点、日志三类数据的快捷清理入口。',
      value: '在存储将满时及时清理不常用文件，避免作业数据无法继续缓存。',
      fields: [
        ['总容量','存储量','系统存储','只读','32.0 GB'],
        ['已使用','存储量','系统存储','只读','实时'],
        ['可用空间','存储量','系统存储','只读','< 5GB 时启动弹框'],
        ['缓存数据','快捷清理','应用缓存','可清理','放心清理'],
        ['离线轨迹点','子页管理','本地轨迹缓存','可展开/上传/清理','每日约 200-340MB'],
        ['日志','快捷清理','各模块日志目录','可清理','清理需确认']
      ],
      interactions: ['顶部大标题与分段进度条展示空间占用','缓存数据行点击“放心清理”直接清空','点击“离线轨迹点”进入轨迹管理子页','日志行点击“清理”弹框确认后清空','存储空间不足时启动弹框提示进入本页'],
      state: ['进入存储空间','查看总览','进入子页清理或上传','反馈结果'],
      src: '原型新增演示；真实实现参考 MqttDatabase 与各模块日志目录清理。',
      edge: ['原型数据为模拟值，不读取真实磁盘','清理不删除真实文件','上传不发送真实数据'],
      ac: ['总览进度条与可用空间清晰','缓存数据可直接放心清理','离线轨迹按天展开并可上传/清理','日志行点击“清理”弹框确认后清空','启动空间不足弹框可进入本页']
    }
  },
  storageTrace: {
    num: '06.6.1',
    title: '离线轨迹点',
    source: 'SettingsFragment · 离线轨迹点管理（原型新增演示）',
    ui: storageTraceUI,
    prd: {
      desc: '离线轨迹点管理子页，分为「本地」与「上传中」两个 Tab。本地轨迹无状态、仅显示点数与大小，通过顶部工具栏批量上传/清理；上传中轨迹每行三段（上：日期+点数·大小 … 速度+状态；中：进度条+位置标记；下：操作），状态分等待中/上传中/已暂停/已完成，可暂停/继续/取消（取消即回到本地）。已完成的本地副本下次进入自动移除并释放空间。',
      value: '恢复网络后补传离线轨迹，或手动清理已不需要的本地轨迹以释放空间。',
      fields: [
        ['Tab 切换','分段控件','本地 / 上传中','切换','切换时清空多选'],
        ['本地轨迹','列表','未上传轨迹','可上传/清理','仅显示点数与大小'],
        ['上传队列','列表','上传中轨迹','实时','状态+进度+速度'],
        ['状态','文本','等待中/上传中/已暂停/已完成','实时','右上角显示'],
        ['速度','文本','MB/s','实时','仅上传中显示'],
        ['进度条','进度','上传偏移','实时','带位置标记 O'],
        ['全选/上传/清理','顶部工具栏','本地批量操作','操作','选中后上传/清理（清理需确认）'],
        ['暂停/继续/取消','行内操作','上传中单天','操作','暂停保留偏移、取消回到本地']
      ],
      interactions: ['点击 Tab 在本地/上传中切换','本地勾选后点顶部“上传”加入队列、“清理”弹框确认后删除','上传中每行上段显示日期+点数·大小与速度+状态，中段进度条带位置标记','单天可“暂停/继续”或“取消”（取消回到本地）','上传中勾选后点顶部“删除”可批量删除','已完成项下次进入自动移除并释放空间','点击“全选”切换当前 Tab 所有天的选中'],
      state: ['进入离线轨迹点','切换 Tab','本地上传或清理 / 上传中暂停或删除','反馈结果'],
      src: '原型新增演示；真实实现遍历 MqttDatabase 未上传轨迹并按天分片上传，上传中维护队列与并发。',
      edge: ['原型数据为模拟值，不上传真实数据','断点续传通过 uploaded 偏移模拟','等待中按并发上限排队','删除只从模拟占用中扣除'],
      ac: ['本地与上传中明确分离，状态不再混排','本地仅显示大小与操作','上传中每行三段：日期+点数·大小/速度+状态、进度条带标记、操作按钮','上传中显示进度与速度、支持暂停/继续断点续传','取消即回到本地、删除前弹框二次确认','已完成项下次进入自动不显示']
    }
  }
});
// 脚本加载即执行启动检查
checkStorageOnLaunch();
