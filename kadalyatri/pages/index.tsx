import { useState } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import TopBar from '../components/TopBar';
import MetricsRow from '../components/MetricsRow';
import ErosionPanel from '../components/ErosionPanel';
import MarketPrices from '../components/MarketPrices';
import VesselTracker from '../components/VesselTracker';
import OceanConditions from '../components/OceanConditions';
import SOSBanner from '../components/SOSBanner';

// Leaflet must be client-side only
const CoastlineMap = dynamic(() => import('../components/CoastlineMap'), { ssr: false });
const OceanRouteMap = dynamic(() => import('../components/OceanRouteMap'), { ssr: false });

import { IconDashboard, IconCoastline, IconSafety, IconMarket, IconReports } from '../components/Icons';

const tabs = ['Overview', 'Erosion Maps', 'Ocean Safety', 'Market Prices', 'Citizen Reports'];

export default function Home() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [mapFocus, setMapFocus] = useState<[number, number] | null>(null);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleSOSAction = (coords: [number, number]) => {
    setActiveTab('Ocean Safety');
    setMapFocus(coords);
  };

  const navItems = [
    { name: 'Overview', icon: <IconDashboard /> },
    { name: 'Erosion Maps', icon: <IconCoastline /> },
    { name: 'Ocean Safety', icon: <IconSafety /> },
    { name: 'Market Prices', icon: <IconMarket /> },
    { name: 'Citizen Reports', icon: <IconReports /> }
  ];

  return (
    <>
      <Head>
        <title>KadalYatri — Hub</title>
        <meta name="description" content="Coastal resilience dashboard" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      </Head>

      <div style={{ display: 'flex', minHeight: '100vh', background: '#0a1628' }}>
        
        {/* Vertical Sidebar Navigation */}
        <div style={{
          width: isNavCollapsed ? 72 : 240,
          background: '#0d1f3c',
          borderRight: '1px solid rgba(255,255,255,0.07)',
          display: 'flex',
          flexDirection: 'column',
          transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden',
          zIndex: 50
        }}>
          {/* Collapse Toggle */}
          <div 
            onClick={() => setIsNavCollapsed(!isNavCollapsed)}
            style={{
              padding: '24px', cursor: 'pointer', fontSize: 18, 
              display: 'flex', alignItems: 'center', gap: 16,
              color: '#5b9cc7'
            }}
          >
            <span className="glow-icon">{isNavCollapsed ? '☰' : '⬅'}</span>
            {!isNavCollapsed && <span style={{ fontSize: 13, fontWeight: 700, color: '#e8f4f8' }}>Collapse</span>}
          </div>

          <div style={{ flex: 1, padding: '10px 0' }}>
            {navItems.map((item) => {
              const isActive = item.name === activeTab;
              return (
                <div
                  key={item.name}
                  onClick={() => setActiveTab(item.name)}
                  className="glow-icon"
                  style={{
                    padding: '16px 24px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    background: isActive ? 'rgba(86,201,176,0.08)' : 'transparent',
                    borderRight: isActive ? '3px solid #56c9b0' : '3px solid transparent',
                    color: isActive ? '#56c9b0' : '#5b9cc7',
                    transition: '0.2s',
                    whiteSpace: 'nowrap'
                  }}
                  title={isNavCollapsed ? item.name : ''}
                >
                  <span style={{ display: 'flex', alignItems: 'center' }}>{item.icon}</span>
                  {!isNavCollapsed && <span style={{ fontSize: 13, fontWeight: 500 }}>{item.name}</span>}
                </div>
              );
            })}
          </div>

          <div style={{ padding: 24, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
             <div style={{ fontSize: 10, color: '#3d6888', textAlign: isNavCollapsed ? 'center' : 'left' }}>
               {isNavCollapsed ? 'v0.1' : 'KadalYatri v0.1'}
             </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <TopBar sosCount={2} />

          {/* Body */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', flex: 1, overflow: 'hidden' }}>

            {/* Main column */}
            <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16, overflowY: 'auto' }}>
              {activeTab === 'Overview' && (
                <>
                  <MetricsRow />
                  <OceanRouteMap focusCoords={mapFocus} onFocusEnd={() => setMapFocus(null)} />
                  <ErosionPanel />
                </>
              )}
              {activeTab === 'Erosion Maps' && (
                <>
                  <ErosionPanel />
                  <CoastlineMap />
                </>
              )}
              {activeTab === 'Ocean Safety' && (
                <>
                  <MetricsRow />
                  <OceanRouteMap focusCoords={mapFocus} onFocusEnd={() => setMapFocus(null)} />
                </>
              )}
              {activeTab === 'Market Prices' && (
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <MarketPrices />
                </div>
              )}
              {activeTab === 'Citizen Reports' && (
                <div style={{ padding: 40, textAlign: 'center', background: '#0d1f3c', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, color: '#5b9cc7' }}>
                  No new reports in your monitored area.
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div style={{
              background: '#0d1f3c', borderLeft: '1px solid rgba(255,255,255,0.07)',
              padding: 20, display: 'flex', flexDirection: 'column', gap: 16, overflowY: 'auto'
            }}>
            {activeTab === 'Overview' && (
              <>
                <SOSBanner onAction={handleSOSAction} />
                <MarketPrices />
                <VesselTracker />
                <OceanConditions />
              </>
            )}
            {activeTab === 'Erosion Maps' && (
              <>
                <OceanConditions />
              </>
            )}
            {activeTab === 'Ocean Safety' && (
              <>
                <SOSBanner onAction={handleSOSAction} />
                <VesselTracker />
                <OceanConditions />
              </>
            )}
            {activeTab === 'Market Prices' && (
              <>
                <VesselTracker />
                <OceanConditions />
              </>
            )}
            {activeTab === 'Citizen Reports' && (
              <>
                <SOSBanner onAction={handleSOSAction} />
              </>
            )}

            <div style={{ marginTop: 'auto' }}>
              <button style={{
                width: '100%', padding: 10,
                background: 'rgba(86,201,176,0.1)', border: '1px solid rgba(86,201,176,0.3)',
                borderRadius: 8, color: '#56c9b0', fontSize: 12, fontWeight: 600, cursor: 'pointer'
              }}>
                AI Budget Prioritization ↗
              </button>
            </div>
          </div>
        </div>

        {/* Footer moved inside Content Area or kept global? User wanted sidebar nav */}
        {/* We'll keep Footer inside the Content Area for a clean full-height nav */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '8px 24px', background: '#0d1f3c', borderTop: '1px solid rgba(255,255,255,0.07)'
        }}>
          <div style={{ fontSize: 11, color: '#3d6888' }}>
            <span style={{
              display: 'inline-block', width: 6, height: 6, borderRadius: '50%',
              background: '#56c9b0', marginRight: 6,
              animation: 'blink 2s infinite'
            }} />
            Live · ISRO Bhoonidhi · FMPIS · NavIC
          </div>
          <div style={{ fontSize: 11, color: '#3d6888' }}>
            KadalYatri v0.1 MVP
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
