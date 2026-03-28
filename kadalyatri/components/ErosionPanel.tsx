import { useState } from 'react';
import { erosionByYear } from '../lib/data';

const districts = ['Ernakulam', 'Thiruvananthapuram', 'Kozhikode', 'Alappuzha', 'Thrissur'];
const ratesByYear: Record<number, number[]> = {
  2020: [-2.1, -2.7, -0.9, -0.6, -0.2],
  2021: [-2.6, -3.0, -1.1, -0.8, -0.3],
  2022: [-3.1, -3.2, -1.4, -1.0, -0.4],
  2023: [-3.5, -3.5, -1.6, -1.2, -0.4],
  2024: [-3.8, -3.6, -1.7, -1.3, -0.4],
  2025: [-4.0, -3.7, -1.8, -1.3, -0.5],
  2026: [-4.2, -3.8, -1.9, -1.4, -0.5],
};

function getColor(pct: number) {
  if (pct >= 70) return '#f86868';
  if (pct >= 30) return '#f0a832';
  return '#56c9b0';
}

export default function ErosionPanel() {
  const [year, setYear] = useState(2026);
  const data = erosionByYear[year];
  const rates = ratesByYear[year];

  return (
    <div style={{ background: '#0d1f3c', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, overflow: 'hidden' }}>
      <div style={{
        padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.07)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#c8dff0' }}>
          Erosion Rate by District — ISRO Bhuvan SAR Data
        </span>
        <span style={{
          fontSize: 10, padding: '2px 8px', borderRadius: 20,
          background: 'rgba(240,168,50,0.12)', color: '#f0a832',
          border: '1px solid rgba(240,168,50,0.25)'
        }}>Updated 6h ago</span>
      </div>

      <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {districts.map((d, i) => {
          const pct = data[d] ?? 0;
          return (
            <div key={d} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 11, color: '#c8dff0', minWidth: 120 }}>{d}</span>
              <div style={{ flex: 1, height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{
                  height: '100%', borderRadius: 3,
                  width: `${pct}%`,
                  background: getColor(pct),
                  transition: 'width 0.6s ease'
                }} />
              </div>
              <span style={{ fontSize: 11, color: '#5b9cc7', minWidth: 40, textAlign: 'right' }}>
                {rates[i]}m/yr
              </span>
            </div>
          );
        })}
      </div>

      <div style={{
        display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px',
        borderTop: '1px solid rgba(255,255,255,0.07)', background: 'rgba(0,0,0,0.2)'
      }}>
        <span style={{ fontSize: 11, color: '#5b9cc7', whiteSpace: 'nowrap' }}>Time Slider:</span>
        <input
          type="range" min={2020} max={2026} step={1} value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          style={{ flex: 1 }}
        />
        <span style={{ fontSize: 13, fontWeight: 700, color: '#56c9b0', minWidth: 36 }}>{year}</span>
        <span style={{ fontSize: 10, color: '#3d6888' }}>← drag to see history</span>
      </div>
    </div>
  );
}
