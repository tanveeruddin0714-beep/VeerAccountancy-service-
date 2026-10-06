import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { CoursesSection } from './components/CoursesSection';
import { PracticalAccountingSection } from './components/PracticalAccountingSection';
import { SoftwareSection } from './components/SoftwareSection';
import { AdmissionsSection } from './components/AdmissionsSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { AdminPortalModal } from './components/AdminPortalModal';
import { WebsiteSettingsProvider, useWebsiteSettings } from './context/WebsiteSettingsContext';
import { MessageSquare, ArrowUp, Phone, Mail, Megaphone } from 'lucide-react';

function MainApp() {
  const { settings } = useWebsiteSettings();
  const [activeTab, setActiveTab] = useState<string>('home');
  const [preselectedCourse, setPreselectedCourse] = useState<string>('Complete Practical Accounting');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Sync with URL hash if present
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'courses', 'practical-accounting', 'software', 'admissions', 'about', 'contact'].includes(hash)) {
        setActiveTab(hash);
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update hash when activeTab changes
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    window.location.hash = tabId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll to top monitor
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectCourseForAdmission = (courseTitle: string) => {
    setPreselectedCourse(courseTitle);
    handleTabChange('admissions');
  };

  const whatsappCleanNumber = (settings.whatsapp || '030000196900').replace(/[^0-9]/g, '');

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Dynamic Top Announcement Banner from Admin CMS */}
      {settings.announcement && (
        <div className="bg-gradient-to-r from-cyan-950 via-sky-950 to-blue-950 border-b border-cyan-800/40 text-[11px] sm:text-xs text-cyan-200 py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
          <Megaphone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span>{settings.announcement}</span>
        </div>
      )}

      {/* Top Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={handleTabChange} />

      {/* Main Page Content */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div>
            <HeroSection
              onApplyClick={() => handleTabChange('admissions')}
              onViewCoursesClick={() => handleTabChange('courses')}
            />

            {/* Quick Teasers on Home for rich exploration */}
            <div className="border-t border-slate-800/80">
              <CoursesSection onSelectCourseForAdmission={handleSelectCourseForAdmission} />
            </div>

            <div className="border-t border-slate-800/80 bg-slate-950/40">
              <PracticalAccountingSection />
            </div>

            <div className="border-t border-slate-800/80">
              <SoftwareSection />
            </div>

            <div className="border-t border-slate-800/80 bg-slate-950/40">
              <AboutSection
                onApplyClick={() => handleTabChange('admissions')}
                onExploreCourses={() => handleTabChange('courses')}
              />
            </div>

            <div className="border-t border-slate-800/80">
              <AdmissionsSection initialSelectedCourse={preselectedCourse} />
            </div>

            <div className="border-t border-slate-800/80 bg-slate-950/40">
              <ContactSection />
            </div>
          </div>
        )}

        {activeTab === 'courses' && (
          <div className="py-4">
            <CoursesSection onSelectCourseForAdmission={handleSelectCourseForAdmission} />
          </div>
        )}

        {activeTab === 'practical-accounting' && (
          <div className="py-4">
            <PracticalAccountingSection />
          </div>
        )}

        {activeTab === 'software' && (
          <div className="py-4">
            <SoftwareSection />
          </div>
        )}

        {activeTab === 'admissions' && (
          <div className="py-4">
            <AdmissionsSection initialSelectedCourse={preselectedCourse} />
          </div>
        )}

        {activeTab === 'about' && (
          <div className="py-4">
            <AboutSection
              onApplyClick={() => handleTabChange('admissions')}
              onExploreCourses={() => handleTabChange('courses')}
            />
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="py-4">
            <ContactSection />
          </div>
        )}
      </main>

      {/* Floating Bottom Quick-Action Bar */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
        {/* Scroll To Top Button */}
        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-10 h-10 rounded-full bg-slate-800/90 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700/80 flex items-center justify-center shadow-lg transition-all"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

        {/* Dynamic Floating WhatsApp Quick Action Button */}
        <a
          href={`https://wa.me/${whatsappCleanNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-xl shadow-emerald-950/60 transition-all hover:scale-105"
          aria-label="Chat on WhatsApp"
        >
          <MessageSquare className="w-5 h-5 fill-current" />
          <span className="hidden sm:inline">WhatsApp Admissions</span>
        </a>
      </div>

      {/* Footer */}
      <Footer
        setActiveTab={handleTabChange}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
      />

      {/* Admin Admissions & CMS Backend Modal */}
      <AdminPortalModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <WebsiteSettingsProvider>
      <MainApp />
    </WebsiteSettingsProvider>
  );
}
