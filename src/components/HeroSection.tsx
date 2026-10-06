import React from 'react';
import { BookOpen, MessageSquare, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Hero3DBackground } from './Hero3DBackground';

interface HeroSectionProps {
  onApplyClick: () => void;
  onViewCoursesClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onApplyClick,
  onViewCoursesClick
}) => {
  return (
    <section className="relative overflow-hidden pt-14 pb-20 sm:pt-24 sm:pb-28">
      {/* Gentle 3D Moving Perspective Wave & Orbit Background */}
      <Hero3DBackground />

      {/* Ambient Gradient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[480px] bg-gradient-to-tr from-cyan-600/10 via-sky-500/10 to-transparent blur-[140px] pointer-events-none z-0" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Top Tagline */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs text-cyan-300 backdrop-blur-md shadow-lg shadow-cyan-950/40 mb-8">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="font-semibold tracking-wide">Veer Accountancy Training Institute</span>
          <span className="text-slate-600">·</span>
          <span className="text-slate-400">Practical Accounting & Software Education</span>
        </div>

        {/* Main Headline */}
        <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.12] text-balance mb-6">
          Learn Accounting.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">
            Practice Accounting.
          </span>{' '}
          Build Your Career.
        </h1>

        {/* Short Description */}
        <p className="text-base sm:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto mb-10 text-balance font-normal">
          Students don't only learn theoretical debits & credits — they actually perform hands-on practical accounting work using Excel and modern accounting software.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button
            onClick={onApplyClick}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-xl shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Apply for Admission</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onViewCoursesClick}
            className="w-full sm:w-auto px-7 py-4 rounded-xl font-semibold text-sm text-slate-200 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/50 shadow-md backdrop-blur-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span>View Courses</span>
          </button>

          <a
            href="https://wa.me/9230000196900"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-7 py-4 rounded-xl font-semibold text-sm text-emerald-300 hover:text-emerald-200 bg-emerald-950/40 hover:bg-emerald-950/70 border border-emerald-500/40 shadow-md backdrop-blur-md transition-all flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp Us</span>
          </a>
        </div>

        {/* Practical Features Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs sm:text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <span>Hands-on Excel Accounting</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <span>QuickBooks Online</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <span>Xero Accounting</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <span>Zoho Books</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <span>Real Business Transactions</span>
          </div>
        </div>
      </div>
    </section>
  );
};
