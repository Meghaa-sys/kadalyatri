import { vessels } from '../lib/data';
import { IconAlert } from './Icons';

interface SOSBannerProps {
  onAction: (coords: [number, number]) => void;
}

export default function SOSBanner({ onAction }: SOSBannerProps) {
  const sosVessels = vessels.filter((v) => v.status === 'sos');
  if (sosVessels.length === 0) return null;

  const handleDetailsClick = () => {
    // Focus on the first SOS vessel for now
    const v = sosVessels[0];
    onAction([v.lat, v.lng]);
  };

  return (
    <div style={{
      background: 'rgba(248,104,104,0.1)', border: '1px solid rgba(248,104,104,0.35)',
      borderRadius: 10, padding: '14px 16px', display: 'flex', gap: 12
    }}>
      <div style={{ 
        color: '#f86868', flexShrink: 0, 
        animation: 'blink 2s infinite ease-in-out' 
      }}>
        <IconAlert />
      </div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#f86868' }}>
          SOS ACTIVE — {sosVessels.length} Vessels
        </div>
        <div style={{ fontSize: 11, color: '#c8dff0', marginTop: 3, lineHeight: 1.5 }}>
          {sosVessels.map((v) => `${v.id}`).join(' & ')}.
          Rescue mesh activated. Nearest vessel notified.
        </div>
        <button 
          onClick={handleDetailsClick}
          style={{
            marginTop: 8, background: '#c53030', color: 'white', border: 'none',
            padding: '6px 14px', borderRadius: 6, fontSize: 11, fontWeight: 600, cursor: 'pointer',
            boxShadow: '0 0 12px rgba(197, 48, 48, 0.4)'
          }}
        >
          View Rescue Details
        </button>
      </div>
    </div>
  );
}
