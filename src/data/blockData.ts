import { BlockWindow } from '../types';
import { SECTIONS } from './corridorData';

// Explicit anchor block windows
const explicitBlocks: BlockWindow[] = [
  // SEC018 Recommended Optimal Coordinated Block
  {
    id: 'BLK-0187',
    sectionId: 'SEC018',
    dayOfWeek: 'Wednesday',
    date: '2026-09-16',
    startTime: '13:00',
    endTime: '16:00',
    durationHours: 3.0,
    isAvailable: true,
    restrictions: 'Traction isolation granted; Down Line blocked; Up Line single-line bi-directional working allowed',
    trainImpactCapacity: 'LOW',
    isolationProvided: 'TRACTION_POWER_BLOCK',
    assignedTaskIds: ['ENG-0187', 'SNT-0098', 'TRC-0076'],
    bundledDepartments: ['ENGINEERING', 'SNT', 'TRACTION'],
    utilizationPercent: 91,
    status: 'OPEN',
  },
  // SEC018 Sub-optimal / Rejected Block (heavy train traffic)
  {
    id: 'BLK-0214',
    sectionId: 'SEC018',
    dayOfWeek: 'Wednesday',
    date: '2026-09-16',
    startTime: '09:30',
    endTime: '11:30',
    durationHours: 2.0,
    isAvailable: false,
    restrictions: 'REJECTED: Heavy suburban passenger peak & Express EXP-101 conflict; freight demand in peak window',
    trainImpactCapacity: 'CRITICAL',
    isolationProvided: 'NONE',
    assignedTaskIds: [],
    bundledDepartments: [],
    utilizationPercent: 0,
    status: 'REJECTED',
  },

  // SEC012 Emergency Block
  {
    id: 'BLK-EMERG-012',
    sectionId: 'SEC012',
    dayOfWeek: 'Monday',
    date: '2026-09-14',
    startTime: '10:00',
    endTime: '11:30',
    durationHours: 1.5,
    isAvailable: true,
    restrictions: 'EMERGENCY: Immediate track and signal isolation granted under caution rule 15 km/h',
    trainImpactCapacity: 'HIGH',
    isolationProvided: 'SIGNAL_DISCONNECTION',
    assignedTaskIds: ['SNT-0012'],
    bundledDepartments: ['SNT'],
    utilizationPercent: 95,
    status: 'OPEN',
  },

  // SEC025 Arakkonam Junction Nocturnal Coordinated Block
  {
    id: 'BLK-0251',
    sectionId: 'SEC025',
    dayOfWeek: 'Thursday',
    date: '2026-09-17',
    startTime: '01:00',
    endTime: '04:00',
    durationHours: 3.0,
    isAvailable: true,
    restrictions: 'Full traffic and traction power isolation granted during zero-passenger nocturnal corridor window',
    trainImpactCapacity: 'LOW',
    isolationProvided: 'FULL_TRAFFIC_AND_POWER_BLOCK',
    assignedTaskIds: ['ENG-0251', 'SNT-0252', 'TRC-0253'],
    bundledDepartments: ['ENGINEERING', 'SNT', 'TRACTION'],
    utilizationPercent: 88,
    status: 'OPEN',
  }
];

function generateBlocks(): BlockWindow[] {
  const blocks: BlockWindow[] = [...explicitBlocks];
  const existingIds = new Set(blocks.map(b => b.id));

  const days: BlockWindow['dayOfWeek'][] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const slots = [
    { start: '01:00', end: '04:00', dur: 3.0, impact: 'LOW' as const, isol: 'FULL_TRAFFIC_AND_POWER_BLOCK' as const },
    { start: '11:30', end: '13:30', dur: 2.0, impact: 'MEDIUM' as const, isol: 'TRACTION_POWER_BLOCK' as const },
    { start: '13:00', end: '16:00', dur: 3.0, impact: 'LOW' as const, isol: 'TRACTION_POWER_BLOCK' as const },
    { start: '22:30', end: '01:00', dur: 2.5, impact: 'LOW' as const, isol: 'TRACTION_POWER_BLOCK' as const },
    { start: '08:30', end: '10:30', dur: 2.0, impact: 'CRITICAL' as const, isol: 'NONE' as const },
  ];

  // Generate 5 blocks per section to get 35 * 5 = 175 blocks
  SECTIONS.forEach((sec, sIdx) => {
    slots.forEach((slot, slIdx) => {
      const blockId = `BLK-${sec.id}-${slIdx + 1}`;
      if (!existingIds.has(blockId)) {
        const isAvail = slot.impact !== 'CRITICAL';
        const day = days[(sIdx + slIdx) % days.length];
        blocks.push({
          id: blockId,
          sectionId: sec.id,
          dayOfWeek: day,
          date: `2026-09-${String(14 + ((sIdx + slIdx) % 7)).padStart(2, '0')}`,
          startTime: slot.start,
          endTime: slot.end,
          durationHours: slot.dur,
          isAvailable: isAvail,
          restrictions: isAvail ? 'Corridor window validated with Section Controller' : 'High passenger density corridor conflict',
          trainImpactCapacity: slot.impact,
          isolationProvided: slot.isol,
          assignedTaskIds: [],
          bundledDepartments: [],
          utilizationPercent: 0,
          status: isAvail ? 'OPEN' : 'REJECTED',
        });
        existingIds.add(blockId);
      }
    });
  });

  return blocks;
}

export const BLOCK_WINDOWS: BlockWindow[] = generateBlocks();
