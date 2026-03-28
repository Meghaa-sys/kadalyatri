import { oceanConditions } from '../lib/data';

const statusColor = { good: '#56c9b0', warn: '#f0a832', danger: '#f86868' };

export default function OceanConditions() {
  return (
    <div style={{ background: '#0d1f3c', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, overflow: 'hidden' }}>
      <div style={{
        padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.07)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#c8dff0' }}>Ocean Conditions (INCOIS)</span>
        <span style={{
          fontSize: 10, padding: '2px 8px', borderRadius: 20,
          background: 'rgba(240,168,50,0.12)', color: '#f0a832',
          border: '1px solid rgba(240,168,50,0.25)'
        }}>Moderate Risk</span>
      </div>
      <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {oceanConditions.map((c) => (
          <div key={c.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
            <span style={{ color: '#5b9cc7' }}>{c.label}</span>
            <span style={{ color: statusColor[c.status], fontWeight: c.status !== 'good' ? 600 : 400 }}>
              {c.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
