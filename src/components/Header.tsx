import React from 'react';
import {
  Train,
  Play,
  AlertTriangle,
  Bot,
  Zap,
  ShieldCheck,
  Activity,
  Layers,
  Sparkles
} from 'lucide-react';
import { LiveRailwayClock } from './LiveRailwayClock';

interface HeaderProps {
  onOpenDemo: () => void;
  onOpenCopilot: () => void;
  isEmergencyActive: boolean;
  onToggleEmergency: () => void;
  onSelectView: (viewId: string) => void;
  activeView: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenDemo,
  onOpenCopilot,
  isEmergencyActive,
  onToggleEmergency,
  onSelectView,
  activeView,
}) => {
  return (
    <header id="railoptx-header" className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-900/95 px-4 py-2.5 backdrop-blur-md">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Left: Enlarged Project Logo & Authoritative Branding */}
        <div className="flex items-center gap-3.5 sm:gap-4 shrink-0">
          <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 via-cyan-600 to-blue-700 shadow-xl shadow-cyan-500/25 ring-2 ring-cyan-400/40">
            <Train className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="text-2xl sm:text-3xl font-black tracking-wider text-white drop-shadow-sm">
                RAILOPT-X
              </span>
              <span className="rounded-md bg-blue-950/90 px-2.5 py-0.5 text-xs font-bold tracking-wide text-blue-300 border border-blue-700/80">
                CP-SAT OPTIMIZER
              </span>
            </div>
            <p className="hidden text-xs text-slate-300 font-medium sm:block mt-0.5">
              Coordinating Maintenance • Maximizing Asset Availability • Minimizing Train Disruption
            </p>
          </div>
        </div>

        {/* Right: Quick Action Buttons Aligned to the RIGHT */}
        <div className="ml-auto flex flex-wrap items-center justify-end gap-2 sm:gap-2.5 shrink-0">
          {/* RUN FULL RAILOPT-X DEMO Button */}
          <button
            id="btn-run-full-demo"
            onClick={onOpenDemo}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-md shadow-cyan-500/25 transition-all hover:brightness-110 active:scale-95 whitespace-nowrap"
            title="Start automated 11-step walkthrough of RAILOPT-X"
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            <span>RUN FULL DEMO</span>
          </button>

          {/* Emergency Mode Toggle */}
          <button
            id="btn-toggle-emergency"
            onClick={onToggleEmergency}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all whitespace-nowrap ${
              isEmergencyActive
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/30 animate-pulse'
                : 'border border-red-900/60 bg-red-950/40 text-red-400 hover:bg-red-900/40'
            }`}
            title="Toggle Emergency Signal Failure Mode on SEC012"
          >
            <AlertTriangle className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">EMERGENCY MODE</span>
            <span className="sm:hidden">EMERG</span>
          </button>

          {/* Live Indian Railway Operational Time with Week, Month, Dates & Shift Details */}
          <LiveRailwayClock />

          {/* AI RailOptX Assistant */}
          <button
            id="btn-open-ai-railoptx"
            onClick={onOpenCopilot}
            className="flex items-center gap-1.5 rounded-lg border border-purple-700/80 bg-gradient-to-r from-purple-950/80 to-indigo-950/80 px-3 py-1.5 text-xs font-bold text-purple-200 hover:border-purple-500 hover:from-purple-900/80 hover:to-indigo-900/80 transition-all shadow-sm shadow-purple-950/50 active:scale-95 whitespace-nowrap"
            title="Open AI RailOptX Decision Support Assistant"
          >
            <Bot className="h-3.5 w-3.5 text-purple-400" />
            <span className="tracking-wide">AI RailOptX</span>
            <Sparkles className="h-3 w-3 text-cyan-400" />
          </button>
        </div>
      </div>

      {/* Secondary Corridor Telemetry & Integration Sync Strip */}
      <div className="mt-2.5 flex flex-wrap items-center justify-between border-t border-slate-800/80 pt-2 text-xs text-slate-400">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-full border border-slate-800 bg-slate-950/70 px-2.5 py-0.5 text-[11px] text-slate-300">
            <Activity className="h-3 w-3 text-cyan-400" />
            <span className="text-slate-400">Corridor:</span>
            <span className="font-semibold text-slate-200">MAS → CTO (36 Stns / 35 Sec)</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-slate-800 bg-slate-950/70 px-2.5 py-0.5 text-[11px] text-slate-300">
            <Layers className="h-3 w-3 text-blue-400" />
            <span className="text-slate-400">Depts:</span>
            <span className="font-semibold text-slate-200">ENG + S&amp;T + TRC</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-slate-800 bg-slate-950/70 px-2.5 py-0.5 text-[11px] text-slate-300">
            <ShieldCheck className="h-3 w-3 text-emerald-400" />
            <span className="text-slate-400">Integrations:</span>
            <span className="font-semibold text-emerald-400">TMS / SMMS / TDMS Synced</span>
          </div>
        </div>
        <div className="hidden items-center gap-3 text-[11px] font-mono text-slate-400 sm:flex">
          <span className="text-slate-500">Schedule Integrity:</span>
          <span className="font-bold text-emerald-400">Zero Conflict Invariants</span>
        </div>
      </div>
    </header>
  );
};
