import React, { useState } from 'react';
import {
  ShieldAlert,
  Search,
  Filter,
  AlertTriangle,
  CheckCircle2,
  TrendingDown,
  Layers,
  Activity,
} from 'lucide-react';
import { Asset, Department, AssetCondition } from '../../types';

interface AssetRiskViewProps {
  assets: Asset[];
  onSelectSection: (sectionId: string) => void;
}

export const AssetRiskView: React.FC<AssetRiskViewProps> = ({ assets, onSelectSection }) => {
  const [filterDept, setFilterDept] = useState<'ALL' | Department>('ALL');
  const [filterCondition, setFilterCondition] = useState<'ALL' | AssetCondition>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const criticalCount = assets.filter(a => a.condition === 'CRITICAL').length;
  const warningCount = assets.filter(a => a.condition === 'WARNING').length;
  const healthyCount = assets.filter(a => a.condition === 'NORMAL').length;

  const filteredAssets = assets.filter(a => {
    if (filterDept !== 'ALL' && a.department !== filterDept) return false;
    if (filterCondition !== 'ALL' && a.condition !== filterCondition) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        (a.id && a.id.toLowerCase().includes(q)) ||
        (a.sectionId && a.sectionId.toLowerCase().includes(q)) ||
        (a.assetType && a.assetType.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div id="view-asset-risk" className="space-y-6">
      {/* Title */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-lg md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
            <ShieldAlert className="h-4 w-4" />
            <span>FIXED INFRASTRUCTURE HEALTH REGISTRY</span>
          </div>
          <h1 className="mt-1 text-2xl font-black text-white">
            Asset Risk &amp; Degradation Index ({assets.length} Fixed Assets)
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Permanent Way, Interlocking/Signals, and 25kV Traction Catenary condition tracking across 35 sections
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search asset ID, type, section..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="rounded-lg border border-slate-700 bg-slate-950 pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div className="flex rounded-lg border border-slate-800 bg-slate-950 p-1">
            {(['ALL', 'CRITICAL', 'WARNING', 'NORMAL'] as const).map(c => (
              <button
                key={c}
                onClick={() => setFilterCondition(c)}
                className={`rounded px-2.5 py-1 text-[11px] font-semibold transition-all ${
                  filterCondition === c
                    ? 'bg-cyan-600 text-white font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-red-900/60 bg-red-950/20 p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>CRITICAL ASSETS (HIGH RISK)</span>
            <AlertTriangle className="h-4 w-4 text-red-400" />
          </div>
          <div className="mt-2 text-3xl font-black text-red-400">{criticalCount}</div>
          <p className="mt-1 text-[11px] text-slate-400">
            Immediate block allocation required to prevent in-service train stalling
          </p>
        </div>

        <div className="rounded-xl border border-amber-900/60 bg-amber-950/20 p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>WARNING STATUS (DEGRADED)</span>
            <TrendingDown className="h-4 w-4 text-amber-400" />
          </div>
          <div className="mt-2 text-3xl font-black text-amber-400">{warningCount}</div>
          <p className="mt-1 text-[11px] text-slate-400">
            Approaching intervention threshold; scheduled for weekly coordinated blocks
          </p>
        </div>

        <div className="rounded-xl border border-emerald-900/60 bg-emerald-950/20 p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>HEALTHY ASSETS (OPTIMAL)</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="mt-2 text-3xl font-black text-emerald-400">{healthyCount}</div>
          <p className="mt-1 text-[11px] text-slate-400">
            Standard periodic monitoring via TMS, SMMS, and TDMS SCADA
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-800 bg-slate-950 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-4 py-3">Asset ID</th>
                <th className="px-4 py-3">Section</th>
                <th className="px-4 py-3">Dept</th>
                <th className="px-4 py-3">Asset Class</th>
                <th className="px-4 py-3">Condition</th>
                <th className="px-4 py-3">Criticality</th>
                <th className="px-4 py-3">Failure Risk</th>
                <th className="px-4 py-3">Health Score</th>
                <th className="px-4 py-3">Last Maintained</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-sans">
              {filteredAssets.map(asset => (
                <tr
                  key={asset.id}
                  onClick={() => onSelectSection(asset.sectionId)}
                  className="cursor-pointer transition-colors hover:bg-slate-800/50"
                >
                  <td className="px-4 py-3 font-mono font-bold text-cyan-400 whitespace-nowrap">
                    {asset.id}
                  </td>
                  <td className="px-4 py-3 font-mono text-slate-300 whitespace-nowrap">
                    {asset.sectionId}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-bold text-slate-300">
                      {asset.department}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-semibold text-slate-200">
                    {asset.assetType}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                        asset.condition === 'CRITICAL'
                          ? 'bg-red-950 text-red-400 border border-red-800 animate-pulse'
                          : asset.condition === 'WARNING'
                          ? 'bg-amber-950 text-amber-400 border border-amber-800'
                          : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      }`}
                    >
                      {asset.condition}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-slate-300">
                    {asset.criticality}/100
                  </td>
                  <td className="px-4 py-3 font-mono font-bold text-slate-200">
                    <span className={asset.failureRisk >= 75 ? 'text-red-400' : 'text-slate-300'}>
                      {asset.failureRisk}%
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-slate-300">
                    {asset.healthScore}%
                  </td>
                  <td className="px-4 py-3 font-mono text-slate-500 whitespace-nowrap">
                    {asset.lastMaintainedDate}
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
