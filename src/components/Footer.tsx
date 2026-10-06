import React from 'react';
import { Mail, Phone, MessageSquare, ArrowRight, ShieldCheck, Lock, Database } from 'lucide-react';
import { useWebsiteSettings } from '../context/WebsiteSettingsContext';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenAdmin }) => {
  const { settings } = useWebsiteSettings();
  const handleNav = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cleanWa = (settings.whatsapp || '030000196900').replace(/[^0-9]/g, '');

  return (
    <footer className="bg-[#070C16] border-t border-slate-800 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Institute Brand & Statement */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 to-sky-400 p-0.5">
                <div className="w-full h-full bg-[#070C16] rounded-[10px] flex items-center justify-center">
                  <span className="font-display font-bold text-cyan-400 text-base">VA</span>
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-display">
                Veer Accountancy
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              Veer Accountancy is focused on practical accounting education. Our goal is to help students and learners understand accounting concepts and apply them in real-world accounting workflows using Excel and modern accounting software.
            </p>
            <div className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-1">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Job-oriented practical skills & real business workflows</span>
            </div>
          </div>

          {/* Col 2: Training Courses */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Courses</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('courses')} className="hover:text-cyan-400 transition-colors text-left">
                  Accounting Fundamentals
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('courses')} className="hover:text-cyan-400 transition-colors text-left">
                  Excel Accounting Practical
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('courses')} className="hover:text-cyan-400 transition-colors text-left">
                  QuickBooks Online Practical
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('courses')} className="hover:text-cyan-400 transition-colors text-left">
                  Xero Accounting Practical
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('courses')} className="hover:text-cyan-400 transition-colors text-left">
                  Zoho Books Practical
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('courses')} className="hover:text-cyan-400 transition-colors text-left font-medium text-cyan-300">
                  Complete Practical Accounting
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Practical Tools & Navigation */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('practical-accounting')} className="hover:text-cyan-400 transition-colors text-left">
                  Practical Accounting Workflow
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('software')} className="hover:text-cyan-400 transition-colors text-left">
                  Accounting Software Hands-on
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('admissions')} className="hover:text-cyan-400 transition-colors text-left">
                  Online Admissions Form
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-cyan-400 transition-colors text-left">
                  About Veer Accountancy
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-cyan-400 transition-colors text-left">
                  Contact & Location
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Direct Institute Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Contact Admissions</h4>
            <div className="space-y-2.5 text-xs">
              <a
                href={`https://wa.me/${cleanWa}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-slate-300 hover:text-emerald-400 transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <MessageSquare className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">WhatsApp</div>
                  <div className="font-mono text-xs">{settings.whatsapp || '+92 300 00196900'}</div>
                </div>
              </a>

              <a
                href={`tel:${(settings.phone || '').replace(/[^0-9+]/g, '')}`}
                className="flex items-center gap-2.5 text-slate-300 hover:text-cyan-400 transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">Phone Support</div>
                  <div className="font-mono text-xs">{settings.phone || '+92 300 00196900'}</div>
                </div>
              </a>

              <a
                href={`mailto:${settings.email || 'tanveeruddin0714@gmail.com'}`}
                className="flex items-center gap-2.5 text-slate-300 hover:text-cyan-400 transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-blue-950/60 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">Admissions Email</div>
                  <div className="font-mono text-xs break-all">{settings.email || 'tanveeruddin0714@gmail.com'}</div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Quiet Bottom Notice */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} Veer Accountancy. All rights reserved. Practical Accounting Education.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="text-slate-500 hover:text-cyan-400 flex items-center gap-1 transition-colors cursor-pointer"
                title="View stored student applications and inquiries"
              >
                <Lock className="w-3 h-3 text-cyan-400" />
                <span>Admin Portal</span>
              </button>
            )}
            <span>·</span>
            <span>Learn Accounting</span>
            <span>·</span>
            <span>Practice Accounting</span>
            <span>·</span>
            <span>Build Your Career</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
