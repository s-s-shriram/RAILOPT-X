import React, { useState } from 'react';
import {
  CalendarRange,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Clock,
  ArrowRight,
  Layers,
} from 'lucide-react';

interface MonthlyPlanViewProps {
  onSelectView: (viewId: string) => void;
}

export const MonthlyPlanView: React.FC<MonthlyPlanViewProps> = ({ onSelectView }) => {
  const [selectedWeek, setSelectedWeek] = useState(2);

  const weeklyDistribution = [
    {
      weekNum: 1,
      title: 'Week 1',
      dateRange: '01 Sep – 07 Sep 2026',
      status: 'COMPLETED',
      statusColor: 'bg-slate-800 text-slate-300 border-slate-700',
      blocks: 27,
      engHours: 32,
      sntHours: 24,
      trcHours: 26,
      availability: '92.4%',
      daylightHours: '42 hrs',
      nocturnalHours: '40 hrs',
      highlights: 'Completed turnout renewals at MAS yard & AJJ junction OHE wire re-tensioning.',
    },
    {
      weekNum: 2,
      title: 'Week 2 (Active Current)',
      dateRange: '08 Sep – 14 Sep 2026',
      status: 'IN PROGRESS • TODAY 11 SEP',
      statusColor: 'bg-emerald-950 text-emerald-300 border-emerald-800',
      blocks: 24,
      engHours: 28,
      sntHours: 22,
      trcHours: 24,
      availability: '92.8%',
      daylightHours: '38 hrs',
      nocturnalHours: '36 hrs',
      highlights: 'Active joint possession SEC018 & SEC025; electronic interlocking software update on AJJ.',
    },
    {
      weekNum: 3,
      title: 'Week 3 (Scheduled)',
      dateRange: '15 Sep – 21 Sep 2026',
      status: 'CONFIRMED BY DIV. CONTROLLER',
      statusColor: 'bg-cyan-950 text-cyan-300 border-cyan-800',
      blocks: 26,
      engHours: 30,
      sntHours: 26,
      trcHours: 28,
      availability: '93.1%',
      daylightHours: '44 hrs',
      nocturnalHours: '40 hrs',
      highlights: 'High-speed track geometry packing and point machine replacement at TRT & CTO.',
    },
    {
      weekNum: 4,
      title: 'Week 4 (Forward Plan)',
      dateRange: '22 Sep – 30 Sep 2026',
      status: 'FORWARD ALLOCATION',
      statusColor: 'bg-purple-950 text-purple-300 border-purple-800',
      blocks: 22,
      engHours: 26,
      sntHours: 20,
      trcHours: 22,
      availability: '93.5%',
      daylightHours: '34 hrs',
      nocturnalHours: '34 hrs',
      highlights: 'Pre-monsoon bridge inspection and catenary insulator power-wash under traction isolations.',
    },
  ];

  const activeWeekData = weeklyDistribution[selectedWeek - 1];

  const maintenanceCycles = [
    { asset: 'Heavy Ballast Tamping', interval: 'Every 30 Days (Continuous Corridor Cycle)', progress: 85 },
    { asset: 'Electronic Interlocking Health Check', interval: 'Every 14 Days (Signalling Protocol)', progress: 92 },
    { asset: 'OHE Catenary Stagger Inspection', interval: 'Every 30 Days (Traction Distribution)', progress: 78 },
    { asset: 'Ultrasonic Flaw Detection (USFD)', interval: 'Quarterly Non-Destructive Rail Test', progress: 100 },
  ];

  return (
    <div id="view-monthly-plan" className="space-y-6">
      {/* Title */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-lg md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
            <CalendarRange className="h-4 w-4" />
            <span>SEPTEMBER 2026 MASTER CORRIDOR STRATEGY (01 SEP – 30 SEP)</span>
          </div>
          <h1 className="mt-1 text-2xl font-black text-white">
            30-Day Master Maintenance &amp; Asset Availability Horizon
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Rolling 4-week block schedules, asset lifecycle compliance, and predictive backlog burndown
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-cyan-900/60 bg-cyan-950/20 px-3.5 py-2 text-xs">
            <span className="text-slate-400">Current Active Window:</span>
            <div className="text-sm font-bold text-cyan-300 font-mono">Week 2 (08–14 Sep)</div>
          </div>
          <div className="rounded-xl border border-emerald-900/60 bg-emerald-950/20 px-3.5 py-2 text-xs">
            <span className="text-slate-400">Target Month-End Availability:</span>
            <div className="text-base font-black text-emerald-400 font-mono">93.5% Availability</div>
          </div>
        </div>
      </div>

      {/* 4-Week Overview Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {weeklyDistribution.map((w) => (
          <div
            key={w.weekNum}
            onClick={() => setSelectedWeek(w.weekNum)}
            className={`cursor-pointer rounded-2xl border p-4 transition-all ${
              selectedWeek === w.weekNum
                ? 'border-cyan-500 bg-cyan-950/30 ring-1 ring-cyan-500 shadow-lg'
                : 'border-slate-800 bg-slate-900/90 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white">{w.title}</span>
              <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-cyan-300 font-bold">
                {w.blocks} Blocks
              </span>
            </div>

            <div className="mt-1 text-[11px] font-mono font-semibold text-cyan-400">
              {w.dateRange}
            </div>

            <div className="mt-1.5">
              <span className={`rounded px-1.5 py-0.5 text-[9px] font-bold border ${w.statusColor}`}>
                {w.status}
              </span>
            </div>

            <div className="mt-3 space-y-1 text-xs text-slate-400">
              <div className="flex justify-between">
                <span>Engineering P-Way:</span>
                <span className="font-mono text-slate-200">{w.engHours}h</span>
              </div>
              <div className="flex justify-between">
                <span>S&amp;T Signalling:</span>
                <span className="font-mono text-slate-200">{w.sntHours}h</span>
              </div>
              <div className="flex justify-between">
                <span>Traction OHE:</span>
                <span className="font-mono text-slate-200">{w.trcHours}h</span>
              </div>
            </div>

            <div className="mt-3 border-t border-slate-800/80 pt-2 flex items-center justify-between text-xs">
              <span className="text-slate-500 text-[11px]">Availability:</span>
              <span className="font-mono font-bold text-emerald-400">{w.availability}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Week Deep-Dive & Time Explanation Card */}
      <div className="rounded-2xl border border-cyan-800/60 bg-gradient-to-br from-slate-900 via-slate-900/95 to-cyan-950/40 p-5 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <Calendar className="h-5 w-5 text-cyan-400" />
            <div>
              <h3 className="text-sm font-bold text-white">
                Detailed Operations Schedule: {activeWeekData.title} ({activeWeekData.dateRange})
              </h3>
              <p className="text-xs text-slate-400">
                Coordinated possession windows resolving section occupancy &amp; time slots
              </p>
            </div>
          </div>
          <span className={`rounded-full px-3 py-1 text-xs font-bold border ${activeWeekData.statusColor}`}>
            {activeWeekData.status}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3.5 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
              <Clock className="h-3.5 w-3.5" />
              <span>Daylight Maintenance Shifts</span>
            </div>
            <div className="text-xl font-bold font-mono text-white">
              {activeWeekData.daylightHours}
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Standard 10:00–16:00 hrs slots between morning and evening passenger peaks. Used for visual track checks, weld grinding, and point machine testing.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3.5 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-purple-400">
              <Clock className="h-3.5 w-3.5" />
              <span>Nocturnal Heavy Possessions</span>
            </div>
            <div className="text-xl font-bold font-mono text-white">
              {activeWeekData.nocturnalHours}
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Night 22:00–04:30 hrs shadow slots coordinated with Goods/Container control. High-output tie-tampers and overhead catenary adjustments.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3.5 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Week Strategic Focus</span>
            </div>
            <div className="text-xs font-semibold text-slate-200 leading-relaxed">
              {activeWeekData.highlights}
            </div>
            <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>Total Possessions:</span>
              <span className="text-cyan-300 font-bold">{activeWeekData.blocks} Blocks</span>
            </div>
          </div>
        </div>
      </div>

      {/* Asset Maintenance Compliance Cycles */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-lg">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
          Statutory Asset Inspection Cycles (Indian Railways Codes)
        </h3>

        <div className="space-y-4">
          {maintenanceCycles.map((cycle, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-200">{cycle.asset}</span>
                <span className="font-mono text-cyan-400 font-bold">{cycle.progress}% On Track</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-950 overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full"
                  style={{ width: `${cycle.progress}%` }}
                />
              </div>
              <div className="text-[11px] text-slate-500">{cycle.interval}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
