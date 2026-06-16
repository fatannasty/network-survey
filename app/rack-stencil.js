// ══════════════════════════════════════════════════════
//  Rack Stencil — visual drag-and-drop rack layout
// ══════════════════════════════════════════════════════

const RACK_CATALOG = {
  switches: {
    label:'Switches', icon:'🔀', color:'#003A5D',
    items:[
      { name:'Catalyst 9200-24P',  u:1, color:'#003A5D' },
      { name:'Catalyst 9200-48P',  u:1, color:'#003A5D' },
      { name:'Catalyst 9200-24T',  u:1, color:'#003A5D' },
      { name:'Catalyst 9200-48T',  u:1, color:'#003A5D' },
      { name:'Catalyst 9200L-24P-4G', u:1, color:'#004A70' },
      { name:'Catalyst 9200L-48P-4X', u:1, color:'#004A70' },
      { name:'Catalyst 9300-24P',  u:1, color:'#005580' },
      { name:'Catalyst 9300-48P',  u:1, color:'#005580' },
      { name:'Catalyst 9300-24U',  u:1, color:'#005580' },
      { name:'Catalyst 9300-48U',  u:1, color:'#005580' },
      { name:'Catalyst 9300-48UXM',u:1, color:'#005580' },
      { name:'Catalyst 9300X-24HX',u:1, color:'#006090' },
      { name:'Catalyst 9500-24Y4C',u:1, color:'#006A9A' },
      { name:'Catalyst 9500-48Y4C',u:1, color:'#006A9A' },
      { name:'Nexus 9300-48S',     u:1, color:'#0078A8' },
      { name:'Nexus 9336C-FX2',    u:1, color:'#0078A8' },
      { name:'IE-3300-8P2S',       u:1, color:'#7B3200' },
      { name:'IE-3300-16P2S',      u:1, color:'#7B3200' },
      { name:'Custom Switch',      u:1, color:'#374151' },
    ]
  },
  patch_panels: {
    label:'Patch Panels', icon:'🔲', color:'#1F2937',
    items:[
      // Copper
      { name:'Patch Panel 24P Cat5e',    u:1, color:'#374151', sub:'RJ45 · Cat5e' },
      { name:'Patch Panel 48P Cat5e',    u:1, color:'#374151', sub:'RJ45 · Cat5e' },
      { name:'Patch Panel 24P Cat6',     u:1, color:'#1F2937', sub:'RJ45 · Cat6' },
      { name:'Patch Panel 48P Cat6',     u:1, color:'#1F2937', sub:'RJ45 · Cat6' },
      { name:'Patch Panel 24P Cat6A',    u:1, color:'#111827', sub:'RJ45 · Cat6A' },
      { name:'Patch Panel 48P Cat6A',    u:1, color:'#111827', sub:'RJ45 · Cat6A' },
      { name:'Patch Panel 24P Cat7',     u:1, color:'#0F172A', sub:'RJ45 · Cat7' },
      { name:'Keystone Panel 24P',       u:1, color:'#374151', sub:'Keystone · toolless' },
      { name:'Keystone Panel 48P',       u:1, color:'#374151', sub:'Keystone · toolless' },
      // Fiber — LC
      { name:'Fiber PP 12-LC Duplex SM', u:1, color:'#1E3A5F', sub:'LC Duplex · OS2 Single-mode' },
      { name:'Fiber PP 24-LC Duplex SM', u:1, color:'#1E3A5F', sub:'LC Duplex · OS2 Single-mode' },
      { name:'Fiber PP 48-LC Duplex SM', u:2, color:'#1E3A5F', sub:'LC Duplex · OS2 Single-mode' },
      { name:'Fiber PP 12-LC Duplex MM', u:1, color:'#1A3A1A', sub:'LC Duplex · OM3/OM4 Multi-mode' },
      { name:'Fiber PP 24-LC Duplex MM', u:1, color:'#1A3A1A', sub:'LC Duplex · OM3/OM4 Multi-mode' },
      { name:'Fiber PP 48-LC Duplex MM', u:2, color:'#1A3A1A', sub:'LC Duplex · OM3/OM4 Multi-mode' },
      // Fiber — SC
      { name:'Fiber PP 12-SC Duplex SM', u:1, color:'#2D1E3A', sub:'SC Duplex · OS2 Single-mode' },
      { name:'Fiber PP 24-SC Duplex SM', u:1, color:'#2D1E3A', sub:'SC Duplex · OS2 Single-mode' },
      { name:'Fiber PP 12-SC Duplex MM', u:1, color:'#1E2D1E', sub:'SC Duplex · OM3/OM4 Multi-mode' },
      // Fiber — MTP/MPO
      { name:'MTP/MPO Panel 12-fiber',   u:1, color:'#3A1E1E', sub:'MTP/MPO · 12-fiber trunk' },
      { name:'MTP/MPO Panel 24-fiber',   u:1, color:'#3A1E1E', sub:'MTP/MPO · 24-fiber trunk' },
      { name:'MTP/MPO Panel 144-fiber',  u:1, color:'#3A1E1E', sub:'MTP/MPO · 144-fiber high-density' },
      // Fiber — ST
      { name:'Fiber PP 12-ST SM',        u:1, color:'#1E1E3A', sub:'ST · OS2 Single-mode' },
      { name:'Fiber PP 24-ST SM',        u:1, color:'#1E1E3A', sub:'ST · OS2 Single-mode' },
      // Cisco Fiber Shelf
      { name:'Cisco Fiber Shelf 24-LC',  u:1, color:'#003A5D', sub:'Cisco · LC · OS2/OM3' },
      { name:'Cisco Fiber Shelf 48-LC',  u:2, color:'#003A5D', sub:'Cisco · LC · OS2/OM3' },
      // Blank / custom
      { name:'Custom Patch Panel',       u:1, color:'#374151', sub:'Custom' },
    ]
  },
  fiber_enclosures: {
    label:'Fiber Enclosures', icon:'🔆', color:'#1E3A5F',
    items:[
      { name:'LGX Fiber Enclosure 1U',    u:1, color:'#1E3A5F', sub:'1U · 4 adapter plates' },
      { name:'LGX Fiber Enclosure 2U',    u:2, color:'#1E3A5F', sub:'2U · 8 adapter plates' },
      { name:'Corning CCH 1U Shelf',      u:1, color:'#003A5D', sub:'Corning · 6 modules' },
      { name:'Corning CCH 2U Shelf',      u:2, color:'#003A5D', sub:'Corning · 12 modules' },
      { name:'Panduit OPTICOM 1U',        u:1, color:'#2D1E00', sub:'Panduit · 6 cassette slots' },
      { name:'Panduit OPTICOM 4U',        u:4, color:'#2D1E00', sub:'Panduit · 24 cassette slots' },
      { name:'CommScope FACT 1U',         u:1, color:'#1E1E3A', sub:'CommScope · fiber' },
      { name:'AFL Fiber Distribution 1U', u:1, color:'#1A3A1A', sub:'AFL · 6 modules' },
      { name:'Fiber Splice Tray 1U',      u:1, color:'#374151', sub:'12-fiber splice capacity' },
      { name:'Fiber Splice Enclosure 2U', u:2, color:'#374151', sub:'48-fiber splice capacity' },
    ]
  },
  routers: {
    label:'Routers / FW', icon:'🌐', color:'#065F46',
    items:[
      { name:'Cisco ISR 1100-4P',     u:1, color:'#065F46' },
      { name:'Cisco ISR 4331',        u:1, color:'#065F46' },
      { name:'Cisco Catalyst 8200',   u:1, color:'#065F46' },
      { name:'Cisco Catalyst 8300',   u:1, color:'#065F46' },
      { name:'Cisco ASR 1001-X',      u:2, color:'#065F46' },
      { name:'VeloCloud Edge 620',    u:1, color:'#065F46' },
      { name:'VeloCloud Edge 3800',   u:1, color:'#065F46' },
      { name:'Cisco FPR 1010',        u:1, color:'#7C2D12' },
      { name:'Cisco FPR 1120',        u:1, color:'#7C2D12' },
      { name:'Cisco FPR 2110',        u:1, color:'#7C2D12' },
      { name:'Cisco ASA 5516-X',      u:1, color:'#7C2D12' },
      { name:'Palo Alto PA-440',      u:1, color:'#7C2D12' },
      { name:'Fortinet FG-60F',       u:1, color:'#7C2D12' },
      { name:'Custom Router/FW',      u:1, color:'#374151' },
    ]
  },
  servers: {
    label:'Servers / NAS', icon:'🖥️', color:'#1E3A5F',
    items:[
      { name:'Dell PowerEdge R250',   u:1, color:'#1E3A5F' },
      { name:'Dell PowerEdge R350',   u:1, color:'#1E3A5F' },
      { name:'Dell PowerEdge R450',   u:1, color:'#1E3A5F' },
      { name:'Dell PowerEdge R650',   u:1, color:'#1E3A5F' },
      { name:'Dell PowerEdge R750',   u:2, color:'#1E3A5F' },
      { name:'HPE ProLiant DL20',     u:1, color:'#1A2E4A' },
      { name:'HPE ProLiant DL360',    u:1, color:'#1A2E4A' },
      { name:'HPE ProLiant DL380',    u:2, color:'#1A2E4A' },
      { name:'Cisco UCS C220 M6',     u:1, color:'#003A5D' },
      { name:'Cisco UCS C240 M6',     u:2, color:'#003A5D' },
      { name:'Synology RS1221+',      u:2, color:'#2D1E00' },
      { name:'QNAP TS-873A',          u:2, color:'#2D1E00' },
      { name:'Custom Server',         u:1, color:'#374151' },
    ]
  },
  power: {
    label:'Power / UPS', icon:'⚡', color:'#78350F',
    items:[
      { name:'APC Smart-UPS 1500VA',  u:2, color:'#134E4A' },
      { name:'APC Smart-UPS 2200VA',  u:2, color:'#134E4A' },
      { name:'APC Smart-UPS 3000VA',  u:2, color:'#134E4A' },
      { name:'APC SRT 5000VA',        u:6, color:'#134E4A' },
      { name:'Eaton 5PX 1500VA',      u:2, color:'#0F4A40' },
      { name:'Eaton 9PX 2000VA',      u:2, color:'#0F4A40' },
      { name:'APC AP7920 PDU 1U',     u:1, color:'#78350F' },
      { name:'APC AP7930 PDU 2U',     u:2, color:'#78350F' },
      { name:'APC AP7960 Metered 1U', u:1, color:'#78350F' },
      { name:'APC AP8853 Switched 2U',u:2, color:'#78350F' },
      { name:'Vertiv MPH2 PDU',       u:1, color:'#6B3000' },
      { name:'Eaton ePDU Managed',    u:1, color:'#6B3000' },
    ]
  },
  accessories: {
    label:'Accessories', icon:'📦', color:'#374151',
    items:[
      { name:'Cable Manager 1U Horiz',  u:1, color:'#1F2937' },
      { name:'Cable Manager 2U Horiz',  u:2, color:'#1F2937' },
      { name:'Vert Cable Manager',      u:0, color:'#1F2937' }, // 0 = full height
      { name:'1U Blank Panel',          u:1, color:'#0F0F0F' },
      { name:'2U Blank Panel',          u:2, color:'#0F0F0F' },
      { name:'1U Rack Shelf Fixed',     u:1, color:'#374151' },
      { name:'2U Rack Shelf Adj',       u:2, color:'#374151' },
      { name:'1U Fan Tray',             u:1, color:'#1E1E1E' },
      { name:'1U KVM Drawer',           u:1, color:'#2D1E3A' },
      { name:'KVM 8-Port IP',           u:1, color:'#3B0764' },
      { name:'KVM 16-Port IP',          u:1, color:'#3B0764' },
      { name:'Media Converter Shelf',   u:1, color:'#1E1B4B' },
      { name:'Fiber PoE Injector 1U',   u:1, color:'#1E1B4B' },
    ]
  },
};

// Colors per category
const CAT_COLORS = {
  switches:'#003A5D', patch_panels:'#1F2937', fiber_enclosures:'#1E3A5F',
  routers:'#065F46', servers:'#1E3A5F', power:'#78350F', accessories:'#374151',
};

let rackState = {
  units: 42,
  slots: [], // array of { unit:1-based, span:U, name, color, sub, category }
  activeCat: 'switches',
};

// ── Public init ────────────────────────────────────────────────────────
window.initRackStencil = function() {
  buildRackCatTabs();
  buildRackStencil();
  loadRackFromStorage();
};

// ── Category tabs ──────────────────────────────────────────────────────
function buildRackCatTabs() {
  const el = document.getElementById('rack-cat-tabs');
  if (!el) return;
  el.innerHTML = Object.entries(RACK_CATALOG).map(([key, cat]) =>
    `<button class="rack-tab ${key===rackState.activeCat?'active':''}" onclick="setRackCat('${key}')">${cat.icon} ${cat.label}</button>`
  ).join('');
  buildRackModelSelect();
}

window.setRackCat = function(key) {
  rackState.activeCat = key;
  document.querySelectorAll('.rack-tab').forEach(t => t.classList.toggle('active', t.textContent.includes(RACK_CATALOG[key].label)));
  buildRackModelSelect();
};

function buildRackModelSelect() {
  const sel = document.getElementById('rack-model-select');
  if (!sel) return;
  const cat = RACK_CATALOG[rackState.activeCat];
  sel.innerHTML = `<option value="">Choose ${cat.label} model…</option>` +
    cat.items.map(item => `<option value="${item.name}" data-u="${item.u}" data-color="${item.color}" data-sub="${item.sub||''}">${item.name}${item.u>1?' ('+item.u+'U)':''}</option>`).join('');
}

// ── Build rack visual ──────────────────────────────────────────────────
window.buildRackStencil = function() {
  const u = parseInt(document.getElementById('rack-size-select')?.value || 42);
  rackState.units = u;
  const el = document.getElementById('rack-stencil-visual');
  if (!el) return;

  const rows = [];
  rows.push(`<div class="rack-stencil" style="width:380px">
    <div class="rack-stencil-header">
      <span class="rack-stencil-title">&#129681; RACK — ${u}U</span>
      <span class="rack-stencil-info">${countUsedU()}U used / ${u}U total</span>
    </div>
    <div class="rack-units-col">`);

  for (let i = 1; i <= u; i++) {
    const slot = rackState.slots.find(s => s.unit === i);
    const spanned = rackState.slots.find(s => s.unit < i && s.unit + s.span > i);

    if (spanned) continue; // Hidden by multi-U device above

    if (slot) {
      const h = slot.span * 28 - 1;
      rows.push(`<div class="rack-unit-row" style="min-height:${h}px;position:relative">
        <div class="rack-unit-num">${i}</div>
        <div class="rack-unit-slot occupied">
          <div class="rack-device-block" draggable="true"
            ondragstart="rackDragStart(event,${i})"
            style="background:${slot.color};top:1px;bottom:1px;height:${h-2}px">
            <div style="display:flex;flex-direction:column;overflow:hidden;flex:1">
              <span class="rack-device-label">${slot.name}</span>
              ${slot.sub?`<span style="font-size:8px;color:rgba(255,255,255,0.45);margin-top:1px">${slot.sub}</span>`:''}
            </div>
            <span class="rack-device-type">${slot.span}U</span>
            <button class="rack-device-remove" onclick="removeFromRack(${i})" title="Remove">✕</button>
          </div>
        </div>
      </div>`);
    } else {
      rows.push(`<div class="rack-unit-row" ondragover="event.preventDefault()" ondrop="rackDrop(event,${i})">
        <div class="rack-unit-num">${i}</div>
        <div class="rack-unit-slot" onclick="quickAddToUnit(${i})">
          <span class="rack-empty-unit">— empty —</span>
        </div>
      </div>`);
    }
  }
  rows.push(`</div></div>`);
  el.innerHTML = rows.join('');
  updateInstalledList();

  // Update header count
  const info = el.querySelector('.rack-stencil-info');
  if (info) info.textContent = `${countUsedU()}U used / ${u}U total`;
};

function countUsedU() {
  return rackState.slots.reduce((sum, s) => sum + s.span, 0);
}

// ── Add device to rack ────────────────────────────────────────────────
window.addToRackStencil = function() {
  const sel   = document.getElementById('rack-model-select');
  const label = document.getElementById('rack-add-label').value.trim();
  const unit  = parseInt(document.getElementById('rack-add-unit').value) || 1;
  if (!sel || !sel.value) { showRackToast('Choose a model first'); return; }

  const opt = sel.options[sel.selectedIndex];
  const u   = parseInt(opt.dataset.u) || 1;
  const color = opt.dataset.color || CAT_COLORS[rackState.activeCat] || '#374151';
  const sub   = opt.dataset.sub || '';
  const name  = label || sel.value;

  if (unit < 1 || unit > rackState.units) { showRackToast('Unit number out of range'); return; }
  if (unit + u - 1 > rackState.units)     { showRackToast('Device too tall for rack at U'+unit); return; }

  // Check for conflicts
  for (let i = unit; i < unit + u; i++) {
    if (rackState.slots.find(s => s.unit === i || (s.unit < i && s.unit + s.span > i))) {
      showRackToast(`U${i} is already occupied`); return;
    }
  }

  rackState.slots.push({ unit, span:u, name, color, sub, category:rackState.activeCat });
  buildRackStencil();
  saveRackToStorage();
  showRackToast(`Added: ${name} at U${unit}`);

  // Auto-advance unit
  const nextEl = document.getElementById('rack-add-unit');
  if (nextEl) nextEl.value = unit + u;
};

window.quickAddToUnit = function(unit) {
  document.getElementById('rack-add-unit').value = unit;
  document.getElementById('rack-add-label').focus();
};

window.removeFromRack = function(unit) {
  rackState.slots = rackState.slots.filter(s => s.unit !== unit);
  buildRackStencil();
  saveRackToStorage();
};

window.clearRackStencil = function() {
  if (!confirm('Clear the entire rack layout?')) return;
  rackState.slots = [];
  buildRackStencil();
  saveRackToStorage();
};

// ── Drag & drop ────────────────────────────────────────────────────────
let _dragUnit = null;
window.rackDragStart = function(e, unit) {
  _dragUnit = unit;
  e.dataTransfer.effectAllowed = 'move';
};
window.rackDrop = function(e, toUnit) {
  e.preventDefault();
  if (_dragUnit === null) return;
  const slot = rackState.slots.find(s => s.unit === _dragUnit);
  if (!slot) { _dragUnit = null; return; }
  const u = slot.span;
  if (toUnit + u - 1 > rackState.units) { showRackToast('Not enough space'); _dragUnit=null; return; }
  for (let i = toUnit; i < toUnit+u; i++) {
    if (rackState.slots.find(s => s.unit !== _dragUnit && (s.unit===i||(s.unit<i&&s.unit+s.span>i)))) {
      showRackToast(`U${i} occupied`); _dragUnit=null; return;
    }
  }
  slot.unit = toUnit;
  buildRackStencil();
  saveRackToStorage();
  _dragUnit = null;
};

// ── Installed list ─────────────────────────────────────────────────────
function updateInstalledList() {
  const el = document.getElementById('rack-installed-list');
  if (!el) return;
  if (!rackState.slots.length) { el.innerHTML='<p style="color:var(--text3);font-size:11px">Rack is empty.</p>'; return; }
  const sorted = [...rackState.slots].sort((a,b)=>a.unit-b.unit);
  el.innerHTML = sorted.map(s =>
    `<div class="rack-unit-label">
      <div style="width:10px;height:10px;border-radius:2px;background:${s.color};flex-shrink:0"></div>
      <span class="rack-u-badge">U${s.unit}${s.span>1?'–U'+(s.unit+s.span-1):''}</span>
      <span style="flex:1;font-size:11px;color:var(--text);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${s.name}</span>
      <button onclick="removeFromRack(${s.unit})" style="background:none;border:none;cursor:pointer;color:var(--text3);font-size:12px;padding:0 2px;flex-shrink:0">✕</button>
    </div>`
  ).join('');
}

// ── Export ─────────────────────────────────────────────────────────────
window.exportRackStencil = function() {
  const sorted = [...rackState.slots].sort((a,b)=>a.unit-b.unit);
  const rows = ['U,Span,Name,Category,Sub-type'];
  sorted.forEach(s => rows.push(`${s.unit},${s.span},"${s.name}","${s.category}","${s.sub||''}"`));
  const blob = new Blob([rows.join('\n')],{type:'text/csv'});
  const a = document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='rack-layout.csv'; a.click();
  showRackToast('Rack layout exported ✓');
};

// ── Storage ────────────────────────────────────────────────────────────
function saveRackToStorage() {
  try { localStorage.setItem('netsurvey_rack_'+(localStorage.getItem('netsurvey_latest')||'default'), JSON.stringify(rackState)); } catch(e){}
}
function loadRackFromStorage() {
  try {
    const raw = localStorage.getItem('netsurvey_rack_'+(localStorage.getItem('netsurvey_latest')||'default'));
    if (raw) { const d=JSON.parse(raw); rackState.slots=d.slots||[]; rackState.units=d.units||42; buildRackStencil(); }
  } catch(e){}
}

function showRackToast(msg) { if(window.showToast) showToast(msg); }

// Re-init when section becomes visible
window.onRackStencilVisible = function() {
  setTimeout(buildRackStencil, 80);
};
