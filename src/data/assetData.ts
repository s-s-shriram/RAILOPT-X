import { Asset, Department } from '../types';
import { SECTIONS } from './corridorData';

// Anchor critical assets
const explicitAnchorAssets: Asset[] = [
  // SEC018 Anchor cross-department set
  {
    id: 'TRK-SEC018-001',
    sectionId: 'SEC018',
    department: 'ENGINEERING',
    assetType: 'Track Geometry & Rail',
    condition: 'WARNING',
    criticality: 86,
    installYear: 2018,
    lastMaintainedDate: '2026-06-12',
    failureRisk: 74,
    healthScore: 62,
  },
  {
    id: 'SIG-SEC018-001',
    sectionId: 'SEC018',
    department: 'SNT',
    assetType: 'Solid State Interlocking Signal',
    condition: 'CRITICAL',
    criticality: 92,
    installYear: 2016,
    lastMaintainedDate: '2026-05-20',
    failureRisk: 88,
    healthScore: 48,
  },
  {
    id: 'OHE-SEC018-001',
    sectionId: 'SEC018',
    department: 'TRACTION',
    assetType: '25kV AC Catenary & Mast',
    condition: 'WARNING',
    criticality: 88,
    installYear: 2017,
    lastMaintainedDate: '2026-06-02',
    failureRisk: 79,
    healthScore: 58,
  },

  // SEC012 Emergency anchor asset
  {
    id: 'SIG-SEC012-001',
    sectionId: 'SEC012',
    department: 'SNT',
    assetType: 'Automatic Block Signal & Track Circuit',
    condition: 'CRITICAL',
    criticality: 96,
    installYear: 2015,
    lastMaintainedDate: '2026-04-10',
    failureRisk: 95,
    healthScore: 32,
  },

  // SEC001 & SEC002 Terminal throat anchors
  {
    id: 'TRK-SEC001-001',
    sectionId: 'SEC001',
    department: 'ENGINEERING',
    assetType: 'Diamond Crossing & Points',
    condition: 'WARNING',
    criticality: 95,
    installYear: 2019,
    lastMaintainedDate: '2026-07-01',
    failureRisk: 72,
    healthScore: 65,
  },
  {
    id: 'SIG-SEC001-001',
    sectionId: 'SEC001',
    department: 'SNT',
    assetType: 'Route Relay Interlocking Rack',
    condition: 'NORMAL',
    criticality: 94,
    installYear: 2021,
    lastMaintainedDate: '2026-08-15',
    failureRisk: 22,
    healthScore: 92,
  },
  {
    id: 'OHE-SEC001-001',
    sectionId: 'SEC001',
    department: 'TRACTION',
    assetType: 'Terminal Feeder Switch & Isolator',
    condition: 'WARNING',
    criticality: 91,
    installYear: 2017,
    lastMaintainedDate: '2026-06-25',
    failureRisk: 68,
    healthScore: 68,
  },

  // SEC025 Arakkonam Junction anchor set
  {
    id: 'TRK-SEC025-001',
    sectionId: 'SEC025',
    department: 'ENGINEERING',
    assetType: 'Main Turnout #24B',
    condition: 'WARNING',
    criticality: 89,
    installYear: 2018,
    lastMaintainedDate: '2026-05-14',
    failureRisk: 75,
    healthScore: 61,
  },
  {
    id: 'SIG-SEC025-001',
    sectionId: 'SEC025',
    department: 'SNT',
    assetType: 'Digital Axle Counter DAC-09',
    condition: 'WARNING',
    criticality: 87,
    installYear: 2020,
    lastMaintainedDate: '2026-06-18',
    failureRisk: 64,
    healthScore: 70,
  },
  {
    id: 'OHE-SEC025-001',
    sectionId: 'SEC025',
    department: 'TRACTION',
    assetType: 'Section Insulator SI-14',
    condition: 'CRITICAL',
    criticality: 90,
    installYear: 2016,
    lastMaintainedDate: '2026-04-22',
    failureRisk: 86,
    healthScore: 49,
  },

  // SEC033 Renigunta Ghat anchor set
  {
    id: 'TRK-SEC033-001',
    sectionId: 'SEC033',
    department: 'ENGINEERING',
    assetType: 'Curved High-Tensile Rail 60kg',
    condition: 'WARNING',
    criticality: 93,
    installYear: 2019,
    lastMaintainedDate: '2026-05-30',
    failureRisk: 78,
    healthScore: 59,
  },
  {
    id: 'SIG-SEC033-001',
    sectionId: 'SEC033',
    department: 'SNT',
    assetType: 'Point Machine MK-II',
    condition: 'NORMAL',
    criticality: 88,
    installYear: 2021,
    lastMaintainedDate: '2026-08-01',
    failureRisk: 28,
    healthScore: 89,
  },
  {
    id: 'OHE-SEC033-001',
    sectionId: 'SEC033',
    department: 'TRACTION',
    assetType: 'Traction Sub-Station Feeder Bay',
    condition: 'WARNING',
    criticality: 92,
    installYear: 2017,
    lastMaintainedDate: '2026-06-10',
    failureRisk: 71,
    healthScore: 66,
  }
];

// Generate consistent synthetic assets across all 35 sections to reach ~140 assets
function generateAssets(): Asset[] {
  const assets: Asset[] = [...explicitAnchorAssets];
  const existingKeys = new Set(assets.map(a => `${a.department}-${a.sectionId}`));

  const engAssetTypes = ['Track', 'Rail 60kg', 'Prestressed Concrete Sleeper', 'Turnout 1:12', 'Steel Girder Bridge', 'Ballast Bed', 'Track Expansion Joint'];
  const sntAssetTypes = ['Colour Light Signal', 'Electronic Interlocking', 'Audio Frequency Track Circuit', 'Point Machine', 'Digital Axle Counter', 'Level Crossing Interlocking'];
  const trcAssetTypes = ['Catenary & Contact Wire', 'OHE Mast Structure', 'Composite Insulator', 'Traction Auto-Transformer', 'Sectioning Isolator Switch', 'Pantograph Monitoring Sensor'];

  SECTIONS.forEach((sec, idx) => {
    // 1 Engineering asset per section if not already added
    if (!existingKeys.has(`ENGINEERING-${sec.id}`)) {
      const type = engAssetTypes[idx % engAssetTypes.length];
      const isWarn = (idx * 7) % 5 === 0 || sec.infrastructureRisk > 75;
      const isCrit = (idx * 11) % 17 === 0;
      assets.push({
        id: `TRK-${sec.id}-001`,
        sectionId: sec.id,
        department: 'ENGINEERING',
        assetType: type,
        condition: isCrit ? 'CRITICAL' : isWarn ? 'WARNING' : 'NORMAL',
        criticality: Math.min(95, Math.max(50, sec.criticality - 5 + (idx % 10))),
        installYear: 2015 + (idx % 8),
        lastMaintainedDate: `2026-0${(idx % 7) + 1}-15`,
        failureRisk: isCrit ? 85 : isWarn ? 68 : 25,
        healthScore: isCrit ? 42 : isWarn ? 64 : 88,
      });
    }

    // 1 S&T asset per section
    if (!existingKeys.has(`SNT-${sec.id}`)) {
      const type = sntAssetTypes[(idx + 2) % sntAssetTypes.length];
      const isWarn = (idx * 3) % 4 === 0 || sec.criticality > 85;
      const isCrit = (idx * 13) % 19 === 0;
      assets.push({
        id: `SIG-${sec.id}-001`,
        sectionId: sec.id,
        department: 'SNT',
        assetType: type,
        condition: isCrit ? 'CRITICAL' : isWarn ? 'WARNING' : 'NORMAL',
        criticality: Math.min(96, Math.max(55, sec.criticality - 3 + ((idx * 2) % 10))),
        installYear: 2016 + (idx % 7),
        lastMaintainedDate: `2026-0${(idx % 8) + 1}-10`,
        failureRisk: isCrit ? 90 : isWarn ? 70 : 20,
        healthScore: isCrit ? 38 : isWarn ? 62 : 91,
      });
    }

    // 1 Traction asset per section (all are electrified)
    if (!existingKeys.has(`TRACTION-${sec.id}`)) {
      const type = trcAssetTypes[(idx + 4) % trcAssetTypes.length];
      const isWarn = (idx * 5) % 6 === 0 || sec.infrastructureRisk > 80;
      const isCrit = (idx * 17) % 23 === 0;
      assets.push({
        id: `OHE-${sec.id}-001`,
        sectionId: sec.id,
        department: 'TRACTION',
        assetType: type,
        condition: isCrit ? 'CRITICAL' : isWarn ? 'WARNING' : 'NORMAL',
        criticality: Math.min(94, Math.max(52, sec.criticality - 4 + ((idx * 3) % 9))),
        installYear: 2017 + (idx % 6),
        lastMaintainedDate: `2026-0${(idx % 6) + 2}-05`,
        failureRisk: isCrit ? 87 : isWarn ? 66 : 28,
        healthScore: isCrit ? 45 : isWarn ? 65 : 86,
      });
    }

    // Add extra asset for high density sections (SEC001-SEC003, SEC008, SEC017, SEC018, SEC024, SEC025, SEC033, SEC034)
    if ([1, 2, 8, 17, 18, 24, 25, 33, 34].includes(idx + 1)) {
      assets.push({
        id: `SWT-${sec.id}-002`,
        sectionId: sec.id,
        department: 'ENGINEERING',
        assetType: 'Points & Crossing Assembly',
        condition: (idx % 2 === 0) ? 'WARNING' : 'NORMAL',
        criticality: sec.criticality - 2,
        installYear: 2020,
        lastMaintainedDate: '2026-07-20',
        failureRisk: 55,
        healthScore: 74,
      });
    }
  });

  return assets;
}

export const ASSETS: Asset[] = generateAssets();
