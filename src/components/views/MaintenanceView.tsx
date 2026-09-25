import React, { useState } from 'react';
import {
  Wrench,
  Search,
  Filter,
  AlertTriangle,
  Clock,
  ShieldCheck,
  Zap,
  Radio,
  TrainTrack,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
} from 'lucide-react';
import { MaintenanceTask, Department, Severity } from '../../types';

interface MaintenanceViewProps {
  tasks: MaintenanceTask[];
  onSelectTask: (task: MaintenanceTask) => void;
  selectedTask: MaintenanceTask | null;
  onCloseTaskDetail: () => void;
}

export const MaintenanceView: React.FC<MaintenanceViewProps> = ({
  tasks,
  onSelectTask,
  selectedTask,
  onCloseTaskDetail,
}) => {
  const [filterDept, setFilterDept] = useState<'ALL' | Department>('ALL');
  const [filterSeverity, setFilterSeverity] = useState<'ALL' | Severity>('ALL');
  const [filterOverdueOnly, setFilterOverdueOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTasks = tasks.filter(t => {
    if (filterDept !== 'ALL' && t.department !== filterDept) return false;
    if (filterSeverity !== 'ALL' && t.severity !== filterSeverity) return false;
    if (filterOverdueOnly && t.daysOverdue === 0) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        (t.id && t.id.toLowerCase().includes(q)) ||
        (t.sectionId && t.sectionId.toLowerCase().includes(q)) ||
        (t.maintenanceType && t.maintenanceType.toLowerCase().includes(q)) ||
        (t.requiredTeam && t.requiredTeam.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div id="view-maintenance" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-lg md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
            <Wrench className="h-4 w-4" />
            <span>INFRASTRUCTURE MAINTENANCE REQUISITIONS</span>
          </div>
          <h1 className="mt-1 text-2xl font-black text-white">
            Maintenance Request Catalog ({tasks.length} Records)
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Multi-department requisitions from Engineering (P-Way), S&amp;T (Signalling &amp; Telecom), and Traction (OHE)
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search task, asset, section..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="rounded-lg border border-slate-700 bg-slate-950 pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          {/* Department Filter */}
          <div className="flex rounded-lg border border-slate-800 bg-slate-950 p-1">
            {(['ALL', 'ENGINEERING', 'SNT', 'TRACTION'] as const).map(d => (
              <button
                key={d}
                onClick={() => setFilterDept(d)}
                className={`rounded px-2.5 py-1 text-[11px] font-semibold transition-all ${
                  filterDept === d
                    ? 'bg-cyan-600 text-white font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {d === 'ALL' ? 'ALL DEPTS' : d}
              </button>
            ))}
          </div>

          {/* Overdue Checkbox Toggle */}
          <button
            onClick={() => setFilterOverdueOnly(!filterOverdueOnly)}
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all ${
              filterOverdueOnly
                ? 'border-amber-600 bg-amber-950/40 text-amber-300'
                : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
            }`}
          >
            <Clock className="h-3.5 w-3.5" />
            <span>Overdue Only</span>
          </button>
        </div>
      </div>

      {/* Main Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-800 bg-slate-950 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-4 py-3">Task ID</th>
                <th className="px-4 py-3">Section</th>
                <th className="px-4 py-3">Dept</th>
                <th className="px-4 py-3">Maintenance Activity</th>
                <th className="px-4 py-3">Duration</th>
                <th className="px-4 py-3">Required Crew &amp; Machine</th>
                <th className="px-4 py-3">Severity</th>
                <th className="px-4 py-3">AI Criticality</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-sans">
              {filteredTasks.map(task => {
                const isSelected = selectedTask?.id === task.id;
                return (
                  <tr
                    key={task.id}
                    onClick={() => onSelectTask(task)}
                    className={`cursor-pointer transition-colors hover:bg-slate-800/50 ${
                      isSelected ? 'bg-cyan-950/40' : ''
                    }`}
                  >
                    <td className="px-4 py-3 font-mono font-bold text-cyan-400 whitespace-nowrap">
                      {task.id}
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-300 whitespace-nowrap">
                      {task.sectionId}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                          task.department === 'ENGINEERING'
                            ? 'bg-amber-950/70 text-amber-300 border border-amber-800'
                            : task.department === 'SNT'
                            ? 'bg-blue-950/70 text-blue-300 border border-blue-800'
                            : 'bg-purple-950/70 text-purple-300 border border-purple-800'
                        }`}
                      >
                        {task.department}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-slate-200 max-w-xs truncate">
                      {task.maintenanceType}
                    </td>
                    <td className="px-4 py-3 text-slate-400 whitespace-nowrap">
                      {task.estimatedDurationHours} hrs
                    </td>
                    <td className="px-4 py-3 text-slate-300 max-w-[200px] truncate">
                      {task.requiredTeam} ({task.requiredEquipment})
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                          task.severity === 'CRITICAL'
                            ? 'bg-red-950 text-red-400 border border-red-800'
                            : task.severity === 'HIGH'
                            ? 'bg-amber-950 text-amber-400 border border-amber-800'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {task.severity}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap font-mono font-bold text-slate-200">
                      <div className="flex items-center gap-1.5">
                        <span>{task.calculatedCriticalityScore}</span>
                        <div className="h-1.5 w-12 rounded-full bg-slate-800 overflow-hidden">
                          <div
                            className={`h-full ${
                              task.calculatedCriticalityScore >= 80
                                ? 'bg-red-500'
                                : task.calculatedCriticalityScore >= 60
                                ? 'bg-amber-500'
                                : 'bg-emerald-500'
                            }`}
                            style={{ width: `${task.calculatedCriticalityScore}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                          task.status === 'BUNDLED'
                            ? 'bg-purple-950 text-purple-300 border border-purple-800'
                            : task.status === 'SCHEDULED'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Task Detail Modal */}
      {selectedTask && (
        <div
          id="modal-task-detail"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
        >
          <div className="w-full max-w-xl rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-lg font-black text-cyan-400">{selectedTask.id}</span>
                  <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-slate-300">
                    {selectedTask.sectionId}
                  </span>
                  <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-bold text-cyan-300">
                    {selectedTask.department}
                  </span>
                </div>
                <h3 className="mt-1 text-base font-bold text-white">{selectedTask.maintenanceType}</h3>
              </div>
              <button
                onClick={onCloseTaskDetail}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-slate-950 p-3 border border-slate-800">
                  <span className="text-slate-500 text-[10px]">Associated Fixed Asset</span>
                  <div className="font-mono font-bold text-slate-200 mt-0.5">{selectedTask.assetId}</div>
                </div>
                <div className="rounded-lg bg-slate-950 p-3 border border-slate-800">
                  <span className="text-slate-500 text-[10px]">Duration Requirement</span>
                  <div className="font-mono font-bold text-slate-200 mt-0.5">
                    {selectedTask.estimatedDurationHours} Hours Required
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-slate-950 p-3 border border-slate-800">
                  <span className="text-slate-500 text-[10px]">Crew &amp; Machinery</span>
                  <div className="font-bold text-slate-200 mt-0.5">{selectedTask.requiredTeam}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{selectedTask.requiredEquipment}</div>
                </div>
                <div className="rounded-lg bg-slate-950 p-3 border border-slate-800">
                  <span className="text-slate-500 text-[10px]">Due Date &amp; Overdue Status</span>
                  <div className="font-mono font-bold text-slate-200 mt-0.5">Due: {selectedTask.dueDate}</div>
                  <div className="text-[11px] text-red-400 mt-0.5">
                    {selectedTask.daysOverdue > 0 ? `${selectedTask.daysOverdue} days overdue` : 'Within due window'}
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-slate-950 p-3 border border-slate-800">
                <span className="text-slate-500 text-[10px]">Isolation &amp; Safety Protocol</span>
                <div className="font-bold text-amber-400 mt-0.5 font-mono">{selectedTask.isolationRequirement}</div>
                <p className="mt-1 text-slate-300 leading-relaxed">{selectedTask.safetyRequirement}</p>
              </div>

              {selectedTask.explanationNotes && (
                <div className="rounded-lg border border-cyan-900/60 bg-cyan-950/20 p-3 text-cyan-200">
                  <span className="font-bold text-cyan-400">Section Controller Notes: </span>
                  {selectedTask.explanationNotes}
                </div>
              )}
            </div>

            <div className="mt-6 flex items-center justify-end gap-2 border-t border-slate-800 pt-4">
              <button
                onClick={onCloseTaskDetail}
                className="rounded-lg border border-slate-700 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
