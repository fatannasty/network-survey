// ══════════════════════════════════════════════════════════
//  NetSurvey — Single unified app script
// ══════════════════════════════════════════════════════════

// ── Equipment catalog ──────────────────────────────────
var CAT = {
  switches:{icon:'🔀',items:[
    {n:'Catalyst 9200-24P',u:1},{n:'Catalyst 9200-48P',u:1},{n:'Catalyst 9200-24T',u:1},{n:'Catalyst 9200-48T',u:1},
    {n:'Catalyst 9200L-24P-4G',u:1},{n:'Catalyst 9200L-48P-4X',u:1},
    {n:'Catalyst 9300-24P',u:1},{n:'Catalyst 9300-48P',u:1},{n:'Catalyst 9300-24U',u:1},{n:'Catalyst 9300-48U',u:1},
    {n:'Catalyst 9300-48UXM',u:1},{n:'Catalyst 9300X-24HX',u:1},
    {n:'Catalyst 9500-24Y4C',u:1},{n:'Catalyst 9500-48Y4C',u:1},
    {n:'Nexus 9300-48S',u:1},{n:'Nexus 9336C-FX2',u:1},
    {n:'IE-3300-8P2S Industrial',u:1},{n:'IE-3300-16P2S Industrial',u:1},{n:'Custom Switch',u:1}
  ]},
  patch:{icon:'🔲',items:[
    {n:'PP 24P Cat5e',u:1},{n:'PP 48P Cat5e',u:1},{n:'PP 24P Cat6',u:1},{n:'PP 48P Cat6',u:1},
    {n:'PP 24P Cat6A',u:1},{n:'PP 48P Cat6A',u:1},{n:'Keystone Panel 24P',u:1},{n:'Keystone Panel 48P',u:1},{n:'Custom PP',u:1}
  ]},
  fiber:{icon:'🔆',items:[
    {n:'Fiber PP 12-LC SM (OS2)',u:1},{n:'Fiber PP 24-LC SM (OS2)',u:1},{n:'Fiber PP 48-LC SM (OS2)',u:2},
    {n:'Fiber PP 12-LC MM (OM3)',u:1},{n:'Fiber PP 24-LC MM (OM4)',u:1},{n:'Fiber PP 48-LC MM (OM4)',u:2},
    {n:'Fiber PP 12-SC SM (OS2)',u:1},{n:'Fiber PP 24-SC SM (OS2)',u:1},
    {n:'MTP/MPO 12-fiber',u:1},{n:'MTP/MPO 24-fiber',u:1},{n:'MTP/MPO 144-fiber HD',u:1},
    {n:'Cisco Fiber Shelf 24-LC',u:1},{n:'Cisco Fiber Shelf 48-LC',u:2},
    {n:'LGX Enclosure 1U',u:1},{n:'LGX Enclosure 2U',u:2},
    {n:'Corning CCH 1U',u:1},{n:'Corning CCH 2U',u:2},{n:'Panduit OPTICOM 1U',u:1},
    {n:'Splice Tray 1U',u:1},{n:'Splice Enclosure 2U',u:2},{n:'Custom Fiber',u:1}
  ]},
  router:{icon:'🌐',items:[
    {n:'Cisco ISR 1100-4P',u:1},{n:'Cisco ISR 4331',u:1},{n:'Cisco Catalyst 8200',u:1},{n:'Cisco Catalyst 8300',u:1},
    {n:'Cisco ASR 1001-X',u:2},{n:'VeloCloud Edge 620',u:1},{n:'VeloCloud Edge 3800',u:1},
    {n:'Cisco FPR 1010',u:1},{n:'Cisco FPR 1120',u:1},{n:'Cisco FPR 2110',u:1},
    {n:'Cisco ASA 5516-X',u:1},{n:'Palo Alto PA-440',u:1},{n:'Fortinet FG-60F',u:1},{n:'Custom Router/FW',u:1}
  ]},
  server:{icon:'🖥',items:[
    {n:'Dell PowerEdge R250',u:1},{n:'Dell PowerEdge R350',u:1},{n:'Dell PowerEdge R450',u:1},
    {n:'Dell PowerEdge R650',u:1},{n:'Dell PowerEdge R750',u:2},
    {n:'HPE ProLiant DL20',u:1},{n:'HPE ProLiant DL360',u:1},{n:'HPE ProLiant DL380',u:2},
    {n:'Cisco UCS C220 M6',u:1},{n:'Cisco UCS C240 M6',u:2},
    {n:'Synology RS1221+ NAS',u:2},{n:'QNAP TS-873A NAS',u:2},{n:'Custom Server',u:1}
  ]},
  power:{icon:'⚡',items:[
    {n:'APC Smart-UPS 1500VA',u:2},{n:'APC Smart-UPS 2200VA',u:2},{n:'APC Smart-UPS 3000VA',u:2},{n:'APC SRT 5000VA',u:6},
    {n:'Eaton 5PX 1500VA',u:2},{n:'Eaton 9PX 2000VA',u:2},
    {n:'APC AP7920 PDU 1U',u:1},{n:'APC AP7930 PDU 2U',u:2},{n:'APC AP7960 Metered 1U',u:1},
    {n:'Vertiv MPH2 PDU',u:1},{n:'Custom PDU/UPS',u:1}
  ]},
  ap:{icon:'📶',items:[
    {n:'Cisco Catalyst 9105AXI',u:0},{n:'Cisco Catalyst 9120AXI',u:0},{n:'Cisco Meraki MR36',u:0},
    {n:'Cisco Meraki MR46',u:0},{n:'Cisco Meraki MR86 (Outdoor)',u:0},{n:'Arista W-128',u:0},
    {n:'Ubiquiti UniFi U6 Pro',u:0},{n:'Custom AP',u:0}
  ]},
  other:{icon:'📦',items:[
    {n:'Cable Manager 1U',u:1},{n:'Cable Manager 2U',u:2},{n:'Blank Panel 1U',u:1},{n:'Blank Panel 2U',u:2},
    {n:'Rack Shelf 1U',u:1},{n:'Rack Shelf 2U',u:2},{n:'Fan Tray 1U',u:1},
    {n:'KVM Drawer 1U',u:1},{n:'KVM 8-Port IP',u:1},{n:'LCD Monitor 1U',u:1},{n:'Custom',u:1}
  ]}
};

var CAT_COLORS = {
  switches:'#003A5D',patch:'#1F2937',fiber:'#1E3A5F',router:'#065F46',
  server:'#1E3A5F',power:'#78350F',ap:'#0C4A6E',other:'#374151'
};

// ── State ──────────────────────────────────────────────
var S = {
  id:'', status:'', signal:0, followup:'',
  equip:[],  // {id,cat,model,label,ip,serial,location,notes,u}
  racks:[],  // {id,label,units,rows:[{devId|null}]}  — one entry per U
  photos:[], // {src,name,lat,lng,ts}
  contacts:[],
  _eid:1, _rid:1,
  gps:{lat:null,lng:null,acc:null},
  net:{signal:'Detecting…',type:'',dl:null}
};

var _selectedSlot = null; // {rackId, uIndex}
var _dragItem     = null; // {rackId, uStart} (first U of device)

// ── Init ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function(){
  S.id = genId();
  document.getElementById('f-date').value = today();
  populateEqModels(); populateRkModels();
  setupNavLinks();
  setupPills('status-pills',  ['active-op','active-deg','active-off'], function(v){S.status=v;});
  setupPills('followup-pills',['active-urg','active-sch','active-no'], function(v){S.followup=v;});
  setupSignal();
  startSensors();
  loadSurvey();
  renderEquip(); renderRacks(); renderPhotos(); renderInventory();
  autoSaveLoop();
});

function genId(){var d=new Date();return'NSS-'+d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+Math.floor(1000+Math.random()*8999);}
function pad(n){return String(n).padStart(2,'0');}
function today(){return new Date().toISOString().split('T')[0];}
function gv(id){var el=document.getElementById(id);return el?el.value:'';}
function sv(id,v){var el=document.getElementById(id);if(el&&v)el.value=v;}
function toast(m){var t=document.getElementById('toast');t.textContent=m;t.classList.add('show');setTimeout(function(){t.classList.remove('show');},2200);}

// ── Navigation ─────────────────────────────────────────
function setupNavLinks(){
  document.querySelectorAll('.nav-item[data-page]').forEach(function(a){
    a.addEventListener('click',function(e){e.preventDefault();goPage(a.dataset.page);if(window.innerWidth<=860)closeNav();});
  });
}
function goPage(p){
  document.querySelectorAll('.page').forEach(function(el){el.classList.remove('active');});
  document.querySelectorAll('.nav-item').forEach(function(el){el.classList.remove('active');});
  var pg = document.getElementById('page-'+p);
  if(pg) pg.classList.add('active');
  var lnk = document.querySelector('[data-page="'+p+'"]');
  if(lnk) lnk.classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
}
function openNav(){document.getElementById('nav').classList.add('open');document.getElementById('overlay').classList.add('open');}
function closeNav(){document.getElementById('nav').classList.remove('open');document.getElementById('overlay').classList.remove('open');}

// ── Status pills ───────────────────────────────────────
function setupPills(containerId, classes, cb){
  var map = {};
  document.querySelectorAll('#'+containerId+' .pill').forEach(function(p,i){
    map[p.dataset.val] = classes[i];
    p.addEventListener('click',function(){
      document.querySelectorAll('#'+containerId+' .pill').forEach(function(x){x.className='pill';});
      p.classList.add(classes[i]);
      cb(p.dataset.val);
    });
  });
}
function activatePill(containerId, val, classes){
  document.querySelectorAll('#'+containerId+' .pill').forEach(function(p,i){
    if(p.dataset.val===val){p.classList.add(classes[i]);}
  });
}

// ── Signal bars ────────────────────────────────────────
var SIG_LABELS=['','Very poor','Poor','Fair','Good','Excellent'];
function setupSignal(){
  document.querySelectorAll('#signal-bars .bar').forEach(function(b){
    b.addEventListener('click',function(){
      var v=parseInt(b.dataset.val);
      S.signal=(S.signal===v)?0:v;
      renderSignal();
    });
  });
}
function renderSignal(){
  document.querySelectorAll('#signal-bars .bar').forEach(function(b){
    b.classList.toggle('on', parseInt(b.dataset.val)<=S.signal);
  });
  var el=document.getElementById('signal-label');
  if(el) el.textContent=S.signal?SIG_LABELS[S.signal]:'';
}

// ── Equipment ──────────────────────────────────────────
function populateEqModels(){
  var cat=document.getElementById('eq-cat');
  if(!cat)return;
  updateEqModels();
  cat.addEventListener('change',updateEqModels);
}
function eqUpdateModels(){updateEqModels();}
function updateEqModels(){
  var sel=document.getElementById('eq-cat');
  var mod=document.getElementById('eq-model');
  if(!sel||!mod)return;
  var list=(CAT[sel.value]||{items:[]}).items;
  mod.innerHTML=list.map(function(m){return'<option>'+m.n+'</option>';}).join('');
}

function eqAdd(){
  var catEl=document.getElementById('eq-cat');
  var modEl=document.getElementById('eq-model');
  var lblEl=document.getElementById('eq-hostname');
  var cat=catEl?catEl.value:'other';
  var model=modEl?modEl.value:'Custom';
  var label=(lblEl&&lblEl.value.trim())||model;
  var catDef=CAT[cat]||{};
  var modelDef=(catDef.items||[]).find(function(m){return m.n===model;})||{u:1};
  S.equip.push({id:'e'+(S._eid++),cat:cat,model:model,label:label,ip:'',serial:'',location:'',notes:'',u:modelDef.u||1});
  if(lblEl)lblEl.value='';
  renderEquip();
  autoSave();
  toast('Added '+label);
}

function renderEquip(){
  var el=document.getElementById('eq-list');
  if(!el)return;
  if(!S.equip.length){el.innerHTML='<div style="color:var(--hint);font-size:13px;padding:16px 0;text-align:center">No equipment added yet. Use the form above to add devices.</div>';return;}
  el.innerHTML=S.equip.map(function(e){
    var icon=(CAT[e.cat]||{icon:'📦'}).icon;
    return '<div class="eq-item" id="eqi-'+e.id+'">'+
      '<div class="eq-header" onclick="eqToggle(\''+e.id+'\')">'+
        '<span class="eq-icon">'+icon+'</span>'+
        '<span class="eq-name">'+esc(e.label)+'</span>'+
        '<span class="eq-model">'+esc(e.model)+'</span>'+
        '<span class="eq-arrow" id="eqa-'+e.id+'">›</span>'+
      '</div>'+
      '<div class="eq-body" id="eqb-'+e.id+'">'+
        '<div class="form-grid">'+
          '<div class="field"><label>Hostname / label</label><input value="'+esc(e.label)+'" oninput="eqField(\''+e.id+'\',\'label\',this.value)"></div>'+
          '<div class="field"><label>IP address</label><input value="'+esc(e.ip)+'" placeholder="e.g. 10.0.0.1" oninput="eqField(\''+e.id+'\',\'ip\',this.value)"></div>'+
          '<div class="field"><label>Serial number</label><input value="'+esc(e.serial)+'" oninput="eqField(\''+e.id+'\',\'serial\',this.value)"></div>'+
          '<div class="field"><label>Rack / location</label><input value="'+esc(e.location)+'" placeholder="e.g. Rack A, U12" oninput="eqField(\''+e.id+'\',\'location\',this.value)"></div>'+
          '<div class="field span2"><label>Notes</label><input value="'+esc(e.notes)+'" oninput="eqField(\''+e.id+'\',\'notes\',this.value)"></div>'+
        '</div>'+
        '<div style="margin-top:10px"><button class="btn-danger" onclick="eqRemove(\''+e.id+'\')">✕ Remove</button></div>'+
      '</div>'+
    '</div>';
  }).join('');
}

function eqToggle(id){
  var body=document.getElementById('eqb-'+id);
  var arrow=document.getElementById('eqa-'+id);
  if(body){var open=body.classList.toggle('open');if(arrow)arrow.classList.toggle('open',open);}
}
function eqField(id,field,val){var e=S.equip.find(function(x){return x.id===id;});if(e)e[field]=val;autoSave();}
function eqRemove(id){S.equip=S.equip.filter(function(x){return x.id!==id;});renderEquip();autoSave();}

// ── Rack stencil ───────────────────────────────────────
function populateRkModels(){
  var cat=document.getElementById('rk-cat');
  if(!cat)return;
  rkUpdateModels();
  cat.addEventListener('change',rkUpdateModels);
}
function rkUpdateModels(){
  var sel=document.getElementById('rk-cat');
  var mod=document.getElementById('rk-model');
  if(!sel||!mod)return;
  var list=(CAT[sel.value]||{items:[]}).items.filter(function(m){return m.u>0;});
  mod.innerHTML=list.map(function(m){return'<option value="'+m.n+'">'+(m.n)+(m.u>1?' ('+m.u+'U)':'')+'</option>';}).join('');
}

function rkAddRack(){
  var lEl=document.getElementById('rk-label');
  var sEl=document.getElementById('rk-size');
  var label=(lEl&&lEl.value.trim())||('Rack '+String.fromCharCode(64+S.racks.length+1));
  var units=parseInt(sEl&&sEl.value)||42;
  // rows: array of null (empty) or devId string, length = units
  var rows=[];for(var i=0;i<units;i++)rows.push(null);
  S.racks.push({id:'r'+(S._rid++),label:label,units:units,rows:rows,devs:{}});
  if(lEl)lEl.value='';
  _selectedSlot=null;
  renderRacks();
  renderInventory();
  autoSave();
  toast('Added '+label);
}

// Each rack has: rows[u] = null | devId
// devs: {devId:{label,model,cat,u,color,uStart}}
function rkPlaceDevice(){
  if(!_selectedSlot){toast('Click an empty rack slot first');return;}
  var rack=S.racks.find(function(r){return r.id===_selectedSlot.rackId;});
  if(!rack){toast('Rack not found');return;}

  var catEl=document.getElementById('rk-cat');
  var modEl=document.getElementById('rk-model');
  var lblEl=document.getElementById('rk-dev-label');
  if(!modEl||!modEl.value){toast('Choose a model');return;}

  var cat=catEl?catEl.value:'other';
  var model=modEl.value;
  var label=(lblEl&&lblEl.value.trim())||model;
  var list=(CAT[cat]||{items:[]}).items;
  var md=list.find(function(m){return m.n===model;})||{u:1};
  var u=md.u||1;
  var uStart=_selectedSlot.uIndex;

  // Check space
  for(var i=uStart;i<uStart+u;i++){
    if(i>=rack.units){toast('Not enough space at U'+(uStart+1));return;}
    if(rack.rows[i]!==null){toast('U'+(i+1)+' is occupied');return;}
  }

  var devId='d'+(S._rid++);
  rack.devs[devId]={label:label,model:model,cat:cat,u:u,color:CAT_COLORS[cat]||'#374151',uStart:uStart};
  for(var j=uStart;j<uStart+u;j++)rack.rows[j]=devId;

  if(lblEl)lblEl.value='';
  _selectedSlot=null;
  renderRacks();
  renderInventory();
  autoSave();
  toast('Placed '+label);
}

function rkRemoveDev(rackId,devId){
  var rack=S.racks.find(function(r){return r.id===rackId;});
  if(!rack)return;
  // Clear rows
  for(var i=0;i<rack.rows.length;i++){if(rack.rows[i]===devId)rack.rows[i]=null;}
  delete rack.devs[devId];
  if(_selectedSlot&&_selectedSlot.rackId===rackId)_selectedSlot=null;
  renderRacks();renderInventory();autoSave();
}

function rkRemoveRack(rackId){
  if(!confirm('Remove this rack and all its equipment?'))return;
  S.racks=S.racks.filter(function(r){return r.id!==rackId;});
  if(_selectedSlot&&_selectedSlot.rackId===rackId)_selectedSlot=null;
  renderRacks();renderInventory();autoSave();
}

function rkClear(){if(!confirm('Clear all racks?'))return;S.racks=[];_selectedSlot=null;renderRacks();renderInventory();autoSave();}

function rkExportCSV(){
  var rows=['Rack,U,Label,Model'];
  S.racks.forEach(function(rack){
    var seen={};
    rack.rows.forEach(function(devId,u){
      if(devId&&!seen[devId]){seen[devId]=true;var d=rack.devs[devId];rows.push('"'+rack.label+'",'+(u+1)+',"'+d.label+'","'+d.model+'"');}
    });
  });
  var blob=new Blob([rows.join('\n')],{type:'text/csv'});
  var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='rack.csv';a.click();
}

// Select slot
function rkSelectSlot(rackId, uIndex){
  var rack=S.racks.find(function(r){return r.id===rackId;});
  if(!rack)return;
  if(rack.rows[uIndex]!==null){
    // Clicking occupied row — treat as nothing (device handles its own remove)
    return;
  }
  _selectedSlot={rackId:rackId,uIndex:uIndex};
  updateTargetHint(rack,uIndex);
  renderRacks();
}

function updateTargetHint(rack,uIndex){
  var hint=document.getElementById('rk-target-hint');
  if(hint)hint.textContent='📍 Selected: '+rack.label+' U'+(uIndex+1);
}

// Drag device within rack
var _drag={active:false,rackId:null,devId:null};
function rkDragStart(e,rackId,devId){
  _drag={active:true,rackId:rackId,devId:devId};
  e.dataTransfer.effectAllowed='move';
  e.target.style.opacity='0.4';
}
function rkDragEnd(e){e.target.style.opacity='1';document.querySelectorAll('.rack-row').forEach(function(r){r.classList.remove('drag-over');});}
function rkDragOver(e,rackId,uIndex){e.preventDefault();e.currentTarget.classList.add('drag-over');}
function rkDragLeave(e){e.currentTarget.classList.remove('drag-over');}
function rkDrop(e,rackId,uIndex){
  e.preventDefault();e.currentTarget.classList.remove('drag-over');
  if(!_drag.active)return;
  var rack=S.racks.find(function(r){return r.id===rackId;});
  if(!rack)return;
  var dev=rack.devs[_drag.devId];
  if(!dev)return;
  var u=dev.u;
  // Check space (excluding current device cells)
  for(var i=uIndex;i<uIndex+u;i++){
    if(i>=rack.units){toast('Not enough space');_drag.active=false;return;}
    if(rack.rows[i]!==null&&rack.rows[i]!==_drag.devId){toast('U'+(i+1)+' is occupied');_drag.active=false;return;}
  }
  // Remove from current position
  for(var j=0;j<rack.rows.length;j++){if(rack.rows[j]===_drag.devId)rack.rows[j]=null;}
  // Place at new position
  for(var k=uIndex;k<uIndex+u;k++)rack.rows[k]=_drag.devId;
  dev.uStart=uIndex;
  _drag.active=false;
  renderRacks();autoSave();
}

function renderRacks(){
  var canvas=document.getElementById('rk-canvas');
  var emptyEl=document.getElementById('rk-empty');
  if(!canvas)return;
  // Remove old rack columns
  canvas.querySelectorAll('.rack-col').forEach(function(el){el.remove();});
  if(!S.racks.length){if(emptyEl)emptyEl.style.display='flex';return;}
  if(emptyEl)emptyEl.style.display='none';

  S.racks.forEach(function(rack){
    var sel=_selectedSlot&&_selectedSlot.rackId===rack.id;
    var used=Object.keys(rack.devs).reduce(function(s,k){return s+rack.devs[k].u;},0);
    var free=rack.units-used;

    var col=document.createElement('div');
    col.className='rack-col'+(sel?' selected':'');

    // Header
    var hdr=document.createElement('div');
    hdr.className='rack-hdr'+(sel?' selected':'');
    hdr.innerHTML=
      '<div><div class="rack-hdr-name">'+esc(rack.label)+'</div>'+
      '<div class="rack-hdr-info">'+rack.units+'U · '+used+'U used · '+free+'U free</div></div>'+
      '<button onclick="rkRemoveRack(\''+rack.id+'\')" class="btn-sm" style="padding:3px 8px;font-size:10px">✕</button>';
    col.appendChild(hdr);

    // Body
    var body=document.createElement('div');
    body.className='rack-body';
    var seen={};
    for(var u=0;u<rack.units;u++){
      var devId=rack.rows[u];
      if(devId&&seen[devId]){continue;} // span continuation — skip

      var row=document.createElement('div');
      row.className='rack-row';
      if(_selectedSlot&&_selectedSlot.rackId===rack.id&&_selectedSlot.uIndex===u&&!devId)
        row.classList.add('selected-slot');

      // U number
      var uEl=document.createElement('div');uEl.className='rack-u';uEl.textContent=u+1;
      row.appendChild(uEl);

      var slot=document.createElement('div');slot.className='rack-slot';

      if(devId){
        seen[devId]=true;
        var dev=rack.devs[devId];
        var h=dev.u*28+'px';
        row.style.height=h;row.style.minHeight=h;
        row.draggable=true;
        row.setAttribute('ondragstart','rkDragStart(event,\''+rack.id+'\',\''+devId+'\')');
        row.setAttribute('ondragend','rkDragEnd(event)');

        var db=document.createElement('div');db.className='rack-device-block';
        db.innerHTML=
          '<div class="rack-dev-name" style="color:'+lightenText(dev.color)+'">'+esc(dev.label)+'</div>'+
          '<span class="rack-dev-u">'+dev.u+'U</span>'+
          '<button class="rack-dev-rm" onclick="event.stopPropagation();rkRemoveDev(\''+rack.id+'\',\''+devId+'\')">✕</button>';
        db.style.background=dev.color;
        db.style.height=(dev.u*28-2)+'px';
        db.style.borderRadius='3px';
        slot.appendChild(db);
      } else {
        row.setAttribute('onclick','rkSelectSlot(\''+rack.id+'\','+u+')');
        row.setAttribute('ondragover','rkDragOver(event,\''+rack.id+'\','+u+')');
        row.setAttribute('ondragleave','rkDragLeave(event)');
        row.setAttribute('ondrop','rkDrop(event,\''+rack.id+'\','+u+')');
        slot.innerHTML='<span class="rack-empty-label">— empty —</span>';
      }
      row.appendChild(slot);
      body.appendChild(row);
    }
    col.appendChild(body);
    canvas.appendChild(col);
  });
}

function lightenText(hex){return '#fff';}

function renderInventory(){
  var el=document.getElementById('rk-inventory');
  if(!el)return;
  if(!S.racks.length){el.innerHTML='<span>No racks yet.</span>';return;}
  var html='';
  S.racks.forEach(function(rack){
    var used=Object.keys(rack.devs).reduce(function(s,k){return s+rack.devs[k].u;},0);
    html+='<div style="margin-bottom:8px"><div style="font-size:11px;font-weight:700;color:var(--cyan);margin-bottom:4px">'+esc(rack.label)+' — '+used+'/'+rack.units+'U</div>';
    var rows=rack.rows,seen={};
    rows.forEach(function(devId,u){
      if(!devId||seen[devId])return;seen[devId]=true;
      var d=rack.devs[devId];
      html+='<div style="display:flex;align-items:center;gap:5px;margin-bottom:2px;padding-left:6px">'+
        '<div style="width:7px;height:7px;border-radius:1px;background:'+d.color+';flex-shrink:0"></div>'+
        '<span style="font-size:9px;color:var(--hint);font-family:monospace;flex-shrink:0">U'+(u+1)+'</span>'+
        '<span style="font-size:10px;color:var(--text);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+esc(d.label)+'</span>'+
        '</div>';
    });
    html+='</div>';
  });
  el.innerHTML=html;
}

// ── Photos ─────────────────────────────────────────────
function photosAdd(input){
  Array.from(input.files).forEach(function(file){
    var r=new FileReader();
    r.onload=function(e){
      S.photos.push({
        src:e.target.result,marked:null,caption:'',
        name:file.name,lat:S.gps.lat,lng:S.gps.lng,
        ts:new Date().toISOString()
      });
      renderPhotos();autoSave();
    };
    r.readAsDataURL(file);
  });
  input.value='';
}

function renderPhotos(){
  var grid=document.getElementById('photo-grid');if(!grid)return;
  if(!S.photos.length){
    grid.innerHTML='<p style="color:var(--hint);font-size:13px;padding:16px 0">No photos yet. Use the upload area above.</p>';
    return;
  }
  grid.innerHTML='<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:14px;margin-top:4px">'+
    S.photos.map(function(p,i){
      var display=p.marked||p.src;
      return '<div class="photo-card">'+
        '<div class="photo-img-wrap" onclick="mkOpen('+i+')" title="Click to add markup">'+
          '<img src="'+display+'" alt="'+esc(p.caption||p.name)+'">'+
          (p.lat?'<div class="photo-gps-tag">📍 GPS</div>':'')+
          (p.marked?'<div class="photo-markup-badge">✏ Annotated</div>':'')+
        '</div>'+
        '<div class="photo-card-footer">'+
          (p.caption
            ?'<span class="photo-caption-text">'+esc(p.caption)+'</span>'
            :'<span class="photo-caption-empty">No caption — click to add</span>')+
          '<button class="mk-action" style="padding:3px 8px;font-size:10px" onclick="mkOpen('+i+')">✏ Markup</button>'+
          '<button style="background:none;border:none;color:var(--hint);cursor:pointer;font-size:16px;padding:2px 4px;line-height:1" onclick="photoRm('+i+')" title="Remove">✕</button>'+
        '</div>'+
      '</div>';
    }).join('')+
  '</div>';
}

function photoRm(i){
  if(!confirm('Remove this photo?'))return;
  S.photos.splice(i,1);renderPhotos();autoSave();
}

// ── Markup engine ──────────────────────────────────────
var MK={idx:-1,tool:'pen',color:'#00B7D9',size:4,strokes:[],redoStack:[],drawing:false,startX:0,startY:0,lastX:0,lastY:0,currentPath:[],imgEl:null,scale:1};

function mkOpen(i){
  MK.idx=i;
  var p=S.photos[i];
  MK.strokes=p.mkStrokes?JSON.parse(JSON.stringify(p.mkStrokes)):[];
  MK.redoStack=[];
  var capEl=document.getElementById('mk-caption');if(capEl)capEl.value=p.caption||'';
  var gpsEl=document.getElementById('mk-gps-display');
  if(gpsEl)gpsEl.textContent=p.lat?'📍 '+p.lat.toFixed(5)+', '+p.lng.toFixed(5):'';
  var sizeEl=document.getElementById('mk-size');
  if(sizeEl)sizeEl.onchange=function(){MK.size=parseInt(sizeEl.value);};
  // Open modal first so it has real dimensions
  document.getElementById('modal-markup').classList.add('open');
  document.body.style.overflow='hidden';
  mkTool('pen');
  mkSetupEvents();
  var img=new Image();
  img.onload=function(){
    MK.imgEl=img;
    // Two rAF to guarantee modal is painted and measurable
    requestAnimationFrame(function(){
      requestAnimationFrame(function(){
        var canvas=document.getElementById('markup-canvas');
        var toolbarH=document.getElementById('markup-toolbar')?document.getElementById('markup-toolbar').offsetHeight:56;
        var captionH=56;
        var availW=window.innerWidth  - 32;
        var availH=window.innerHeight - toolbarH - captionH - 32;
        var scale=Math.min(1, availW/img.naturalWidth, availH/img.naturalHeight);
        canvas.width =Math.round(img.naturalWidth  * scale);
        canvas.height=Math.round(img.naturalHeight * scale);
        MK.scale=scale;
        mkRedraw();
      });
    });
  };
  img.src=p.src;
}

function mkSetupEvents(){
  var c=document.getElementById('markup-canvas');if(!c)return;
  c.onmousedown=mkDown;c.onmousemove=mkMove;c.onmouseup=mkUp;c.onmouseleave=mkUp;
  c.ontouchstart=function(e){e.preventDefault();mkDown(e.touches[0]);};
  c.ontouchmove=function(e){e.preventDefault();mkMove(e.touches[0]);};
  c.ontouchend=function(e){e.preventDefault();mkUp(e.changedTouches[0]);};
}

function mkPos(e){
  var c=document.getElementById('markup-canvas');
  var r=c.getBoundingClientRect();
  return{x:(e.clientX-r.left),y:(e.clientY-r.top)};
}

function mkDown(e){
  var p=mkPos(e);
  if(MK.tool==='text'){mkPromptText(p.x,p.y);return;}
  MK.drawing=true;MK.startX=p.x;MK.startY=p.y;MK.lastX=p.x;MK.lastY=p.y;
  if(MK.tool==='pen'||MK.tool==='blur')MK.currentPath=[{x:p.x,y:p.y}];
}

function mkMove(e){
  if(!MK.drawing)return;
  var p=mkPos(e);
  var c=document.getElementById('markup-canvas');
  var ctx=c.getContext('2d');
  if(MK.tool==='pen'||MK.tool==='blur'){
    MK.currentPath.push({x:p.x,y:p.y});
    ctx.save();
    if(MK.tool==='blur'){ctx.strokeStyle='rgba(0,0,0,0.65)';ctx.lineWidth=MK.size*4;ctx.filter='blur(10px)';}
    else{ctx.strokeStyle=MK.color;ctx.lineWidth=MK.size;ctx.lineCap='round';ctx.lineJoin='round';}
    ctx.beginPath();ctx.moveTo(MK.lastX,MK.lastY);ctx.lineTo(p.x,p.y);ctx.stroke();ctx.restore();
  } else {mkRedraw();mkDrawShape(MK.startX,MK.startY,p.x,p.y,true);}
  MK.lastX=p.x;MK.lastY=p.y;
}

function mkUp(e){
  if(!MK.drawing)return;MK.drawing=false;
  var p=mkPos(e);var stroke;
  if(MK.tool==='pen'||MK.tool==='blur'){stroke={type:MK.tool,path:MK.currentPath.slice(),color:MK.color,size:MK.size};}
  else{stroke={type:MK.tool,x1:MK.startX,y1:MK.startY,x2:p.x,y2:p.y,color:MK.color,size:MK.size};}
  MK.strokes.push(stroke);MK.redoStack=[];mkRedraw();
}

function mkPromptText(x,y){
  var overlay=document.getElementById('mk-text-overlay');
  var input=document.getElementById('mk-text-input');
  var c=document.getElementById('markup-canvas');
  var r=c.getBoundingClientRect();
  overlay.style.cssText='display:block;position:fixed;left:'+(r.left+x)+'px;top:'+(r.top+y-20)+'px;z-index:700';
  input.value='';input.style.color=MK.color;
  setTimeout(function(){input.focus();},50);
  input.onkeydown=function(ev){
    if(ev.key==='Enter'&&input.value.trim()){commit();}
    if(ev.key==='Escape'){overlay.style.display='none';}
  };
  input.onblur=function(){if(input.value.trim())commit();else overlay.style.display='none';};
  function commit(){
    MK.strokes.push({type:'text',tx:x,ty:y,text:input.value.trim(),color:MK.color,size:MK.size});
    MK.redoStack=[];mkRedraw();overlay.style.display='none';
  }
}

function mkRedraw(){
  var c=document.getElementById('markup-canvas');if(!c||!MK.imgEl)return;
  var ctx=c.getContext('2d');
  ctx.clearRect(0,0,c.width,c.height);
  ctx.drawImage(MK.imgEl,0,0,c.width,c.height);
  MK.strokes.forEach(function(s){mkDrawStroke(ctx,s);});
}

function mkDrawStroke(ctx,s){
  ctx.save();
  if(s.type==='pen'){
    ctx.strokeStyle=s.color;ctx.lineWidth=s.size;ctx.lineCap='round';ctx.lineJoin='round';
    ctx.beginPath();
    (s.path||[]).forEach(function(p,i){i===0?ctx.moveTo(p.x,p.y):ctx.lineTo(p.x,p.y);});
    ctx.stroke();
  } else if(s.type==='blur'){
    ctx.strokeStyle='rgba(0,0,0,0.6)';ctx.lineWidth=(s.size||4)*4;ctx.filter='blur(10px)';ctx.lineCap='round';
    ctx.beginPath();
    (s.path||[]).forEach(function(p,i){i===0?ctx.moveTo(p.x,p.y):ctx.lineTo(p.x,p.y);});
    ctx.stroke();
  } else if(s.type==='arrow'){
    ctx.strokeStyle=s.color;ctx.fillStyle=s.color;ctx.lineWidth=s.size;ctx.lineCap='round';
    ctx.beginPath();ctx.moveTo(s.x1,s.y1);ctx.lineTo(s.x2,s.y2);ctx.stroke();
    var ang=Math.atan2(s.y2-s.y1,s.x2-s.x1),ah=Math.max(14,s.size*5);
    ctx.beginPath();ctx.moveTo(s.x2,s.y2);
    ctx.lineTo(s.x2-ah*Math.cos(ang-Math.PI/7),s.y2-ah*Math.sin(ang-Math.PI/7));
    ctx.lineTo(s.x2-ah*Math.cos(ang+Math.PI/7),s.y2-ah*Math.sin(ang+Math.PI/7));
    ctx.closePath();ctx.fill();
  } else if(s.type==='rect'){
    ctx.strokeStyle=s.color;ctx.lineWidth=s.size;
    ctx.strokeRect(s.x1,s.y1,s.x2-s.x1,s.y2-s.y1);
  } else if(s.type==='circle'){
    ctx.strokeStyle=s.color;ctx.lineWidth=s.size;
    var rx=Math.abs(s.x2-s.x1)/2,ry=Math.abs(s.y2-s.y1)/2;
    ctx.beginPath();ctx.ellipse(s.x1+(s.x2-s.x1)/2,s.y1+(s.y2-s.y1)/2,rx,ry,0,0,Math.PI*2);ctx.stroke();
  } else if(s.type==='text'){
    var fs=Math.max(14,s.size*5);
    ctx.font='bold '+fs+'px -apple-system,Arial,sans-serif';
    var tw=ctx.measureText(s.text).width;
    ctx.fillStyle='rgba(0,8,20,0.78)';
    ctx.beginPath();ctx.roundRect(s.tx-6,s.ty-fs-2,tw+14,fs+10,5);ctx.fill();
    ctx.fillStyle=s.color;ctx.textBaseline='alphabetic';ctx.fillText(s.text,s.tx+1,s.ty);
  }
  ctx.restore();
}

function mkDrawShape(x1,y1,x2,y2,preview){
  var c=document.getElementById('markup-canvas');var ctx=c.getContext('2d');
  ctx.save();if(preview)ctx.globalAlpha=0.65;
  ctx.strokeStyle=MK.color;ctx.fillStyle=MK.color;ctx.lineWidth=MK.size;ctx.lineCap='round';
  if(MK.tool==='arrow'){
    ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();
    var ang=Math.atan2(y2-y1,x2-x1),ah=Math.max(14,MK.size*5);
    ctx.beginPath();ctx.moveTo(x2,y2);
    ctx.lineTo(x2-ah*Math.cos(ang-Math.PI/7),y2-ah*Math.sin(ang-Math.PI/7));
    ctx.lineTo(x2-ah*Math.cos(ang+Math.PI/7),y2-ah*Math.sin(ang+Math.PI/7));
    ctx.closePath();ctx.fill();
  } else if(MK.tool==='rect'){ctx.strokeRect(x1,y1,x2-x1,y2-y1);}
  else if(MK.tool==='circle'){
    var rx=Math.abs(x2-x1)/2,ry=Math.abs(y2-y1)/2;
    ctx.beginPath();ctx.ellipse(x1+(x2-x1)/2,y1+(y2-y1)/2,rx,ry,0,0,Math.PI*2);ctx.stroke();
  }
  ctx.restore();
}

function mkTool(t){
  MK.tool=t;
  document.querySelectorAll('.mk-tool').forEach(function(b){b.classList.remove('active');});
  var btn=document.getElementById('mk-'+t);if(btn)btn.classList.add('active');
  var c=document.getElementById('markup-canvas');
  if(c)c.style.cursor={'pen':'crosshair','arrow':'crosshair','rect':'crosshair','circle':'crosshair','text':'text','blur':'cell'}[t]||'crosshair';
}

function mkColor(el){
  MK.color=el.dataset.color;
  document.querySelectorAll('.mk-color').forEach(function(b){b.classList.remove('active');});
  el.classList.add('active');
}

function mkUndo(){if(!MK.strokes.length)return;MK.redoStack.push(MK.strokes.pop());mkRedraw();}

function mkClear(){if(!confirm('Clear all markup?'))return;MK.strokes=[];MK.redoStack=[];mkRedraw();}

function mkSave(){
  var c=document.getElementById('markup-canvas');if(!c)return;
  var capEl=document.getElementById('mk-caption');
  var p=S.photos[MK.idx];if(!p)return;
  p.marked=c.toDataURL('image/jpeg',0.92);
  p.mkStrokes=JSON.parse(JSON.stringify(MK.strokes));
  p.caption=(capEl&&capEl.value.trim())||p.caption||'';
  mkClose();renderPhotos();autoSave();toast('Photo saved ✓');
}

function mkCancel(){mkClose();}

function mkClose(){
  document.getElementById('modal-markup').classList.remove('open');
  document.body.style.overflow='';
}


// ── Contacts ───────────────────────────────────────────
function addContact(){
  S.contacts.push({name:'',role:'',phone:'',email:''});
  renderContacts();
}
function renderContacts(){
  var el=document.getElementById('contacts-list');if(!el)return;
  el.innerHTML=S.contacts.map(function(c,i){
    return '<div class="contact-row">'+
      '<input placeholder="Name" value="'+esc(c.name)+'" oninput="S.contacts['+i+'].name=this.value">'+
      '<input placeholder="Role" value="'+esc(c.role)+'" oninput="S.contacts['+i+'].role=this.value">'+
      '<input placeholder="Phone" value="'+esc(c.phone)+'" oninput="S.contacts['+i+'].phone=this.value">'+
      '<input placeholder="Email" value="'+esc(c.email)+'" oninput="S.contacts['+i+'].email=this.value">'+
      '<button class="btn-danger" onclick="S.contacts.splice('+i+',1);renderContacts()">✕</button>'+
    '</div>';
  }).join('');
}

// ── Sensors ────────────────────────────────────────────
function startSensors(){
  // GPS
  if(navigator.geolocation){
    navigator.geolocation.watchPosition(function(pos){
      S.gps={lat:pos.coords.latitude,lng:pos.coords.longitude,acc:Math.round(pos.coords.accuracy)};
      var el=document.getElementById('gps-badge');
      if(el)el.textContent='📍 '+S.gps.lat.toFixed(4)+'° '+S.gps.lng.toFixed(4)+'°';
    },function(){},{enableHighAccuracy:true,maximumAge:10000});
  }
  // Network
  var conn=navigator.connection||navigator.mozConnection||navigator.webkitConnection;
  function readNet(){
    if(!navigator.onLine){S.net={signal:'Offline',type:'none',dl:null};}
    else if(conn){
      var t={wifi:'📶 Wi-Fi',cellular:'📡 Cellular',ethernet:'🔌 Ethernet'}[conn.type]||'🌐 Online';
      var e={'4g':'4G LTE','3g':'3G','2g':'2G','slow-2g':'Slow 2G'}[conn.effectiveType]||'';
      S.net={signal:t+(e?' · '+e:''),type:conn.type||'',dl:conn.downlink||null};
    } else {S.net={signal:'🌐 Online',type:'unknown',dl:null};}
    updateNetUI();
  }
  readNet();
  if(conn){conn.addEventListener('change',readNet);}
  window.addEventListener('online',readNet);window.addEventListener('offline',readNet);
}
function updateNetUI(){
  var badge=document.getElementById('net-badge');
  var icon=document.getElementById('net-icon');
  var type=document.getElementById('net-type');
  var detail=document.getElementById('net-detail');
  if(badge)badge.textContent=S.net.signal;
  var ic={wifi:'📶',cellular:'📡',ethernet:'🔌',none:'✕'}[S.net.type]||'🌐';
  if(icon)icon.textContent=ic;
  if(type)type.textContent=S.net.signal;
  if(detail)detail.textContent=S.net.dl?S.net.dl+' Mbps':'';
}
function stampNetwork(){
  var el=document.getElementById('f-bw');
  if(el&&S.net.dl&&!el.value)el.value=S.net.dl+' Mbps (device)';
  toast('Network info stamped');
}
function captureGPS(){
  if(!navigator.geolocation){toast('GPS not supported');return;}
  var btn=document.querySelector('[onclick="captureGPS()"]');
  if(btn){btn.textContent='⟳ Locating…';btn.disabled=true;}
  navigator.geolocation.getCurrentPosition(function(pos){
    S.gps={lat:pos.coords.latitude,lng:pos.coords.longitude,acc:Math.round(pos.coords.accuracy)};
    var gpsEl=document.getElementById('f-gps');
    var accEl=document.getElementById('gps-acc');
    var link=document.getElementById('gps-link');
    if(gpsEl)gpsEl.value=S.gps.lat.toFixed(6)+', '+S.gps.lng.toFixed(6);
    if(accEl)accEl.textContent='± '+S.gps.acc+'m';
    if(link){link.href='https://maps.google.com/?q='+S.gps.lat+','+S.gps.lng;link.style.display='block';}
    if(btn){btn.textContent='📍 Get GPS';btn.disabled=false;}
    toast('GPS captured');autoSave();
  },function(err){
    var msgs={1:'Permission denied',2:'Position unavailable',3:'Timeout'};
    toast(msgs[err.code]||'GPS error');
    if(btn){btn.textContent='📍 Get GPS';btn.disabled=false;}
  },{enableHighAccuracy:true,timeout:10000});
}

// ── Save / Load ────────────────────────────────────────
var _autoTimer=null;
function autoSave(){
  clearTimeout(_autoTimer);
  var el=document.getElementById('save-indicator');if(el)el.textContent='Unsaved…';
  _autoTimer=setTimeout(function(){saveSurvey(true);},1500);
}
function autoSaveLoop(){setInterval(function(){if(S.id)saveSurvey(true);},30000);}

function collectFormFields(){
  S.formFields={
    siteName:gv('f-site-name'),date:gv('f-date'),by:gv('f-by'),ticket:gv('f-ticket'),
    address:gv('f-address'),floor:gv('f-floor'),type:gv('f-type'),
    building:gv('f-building'),room:gv('f-room'),gps:gv('f-gps'),access:gv('f-access'),notes:gv('f-notes'),
    isp:gv('f-isp'),circuit:gv('f-circuit'),wanip:gv('f-wanip'),bw:gv('f-bw'),
    ssid:gv('f-ssid'),security:gv('f-security'),vlans:gv('f-vlans'),dns:gv('f-dns'),
    issues:gv('f-issues'),recs:gv('f-recs'),completion:gv('f-completion'),addnotes:gv('f-addnotes')
  };
}

function saveSurvey(silent){
  collectFormFields();
  try{
    localStorage.setItem('ns_'+S.id,JSON.stringify(S));
    var idx=JSON.parse(localStorage.getItem('ns_idx')||'[]');
    var f=S.formFields||{};
    var entry={id:S.id,name:f.siteName||'Untitled',date:f.date,saved:new Date().toISOString()};
    var existing=idx.findIndex(function(x){return x.id===S.id;});
    if(existing>=0)idx[existing]=entry;else idx.unshift(entry);
    localStorage.setItem('ns_idx',JSON.stringify(idx.slice(0,50)));
    localStorage.setItem('ns_latest',S.id);
    if(!silent)toast('Survey saved ✓');
    var el=document.getElementById('save-indicator');
    if(el)el.textContent='Saved '+new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
  }catch(e){toast('Save failed');}
}

function loadSurvey(){
  var latest=localStorage.getItem('ns_latest');
  if(!latest)return;
  var raw=localStorage.getItem('ns_'+latest);
  if(!raw)return;
  try{
    var d=JSON.parse(raw);
    S.id=d.id||S.id;S.status=d.status||'';S.signal=d.signal||0;S.followup=d.followup||'';
    S.equip=d.equip||[];S.racks=d.racks||[];S.photos=d.photos||[];S.contacts=d.contacts||[];
    S._eid=d._eid||1;S._rid=d._rid||1;S.gps=d.gps||S.gps;
    var f=d.formFields||{};
    sv('f-site-name',f.siteName);sv('f-date',f.date);sv('f-by',f.by);sv('f-ticket',f.ticket);
    sv('f-address',f.address);sv('f-floor',f.floor);sv('f-type',f.type);
    sv('f-building',f.building);sv('f-room',f.room);sv('f-gps',f.gps);sv('f-access',f.access);sv('f-notes',f.notes);
    sv('f-isp',f.isp);sv('f-circuit',f.circuit);sv('f-wanip',f.wanip);sv('f-bw',f.bw);
    sv('f-ssid',f.ssid);sv('f-security',f.security);sv('f-vlans',f.vlans);sv('f-dns',f.dns);
    sv('f-issues',f.issues);sv('f-recs',f.recs);sv('f-completion',f.completion);sv('f-addnotes',f.addnotes);
    if(S.signal)renderSignal();
    if(S.gps.lat){
      var link=document.getElementById('gps-link');
      if(link){link.href='https://maps.google.com/?q='+S.gps.lat+','+S.gps.lng;link.style.display='block';}
    }
    document.getElementById('save-indicator').textContent='Loaded';
    renderContacts();
  }catch(e){console.warn('Load error',e);}
}

function newSurvey(){
  if(!confirm('Start a new survey? Current survey will remain saved in history.'))return;
  saveSurvey(true);
  S={id:genId(),status:'',signal:0,followup:'',equip:[],racks:[],photos:[],contacts:[],_eid:1,_rid:1,gps:{lat:null,lng:null,acc:null},net:S.net};
  _selectedSlot=null;
  document.querySelectorAll('input[type="text"],input[type="date"],select,textarea').forEach(function(el){
    if(el.id&&el.id.startsWith('f-'))el.value='';
  });
  sv('f-date',today());
  renderEquip();renderRacks();renderInventory();renderPhotos();renderContacts();
  localStorage.setItem('ns_latest','');
  goPage('info');
  toast('New survey started');
}

// ── History ────────────────────────────────────────────
function openHistory(){
  var idx=JSON.parse(localStorage.getItem('ns_idx')||'[]');
  var body=document.getElementById('history-body');
  if(!body)return;
  if(!idx.length){body.innerHTML='<p style="color:var(--hint);font-size:13px">No surveys saved yet.</p>';openModal('modal-history');return;}
  body.innerHTML=idx.map(function(s){
    return '<div class="history-item" onclick="loadById(\''+s.id+'\')">'+
      '<h4>'+esc(s.name||'Untitled')+'</h4>'+
      '<p>'+s.id+' · '+( s.date||'—')+' · saved '+new Date(s.saved).toLocaleString()+'</p>'+
    '</div>';
  }).join('');
  openModal('modal-history');
}
function loadById(id){
  localStorage.setItem('ns_latest',id);closeModal('modal-history');location.reload();
}
function openModal(id){document.getElementById(id).classList.add('open');}
function closeModal(id){document.getElementById(id).classList.remove('open');}
document.addEventListener('click',function(e){if(e.target.classList.contains('modal-bg'))closeModal(e.target.id);});

// ── Export JSON ────────────────────────────────────────
function exportJSON(){
  collectFormFields();
  var blob=new Blob([JSON.stringify(S,null,2)],{type:'application/json'});
  var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=S.id+'.json';a.click();
  toast('JSON exported');
}

// ── Report generator ───────────────────────────────────
function openReport(){
  collectFormFields();
  var f=S.formFields||{};
  var now=new Date().toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'});
  var html=buildReport(f,now);
  var win=window.open('','_blank','width=960,height=800,scrollbars=yes');
  if(!win){toast('Allow pop-ups to generate report');return;}
  win.document.write(html);win.document.close();
  setTimeout(function(){win.print();},800);
}

function esc(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function row(l,v){if(!v||!v.trim())return'';return'<tr><td class="lbl">'+esc(l)+'</td><td>'+esc(v)+'</td></tr>';}
function sig(n){return['','▁','▂','▃','▄','█'][n]||'';}

function buildReport(f,now){
  var statusColor={'Operational':'#166534','Degraded':'#92400E','Offline':'#991B1B'}[S.status]||'#1e3a5f';
  var statusBg={'Operational':'#DCFCE7','Degraded':'#FEF3C7','Offline':'#FEE2E2'}[S.status]||'#EFF6FF';

  // Rack HTML
  var rackHtml='';
  S.racks.forEach(function(rack){
    var used=Object.keys(rack.devs).reduce(function(s,k){return s+rack.devs[k].u;},0);
    rackHtml+='<div style="display:inline-block;vertical-align:top;margin-right:20px;margin-bottom:20px;min-width:220px">'+
      '<div style="background:#003A5D;color:#fff;padding:8px 12px;border-radius:6px 6px 0 0;font-size:12px;font-weight:700;display:flex;justify-content:space-between">'+
        '<span>'+esc(rack.label)+'</span><span style="opacity:.5;font-weight:400">'+rack.units+'U · '+used+'U used</span>'+
      '</div>'+
      '<div style="border:1px solid #CBD5E1;border-top:none;border-radius:0 0 6px 6px;overflow:hidden">';
    var seen={};
    rack.rows.forEach(function(devId,u){
      if(devId&&seen[devId])return;if(devId)seen[devId]=true;
      var dev=devId&&rack.devs[devId];
      rackHtml+='<div style="display:flex;height:'+(dev?dev.u*20:20)+'px;border-bottom:1px solid #F1F5F9">'+
        '<div style="width:24px;background:#F8FAFC;border-right:1px solid #E2E8F0;display:flex;align-items:center;justify-content:center;font-size:8px;color:#94A3B8;font-family:monospace;flex-shrink:0">'+(u+1)+'</div>'+
        '<div style="flex:1;display:flex;align-items:center;padding:0 8px;'+(dev?'background:'+dev.color+';':'')+'">'+
          (dev?'<span style="font-size:9px;font-weight:700;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+esc(dev.label)+'</span>':'<span style="font-size:8px;color:#CBD5E1">—</span>')+
        '</div>'+
      '</div>';
    });
    rackHtml+='</div></div>';
  });

  // Equipment table rows
  var equipRows=S.equip.map(function(e){
    return '<tr><td>'+(CAT[e.cat]||{icon:'📦'}).icon+' '+esc(e.label)+'</td><td>'+esc(e.model)+'</td>'+
      '<td style="font-family:monospace;font-size:10px">'+esc(e.ip)+'</td><td>'+esc(e.serial)+'</td><td>'+esc(e.location)+'</td><td>'+esc(e.notes)+'</td></tr>';
  }).join('');

  // Contact rows
  var contactRows=S.contacts.filter(function(c){return c.name;}).map(function(c){
    return '<tr><td>'+esc(c.name)+'</td><td>'+esc(c.role)+'</td><td>'+esc(c.phone)+'</td><td>'+esc(c.email)+'</td></tr>';
  }).join('');

  return '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Network Site Survey Report</title><style>'+reportCSS(statusColor,statusBg)+'</style></head><body>'+

  // ── COVER ──
  '<div class="cover">'+
    '<div class="cover-band"></div>'+
    '<div class="cover-body">'+
      '<div class="cover-logo"><div class="cover-logo-n">N</div><div><div class="cover-logo-title">NetSurvey</div><div class="cover-logo-sub">Network Infrastructure Survey</div></div></div>'+
      '<div class="cover-divider"></div>'+
      '<div class="cover-type">Site Survey Report</div>'+
      '<div class="cover-sitename">'+(f.siteName||'Untitled Survey')+'</div>'+
      '<div class="cover-address">'+(f.address||'Address not specified')+'</div>'+
      '<div class="cover-meta">'+
        '<div class="meta-box"><div class="meta-label">Survey Date</div><div class="meta-val">'+(f.date||now)+'</div></div>'+
        '<div class="meta-box"><div class="meta-label">Surveyed By</div><div class="meta-val">'+(f.by||'—')+'</div></div>'+
        '<div class="meta-box"><div class="meta-label">Site Type</div><div class="meta-val">'+(f.type||'—')+'</div></div>'+
        '<div class="meta-box"><div class="meta-label">Floor / Area</div><div class="meta-val">'+(f.floor||'—')+'</div></div>'+
        '<div class="meta-box"><div class="meta-label">Network Status</div>'+
          '<div class="meta-val"><span style="background:'+statusBg+';color:'+statusColor+';padding:2px 12px;border-radius:100px;font-size:12px;font-weight:700">'+(S.status||'Not recorded')+'</span></div></div>'+
        '<div class="meta-box"><div class="meta-label">Signal Strength</div><div class="meta-val">'+(sig(S.signal)||'—')+' '+(['','Very poor','Poor','Fair','Good','Excellent'][S.signal]||'—')+'</div></div>'+
        (f.ticket?'<div class="meta-box"><div class="meta-label">Ticket / Job #</div><div class="meta-val">'+esc(f.ticket)+'</div></div>':'')+
        '<div class="meta-box"><div class="meta-label">Report Generated</div><div class="meta-val">'+now+'</div></div>'+
      '</div>'+
    '</div>'+
    '<div class="cover-footer">'+
      '<span>Survey ID: '+esc(S.id)+'</span>'+
      '<span>Confidential — IT Infrastructure</span>'+
    '</div>'+
  '</div>'+

  // ── EXECUTIVE SUMMARY ──
  section(1,'Executive Summary',
    '<div class="summary-grid">'+
      summaryBox('📋','Survey Details',
        (f.siteName?'<b>Site:</b> '+esc(f.siteName)+'<br>':'')+
        (f.address?'<b>Address:</b> '+esc(f.address)+'<br>':'')+
        (f.building?'<b>Building:</b> '+esc(f.building)+' / '+esc(f.room||'—')+'<br>':'')+
        (f.gps?'<b>GPS:</b> '+esc(f.gps)+'<br>':'')+
        (f.access?'<b>Access:</b> '+esc(f.access):'')
      )+
      summaryBox('🌐','Network & WAN',
        (f.isp?'<b>ISP:</b> '+esc(f.isp)+'<br>':'')+
        (f.circuit?'<b>Circuit:</b> '+esc(f.circuit)+'<br>':'')+
        (f.wanip?'<b>WAN IP:</b> <span style="font-family:monospace">'+esc(f.wanip)+'</span><br>':'')+
        (f.bw?'<b>Bandwidth:</b> '+esc(f.bw)+'<br>':'')+
        (f.ssid?'<b>SSIDs:</b> '+esc(f.ssid)+'<br>':'')+
        (f.vlans?'<b>VLANs:</b> '+esc(f.vlans):'')
      )+
      summaryBox('🔌','Equipment',
        '<b>Devices inventoried:</b> '+S.equip.length+'<br>'+
        '<b>Racks documented:</b> '+S.racks.length+'<br>'+
        '<b>Photos taken:</b> '+S.photos.length+'<br>'+
        '<b>Contacts recorded:</b> '+S.contacts.length
      )+
      summaryBox('📝','Key Findings',
        (f.issues?'<b>Issues identified</b><br><span style="color:#666">'+esc(f.issues).substring(0,200)+(f.issues.length>200?'…':'')+'</span>':'<span style="color:#888">No issues recorded</span>')
      )+
    '</div>'
  )+

  // ── SITE INFORMATION ──
  section(2,'Site & Location Details',
    '<table><tbody>'+
      row('Site name',f.siteName)+row('Address',f.address)+row('Floor / area',f.floor)+
      row('Site type',f.type)+row('Building',f.building)+row('Room / zone',f.room)+
      row('GPS coordinates',f.gps)+row('Nearest landmark',f.access)+
    '</tbody></table>'+
    (f.notes?'<div class="notes-block"><div class="notes-lbl">Floor plan / notes</div>'+esc(f.notes)+'</div>':'')
  )+

  // ── NETWORK DETAILS ──
  (f.isp||f.wanip?section(3,'WAN & Network Configuration',
    '<table><tbody>'+
      row('ISP / carrier',f.isp)+row('Circuit ID',f.circuit)+row('WAN IP address',f.wanip)+
      row('Bandwidth',f.bw)+row('SSID(s)',f.ssid)+row('Security protocol',f.security)+
      row('VLANs',f.vlans)+row('DNS servers',f.dns)+
    '</tbody></table>'
  ):'')+ 

  // ── EQUIPMENT ──
  (S.equip.length?section(4,'Equipment Inventory',
    '<table><thead><tr><th>Device</th><th>Model</th><th>IP Address</th><th>Serial</th><th>Location</th><th>Notes</th></tr></thead>'+
    '<tbody>'+equipRows+'</tbody></table>'
  ):'')+

  // ── RACK LAYOUT ──
  (S.racks.length?section(5,'Rack Layout',
    '<div style="overflow-x:auto">'+rackHtml+'</div>'
  ):'')+

  // ── PHOTOS ──
  (S.photos.length?section(6,'Site Photos',
    '<p style="font-size:10pt;color:#475569;margin-bottom:16px">'+S.photos.length+' photo'+( S.photos.length===1?'':'s')+' captured'+(S.photos.filter(function(p){return p.lat;}).length?' · '+S.photos.filter(function(p){return p.lat;}).length+' with GPS':'')+(S.photos.filter(function(p){return p.marked;}).length?' · '+S.photos.filter(function(p){return p.marked;}).length+' annotated':'')+'</p>'+
    S.photos.map(function(p,idx){
      var display=p.marked||p.src;
      var isEven=idx%2===0;
      return '<div style="display:flex;gap:0;margin-bottom:24px;page-break-inside:avoid;border:1px solid #E2E8F0;border-radius:10px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.06)">'+
        '<div style="width:320px;flex-shrink:0;background:#000;overflow:hidden">'+
          '<img src="'+display+'" style="width:320px;height:220px;object-fit:cover;display:block;-webkit-print-color-adjust:exact;print-color-adjust:exact">'+
        '</div>'+
        '<div style="flex:1;padding:18px 20px;background:#fff;display:flex;flex-direction:column;justify-content:center">'+
          '<div style="font-size:11pt;font-weight:700;color:#001E3C;margin-bottom:10px">'+(p.caption?esc(p.caption):'<span style=\"color:#94A3B8;font-style:italic\">No caption</span>')+'</div>'+
          '<table style="border:none;margin:0;font-size:9pt"><tbody>'+
            (p.lat?'<tr><td style="border:none;padding:3px 0;color:#64748B;font-weight:600;width:90px">GPS</td><td style="border:none;padding:3px 0;font-family:monospace;color:#334155">'+p.lat.toFixed(5)+', '+p.lng.toFixed(5)+'</td></tr>':'')+
            '<tr><td style="border:none;padding:3px 0;color:#64748B;font-weight:600">Captured</td><td style="border:none;padding:3px 0;color:#334155">'+new Date(p.ts).toLocaleString()+'</td></tr>'+
            (p.marked?'<tr><td style="border:none;padding:3px 0;color:#64748B;font-weight:600">Markup</td><td style="border:none;padding:3px 0;color:#00B7D9;font-weight:600">✏ Annotated</td></tr>':'')+
          '</tbody></table>'+
          (p.lat?'<a href="https://maps.google.com/?q='+p.lat+','+p.lng+'" style="font-size:9pt;color:#00B7D9;margin-top:8px;display:block">📍 View on Google Maps</a>':'')+
        '</div>'+
      '</div>';
    }).join('')
  ):'')+

    // ── FINDINGS ──
  section(7,'Findings & Recommendations',
    (f.issues?'<div class="finding-block issue"><div class="finding-lbl">🔍 Issues Identified</div><div class="finding-text">'+esc(f.issues)+'</div></div>':'')+
    (f.recs?'<div class="finding-block rec"><div class="finding-lbl">💡 Recommendations</div><div class="finding-text">'+esc(f.recs)+'</div></div>':'')+
    '<div style="margin-top:16px;display:flex;align-items:center;gap:12px;flex-wrap:wrap">'+
      '<span style="font-size:13px;font-weight:600;color:#334155">Follow-up required:</span>'+
      '<span style="padding:4px 16px;border-radius:100px;font-size:12px;font-weight:700;background:'+
        ({'Yes — Urgent':'#FEE2E2','Yes — Scheduled':'#FEF3C7','No':'#DCFCE7'}[S.followup]||'#F1F5F9')+
        ';color:'+({'Yes — Urgent':'#991B1B','Yes — Scheduled':'#92400E','No':'#166534'}[S.followup]||'#475569')+
      '">'+(S.followup||'Not specified')+'</span>'+
      (f.completion?'<span style="font-size:13px;color:#475569">Est. completion: <b>'+esc(f.completion)+'</b></span>':'')+
    '</div>'+
    (f.addnotes?'<div class="notes-block" style="margin-top:16px"><div class="notes-lbl">Additional notes</div>'+esc(f.addnotes)+'</div>':'')+
    (contactRows?'<h3 style="font-size:14px;font-weight:700;color:#003A5D;margin:20px 0 10px">Key Contacts</h3>'+
      '<table><thead><tr><th>Name</th><th>Role</th><th>Phone</th><th>Email</th></tr></thead>'+
      '<tbody>'+contactRows+'</tbody></table>':'')
  )+
  '<div class="report-footer">'+
    '<span>Survey ID: '+esc(S.id)+'</span>'+
    '<span>Generated: '+now+'</span>'+
    '<span>NetSurvey IT Field Tool</span>'+
  '</div>'+
  '</body></html>';
}

function section(num,title,content){
  return '<div class="section">'+
    '<div class="section-hdr"><span class="section-num">'+num+'</span><span class="section-title">'+title+'</span></div>'+
    content+
  '</div>';
}

function summaryBox(icon,title,content){
  return '<div class="summary-box">'+
    '<div class="summary-box-title">'+icon+' '+title+'</div>'+
    '<div class="summary-box-body">'+content+'</div>'+
  '</div>';
}

function reportCSS(statusColor,statusBg){
  return [
    '*{box-sizing:border-box;margin:0;padding:0}',
    'body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;font-size:11pt;color:#1e293b;background:#fff;line-height:1.6}',

    // Cover
    '.cover{min-height:100vh;display:flex;flex-direction:column;background:#001E3C;color:#fff;page-break-after:always}',
    '.cover-band{height:6px;background:linear-gradient(90deg,#00B7D9,#6FC4EB)}',
    '.cover-body{flex:1;padding:50px 56px;display:flex;flex-direction:column;justify-content:center}',
    '.cover-logo{display:flex;align-items:center;gap:14px;margin-bottom:40px}',
    '.cover-logo-n{width:48px;height:48px;background:#00B7D9;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:900;color:#001E3C}',
    '.cover-logo-title{font-size:18px;font-weight:800;color:#fff;letter-spacing:.5px}',
    '.cover-logo-sub{font-size:10px;color:#6FC4EB;text-transform:uppercase;letter-spacing:2px;margin-top:2px}',
    '.cover-divider{width:60px;height:3px;background:#00B7D9;margin:0 0 28px}',
    '.cover-type{font-size:11px;color:#6FC4EB;text-transform:uppercase;letter-spacing:3px;font-weight:600;margin-bottom:12px}',
    '.cover-sitename{font-size:34px;font-weight:900;color:#fff;line-height:1.15;margin-bottom:8px;letter-spacing:-.5px}',
    '.cover-address{font-size:14px;color:rgba(255,255,255,.5);margin-bottom:44px}',
    '.cover-meta{display:grid;grid-template-columns:repeat(3,1fr);gap:20px 32px}',
    '.meta-box{}',
    '.meta-label{font-size:9px;color:#6FC4EB;text-transform:uppercase;letter-spacing:1.5px;font-weight:600;margin-bottom:5px}',
    '.meta-val{font-size:13px;color:#fff;font-weight:500}',
    '.cover-footer{padding:18px 56px;border-top:1px solid rgba(255,255,255,.08);display:flex;justify-content:space-between;font-size:10px;color:rgba(255,255,255,.3)}',

    // Sections
    '.section{padding:36px 48px;page-break-before:always}',
    '.section-hdr{display:flex;align-items:center;gap:12px;margin-bottom:22px;padding-bottom:12px;border-bottom:2px solid #003A5D}',
    '.section-num{width:30px;height:30px;background:#003A5D;border-radius:7px;display:flex;align-items:center;justify-content:center;color:#00B7D9;font-size:14px;font-weight:800;flex-shrink:0}',
    '.section-title{font-size:18px;font-weight:800;color:#001E3C;letter-spacing:-.3px}',

    // Summary grid
    '.summary-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}',
    '.summary-box{border:1px solid #E2E8F0;border-radius:8px;overflow:hidden}',
    '.summary-box-title{background:#F8FAFC;padding:9px 14px;font-size:11px;font-weight:700;color:#003A5D;border-bottom:1px solid #E2E8F0}',
    '.summary-box-body{padding:12px 14px;font-size:11px;color:#475569;line-height:1.8}',

    // Tables
    'table{width:100%;border-collapse:collapse;font-size:10.5pt;margin-bottom:4px}',
    'thead tr{background:#003A5D}',
    'thead th{padding:8px 12px;text-align:left;color:#fff;font-size:9px;text-transform:uppercase;letter-spacing:.8px;font-weight:700;white-space:nowrap}',
    'tbody tr:nth-child(even){background:#F8FAFC}',
    'tbody td{padding:8px 12px;border-bottom:1px solid #F1F5F9;vertical-align:top}',
    'td.lbl{font-weight:600;color:#003A5D;width:28%;white-space:nowrap}',

    // Notes
    '.notes-block{background:#F8FAFC;border-left:3px solid #003A5D;padding:10px 14px;border-radius:0 6px 6px 0;margin-top:12px;font-size:10.5pt;white-space:pre-wrap;color:#334155}',
    '.notes-lbl{font-size:9px;font-weight:700;color:#6FC4EB;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px}',

    // Findings
    '.finding-block{border-radius:8px;padding:14px 18px;margin-bottom:14px}',
    '.finding-block.issue{background:#FEF2F2;border:1px solid #FCA5A5}',
    '.finding-block.rec{background:#F0FDF4;border:1px solid #86EFAC}',
    '.finding-lbl{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;color:#475569}',
    '.finding-text{font-size:10.5pt;color:#1e293b;white-space:pre-wrap;line-height:1.7}',

    // Footer
    '.report-footer{background:#F8FAFC;border-top:1px solid #E2E8F0;padding:14px 48px;display:flex;justify-content:space-between;font-size:9px;color:#94A3B8}',

    // Print
    '@media print{',
    '.cover{page-break-after:always;-webkit-print-color-adjust:exact;print-color-adjust:exact}',
    '.section{page-break-before:always;-webkit-print-color-adjust:exact;print-color-adjust:exact}',
    'tr,td{page-break-inside:avoid}',
    '.summary-grid{page-break-inside:avoid}',
    '}'
  ].join('\n');
}
