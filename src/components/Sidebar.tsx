import React from 'react';
import {
  LayoutDashboard,
  Network,
  Database,
  Wrench,
  ShieldAlert,
  Cpu,
  Sparkles,
  TrainTrack,
  Radar,
  Users,
  Sliders,
  CalendarDays,
  CalendarRange,
  Binary,
  AlertOctagon,
  HelpCircle,
  BarChart3,
  GitBranch,
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onSelectView: (viewId: string) => void;
  opportunitiesCount?: number;
  conflictsCount?: number;
  isEmergencyActive?: boolean;
}

export const NAV_ITEMS = [
  { id: 'command-center', num: '01', label: 'COMMAND CENTER', icon: LayoutDashboard },
  { id: 'network', num: '02', label: 'NETWORK', icon: Network, badge: '36 Stns' },
  { id: 'data-integration', num: '03', label: 'DATA INTEGRATION', icon: Database, badge: '7 Feeds' },
  { id: 'maintenance', num: '04', label: 'MAINTENANCE', icon: Wrench, badge: '165 Tasks' },
  { id: 'asset-risk', num: '05', label: 'ASSET RISK', icon: ShieldAlert, badge: '140 Assets' },
  { id: 'ai-criticality', num: '06', label: 'AI CRITICALITY', icon: Cpu },
  { id: 'opportunities', num: '07', label: 'MAINTENANCE OPPORTUNITIES', icon: Sparkles, badge: 'Bundles', highlight: true },
  { id: 'train-impact', num: '08', label: 'TRAIN IMPACT', icon: TrainTrack },
  { id: 'conflict-radar', num: '09', label: 'CONFLICT RADAR', icon: Radar, badgeAlert: true },
  { id: 'resource-intelligence', num: '10', label: 'RESOURCE INTELLIGENCE', icon: Users, badge: '60 Res' },
  { id: 'block-optimization', num: '11', label: 'BLOCK OPTIMIZATION', icon: Sliders, badge: 'CP-SAT' },
  { id: 'weekly-plan', num: '12', label: 'WEEKLY PLAN', icon: CalendarDays },
  { id: 'monthly-plan', num: '13', label: 'MONTHLY PLAN', icon: CalendarRange },
  { id: 'digital-twin', num: '14', label: 'DIGITAL TWIN', icon: Binary, badge: 'What-If' },
  { id: 'emergency-mode', num: '15', label: 'EMERGENCY MODE', icon: AlertOctagon, dangerBadge: true },
  { id: 'explainability', num: '16', label: 'EXPLAINABILITY', icon: HelpCircle },
  { id: 'benchmark', num: '17', label: 'BENCHMARK', icon: BarChart3, badge: 'Before/After' },
  { id: 'system-architecture', num: '18', label: 'SYSTEM ARCHITECTURE', icon: GitBranch },
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  onSelectView,
  opportunitiesCount = 24,
  conflictsCount = 3,
  isEmergencyActive = false,
}) => {
  return (
    <aside
      id="railoptx-sidebar"
      className="flex w-64 shrink-0 flex-col border-r border-slate-800 bg-slate-950/95 text-slate-300"
    >
      <div className="border-b border-slate-800/80 px-4 py-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold tracking-wider text-slate-400">OPERATIONAL MODULES</span>
          <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] font-mono text-slate-300">18 APIS</span>
        </div>
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-slate-800">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          const isEmergencyItem = item.id === 'emergency-mode' && isEmergencyActive;

          return (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              onClick={() => onSelectView(item.id)}
              className={`group flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-xs transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-600/30 to-blue-600/20 text-cyan-300 font-semibold border-l-2 border-cyan-400 shadow-sm shadow-cyan-950'
                  : isEmergencyItem
                  ? 'bg-red-950/50 text-red-400 font-semibold border-l-2 border-red-500 animate-pulse'
                  : 'text-slate-400 hover:bg-slate-900/80 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <span className={`font-mono text-[10px] ${isActive ? 'text-cyan-400' : 'text-slate-500'}`}>
                  {item.num}
                </span>
                <Icon
                  className={`h-4 w-4 shrink-0 transition-colors ${
                    isActive
                      ? 'text-cyan-400'
                      : isEmergencyItem
                      ? 'text-red-400'
                      : 'text-slate-500 group-hover:text-slate-300'
                  }`}
                />
                <span className="truncate tracking-wide">{item.label}</span>
              </div>

              {/* Badges */}
              <div>
                {item.id === 'opportunities' && (
                  <span className="rounded bg-emerald-950 px-1.5 py-0.5 text-[10px] font-mono font-bold text-emerald-400 border border-emerald-800">
                    {opportunitiesCount}
                  </span>
                )}
                {item.id === 'conflict-radar' && conflictsCount > 0 && (
                  <span className="rounded bg-amber-950 px-1.5 py-0.5 text-[10px] font-mono font-bold text-amber-400 border border-amber-800">
                    {conflictsCount}
                  </span>
                )}
                {item.id === 'emergency-mode' && isEmergencyActive && (
                  <span className="rounded bg-red-950 px-1.5 py-0.5 text-[10px] font-mono font-bold text-red-400 border border-red-800">
                    ALERT
                  </span>
                )}
                {!['opportunities', 'conflict-radar'].includes(item.id) && item.badge && !isEmergencyItem && (
                  <span className="rounded bg-slate-900 px-1.5 py-0.5 text-[9px] font-mono text-slate-500 border border-slate-800">
                    {item.badge}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </nav>

      {/* Corridor Division footer indicator */}
      <div className="border-t border-slate-800/80 p-3 text-[11px] text-slate-500">
        <div className="flex justify-between">
          <span>Southern Railway (SR)</span>
          <span className="font-mono text-slate-400">MAS / GTL</span>
        </div>
        <div className="mt-1 flex items-center justify-between text-[10px] text-slate-600">
          <span>Engine: CP-SAT Heuristic</span>
          <span className="text-emerald-500 font-semibold">ONLINE</span>
        </div>
      </div>
    </aside>
  );
};
