/* Mission Resources and Log Management only; reuse the original navigation and data. */
(() => {
  const state = {uploads: [], uploadSerial: 0, txFolder: false};
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const glyph = name => '<svg class="v2-glyph" viewBox="0 0 80 80" aria-hidden="true">'+(name==='signal'?'<path d="M12 32a40 40 0 0 1 56 0M22 44a25 25 0 0 1 36 0M33 56a10 10 0 0 1 14 0"/><circle cx="40" cy="67" r="2"/>':'<path d="M21 9h25l15 16v46H21zM46 9v18h15M30 39h22M30 49h22M30 59h15"/>')+'</svg>';
  const header = (title, back, action='') => `<header class="v2-header"><button type="button" class="v2-back" onclick="${back}" aria-label="Back">${icon('i-back')}</button><h1>${title}</h1><div class="v2-header-actions">${action}</div></header>`;
  const empty = (type,title,copy,action='') => `<div class="v2-empty">${glyph(type)}<h2>${title}</h2><p>${copy}</p>${action}</div>`;
  const tabs = (items,current,handler) => `<div class="v2-tabs" role="tablist">${items.map(([id,label])=>`<button type="button" role="tab" aria-selected="${id===current}" class="${id===current?'active':''}" onclick="${handler}('${id}')">${label}</button>`).join('')}</div>`;
  const pill = (label,good=false) => `<span class="v2-pill ${good?'good':''}">${label}</span>`;
  let installed = false;
  window.installMissionsLogs = () => {
    if (installed || document.documentElement.dataset.language !== 'en') return;
    installed = true;
  workUI = function () {
    if (workImport) return workImportUI();
    const local = workStore === 'local', plot = workTab === 'plot';
    return `<section class="tablet-screen page work-screen">${head('Missions')}<div class="mission-layout"><aside class="work-side"><span class="ops-label">LIBRARY</span><button class="${plot?'on':''}" onclick="setWorkTab('plot','wtab-plot')">Fields</button><button class="${workTab==='running'?'on':''}" onclick="setWorkTab('running','wtab-running')">In progress</button><button class="${workTab==='tif'?'on':''}" onclick="setWorkTab('tif','wtab-tif')">Prescription maps</button></aside><div class="work-main"><div class="mission-toolbar"><div class="segmented"><button class="${local?'on':''}" onclick="setWorkStore('local')">On controller</button><button class="${!local?'on':''}" onclick="setWorkStore('cloud')">Cloud</button></div>${plot?'<button class="ops-primary" onclick="workImport=true;renderAll()">Import field</button>':''}</div><div class="mission-filters"><label class="mission-search"><input id="missionSearch" aria-label="Search missions" placeholder="Search by name" oninput="window.filterMissionCards(this.value)"></label><button class="ops-secondary" onclick="toggleWorkOrder()">Date ${workOrder==='desc'?'↓':'↑'}</button><button class="ops-secondary" onclick="toggleWorkMulti()">${workMulti?'Done':'Select'}</button></div>${local&&plot?`<button class="mission-sync" onclick="toggleWorkSync()"><span class="fake-check ${workSync?'checked':''}">${workSync?'✓':''}</span>Automatically sync to cloud</button>`:''}${workCloudCards() || '<div class="mission-empty"><strong>No fields on this controller</strong><p>Import a field or browse your cloud library to get started.</p></div>'}${workMulti?`<div class="mission-selection"><span>Selection mode</span><span>No fields selected</span></div>`:''}</div></div></section>`;
  };
  SCREENS.work.ui = workUI;
window.filterMissionCards = function (query) {
  const needle = query.trim().toLowerCase();
  document.querySelectorAll('.work-card').forEach(card => {card.hidden = !card.textContent.toLowerCase().includes(needle);});
};
  window.v2Folder = () => {state.txFolder=!state.txFolder;renderAll();};
  window.v2ToggleTxAll = () => {const files=LOG_TX_FILES.filter(f=>!f[2]);if(files.every(f=>logTxSelected.has(f[0])))logTxSelected.clear();else files.forEach(f=>logTxSelected.add(f[0]));renderAll();};
  window.v2DeleteTx = () => {for(let i=LOG_TX_FILES.length-1;i>=0;i--)if(logTxSelected.has(LOG_TX_FILES[i][0])&&!LOG_TX_FILES[i][2])LOG_TX_FILES.splice(i,1);logTxSelected.clear();renderAll();};
  window.v2QueueLogs = () => {
    const note=document.getElementById('v2-upload-note')?.value.trim()||'';
    const selected=logTab==='transmission' ? LOG_TX_FILES.filter(f=>!f[2]&&logTxSelected.has(f[0])).map(f=>({name:f[0],size:f[1]})) : LOG_GROUPS.filter(g=>logSelectedGroups.has(g.name)).map(g=>({name:g.name,size:g.size}));
    if(!selected.length)return;
    selected.forEach(file=>state.uploads.push({...file,id:++state.uploadSerial,note,status:'Queued',progress:0}));
    logUploadDialog=false;logManager=true;logManagerTab='pending';renderAll();
  };
  window.v2RunUploads = () => {
    state.uploads.filter(u=>u.status==='Queued').forEach(u=>{u.status='Uploading';u.progress=20;});renderAll();
    setTimeout(()=>{state.uploads.filter(u=>u.status==='Uploading').forEach(u=>{u.status='Completed';u.progress=100;});if(cur==='logs')renderAll();},1000);
  };
  window.v2CancelUpload = id => {state.uploads=state.uploads.filter(u=>u.id!==id||u.status==='Completed');renderAll();};
    logTransmissionUI = () => {
      const aircraft=logTxSection==='drone',files=LOG_TX_FILES.filter(f=>!f[2]),selected=files.filter(f=>logTxSelected.has(f[0])).length;
      return `<div class="v2-link-body"><div class="v2-link-toolbar">${tabs([['controller','Controller'],['drone','Aircraft']],logTxSection,'v2TxSource')}<label class="v2-toggle-label">Record logs<button class="setting-switch ${logTxSwitch?'on':''}" role="switch" aria-checked="${logTxSwitch}" aria-label="Record video link logs" onclick="logTxSwitch=!logTxSwitch;renderAll()"></button></label></div><div class="v2-status-strip"><span class="v2-dot ${aircraft?'':'online'}"></span>${aircraft?'Aircraft disconnected':'Controller video link connected'}<span>${aircraft?'Connect the aircraft to retrieve its logs.':files.length+' files · local sample data'}</span></div>${aircraft?empty('signal','Aircraft not connected','Power on and connect an aircraft to view its video link logs.'):`<div class="v2-file-table"><div class="v2-file-head"><span>Selection</span><span>File name</span><span>Size</span><span>Type</span></div><div class="v2-file-scroll">${state.txFolder?`<button class="v2-folder" onclick="v2Folder()">‹ Back to controller logs</button>${empty('file','No files in this folder','The sample lighttpd folder is empty.')}`:`<button class="v2-folder" onclick="v2Folder()">${glyph('file')}<span>lighttpd</span><small>Folder</small><span>›</span></button>${files.map(f=>`<label class="v2-file-row"><input type="checkbox" aria-label="Select ${escape(f[0])}" ${logTxSelected.has(f[0])?'checked':''} onchange="toggleTxSelect('${escape(f[0])}')"><span>${escape(f[0])}</span><span>${escape(f[1])}</span><small>Log file</small></label>`).join('')}`}</div></div>`}<footer class="v2-action-footer"><span>${aircraft?'No aircraft logs':selected+' selected'}</span>${aircraft?'':`<button class="v2-text" onclick="v2ToggleTxAll()">${selected===files.length&&files.length?'Clear selection':'Select all files'}</button>`}<div></div><button class="v2-secondary" ${!selected||aircraft?'disabled':''} onclick="v2DeleteTx()">Delete sample</button><button class="v2-primary" ${!selected||aircraft?'disabled':''} onclick="openLogRemark()">Upload</button></footer></div>`;
    };
    window.v2TxSource = source => {logTxSection=source;logTxSelected.clear();state.txFolder=false;renderAll();};
    logUploadDialogUI = () => !logUploadDialog?'':`<div class="v2-modal-mask"><section class="v2-dialog" role="dialog" aria-modal="true" aria-labelledby="v2-upload-title"><h2 id="v2-upload-title">Upload selected logs</h2><p>Add a note to help identify this upload. Files stay inside this prototype.</p><label>Upload note <span>Optional · 30 characters</span><input id="v2-upload-note" maxlength="30" placeholder="Describe the issue or flight"></label><footer><button class="v2-secondary" onclick="logUploadDialog=false;renderAll()">Cancel</button><button class="v2-primary" onclick="v2QueueLogs()">Add to queue</button></footer></section></div>`;
    logManagerUI = () => {
      const history=logManagerTab==='history',items=state.uploads.filter(u=>history?u.status==='Completed':u.status!=='Completed');
      return `<section class="tablet-screen v2-screen">${header('Upload manager','logManager=false;renderAll()',`<span class="v2-subtle">Prototype uploads</span>`)}${tabs([['pending','Queue'],['history','History']],logManagerTab,'v2ManagerTab')}<div class="v2-manager-summary"><span>${items.length} ${items.length===1?'item':'items'} ${history?'completed':'in queue'}</span>${!history?`<button class="v2-primary" ${!items.some(u=>u.status==='Queued')?'disabled':''} onclick="v2RunUploads()">Start demo upload</button>`:''}</div><main class="v2-manager-list">${items.length?items.map(u=>`<article class="v2-upload-row">${glyph('file')}<div><strong>${escape(u.name)}</strong><p>${escape(u.size)}${u.note?' · '+escape(u.note):''}</p><div class="v2-progress"><i style="width:${u.progress}%"></i></div></div>${pill(u.status,u.status==='Completed')}${!history?`<button class="v2-text" onclick="v2CancelUpload(${u.id})">Cancel</button>`:''}</article>`).join(''):empty('file',history?'No upload history':'Your queue is empty',history?'Completed demo uploads will appear here.':'Select logs, then choose Upload to add them here.',`<button class="v2-secondary" onclick="logManager=false;renderAll()">Browse logs</button>`)}</main></section>`;
    };
    window.v2ManagerTab = tab => {logManagerTab=tab;renderAll();};

    window.refineMissionsLogs = () => {
      const root = document.getElementById('screen');
      root.classList.toggle('missions-logs-context',cur === 'work' || cur === 'logs');
      if (cur === 'logs') {
        const heading = root.querySelector('.logs-screen > .page-head');
        if (heading && !heading.querySelector('.logs-page-label')) {
          const label = document.createElement('h1');label.className='logs-page-label';label.textContent='Logs';heading.appendChild(label);
        }
      }
    };
  };
})();
