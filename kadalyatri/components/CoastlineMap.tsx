import { useEffect, useRef } from 'react';
import { erosionZones } from '../lib/data';

export default function CoastlineMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);

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
        center: [10.0, 76.2],
        zoom: 7,
        zoomControl: true,
      });
      mapInstance.current = map;

      // Dark tile layer
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap © CartoDB',
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(map);

      // Erosion zones
      const zoneColors = { critical: '#f86868', high: '#f0a832', stable: '#56c9b0' };
      erosionZones.forEach((zone) => {
        const color = zoneColors[zone.severity];
        L.circleMarker([zone.lat, zone.lng], {
          radius: zone.severity === 'critical' ? 12 : zone.severity === 'high' ? 9 : 7,
          fillColor: color, color, weight: 2, opacity: 0.9, fillOpacity: 0.4,
        })
          .bindPopup(`<b>${zone.name}</b><br/>Erosion: ${zone.ratePerYear}m/yr<br/>Severity: ${zone.severity}`)
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
        <span style={{ fontSize: 13, fontWeight: 600, color: '#c8dff0' }}>
          Coastline Erosion Map — Kerala (Satellite Radar)
        </span>
        <span style={{
          fontSize: 10, padding: '2px 8px', borderRadius: 20,
          background: 'rgba(240,168,50,0.15)', color: '#f0a832',
          border: '1px solid rgba(240,168,50,0.3)'
        }}>3 Critical Zones</span>
      </div>
      <div ref={mapRef} style={{ height: 340, width: '100%' }} />
      <div style={{ padding: '8px 16px', display: 'flex', gap: 16, borderTop: '1px solid rgba(255,255,255,0.07)', background: 'rgba(0,0,0,0.2)' }}>
        {[
          { color: '#f86868', label: 'Critical erosion' },
          { color: '#f0a832', label: 'High risk' },
          { color: '#56c9b0', label: 'Stable' },
        ].map((l) => (
          <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: l.color }} />
            <span style={{ fontSize: 10, color: '#5b9cc7' }}>{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
