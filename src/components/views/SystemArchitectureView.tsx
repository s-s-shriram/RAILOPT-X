import React from 'react';
import {
  GitBranch,
  Database,
  Cpu,
  Sliders,
  LayoutDashboard,
  Bot,
  ShieldCheck,
  CheckCircle2,
  Server,
  Layers,
} from 'lucide-react';

export const SystemArchitectureView: React.FC = () => {
  return (
    <div id="view-system-architecture" className="space-y-6">
      {/* Title */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-lg md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
            <GitBranch className="h-4 w-4" />
            <span>FULL-STACK ENTERPRISE SYSTEM BLUEPRINT</span>
          </div>
          <h1 className="mt-1 text-2xl font-black text-white">
            RAILOPT-X Enterprise Architecture
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            End-to-end multi-tier architecture uniting Indian Railways operational silos into an automated optimization digital twin
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-xl border border-blue-800 bg-blue-950/40 px-3.5 py-2 text-xs font-mono font-bold text-blue-300">
            Production-Ready Architecture
          </span>
        </div>
      </div>

      {/* 4 Architectural Tiers */}
      <div className="space-y-4">
        {/* Tier 1: Ingestion Layer */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-lg">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Database className="h-4 w-4 text-cyan-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Tier 1: Multi-Department Ingestion &amp; Legacy Harmonization Layer
            </h3>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 text-xs">
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
              <span className="font-mono text-cyan-400 font-bold text-[11px]">TMS (Track Management)</span>
              <p className="mt-1 text-slate-300">P-Way rail defects, rail wear, ultrasonic flaws, and track geometric parameters.</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
              <span className="font-mono text-blue-400 font-bold text-[11px]">SMMS (Signalling System)</span>
              <p className="mt-1 text-slate-300">Signal relays, axle counters, electronic interlocking, and point machine telemetry.</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
              <span className="font-mono text-purple-400 font-bold text-[11px]">TDMS (Traction System)</span>
              <p className="mt-1 text-slate-300">25kV OHE catenary wear, insulator wash intervals, and SCADA power switching status.</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
              <span className="font-mono text-emerald-400 font-bold text-[11px]">COA &amp; National Timetable</span>
              <p className="mt-1 text-slate-300">Real-time corridor section controllers, goods rake headways, and train schedules.</p>
            </div>
          </div>
        </div>

        {/* Tier 2: Analytical & Domain Engines */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-lg">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Cpu className="h-4 w-4 text-purple-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Tier 2: Processing, Reasoning &amp; Constraint Validation Engines
            </h3>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 text-xs">
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
              <span className="font-mono text-purple-300 font-bold text-[11px]">AI Criticality Engine</span>
              <p className="mt-1 text-slate-300">5-feature weighted mathematical scoring (0–100) evaluating asset risk, overdue days, and line throughput.</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
              <span className="font-mono text-purple-300 font-bold text-[11px]">Opportunity Discovery</span>
              <p className="mt-1 text-slate-300">Cross-department synergy clustering identifying concurrent co-located maintenance requirements.</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
              <span className="font-mono text-purple-300 font-bold text-[11px]">Train Impact Evaluator</span>
              <p className="mt-1 text-slate-300">Calculates cumulative passenger delay penalties and flags peak suburban exclusion windows.</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
              <span className="font-mono text-purple-300 font-bold text-[11px]">Hard Safety Gatekeeper</span>
              <p className="mt-1 text-slate-300">Validates 10 non-negotiable safety rules: 25kV OHE power isolation, machine overlap, and statutory rest.</p>
            </div>
          </div>
        </div>

        {/* Tier 3: CP-SAT Optimization Core */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-lg">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Sliders className="h-4 w-4 text-cyan-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Tier 3: Combinatorial Constraint Satisfaction (CP-SAT) Optimizer
            </h3>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3 text-xs">
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
              <span className="font-mono text-cyan-300 font-bold text-[11px]">Priority Bundles Pass</span>
              <p className="mt-1 text-slate-300">Schedules high-synergy multi-department bundles first into optimal daylight and night blocks.</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
              <span className="font-mono text-cyan-300 font-bold text-[11px]">Single Task Optimization</span>
              <p className="mt-1 text-slate-300">Allocates remaining individual high-criticality tasks into available slots without timetable clash.</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
              <span className="font-mono text-cyan-300 font-bold text-[11px]">Digital Twin Sandbox</span>
              <p className="mt-1 text-slate-300">Live What-If simulation engine re-optimizing schedules in milliseconds under freight surges or emergencies.</p>
            </div>
          </div>
        </div>

        {/* Tier 4: User & Decision Support Cockpit */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-lg">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <LayoutDashboard className="h-4 w-4 text-emerald-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Tier 4: Enterprise Operations Interface &amp; AI RailOptX
            </h3>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3 text-xs">
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
              <span className="font-mono text-emerald-300 font-bold text-[11px]">18 Operational Views</span>
              <p className="mt-1 text-slate-300">Full corridor transparency across stations, sections, risk registries, weekly and monthly schedules.</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
              <span className="font-mono text-emerald-300 font-bold text-[11px]">AI RailOptX Copilot</span>
              <p className="mt-1 text-slate-300">Powered by Gemini and railway domain heuristics answering natural language queries from section controllers.</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
              <span className="font-mono text-emerald-300 font-bold text-[11px]">Explainable Decision Trail</span>
              <p className="mt-1 text-slate-300">Provides auditable explanations of why blocks were selected and why alternatives were rejected.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
