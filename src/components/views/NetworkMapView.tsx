import React, { useState } from 'react';
import {
  Network,
  Search,
  Filter,
  Train,
  ShieldCheck,
  AlertTriangle,
  Clock,
  Layers,
  Sparkles,
  Info,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { Section, Station, Asset, MaintenanceTask, BlockWindow, FreightForecast } from '../../types';

interface NetworkMapViewProps {
  stations: Station[];
  sections: Section[];
  assets: Asset[];
  tasks: MaintenanceTask[];
  blocks: BlockWindow[];
  freightForecasts: FreightForecast[];
  selectedSectionId: string | null;
  onSelectSection: (sectionId: string) => void;
  onSelectTask: (task: MaintenanceTask) => void;
}

export const NetworkMapView: React.FC<NetworkMapViewProps> = ({
  stations,
  sections,
  assets,
  tasks,
  blocks,
  freightForecasts,
  selectedSectionId,
  onSelectSection,
  onSelectTask,
}) => {
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'CRITICAL' | 'WARNING' | 'NORMAL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const activeSection = sections.find(s => s.id === selectedSectionId) || sections.find(s => s.id === 'SEC018') || sections[0];

  // Section related data
  const sectionAssets = assets.filter(a => a.sectionId === activeSection.id);
  const sectionTasks = tasks.filter(t => t.sectionId === activeSection.id);
  const sectionBlocks = blocks.filter(b => b.sectionId === activeSection.id);
  const sectionFreight = freightForecasts.find(f => f.sectionId === activeSection.id);

  // Filtered sections list
  const filteredSections = sections.filter(sec => {
    if (filterStatus !== 'ALL' && sec.status !== filterStatus) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        (sec.id && sec.id.toLowerCase().includes(q)) ||
        (sec.fromStationName && sec.fromStationName.toLowerCase().includes(q)) ||
        (sec.toStationName && sec.toStationName.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div id="view-network-map" className="space-y-6">
      {/* Title Bar */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-lg md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
            <Network className="h-4 w-4" />
            <span>CORRIDOR DIGITAL TOPOLOGY</span>
          </div>
          <h1 className="mt-1 text-2xl font-black text-white">
            36-Station Railway Network Model
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Southern Railway &amp; South Central Railway • Chennai Central (ST001) to Chittoor (ST036) Corridor
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search station or section..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="rounded-lg border border-slate-700 bg-slate-950 pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div className="flex rounded-lg border border-slate-800 bg-slate-950 p-1">
            {(['ALL', 'CRITICAL', 'WARNING', 'NORMAL'] as const).map(st => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`rounded px-2.5 py-1 text-[11px] font-semibold transition-all ${
                  filterStatus === st
                    ? 'bg-cyan-600 text-white font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Corridor Visualizer (Left) and Section Detail Inspector (Right) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left: Interactive Section Timeline / Corridor Strip */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-lg">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-slate-300">
                Corridor Track Sections ({filteredSections.length} displayed)
              </span>
              <span className="text-[11px] text-slate-500 font-mono">
                Click any section to inspect live asset &amp; block telemetry
              </span>
            </div>

            {/* Scrollable Section Strip */}
            <div className="mt-4 space-y-2 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-800">
              {filteredSections.map(sec => {
                const isSelected = sec.id === activeSection.id;
                const isCrit = sec.status === 'CRITICAL' || sec.infrastructureRisk >= 85;
                const isWarn = sec.status === 'WARNING' || sec.infrastructureRisk >= 65;

                return (
                  <div
                    key={sec.id}
                    onClick={() => onSelectSection(sec.id)}
                    className={`group cursor-pointer rounded-xl border p-3 transition-all ${
                      isSelected
                        ? 'border-cyan-500 bg-cyan-950/40 ring-1 ring-cyan-500 shadow-md shadow-cyan-950'
                        : isCrit
                        ? 'border-red-900/60 bg-red-950/20 hover:border-red-600'
                        : isWarn
                        ? 'border-amber-900/60 bg-amber-950/10 hover:border-amber-600'
                        : 'border-slate-800 bg-slate-950/70 hover:border-slate-700 hover:bg-slate-900/80'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="rounded bg-slate-800 px-2 py-0.5 font-mono text-xs font-bold text-cyan-300">
                          {sec.id}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
                              {sec.fromStationName}
                            </span>
                            <span className="text-slate-500 text-xs">→</span>
                            <span className="font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
                              {sec.toStationName}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-[10px] text-slate-400 mt-0.5">
                            <span>{sec.distanceKm} km</span>
                            <span>•</span>
                            <span>{sec.tracks} Tracks</span>
                            <span>•</span>
                            <span>Max {sec.maxSpeedKmph} km/h</span>
                            <span>•</span>
                            <span>{sec.trainFrequency} Trains/day</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="text-[10px] text-slate-500">Criticality</div>
                          <div className="font-mono text-xs font-bold text-slate-200">
                            {sec.criticality}/100
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-[10px] text-slate-500">Risk Score</div>
                          <div
                            className={`font-mono text-xs font-bold ${
                              isCrit ? 'text-red-400' : isWarn ? 'text-amber-400' : 'text-emerald-400'
                            }`}
                          >
                            {sec.infrastructureRisk}%
                          </div>
                        </div>

                        <span
                          className={`rounded px-2 py-1 text-[10px] font-bold ${
                            isCrit
                              ? 'bg-red-950 text-red-400 border border-red-800 animate-pulse'
                              : isWarn
                              ? 'bg-amber-950 text-amber-400 border border-amber-800'
                              : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          }`}
                        >
                          {sec.status}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Detailed Section Telemetry Drawer */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-cyan-800/60 bg-slate-900/95 p-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="rounded bg-cyan-950 px-2 py-0.5 font-mono text-[10px] font-bold text-cyan-400 border border-cyan-800">
                  {activeSection.id} TELEMETRY
                </span>
                <h3 className="mt-1 text-base font-bold text-white">
                  {activeSection.fromStationName} ↔ {activeSection.toStationName}
                </h3>
              </div>
              <span
                className={`rounded px-2 py-1 text-xs font-bold ${
                  activeSection.status === 'CRITICAL'
                    ? 'bg-red-950 text-red-400 border border-red-800'
                    : activeSection.status === 'WARNING'
                    ? 'bg-amber-950 text-amber-400 border border-amber-800'
                    : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                }`}
              >
                {activeSection.status}
              </span>
            </div>

            {/* Metrics Breakdown */}
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-lg bg-slate-950 p-2.5 border border-slate-800">
                <span className="text-slate-500 text-[10px]">Track Topology</span>
                <div className="font-bold text-slate-200 mt-0.5">
                  {activeSection.tracks} Tracks • 25kV OHE
                </div>
              </div>
              <div className="rounded-lg bg-slate-950 p-2.5 border border-slate-800">
                <span className="text-slate-500 text-[10px]">Daily Movements</span>
                <div className="font-bold text-slate-200 mt-0.5">
                  {activeSection.trainFrequency} Passenger / {activeSection.freightFrequency} Freight
                </div>
              </div>
              <div className="rounded-lg bg-slate-950 p-2.5 border border-slate-800">
                <span className="text-slate-500 text-[10px]">Infrastructure Risk</span>
                <div className="font-bold text-amber-400 mt-0.5 font-mono">
                  {activeSection.infrastructureRisk}/100 Risk Index
                </div>
              </div>
              <div className="rounded-lg bg-slate-950 p-2.5 border border-slate-800">
                <span className="text-slate-500 text-[10px]">Freight Forecast</span>
                <div className="font-bold text-cyan-400 mt-0.5 font-mono">
                  {sectionFreight?.expectedFreightTrains || 10} Trains/Day ({sectionFreight?.demandLevel})
                </div>
              </div>
            </div>

            {/* Assets on Section */}
            <div className="mt-5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                <span>Fixed Assets ({sectionAssets.length})</span>
                <span className="text-[10px] text-slate-500">TMS / SMMS / TDMS</span>
              </div>
              <div className="mt-2 space-y-1.5">
                {sectionAssets.map(a => (
                  <div
                    key={a.id}
                    className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/60 px-2.5 py-1.5 text-xs"
                  >
                    <div>
                      <div className="font-mono text-[10px] text-cyan-400 font-bold">{a.id}</div>
                      <div className="text-slate-300 text-[11px]">{a.assetType}</div>
                    </div>
                    <span
                      className={`rounded px-1.5 py-0.5 text-[9px] font-bold ${
                        a.condition === 'CRITICAL'
                          ? 'bg-red-950 text-red-400'
                          : a.condition === 'WARNING'
                          ? 'bg-amber-950 text-amber-400'
                          : 'bg-emerald-950 text-emerald-400'
                      }`}
                    >
                      {a.condition}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Maintenance Tasks on Section */}
            <div className="mt-5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                <span>Active Maintenance Tasks ({sectionTasks.length})</span>
                <span className="text-[10px] text-slate-500">BDMS Requests</span>
              </div>
              <div className="mt-2 space-y-2">
                {sectionTasks.map(t => (
                  <div
                    key={t.id}
                    onClick={() => onSelectTask(t)}
                    className="cursor-pointer rounded-lg border border-slate-800 bg-slate-950/80 p-2.5 hover:border-cyan-500 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-cyan-400">{t.id}</span>
                      <span
                        className={`rounded px-1.5 py-0.5 text-[9px] font-bold ${
                          t.severity === 'CRITICAL'
                            ? 'bg-red-950 text-red-400'
                            : 'bg-amber-950 text-amber-400'
                        }`}
                      >
                        {t.severity}
                      </span>
                    </div>
                    <div className="text-xs text-slate-200 mt-1 line-clamp-1">{t.maintenanceType}</div>
                    <div className="mt-1 flex items-center justify-between text-[10px] text-slate-400">
                      <span>{t.department} • {t.estimatedDurationHours}h</span>
                      {t.daysOverdue > 0 && (
                        <span className="text-red-400 font-bold">{t.daysOverdue}d overdue</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Corridor Blocks on Section */}
            <div className="mt-5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                <span>Block Windows Available ({sectionBlocks.length})</span>
                <span className="text-[10px] text-slate-500">COA Windows</span>
              </div>
              <div className="mt-2 space-y-1.5">
                {sectionBlocks.map(b => (
                  <div
                    key={b.id}
                    className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/60 px-2.5 py-1.5 text-xs"
                  >
                    <div className="font-mono text-[11px] font-bold text-blue-400">{b.id}</div>
                    <div className="text-slate-400 text-[10px]">
                      {b.dayOfWeek} {b.startTime} - {b.endTime} ({b.durationHours}h)
                    </div>
                    <span
                      className={`text-[9px] font-bold ${
                        b.isAvailable ? 'text-emerald-400' : 'text-red-400'
                      }`}
                    >
                      {b.isAvailable ? 'AVAILABLE' : 'BLOCKED'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
