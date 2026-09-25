import React from 'react';
import { AlertCircle } from 'lucide-react';

export const DisclaimerFooter: React.FC = () => {
  return (
    <footer id="railoptx-disclaimer-footer" className="w-full border-t border-slate-800 bg-slate-950/90 px-4 py-3 text-xs text-slate-400 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0 text-amber-400" />
          <p className="leading-relaxed">
            <span className="font-semibold text-slate-300">Official Demonstration Prototype:</span> RAILOPT-X is a research/prototype decision-support system using synthetic data. Real railway deployment requires validated operational data, railway-domain validation, safety procedures, authorization, approved system integration and human operational approval.
          </p>
        </div>
        <div className="hidden shrink-0 items-center gap-2 text-slate-500 sm:flex">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Decision-Support System</span>
        </div>
      </div>
    </footer>
  );
};
