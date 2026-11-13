/* English controls for screenshot-based views. Geographic map labels remain untouched. */
(() => {
  const el = (tag, cls = '', text = '') => { const node = document.createElement(tag); node.className = cls; if (text) node.textContent = text; return node; };
  // Read icons from the same original screenshot pixels used by the Chinese view.
  const rasterIcon=(file,x,y,w,h,cls='')=>{
    const node=el('span',`native-icon native-raster-icon ${cls}`);
    node.setAttribute('aria-hidden','true');
    node.style.cssText=`width:${w}px;height:${h}px;background-image:url('./flight-assets/${file}');background-size:960px 600px;background-position:-${x}px -${y}px;background-repeat:no-repeat;`;
    return node;
  };
  const originalIcons={
    'chevron-left':['start-work-mode.png',53,32,20,25],
    'chevron-right':['start-work-mode.png',53,32,20,25,'raster-flip'],
    'chevron-down':['start-new.png',909,184,20,17],
    'plus':['start-after2.png',828,381,21,24],
    'trash-2':['start-plan-waypoint.png',239,190,26,27],
    'fault-trash':['start-device-fault-list.png',885,36,27,28],
    'boundary-point':['start-plan-waypoint.png',782,243,15,15],
    'circle-alert':['map-side-ab.png',347.5,90.5,27,27],
    'x':['start-work-mode.png',885,32,24,25]
  };
  const image=(name,cls='')=>{
    if(originalIcons[name]){const [file,x,y,w,h,extra='']=originalIcons[name];return rasterIcon(file,x,y,w,h,`${extra} ${cls}`);}
    throw new Error(`Missing original icon: ${name}`);
  };
  const text = value => el('span', 'native-label', value);
  const draft = () => window.PROTOTYPE_FLIGHT_UI ||= { inset: 0, spacing: 23, margin: 9.8, uniform: true, single: false, bypass: 0, edge: 0, rate: 0, spray: 1, height: 8.2, collapsed: false, planScroll: 0, plusScroll: 0 };
  const sourceControl = (surface, cls) => surface.querySelector(`.${cls}`);
  function control(surface, cls, label, options = {}) {
    const button = el('button', `native-control ${options.className || ''}`);
    button.type = 'button'; button.setAttribute('aria-label', options.aria || label);
    if (options.icon) button.append(image(options.icon));
    if (label) button.append(text(label));
    if (options.endIcon) button.append(image(options.endIcon));
    button.addEventListener('click', event => {
      event.stopPropagation(); options.before?.();
      if (options.refresh) window.renderAll();
      const current = document.querySelector('#screen .flight-manual-screen') || surface;
      const original=sourceControl(current,cls);
      if(original)original.click();
      else {const fallback={
        'flight-hit-plan-scan':[25,'Switch among No Edge Pass, Edge Pass, and Edge Only.'],
        'flight-hit-plan-segment':[26,'Open route split settings.'],
        'flight-hit-plan-offset':[27,'Open route offset settings.'],
        'flight-hit-plan-start':[28,'Set the start point on the map.'],
        'flight-hit-plan-heading':[29,'Set the heading on the map.']
      }[cls];if(fallback)flightFocus(...fallback); }
    });
    return button;
  }
  function mount(surface, node, x, y, width, height, rects) {
    node.style.cssText += `left:${x}px;top:${y}px;width:${width}px;height:${height}px;`;
    node.classList.add('native-flight-part'); surface.append(node);
    rects.push({x,y,w:width,h:height}); return node;
  }
  function segmented(surface, items, active, onSelect, cls = 'native-segments') {
    const row = el('div', cls); row.setAttribute('role','group');
    items.forEach((item, i) => {
      const b = control(surface, item.cls, item.label, {before: () => onSelect?.(i), refresh: !!onSelect});
      b.classList.toggle('is-active', i === active); b.setAttribute('aria-pressed', String(i === active)); row.append(b);
    }); return row;
  }
  function stepper(surface, key, unit, minus, plus, step = 1) {
    const row = el('div', 'native-stepper');
    const change = sign => () => { const d = draft(); d[key] = Math.max(0, Math.round((d[key] + sign * step) * 10) / 10); };
    const a = control(surface, minus, '−', {className:'step-action',aria:`Decrease ${key}`,before:change(-1),refresh:true});
    const value = el('output','native-step-value', `${draft()[key].toFixed(1)} ${unit}`);
    const b = control(surface, plus, '+', {className:'step-action',aria:`Increase ${key}`,before:change(1),refresh:true});
    row.append(a,value,b); return row;
  }
  function titleRow(label, right) { const row = el('div','native-setting-title'); row.append(text(label)); if(right) row.append(right); return row; }
  function toggle(surface, key, cls, label) {
    const b = control(surface, cls, '', {aria:label,className:'native-switch',before:()=>draft()[key]=!draft()[key],refresh:true});
    b.classList.toggle('is-on',draft()[key]); b.setAttribute('role','switch'); b.setAttribute('aria-checked',String(draft()[key])); return b;
  }
  function header(surface,rects,planning){
    // Keep the original mode, RTK, tank, battery, gear, and header background.
    const title=planning?el('div','native-flight-status planning'):control(surface,'flight-hit-status','Aircraft Disconnected',{className:'native-flight-status',aria:'Live Device Status'});
    if(planning)title.append(text('Map Planning'));
    mount(surface,title,70,12,270,36,rects);
    if(!planning){
      const current=el('div','native-tank-unit current','0.0 gal');
      const capacity=el('div','native-tank-unit capacity','/14.5 gal');
      mount(surface,current,814,14,57,19,rects);mount(surface,capacity,809,32,62,20,rects);
    }
  }
  // Exact original glyph silhouettes; foreground follows the button color.
  const missionGlyphs = {"plot":"<path fill=\"currentColor\" opacity=\"0.031\" d=\"M5 11h1v1h-1zM30 11h1v1h-1zM37 11h1v1h-1zM5 12h1v1h-1zM37 12h1v1h-1zM30 13h1v1h-1zM37 13h1v1h-1zM38 13h1v1h-1zM38 14h1v1h-1zM6 15h1v1h-1zM36 15h1v1h-1zM38 15h1v1h-1zM5 16h1v1h-1zM13 16h1v1h-1zM29 16h1v1h-1zM35 16h1v1h-1zM30 17h1v1h-1zM7 18h1v1h-1zM35 18h1v1h-1zM12 36h1v1h-1zM30 36h1v1h-1zM37 36h1v1h-1zM5 37h1v1h-1zM37 37h1v1h-1zM30 38h1v1h-1zM37 38h1v1h-1zM38 38h1v1h-1zM12 39h1v1h-1zM38 39h1v1h-1zM6 40h1v1h-1zM12 40h1v1h-1zM36 40h1v1h-1zM38 40h1v1h-1zM7 41h1v1h-1zM11 41h1v1h-1zM13 41h1v1h-1zM29 41h1v1h-1zM5 42h1v1h-1zM37 42h1v1h-1zM6 43h1v1h-1zM31 43h1v1h-1zM36 43h1v1h-1zM9 44h1v1h-1zM33 44h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.063\" d=\"M5 13h1v1h-1zM5 14h1v1h-1zM12 14h1v1h-1zM37 14h1v1h-1zM5 15h1v1h-1zM31 15h1v1h-1zM7 16h1v1h-1zM10 16h1v1h-1zM37 16h1v1h-1zM6 17h1v1h-1zM12 17h1v1h-1zM36 17h1v1h-1zM31 36h1v1h-1zM12 37h1v1h-1zM5 38h1v1h-1zM5 39h1v1h-1zM37 39h1v1h-1zM13 40h1v1h-1zM29 40h1v1h-1zM30 40h1v1h-1zM5 41h1v1h-1zM31 41h1v1h-1zM37 41h1v1h-1zM6 42h1v1h-1zM12 42h1v1h-1zM30 42h1v1h-1zM7 43h1v1h-1zM10 43h1v1h-1zM11 43h1v1h-1zM32 43h1v1h-1zM35 43h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.094\" d=\"M11 15h1v1h-1zM37 15h1v1h-1zM12 16h1v1h-1zM30 16h1v1h-1zM32 16h1v1h-1zM11 36h1v1h-1zM30 39h1v1h-1zM5 40h1v1h-1zM37 40h1v1h-1zM30 41h1v1h-1zM36 41h1v1h-1zM36 42h1v1h-1zM8 43h1v1h-1zM9 43h1v1h-1zM33 43h1v1h-1zM34 43h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.125\" d=\"M32 10h1v1h-1zM6 16h1v1h-1zM36 16h1v1h-1zM7 17h1v1h-1zM35 17h1v1h-1zM10 35h1v1h-1zM31 35h1v1h-1zM6 41h1v1h-1zM12 41h1v1h-1zM7 42h1v1h-1zM8 42h1v1h-1zM9 42h1v1h-1zM10 42h1v1h-1zM11 42h1v1h-1zM31 42h1v1h-1zM32 42h1v1h-1zM33 42h1v1h-1zM34 42h1v1h-1zM35 42h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.157\" d=\"M10 10h1v1h-1zM14 12h1v1h-1zM15 12h1v1h-1zM16 12h1v1h-1zM17 12h1v1h-1zM18 12h1v1h-1zM19 12h1v1h-1zM20 12h1v1h-1zM21 12h1v1h-1zM22 12h1v1h-1zM23 12h1v1h-1zM24 12h1v1h-1zM25 12h1v1h-1zM26 12h1v1h-1zM27 12h1v1h-1zM28 12h1v1h-1zM6 14h1v1h-1zM11 35h1v1h-1zM32 35h1v1h-1zM6 37h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.188\" d=\"M13 12h1v1h-1zM29 12h1v1h-1zM30 14h1v1h-1zM11 16h1v1h-1zM31 16h1v1h-1zM30 37h1v1h-1zM32 41h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.220\" d=\"M10 41h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.251\" d=\"M8 10h1v1h-1zM6 12h1v1h-1zM12 15h1v1h-1zM31 19h1v1h-1zM31 20h1v1h-1zM31 21h1v1h-1zM31 22h1v1h-1zM31 23h1v1h-1zM31 24h1v1h-1zM31 25h1v1h-1zM31 26h1v1h-1zM31 27h1v1h-1zM31 28h1v1h-1zM31 29h1v1h-1zM31 30h1v1h-1zM31 31h1v1h-1zM31 32h1v1h-1zM31 33h1v1h-1zM31 34h1v1h-1zM36 37h1v1h-1zM6 39h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.282\" d=\"M34 10h1v1h-1zM36 14h1v1h-1zM31 18h1v1h-1zM8 19h1v1h-1zM8 20h1v1h-1zM8 21h1v1h-1zM8 22h1v1h-1zM8 23h1v1h-1zM8 24h1v1h-1zM8 25h1v1h-1zM8 26h1v1h-1zM8 27h1v1h-1zM8 28h1v1h-1zM8 29h1v1h-1zM8 30h1v1h-1zM8 31h1v1h-1zM8 32h1v1h-1zM8 33h1v1h-1zM8 34h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.314\" d=\"M31 11h1v1h-1zM31 17h1v1h-1zM8 18h1v1h-1zM11 19h1v1h-1zM11 20h1v1h-1zM11 21h1v1h-1zM11 22h1v1h-1zM11 23h1v1h-1zM11 24h1v1h-1zM11 25h1v1h-1zM11 26h1v1h-1zM11 27h1v1h-1zM11 28h1v1h-1zM11 29h1v1h-1zM11 30h1v1h-1zM11 31h1v1h-1zM11 32h1v1h-1zM11 33h1v1h-1zM11 34h1v1h-1zM8 41h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.345\" d=\"M9 10h1v1h-1zM33 10h1v1h-1zM6 13h1v1h-1zM30 15h1v1h-1zM11 18h1v1h-1zM34 20h1v1h-1zM34 21h1v1h-1zM34 22h1v1h-1zM34 23h1v1h-1zM34 24h1v1h-1zM34 25h1v1h-1zM34 26h1v1h-1zM34 27h1v1h-1zM34 28h1v1h-1zM34 29h1v1h-1zM34 30h1v1h-1zM34 31h1v1h-1zM34 32h1v1h-1zM34 33h1v1h-1zM6 38h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.376\" d=\"M8 17h1v1h-1zM11 17h1v1h-1zM34 19h1v1h-1zM34 34h1v1h-1zM7 36h1v1h-1zM31 40h1v1h-1zM34 41h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.408\" d=\"M36 12h1v1h-1zM34 18h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.439\" d=\"M11 11h1v1h-1zM7 15h1v1h-1zM36 39h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.471\" d=\"M34 17h1v1h-1zM9 41h1v1h-1zM33 41h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.502\" d=\"M14 15h1v1h-1zM15 15h1v1h-1zM16 15h1v1h-1zM17 15h1v1h-1zM18 15h1v1h-1zM19 15h1v1h-1zM20 15h1v1h-1zM21 15h1v1h-1zM22 15h1v1h-1zM23 15h1v1h-1zM24 15h1v1h-1zM25 15h1v1h-1zM26 15h1v1h-1zM27 15h1v1h-1zM28 15h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.533\" d=\"M13 15h1v1h-1zM29 15h1v1h-1zM35 36h1v1h-1zM11 40h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.596\" d=\"M36 13h1v1h-1zM36 38h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.627\" d=\"M35 15h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.690\" d=\"M7 11h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.753\" d=\"M7 40h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.784\" d=\"M35 11h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.816\" d=\"M31 14h1v1h-1zM31 37h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.847\" d=\"M32 36h1v1h-1zM35 40h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.878\" d=\"M31 12h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.910\" d=\"M10 36h1v1h-1zM14 39h1v1h-1zM15 39h1v1h-1zM16 39h1v1h-1zM17 39h1v1h-1zM18 39h1v1h-1zM19 39h1v1h-1zM20 39h1v1h-1zM21 39h1v1h-1zM22 39h1v1h-1zM23 39h1v1h-1zM24 39h1v1h-1zM25 39h1v1h-1zM26 39h1v1h-1zM27 39h1v1h-1zM28 39h1v1h-1zM31 39h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.941\" d=\"M32 15h1v1h-1zM8 36h1v1h-1zM34 36h1v1h-1zM13 39h1v1h-1zM29 39h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.973\" d=\"M32 11h1v1h-1zM11 12h1v1h-1zM31 13h1v1h-1zM11 14h1v1h-1zM8 15h1v1h-1zM10 15h1v1h-1zM34 15h1v1h-1zM9 36h1v1h-1zM33 36h1v1h-1zM11 37h1v1h-1zM13 37h1v1h-1zM14 37h1v1h-1zM15 37h1v1h-1zM16 37h1v1h-1zM17 37h1v1h-1zM18 37h1v1h-1zM19 37h1v1h-1zM20 37h1v1h-1zM21 37h1v1h-1zM22 37h1v1h-1zM23 37h1v1h-1zM24 37h1v1h-1zM25 37h1v1h-1zM26 37h1v1h-1zM27 37h1v1h-1zM28 37h1v1h-1zM29 37h1v1h-1zM31 38h1v1h-1zM11 39h1v1h-1zM32 40h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"1.000\" d=\"M8 11h1v1h-1zM9 11h1v1h-1zM10 11h1v1h-1zM33 11h1v1h-1zM34 11h1v1h-1zM7 12h1v1h-1zM8 12h1v1h-1zM9 12h1v1h-1zM10 12h1v1h-1zM32 12h1v1h-1zM33 12h1v1h-1zM34 12h1v1h-1zM35 12h1v1h-1zM7 13h1v1h-1zM8 13h1v1h-1zM9 13h1v1h-1zM10 13h1v1h-1zM11 13h1v1h-1zM13 13h1v1h-1zM14 13h1v1h-1zM15 13h1v1h-1zM16 13h1v1h-1zM17 13h1v1h-1zM18 13h1v1h-1zM19 13h1v1h-1zM20 13h1v1h-1zM21 13h1v1h-1zM22 13h1v1h-1zM23 13h1v1h-1zM24 13h1v1h-1zM25 13h1v1h-1zM26 13h1v1h-1zM27 13h1v1h-1zM28 13h1v1h-1zM29 13h1v1h-1zM32 13h1v1h-1zM33 13h1v1h-1zM34 13h1v1h-1zM35 13h1v1h-1zM7 14h1v1h-1zM8 14h1v1h-1zM9 14h1v1h-1zM10 14h1v1h-1zM13 14h1v1h-1zM14 14h1v1h-1zM15 14h1v1h-1zM16 14h1v1h-1zM17 14h1v1h-1zM18 14h1v1h-1zM19 14h1v1h-1zM20 14h1v1h-1zM21 14h1v1h-1zM22 14h1v1h-1zM23 14h1v1h-1zM24 14h1v1h-1zM25 14h1v1h-1zM26 14h1v1h-1zM27 14h1v1h-1zM28 14h1v1h-1zM29 14h1v1h-1zM32 14h1v1h-1zM33 14h1v1h-1zM34 14h1v1h-1zM35 14h1v1h-1zM9 15h1v1h-1zM33 15h1v1h-1zM9 17h1v1h-1zM10 17h1v1h-1zM32 17h1v1h-1zM33 17h1v1h-1zM9 18h1v1h-1zM10 18h1v1h-1zM32 18h1v1h-1zM33 18h1v1h-1zM9 19h1v1h-1zM10 19h1v1h-1zM32 19h1v1h-1zM33 19h1v1h-1zM9 20h1v1h-1zM10 20h1v1h-1zM32 20h1v1h-1zM33 20h1v1h-1zM9 21h1v1h-1zM10 21h1v1h-1zM32 21h1v1h-1zM33 21h1v1h-1zM9 22h1v1h-1zM10 22h1v1h-1zM32 22h1v1h-1zM33 22h1v1h-1zM9 23h1v1h-1zM10 23h1v1h-1zM32 23h1v1h-1zM33 23h1v1h-1zM9 24h1v1h-1zM10 24h1v1h-1zM32 24h1v1h-1zM33 24h1v1h-1zM9 25h1v1h-1zM10 25h1v1h-1zM32 25h1v1h-1zM33 25h1v1h-1zM9 26h1v1h-1zM10 26h1v1h-1zM32 26h1v1h-1zM33 26h1v1h-1zM9 27h1v1h-1zM10 27h1v1h-1zM32 27h1v1h-1zM33 27h1v1h-1zM9 28h1v1h-1zM10 28h1v1h-1zM32 28h1v1h-1zM33 28h1v1h-1zM9 29h1v1h-1zM10 29h1v1h-1zM32 29h1v1h-1zM33 29h1v1h-1zM9 30h1v1h-1zM10 30h1v1h-1zM32 30h1v1h-1zM33 30h1v1h-1zM9 31h1v1h-1zM10 31h1v1h-1zM32 31h1v1h-1zM33 31h1v1h-1zM9 32h1v1h-1zM10 32h1v1h-1zM32 32h1v1h-1zM33 32h1v1h-1zM9 33h1v1h-1zM10 33h1v1h-1zM32 33h1v1h-1zM33 33h1v1h-1zM9 34h1v1h-1zM10 34h1v1h-1zM32 34h1v1h-1zM33 34h1v1h-1zM7 37h1v1h-1zM8 37h1v1h-1zM9 37h1v1h-1zM10 37h1v1h-1zM32 37h1v1h-1zM33 37h1v1h-1zM34 37h1v1h-1zM35 37h1v1h-1zM7 38h1v1h-1zM8 38h1v1h-1zM9 38h1v1h-1zM10 38h1v1h-1zM11 38h1v1h-1zM13 38h1v1h-1zM14 38h1v1h-1zM15 38h1v1h-1zM16 38h1v1h-1zM17 38h1v1h-1zM18 38h1v1h-1zM19 38h1v1h-1zM20 38h1v1h-1zM21 38h1v1h-1zM22 38h1v1h-1zM23 38h1v1h-1zM24 38h1v1h-1zM25 38h1v1h-1zM26 38h1v1h-1zM27 38h1v1h-1zM28 38h1v1h-1zM29 38h1v1h-1zM32 38h1v1h-1zM33 38h1v1h-1zM34 38h1v1h-1zM35 38h1v1h-1zM7 39h1v1h-1zM8 39h1v1h-1zM9 39h1v1h-1zM10 39h1v1h-1zM32 39h1v1h-1zM33 39h1v1h-1zM34 39h1v1h-1zM35 39h1v1h-1zM8 40h1v1h-1zM9 40h1v1h-1zM10 40h1v1h-1zM33 40h1v1h-1zM34 40h1v1h-1z\"/>","ab":"<path fill=\"currentColor\" opacity=\"0.031\" d=\"M37 13h1v1h-1zM41 16h1v1h-1zM12 19h1v1h-1zM11 25h1v1h-1zM41 26h1v1h-1zM38 30h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.063\" d=\"M40 14h1v1h-1zM6 16h1v1h-1zM34 16h1v1h-1zM34 17h1v1h-1zM34 18h1v1h-1zM35 21h1v1h-1zM36 21h1v1h-1zM4 22h1v1h-1zM34 22h1v1h-1zM34 23h1v1h-1zM39 23h1v1h-1zM34 24h1v1h-1zM33 30h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.094\" d=\"M36 13h1v1h-1zM5 19h1v1h-1zM34 21h1v1h-1zM6 31h1v1h-1zM6 32h1v1h-1zM6 33h1v1h-1zM6 34h1v1h-1zM6 35h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.125\" d=\"M8 13h1v1h-1zM9 13h1v1h-1zM32 13h1v1h-1zM33 13h1v1h-1zM34 13h1v1h-1zM35 13h1v1h-1zM37 21h1v1h-1zM13 22h1v1h-1zM6 25h1v1h-1zM39 27h1v1h-1zM7 30h1v1h-1zM8 30h1v1h-1zM9 30h1v1h-1zM10 30h1v1h-1zM11 30h1v1h-1zM34 30h1v1h-1zM35 30h1v1h-1zM36 30h1v1h-1zM37 30h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.157\" d=\"M41 17h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.188\" d=\"M8 19h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.220\" d=\"M38 18h1v1h-1zM14 25h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.282\" d=\"M38 31h1v1h-1zM38 32h1v1h-1zM38 33h1v1h-1zM38 34h1v1h-1zM38 35h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.314\" d=\"M38 16h1v1h-1zM40 20h1v1h-1zM35 25h1v1h-1zM36 25h1v1h-1zM12 27h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.345\" d=\"M7 24h1v1h-1zM8 24h1v1h-1zM9 24h1v1h-1zM10 24h1v1h-1zM34 25h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.376\" d=\"M7 14h1v1h-1zM10 14h1v1h-1zM6 17h1v1h-1zM5 20h1v1h-1zM37 25h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.408\" d=\"M39 24h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.439\" d=\"M40 19h1v1h-1zM5 27h1v1h-1zM38 27h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.471\" d=\"M9 18h1v1h-1zM10 21h1v1h-1zM39 22h1v1h-1zM4 23h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.502\" d=\"M8 18h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.533\" d=\"M11 17h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.565\" d=\"M7 21h1v1h-1zM41 21h1v1h-1zM11 24h1v1h-1zM14 27h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.596\" d=\"M35 19h1v1h-1zM36 19h1v1h-1zM37 27h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.627\" d=\"M34 19h1v1h-1zM38 21h1v1h-1zM38 25h1v1h-1zM3 26h1v1h-1zM3 27h1v1h-1zM4 27h1v1h-1zM13 27h1v1h-1zM32 27h1v1h-1zM33 27h1v1h-1zM34 27h1v1h-1zM35 27h1v1h-1zM36 27h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.659\" d=\"M12 20h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.690\" d=\"M13 23h1v1h-1zM14 26h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.722\" d=\"M34 15h1v1h-1zM35 15h1v1h-1zM33 31h1v1h-1zM33 35h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.753\" d=\"M36 15h1v1h-1zM8 22h1v1h-1zM9 22h1v1h-1zM10 22h1v1h-1zM6 24h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.784\" d=\"M7 15h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.816\" d=\"M37 19h1v1h-1zM7 22h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.847\" d=\"M39 14h1v1h-1zM12 34h1v1h-1zM13 34h1v1h-1zM14 34h1v1h-1zM15 34h1v1h-1zM16 34h1v1h-1zM17 34h1v1h-1zM18 34h1v1h-1zM19 34h1v1h-1zM20 34h1v1h-1zM21 34h1v1h-1zM22 34h1v1h-1zM23 34h1v1h-1zM24 34h1v1h-1zM25 34h1v1h-1zM26 34h1v1h-1zM27 34h1v1h-1zM28 34h1v1h-1zM29 34h1v1h-1zM30 34h1v1h-1zM31 34h1v1h-1zM32 34h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.878\" d=\"M37 15h1v1h-1zM6 18h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.941\" d=\"M9 17h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.973\" d=\"M41 25h1v1h-1zM40 26h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"1.000\" d=\"M8 14h1v1h-1zM9 14h1v1h-1zM32 14h1v1h-1zM33 14h1v1h-1zM34 14h1v1h-1zM35 14h1v1h-1zM36 14h1v1h-1zM37 14h1v1h-1zM38 14h1v1h-1zM8 15h1v1h-1zM9 15h1v1h-1zM10 15h1v1h-1zM32 15h1v1h-1zM33 15h1v1h-1zM38 15h1v1h-1zM39 15h1v1h-1zM40 15h1v1h-1zM7 16h1v1h-1zM8 16h1v1h-1zM9 16h1v1h-1zM10 16h1v1h-1zM32 16h1v1h-1zM33 16h1v1h-1zM39 16h1v1h-1zM40 16h1v1h-1zM7 17h1v1h-1zM8 17h1v1h-1zM10 17h1v1h-1zM32 17h1v1h-1zM33 17h1v1h-1zM39 17h1v1h-1zM40 17h1v1h-1zM7 18h1v1h-1zM10 18h1v1h-1zM11 18h1v1h-1zM32 18h1v1h-1zM33 18h1v1h-1zM39 18h1v1h-1zM40 18h1v1h-1zM6 19h1v1h-1zM7 19h1v1h-1zM10 19h1v1h-1zM11 19h1v1h-1zM32 19h1v1h-1zM33 19h1v1h-1zM38 19h1v1h-1zM39 19h1v1h-1zM6 20h1v1h-1zM7 20h1v1h-1zM10 20h1v1h-1zM11 20h1v1h-1zM32 20h1v1h-1zM33 20h1v1h-1zM34 20h1v1h-1zM35 20h1v1h-1zM36 20h1v1h-1zM37 20h1v1h-1zM38 20h1v1h-1zM39 20h1v1h-1zM5 21h1v1h-1zM6 21h1v1h-1zM11 21h1v1h-1zM12 21h1v1h-1zM32 21h1v1h-1zM33 21h1v1h-1zM39 21h1v1h-1zM40 21h1v1h-1zM5 22h1v1h-1zM6 22h1v1h-1zM11 22h1v1h-1zM12 22h1v1h-1zM32 22h1v1h-1zM33 22h1v1h-1zM40 22h1v1h-1zM41 22h1v1h-1zM5 23h1v1h-1zM6 23h1v1h-1zM7 23h1v1h-1zM8 23h1v1h-1zM9 23h1v1h-1zM10 23h1v1h-1zM11 23h1v1h-1zM12 23h1v1h-1zM32 23h1v1h-1zM33 23h1v1h-1zM40 23h1v1h-1zM41 23h1v1h-1zM4 24h1v1h-1zM5 24h1v1h-1zM12 24h1v1h-1zM13 24h1v1h-1zM32 24h1v1h-1zM33 24h1v1h-1zM40 24h1v1h-1zM41 24h1v1h-1zM4 25h1v1h-1zM5 25h1v1h-1zM12 25h1v1h-1zM13 25h1v1h-1zM32 25h1v1h-1zM33 25h1v1h-1zM39 25h1v1h-1zM40 25h1v1h-1zM4 26h1v1h-1zM5 26h1v1h-1zM12 26h1v1h-1zM13 26h1v1h-1zM32 26h1v1h-1zM33 26h1v1h-1zM34 26h1v1h-1zM35 26h1v1h-1zM36 26h1v1h-1zM37 26h1v1h-1zM38 26h1v1h-1zM39 26h1v1h-1zM7 31h1v1h-1zM8 31h1v1h-1zM9 31h1v1h-1zM10 31h1v1h-1zM11 31h1v1h-1zM34 31h1v1h-1zM35 31h1v1h-1zM36 31h1v1h-1zM37 31h1v1h-1zM7 32h1v1h-1zM8 32h1v1h-1zM9 32h1v1h-1zM10 32h1v1h-1zM11 32h1v1h-1zM12 32h1v1h-1zM13 32h1v1h-1zM14 32h1v1h-1zM15 32h1v1h-1zM16 32h1v1h-1zM17 32h1v1h-1zM18 32h1v1h-1zM19 32h1v1h-1zM20 32h1v1h-1zM21 32h1v1h-1zM22 32h1v1h-1zM23 32h1v1h-1zM24 32h1v1h-1zM25 32h1v1h-1zM26 32h1v1h-1zM27 32h1v1h-1zM28 32h1v1h-1zM29 32h1v1h-1zM30 32h1v1h-1zM31 32h1v1h-1zM32 32h1v1h-1zM33 32h1v1h-1zM34 32h1v1h-1zM35 32h1v1h-1zM36 32h1v1h-1zM37 32h1v1h-1zM7 33h1v1h-1zM8 33h1v1h-1zM9 33h1v1h-1zM10 33h1v1h-1zM11 33h1v1h-1zM12 33h1v1h-1zM13 33h1v1h-1zM14 33h1v1h-1zM15 33h1v1h-1zM16 33h1v1h-1zM17 33h1v1h-1zM18 33h1v1h-1zM19 33h1v1h-1zM20 33h1v1h-1zM21 33h1v1h-1zM22 33h1v1h-1zM23 33h1v1h-1zM24 33h1v1h-1zM25 33h1v1h-1zM26 33h1v1h-1zM27 33h1v1h-1zM28 33h1v1h-1zM29 33h1v1h-1zM30 33h1v1h-1zM31 33h1v1h-1zM32 33h1v1h-1zM33 33h1v1h-1zM34 33h1v1h-1zM35 33h1v1h-1zM36 33h1v1h-1zM37 33h1v1h-1zM7 34h1v1h-1zM8 34h1v1h-1zM9 34h1v1h-1zM10 34h1v1h-1zM11 34h1v1h-1zM33 34h1v1h-1zM34 34h1v1h-1zM35 34h1v1h-1zM36 34h1v1h-1zM37 34h1v1h-1zM7 35h1v1h-1zM8 35h1v1h-1zM9 35h1v1h-1zM10 35h1v1h-1zM11 35h1v1h-1zM34 35h1v1h-1zM35 35h1v1h-1zM36 35h1v1h-1zM37 35h1v1h-1z\"/>","free":"<path fill=\"currentColor\" opacity=\"0.031\" d=\"M5 13h1v1h-1zM6 14h1v1h-1zM7 15h1v1h-1zM33 15h1v1h-1zM8 16h1v1h-1zM25 25h1v1h-1zM28 27h1v1h-1zM24 34h1v1h-1zM41 40h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.063\" d=\"M12 9h1v1h-1zM18 9h1v1h-1zM33 21h1v1h-1zM20 31h1v1h-1zM28 36h1v1h-1zM29 40h1v1h-1zM30 40h1v1h-1zM39 40h1v1h-1zM40 40h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.094\" d=\"M17 9h1v1h-1zM30 19h1v1h-1zM20 34h1v1h-1zM41 37h1v1h-1zM25 39h1v1h-1zM31 40h1v1h-1zM37 40h1v1h-1zM38 40h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.125\" d=\"M13 9h1v1h-1zM14 9h1v1h-1zM27 14h1v1h-1zM30 17h1v1h-1zM32 23h1v1h-1zM20 32h1v1h-1zM25 35h1v1h-1zM23 38h1v1h-1zM32 40h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.157\" d=\"M15 9h1v1h-1zM16 9h1v1h-1zM20 33h1v1h-1zM36 40h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.188\" d=\"M29 26h1v1h-1zM21 36h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.220\" d=\"M25 10h1v1h-1zM24 13h1v1h-1zM21 29h1v1h-1zM33 40h1v1h-1zM34 40h1v1h-1zM35 40h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.251\" d=\"M24 26h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.282\" d=\"M27 36h1v1h-1zM41 38h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.314\" d=\"M28 11h1v1h-1zM30 12h1v1h-1zM31 24h1v1h-1zM30 25h1v1h-1zM22 37h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.345\" d=\"M26 39h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.376\" d=\"M29 15h1v1h-1zM30 20h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.408\" d=\"M33 16h1v1h-1zM24 30h1v1h-1zM35 37h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.439\" d=\"M9 5h1v1h-1zM25 29h1v1h-1zM34 37h1v1h-1zM36 37h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.471\" d=\"M33 37h1v1h-1zM37 37h1v1h-1zM41 39h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.502\" d=\"M32 14h1v1h-1zM33 20h1v1h-1zM23 27h1v1h-1zM22 28h1v1h-1zM32 37h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.533\" d=\"M38 37h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.565\" d=\"M25 13h1v1h-1zM29 22h1v1h-1zM28 23h1v1h-1zM23 33h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.596\" d=\"M14 12h1v1h-1zM15 12h1v1h-1zM16 12h1v1h-1zM31 13h1v1h-1zM30 16h1v1h-1zM23 32h1v1h-1zM31 37h1v1h-1zM39 37h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.627\" d=\"M8 6h1v1h-1zM7 7h1v1h-1zM6 8h1v1h-1zM24 10h1v1h-1zM13 12h1v1h-1zM17 12h1v1h-1zM9 16h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.659\" d=\"M5 9h1v1h-1zM26 28h1v1h-1zM26 36h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.690\" d=\"M4 10h1v1h-1zM12 12h1v1h-1zM18 12h1v1h-1zM28 14h1v1h-1zM40 37h1v1h-1zM24 38h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.722\" d=\"M30 37h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.753\" d=\"M11 12h1v1h-1zM27 24h1v1h-1zM27 39h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.784\" d=\"M19 12h1v1h-1zM7 14h1v1h-1zM8 15h1v1h-1zM33 17h1v1h-1zM33 19h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.816\" d=\"M9 6h1v1h-1zM9 7h1v1h-1zM9 8h1v1h-1zM9 9h1v1h-1zM6 13h1v1h-1zM9 13h1v1h-1zM26 13h1v1h-1zM9 14h1v1h-1zM9 15h1v1h-1zM30 21h1v1h-1zM21 30h1v1h-1zM21 35h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.847\" d=\"M5 12h1v1h-1zM10 12h1v1h-1zM20 12h1v1h-1zM27 27h1v1h-1zM24 35h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.878\" d=\"M23 10h1v1h-1zM21 12h1v1h-1zM32 22h1v1h-1zM23 31h1v1h-1zM29 37h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.910\" d=\"M22 12h1v1h-1zM33 18h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.941\" d=\"M21 10h1v1h-1zM22 10h1v1h-1zM4 11h1v1h-1zM26 25h1v1h-1zM23 34h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"0.973\" d=\"M10 10h1v1h-1zM20 10h1v1h-1zM27 11h1v1h-1zM9 12h1v1h-1zM23 12h1v1h-1zM29 12h1v1h-1zM28 26h1v1h-1zM22 36h1v1h-1zM23 37h1v1h-1z\"/><path fill=\"currentColor\" opacity=\"1.000\" d=\"M8 7h1v1h-1zM7 8h1v1h-1zM8 8h1v1h-1zM6 9h1v1h-1zM7 9h1v1h-1zM8 9h1v1h-1zM5 10h1v1h-1zM6 10h1v1h-1zM7 10h1v1h-1zM8 10h1v1h-1zM9 10h1v1h-1zM11 10h1v1h-1zM12 10h1v1h-1zM13 10h1v1h-1zM14 10h1v1h-1zM15 10h1v1h-1zM16 10h1v1h-1zM17 10h1v1h-1zM18 10h1v1h-1zM19 10h1v1h-1zM5 11h1v1h-1zM6 11h1v1h-1zM7 11h1v1h-1zM8 11h1v1h-1zM9 11h1v1h-1zM10 11h1v1h-1zM11 11h1v1h-1zM12 11h1v1h-1zM13 11h1v1h-1zM14 11h1v1h-1zM15 11h1v1h-1zM16 11h1v1h-1zM17 11h1v1h-1zM18 11h1v1h-1zM19 11h1v1h-1zM20 11h1v1h-1zM21 11h1v1h-1zM22 11h1v1h-1zM23 11h1v1h-1zM24 11h1v1h-1zM25 11h1v1h-1zM26 11h1v1h-1zM6 12h1v1h-1zM7 12h1v1h-1zM8 12h1v1h-1zM24 12h1v1h-1zM25 12h1v1h-1zM26 12h1v1h-1zM27 12h1v1h-1zM28 12h1v1h-1zM7 13h1v1h-1zM8 13h1v1h-1zM27 13h1v1h-1zM28 13h1v1h-1zM29 13h1v1h-1zM30 13h1v1h-1zM8 14h1v1h-1zM29 14h1v1h-1zM30 14h1v1h-1zM31 14h1v1h-1zM30 15h1v1h-1zM31 15h1v1h-1zM32 15h1v1h-1zM31 16h1v1h-1zM32 16h1v1h-1zM31 17h1v1h-1zM32 17h1v1h-1zM31 18h1v1h-1zM32 18h1v1h-1zM31 19h1v1h-1zM32 19h1v1h-1zM31 20h1v1h-1zM32 20h1v1h-1zM31 21h1v1h-1zM32 21h1v1h-1zM30 22h1v1h-1zM31 22h1v1h-1zM29 23h1v1h-1zM30 23h1v1h-1zM31 23h1v1h-1zM28 24h1v1h-1zM29 24h1v1h-1zM30 24h1v1h-1zM27 25h1v1h-1zM28 25h1v1h-1zM29 25h1v1h-1zM25 26h1v1h-1zM26 26h1v1h-1zM27 26h1v1h-1zM24 27h1v1h-1zM25 27h1v1h-1zM26 27h1v1h-1zM23 28h1v1h-1zM24 28h1v1h-1zM25 28h1v1h-1zM22 29h1v1h-1zM23 29h1v1h-1zM24 29h1v1h-1zM22 30h1v1h-1zM23 30h1v1h-1zM21 31h1v1h-1zM22 31h1v1h-1zM21 32h1v1h-1zM22 32h1v1h-1zM21 33h1v1h-1zM22 33h1v1h-1zM21 34h1v1h-1zM22 34h1v1h-1zM22 35h1v1h-1zM23 35h1v1h-1zM23 36h1v1h-1zM24 36h1v1h-1zM25 36h1v1h-1zM24 37h1v1h-1zM25 37h1v1h-1zM26 37h1v1h-1zM27 37h1v1h-1zM28 37h1v1h-1zM25 38h1v1h-1zM26 38h1v1h-1zM27 38h1v1h-1zM28 38h1v1h-1zM29 38h1v1h-1zM30 38h1v1h-1zM31 38h1v1h-1zM32 38h1v1h-1zM33 38h1v1h-1zM34 38h1v1h-1zM35 38h1v1h-1zM36 38h1v1h-1zM37 38h1v1h-1zM38 38h1v1h-1zM39 38h1v1h-1zM40 38h1v1h-1zM28 39h1v1h-1zM29 39h1v1h-1zM30 39h1v1h-1zM31 39h1v1h-1zM32 39h1v1h-1zM33 39h1v1h-1zM34 39h1v1h-1zM35 39h1v1h-1zM36 39h1v1h-1zM37 39h1v1h-1zM38 39h1v1h-1zM39 39h1v1h-1zM40 39h1v1h-1z\"/>"};
  function missionMenu(surface, rects, state, language) {
    const existing=surface.querySelector(':scope > .native-mission-types');
    if(existing)return existing;
    const zh=language==='zh', heading=zh?'作业类型':'Mission Type';
    const node=el('section','native-mission-types');node.setAttribute('aria-label',heading);
    node.append(el('div','native-panel-heading',heading));
    const base=state==='formula'||state==='layer'?flightMapBaseState:state;
    const active=/ab/i.test(base)?'ab':/free/i.test(base)?'free':'plot';
    for(const [id,label] of [['plot',zh?'地块':'Fields'],['ab',zh?'AB点':'AB Points'],['free',zh?'自由航线':'Free Route']]) {
      const b=control(surface,`flight-hit-type-${id}`,label);
      const glyph=document.createElementNS('http://www.w3.org/2000/svg','svg');
      glyph.setAttribute('viewBox','0 0 46 54');glyph.setAttribute('class','native-mission-glyph');
      glyph.setAttribute('aria-hidden','true');glyph.innerHTML=missionGlyphs[id];b.prepend(glyph);
      b.classList.toggle('is-active',active===id);b.setAttribute('aria-pressed',String(active===id));node.append(b);
    }
    mount(surface,node,813,169,135,188,rects);
    surface.querySelectorAll('.flight-hit-type-plot,.flight-hit-type-ab,.flight-hit-type-free').forEach(b=>{b.tabIndex=-1;b.setAttribute('aria-hidden','true');b.style.pointerEvents='none'});
    return node;
  }
  const missionImages=new Set(['start-layer.png','start-after2.png','start-ab.png','start-free.png','start-side-plot.png','map-side-ab.png','map-side-free.png','map-plot-formula.png','map-formula-plot.png','map-formula-ab.png','map-formula-free.png']);
  window.mountSharedMissionMenu=surface=>{
    const file=getComputedStyle(surface).backgroundImage.match(/([^/"()]+\.png)/)?.[1];
    if(!missionImages.has(file))return;
    const state=typeof flightVisualState==='string'?flightVisualState:'';
    return missionMenu(surface,[],state,document.documentElement.dataset.language);
  };
  function missionTypes(surface, rects, state, file) {
    missionMenu(surface,rects,state,'en');
    const add=control(surface,'flight-hit-new','New',{icon:'plus',className:'native-map-button'});mount(surface,add,813,370,135,48,rects);
    for(const [cls,label,y] of [['flight-hit-edit','Edit',495],['flight-hit-call',state==='formula'?'Cancel':'Load',547]]) {
      const sourceCls=state==='formula'&&y===547?'flight-hit-formula-cancel':cls;
      if(sourceControl(surface,sourceCls)){const b=control(surface,sourceCls,label,{className:'native-map-button'});mount(surface,b,850,y,99,42,rects);}
    }
  }
  function hud(surface,rects) {
    const node=el('div','native-telemetry');
    for(const [value,label] of [['0 ft','Altitude'],['0 gal/min','Flow'],['0 ft','Distance'],['0 mph','Speed'],['0 acres','Area']]){const c=el('div','native-telemetry-cell');c.append(el('strong','',value),el('span','',label));node.append(c);}
    mount(surface,node,462,468,197,102,rects);
  }
  function sidebar(surface,rects,formula) {
    const node=el('section','native-field-sidebar');node.append(el('h3','',formula?'Prescription Maps':'Fields'));
    if(!formula){
      const tools=el('div','native-field-tools');const input=el('input');input.placeholder='Search fields';input.setAttribute('aria-label','Search fields');
      const sort=control(surface,'flight-hit-side-sort','Distance',{endIcon:'chevron-down'});const time=control(surface,'flight-hit-side-sort','Time');tools.append(input,sort,time);node.append(tools);
    }
    node.append(el('div','native-field-empty',formula?'No prescription maps':'No fields'));
    mount(surface,node,13,74,278,457,rects);
  }
  function planPanel(surface,rects,state) {
    const node=el('section','native-plan-panel');node.setAttribute('aria-label','Planning parameters');
    const active=state==='planWaypoint'?1:state==='planObstacle'?2:0;
    const tabs=el('div','native-plan-tabs');
    [['Basic','basic'],['Waypoints','point'],['Obstacles','obstacle']].forEach(([label,key],i)=>{const b=control(surface,`flight-hit-plan-tab-${key}`,label,{before:()=>{if(i===0)draft().planScroll=0}});b.classList.toggle('is-active',i===active);b.setAttribute('aria-pressed',String(i===active));tabs.append(b)});
    node.append(tabs);const body=el('div','native-plan-body');
    if(active===0){
      const g1=el('div','native-setting-block');g1.append(titleRow('Uniform Inset',toggle(surface,'uniform','flight-hit-plan-inset','Uniform Inset')),stepper(surface,'inset','ft','flight-hit-plan-minus1','flight-hit-plan-plus1',.1));body.append(g1);
      body.append(titleRow('Single-Side Inset',toggle(surface,'single','flight-hit-plan-single','Single-Side Inset')));
      const spacing=el('div','native-setting-block');spacing.append(titleRow('Route Spacing'),stepper(surface,'spacing','ft','flight-hit-plan-minus2','flight-hit-plan-plus2',.1));body.append(spacing);
      const margin=el('div','native-setting-block');margin.append(titleRow('Obstacle Margin'),stepper(surface,'margin','ft','flight-hit-plan-minus3','flight-hit-plan-plus3',.1));body.append(margin);
      const bypass=el('div','native-setting-block');bypass.append(titleRow('Bypass Method'),segmented(surface,[{label:'Back-and-Forth',cls:'flight-hit-plan-route'},{label:'Bypass',cls:'flight-hit-plan-route'}],draft().bypass,i=>draft().bypass=i));body.append(bypass);
      const edge=el('div','native-setting-block');edge.append(titleRow('Edge Pass Type'),segmented(surface,[{label:'No Edge Pass',cls:'flight-hit-plan-scan'},{label:'Edge Pass',cls:'flight-hit-plan-scan'},{label:'Edge Only',cls:'flight-hit-plan-scan'}],draft().edge,i=>draft().edge=i));body.append(edge);
      for(const [label,key] of [['Route Split','segment'],['Route Offset','offset'],['Start Point','start'],['Heading','heading']]){const b=control(surface,`flight-hit-plan-${key}`,'Settings',{className:'native-outline-button'});body.append(titleRow(label,b));}
      body.addEventListener('scroll',()=>draft().planScroll=body.scrollTop);
    } else if(active===1) {
      body.classList.add('native-waypoint-body');body.append(titleRow('Field Area',el('strong','','0.00 acres')));
      const pad=el('div','native-waypoint-pad native-original-waypoint-pad');
      for(const [name,icon] of [['up','arrow-up'],['left','arrow-left'],['reset','rotate-ccw'],['right','arrow-right'],['down','arrow-down']]){const b=control(surface,'flight-hit-waypoint-stick','',{className:`direction-${name}`,aria:name==='reset'?'Reset waypoint offset':`Move waypoint ${name}`} );pad.append(b)}
      const remove=control(surface,'flight-hit-waypoint-delete','',{icon:'trash-2',className:'native-waypoint-delete',aria:'Delete Waypoint'});pad.append(remove);body.append(pad);
      const values=el('div','native-waypoint-values');for(const label of ['Left','Down']){const c=el('div');c.append(el('span','',label),el('strong','','0.0 ft'));values.append(c)}body.append(values);
      const nav=el('div','native-waypoint-navigation');nav.append(control(surface,'flight-hit-waypoint-prev','Previous'),control(surface,'flight-hit-waypoint-next','Next'));body.append(nav);
      const insert=el('div','native-waypoint-insert');insert.append(control(surface,'flight-hit-waypoint-before','Insert Before',{className:'native-outline-button'}),control(surface,'flight-hit-waypoint-after','Insert After',{className:'native-outline-button'}));body.append(insert);
    } else {const p=el('p','native-obstacle-empty','Select an obstacle on the map to configure its parameters.');body.append(p);}
    body.addEventListener('wheel',e=>e.stopPropagation());node.append(body);mount(surface,node,15,75,275,510,rects);surface.onwheel=null;
    if(active===0){body.scrollTop=state==='planMore'&&!draft().planScroll?450:draft().planScroll;}
    const summary=el('div','native-plan-area');summary.append(text('Field Area: 0.00 acres'),text('Mission Area: 0.00 acres'));mount(surface,summary,633,112,315,37,rects);
    const items=[['flight-hit-plan-mode','Map Planning',168,'chevron-down'],['flight-hit-plan-point-type','Boundary Point',228,'chevron-down'],['flight-hit-plan-add','Add',288,null]];
    for(const [cls,label,y,endIcon] of items){const b=control(surface,cls,label,{icon:label==='Add'?'plus':label==='Boundary Point'?'boundary-point':null,endIcon,className:'native-map-button'});mount(surface,b,765,y,180,49,rects);}
    for(const [cls,label,y] of [['flight-hit-plan-exit','Exit',492],['flight-hit-plan-save','Save',545]]){const b=control(surface,cls,label,{className:'native-map-button'});mount(surface,b,848,y,98,42,rects);}
  }
  function manualPlus(surface,rects) {
    if(draft().collapsed){const b=control(surface,'flight-hit-plus-collapse','',{icon:'chevron-right',className:'native-collapse',aria:'Expand Mission Settings',before:()=>draft().collapsed=false,refresh:true});mount(surface,b,0,225,38,95,rects);return;}
    const node=el('section','native-plus-panel');node.append(el('h3','','Mission Settings'));const body=el('div','native-plus-body');
    const rate=el('div','native-setting-block');rate.append(titleRow('Application Rate'),stepper(surface,'rate','gal/acre','flight-hit-plus-spray-minus','flight-hit-plus-spray-plus',.1),el('small','','12 nozzles'));body.append(rate);
    const mode=el('div','native-setting-block');mode.append(titleRow('Spray Mode'),segmented(surface,[{label:'Jet',cls:'flight-hit-plus-mode-drizzle'},{label:'Droplet',cls:'flight-hit-plus-mode-mist'}],draft().spray,i=>draft().spray=i));body.append(mode);
    const droplet=control(surface,'flight-hit-plus-droplet','50 μm',{endIcon:'chevron-right'});body.append(titleRow('Droplet Size',droplet));
    const spacing=el('div','native-setting-block');spacing.append(titleRow('Route Spacing'),stepper(surface,'spacing','ft','flight-hit-plus-spacing-minus','flight-hit-plus-spacing-plus',.1));body.append(spacing);
    const height=el('div','native-setting-block');height.append(titleRow('Height Above Crop'),stepper(surface,'height','ft','flight-hit-plus-height-minus','flight-hit-plus-height-plus',.1));body.append(height);
    body.addEventListener('scroll',()=>draft().plusScroll=body.scrollTop);node.append(body);mount(surface,node,12,75,278,456,rects);body.scrollTop=draft().plusScroll;
    const collapse=control(surface,'flight-hit-plus-collapse','',{icon:'chevron-left',className:'native-collapse',aria:'Collapse Mission Settings',before:()=>draft().collapsed=true,refresh:true});mount(surface,collapse,290,225,39,95,rects);
    const start=control(surface,'flight-hit-plus-start','Start',{className:'native-map-button'});mount(surface,start,852,547,96,42,rects);
  }
  function deviceStatus(surface,rects,faults) {
    const node=el('section','native-device-status');const head=el('header','native-device-status-head');
    head.append(control(surface,'flight-hit-device-back','',{icon:'chevron-left',className:'native-device-back',aria:'Back to Mission'}));
    head.append(segmented(surface,[{label:'Live Device Status',cls:'flight-hit-device-realtime'},{label:'Device Faults',cls:'flight-hit-device-faults'}],faults?1:0));
    if(faults)head.append(control(surface,'flight-hit-device-clear','',{icon:'fault-trash',className:'native-device-clear',aria:'Clear Fault History'}));node.append(head);
    if(faults){const list=el('div','native-fault-list');for(const [system,message]of [['Propulsion','Motor 2 not detected'],['Propulsion','Motor 3 not detected'],['Radar','Rotating radar not detected'],['Propulsion','Motor 1 not detected'],['Propulsion','Motor 4 not detected'],['Battery','Battery system error']]){const row=control(surface,'flight-hit-device-fault-list','',{className:'native-fault-row',aria:message});row.append(el('span','','2026-08-04 14:51:06'),el('span','','54050011'),el('span','',system),el('span','',message));list.append(row)}node.append(list)}
    else {
      const grid=el('div','native-system-grid');
      ['Avionics','Propulsion','Vision','Spray System','Radar System','Flight Authorization','Battery','Airframe Module'].forEach((label,i)=>{
        const c=control(surface,'flight-hit-device-grid','',{className:'native-system-card',aria:label});
        const icon=rasterIcon('start-device-realtime-status.png',76.25+(i%4)*232.5,i<4?160:383.5,110,60,'native-system-original-icon');
        c.append(icon,el('span','native-label',label),el('span','native-system-state','Disconnected'));grid.append(c);
      });node.append(grid);
    }
    mount(surface,node,0,0,960,600,rects);
  }
  function modeCards(surface,rects){
    const head=el('header','native-mode-select-head');
    head.append(control(surface,'flight-hit-mode-back','',{icon:'chevron-left',aria:'Back to Current Mission'}),el('h3','','Select Mission Mode'),control(surface,'flight-hit-mode-close','',{icon:'x',aria:'Exit to Home'}));
    mount(surface,head,0,0,960,75,rects);
    for(const [key,label,x,y,w,h]of [['auto','Field Route',35,90,605,282],['lift','Agricultural Lifting',665,90,258,282],['manual','Manual',35,396,340,120],['plus','Manual Plus',400,396,240,120],['survey','2D Mapping',665,396,258,120]]){
      const card=control(surface,`flight-hit-mode-${key}`,label,{className:'native-mode-card'});
      card.setAttribute('aria-pressed',String(key===(flightMode==='manualPlus'?'plus':flightMode==='manual'?'manual':'auto')));
      mount(surface,card,x,y,w,h,rects);
    }
    surface.querySelectorAll('.flight-hotspot').forEach(b=>{b.tabIndex=-1;b.setAttribute('aria-hidden','true');b.style.pointerEvents='none'});
  }
  window.mountEnglishFlight = surface => {
    const rects=[];const state=typeof flightVisualState==='string'?flightVisualState:'';
    const file=getComputedStyle(surface).backgroundImage.match(/([^/"()]+\.png)/)?.[1]||'';
    surface.classList.add('english-flight-native');
    if(/^deviceStatus/.test(state)){deviceStatus(surface,rects,state==='deviceStatusFaults');surface.querySelectorAll('.flight-hotspot').forEach(b=>{b.tabIndex=-1;b.setAttribute('aria-hidden','true');b.style.pointerEvents='none'});return rects;}
    if(state==='workMode'){modeCards(surface,rects);return rects;}
    const planning=state.startsWith('plan');header(surface,rects,planning);
    if(planning)planPanel(surface,rects,state);
    else {
      hud(surface,rects);
      const manual=state==='manual'||state==='manualPlus';
      if(!manual)missionTypes(surface,rects,state,file);
      if(state==='formula'||['side','sideAb','sideFree'].includes(state))sidebar(surface,rects,state==='formula');
      if(state==='manualPlus')manualPlus(surface,rects);
      if(state==='manual'){const b=control(surface,'flight-hit-call','Settings',{className:'native-map-button'});mount(surface,b,850,547,99,42,rects);}
    }
    if(file.startsWith('map-formula')||file==='map-side-ab.png'||file==='map-side-free.png') {
      const alert=el('div','native-flight-alert');alert.append(image('circle-alert'),text('Both dials need calibration.'));mount(surface,alert,338,76,276,57,rects);
    }
    if(state==='manualPlus'&&draft().collapsed) {
      // Cover the expanded raster panel with the same underlying map view while retaining the controls.
      const cover=el('div','native-collapsed-map');cover.style.backgroundImage="url('./flight-assets/start-mode-manual-stable.png')";
      cover.style.backgroundPosition='-12px -75px';cover.style.backgroundSize='960px 600px';cover.style.zIndex='6';mount(surface,cover,12,75,317,456,rects);
    }
    surface.querySelectorAll('.flight-hotspot').forEach(button=>{
      const r={x:button.offsetLeft+button.offsetWidth/2,y:button.offsetTop+button.offsetHeight/2};
      if(rects.some(a=>r.x>=a.x&&r.x<=a.x+a.w&&r.y>=a.y&&r.y<=a.y+a.h)){button.tabIndex=-1;button.setAttribute('aria-hidden','true');button.style.pointerEvents='none';}
    });
    return rects;
  };
})();
