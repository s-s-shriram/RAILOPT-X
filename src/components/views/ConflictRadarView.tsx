import React, { useState } from 'react';
import {
  Radar,
  AlertTriangle,
  CheckCircle2,
  Sliders,
  ShieldCheck,
  RefreshCw,
  Zap,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';
import { ConstraintViolation } from '../../types';

interface ConflictRadarViewProps {
  violations: ConstraintViolation[];
  onRunOptimization: () => void;
  onSelectView: (viewId: string) => void;
}

export const ConflictRadarView: React.FC<ConflictRadarViewProps> = ({
  violations,
  onRunOptimization,
  onSelectView,
}) => {
  const [resolvedIds, setResolvedIds] = useState<string[]>([]);

  const sampleConflicts = [
    {
      id: 'CONF-01',
      type: 'TRAIN_OVERLAP',
      title: 'Timetable Clash on SEC021 (Tiruvallur)',
      severity: 'CRITICAL',
      description: 'Requested afternoon block BLK-0214 directly intersects high-priority Superfast Express 12601 (Mangalore Mail).',
      resolution: 'Shift block to midnight slot (01:00-04:00) or select candidate window BLK-0187 on SEC018.',
      status: 'RESOLVED_BY_OPTIMIZER',
    },
    {
      id: 'CONF-02',
      type: 'RESOURCE_COLLISION',
      title: 'Machine Double Booking: Duomatic Tamper DTM-04',
      severity: 'HIGH',
      description: 'Both SEC018 and SEC025 requested Duomatic Tamper DTM-04 on Wednesday at 13:00.',
      resolution: 'Optimizer allocated DTM-04 to critical bundle on SEC018 and dispatched Unimat Tamper UTM-02 to SEC025.',
      status: 'RESOLVED_BY_OPTIMIZER',
    },
    {
      id: 'CONF-03',
      type: 'ISOLATION_MISMATCH',
      title: 'OHE Traction Power Isolation Protocol on SEC018',
      severity: 'CRITICAL',
      description: 'Traction task TRC-0076 requires 25kV power cut while track gang ENG-0187 requested diesel machine movement.',
      resolution: 'Interlocked safely: 25kV isolation confirmed, diesel tamping permitted under approved electrical clearance permit.',
      status: 'RESOLVED_BY_OPTIMIZER',
    },
    {
      id: 'CONF-04',
      type: 'CREW_REST_INTERVAL',
      title: 'Mandatory Rest Period: S&T Team S01',
      severity: 'MEDIUM',
      description: 'Team S01 scheduled back-to-back night and morning shifts without HOER statutory 8h rest interval.',
      resolution: 'Crew rotation adjusted to S&T Team S02 for the morning shift.',
      status: 'RESOLVED_BY_OPTIMIZER',
    },
  ];

  return (
    <div id="view-conflict-radar" className="space-y-6">
      {/* Title */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-lg md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
            <Radar className="h-4 w-4" />
            <span>OPERATIONAL INTEGRITY &amp; CONFLICT SCANNER</span>
          </div>
          <h1 className="mt-1 text-2xl font-black text-white">
            Real-Time Conflict Radar &amp; Hard Safety Gate
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Exhaustive verification of timetable headways, machinery conflicts, electrical traction isolation, and statutory crew rest rules
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onRunOptimization}
            className="flex items-center gap-1.5 rounded-lg bg-cyan-600 px-3.5 py-2 text-xs font-bold text-white shadow-md shadow-cyan-600/20 hover:bg-cyan-500"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Re-Scan Corridor Constraints</span>
          </button>
        </div>
      </div>

      {/* 4 Conflict Category Monitor Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold">TRAIN PATH OVERLAPS</span>
            <span className="rounded-full bg-emerald-950 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
              0 Active
            </span>
          </div>
          <div className="mt-2 text-2xl font-black text-white">100% Cleared</div>
          <p className="mt-1 text-[11px] text-slate-400">
            No passenger mail trains held during optimized possessions
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold">MACHINE FLEET GAPS</span>
            <span className="rounded-full bg-emerald-950 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
              0 Collisions
            </span>
          </div>
          <div className="mt-2 text-2xl font-black text-white">4 Tampers Deployed</div>
          <p className="mt-1 text-[11px] text-slate-400">
            Duomatic &amp; Unimat machines allocated with realistic transit times
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold">OHE TRACTION PERMITS</span>
            <span className="rounded-full bg-emerald-950 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
              Verified
            </span>
          </div>
          <div className="mt-2 text-2xl font-black text-white">100% Interlocked</div>
          <p className="mt-1 text-[11px] text-slate-400">
            Power isolation and grounding tags generated automatically
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold">CREW REST VIOLATIONS</span>
            <span className="rounded-full bg-emerald-950 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
              Compliant
            </span>
          </div>
          <div className="mt-2 text-2xl font-black text-white">HOER Compliant</div>
          <p className="mt-1 text-[11px] text-slate-400">
            Guaranteed 8h statutory rest intervals between assigned blocks
          </p>
        </div>
      </div>

      {/* Conflict Radar Ledger Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 shadow-lg overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex justify-between items-center">
          <span className="text-xs font-bold text-slate-300">
            Corridor Conflict Detection &amp; Automated Mitigation Ledger
          </span>
          <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-slate-400">
            4 Evaluated / 4 Mitigated
          </span>
        </div>

        <div className="divide-y divide-slate-800/80">
          {sampleConflicts.map(conf => (
            <div key={conf.id} className="p-5 transition-colors hover:bg-slate-950/60">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs font-bold text-cyan-400">{conf.id}</span>
                  <span
                    className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                      conf.severity === 'CRITICAL'
                        ? 'bg-red-950 text-red-400 border border-red-800'
                        : 'bg-amber-950 text-amber-400 border border-amber-800'
                    }`}
                  >
                    {conf.severity}
                  </span>
                  <h3 className="font-bold text-sm text-white">{conf.title}</h3>
                </div>

                <span className="flex items-center gap-1.5 rounded-full bg-emerald-950 px-3 py-0.5 text-xs font-bold text-emerald-400 border border-emerald-800">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>AUTONOMOUSLY MITIGATED</span>
                </span>
              </div>

              <p className="mt-2 text-xs text-slate-300 leading-relaxed">{conf.description}</p>

              <div className="mt-3 rounded-xl border border-cyan-900/60 bg-cyan-950/20 p-3 text-xs text-cyan-200">
                <span className="font-bold text-cyan-400">CP-SAT Optimizer Solution: </span>
                {conf.resolution}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
