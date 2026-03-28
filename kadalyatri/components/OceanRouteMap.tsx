import { useEffect, useRef } from 'react';
import { vessels, fishingRoutes, seaCheckPoints } from '../lib/data';

interface OceanRouteMapProps {
  focusCoords?: [number, number] | null;
  onFocusEnd?: () => void;
}

export default function OceanRouteMap({ focusCoords, onFocusEnd }: OceanRouteMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);

  useEffect(() => {
    if (mapInstance.current && focusCoords) {
      mapInstance.current.flyTo(focusCoords, 10, { duration: 1.5 });
      if (onFocusEnd) onFocusEnd();
    }
  }, [focusCoords, onFocusEnd]);

  useEffect(() => {
    if (typeof window === 'undefined' || mapInstance.current) return;

    import('leaflet').then((L) => {
      if (!mapRef.current || mapInstance.current) return;

      // Fix default marker icons
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      });

      const map = L.map(mapRef.current, {
        center: [9.5, 75.0], // Centered more in the Arabian sea
        zoom: 6,
        zoomControl: true,
      });
      mapInstance.current = map;

      // 海 (Ocean) focused tile layer - ESRI Ocean Basemap
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri',
        maxZoom: 13,
      }).addTo(map);

      // Add a dark semi-transparent overlay to make it look like a radar/intel screen
      const darkOverlay = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        opacity: 0.6,
        subdomains: 'abcd',
      }).addTo(map);

      // Sea labels
      const seaLabels = [
        { name: 'Arabian Sea', pos: [10.00, 71.00], cls: 'sea-label' },
        { name: 'Laccadive Sea', pos: [8.50, 74.00], cls: 'sea-label-small' },
        { name: 'Indian Ocean', pos: [4.00, 76.00], cls: 'sea-label' },
      ];

      seaLabels.forEach((label) => {
        const icon = L.divIcon({
          className: label.cls,
          html: `<div>${label.name}</div>`,
          iconSize: [200, 40],
        });
        L.marker(label.pos as [number, number], { icon, interactive: false }).addTo(map);
      });

      // Sea Checkpoints (Waypoints)
      seaCheckPoints.forEach((cp) => {
        const icon = L.divIcon({
          className: '',
          html: `<div style="display:flex;align-items:center;white-space:nowrap;gap:8px;">
            <div style="width:6px;height:6px;background:#56c9b0;border-radius:50%;box-shadow: 0 0 10px #56c9b0"></div>
            <div style="font-size:10px;color:#c8dff0;font-weight:600;text-shadow: 0 0 5px #000;background:rgba(13,31,60,0.6);padding:2px 6px;border-radius:4px;">${cp.name}</div>
          </div>`,
          iconSize: [0, 0], // Marker is point-like, content overflows
        });
        L.marker([cp.lat, cp.lng], { icon, interactive: true })
          .bindPopup(`<b>Checkpoint: ${cp.name}</b><br/>Coordinates: ${cp.lat.toFixed(2)}, ${cp.lng.toFixed(2)}`)
          .addTo(map);
      });

      // Harbor Anchors
      const harbors = [
        { id: 'Harbor Kochi', pos: [9.93, 76.26] },
        { id: 'Harbor Kollam', pos: [8.88, 76.59] },
        { id: 'Harbor Beypore', pos: [11.17, 75.81] },
      ];

      harbors.forEach((h) => {
        const icon = L.divIcon({
          className: 'glow-icon',
          html: `<div style="width:24px;height:24px;background:rgba(86,201,176,0.15);border:1px solid rgba(86,201,176,0.4);border-radius:4px;display:flex;align-items:center;justify-content:center;color:#56c9b0;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="3"/><line x1="12" y1="22" x2="12" y2="8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/></svg>
          </div>`,
          iconSize: [24, 24],
        });
        L.marker(h.pos as [number, number], { icon })
          .bindPopup(`<b>${h.id}</b><br/>Primary Port & Landing Center`)
          .addTo(map);
      });

      // Fishing Routes (Animated Loops)
      fishingRoutes.forEach((route) => {
        L.polyline(route.path, {
          color: route.color,
          weight: 3,
          opacity: 0.8,
          dashArray: '10, 10',
          className: 'tracking-route'
        })
          .bindPopup(`<b>${route.name}</b><br/>Status: Multi-day Deep Sea Operations`)
          .addTo(map);
      });

      // Vessels
      vessels.forEach((v) => {
        const isSOS = v.status === 'sos';
        const color = isSOS ? '#f86868' : v.status === 'caution' ? '#f0a832' : '#4ea8de';
        
        let html = `<div style="width:12px;height:12px;border-radius:50%;background:${color};border:2px solid #fff;box-shadow: 0 0 10px ${color}"></div>`;
        
        if (isSOS) {
          html = `
            <div style="position:relative; width:12px; height:12px;">
              <div style="position:absolute; top:-6px; left:-6px; width:24px; height:24px; border-radius:50%; background:rgba(248,104,104,0.4); animation:pulse-ring 1.5s infinite;"></div>
              <div style="position:relative; width:12px; height:12px; border-radius:50%; background:${color}; border:2px solid #fff; box-shadow: 0 0 10px ${color}; z-index:2;"></div>
            </div>
          `;
        }
        
        const icon = L.divIcon({
          className: '',
          html,
          iconSize: [12, 12],
        });
        L.marker([v.lat, v.lng], { icon })
          .bindPopup(`<b>Vessel: ${v.id}</b><br/>Status: ${v.status.toUpperCase()}<br/>Crew aboard: ${v.crew}`)
          .addTo(map);
      });
    });

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  return (
    <div style={{ background: '#0d1f3c', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, overflow: 'hidden' }}>
      <div style={{
        padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.07)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#c8dff0' }}>
            Live Sea Route Tracking — Arabian Sea
          </span>
          <span style={{ fontSize: 10, color: '#5b9cc7' }}>NavIC Real-time AIS Stream</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <span style={{
            fontSize: 10, padding: '2px 8px', borderRadius: 20,
            background: 'rgba(86,201,176,0.12)', color: '#56c9b0',
            border: '1px solid rgba(86,201,176,0.25)'
          }}>Live</span>
        </div>
      </div>
      <div ref={mapRef} style={{ height: 380, width: '100%' }} />
      <div style={{ padding: '10px 16px', display: 'flex', gap: 16, borderTop: '1px solid rgba(255,255,255,0.07)', background: 'rgba(0,0,0,0.2)' }}>
        {[
          { color: '#56c9b0', label: 'Waypoint', type: 'dot' },
          { color: '#4ea8de', label: 'Deep Sea Route', type: 'line' },
          { color: '#38b000', label: 'Coastal Route', type: 'line' },
          { color: '#f86868', label: 'SOS Alert', type: 'dot' },
        ].map((l) => (
          <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            {l.type === 'line' ? (
              <div style={{ width: 14, height: 2, background: l.color, border: '1px dashed rgba(255,255,255,0.3)' }} />
            ) : (
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: l.color }} />
            )}
            <span style={{ fontSize: 10, color: '#5b9cc7' }}>{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
