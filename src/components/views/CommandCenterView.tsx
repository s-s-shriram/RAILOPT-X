import React from 'react';
import {
  LayoutDashboard,
  ShieldCheck,
  AlertTriangle,
  Clock,
  Sparkles,
  CalendarCheck,
  CheckCircle2,
  TrendingUp,
  Sliders,
  TrainTrack,
  ArrowUpRight,
  PlayCircle,
  Activity,
  Zap,
} from 'lucide-react';
import {
  Section,
  MaintenanceTask,
  BlockWindow,
  BenchmarkMetrics,
  MaintenanceBundle,
} from '../../types';

interface CommandCenterViewProps {
  sections: Section[];
  tasks: MaintenanceTask[];
  blocks: BlockWindow[];
  bundles: MaintenanceBundle[];
  metrics: BenchmarkMetrics;
  onSelectView: (viewId: string) => void;
  onSelectSection: (sectionId: string) => void;
  onSelectTask: (task: MaintenanceTask) => void;
  onRunOptimization: () => void;
  onTriggerDemo: () => void;
  onTriggerWhatIf: () => void;
  onTriggerEmergency: () => void;
}

export const CommandCenterView: React.FC<CommandCenterViewProps> = ({
  sections,
  tasks,
  blocks,
  bundles,
  metrics,
  onSelectView,
  onSelectSection,
  onSelectTask,
  onRunOptimization,
  onTriggerDemo,
  onTriggerWhatIf,
  onTriggerEmergency,
}) => {
  const criticalTasks = tasks.filter(t => t.severity === 'CRITICAL' || t.priority === 'CRITICAL');
  const overdueTasks = tasks.filter(t => t.daysOverdue > 0);
  const availableBlocks = blocks.filter(b => b.isAvailable);
  const criticalSections = sections.filter(s => s.status === 'CRITICAL' || s.infrastructureRisk >= 80);

  // Today's priority tasks (top 5 by criticality score)
  const priorityTasks = [...tasks]
    .sort((a, b) => b.calculatedCriticalityScore - a.calculatedCriticalityScore)
    .slice(0, 5);

  // Next available open blocks
  const upcomingBlocks = blocks.filter(b => b.isAvailable && b.assignedTaskIds.length > 0).slice(0, 4);

  return (
    <div id="view-command-center" className="space-y-6">
      {/* Top Banner with Quick Actions */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 p-5 shadow-xl md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
            <Activity className="h-4 w-4 text-cyan-400" />
            <span>OPERATIONAL CONTROL HEADQUARTERS</span>
          </div>
          <h1 className="mt-1 text-2xl font-black text-white">
            RAILOPT-X Corridor Operations Cockpit
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            AI-Driven Multi-Department Railway Maintenance Block Planning • Chennai Central → Chittoor (36 Stations / 35 Sections)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onRunOptimization}
            className="flex items-center gap-1.5 rounded-lg bg-cyan-600 px-3.5 py-2 text-xs font-bold text-white shadow-md shadow-cyan-600/20 hover:bg-cyan-500 active:scale-95 transition-all"
          >
            <Sliders className="h-4 w-4" />
            <span>Run CP-SAT Optimizer</span>
          </button>
          <button
            onClick={onTriggerWhatIf}
            className="flex items-center gap-1.5 rounded-lg border border-blue-700 bg-blue-950/60 px-3 py-2 text-xs font-bold text-blue-300 hover:bg-blue-900/40 transition-all"
          >
            <TrendingUp className="h-4 w-4" />
            <span>What-If: Freight +20%</span>
          </button>
          <button
            onClick={onTriggerDemo}
            className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-bold text-slate-200 hover:bg-slate-700 transition-all"
          >
            <PlayCircle className="h-4 w-4 text-cyan-400" />
            <span>SIH Demo Mode</span>
          </button>
        </div>
      </div>

      {/* Top 12 Operational KPIs */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {/* KPI 1: Asset Availability */}
        <div className="rounded-xl border border-emerald-900/60 bg-emerald-950/20 p-3.5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-semibold">Asset Availability</span>
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="mt-2 text-2xl font-black text-emerald-400">
            {metrics.overallAssetAvailabilityPercent}%
          </div>
          <div className="mt-1 text-[10px] text-slate-400">
            Baseline: <span className="font-mono text-slate-300">84.6%</span> (+7.8%)
          </div>
        </div>

        {/* KPI 2: Block Capacity Utilization */}
        <div className="rounded-xl border border-cyan-900/60 bg-cyan-950/20 p-3.5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-semibold">Block Utilization</span>
            <Sliders className="h-4 w-4 text-cyan-400" />
          </div>
          <div className="mt-2 text-2xl font-black text-cyan-400">
            {metrics.blockUtilizationPercent}%
          </div>
          <div className="mt-1 text-[10px] text-slate-400">
            Baseline: <span className="font-mono text-slate-300">48.0%</span> (+36.6%)
          </div>
        </div>

        {/* KPI 3: Bundled Activities */}
        <div
          onClick={() => onSelectView('opportunities')}
          className="cursor-pointer rounded-xl border border-purple-900/60 bg-purple-950/20 p-3.5 shadow-sm hover:border-purple-600 transition-all"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-semibold">Bundled Tasks</span>
            <Sparkles className="h-4 w-4 text-purple-400" />
          </div>
          <div className="mt-2 text-2xl font-black text-purple-400">
            {metrics.bundledActivities}
          </div>
          <div className="mt-1 text-[10px] text-slate-400">
            Across <span className="font-mono text-purple-300">{bundles.length} Bundles</span>
          </div>
        </div>

        {/* KPI 4: Total Blocks Scheduled */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-3.5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-semibold">Blocks Taken</span>
            <CalendarCheck className="h-4 w-4 text-blue-400" />
          </div>
          <div className="mt-2 text-2xl font-black text-white">
            {metrics.totalBlocks}
          </div>
          <div className="mt-1 text-[10px] text-slate-400">
            Reduced from <span className="font-mono text-slate-300">58 blocks</span>
          </div>
        </div>

        {/* KPI 5: Overdue Maintenance */}
        <div
          onClick={() => onSelectView('maintenance')}
          className="cursor-pointer rounded-xl border border-amber-900/60 bg-amber-950/20 p-3.5 shadow-sm hover:border-amber-600 transition-all"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-semibold">Overdue Tasks</span>
            <Clock className="h-4 w-4 text-amber-400" />
          </div>
          <div className="mt-2 text-2xl font-black text-amber-400">
            {overdueTasks.length}
          </div>
          <div className="mt-1 text-[10px] text-slate-400">
            Targeted for immediate slot
          </div>
        </div>

        {/* KPI 6: Train Disruption Risk */}
        <div
          onClick={() => onSelectView('train-impact')}
          className="cursor-pointer rounded-xl border border-slate-800 bg-slate-900/90 p-3.5 shadow-sm hover:border-blue-600 transition-all"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-semibold">Train Impact</span>
            <TrainTrack className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-emerald-400">LOW</span>
            <span className="text-xs font-mono text-slate-400">({metrics.trainDisruptionIndex}/100)</span>
          </div>
          <div className="mt-1 text-[10px] text-slate-400">
            Zero peak mail delays
          </div>
        </div>
      </div>

      {/* Main Grid: Network Vulnerability Map Preview & Today's Priority List */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left 2 Cols: Network Vulnerability & Critical Corridor Section Strip */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <Activity className="h-4 w-4 text-cyan-400" />
                  Corridor Section Risk &amp; Maintenance Status Strip
                </h2>
                <p className="text-xs text-slate-400">
                  Interactive real-time health indicator across all 35 sections (Click any to inspect)
                </p>
              </div>
              <button
                onClick={() => onSelectView('network')}
                className="flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300"
              >
                <span>Full Network Map</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Micro Section Grid Map */}
            <div className="mt-4 grid grid-cols-5 gap-2 sm:grid-cols-7">
              {sections.map(sec => {
                const isCrit = sec.status === 'CRITICAL' || sec.infrastructureRisk >= 85;
                const isWarn = sec.status === 'WARNING' || sec.infrastructureRisk >= 65;
                return (
                  <button
                    key={sec.id}
                    onClick={() => onSelectSection(sec.id)}
                    className={`flex flex-col items-center rounded-lg border p-2 text-left transition-all hover:scale-105 active:scale-95 ${
                      isCrit
                        ? 'border-red-600 bg-red-950/40 text-red-300 shadow-sm shadow-red-950'
                        : isWarn
                        ? 'border-amber-600/70 bg-amber-950/30 text-amber-300'
                        : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="font-mono text-[10px] font-bold">{sec.id}</span>
                    <span className="mt-0.5 max-w-full truncate text-[9px] text-slate-300">
                      {sec.toStationName.split(' ')[0]}
                    </span>
                    <span
                      className={`mt-1 h-1.5 w-6 rounded-full ${
                        isCrit ? 'bg-red-500 animate-pulse' : isWarn ? 'bg-amber-400' : 'bg-emerald-500'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-slate-800/80 pt-3 text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span>NORMAL</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                <span>WARNING (Needs Monitoring)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                <span>CRITICAL (Requires Priority Block)</span>
              </div>
              <div className="ml-auto text-[10px] text-slate-500">
                Total Length: 172.0 km • High-Freight Trunk Corridor
              </div>
            </div>
          </div>

          {/* Featured Highlight: SEC018 Coordinated Bundle Card */}
          <div className="rounded-2xl border border-cyan-800/60 bg-gradient-to-r from-cyan-950/40 via-blue-950/30 to-slate-900 p-4 shadow-lg">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="rounded bg-cyan-900 px-2 py-0.5 text-[10px] font-bold font-mono text-cyan-300 border border-cyan-700">
                  TOP OPPORTUNITY #01
                </span>
                <span className="font-bold text-white text-sm">
                  SEC018 (Egattur → Kadambattur) Coordinated Block
                </span>
                <span className="rounded-full bg-emerald-950 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-800">
                  Synergy: 91/100
                </span>
              </div>
              <button
                onClick={() => onSelectView('opportunities')}
                className="rounded-lg bg-cyan-600 px-3 py-1 text-xs font-bold text-white hover:bg-cyan-500"
              >
                View Bundle Details
              </button>
            </div>
            <p className="mt-2 text-xs text-slate-300">
              Coordinates <span className="font-semibold text-cyan-300">ENG-0187</span> (Track Alignment),{' '}
              <span className="font-semibold text-cyan-300">SNT-0098</span> (Signal Calibration), and{' '}
              <span className="font-semibold text-cyan-300">TRC-0076</span> (OHE Inspection) into single 3.0h power block BLK-0187 (Wednesday 13:00-16:00).
            </p>
          </div>
        </div>

        {/* Right Col: Today's Priority Maintenance & Next Available Blocks */}
        <div className="space-y-4">
          {/* Priority Tasks List */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                Urgent Corridor Maintenance
              </h3>
              <button
                onClick={() => onSelectView('maintenance')}
                className="text-[11px] font-semibold text-cyan-400 hover:underline"
              >
                View All ({tasks.length})
              </button>
            </div>

            <div className="mt-3 space-y-2">
              {priorityTasks.map(t => (
                <div
                  key={t.id}
                  onClick={() => onSelectTask(t)}
                  className="group cursor-pointer rounded-xl border border-slate-800 bg-slate-950/70 p-2.5 transition-all hover:border-slate-700 hover:bg-slate-900"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-xs font-bold text-cyan-400">{t.id}</span>
                      <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[9px] font-mono text-slate-300">
                        {t.sectionId}
                      </span>
                    </div>
                    <span
                      className={`rounded px-1.5 py-0.5 text-[9px] font-bold font-mono ${
                        t.severity === 'CRITICAL'
                          ? 'bg-red-950 text-red-400 border border-red-800'
                          : 'bg-amber-950 text-amber-400 border border-amber-800'
                      }`}
                    >
                      Score: {t.calculatedCriticalityScore}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-300 line-clamp-1 group-hover:text-white">
                    {t.maintenanceType}
                  </p>
                  <div className="mt-1 flex items-center justify-between text-[10px] text-slate-500">
                    <span>{t.department} • {t.estimatedDurationHours}h</span>
                    {t.daysOverdue > 0 && (
                      <span className="text-red-400 font-semibold">{t.daysOverdue}d overdue</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Available Corridor Blocks */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                <CalendarCheck className="h-4 w-4 text-blue-400" />
                Upcoming Optimized Blocks
              </h3>
              <button
                onClick={() => onSelectView('weekly-plan')}
                className="text-[11px] font-semibold text-cyan-400 hover:underline"
              >
                Weekly Schedule
              </button>
            </div>

            <div className="mt-3 space-y-2">
              {upcomingBlocks.map(b => (
                <div
                  key={b.id}
                  onClick={() => onSelectView('weekly-plan')}
                  className="cursor-pointer rounded-xl border border-slate-800 bg-slate-950/70 p-2.5 hover:border-blue-600 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-blue-400">{b.id}</span>
                    <span className="font-mono text-[10px] text-slate-400">
                      {b.dayOfWeek} {b.startTime} - {b.endTime}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-xs">
                    <span className="text-slate-300">{b.sectionId} ({b.durationHours}h)</span>
                    <span className="text-[10px] font-mono text-emerald-400 font-semibold">
                      {b.assignedTaskIds.length} tasks assigned
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
