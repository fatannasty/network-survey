// ══════════════════════════════════════════════════════════════════════
//  NetSurvey — Equipment & Port Mapper
//  Supports: Switches, Patch Panels, PDUs, Servers, Routers,
//            Broadband/WAN Circuits, APs, Firewalls, UPS, KVM, Media Converters
// ══════════════════════════════════════════════════════════════════════

// ── Device catalog ────────────────────────────────────────────────────
const DEVICE_CATALOG = {

  // ── CISCO SWITCHES ──
  switches: {
    label: 'Switches',
    icon: '🔀',
    color: '#003A5D',
    models: {
      'Catalyst 9200-24P':   { ports:24, uplinks:4, uplinkSpeed:'1G SFP',    poe:true,  poeBudget:'195W',  layer:'L2/L3', portPrefix:'Gi1/0/', uplinkPrefix:'Gi1/1/' },
      'Catalyst 9200-48P':   { ports:48, uplinks:4, uplinkSpeed:'1G SFP',    poe:true,  poeBudget:'370W',  layer:'L2/L3', portPrefix:'Gi1/0/', uplinkPrefix:'Gi1/1/' },
      'Catalyst 9200-24T':   { ports:24, uplinks:4, uplinkSpeed:'1G SFP',    poe:false, poeBudget:'N/A',   layer:'L2/L3', portPrefix:'Gi1/0/', uplinkPrefix:'Gi1/1/' },
      'Catalyst 9200-48T':   { ports:48, uplinks:4, uplinkSpeed:'1G SFP',    poe:false, poeBudget:'N/A',   layer:'L2/L3', portPrefix:'Gi1/0/', uplinkPrefix:'Gi1/1/' },
      'Catalyst 9200L-24P-4G':{ ports:24, uplinks:4, uplinkSpeed:'1G SFP',  poe:true,  poeBudget:'195W',  layer:'L2/L3', portPrefix:'Gi1/0/', uplinkPrefix:'Gi1/1/' },
      'Catalyst 9200L-48P-4X':{ ports:48, uplinks:4, uplinkSpeed:'10G SFP+',poe:true,  poeBudget:'370W',  layer:'L2/L3', portPrefix:'Gi1/0/', uplinkPrefix:'Te1/1/' },
      'Catalyst 9300-24P':   { ports:24, uplinks:4, uplinkSpeed:'10G SFP+',  poe:true,  poeBudget:'437W',  layer:'L2/L3', portPrefix:'Gi1/0/', uplinkPrefix:'Te1/1/' },
      'Catalyst 9300-48P':   { ports:48, uplinks:4, uplinkSpeed:'10G SFP+',  poe:true,  poeBudget:'437W',  layer:'L2/L3', portPrefix:'Gi1/0/', uplinkPrefix:'Te1/1/' },
      'Catalyst 9300-24U':   { ports:24, uplinks:4, uplinkSpeed:'10G SFP+',  poe:true,  poeBudget:'880W',  layer:'L2/L3', portPrefix:'Gi1/0/', uplinkPrefix:'Te1/1/' },
      'Catalyst 9300-48U':   { ports:48, uplinks:4, uplinkSpeed:'10G SFP+',  poe:true,  poeBudget:'1440W', layer:'L2/L3', portPrefix:'Gi1/0/', uplinkPrefix:'Te1/1/' },
      'Catalyst 9300-48UXM': { ports:48, uplinks:2, uplinkSpeed:'25G SFP28', poe:true,  poeBudget:'860W',  layer:'L2/L3', portPrefix:'Gi1/0/', uplinkPrefix:'TwGigE1/1/' },
      'Catalyst 9300X-24HX': { ports:24, uplinks:2, uplinkSpeed:'25G SFP28', poe:true,  poeBudget:'1440W', layer:'L2/L3', portPrefix:'Gi1/0/', uplinkPrefix:'TwGigE1/1/' },
      'IE-3300-8P2S':        { ports:8,  uplinks:2, uplinkSpeed:'1G SFP',    poe:true,  poeBudget:'120W',  layer:'L2',    portPrefix:'Gi1/1/', uplinkPrefix:'Gi1/9/',  rugged:true },
      'IE-3300-8T2S':        { ports:8,  uplinks:2, uplinkSpeed:'1G SFP',    poe:false, poeBudget:'N/A',   layer:'L2',    portPrefix:'Gi1/1/', uplinkPrefix:'Gi1/9/',  rugged:true },
      'IE-3300-16P2S':       { ports:16, uplinks:2, uplinkSpeed:'1G SFP',    poe:true,  poeBudget:'240W',  layer:'L2',    portPrefix:'Gi1/1/', uplinkPrefix:'Gi1/17/', rugged:true },
      'IE-3300-16T2S':       { ports:16, uplinks:2, uplinkSpeed:'1G SFP',    poe:false, poeBudget:'N/A',   layer:'L2',    portPrefix:'Gi1/1/', uplinkPrefix:'Gi1/17/', rugged:true },
      'Custom Switch':       { ports:24, uplinks:4, uplinkSpeed:'SFP',       poe:false, poeBudget:'N/A',   layer:'L2/L3', portPrefix:'Port', uplinkPrefix:'Uplink', custom:true },
    }
  },

  // ── PATCH PANELS ──
  patch_panels: {
    label: 'Patch Panels',
    icon: '🔲',
    color: '#374151',
    models: {
      'Patch Panel 24-port Cat6':  { ports:24, portType:'RJ45', racku:1 },
      'Patch Panel 48-port Cat6':  { ports:48, portType:'RJ45', racku:1 },
      'Patch Panel 24-port Cat6A': { ports:24, portType:'RJ45', racku:1 },
      'Patch Panel 48-port Cat6A': { ports:48, portType:'RJ45', racku:1 },
      'Fiber Patch Panel 12-LC':   { ports:12, portType:'LC Duplex', racku:1 },
      'Fiber Patch Panel 24-LC':   { ports:24, portType:'LC Duplex', racku:1 },
      'Fiber Patch Panel 48-LC':   { ports:48, portType:'LC Duplex', racku:2 },
      'Keystone Patch Panel 24':   { ports:24, portType:'Keystone', racku:1 },
      'Custom Patch Panel':        { ports:24, portType:'RJ45', racku:1, custom:true },
    }
  },

  // ── ROUTERS ──
  routers: {
    label: 'Routers / WAN',
    icon: '🌐',
    color: '#065F46',
    models: {
      'Cisco ISR 1100-4P':    { wanPorts:4,  lanPorts:0,  speed:'1G',   desc:'Branch router, integrated security' },
      'Cisco ISR 4331':       { wanPorts:3,  lanPorts:0,  speed:'1G',   desc:'Mid-range branch, modular NIM' },
      'Cisco Catalyst 8200':  { wanPorts:2,  lanPorts:4,  speed:'1G',   desc:'SD-WAN branch router' },
      'Cisco Catalyst 8300':  { wanPorts:4,  lanPorts:8,  speed:'10G',  desc:'Enterprise edge, multi-service' },
      'Cisco ASR 1001-X':     { wanPorts:6,  lanPorts:0,  speed:'10G',  desc:'Aggregation, 20 Gbps' },
      'Cisco RV340':          { wanPorts:2,  lanPorts:4,  speed:'1G',   desc:'SMB dual-WAN router' },
      'VeloCloud Edge 620':   { wanPorts:4,  lanPorts:8,  speed:'1G',   desc:'SD-WAN edge, dual LTE' },
      'VeloCloud Edge 640':   { wanPorts:8,  lanPorts:8,  speed:'1G',   desc:'SD-WAN edge, 8 WAN' },
      'VeloCloud Edge 680':   { wanPorts:2,  lanPorts:8,  speed:'10G',  desc:'SD-WAN, 10G SFP+' },
      'Juniper SRX300':       { wanPorts:2,  lanPorts:6,  speed:'1G',   desc:'Branch firewall/router' },
      'Palo Alto PA-220':     { wanPorts:2,  lanPorts:6,  speed:'1G',   desc:'NGFW + router, branch' },
      'Custom Router':        { wanPorts:2,  lanPorts:4,  speed:'1G',   desc:'', custom:true },
    }
  },

  // ── FIREWALLS ──
  firewalls: {
    label: 'Firewalls',
    icon: '🔥',
    color: '#7C2D12',
    models: {
      'Cisco Firepower 1010':  { wanPorts:2, lanPorts:6,  speed:'1G',   desc:'Branch NGFW, 650 Mbps' },
      'Cisco Firepower 1120':  { wanPorts:4, lanPorts:4,  speed:'1G',   desc:'Branch NGFW, 1.5 Gbps' },
      'Cisco Firepower 2110':  { wanPorts:4, lanPorts:12, speed:'1G',   desc:'Enterprise NGFW, 2 Gbps' },
      'Cisco ASA 5506-X':      { wanPorts:1, lanPorts:7,  speed:'1G',   desc:'Branch ASA with FirePOWER' },
      'Cisco ASA 5516-X':      { wanPorts:2, lanPorts:6,  speed:'1G',   desc:'Mid-range ASA, 1.8 Gbps' },
      'Palo Alto PA-220':      { wanPorts:2, lanPorts:6,  speed:'1G',   desc:'220 Mbps NGFW' },
      'Palo Alto PA-440':      { wanPorts:4, lanPorts:8,  speed:'1G',   desc:'1.6 Gbps NGFW' },
      'Fortinet FortiGate 60F':{ wanPorts:2, lanPorts:7,  speed:'1G',   desc:'10 Gbps firewall throughput' },
      'pfSense Appliance':     { wanPorts:2, lanPorts:4,  speed:'1G',   desc:'Open-source firewall' },
      'Custom Firewall':       { wanPorts:2, lanPorts:4,  speed:'1G',   desc:'', custom:true },
    }
  },

  // ── SERVERS ──
  servers: {
    label: 'Servers',
    icon: '🖥️',
    color: '#1E3A5F',
    models: {
      'Dell PowerEdge R250':  { ports:2, racku:1, desc:'1U entry rack server, Xeon E' },
      'Dell PowerEdge R350':  { ports:2, racku:1, desc:'1U mid-range, Xeon E-2300' },
      'Dell PowerEdge R450':  { ports:4, racku:1, desc:'1U dual-socket, Xeon Scalable' },
      'Dell PowerEdge R650':  { ports:4, racku:1, desc:'1U high-density, 3rd Gen Xeon' },
      'Dell PowerEdge R750':  { ports:4, racku:2, desc:'2U dual-socket enterprise' },
      'HPE ProLiant DL20':    { ports:2, racku:1, desc:'1U entry, Xeon E-2300' },
      'HPE ProLiant DL360':   { ports:4, racku:1, desc:'1U dual-socket Gen10+' },
      'HPE ProLiant DL380':   { ports:4, racku:2, desc:'2U versatile Gen10+' },
      'Cisco UCS C220 M6':    { ports:4, racku:1, desc:'1U rack compute, Xeon Scalable' },
      'Cisco UCS C240 M6':    { ports:4, racku:2, desc:'2U large storage server' },
      'NAS — Synology RS1221+':{ ports:4, racku:2, desc:'2U 8-bay NAS, 10GbE' },
      'NAS — QNAP TS-873A':   { ports:4, racku:2, desc:'2U 8-bay NAS, 2.5GbE' },
      'Custom Server':        { ports:2, racku:1, desc:'', custom:true },
    }
  },

  // ── PDU ──
  pdus: {
    label: 'PDUs',
    icon: '⚡',
    color: '#78350F',
    models: {
      'APC AP7920 Basic 1U':       { outlets:8,  amps:'15A', voltage:'120V', racku:1, monitored:false },
      'APC AP7930 Basic 2U':       { outlets:24, amps:'30A', voltage:'208V', racku:2, monitored:false },
      'APC AP7960 Metered 1U':     { outlets:8,  amps:'15A', voltage:'120V', racku:1, monitored:true  },
      'APC AP7968 Metered 2U':     { outlets:24, amps:'30A', voltage:'120V', racku:2, monitored:true  },
      'APC AP8853 Switched':       { outlets:16, amps:'20A', voltage:'208V', racku:2, monitored:true  },
      'Vertiv MPH2 Metered':       { outlets:24, amps:'30A', voltage:'208V', racku:1, monitored:true  },
      'Eaton ePDU Managed':        { outlets:24, amps:'32A', voltage:'208V', racku:1, monitored:true  },
      'Tripp Lite PDU1230 Basic':  { outlets:12, amps:'30A', voltage:'120V', racku:1, monitored:false },
      'Custom PDU':                { outlets:8,  amps:'20A', voltage:'120V', racku:1, monitored:false, custom:true },
    }
  },

  // ── UPS ──
  ups: {
    label: 'UPS',
    icon: '🔋',
    color: '#134E4A',
    models: {
      'APC Smart-UPS 1500VA':  { va:'1500', watts:'1000', racku:2, desc:'Tower/rack convertible' },
      'APC Smart-UPS 2200VA':  { va:'2200', watts:'1980', racku:2, desc:'2U rack mount' },
      'APC Smart-UPS 3000VA':  { va:'3000', watts:'2700', racku:2, desc:'2U, extended runtime' },
      'APC SRT 5000VA':        { va:'5000', watts:'4500', racku:6, desc:'Online double-conversion' },
      'Eaton 5PX 1500VA':      { va:'1500', watts:'1350', racku:2, desc:'1.5 kVA rack/tower' },
      'Eaton 9PX 2000VA':      { va:'2000', watts:'1800', racku:2, desc:'Online 2U, managed' },
      'Vertiv GXT5-1000VA':    { va:'1000', watts:'1000', racku:2, desc:'Online double-conversion' },
      'Custom UPS':            { va:'1500', watts:'1000', racku:2, desc:'', custom:true },
    }
  },

  // ── BROADBAND / WAN CIRCUITS ──
  broadband: {
    label: 'Broadband / WAN',
    icon: '📡',
    color: '#4C1D95',
    models: {
      'Fiber ONT (ISP)':        { ports:1, speed:'1G', desc:'Optical Network Terminal — ISP provided' },
      'Cable Modem (DOCSIS 3.1)':{ ports:1, speed:'1G', desc:'Coax broadband modem' },
      'DSL Modem':              { ports:1, speed:'100M', desc:'ADSL/VDSL WAN modem' },
      '4G LTE Gateway':         { ports:1, speed:'300M', desc:'LTE failover/primary WAN' },
      '5G Gateway':             { ports:2, speed:'1G',   desc:'5G mmWave/sub-6 WAN gateway' },
      'SD-WAN Gateway':         { ports:4, speed:'10G',  desc:'Multi-WAN SD-WAN aggregator' },
      'MPLS CPE':               { ports:2, speed:'1G',   desc:'MPLS handoff CPE device' },
      'Metro Ethernet CPE':     { ports:2, speed:'10G',  desc:'Carrier Ethernet handoff' },
      'Satellite Modem (Starlink)':{ ports:1, speed:'500M', desc:'LEO satellite broadband' },
      'Dark Fiber Handoff':     { ports:2, speed:'10G',  desc:'Direct dark fiber circuit' },
      'Custom WAN Device':      { ports:1, speed:'1G',   desc:'', custom:true },
    }
  },

  // ── ACCESS POINTS ──
  access_points: {
    label: 'Access Points',
    icon: '📶',
    color: '#0C4A6E',
    models: {
      'Cisco Catalyst 9105AXI':{ wifi:'Wi-Fi 6',  mimo:'2×2', poe:'802.3at', desc:'Entry indoor AP' },
      'Cisco Catalyst 9115AXI':{ wifi:'Wi-Fi 6',  mimo:'4×4', poe:'802.3at', desc:'Mid-range indoor AP' },
      'Cisco Catalyst 9120AXI':{ wifi:'Wi-Fi 6',  mimo:'8×8', poe:'802.3bt', desc:'High-density indoor AP' },
      'Cisco Meraki MR36':     { wifi:'Wi-Fi 6',  mimo:'2×2', poe:'802.3at', desc:'Cloud-managed indoor' },
      'Cisco Meraki MR46':     { wifi:'Wi-Fi 6',  mimo:'4×4', poe:'802.3at', desc:'Cloud-managed high-perf' },
      'Cisco Meraki MR86':     { wifi:'Wi-Fi 6',  mimo:'4×4', poe:'802.3bt', desc:'Outdoor cloud-managed' },
      'Arista W-128':          { wifi:'Wi-Fi 6E', mimo:'4×4', poe:'802.3bt', desc:'Tri-band 6E indoor' },
      'Ubiquiti UniFi U6 Pro': { wifi:'Wi-Fi 6',  mimo:'4×4', poe:'802.3at', desc:'Cloud-managed indoor' },
      'Ubiquiti UniFi U6 LR':  { wifi:'Wi-Fi 6',  mimo:'4×4', poe:'802.3at', desc:'Long-range indoor' },
      'Custom AP':             { wifi:'Wi-Fi 6',  mimo:'2×2', poe:'802.3at', desc:'', custom:true },
    }
  },

  // ── KVM / CONSOLE ──
  kvm: {
    label: 'KVM / Console',
    icon: '🖱️',
    color: '#3B0764',
    models: {
      'APC KVM 8-Port':     { ports:8,  racku:1, desc:'8-port KVM switch, VGA' },
      'APC KVM 16-Port':    { ports:16, racku:1, desc:'16-port KVM, Cat5 dongle' },
      'Raritan Dominion 8': { ports:8,  racku:1, desc:'IP KVM, remote access' },
      'ATEN KN8116V':       { ports:16, racku:1, desc:'16-port IP KVM over Ethernet' },
      'Serial Console Server':{ ports:16, racku:1, desc:'RS-232 console aggregator' },
      'Custom KVM':         { ports:8,  racku:1, desc:'', custom:true },
    }
  },

  // ── MEDIA CONVERTERS / TRANSCEIVERS ──
  media_converters: {
    label: 'Media Converters',
    icon: '🔁',
    color: '#1E1B4B',
    models: {
      'Fiber to Copper 1G':    { ports:2, desc:'SFP to RJ45 media converter, 1G' },
      'Fiber to Copper 10G':   { ports:2, desc:'SFP+ to RJ45, 10G' },
      'Single-mode to MM':     { ports:2, desc:'SMF to MMF mode converter' },
      'PoE Injector 30W':      { ports:2, desc:'IEEE 802.3at PoE injector' },
      'PoE Injector 60W':      { ports:2, desc:'IEEE 802.3bt PoE++ injector' },
      'PoE Splitter':          { ports:2, desc:'Splits PoE for non-PoE device' },
      'SFP to SFP+ Adapter':   { ports:2, desc:'1G SFP in 10G SFP+ slot adapter' },
      'Ethernet Extender':     { ports:2, desc:'Extends Ethernet over coax/telephone' },
      'Custom Media Converter':{ ports:2, desc:'', custom:true },
    }
  },

  // ── OTHER ──
  other: {
    label: 'Other Equipment',
    icon: '📦',
    color: '#374151',
    models: {
      'Rack Mount Monitor/KVM': { racku:1, desc:'1U LCD monitor + keyboard tray' },
      'Cable Manager 1U':       { racku:1, desc:'Horizontal cable management' },
      'Cable Manager 2U':       { racku:2, desc:'Horizontal cable management, deep' },
      'Blank Panel 1U':         { racku:1, desc:'Rack blanking panel' },
      'Shelf 1U Fixed':         { racku:1, desc:'Fixed 1U rack shelf' },
      'Shelf 2U Adjustable':    { racku:2, desc:'Adjustable depth rack shelf' },
      'Fan Tray 1U':            { racku:1, desc:'Active cooling fan panel' },
      'Custom Device':          { racku:1, desc:'', custom:true },
    }
  },
};

// ── Cable types ───────────────────────────────────────────────────────
const CABLE_TYPES = [
  { id:'cat6',   label:'Cat6',     color:'#00B7D9', dash:false },
  { id:'cat6a',  label:'Cat6A',    color:'#4ADE80', dash:false },
  { id:'fiber',  label:'Fiber SM', color:'#FBB843', dash:true  },
  { id:'fiberMM',label:'Fiber MM', color:'#FB923C', dash:true  },
  { id:'sfp',    label:'SFP+',     color:'#A78BFA', dash:true  },
  { id:'sfp25',  label:'25G',      color:'#E879F9', dash:true  },
  { id:'poe',    label:'PoE',      color:'#FF6B6B', dash:false },
  { id:'console',label:'Console',  color:'#6EE7B7', dash:false },
  { id:'power',  label:'Power',    color:'#F59E0B', dash:false },
  { id:'coax',   label:'Coax',     color:'#94A3B8', dash:false },
  { id:'uplink', label:'Uplink',   color:'#00DC64', dash:true  },
];

// ── Mapper state ──────────────────────────────────────────────────────
let mapperState = {
  devices:  [],
  cables:   [],
  selectedDevice: null,
  dragging: false,
  dragFrom: null,
  dragDevice: null,
  dragOffX: 0, dragOffY: 0,
  tempLine: null,
  activeCableType: 'cat6',
};
let mapperNextId = 1;

// ── Public API ────────────────────────────────────────────────────────
window.SwitchMapper = {
  init() {
    renderDeviceSelector();
    // Don't call renderMapper here — section is hidden on load.
    // Canvas renders when user navigates to existing-eq via onMapperSectionVisible()
    renderDeviceList();
  },

  addDevice(category, modelName, customLabel) {
    const cat  = DEVICE_CATALOG[category];
    const def  = cat && cat.models[modelName];
    if (!cat) return;

    const label = customLabel || modelName;
    const dev = {
      id:       'dev' + (mapperNextId++),
      category,
      model:    label,
      def:      def || {},
      catDef:   cat,
      hostname: '',
      location: '',
      ip:       '',
      serial:   '',
      notes:    '',
      ports:    buildDevicePorts(category, def || {}, label),
      x: 40 + (mapperState.devices.length % 3) * 340,
      y: 40 + Math.floor(mapperState.devices.length / 3) * 260,
    };
    mapperState.devices.push(dev);
    mapperState.selectedDevice = dev.id;
    renderMapper();
    renderDeviceList();
    renderDeviceDetail();
    const el = document.getElementById('selected-sw-name');
    if (el) el.textContent = dev.hostname || dev.model;
    return dev;
  },

  removeDevice(id) {
    mapperState.cables  = mapperState.cables.filter(c => c.from.devId !== id && (!c.to || c.to.devId !== id));
    mapperState.devices = mapperState.devices.filter(d => d.id !== id);
    if (mapperState.selectedDevice === id) mapperState.selectedDevice = null;
    renderMapper(); renderDeviceList(); renderDeviceDetail();
  },

  getData()       { return { devices: mapperState.devices, cables: mapperState.cables }; },
  loadData(data)  {
    if (!data) return;
    mapperState.devices = data.devices || [];
    mapperState.cables  = data.cables  || [];
    renderMapper(); renderDeviceList(); renderDeviceDetail();
  },

  exportCSV() {
    const rows = ['Device,Category,Model,IP,Location,Port #,Port Label,VLAN,Speed,PoE,Connected To,Cable Type,Notes'];
    mapperState.devices.forEach(dev => {
      dev.ports.forEach(p => {
        const cable = findCableOnPort(dev.id, p.num);
        const otherEnd = cable ? getOtherEnd(cable, dev.id, p.num) : '';
        rows.push([
          dev.hostname||dev.model, dev.category, dev.model, dev.ip||'', dev.location||'',
          p.num, p.label||'', p.vlan||'', p.speed||'', p.poe?'Yes':'No',
          otherEnd, cable?cable.type:'', p.notes||''
        ].map(v => `"${String(v).replace(/"/g,'""')}"`).join(','));
      });
    });
    dl(rows.join('\n'), 'port-map.csv', 'text/csv');
    showMapperToast('CSV exported ✓');
  },
};

function buildDevicePorts(category, def, model) {
  const ports = [];
  let n = 0;

  if (category === 'switches') {
    for (let i = 1; i <= (def.ports||24); i++) {
      ports.push({ num:i, label:'', iface:(def.portPrefix||'Port')+i, vlan:'', speed:'Auto', poe:!!def.poe, device:'', notes:'', uplink:false });
    }
    for (let i = 1; i <= (def.uplinks||4); i++) {
      const num = (def.ports||24) + i;
      ports.push({ num, label:'Uplink '+i, iface:(def.uplinkPrefix||'Uplink')+i, vlan:'', speed:def.uplinkSpeed||'SFP', poe:false, device:'', notes:'', uplink:true });
    }
  } else if (category === 'patch_panels') {
    for (let i = 1; i <= (def.ports||24); i++) {
      ports.push({ num:i, label:'Port '+i, iface:'Port '+i, vlan:'', speed:'', poe:false, device:'', notes:'', uplink:false });
    }
  } else if (category === 'routers' || category === 'firewalls') {
    const wan = def.wanPorts || 2, lan = def.lanPorts || 4;
    for (let i = 1; i <= wan; i++) {
      ports.push({ num:i, label:'WAN '+i, iface:'WAN'+i, vlan:'', speed:def.speed||'1G', poe:false, device:'', notes:'', uplink:true });
    }
    for (let i = 1; i <= lan; i++) {
      const num = wan + i;
      ports.push({ num, label:'LAN '+i, iface:'LAN'+i, vlan:'', speed:def.speed||'1G', poe:false, device:'', notes:'', uplink:false });
    }
  } else if (category === 'servers') {
    for (let i = 1; i <= (def.ports||2); i++) {
      ports.push({ num:i, label:'NIC '+i, iface:'eth'+(i-1), vlan:'', speed:'1G', poe:false, device:'', notes:'', uplink:false });
    }
    ports.push({ num:99, label:'IPMI/iDRAC', iface:'mgmt0', vlan:'', speed:'1G', poe:false, device:'', notes:'', uplink:false });
  } else if (category === 'pdus') {
    ports.push({ num:1, label:'Input', iface:'Input', vlan:'', speed:'', poe:false, device:'', notes:'Power input', uplink:true });
    for (let i = 1; i <= Math.min(def.outlets||8, 16); i++) {
      ports.push({ num:i+1, label:'Outlet '+i, iface:'Outlet '+i, vlan:'', speed:'', poe:false, device:'', notes:'', uplink:false });
    }
    if (def.monitored) ports.push({ num:99, label:'Mgmt/SNMP', iface:'eth0', vlan:'', speed:'1G', poe:false, device:'', notes:'', uplink:false });
  } else if (category === 'ups') {
    ports.push({ num:1, label:'Power In', iface:'Input', vlan:'', speed:'', poe:false, device:'', notes:'', uplink:true });
    ports.push({ num:2, label:'Network Mgmt', iface:'mgmt', vlan:'', speed:'1G', poe:false, device:'', notes:'', uplink:false });
    ports.push({ num:3, label:'Serial Console', iface:'serial', vlan:'', speed:'', poe:false, device:'', notes:'', uplink:false });
  } else if (category === 'broadband') {
    ports.push({ num:1, label:'WAN / ONT Port', iface:'wan0', vlan:'', speed:def.speed||'1G', poe:false, device:'', notes:'ISP circuit', uplink:true });
    for (let i = 2; i <= (def.ports||2); i++) {
      ports.push({ num:i, label:'Port '+i, iface:'eth'+(i-1), vlan:'', speed:def.speed||'1G', poe:false, device:'', notes:'', uplink:false });
    }
  } else if (category === 'access_points') {
    ports.push({ num:1, label:'PoE/Eth', iface:'eth0', vlan:'', speed:'1G', poe:true, device:'', notes:'', uplink:false });
  } else if (category === 'kvm') {
    ports.push({ num:1, label:'Network', iface:'eth0', vlan:'', speed:'1G', poe:false, device:'', notes:'IP KVM management', uplink:false });
    for (let i = 1; i <= (def.ports||8); i++) {
      ports.push({ num:i+1, label:'Server '+i, iface:'KVM'+i, vlan:'', speed:'', poe:false, device:'', notes:'', uplink:false });
    }
  } else if (category === 'media_converters') {
    ports.push({ num:1, label:'Port A', iface:'portA', vlan:'', speed:'1G', poe:false, device:'', notes:'', uplink:false });
    ports.push({ num:2, label:'Port B', iface:'portB', vlan:'', speed:'1G', poe:false, device:'', notes:'', uplink:false });
  } else {
    ports.push({ num:1, label:'Port 1', iface:'port1', vlan:'', speed:'', poe:false, device:'', notes:'', uplink:false });
  }
  return ports;
}

// ── Device selector UI ────────────────────────────────────────────────
function renderDeviceSelector() {
  const wrap = document.getElementById('device-category-tabs');
  const modelSel = document.getElementById('device-model-select');
  if (!wrap || !modelSel) return;

  wrap.innerHTML = Object.entries(DEVICE_CATALOG).map(([key, cat]) =>
    `<button class="cable-type-btn" data-cat="${key}" onclick="selectDeviceCategory('${key}')" style="font-size:11px;padding:5px 10px">
      ${cat.icon} ${cat.label}
    </button>`
  ).join('');

  // Default first category
  selectDeviceCategory('switches');
}

window.selectDeviceCategory = function(catKey) {
  document.querySelectorAll('[data-cat]').forEach(btn => {
    const isActive = btn.dataset.cat === catKey;
    const cat = DEVICE_CATALOG[catKey];
    btn.style.borderColor = isActive ? (cat ? cat.color : '') : '';
    btn.style.color = isActive ? (cat ? cat.color : '') : '';
  });

  const cat = DEVICE_CATALOG[catKey];
  const modelSel = document.getElementById('device-model-select');
  if (!modelSel || !cat) return;
  modelSel.innerHTML = `<option value="">Choose ${cat.label} model…</option>` +
    Object.keys(cat.models).map(m => `<option value="${m}|${catKey}">${m}</option>`).join('');
};

window.addDeviceFromSelect = function() {
  const sel = document.getElementById('device-model-select');
  if (!sel || !sel.value) { showMapperToast('Choose a device model first'); return; }
  const [model, cat] = sel.value.split('|');
  const def = DEVICE_CATALOG[cat].models[model];
  if (def.custom) {
    const label = prompt('Enter a label / hostname for this device:', model) || model;
    SwitchMapper.addDevice(cat, model, label);
  } else {
    SwitchMapper.addDevice(cat, model);
  }
  sel.value = '';
  if (window.updateCableSummary) updateCableSummary();
};

// ── Device list (sidebar) ─────────────────────────────────────────────
function renderDeviceList() {
  const el = document.getElementById('mapper-device-list');
  if (!el) return;
  if (!mapperState.devices.length) {
    el.innerHTML = '<p style="color:var(--text3);font-size:12px;padding:8px 0">No devices added yet.</p>';
    return;
  }
  el.innerHTML = mapperState.devices.map(dev => {
    const cat = DEVICE_CATALOG[dev.category] || {};
    const active = mapperState.selectedDevice === dev.id;
    const cables = mapperState.cables.filter(c => c.from.devId===dev.id||(c.to&&c.to.devId===dev.id)).length;
    return `<div class="mapper-sw-item ${active?'active':''}" onclick="selectDevice('${dev.id}')">
      <div style="display:flex;align-items:center;gap:8px;overflow:hidden">
        <div style="font-size:14px;flex-shrink:0">${cat.icon||'📦'}</div>
        <div style="overflow:hidden">
          <div style="font-size:12px;font-weight:600;color:${active?'var(--cyan)':'var(--text)'};white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${dev.hostname||dev.model}</div>
          <div style="font-size:10px;color:var(--text3)">${dev.model!==dev.hostname?dev.model+' · ':''}${cables} cable${cables!==1?'s':''}</div>
        </div>
      </div>
      <button onclick="event.stopPropagation();SwitchMapper.removeDevice('${dev.id}')"
        style="background:none;border:none;cursor:pointer;color:var(--text3);font-size:14px;padding:2px 6px;border-radius:4px;flex-shrink:0" title="Remove">✕</button>
    </div>`;
  }).join('');
}

window.selectDevice = function(id) {
  mapperState.selectedDevice = id;
  renderDeviceList();
  renderDeviceDetail();
  drawCanvas();
  const dev = mapperState.devices.find(d => d.id === id);
  const el = document.getElementById('selected-sw-name');
  if (el && dev) el.textContent = dev.hostname || dev.model;
};

// ── Canvas ────────────────────────────────────────────────────────────
function renderMapper() {
  const wrap = document.getElementById('mapper-canvas-wrap');
  if (!wrap) return;

  // Hide empty hint if devices exist
  const hint = document.getElementById('mapper-empty-hint');
  if (hint) hint.style.display = mapperState.devices.length ? 'none' : 'flex';

  // Create or reuse canvas
  let canvas = document.getElementById('mapper-canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'mapper-canvas';
    canvas.style.display = 'block';
    canvas.style.touchAction = 'none';
    wrap.appendChild(canvas);
  }

  // Resize — use offsetWidth of parent; if zero (section hidden), use fallback
  const W = wrap.offsetWidth  || 860;
  const H = Math.max(wrap.offsetHeight || 0, 560);
  canvas.width  = W;
  canvas.height = H;
  canvas.style.width  = W + 'px';
  canvas.style.height = H + 'px';

  setupCanvasEvents(canvas);
  drawCanvas();
}

// Device bounding box
function getDeviceRect(dev) {
  const cat = dev.category;
  const ports = dev.ports.length;
  let W = 300, H = 90;

  if (cat === 'switches') {
    const dataPorts = dev.ports.filter(p=>!p.uplink).length;
    const cols = dataPorts <= 12 ? 1 : 2;
    const rows = Math.ceil(dataPorts / (cols * 6));
    W = dataPorts <= 12 ? 260 : 360;
    H = 72 + rows * 30 + 36; // header + rows + uplink row
  } else if (cat === 'patch_panels') {
    const cols = Math.ceil(dev.ports.length / 2);
    W = Math.max(260, cols * 22 + 30);
    H = 70;
  } else {
    W = 240;
    H = 60 + Math.min(dev.ports.length, 12) * 18;
  }
  return { x:dev.x, y:dev.y, w:W, h:H };
}

// Port center position on canvas
function getPortPos(dev, portNum) {
  const r = getDeviceRect(dev);
  const port = dev.ports.find(p => p.num === portNum);
  if (!port) return { x:r.x+r.w/2, y:r.y+r.h/2 };
  const cat = dev.category;

  if (cat === 'switches') {
    if (port.uplink) {
      const uPorts = dev.ports.filter(p=>p.uplink);
      const uIdx   = uPorts.findIndex(p=>p.num===portNum);
      return { x: r.x + 20 + uIdx * 52, y: r.y + r.h - 14 };
    }
    const dPorts = dev.ports.filter(p=>!p.uplink);
    const dIdx   = dPorts.findIndex(p=>p.num===portNum);
    const dataCols = dPorts.length <= 12 ? 6 : 12;
    const col    = Math.floor(dIdx / dataCols);
    const rowIdx = dIdx % dataCols;
    const row    = rowIdx % 2;
    const subCol = Math.floor(rowIdx / 2);
    const PW = dPorts.length <= 12 ? 36 : 24;
    return {
      x: r.x + 14 + col * (r.w / (dPorts.length<=12?1:2) + 4) + subCol * (PW + 3) + PW/2,
      y: r.y + 50 + row * 22 + 10
    };
  }

  if (cat === 'patch_panels') {
    const idx = dev.ports.findIndex(p=>p.num===portNum);
    const row = idx % 2;
    const col = Math.floor(idx / 2);
    return { x: r.x + 16 + col * 22 + 10, y: r.y + 28 + row * 20 };
  }

  // Generic list layout
  const idx = dev.ports.findIndex(p => p.num === portNum);
  return {
    x: r.x + (port.uplink ? r.w - 20 : 20),
    y: r.y + 44 + idx * 18 + 8
  };
}

// Draw everything
function drawCanvas() {
  const canvas = document.getElementById('mapper-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Subtle grid
  ctx.strokeStyle = 'rgba(0,183,217,0.04)'; ctx.lineWidth = 0.5;
  for (let x=0; x<canvas.width; x+=40) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,canvas.height); ctx.stroke(); }
  for (let y=0; y<canvas.height; y+=40) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(canvas.width,y); ctx.stroke(); }

  // Cables
  mapperState.cables.forEach(cable => {
    if (!cable.to && !cable.toDevice) return;
    const devA = mapperState.devices.find(d => d.id === cable.from.devId);
    if (!devA) return;
    const pA = getPortPos(devA, cable.from.port);
    let pB;
    if (cable.to) {
      const devB = mapperState.devices.find(d => d.id === cable.to.devId);
      if (!devB) return;
      pB = getPortPos(devB, cable.to.port);
    } else {
      pB = cable.toPos || { x: pA.x + 80, y: pA.y + 40 };
    }
    drawCable(ctx, pA, pB, cable);
  });

  // Devices
  mapperState.devices.forEach(dev => drawDevice(ctx, dev));

  // Temp drag line
  if (mapperState.dragging && mapperState.tempLine) {
    const { x1,y1,x2,y2 } = mapperState.tempLine;
    ctx.save();
    ctx.strokeStyle = 'rgba(0,183,217,0.8)'; ctx.lineWidth = 2;
    ctx.setLineDash([6,3]); ctx.shadowColor='rgba(0,183,217,0.5)'; ctx.shadowBlur=8;
    ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke();
    ctx.restore();
  }
}

function drawCable(ctx, pA, pB, cable) {
  const ct = CABLE_TYPES.find(c=>c.id===cable.type) || CABLE_TYPES[0];
  ctx.save();
  ctx.strokeStyle = ct.color; ctx.lineWidth = 2.5;
  ctx.lineCap = 'round'; ctx.shadowColor = ct.color; ctx.shadowBlur = 6;
  if (ct.dash) ctx.setLineDash([8,4]);
  const mx=(pA.x+pB.x)/2, cy1=pA.y-40, cy2=pB.y-40;
  ctx.beginPath(); ctx.moveTo(pA.x,pA.y);
  ctx.bezierCurveTo(pA.x,cy1,pB.x,cy2,pB.x,pB.y);
  ctx.stroke();
  ctx.setLineDash([]); ctx.shadowBlur=0;
  // Endpoints
  [pA,pB].forEach(p=>{ ctx.beginPath(); ctx.arc(p.x,p.y,4,0,Math.PI*2); ctx.fillStyle=ct.color; ctx.fill(); ctx.strokeStyle='rgba(0,0,0,0.5)'; ctx.lineWidth=1; ctx.stroke(); });
  // Label
  if (cable.label) {
    const lx=(pA.x+pB.x)/2, ly=Math.min(pA.y,pB.y)-24;
    ctx.font='10px -apple-system,sans-serif'; ctx.textAlign='center';
    const tw=ctx.measureText(cable.label).width;
    ctx.fillStyle='rgba(0,8,20,0.85)'; ctx.beginPath(); ctx.roundRect(lx-tw/2-5,ly-9,tw+10,18,4); ctx.fill();
    ctx.fillStyle=ct.color; ctx.textBaseline='middle'; ctx.fillText(cable.label,lx,ly);
  }
  ctx.restore();
}

function drawDevice(ctx, dev) {
  const r = getDeviceRect(dev);
  const cat = DEVICE_CATALOG[dev.category] || {};
  const selected = mapperState.selectedDevice === dev.id;
  const c = cat.color || '#374151';

  ctx.save();
  ctx.shadowColor = selected ? 'rgba(0,183,217,0.6)' : 'rgba(0,0,0,0.4)';
  ctx.shadowBlur  = selected ? 20 : 8;

  // Body
  ctx.beginPath(); ctx.roundRect(r.x,r.y,r.w,r.h,10);
  ctx.fillStyle = 'rgba(0,10,28,0.92)'; ctx.fill();
  ctx.strokeStyle = selected ? '#00B7D9' : c;
  ctx.lineWidth = selected ? 2 : 1; ctx.stroke();
  ctx.shadowBlur = 0;

  // Header bar
  ctx.beginPath(); ctx.roundRect(r.x,r.y,r.w,26,{tl:10,tr:10,bl:0,br:0});
  ctx.fillStyle = c; ctx.fill();

  // Icon + name
  ctx.fillStyle='#fff'; ctx.font='bold 11px -apple-system,sans-serif';
  ctx.textAlign='left'; ctx.textBaseline='middle';
  ctx.fillText(cat.icon+' '+(dev.hostname||dev.model), r.x+10, r.y+13);

  // Type badge right
  ctx.fillStyle='rgba(0,0,0,0.3)'; ctx.beginPath();
  ctx.roundRect(r.x+r.w-58,r.y+6,50,14,7); ctx.fill();
  ctx.fillStyle='rgba(255,255,255,0.85)'; ctx.font='9px -apple-system,sans-serif';
  ctx.textAlign='center';
  ctx.fillText(cat.label||dev.category, r.x+r.w-33, r.y+13);

  // IP/serial hint
  if (dev.ip || dev.serial) {
    ctx.fillStyle='rgba(0,183,217,0.5)'; ctx.font='9px monospace'; ctx.textAlign='left';
    ctx.fillText((dev.ip||'')+(dev.serial?' · '+dev.serial:''), r.x+10, r.y+38);
  }

  ctx.restore();

  // Draw ports based on category
  if (dev.category === 'switches') drawSwitchPorts(ctx, dev, r);
  else if (dev.category === 'patch_panels') drawPatchPorts(ctx, dev, r);
  else drawGenericPorts(ctx, dev, r);
}

function drawSwitchPorts(ctx, dev, r) {
  const dataPorts  = dev.ports.filter(p=>!p.uplink);
  const uplinkPorts= dev.ports.filter(p=>p.uplink);
  const PW = dataPorts.length<=12 ? 34 : 22;
  const PH = 16;

  dataPorts.forEach((port,idx) => {
    const cols = dataPorts.length<=12 ? 6 : 12;
    const col  = Math.floor(idx/cols);
    const ri   = idx%cols;
    const row  = ri%2, subCol=Math.floor(ri/2);
    const px   = r.x+12+col*(r.w/(dataPorts.length<=12?1:2))+subCol*(PW+3);
    const py   = r.y+44+row*22;
    const hasCable = findCableOnPort(dev.id,port.num);
    ctx.beginPath(); ctx.roundRect(px,py,PW,PH,2);
    ctx.fillStyle = hasCable?'rgba(0,183,217,0.35)':(port.device?'rgba(74,222,128,0.25)':'rgba(255,255,255,0.07)');
    ctx.fill();
    ctx.strokeStyle = hasCable?'#00B7D9':(port.device?'#4ADE80':'rgba(255,255,255,0.12)');
    ctx.lineWidth=hasCable?1.5:0.5; ctx.stroke();
    if (port.poe && port.device) {
      ctx.beginPath(); ctx.arc(px+PW-4,py+4,2,0,Math.PI*2);
      ctx.fillStyle='#FF6B6B'; ctx.fill();
    }
    ctx.fillStyle=hasCable?'#00B7D9':(port.device?'#4ADE80':'rgba(255,255,255,0.3)');
    ctx.font='7px -apple-system,sans-serif'; ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillText(port.num, px+PW/2, py+PH/2);
  });

  // Uplinks
  const ulY = r.y+r.h-28;
  ctx.fillStyle='rgba(255,255,255,0.2)'; ctx.font='9px sans-serif'; ctx.textAlign='left'; ctx.textBaseline='middle';
  ctx.fillText('Uplinks:', r.x+10, ulY+10);
  uplinkPorts.forEach((port,i) => {
    const px=r.x+72+i*54, py=ulY;
    const hasCable=findCableOnPort(dev.id,port.num);
    ctx.beginPath(); ctx.roundRect(px,py,48,20,3);
    ctx.fillStyle=hasCable?'rgba(0,220,100,0.3)':'rgba(255,255,255,0.05)';
    ctx.fill(); ctx.strokeStyle=hasCable?'#00DC64':'rgba(255,255,255,0.18)'; ctx.lineWidth=hasCable?1.5:0.5; ctx.stroke();
    ctx.fillStyle=hasCable?'#00DC64':'rgba(255,255,255,0.4)';
    ctx.font='8px sans-serif'; ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillText(port.label||('U'+i), px+24, py+10);
  });
}

function drawPatchPorts(ctx, dev, r) {
  dev.ports.forEach((port,idx) => {
    const col=Math.floor(idx/2), row=idx%2;
    const px=r.x+14+col*22, py=r.y+28+row*18;
    const hasCable=findCableOnPort(dev.id,port.num);
    ctx.beginPath(); ctx.roundRect(px,py,18,14,2);
    ctx.fillStyle=hasCable?'rgba(0,183,217,0.35)':'rgba(255,255,255,0.06)';
    ctx.fill(); ctx.strokeStyle=hasCable?'#00B7D9':'rgba(255,255,255,0.15)'; ctx.lineWidth=hasCable?1.5:0.5; ctx.stroke();
    ctx.fillStyle=hasCable?'#00B7D9':'rgba(255,255,255,0.3)';
    ctx.font='7px sans-serif'; ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillText(port.num, px+9, py+7);
  });
}

function drawGenericPorts(ctx, dev, r) {
  dev.ports.slice(0,12).forEach((port,idx) => {
    const px=r.x+(port.uplink?r.w-50:8);
    const py=r.y+40+idx*18;
    const pw=port.uplink?40:r.w-20;
    const hasCable=findCableOnPort(dev.id,port.num);
    ctx.beginPath(); ctx.roundRect(px,py,pw,15,3);
    ctx.fillStyle=hasCable?'rgba(0,183,217,0.25)':(port.uplink?'rgba(0,220,100,0.12)':'rgba(255,255,255,0.05)');
    ctx.fill(); ctx.strokeStyle=hasCable?'#00B7D9':(port.uplink?'#00DC64':'rgba(255,255,255,0.12)'); ctx.lineWidth=hasCable?1.5:0.5; ctx.stroke();
    ctx.fillStyle=hasCable?'#00B7D9':(port.uplink?'#00DC64':'rgba(255,255,255,0.4)');
    ctx.font='8px sans-serif'; ctx.textAlign='left'; ctx.textBaseline='middle';
    ctx.fillText(port.label||port.iface, px+5, py+7);
  });
  if (dev.ports.length>12) {
    ctx.fillStyle='rgba(255,255,255,0.2)'; ctx.font='9px sans-serif'; ctx.textAlign='right';
    ctx.fillText('+'+(dev.ports.length-12)+' more…', r.x+r.w-10, r.y+r.h-10);
  }
}

// ── Cable helpers ─────────────────────────────────────────────────────
function findCableOnPort(devId, portNum) {
  return mapperState.cables.find(c =>
    (c.from.devId===devId && c.from.port===portNum) ||
    (c.to && c.to.devId===devId && c.to.port===portNum)
  );
}

function getOtherEnd(cable, devId, portNum) {
  if (cable.toDevice) return cable.toDevice;
  if (!cable.to) return '';
  const isFrom = cable.from.devId===devId && cable.from.port===portNum;
  const otherId = isFrom ? cable.to.devId : cable.from.devId;
  const otherPort= isFrom ? cable.to.port : cable.from.port;
  const dev = mapperState.devices.find(d=>d.id===otherId);
  if (!dev) return '';
  const port= dev.ports.find(p=>p.num===otherPort);
  return (dev.hostname||dev.model)+' '+(port?port.iface||port.label:'');
}

function addCable(from, to) {
  // Remove existing cables on these ports first
  mapperState.cables = mapperState.cables.filter(c =>
    !((c.from.devId===from.devId&&c.from.port===from.port)||
      (c.to&&c.to.devId===from.devId&&c.to.port===from.port)||
      (c.from.devId===to.devId&&c.from.port===to.port)||
      (c.to&&c.to.devId===to.devId&&c.to.port===to.port))
  );
  const devA=mapperState.devices.find(d=>d.id===from.devId);
  const devB=mapperState.devices.find(d=>d.id===to.devId);
  const pA=devA&&devA.ports.find(p=>p.num===from.port);
  const pB=devB&&devB.ports.find(p=>p.num===to.port);
  const lbl=(pA?pA.label||pA.iface:'?')+' ↔ '+(pB?pB.label||pB.iface:'?');
  mapperState.cables.push({ id:'c'+(mapperNextId++), from, to, toDevice:null, type:mapperState.activeCableType, label:lbl });
  if (pA) pA.connected=true;
  if (pB) pB.connected=true;
  drawCanvas(); renderDeviceDetail();
  if(window.updateCableSummary) updateCableSummary();
  showMapperToast('Cable: '+lbl);
}

// ── Canvas events ─────────────────────────────────────────────────────
function setupCanvasEvents(canvas) {
  ['mousedown','mousemove','mouseup','touchstart','touchmove','touchend'].forEach(ev => {
    canvas.removeEventListener(ev, canvas['_'+ev]);
  });
  const onDown = e => {
    const pos = canvasPos(e);
    const portHit = hitPort(pos.x, pos.y);
    if (portHit) {
      const dev = mapperState.devices.find(d=>d.id===portHit.devId);
      const pp  = getPortPos(dev, portHit.port);
      mapperState.dragging = true;
      mapperState.dragFrom = portHit;
      mapperState.tempLine = { x1:pp.x, y1:pp.y, x2:pos.x, y2:pos.y };
      mapperState.selectedDevice = portHit.devId;
      renderDeviceList(); renderDeviceDetail();
      return;
    }
    const dev = hitDevice(pos.x, pos.y);
    if (dev) {
      mapperState.dragDevice = dev;
      mapperState.dragOffX   = pos.x - dev.x;
      mapperState.dragOffY   = pos.y - dev.y;
      mapperState.selectedDevice = dev.id;
      renderDeviceList(); renderDeviceDetail();
    }
  };
  const onMove = e => {
    const pos = canvasPos(e);
    if (mapperState.dragging && mapperState.dragFrom) {
      const dev = mapperState.devices.find(d=>d.id===mapperState.dragFrom.devId);
      const pp  = getPortPos(dev, mapperState.dragFrom.port);
      mapperState.tempLine = { x1:pp.x, y1:pp.y, x2:pos.x, y2:pos.y };
      drawCanvas(); return;
    }
    if (mapperState.dragDevice) {
      mapperState.dragDevice.x = Math.max(0, pos.x - mapperState.dragOffX);
      mapperState.dragDevice.y = Math.max(0, pos.y - mapperState.dragOffY);
      drawCanvas();
    }
  };
  const onUp = e => {
    if (mapperState.dragging && mapperState.dragFrom) {
      const pos = canvasPos(e);
      const hitTo = hitPort(pos.x, pos.y);
      if (hitTo && (hitTo.devId!==mapperState.dragFrom.devId||hitTo.port!==mapperState.dragFrom.port)) {
        addCable(mapperState.dragFrom, hitTo);
      } else if (!hitTo) {
        const lbl = prompt('Label this cable connection to an external device:', '');
        if (lbl) {
          const dev=mapperState.devices.find(d=>d.id===mapperState.dragFrom.devId);
          const port=dev&&dev.ports.find(p=>p.num===mapperState.dragFrom.port);
          const pp = getPortPos(dev, mapperState.dragFrom.port);
          mapperState.cables.push({ id:'c'+(mapperNextId++), from:mapperState.dragFrom, to:null, toDevice:lbl, toPos:{x:pos.x,y:pos.y}, type:mapperState.activeCableType, label:lbl });
          if(port){port.device=lbl;port.connected=true;}
          if(window.updateCableSummary) updateCableSummary();
          renderDeviceDetail();
        }
      }
      mapperState.dragging=false; mapperState.dragFrom=null; mapperState.tempLine=null; drawCanvas();
      return;
    }
    mapperState.dragDevice=null;
  };
  canvas._mousedown=onDown; canvas._mousemove=onMove; canvas._mouseup=onUp;
  canvas.addEventListener('mousedown', onDown);
  canvas.addEventListener('mousemove', onMove);
  canvas.addEventListener('mouseup',   onUp);
  canvas.addEventListener('touchstart', e=>{e.preventDefault();onDown(e.touches[0])},{passive:false});
  canvas.addEventListener('touchmove',  e=>{e.preventDefault();onMove(e.touches[0])},{passive:false});
  canvas.addEventListener('touchend',   e=>onUp(e.changedTouches[0]));
}

function canvasPos(e) {
  const canvas = document.getElementById('mapper-canvas');
  const r = canvas.getBoundingClientRect();
  const sx = canvas.width/r.width, sy = canvas.height/r.height;
  return { x:(e.clientX-r.left)*sx, y:(e.clientY-r.top)*sy };
}

function hitPort(x, y) {
  for (const dev of mapperState.devices) {
    for (const port of dev.ports) {
      const pp = getPortPos(dev, port.num);
      if (Math.abs(x-pp.x)<16 && Math.abs(y-pp.y)<12) return { devId:dev.id, port:port.num };
    }
  }
  return null;
}

function hitDevice(x, y) {
  for (const dev of [...mapperState.devices].reverse()) {
    const r = getDeviceRect(dev);
    if (x>=r.x&&x<=r.x+r.w&&y>=r.y&&y<=r.y+r.h) return dev;
  }
  return null;
}

// ── Port detail panel ─────────────────────────────────────────────────
function renderDeviceDetail() {
  const el = document.getElementById('mapper-port-detail');
  if (!el) return;
  const dev = mapperState.devices.find(d=>d.id===mapperState.selectedDevice);
  if (!dev) { el.innerHTML='<p style="color:var(--text3);font-size:12px;padding:10px 0">Select a device above to edit its details and port assignments.</p>'; return; }
  const cat = DEVICE_CATALOG[dev.category]||{};

  el.innerHTML = `
    <div style="margin-bottom:14px">
      <div class="field-grid col2" style="gap:10px;margin-bottom:10px">
        <div class="field-group"><label>Hostname / label</label>
          <input type="text" value="${dev.hostname||''}" placeholder="e.g. SW-CORE-01" oninput="updDev('${dev.id}','hostname',this.value)"></div>
        <div class="field-group"><label>Mgmt IP</label>
          <input type="text" value="${dev.ip||''}" placeholder="e.g. 10.0.0.2" oninput="updDev('${dev.id}','ip',this.value)"></div>
        <div class="field-group"><label>Location / rack unit</label>
          <input type="text" value="${dev.location||''}" placeholder="e.g. Rack A, U12" oninput="updDev('${dev.id}','location',this.value)"></div>
        <div class="field-group"><label>Serial number</label>
          <input type="text" value="${dev.serial||''}" placeholder="Optional" oninput="updDev('${dev.id}','serial',this.value)"></div>
        <div class="field-group col-full"><label>Notes</label>
          <input type="text" value="${dev.notes||''}" placeholder="Any extra info" oninput="updDev('${dev.id}','notes',this.value)"></div>
      </div>
      <div style="font-size:10px;color:var(--text3);background:rgba(0,183,217,0.05);padding:8px 10px;border-radius:8px;border:1px solid var(--border)">
        ${cat.icon||'📦'} <strong style="color:var(--cyan)">${dev.model}</strong>
        ${dev.def.desc?'· '+dev.def.desc:''}
        ${dev.def.poe?'· PoE '+dev.def.poeBudget:''}
        ${dev.def.va?'· '+dev.def.va+'VA / '+dev.def.watts+'W':''}
        ${dev.def.outlets?'· '+dev.def.outlets+' outlets, '+dev.def.amps+' '+dev.def.voltage:''}
      </div>
    </div>
    <h3 class="sub-heading" style="margin-bottom:8px">Ports / connections</h3>
    <div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse;font-size:12px;min-width:480px">
        <thead><tr>
          ${['#','Interface','Connected to / label','VLAN','Speed','Notes',''].map(h=>`<th style="padding:5px 8px;text-align:left;font-size:9px;color:var(--cyan);border-bottom:1px solid var(--border);text-transform:uppercase;letter-spacing:.08em;white-space:nowrap">${h}</th>`).join('')}
        </tr></thead>
        <tbody>
          ${dev.ports.map(p => {
            const cable = findCableOnPort(dev.id, p.num);
            const other = cable ? getOtherEnd(cable, dev.id, p.num) : '';
            const bg = cable?'rgba(0,183,217,0.06)':(p.device?'rgba(74,222,128,0.04)':'');
            const badge = p.uplink
              ? `<span style="font-size:9px;padding:1px 6px;border-radius:4px;background:rgba(0,220,100,0.15);color:#00DC64;border:1px solid rgba(0,220,100,0.3)">↑</span>`
              : p.poe ? `<span style="font-size:9px;padding:1px 6px;border-radius:4px;background:rgba(255,107,107,0.12);color:#FF6B6B;border:1px solid rgba(255,107,107,0.25)">PoE</span>` : '';
            return `<tr style="background:${bg};border-bottom:1px solid rgba(0,183,217,0.05)">
              <td style="padding:4px 8px;color:var(--text2);font-weight:600;white-space:nowrap">${p.num} ${badge}</td>
              <td style="padding:4px 8px;font-family:monospace;font-size:10px;color:var(--text3);white-space:nowrap">${p.iface||p.label}</td>
              <td style="padding:4px 8px"><input type="text" value="${other||p.device||''}" placeholder="Device / label" style="width:100%;padding:3px 6px;font-size:11px;background:rgba(0,20,50,0.5);border:1px solid var(--border);border-radius:4px;color:var(--text)" oninput="updPort('${dev.id}',${p.num},'device',this.value)"></td>
              <td style="padding:4px 8px"><input type="text" value="${p.vlan||''}" placeholder="VLAN" style="width:54px;padding:3px 6px;font-size:11px;background:rgba(0,20,50,0.5);border:1px solid var(--border);border-radius:4px;color:var(--text)" oninput="updPort('${dev.id}',${p.num},'vlan',this.value)"></td>
              <td style="padding:4px 8px"><input type="text" value="${p.speed||''}" placeholder="1G" style="width:54px;padding:3px 6px;font-size:11px;background:rgba(0,20,50,0.5);border:1px solid var(--border);border-radius:4px;color:var(--text)" oninput="updPort('${dev.id}',${p.num},'speed',this.value)"></td>
              <td style="padding:4px 8px"><input type="text" value="${p.notes||''}" placeholder="Notes" style="width:100%;padding:3px 6px;font-size:11px;background:rgba(0,20,50,0.5);border:1px solid var(--border);border-radius:4px;color:var(--text)" oninput="updPort('${dev.id}',${p.num},'notes',this.value)"></td>
              <td style="padding:4px 8px">${cable?`<button onclick="removeCableOnPort('${dev.id}',${p.num})" style="background:rgba(255,107,107,0.1);border:1px solid rgba(255,107,107,0.2);color:#FF6B6B;border-radius:4px;padding:2px 7px;cursor:pointer;font-size:10px">✕</button>`:''}</td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>
    <div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap">
      <button class="btn btn-ghost" style="font-size:12px;padding:6px 12px" onclick="SwitchMapper.exportCSV()">&#8681; Export CSV</button>
      <button class="btn btn-outline" style="font-size:12px;padding:6px 12px" onclick="saveMapperToSurvey()">&#10003; Save map</button>
    </div>`;
}

window.updDev = function(id,field,val){ const d=mapperState.devices.find(x=>x.id===id); if(d){d[field]=val; drawCanvas();} };
window.updPort= function(devId,num,field,val){ const d=mapperState.devices.find(x=>x.id===devId); const p=d&&d.ports.find(x=>x.num===num); if(p){p[field]=val; if(field==='device')p.connected=!!val; drawCanvas();} };
window.removeCableOnPort=function(devId,portNum){
  mapperState.cables=mapperState.cables.filter(c=>!((c.from.devId===devId&&c.from.port===portNum)||(c.to&&c.to.devId===devId&&c.to.port===portNum)));
  const d=mapperState.devices.find(x=>x.id===devId); const p=d&&d.ports.find(x=>x.num===portNum); if(p)p.connected=false;
  drawCanvas(); renderDeviceDetail(); if(window.updateCableSummary) updateCableSummary();
};

window.saveMapperToSurvey=function(){
  try{ localStorage.setItem('netsurvey_mapper_'+(localStorage.getItem('netsurvey_latest')||'default'), JSON.stringify(SwitchMapper.getData())); showMapperToast('Map saved ✓'); }
  catch(e){ showMapperToast('Save failed'); }
};
window.loadMapperFromSurvey=function(){
  try{ const raw=localStorage.getItem('netsurvey_mapper_'+(localStorage.getItem('netsurvey_latest')||'default')); if(raw){ SwitchMapper.loadData(JSON.parse(raw)); showMapperToast('Map loaded'); } }
  catch(e){}
};

function showMapperToast(msg){ if(window.showToast)showToast(msg); }
function dl(content,filename,mime){ const b=new Blob([content],{type:mime}); const a=document.createElement('a'); a.href=URL.createObjectURL(b); a.download=filename; a.click(); URL.revokeObjectURL(a.href); }

window.addEventListener('resize',()=>{
  const canvas = document.getElementById('mapper-canvas');
  const wrap   = document.getElementById('mapper-canvas-wrap');
  if (!canvas || !wrap) return;
  const W = wrap.offsetWidth || 860;
  canvas.width = W; canvas.style.width = W + 'px';
  drawCanvas();
});

// Re-render canvas when existing-eq section becomes visible
// (called from app.js goToSection)
window.onMapperSectionVisible = function() {
  setTimeout(() => { renderMapper(); }, 80);
};
