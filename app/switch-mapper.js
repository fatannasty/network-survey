// ── Cisco Switch Port Mapper ──
const CISCO_SWITCHES = {
  'Catalyst 9200-24P': {
    series:'9200', desc:'24-port PoE+ Layer 2/3 access switch',
    ports:24, uplinks:4, uplinkType:'SFP', poe:true, poeBudget:'195W',
    portPrefix:'GigabitEthernet1/0/', uplinkPrefix:'GigabitEthernet1/1/',
    color:'#003A5D'
  },
  'Catalyst 9200-48P': {
    series:'9200', desc:'48-port PoE+ Layer 2/3 access switch',
    ports:48, uplinks:4, uplinkType:'SFP', poe:true, poeBudget:'370W',
    portPrefix:'GigabitEthernet1/0/', uplinkPrefix:'GigabitEthernet1/1/',
    color:'#003A5D'
  },
  'Catalyst 9200-24T': {
    series:'9200', desc:'24-port non-PoE Layer 2/3 access switch',
    ports:24, uplinks:4, uplinkType:'SFP', poe:false, poeBudget:'N/A',
    portPrefix:'GigabitEthernet1/0/', uplinkPrefix:'GigabitEthernet1/1/',
    color:'#003A5D'
  },
  'Catalyst 9200-48T': {
    series:'9200', desc:'48-port non-PoE Layer 2/3 access switch',
    ports:48, uplinks:4, uplinkType:'SFP', poe:false, poeBudget:'N/A',
    portPrefix:'GigabitEthernet1/0/', uplinkPrefix:'GigabitEthernet1/1/',
    color:'#003A5D'
  },
  'Catalyst 9200L-24P-4G': {
    series:'9200L', desc:'24-port PoE+ fixed uplink switch',
    ports:24, uplinks:4, uplinkType:'SFP', poe:true, poeBudget:'195W',
    portPrefix:'GigabitEthernet1/0/', uplinkPrefix:'GigabitEthernet1/1/',
    color:'#004A70'
  },
  'Catalyst 9200L-48P-4X': {
    series:'9200L', desc:'48-port PoE+ with 4x 10G uplinks',
    ports:48, uplinks:4, uplinkType:'SFP+', poe:true, poeBudget:'370W',
    portPrefix:'GigabitEthernet1/0/', uplinkPrefix:'TenGigabitEthernet1/1/',
    color:'#004A70'
  },
  'Catalyst 9300-24P': {
    series:'9300', desc:'24-port PoE+ modular uplink switch, StackWise-320',
    ports:24, uplinks:4, uplinkType:'SFP+', poe:true, poeBudget:'437W',
    portPrefix:'GigabitEthernet1/0/', uplinkPrefix:'TenGigabitEthernet1/1/',
    color:'#005580'
  },
  'Catalyst 9300-48P': {
    series:'9300', desc:'48-port PoE+ modular uplink switch, StackWise-320',
    ports:48, uplinks:4, uplinkType:'SFP+', poe:true, poeBudget:'437W',
    portPrefix:'GigabitEthernet1/0/', uplinkPrefix:'TenGigabitEthernet1/1/',
    color:'#005580'
  },
  'Catalyst 9300-24U': {
    series:'9300', desc:'24-port UPOE (60W/port) modular switch',
    ports:24, uplinks:4, uplinkType:'SFP+', poe:true, poeBudget:'880W',
    portPrefix:'GigabitEthernet1/0/', uplinkPrefix:'TenGigabitEthernet1/1/',
    color:'#005580'
  },
  'Catalyst 9300-48U': {
    series:'9300', desc:'48-port UPOE (60W/port) modular switch',
    ports:48, uplinks:4, uplinkType:'SFP+', poe:true, poeBudget:'1440W',
    portPrefix:'GigabitEthernet1/0/', uplinkPrefix:'TenGigabitEthernet1/1/',
    color:'#005580'
  },
  'Catalyst 9300-48UXM': {
    series:'9300', desc:'12x mGig + 36x 1G UPOE, Wi-Fi 6 ready',
    ports:48, uplinks:2, uplinkType:'25G SFP28', poe:true, poeBudget:'860W',
    portPrefix:'GigabitEthernet1/0/', uplinkPrefix:'TwentyFiveGigE1/1/',
    color:'#005580'
  },
  'Catalyst 9300X-24HX': {
    series:'9300X', desc:'24-port mGig PoE++ (90W/port)',
    ports:24, uplinks:2, uplinkType:'25G SFP28', poe:true, poeBudget:'1440W',
    portPrefix:'GigabitEthernet1/0/', uplinkPrefix:'TwentyFiveGigE1/1/',
    color:'#006090'
  },
  'IE-3300-8P2S': {
    series:'IE3300', desc:'Industrial 8-port PoE + 2 SFP, IP30 ruggedized',
    ports:8, uplinks:2, uplinkType:'SFP', poe:true, poeBudget:'120W',
    portPrefix:'GigabitEthernet1/1/', uplinkPrefix:'GigabitEthernet1/9/',
    color:'#7B3200', rugged:true
  },
  'IE-3300-8T2S': {
    series:'IE3300', desc:'Industrial 8-port non-PoE + 2 SFP, IP30 ruggedized',
    ports:8, uplinks:2, uplinkType:'SFP', poe:false, poeBudget:'N/A',
    portPrefix:'GigabitEthernet1/1/', uplinkPrefix:'GigabitEthernet1/9/',
    color:'#7B3200', rugged:true
  },
  'IE-3300-8P2S-A': {
    series:'IE3300', desc:'Industrial 8-port PoE + 2 SFP, Advantage license',
    ports:8, uplinks:2, uplinkType:'SFP', poe:true, poeBudget:'120W',
    portPrefix:'GigabitEthernet1/1/', uplinkPrefix:'GigabitEthernet1/9/',
    color:'#7B3200', rugged:true
  },
  'IE-3300-16P2S': {
    series:'IE3300', desc:'Industrial 16-port PoE + 2 SFP, IP30',
    ports:16, uplinks:2, uplinkType:'SFP', poe:true, poeBudget:'240W',
    portPrefix:'GigabitEthernet1/1/', uplinkPrefix:'GigabitEthernet1/17/',
    color:'#7B3200', rugged:true
  },
  'IE-3300-16T2S': {
    series:'IE3300', desc:'Industrial 16-port non-PoE + 2 SFP',
    ports:16, uplinks:2, uplinkType:'SFP', poe:false, poeBudget:'N/A',
    portPrefix:'GigabitEthernet1/1/', uplinkPrefix:'GigabitEthernet1/17/',
    color:'#7B3200', rugged:true
  },
};

const CABLE_TYPES = [
  { id:'cat6',   label:'Cat6',       color:'#00B7D9', dash:false },
  { id:'cat6a',  label:'Cat6A',      color:'#4ADE80', dash:false },
  { id:'fiber',  label:'Fiber',      color:'#FBB843', dash:true  },
  { id:'sfp',    label:'SFP+',       color:'#A78BFA', dash:true  },
  { id:'poe',    label:'PoE',        color:'#FF6B6B', dash:false },
  { id:'mgmt',   label:'Mgmt',       color:'#F472B6', dash:false },
  { id:'uplink', label:'Uplink',     color:'#00DC64', dash:true  },
  { id:'fiber25',label:'25G Fiber',  color:'#E879F9', dash:true  },
];

let mapperState = {
  switches: [],       // {id, model, hostname, location, ports: [{num, label, vlan, speed, connected, cableId, device, notes, poe}]}
  cables: [],         // {id, from:{switchId,port}, to:{switchId,port}|null, type, label, toDevice}
  selectedSwitch: null,
  dragFrom: null,
  dragging: false,
  tempLine: null,
  scale: 1,
};

let mapperNextId = 1;

// ─── Public API ───────────────────────────────────────────────────────────────

window.SwitchMapper = {
  init() { renderSwitchSelector(); renderMapper(); },

  addSwitch(modelName) {
    const def = CISCO_SWITCHES[modelName];
    if (!def) return;
    const sw = {
      id: 'sw' + (mapperNextId++),
      model: modelName,
      def,
      hostname: '',
      location: '',
      mgmtIp: '',
      vlan: '',
      x: 60 + (mapperState.switches.length % 2) * 420,
      y: 40 + Math.floor(mapperState.switches.length / 2) * 320,
      ports: buildPorts(def),
    };
    mapperState.switches.push(sw);
    mapperState.selectedSwitch = sw.id;
    renderMapper();
    renderSwitchList();
    showMapperToast('Added ' + modelName);
  },

  removeSwitch(id) {
    mapperState.cables = mapperState.cables.filter(c => c.from.switchId !== id && (!c.to || c.to.switchId !== id));
    mapperState.switches = mapperState.switches.filter(s => s.id !== id);
    if (mapperState.selectedSwitch === id) mapperState.selectedSwitch = null;
    renderMapper();
    renderSwitchList();
  },

  getData() {
    return { switches: mapperState.switches, cables: mapperState.cables };
  },

  loadData(data) {
    if (data && data.switches) { mapperState.switches = data.switches; mapperState.cables = data.cables || []; renderMapper(); renderSwitchList(); }
  },

  exportCSV() {
    const rows = ['Switch,Port,Interface,VLAN,Speed,PoE,Connected Device,Cable Type,Label,Notes'];
    mapperState.switches.forEach(sw => {
      sw.ports.forEach(p => {
        const cable = mapperState.cables.find(c => (c.from.switchId===sw.id&&c.from.port===p.num)||(c.to&&c.to.switchId===sw.id&&c.to.port===p.num));
        rows.push([sw.hostname||sw.model, p.num, p.iface||'', p.vlan||'', p.speed||'', p.poe?'Yes':'No', p.device||'', cable?cable.type:'', cable?cable.label:'', p.notes||''].join(','));
      });
    });
    const blob = new Blob([rows.join('\n')], {type:'text/csv'});
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'port-map.csv'; a.click();
  },
};

function buildPorts(def) {
  const ports = [];
  for (let i = 1; i <= def.ports; i++) {
    ports.push({ num: i, iface: def.portPrefix + i, label: '', vlan: '', speed: 'Auto', poe: def.poe, device: '', notes: '', connected: false, uplink: false });
  }
  for (let i = 1; i <= def.uplinks; i++) {
    ports.push({ num: def.ports + i, iface: def.uplinkPrefix + i, label: 'Uplink ' + i, vlan: '', speed: def.uplinkType, poe: false, device: '', notes: '', connected: false, uplink: true });
  }
  return ports;
}

// ─── Render: Switch Selector ──────────────────────────────────────────────────
function renderSwitchSelector() {
  const sel = document.getElementById('switch-model-select');
  if (!sel) return;
  const groups = {};
  Object.entries(CISCO_SWITCHES).forEach(([name, def]) => {
    if (!groups[def.series]) groups[def.series] = [];
    groups[def.series].push(name);
  });
  sel.innerHTML = '<option value="">Choose a switch model…</option>' +
    Object.entries(groups).map(([series, models]) =>
      `<optgroup label="Catalyst ${series}">${models.map(m => `<option value="${m}">${m}</option>`).join('')}</optgroup>`
    ).join('');
}

// ─── Render: Switch List (sidebar) ────────────────────────────────────────────
function renderSwitchList() {
  const el = document.getElementById('mapper-switch-list');
  if (!el) return;
  if (!mapperState.switches.length) {
    el.innerHTML = '<p style="color:var(--text3);font-size:12px;padding:8px 0">No switches added yet. Pick a model above.</p>';
    return;
  }
  el.innerHTML = mapperState.switches.map(sw => {
    const usedPorts = sw.ports.filter(p => p.device || p.connected).length;
    const active = mapperState.selectedSwitch === sw.id;
    const seriesColor = sw.def.rugged ? '#FF8C00' : '#00B7D9';
    return `<div class="mapper-sw-item ${active?'active':''}" onclick="selectSwitch('${sw.id}')">
      <div style="display:flex;align-items:center;gap:8px">
        <div style="width:8px;height:8px;border-radius:50%;background:${seriesColor};flex-shrink:0"></div>
        <div>
          <div style="font-size:12px;font-weight:600;color:${active?'var(--cyan)':'var(--text)'}">${sw.hostname||sw.model}</div>
          <div style="font-size:10px;color:var(--text3)">${sw.model} · ${usedPorts}/${sw.ports.length} ports used</div>
        </div>
      </div>
      <button onclick="event.stopPropagation();SwitchMapper.removeSwitch('${sw.id}')" style="background:none;border:none;cursor:pointer;color:var(--text3);font-size:14px;padding:2px 6px;border-radius:4px" title="Remove switch">✕</button>
    </div>`;
  }).join('');
}

window.selectSwitch = function(id) {
  mapperState.selectedSwitch = id;
  renderSwitchList();
  renderPortDetail();
  // Highlight on canvas
  drawCanvas();
};

// ─── Render: Main Canvas ──────────────────────────────────────────────────────
function renderMapper() {
  const wrap = document.getElementById('mapper-canvas-wrap');
  if (!wrap) return;

  // Replace canvas
  let canvas = document.getElementById('mapper-canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'mapper-canvas';
    wrap.innerHTML = '';
    wrap.appendChild(canvas);
  }
  resizeCanvas();
  drawCanvas();
  setupCanvasEvents(canvas);
  renderPortDetail();
}

function resizeCanvas() {
  const wrap = document.getElementById('mapper-canvas-wrap');
  const canvas = document.getElementById('mapper-canvas');
  if (!wrap || !canvas) return;
  canvas.width  = wrap.offsetWidth  || 900;
  canvas.height = Math.max(wrap.offsetHeight || 600, 600);
  canvas.style.width  = canvas.width  + 'px';
  canvas.style.height = canvas.height + 'px';
}

function getSwitchRect(sw) {
  const cols = sw.def.ports <= 12 ? 2 : sw.def.ports <= 24 ? 2 : 4;
  const dataPortRows = Math.ceil(sw.def.ports / (cols * 2));
  const W = cols <= 2 ? 340 : 480;
  const H = 100 + dataPortRows * 38 + (sw.def.uplinks > 0 ? 48 : 0);
  return { x: sw.x, y: sw.y, w: W, h: H };
}

function getPortPos(sw, portNum) {
  const r = getSwitchRect(sw);
  const port = sw.ports.find(p => p.num === portNum);
  if (!port) return { x: r.x, y: r.y };
  if (port.uplink) {
    const uIdx = portNum - sw.def.ports - 1;
    return { x: r.x + 18 + uIdx * 48, y: r.y + r.h - 24 };
  }
  // Data ports: 2 rows per column group
  const portIdx = portNum - 1;
  const colSize = sw.def.ports <= 24 ? 12 : 24;
  const col = Math.floor(portIdx / colSize);
  const rowIdx = portIdx % colSize;
  const row = rowIdx % 2;
  const subCol = Math.floor(rowIdx / 2);
  const PW = 30, PH = 16, GAP = 4, ROWGAP = 6;
  const startX = r.x + 14;
  const startY = r.y + 60;
  const colWidth = colSize <= 12 ? (sw.def.ports <= 24 ? r.w - 28 : (r.w - 28) / 2) : (r.w - 28) / 2;
  return {
    x: startX + col * (colWidth + 10) + subCol * (PW + GAP) + PW / 2,
    y: startY + row * (PH + ROWGAP) + PH / 2
  };
}

function drawCanvas() {
  const canvas = document.getElementById('mapper-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  // Background grid
  ctx.strokeStyle = 'rgba(0,183,217,0.04)';
  ctx.lineWidth = 0.5;
  for (let x = 0; x < W; x += 40) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
  for (let y = 0; y < H; y += 40) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }

  // Draw cables
  mapperState.cables.forEach(cable => {
    if (!cable.from || !cable.to) return;
    const swA = mapperState.switches.find(s => s.id === cable.from.switchId);
    const swB = mapperState.switches.find(s => s.id === cable.to.switchId);
    if (!swA || !swB) return;
    const pA = getPortPos(swA, cable.from.port);
    const pB = getPortPos(swB, cable.to.port);
    const ctype = CABLE_TYPES.find(c => c.id === cable.type) || CABLE_TYPES[0];
    ctx.save();
    ctx.strokeStyle = ctype.color;
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.shadowColor = ctype.color;
    ctx.shadowBlur = 6;
    if (ctype.dash) ctx.setLineDash([8, 4]);
    // Curved bezier
    const mx = (pA.x + pB.x) / 2, my = (pA.y + pB.y) / 2;
    const cx1 = pA.x, cy1 = my - 30;
    const cx2 = pB.x, cy2 = my + 30;
    ctx.beginPath(); ctx.moveTo(pA.x, pA.y);
    ctx.bezierCurveTo(cx1, cy1, cx2, cy2, pB.x, pB.y);
    ctx.stroke();
    // Label at midpoint
    ctx.shadowBlur = 0; ctx.setLineDash([]);
    if (cable.label) {
      const mt = 0.5;
      const lx = Math.pow(1-mt,3)*pA.x + 3*Math.pow(1-mt,2)*mt*cx1 + 3*(1-mt)*mt*mt*cx2 + mt*mt*mt*pB.x;
      const ly = Math.pow(1-mt,3)*pA.y + 3*Math.pow(1-mt,2)*mt*cy1 + 3*(1-mt)*mt*mt*cy2 + mt*mt*mt*pB.y;
      ctx.fillStyle = 'rgba(0,8,20,0.85)';
      const tw = ctx.measureText(cable.label).width;
      ctx.fillRect(lx - tw/2 - 5, ly - 10, tw + 10, 18);
      ctx.fillStyle = ctype.color;
      ctx.font = '10px -apple-system,sans-serif';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(cable.label, lx, ly);
    }
    ctx.restore();
  });

  // Draw switches
  mapperState.switches.forEach(sw => {
    drawSwitch(ctx, sw);
  });

  // Temp drag line
  if (mapperState.dragging && mapperState.tempLine) {
    const { x1, y1, x2, y2 } = mapperState.tempLine;
    ctx.save();
    ctx.strokeStyle = 'rgba(0,183,217,0.7)';
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 3]);
    ctx.shadowColor = 'rgba(0,183,217,0.5)';
    ctx.shadowBlur = 8;
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    ctx.restore();
  }
}

function drawSwitch(ctx, sw) {
  const r = getSwitchRect(sw);
  const isSelected = mapperState.selectedSwitch === sw.id;
  const c = sw.def.color;

  // Shadow
  ctx.save();
  ctx.shadowColor = isSelected ? 'rgba(0,183,217,0.5)' : 'rgba(0,0,0,0.4)';
  ctx.shadowBlur = isSelected ? 20 : 10;

  // Body
  ctx.beginPath();
  roundRect(ctx, r.x, r.y, r.w, r.h, 10);
  ctx.fillStyle = 'rgba(0,12,30,0.92)';
  ctx.fill();
  ctx.strokeStyle = isSelected ? '#00B7D9' : (sw.def.rugged ? '#FF8C00' : '#003A5D');
  ctx.lineWidth = isSelected ? 2 : 1;
  ctx.stroke();
  ctx.shadowBlur = 0;

  // Top color bar
  ctx.beginPath();
  roundRect(ctx, r.x, r.y, r.w, 28, { tl:10, tr:10, bl:0, br:0 });
  ctx.fillStyle = c;
  ctx.fill();

  // Series badge
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.beginPath();
  ctx.roundRect(r.x + r.w - 70, r.y + 6, 62, 16, 8);
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 10px -apple-system,sans-serif';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(sw.def.series + (sw.def.rugged?' IND':''), r.x + r.w - 39, r.y + 14);

  // Hostname
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 12px -apple-system,sans-serif';
  ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
  ctx.fillText(sw.hostname || sw.model, r.x + 10, r.y + 14);

  // IP
  if (sw.mgmtIp) {
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.font = '10px monospace';
    ctx.textAlign = 'right';
    ctx.fillText(sw.mgmtIp, r.x + r.w - 80, r.y + 14);
  }

  // Model label
  ctx.fillStyle = 'rgba(0,183,217,0.6)';
  ctx.font = '10px -apple-system,sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(sw.model, r.x + 10, r.y + 42);

  // Port density label
  ctx.fillStyle = 'rgba(255,255,255,0.4)';
  ctx.textAlign = 'right';
  ctx.fillText(sw.def.ports + ' ports + ' + sw.def.uplinks + 'x ' + sw.def.uplinkType, r.x + r.w - 10, r.y + 42);

  ctx.restore();

  // Draw ports
  const colSize = sw.def.ports <= 24 ? 12 : 24;
  const numCols = Math.ceil(sw.def.ports / colSize);
  const colWidth = (r.w - 28 - (numCols - 1) * 10) / numCols;
  const PW = Math.min(28, (colWidth - 2) / Math.min(12, Math.ceil(sw.def.ports / (numCols * 2))) - 3);
  const PH = 14;
  const GAP = 3;
  const ROWGAP = 5;
  const startX = r.x + 14;
  const startY = r.y + 55;

  sw.ports.filter(p => !p.uplink).forEach((port, idx) => {
    const col = Math.floor(idx / colSize);
    const rowIdx = idx % colSize;
    const row = rowIdx % 2;
    const subCol = Math.floor(rowIdx / 2);
    const px = startX + col * (colWidth + 10) + subCol * (PW + GAP);
    const py = startY + row * (PH + ROWGAP);

    // Port box
    ctx.beginPath();
    ctx.roundRect(px, py, PW, PH, 2);
    const hasDevice = port.device || port.connected;
    const hasCable = mapperState.cables.some(c => (c.from.switchId===sw.id&&c.from.port===port.num)||(c.to&&c.to.switchId===sw.id&&c.to.port===port.num));
    ctx.fillStyle = hasCable ? 'rgba(0,183,217,0.4)' : hasDevice ? 'rgba(74,222,128,0.3)' : 'rgba(255,255,255,0.08)';
    ctx.fill();
    ctx.strokeStyle = hasCable ? '#00B7D9' : hasDevice ? '#4ADE80' : 'rgba(255,255,255,0.15)';
    ctx.lineWidth = hasCable ? 1.5 : 0.5;
    ctx.stroke();

    // PoE indicator dot
    if (port.poe && port.device) {
      ctx.beginPath(); ctx.arc(px + PW - 4, py + 4, 2, 0, Math.PI*2);
      ctx.fillStyle = '#FF6B6B'; ctx.fill();
    }

    // Port number
    ctx.fillStyle = hasCable ? '#00B7D9' : hasDevice ? '#4ADE80' : 'rgba(255,255,255,0.4)';
    ctx.font = '7px -apple-system,sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(port.num, px + PW/2, py + PH/2);
  });

  // Uplink ports
  const uplinkY = r.y + r.h - 38;
  ctx.fillStyle = 'rgba(255,255,255,0.2)';
  ctx.font = '9px -apple-system,sans-serif';
  ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
  ctx.fillText('Uplinks:', r.x + 10, uplinkY + 10);

  sw.ports.filter(p => p.uplink).forEach((port, uIdx) => {
    const px = r.x + 80 + uIdx * 52;
    const py = uplinkY;
    const UW = 46, UH = 20;
    ctx.beginPath(); ctx.roundRect(px, py, UW, UH, 3);
    const hasCable = mapperState.cables.some(c => (c.from.switchId===sw.id&&c.from.port===port.num)||(c.to&&c.to.switchId===sw.id&&c.to.port===port.num));
    ctx.fillStyle = hasCable ? 'rgba(0,220,100,0.3)' : 'rgba(255,255,255,0.06)';
    ctx.fill();
    ctx.strokeStyle = hasCable ? '#00DC64' : 'rgba(255,255,255,0.2)';
    ctx.lineWidth = hasCable ? 1.5 : 0.5;
    ctx.stroke();
    ctx.fillStyle = hasCable ? '#00DC64' : 'rgba(255,255,255,0.5)';
    ctx.font = '8px -apple-system,sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('U' + (uIdx+1), px + UW/2, py + UH/2);
  });
}

function roundRect(ctx, x, y, w, h, r) {
  if (typeof r === 'number') r = {tl:r,tr:r,bl:r,br:r};
  ctx.moveTo(x + r.tl, y);
  ctx.lineTo(x + w - r.tr, y); ctx.quadraticCurveTo(x+w, y, x+w, y+r.tr);
  ctx.lineTo(x+w, y+h-r.br); ctx.quadraticCurveTo(x+w, y+h, x+w-r.br, y+h);
  ctx.lineTo(x+r.bl, y+h); ctx.quadraticCurveTo(x, y+h, x, y+h-r.bl);
  ctx.lineTo(x, y+r.tl); ctx.quadraticCurveTo(x, y, x+r.tl, y);
}

// ─── Canvas Events ────────────────────────────────────────────────────────────
function setupCanvasEvents(canvas) {
  canvas.removeEventListener('mousedown', onMapDown);
  canvas.removeEventListener('mousemove', onMapMove);
  canvas.removeEventListener('mouseup',   onMapUp);
  canvas.removeEventListener('touchstart', onMapTouchStart);
  canvas.removeEventListener('touchmove',  onMapTouchMove);
  canvas.removeEventListener('touchend',   onMapTouchEnd);
  canvas.addEventListener('mousedown', onMapDown);
  canvas.addEventListener('mousemove', onMapMove);
  canvas.addEventListener('mouseup',   onMapUp);
  canvas.addEventListener('touchstart', onMapTouchStart, {passive:false});
  canvas.addEventListener('touchmove',  onMapTouchMove,  {passive:false});
  canvas.addEventListener('touchend',   onMapTouchEnd);
}

function getCanvasPos(e) {
  const canvas = document.getElementById('mapper-canvas');
  const r = canvas.getBoundingClientRect();
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;
  return { x: clientX - r.left, y: clientY - r.top };
}

function hitTestPort(x, y) {
  for (const sw of mapperState.switches) {
    const r = getSwitchRect(sw);
    for (const port of sw.ports) {
      const pp = getPortPos(sw, port.num);
      const hw = port.uplink ? 23 : 15;
      const hh = port.uplink ? 10 : 8;
      if (x >= pp.x - hw && x <= pp.x + hw && y >= pp.y - hh && y <= pp.y + hh) {
        return { switchId: sw.id, port: port.num };
      }
    }
  }
  return null;
}

function hitTestSwitchBody(x, y) {
  for (const sw of mapperState.switches) {
    const r = getSwitchRect(sw);
    if (x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) return sw;
  }
  return null;
}

let dragSw = null, dragOffX = 0, dragOffY = 0, dragPortFrom = null;

function onMapDown(e) {
  const pos = getCanvasPos(e);
  const hit = hitTestPort(pos.x, pos.y);
  if (hit) {
    // Start cable drag from port
    const sw = mapperState.switches.find(s => s.id === hit.switchId);
    const pp = getPortPos(sw, hit.port);
    dragPortFrom = hit;
    mapperState.dragging = true;
    mapperState.tempLine = { x1: pp.x, y1: pp.y, x2: pos.x, y2: pos.y };
    mapperState.selectedSwitch = hit.switchId;
    renderSwitchList(); renderPortDetail();
    return;
  }
  const sw = hitTestSwitchBody(pos.x, pos.y);
  if (sw) {
    dragSw = sw;
    dragOffX = pos.x - sw.x;
    dragOffY = pos.y - sw.y;
    mapperState.selectedSwitch = sw.id;
    renderSwitchList(); renderPortDetail();
  }
}

function onMapMove(e) {
  const pos = getCanvasPos(e);
  if (mapperState.dragging && dragPortFrom) {
    const sw = mapperState.switches.find(s => s.id === dragPortFrom.switchId);
    const pp = getPortPos(sw, dragPortFrom.port);
    mapperState.tempLine = { x1: pp.x, y1: pp.y, x2: pos.x, y2: pos.y };
    drawCanvas();
    return;
  }
  if (dragSw) {
    dragSw.x = pos.x - dragOffX;
    dragSw.y = pos.y - dragOffY;
    drawCanvas();
  }
}

function onMapUp(e) {
  if (mapperState.dragging && dragPortFrom) {
    const pos = getCanvasPos(e);
    const hitTo = hitTestPort(pos.x, pos.y);
    if (hitTo && (hitTo.switchId !== dragPortFrom.switchId || hitTo.port !== dragPortFrom.port)) {
      addCable(dragPortFrom, hitTo);
    } else if (!hitTo) {
      // Cable to external device
      const label = prompt('Cable to external device (enter device name, or cancel):');
      if (label) {
        const cable = {
          id: 'cable' + (mapperNextId++),
          from: dragPortFrom,
          to: null,
          toDevice: label,
          type: getCurrentCableType(),
          label: label,
        };
        mapperState.cables.push(cable);
        // Mark port as connected
        const sw = mapperState.switches.find(s => s.id === dragPortFrom.switchId);
        const port = sw && sw.ports.find(p => p.num === dragPortFrom.port);
        if (port) { port.device = label; port.connected = true; }
        renderPortDetail();
      }
    }
    mapperState.dragging = false;
    dragPortFrom = null;
    mapperState.tempLine = null;
    drawCanvas();
    return;
  }
  dragSw = null;
}

function onMapTouchStart(e) { e.preventDefault(); onMapDown(e); }
function onMapTouchMove(e)  { e.preventDefault(); onMapMove(e); }
function onMapTouchEnd(e)   { onMapUp(e); }

function addCable(from, to) {
  // Remove existing cable on either port
  mapperState.cables = mapperState.cables.filter(c =>
    !((c.from.switchId===from.switchId&&c.from.port===from.port)||(c.to&&c.to.switchId===from.switchId&&c.to.port===from.port)||
      (c.from.switchId===to.switchId&&c.from.port===to.port)||(c.to&&c.to.switchId===to.switchId&&c.to.port===to.port))
  );
  const swA = mapperState.switches.find(s=>s.id===from.switchId);
  const swB = mapperState.switches.find(s=>s.id===to.switchId);
  const pA = swA && swA.ports.find(p=>p.num===from.port);
  const pB = swB && swB.ports.find(p=>p.num===to.port);
  const autoLabel = (pA?pA.iface:'?') + ' → ' + (pB?pB.iface:'?');
  const cable = {
    id: 'cable' + (mapperNextId++),
    from, to,
    toDevice: null,
    type: getCurrentCableType(),
    label: autoLabel,
  };
  mapperState.cables.push(cable);
  if (pA) pA.connected = true;
  if (pB) pB.connected = true;
  renderPortDetail();
  drawCanvas();
  showMapperToast('Cable connected: ' + autoLabel);
}

function getCurrentCableType() {
  return document.getElementById('mapper-cable-type')?.value || 'cat6';
}

// ─── Port Detail Panel ─────────────────────────────────────────────────────
function renderPortDetail() {
  const el = document.getElementById('mapper-port-detail');
  if (!el) return;
  const sw = mapperState.switches.find(s => s.id === mapperState.selectedSwitch);
  if (!sw) { el.innerHTML = '<p style="color:var(--text3);font-size:12px;padding:10px 0">Select a switch to view and edit port details.</p>'; return; }

  el.innerHTML = `
    <div style="margin-bottom:14px">
      <div class="field-grid col2" style="gap:10px;margin-bottom:10px">
        <div class="field-group"><label>Hostname</label>
          <input type="text" value="${sw.hostname||''}" placeholder="e.g. SW-FLOOR2-01" oninput="updateSwField('${sw.id}','hostname',this.value)"></div>
        <div class="field-group"><label>Mgmt IP</label>
          <input type="text" value="${sw.mgmtIp||''}" placeholder="e.g. 10.0.0.2" oninput="updateSwField('${sw.id}','mgmtIp',this.value)"></div>
        <div class="field-group"><label>Location</label>
          <input type="text" value="${sw.location||''}" placeholder="e.g. Rack A, U12" oninput="updateSwField('${sw.id}','location',this.value)"></div>
        <div class="field-group"><label>Management VLAN</label>
          <input type="text" value="${sw.vlan||''}" placeholder="e.g. 99" oninput="updateSwField('${sw.id}','vlan',this.value)"></div>
      </div>
      <div style="font-size:10px;color:var(--text3);background:rgba(0,183,217,0.05);padding:8px 10px;border-radius:8px;border:1px solid var(--border)">
        <strong style="color:var(--cyan)">${sw.model}</strong> · ${sw.def.desc} · PoE: ${sw.def.poe?sw.def.poeBudget:'No'}
      </div>
    </div>
    <h3 class="sub-heading" style="margin-bottom:8px">Port configuration</h3>
    <div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse;font-size:12px;min-width:500px">
        <thead><tr>
          <th style="padding:6px 8px;text-align:left;font-size:10px;color:var(--cyan);border-bottom:1px solid var(--border);text-transform:uppercase;letter-spacing:.08em;white-space:nowrap">Port</th>
          <th style="padding:6px 8px;text-align:left;font-size:10px;color:var(--cyan);border-bottom:1px solid var(--border);text-transform:uppercase;letter-spacing:.08em">Interface</th>
          <th style="padding:6px 8px;text-align:left;font-size:10px;color:var(--cyan);border-bottom:1px solid var(--border);text-transform:uppercase;letter-spacing:.08em">Device / label</th>
          <th style="padding:6px 8px;text-align:left;font-size:10px;color:var(--cyan);border-bottom:1px solid var(--border);text-transform:uppercase;letter-spacing:.08em">VLAN</th>
          <th style="padding:6px 8px;text-align:left;font-size:10px;color:var(--cyan);border-bottom:1px solid var(--border);text-transform:uppercase;letter-spacing:.08em">Speed</th>
          <th style="padding:6px 8px;text-align:left;font-size:10px;color:var(--cyan);border-bottom:1px solid var(--border);text-transform:uppercase;letter-spacing:.08em">Notes</th>
          <th style="padding:6px 8px;border-bottom:1px solid var(--border)"></th>
        </tr></thead>
        <tbody>
          ${sw.ports.map(p => {
            const hasCable = mapperState.cables.some(c=>(c.from.switchId===sw.id&&c.from.port===p.num)||(c.to&&c.to.switchId===sw.id&&c.to.port===p.num));
            const rowBg = hasCable?'rgba(0,183,217,0.06)':p.device?'rgba(74,222,128,0.04)':'';
            const badge = p.uplink
              ? `<span style="font-size:9px;padding:1px 6px;border-radius:4px;background:rgba(0,220,100,0.15);color:#00DC64;border:1px solid rgba(0,220,100,0.3)">UPLINK</span>`
              : p.poe ? `<span style="font-size:9px;padding:1px 6px;border-radius:4px;background:rgba(255,107,107,0.12);color:#FF6B6B;border:1px solid rgba(255,107,107,0.25)">PoE</span>` : '';
            return `<tr style="background:${rowBg};border-bottom:1px solid rgba(0,183,217,0.06)">
              <td style="padding:5px 8px;color:${hasCable?'#00B7D9':'var(--text2)'};font-weight:600;white-space:nowrap">${p.num} ${badge}</td>
              <td style="padding:5px 8px;font-family:monospace;font-size:10px;color:var(--text3)">${p.iface}</td>
              <td style="padding:5px 8px"><input type="text" value="${p.device||''}" placeholder="Connected device" style="width:100%;padding:3px 6px;font-size:11px;background:rgba(0,20,50,0.5);border:1px solid var(--border);border-radius:4px;color:var(--text)" oninput="updatePort('${sw.id}',${p.num},'device',this.value)"></td>
              <td style="padding:5px 8px"><input type="text" value="${p.vlan||''}" placeholder="VLAN" style="width:60px;padding:3px 6px;font-size:11px;background:rgba(0,20,50,0.5);border:1px solid var(--border);border-radius:4px;color:var(--text)" oninput="updatePort('${sw.id}',${p.num},'vlan',this.value)"></td>
              <td style="padding:5px 8px"><select style="padding:3px 6px;font-size:11px;background:rgba(0,20,50,0.5);border:1px solid var(--border);border-radius:4px;color:var(--text)" onchange="updatePort('${sw.id}',${p.num},'speed',this.value)"><option ${p.speed==='Auto'?'selected':''}>Auto</option><option ${p.speed==='10M'?'selected':''}>10M</option><option ${p.speed==='100M'?'selected':''}>100M</option><option ${p.speed==='1G'?'selected':''}>1G</option><option ${p.speed==='2.5G'?'selected':''}>2.5G</option><option ${p.speed==='5G'?'selected':''}>5G</option><option ${p.speed==='10G'?'selected':''}>10G</option><option ${p.speed==='25G'?'selected':''}>25G</option></select></td>
              <td style="padding:5px 8px"><input type="text" value="${p.notes||''}" placeholder="Notes" style="width:100%;padding:3px 6px;font-size:11px;background:rgba(0,20,50,0.5);border:1px solid var(--border);border-radius:4px;color:var(--text)" oninput="updatePort('${sw.id}',${p.num},'notes',this.value)"></td>
              <td style="padding:5px 8px">${hasCable?`<button onclick="removeCableOnPort('${sw.id}',${p.num})" style="background:rgba(255,107,107,0.12);border:1px solid rgba(255,107,107,0.25);color:#FF6B6B;border-radius:4px;padding:2px 6px;cursor:pointer;font-size:10px">✕</button>`:''}
              </td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>
    <div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap">
      <button class="btn btn-ghost" style="font-size:12px;padding:6px 12px" onclick="SwitchMapper.exportCSV()">&#8681; Export CSV</button>
      <button class="btn btn-outline" style="font-size:12px;padding:6px 12px" onclick="saveMapperToSurvey()">&#10003; Save to survey</button>
    </div>`;
}

window.updateSwField = function(swId, field, val) {
  const sw = mapperState.switches.find(s => s.id === swId);
  if (sw) { sw[field] = val; drawCanvas(); }
};

window.updatePort = function(swId, portNum, field, val) {
  const sw = mapperState.switches.find(s => s.id === swId);
  const port = sw && sw.ports.find(p => p.num === portNum);
  if (port) { port[field] = val; if (field === 'device') port.connected = !!val; drawCanvas(); }
};

window.removeCableOnPort = function(swId, portNum) {
  mapperState.cables = mapperState.cables.filter(c =>
    !((c.from.switchId===swId&&c.from.port===portNum)||(c.to&&c.to.switchId===swId&&c.to.port===portNum))
  );
  const sw = mapperState.switches.find(s=>s.id===swId);
  const port = sw&&sw.ports.find(p=>p.num===portNum);
  if (port) port.connected = false;
  drawCanvas(); renderPortDetail();
};

window.saveMapperToSurvey = function() {
  try {
    const key = 'netsurvey_mapper_' + (localStorage.getItem('netsurvey_latest') || 'default');
    localStorage.setItem(key, JSON.stringify(SwitchMapper.getData()));
    showMapperToast('Port map saved ✓');
  } catch(e) { showMapperToast('Save failed'); }
};

window.loadMapperFromSurvey = function() {
  try {
    const key = 'netsurvey_mapper_' + (localStorage.getItem('netsurvey_latest') || 'default');
    const raw = localStorage.getItem(key);
    if (raw) { SwitchMapper.loadData(JSON.parse(raw)); showMapperToast('Port map loaded'); }
  } catch(e) {}
};

function showMapperToast(msg) {
  if (window.showToast) { showToast(msg); return; }
  const t = document.getElementById('toast');
  if (t) { t.textContent = msg; t.classList.add('show'); setTimeout(() => t.classList.remove('show'), 2500); }
}

window.addEventListener('resize', () => { resizeCanvas(); drawCanvas(); });
