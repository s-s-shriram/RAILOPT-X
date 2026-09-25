import { MaintenanceTask, Asset, Section, Severity } from '../types';

export interface CriticalityFactorBreakdown {
  assetCriticalityScore: number; // 25%
  defectSeverityScore: number; // 25%
  urgencyDaysOverdueScore: number; // 20%
  failureRiskScore: number; // 15%
  networkImportanceScore: number; // 15%
  finalScore: number; // 0-100
  classification: Severity;
  mathematicalFormula: string;
  rationale: string;
}

export function computeTaskCriticality(
  task: MaintenanceTask,
  asset?: Asset,
  section?: Section
): CriticalityFactorBreakdown {
  // 1. Asset Criticality (0-100)
  const assetCrit = asset ? asset.criticality : 70;

  // 2. Defect Severity (0-100)
  const severityMap: Record<Severity, number> = {
    LOW: 25,
    MEDIUM: 50,
    HIGH: 78,
    CRITICAL: 96,
  };
  const defectScore = severityMap[task.severity] || 50;

  // 3. Urgency & Days Overdue (0-100)
  // 0 days overdue = 30; 1 day = 55; 2 days = 70; 3 days = 85; 4+ days = 100
  const daysOverdue = task.daysOverdue || 0;
  const overdueScore = Math.min(100, 30 + daysOverdue * 18);

  // 4. Failure Risk & Safety Impact (0-100)
  const failureRiskScore = asset ? asset.failureRisk : 60;

  // 5. Network Importance & Train Frequency Impact (0-100)
  const networkScore = section ? Math.min(100, Math.round(section.criticality * 0.7 + (section.trainFrequency / 200) * 30)) : 65;

  // Transparent Weighted Multi-Attribute Formulation:
  // Final = 0.25*Asset + 0.25*Severity + 0.20*Urgency + 0.15*Risk + 0.15*Network
  const weighted =
    assetCrit * 0.25 +
    defectScore * 0.25 +
    overdueScore * 0.20 +
    failureRiskScore * 0.15 +
    networkScore * 0.15;

  const finalScore = Math.min(100, Math.max(10, Math.round(weighted)));

  let classification: Severity = 'LOW';
  if (finalScore >= 80) classification = 'CRITICAL';
  else if (finalScore >= 60) classification = 'HIGH';
  else if (finalScore >= 40) classification = 'MEDIUM';

  const formula = `Score = (0.25 × ${assetCrit}) + (0.25 × ${defectScore}) + (0.20 × ${overdueScore}) + (0.15 × ${failureRiskScore}) + (0.15 × ${networkScore}) = ${finalScore}`;

  let rationale = `Asset baseline criticality is ${assetCrit}/100. `;
  if (daysOverdue > 0) {
    rationale += `Urgency amplified by ${daysOverdue} days overdue. `;
  }
  if (classification === 'CRITICAL') {
    rationale += `High risk of line disruption on high-density corridor requires top scheduling priority.`;
  } else {
    rationale += `Standard preventive corridor window allocation recommended.`;
  }

  return {
    assetCriticalityScore: assetCrit,
    defectSeverityScore: defectScore,
    urgencyDaysOverdueScore: overdueScore,
    failureRiskScore,
    networkImportanceScore: networkScore,
    finalScore,
    classification,
    mathematicalFormula: formula,
    rationale,
  };
}
