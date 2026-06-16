// ══════════════════════════════════════════════════════
//  Rack Stencil — simple global functions, no class
// ══════════════════════════════════════════════════════

var _rsRacks = [];          // [{id,label,units,items:[{id,name,u,color,label}]}]
var _rsSelected = null;     // selected rack id
var _rsIdCounter = 1;

// ── Device catalog ─────────────────────────────────────
var RS_MODELS = {
  switches:[
    {n:'Catalyst 9200-24P',u:1,c:'#003A5D'},{n:'Catalyst 9200-48P',u:1,c:'#003A5D'},
    {n:'Catalyst 9200-24T',u:1,c:'#003A5D'},{n:'Catalyst 9200-48T',u:1,c:'#003A5D'},
    {n:'Catalyst 9200L-24P-4G',u:1,c:'#004A70'},{n:'Catalyst 9200L-48P-4X',u:1,c:'#004A70'},
    {n:'Catalyst 9300-24P',u:1,c:'#005580'},{n:'Catalyst 9300-48P',u:1,c:'#005580'},
    {n:'Catalyst 9300-24U',u:1,c:'#005580'},{n:'Catalyst 9300-48U',u:1,c:'#005580'},
    {n:'Catalyst 9300-48UXM',u:1,c:'#005580'},{n:'Catalyst 9300X-24HX',u:1,c:'#006090'},
    {n:'Catalyst 9500-24Y4C',u:1,c:'#006A9A'},{n:'Catalyst 9500-48Y4C',u:1,c:'#006A9A'},
    {n:'Nexus 9300-48S',u:1,c:'#0078A8'},{n:'Nexus 9336C-FX2',u:1,c:'#0078A8'},
    {n:'IE-3300-8P2S (Industrial)',u:1,c:'#7B3200'},{n:'IE-3300-16P2S (Industrial)',u:1,c:'#7B3200'},
    {n:'Custom Switch',u:1,c:'#374151'}
  ],
  patch:[
    // Copper
    {n:'PP 24P Cat5e',u:1,c:'#374151'},{n:'PP 48P Cat5e',u:1,c:'#374151'},
    {n:'PP 24P Cat6',u:1,c:'#2D3748'},{n:'PP 48P Cat6',u:1,c:'#2D3748'},
    {n:'PP 24P Cat6A',u:1,c:'#1F2937'},{n:'PP 48P Cat6A',u:1,c:'#1F2937'},
    {n:'PP 24P Cat7',u:1,c:'#111827'},{n:'Keystone Panel 24P',u:1,c:'#374151'},
    {n:'Keystone Panel 48P',u:1,c:'#374151'},
    // Fiber LC SM
    {n:'Fiber 12-LC SM OS2',u:1,c:'#1E3A5F'},{n:'Fiber 24-LC SM OS2',u:1,c:'#1E3A5F'},
    {n:'Fiber 48-LC SM OS2',u:2,c:'#1E3A5F'},
    // Fiber LC MM
    {n:'Fiber 12-LC MM OM3',u:1,c:'#1A3A1A'},{n:'Fiber 24-LC MM OM4',u:1,c:'#1A3A1A'},
    {n:'Fiber 48-LC MM OM4',u:2,c:'#1A3A1A'},
    // Fiber SC
    {n:'Fiber 12-SC SM OS2',u:1,c:'#2D1E3A'},{n:'Fiber 24-SC SM OS2',u:1,c:'#2D1E3A'},
    {n:'Fiber 12-SC MM OM3',u:1,c:'#1E2D1E'},
    // MTP/MPO
    {n:'MTP/MPO 12-fiber',u:1,c:'#3A1E1E'},{n:'MTP/MPO 24-fiber',u:1,c:'#3A1E1E'},
    {n:'MTP/MPO 144-fiber HD',u:1,c:'#3A1E1E'},
    // Fiber ST
    {n:'Fiber 12-ST SM',u:1,c:'#1E1E3A'},{n:'Fiber 24-ST SM',u:1,c:'#1E1E3A'},
    // Cisco fiber shelves
    {n:'Cisco Fiber Shelf 24-LC',u:1,c:'#003A5D'},{n:'Cisco Fiber Shelf 48-LC',u:2,c:'#003A5D'},
    {n:'Custom Patch Panel',u:1,c:'#374151'}
  ],
  fiber_enc:[
    {n:'LGX Enclosure 1U',u:1,c:'#1E3A5F'},{n:'LGX Enclosure 2U',u:2,c:'#1E3A5F'},
    {n:'Corning CCH 1U Shelf',u:1,c:'#003A5D'},{n:'Corning CCH 2U Shelf',u:2,c:'#003A5D'},
    {n:'Panduit OPTICOM 1U',u:1,c:'#2D1E00'},{n:'Panduit OPTICOM 4U',u:4,c:'#2D1E00'},
    {n:'CommScope FACT 1U',u:1,c:'#1E1E3A'},{n:'AFL Distribution 1U',u:1,c:'#1A3A1A'},
    {n:'Splice Tray 1U',u:1,c:'#374151'},{n:'Splice Enclosure 2U',u:2,c:'#374151'},
    {n:'Custom Fiber Enclosure',u:1,c:'#374151'}
  ],
  routers:[
    {n:'Cisco ISR 1100-4P',u:1,c:'#065F46'},{n:'Cisco ISR 4331',u:1,c:'#065F46'},
    {n:'Cisco Catalyst 8200',u:1,c:'#065F46'},{n:'Cisco Catalyst 8300',u:1,c:'#065F46'},
    {n:'Cisco ASR 1001-X',u:2,c:'#065F46'},{n:'VeloCloud Edge 620',u:1,c:'#065F46'},
    {n:'VeloCloud Edge 3800',u:1,c:'#065F46'},
    {n:'Cisco FPR 1010',u:1,c:'#7C2D12'},{n:'Cisco FPR 1120',u:1,c:'#7C2D12'},
    {n:'Cisco FPR 2110',u:1,c:'#7C2D12'},{n:'Cisco ASA 5516-X',u:1,c:'#7C2D12'},
    {n:'Palo Alto PA-440',u:1,c:'#7C2D12'},{n:'Fortinet FG-60F',u:1,c:'#7C2D12'},
    {n:'pfSense Appliance',u:1,c:'#7C2D12'},{n:'Custom Router/FW',u:1,c:'#374151'}
  ],
  servers:[
    {n:'Dell PowerEdge R250',u:1,c:'#1E3A5F'},{n:'Dell PowerEdge R350',u:1,c:'#1E3A5F'},
    {n:'Dell PowerEdge R450',u:1,c:'#1E3A5F'},{n:'Dell PowerEdge R650',u:1,c:'#1E3A5F'},
    {n:'Dell PowerEdge R750',u:2,c:'#1E3A5F'},{n:'HPE ProLiant DL20',u:1,c:'#1A2E4A'},
    {n:'HPE ProLiant DL360',u:1,c:'#1A2E4A'},{n:'HPE ProLiant DL380',u:2,c:'#1A2E4A'},
    {n:'Cisco UCS C220 M6',u:1,c:'#003A5D'},{n:'Cisco UCS C240 M6',u:2,c:'#003A5D'},
    {n:'Synology RS1221+ NAS',u:2,c:'#2D1E00'},{n:'QNAP TS-873A NAS',u:2,c:'#2D1E00'},
    {n:'Custom Server',u:1,c:'#374151'}
  ],
  power:[
    {n:'APC Smart-UPS 1500VA',u:2,c:'#134E4A'},{n:'APC Smart-UPS 2200VA',u:2,c:'#134E4A'},
    {n:'APC Smart-UPS 3000VA',u:2,c:'#134E4A'},{n:'APC SRT 5000VA',u:6,c:'#134E4A'},
    {n:'Eaton 5PX 1500VA',u:2,c:'#0F4A40'},{n:'Eaton 9PX 2000VA',u:2,c:'#0F4A40'},
    {n:'APC AP7920 PDU 1U',u:1,c:'#78350F'},{n:'APC AP7930 PDU 2U',u:2,c:'#78350F'},
    {n:'APC AP7960 Metered 1U',u:1,c:'#78350F'},{n:'APC AP8853 Switched 2U',u:2,c:'#78350F'},
    {n:'Vertiv MPH2 PDU',u:1,c:'#6B3000'},{n:'Eaton ePDU Managed',u:1,c:'#6B3000'},
    {n:'Custom PDU/UPS',u:1,c:'#374151'}
  ],
  access:[
    {n:'Cable Manager 1U Horiz',u:1,c:'#1F2937'},{n:'Cable Manager 2U Horiz',u:2,c:'#1F2937'},
    {n:'Blank Panel 1U',u:1,c:'#0F0F0F'},{n:'Blank Panel 2U',u:2,c:'#0F0F0F'},
    {n:'Rack Shelf 1U Fixed',u:1,c:'#374151'},{n:'Rack Shelf 2U Adjustable',u:2,c:'#374151'},
    {n:'Fan Tray 1U',u:1,c:'#1E1E1E'},{n:'KVM Drawer 1U',u:1,c:'#2D1E3A'},
    {n:'KVM Switch 8-Port IP',u:1,c:'#3B0764'},{n:'KVM Switch 16-Port IP',u:1,c:'#3B0764'},
    {n:'Media Converter Shelf 1U',u:1,c:'#1E1B4B'},{n:'LCD Monitor 1U',u:1,c:'#2D2D2D'},
    {n:'Custom Accessory',u:1,c:'#374151'}
  ]
};

// ── Init ──────────────────────────────────────────────
window.initRackStencil = function() {
  rsUpdateModels();
  rsRender();
  rsLoad();
};

window.onRackStencilVisible = function() {
  setTimeout(rsRender, 50);
};

// ── Populate model dropdown ────────────────────────────
window.rsUpdateModels = function() {
  var cat = document.getElementById('rs-cat');
  var sel = document.getElementById('rs-model');
  if (!cat || !sel) return;
  var key = cat.value;
  var list = RS_MODELS[key] || [];
  sel.innerHTML = list.map(function(m) {
    return '<option value="' + m.n + '">' + m.n + (m.u > 1 ? ' (' + m.u + 'U)' : '') + '</option>';
  }).join('');
};

// ── Add rack ──────────────────────────────────────────
window.rsAddRack = function() {
  var labelEl = document.getElementById('rs-label');
  var sizeEl  = document.getElementById('rs-size');
  var label   = (labelEl && labelEl.value.trim()) || ('Rack ' + String.fromCharCode(64 + _rsRacks.length + 1));
  var units   = parseInt(sizeEl && sizeEl.value) || 42;
  _rsRacks.push({ id: 'r' + (_rsIdCounter++), label: label, units: units, items: [] });
  if (labelEl) labelEl.value = '';
  _rsSelected = _rsRacks[_rsRacks.length - 1].id;
  rsUpdateHint();
  rsRender();
  rsSave();
  if (window.showToast) showToast('Added ' + label);
};

// ── Select rack ───────────────────────────────────────
window.rsSelectRack = function(id) {
  _rsSelected = id;
  rsUpdateHint();
  rsRender();
};

function rsUpdateHint() {
  var hint = document.getElementById('rs-rack-hint');
  if (!hint) return;
  var rack = _rsRacks.find(function(r){ return r.id === _rsSelected; });
  if (rack) {
    var used = rack.items.reduce(function(s,i){ return s + i.u; }, 0);
    hint.textContent = '📋 Selected: ' + rack.label + ' (' + (rack.units - used) + 'U free)';
    hint.style.color = 'var(--cyan)';
    hint.style.background = 'rgba(0,183,217,0.08)';
  } else {
    hint.textContent = '← Click a rack header to select it first';
    hint.style.color = 'var(--text3)';
    hint.style.background = 'rgba(0,183,217,0.05)';
  }
}

// ── Add device to rack ────────────────────────────────
window.rsAddDevice = function() {
  if (!_rsSelected) { if (window.showToast) showToast('Select a rack first'); return; }
  var rack = _rsRacks.find(function(r){ return r.id === _rsSelected; });
  if (!rack) return;
  var catEl  = document.getElementById('rs-cat');
  var modEl  = document.getElementById('rs-model');
  var lblEl  = document.getElementById('rs-dev-label');
  if (!modEl || !modEl.value) { if (window.showToast) showToast('Choose a model'); return; }
  var cat    = catEl ? catEl.value : 'switches';
  var models = RS_MODELS[cat] || [];
  var model  = models.find(function(m){ return m.n === modEl.value; });
  if (!model) return;
  var used   = rack.items.reduce(function(s,i){ return s + i.u; }, 0);
  if (used + model.u > rack.units) {
    if (window.showToast) showToast('Not enough space in ' + rack.label + ' (' + (rack.units - used) + 'U free)');
    return;
  }
  var label  = (lblEl && lblEl.value.trim()) || model.n;
  rack.items.push({ id: 'd' + (_rsIdCounter++), n: model.n, u: model.u, c: model.c, label: label });
  if (lblEl) lblEl.value = '';
  rsUpdateHint();
  rsRender();
  rsSave();
  if (window.showToast) showToast('Added ' + label + ' to ' + rack.label);
};

// ── Remove device ────────────────────────────────────
window.rsRemoveDevice = function(rackId, devId) {
  var rack = _rsRacks.find(function(r){ return r.id === rackId; });
  if (rack) rack.items = rack.items.filter(function(d){ return d.id !== devId; });
  rsUpdateHint();
  rsRender();
  rsSave();
};

// ── Move device ───────────────────────────────────────
window.rsMoveDevice = function(rackId, devId, dir) {
  var rack = _rsRacks.find(function(r){ return r.id === rackId; });
  if (!rack) return;
  var idx = rack.items.findIndex(function(d){ return d.id === devId; });
  var nIdx = idx + dir;
  if (nIdx < 0 || nIdx >= rack.items.length) return;
  var tmp = rack.items[idx]; rack.items[idx] = rack.items[nIdx]; rack.items[nIdx] = tmp;
  rsRender();
  rsSave();
};

// ── Remove rack ───────────────────────────────────────
window.rsRemoveRack = function(id) {
  if (!confirm('Remove this rack and all its equipment?')) return;
  _rsRacks = _rsRacks.filter(function(r){ return r.id !== id; });
  if (_rsSelected === id) _rsSelected = _rsRacks.length ? _rsRacks[0].id : null;
  rsUpdateHint();
  rsRender();
  rsSave();
};

// ── Clear all ─────────────────────────────────────────
window.rsClearAll = function() {
  if (!confirm('Remove all racks and equipment?')) return;
  _rsRacks = []; _rsSelected = null;
  rsUpdateHint();
  rsRender();
  rsSave();
};

// ── Export ────────────────────────────────────────────
window.rsExportCSV = function() {
  var rows = ['Rack,U Start,U End,Label,Model'];
  _rsRacks.forEach(function(rack) {
    var u = 1;
    rack.items.forEach(function(d) {
      rows.push('"' + rack.label + '",' + u + ',' + (u + d.u - 1) + ',"' + d.label + '","' + d.n + '"');
      u += d.u;
    });
  });
  var blob = new Blob([rows.join('\n')], {type:'text/csv'});
  var a = document.createElement('a'); a.href = URL.createObjectURL(blob);
  a.download = 'rack-layout.csv'; a.click();
  if (window.showToast) showToast('Exported ✓');
};

// ── Render ────────────────────────────────────────────
function rsRender() {
  var canvas = document.getElementById('rs-canvas');
  var emptyMsg = document.getElementById('rs-empty-msg');
  if (!canvas) return;

  // Keep empty message
  if (!emptyMsg) {
    emptyMsg = document.createElement('div');
    emptyMsg.id = 'rs-empty-msg';
    emptyMsg.style.cssText = 'width:100%;height:480px;display:flex;flex-direction:column;align-items:center;justify-content:center;color:rgba(0,183,217,0.3);gap:12px;pointer-events:none';
    emptyMsg.innerHTML = '<div style="font-size:52px">🗄️</div><div style="text-align:center;font-size:13px;line-height:1.6">Add a rack using the panel on the left<br><span style="font-size:11px;opacity:.7">Multiple racks appear side by side</span></div>';
  }

  // Rebuild rack columns
  canvas.innerHTML = '';

  if (!_rsRacks.length) {
    canvas.appendChild(emptyMsg);
    rsRenderInventory();
    return;
  }

  _rsRacks.forEach(function(rack) {
    canvas.appendChild(buildRackEl(rack));
  });

  rsRenderInventory();
}

function buildRackEl(rack) {
  var selected = _rsSelected === rack.id;
  var used     = rack.items.reduce(function(s,i){ return s + i.u; }, 0);
  var free     = rack.units - used;
  var PX_PER_U = 30;

  var wrap = document.createElement('div');
  wrap.style.cssText = 'flex-shrink:0;width:300px;user-select:none';

  // Header
  var hdr = document.createElement('div');
  hdr.style.cssText = 'padding:9px 12px;border-radius:8px 8px 0 0;cursor:pointer;display:flex;align-items:center;justify-content:space-between;' +
    'background:' + (selected ? 'rgba(0,183,217,0.22)' : 'rgba(0,40,80,0.7)') + ';' +
    'border:2px solid ' + (selected ? '#00B7D9' : 'rgba(0,183,217,0.2)') + ';border-bottom:none';
  hdr.innerHTML =
    '<div>' +
      '<div style="font-size:13px;font-weight:700;color:' + (selected ? '#00B7D9' : '#fff') + '">' + rack.label + '</div>' +
      '<div style="font-size:10px;color:rgba(255,255,255,0.38);margin-top:1px">' + rack.units + 'U &nbsp;·&nbsp; ' + used + 'U used &nbsp;·&nbsp; ' + free + 'U free</div>' +
    '</div>' +
    '<div style="display:flex;gap:6px;align-items:center">' +
      (selected ? '<span style="font-size:9px;color:#00B7D9;font-weight:700;letter-spacing:.5px">● SELECTED</span>' : '') +
      '<button onclick="event.stopPropagation();rsRemoveRack(\'' + rack.id + '\')" style="background:rgba(180,0,0,0.35);border:1px solid rgba(200,0,0,0.4);color:#ff9090;border-radius:5px;padding:3px 8px;cursor:pointer;font-size:10px;font-family:inherit">✕</button>' +
    '</div>';
  hdr.onclick = function() { rsSelectRack(rack.id); };
  wrap.appendChild(hdr);

  // Body
  var body = document.createElement('div');
  body.style.cssText = 'border:2px solid ' + (selected ? '#00B7D9' : 'rgba(0,183,217,0.15)') + ';border-top:none;border-radius:0 0 8px 8px;overflow:hidden;background:rgba(0,4,14,0.95)';

  var u = 1;
  rack.items.forEach(function(dev, di) {
    var h = dev.u * PX_PER_U - 1;
    var row = document.createElement('div');
    row.style.cssText = 'display:flex;border-bottom:1px solid rgba(255,255,255,0.04);height:' + (dev.u * PX_PER_U) + 'px;position:relative';

    // U number column
    var uCol = document.createElement('div');
    uCol.style.cssText = 'width:28px;background:rgba(0,0,0,0.3);border-right:1px solid rgba(255,255,255,0.06);display:flex;align-items:center;justify-content:center;flex-shrink:0';
    uCol.innerHTML = '<span style="font-size:8px;color:rgba(255,255,255,0.2);font-family:monospace">' + u + '</span>';
    row.appendChild(uCol);

    // Device block
    var devBlock = document.createElement('div');
    devBlock.style.cssText = 'flex:1;background:' + dev.c + ';display:flex;align-items:center;padding:0 8px;gap:6px;overflow:hidden;min-height:' + h + 'px';
    devBlock.innerHTML =
      '<div style="display:flex;flex-direction:column;overflow:hidden;flex:1">' +
        '<span style="font-size:11px;font-weight:700;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + dev.label + '</span>' +
        (dev.n !== dev.label ? '<span style="font-size:8px;color:rgba(255,255,255,0.4);margin-top:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + dev.n + '</span>' : '') +
      '</div>' +
      '<span style="font-size:9px;color:rgba(255,255,255,0.35);flex-shrink:0">' + dev.u + 'U</span>' +
      '<div style="display:flex;flex-direction:column;gap:2px;flex-shrink:0">' +
        (di > 0 ? '<button onclick="rsMoveDevice(\'' + rack.id + '\',\'' + dev.id + '\',-1)" style="background:rgba(0,0,0,0.35);border:none;color:rgba(255,255,255,0.5);cursor:pointer;border-radius:3px;width:18px;height:14px;font-size:9px;line-height:1;padding:0">▲</button>' : '') +
        (di < rack.items.length - 1 ? '<button onclick="rsMoveDevice(\'' + rack.id + '\',\'' + dev.id + '\',1)" style="background:rgba(0,0,0,0.35);border:none;color:rgba(255,255,255,0.5);cursor:pointer;border-radius:3px;width:18px;height:14px;font-size:9px;line-height:1;padding:0">▼</button>' : '') +
        '<button onclick="rsRemoveDevice(\'' + rack.id + '\',\'' + dev.id + '\')" style="background:rgba(160,0,0,0.5);border:none;color:#fff;cursor:pointer;border-radius:3px;width:18px;height:14px;font-size:9px;line-height:1;padding:0">✕</button>' +
      '</div>';
    row.appendChild(devBlock);
    body.appendChild(row);
    u += dev.u;
  });

  // Empty slots
  for (var i = u; i <= rack.units; i++) {
    var eRow = document.createElement('div');
    eRow.style.cssText = 'display:flex;border-bottom:1px solid rgba(255,255,255,0.03);height:' + PX_PER_U + 'px;cursor:pointer';
    eRow.onclick = (function(rId){ return function(){ rsSelectRack(rId); }; })(rack.id);
    var eU = document.createElement('div');
    eU.style.cssText = 'width:28px;background:rgba(0,0,0,0.2);border-right:1px solid rgba(255,255,255,0.04);display:flex;align-items:center;justify-content:center;flex-shrink:0';
    eU.innerHTML = '<span style="font-size:8px;color:rgba(255,255,255,0.1);font-family:monospace">' + i + '</span>';
    var eSlot = document.createElement('div');
    eSlot.style.cssText = 'flex:1;display:flex;align-items:center;padding:0 10px';
    eSlot.innerHTML = '<span style="font-size:9px;color:rgba(255,255,255,0.06)">— empty U' + i + ' —</span>';
    eRow.appendChild(eU);
    eRow.appendChild(eSlot);
    body.appendChild(eRow);
  }

  wrap.appendChild(body);
  return wrap;
}

function rsRenderInventory() {
  var el = document.getElementById('rs-inventory');
  if (!el) return;
  if (!_rsRacks.length) { el.innerHTML = '<span style="color:var(--text3)">No racks yet.</span>'; return; }
  var html = '';
  _rsRacks.forEach(function(rack) {
    var used = rack.items.reduce(function(s,i){ return s+i.u; },0);
    html += '<div style="margin-bottom:8px">';
    html += '<div style="font-size:11px;font-weight:700;color:var(--cyan);cursor:pointer;margin-bottom:3px" onclick="rsSelectRack(\'' + rack.id + '\')">' + rack.label + ' — ' + used + '/' + rack.units + 'U</div>';
    if (!rack.items.length) {
      html += '<div style="font-size:10px;color:var(--text3);padding-left:8px">Empty</div>';
    } else {
      var u = 1;
      rack.items.forEach(function(d) {
        html += '<div style="display:flex;align-items:center;gap:5px;padding-left:8px;margin-bottom:2px">' +
          '<div style="width:7px;height:7px;border-radius:1px;background:' + d.c + ';flex-shrink:0"></div>' +
          '<span style="font-size:9px;color:rgba(0,183,217,0.5);font-family:monospace;flex-shrink:0">U' + u + '</span>' +
          '<span style="font-size:10px;color:var(--text);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + d.label + '</span>' +
          '<span style="font-size:9px;color:var(--text3);flex-shrink:0;margin-left:auto">' + d.u + 'U</span>' +
          '</div>';
        u += d.u;
      });
    }
    html += '</div>';
  });
  el.innerHTML = html;
}

// ── Storage ───────────────────────────────────────────
function rsSave() {
  try {
    var key = 'netsurvey_rs2_' + (localStorage.getItem('netsurvey_latest') || 'default');
    localStorage.setItem(key, JSON.stringify({racks:_rsRacks,id:_rsIdCounter}));
  } catch(e){}
}

function rsLoad() {
  try {
    var key = 'netsurvey_rs2_' + (localStorage.getItem('netsurvey_latest') || 'default');
    var raw = localStorage.getItem(key);
    if (raw) {
      var d = JSON.parse(raw);
      _rsRacks = d.racks || [];
      _rsIdCounter = d.id || 1;
      if (_rsRacks.length) _rsSelected = _rsRacks[0].id;
      rsUpdateHint();
      rsRender();
    }
  } catch(e){}
}
