// ── Equipment Catalog ──

const CISCO = {
  switches: [
    { model:'Catalyst 9200L-24P',   ports:'24x 1G PoE+',              uplinks:'4x 1G SFP',          poe:'195W',   layer:'L2/L3', desc:'Fixed access switch, ideal for small branch' },
    { model:'Catalyst 9200L-48P',   ports:'48x 1G PoE+',              uplinks:'4x 1G SFP',          poe:'370W',   layer:'L2/L3', desc:'High-density fixed access, branch/campus' },
    { model:'Catalyst 9300-24P',    ports:'24x 1G PoE+',              uplinks:'4x 1G/10G SFP+',     poe:'437W',   layer:'L2/L3', desc:'Modular uplink access switch, StackWise-320' },
    { model:'Catalyst 9300-48P',    ports:'48x 1G PoE+',              uplinks:'4x 1G/10G SFP+',     poe:'437W',   layer:'L2/L3', desc:'High-density campus access, StackWise-320' },
    { model:'Catalyst 9300-48UXM',  ports:'12x mGig + 36x 1G PoE+',  uplinks:'2x 25G SFP28',       poe:'860W',   layer:'L2/L3', desc:'Multi-gig for high-density Wi-Fi 6 deployments' },
    { model:'Catalyst 9300X-24HX',  ports:'24x mGig PoE++',           uplinks:'2x 25G SFP28',       poe:'1440W',  layer:'L2/L3', desc:'Ultra-high PoE++ for dense AP/IoT environments' },
    { model:'Catalyst 9400-24XS',   ports:'24x 10G SFP+',             uplinks:'Chassis modular',    poe:'Optional',layer:'L3',  desc:'Modular chassis line card, 7-slot chassis' },
    { model:'Catalyst 9500-24Y4C',  ports:'24x 25G + 4x 100G QSFP28',uplinks:'Native',             poe:'None',   layer:'L3',   desc:'Core/distribution, 25G/100G spine switching' },
    { model:'Catalyst 9500-48Y4C',  ports:'48x 25G + 4x 100G QSFP28',uplinks:'Native',             poe:'None',   layer:'L3',   desc:'High-density core, 100G uplinks' },
    { model:'Nexus 9300-48S',       ports:'48x 1G/10G SFP+',          uplinks:'6x 40G QSFP+',       poe:'None',   layer:'L2/L3', desc:'Data center leaf switch, ACI or NX-OS' },
    { model:'Nexus 9336C-FX2',      ports:'36x 100G QSFP28',          uplinks:'Native',             poe:'None',   layer:'L3',   desc:'Data center spine, 100G fabric' },
    { model:'SG350-28',             ports:'24x 1G + 2x Combo SFP',    uplinks:'2x SFP',             poe:'Optional',layer:'L2', desc:'SMB smart managed switch' },
    { model:'SG350-52P',            ports:'48x 1G PoE + 2x Combo SFP',uplinks:'2x SFP',            poe:'370W',   layer:'L2',   desc:'SMB high-density PoE smart switch' },
  ],
  aps: [
    { model:'Catalyst 9105AXI',  wifi:'Wi-Fi 6',   mimo:'2×2',         maxrate:'1.5 Gbps', indoor:true,  poe:'802.3at', desc:'Entry-level indoor AP, small offices' },
    { model:'Catalyst 9115AXI',  wifi:'Wi-Fi 6',   mimo:'4×4',         maxrate:'5.4 Gbps', indoor:true,  poe:'802.3at', desc:'Mid-range indoor, open spaces & classrooms' },
    { model:'Catalyst 9120AXI',  wifi:'Wi-Fi 6',   mimo:'8×8',         maxrate:'9.6 Gbps', indoor:true,  poe:'802.3bt', desc:'High-capacity indoor, dense enterprise' },
    { model:'Catalyst 9124AXD',  wifi:'Wi-Fi 6',   mimo:'4×4',         maxrate:'5.4 Gbps', indoor:false, poe:'802.3bt', desc:'Outdoor/ruggedized, stadiums & campuses' },
    { model:'Catalyst 9136AXI',  wifi:'Wi-Fi 6E',  mimo:'12 streams',  maxrate:'11.5 Gbps',indoor:true,  poe:'802.3bt', desc:'Tri-band 6E, ultra-high density venues' },
    { model:'Catalyst 9164I',    wifi:'Wi-Fi 6E',  mimo:'4×4',         maxrate:'7.8 Gbps', indoor:false, poe:'802.3bt', desc:'Outdoor 6E, large campus exteriors' },
    { model:'Meraki MR28',       wifi:'Wi-Fi 6',   mimo:'2×2',         maxrate:'1.7 Gbps', indoor:true,  poe:'802.3af', desc:'Cloud-managed, small office / low density' },
    { model:'Meraki MR36',       wifi:'Wi-Fi 6',   mimo:'2×2',         maxrate:'1.7 Gbps', indoor:true,  poe:'802.3at', desc:'Cloud-managed, standard indoor deployments' },
    { model:'Meraki MR36H',      wifi:'Wi-Fi 6',   mimo:'2×2',         maxrate:'1.7 Gbps', indoor:true,  poe:'802.3at', desc:'Wall-plate AP, hotels & MDU wired+wireless' },
    { model:'Meraki MR44',       wifi:'Wi-Fi 6',   mimo:'4×4',         maxrate:'3.5 Gbps', indoor:true,  poe:'802.3at', desc:'Cloud-managed, medium-density offices' },
    { model:'Meraki MR46',       wifi:'Wi-Fi 6',   mimo:'4×4',         maxrate:'5.4 Gbps', indoor:true,  poe:'802.3at', desc:'Cloud-managed, high-performance indoor' },
    { model:'Meraki MR46E',      wifi:'Wi-Fi 6',   mimo:'4×4',         maxrate:'5.4 Gbps', indoor:true,  poe:'802.3at', desc:'External antenna variant for directional coverage' },
    { model:'Meraki MR55',       wifi:'Wi-Fi 6',   mimo:'8×8',         maxrate:'9.6 Gbps', indoor:true,  poe:'802.3bt', desc:'Cloud-managed, ultra-high density' },
    { model:'Meraki MR57',       wifi:'Wi-Fi 6E',  mimo:'4×4 tri-band',maxrate:'7.8 Gbps', indoor:true,  poe:'802.3bt', desc:'Cloud-managed 6E, future-proof enterprise' },
    { model:'Meraki MR76',       wifi:'Wi-Fi 6',   mimo:'4×4',         maxrate:'1.7 Gbps', indoor:false, poe:'802.3bt', desc:'Outdoor cloud-managed, campuses & warehouses' },
    { model:'Meraki MR78',       wifi:'Wi-Fi 6',   mimo:'2×2',         maxrate:'1.1 Gbps', indoor:false, poe:'802.3at', desc:'Rugged outdoor AP for harsh environments' },
    { model:'Meraki MR86',       wifi:'Wi-Fi 6',   mimo:'4×4',         maxrate:'5.4 Gbps', indoor:false, poe:'802.3bt', desc:'High-performance outdoor, large venues' },
  ],
  routers: [
    { model:'ISR 1100-4P',    ports:'4x WAN', desc:'Entry branch router, integrated security' },
    { model:'ISR 4331',       ports:'3x WAN', desc:'Mid-range branch, modular NIM slots' },
    { model:'Catalyst 8200',  ports:'2x WAN + NIM', desc:'Next-gen SD-WAN branch router' },
    { model:'Catalyst 8300',  ports:'4x WAN + NIM', desc:'Enterprise edge, multi-service' },
    { model:'ASR 1001-X',     ports:'6x SFP/SFP+', desc:'Aggregation services, 20 Gbps throughput' },
  ],
};

const ARISTA = {
  switches: [
    { model:'EOS 720DP-48ZC2',    ports:'48x mGig PoE+',          uplinks:'2x 100G QSFP28', poe:'720W',   layer:'L2/L3', desc:'Multi-gig access for dense Wi-Fi 6 environments' },
    { model:'EOS 720XP-48ZC2',    ports:'48x mGig PoE++',         uplinks:'2x 100G QSFP28', poe:'1440W',  layer:'L2/L3', desc:'Ultra-PoE access, supports 90W per port' },
    { model:'EOS 720XP-24ZY4',    ports:'24x 25G SFP28',          uplinks:'4x 100G QSFP28', poe:'None',   layer:'L2/L3', desc:'High-density 25G edge, MACsec capable' },
    { model:'EOS 7050CX3-32S',    ports:'32x 100G QSFP28',        uplinks:'Native',          poe:'None',   layer:'L3',   desc:'Leaf switch, ultra-low latency for HPC/DC' },
    { model:'EOS 7050TX-64',      ports:'48x 10G + 4x 40G',       uplinks:'4x QSFP+',        poe:'None',   layer:'L3',   desc:'Dual-speed leaf, 10G/40G data center' },
    { model:'EOS 7280R3A-48YC6',  ports:'48x 25G + 6x 400G',      uplinks:'Native',          poe:'None',   layer:'L3',   desc:'Spine/leaf, deep buffer for financial & HPC' },
    { model:'EOS 7500R3-36CQ',    ports:'36x 400G QSFP-DD',       uplinks:'Modular',         poe:'None',   layer:'L3',   desc:'Modular spine chassis, 400G/800G fabric' },
  ],
  velo: [
    { model:'VeloCloud Edge 620',     ports:'4x WAN + 8x LAN',       lte:'Dual LTE', desc:'Branch SD-WAN edge, dual LTE failover' },
    { model:'VeloCloud Edge 640',     ports:'8x WAN + 8x LAN',       lte:'Optional', desc:'Mid-size branch, 8-port WAN flexibility' },
    { model:'VeloCloud Edge 680',     ports:'2x SFP+ + 8x WAN',      lte:'None',     desc:'High-performance SD-WAN, 10G SFP+ uplinks' },
    { model:'VeloCloud Edge 3800',    ports:'4x 10G SFP+ + 8x 1G',   lte:'None',     desc:'Campus SD-WAN gateway, 10G aggregation' },
    { model:'VeloCloud Edge 3810',    ports:'4x 10G SFP+ + 8x 1G',   lte:'Optional', desc:'HA rack-mount campus gateway' },
    { model:'VeloCloud Orchestrator', ports:'N/A',                    lte:'N/A',      desc:'Cloud or on-prem SD-WAN management platform' },
    { model:'VeloCloud Gateway',      ports:'N/A',                    lte:'N/A',      desc:'PoP gateway for cloud on-ramp & internet backhaul' },
  ],
  aps: [
    { model:'W-118',  wifi:'Wi-Fi 6',   mimo:'2×2',          maxrate:'1.5 Gbps', indoor:true,  poe:'802.3at', desc:'Indoor AP, CV-CUE cloud managed' },
    { model:'W-128',  wifi:'Wi-Fi 6E',  mimo:'4×4 tri-band', maxrate:'7.3 Gbps', indoor:true,  poe:'802.3bt', desc:'Tri-band 6E indoor AP, enterprise campus' },
    { model:'O-235E', wifi:'Wi-Fi 6E',  mimo:'4×4 tri-band', maxrate:'7.3 Gbps', indoor:false, poe:'802.3bt', desc:'IP67 outdoor 6E AP, large campuses' },
  ],
};

function getSpecChips(vendor, cat, modelName) {
  let lib = vendor === 'cisco' ? CISCO : ARISTA;
  let item = lib[cat] && lib[cat].find(m => m.model === modelName);
  if (!item) return '';
  let chips = [];
  if (item.ports)   chips.push(`<span class="spec-chip">&#128268; ${item.ports}</span>`);
  if (item.uplinks) chips.push(`<span class="spec-chip">&#8593; ${item.uplinks}</span>`);
  if (item.poe && item.poe !== 'None' && item.poe !== 'N/A') chips.push(`<span class="spec-chip">&#9889; PoE ${item.poe}</span>`);
  if (item.layer)   chips.push(`<span class="spec-chip">${item.layer}</span>`);
  if (item.wifi)    chips.push(`<span class="spec-chip">&#128246; ${item.wifi}</span>`);
  if (item.mimo)    chips.push(`<span class="spec-chip">MIMO ${item.mimo}</span>`);
  if (item.maxrate) chips.push(`<span class="spec-chip">&#128640; ${item.maxrate}</span>`);
  if (item.indoor !== undefined) chips.push(`<span class="spec-chip">${item.indoor ? '&#127968; Indoor' : '&#127795; Outdoor'}</span>`);
  if (item.lte && item.lte !== 'N/A' && item.lte !== 'None') chips.push(`<span class="spec-chip">&#128246; LTE ${item.lte}</span>`);
  return chips.length ? `<div class="spec-chips">${chips.join('')}</div>` : '';
}

function getItemDesc(vendor, cat, modelName) {
  let lib = vendor === 'cisco' ? CISCO : ARISTA;
  let item = lib[cat] && lib[cat].find(m => m.model === modelName);
  return item ? item.desc : '';
}
