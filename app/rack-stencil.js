// ══════════════════════════════════════════════════════════════════════
//  Rack Stencil — add racks to canvas, populate with equipment
// ══════════════════════════════════════════════════════════════════════

const RS_CATALOG = {
  switches: {
    label:'Switches', icon:'🔀', color:'#003A5D',
    items:[
      {name:'Catalyst 9200-24P',  u:1},{name:'Catalyst 9200-48P',   u:1},
      {name:'Catalyst 9200-24T',  u:1},{name:'Catalyst 9200-48T',   u:1},
      {name:'Catalyst 9200L-24P', u:1},{name:'Catalyst 9200L-48P',  u:1},
      {name:'Catalyst 9300-24P',  u:1},{name:'Catalyst 9300-48P',   u:1},
      {name:'Catalyst 9300-24U',  u:1},{name:'Catalyst 9300-48U',   u:1},
      {name:'Catalyst 9300-48UXM',u:1},{name:'Catalyst 9300X-24HX', u:1},
      {name:'Catalyst 9500-24Y4C',u:1},{name:'Catalyst 9500-48Y4C', u:1},
      {name:'Nexus 9300-48S',     u:1},{name:'Nexus 9336C-FX2',     u:1},
      {name:'IE-3300-8P2S',       u:1},{name:'IE-3300-16P2S',       u:1},
      {name:'Custom Switch',      u:1},
    ]
  },
  patch_panels: {
    label:'Patch Panels', icon:'🔲', color:'#1F2937',
    items:[
      {name:'PP 24P Cat5e',           u:1},{name:'PP 48P Cat5e',              u:1},
      {name:'PP 24P Cat6',            u:1},{name:'PP 48P Cat6',               u:1},
      {name:'PP 24P Cat6A',           u:1},{name:'PP 48P Cat6A',              u:1},
      {name:'PP 24P Cat7',            u:1},{name:'Keystone Panel 24P',        u:1},
      {name:'Keystone Panel 48P',     u:1},
      // Fiber LC
      {name:'Fiber 12-LC SM (OS2)',   u:1},{name:'Fiber 24-LC SM (OS2)',      u:1},
      {name:'Fiber 48-LC SM (OS2)',   u:2},{name:'Fiber 12-LC MM (OM3)',      u:1},
      {name:'Fiber 24-LC MM (OM4)',   u:1},{name:'Fiber 48-LC MM (OM4)',      u:2},
      // Fiber SC
      {name:'Fiber 12-SC SM (OS2)',   u:1},{name:'Fiber 24-SC SM (OS2)',      u:1},
      {name:'Fiber 12-SC MM (OM3)',   u:1},
      // MTP/MPO
      {name:'MTP/MPO 12-fiber',       u:1},{name:'MTP/MPO 24-fiber',          u:1},
      {name:'MTP/MPO 144-fiber HD',   u:1},
      // ST
      {name:'Fiber 12-ST SM',         u:1},{name:'Fiber 24-ST SM',            u:1},
      // Cisco
      {name:'Cisco Fiber Shelf 24-LC',u:1},{name:'Cisco Fiber Shelf 48-LC',   u:2},
      {name:'Custom Patch Panel',     u:1},
    ]
  },
  fiber_enclosures: {
    label:'Fiber Enclosures', icon:'🔆', color:'#1E3A5F',
    items:[
      {name:'LGX Enclosure 1U',       u:1},{name:'LGX Enclosure 2U',          u:2},
      {name:'Corning CCH 1U',         u:1},{name:'Corning CCH 2U',            u:2},
      {name:'Panduit OPTICOM 1U',     u:1},{name:'Panduit OPTICOM 4U',        u:4},
      {name:'CommScope FACT 1U',      u:1},{name:'AFL Distribution 1U',       u:1},
      {name:'Splice Tray 1U',         u:1},{name:'Splice Enclosure 2U',       u:2},
      {name:'Custom Fiber Enclosure', u:1},
    ]
  },
  routers_fw: {
    label:'Routers / FW', icon:'🌐', color:'#065F46',
    items:[
      {name:'Cisco ISR 1100-4P',  u:1},{name:'Cisco ISR 4331',        u:1},
      {name:'Cisco Cat 8200',     u:1},{name:'Cisco Cat 8300',         u:1},
      {name:'Cisco ASR 1001-X',   u:2},{name:'VeloCloud Edge 620',     u:1},
      {name:'VeloCloud Edge 3800',u:1},{name:'Cisco FPR 1010',         u:1},
      {name:'Cisco FPR 1120',     u:1},{name:'Cisco FPR 2110',         u:1},
      {name:'Cisco ASA 5516-X',   u:1},{name:'Palo Alto PA-440',       u:1},
      {name:'Fortinet FG-60F',    u:1},{name:'pfSense Appliance',      u:1},
      {name:'Custom Router/FW',   u:1},
    ]
  },
  servers: {
    label:'Servers / NAS', icon:'🖥️', color:'#1E3A5F',
    items:[
      {name:'Dell R250',          u:1},{name:'Dell R350',              u:1},
      {name:'Dell R450',          u:1},{name:'Dell R650',              u:1},
      {name:'Dell R750',          u:2},{name:'HPE DL20',               u:1},
      {name:'HPE DL360',          u:1},{name:'HPE DL380',              u:2},
      {name:'Cisco UCS C220 M6',  u:1},{name:'Cisco UCS C240 M6',     u:2},
      {name:'Synology RS1221+',   u:2},{name:'QNAP TS-873A',           u:2},
      {name:'Custom Server',      u:1},
    ]
  },
  power: {
    label:'Power / UPS', icon:'⚡', color:'#78350F',
    items:[
      {name:'APC Smart-UPS 1500', u:2},{name:'APC Smart-UPS 2200',    u:2},
      {name:'APC Smart-UPS 3000', u:2},{name:'APC SRT 5000VA',         u:6},
      {name:'Eaton 5PX 1500',     u:2},{name:'Eaton 9PX 2000',         u:2},
      {name:'APC PDU 1U Basic',   u:1},{name:'APC PDU 2U Basic',       u:2},
      {name:'APC PDU 1U Metered', u:1},{name:'APC PDU 2U Switched',    u:2},
      {name:'Vertiv MPH2 PDU',    u:1},{name:'Eaton ePDU Managed',     u:1},
      {name:'Custom PDU/UPS',     u:1},
    ]
  },
  accessories: {
    label:'Accessories', icon:'📦', color:'#374151',
    items:[
      {name:'Cable Mgr 1U Horiz', u:1},{name:'Cable Mgr 2U Horiz',    u:2},
      {name:'Blank Panel 1U',     u:1},{name:'Blank Panel 2U',         u:2},
      {name:'Rack Shelf 1U',      u:1},{name:'Rack Shelf 2U Adj',      u:2},
      {name:'Fan Tray 1U',        u:1},{name:'KVM Drawer 1U',          u:1},
      {name:'KVM 8-Port IP',      u:1},{name:'KVM 16-Port IP',         u:1},
      {name:'Media Conv Shelf 1U',u:1},{name:'LCD Monitor 1U',         u:1},
      {name:'Custom Accessory',   u:1},
    ]
  },
};

// colors per category
const RS_COLORS = {
  switches:'#003A5D', patch_panels:'#1F2937', fiber_enclosures:'#1E3A5F',
  routers_fw:'#065F46', servers:'#1E3A5F', power:'#78350F', accessories:'#374151'
};

// ── State ──────────────────────────────────────────────────────────────
const RS = window.RS = {
  racks: [],           // [{id, label, units, devices:[{id,name,cat,u,color,label}]}]
  selectedRackId: null,
  activeCat: 'switches',
  _id: 1,

  // ── Init ──
  init() {
    buildCatTabs();
    renderAll();
    loadState();
  },

  // ── Add rack ──
  addRack() {
    const label = (document.getElementById('rs-rack-label').value.trim()) || ('Rack ' + String.fromCharCode(64 + this.racks.length + 1));
    const units = parseInt(document.getElementById('rs-rack-size').value) || 42;
    const rack  = { id:'rack'+(this._id++), label, units, devices:[] };
    this.racks.push(rack);
    this.selectRack(rack.id);
    document.getElementById('rs-rack-label').value = '';
    renderAll();
    saveState();
    toast('Added ' + label + ' (' + units + 'U)');
  },

  // ── Remove rack ──
  removeRack(rackId) {
    if (!confirm('Remove this rack and all its equipment?')) return;
    this.racks = this.racks.filter(r => r.id !== rackId);
    if (this.selectedRackId === rackId) {
      this.selectedRackId = this.racks.length ? this.racks[0].id : null;
    }
    renderAll();
    saveState();
  },

  // ── Select rack ──
  selectRack(rackId) {
    this.selectedRackId = rackId;
    const rack = this.racks.find(r => r.id === rackId);
    const nameEl = document.getElementById('rs-selected-rack-name');
    const btn    = document.getElementById('rs-add-device-btn');
    if (nameEl) nameEl.textContent = rack ? '📋 Adding to: ' + rack.label : 'No rack selected';
    if (btn)    btn.disabled = !rack;
    renderAll();
  },

  // ── Add device to selected rack ──
  addDevice() {
    const rack = this.racks.find(r => r.id === this.selectedRackId);
    if (!rack) { toast('Select a rack first'); return; }
    const sel = document.getElementById('rs-device-model');
    if (!sel || !sel.value) { toast('Choose a device model'); return; }
    const label = document.getElementById('rs-device-label').value.trim() || sel.value;
    const [catKey, modelName] = sel.value.split('||');
    const cat   = RS_CATALOG[catKey];
    const model = cat && cat.items.find(i => i.name === modelName);
    if (!model) return;
    const u     = model.u || 1;
    const usedU = rack.devices.reduce((s,d) => s + (d.u||1), 0);
    if (usedU + u > rack.units) { toast('Not enough free space in ' + rack.label); return; }
    rack.devices.push({ id:'dev'+(this._id++), name:modelName, cat:catKey, u, color:RS_COLORS[catKey]||'#374151', label });
    document.getElementById('rs-device-label').value = '';
    renderAll();
    saveState();
    toast('Added ' + label);
  },

  // ── Remove device ──
  removeDevice(rackId, devId) {
    const rack = this.racks.find(r => r.id === rackId);
    if (rack) rack.devices = rack.devices.filter(d => d.id !== devId);
    renderAll();
    saveState();
  },

  // ── Move device up/down ──
  moveDevice(rackId, devId, dir) {
    const rack = this.racks.find(r => r.id === rackId);
    if (!rack) return;
    const idx = rack.devices.findIndex(d => d.id === devId);
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= rack.devices.length) return;
    [rack.devices[idx], rack.devices[newIdx]] = [rack.devices[newIdx], rack.devices[idx]];
    renderAll();
    saveState();
  },

  // ── Export ──
  exportCSV() {
    const rows = ['Rack,U-Span,Device,Model,Category'];
    this.racks.forEach(rack => {
      let u = 1;
      rack.devices.forEach(d => {
        rows.push(`"${rack.label}","${u}–${u+d.u-1}","${d.label}","${d.name}","${d.cat}"`);
        u += d.u;
      });
    });
    const blob = new Blob([rows.join('\n')],{type:'text/csv'});
    const a = document.createElement('a'); a.href=URL.createObjectURL(blob);
    a.download='rack-layout.csv'; a.click();
    toast('Rack layout exported ✓');
  },

  // ── Clear ──
  clearAll() {
    if (!confirm('Clear all racks and equipment?')) return;
    this.racks = []; this.selectedRackId = null;
    renderAll(); saveState();
  },
};

// ── Category tabs ──────────────────────────────────────────────────────
function buildCatTabs() {
  const el = document.getElementById('rs-cat-tabs');
  if (!el) return;
  el.innerHTML = Object.entries(RS_CATALOG).map(([key, cat]) =>
    `<button onclick="setRSCat('${key}')" data-rscat="${key}"
      style="padding:4px 10px;border-radius:100px;border:1px solid var(--border);font-size:11px;cursor:pointer;background:transparent;color:var(--text2);font-family:inherit;transition:all .15s;margin-bottom:4px"
      >${cat.icon} ${cat.label}</button>`
  ).join('');
  setRSCat('switches');
}

window.setRSCat = function(key) {
  RS.activeCat = key;
  document.querySelectorAll('[data-rscat]').forEach(b => {
    const active = b.dataset.rscat === key;
    b.style.borderColor = active ? 'var(--cyan)' : 'var(--border)';
    b.style.color       = active ? 'var(--cyan)' : 'var(--text2)';
    b.style.background  = active ? 'rgba(0,183,217,0.10)' : 'transparent';
  });
  const sel = document.getElementById('rs-device-model');
  const cat = RS_CATALOG[key];
  if (!sel || !cat) return;
  sel.innerHTML = `<option value="">Choose ${cat.label}…</option>` +
    cat.items.map(i => `<option value="${key}||${i.name}">${i.name}${i.u>1?' ('+i.u+'U)':''}</option>`).join('');
};

// ── Render ─────────────────────────────────────────────────────────────
function renderAll() {
  renderCanvas();
  renderInventory();
}

function renderCanvas() {
  const empty  = document.getElementById('rs-empty');
  const inner  = document.getElementById('rs-canvas-inner');
  if (!empty || !inner) return;

  if (!RS.racks.length) {
    empty.style.display  = 'flex';
    inner.style.display  = 'none';
    return;
  }
  empty.style.display = 'none';
  inner.style.display = 'flex';

  inner.innerHTML = RS.racks.map(rack => buildRackHTML(rack)).join('');
}

function buildRackHTML(rack) {
  const selected = RS.selectedRackId === rack.id;
  const usedU    = rack.devices.reduce((s,d) => s+(d.u||1), 0);
  const freeU    = rack.units - usedU;

  // Build unit rows
  let rows = '';
  let currentU = 1;
  rack.devices.forEach((dev, di) => {
    const h = dev.u * 28 - 2; // px height per U = 28px
    rows += `
      <div style="display:flex;border-bottom:1px solid rgba(255,255,255,0.05);min-height:${dev.u*28}px;position:relative" title="${dev.label} · ${dev.u}U">
        <div style="width:26px;background:rgba(0,0,0,0.25);border-right:1px solid rgba(255,255,255,0.05);display:flex;flex-direction:column;justify-content:center;align-items:center;flex-shrink:0">
          <span style="font-size:8px;color:rgba(255,255,255,0.2);font-family:monospace">${currentU}</span>
        </div>
        <div style="flex:1;background:${dev.color};display:flex;align-items:center;padding:0 8px;gap:6px;overflow:hidden;min-height:${h}px">
          <span style="font-size:${dev.u>1?'13':'11'}px;font-weight:700;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:1">${dev.label}</span>
          <span style="font-size:9px;color:rgba(255,255,255,0.45);white-space:nowrap">${dev.name!==dev.label?dev.name+' · ':''}${dev.u}U</span>
          <div style="display:flex;flex-direction:column;gap:2px;flex-shrink:0">
            ${di>0?`<button onclick="RS.moveDevice('${rack.id}','${dev.id}',-1)" style="background:rgba(0,0,0,0.3);border:none;color:rgba(255,255,255,0.5);cursor:pointer;border-radius:3px;width:18px;height:14px;font-size:9px;display:flex;align-items:center;justify-content:center">▲</button>`:''}
            ${di<rack.devices.length-1?`<button onclick="RS.moveDevice('${rack.id}','${dev.id}',1)" style="background:rgba(0,0,0,0.3);border:none;color:rgba(255,255,255,0.5);cursor:pointer;border-radius:3px;width:18px;height:14px;font-size:9px;display:flex;align-items:center;justify-content:center">▼</button>`:''}
            <button onclick="RS.removeDevice('${rack.id}','${dev.id}')" style="background:rgba(180,0,0,0.4);border:none;color:#fff;cursor:pointer;border-radius:3px;width:18px;height:14px;font-size:9px;display:flex;align-items:center;justify-content:center">✕</button>
          </div>
        </div>
      </div>`;
    currentU += dev.u;
  });

  // Fill remaining empty Us
  for (let i = currentU; i <= rack.units; i++) {
    rows += `
      <div style="display:flex;border-bottom:1px solid rgba(255,255,255,0.04);height:28px;cursor:pointer" onclick="RS.selectRack('${rack.id}')" title="U${i} — empty">
        <div style="width:26px;background:rgba(0,0,0,0.2);border-right:1px solid rgba(255,255,255,0.05);display:flex;align-items:center;justify-content:center;flex-shrink:0">
          <span style="font-size:8px;color:rgba(255,255,255,0.15);font-family:monospace">${i}</span>
        </div>
        <div style="flex:1;display:flex;align-items:center;padding:0 8px">
          <span style="font-size:9px;color:rgba(255,255,255,0.07)">— empty —</span>
        </div>
      </div>`;
  }

  return `
    <div style="flex-shrink:0;width:320px" onclick="event.stopPropagation()">
      <!-- Rack header -->
      <div style="background:${selected?'rgba(0,183,217,0.2)':'rgba(0,58,93,0.6)'};border:${selected?'2px solid #00B7D9':'2px solid rgba(0,183,217,0.2)'};border-bottom:none;border-radius:8px 8px 0 0;padding:8px 12px;display:flex;align-items:center;justify-content:space-between;cursor:pointer" onclick="RS.selectRack('${rack.id}')">
        <div>
          <div style="font-size:13px;font-weight:700;color:${selected?'#00B7D9':'#fff'}">${rack.label}</div>
          <div style="font-size:10px;color:rgba(255,255,255,0.4);margin-top:1px">${rack.units}U · ${usedU}U used · ${freeU}U free</div>
        </div>
        <div style="display:flex;gap:6px;align-items:center">
          ${selected?'<span style="font-size:10px;color:#00B7D9;font-weight:600">● SELECTED</span>':''}
          <button onclick="event.stopPropagation();RS.removeRack('${rack.id}')" style="background:rgba(180,0,0,0.3);border:1px solid rgba(180,0,0,0.4);color:#ff8080;border-radius:6px;padding:3px 8px;cursor:pointer;font-size:11px;font-family:inherit">✕ Remove</button>
        </div>
      </div>
      <!-- Rack body -->
      <div style="border:${selected?'2px solid #00B7D9':'2px solid rgba(0,183,217,0.15)'};border-top:none;border-radius:0 0 8px 8px;overflow:hidden;background:rgba(0,4,14,0.95)">
        ${rows}
      </div>
    </div>`;
}

function renderInventory() {
  const el = document.getElementById('rs-inventory');
  if (!el) return;
  if (!RS.racks.length) { el.innerHTML='<p style="color:var(--text3);font-size:11px">No racks added yet.</p>'; return; }
  let html = '';
  RS.racks.forEach(rack => {
    html += `<div style="margin-bottom:10px">
      <div style="font-size:11px;font-weight:700;color:var(--cyan);margin-bottom:4px;cursor:pointer" onclick="RS.selectRack('${rack.id}')">${rack.label} (${rack.units}U)</div>`;
    if (!rack.devices.length) {
      html += `<div style="font-size:10px;color:var(--text3);padding-left:6px">Empty</div>`;
    } else {
      let u = 1;
      rack.devices.forEach(d => {
        html += `<div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;padding-left:6px">
          <div style="width:8px;height:8px;border-radius:2px;background:${d.color};flex-shrink:0"></div>
          <span style="font-size:10px;color:rgba(0,183,217,0.5);font-family:monospace;flex-shrink:0">U${u}</span>
          <span style="font-size:11px;color:var(--text);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1">${d.label}</span>
          <span style="font-size:9px;color:var(--text3);flex-shrink:0">${d.u}U</span>
        </div>`;
        u += d.u;
      });
    }
    html += `</div>`;
  });
  el.innerHTML = html;
}

// ── Storage ────────────────────────────────────────────────────────────
function saveState() {
  try { localStorage.setItem('netsurvey_rs_'+(localStorage.getItem('netsurvey_latest')||'x'), JSON.stringify({racks:RS.racks,_id:RS._id})); } catch(e){}
}
function loadState() {
  try {
    const raw = localStorage.getItem('netsurvey_rs_'+(localStorage.getItem('netsurvey_latest')||'x'));
    if (raw) { const d=JSON.parse(raw); RS.racks=d.racks||[]; RS._id=d._id||1; renderAll(); }
  } catch(e){}
}

function toast(msg) { if(window.showToast) showToast(msg); }

// Re-render when section becomes visible (canvas may have been zero-size)
window.onRackStencilVisible = function() {
  setTimeout(renderAll, 80);
};

window.initRackStencil = function() {
  buildCatTabs();
  renderAll();
  loadState();
};
