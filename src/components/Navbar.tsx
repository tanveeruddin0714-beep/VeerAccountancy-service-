import React, { useState } from 'react';
import { Menu, X, MessageSquare, Phone, ArrowUpRight } from 'lucide-react';
import { useWebsiteSettings } from '../context/WebsiteSettingsContext';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const { settings } = useWebsiteSettings();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cleanWa = (settings.whatsapp || '030000196900').replace(/[^0-9]/g, '');

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'courses', label: 'Courses' },
    { id: 'practical-accounting', label: 'Practical Accounting' },
    { id: 'software', label: 'Accounting Software' },
    { id: 'admissions', label: 'Online Admissions' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0B1120]/90 backdrop-blur-md border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="group flex items-center gap-2.5 text-left focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-sky-400 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow">
            <div className="w-full h-full bg-[#0B1120] rounded-[10px] flex items-center justify-center">
              <span className="font-display font-extrabold text-cyan-400 text-lg tracking-tight">VA</span>
            </div>
          </div>
          <span className="text-xl font-bold tracking-tight text-white font-display">
            Veer Accountancy
          </span>
        </button>

        {/* Zone 2: Navigation Links (single-line, clean text with subtle active state) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
                  isActive
                    ? 'text-cyan-400 font-semibold bg-cyan-950/40 border border-cyan-800/40'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 Primary Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={`https://wa.me/${cleanWa}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-emerald-400 bg-emerald-950/30 hover:bg-emerald-950/60 border border-emerald-500/30 rounded-lg transition-colors whitespace-nowrap"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>
          <button
            onClick={() => handleNavClick('admissions')}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-lg shadow-md shadow-cyan-500/20 transition-all whitespace-nowrap"
          >
            <span>Apply Now</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors focus:outline-none"
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B1120] border-b border-slate-800 px-4 pt-3 pb-6 space-y-2 shadow-2xl">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-cyan-950/50 text-cyan-300 font-semibold border-l-4 border-cyan-400'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-800 grid grid-cols-2 gap-2">
            <a
              href={`https://wa.me/${cleanWa}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 px-3 rounded-lg text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-500/40"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
            <a
              href={`tel:${(settings.phone || '').replace(/[^0-9+]/g, '')}`}
              className="flex items-center justify-center gap-2 py-3 px-3 rounded-lg text-xs font-semibold text-cyan-300 bg-slate-800/80 border border-slate-700"
            >
              <Phone className="w-4 h-4" />
              <span>Call Us</span>
            </a>
          </div>

          <button
            onClick={() => handleNavClick('admissions')}
            className="w-full mt-2 py-3 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-md text-center"
          >
            Apply for Admission
          </button>
        </div>
      )}
    </header>
  );
};
