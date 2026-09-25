import { MaintenanceTask, Department, Severity } from '../types';
import { ASSETS } from './assetData';
import { SECTIONS } from './corridorData';

// Anchor explicit tasks
const explicitTasks: MaintenanceTask[] = [
  // SEC018 Coordinated Bundle Anchor (ENG-0187 + SNT-0098 + TRC-0076)
  {
    id: 'ENG-0187',
    assetId: 'TRK-SEC018-001',
    sectionId: 'SEC018',
    department: 'ENGINEERING',
    maintenanceType: 'Track Alignment & Geometry Correction',
    defectStatus: 'OPEN',
    severity: 'HIGH',
    priority: 'HIGH',
    dueDate: '2026-09-14',
    daysOverdue: 4,
    estimatedDurationHours: 2.0,
    requiredTeam: 'Engineering Team E07',
    requiredEquipment: 'Track Tamping Machine TM02',
    safetyRequirement: 'Traffic block required; speed restriction 30 km/h until clearance',
    isolationRequirement: 'TRACTION_POWER_BLOCK',
    preferredWindow: 'AFTERNOON',
    calculatedCriticalityScore: 86,
    status: 'PENDING',
    explanationNotes: 'Track geometry variance detected by TRC car; requires mechanized tamping.'
  },
  {
    id: 'SNT-0098',
    assetId: 'SIG-SEC018-001',
    sectionId: 'SEC018',
    department: 'SNT',
    maintenanceType: 'Signal Inspection & Interlocking Calibration',
    defectStatus: 'OPEN',
    severity: 'CRITICAL',
    priority: 'CRITICAL',
    dueDate: '2026-09-12',
    daysOverdue: 2,
    estimatedDurationHours: 1.5,
    requiredTeam: 'S&T Team S04',
    requiredEquipment: 'Signal Testing Kit STK-01',
    safetyRequirement: 'Signal isolation required; point machine clamped in normal position',
    isolationRequirement: 'SIGNAL_DISCONNECTION',
    preferredWindow: 'AFTERNOON',
    calculatedCriticalityScore: 92,
    status: 'PENDING',
    explanationNotes: 'Intermittent fail-safe relay drop reported on Up Advance Starter signal.'
  },
  {
    id: 'TRC-0076',
    assetId: 'OHE-SEC018-001',
    sectionId: 'SEC018',
    department: 'TRACTION',
    maintenanceType: 'OHE Inspection & Catenary Tension Adjustment',
    defectStatus: 'OPEN',
    severity: 'HIGH',
    priority: 'HIGH',
    dueDate: '2026-09-15',
    daysOverdue: 1,
    estimatedDurationHours: 2.0,
    requiredTeam: 'Traction Team T05',
    requiredEquipment: 'Tower Wagon TW03',
    safetyRequirement: 'Traction power isolation required; earthing discharge rods clamped both ends',
    isolationRequirement: 'TRACTION_POWER_BLOCK',
    preferredWindow: 'AFTERNOON',
    calculatedCriticalityScore: 88,
    status: 'PENDING',
    explanationNotes: 'Contact wire height sag detected under summer temperature compensation threshold.'
  },

  // SEC012 Emergency Anchor Task
  {
    id: 'SNT-0012',
    assetId: 'SIG-SEC012-001',
    sectionId: 'SEC012',
    department: 'SNT',
    maintenanceType: 'Critical Automatic Signal Failure Rectification',
    defectStatus: 'OPEN',
    severity: 'CRITICAL',
    priority: 'CRITICAL',
    dueDate: '2026-09-11',
    daysOverdue: 0,
    estimatedDurationHours: 1.5,
    requiredTeam: 'S&T Team S02',
    requiredEquipment: 'Signal Testing Kit STK-02',
    safetyRequirement: 'Immediate track and signal disconnection; pilot caution order in effect',
    isolationRequirement: 'SIGNAL_DISCONNECTION',
    preferredWindow: 'ANY',
    calculatedCriticalityScore: 98,
    status: 'PENDING',
    explanationNotes: 'Sudden red aspect lock on Automatic Signal AS-12; holding all Up trains.'
  },

  // SEC025 Arakkonam Junction Triple Opportunity
  {
    id: 'ENG-0251',
    assetId: 'TRK-SEC025-001',
    sectionId: 'SEC025',
    department: 'ENGINEERING',
    maintenanceType: 'Main Turnout #24B Tongue Rail Adjustment',
    defectStatus: 'OPEN',
    severity: 'HIGH',
    priority: 'HIGH',
    dueDate: '2026-09-16',
    daysOverdue: 3,
    estimatedDurationHours: 2.5,
    requiredTeam: 'Engineering Team E03',
    requiredEquipment: 'Turnout Tamping Machine TM01',
    safetyRequirement: 'Traffic block required on yard loop entrance',
    isolationRequirement: 'FULL_TRAFFIC_AND_POWER_BLOCK',
    preferredWindow: 'NIGHT',
    calculatedCriticalityScore: 89,
    status: 'PENDING'
  },
  {
    id: 'SNT-0252',
    assetId: 'SIG-SEC025-001',
    sectionId: 'SEC025',
    department: 'SNT',
    maintenanceType: 'Axle Counter Sensor Recalibration',
    defectStatus: 'OPEN',
    severity: 'MEDIUM',
    priority: 'HIGH',
    dueDate: '2026-09-17',
    daysOverdue: 0,
    estimatedDurationHours: 1.5,
    requiredTeam: 'S&T Team S01',
    requiredEquipment: 'Signal Testing Kit STK-04',
    safetyRequirement: 'Track circuit bypass protocol applied',
    isolationRequirement: 'SIGNAL_DISCONNECTION',
    preferredWindow: 'NIGHT',
    calculatedCriticalityScore: 78,
    status: 'PENDING'
  },
  {
    id: 'TRC-0253',
    assetId: 'OHE-SEC025-001',
    sectionId: 'SEC025',
    department: 'TRACTION',
    maintenanceType: 'Section Insulator SI-14 Replacement',
    defectStatus: 'OPEN',
    severity: 'CRITICAL',
    priority: 'CRITICAL',
    dueDate: '2026-09-15',
    daysOverdue: 2,
    estimatedDurationHours: 2.0,
    requiredTeam: 'Traction Team T01',
    requiredEquipment: 'Tower Wagon TW01',
    safetyRequirement: 'Traction feeder shutdown and discharge ground applied',
    isolationRequirement: 'TRACTION_POWER_BLOCK',
    preferredWindow: 'NIGHT',
    calculatedCriticalityScore: 90,
    status: 'PENDING'
  },

  // SEC002 Perambur Cross Department Opportunity
  {
    id: 'ENG-0021',
    assetId: 'TRK-SEC002-001',
    sectionId: 'SEC002',
    department: 'ENGINEERING',
    maintenanceType: 'Rail Flange Lubricator & Ultrasonic Testing',
    defectStatus: 'OPEN',
    severity: 'HIGH',
    priority: 'HIGH',
    dueDate: '2026-09-13',
    daysOverdue: 1,
    estimatedDurationHours: 2.0,
    requiredTeam: 'Engineering Team E01',
    requiredEquipment: 'USFD Testing Trolley',
    safetyRequirement: 'Traffic block on Slow Line #2',
    isolationRequirement: 'NONE',
    preferredWindow: 'AFTERNOON',
    calculatedCriticalityScore: 84,
    status: 'PENDING'
  },
  {
    id: 'TRC-0022',
    assetId: 'OHE-SEC002-001',
    sectionId: 'SEC002',
    department: 'TRACTION',
    maintenanceType: 'Cantilever Bracket Overhaul',
    defectStatus: 'OPEN',
    severity: 'MEDIUM',
    priority: 'MEDIUM',
    dueDate: '2026-09-14',
    daysOverdue: 0,
    estimatedDurationHours: 2.0,
    requiredTeam: 'Traction Team T02',
    requiredEquipment: 'Tower Wagon TW02',
    safetyRequirement: 'Traction power block on Slow Line #2',
    isolationRequirement: 'TRACTION_POWER_BLOCK',
    preferredWindow: 'AFTERNOON',
    calculatedCriticalityScore: 76,
    status: 'PENDING'
  }
];

function generateTasks(): MaintenanceTask[] {
  const tasks: MaintenanceTask[] = [...explicitTasks];
  const existingTaskIds = new Set(tasks.map(t => t.id));

  const engTypes = [
    { name: 'Track Alignment & Geometry Correction', dur: 2.0, eq: 'Track Tamping Machine', isol: 'TRACTION_POWER_BLOCK' as const, sev: 'HIGH' as const },
    { name: 'Rail Replacement (60kg UIC)', dur: 3.0, eq: 'Rail Crane & Flash Butt Welder', isol: 'FULL_TRAFFIC_AND_POWER_BLOCK' as const, sev: 'HIGH' as const },
    { name: 'Turnout Points & Crossings Maintenance', dur: 2.5, eq: 'Turnout Tamping Machine', isol: 'FULL_TRAFFIC_AND_POWER_BLOCK' as const, sev: 'CRITICAL' as const },
    { name: 'Sleeper Deep Screening & Renewal', dur: 3.5, eq: 'Ballast Cleaning Machine', isol: 'FULL_TRAFFIC_AND_POWER_BLOCK' as const, sev: 'HIGH' as const },
    { name: 'Bridge Girder & Bearing Inspection', dur: 1.5, eq: 'Mobile Scaffold & NDT Kit', isol: 'NONE' as const, sev: 'MEDIUM' as const },
    { name: 'Track Ultrasonic Flaw Detection (USFD)', dur: 2.0, eq: 'Digital USFD Rail Tester', isol: 'NONE' as const, sev: 'MEDIUM' as const },
    { name: 'Track Expansion Joint Re-tightening', dur: 1.5, eq: 'Hydraulic Torque Wrench', isol: 'NONE' as const, sev: 'LOW' as const },
  ];

  const sntTypes = [
    { name: 'Signal Aspect Lamp & LED Array Inspection', dur: 1.0, eq: 'Optical Signal Lux Meter', isol: 'SIGNAL_DISCONNECTION' as const, sev: 'MEDIUM' as const },
    { name: 'Electronic Interlocking Rack Testing', dur: 2.0, eq: 'EI Logic Analyzer Kit', isol: 'SIGNAL_DISCONNECTION' as const, sev: 'CRITICAL' as const },
    { name: 'Point Machine Stroke & Friction Clutch Test', dur: 1.5, eq: 'Thrust Measuring Rig', isol: 'SIGNAL_DISCONNECTION' as const, sev: 'HIGH' as const },
    { name: 'Track Circuit High Voltage Impulse Testing', dur: 1.5, eq: 'Signal Testing Kit', isol: 'SIGNAL_DISCONNECTION' as const, sev: 'HIGH' as const },
    { name: 'Axle Counter Reset & Drift Correction', dur: 1.0, eq: 'DAC Calibration Meter', isol: 'SIGNAL_DISCONNECTION' as const, sev: 'MEDIUM' as const },
    { name: 'Level Crossing Boom & Flasher Servicing', dur: 2.0, eq: 'LC Interlocking Tester', isol: 'SIGNAL_DISCONNECTION' as const, sev: 'HIGH' as const },
  ];

  const trcTypes = [
    { name: 'OHE Catenary Dropper & Jumper Renewal', dur: 2.0, eq: 'Tower Wagon', isol: 'TRACTION_POWER_BLOCK' as const, sev: 'HIGH' as const },
    { name: 'Section Insulator Creep & Wear Check', dur: 2.0, eq: 'Tower Wagon & Caliper', isol: 'TRACTION_POWER_BLOCK' as const, sev: 'CRITICAL' as const },
    { name: 'OHE Mast Neutral Section Inspection', dur: 2.5, eq: 'Tower Wagon', isol: 'TRACTION_POWER_BLOCK' as const, sev: 'HIGH' as const },
    { name: 'Traction Substation Circuit Breaker Servicing', dur: 3.0, eq: 'High Voltage Test Set', isol: 'TRACTION_POWER_BLOCK' as const, sev: 'MEDIUM' as const },
    { name: 'Earthing Discharge Rod & Bonding Inspection', dur: 1.5, eq: 'Earth Resistance Clamp', isol: 'NONE' as const, sev: 'LOW' as const },
    { name: 'Pantograph Dynamic Clearance Verification', dur: 2.0, eq: 'Tower Wagon Dynamic Profiler', isol: 'TRACTION_POWER_BLOCK' as const, sev: 'HIGH' as const },
  ];

  // We want approximately 165 total tasks across sections (65 ENG, 50 SNT, 50 TRC)
  // Ensure intentional cross-department opportunities on sections: SEC001, SEC002, SEC007, SEC008, SEC012, SEC014, SEC017, SEC018, SEC021, SEC024, SEC025, SEC027, SEC030, SEC031, SEC033, SEC034
  SECTIONS.forEach((sec, idx) => {
    const isCoordinatedSection = [1, 2, 7, 8, 12, 14, 17, 18, 21, 24, 25, 27, 30, 31, 33, 34].includes(idx + 1);

    // 1. Add Engineering task for almost every section
    const engT = engTypes[idx % engTypes.length];
    const engId = `ENG-${String(100 + idx).padStart(4, '0')}`;
    if (!existingTaskIds.has(engId)) {
      const daysOver = (idx * 3) % 7 === 0 ? (idx % 6) + 1 : 0;
      const sev: Severity = (idx % 7 === 0 || sec.infrastructureRisk > 80) ? 'CRITICAL' : engT.sev;
      tasks.push({
        id: engId,
        assetId: `TRK-${sec.id}-001`,
        sectionId: sec.id,
        department: 'ENGINEERING',
        maintenanceType: engT.name,
        defectStatus: daysOver > 0 ? 'OPEN' : 'OPEN',
        severity: sev,
        priority: sev,
        dueDate: `2026-09-${String(12 + (idx % 14)).padStart(2, '0')}`,
        daysOverdue: daysOver,
        estimatedDurationHours: engT.dur,
        requiredTeam: `Engineering Team E0${(idx % 8) + 1}`,
        requiredEquipment: engT.eq,
        safetyRequirement: 'Track safety lookouts and caution order required',
        isolationRequirement: engT.isol,
        preferredWindow: isCoordinatedSection ? 'AFTERNOON' : (idx % 2 === 0 ? 'MORNING' : 'NIGHT'),
        calculatedCriticalityScore: Math.round(sec.criticality * 0.4 + (sev === 'CRITICAL' ? 40 : sev === 'HIGH' ? 25 : 15) + daysOver * 3),
        status: 'PENDING'
      });
      existingTaskIds.add(engId);
    }

    // 2. Add S&T task for sections
    if (idx % 2 === 0 || isCoordinatedSection) {
      const sntT = sntTypes[(idx * 2) % sntTypes.length];
      const sntId = `SNT-${String(200 + idx).padStart(4, '0')}`;
      if (!existingTaskIds.has(sntId)) {
        const daysOver = (idx * 5) % 6 === 0 ? (idx % 4) + 1 : 0;
        const sev: Severity = (idx % 6 === 0) ? 'CRITICAL' : sntT.sev;
        tasks.push({
          id: sntId,
          assetId: `SIG-${sec.id}-001`,
          sectionId: sec.id,
          department: 'SNT',
          maintenanceType: sntT.name,
          defectStatus: 'OPEN',
          severity: sev,
          priority: sev,
          dueDate: `2026-09-${String(11 + ((idx + 2) % 15)).padStart(2, '0')}`,
          daysOverdue: daysOver,
          estimatedDurationHours: sntT.dur,
          requiredTeam: `S&T Team S0${(idx % 6) + 1}`,
          requiredEquipment: sntT.eq,
          safetyRequirement: 'Signal disconnection permit & red tag placed',
          isolationRequirement: sntT.isol,
          preferredWindow: isCoordinatedSection ? 'AFTERNOON' : (idx % 3 === 0 ? 'NIGHT' : 'MORNING'),
          calculatedCriticalityScore: Math.round(sec.criticality * 0.4 + (sev === 'CRITICAL' ? 40 : sev === 'HIGH' ? 25 : 15) + daysOver * 3),
          status: 'PENDING'
        });
        existingTaskIds.add(sntId);
      }
    }

    // 3. Add Traction task for sections
    if (idx % 2 === 1 || isCoordinatedSection) {
      const trcT = trcTypes[(idx * 3) % trcTypes.length];
      const trcId = `TRC-${String(300 + idx).padStart(4, '0')}`;
      if (!existingTaskIds.has(trcId)) {
        const daysOver = (idx * 7) % 5 === 0 ? (idx % 5) + 1 : 0;
        const sev: Severity = (idx % 8 === 0) ? 'CRITICAL' : trcT.sev;
        tasks.push({
          id: trcId,
          assetId: `OHE-${sec.id}-001`,
          sectionId: sec.id,
          department: 'TRACTION',
          maintenanceType: trcT.name,
          defectStatus: 'OPEN',
          severity: sev,
          priority: sev,
          dueDate: `2026-09-${String(13 + ((idx + 1) % 13)).padStart(2, '0')}`,
          daysOverdue: daysOver,
          estimatedDurationHours: trcT.dur,
          requiredTeam: `Traction Team T0${(idx % 5) + 1}`,
          requiredEquipment: trcT.eq,
          safetyRequirement: 'Traction power shutdown and earthing discharge',
          isolationRequirement: trcT.isol,
          preferredWindow: isCoordinatedSection ? 'AFTERNOON' : (idx % 4 === 0 ? 'NIGHT' : 'AFTERNOON'),
          calculatedCriticalityScore: Math.round(sec.criticality * 0.4 + (sev === 'CRITICAL' ? 40 : sev === 'HIGH' ? 25 : 15) + daysOver * 3),
          status: 'PENDING'
        });
        existingTaskIds.add(trcId);
      }
    }

    // Add secondary task on high-density sections to reach 165+
    if ([1, 8, 17, 24, 33].includes(idx + 1)) {
      const extraId = `ENG-${String(400 + idx).padStart(4, '0')}`;
      tasks.push({
        id: extraId,
        assetId: `TRK-${sec.id}-001`,
        sectionId: sec.id,
        department: 'ENGINEERING',
        maintenanceType: 'Ballast Tamp & Tamping Shoulder Dressing',
        defectStatus: 'OPEN',
        severity: 'HIGH',
        priority: 'HIGH',
        dueDate: `2026-09-18`,
        daysOverdue: 0,
        estimatedDurationHours: 2.0,
        requiredTeam: `Engineering Team E0${(idx % 4) + 1}`,
        requiredEquipment: 'Ballast Profiling Machine',
        safetyRequirement: 'Track speed restriction to 45 km/h',
        isolationRequirement: 'TRACTION_POWER_BLOCK',
        preferredWindow: 'NIGHT',
        calculatedCriticalityScore: 75,
        status: 'PENDING'
      });
    }
  });

  return tasks;
}

export const MAINTENANCE_TASKS: MaintenanceTask[] = generateTasks();
