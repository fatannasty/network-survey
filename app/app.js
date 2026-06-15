// ── State ──
let state = {
  surveyId: '',
  signalLevel: 0,
  statusVal: '',
  equipment: [],
  futureItems: [],
  contacts: [],
  futureCounts: { cisco: 0, arista: 0, other: 0 },
  activeVendor: null,
  currentSection: 'site-info',
};

const SECTIONS = ['site-info','location','existing-eq','cabling','future-eq','contacts','findings'];
const SIGNAL_LABELS = ['','Very poor','Poor','Fair','Good','Excellent'];
let autoSaveTimer = null;

// ── Init ──
window.addEventListener('DOMContentLoaded', () => {
  generateSurveyId();
  document.getElementById('survey-date').value = new Date().toISOString().split('T')[0];
  addEquipmentRow();
  addContact();
  updateProgress();
  loadFromStorage();
  // Sidebar nav
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      goToSection(link.dataset.section);
      if (window.innerWidth <= 900) closeSidebar();
    });
  });
  document.getElementById('menu-btn').addEventListener('click', openSidebar);
  document.getElementById('sidebar-close').addEventListener('click', closeSidebar);
});

// ── Survey ID ──
function generateSurveyId() {
  const d = new Date();
  const id = `NSS-${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${Math.floor(1000+Math.random()*8999)}`;
  state.surveyId = id;
  document.getElementById('survey-id-display').textContent = id;
}

// ── Navigation ──
function goToSection(sectionId) {
  SECTIONS.forEach(id => {
    document.getElementById(id).classList.toggle('active-section', id === sectionId);
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.dataset.section === sectionId);
  });
  state.currentSection = sectionId;
  document.getElementById('main').scrollTo({ top: 0, behavior: 'smooth' });
  window.scrollTo({ top: 0, behavior: 'smooth' });
  updateProgress();
}

function updateProgress() {
  const idx = SECTIONS.indexOf(state.currentSection);
  const pct = Math.round(((idx + 1) / SECTIONS.length) * 100);
  document.getElementById('progress-bar').style.width = pct + '%';
}

// ── Sidebar ──
function openSidebar() {
  document.getElementById('sidebar').classList.add('open');
  document.getElementById('overlay').classList.add('open');
}
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('overlay').classList.remove('open');
}

// ── Pills ──
function togglePill(el, groupId) {
  const group = document.getElementById(groupId);
  const val = el.dataset.val;
  const wasActive = el.classList.contains('active-' + val);
  group.querySelectorAll('.pill').forEach(p => p.className = 'pill');
  if (!wasActive) {
    el.classList.add('active-' + val);
    state.statusVal = val;
  } else {
    state.statusVal = '';
  }
  autoSave();
}

// ── Signal ──
function setSignal(n) {
  state.signalLevel = state.signalLevel === n ? 0 : n;
  document.querySelectorAll('.signal-bar').forEach((b, i) => {
    b.classList.toggle('active', i < state.signalLevel);
  });
  document.getElementById('signal-label').textContent = state.signalLevel ? SIGNAL_LABELS[state.signalLevel] : '';
  autoSave();
}

// ── Existing Equipment Table ──
let eqCount = 0;
const EQ_TYPES = ['Router','Switch (managed)','Switch (unmanaged)','Wireless AP','Firewall','Modem','NAS / server','UPS','Patch panel','Other'];

function addEquipmentRow(data = {}) {
  eqCount++;
  const id = 'eq-' + eqCount;
  const typeOpts = EQ_TYPES.map(t => `<option ${t===data.type?'selected':''}>${t}</option>`).join('');
  const tr = document.createElement('tr');
  tr.id = id;
  tr.innerHTML = `
    <td><input type="text" value="${data.hostname||''}" placeholder="Hostname / label" oninput="autoSave()"></td>
    <td><select onchange="autoSave()">${typeOpts}</select></td>
    <td><input type="text" value="${data.model||''}" placeholder="Make / model" oninput="autoSave()"></td>
    <td><input type="text" value="${data.ip||''}" placeholder="IP or MAC" oninput="autoSave()"></td>
    <td><button class="row-del" onclick="removeEl('${id}')" aria-label="Remove">&#10005;</button></td>
  `;
  document.getElementById('eq-tbody').appendChild(tr);
}

// ── Contacts ──
let ctCount = 0;
const CT_ROLES = ['IT Admin','Network Engineer','Site Manager','Facilities','ISP Contact','Security','Other'];

function addContact(data = {}) {
  ctCount++;
  const id = 'ct-' + ctCount;
  const roleOpts = CT_ROLES.map(r => `<option ${r===data.role?'selected':''}>${r}</option>`).join('');
  const div = document.createElement('div');
  div.className = 'contact-card';
  div.id = id;
  div.innerHTML = `
    <button class="contact-remove" onclick="removeEl('${id}')" aria-label="Remove contact">&#10005;</button>
    <div class="field-grid col3" style="margin-bottom:12px;">
      <div class="field-group"><label>Name</label><input type="text" value="${data.name||''}" placeholder="Full name" oninput="autoSave()"></div>
      <div class="field-group"><label>Role</label><select onchange="autoSave()">${roleOpts}</select></div>
      <div class="field-group"><label>Phone</label><input type="tel" value="${data.phone||''}" placeholder="+1 (___) ___-____" oninput="autoSave()"></div>
    </div>
    <div class="field-grid col2">
      <div class="field-group"><label>Email</label><input type="email" value="${data.email||''}" placeholder="name@company.com" oninput="autoSave()"></div>
      <div class="field-group"><label>Availability</label><input type="text" value="${data.avail||''}" placeholder="e.g. Mon–Fri 8am–5pm" oninput="autoSave()"></div>
    </div>
  `;
  document.getElementById('contacts-list').appendChild(div);
}

// ── Vendor / Future Equipment ──
function setVendor(v) {
  state.activeVendor = state.activeVendor === v ? null : v;
  ['cisco','arista','other'].forEach(x => {
    document.getElementById('vtab-' + x).className = 'vtab' + (state.activeVendor === x ? ' active-' + x : '');
  });
  renderVendorForm();
}

function renderVendorForm() {
  const f = document.getElementById('vendor-form');
  if (!state.activeVendor) { f.innerHTML = ''; return; }
  const v = state.activeVendor;

  if (v === 'cisco') {
    f.innerHTML = `
      <div class="vendor-form-inner">
        <div class="field-grid col3" style="margin-bottom:8px;">
          <div class="field-group"><label>Category</label>
            <select id="cisco-cat" onchange="updateCiscoModels()">
              <option value="switches">Switches</option>
              <option value="aps">Access points</option>
              <option value="routers">Routers</option>
            </select>
          </div>
          <div class="field-group"><label>Model</label>
            <select id="cisco-model" onchange="updateCiscoSpecs()"></select>
          </div>
          <div class="field-group"><label>Qty</label>
            <input type="number" id="cisco-qty" min="1" value="1">
          </div>
        </div>
        <div id="cisco-specs"></div>
        <p id="cisco-desc" class="model-desc"></p>
        <div class="field-grid col2" style="margin-bottom:10px;">
          <div class="field-group"><label>Install location</label><input type="text" id="cisco-loc" placeholder="e.g. IDF-2, rack unit 4"></div>
          <div class="field-group"><label>Notes</label><input type="text" id="cisco-notes" placeholder="Optional"></div>
        </div>
        <button class="btn btn-primary" onclick="addFutureEq('cisco')">+ Add to list</button>
      </div>`;
    updateCiscoModels();

  } else if (v === 'arista') {
    f.innerHTML = `
      <div class="vendor-form-inner">
        <div class="field-grid col3" style="margin-bottom:8px;">
          <div class="field-group"><label>Category</label>
            <select id="arista-cat" onchange="updateAristaModels()">
              <option value="switches">Switches</option>
              <option value="velo">VeloCloud SD-WAN</option>
              <option value="aps">Access points</option>
            </select>
          </div>
          <div class="field-group"><label>Model</label>
            <select id="arista-model" onchange="updateAristaSpecs()"></select>
          </div>
          <div class="field-group"><label>Qty</label>
            <input type="number" id="arista-qty" min="1" value="1">
          </div>
        </div>
        <div id="arista-specs"></div>
        <p id="arista-desc" class="model-desc"></p>
        <div class="field-grid col2" style="margin-bottom:10px;">
          <div class="field-group"><label>Install location</label><input type="text" id="arista-loc" placeholder="e.g. Core rack, slot 2"></div>
          <div class="field-group"><label>Notes</label><input type="text" id="arista-notes" placeholder="Optional"></div>
        </div>
        <button class="btn btn-primary" onclick="addFutureEq('arista')">+ Add to list</button>
      </div>`;
    updateAristaModels();

  } else {
    f.innerHTML = `
      <div class="vendor-form-inner">
        <div class="field-grid col3" style="margin-bottom:10px;">
          <div class="field-group"><label>Vendor / Make</label><input type="text" id="other-vendor" placeholder="e.g. Juniper"></div>
          <div class="field-group"><label>Model</label><input type="text" id="other-model" placeholder="Model number"></div>
          <div class="field-group"><label>Qty</label><input type="number" id="other-qty" min="1" value="1"></div>
        </div>
        <div class="field-grid col3" style="margin-bottom:10px;">
          <div class="field-group"><label>Device type</label>
            <select id="other-type"><option>Switch</option><option>Access point</option><option>Router</option><option>Firewall</option><option>UPS</option><option>Server</option><option>Other</option></select>
          </div>
          <div class="field-group"><label>Port density</label><input type="text" id="other-ports" placeholder="e.g. 48x 1G + 4x SFP+"></div>
          <div class="field-group"><label>Install location</label><input type="text" id="other-loc" placeholder="e.g. MDF rack 1"></div>
        </div>
        <div class="field-group" style="margin-bottom:10px;"><label>Notes</label><input type="text" id="other-notes" placeholder="Optional"></div>
        <button class="btn btn-primary" onclick="addFutureEq('other')">+ Add to list</button>
      </div>`;
  }
}

function buildOpts(arr) {
  return arr.map(m => `<option value="${m.model}">${m.model}</option>`).join('');
}

function updateCiscoModels() {
  const cat = document.getElementById('cisco-cat').value;
  document.getElementById('cisco-model').innerHTML = buildOpts(CISCO[cat]);
  updateCiscoSpecs();
}
function updateCiscoSpecs() {
  const cat = document.getElementById('cisco-cat').value;
  const val = document.getElementById('cisco-model').value;
  document.getElementById('cisco-specs').innerHTML = getSpecChips('cisco', cat, val);
  document.getElementById('cisco-desc').textContent = getItemDesc('cisco', cat, val);
}
function updateAristaModels() {
  const cat = document.getElementById('arista-cat').value;
  document.getElementById('arista-model').innerHTML = buildOpts(ARISTA[cat]);
  updateAristaSpecs();
}
function updateAristaSpecs() {
  const cat = document.getElementById('arista-cat').value;
  const val = document.getElementById('arista-model').value;
  document.getElementById('arista-specs').innerHTML = getSpecChips('arista', cat, val);
  document.getElementById('arista-desc').textContent = getItemDesc('arista', cat, val);
}

let futureCount = 0;
function addFutureEq(vendor) {
  futureCount++;
  const fid = 'feq-' + futureCount;
  let label, model, qty, loc, notes, specHtml = '', desc = '';

  if (vendor === 'cisco') {
    const cat = document.getElementById('cisco-cat').value;
    model = document.getElementById('cisco-model').value;
    qty   = document.getElementById('cisco-qty').value || '1';
    loc   = document.getElementById('cisco-loc').value;
    notes = document.getElementById('cisco-notes').value;
    label = cat === 'aps' ? 'Cisco AP' : cat === 'routers' ? 'Cisco Router' : 'Cisco Switch';
    specHtml = getSpecChips('cisco', cat, model);
    desc = getItemDesc('cisco', cat, model);
  } else if (vendor === 'arista') {
    const cat = document.getElementById('arista-cat').value;
    model = document.getElementById('arista-model').value;
    qty   = document.getElementById('arista-qty').value || '1';
    loc   = document.getElementById('arista-loc').value;
    notes = document.getElementById('arista-notes').value;
    label = cat === 'velo' ? 'VeloCloud SD-WAN' : cat === 'aps' ? 'Arista AP' : 'Arista Switch';
    specHtml = getSpecChips('arista', cat, model);
    desc = getItemDesc('arista', cat, model);
  } else {
    const ov = document.getElementById('other-vendor').value || 'Unknown';
    const om = document.getElementById('other-model').value || '—';
    model = ov + ' ' + om;
    qty   = document.getElementById('other-qty').value || '1';
    loc   = document.getElementById('other-loc').value;
    notes = document.getElementById('other-notes').value;
    const ports = document.getElementById('other-ports').value;
    label = document.getElementById('other-type').value;
    if (ports) specHtml = `<div class="spec-chips"><span class="spec-chip">&#128268; ${ports}</span></div>`;
  }

  state.futureCounts[vendor]++;
  updateChips();

  const div = document.createElement('div');
  div.className = `future-item ${vendor}`;
  div.id = fid;
  div.innerHTML = `
    <div class="future-item-header">
      <span class="vendor-tag tag-${vendor}">${label}</span>
      <button class="btn btn-danger" style="padding:5px 10px;font-size:12px;" onclick="removeFuture('${fid}','${vendor}')">&#10005; Remove</button>
    </div>
    <div class="field-grid col3">
      <div class="field-group"><label>Model</label><input type="text" value="${model}" oninput="autoSave()"></div>
      <div class="field-group"><label>Qty</label><input type="number" value="${qty}" min="1" oninput="autoSave()"></div>
      <div class="field-group"><label>Install location</label><input type="text" value="${loc}" placeholder="Location" oninput="autoSave()"></div>
    </div>
    ${specHtml}
    ${desc ? `<p class="model-desc">${desc}</p>` : ''}
    ${notes ? `<p class="model-desc" style="margin-top:4px;">Note: ${notes}</p>` : ''}
  `;
  document.getElementById('future-list').appendChild(div);
  autoSave();
}

function removeFuture(id, vendor) {
  const el = document.getElementById(id);
  if (el) {
    el.remove();
    state.futureCounts[vendor] = Math.max(0, state.futureCounts[vendor] - 1);
    updateChips();
    autoSave();
  }
}

function updateChips() {
  document.getElementById('chip-cisco').textContent  = `Cisco: ${state.futureCounts.cisco}`;
  document.getElementById('chip-arista').textContent = `Arista / VeloCloud: ${state.futureCounts.arista}`;
  document.getElementById('chip-other').textContent  = `Other: ${state.futureCounts.other}`;
}

function removeEl(id) {
  const el = document.getElementById(id);
  if (el) { el.remove(); autoSave(); }
}

// ── Auto Save ──
function autoSave() {
  clearTimeout(autoSaveTimer);
  document.getElementById('save-status').textContent = 'Unsaved changes…';
  autoSaveTimer = setTimeout(() => saveSurvey(true), 1500);
}

// ── Save / Load ──
function gatherFormData() {
  const g = id => (document.getElementById(id) || {}).value || '';
  return {
    surveyId: state.surveyId,
    siteName: g('site-name'), surveyDate: g('survey-date'), surveyedBy: g('surveyed-by'),
    ticketNum: g('ticket-num'), siteAddress: g('site-address'), floorArea: g('floor-area'),
    siteType: g('site-type'), networkStatus: state.statusVal, signalLevel: state.signalLevel,
    building: g('building'), roomZone: g('room-zone'), gps: g('gps'), landmark: g('landmark'),
    accessInstructions: g('access-instructions'), floorplanNotes: g('floorplan-notes'),
    isp: g('isp'), circuitId: g('circuit-id'), wanIp: g('wan-ip'), bandwidth: g('bandwidth'),
    ssids: g('ssids'), securityProto: g('security-proto'), vlans: g('vlans'), dns: g('dns'),
    cableType: g('cable-type'), totalPorts: g('total-ports'), activePorts: g('active-ports'),
    patchPanel: g('patch-panel'), mdfIdf: g('mdf-idf'), cablingNotes: g('cabling-notes'),
    installDate: g('install-date'), installPriority: g('install-priority'),
    installer: g('installer'), poRef: g('po-ref'), installNotes: g('install-notes'),
    issues: g('issues'), recommendations: g('recommendations'), followup: g('followup'),
    estCompletion: g('est-completion'), extraNotes: g('extra-notes'),
    futureCounts: state.futureCounts,
    savedAt: new Date().toISOString(),
  };
}

function saveSurvey(silent = false) {
  const data = gatherFormData();
  try {
    localStorage.setItem('netsurvey_' + state.surveyId, JSON.stringify(data));
    localStorage.setItem('netsurvey_latest', state.surveyId);
    if (!silent) showToast('Survey saved ✓');
    document.getElementById('save-status').textContent = 'Saved ' + new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});
  } catch(e) {
    showToast('Save failed – storage full');
  }
}

function loadFromStorage() {
  const latestId = localStorage.getItem('netsurvey_latest');
  if (!latestId) return;
  const raw = localStorage.getItem('netsurvey_' + latestId);
  if (!raw) return;
  try {
    const d = JSON.parse(raw);
    state.surveyId = d.surveyId || state.surveyId;
    document.getElementById('survey-id-display').textContent = state.surveyId;
    const set = (id, val) => { const el = document.getElementById(id); if (el && val) el.value = val; };
    set('site-name', d.siteName); set('survey-date', d.surveyDate); set('surveyed-by', d.surveyedBy);
    set('ticket-num', d.ticketNum); set('site-address', d.siteAddress); set('floor-area', d.floorArea);
    set('site-type', d.siteType);
    if (d.signalLevel) setSignal(d.signalLevel);
    if (d.networkStatus) {
      const pill = document.querySelector(`[data-val="${d.networkStatus}"]`);
      if (pill) togglePill(pill, 'status-pills');
    }
    set('building', d.building); set('room-zone', d.roomZone); set('gps', d.gps);
    set('landmark', d.landmark); set('access-instructions', d.accessInstructions);
    set('floorplan-notes', d.floorplanNotes);
    set('isp', d.isp); set('circuit-id', d.circuitId); set('wan-ip', d.wanIp);
    set('bandwidth', d.bandwidth); set('ssids', d.ssids); set('security-proto', d.securityProto);
    set('vlans', d.vlans); set('dns', d.dns);
    set('cable-type', d.cableType); set('total-ports', d.totalPorts); set('active-ports', d.activePorts);
    set('patch-panel', d.patchPanel); set('mdf-idf', d.mdfIdf); set('cabling-notes', d.cablingNotes);
    set('install-date', d.installDate); set('install-priority', d.installPriority);
    set('installer', d.installer); set('po-ref', d.poRef); set('install-notes', d.installNotes);
    set('issues', d.issues); set('recommendations', d.recommendations);
    set('followup', d.followup); set('est-completion', d.estCompletion); set('extra-notes', d.extraNotes);
    if (d.futureCounts) {
      state.futureCounts = d.futureCounts;
      updateChips();
    }
    document.getElementById('save-status').textContent = 'Loaded ' + new Date(d.savedAt).toLocaleDateString();
  } catch(e) { console.warn('Load failed', e); }
}

function newSurvey() {
  if (!confirm('Start a new survey? Current data will be cleared.')) return;
  localStorage.removeItem('netsurvey_latest');
  location.reload();
}

// ── Export ──
function exportTXT() {
  const d = gatherFormData();
  const lines = [
    '=== NETWORK SITE SURVEY ===',
    `Survey ID: ${d.surveyId}`,
    `Date: ${d.surveyDate}   Surveyed by: ${d.surveyedBy}`,
    '',
    '--- SITE ---',
    `Name: ${d.siteName}`,
    `Address: ${d.siteAddress}`,
    `Floor/Area: ${d.floorArea}   Type: ${d.siteType}`,
    `Status: ${d.networkStatus}   Signal: ${SIGNAL_LABELS[d.signalLevel] || 'N/A'}`,
    '',
    '--- LOCATION ---',
    `Building: ${d.building}   Room/Zone: ${d.roomZone}`,
    `GPS: ${d.gps}   Landmark: ${d.landmark}`,
    `Access: ${d.accessInstructions}`,
    `Notes: ${d.floorplanNotes}`,
    '',
    '--- NETWORK ---',
    `ISP: ${d.isp}   Circuit: ${d.circuitId}`,
    `WAN IP: ${d.wanIp}   Bandwidth: ${d.bandwidth}`,
    `SSIDs: ${d.ssids}   Security: ${d.securityProto}`,
    `VLANs: ${d.vlans}   DNS: ${d.dns}`,
    '',
    '--- CABLING ---',
    `Cable type: ${d.cableType}   Total ports: ${d.totalPorts}   Active: ${d.activePorts}`,
    `Patch panel: ${d.patchPanel}   MDF/IDF: ${d.mdfIdf}`,
    `Notes: ${d.cablingNotes}`,
    '',
    '--- PLANNED EQUIPMENT ---',
    `Cisco items: ${d.futureCounts.cisco}`,
    `Arista/VeloCloud items: ${d.futureCounts.arista}`,
    `Other items: ${d.futureCounts.other}`,
    `Install date: ${d.installDate}   Priority: ${d.installPriority}`,
    `Installer: ${d.installer}   PO: ${d.poRef}`,
    `Notes: ${d.installNotes}`,
    '',
    '--- FINDINGS ---',
    `Issues: ${d.issues}`,
    `Recommendations: ${d.recommendations}`,
    `Follow-up: ${d.followup}   Est. completion: ${d.estCompletion}`,
    `Notes: ${d.extraNotes}`,
    '',
    `Exported: ${new Date().toLocaleString()}`,
  ];
  downloadFile(lines.join('\n'), `${d.surveyId}.txt`, 'text/plain');
}

function exportJSON() {
  const d = gatherFormData();
  downloadFile(JSON.stringify(d, null, 2), `${d.surveyId}.json`, 'application/json');
}

function exportPDF() {
  window.print();
}

function downloadFile(content, filename, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

// ── Toast ──
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2400);
}
