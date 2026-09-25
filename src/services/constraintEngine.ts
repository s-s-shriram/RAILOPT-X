import { MaintenanceTask, BlockWindow, Resource } from '../types';

export interface ConstraintValidationResult {
  isFeasible: boolean;
  violations: {
    ruleId: string;
    ruleName: string;
    severity: 'HARD_REJECT' | 'SOFT_PENALTY';
    message: string;
  }[];
  penaltyScore: number;
}

export function validateHardConstraints(
  task: MaintenanceTask,
  block: BlockWindow,
  allAssignedTasksInBlock: MaintenanceTask[],
  availableResources: Resource[]
): ConstraintValidationResult {
  const violations: ConstraintValidationResult['violations'] = [];
  let penaltyScore = 0;

  // 1. Corridor Availability Hard Constraint
  if (!block.isAvailable) {
    violations.push({
      ruleId: 'HARD-01',
      ruleName: 'Corridor Window Availability',
      severity: 'HARD_REJECT',
      message: `Block window ${block.id} is closed or rejected by Section Controller.`,
    });
  }

  // 2. Duration Constraint
  if (task.estimatedDurationHours > block.durationHours) {
    violations.push({
      ruleId: 'HARD-02',
      ruleName: 'Block Duration Insufficiency',
      severity: 'HARD_REJECT',
      message: `Task ${task.id} requires ${task.estimatedDurationHours}h, exceeding block duration of ${block.durationHours}h.`,
    });
  }

  // 3. Section Colocation Constraint
  if (task.sectionId !== block.sectionId) {
    violations.push({
      ruleId: 'HARD-03',
      ruleName: 'Geographic Section Mismatch',
      severity: 'HARD_REJECT',
      message: `Task ${task.id} is mapped to ${task.sectionId} but block ${block.id} is on ${block.sectionId}.`,
    });
  }

  // 4. Electrical Isolation Hard Constraint
  if (
    task.isolationRequirement === 'TRACTION_POWER_BLOCK' &&
    block.isolationProvided !== 'TRACTION_POWER_BLOCK' &&
    block.isolationProvided !== 'FULL_TRAFFIC_AND_POWER_BLOCK'
  ) {
    violations.push({
      ruleId: 'HARD-04',
      ruleName: 'OHE Traction Power Isolation Missing',
      severity: 'HARD_REJECT',
      message: `Safety violation: Task ${task.id} requires 25kV traction power shutdown, but block ${block.id} has no traction isolation authorized.`,
    });
  }

  // 5. Train Disruption Hard Constraint (Passenger peak protection)
  if (block.trainImpactCapacity === 'CRITICAL') {
    violations.push({
      ruleId: 'HARD-05',
      ruleName: 'Severe Passenger Train Conflict',
      severity: 'HARD_REJECT',
      message: `Hard operational rejection: Block coincides with high-density suburban peak and Mail/Express movement.`,
    });
  }

  // 6. Resource Verification
  const teamMatch = availableResources.find(
    r => (r.name && task.requiredTeam && r.name.toLowerCase().includes(task.requiredTeam.toLowerCase())) || r.id === task.requiredTeam
  );
  if (teamMatch && teamMatch.currentStatus === 'MAINTENANCE') {
    violations.push({
      ruleId: 'HARD-06',
      ruleName: 'Required Maintenance Team Unavailable',
      severity: 'HARD_REJECT',
      message: `Assigned team ${task.requiredTeam} is currently tagged in depot maintenance.`,
    });
  }

  // 7. Safety Incompatibility with other tasks in same block
  const hasTrackTamping = allAssignedTasksInBlock.some(t => Boolean(t.maintenanceType && t.maintenanceType.includes('Tamping')));
  const hasManualUSFD = Boolean(
    task.maintenanceType && (task.maintenanceType.includes('USFD') || task.maintenanceType.includes('Ultrasonic'))
  );
  if (hasTrackTamping && hasManualUSFD) {
    violations.push({
      ruleId: 'HARD-07',
      ruleName: 'Safety Incompatibility Between Concurrent Tasks',
      severity: 'HARD_REJECT',
      message: `Mechanized tamping machine vibration invalidates concurrent ultrasonic rail testing. Tasks must be separated.`,
    });
  }

  // Soft penalties (Preferences)
  if (task.preferredWindow !== 'ANY') {
    const isMorning = block.startTime >= '06:00' && block.startTime <= '12:00';
    const isAfternoon = block.startTime >= '12:00' && block.startTime <= '18:00';
    const isNight = block.startTime >= '21:00' || block.startTime <= '05:00';

    if (task.preferredWindow === 'NIGHT' && !isNight) penaltyScore += 20;
    if (task.preferredWindow === 'AFTERNOON' && !isAfternoon) penaltyScore += 15;
    if (task.preferredWindow === 'MORNING' && !isMorning) penaltyScore += 15;
  }

  const isFeasible = violations.filter(v => v.severity === 'HARD_REJECT').length === 0;

  return {
    isFeasible,
    violations,
    penaltyScore,
  };
}
