import React from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  Clock,
  Radio,
  Truck,
  RotateCcw,
  Sliders,
} from 'lucide-react';
import { EmergencyPlanResult } from '../../services/digitalTwinService';

interface EmergencyModeViewProps {
  isEmergencyActive: boolean;
  emergencyPlan: EmergencyPlanResult | null;
  onToggleEmergency: () => void;
  onSelectView: (viewId: string) => void;
}

export const EmergencyModeView: React.FC<EmergencyModeViewProps> = ({
  isEmergencyActive,
  emergencyPlan,
  onToggleEmergency,
  onSelectView,
}) => {
  return (
    <div id="view-emergency-mode" className="space-y-6">
      {/* Title */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-red-900/80 bg-red-950/20 p-5 shadow-lg md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-red-400">
            <AlertOctagon className="h-4 w-4" />
            <span>EMERGENCY DISASTER RECOVERY &amp; SIGNAL RESTORATION</span>
          </div>
          <h1 className="mt-1 text-2xl font-black text-white">
            Emergency Unscheduled Maintenance Mode
          </h1>
          <p className="mt-1 text-xs text-slate-300">
            Instantaneous section isolation, priority flying squad dispatch, and automated timetable replanning
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleEmergency}
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-black tracking-wider transition-all active:scale-95 ${
              isEmergencyActive
                ? 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                : 'bg-red-600 text-white shadow-lg shadow-red-600/40 hover:bg-red-500 animate-pulse'
            }`}
          >
            <AlertTriangle className="h-4 w-4" />
            <span>{isEmergencyActive ? 'STAND DOWN EMERGENCY MODE' : 'TRIGGER SEC012 SIGNAL FAILURE'}</span>
          </button>
        </div>
      </div>

      {/* Incident Status Banner */}
      <div
        className={`rounded-2xl border p-5 transition-all ${
          isEmergencyActive
            ? 'border-red-600 bg-gradient-to-r from-red-950/60 via-slate-900 to-red-950/40 shadow-2xl'
            : 'border-slate-800 bg-slate-900/90'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span
              className={`rounded px-2 py-0.5 text-xs font-mono font-bold ${
                isEmergencyActive
                  ? 'bg-red-600 text-white animate-pulse'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              {isEmergencyActive ? 'ACTIVE CORRIDOR INCIDENT' : 'SIMULATION STANDBY'}
            </span>
            <span className="font-bold text-white text-sm">
              Critical Automatic Signal Failure: SEC012 (Nemilichery ↔ Tiruninravur)
            </span>
          </div>

          <div className="font-mono text-xs text-slate-400">
            Asset Target: <span className="font-bold text-white">SIG-SEC012-001</span>
          </div>
        </div>

        {/* 4 Step Immediate Emergency Action Protocol */}
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-red-900/60 bg-slate-950 p-3.5">
            <div className="flex items-center justify-between text-xs text-red-400 font-bold">
              <span>1. EMERGENCY BLOCK</span>
              <Clock className="h-4 w-4" />
            </div>
            <div className="mt-1.5 text-sm font-bold text-white">BLK-EMERG-012</div>
            <p className="mt-1 text-[11px] text-slate-400">
              Immediate 90-minute line possession granted by Chief Controller
            </p>
          </div>

          <div className="rounded-xl border border-red-900/60 bg-slate-950 p-3.5">
            <div className="flex items-center justify-between text-xs text-red-400 font-bold">
              <span>2. FLYING SQUAD</span>
              <Truck className="h-4 w-4" />
            </div>
            <div className="mt-1.5 text-sm font-bold text-white">S&amp;T Flying Squad S02</div>
            <p className="mt-1 text-[11px] text-slate-400">
              Dispatched with Mobile Signal Calibration Kit STK-02
            </p>
          </div>

          <div className="rounded-xl border border-red-900/60 bg-slate-950 p-3.5">
            <div className="flex items-center justify-between text-xs text-red-400 font-bold">
              <span>3. CAUTION ORDER</span>
              <ShieldAlert className="h-4 w-4" />
            </div>
            <div className="mt-1.5 text-sm font-bold text-white">15 km/h Speed Restriction</div>
            <p className="mt-1 text-[11px] text-slate-400">
              Piloting through section under manual hand signalling
            </p>
          </div>

          <div className="rounded-xl border border-red-900/60 bg-slate-950 p-3.5">
            <div className="flex items-center justify-between text-xs text-red-400 font-bold">
              <span>4. TASKS DEFERRED</span>
              <Radio className="h-4 w-4" />
            </div>
            <div className="mt-1.5 text-sm font-bold text-white">ENG-0112 Deferred</div>
            <p className="mt-1 text-[11px] text-slate-400">
              Routine drainage patrol pushed to tomorrow to clear track
            </p>
          </div>
        </div>

        {/* Detailed Caution Order Dispatch Ledger */}
        <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950 p-4 text-xs">
          <div className="font-bold text-amber-400 mb-1">
            Official Section Controller Message Broadcast:
          </div>
          <p className="font-mono text-slate-300 leading-relaxed">
            {emergencyPlan?.corridorCautionOrder ||
              'SPEED LIMIT 15 KM/H BETWEEN NEMILICHERY AND TIRUNINRAVUR (SEC012) UNTIL AUTOMATIC SIGNAL AS-12 ASPECT VERIFIED.'}
          </p>
          <div className="mt-2 text-[10px] text-slate-500">
            Safety Protocol: G&amp;SR Rule 3.75 (Automatic Signalling Failure Operation) • Interlocked
          </div>
        </div>
      </div>
    </div>
  );
};
