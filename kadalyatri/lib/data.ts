// Types
export interface Vessel {
  id: string;
  lat: number;
  lng: number;
  crew: number;
  status: 'safe' | 'caution' | 'sos';
}

export interface FishPrice {
  name: string;
  price: number;
  prevPrice: number;
  harbor: string;
  change: number;
  prediction: 'rise' | 'fall' | 'stable';
}

export interface ErosionZone {
  name: string;
  lat: number;
  lng: number;
  severity: 'critical' | 'high' | 'stable';
  ratePerYear: number;
}

export interface OceanCondition {
  label: string;
  value: string;
  status: 'good' | 'warn' | 'danger';
}

export interface SeaRoute {
  id: string;
  name: string;
  path: [number, number][];
  color: string;
}

// Mock Data
export interface CheckPoint {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

export const seaCheckPoints: CheckPoint[] = [
  { id: 'cp-wadge', name: 'Wadge Bank (Deep Research)', lat: 7.15, lng: 78.10 },
  { id: 'cp-quilon', name: 'Quilon Bank (Fishing Hub)', lat: 8.80, lng: 76.00 },
  { id: 'cp-central', name: 'Central Arabian Basin', lat: 10.50, lng: 72.50 },
  { id: 'cp-north', name: 'Malabar Escarpment', lat: 12.80, lng: 73.50 },
];

export const fishingRoutes: SeaRoute[] = [
  {
    id: 'kochi-loop-1',
    name: 'Kochi - High Sea Operations (Round Trip)',
    color: '#4ea8de',
    path: [
      [9.93, 76.26], [9.80, 75.80], [9.50, 75.00], [9.30, 74.20], [9.00, 73.50], // Outbound
      [8.50, 73.00], // Destination
      [8.30, 73.80], [8.60, 74.50], [9.00, 75.20], [9.50, 75.80], [9.93, 76.26] // Return to Kochi
    ]
  },
  {
    id: 'kollam-trail-1',
    name: 'Kollam - Wadge Bank Route',
    color: '#ff9f1c',
    path: [
      [8.88, 76.59], [8.50, 76.20], [8.00, 77.00], [7.50, 77.50], [7.20, 77.80], // Outbound
      [7.15, 78.10], // Wadge Bank
      [7.40, 77.50], [7.80, 77.00], [8.30, 76.60], [8.88, 76.59] // Return to Kollam
    ]
  },
  {
    id: 'malabar-deep-1',
    name: 'Beypore - Northern Deep Sea Route',
    color: '#38b000',
    path: [
      [11.17, 75.81], [11.50, 75.00], [12.00, 74.50], [12.50, 74.00], // Outbound
      [12.80, 73.50], // Target Zone
      [12.20, 74.20], [11.70, 75.00], [11.17, 75.81] // Return to Beypore
    ]
  }
];

export const vessels: Vessel[] = [
  { id: 'KL-08-2241', lat: 9.20, lng: 76.07, crew: 12, status: 'sos' },
  { id: 'KL-12-3301', lat: 9.13, lng: 76.02, crew: 8,  status: 'sos' },
  { id: 'KL-07-0912', lat: 9.50, lng: 76.20, crew: 6,  status: 'caution' },
  { id: 'KL-04-1182', lat: 9.92, lng: 76.47, crew: 4,  status: 'safe' },
  { id: 'KL-01-0445', lat: 9.37, lng: 76.13, crew: 5,  status: 'safe' },
];

export const fishPrices: FishPrice[] = [
  { name: 'Sardine',  price: 142, prevPrice: 122, harbor: 'Kochi Harbor',  change: 20,  prediction: 'rise'   },
  { name: 'Mackerel', price: 198, prevPrice: 206, harbor: 'Kollam',        change: -8,  prediction: 'fall'   },
  { name: 'Pomfret',  price: 520, prevPrice: 475, harbor: 'Kozhikode',     change: 45,  prediction: 'rise'   },
  { name: 'Tuna',     price: 310, prevPrice: 310, harbor: 'Thrissur',      change: 0,   prediction: 'stable' },
  { name: 'King Fish',price: 780, prevPrice: 820, harbor: 'Vizhinjam',     change: -40, prediction: 'fall'   },
  { name: 'Shrimp',   price: 450, prevPrice: 390, harbor: 'Munambam',      change: 60,  prediction: 'rise'   },
  { name: 'Squid',    price: 380, prevPrice: 360, harbor: 'Neendakara',    change: 20,  prediction: 'rise'   },
  { name: 'Shark',    price: 610, prevPrice: 620, harbor: 'Alappuzha',     change: -10, prediction: 'fall'   },
];

export const erosionZones: ErosionZone[] = [
  { name: 'Chellanam', lat: 9.83, lng: 76.31, severity: 'critical', ratePerYear: -4.2 },
  { name: 'Poonthura', lat: 8.48, lng: 76.96, severity: 'critical', ratePerYear: -3.8 },
  { name: 'Beypore',   lat: 11.17, lng: 75.81, severity: 'high',    ratePerYear: -1.9 },
  { name: 'Alappuzha', lat: 9.50, lng: 76.35, severity: 'high',     ratePerYear: -1.4 },
  { name: 'Kovalam',   lat: 8.39, lng: 76.98, severity: 'stable',   ratePerYear: -0.5 },
];

export const oceanConditions: OceanCondition[] = [
  { label: 'Wave Height',   value: '2.4 – 3.1 m', status: 'warn'   },
  { label: 'Swell Period',  value: '11 sec',       status: 'good'   },
  { label: 'Wind Speed',    value: '28 knots NW',  status: 'warn'   },
  { label: 'Visibility',    value: 'Good (8 km)',   status: 'good'   },
  { label: 'Cyclone Watch', value: 'None',          status: 'good'   },
];

export const erosionByYear: Record<number, Record<string, number>> = {
  2020: { Ernakulam: 42, Thiruvananthapuram: 55, Kozhikode: 18, Alappuzha: 12, Thrissur: 5 },
  2021: { Ernakulam: 52, Thiruvananthapuram: 60, Kozhikode: 22, Alappuzha: 16, Thrissur: 6 },
  2022: { Ernakulam: 62, Thiruvananthapuram: 65, Kozhikode: 28, Alappuzha: 20, Thrissur: 7 },
  2023: { Ernakulam: 70, Thiruvananthapuram: 70, Kozhikode: 32, Alappuzha: 24, Thrissur: 8 },
  2024: { Ernakulam: 76, Thiruvananthapuram: 73, Kozhikode: 35, Alappuzha: 26, Thrissur: 9 },
  2025: { Ernakulam: 80, Thiruvananthapuram: 75, Kozhikode: 37, Alappuzha: 27, Thrissur: 9 },
  2026: { Ernakulam: 84, Thiruvananthapuram: 76, Kozhikode: 38, Alappuzha: 28, Thrissur: 10 },
};
