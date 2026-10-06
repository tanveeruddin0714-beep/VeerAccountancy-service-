import React, { useState } from 'react';
import { SOFTWARE_DATA } from '../data/softwareData';
import {
  FileSpreadsheet,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Layers,
  Database,
  Building,
  RefreshCw,
  FolderKanban,
  Check
} from 'lucide-react';

export const SoftwareSection: React.FC = () => {
  const [activeSoftwareId, setActiveSoftwareId] = useState<string>('excel');

  const currentSoftware = SOFTWARE_DATA.find((s) => s.id === activeSoftwareId) || SOFTWARE_DATA[0];

  return (
    <section className="py-16 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2 flex items-center justify-center gap-1.5">
            <Database className="w-3.5 h-3.5" />
            <span>Modern Accounting Software Training</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
            Hands-on Mastery of Industry-Standard Tools
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
            Theoretical knowledge alone will not prepare you for accounting roles. At Veer Accountancy, you work directly inside Microsoft Excel, QuickBooks Online, Xero, and Zoho Books.
          </p>
        </div>

        {/* Software Navigation Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {SOFTWARE_DATA.map((sw) => {
            const isActive = activeSoftwareId === sw.id;
            return (
              <button
                key={sw.id}
                onClick={() => setActiveSoftwareId(sw.id)}
                className={`p-4 rounded-xl text-left transition-all border ${
                  isActive
                    ? 'bg-slate-900 border-cyan-400/60 shadow-lg shadow-cyan-950/40'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-mono font-semibold ${isActive ? 'text-cyan-400' : 'text-slate-400'}`}>
                    {sw.badge}
                  </span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-cyan-400" />}
                </div>
                <div className="font-bold text-white text-base tracking-tight">{sw.name}</div>
              </button>
            );
          })}
        </div>

        {/* Main Software Deep-Dive View */}
        <div className="glass-panel rounded-2xl p-6 sm:p-9 border border-cyan-500/25 shadow-2xl space-y-10">
          {/* Top Overview Bar */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-8 border-b border-slate-800">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-2 text-xs font-semibold px-2.5 py-1 rounded-md bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">
                <span>Practical Platform</span>
                <span>·</span>
                <span>{currentSoftware.badge}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
                {currentSoftware.name}
              </h3>
              <p className="text-sm sm:text-base text-cyan-300 font-medium">
                {currentSoftware.tagline}
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                {currentSoftware.description}
              </p>
            </div>

            {/* Software Visual Mock Card */}
            <div className="w-full lg:w-80 p-4 rounded-xl bg-slate-950/90 border border-slate-800 shadow-xl space-y-3 shrink-0">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
                <span className="font-mono text-cyan-400 font-bold uppercase">{currentSoftware.name}</span>
                <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded font-mono">Live Workflow</span>
              </div>

              {activeSoftwareId === 'excel' && (
                <div className="space-y-2 text-xs font-mono">
                  <div className="text-[11px] text-slate-300">
                    <span className="text-emerald-400 font-bold">Grid:</span> Automated 12-Col Sheet
                  </div>
                  <div className="p-2 rounded bg-slate-900 border border-slate-800 text-[11px] text-cyan-300">
                    =SUMIFS(Debits, Acct,"1010") - SUMIFS(Credits, Acct,"1010")
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>Trial Balance Check:</span>
                    <span className="text-emerald-400 font-bold">$0.00 Diff</span>
                  </div>
                </div>
              )}

              {activeSoftwareId === 'quickbooks' && (
                <div className="space-y-2 text-xs font-mono">
                  <div className="text-[11px] text-slate-300">
                    <span className="text-green-400 font-bold">Banking:</span> 14 New Transactions
                  </div>
                  <div className="p-2 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
                    <div className="text-green-300">Rule: Wire from Apex Logistics</div>
                    <div className="text-[10px] text-slate-400">Match to Invoice #INV-1024</div>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>A/R Status:</span>
                    <span className="text-cyan-400 font-bold">Cleared to Bank</span>
                  </div>
                </div>
              )}

              {activeSoftwareId === 'xero' && (
                <div className="space-y-2 text-xs font-mono">
                  <div className="text-[11px] text-slate-300">
                    <span className="text-sky-400 font-bold">Reconcile:</span> Side-by-Side Match
                  </div>
                  <div className="p-2 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
                    <div className="text-sky-300">Statement Line: $1,250.00</div>
                    <div className="text-[10px] text-slate-400">Match: Bill #419 Prime Supply</div>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>Discrepancy:</span>
                    <span className="text-emerald-400 font-bold">$0.00 (OK)</span>
                  </div>
                </div>
              )}

              {activeSoftwareId === 'zohobooks' && (
                <div className="space-y-2 text-xs font-mono">
                  <div className="text-[11px] text-slate-300">
                    <span className="text-amber-400 font-bold">Invoicing:</span> Multi-Currency Hub
                  </div>
                  <div className="p-2 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
                    <div className="text-amber-300">Sales Order #SO-052</div>
                    <div className="text-[10px] text-slate-400">Converted to Tax Invoice with terms</div>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>Tax Engine:</span>
                    <span className="text-emerald-400 font-bold">Compliant</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Practical 4-Stage Software Workflow */}
          <div>
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <FolderKanban className="w-4 h-4" />
              <span>Step-by-Step Practical Workflow in {currentSoftware.name}:</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {currentSoftware.practicalWorkflow.map((stage, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between"
                >
                  <div>
                    <div className="text-xs font-mono font-bold text-cyan-300 mb-2">{stage.stage}</div>
                    <p className="text-xs text-slate-300 leading-relaxed mb-3">{stage.action}</p>
                  </div>
                  <div className="pt-2.5 border-t border-slate-800/80 text-[11px]">
                    <span className="text-slate-400">Deliverable: </span>
                    <span className="text-emerald-400 font-medium">{stage.deliverable}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Features vs Real Practical Exercises Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
            {/* Core Features Taught */}
            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Core Software Capabilities Taught:</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {currentSoftware.coreFeatures.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2">
                    <span className="text-cyan-400 font-mono">•</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Practical Student Exercises */}
            <div className="p-5 rounded-xl bg-slate-950/60 border border-cyan-500/20">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                <span>Real Exercises Students Complete:</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {currentSoftware.practicalExercises.map((ex, eIdx) => (
                  <li key={eIdx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{ex}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Laptop Cloud Accounting Showcase */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
            <img
              src="/src/assets/images/software_cloud_accounting_1791195133627.jpg"
              alt="Cloud accounting software on laptop screen with invoices, bank reconciliation, and cash flow charts"
              className="w-full h-72 sm:h-80 object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
              Cross-Software Versatility
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
              Why We Train on All 4 Platforms
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              In the real accounting job market and remote freelance economy, clients use different platforms based on their region and size. While American and Canadian clients often choose QuickBooks Online, European and Australasian companies frequently standardize on Xero, fast-growing global startups leverage Zoho Books, and every accounting team worldwide relies on Excel for custom analysis.
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Veer Accountancy ensures you become confident across all 4 environments, making your accounting resume highly marketable.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
