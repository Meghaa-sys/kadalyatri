import { fishPrices } from '../lib/data';
import { IconTrendUp, IconTrendDown } from './Icons';

export default function MarketPrices() {
  return (
    <div>
      <div style={{ 
        fontSize: 11, fontWeight: 700, color: '#5b9cc7', 
        textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 12,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        <span>Market Intelligence (FMPIS)</span>
        <span style={{ fontSize: 9, color: '#3d6888', textTransform: 'none' }}>Updated 14m ago</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 10 }}>
        {fishPrices.map((f) => (
          <div key={f.harbor + f.name} style={{
            background: 'rgba(0,0,0,0.25)', borderRadius: 10, padding: '12px',
            border: '1px solid rgba(255,255,255,0.06)',
            display: 'flex', flexDirection: 'column', gap: 2
          }}>
            <div style={{ fontSize: 11, color: '#5b9cc7', fontWeight: 600 }}>{f.name}</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#56c9b0' }}>₹{f.price}</div>
            <div style={{ fontSize: 10, color: '#3d6888', marginBottom: 4 }}>{f.harbor}</div>
            
            <div style={{ 
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              paddingTop: 6, borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: 4
            }}>
              <div style={{ fontSize: 9, color: '#3d6888' }}>
                Prev: <span style={{ color: '#5b9cc7' }}>₹{f.prevPrice}</span>
              </div>
              <div style={{ 
                fontSize: 9, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4,
                color: f.prediction === 'rise' ? '#f86868' : f.prediction === 'fall' ? '#56c9b0' : '#5b9cc7'
              }}>
                {f.prediction === 'rise' ? <><IconTrendUp /> RISE</> : f.prediction === 'fall' ? <><IconTrendDown /> FALL</> : 'STABLE'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
