import React, { useState } from 'react';
import {
  Users,
  Search,
  CheckCircle2,
  Clock,
  Wrench,
  Layers,
} from 'lucide-react';
import { Resource, Department } from '../../types';
import { STATIONS } from '../../data/corridorData';

interface ResourceIntelligenceViewProps {
  resources: Resource[];
  onSelectView: (viewId: string) => void;
}

export const ResourceIntelligenceView: React.FC<ResourceIntelligenceViewProps> = ({
  resources,
  onSelectView,
}) => {
  const [filterType, setFilterType] = useState<string>('ALL');
  const [filterDept, setFilterDept] = useState<'ALL' | Department>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = resources.filter(r => {
    if (filterType !== 'ALL' && r.resourceType !== filterType) return false;
    if (filterDept !== 'ALL' && r.department !== filterDept) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const stationName = STATIONS.find(s => s.id === r.baseStationId)?.name.toLowerCase() || '';
      return (
        (r.id && r.id.toLowerCase().includes(q)) ||
        (r.name && r.name.toLowerCase().includes(q)) ||
        (r.baseStationId && r.baseStationId.toLowerCase().includes(q)) ||
        stationName.includes(q) ||
        (r.specialization && r.specialization.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div id="view-resource-intelligence" className="space-y-6">
      {/* Title */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-lg md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
            <Users className="h-4 w-4" />
            <span>HEAVY TRACK MACHINERY &amp; SPECIALIST CREW REGISTRY</span>
          </div>
          <h1 className="mt-1 text-2xl font-black text-white">
            Resource Logistics &amp; Machine Fleet Intelligence ({resources.length} Assets)
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Track Tampers, Ballast Regulators, Tower Wagons, S&amp;T Flying Squads, and Permanent Way gangs
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search resource, depot..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="rounded-lg border border-slate-700 bg-slate-950 pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none"
            />
          </div>

          <div className="flex rounded-lg border border-slate-800 bg-slate-950 p-1">
            {['ALL', 'CREW', 'TRACK_MACHINE', 'TOWER_WAGON', 'SIGNAL_TEST_KIT', 'HEAVY_EQUIPMENT'].map(t => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`rounded px-2.5 py-1 text-[11px] font-semibold transition-all ${
                  filterType === t
                    ? 'bg-cyan-600 text-white font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {t === 'ALL' ? 'ALL' : t.replace(/_/g, ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Resource Fleet Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-800 bg-slate-950 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-4 py-3">Resource ID</th>
                <th className="px-4 py-3">Fleet Name</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Department</th>
                <th className="px-4 py-3">Base Depot</th>
                <th className="px-4 py-3">Assigned Specialization</th>
                <th className="px-4 py-3">Capacity</th>
                <th className="px-4 py-3">Fleet Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-sans">
              {filtered.map(res => {
                const depotStation = STATIONS.find(s => s.id === res.baseStationId);
                const depotName = depotStation ? `${depotStation.name} (${res.baseStationId})` : res.baseStationId;
                const isAvailable = res.currentStatus === 'AVAILABLE';

                return (
                  <tr key={res.id} className="transition-colors hover:bg-slate-800/50">
                    <td className="px-4 py-3 font-mono font-bold text-cyan-400 whitespace-nowrap">
                      {res.id}
                    </td>
                    <td className="px-4 py-3 font-semibold text-white whitespace-nowrap">
                      {res.name}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-bold text-slate-300">
                        {res.resourceType.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="text-slate-300">{res.department}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-400 whitespace-nowrap">
                      {depotName}
                    </td>
                    <td className="px-4 py-3 text-slate-200 font-mono text-[11px]">
                      {res.specialization}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="font-mono text-cyan-300">{res.capacity}</span>
                      <span className="text-slate-500 ml-1 text-[10px]">
                        {res.resourceType === 'CREW' ? 'Pax' : 'Mach'}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                          isAvailable
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : res.currentStatus === 'MAINTENANCE'
                            ? 'bg-amber-950 text-amber-400 border border-amber-800'
                            : 'bg-cyan-950 text-cyan-400 border border-cyan-800'
                        }`}
                      >
                        {res.currentStatus}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
