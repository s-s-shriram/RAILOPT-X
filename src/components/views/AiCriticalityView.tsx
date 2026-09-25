import React, { useState } from 'react';
import {
  Cpu,
  Calculator,
  Search,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Info,
  Layers,
} from 'lucide-react';
import { MaintenanceTask, Asset, Section } from '../../types';
import { computeTaskCriticality } from '../../services/aiCriticalityEngine';

interface AiCriticalityViewProps {
  tasks: MaintenanceTask[];
  assets: Asset[];
  sections: Section[];
  onSelectTask: (task: MaintenanceTask) => void;
}

export const AiCriticalityView: React.FC<AiCriticalityViewProps> = ({
  tasks,
  assets,
  sections,
  onSelectTask,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTaskId, setSelectedTaskId] = useState<string>('ENG-0187');

  // Compute breakdowns for all tasks
  const enrichedTasks = tasks.map(t => {
    const asset = assets.find(a => a.id === t.assetId);
    const section = sections.find(s => s.id === t.sectionId);
    const breakdown = computeTaskCriticality(t, asset, section);
    return {
      task: t,
      asset,
      section,
      breakdown,
    };
  });

  const activeTask = enrichedTasks.find(et => et.task.id === selectedTaskId) || enrichedTasks[0];

  const filtered = enrichedTasks.filter(et => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      (et.task?.id && et.task.id.toLowerCase().includes(q)) ||
      (et.task?.sectionId && et.task.sectionId.toLowerCase().includes(q)) ||
      (et.task?.maintenanceType && et.task.maintenanceType.toLowerCase().includes(q))
    );
  });

  return (
    <div id="view-ai-criticality" className="space-y-6">
      {/* Title */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-lg md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
            <Cpu className="h-4 w-4" />
            <span>EXPLAINABLE AI PRIORITIZATION ENGINE</span>
          </div>
          <h1 className="mt-1 text-2xl font-black text-white">
            Transparent Multi-Attribute Criticality Scoring
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Auditable mathematical prioritization model combining asset health, defect urgency, network bottleneck density, and passenger delay penalties
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs font-mono text-slate-300">
            <span className="text-slate-500">Scale:</span> 0–39 LOW | 40–59 MED | 60–79 HIGH | 80–100 CRIT
          </div>
        </div>
      </div>

      {/* Feature Weights & Active Task Formula Inspector */}
      {activeTask && (
        <div className="rounded-2xl border border-cyan-800/60 bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 p-5 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm font-black text-cyan-400">
                {activeTask.task.id}
              </span>
              <span className="font-bold text-white text-sm">
                {activeTask.task.maintenanceType} ({activeTask.task.sectionId})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">AI Priority Score:</span>
              <span className="rounded-lg bg-cyan-950 px-2.5 py-1 font-mono text-base font-black text-cyan-400 border border-cyan-700">
                {activeTask.breakdown.finalScore} / 100
              </span>
              <span
                className={`rounded px-2 py-0.5 text-xs font-bold ${
                  activeTask.breakdown.classification === 'CRITICAL'
                    ? 'bg-red-950 text-red-400 border border-red-800'
                    : 'bg-amber-950 text-amber-400 border border-amber-800'
                }`}
              >
                {activeTask.breakdown.classification}
              </span>
            </div>
          </div>

          {/* Mathematical Formula Bar */}
          <div className="mt-3 rounded-xl border border-slate-800 bg-slate-950/80 p-3 font-mono text-xs text-cyan-300">
            <span className="text-slate-500 mr-2">Evaluated Equation:</span>
            {activeTask.breakdown.mathematicalFormula}
          </div>

          {/* 5 Feature Weights Breakdown */}
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5 text-xs">
            <div className="rounded-lg bg-slate-950/60 p-2.5 border border-slate-800">
              <span className="text-slate-500 text-[10px]">1. Asset Criticality (25%)</span>
              <div className="mt-1 font-mono font-bold text-slate-200 text-sm">
                {activeTask.breakdown.assetCriticalityScore}/100
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Weighted: {(activeTask.breakdown.assetCriticalityScore * 0.25).toFixed(1)}</div>
            </div>

            <div className="rounded-lg bg-slate-950/60 p-2.5 border border-slate-800">
              <span className="text-slate-500 text-[10px]">2. Defect Severity (25%)</span>
              <div className="mt-1 font-mono font-bold text-slate-200 text-sm">
                {activeTask.breakdown.defectSeverityScore}/100
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Weighted: {(activeTask.breakdown.defectSeverityScore * 0.25).toFixed(1)}</div>
            </div>

            <div className="rounded-lg bg-slate-950/60 p-2.5 border border-slate-800">
              <span className="text-slate-500 text-[10px]">3. Urgency / Overdue (20%)</span>
              <div className="mt-1 font-mono font-bold text-amber-400 text-sm">
                {activeTask.breakdown.urgencyDaysOverdueScore}/100
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Weighted: {(activeTask.breakdown.urgencyDaysOverdueScore * 0.20).toFixed(1)}</div>
            </div>

            <div className="rounded-lg bg-slate-950/60 p-2.5 border border-slate-800">
              <span className="text-slate-500 text-[10px]">4. Failure Risk (15%)</span>
              <div className="mt-1 font-mono font-bold text-slate-200 text-sm">
                {activeTask.breakdown.failureRiskScore}/100
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Weighted: {(activeTask.breakdown.failureRiskScore * 0.15).toFixed(1)}</div>
            </div>

            <div className="rounded-lg bg-slate-950/60 p-2.5 border border-slate-800">
              <span className="text-slate-500 text-[10px]">5. Network Impact (15%)</span>
              <div className="mt-1 font-mono font-bold text-slate-200 text-sm">
                {activeTask.breakdown.networkImportanceScore}/100
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Weighted: {(activeTask.breakdown.networkImportanceScore * 0.15).toFixed(1)}</div>
            </div>
          </div>

          <div className="mt-3 text-xs text-slate-300">
            <span className="font-bold text-slate-400">AI Decision Rationale: </span>
            {activeTask.breakdown.rationale}
          </div>
        </div>
      )}

      {/* Task Scoring Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 shadow-lg overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex justify-between items-center">
          <span className="text-xs font-bold text-slate-300">Prioritization Rankings (Click any row to inspect feature decomposition)</span>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search task or section..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="rounded-lg border border-slate-700 bg-slate-950 pl-8 pr-3 py-1 text-xs text-slate-200 placeholder-slate-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-800 bg-slate-950 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-4 py-3">Task ID</th>
                <th className="px-4 py-3">Dept</th>
                <th className="px-4 py-3">Section</th>
                <th className="px-4 py-3">Maintenance Description</th>
                <th className="px-4 py-3">Days Overdue</th>
                <th className="px-4 py-3">Asset Crit</th>
                <th className="px-4 py-3">Defect Sev</th>
                <th className="px-4 py-3">Final AI Score</th>
                <th className="px-4 py-3">Priority</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-sans">
              {filtered.map(et => {
                const isSelected = et.task.id === activeTask?.task.id;
                return (
                  <tr
                    key={et.task.id}
                    onClick={() => {
                      setSelectedTaskId(et.task.id);
                      onSelectTask(et.task);
                    }}
                    className={`cursor-pointer transition-colors hover:bg-slate-800/50 ${
                      isSelected ? 'bg-cyan-950/40 ring-1 ring-cyan-600' : ''
                    }`}
                  >
                    <td className="px-4 py-3 font-mono font-bold text-cyan-400 whitespace-nowrap">
                      {et.task.id}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-bold text-slate-300">
                        {et.task.department}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-300 whitespace-nowrap">
                      {et.task.sectionId}
                    </td>
                    <td className="px-4 py-3 font-semibold text-slate-200 max-w-xs truncate">
                      {et.task.maintenanceType}
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-300 whitespace-nowrap">
                      {et.task.daysOverdue > 0 ? (
                        <span className="text-red-400 font-bold">{et.task.daysOverdue}d overdue</span>
                      ) : (
                        <span className="text-slate-500">0d</span>
                      )}
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-300">
                      {et.breakdown.assetCriticalityScore}
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-300">
                      {et.breakdown.defectSeverityScore}
                    </td>
                    <td className="px-4 py-3 font-mono font-bold text-cyan-400 text-sm">
                      {et.breakdown.finalScore}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                          et.breakdown.classification === 'CRITICAL'
                            ? 'bg-red-950 text-red-400 border border-red-800'
                            : et.breakdown.classification === 'HIGH'
                            ? 'bg-amber-950 text-amber-400 border border-amber-800'
                            : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        }`}
                      >
                        {et.breakdown.classification}
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
