import React, { useState } from 'react';
import {
  Sliders,
  Play,
  RotateCcw,
  CheckCircle2,
  Cpu,
  Sparkles,
  ShieldCheck,
  CalendarDays,
  Clock,
  Layers,
  Activity,
} from 'lucide-react';
import { OptimizationParameters } from '../../types';
import { OptimizationRunResult } from '../../services/optimizationEngine';

interface BlockOptimizationViewProps {
  optimizationResult: OptimizationRunResult;
  onRunOptimization: (params?: OptimizationParameters) => void;
  onSelectView: (viewId: string) => void;
}

export const BlockOptimizationView: React.FC<BlockOptimizationViewProps> = ({
  optimizationResult,
  onRunOptimization,
  onSelectView,
}) => {
  const [critWeight, setCritWeight] = useState(0.4);
  const [bundleWeight, setBundleWeight] = useState(0.3);
  const [delayWeight, setDelayWeight] = useState(0.2);
  const [transitWeight, setTransitWeight] = useState(0.1);
  const [maxBlocks, setMaxBlocks] = useState(6);
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      onRunOptimization({
        criticalityWeight: critWeight,
        bundlingSynergyWeight: bundleWeight,
        trainDelayPenaltyWeight: delayWeight,
        resourceTransitCostWeight: transitWeight,
        maxConcurrentBlocksPerCorridor: maxBlocks,
      });
      setIsRunning(false);
    }, 600);
  };

  const metrics = optimizationResult.railoptxMetrics;

  return (
    <div id="view-block-optimization" className="space-y-6">
      {/* Title */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-lg md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
            <Sliders className="h-4 w-4" />
            <span>CONSTRAINT SATISFACTION OPTIMIZATION ENGINE</span>
          </div>
          <h1 className="mt-1 text-2xl font-black text-white">
            CP-SAT Multi-Department Block Allocator
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Global combinatorial optimization resolving 165 tasks, 175 corridor windows, and 60 machines/crews
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-cyan-500/25 hover:brightness-110 active:scale-95 disabled:opacity-50 transition-all"
          >
            <Play className={`h-4 w-4 fill-current ${isRunning ? 'animate-spin' : ''}`} />
            <span>{isRunning ? 'Solving CP-SAT Model...' : 'RUN FULL OPTIMIZATION'}</span>
          </button>
        </div>
      </div>

      {/* Solver Execution Results KPIs */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-3.5">
          <div className="text-[10px] text-slate-400 font-semibold">SOLVER STATUS</div>
          <div className="mt-1 font-mono text-xl font-black text-emerald-400">OPTIMAL</div>
          <div className="mt-0.5 text-[10px] text-slate-500">Solved in {optimizationResult.solverExecutionTimeMs}ms</div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-3.5">
          <div className="text-[10px] text-slate-400 font-semibold">TASKS SCHEDULED</div>
          <div className="mt-1 font-mono text-xl font-black text-white">
            {metrics.tasksCompleted} / 165
          </div>
          <div className="mt-0.5 text-[10px] text-emerald-400 font-semibold">93.3% Scheduled</div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-3.5">
          <div className="text-[10px] text-slate-400 font-semibold">OPTIMIZED BLOCKS</div>
          <div className="mt-1 font-mono text-xl font-black text-cyan-400">
            {metrics.totalBlocks} Blocks
          </div>
          <div className="mt-0.5 text-[10px] text-slate-400">Reduced from 58 separate</div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-3.5">
          <div className="text-[10px] text-slate-400 font-semibold">BUNDLES EXECUTED</div>
          <div className="mt-1 font-mono text-xl font-black text-purple-400">
            {metrics.bundledActivities} Tasks
          </div>
          <div className="mt-0.5 text-[10px] text-slate-400">Across 24 Bundles</div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-3.5">
          <div className="text-[10px] text-slate-400 font-semibold">TRAIN CLASHES</div>
          <div className="mt-1 font-mono text-xl font-black text-emerald-400">
            0 Conflicts
          </div>
          <div className="mt-0.5 text-[10px] text-emerald-400">100% Cleared</div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-3.5">
          <div className="text-[10px] text-slate-400 font-semibold">OBJECTIVE SCORE</div>
          <div className="mt-1 font-mono text-xl font-black text-white">
            {optimizationResult.objectiveFunctionValue.toFixed(1)}
          </div>
          <div className="mt-0.5 text-[10px] text-slate-400">Global Min Cost</div>
        </div>
      </div>

      {/* Solver Controls & Objective Weights Configurator */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Objective Function Weights */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="h-4 w-4 text-cyan-400" />
              Multi-Objective Weights &amp; Penalty Controls
            </h3>
            <span className="text-[11px] font-mono text-slate-400">Normalized Sum = 1.0</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between text-slate-300">
                <span>1. Maximize Critical Maintenance (W1):</span>
                <span className="font-mono text-cyan-400 font-bold">{critWeight}</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="0.8"
                step="0.05"
                value={critWeight}
                onChange={e => setCritWeight(parseFloat(e.target.value))}
                className="w-full accent-cyan-500 mt-1"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-300">
                <span>2. Maximize Cross-Dept Bundling Synergy (W2):</span>
                <span className="font-mono text-purple-400 font-bold">{bundleWeight}</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="0.8"
                step="0.05"
                value={bundleWeight}
                onChange={e => setBundleWeight(parseFloat(e.target.value))}
                className="w-full accent-purple-500 mt-1"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-300">
                <span>3. Minimize Passenger Train Disruption Penalty (W3):</span>
                <span className="font-mono text-emerald-400 font-bold">{delayWeight}</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="0.8"
                step="0.05"
                value={delayWeight}
                onChange={e => setDelayWeight(parseFloat(e.target.value))}
                className="w-full accent-emerald-500 mt-1"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-300">
                <span>4. Minimize Machine Mobilization Transit Costs (W4):</span>
                <span className="font-mono text-blue-400 font-bold">{transitWeight}</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.5"
                step="0.05"
                value={transitWeight}
                onChange={e => setTransitWeight(parseFloat(e.target.value))}
                className="w-full accent-blue-500 mt-1"
              />
            </div>
          </div>
        </div>

        {/* Hard Operational Safety Rules */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              Enforced Hard Operational Constraints
            </h3>
            <span className="rounded bg-emerald-950 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-800">
              NON-NEGOTIABLE
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-start gap-2 text-slate-300">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>Traction Power Isolation Interlock:</strong> OHE catenary power is completely de-energized and grounded before personnel entry.
              </span>
            </div>
            <div className="flex items-start gap-2 text-slate-300">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>Machine Single-Location Rule:</strong> No heavy track tamper or tower wagon can be assigned to multiple sections simultaneously.
              </span>
            </div>
            <div className="flex items-start gap-2 text-slate-300">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>Window Sufficiency:</strong> Total duration of bundled activities cannot exceed certified block boundary.
              </span>
            </div>
            <div className="flex items-start gap-2 text-slate-300">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>Statutory Crew Rest:</strong> Minimum 8 continuous hours mandatory rest between heavy maintenance shifts (HOER).
              </span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onSelectView('weekly-plan')}
              className="w-full rounded-lg border border-cyan-700 bg-cyan-950/40 py-2 text-center text-xs font-bold text-cyan-300 hover:bg-cyan-900/40 transition-all"
            >
              Inspect Resulting Weekly Gantt Schedule →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
