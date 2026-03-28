import { vessels } from '../lib/data';

const statusStyle: Record<string, React.CSSProperties> = {
  sos: {
    background: 'rgba(248,104,104,0.2)', color: '#f86868',
    border: '1px solid rgba(248,104,104,0.4)', fontSize: 10,
    padding: '2px 8px', borderRadius: 20
  },
  caution: {
    background: 'rgba(240,168,50,0.1)', color: '#f0a832',
    border: '1px solid rgba(240,168,50,0.3)', fontSize: 10,
    padding: '2px 8px', borderRadius: 20
  },
  safe: {
    background: 'rgba(86,201,176,0.1)', color: '#56c9b0',
    fontSize: 10, padding: '2px 8px', borderRadius: 20
  },
};

export default function VesselTracker() {
  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 600, color: '#5b9cc7', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 8 }}>
        Vessel Tracker (NavIC)
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {vessels.map((v) => (
          <div key={v.id} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '8px 12px', background: 'rgba(0,0,0,0.2)',
            borderRadius: 8, border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#c8dff0' }}>{v.id}</div>
              <div style={{ fontSize: 11, color: '#5b9cc7' }}>
                {v.lat.toFixed(2)}°N {v.lng.toFixed(2)}°E · {v.crew} crew
              </div>
            </div>
            <span style={statusStyle[v.status]}>
              {v.status.toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
