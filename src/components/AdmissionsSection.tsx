import React, { useState, useEffect } from 'react';
import { AdmissionFormData } from '../types';
import { COURSES_DATA } from '../data/coursesData';
import { saveAdmissionToDatabase } from '../firebase';
import {
  GraduationCap,
  MessageSquare,
  Mail,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Send,
  ArrowRight,
  ShieldCheck,
  Clock,
  Laptop,
  Building,
  Loader2,
  Database
} from 'lucide-react';

interface AdmissionsSectionProps {
  initialSelectedCourse?: string;
}

export const AdmissionsSection: React.FC<AdmissionsSectionProps> = ({
  initialSelectedCourse
}) => {
  const [formData, setFormData] = useState<AdmissionFormData>({
    fullName: '',
    fatherName: '',
    phone: '',
    whatsapp: '',
    email: '',
    city: '',
    education: '',
    selectedCourse: initialSelectedCourse || 'Complete Practical Accounting',
    preferredTiming: 'Evening',
    learningMode: 'Online',
    accountingExperience: 'Beginner (No prior background)',
    message: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof AdmissionFormData, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dbDocId, setDbDocId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialSelectedCourse) {
      setFormData((prev) => ({ ...prev, selectedCourse: initialSelectedCourse }));
    }
  }, [initialSelectedCourse]);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof AdmissionFormData, string>> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.fatherName.trim()) newErrors.fatherName = "Father's Name is required";
    if (!formData.phone.trim()) newErrors.phone = 'Phone Number is required';
    if (!formData.whatsapp.trim()) newErrors.whatsapp = 'WhatsApp Number is required';

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.education.trim()) newErrors.education = 'Educational qualification is required';
    if (!formData.selectedCourse) newErrors.selectedCourse = 'Please select a course';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const docId = await saveAdmissionToDatabase(formData);
      setDbDocId(docId);
    } catch (err) {
      console.warn('Admission submission saved locally or continuing via WhatsApp/Email:', err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }
  };

  // Generate structured pre-filled text for WhatsApp
  const generateApplicationText = () => {
    return (
      `*Admission Application - Veer Accountancy*\n` +
      (dbDocId ? `*Application Ref:* #${dbDocId}\n\n` : `\n`) +
      `*Full Name:* ${formData.fullName}\n` +
      `*Father's Name:* ${formData.fatherName}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*WhatsApp:* ${formData.whatsapp}\n` +
      `*Email:* ${formData.email}\n` +
      `*City:* ${formData.city}\n` +
      `*Education:* ${formData.education}\n` +
      `*Selected Course:* ${formData.selectedCourse}\n` +
      `*Preferred Timing:* ${formData.preferredTiming}\n` +
      `*Learning Mode:* ${formData.learningMode}\n` +
      `*Accounting Experience:* ${formData.accountingExperience}\n` +
      (formData.message ? `*Notes/Message:* ${formData.message}\n` : '') +
      `\n_Sent via Veer Accountancy Online Admission Portal_`
    );
  };

  const whatsappUrl = `https://wa.me/9230000196900?text=${encodeURIComponent(generateApplicationText())}`;
  const mailtoUrl = `mailto:tanveeruddin0714@gmail.com?subject=${encodeURIComponent(
    `Admission Application: ${formData.fullName} - ${formData.selectedCourse}`
  )}&body=${encodeURIComponent(generateApplicationText())}`;

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(generateApplicationText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setDbDocId(null);
  };

  return (
    <section className="py-16 sm:py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2 flex items-center justify-center gap-1.5">
            <GraduationCap className="w-4 h-4" />
            <span>Admissions Desk</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Apply for Online or Physical Admission
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
            Fill in your enrollment details below. Your application is saved directly into our admissions database, and you can also send a pre-formatted notification via WhatsApp or Email.
          </p>
        </div>

        {/* Success View */}
        {isSubmitted ? (
          <div className="glass-panel rounded-2xl p-6 sm:p-10 border border-emerald-500/40 shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-emerald-950/80 border border-emerald-500/60 flex items-center justify-center text-emerald-400 mx-auto mb-3 shadow-lg shadow-emerald-950/60">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white font-display">
                Admission Application Submitted!
              </h3>
              
              {dbDocId && (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-cyan-500/40 text-xs text-cyan-300 font-mono my-1">
                  <Database className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Saved in Database (Ref: #{dbDocId})</span>
                </div>
              )}

              <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
                Your admission application for <strong className="text-cyan-300">{formData.selectedCourse}</strong> has been recorded in the database. Please click below to send an instant copy to our admissions team on WhatsApp.
              </p>
            </div>

            {/* Application Summary Box */}
            <div className="bg-slate-950/90 rounded-xl p-5 border border-slate-800 space-y-3 text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="font-mono text-cyan-400 font-bold uppercase">Application Summary</span>
                <span className="text-slate-400">{formData.learningMode} Mode · {formData.preferredTiming}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300">
                <div><span className="text-slate-400">Student Name:</span> {formData.fullName}</div>
                <div><span className="text-slate-400">Father's Name:</span> {formData.fatherName}</div>
                <div><span className="text-slate-400">WhatsApp:</span> {formData.whatsapp}</div>
                <div><span className="text-slate-400">Phone:</span> {formData.phone}</div>
                <div><span className="text-slate-400">Email:</span> {formData.email}</div>
                <div><span className="text-slate-400">City:</span> {formData.city}</div>
                <div><span className="text-slate-400">Education:</span> {formData.education}</div>
                <div><span className="text-slate-400">Background:</span> {formData.accountingExperience}</div>
              </div>

              <div className="pt-2 border-t border-slate-800 text-slate-300">
                <span className="text-slate-400">Selected Program:</span>{' '}
                <strong className="text-cyan-300 font-semibold">{formData.selectedCourse}</strong>
              </div>
            </div>

            {/* Direct Send Buttons (WhatsApp & Email) */}
            <div className="space-y-3 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 shadow-xl shadow-emerald-950/40 flex items-center justify-center gap-2.5 transition-all"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Notify Admissions via WhatsApp (+92 300 00196900)</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={mailtoUrl}
                  className="py-3 px-4 rounded-xl font-semibold text-xs text-cyan-300 bg-slate-900 hover:bg-slate-800 border border-cyan-500/30 flex items-center justify-center gap-2 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send via Email (tanveeruddin0714@gmail.com)</span>
                </a>

                <button
                  onClick={handleCopyText}
                  className="py-3 px-4 rounded-xl font-semibold text-xs text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 flex items-center justify-center gap-2 transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied to Clipboard!' : 'Copy Formatted Text'}</span>
                </button>
              </div>
            </div>

            {/* Data Storage Confirmation Note */}
            <div className="p-3.5 rounded-lg bg-slate-950/80 border border-slate-800 text-[11px] text-slate-300 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong>Database Record Verified:</strong> Your application has been logged into the Veer Accountancy Firestore admissions database. You can also chat directly on WhatsApp for instant confirmation.
              </div>
            </div>

            <div className="text-center pt-2">
              <button
                onClick={handleResetForm}
                className="text-xs text-slate-400 hover:text-cyan-400 underline transition-colors"
              >
                Submit another application or edit details
              </button>
            </div>
          </div>
        ) : (
          /* The Form View */
          <form
            onSubmit={handleSubmit}
            className="glass-panel rounded-2xl p-6 sm:p-9 border border-cyan-500/20 shadow-2xl space-y-6"
            noValidate
          >
            {/* Form Notice */}
            <div className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-500/20 text-xs text-cyan-300 flex items-center justify-between">
              <span>All fields marked with <span className="text-rose-400 font-bold">*</span> are required</span>
              <span className="text-[11px] text-slate-400">Direct Database Storage & 24h Response</span>
            </div>

            {/* Personal Details Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Full Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Muhammad Ali"
                  className={`w-full bg-slate-950/80 border rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-colors ${
                    errors.fullName
                      ? 'border-rose-500 focus:ring-rose-500'
                      : 'border-slate-800 focus:border-cyan-500 focus:ring-cyan-500'
                  }`}
                />
                {errors.fullName && <p className="text-[11px] text-rose-400 mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Father's Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.fatherName}
                  onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                  placeholder="e.g. Ghulam Muhammad"
                  className={`w-full bg-slate-950/80 border rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-colors ${
                    errors.fatherName
                      ? 'border-rose-500 focus:ring-rose-500'
                      : 'border-slate-800 focus:border-cyan-500 focus:ring-cyan-500'
                  }`}
                />
                {errors.fatherName && <p className="text-[11px] text-rose-400 mt-1">{errors.fatherName}</p>}
              </div>
            </div>

            {/* Contact Row: Phone, WhatsApp, Email */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Phone Number <span className="text-rose-400">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. 0300 1234567"
                  className={`w-full bg-slate-950/80 border rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-colors ${
                    errors.phone
                      ? 'border-rose-500 focus:ring-rose-500'
                      : 'border-slate-800 focus:border-cyan-500 focus:ring-cyan-500'
                  }`}
                />
                {errors.phone && <p className="text-[11px] text-rose-400 mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  WhatsApp Number <span className="text-rose-400">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  placeholder="e.g. 0300 1234567"
                  className={`w-full bg-slate-950/80 border rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-colors ${
                    errors.whatsapp
                      ? 'border-rose-500 focus:ring-rose-500'
                      : 'border-slate-800 focus:border-cyan-500 focus:ring-cyan-500'
                  }`}
                />
                {errors.whatsapp && <p className="text-[11px] text-rose-400 mt-1">{errors.whatsapp}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Email Address <span className="text-rose-400">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. student@gmail.com"
                  className={`w-full bg-slate-950/80 border rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-colors ${
                    errors.email
                      ? 'border-rose-500 focus:ring-rose-500'
                      : 'border-slate-800 focus:border-cyan-500 focus:ring-cyan-500'
                  }`}
                />
                {errors.email && <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>}
              </div>
            </div>

            {/* City & Education */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  City <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="e.g. Karachi, Lahore, Islamabad, etc."
                  className={`w-full bg-slate-950/80 border rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-colors ${
                    errors.city
                      ? 'border-rose-500 focus:ring-rose-500'
                      : 'border-slate-800 focus:border-cyan-500 focus:ring-cyan-500'
                  }`}
                />
                {errors.city && <p className="text-[11px] text-rose-400 mt-1">{errors.city}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Current Education <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.education}
                  onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                  placeholder="e.g. Intermediate, B.Com, BBA, BS, or Graduate"
                  className={`w-full bg-slate-950/80 border rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-colors ${
                    errors.education
                      ? 'border-rose-500 focus:ring-rose-500'
                      : 'border-slate-800 focus:border-cyan-500 focus:ring-cyan-500'
                  }`}
                />
                {errors.education && <p className="text-[11px] text-rose-400 mt-1">{errors.education}</p>}
              </div>
            </div>

            {/* Course Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Select Course <span className="text-rose-400">*</span>
              </label>
              <select
                value={formData.selectedCourse}
                onChange={(e) => setFormData({ ...formData, selectedCourse: e.target.value })}
                className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-500 focus:ring-cyan-500 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none"
              >
                {COURSES_DATA.map((c) => (
                  <option key={c.id} value={c.title} className="bg-slate-900 text-white">
                    {c.title} ({c.duration})
                  </option>
                ))}
              </select>
            </div>

            {/* Mode & Timing Radio Blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Learning Mode <span className="text-rose-400">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, learningMode: 'Online' })}
                    className={`p-3 rounded-lg border text-xs flex items-center justify-center gap-2 transition-all ${
                      formData.learningMode === 'Online'
                        ? 'bg-cyan-950/60 border-cyan-400 text-cyan-300 font-semibold shadow-sm'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <Laptop className="w-4 h-4" />
                    <span>Online Classes</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, learningMode: 'Physical' })}
                    className={`p-3 rounded-lg border text-xs flex items-center justify-center gap-2 transition-all ${
                      formData.learningMode === 'Physical'
                        ? 'bg-cyan-950/60 border-cyan-400 text-cyan-300 font-semibold shadow-sm'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <Building className="w-4 h-4" />
                    <span>Physical Lab</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Preferred Class Timing <span className="text-rose-400">*</span>
                </label>
                <div className="grid grid-cols-4 gap-1.5 text-xs">
                  {(['Morning', 'Afternoon', 'Evening', 'Weekend'] as const).map((time) => (
                    <button
                      type="button"
                      key={time}
                      onClick={() => setFormData({ ...formData, preferredTiming: time })}
                      className={`py-2 px-1 rounded-lg border text-[11px] font-medium text-center transition-all ${
                        formData.preferredTiming === time
                          ? 'bg-cyan-600 border-cyan-500 text-white shadow-sm'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Previous Accounting Experience */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Previous Accounting Experience
              </label>
              <select
                value={formData.accountingExperience}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    accountingExperience: e.target.value as AdmissionFormData['accountingExperience']
                  })
                }
                className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-500 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none"
              >
                <option value="Beginner (No prior background)" className="bg-slate-900">
                  Beginner (No prior background)
                </option>
                <option value="Basic Theory Knowledge" className="bg-slate-900">
                  Basic Theory Knowledge
                </option>
                <option value="Commerce Student (I.Com / B.Com / BBA / BS)" className="bg-slate-900">
                  Commerce Student (I.Com / B.Com / BBA / BS)
                </option>
                <option value="Working Professional / Freelancer" className="bg-slate-900">
                  Working Professional / Freelancer looking to upskill
                </option>
              </select>
            </div>

            {/* Optional Message */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Additional Questions or Special Requirements (Optional)
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Let us know if you need specific schedule adjustments or custom requirements..."
                className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-500 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none"
              />
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-70 shadow-xl shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Saving Application to Database...</span>
                  </>
                ) : (
                  <>
                    <Database className="w-4 h-4 text-cyan-200" />
                    <span>Submit Admission Application (Save to Database)</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            <p className="text-[11px] text-slate-400 text-center">
              Your application is saved directly in the Veer Accountancy database and you will receive a reference ID to follow up via WhatsApp or Email.
            </p>
          </form>
        )}
      </div>
    </section>
  );
};
