interface Metric {
  label: string;
  value: string;
  color: string;
  sub: string;
}

const metrics: Metric[] = [
  { label: 'Active Vessels', value: '1,247', color: '#4ea8de', sub: 'At sea right now' },
  { label: 'SOS Signals',    value: '2',     color: '#f86868', sub: '↑ 1 in last hour' },
  { label: 'Wave Height',    value: '2.4m',  color: '#f0a832', sub: '↑ Increasing' },
  { label: 'Erosion Alerts', value: '3',     color: '#f86868', sub: 'Critical zones' },
];

export default function MetricsRow() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
      {metrics.map((m) => (
        <div key={m.label} style={{
          background: '#0d1f3c', border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 10, padding: '14px 16px'
        }}>
          <div style={{ fontSize: 11, color: '#5b9cc7', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>
            {m.label}
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.5px', color: m.color }}>
            {m.value}
          </div>
          <div style={{ fontSize: 11, marginTop: 4, color: '#5b9cc7' }}>{m.sub}</div>
        </div>
      ))}
    </div>
  );
}
