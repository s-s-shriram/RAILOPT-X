import { BlockWindow, TrainMovement, FreightForecast } from '../types';

export interface TrainImpactAssessment {
  blockId: string;
  sectionId: string;
  affectedTrainsCount: number;
  passengerTrainsAffected: TrainMovement[];
  freightTrainsAffected: TrainMovement[];
  isPassengerPeakHour: boolean;
  estimatedDelayMinutes: number;
  impactLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  alternateRouteFeasible: boolean;
  operationalRiskScore: number; // 0-100
  mitigationRecommendation: string;
}

export function evaluateBlockTrainImpact(
  block: BlockWindow,
  trains: TrainMovement[],
  freightForecasts: FreightForecast[]
): TrainImpactAssessment {
  // Convert HH:MM to minutes
  const parseMin = (t: string) => {
    const [h, m] = t.split(':').map(Number);
    return h * 60 + m;
  };

  const blockStartMin = parseMin(block.startTime);
  const blockEndMin = parseMin(block.endTime);

  // Suburban peak hours in Chennai suburban & trunk:
  // Morning 07:00–10:00 (420 to 600 min)
  // Evening 17:00–20:00 (1020 to 1200 min)
  const isMorningPeak = (blockStartMin >= 420 && blockStartMin <= 600) || (blockEndMin >= 420 && blockEndMin <= 600);
  const isEveningPeak = (blockStartMin >= 1020 && blockStartMin <= 1200) || (blockEndMin >= 1020 && blockEndMin <= 1200);
  const isPassengerPeakHour = isMorningPeak || isEveningPeak;

  // Filter trains running in this section during the block window
  const relevantTrains = trains.filter(tr => {
    if (tr.sectionId !== block.sectionId) return false;
    const trArr = parseMin(tr.arrivalTime);
    // overlap check
    return trArr >= blockStartMin && trArr <= blockEndMin;
  });

  const passengerTrainsAffected = relevantTrains.filter(t => t.isPassenger);
  const freightTrainsAffected = relevantTrains.filter(t => !t.isPassenger);

  // Freight forecast on this section
  const ff = freightForecasts.find(f => f.sectionId === block.sectionId);
  const isFreightPeak = ff && ff.demandLevel === 'HIGH';

  // Calculate score
  let score = 10;
  if (isPassengerPeakHour) score += 45;
  score += passengerTrainsAffected.length * 15;
  score += freightTrainsAffected.length * 8;
  if (isFreightPeak) score += 12;

  // Critical trains (Shatabdi, Vande Bharat, Rajdhani)
  const hasCriticalTrain = passengerTrainsAffected.some(t => t.priority === 'CRITICAL');
  if (hasCriticalTrain) score += 30;

  score = Math.min(100, score);

  let impactLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' = 'LOW';
  if (score >= 80 || (hasCriticalTrain && isPassengerPeakHour)) {
    impactLevel = 'CRITICAL';
  } else if (score >= 55) {
    impactLevel = 'HIGH';
  } else if (score >= 30) {
    impactLevel = 'MEDIUM';
  }

  const estimatedDelayMinutes = impactLevel === 'CRITICAL' ? 65 : impactLevel === 'HIGH' ? 35 : impactLevel === 'MEDIUM' ? 18 : 4;
  const alternateRouteFeasible = block.sectionId !== 'SEC001' && block.sectionId !== 'SEC035';

  let mitigation = 'Block falls in quiet mid-day window. Single line operational bypass active.';
  if (impactLevel === 'CRITICAL') {
    mitigation = 'UNACCEPTABLE TRAIN IMPACT: Passenger peak hour with high-priority mail trains. Shift block to nocturnal slot 01:00-04:00.';
  } else if (impactLevel === 'HIGH') {
    mitigation = 'Moderate passenger disruption: Issue temporary caution order 30 km/h on loop line; regulate freight at preceding junction.';
  } else if (impactLevel === 'MEDIUM') {
    mitigation = 'Regulate 2 goods rakes at siding; passenger trains pass through adjacent track without schedule modification.';
  }

  return {
    blockId: block.id,
    sectionId: block.sectionId,
    affectedTrainsCount: relevantTrains.length,
    passengerTrainsAffected,
    freightTrainsAffected,
    isPassengerPeakHour,
    estimatedDelayMinutes,
    impactLevel,
    alternateRouteFeasible,
    operationalRiskScore: score,
    mitigationRecommendation: mitigation,
  };
}
