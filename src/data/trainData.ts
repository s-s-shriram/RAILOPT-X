import { TrainMovement, FreightForecast, TrainType } from '../types';
import { SECTIONS } from './corridorData';

// Explicit key trains
const explicitTrains: TrainMovement[] = [
  {
    id: 'EXP-101',
    trainNumber: '12601',
    name: 'Chennai - Mangaluru Superfast Mail',
    trainType: 'SUPERFAST',
    sectionId: 'SEC018',
    date: '2026-09-14',
    arrivalTime: '10:40',
    departureTime: '10:45',
    direction: 'DOWN',
    priority: 'HIGH',
    isPassenger: true,
    passengerCapacityPercent: 96,
  },
  {
    id: 'EXP-102',
    trainNumber: '12007',
    name: 'Chennai - Mysuru Shatabdi Express',
    trainType: 'SUPERFAST',
    sectionId: 'SEC018',
    date: '2026-09-14',
    arrivalTime: '06:40',
    departureTime: '06:43',
    direction: 'DOWN',
    priority: 'CRITICAL',
    isPassenger: true,
    passengerCapacityPercent: 98,
  },
  {
    id: 'EXP-103',
    trainNumber: '20607',
    name: 'Vande Bharat Express (MAS - MYS)',
    trainType: 'SUPERFAST',
    sectionId: 'SEC018',
    date: '2026-09-14',
    arrivalTime: '06:05',
    departureTime: '06:08',
    direction: 'DOWN',
    priority: 'CRITICAL',
    isPassenger: true,
    passengerCapacityPercent: 99,
  },
  {
    id: 'FRT-201',
    trainNumber: 'BTPN-881',
    name: 'Petroleum Tanker Rake (Ennore - Renigunta)',
    trainType: 'FREIGHT',
    sectionId: 'SEC018',
    date: '2026-09-14',
    arrivalTime: '11:15',
    departureTime: '11:35',
    direction: 'DOWN',
    priority: 'MEDIUM',
    isPassenger: false,
    expectedLoadTons: 3800,
  },
  {
    id: 'FRT-202',
    trainNumber: 'BOXN-902',
    name: 'Thermal Coal Rake (Chennai Port - Raichur)',
    trainType: 'FREIGHT',
    sectionId: 'SEC018',
    date: '2026-09-14',
    arrivalTime: '16:20',
    departureTime: '16:45',
    direction: 'DOWN',
    priority: 'HIGH',
    isPassenger: false,
    expectedLoadTons: 4200,
  },
  {
    id: 'EMU-301',
    trainNumber: '43011',
    name: 'Chennai Central - Tiruvallur Suburban EMU',
    trainType: 'MEMU_EMU',
    sectionId: 'SEC016',
    date: '2026-09-14',
    arrivalTime: '08:25',
    departureTime: '08:27',
    direction: 'DOWN',
    priority: 'HIGH',
    isPassenger: true,
    passengerCapacityPercent: 120,
  }
];

function generateTrainMovements(): TrainMovement[] {
  const trains: TrainMovement[] = [...explicitTrains];
  const existingIds = new Set(trains.map(t => t.id));

  const trainTemplates: { name: string; type: TrainType; prio: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'; pass: boolean }[] = [
    { name: 'Brindavan Express', type: 'EXPRESS', prio: 'HIGH', pass: true },
    { name: 'Lalbagh Express', type: 'EXPRESS', prio: 'HIGH', pass: true },
    { name: 'West Coast Express', type: 'SUPERFAST', prio: 'HIGH', pass: true },
    { name: 'Yercaud Express', type: 'EXPRESS', prio: 'HIGH', pass: true },
    { name: 'Suburban Local EMU', type: 'MEMU_EMU', prio: 'MEDIUM', pass: true },
    { name: 'Fast Suburban EMU', type: 'MEMU_EMU', prio: 'MEDIUM', pass: true },
    { name: 'Tirupati Intercity', type: 'INTERCITY', prio: 'HIGH', pass: true },
    { name: 'Sapthagiri Express', type: 'INTERCITY', prio: 'HIGH', pass: true },
    { name: 'Container Rake (CONCOR)', type: 'FREIGHT', prio: 'MEDIUM', pass: false },
    { name: 'Steel Coil Carrier (BOST)', type: 'FREIGHT', prio: 'MEDIUM', pass: false },
    { name: 'Cement Freight Special', type: 'FREIGHT', prio: 'LOW', pass: false },
    { name: 'Automobile Carrier (NMG)', type: 'FREIGHT', prio: 'MEDIUM', pass: false },
  ];

  // Distribute across all 35 sections and time slots (Morning 05:00-11:00, Afternoon 11:00-16:00, Evening 16:00-22:00, Night 22:00-05:00)
  SECTIONS.forEach((sec, sIdx) => {
    // 8 trains per section to achieve 35 * 8 = 280 train movements
    for (let i = 0; i < 8; i++) {
      const id = `TRN-${sec.id}-${String(i + 1).padStart(2, '0')}`;
      if (!existingIds.has(id)) {
        const tmpl = trainTemplates[(sIdx * 3 + i) % trainTemplates.length];
        const hour = (5 + i * 2 + (sIdx % 3)) % 24;
        const minute = (i * 13 + sIdx * 7) % 60;
        const arr = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
        const depMinute = (minute + (tmpl.pass ? 3 : 15)) % 60;
        const depHour = depMinute < minute ? (hour + 1) % 24 : hour;
        const dep = `${String(depHour).padStart(2, '0')}:${String(depMinute).padStart(2, '0')}`;

        trains.push({
          id,
          trainNumber: String(12000 + (sIdx * 10) + i),
          name: `${tmpl.name} (#${sec.id})`,
          trainType: tmpl.type,
          sectionId: sec.id,
          date: '2026-09-14',
          arrivalTime: arr,
          departureTime: dep,
          direction: i % 2 === 0 ? 'DOWN' : 'UP',
          priority: tmpl.prio,
          isPassenger: tmpl.pass,
          expectedLoadTons: tmpl.pass ? undefined : 3500 + (i * 200),
          passengerCapacityPercent: tmpl.pass ? 70 + ((sIdx + i * 5) % 40) : undefined,
        });
        existingIds.add(id);
      }
    }
  });

  return trains;
}

export const TRAIN_MOVEMENTS: TrainMovement[] = generateTrainMovements();

export const FREIGHT_FORECASTS: FreightForecast[] = SECTIONS.map((sec, idx) => {
  const isHighFreightCorridor = [1, 2, 8, 17, 18, 24, 25, 30, 31, 33].includes(idx + 1);
  const count = isHighFreightCorridor ? 12 + (idx % 6) : 6 + (idx % 4);
  return {
    date: '2026-09-14',
    sectionId: sec.id,
    expectedFreightTrains: count,
    demandLevel: count >= 12 ? 'HIGH' : count >= 8 ? 'MEDIUM' : 'LOW',
    peakPeriod: idx % 2 === 0 ? '09:00–12:00' : '14:00–18:00',
    forecastConfidence: 85 + (idx % 12),
  };
});
