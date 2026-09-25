import React, { useState } from 'react';
import {
  Sparkles,
  Layers,
  Clock,
  ShieldCheck,
  Zap,
  ArrowRight,
  CheckCircle2,
  Sliders,
  Info,
} from 'lucide-react';
import { MaintenanceBundle, MaintenanceTask, BlockWindow } from '../../types';

interface OpportunitiesViewProps {
  bundles: MaintenanceBundle[];
  tasks: MaintenanceTask[];
  blocks: BlockWindow[];
  onSelectTask: (task: MaintenanceTask) => void;
  onSelectView: (viewId: string) => void;
}

export const OpportunitiesView: React.FC<OpportunitiesViewProps> = ({
  bundles,
  tasks,
  blocks,
  onSelectTask,
  onSelectView,
}) => {
  const [selectedBundleId, setSelectedBundleId] = useState<string>('BND-SEC018-01');

  const selectedBundle = bundles.find(b => b.id === selectedBundleId) || bundles[0];
  const bundledTasks = selectedBundle
    ? selectedBundle.tasks || tasks.filter(t => Array.isArray(selectedBundle.taskIds) && selectedBundle.taskIds.includes(t.id))
    : [];

  // Compute total hours saved across all bundles
  const totalHoursSaved = bundles.reduce((acc, b) => {
    const saved = b.blockHoursSaved ?? (b.tasks ? Math.max(0, b.tasks.reduce((s, t) => s + t.estimatedDurationHours, 0) - b.windowHours) : 0);
    return acc + saved;
  }, 0);

  return (
    <div id="view-opportunities" className="space-y-6">
      {/* Title */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-lg md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
            <Sparkles className="h-4 w-4" />
            <span>CROSS-DEPARTMENT OPPORTUNITY DISCOVERY ENGINE</span>
          </div>
          <h1 className="mt-1 text-2xl font-black text-white">
            Maintenance Bundles &amp; Synergy Catalog ({bundles.length} Discovered)
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Combining Engineering, S&amp;T, and Traction tasks into unified single-block possessions to prevent repeated line closures
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-emerald-900/60 bg-emerald-950/20 px-3.5 py-2 text-xs">
            <span className="text-slate-400">Cumulative Hours Saved:</span>
            <div className="text-base font-black text-emerald-400 font-mono">
              {totalHoursSaved.toFixed(1)} Block Hours
            </div>
          </div>
        </div>
      </div>

      {/* Featured Primary Scenario Card: SEC018 Coordinated Bundle */}
      <div className="rounded-2xl border-2 border-cyan-500/80 bg-gradient-to-r from-slate-900 via-cyan-950/30 to-slate-900 p-6 shadow-2xl shadow-cyan-950/40">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-cyan-800/60 pb-3">
          <div className="flex items-center gap-2">
            <span className="rounded bg-cyan-950 px-2.5 py-1 font-mono text-xs font-black text-cyan-300 border border-cyan-700">
              FEATURED SCENARIO #01
            </span>
            <span className="text-lg font-bold text-white">
              SEC018 Triple-Department Coordinated Bundle
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full bg-emerald-950 px-3 py-1 font-mono text-xs font-black text-emerald-400 border border-emerald-800">
              Synergy Score: 91 / 100
            </span>
            <button
              onClick={() => onSelectView('weekly-plan')}
              className="rounded-lg bg-cyan-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-cyan-500 transition-all"
            >
              Inspect on Gantt
            </button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3.5">
            <span className="text-slate-500 text-[10px] font-bold uppercase">Corridor Section</span>
            <div className="text-sm font-bold text-white mt-1">SEC018 (Egattur ↔ Kadambattur)</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Km 47.8 to 53.2 • Double Track</div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3.5">
            <span className="text-slate-500 text-[10px] font-bold uppercase">Optimal Window Allocated</span>
            <div className="text-sm font-bold text-cyan-300 mt-1">BLK-0187 (Wednesday 13:00–16:00)</div>
            <div className="text-[11px] text-slate-400 mt-0.5">3.0 Hours Unified Line Possession</div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3.5">
            <span className="text-slate-500 text-[10px] font-bold uppercase">Disruption Savings</span>
            <div className="text-sm font-bold text-emerald-400 mt-1">5.5h Separate → 3.0h Unified</div>
            <div className="text-[11px] text-slate-400 mt-0.5">2.5 Track Hours Saved (45% Net Disruption Reduction)</div>
          </div>
        </div>

        {/* Coordinated Tasks in this Bundle */}
        <div className="mt-5">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
            Bundled Cross-Department Work Units
          </h4>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-amber-900/60 bg-amber-950/20 p-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-amber-400">ENG-0187</span>
                <span className="rounded bg-amber-950 px-1.5 py-0.5 text-[9px] font-bold text-amber-300">
                  ENGINEERING
                </span>
              </div>
              <div className="mt-1 font-bold text-xs text-white">Continuous Track Alignment &amp; Packing</div>
              <div className="mt-2 text-[11px] text-slate-400">
                Machine: Duomatic Tamping Machine DTM-04 (2.5h)
              </div>
            </div>

            <div className="rounded-xl border border-blue-900/60 bg-blue-950/20 p-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-blue-400">SNT-0098</span>
                <span className="rounded bg-blue-950 px-1.5 py-0.5 text-[9px] font-bold text-blue-300">
                  S&amp;T
                </span>
              </div>
              <div className="mt-1 font-bold text-xs text-white">Track Circuit Calibration &amp; Axle Counter</div>
              <div className="mt-2 text-[11px] text-slate-400">
                Crew: S&amp;T Team S01 (2.0h during tamping quiet interval)
              </div>
            </div>

            <div className="rounded-xl border border-purple-900/60 bg-purple-950/20 p-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-purple-400">TRC-0076</span>
                <span className="rounded bg-purple-950 px-1.5 py-0.5 text-[9px] font-bold text-purple-300">
                  TRACTION
                </span>
              </div>
              <div className="mt-1 font-bold text-xs text-white">Catenary Stagger Inspection &amp; Dropper Check</div>
              <div className="mt-2 text-[11px] text-slate-400">
                Rig: Tower Wagon TW-02 under OHE Power Isolation
              </div>
            </div>
          </div>
        </div>

        {/* Domain Safety Reasoning */}
        <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/70 p-3.5 text-xs text-slate-300">
          <span className="font-bold text-cyan-400">Safety &amp; Operational Coordination Protocol: </span>
          Traction isolation is issued at 13:00. P-Way tamping starts at 13:05. Tower Wagon operates concurrently on adjacent catenary zone with verified earthing discharges. S&amp;T gang undertakes electronic bonding adjustments safely behind the tamping machine path.
        </div>
      </div>

      {/* Full Bundles Catalog Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 shadow-lg overflow-hidden">
        <div className="border-b border-slate-800 px-5 py-3">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            All Discovered Multi-Department Bundles
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-800 bg-slate-950 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-4 py-3">Bundle ID</th>
                <th className="px-4 py-3">Section</th>
                <th className="px-4 py-3">Departments</th>
                <th className="px-4 py-3">Tasks Bundled</th>
                <th className="px-4 py-3">Separate Sum</th>
                <th className="px-4 py-3">Unified Block</th>
                <th className="px-4 py-3">Hours Saved</th>
                <th className="px-4 py-3">Synergy Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-sans">
              {bundles.map(b => {
                const bTaskIds = b.taskIds || (b.tasks ? b.tasks.map(t => t.id) : []);
                const separateSum = b.separateDurationsSumHours ?? (b.tasks ? Number(b.tasks.reduce((s, t) => s + t.estimatedDurationHours, 0).toFixed(1)) : b.totalEstimatedHours);
                const combinedDuration = b.combinedDurationHours ?? b.windowHours;
                const hoursSaved = b.blockHoursSaved ?? Number(Math.max(0, separateSum - combinedDuration).toFixed(1));
                const depts = b.departments || [];

                return (
                  <tr
                    key={b.id}
                    onClick={() => setSelectedBundleId(b.id)}
                    className={`cursor-pointer transition-colors hover:bg-slate-800/50 ${
                      b.id === selectedBundleId ? 'bg-cyan-950/40' : ''
                    }`}
                  >
                    <td className="px-4 py-3 font-mono font-bold text-cyan-400 whitespace-nowrap">
                      {b.id}
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-300 whitespace-nowrap">
                      {b.sectionId}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex gap-1">
                        {depts.map(d => (
                          <span
                            key={d}
                            className="rounded bg-slate-800 px-1.5 py-0.5 text-[9px] font-bold text-slate-300"
                          >
                            {d.substring(0, 3)}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-200">
                      {bTaskIds.length > 0 ? bTaskIds.join(', ') : '—'}
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-400">
                      {separateSum}h
                    </td>
                    <td className="px-4 py-3 font-mono font-bold text-slate-200">
                      {combinedDuration}h
                    </td>
                    <td className="px-4 py-3 font-mono font-bold text-emerald-400">
                      +{hoursSaved}h
                    </td>
                    <td className="px-4 py-3 font-mono font-bold text-cyan-400">
                      {b.synergyScore}/100
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
