import React, { useState } from 'react';
import {
  X,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Play,
  Layers,
  Cpu,
  Sparkles,
  TrainTrack,
  ShieldCheck,
  Sliders,
  CalendarDays,
  BarChart3,
  Binary,
  AlertTriangle,
  HelpCircle,
} from 'lucide-react';

interface DemoWalkthroughModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectView: (viewId: string) => void;
  onTriggerWhatIf: () => void;
  onTriggerEmergency: () => void;
}

export const DEMO_STEPS = [
  {
    step: 1,
    title: 'Data Integration & Multi-Department Ingestion',
    viewId: 'data-integration',
    icon: Layers,
    summary: 'TMS (Track), SMMS (Signals), TDMS (Traction), COA (Corridor Control), Timetable, and Freight are unified into a single planning model.',
    highlight: 'Data Quality Score: 98.4% across 36 stations and 35 sections.',
  },
  {
    step: 2,
    title: 'AI-Assisted Maintenance Criticality Prioritization',
    viewId: 'ai-criticality',
    icon: Cpu,
    summary: 'Transparent multi-factor scoring evaluates Asset Criticality, Defect Severity, Days Overdue, Failure Risk, and Network Importance.',
    highlight: 'ENG-0187 (Score 86) and SNT-0098 (Score 92) flagged as top corridor priorities.',
  },
  {
    step: 3,
    title: 'Cross-Department Opportunity Discovery',
    viewId: 'opportunities',
    icon: Sparkles,
    summary: 'The Opportunity Engine searches across departments to discover compatible co-located tasks that can share the same block window.',
    highlight: 'Discovered SEC018 triple-department bundle with 91/100 synergy score!',
  },
  {
    step: 4,
    title: 'Train Timetable & Freight Impact Assessment',
    viewId: 'train-impact',
    icon: TrainTrack,
    summary: 'Analyzes passenger peak intervals (07:00-10:00 & 17:00-20:00) vs quiet slots. Filters out high-impact conflicts like Express 12601.',
    highlight: 'Recommends 13:00–16:00 window (BLK-0187) with minimal passenger delay impact.',
  },
  {
    step: 5,
    title: 'Hard Constraint Validation Layer',
    viewId: 'conflict-radar',
    icon: ShieldCheck,
    summary: 'Validates 10 hard operational rules: electrical traction isolation, team availability, machine double booking, and duration sufficiency.',
    highlight: 'Zero safety violations approved. Prevents dangerous concurrent work.',
  },
  {
    step: 6,
    title: 'Constraint Satisfaction Optimization (CP-SAT)',
    viewId: 'block-optimization',
    icon: Sliders,
    summary: 'Mathematically solves block allocation to maximize critical maintenance while minimizing separate track closures and downtime.',
    highlight: 'Generates feasible schedule in 18ms across 35 sections and 60 resources.',
  },
  {
    step: 7,
    title: 'Visual Weekly Block Schedule & Gantt',
    viewId: 'weekly-plan',
    icon: CalendarDays,
    summary: 'Displays the 7-day corridor block schedule. Shows SEC018 coordinated block with concurrent Engineering, S&T, and Traction execution.',
    highlight: 'One single 3-hour line possession accomplishes 3 independent departmental requirements.',
  },
  {
    step: 8,
    title: 'Before vs After Benchmark (Decentralized vs RAILOPT-X)',
    viewId: 'benchmark',
    icon: BarChart3,
    summary: 'Rigorous calculation comparing siloed department requests against RAILOPT-X integrated planning with genuine synthetic data metrics.',
    highlight: 'Reduces separate blocks from 58 to 27; lifts asset availability from 84.6% to 92.4%!',
  },
  {
    step: 9,
    title: 'Digital Twin: Freight Demand +20% What-If Simulation',
    viewId: 'digital-twin',
    icon: Binary,
    summary: 'Simulates a 20% surge in container rakes. Detects afternoon path conflicts and automatically re-optimizes non-critical tasks to night slots.',
    highlight: 'Dynamic re-plan preserves goods train throughput with zero timetable disruption.',
  },
  {
    step: 10,
    title: 'Emergency Signal Failure Replanning on SEC012',
    viewId: 'emergency-mode',
    icon: AlertTriangle,
    summary: 'In-service automatic signal failure injected on SEC012. System allocates immediate 90-min emergency block and dispatches Flying Squad S02.',
    highlight: 'Defers non-essential drainage work; isolates section safely under caution orders.',
  },
  {
    step: 11,
    title: 'Explainable AI Decision Audit Trail',
    viewId: 'explainability',
    icon: HelpCircle,
    summary: 'Explains WHY this task, WHY this block, WHY this bundle, and WHY alternative candidate blocks (like BLK-0214) were rejected.',
    highlight: 'Human-readable justification for railway Section Controllers and Chief Planners.',
  },
];

export const DemoWalkthroughModal: React.FC<DemoWalkthroughModalProps> = ({
  isOpen,
  onClose,
  onSelectView,
  onTriggerWhatIf,
  onTriggerEmergency,
}) => {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);

  if (!isOpen) return null;

  const current = DEMO_STEPS[currentStepIdx];
  const Icon = current.icon;

  const handleNext = () => {
    if (currentStepIdx < DEMO_STEPS.length - 1) {
      const nextIdx = currentStepIdx + 1;
      setCurrentStepIdx(nextIdx);
      onSelectView(DEMO_STEPS[nextIdx].viewId);
      if (DEMO_STEPS[nextIdx].step === 9) onTriggerWhatIf();
      if (DEMO_STEPS[nextIdx].step === 10) onTriggerEmergency();
    }
  };

  const handlePrev = () => {
    if (currentStepIdx > 0) {
      const prevIdx = currentStepIdx - 1;
      setCurrentStepIdx(prevIdx);
      onSelectView(DEMO_STEPS[prevIdx].viewId);
    }
  };

  const handleJumpTo = (idx: number) => {
    setCurrentStepIdx(idx);
    onSelectView(DEMO_STEPS[idx].viewId);
    if (DEMO_STEPS[idx].step === 9) onTriggerWhatIf();
    if (DEMO_STEPS[idx].step === 10) onTriggerEmergency();
  };

  return (
    <div
      id="modal-demo-walkthrough"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
    >
      <div className="flex w-full max-w-3xl flex-col rounded-2xl border border-cyan-500/40 bg-slate-900 shadow-2xl shadow-cyan-950/50">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/90 px-6 py-4 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30">
              <Play className="h-5 w-5 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">Interactive Platform Demonstration</h2>
                <span className="rounded bg-cyan-950 px-2 py-0.5 text-[10px] font-mono text-cyan-400 border border-cyan-800">
                  LIVE CORRIDOR
                </span>
              </div>
              <p className="text-xs text-slate-400">
                11-Step Interactive Guided Walkthrough for SIH Jury Evaluation
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Step Progress Timeline Pill Bar */}
        <div className="border-b border-slate-800/80 bg-slate-950/50 px-6 py-2.5 overflow-x-auto scrollbar-thin">
          <div className="flex items-center gap-2 min-w-max">
            {DEMO_STEPS.map((s, idx) => (
              <button
                key={s.step}
                onClick={() => handleJumpTo(idx)}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                  idx === currentStepIdx
                    ? 'bg-cyan-500 text-slate-950 ring-2 ring-cyan-400 font-bold shadow-md shadow-cyan-500/20'
                    : idx < currentStepIdx
                    ? 'bg-slate-800 text-emerald-400'
                    : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800'
                }`}
              >
                {idx < currentStepIdx ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                ) : (
                  <span className="font-mono text-[11px]">{String(s.step).padStart(2, '0')}</span>
                )}
                <span className="truncate max-w-[90px]">{s.title.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cyan-950/60 text-cyan-400 border border-cyan-800/60 shadow-inner">
              <Icon className="h-7 w-7" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
                  STEP {String(current.step).padStart(2, '0')} OF 11
                </span>
                <span className="rounded bg-blue-950/80 px-2 py-0.5 text-[10px] font-mono text-blue-300 border border-blue-800">
                  Target View: {current.viewId.toUpperCase()}
                </span>
              </div>
              <h3 className="mt-1 text-lg font-bold text-white">{current.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{current.summary}</p>

              <div className="mt-4 rounded-xl border border-cyan-900/60 bg-cyan-950/30 p-3.5 text-xs text-cyan-200">
                <span className="font-bold text-cyan-400">Key Operational Highlight: </span>
                {current.highlight}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between border-t border-slate-800 bg-slate-950/90 px-6 py-4 rounded-b-2xl">
          <button
            onClick={handlePrev}
            disabled={currentStepIdx === 0}
            className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700 disabled:opacity-40 transition-all"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous Step</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onSelectView(current.viewId);
                onClose();
              }}
              className="rounded-lg border border-slate-700 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-all"
            >
              Explore This View
            </button>

            {currentStepIdx < DEMO_STEPS.length - 1 ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-cyan-500/25 hover:brightness-110 active:scale-95 transition-all"
              >
                <span>Next Step</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-emerald-600/25 hover:bg-emerald-500 transition-all"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>Complete Walkthrough</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
