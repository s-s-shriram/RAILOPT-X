import React, { useState, useEffect } from 'react';
import { Clock, Calendar, Info, ChevronDown, ChevronUp, Radio, Train, ShieldCheck } from 'lucide-react';

export const LiveRailwayClock: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format 24-hour Railway Time (HH:MM:SS)
  const hours = String(currentTime.getHours()).padStart(2, '0');
  const minutes = String(currentTime.getMinutes()).padStart(2, '0');
  const seconds = String(currentTime.getSeconds()).padStart(2, '0');
  const railwayTimeStr = `${hours}:${minutes}:${seconds} hrs`;

  // Format Indian Standard Time / UTC offset representation
  const dayName = currentTime.toLocaleDateString('en-IN', { weekday: 'short' });
  const fullDayName = currentTime.toLocaleDateString('en-IN', { weekday: 'long' });
  const dayNum = currentTime.getDate();
  const monthShort = currentTime.toLocaleDateString('en-IN', { month: 'short' });
  const monthFull = currentTime.toLocaleDateString('en-IN', { month: 'long' });
  const year = currentTime.getFullYear();

  // Calculate Week Number of the Year
  const startOfYear = new Date(year, 0, 1);
  const days = Math.floor((currentTime.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000));
  const weekNumber = Math.ceil((days + startOfYear.getDay() + 1) / 7);

  // Compute Monday to Sunday dates of the current week
  const currentDayOfWeek = currentTime.getDay(); // 0 is Sun, 1 is Mon
  const mondayOffset = currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek;
  const mondayDate = new Date(currentTime);
  mondayDate.setDate(currentTime.getDate() + mondayOffset);
  const sundayDate = new Date(mondayDate);
  sundayDate.setDate(mondayDate.getDate() + 6);

  const formatShortDate = (d: Date) => `${d.getDate()} ${d.toLocaleDateString('en-IN', { month: 'short' })}`;
  const weekRangeStr = `${formatShortDate(mondayDate)} – ${formatShortDate(sundayDate)} ${year}`;

  // Operational Railway Shift Window Classification based on 24-hour clock
  const currentHour = currentTime.getHours();
  let operationalSlot = {
    name: 'Daylight Maintenance & Integrated Block Window',
    type: 'PRIMARY TRACK POSSESSION',
    color: 'text-amber-400',
    bgColor: 'bg-amber-950/60 border-amber-800',
    desc: 'Preferred daylight window for joint Engineering + S&T + Traction multi-discipline blocks without disturbing night container freights.',
  };

  if (currentHour >= 22 || currentHour < 5) {
    operationalSlot = {
      name: 'Nocturnal Machine & Heavy Ballast Tamping Slot',
      type: 'HEAVY MACHINERY POSSESSION',
      color: 'text-purple-400',
      bgColor: 'bg-purple-950/60 border-purple-800',
      desc: 'Nocturnal window (22:00–05:00) dedicated to CSM/BCM track tampers and OHE neutral section inspection.',
    };
  } else if (currentHour >= 5 && currentHour < 10) {
    operationalSlot = {
      name: 'Morning Passenger Peak Flow',
      type: 'LINE CLEAR PRIORITY',
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-950/60 border-cyan-800',
      desc: 'High-density commuter and suburban trains; zero planned blocks permitted on MAS-CTO main lines.',
    };
  } else if (currentHour >= 16 && currentHour < 22) {
    operationalSlot = {
      name: 'Evening Intercity & Express Priority Window',
      type: 'PUNCTUALITY PROTECTION',
      color: 'text-blue-400',
      bgColor: 'bg-blue-950/60 border-blue-800',
      desc: 'Evening express departures and high-value container trains; shadow maintenance only in loop lines.',
    };
  }

  return (
    <div className="relative">
      {/* Top Header Live Railway Clock Button / Chip */}
      <button
        id="btn-live-railway-clock"
        onClick={() => setShowExplanation(prev => !prev)}
        className="flex items-center gap-2 rounded-lg border border-slate-700/80 bg-slate-950/90 px-2.5 py-1.5 text-left text-xs shadow-sm transition-all hover:border-cyan-500/70 hover:bg-slate-900 active:scale-95"
        title="Click for full Railway Operational Time, Week & Month Schedule Explanation"
      >
        {/* Pulsing Live Operational Radio Indicator */}
        <div className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </div>

        {/* Live Clock Display */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 font-mono font-bold text-slate-100 leading-tight text-[11px] sm:text-xs">
            <Clock className="h-3 w-3 text-cyan-400" />
            <span className="tracking-wide text-cyan-300 font-extrabold">{railwayTimeStr}</span>
            <span className="rounded bg-cyan-950 px-1 py-0.2 text-[9px] font-bold text-cyan-400 border border-cyan-800 hidden md:inline">
              IST (24H)
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] text-slate-400 leading-tight mt-0.5">
            <span className="font-semibold text-slate-200">{dayName}, {dayNum} {monthShort} {year}</span>
            <span className="text-slate-600">•</span>
            <span className="font-mono text-cyan-400/90 font-medium">Wk {weekNumber}</span>
          </div>
        </div>

        {/* Dropdown Indicator */}
        <div className="ml-0.5 text-slate-500 hover:text-slate-300">
          {showExplanation ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
        </div>
      </button>

      {/* Popover Card: Detailed Explanation for Week, Month, Dates & 24H Railway Time */}
      {showExplanation && (
        <>
          {/* Backdrop to dismiss on outer click */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowExplanation(false)}
          />

          <div
            id="popover-railway-time-explanation"
            className="absolute right-0 top-full mt-2 z-50 w-84 sm:w-96 rounded-2xl border border-cyan-800/60 bg-slate-900 p-4 shadow-2xl backdrop-blur-xl ring-1 ring-cyan-500/20 animate-in fade-in zoom-in-95 duration-150"
          >
            {/* Popover Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-950 border border-cyan-700 text-cyan-400">
                  <Train className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Indian Railways Operational Clock
                  </h4>
                  <p className="text-[10px] text-slate-400 font-mono">COA / FOIS Synchronized Feed</p>
                </div>
              </div>
              <span className="flex items-center gap-1 rounded bg-emerald-950 px-1.5 py-0.5 text-[9px] font-bold text-emerald-400 border border-emerald-800">
                <Radio className="h-2.5 w-2.5 animate-pulse" />
                LIVE
              </span>
            </div>

            {/* Time & Date Metric Cards */}
            <div className="mt-3 space-y-2.5 text-xs">
              {/* Live Railway 24-hr Time */}
              <div className="flex items-center justify-between rounded-xl bg-slate-950/80 p-2.5 border border-slate-800">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-cyan-400" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Railway Standard Time (24h)</span>
                    <div className="text-base font-black font-mono text-cyan-300">
                      {railwayTimeStr} <span className="text-xs font-normal text-slate-400">IST</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[9px] font-mono text-slate-500">Universal Time</span>
                  <div className="text-[11px] font-mono text-slate-300">
                    {String(currentTime.getUTCHours()).padStart(2, '0')}:{String(currentTime.getUTCMinutes()).padStart(2, '0')}:{String(currentTime.getUTCSeconds()).padStart(2, '0')} UTC
                  </div>
                </div>
              </div>

              {/* Week & Date Range */}
              <div className="rounded-xl bg-slate-950/80 p-2.5 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-semibold text-slate-200">
                    <Calendar className="h-3.5 w-3.5 text-blue-400" />
                    <span>Operational Week {weekNumber}</span>
                  </div>
                  <span className="font-mono text-[10px] text-blue-300 font-bold bg-blue-950/80 px-2 py-0.5 rounded border border-blue-800">
                    Week Window
                  </span>
                </div>
                <div className="flex justify-between text-[11px] text-slate-400 pt-0.5">
                  <span>Current Day: <strong className="text-white">{fullDayName}</strong></span>
                  <span className="font-mono text-slate-300">{dayNum} {monthFull} {year}</span>
                </div>
                <div className="mt-1 rounded bg-slate-900 px-2 py-1 text-[10px] text-slate-300 flex justify-between font-mono">
                  <span className="text-slate-500">7-Day Cycle:</span>
                  <span className="text-cyan-300 font-semibold">{weekRangeStr}</span>
                </div>
              </div>

              {/* Month Horizon */}
              <div className="rounded-xl bg-slate-950/80 p-2.5 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Master 30-Day Horizon</span>
                  <div className="text-sm font-bold text-white font-mono">
                    {monthFull} {year}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-slate-500">Target Asset Avail.</span>
                  <div className="font-mono text-xs font-bold text-emerald-400">93.5% SLA</div>
                </div>
              </div>

              {/* Active Operational Slot */}
              <div className={`rounded-xl p-2.5 border ${operationalSlot.bgColor}`}>
                <div className="flex items-center justify-between text-[10px] font-bold">
                  <span className="uppercase text-slate-400">Active Possession Regime</span>
                  <span className={`font-mono ${operationalSlot.color}`}>{operationalSlot.type}</span>
                </div>
                <div className="mt-1 text-xs font-bold text-white">
                  {operationalSlot.name}
                </div>
                <p className="mt-0.5 text-[10px] text-slate-400 leading-relaxed">
                  {operationalSlot.desc}
                </p>
              </div>
            </div>

            {/* Explanatory Footer */}
            <div className="mt-3 flex items-center justify-between border-t border-slate-800 pt-2 text-[10px] text-slate-500">
              <div className="flex items-center gap-1">
                <ShieldCheck className="h-3 w-3 text-emerald-400" />
                <span>All line blocks locked against 24h train paths</span>
              </div>
              <button
                onClick={() => setShowExplanation(false)}
                className="text-cyan-400 hover:text-cyan-300 font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
