// ══════════════════════════════════════════════════════
//  PDF Report Generator — opens a print-ready window
// ══════════════════════════════════════════════════════

window.generatePDFReport = function() {
  _sectionNum = 0;
  var d = window.gatherFormData ? gatherFormData() : {};
  var racks = window.rsGetData ? rsGetData() : [];
  var mapperData = window.SwitchMapper ? SwitchMapper.getData() : {devices:[], cables:[]};

  var html = buildReportHTML(d, racks, mapperData);
  var win = window.open('', '_blank', 'width=900,height=700,scrollbars=yes');
  if (!win) { if(window.showToast) showToast('Allow pop-ups to generate PDF'); return; }
  win.document.write(html);
  win.document.close();
  win.focus();
  setTimeout(function(){ win.print(); }, 600);
};

function buildReportHTML(d, racks, mapperData) {
  var date = d.surveyDate || new Date().toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'});
  var now  = new Date().toLocaleString('en-US',{year:'numeric',month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'});

  return '<!DOCTYPE html><html lang="en"><head>' +
  '<meta charset="UTF-8">' +
  '<title>Network Site Survey Report — ' + (d.siteName||'Untitled') + '</title>' +
  '<style>' + reportCSS() + '</style>' +
  '</head><body>' +
  coverPage(d, date, now) +
  sectionPage('Site Information', siteInfoTable(d)) +
  (d.building||d.roomZone||d.gps ? sectionPage('Location & Access', locationTable(d)) : '') +
  (d.isp||d.wanIp||d.bandwidth ? sectionPage('WAN / Network Details', networkTable(d)) : '') +
  (racks && racks.length ? sectionPage('Rack Layout', racksHTML(racks)) : '') +
  (mapperData.devices && mapperData.devices.length ? sectionPage('Equipment Port Map', mapperHTML(mapperData)) : '') +
  (d.futureCounts && (d.futureCounts.cisco||d.futureCounts.arista||d.futureCounts.other) ? sectionPage('Planned Equipment', plannedHTML(d)) : '') +
  (d.issues||d.recommendations ? sectionPage('Findings & Recommendations', findingsHTML(d)) : '') +
  '</body></html>';
}

// ── CSS ───────────────────────────────────────────────
function reportCSS() {
  return [
    '*{box-sizing:border-box;margin:0;padding:0}',
    'body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;font-size:11pt;color:#1a1a2e;background:#fff;line-height:1.5}',

    /* Cover */
    '.cover{min-height:100vh;display:flex;flex-direction:column;background:#001E3C;color:#fff;page-break-after:always}',
    '.cover-top{background:#003A5D;padding:28pt 36pt 24pt;display:flex;align-items:center;justify-content:space-between}',
    '.cover-logo{display:flex;align-items:center;gap:12pt}',
    '.cover-logo-icon{width:44pt;height:44pt;background:#00B7D9;border-radius:10pt;display:flex;align-items:center;justify-content:center;font-size:22pt;font-weight:900;color:#001E3C}',
    '.cover-logo-text{font-size:16pt;font-weight:800;color:#fff;letter-spacing:1pt}',
    '.cover-logo-sub{font-size:8pt;color:#6FC4EB;letter-spacing:2pt;text-transform:uppercase;margin-top:2pt}',
    '.cover-id{font-size:9pt;color:rgba(255,255,255,0.5);font-family:monospace}',
    '.cover-body{flex:1;padding:48pt 36pt;display:flex;flex-direction:column;justify-content:center}',
    '.cover-type{font-size:10pt;color:#00B7D9;letter-spacing:3pt;text-transform:uppercase;margin-bottom:14pt;font-weight:600}',
    '.cover-title{font-size:28pt;font-weight:800;color:#fff;line-height:1.2;margin-bottom:10pt;letter-spacing:-0.5pt}',
    '.cover-sub{font-size:13pt;color:rgba(255,255,255,0.55);margin-bottom:36pt}',
    '.cover-meta{display:grid;grid-template-columns:1fr 1fr;gap:16pt 32pt}',
    '.meta-item label{font-size:8pt;color:#6FC4EB;text-transform:uppercase;letter-spacing:1.5pt;display:block;margin-bottom:3pt}',
    '.meta-item span{font-size:11pt;color:#fff;font-weight:500}',
    '.cover-footer{padding:16pt 36pt;border-top:1px solid rgba(255,255,255,0.1);display:flex;justify-content:space-between;align-items:center}',
    '.cover-footer-note{font-size:8pt;color:rgba(255,255,255,0.3)}',

    /* Status badge */
    '.status-badge{display:inline-block;padding:2pt 10pt;border-radius:100pt;font-size:9pt;font-weight:700;text-transform:uppercase;letter-spacing:.5pt}',
    '.s-operational{background:#E6F4EC;color:#1B6B3A}',
    '.s-degraded{background:#FDF3E3;color:#854F0B}',
    '.s-offline{background:#FDEAEA;color:#CC0000}',

    /* Sections */
    '.section{page-break-before:always;padding:32pt 36pt}',
    '.section:first-of-type{page-break-before:avoid}',
    '.section-header{display:flex;align-items:center;gap:10pt;margin-bottom:20pt;padding-bottom:10pt;border-bottom:2pt solid #003A5D}',
    '.section-num{width:28pt;height:28pt;background:#003A5D;border-radius:6pt;display:flex;align-items:center;justify-content:center;color:#00B7D9;font-size:13pt;font-weight:800;flex-shrink:0}',
    '.section-title{font-size:17pt;font-weight:800;color:#001E3C;letter-spacing:-0.3pt}',

    /* Tables */
    'table{width:100%;border-collapse:collapse;margin-bottom:16pt;font-size:10pt}',
    'thead tr{background:#003A5D;color:#fff}',
    'thead th{padding:7pt 10pt;text-align:left;font-size:8pt;text-transform:uppercase;letter-spacing:.8pt;font-weight:700;white-space:nowrap}',
    'tbody tr:nth-child(even){background:#F7FAFC}',
    'tbody tr:hover{background:#EBF5FB}',
    'tbody td{padding:7pt 10pt;border-bottom:1pt solid #E8EEF4;vertical-align:top}',
    '.td-label{font-weight:600;color:#003A5D;width:30%;white-space:nowrap}',
    '.td-val{color:#1a1a2e}',
    '.mono{font-family:monospace;font-size:9pt}',

    /* Rack stencil */
    '.rack-grid{display:flex;gap:20pt;flex-wrap:wrap;align-items:flex-start}',
    '.rack-box{flex-shrink:0;width:220pt}',
    '.rack-hdr{background:#003A5D;color:#fff;padding:7pt 10pt;border-radius:4pt 4pt 0 0;display:flex;justify-content:space-between;align-items:center}',
    '.rack-hdr-name{font-size:11pt;font-weight:700}',
    '.rack-hdr-info{font-size:8pt;color:rgba(255,255,255,0.5)}',
    '.rack-body{border:1pt solid #CDD8E3;border-top:none;border-radius:0 0 4pt 4pt;overflow:hidden}',
    '.rack-row{display:flex;border-bottom:1pt solid #E8EEF4;height:18pt}',
    '.rack-u{width:22pt;background:#F0F4F8;border-right:1pt solid #E8EEF4;display:flex;align-items:center;justify-content:center;font-size:7pt;color:#94A3B8;font-family:monospace;flex-shrink:0}',
    '.rack-dev{flex:1;display:flex;align-items:center;padding:0 6pt;overflow:hidden}',
    '.rack-dev-name{font-size:8pt;font-weight:600;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
    '.rack-dev-model{font-size:7pt;color:rgba(255,255,255,0.5);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-left:4pt}',
    '.rack-empty{font-size:7pt;color:#CBD5E1}',

    /* Equipment port map */
    '.device-card{border:1pt solid #CDD8E3;border-radius:6pt;margin-bottom:14pt;page-break-inside:avoid;overflow:hidden}',
    '.device-card-hdr{padding:8pt 12pt;display:flex;justify-content:space-between;align-items:center}',
    '.device-name{font-size:11pt;font-weight:700;color:#fff}',
    '.device-model{font-size:9pt;color:rgba(255,255,255,0.6)}',
    '.device-cat-badge{font-size:8pt;padding:2pt 8pt;border-radius:3pt;background:rgba(0,0,0,0.2);color:#fff}',
    '.device-ports table{margin:0;font-size:9pt}',
    '.device-ports tbody tr:nth-child(even){background:#F7FAFC}',

    /* Planned equipment */
    '.planned-table td:first-child{font-weight:600;color:#003A5D}',

    /* Findings */
    '.findings-block{background:#F7FAFC;border-left:3pt solid #003A5D;padding:10pt 14pt;margin-bottom:12pt;border-radius:0 4pt 4pt 0}',
    '.findings-label{font-size:8pt;font-weight:700;text-transform:uppercase;letter-spacing:1pt;color:#6FC4EB;margin-bottom:6pt}',
    '.findings-text{font-size:10pt;color:#1a1a2e;white-space:pre-wrap;line-height:1.6}',

    /* Followup badge */
    '.followup-urgent{background:#FDEAEA;color:#CC0000;padding:3pt 10pt;border-radius:3pt;font-weight:700;font-size:9pt}',
    '.followup-scheduled{background:#FDF3E3;color:#854F0B;padding:3pt 10pt;border-radius:3pt;font-weight:700;font-size:9pt}',
    '.followup-no{background:#E6F4EC;color:#1B6B3A;padding:3pt 10pt;border-radius:3pt;font-weight:700;font-size:9pt}',

    /* Print */
    '@media print{',
    '  body{-webkit-print-color-adjust:exact;print-color-adjust:exact}',
    '  .cover{page-break-after:always}',
    '  .section{page-break-before:always}',
    '  .device-card{page-break-inside:avoid}',
    '  .rack-box{page-break-inside:avoid}',
    '}'
  ].join('\n');
}

// ── Cover page ────────────────────────────────────────
function coverPage(d, date, now) {
  var statusBadge = '';
  if (d.networkStatus) {
    var cls = {operational:'s-operational',degraded:'s-degraded',offline:'s-offline'}[d.networkStatus]||'s-operational';
    statusBadge = '<span class="status-badge '+cls+'">'+d.networkStatus+'</span>';
  }
  var signalStr = ['','Very poor','Poor','Fair','Good','Excellent'][d.signalLevel||0] || '—';

  return '<div class="cover">' +
    '<div class="cover-top">' +
      '<div class="cover-logo">' +
        '<div class="cover-logo-icon">N</div>' +
        '<div><div class="cover-logo-text">NetSurvey</div><div class="cover-logo-sub">IT Field Tool</div></div>' +
      '</div>' +
      '<div class="cover-id">' + (d.surveyId||'—') + '</div>' +
    '</div>' +
    '<div class="cover-body">' +
      '<div class="cover-type">Network Site Survey Report</div>' +
      '<div class="cover-title">' + (d.siteName||'Untitled Survey') + '</div>' +
      '<div class="cover-sub">' + (d.siteAddress||'Address not specified') + '</div>' +
      '<div class="cover-meta">' +
        metaItem('Survey Date', date) +
        metaItem('Surveyed By', d.surveyedBy||'—') +
        metaItem('Site Type', d.siteType||'—') +
        metaItem('Floor / Area', d.floorArea||'—') +
        metaItem('Network Status', statusBadge||d.networkStatus||'—') +
        metaItem('Signal Strength', signalStr) +
        (d.ticketNum ? metaItem('Ticket / Job #', d.ticketNum) : '') +
        metaItem('Report Generated', now) +
      '</div>' +
    '</div>' +
    '<div class="cover-footer">' +
      '<span class="cover-footer-note">Confidential — IT Infrastructure Survey</span>' +
      '<span class="cover-footer-note">Survey ID: ' + (d.surveyId||'—') + '</span>' +
    '</div>' +
  '</div>';
}

function metaItem(label, val) {
  return '<div class="meta-item"><label>' + label + '</label><span>' + (val||'—') + '</span></div>';
}

var _sectionNum = 0;
function sectionPage(title, content) {
  _sectionNum++;
  return '<div class="section">' +
    '<div class="section-header">' +
      '<div class="section-num">' + _sectionNum + '</div>' +
      '<div class="section-title">' + title + '</div>' +
    '</div>' +
    content +
  '</div>';
}

// ── Section builders ──────────────────────────────────
function siteInfoTable(d) {
  var rows = [
    ['Site name', d.siteName],['Survey date', d.surveyDate],
    ['Surveyed by', d.surveyedBy],['Ticket / Job #', d.ticketNum],
    ['Site address', d.siteAddress],['Floor / area', d.floorArea],
    ['Site type', d.siteType],['Network status', d.networkStatus],
    ['Photos captured', d.photoCount ? d.photoCount + (d.photosWithGPS ? ' (' + d.photosWithGPS + ' with GPS)' : '') : null],
  ];
  return kvTable(rows);
}

function locationTable(d) {
  var rows = [
    ['Building / campus', d.building],['Room / zone', d.roomZone],
    ['GPS coordinates', d.gps],['Nearest landmark', d.landmark],
    ['Access instructions', d.accessInstructions],
    ['Floor plan notes', d.floorplanNotes],
  ];
  return kvTable(rows);
}

function networkTable(d) {
  var rows = [
    ['ISP / carrier', d.isp],['Circuit ID', d.circuitId],
    ['WAN IP', d.wanIp],['Bandwidth', d.bandwidth],
    ['SSID(s)', d.ssids],['Security protocol', d.securityProto],
    ['VLAN(s)', d.vlans],['DNS server(s)', d.dns],
  ];
  return kvTable(rows);
}

function kvTable(rows) {
  var html = '<table><tbody>';
  rows.forEach(function(r) {
    if (!r[1]) return;
    html += '<tr><td class="td-label">' + r[0] + '</td><td class="td-val">' + esc(r[1]) + '</td></tr>';
  });
  return html + '</tbody></table>';
}

// ── Rack layout ───────────────────────────────────────
function racksHTML(racks) {
  if (!racks || !racks.length) return '<p style="color:#94A3B8;font-size:10pt">No racks defined.</p>';
  var html = '<div class="rack-grid">';
  racks.forEach(function(rack) {
    var used = rack.items.reduce(function(s,i){ return s+i.u; },0);
    html += '<div class="rack-box">';
    html += '<div class="rack-hdr"><span class="rack-hdr-name">'+esc(rack.label)+'</span><span class="rack-hdr-info">'+rack.units+'U · '+used+'U used</span></div>';
    html += '<div class="rack-body">';
    var uPos = 1;
    rack.items.forEach(function(dev) {
      var h = dev.u;
      for (var i = 0; i < h; i++) {
        html += '<div class="rack-row">';
        html += '<div class="rack-u">' + (uPos+i) + '</div>';
        if (i === 0) {
          html += '<div class="rack-dev" style="background:' + dev.c + ';height:'+(h*18)+'pt;' + (h>1?'position:relative;z-index:1':'') + '">' +
            '<span class="rack-dev-name">'+esc(dev.label)+'</span>' +
            (dev.n !== dev.label ? '<span class="rack-dev-model">'+esc(dev.n)+'</span>' : '') +
            '</div>';
        } else {
          html += '<div class="rack-dev" style="background:'+dev.c+'"></div>';
        }
        html += '</div>';
      }
      uPos += dev.u;
    });
    // Empty slots
    for (var i = uPos; i <= rack.units; i++) {
      html += '<div class="rack-row"><div class="rack-u">'+i+'</div><div class="rack-dev"><span class="rack-empty">—</span></div></div>';
    }
    html += '</div></div>';
  });
  return html + '</div>';
}

// ── Equipment port map ─────────────────────────────────
function mapperHTML(md) {
  if (!md.devices || !md.devices.length) return '<p style="color:#94A3B8;font-size:10pt">No devices mapped.</p>';
  var catColors = {
    switches:'#003A5D',patch_panels:'#1F2937',fiber_enclosures:'#1E3A5F',
    routers:'#065F46',routers_fw:'#065F46',servers:'#1E3A5F',
    power:'#78350F',pdus:'#78350F',ups:'#134E4A',
    access_points:'#0C4A6E',kvm:'#3B0764',broadband:'#4C1D95',other:'#374151'
  };
  var html = '';
  md.devices.forEach(function(dev) {
    var catColor = catColors[dev.category] || '#374151';
    var catIcon = {switches:'🔀',patch_panels:'🔲',fiber_enclosures:'🔆',routers:'🌐',routers_fw:'🌐',servers:'🖥',power:'⚡',pdus:'⚡',ups:'🔋',access_points:'📶',kvm:'🖱',broadband:'📡',other:'📦'}[dev.category]||'📦';
    html += '<div class="device-card">';
    html += '<div class="device-card-hdr" style="background:'+catColor+'">' +
      '<div><div class="device-name">'+catIcon+' '+(dev.hostname||dev.model)+'</div>' +
      (dev.hostname&&dev.hostname!==dev.model?'<div class="device-model">'+esc(dev.model)+'</div>':'')+
      (dev.ip?'<div class="device-model">'+esc(dev.ip)+'</div>':'')+
      '</div>' +
      '<div class="device-cat-badge">'+esc(dev.location||dev.category)+'</div>' +
    '</div>';
    if (dev.ports && dev.ports.length) {
      html += '<div class="device-ports"><table><thead><tr>';
      html += '<th>Port</th><th>Interface</th><th>Connected to</th><th>VLAN</th><th>Speed</th><th>Notes</th>';
      html += '</tr></thead><tbody>';
      var cableMap = {};
      if (md.cables) {
        md.cables.forEach(function(c) {
          if (c.from) {
            var key = c.from.devId + '|' + c.from.port;
            cableMap[key] = c;
          }
          if (c.to) {
            var key2 = c.to.devId + '|' + c.to.port;
            cableMap[key2] = c;
          }
        });
      }
      dev.ports.forEach(function(p) {
        var cable = cableMap[dev.id+'|'+p.num];
        var connTo = p.device || (cable ? (cable.toDevice || '') : '');
        if (!connTo && cable && cable.from && cable.to) {
          var otherId = cable.from.devId === dev.id ? cable.to.devId : cable.from.devId;
          var otherPort = cable.from.devId === dev.id ? cable.to.port : cable.from.port;
          var otherDev = md.devices.find(function(d){ return d.id === otherId; });
          if (otherDev) {
            var op = otherDev.ports && otherDev.ports.find(function(pp){ return pp.num === otherPort; });
            connTo = (otherDev.hostname||otherDev.model) + (op ? ' ' + (op.iface||op.label) : '');
          }
        }
        var rowBg = connTo ? '' : '';
        html += '<tr style="'+(p.uplink?'background:#F0F9FF':'')+(connTo?';background:#F0FFF4':'')+'">'+
          '<td><strong>'+p.num+'</strong>'+(p.uplink?'<span style="font-size:7pt;color:#0369A1;margin-left:4pt">↑</span>':(p.poe?'<span style="font-size:7pt;color:#DC2626;margin-left:4pt">PoE</span>':''))+'</td>'+
          '<td class="mono">'+esc(p.iface||p.label||'')+'</td>'+
          '<td>'+esc(connTo)+'</td>'+
          '<td class="mono">'+esc(p.vlan||'')+'</td>'+
          '<td class="mono">'+esc(p.speed||'')+'</td>'+
          '<td>'+esc(p.notes||'')+'</td>'+
        '</tr>';
      });
      html += '</tbody></table></div>';
    }
    html += '</div>';
  });
  // Cable list
  if (md.cables && md.cables.length) {
    html += '<h3 style="font-size:12pt;font-weight:700;color:#003A5D;margin:16pt 0 8pt">Cable connections (' + md.cables.length + ')</h3>';
    html += '<table><thead><tr><th>#</th><th>From</th><th>To</th><th>Type</th><th>Label</th></tr></thead><tbody>';
    md.cables.forEach(function(c, i) {
      var fromDev = md.devices.find(function(d){ return d.id === (c.from && c.from.devId); });
      var toDev   = md.devices.find(function(d){ return d.id === (c.to   && c.to.devId); });
      var fromPort = fromDev && fromDev.ports && fromDev.ports.find(function(p){ return p.num === (c.from && c.from.port); });
      var toPort   = toDev   && toDev.ports   && toDev.ports.find(function(p){ return p.num === (c.to   && c.to.port);   });
      var fromStr = fromDev ? (fromDev.hostname||fromDev.model) + (fromPort ? ' ' + (fromPort.iface||fromPort.label) : '') : '—';
      var toStr   = c.toDevice || (toDev ? (toDev.hostname||toDev.model) + (toPort ? ' ' + (toPort.iface||toPort.label) : '') : '—');
      html += '<tr><td>'+( i+1)+'</td><td class="mono">'+esc(fromStr)+'</td><td class="mono">'+esc(toStr)+'</td><td>'+esc(c.type||'')+'</td><td>'+esc(c.label||'')+'</td></tr>';
    });
    html += '</tbody></table>';
  }
  return html;
}

// ── Planned equipment ─────────────────────────────────
function plannedHTML(d) {
  var fc = d.futureCounts || {};
  var html = '<table class="planned-table"><thead><tr><th>Vendor</th><th>Items</th></tr></thead><tbody>';
  if (fc.cisco)  html += '<tr><td>Cisco</td><td>'+fc.cisco+'</td></tr>';
  if (fc.arista) html += '<tr><td>Arista / VeloCloud</td><td>'+fc.arista+'</td></tr>';
  if (fc.other)  html += '<tr><td>Other</td><td>'+fc.other+'</td></tr>';
  html += '</tbody></table>';
  var rows = [
    ['Target install date', d.installDate],
    ['Priority', d.installPriority],
    ['Assigned installer', d.installer],
    ['PO / budget reference', d.poRef],
    ['Installation notes', d.installNotes],
  ];
  return html + kvTable(rows);
}

// ── Findings ──────────────────────────────────────────
function findingsHTML(d) {
  var html = '';
  if (d.issues) {
    html += '<div class="findings-block"><div class="findings-label">Issues found</div>' +
      '<div class="findings-text">'+esc(d.issues)+'</div></div>';
  }
  if (d.recommendations) {
    html += '<div class="findings-block" style="border-left-color:#00B7D9"><div class="findings-label">Recommendations</div>' +
      '<div class="findings-text">'+esc(d.recommendations)+'</div></div>';
  }
  if (d.followup) {
    var cls = d.followup.includes('urgent') ? 'followup-urgent' : d.followup.includes('scheduled') ? 'followup-scheduled' : 'followup-no';
    html += '<p style="margin-top:12pt">Follow-up: <span class="'+cls+'">'+esc(d.followup)+'</span>';
    if (d.estCompletion) html += ' &nbsp; Est. completion: <strong>' + esc(d.estCompletion) + '</strong>';
    html += '</p>';
  }
  if (d.extraNotes) {
    html += '<div class="findings-block" style="margin-top:14pt;border-left-color:#94A3B8"><div class="findings-label">Additional notes</div>' +
      '<div class="findings-text">'+esc(d.extraNotes)+'</div></div>';
  }
  return html || '<p style="color:#94A3B8">No findings recorded.</p>';
}

function esc(s) {
  if (!s) return '';
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
