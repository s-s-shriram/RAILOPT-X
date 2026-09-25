import React, { useState } from 'react';
import {
  Database,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Server,
  Layers,
  FileCheck,
  ShieldCheck,
  Cpu,
  ArrowRight,
} from 'lucide-react';
import { SystemDataIntegrationStatus } from '../../types';

interface DataIntegrationViewProps {
  onRunOptimization: () => void;
  onSelectView: (viewId: string) => void;
}

export const DataIntegrationView: React.FC<DataIntegrationViewProps> = ({
  onRunOptimization,
  onSelectView,
}) => {
  const [isValidating, setIsValidating] = useState(false);
  const [dataQualityScore, setDataQualityScore] = useState(98.4);
  const [validationSuccess, setValidationSuccess] = useState(true);

  const feeds = [
    {
      id: 'TMS',
      name: 'Track Management System (TMS)',
      dept: 'ENGINEERING',
      records: '140 Assets, 65 Maintenance Requests',
      status: 'Connected & Validated',
      latency: '24ms',
      lastSync: '10:42:15',
    },
    {
      id: 'SMMS',
      name: 'Signalling Maintenance & Management System (SMMS)',
      dept: 'S&T',
      records: '48 Signal Controllers, 52 Disconnection Requests',
      status: 'Connected & Validated',
      latency: '18ms',
      lastSync: '10:42:12',
    },
    {
      id: 'TDMS',
      name: 'Traction Distribution Management System (TDMS)',
      dept: 'TRACTION',
      records: '46 OHE Sectors, 48 Power Block Requisitions',
      status: 'Connected & Validated',
      latency: '31ms',
      lastSync: '10:42:10',
    },
    {
      id: 'COA',
      name: 'Control Office Application (COA)',
      dept: 'OPERATIONS',
      records: '175 Corridor Windows, Speed Restrictions',
      status: 'Connected & Validated',
      latency: '15ms',
      lastSync: '10:42:18',
    },
    {
      id: 'TIMETABLE',
      name: 'Passenger Train Timetable Feeds (National)',
      dept: 'TRAFFIC',
      records: '280 Daily Train Movements (Mail/Express/EMU)',
      status: 'Loaded & Synchronized',
      latency: '40ms',
      lastSync: '10:40:00',
    },
    {
      id: 'FREIGHT',
      name: 'Goods Train Forecast & FOIS Corridor Rakes',
      dept: 'COMMERCIAL',
      records: '35 Daily Freight Forecasts & Rake Headways',
      status: 'Loaded & Synchronized',
      latency: '52ms',
      lastSync: '10:41:00',
    },
    {
      id: 'RESOURCES',
      name: 'Resource Fleet Registry (CREWS & MACHINES)',
      dept: 'DEPOTS',
      records: '60 Resources (Teams, Tampers, Tower Wagons, STKs)',
      status: 'Loaded & Ready',
      latency: '12ms',
      lastSync: '10:42:00',
    },
  ];

  const validationLedger = [
    { rule: 'Missing or null Asset IDs in task requests', result: 'PASSED', count: 0 },
    { rule: 'Invalid or orphaned Section ID references', result: 'PASSED', count: 0 },
    { rule: 'Impossible maintenance duration (> block maximum)', result: 'PASSED', count: 0 },
    { rule: 'Temporal conflicts between concurrent gang bookings', result: 'DETECTED & MITIGATED', count: 2 },
    { rule: 'Missing OHE traction power isolation tags on catenary tasks', result: 'AUTO-TAGGED', count: 1 },
    { rule: 'Duplicate maintenance task submissions across divisions', result: 'PASSED', count: 0 },
  ];

  const handleValidate = () => {
    setIsValidating(true);
    setTimeout(() => {
      setIsValidating(false);
      setDataQualityScore(99.2);
      setValidationSuccess(true);
    }, 800);
  };

  return (
    <div id="view-data-integration" className="space-y-6">
      {/* Title */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-lg md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
            <Database className="h-4 w-4" />
            <span>ENTERPRISE RAILWAY DATA INGESTION</span>
          </div>
          <h1 className="mt-1 text-2xl font-black text-white">
            Unified Railway Planning Data Model
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Automated ingestion, deduplication, and cross-department normalization across Indian Railways legacy subsystems
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleValidate}
            disabled={isValidating}
            className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-bold text-slate-200 hover:bg-slate-700 disabled:opacity-50 transition-all"
          >
            <RefreshCw className={`h-4 w-4 ${isValidating ? 'animate-spin text-cyan-400' : ''}`} />
            <span>{isValidating ? 'Validating Dataset...' : 'Validate Dataset'}</span>
          </button>

          <button
            onClick={() => {
              handleValidate();
              onRunOptimization();
              onSelectView('block-optimization');
            }}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-cyan-500/25 hover:brightness-110 active:scale-95 transition-all"
          >
            <FileCheck className="h-4 w-4" />
            <span>GENERATE UNIFIED PLANNING DATASET</span>
          </button>
        </div>
      </div>

      {/* Quality Score & Pipeline Header Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-emerald-900/60 bg-emerald-950/20 p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-semibold">DATA QUALITY SCORE</span>
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="mt-2 text-3xl font-black text-emerald-400">
            {dataQualityScore}%
          </div>
          <p className="mt-1 text-[11px] text-slate-400">
            Fully validated across 36 stations, 35 sections, and 165 maintenance requests
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-semibold">INGESTED DATA FEEDS</span>
            <Server className="h-4 w-4 text-cyan-400" />
          </div>
          <div className="mt-2 text-3xl font-black text-white">
            7 / 7 Online
          </div>
          <p className="mt-1 text-[11px] text-slate-400">
            All primary departmental endpoints streaming synthetic demonstration telemetry
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-semibold">CROSS-DEPT INTEGRITY</span>
            <Layers className="h-4 w-4 text-purple-400" />
          </div>
          <div className="mt-2 text-3xl font-black text-purple-400">
            Zero Hard Anomalies
          </div>
          <p className="mt-1 text-[11px] text-slate-400">
            Ready for CP-SAT constraint satisfaction optimization pipeline
          </p>
        </div>
      </div>

      {/* 7 Enterprise Feeds Status Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-lg">
        <h2 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
          <Server className="h-4 w-4 text-cyan-400" />
          Enterprise Subsystem Integration Monitors
        </h2>

        <div className="space-y-2">
          {feeds.map(feed => (
            <div
              key={feed.id}
              className="flex flex-col justify-between gap-2 rounded-xl border border-slate-800 bg-slate-950/70 p-3.5 transition-all sm:flex-row sm:items-center"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-900 font-mono text-xs font-bold text-cyan-400 border border-slate-800">
                  {feed.id}
                </span>
                <div>
                  <div className="font-bold text-xs text-white flex items-center gap-2">
                    {feed.name}
                    <span className="rounded bg-slate-800 px-1.5 py-0.2 text-[9px] font-mono text-slate-400">
                      {feed.dept}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{feed.records}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs">
                <div className="text-right">
                  <div className="text-[10px] text-slate-500">Latency: {feed.latency}</div>
                  <div className="text-[10px] text-slate-400 font-mono">Synced {feed.lastSync}</div>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-emerald-950 px-3 py-1 font-semibold text-emerald-400 border border-emerald-800 text-[11px]">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>{feed.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Data Validation Ledger & Integrity Rules */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-lg">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
          Pre-Optimization Data Validation Ledger
        </h3>
        <div className="divide-y divide-slate-800 text-xs">
          {validationLedger.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between py-2.5">
              <span className="text-slate-300">{item.rule}</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-slate-500 text-[11px]">({item.count} issues)</span>
                <span
                  className={`rounded px-2 py-0.5 font-mono text-[10px] font-bold ${
                    item.result === 'PASSED'
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      : 'bg-amber-950 text-amber-400 border border-amber-800'
                  }`}
                >
                  {item.result}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
