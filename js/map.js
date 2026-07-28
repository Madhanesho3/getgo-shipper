/* =====================================================
   MAP.JS – GetGo Shipper – Leaflet Map Manager
   Live maps for all booking & tracking pages
   ===================================================== */

const GGMap = (() => {

  const instances = {};

  /* ── Custom Icons ─────────────────────────────────── */
  function makeIcon(type, label = '') {
    const cfg = {
      pickup  : { bg: '#00C851', emoji: '📍', size: 40 },
      drop    : { bg: '#EF4444', emoji: '🏁', size: 40 },
      stop    : { bg: '#F59E0B', emoji: '📍', size: 36 },
      driver  : { bg: '#1E40AF', emoji: '🚗', size: 44 },
      user    : { bg: '#7C3AED', emoji: '◉',  size: 36 },
      default : { bg: '#6B7280', emoji: '📍', size: 36 },
    }[type] || { bg: '#6B7280', emoji: '📍', size: 36 };

    const html = `
      <div style="
        position:relative;
        width:${cfg.size}px;height:${cfg.size + 8}px;
        display:flex;flex-direction:column;align-items:center;
        filter:drop-shadow(0 3px 6px rgba(0,0,0,0.35));
      ">
        <div style="
          background:${cfg.bg};
          width:${cfg.size}px;height:${cfg.size}px;
          border-radius:50% 50% 50% 0;
          transform:rotate(-45deg);
          display:flex;align-items:center;justify-content:center;
          border:2.5px solid white;
        ">
          <span style="transform:rotate(45deg);font-size:${cfg.size * 0.45}px;line-height:1;">${cfg.emoji}</span>
        </div>
        ${label ? `<div style="margin-top:2px;background:${cfg.bg};color:white;font-size:10px;font-weight:700;padding:2px 6px;border-radius:4px;white-space:nowrap;">${label}</div>` : ''}
      </div>`;

    return L.divIcon({
      html,
      className: '',
      iconSize:   [cfg.size, cfg.size + 8],
      iconAnchor: [cfg.size / 2, cfg.size + 8],
      popupAnchor:[0, -(cfg.size + 8)],
    });
  }

  function driverIcon(vehicleEmoji = '🚗') {
    return L.divIcon({
      html: `
        <div class="gg-driver-pin">
          <div class="gg-driver-pulse"></div>
          <div class="gg-driver-inner">${vehicleEmoji}</div>
        </div>`,
      className: '',
      iconSize:   [50, 50],
      iconAnchor: [25, 25],
    });
  }

  /* ── Tile Layers ──────────────────────────────────── */
  function getTileLayer(dark = false) {
    if (dark) {
      return L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '', maxZoom: 19
      });
    }
    return L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '', maxZoom: 19
    });
  }

  /* ── Core API ─────────────────────────────────────── */
  function create(id, opts = {}) {
    if (instances[id]) { try { instances[id].map.remove(); } catch(e){} }

    const dark = document.body.classList.contains('dark') || opts.dark;
    const center = opts.center || [28.6139, 77.2090];

    const map = L.map(id, {
      center,
      zoom: opts.zoom || 13,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: opts.scrollWheel !== false,
    });

    getTileLayer(dark).addTo(map);

    // Minimal attribution
    L.control.attribution({ position: 'bottomright', prefix: false })
      .addAttribution('© OSM').addTo(map);

    // Zoom control (top right)
    L.control.zoom({ position: 'topright' }).addTo(map);

    instances[id] = {
      map,
      markers: {},
      routeLines: [],
      driverMarker: null,
      animTimer: null,
      animIdx: 0,
      routePoints: [],
    };

    return instances[id];
  }

  function setMarker(id, key, lat, lng, type = 'pickup', popup = '') {
    const inst = instances[id];
    if (!inst) return null;
    if (inst.markers[key]) inst.markers[key].remove();
    const m = L.marker([lat, lng], { icon: makeIcon(type, '') }).addTo(inst.map);
    if (popup) m.bindPopup(`<div style="font-size:13px;font-weight:600;">${popup}</div>`);
    inst.markers[key] = m;
    return m;
  }

  function clearMarkers(id) {
    const inst = instances[id];
    if (!inst) return;
    Object.values(inst.markers).forEach(m => m.remove());
    inst.markers = {};
  }

  function clearRoute(id) {
    const inst = instances[id];
    if (!inst) return;
    inst.routeLines.forEach(l => l.remove());
    inst.routeLines = [];
  }

  /* ── Route Drawing ────────────────────────────────── */
  function drawRoute(id, points, color = '#00C851') {
    const inst = instances[id];
    if (!inst || points.length < 2) return;
    clearRoute(id);

    // Draw animated dashed background line
    const coords = points.map(p => [p.lat, p.lng]);

    const bg = L.polyline(coords, {
      color: color + '33', weight: 8, lineCap: 'round', lineJoin: 'round'
    }).addTo(inst.map);

    const line = L.polyline(coords, {
      color,
      weight: 4,
      lineCap: 'round',
      lineJoin: 'round',
      dashArray: '10, 6',
      dashOffset: '0',
    }).addTo(inst.map);

    inst.routeLines.push(bg, line);
    inst.routePoints = points;

    // Fit bounds
    const bounds = L.latLngBounds(coords);
    inst.map.fitBounds(bounds, { padding: [60, 60], maxZoom: 14, animate: true });

    return line;
  }

  /* ── Driver Animation ─────────────────────────────── */
  function startDriverAnimation(id, points, vehicleEmoji = '🚗', onProgress = null) {
    const inst = instances[id];
    if (!inst || points.length < 2) return;

    if (inst.driverMarker) inst.driverMarker.remove();
    if (inst.animTimer) clearInterval(inst.animTimer);

    // Interpolate to ~200 points for smooth animation
    const allPts = interpolate(points, 200);
    inst.animIdx = 0;
    inst.driverMarker = L.marker([allPts[0].lat, allPts[0].lng], { icon: driverIcon(vehicleEmoji) }).addTo(inst.map);

    inst.animTimer = setInterval(() => {
      if (inst.animIdx >= allPts.length) {
        clearInterval(inst.animTimer);
        if (onProgress) onProgress(1.0, true);
        return;
      }
      const p = allPts[inst.animIdx];
      inst.driverMarker.setLatLng([p.lat, p.lng]);
      if (onProgress) onProgress(inst.animIdx / allPts.length, false);
      inst.animIdx++;
    }, 150);
  }

  function pauseAnimation(id) {
    const inst = instances[id];
    if (inst?.animTimer) clearInterval(inst.animTimer);
  }

  function interpolate(pts, totalSteps) {
    if (pts.length < 2) return pts;
    const result = [];
    const segSteps = Math.floor(totalSteps / (pts.length - 1));
    for (let i = 0; i < pts.length - 1; i++) {
      const s = pts[i], e = pts[i + 1];
      for (let t = 0; t < segSteps; t++) {
        const f = t / segSteps;
        // Slight curve using cubic bezier approximation
        result.push({
          lat: s.lat + (e.lat - s.lat) * f,
          lng: s.lng + (e.lng - s.lng) * f,
        });
      }
    }
    result.push(pts[pts.length - 1]);
    return result;
  }

  /* ── Driver Pins (Vehicle Select) ─────────────────── */
  function addNearbyDrivers(id, center, vehicles) {
    const inst = instances[id];
    if (!inst) return;

    vehicles.slice(0, 6).forEach((v, i) => {
      if (!v.available && !v.nearbyCount) return;
      const angle = (i / vehicles.length) * 2 * Math.PI + Math.random() * 0.5;
      const radius = 0.008 + Math.random() * 0.015;
      const lat = center[0] + Math.cos(angle) * radius;
      const lng = center[1] + Math.sin(angle) * radius;

      const icon = L.divIcon({
        html: `<div style="
          background:white;border-radius:50%;width:38px;height:38px;
          display:flex;align-items:center;justify-content:center;font-size:18px;
          box-shadow:0 2px 10px rgba(0,0,0,0.2);border:2px solid #00C851;
          animation:gg-pulse 2s ease infinite ${i * 0.3}s;">
          ${v.icon}
        </div>`,
        className: '',
        iconSize: [38, 38],
        iconAnchor: [19, 19],
      });

      L.marker([lat, lng], { icon })
        .bindPopup(`<b style="font-size:13px;">${v.icon} ${v.name}</b><br/><span style="color:#6B7280;font-size:12px;">ETA: ${v.eta}</span>`)
        .addTo(inst.map);
    });
  }

  /* ── Geocoding ────────────────────────────────────── */
  async function geocode(address) {
    if (!address || address.length < 3) return null;

    // Check our local city DB first (instant)
    const local = MOCK.getCityCoords(address);
    if (local) return local;

    // Nominatim API (free)
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address + ', India')}&limit=1&countrycodes=in`;
      const res = await fetch(url, { headers: { 'Accept-Language': 'en' } });
      const data = await res.json();
      if (data.length) {
        return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon), name: data[0].display_name };
      }
    } catch (e) {
      // Silently fallback
    }

    // Fuzzy fallback
    return { lat: 28.5 + Math.random() * 0.3, lng: 77.0 + Math.random() * 0.6 };
  }

  async function reverseGeocode(lat, lng) {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=14`;
      const res = await fetch(url, { headers: { 'Accept-Language': 'en' } });
      const data = await res.json();
      if (data.address) {
        const { suburb, city_district, city, county, state } = data.address;
        return [suburb || city_district, city || county, state].filter(Boolean).join(', ');
      }
    } catch (e) {}
    return 'Current Location';
  }

  /* ── Helper: Address to coords with update callback ─ */
  async function geocodeAndUpdate(id, address, key, type, popup) {
    const coords = await geocode(address);
    if (coords) {
      setMarker(id, key, coords.lat, coords.lng, type, popup || address);
    }
    return coords;
  }

  /* ── Public API ───────────────────────────────────── */
  return {
    create,
    setMarker,
    clearMarkers,
    clearRoute,
    drawRoute,
    startDriverAnimation,
    pauseAnimation,
    addNearbyDrivers,
    geocode,
    reverseGeocode,
    geocodeAndUpdate,
    get: (id) => instances[id]?.map,
    getInst: (id) => instances[id],
    destroy: (id) => {
      const inst = instances[id];
      if (inst) {
        if (inst.animTimer) clearInterval(inst.animTimer);
        try { inst.map.remove(); } catch(e) {}
        delete instances[id];
      }
    }
  };
})();

/* ── Driver Pin CSS (injected once) ──────────────────── */
(function injectMapCSS() {
  if (document.getElementById('gg-map-style')) return;
  const style = document.createElement('style');
  style.id = 'gg-map-style';
  style.textContent = `
    .gg-driver-pin {
      position: relative;
      width: 50px; height: 50px;
      display: flex; align-items: center; justify-content: center;
    }
    .gg-driver-pulse {
      position: absolute;
      inset: -6px;
      border-radius: 50%;
      background: rgba(0,200,81,0.25);
      animation: gg-pulse 1.5s ease-in-out infinite;
    }
    .gg-driver-inner {
      position: relative;
      background: white;
      border: 3px solid #00C851;
      border-radius: 50%;
      width: 42px; height: 42px;
      display: flex; align-items: center; justify-content: center;
      font-size: 22px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.25);
      z-index: 1;
    }
    @keyframes gg-pulse {
      0%, 100% { transform: scale(1); opacity: 0.7; }
      50% { transform: scale(1.35); opacity: 0.3; }
    }
    .leaflet-container {
      font-family: 'Inter', sans-serif !important;
    }
    .leaflet-popup-content-wrapper {
      border-radius: 12px !important;
      box-shadow: 0 8px 24px rgba(0,0,0,0.15) !important;
    }
    .leaflet-popup-tip { display: none !important; }
  `;
  document.head.appendChild(style);
})();
