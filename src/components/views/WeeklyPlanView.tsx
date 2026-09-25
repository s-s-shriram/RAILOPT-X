import React, { useState } from 'react';
import {
  CalendarDays,
  Clock,
  Layers,
  Sparkles,
  ShieldCheck,
  Zap,
  Info,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { BlockWindow, MaintenanceTask, Section } from '../../types';

interface WeeklyPlanViewProps {
  blocks: BlockWindow[];
  tasks: MaintenanceTask[];
  sections: Section[];
  onSelectTask: (task: MaintenanceTask) => void;
}

export const WeeklyPlanView: React.FC<WeeklyPlanViewProps> = ({
  blocks,
  tasks,
  sections,
  onSelectTask,
}) => {
  const [selectedDay, setSelectedDay] = useState<string>('Friday');
  const [selectedBlockId, setSelectedBlockId] = useState<string>('BLK-0187');

  const daysInfo = [
    { day: 'Monday', date: '07 Sep', isToday: false },
    { day: 'Tuesday', date: '08 Sep', isToday: false },
    { day: 'Wednesday', date: '09 Sep', isToday: false },
    { day: 'Thursday', date: '10 Sep', isToday: false },
    { day: 'Friday', date: '11 Sep', isToday: true },
    { day: 'Saturday', date: '12 Sep', isToday: false },
    { day: 'Sunday', date: '13 Sep', isToday: false },
  ];
  const daysOfWeek = daysInfo.map(d => d.day);

  // Filter blocks for the selected day
  const dayBlocks = blocks.filter(b => b.dayOfWeek === selectedDay);

  const activeBlock = blocks.find(b => b.id === selectedBlockId) || dayBlocks[0] || blocks[0];
  const assignedTasks = activeBlock && Array.isArray(activeBlock.assignedTaskIds)
    ? tasks.filter(t => activeBlock.assignedTaskIds.includes(t.id))
    : [];
  const activeSection = sections.find(s => s.id === activeBlock?.sectionId);
  const currentDayInfo = daysInfo.find(d => d.day === selectedDay) || daysInfo[4];

  return (
    <div id="view-weekly-plan" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-lg md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
            <CalendarDays className="h-4 w-4" />
            <span>OPERATIONAL WEEK 37 • SEPTEMBER 2026 HORIZON</span>
            <span className="rounded bg-cyan-950 px-2 py-0.5 text-[10px] font-mono text-cyan-300 border border-cyan-800 font-semibold">
              07 SEP – 13 SEP 2026
            </span>
          </div>
          <h1 className="mt-1 text-2xl font-black text-white">
            7-Day Multi-Department Block Gantt Schedule
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Coordinated line possessions resolving engineering, signal interlocking, and traction power isolation
          </p>
        </div>

        {/* Day Selector Tabs with Explicit Dates & Today Flag */}
        <div className="flex flex-wrap rounded-xl border border-slate-800 bg-slate-950 p-1">
          {daysInfo.map(d => (
            <button
              key={d.day}
              onClick={() => {
                setSelectedDay(d.day);
                const firstDayBlock = blocks.find(b => b.dayOfWeek === d.day);
                if (firstDayBlock) setSelectedBlockId(firstDayBlock.id);
              }}
              className={`flex flex-col items-center rounded-lg px-2.5 py-1 text-xs transition-all ${
                selectedDay === d.day
                  ? 'bg-cyan-600 text-white font-bold shadow-md shadow-cyan-600/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-1">
                <span>{d.day.substring(0, 3)}</span>
                {d.isToday && (
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" title="Current Day" />
                )}
              </div>
              <span className={`text-[10px] font-mono leading-tight ${selectedDay === d.day ? 'text-cyan-100 font-semibold' : 'text-slate-500'}`}>
                {d.date}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Week & Date Operational Explanation Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-cyan-900/60 bg-cyan-950/20 px-4 py-2.5 text-xs text-cyan-200">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-cyan-400" />
          <span>
            Selected: <strong className="text-white">{selectedDay} ({currentDayInfo.date} 2026)</strong> • Week 37 of 52 (Cycle W3, September 2026)
          </span>
        </div>
        <div className="flex items-center gap-3 font-mono text-[11px]">
          <span className="text-slate-400">
            Day Possession Capacity: <strong className="text-emerald-400">{dayBlocks.length} Windows</strong>
          </span>
          <span className="text-slate-400">
            Standard Shifts: <span className="text-slate-300">10:00–16:00 (Daylight) / 23:00–04:30 (Nocturnal)</span>
          </span>
        </div>
      </div>

      {/* Main Grid: Day's Blocks Timeline (Left 2 cols) & Block Detail Inspector (Right 1 col) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left 2 Cols: Timeline Gantt */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-lg">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-slate-300">
                {selectedDay} Corridor Block Possessions ({dayBlocks.length} Scheduled)
              </span>
              <span className="text-[11px] font-mono text-slate-500">
                Click any block to inspect multi-department work details
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {dayBlocks.map(block => {
                const isSelected = block.id === activeBlock?.id;
                const bTasks = Array.isArray(block.assignedTaskIds)
                  ? tasks.filter(t => block.assignedTaskIds.includes(t.id))
                  : [];
                const hasEng = bTasks.some(t => t.department === 'ENGINEERING');
                const hasSnt = bTasks.some(t => t.department === 'SNT');
                const hasTrc = bTasks.some(t => t.department === 'TRACTION');
                const isFeatured = block.id === 'BLK-0187';

                return (
                  <div
                    key={block.id}
                    onClick={() => setSelectedBlockId(block.id)}
                    className={`cursor-pointer rounded-xl border p-4 transition-all ${
                      isSelected
                        ? 'border-cyan-500 bg-cyan-950/40 ring-1 ring-cyan-500 shadow-lg'
                        : isFeatured
                        ? 'border-cyan-700/80 bg-slate-950/90 hover:border-cyan-500'
                        : 'border-slate-800 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-cyan-400">
                          {block.id}
                        </span>
                        <span className="rounded bg-slate-800 px-2 py-0.5 font-mono text-[11px] font-bold text-slate-200">
                          {block.sectionId}
                        </span>
                        <span className="text-xs font-bold text-white">
                          {block.startTime} – {block.endTime} ({block.durationHours}h Window)
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {hasEng && (
                          <span className="rounded bg-amber-950 px-1.5 py-0.5 text-[9px] font-bold text-amber-300 border border-amber-800">
                            ENG
                          </span>
                        )}
                        {hasSnt && (
                          <span className="rounded bg-blue-950 px-1.5 py-0.5 text-[9px] font-bold text-blue-300 border border-blue-800">
                            S&amp;T
                          </span>
                        )}
                        {hasTrc && (
                          <span className="rounded bg-purple-950 px-1.5 py-0.5 text-[9px] font-bold text-purple-300 border border-purple-800">
                            TRC
                          </span>
                        )}
                        {isFeatured && (
                          <span className="rounded bg-emerald-950 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-800">
                            91 Synergy
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Mini Task Bar in this block */}
                    <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-300">
                      {bTasks.map(t => (
                        <div
                          key={t.id}
                          className="flex items-center gap-1 rounded bg-slate-900 px-2 py-1 border border-slate-800"
                        >
                          <span className="font-mono text-[10px] text-cyan-400">{t.id}</span>
                          <span className="text-[11px] truncate max-w-[160px]">{t.maintenanceType}</span>
                        </div>
                      ))}
                    </div>

                    {block.restrictions && (
                      <div className="mt-2 text-[11px] text-slate-400">
                        <span className="font-semibold text-slate-500">Conditions: </span>
                        {block.restrictions}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Selected Block Deep Inspector */}
        {activeBlock && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-cyan-800/60 bg-slate-900/95 p-5 shadow-xl">
              <div className="border-b border-slate-800 pb-3">
                <span className="font-mono text-xs font-bold text-cyan-400">
                  {activeBlock.id} BLOCK SPECIFICATION
                </span>
                <h3 className="text-base font-bold text-white mt-1">
                  {activeSection?.fromStationName} ↔ {activeSection?.toStationName}
                </h3>
                <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
                  <span>{activeBlock.dayOfWeek}</span>
                  <span>•</span>
                  <span>{activeBlock.startTime} to {activeBlock.endTime}</span>
                  <span>•</span>
                  <span className="font-bold text-cyan-300">{activeBlock.durationHours} Hours Possession</span>
                </div>
              </div>

              {/* Tasks bundled in this block */}
              <div className="mt-4">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Coordinated Department Tasks ({assignedTasks.length})
                </h4>
                <div className="space-y-2">
                  {assignedTasks.map(t => (
                    <div
                      key={t.id}
                      onClick={() => onSelectTask(t)}
                      className="cursor-pointer rounded-xl border border-slate-800 bg-slate-950/80 p-3 hover:border-cyan-500 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-cyan-400">{t.id}</span>
                        <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[9px] font-bold text-slate-300">
                          {t.department}
                        </span>
                      </div>
                      <div className="mt-1 text-xs font-semibold text-white">{t.maintenanceType}</div>
                      <div className="mt-1 text-[11px] text-slate-400">
                        Crew: {t.requiredTeam} ({t.requiredEquipment})
                      </div>
                      <div className="mt-1 text-[10px] text-amber-400 font-mono">
                        Isolation: {t.isolationRequirement}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Safety & Isolation Protocol */}
              <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold mb-1">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Certified Line Possession Protocol</span>
                </div>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  Requires Section Controller (SCOR) Caution Order No. 42 and Power Distribution SCADA isolation command for 25kV Feeder F-04.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
