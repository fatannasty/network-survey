// ── Device Sensors: GPS + Network Signal ──

const Sensors = {
  gps: { lat: null, lng: null, accuracy: null, timestamp: null, watching: false, watchId: null },
  network: { type: null, effectiveType: null, downlink: null, signal: null, bars: 0 },

  // ── GPS ──
  startGPS(onUpdate, onError) {
    if (!navigator.geolocation) { if (onError) onError('GPS not supported on this device'); return; }
    this.gps.watching = true;
    this.gps.watchId = navigator.geolocation.watchPosition(
      pos => {
        this.gps.lat       = pos.coords.latitude;
        this.gps.lng       = pos.coords.longitude;
        this.gps.accuracy  = Math.round(pos.coords.accuracy);
        this.gps.timestamp = new Date();
        if (onUpdate) onUpdate(this.gps);
      },
      err => {
        const msgs = { 1:'Permission denied', 2:'Position unavailable', 3:'GPS timeout' };
        if (onError) onError(msgs[err.code] || 'GPS error');
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
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
        this.gps.lat       = pos.coords.latitude;
        this.gps.lng       = pos.coords.longitude;
        this.gps.accuracy  = Math.round(pos.coords.accuracy);
        this.gps.timestamp = new Date();
        if (onUpdate) onUpdate(this.gps);
      },
      err => {
        const msgs = { 1:'Permission denied', 2:'Position unavailable', 3:'GPS timeout' };
        if (onError) onError(msgs[err.code] || 'GPS error');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  },

  formatCoords() {
    if (this.gps.lat === null) return '';
    const lat = this.gps.lat.toFixed(6), lng = this.gps.lng.toFixed(6);
    return `${lat}, ${lng}`;
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

  // ── Network signal ──
  readNetwork() {
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (conn) {
      this.network.type          = conn.type || 'unknown';
      this.network.effectiveType = conn.effectiveType || 'unknown';
      this.network.downlink      = conn.downlink || null;
      this.network.bars          = this._effectiveToBars(conn.effectiveType, conn.downlink);
      this.network.signal        = this._effectiveToLabel(conn.effectiveType, conn.type);
    } else {
      // Fallback: navigator.onLine only
      this.network.type          = navigator.onLine ? 'unknown' : 'none';
      this.network.effectiveType = 'unknown';
      this.network.bars          = navigator.onLine ? 2 : 0;
      this.network.signal        = navigator.onLine ? 'Connected' : 'Offline';
    }
    return this.network;
  },

  _effectiveToBars(eff, dl) {
    if (!navigator.onLine) return 0;
    if (eff === '4g') return dl >= 20 ? 5 : dl >= 8 ? 4 : 3;
    if (eff === '3g') return 3;
    if (eff === '2g') return 2;
    if (eff === 'slow-2g') return 1;
    return navigator.onLine ? 3 : 0;
  },

  _effectiveToLabel(eff, type) {
    if (!navigator.onLine) return 'Offline';
    const typeMap = { wifi: 'Wi-Fi', ethernet: 'Ethernet', cellular: 'Cellular', none: 'Offline', bluetooth: 'Bluetooth' };
    const effMap  = { '4g': '4G LTE', '3g': '3G', '2g': '2G', 'slow-2g': 'Slow 2G' };
    if (type && typeMap[type]) return typeMap[type] + (eff && effMap[eff] ? ' · ' + effMap[eff] : '');
    return effMap[eff] || 'Connected';
  },

  watchNetwork(onUpdate) {
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (conn) {
      conn.addEventListener('change', () => { this.readNetwork(); if (onUpdate) onUpdate(this.network); });
    }
    window.addEventListener('online',  () => { this.readNetwork(); if (onUpdate) onUpdate(this.network); });
    window.addEventListener('offline', () => { this.readNetwork(); if (onUpdate) onUpdate(this.network); });
    this.readNetwork();
    return this.network;
  },

  // ── Photo metadata helper ──
  buildPhotoMeta(label) {
    const meta = { label, timestamp: new Date().toISOString() };
    if (this.gps.lat !== null) {
      meta.lat      = this.gps.lat;
      meta.lng      = this.gps.lng;
      meta.accuracy = this.gps.accuracy;
      meta.coords   = this.formatCoords();
      meta.mapsUrl  = this.getGoogleMapsURL();
    }
    meta.network = this.network.signal || 'Unknown';
    meta.networkBars = this.network.bars;
    return meta;
  },
};

window.Sensors = Sensors;
