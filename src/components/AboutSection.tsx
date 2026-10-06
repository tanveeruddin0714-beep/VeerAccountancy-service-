import React from 'react';
import {
  Target,
  FileSpreadsheet,
  CheckCircle2,
  Briefcase,
  Layers,
  ArrowRight,
  ShieldCheck,
  Compass
} from 'lucide-react';

interface AboutSectionProps {
  onApplyClick: () => void;
  onExploreCourses: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onApplyClick,
  onExploreCourses
}) => {
  return (
    <section className="py-16 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Tag & Main Quote */}
        <div className="max-w-4xl mx-auto text-center mb-14">
          <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-3 flex items-center justify-center gap-1.5">
            <Compass className="w-3.5 h-3.5" />
            <span>Our Educational Purpose</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight text-balance">
            Dedicated Exclusively to Practical Accounting Education
          </h2>

          <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-cyan-500/30 text-base sm:text-lg text-slate-200 leading-relaxed font-medium shadow-2xl relative">
            <div className="text-3xl text-cyan-400 font-serif leading-none absolute -top-3 left-6 bg-[#0B1120] px-2">“</div>
            <p className="italic">
              Veer Accountancy is focused on practical accounting education. Our goal is to help students and learners understand accounting concepts and apply them in real-world accounting workflows using Excel and modern accounting software.
            </p>
          </div>
        </div>

        {/* Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {/* Pillar 1 */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 hover:border-cyan-500/40 transition-colors space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/70 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white font-display">Practical Learning</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We eliminate passive rote memorization. Instead of writing theoretical notes on a blackboard, learners execute actual double-entry postings, trial balances, and adjustments directly from source documents.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 hover:border-cyan-500/40 transition-colors space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/70 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white font-display">Real-World Accounting Exercises</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Training exercises replicate what accountants face in everyday business: dealing with messy invoices, resolving bank reconciliation discrepancies, handling unpaid client bills, and filing accurate reports.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 hover:border-cyan-500/40 transition-colors space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-950/70 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white font-display">Excel Accounting Mastery</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Every financial analyst and accountant requires strong spreadsheet capability. You construct dynamic, automated general ledgers and self-checking trial balances from scratch using robust formulas.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 hover:border-cyan-500/40 transition-colors space-y-3">
            <div className="w-10 h-10 rounded-xl bg-green-950/70 border border-green-500/30 flex items-center justify-center text-green-400">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white font-display">QuickBooks Online & Xero</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Gain confidence across the leading cloud accounting systems utilized across North America, Europe, Australia, and the Middle East for small and medium enterprise bookkeeping and remote work.
            </p>
          </div>

          {/* Pillar 5 */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 hover:border-cyan-500/40 transition-colors space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-950/70 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white font-display">Zoho Books Administration</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Learn one of the fastest expanding multi-currency, automation-friendly business accounting platforms to serve corporate clients requiring integrated sales and expense pipelines.
            </p>
          </div>

          {/* Pillar 6 */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 hover:border-cyan-500/40 transition-colors space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-950/70 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white font-display">Job-Oriented Skills</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Our training is designed to translate into practical workplace ability. When hired as an accountant, bookkeeper, or finance assistant, you will immediately know how to operate and produce financial outputs.
            </p>
          </div>
        </div>

        {/* Practical Training Philosophy Comparison */}
        <div className="glass-panel rounded-2xl p-6 sm:p-9 border border-slate-800">
          <h3 className="text-xl sm:text-2xl font-bold text-white font-display mb-6 text-center">
            How Our Approach Differs from Traditional Theory Classes
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Traditional Theory Column */}
            <div className="p-5 rounded-xl bg-slate-950/60 border border-rose-500/20 space-y-3">
              <div className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                Conventional Theory Classes
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-mono">✕</span>
                  <span>Memorizing definitions without seeing raw source documents</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-mono">✕</span>
                  <span>Writing hypothetical T-accounts with pen and paper only</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-mono">✕</span>
                  <span>Zero hands-on exposure to cloud accounting software or bank feeds</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-mono">✕</span>
                  <span>Inability to perform month-end reconciliations or software exports</span>
                </li>
              </ul>
            </div>

            {/* Veer Accountancy Column */}
            <div className="p-5 rounded-xl bg-slate-950/60 border border-emerald-500/30 space-y-3">
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Veer Accountancy Practical Method
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-mono">✓</span>
                  <span>Working directly with real commercial invoices, bills, and bank statements</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-mono">✓</span>
                  <span>Building automated general ledgers and trial balances in Microsoft Excel</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-mono">✓</span>
                  <span>Configuring charts of accounts and live transactions in QuickBooks, Xero & Zoho</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-mono">✓</span>
                  <span>Graduating with verifiable, job-ready practical competency</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-400">
              Ready to learn accounting through direct hands-on practice?
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={onExploreCourses}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                Browse Our 6 Courses
              </button>
              <button
                onClick={onApplyClick}
                className="px-5 py-2 rounded-lg text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 transition-all flex items-center gap-1.5"
              >
                <span>Apply for Admission</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
