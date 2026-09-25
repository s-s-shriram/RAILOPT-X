import React, { useState } from 'react';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Clock,
  Sparkles,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface ExplainabilityViewProps {
  onSelectView: (viewId: string) => void;
}

export const ExplainabilityView: React.FC<ExplainabilityViewProps> = ({ onSelectView }) => {
  const [selectedDecision, setSelectedDecision] = useState('DEC-01');

  const decisions = [
    {
      id: 'DEC-01',
      title: 'Selection of BLK-0187 vs Rejection of BLK-0214 for SEC018',
      accepted: {
        blockId: 'BLK-0187',
        time: 'Wednesday 13:00–16:00 (3.0 Hours)',
        section: 'SEC018 (Egattur ↔ Kadambattur)',
        factors: [
          { label: 'Timetable Impact', detail: 'Off-peak daylight slot between commuter peaks. Zero Mail/Express trains delayed.', status: 'PASS' },
          { label: 'Resource Mobilization', detail: 'Duomatic Tamper DTM-04 and Tower Wagon TW-02 stabled at nearby Arakkonam depot.', status: 'PASS' },
          { label: 'Cross-Dept Synergy', detail: 'Accommodates P-Way tamping, electronic track circuit tuning, and OHE catenary stagger under 1 possession.', status: 'PASS' },
          { label: 'Freight Congestion', detail: 'Goods train headways clear; container rake BTPN-881 routed safely on adjacent line.', status: 'PASS' },
        ],
      },
      rejected: {
        blockId: 'BLK-0214',
        time: 'Thursday 08:00–11:00 (3.0 Hours)',
        section: 'SEC018 (Egattur ↔ Kadambattur)',
        factors: [
          { label: 'Timetable Impact', detail: 'Directly overlaps heavy morning suburban peak (4 EMUs delayed, >1,200 passengers impacted).', status: 'FAIL' },
          { label: 'Train Clash', detail: 'Express 12601 (Mangalore Mail) scheduled through section at 09:15 with high delay penalty.', status: 'FAIL' },
          { label: 'Resource Clash', detail: 'Duomatic Tamper DTM-04 already booked for track renewal on SEC009.', status: 'FAIL' },
          { label: 'Cumulative Delay Penalty', detail: '+180 minutes of projected passenger train detention.', status: 'FAIL' },
        ],
      },
      verdict: 'BLK-0187 achieves 91/100 synergy with zero passenger detention, whereas BLK-0214 violates both timetable headway and machinery availability constraints.',
    },
    {
      id: 'DEC-02',
      title: 'Autonomous Nocturnal Rescheduling on SEC025 under Freight Surge',
      accepted: {
        blockId: 'BLK-0252',
        time: 'Night 01:00–04:00 (3.0 Hours)',
        section: 'SEC025 (Arakkonam Junction)',
        factors: [
          { label: 'Goods Throughput', detail: 'Allows 6 additional container rakes to transit junction during daytime peak.', status: 'PASS' },
          { label: 'Tamping Quality', detail: 'Cooler nighttime rail temperature improves ballast tamping consolidation.', status: 'PASS' },
        ],
      },
      rejected: {
        blockId: 'BLK-0251',
        time: 'Daytime 13:00–16:00 (3.0 Hours)',
        section: 'SEC025 (Arakkonam Junction)',
        factors: [
          { label: 'Goods Throughput', detail: 'Severe bottleneck: 3 freight rakes would be held at outer signals.', status: 'FAIL' },
        ],
      },
      verdict: 'Night shift allocation preserves 100% of freight capacity while fulfilling mandatory track tamping quotas.',
    },
  ];

  const activeDecision = decisions.find(d => d.id === selectedDecision) || decisions[0];

  return (
    <div id="view-explainability" className="space-y-6">
      {/* Title */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-lg md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
            <HelpCircle className="h-4 w-4" />
            <span>TRANSPARENT AI DECISION AUDIT TRAIL</span>
          </div>
          <h1 className="mt-1 text-2xl font-black text-white">
            Explainable AI Rationale &amp; Candidate Rejection Ledger
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Full human-interpretable reasoning detailing WHY blocks were selected and WHY alternatives were eliminated
          </p>
        </div>

        <div className="flex rounded-lg border border-slate-800 bg-slate-950 p-1">
          {decisions.map(d => (
            <button
              key={d.id}
              onClick={() => setSelectedDecision(d.id)}
              className={`rounded px-3 py-1 text-xs font-bold transition-all ${
                selectedDecision === d.id
                  ? 'bg-cyan-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {d.id}
            </button>
          ))}
        </div>
      </div>

      {/* Main Rationale Card: Side-by-Side Acceptance vs Rejection */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl space-y-6">
        <div>
          <span className="font-mono text-xs font-bold text-cyan-400">DECISION CASE {activeDecision.id}</span>
          <h2 className="text-lg font-bold text-white mt-1">{activeDecision.title}</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Selected Candidate (Green) */}
          <div className="rounded-xl border border-emerald-900/80 bg-emerald-950/20 p-5 shadow-md">
            <div className="flex items-center justify-between border-b border-emerald-900/60 pb-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                <span className="text-sm font-bold text-white">
                  SELECTED: {activeDecision.accepted.blockId}
                </span>
              </div>
              <span className="rounded bg-emerald-950 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-800">
                APPROVED BY SOLVER
              </span>
            </div>

            <div className="mt-3 font-mono text-xs text-emerald-300">
              {activeDecision.accepted.time} • {activeDecision.accepted.section}
            </div>

            <div className="mt-4 space-y-3">
              {activeDecision.accepted.factors.map((f, idx) => (
                <div key={idx} className="rounded-lg bg-slate-950/80 p-3 border border-emerald-950">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-200">
                    <span>{f.label}</span>
                    <span className="text-emerald-400 text-[10px] font-mono">CRITERIA MET</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-400">{f.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Rejected Candidate (Red) */}
          <div className="rounded-xl border border-red-900/80 bg-red-950/20 p-5 shadow-md">
            <div className="flex items-center justify-between border-b border-red-900/60 pb-3">
              <div className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-red-400" />
                <span className="text-sm font-bold text-white">
                  REJECTED: {activeDecision.rejected.blockId}
                </span>
              </div>
              <span className="rounded bg-red-950 px-2 py-0.5 text-[10px] font-bold text-red-400 border border-red-800">
                DISQUALIFIED
              </span>
            </div>

            <div className="mt-3 font-mono text-xs text-red-300">
              {activeDecision.rejected.time} • {activeDecision.rejected.section}
            </div>

            <div className="mt-4 space-y-3">
              {activeDecision.rejected.factors.map((f, idx) => (
                <div key={idx} className="rounded-lg bg-slate-950/80 p-3 border border-red-950">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-200">
                    <span>{f.label}</span>
                    <span className="text-red-400 text-[10px] font-mono">VIOLATION DETECTED</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-400">{f.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chief Planner Summary Box */}
        <div className="rounded-xl border border-cyan-900/60 bg-cyan-950/20 p-4 text-xs text-cyan-200">
          <span className="font-bold text-cyan-400">Chief Planner Explainability Summary: </span>
          {activeDecision.verdict}
        </div>
      </div>
    </div>
  );
};
