import React, { useState } from 'react';
import { Course } from '../types';
import { COURSES_DATA } from '../data/coursesData';
import { useWebsiteSettings } from '../context/WebsiteSettingsContext';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Layers,
  ArrowRight,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Search,
  Check,
  FileSpreadsheet
} from 'lucide-react';

interface CoursesSectionProps {
  onSelectCourseForAdmission: (courseTitle: string) => void;
}

export const CoursesSection: React.FC<CoursesSectionProps> = ({
  onSelectCourseForAdmission
}) => {
  const { courses } = useWebsiteSettings();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>(null);

  const activeCoursesList = courses && courses.length > 0 ? courses : COURSES_DATA;

  const filteredCourses = activeCoursesList.filter((course) => {
    const matchesFilter =
      selectedFilter === 'all'
        ? true
        : selectedFilter === 'cloud'
        ? course.tools.some((t) => ['QuickBooks Online', 'Xero', 'Zoho Books'].includes(t))
        : selectedFilter === 'excel'
        ? course.tools.includes('Microsoft Excel')
        : selectedFilter === 'fundamentals'
        ? course.id === 'accounting-fundamentals'
        : selectedFilter === 'flagship'
        ? course.id === 'complete-practical-accounting'
        : true;

    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.overview.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.whatYouWillLearn.some((item) => item.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  const toggleExpand = (courseId: string) => {
    setExpandedCourseId(expandedCourseId === courseId ? null : courseId);
  };

  return (
    <section className="py-16 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2 flex items-center justify-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Practical Curriculums</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
            Hands-on Courses Designed for Real Accounting Practice
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
            Every course focuses on actual execution: entering authentic source vouchers, balancing ledgers, and completing real-world cycles in Excel and professional accounting software.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-800">
          {/* Segmented Filter Controls */}
          <div className="flex items-center gap-1 p-1 bg-slate-900/80 rounded-xl border border-slate-800 overflow-x-auto max-w-full">
            {[
              { id: 'all', label: 'All 6 Courses' },
              { id: 'fundamentals', label: 'Fundamentals' },
              { id: 'excel', label: 'Excel Accounting' },
              { id: 'cloud', label: 'Cloud Software (QBO, Xero, Zoho)' },
              { id: 'flagship', label: 'Complete Program' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  selectedFilter === tab.id
                    ? 'bg-cyan-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics, formulas, software..."
              className="w-full bg-slate-900/90 border border-slate-700/80 focus:border-cyan-500 rounded-lg pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors"
            />
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredCourses.map((course) => {
            const isExpanded = expandedCourseId === course.id;

            return (
              <div
                key={course.id}
                className={`glass-panel rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative border ${
                  course.popular
                    ? 'border-cyan-500/50 shadow-xl shadow-cyan-950/30 ring-1 ring-cyan-500/20'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Popular Flag Header */}
                {course.popular && (
                  <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-[11px] font-semibold text-white shadow-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Most Comprehensive Career Program</span>
                  </div>
                )}

                <div>
                  {/* Top Metadata */}
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-cyan-400">{course.level}</span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{course.duration}</span>
                      </span>
                    </div>
                  </div>

                  {/* Course Title & Tagline */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-display mb-1.5">
                    {course.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-cyan-300 font-medium mb-3">
                    {course.tagline}
                  </p>

                  {/* Overview */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                    {course.overview}
                  </p>

                  {/* Tools / Software Used */}
                  <div className="mb-5 pb-5 border-b border-slate-800/80">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Software & Frameworks Practiced:
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {course.tools.map((tool) => (
                        <span
                          key={tool}
                          className="px-2.5 py-1 rounded-md bg-slate-950/70 border border-slate-800 text-slate-300 font-medium font-mono text-[11px]"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* What Students Will Learn (Core syllabus points) */}
                  <div className="mb-5">
                    <div className="text-xs font-semibold text-white uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>What Students Learn & Practice:</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {course.whatYouWillLearn.slice(0, isExpanded ? undefined : 4).map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-cyan-400 font-mono text-xs mt-0.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Expanded Curriculum Modules & Practical Skills */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-4 text-xs animate-fadeIn">
                      <div>
                        <div className="font-semibold text-cyan-300 mb-2">Detailed Curriculum Modules:</div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {course.keyModules.map((mod, mIdx) => (
                            <div key={mIdx} className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                              <div className="font-medium text-slate-200 text-xs mb-1">{mod.title}</div>
                              <ul className="text-[11px] text-slate-400 space-y-0.5">
                                {mod.topics.map((top, tIdx) => (
                                  <li key={tIdx}>- {top}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-500/20">
                        <div className="font-semibold text-cyan-300 mb-1.5">Practical Hands-on Outcomes:</div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-300">
                          {course.practicalSkills.map((skill, sIdx) => (
                            <div key={sIdx} className="flex items-start gap-1.5">
                              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{skill}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Action Footer */}
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                  <button
                    onClick={() => toggleExpand(course.id)}
                    className="text-xs font-medium text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1"
                  >
                    <span>{isExpanded ? 'Hide Details' : 'View Full Syllabus'}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    onClick={() => onSelectCourseForAdmission(course.title)}
                    className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 transition-all flex items-center gap-1.5 shadow-md shadow-cyan-900/30"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Flagship Program Callout */}
        <div className="mt-14 glass-panel rounded-2xl p-6 sm:p-8 border border-cyan-500/30 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-cyan-950/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl text-center md:text-left">
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Recommended Career Track</div>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
              Complete Practical Accounting Flagship
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Why learn one tool when corporate clients and firms demand versatility? Our flagship program trains you across Fundamentals, Excel Worksheets, QuickBooks Online, Xero, and Zoho Books under one structured practical curriculum.
            </p>
          </div>
          <button
            onClick={() => onSelectCourseForAdmission('Complete Practical Accounting')}
            className="px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/25 whitespace-nowrap"
          >
            Apply for Flagship Program
          </button>
        </div>
      </div>
    </section>
  );
};
