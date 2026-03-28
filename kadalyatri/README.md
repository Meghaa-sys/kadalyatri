# KadalYatri 🌊
### Kerala Coastal Intelligence Platform

An AI-powered coastal resilience dashboard for Kerala — built for fishermen safety, coastline erosion monitoring, and fish market intelligence.

---

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
kadalyatri/
├── components/
│   ├── TopBar.tsx          # Header with live IST clock & SOS counter
│   ├── MetricsRow.tsx      # 4 key metric cards
│   ├── CoastlineMap.tsx    # Leaflet map with erosion zones & vessel markers
│   ├── ErosionPanel.tsx    # Erosion bars with time slider (2020–2026)
│   ├── MarketPrices.tsx    # Live fish price cards (FMPIS)
│   ├── VesselTracker.tsx   # NavIC vessel list with SOS/Caution/Safe status
│   ├── OceanConditions.tsx # INCOIS wave/wind/swell data
│   └── SOSBanner.tsx       # Active SOS alert banner
├── lib/
│   └── data.ts             # Mock data & TypeScript types
├── pages/
│   ├── _app.tsx
│   └── index.tsx           # Main dashboard page
└── styles/
    └── globals.css
```

---

## Data Sources (Production Integration)

| Layer | Source | API |
|-------|--------|-----|
| Coastline Erosion | ISRO Bhoonidhi / Bhuvan | WMS tiles + SAR change detection |
| Ocean Safety | INCOIS O-SMART | REST API (wave, swell, current data) |
| Fish Prices | FMPIS (Fisheries) | Scraper / REST endpoint |
| Vessel Tracking | NavIC NMR (Bluetooth) | Web Bluetooth API |

---

## Roadmap

- [ ] Real INCOIS API integration
- [ ] FMPIS live price feed
- [ ] NavIC Bluetooth bridge (Web Bluetooth API)
- [ ] ISRO Bhuvan WMS tile overlay
- [ ] Citizen photo report upload
- [ ] Malayalam voice assistant ("Kadal-AI")
- [ ] PWA offline mode for fishermen
- [ ] Push notifications for swell surges

---

## Tech Stack

- **Frontend**: Next.js 14 + TypeScript
- **Map**: Leaflet + React-Leaflet (CartoDB dark tiles)
- **Planned Backend**: Python FastAPI + PostGIS
- **Planned ML**: SAR change detection model (coastline erosion delta)

---

Built for Kerala fishermen and coastal governance. 🎣
