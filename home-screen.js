/* Home-only renderer. The existing language bundles own navigation and device state. */
(() => {
  const labels = {
    en: { settings: 'Settings', disconnected: 'Aircraft disconnected', connection: 'Manage connection', notifications: 'Notifications', profile: 'Profile', missions: 'Mission Library', records: 'Flight Records', logs: 'Log Upload', devices: 'Devices', start: 'Start', actions: 'Home actions', close: 'Close notifications', empty: 'No controller alerts.', storage: 'Controller storage is low', review: 'Manage storage', alert: '1 controller alert' },
    zh: { settings: '设置', disconnected: '无人机未连接', connection: '管理连接', notifications: '通知', profile: '个人中心', missions: '任务库', records: '飞行记录', logs: '日志上传', devices: '设备管理', start: '开始', actions: '首页操作', close: '关闭通知', empty: '暂无遥控器提醒。', storage: '遥控器存储空间不足', review: '管理存储', alert: '1 条遥控器提醒' }
  };
  // Fixed SVG paths, never user-provided markup.
  const paths = {
    settings: '<path d="M9 3h6l1 4 4 1 1 5-3 3-1 5h-6l-1-4-4-1-1-5 3-3Z"/><circle cx="12" cy="12" r="3"/>',
    notifications: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
    profile: '<circle cx="12" cy="8" r="4"/><path d="M4 21v-2c0-7 16-7 16 0v2"/>',
    missions: '<path d="m4 17 5-10 7 10 4-10"/><circle cx="4" cy="17" r="2"/><circle cx="9" cy="7" r="2"/><circle cx="16" cy="17" r="2"/><circle cx="20" cy="7" r="2"/>',
    records: '<path d="M4 20h17M6 16v-5M12 16V5M18 16V8"/>',
    logs: '<path d="M6 3h9l3 3v15H6zM14 3v4h4M9 11h6M9 15h6"/>',
    devices: '<rect x="4" y="5" width="16" height="14" rx="2"/><path d="M8 9h8M8 13h5"/>'
  };
  const icon = name => `<svg viewBox="0 0 24 24" aria-hidden="true">${paths[name]}</svg>`;
  let notificationsOpen = false;
  let installed = false;

  window.installHomeScreen = () => {
    if (installed) return;
    const root = document.getElementById('screen');
    if (!root) return;
    installed = true;
    const text = labels[document.documentElement.dataset.language] || labels.en;
    const button = (action, label, className = '') => `<button type="button" class="${className}" data-home-action="${action}">${icon(action)}<span>${label}</span></button>`;
    const renderHome = () => {
      const lowStorage = typeof STORAGE_STATE !== 'undefined' && STORAGE_STATE.total - STORAGE_STATE.used < 5 * GB;
      return `<section class="tablet-screen home-launcher" aria-label="${text.actions}">
        <div class="home-launcher-photo">
          <div class="home-launcher-header">
            <div class="home-launcher-header-group">
              ${button('settings', text.settings)}
              <button type="button" class="home-launcher-status" data-home-action="connection"><i aria-hidden="true"></i><span>${text.disconnected}</span><small>${text.connection} →</small></button>
            </div>
            <div class="home-launcher-header-group">
              <button type="button" class="home-launcher-bell" data-home-action="notifications" aria-label="${text.notifications}${lowStorage ? ', ' + text.alert : ''}" aria-expanded="${notificationsOpen}"${notificationsOpen ? ' aria-controls="home-launcher-notifications"' : ''}>${icon('notifications')}${lowStorage ? '<i class="home-launcher-alert" aria-hidden="true"></i>' : ''}</button>
              ${button('profile', text.profile)}
            </div>
          </div>
          ${notificationsOpen ? `<section class="home-launcher-notifications" id="home-launcher-notifications" role="dialog" aria-label="${text.notifications}"><header><h2>${text.notifications}</h2><button type="button" data-home-action="close" aria-label="${text.close}">×</button></header>${lowStorage ? `<p>${text.storage}</p><button type="button" data-home-action="storage">${text.review} →</button>` : `<p>${text.empty}</p>`}</section>` : ''}
        </div>
        <nav class="home-launcher-footer" aria-label="${text.actions}">
          <div class="home-launcher-planning">${button('missions', text.missions)}${button('records', text.records)}</div>
          <div class="home-launcher-utilities">${button('logs', text.logs)}${button('devices', text.devices)}</div>
          <button type="button" class="home-launcher-start" data-home-action="start"><span>${text.start}</span><span aria-hidden="true">→</span></button>
        </nav>
      </section>`;
    };
    const focus = action => requestAnimationFrame(() => root.querySelector(`[data-home-action="${action}"]`)?.focus());
    const closeNotifications = () => { notificationsOpen = false; renderAll(); focus('notifications'); };
    const actions = {
      settings: () => go('settings'),
      connection: () => { deviceView = 'drone'; go('devices'); },
      profile: () => go('account'),
      missions: () => go('work'),
      records: () => go('flightRecords'),
      logs: () => { logManager = false; logTab = 'controller'; go('logs'); },
      devices: () => { deviceView = 'main'; go('devices'); },
      start: () => go('flightManual'),
      storage: () => { notificationsOpen = false; go('storage'); },
      notifications: () => { notificationsOpen = !notificationsOpen; renderAll(); focus(notificationsOpen ? 'close' : 'notifications'); },
      close: closeNotifications
    };
    // Delegate once: navigation redraws replace the Home markup.
    root.addEventListener('click', event => {
      const trigger = event.target.closest('[data-home-action]');
      if (trigger && root.contains(trigger)) actions[trigger.dataset.homeAction]?.();
    });
    root.addEventListener('keydown', event => {
      if (event.key === 'Escape' && notificationsOpen && root.querySelector('.home-launcher')) {
        event.preventDefault();
        closeNotifications();
      }
    });
    homeUI = renderHome;
    SCREENS.home.ui = renderHome;
  };
})();
