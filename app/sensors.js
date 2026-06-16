// ── Device Sensors: GPS + Network Signal ──
const Sensors = {
  gps: { lat:null, lng:null, accuracy:null, timestamp:null, watching:false, watchId:null },
  network: { type:null, effectiveType:null, downlink:null, signal:'Detecting…', bars:0 },

  // ── GPS ──
  startGPS(onUpdate, onError) {
    if (!navigator.geolocation) { if (onError) onError('GPS not supported'); return; }
    this.gps.watching = true;
    this.gps.watchId = navigator.geolocation.watchPosition(
      pos => {
        this.gps.lat      = pos.coords.latitude;
        this.gps.lng      = pos.coords.longitude;
        this.gps.accuracy = Math.round(pos.coords.accuracy);
        this.gps.timestamp = new Date();
        if (onUpdate) onUpdate(this.gps);
      },
      err => {
        const msgs = {1:'Permission denied — allow location in browser settings',2:'Position unavailable',3:'GPS timeout'};
        if (onError) onError(msgs[err.code]||'GPS error');
      },
      { enableHighAccuracy:true, timeout:15000, maximumAge:10000 }
    );
  },

  stopGPS() {
    if (this.gps.watchId !== null) navigator.geolocation.clearWatch(this.gps.watchId);
    this.gps.watching = false;
  },

  getOnceGPS(onUpdate, onError) {
    if (!navigator.geolocation) { if (onError) onError('GPS not supported'); return; }
    navigator.geolocation.getCurrentPosition(
      pos => {
        this.gps.lat      = pos.coords.latitude;
        this.gps.lng      = pos.coords.longitude;
        this.gps.accuracy = Math.round(pos.coords.accuracy);
        this.gps.timestamp = new Date();
        if (onUpdate) onUpdate(this.gps);
      },
      err => {
        const msgs = {1:'Permission denied',2:'Position unavailable',3:'GPS timeout'};
        if (onError) onError(msgs[err.code]||'GPS error');
      },
      { enableHighAccuracy:true, timeout:10000, maximumAge:0 }
    );
  },

  formatCoords() {
    if (this.gps.lat === null) return '';
    return `${this.gps.lat.toFixed(6)}, ${this.gps.lng.toFixed(6)}`;
  },

  formatCoordsDisplay() {
    if (this.gps.lat === null) return null;
    const latD = Math.abs(this.gps.lat).toFixed(5), latH = this.gps.lat >= 0 ? 'N' : 'S';
    const lngD = Math.abs(this.gps.lng).toFixed(5), lngH = this.gps.lng >= 0 ? 'E' : 'W';
    return `${latD}° ${latH},  ${lngD}° ${lngH}`;
  },

  getGoogleMapsURL() {
    if (this.gps.lat === null) return null;
    return `https://maps.google.com/?q=${this.gps.lat},${this.gps.lng}`;
  },

  // ── Network detection ──
  // Reads current network state from browser APIs
  readNetwork() {
    if (!navigator.onLine) {
      this.network = { type:'none', effectiveType:'none', downlink:null, signal:'Offline ✕', bars:0 };
      return this.network;
    }

    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

    if (!conn) {
      // No Network Information API — browser doesn't support it (Safari, some Firefox)
      // We can still tell them they're online
      this.network = { type:'unknown', effectiveType:'unknown', downlink:null, signal:'Online (type unknown)', bars:3 };
      return this.network;
    }

    const type = conn.type || '';          // 'wifi', 'cellular', 'ethernet', 'none', 'bluetooth', 'other', 'unknown'
    const eff  = conn.effectiveType || ''; // '4g', '3g', '2g', 'slow-2g'
    const dl   = conn.downlink || null;    // Mbps estimate
    const rtt  = conn.rtt   || null;       // ms

    // Build human-readable signal string
    const typeLabel = {
      wifi:     'Wi-Fi',
      cellular: 'Cellular',
      ethernet: 'Wired (Ethernet)',
      bluetooth:'Bluetooth',
      none:     'Offline',
      other:    'Other',
      unknown:  '',
    }[type] || '';

    const effLabel = {
      '4g':     '4G LTE',
      '3g':     '3G',
      '2g':     '2G',
      'slow-2g':'Slow 2G',
    }[eff] || '';

    let signal = typeLabel || 'Online';
    if (effLabel && type === 'cellular') signal += ' · ' + effLabel;
    if (dl) signal += ' · ' + dl + ' Mbps';

    // Signal bars based on type + effective type + downlink
    let bars = 3;
    if (type === 'ethernet')        bars = 5;
    else if (type === 'wifi')       bars = dl ? (dl >= 50 ? 5 : dl >= 10 ? 4 : 3) : 4;
    else if (type === 'cellular')   bars = eff === '4g' ? (dl >= 10 ? 4 : 3) : eff === '3g' ? 2 : 1;
    else if (type === 'none')       bars = 0;
    else if (eff === '4g')          bars = 4;
    else if (eff === '3g')          bars = 3;
    else if (eff === '2g')          bars = 2;
    else if (eff === 'slow-2g')     bars = 1;

    this.network = { type, effectiveType:eff, downlink:dl, rtt, signal, bars };
    return this.network;
  },

  // Watch for network changes and call callback immediately + on every change
  watchNetwork(onUpdate) {
    // Read immediately
    this.readNetwork();
    if (onUpdate) onUpdate(this.network);

    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (conn) {
      conn.addEventListener('change', () => {
        this.readNetwork();
        if (onUpdate) onUpdate(this.network);
      });
    }
    window.addEventListener('online',  () => { this.readNetwork(); if (onUpdate) onUpdate(this.network); });
    window.addEventListener('offline', () => { this.readNetwork(); if (onUpdate) onUpdate(this.network); });

    return this.network;
  },

  // Attach GPS meta to a photo
  buildPhotoMeta(label) {
    const meta = { label, timestamp: new Date().toISOString() };
    if (this.gps.lat !== null) {
      meta.lat      = this.gps.lat;
      meta.lng      = this.gps.lng;
      meta.accuracy = this.gps.accuracy;
      meta.coords   = this.formatCoords();
      meta.mapsUrl  = this.getGoogleMapsURL();
    }
    meta.network     = this.network.signal || 'Unknown';
    meta.networkBars = this.network.bars;
    return meta;
  },
};

window.Sensors = Sensors;
