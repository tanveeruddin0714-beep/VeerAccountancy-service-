import React, { useState } from 'react';
import {
  ACCOUNTING_WORKFLOW_STEPS,
  REAL_WORLD_TRANSACTIONS
} from '../data/accountingWorkflowData';
import {
  ArrowRight,
  TrendingUp,
  ShoppingBag,
  Receipt,
  Coins,
  Building2,
  Clock,
  FileCheck,
  CheckCircle2,
  FileText,
  Scale,
  Sparkles,
  BarChart3,
  Layers,
  HelpCircle,
  FileSpreadsheet
} from 'lucide-react';

export const PracticalAccountingSection: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [activeTxCategory, setActiveTxCategory] = useState<string>('all');

  const activeStep = ACCOUNTING_WORKFLOW_STEPS[activeStepIndex];

  const getTxIcon = (name: string) => {
    switch (name) {
      case 'TrendingUp': return <TrendingUp className="w-4 h-4 text-emerald-400" />;
      case 'ShoppingBag': return <ShoppingBag className="w-4 h-4 text-amber-400" />;
      case 'Receipt': return <Receipt className="w-4 h-4 text-rose-400" />;
      case 'Coins': return <Coins className="w-4 h-4 text-yellow-400" />;
      case 'Building2': return <Building2 className="w-4 h-4 text-sky-400" />;
      case 'Clock': return <Clock className="w-4 h-4 text-purple-400" />;
      case 'FileCheck': return <FileCheck className="w-4 h-4 text-cyan-400" />;
      default: return <CheckCircle2 className="w-4 h-4 text-cyan-400" />;
    }
  };

  const filteredTransactions = REAL_WORLD_TRANSACTIONS.filter((tx) => {
    if (activeTxCategory === 'all') return true;
    if (activeTxCategory === 'sales-revenue') return ['Sales', 'Customer Receivables', 'Invoices'].includes(tx.category);
    if (activeTxCategory === 'expenses-payables') return ['Purchases', 'Expenses', 'Supplier Payables', 'Bills'].includes(tx.category);
    if (activeTxCategory === 'banking-cash') return ['Cash Transactions', 'Bank Transactions', 'Bank Reconciliation'].includes(tx.category);
    return true;
  });

  return (
    <section className="py-16 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2 flex items-center justify-center gap-1.5">
            <Layers className="w-3.5 h-3.5" />
            <span>The Accounting Cycle in Action</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
            Real Accounting Workflows from Raw Receipts to Final Audit
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
            Accounting is an interconnected sequential pipeline. At Veer Accountancy, students don't just view isolated numbers; they walk transactions all the way through the 8-stage accounting cycle.
          </p>
        </div>

        {/* Visual 8-Step Interactive Pipeline Progress Bar */}
        <div className="mb-8 overflow-x-auto pb-4 pt-2">
          <div className="flex items-center min-w-[760px] lg:min-w-0 justify-between relative">
            {/* Connecting Track */}
            <div className="absolute top-5 left-6 right-6 h-0.5 bg-slate-800 -z-0" />
            <div
              className="absolute top-5 left-6 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300 -z-0"
              style={{
                width: `${(activeStepIndex / (ACCOUNTING_WORKFLOW_STEPS.length - 1)) * 100}%`
              }}
            />

            {ACCOUNTING_WORKFLOW_STEPS.map((step, idx) => {
              const isSelected = activeStepIndex === idx;
              const isCompleted = idx < activeStepIndex;

              return (
                <button
                  key={step.stepNumber}
                  onClick={() => setActiveStepIndex(idx)}
                  className="flex flex-col items-center group relative z-10 focus:outline-none"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-all duration-200 ${
                      isSelected
                        ? 'bg-cyan-500 text-slate-950 ring-4 ring-cyan-500/20 shadow-lg shadow-cyan-500/30 scale-110'
                        : isCompleted
                        ? 'bg-cyan-950 text-cyan-400 border border-cyan-500/50'
                        : 'bg-slate-900 text-slate-400 border border-slate-700 group-hover:border-slate-500'
                    }`}
                  >
                    0{step.stepNumber}
                  </div>
                  <span
                    className={`text-[11px] font-medium mt-2 whitespace-nowrap transition-colors ${
                      isSelected ? 'text-cyan-300 font-bold' : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  >
                    {step.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Stage Deep-Dive Card */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-cyan-500/30 shadow-2xl relative overflow-hidden mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Stage Left: Description & Governance (6 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded bg-cyan-950/70 border border-cyan-500/40 text-cyan-400">
                  Stage 0{activeStep.stepNumber} of 08
                </span>
                <span className="text-xs text-slate-400">·</span>
                <span className="text-xs text-slate-300 font-medium">{activeStep.documentType}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
                {activeStep.name}
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed">
                {activeStep.purpose}
              </p>

              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-cyan-500/20 text-xs">
                <div className="font-semibold text-cyan-300 mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Governing Accounting Rule:</span>
                </div>
                <div className="text-slate-300">{activeStep.keyRule}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs">
                <div className="font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Hands-on Student Practice Task:</span>
                </div>
                <div className="text-slate-400">{activeStep.practicalActivity}</div>
              </div>

              {/* Navigation stepper buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  disabled={activeStepIndex === 0}
                  onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  ← Previous Stage
                </button>
                <button
                  disabled={activeStepIndex === ACCOUNTING_WORKFLOW_STEPS.length - 1}
                  onClick={() => setActiveStepIndex((prev) => Math.min(ACCOUNTING_WORKFLOW_STEPS.length - 1, prev + 1))}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
                >
                  <span>Next Stage</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Stage Right: Concrete Example Voucher (5 cols) */}
            <div className="lg:col-span-5 bg-slate-950/90 rounded-xl p-5 border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider">
                  Live Artifact Voucher
                </span>
                <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60 font-mono">
                  Verified Data
                </span>
              </div>

              <div>
                <div className="text-xs font-bold text-white mb-1">{activeStep.exampleData.title}</div>
                <div className="text-xs text-slate-300 leading-relaxed">{activeStep.exampleData.details}</div>
              </div>

              {/* Audit Note */}
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
                <span className="text-cyan-300 font-medium">Workflow Note: </span>
                {activeStep.exampleData.notes}
              </div>
            </div>
          </div>
        </div>

        {/* Real-World Business Transaction Examples */}
        <div className="mt-14">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1">
                Real Commercial Scenarios
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
                Realistic Business Transactions Students Execute
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                Students practice accounting using real-world business transactions—never dry textbook formulas. Here is a breakdown of transaction types practiced in our courses:
              </p>
            </div>

            {/* Transaction Category Filter Tabs */}
            <div className="flex items-center gap-1 p-1 bg-slate-900/80 rounded-xl border border-slate-800">
              {[
                { id: 'all', label: 'All Transactions' },
                { id: 'sales-revenue', label: 'Sales & Receivables' },
                { id: 'expenses-payables', label: 'Purchases & Payables' },
                { id: 'banking-cash', label: 'Cash & Banking' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTxCategory(tab.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                    activeTxCategory === tab.id
                      ? 'bg-cyan-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Transactions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredTransactions.map((tx) => (
              <div
                key={tx.id}
                className="glass-panel rounded-xl p-4 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="p-1.5 rounded-lg bg-slate-800/80">
                      {getTxIcon(tx.iconName)}
                    </span>
                    <span className="text-[11px] font-mono text-cyan-400">{tx.category}</span>
                  </div>

                  <h4 className="text-sm font-bold text-white mb-1.5">{tx.description}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    {tx.scenario}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
                  <span className="text-cyan-300 font-medium">Accounting Impact: </span>
                  <span>{tx.workflowNotes}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Practical Accounting Desk Photography Banner */}
        <div className="mt-14 relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
          <img
            src="/src/assets/images/practical_accounting_workflow_1791195121347.jpg"
            alt="Veer Accountancy practical workstation with financial ledgers, balance sheets, and audit reports"
            className="w-full h-64 sm:h-80 object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1120] via-slate-900/80 to-transparent p-6 sm:p-10 flex flex-col justify-center max-w-2xl">
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">
              Practicing Real Bookkeeping
            </span>
            <h4 className="text-xl sm:text-2xl font-bold text-white font-display mb-2">
              From Raw Bills to Audit-Ready Financial Statements
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We teach accounting the way it is actually executed inside modern enterprises: structured charts of accounts, error reconciliation, and period-end close routines that employers and clients rely upon.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
