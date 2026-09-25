export type Department = 'ENGINEERING' | 'SNT' | 'TRACTION';

export type Severity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type AssetCondition = 'NORMAL' | 'WARNING' | 'CRITICAL';

export type TrainType = 'EXPRESS' | 'SUPERFAST' | 'PASSENGER' | 'MEMU_EMU' | 'INTERCITY' | 'SPECIAL' | 'FREIGHT';

export type DemandLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export type ConflictType = 'TRAIN' | 'RESOURCE' | 'BLOCK' | 'TIME' | 'SAFETY' | 'ISOLATION' | 'DEPENDENCY';

export interface Station {
  id: string; // ST001 .. ST036
  name: string;
  zone: string;
  division: string;
  connectedSections: string[];
  criticality: number; // 0-100
  trainFrequency: number; // trains per day
  passengerDemand: DemandLevel;
  freightDemand: DemandLevel;
  km: number;
}

export interface Section {
  id: string; // SEC001 .. SEC035
  fromStationId: string;
  toStationId: string;
  fromStationName: string;
  toStationName: string;
  distanceKm: number;
  tracks: number;
  electrified: boolean;
  maxSpeedKmph: number;
  trainFrequency: number;
  freightFrequency: number;
  criticality: number; // 0-100
  infrastructureRisk: number; // 0-100
  status: 'NORMAL' | 'WARNING' | 'CRITICAL' | 'MAINTENANCE';
}

export interface Asset {
  id: string;
  sectionId: string;
  department: Department;
  assetType: string;
  condition: AssetCondition;
  criticality: number; // 0-100
  installYear: number;
  lastMaintainedDate: string;
  failureRisk: number; // 0-100
  healthScore: number; // 0-100
}

export interface MaintenanceTask {
  id: string; // e.g. ENG-0187, SNT-0098, TRC-0076
  assetId: string;
  sectionId: string;
  department: Department;
  maintenanceType: string;
  defectStatus: 'OPEN' | 'IN_PROGRESS' | 'SCHEDULED' | 'DEFERRED' | 'COMPLETED';
  severity: Severity;
  priority: Severity;
  dueDate: string;
  daysOverdue: number;
  estimatedDurationHours: number;
  requiredTeam: string;
  requiredEquipment: string;
  safetyRequirement: string;
  isolationRequirement: 'NONE' | 'TRACTION_POWER_BLOCK' | 'SIGNAL_DISCONNECTION' | 'FULL_TRAFFIC_AND_POWER_BLOCK';
  preferredWindow: 'MORNING' | 'AFTERNOON' | 'NIGHT' | 'ANY';
  calculatedCriticalityScore: number; // 0-100 computed by AI engine
  status: 'PENDING' | 'BUNDLED' | 'SCHEDULED' | 'DEFERRED';
  scheduledBlockId?: string;
  explanationNotes?: string;
}

export interface TrainMovement {
  id: string;
  trainNumber: string;
  name: string;
  trainType: TrainType;
  sectionId: string;
  date: string;
  arrivalTime: string; // "10:45"
  departureTime: string; // "10:52"
  direction: 'UP' | 'DOWN';
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  isPassenger: boolean;
  expectedLoadTons?: number;
  passengerCapacityPercent?: number;
}

export interface FreightForecast {
  date: string;
  sectionId: string;
  expectedFreightTrains: number;
  demandLevel: DemandLevel;
  peakPeriod: string; // "09:00–12:00"
  forecastConfidence: number; // %
}

export interface BlockWindow {
  id: string; // e.g. BLK-0187
  sectionId: string;
  dayOfWeek: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  date: string;
  startTime: string; // "13:00"
  endTime: string; // "16:00"
  durationHours: number;
  isAvailable: boolean;
  restrictions: string;
  trainImpactCapacity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  isolationProvided: 'NONE' | 'TRACTION_POWER_BLOCK' | 'SIGNAL_DISCONNECTION' | 'FULL_TRAFFIC_AND_POWER_BLOCK';
  assignedTaskIds: string[];
  bundledDepartments: Department[];
  utilizationPercent: number;
  status: 'OPEN' | 'RESERVED' | 'EXECUTING' | 'REJECTED';
}

export interface Resource {
  id: string; // e.g. E07, S04, T05, TM01, TW03
  department: Department;
  resourceType: 'CREW' | 'TRACK_MACHINE' | 'TOWER_WAGON' | 'SIGNAL_TEST_KIT' | 'HEAVY_EQUIPMENT';
  name: string;
  baseStationId: string;
  availableFrom: string;
  availableTo: string;
  capacity: number;
  specialization: string;
  currentStatus: 'AVAILABLE' | 'BUSY' | 'MAINTENANCE';
  assignedSectionId?: string;
}

export interface MaintenanceBundle {
  id: string;
  blockId: string;
  sectionId: string;
  tasks: MaintenanceTask[];
  departments: Department[];
  synergyScore: number; // 0-100
  totalEstimatedHours: number;
  windowHours: number;
  utilizationPercent: number;
  resourcesAssigned: string[];
  safetyCompatible: boolean;
  isolationCompatible: boolean;
  trainImpactLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  status: 'RECOMMENDED' | 'APPROVED' | 'REJECTED';
  recommendationReason: string;
  taskIds?: string[];
  blockHoursSaved?: number;
  separateDurationsSumHours?: number;
  combinedDurationHours?: number;
}

export interface OperationalConflict {
  id: string;
  conflictType: ConflictType;
  sectionId: string;
  blockId?: string;
  taskIds: string[];
  severity: Severity;
  description: string;
  recommendation: string;
  resolved: boolean;
}

export interface BenchmarkMetrics {
  totalBlocks: number;
  tasksCompleted: number;
  criticalTasksCompleted: number;
  bundledActivities: number;
  blockUtilizationPercent: number;
  assetDowntimeHours: number;
  trainConflicts: number;
  resourceConflicts: number;
  trainDisruptionIndex: number; // 0-100
  overallAssetAvailabilityPercent: number;
}

export interface SimulationParameters {
  freightDemandDelta: number; // -0.2, 0, +0.2
  trainFrequencyDelta: number; // -0.2, 0, +0.2
  maintenanceDemandDelta: number; // -0.2, 0, +0.2
  resourceAvailabilityDelta: number; // -0.2, 0, +0.2
  blockDurationModifier: 'SHORT' | 'NORMAL' | 'EXTENDED';
}

export interface ExplainabilityRecord {
  blockId: string;
  taskId: string;
  sectionId: string;
  whyThisTask: string[];
  whyThisBlock: string[];
  whyThisTime: string[];
  whyThisBundle: string[];
  whyAlternativesRejected: { blockId: string; reason: string }[];
  scoringBreakdown: {
    assetCriticalityWeight: number;
    defectUrgencyWeight: number;
    synergyBonus: number;
    trainPenalty: number;
    finalScore: number;
  };
}

export interface SystemDataIntegrationStatus {
  tmsStatus: 'CONNECTED' | 'SYNCING' | 'OFFLINE';
  smmsStatus: 'CONNECTED' | 'SYNCING' | 'OFFLINE';
  tdmsStatus: 'CONNECTED' | 'SYNCING' | 'OFFLINE';
  coaStatus: 'CONNECTED' | 'SYNCING' | 'OFFLINE';
  timetableStatus: 'LOADED' | 'OUTDATED';
  freightForecastStatus: 'LOADED' | 'OUTDATED';
  resourcesStatus: 'LOADED' | 'SYNCING';
  dataQualityScore: number;
  lastValidatedTimestamp: string;
  detectedIssuesCount: number;
}

export type ResourceType = 'CREW' | 'TRACK_MACHINE' | 'TOWER_WAGON' | 'SIGNAL_TEST_KIT' | 'HEAVY_EQUIPMENT';

export interface ConstraintViolation {
  id: string;
  ruleName: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  description: string;
  affectedBlockId?: string;
  affectedTaskIds?: string[];
  department?: Department;
  mitigationSuggestion: string;
}

export interface OptimizationParameters {
  criticalityWeight?: number;
  bundlingSynergyWeight?: number;
  trainDelayPenaltyWeight?: number;
  resourceTransitCostWeight?: number;
  maxConcurrentBlocksPerCorridor?: number;
}

