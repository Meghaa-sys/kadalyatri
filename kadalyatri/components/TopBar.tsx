import { useEffect, useState } from 'react';
import { IconWave } from './Icons';

interface TopBarProps {
  sosCount: number;
}

export default function TopBar({ sosCount }: TopBarProps) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const ist = new Date(now.getTime() + 5.5 * 60 * 60 * 1000);
      const h = String(ist.getUTCHours()).padStart(2, '0');
      const m = String(ist.getUTCMinutes()).padStart(2, '0');
      const s = String(ist.getUTCSeconds()).padStart(2, '0');
      setTime(`${h}:${m}:${s} IST`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 24px', background: '#0d1f3c',
      borderBottom: '1px solid rgba(255,255,255,0.07)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div 
          className="glow-icon"
          style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'rgba(86,201,176,0.1)',
            border: '1px solid rgba(86,201,176,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}
        >
          <IconWave />
        </div>
        <div>
          <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.3px', color: '#e8f4f8' }}>KadalYatri</div>
          <div style={{ fontSize: 11, color: '#5b9cc7', marginTop: -2 }}>Kerala Coastal Intelligence</div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {sosCount > 0 && (
          <div style={{
            background: '#c53030', color: 'white', fontSize: 11,
            fontWeight: 600, padding: '3px 10px', borderRadius: 20
          }}>
            {sosCount} SOS Active
          </div>
        )}
        <div style={{ fontSize: 12, color: '#5b9cc7' }}>{time}</div>
        <div style={{
          width: 28, height: 28, borderRadius: '50%', background: '#1a6bbd',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11, fontWeight: 600, color: 'white'
        }}>KW</div>
      </div>
    </div>
  );
}
