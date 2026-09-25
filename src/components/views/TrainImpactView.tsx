import React, { useState } from 'react';
import {
  TrainTrack,
  Search,
  AlertTriangle,
  Clock,
  CheckCircle2,
  TrendingDown,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { TrainMovement, BlockWindow, FreightForecast } from '../../types';

interface TrainImpactViewProps {
  trains: TrainMovement[];
  blocks: BlockWindow[];
  freightForecasts: FreightForecast[];
  onSelectView: (viewId: string) => void;
}

export const TrainImpactView: React.FC<TrainImpactViewProps> = ({
  trains,
  blocks,
  freightForecasts,
  onSelectView,
}) => {
  const [filterType, setFilterType] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTrains = trains.filter(tr => {
    if (filterType !== 'ALL' && tr.trainType !== filterType) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        (tr.trainNumber && tr.trainNumber.toLowerCase().includes(q)) ||
        (tr.name && tr.name.toLowerCase().includes(q)) ||
        (tr.sectionId && tr.sectionId.toLowerCase().includes(q)) ||
        (tr.trainType && tr.trainType.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div id="view-train-impact" className="space-y-6">
      {/* Title */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-lg md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
            <TrainTrack className="h-4 w-4" />
            <span>TRAIN TIMETABLE &amp; HEADWAY IMPACT ENGINE</span>
          </div>
          <h1 className="mt-1 text-2xl font-black text-white">
            Passenger &amp; Goods Movement Disruption Analysis
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Evaluating 280 daily train paths and freight forecasts against prospective track possession windows
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="rounded-xl border border-emerald-900/60 bg-emerald-950/30 px-3.5 py-2 text-xs">
            <span className="text-slate-400">Timetable Delay Penalty:</span>
            <div className="text-base font-black text-emerald-400 font-mono">0 Peak Mail Disruptions</div>
          </div>
        </div>
      </div>

      {/* Corridor Time Window Guidelines */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-red-900/60 bg-red-950/20 p-4">
          <div className="flex items-center justify-between text-xs font-bold text-red-400">
            <span>MORNING PEAK (RESTRICTED)</span>
            <AlertTriangle className="h-4 w-4" />
          </div>
          <div className="mt-2 text-lg font-bold text-white">07:00 – 10:00 hrs</div>
          <p className="mt-1 text-[11px] text-slate-400">
            Intense suburban commuter and inbound intercity arrivals into Chennai Central. Major blocks forbidden.
          </p>
        </div>

        <div className="rounded-xl border border-emerald-900/60 bg-emerald-950/20 p-4">
          <div className="flex items-center justify-between text-xs font-bold text-emerald-400">
            <span>MID-DAY QUIET SLOT (OPTIMAL)</span>
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <div className="mt-2 text-lg font-bold text-white">12:30 – 16:30 hrs</div>
          <p className="mt-1 text-[11px] text-slate-400">
            Primary window for daylight bundled maintenance (e.g. BLK-0187 on SEC018). Minimal passenger headway impact.
          </p>
        </div>

        <div className="rounded-xl border border-blue-900/60 bg-blue-950/20 p-4">
          <div className="flex items-center justify-between text-xs font-bold text-blue-400">
            <span>NOCTURNAL SHIFT (HEAVY TRACK)</span>
            <Clock className="h-4 w-4" />
          </div>
          <div className="mt-2 text-lg font-bold text-white">00:30 – 04:30 hrs</div>
          <p className="mt-1 text-[11px] text-slate-400">
            Designated for heavy machine ballast tamping, track renewals, and overnight container rake detours.
          </p>
        </div>
      </div>

      {/* Train Timetable Explorer */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 shadow-lg overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-bold text-slate-300">
            Corridor Train Movements Catalog ({filteredTrains.length} shown)
          </span>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
              <input
                type="text"
                placeholder="Search train..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="rounded-lg border border-slate-700 bg-slate-950 pl-8 pr-3 py-1 text-xs text-slate-200 placeholder-slate-500 focus:outline-none"
              />
            </div>

            <div className="flex rounded-lg border border-slate-800 bg-slate-950 p-1">
              {['ALL', 'EXPRESS', 'SUPERFAST', 'SUBURBAN', 'FREIGHT'].map(t => (
                <button
                  key={t}
                  onClick={() => setFilterType(t)}
                  className={`rounded px-2.5 py-1 text-[11px] font-semibold transition-all ${
                    filterType === t
                      ? 'bg-cyan-600 text-white font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-800 bg-slate-950 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-4 py-3">Train No</th>
                <th className="px-4 py-3">Train Name</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Route Segment</th>
                <th className="px-4 py-3">Dep Time</th>
                <th className="px-4 py-3">Arr Time</th>
                <th className="px-4 py-3">Priority</th>
                <th className="px-4 py-3">Conflict Buffer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-sans">
              {filteredTrains.slice(0, 30).map(tr => (
                <tr key={tr.id} className="transition-colors hover:bg-slate-800/50">
                  <td className="px-4 py-3 font-mono font-bold text-cyan-400 whitespace-nowrap">
                    {tr.trainNumber}
                  </td>
                  <td className="px-4 py-3 font-semibold text-slate-200 whitespace-nowrap">
                    {tr.name}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-bold text-slate-300">
                      {tr.trainType}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-400 whitespace-nowrap">
                    {tr.sectionId} ({tr.direction} Line)
                  </td>
                  <td className="px-4 py-3 font-mono text-slate-300 whitespace-nowrap">
                    {tr.departureTime}
                  </td>
                  <td className="px-4 py-3 font-mono text-slate-300 whitespace-nowrap">
                    {tr.arrivalTime}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                        tr.priority === 'CRITICAL'
                          ? 'bg-red-950 text-red-400'
                          : tr.priority === 'HIGH'
                          ? 'bg-amber-950 text-amber-400'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {tr.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-400 text-[11px]">
                    {tr.type === 'FREIGHT' ? 'Flexible Goods Slot' : 'Strict Timetable Path'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
