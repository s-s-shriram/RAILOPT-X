import React, { useState } from 'react';
import {
  Binary,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Cpu,
  Layers,
  Sparkles,
} from 'lucide-react';
import { WhatIfScenarioResult } from '../../services/digitalTwinService';

interface DigitalTwinViewProps {
  whatIfResult: WhatIfScenarioResult | null;
  onTriggerWhatIf: () => void;
  onSelectView: (viewId: string) => void;
}

export const DigitalTwinView: React.FC<DigitalTwinViewProps> = ({
  whatIfResult,
  onTriggerWhatIf,
  onSelectView,
}) => {
  const [freightLevel, setFreightLevel] = useState<'+20%' | 'NORMAL' | '-20%'>('+20%');
  const [trainFreq, setTrainFreq] = useState<'+20%' | 'NORMAL' | '-20%'>('NORMAL');
  const [maintDemand, setMaintDemand] = useState<'+20%' | 'NORMAL' | '-20%'>('NORMAL');
  const [isSimulating, setIsSimulating] = useState(false);

  const handleSimulate = () => {
    setIsSimulating(true);
    setTimeout(() => {
      onTriggerWhatIf();
      setIsSimulating(false);
    }, 700);
  };

  return (
    <div id="view-digital-twin" className="space-y-6">
      {/* Title */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-lg md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
            <Binary className="h-4 w-4" />
            <span>PREDICTIVE DIGITAL TWIN SIMULATION ENGINE</span>
          </div>
          <h1 className="mt-1 text-2xl font-black text-white">
            What-If Scenario Sandbox &amp; Capacity Stress-Tester
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Simulate operational perturbations, freight demand shocks, and timetable volatility with automated schedule re-synthesis
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSimulate}
            disabled={isSimulating}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-cyan-500/25 hover:brightness-110 active:scale-95 disabled:opacity-50 transition-all"
          >
            <Play className={`h-4 w-4 fill-current ${isSimulating ? 'animate-spin' : ''}`} />
            <span>{isSimulating ? 'Computing Digital Twin...' : 'SIMULATE FREIGHT +20%'}</span>
          </button>
        </div>
      </div>

      {/* Interactive Simulation Parameter Levers */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-lg">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-cyan-400" />
          Corridor Operational Levers
        </h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-3.5">
            <span className="text-xs font-semibold text-slate-300">Goods Train Forecast Demand</span>
            <div className="mt-2 flex rounded-lg border border-slate-800 bg-slate-900 p-1">
              {(['-20%', 'NORMAL', '+20%'] as const).map(lvl => (
                <button
                  key={lvl}
                  onClick={() => setFreightLevel(lvl)}
                  className={`flex-1 rounded py-1 text-xs font-bold transition-all ${
                    freightLevel === lvl
                      ? 'bg-cyan-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
            <span className="mt-2 block text-[10px] text-slate-500">
              Surge in container &amp; coal rakes from Chennai Port to Renigunta
            </span>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950 p-3.5">
            <span className="text-xs font-semibold text-slate-300">Passenger Headway Density</span>
            <div className="mt-2 flex rounded-lg border border-slate-800 bg-slate-900 p-1">
              {(['-20%', 'NORMAL', '+20%'] as const).map(lvl => (
                <button
                  key={lvl}
                  onClick={() => setTrainFreq(lvl)}
                  className={`flex-1 rounded py-1 text-xs font-bold transition-all ${
                    trainFreq === lvl
                      ? 'bg-cyan-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
            <span className="mt-2 block text-[10px] text-slate-500">
              Peak suburban EMU and special intercity train services
            </span>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950 p-3.5">
            <span className="text-xs font-semibold text-slate-300">Urgent Maintenance Volume</span>
            <div className="mt-2 flex rounded-lg border border-slate-800 bg-slate-900 p-1">
              {(['-20%', 'NORMAL', '+20%'] as const).map(lvl => (
                <button
                  key={lvl}
                  onClick={() => setMaintDemand(lvl)}
                  className={`flex-1 rounded py-1 text-xs font-bold transition-all ${
                    maintDemand === lvl
                      ? 'bg-cyan-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
            <span className="mt-2 block text-[10px] text-slate-500">
              Post-monsoon track and drainage defect surge
            </span>
          </div>
        </div>
      </div>

      {/* What-If Results Card (OLD PLAN vs NEW PLAN Comparison) */}
      {whatIfResult && (
        <div className="rounded-2xl border-2 border-cyan-500/80 bg-gradient-to-r from-slate-900 via-cyan-950/20 to-slate-900 p-6 shadow-2xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-cyan-800/60 pb-3">
            <div>
              <span className="rounded bg-cyan-950 px-2 py-0.5 font-mono text-[10px] font-bold text-cyan-400 border border-cyan-800">
                SCENARIO EVALUATED
              </span>
              <h3 className="mt-1 text-lg font-bold text-white">
                {whatIfResult.scenarioName} (Arakkonam &amp; Renigunta Sectors)
              </h3>
            </div>
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-950 px-3 py-1 text-xs font-bold text-emerald-400 border border-emerald-800">
              <CheckCircle2 className="h-4 w-4" />
              <span>OPTIMIZED RE-PLAN GENERATED</span>
            </span>
          </div>

          {/* Side by Side Metrics Comparison */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Old Plan */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Original Baseline Schedule
              </span>
              <div className="mt-3 space-y-2 text-xs">
                <div className="flex justify-between border-b border-slate-800/60 pb-1.5">
                  <span className="text-slate-400">Track Possessions Required:</span>
                  <span className="font-mono text-white font-bold">{whatIfResult.oldPlanSummary.blocksUsed} Blocks</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/60 pb-1.5">
                  <span className="text-slate-400">Maintenance Tasks Covered:</span>
                  <span className="font-mono text-white font-bold">{whatIfResult.oldPlanSummary.tasksScheduled} Tasks</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/60 pb-1.5">
                  <span className="text-slate-400">Average Block Utilization:</span>
                  <span className="font-mono text-white font-bold">{whatIfResult.oldPlanSummary.avgUtilization}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Freight Path Clashes Under Surge:</span>
                  <span className="font-mono text-red-400 font-bold">3 Potential Conflicts</span>
                </div>
              </div>
            </div>

            {/* New Plan */}
            <div className="rounded-xl border border-cyan-800 bg-cyan-950/30 p-4">
              <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
                RAILOPT-X Re-Optimized Schedule
              </span>
              <div className="mt-3 space-y-2 text-xs">
                <div className="flex justify-between border-b border-cyan-900/60 pb-1.5">
                  <span className="text-slate-300">Track Possessions Required:</span>
                  <span className="font-mono text-cyan-300 font-bold">{whatIfResult.newPlanSummary.blocksUsed} Blocks</span>
                </div>
                <div className="flex justify-between border-b border-cyan-900/60 pb-1.5">
                  <span className="text-slate-300">Maintenance Tasks Covered:</span>
                  <span className="font-mono text-cyan-300 font-bold">{whatIfResult.newPlanSummary.tasksScheduled} Tasks</span>
                </div>
                <div className="flex justify-between border-b border-cyan-900/60 pb-1.5">
                  <span className="text-slate-300">Average Block Utilization:</span>
                  <span className="font-mono text-cyan-300 font-bold">{whatIfResult.newPlanSummary.avgUtilization}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Freight Path Clashes:</span>
                  <span className="font-mono text-emerald-400 font-bold">0 Conflicts (Resolved)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Key Changes Made by Optimizer */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/90 p-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
              Autonomous Conflict Mitigations Applied
            </h4>
            <div className="space-y-1.5 text-xs text-slate-300">
              {whatIfResult.keyChanges.map((change, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span>{change}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
