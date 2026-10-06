import React, { useState, useEffect } from 'react';
import {
  auth,
  signInAdminWithGoogle,
  signOutAdmin,
  fetchAllAdmissions,
  fetchAllInquiries,
  updateAdmissionStatus,
  updateInquiryStatus,
  deleteAdmissionFromDatabase,
  deleteInquiryFromDatabase,
  StoredAdmission,
  StoredInquiry,
  InstituteSettings,
  DEFAULT_SETTINGS,
  fetchInstituteSettings,
  saveInstituteSettings,
  CustomCourse,
  fetchCustomCourses,
  saveCustomCourse,
  deleteCustomCourse
} from '../firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useWebsiteSettings } from '../context/WebsiteSettingsContext';
import {
  X,
  Database,
  Lock,
  LogOut,
  RefreshCw,
  Download,
  MessageSquare,
  Mail,
  Phone,
  Search,
  CheckCircle2,
  Clock,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  FileSpreadsheet,
  PartyPopper,
  Send,
  Copy,
  Check,
  Trash2,
  Settings,
  BookOpen,
  Plus,
  Save,
  MapPin,
  BellRing
} from 'lucide-react';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({ isOpen, onClose }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(auth.currentUser);
  const [activeTab, setActiveTab] = useState<'admissions' | 'inquiries' | 'settings' | 'courses'>('admissions');
  const [admissions, setAdmissions] = useState<StoredAdmission[]>([]);
  const [inquiries, setInquiries] = useState<StoredInquiry[]>([]);
  const [customCourses, setCustomCourses] = useState<CustomCourse[]>([]);
  const [settingsForm, setSettingsForm] = useState<InstituteSettings>(DEFAULT_SETTINGS);

  const [isLoading, setIsLoading] = useState(false);
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [settingsSaveSuccess, setSettingsSaveSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'contacted' | 'enrolled'>('all');

  // Confirmation / Mubarakbaad Dialog State
  const [selectedEnrollmentModal, setSelectedEnrollmentModal] = useState<StoredAdmission | null>(null);
  const [copiedModalText, setCopiedModalText] = useState(false);

  // Deletion Confirmation Modal State
  const [deleteConfirmItem, setDeleteConfirmItem] = useState<{
    type: 'admission' | 'inquiry' | 'course';
    id: string;
    title: string;
    details?: string;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // New Course Modal State
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [courseForm, setCourseForm] = useState<Partial<CustomCourse>>({
    title: '',
    subtitle: '',
    duration: '6 Weeks',
    level: 'Hands-on Practical',
    mode: 'Online & Physical',
    fee: 'Rs. 15,000',
    overview: '',
    topics: []
  });
  const [topicsInput, setTopicsInput] = useState('');

  const { refreshData: refreshGlobalContext } = useWebsiteSettings();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        loadData();
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isOpen && currentUser) {
      loadData();
    }
  }, [isOpen]);

  const loadData = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const [adms, inqs, sets, crs] = await Promise.all([
        fetchAllAdmissions().catch((e) => {
          console.error(e);
          return [] as StoredAdmission[];
        }),
        fetchAllInquiries().catch((e) => {
          console.error(e);
          return [] as StoredInquiry[];
        }),
        fetchInstituteSettings().catch(() => DEFAULT_SETTINGS),
        fetchCustomCourses().catch(() => [] as CustomCourse[])
      ]);
      setAdmissions(adms);
      setInquiries(inqs);
      setSettingsForm(sets || DEFAULT_SETTINGS);
      setCustomCourses(crs || []);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error loading records. Make sure you are signed in with the authorized admin account.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMsg(null);
    setIsLoading(true);
    try {
      await signInAdminWithGoogle();
    } catch (err: any) {
      setErrorMsg(err.message || 'Google sign-in failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: 'pending' | 'contacted' | 'enrolled') => {
    try {
      await updateAdmissionStatus(id, newStatus);
      setAdmissions((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
      );
      if (newStatus === 'enrolled') {
        const found = admissions.find((item) => item.id === id);
        if (found) {
          setSelectedEnrollmentModal({ ...found, status: 'enrolled' });
        }
      }
    } catch (err: any) {
      alert('Could not update status: ' + err.message);
    }
  };

  const handleInquiryStatusChange = async (id: string, newStatus: 'new' | 'responded') => {
    try {
      await updateInquiryStatus(id, newStatus);
      setInquiries((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
      );
    } catch (err: any) {
      alert('Could not update inquiry status: ' + err.message);
    }
  };

  // Permanently delete a record from the cloud database
  const handleConfirmDelete = async () => {
    if (!deleteConfirmItem) return;
    setIsDeleting(true);
    try {
      if (deleteConfirmItem.type === 'admission') {
        await deleteAdmissionFromDatabase(deleteConfirmItem.id);
        setAdmissions((prev) => prev.filter((item) => item.id !== deleteConfirmItem.id));
      } else if (deleteConfirmItem.type === 'inquiry') {
        await deleteInquiryFromDatabase(deleteConfirmItem.id);
        setInquiries((prev) => prev.filter((item) => item.id !== deleteConfirmItem.id));
      } else if (deleteConfirmItem.type === 'course') {
        await deleteCustomCourse(deleteConfirmItem.id);
        setCustomCourses((prev) => prev.filter((item) => item.id !== deleteConfirmItem.id));
        await refreshGlobalContext();
      }
      setDeleteConfirmItem(null);
    } catch (err: any) {
      alert('Delete failed: ' + (err.message || String(err)));
    } finally {
      setIsDeleting(false);
    }
  };

  // Save Settings from Backend to Firestore
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSettings(true);
    setSettingsSaveSuccess(false);
    try {
      await saveInstituteSettings(settingsForm);
      await refreshGlobalContext();
      setSettingsSaveSuccess(true);
      setTimeout(() => setSettingsSaveSuccess(false), 3000);
    } catch (err: any) {
      alert('Failed to save settings: ' + err.message);
    } finally {
      setIsSavingSettings(false);
    }
  };

  // Save New Course to Firestore
  const handleSaveCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseForm.title || !courseForm.duration) {
      alert('Please enter course title and duration');
      return;
    }

    const courseId = courseForm.id || 'crs_' + Date.now().toString(36);
    const topics = topicsInput
      .split('\n')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const payload: CustomCourse = {
      id: courseId,
      title: courseForm.title.trim(),
      subtitle: courseForm.subtitle?.trim() || '',
      duration: courseForm.duration.trim(),
      level: courseForm.level || 'Hands-on Practical',
      mode: courseForm.mode || 'Online & Physical',
      fee: courseForm.fee || '',
      category: courseForm.category || 'Practical Accounting',
      overview: courseForm.overview?.trim() || '',
      topics
    };

    try {
      await saveCustomCourse(payload);
      setCustomCourses((prev) => {
        const idx = prev.findIndex((c) => c.id === courseId);
        if (idx >= 0) {
          const updated = [...prev];
          updated[idx] = payload;
          return updated;
        }
        return [payload, ...prev];
      });
      await refreshGlobalContext();
      setIsAddingCourse(false);
      setCourseForm({
        title: '',
        subtitle: '',
        duration: '6 Weeks',
        level: 'Hands-on Practical',
        mode: 'Online & Physical',
        fee: 'Rs. 15,000',
        overview: '',
        topics: []
      });
      setTopicsInput('');
    } catch (err: any) {
      alert('Failed to save course: ' + err.message);
    }
  };

  // Generate Formal Mubarakbaad Letter with student details & course
  const generateMubarakbaad = (adm: StoredAdmission) => {
    const subject = `🎉 Mubarak Ho! Admission Confirmed: ${adm.selectedCourse} - Veer Accountancy`;
    const body =
`Dear ${adm.fullName},

Assalam-o-Alaikum!

Bohat Bohat Mubarak Ho! Veer Accountancy Training Institute mein aapka admission kamyabi se confirm ho gaya hai.

--- ADMISSION CONFIRMATION DETAILS ---
Student Name: ${adm.fullName}
Father's Name: ${adm.fatherName}
Selected Course: ${adm.selectedCourse}
Learning Mode: ${adm.learningMode} (Online Classes / Physical Lab)
Class Timing: ${adm.preferredTiming}
City: ${adm.city}
Reference ID: #${adm.id}

--- AGLA MARHALA (NEXT STEPS) ---
1. Software Installation & Class Access: Aapko class schedule, portal link aur software setup (Excel / QuickBooks / Xero) WhatsApp aur email par provide kar diya jayega.
2. Agar aapka koi bhi sawal ho to aap foran hamare admissions desk se WhatsApp (${settingsForm.whatsapp}) par rabta kar sakte hain.

Hum aapke shandaar career aur practical accounting learning journey ke liye dua-go hain!

Warm Regards,
Admissions Director
Veer Accountancy Training Institute
WhatsApp: ${settingsForm.whatsapp}
Email: ${settingsForm.email}`;

    return { subject, body };
  };

  // 1-Click Launch Gmail Composer
  const openInGmail = (adm: StoredAdmission) => {
    const { subject, body } = generateMubarakbaad(adm);
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      adm.email
    )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, '_blank');
  };

  // 1-Click Launch WhatsApp Mubarakbaad
  const openInWhatsApp = (adm: StoredAdmission) => {
    const { body } = generateMubarakbaad(adm);
    const cleanPhone = adm.whatsapp.replace(/[^0-9]/g, '');
    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(body)}`;
    window.open(waUrl, '_blank');
  };

  // 1-Click Launch Default Mailto
  const openInMailto = (adm: StoredAdmission) => {
    const { subject, body } = generateMubarakbaad(adm);
    const mailtoUrl = `mailto:${encodeURIComponent(adm.email)}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  // Copy template to clipboard
  const handleCopyMubarakbaad = async (adm: StoredAdmission) => {
    const { body } = generateMubarakbaad(adm);
    try {
      await navigator.clipboard.writeText(body);
      setCopiedModalText(true);
      setTimeout(() => setCopiedModalText(false), 2500);
    } catch {
      // fallback
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (activeTab === 'admissions') {
      if (admissions.length === 0) return;
      const headers = [
        'Ref ID',
        'Date',
        'Full Name',
        "Father's Name",
        'Phone',
        'WhatsApp',
        'Email',
        'City',
        'Education',
        'Selected Course',
        'Timing',
        'Mode',
        'Experience',
        'Status',
        'Message'
      ];
      const rows = admissions.map((a) => [
        a.id,
        new Date(a.createdAt).toLocaleString(),
        `"${a.fullName.replace(/"/g, '""')}"`,
        `"${a.fatherName.replace(/"/g, '""')}"`,
        `"${a.phone}"`,
        `"${a.whatsapp}"`,
        `"${a.email}"`,
        `"${a.city}"`,
        `"${a.education}"`,
        `"${a.selectedCourse}"`,
        `"${a.preferredTiming}"`,
        `"${a.learningMode}"`,
        `"${a.accountingExperience}"`,
        `"${a.status}"`,
        `"${(a.message || '').replace(/"/g, '""')}"`
      ]);

      const csvContent =
        'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute(
        'download',
        `Veer_Accountancy_Admissions_${new Date().toISOString().slice(0, 10)}.csv`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      if (inquiries.length === 0) return;
      const headers = ['Ref ID', 'Date', 'Name', 'Phone', 'Email', 'Status', 'Message'];
      const rows = inquiries.map((i) => [
        i.id,
        new Date(i.createdAt).toLocaleString(),
        `"${i.name.replace(/"/g, '""')}"`,
        `"${i.phone || ''}"`,
        `"${i.email || ''}"`,
        `"${i.status}"`,
        `"${i.message.replace(/"/g, '""')}"`
      ]);

      const csvContent =
        'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute(
        'download',
        `Veer_Accountancy_Inquiries_${new Date().toISOString().slice(0, 10)}.csv`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const filteredAdmissions = admissions.filter((adm) => {
    const matchesSearch =
      adm.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      adm.whatsapp.includes(searchQuery) ||
      adm.phone.includes(searchQuery) ||
      adm.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      adm.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      adm.selectedCourse.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || adm.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredInquiries = inquiries.filter((inq) => {
    return (
      inq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (inq.phone && inq.phone.includes(searchQuery)) ||
      (inq.email && inq.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      inq.message.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-6xl max-h-[94vh] bg-slate-900 border border-cyan-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                <span>Veer Accountancy Backend Control Panel</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                  Cloud Firestore
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Manage Admissions, Inquiries, Contact Settings & Dynamic Courses
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://console.firebase.google.com/project/qualified-cubist-nnm9t/firestore/databases/ai-studio-veeraccountancyp-ce61cbf9-f046-4a8e-9978-1a517fc805ec/data"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 transition-colors"
            >
              <span>Firebase Console</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        {!currentUser ? (
          /* Sign-In View */
          <div className="p-8 sm:p-14 text-center max-w-lg mx-auto space-y-6 my-auto">
            <div className="w-16 h-16 rounded-2xl bg-cyan-950/70 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mx-auto">
              <Lock className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h4 className="text-xl font-bold text-white font-display">
                Admin Authentication Required
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Sign in with the administrator Google account (
                <strong className="text-cyan-300">tanveeruddin0714@gmail.com</strong>) to access
                the backend control panel.
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-lg bg-rose-950/60 border border-rose-500/40 text-xs text-rose-300 text-left flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-3 transition-all cursor-pointer"
            >
              {isLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <ShieldCheck className="w-4 h-4" />
              )}
              <span>Sign In with Admin Google Account</span>
            </button>

            <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800">
              Only authorized staff have access to manage website settings and student PII.
            </div>
          </div>
        ) : (
          /* Main Records Dashboard */
          <div className="flex-1 flex flex-col min-h-0">
            {/* Control Bar (Tabs) */}
            <div className="p-4 border-b border-slate-800 bg-slate-950/40 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              {/* 4 Tabs */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setActiveTab('admissions')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer ${
                    activeTab === 'admissions'
                      ? 'bg-cyan-600 text-white shadow-sm'
                      : 'bg-slate-800/80 text-slate-400 hover:text-white'
                  }`}
                >
                  <span>Student Admissions</span>
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-900/80 text-cyan-200">
                    {admissions.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('inquiries')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer ${
                    activeTab === 'inquiries'
                      ? 'bg-cyan-600 text-white shadow-sm'
                      : 'bg-slate-800/80 text-slate-400 hover:text-white'
                  }`}
                >
                  <span>Contact Inquiries</span>
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-900/80 text-cyan-200">
                    {inquiries.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('settings')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'settings'
                      ? 'bg-cyan-600 text-white shadow-sm'
                      : 'bg-slate-800/80 text-slate-400 hover:text-white'
                  }`}
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Website Settings</span>
                </button>

                <button
                  onClick={() => setActiveTab('courses')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'courses'
                      ? 'bg-cyan-600 text-white shadow-sm'
                      : 'bg-slate-800/80 text-slate-400 hover:text-white'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Manage Courses ({customCourses.length})</span>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={loadData}
                  disabled={isLoading}
                  className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Refresh Data"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline">Refresh</span>
                </button>

                {(activeTab === 'admissions' || activeTab === 'inquiries') && (
                  <button
                    onClick={handleExportCSV}
                    className="px-3 py-2 rounded-lg bg-emerald-950/70 border border-emerald-500/40 hover:bg-emerald-900/80 text-xs font-medium text-emerald-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Export to Excel / CSV"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="hidden sm:inline">Download Excel/CSV</span>
                  </button>
                )}

                <button
                  onClick={() => signOutAdmin()}
                  className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-rose-950/60 hover:text-rose-300 text-xs font-medium text-slate-400 transition-colors flex items-center gap-1 cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </div>
            </div>

            {/* Sub-header Filter bar for admissions/inquiries */}
            {(activeTab === 'admissions' || activeTab === 'inquiries') && (
              <div className="px-4 py-3 bg-slate-900/60 border-b border-slate-800/80 flex flex-col sm:flex-row gap-3 items-center justify-between">
                <div className="relative w-full sm:w-80">
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search name, phone, course, city..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none"
                  />
                </div>

                {activeTab === 'admissions' && (
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <span className="text-xs text-slate-400">Filter Status:</span>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value as any)}
                      className="bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-cyan-500"
                    >
                      <option value="all">All Applications ({admissions.length})</option>
                      <option value="pending">Pending</option>
                      <option value="contacted">Contacted</option>
                      <option value="enrolled">Enrolled</option>
                    </select>
                  </div>
                )}
              </div>
            )}

            {/* Scrollable Records / Settings Content */}
            <div className="flex-1 overflow-auto p-4 sm:p-6">
              {/* TAB 1: ADMISSIONS */}
              {activeTab === 'admissions' && (
                filteredAdmissions.length === 0 ? (
                  <div className="text-center py-16 space-y-3">
                    <Database className="w-10 h-10 text-slate-600 mx-auto" />
                    <p className="text-sm font-semibold text-slate-300">
                      No admission applications found.
                    </p>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      When students submit the admission form on the website, their records will appear here in real-time.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredAdmissions.map((adm) => (
                      <div
                        key={adm.id}
                        className={`bg-slate-950/80 border rounded-xl p-4 transition-all text-xs space-y-3 ${
                          adm.status === 'enrolled'
                            ? 'border-emerald-500/40 shadow-lg shadow-emerald-950/30'
                            : 'border-slate-800 hover:border-cyan-500/30'
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-cyan-400 font-bold">#{adm.id}</span>
                            <span className="text-slate-500">·</span>
                            <span className="text-slate-400">
                              {new Date(adm.createdAt).toLocaleString()}
                            </span>
                            {adm.status === 'enrolled' && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">
                                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                <span>ENROLLED STUDENT</span>
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-slate-400">Status:</span>
                            <select
                              value={adm.status}
                              onChange={(e) => handleStatusChange(adm.id, e.target.value as any)}
                              className={`rounded-lg px-2.5 py-1 font-semibold text-[11px] focus:outline-none border cursor-pointer ${
                                adm.status === 'enrolled'
                                  ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500/50'
                                  : adm.status === 'contacted'
                                  ? 'bg-sky-950/80 text-sky-300 border-sky-500/40'
                                  : 'bg-amber-950/80 text-amber-300 border-amber-500/40'
                              }`}
                            >
                              <option value="pending" className="bg-slate-900 text-white">Pending</option>
                              <option value="contacted" className="bg-slate-900 text-white">Contacted</option>
                              <option value="enrolled" className="bg-slate-900 text-white">Enrolled (Admitted)</option>
                            </select>

                            {/* Delete Application Button */}
                            <button
                              onClick={() =>
                                setDeleteConfirmItem({
                                  type: 'admission',
                                  id: adm.id,
                                  title: adm.fullName,
                                  details: `${adm.selectedCourse} · Ref #${adm.id}`
                                })
                              }
                              className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/60 border border-transparent hover:border-rose-500/40 transition-colors cursor-pointer"
                              title="Delete this student application"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Grid Details */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-slate-300">
                          <div>
                            <span className="text-slate-400 block text-[10px] uppercase font-mono">Student</span>
                            <span className="font-bold text-white text-sm">{adm.fullName}</span>
                            <span className="text-slate-400 block text-[11px]">S/O {adm.fatherName}</span>
                          </div>

                          <div>
                            <span className="text-slate-400 block text-[10px] uppercase font-mono">Course & Mode</span>
                            <span className="text-cyan-300 font-medium">{adm.selectedCourse}</span>
                            <span className="text-slate-400 block text-[11px]">{adm.learningMode} · {adm.preferredTiming}</span>
                          </div>

                          <div>
                            <span className="text-slate-400 block text-[10px] uppercase font-mono">Contact</span>
                            <span className="font-mono text-white block">{adm.whatsapp} (WhatsApp)</span>
                            <span className="font-mono text-slate-400 block">{adm.phone}</span>
                            <span className="text-slate-400 block truncate">{adm.email}</span>
                          </div>

                          <div>
                            <span className="text-slate-400 block text-[10px] uppercase font-mono">Location & Education</span>
                            <span className="text-white block">{adm.city}</span>
                            <span className="text-slate-400 block">{adm.education}</span>
                            <span className="text-slate-500 block text-[11px]">{adm.accountingExperience}</span>
                          </div>
                        </div>

                        {adm.message && (
                          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
                            <span className="text-slate-400 font-semibold">Special Request: </span>
                            {adm.message}
                          </div>
                        )}

                        {/* Quick Actions Row */}
                        <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-slate-800/60">
                          <div className="text-[11px] text-slate-400">
                            {adm.status === 'enrolled' ? (
                              <span className="text-emerald-400 font-medium">
                                Ready to dispatch Admission Mubarakbaad & Confirmation
                              </span>
                            ) : (
                              <span>Follow up or enroll to confirm admission</span>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            {/* Prominent Send Mubarakbaad Button */}
                            <button
                              onClick={() => setSelectedEnrollmentModal(adm)}
                              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-md ${
                                adm.status === 'enrolled'
                                  ? 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white shadow-emerald-950/50'
                                  : 'bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/50 text-cyan-300'
                              }`}
                            >
                              <PartyPopper className="w-3.5 h-3.5 text-amber-300" />
                              <span>Send Mubarakbaad (Email & WhatsApp)</span>
                            </button>

                            {/* Direct WhatsApp Chat Button */}
                            <a
                              href={`https://wa.me/${adm.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                                `Salam ${adm.fullName}, this is Veer Accountancy regarding your admission application for ${adm.selectedCourse}.`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 text-xs font-semibold transition-colors"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                              <span>WhatsApp Chat</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}

              {/* TAB 2: INQUIRIES */}
              {activeTab === 'inquiries' && (
                filteredInquiries.length === 0 ? (
                  <div className="text-center py-16 space-y-3">
                    <Database className="w-10 h-10 text-slate-600 mx-auto" />
                    <p className="text-sm font-semibold text-slate-300">
                      No contact inquiries found.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredInquiries.map((inq) => (
                      <div
                        key={inq.id}
                        className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 hover:border-cyan-500/30 transition-all text-xs space-y-3"
                      >
                        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-cyan-400 font-bold">#{inq.id}</span>
                            <span className="text-slate-500">·</span>
                            <span className="text-slate-400">
                              {new Date(inq.createdAt).toLocaleString()}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <select
                              value={inq.status}
                              onChange={(e) => handleInquiryStatusChange(inq.id, e.target.value as any)}
                              className="bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-white cursor-pointer"
                            >
                              <option value="new">New</option>
                              <option value="responded">Responded</option>
                            </select>

                            <button
                              onClick={() =>
                                setDeleteConfirmItem({
                                  type: 'inquiry',
                                  id: inq.id,
                                  title: inq.name,
                                  details: inq.email || inq.phone || 'Inquiry message'
                                })
                              }
                              className="p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-rose-950/60 border border-transparent hover:border-rose-500/40 transition-colors cursor-pointer"
                              title="Delete Inquiry"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-300">
                          <div>
                            <span className="text-slate-400 block text-[10px]">Name:</span>
                            <span className="font-bold text-white">{inq.name}</span>
                          </div>
                          {inq.phone && (
                            <div>
                              <span className="text-slate-400 block text-[10px]">Phone:</span>
                              <span className="font-mono">{inq.phone}</span>
                            </div>
                          )}
                          {inq.email && (
                            <div>
                              <span className="text-slate-400 block text-[10px]">Email:</span>
                              <span>{inq.email}</span>
                            </div>
                          )}
                        </div>

                        <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200">
                          {inq.message}
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}

              {/* TAB 3: WEBSITE SETTINGS (CMS BACKEND) */}
              {activeTab === 'settings' && (
                <div className="max-w-3xl mx-auto space-y-6">
                  <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 space-y-6">
                    <div>
                      <h4 className="font-display font-bold text-base text-white flex items-center gap-2">
                        <Settings className="w-4 h-4 text-cyan-400" />
                        <span>Institute Contact & Global Settings (CMS)</span>
                      </h4>
                      <p className="text-xs text-slate-400 mt-1">
                        Changes saved here directly update the phone numbers, emails, WhatsApp links, and announcement banner across the entire public website.
                      </p>
                    </div>

                    {settingsSaveSuccess && (
                      <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Settings successfully saved and live on website!</span>
                      </div>
                    )}

                    <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-slate-300 font-semibold mb-1">
                            WhatsApp Number (Digits only or with +):
                          </label>
                          <input
                            type="text"
                            value={settingsForm.whatsapp}
                            onChange={(e) => setSettingsForm({ ...settingsForm, whatsapp: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500 font-mono"
                            placeholder="030000196900"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-slate-300 font-semibold mb-1">
                            Official Phone Number:
                          </label>
                          <input
                            type="text"
                            value={settingsForm.phone}
                            onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500 font-mono"
                            placeholder="+92 300 00196900"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-slate-300 font-semibold mb-1">
                            Official Admissions Email:
                          </label>
                          <input
                            type="email"
                            value={settingsForm.email}
                            onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500 font-mono"
                            placeholder="tanveeruddin0714@gmail.com"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-slate-300 font-semibold mb-1">
                            Office / Class Timings:
                          </label>
                          <input
                            type="text"
                            value={settingsForm.timings}
                            onChange={(e) => setSettingsForm({ ...settingsForm, timings: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500"
                            placeholder="Monday to Saturday: 9:00 AM – 9:00 PM"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">
                          Institute Physical Address:
                        </label>
                        <input
                          type="text"
                          value={settingsForm.address}
                          onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500"
                          placeholder="Veer Accountancy Institute, Commercial Center, Pakistan"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">
                          Announcement / Top Banner Message:
                        </label>
                        <textarea
                          rows={2}
                          value={settingsForm.announcement}
                          onChange={(e) => setSettingsForm({ ...settingsForm, announcement: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500"
                          placeholder="Special Admission Batch starts next Monday! Register online."
                        />
                      </div>

                      <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-800">
                        <button
                          type="submit"
                          disabled={isSavingSettings}
                          className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-md shadow-cyan-500/20 flex items-center gap-2 cursor-pointer transition-all"
                        >
                          {isSavingSettings ? (
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Save className="w-3.5 h-3.5" />
                          )}
                          <span>Save Settings to Database</span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* TAB 4: COURSES MANAGEMENT (CMS BACKEND) */}
              {activeTab === 'courses' && (
                <div className="space-y-6">
                  {/* Top Bar with Add Course Button */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-display font-bold text-base text-white flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-cyan-400" />
                        <span>Dynamic Courses Catalog</span>
                      </h4>
                      <p className="text-xs text-slate-400">
                        Add, edit, or delete courses. Any courses added here appear on the website and admission form.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setIsAddingCourse(true);
                        setCourseForm({
                          title: '',
                          subtitle: '',
                          duration: '6 Weeks',
                          level: 'Hands-on Practical',
                          mode: 'Online & Physical',
                          fee: 'Rs. 15,000',
                          overview: '',
                          topics: []
                        });
                        setTopicsInput('');
                      }}
                      className="px-4 py-2 rounded-xl font-bold text-xs text-white bg-cyan-600 hover:bg-cyan-500 shadow-md flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add New Course</span>
                    </button>
                  </div>

                  {/* Add / Edit Course Modal Form */}
                  {isAddingCourse && (
                    <div className="bg-slate-950 border border-cyan-500/40 rounded-2xl p-5 space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                        <h5 className="font-bold text-sm text-cyan-300 flex items-center gap-2">
                          <Plus className="w-4 h-4" />
                          <span>{courseForm.id ? 'Edit Course' : 'Create New Course'}</span>
                        </h5>
                        <button
                          onClick={() => setIsAddingCourse(false)}
                          className="text-slate-400 hover:text-white"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <form onSubmit={handleSaveCourse} className="space-y-3.5 text-xs">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-slate-300 font-semibold mb-1">Course Title *</label>
                            <input
                              type="text"
                              value={courseForm.title || ''}
                              onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                              placeholder="e.g. Advanced Tax Return & FBR Filing"
                              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-500"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-slate-300 font-semibold mb-1">Duration *</label>
                            <input
                              type="text"
                              value={courseForm.duration || ''}
                              onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })}
                              placeholder="e.g. 6 Weeks / 2 Months"
                              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-500"
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-slate-300 font-semibold mb-1">Level</label>
                            <select
                              value={courseForm.level || 'Hands-on Practical'}
                              onChange={(e) => setCourseForm({ ...courseForm, level: e.target.value })}
                              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-500"
                            >
                              <option value="Foundational">Foundational</option>
                              <option value="Hands-on Practical">Hands-on Practical</option>
                              <option value="Professional / Advanced">Professional / Advanced</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-slate-300 font-semibold mb-1">Learning Mode</label>
                            <input
                              type="text"
                              value={courseForm.mode || 'Online & Physical'}
                              onChange={(e) => setCourseForm({ ...courseForm, mode: e.target.value })}
                              placeholder="Online & Physical Lab"
                              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-500"
                            />
                          </div>

                          <div>
                            <label className="block text-slate-300 font-semibold mb-1">Course Fee</label>
                            <input
                              type="text"
                              value={courseForm.fee || ''}
                              onChange={(e) => setCourseForm({ ...courseForm, fee: e.target.value })}
                              placeholder="e.g. Rs. 15,000"
                              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-slate-300 font-semibold mb-1">Course Overview & Tagline</label>
                          <textarea
                            rows={2}
                            value={courseForm.overview || ''}
                            onChange={(e) => setCourseForm({ ...courseForm, overview: e.target.value })}
                            placeholder="Brief description of what students will master in this training..."
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-500"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-300 font-semibold mb-1">
                            Key Syllabus Topics (One topic per line):
                          </label>
                          <textarea
                            rows={3}
                            value={topicsInput}
                            onChange={(e) => setTopicsInput(e.target.value)}
                            placeholder="Module 1: Double Entry Rules&#10;Module 2: Bank Reconciliation Statements&#10;Module 3: Tax Deduction & Withholding"
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-500 font-mono text-xs"
                          />
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                          <button
                            type="button"
                            onClick={() => setIsAddingCourse(false)}
                            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold flex items-center gap-1.5"
                          >
                            <Save className="w-3.5 h-3.5" />
                            <span>Save Course</span>
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* List of Custom Courses */}
                  {customCourses.length === 0 ? (
                    <div className="text-center py-12 p-6 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
                      <BookOpen className="w-9 h-9 text-slate-600 mx-auto" />
                      <p className="text-sm font-semibold text-slate-300">
                        Default standard curriculum courses are active.
                      </p>
                      <p className="text-xs text-slate-400 max-w-md mx-auto">
                        Click <strong>"Add New Course"</strong> above to add custom specialized training courses (e.g. FBR Taxation, Corporate Accounting, Audit, Power BI) to your website catalog!
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {customCourses.map((c) => (
                        <div
                          key={c.id}
                          className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 text-xs space-y-3 hover:border-cyan-500/40 transition-colors"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h5 className="font-bold text-white text-sm">{c.title}</h5>
                              <p className="text-cyan-300 text-[11px] font-mono mt-0.5">
                                {c.duration} · {c.mode} {c.fee ? `· ${c.fee}` : ''}
                              </p>
                            </div>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => {
                                  setCourseForm(c);
                                  setTopicsInput((c.topics || []).join('\n'));
                                  setIsAddingCourse(true);
                                }}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800"
                                title="Edit Course"
                              >
                                <Edit3Icon className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() =>
                                  setDeleteConfirmItem({
                                    type: 'course',
                                    id: c.id,
                                    title: c.title,
                                    details: `Course Duration: ${c.duration}`
                                  })
                                }
                                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/60"
                                title="Delete Course"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <p className="text-slate-300 text-xs leading-relaxed line-clamp-2">
                            {c.overview}
                          </p>

                          {c.topics && c.topics.length > 0 && (
                            <div className="pt-2 border-t border-slate-800/80">
                              <span className="text-[10px] text-slate-500 uppercase font-mono block mb-1">
                                {c.topics.length} Syllabus Modules
                              </span>
                              <div className="flex flex-wrap gap-1.5">
                                {c.topics.slice(0, 3).map((top, idx) => (
                                  <span
                                    key={idx}
                                    className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 text-[10px] border border-slate-800"
                                  >
                                    {top}
                                  </span>
                                ))}
                                {c.topics.length > 3 && (
                                  <span className="text-[10px] text-cyan-400">+{c.topics.length - 3} more</span>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SUB-MODAL 1: Send Admission Confirmation & Mubarakbaad */}
        {/* ======================================================== */}
        {selectedEnrollmentModal && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md">
            <div className="relative w-full max-w-2xl bg-slate-900 border border-emerald-500/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
              {/* Header */}
              <div className="p-4 sm:p-5 border-b border-slate-800 bg-emerald-950/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
                    <PartyPopper className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-base sm:text-lg text-white flex items-center gap-2">
                      <span>Admission Mubarakbaad & Confirmation</span>
                    </h4>
                    <p className="text-xs text-slate-300">
                      Student: <strong className="text-white">{selectedEnrollmentModal.fullName}</strong> ·{' '}
                      <span className="text-cyan-300">{selectedEnrollmentModal.selectedCourse}</span>
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedEnrollmentModal(null)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs">
                {/* Notice banner */}
                <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-200 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong>Direct Email & WhatsApp Dispatch:</strong> Niche diye gaye{' '}
                    <strong>"Open & Send via Gmail"</strong> button par click karein. Yeh direct Gmail
                    mein student ka email aur Mubarakbaad letter pre-fill karke khol dega taake aap
                    foran "Send" kar sakein!
                  </div>
                </div>

                {/* Recipient info badges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-950/90 rounded-xl p-3.5 border border-slate-800 text-slate-300">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Student Email:</span>
                    <strong className="text-white font-mono text-xs">
                      {selectedEnrollmentModal.email}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">WhatsApp:</span>
                    <strong className="text-emerald-400 font-mono text-xs">
                      {selectedEnrollmentModal.whatsapp}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Selected Course:</span>
                    <span className="text-cyan-300 font-medium">
                      {selectedEnrollmentModal.selectedCourse}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Timing & Mode:</span>
                    <span className="text-slate-300">
                      {selectedEnrollmentModal.preferredTiming} ({selectedEnrollmentModal.learningMode}{' '}
                      Mode)
                    </span>
                  </div>
                </div>

                {/* Subject preview */}
                <div>
                  <label className="block text-slate-400 text-[11px] mb-1 font-semibold">
                    Email Subject:
                  </label>
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 font-medium">
                    {generateMubarakbaad(selectedEnrollmentModal).subject}
                  </div>
                </div>

                {/* Body letter preview */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-slate-400 text-[11px] font-semibold">
                      Mubarakbaad Message Preview:
                    </label>
                    <button
                      onClick={() => handleCopyMubarakbaad(selectedEnrollmentModal)}
                      className="text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                    >
                      {copiedModalText ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span>{copiedModalText ? 'Copied to Clipboard!' : 'Copy Text'}</span>
                    </button>
                  </div>
                  <pre className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 font-sans text-xs whitespace-pre-wrap leading-relaxed max-h-52 overflow-y-auto">
                    {generateMubarakbaad(selectedEnrollmentModal).body}
                  </pre>
                </div>

                {/* 3 Prominent Send Actions */}
                <div className="space-y-2.5 pt-2">
                  <button
                    onClick={() => openInGmail(selectedEnrollmentModal)}
                    className="w-full py-3 px-5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-2.5 transition-all cursor-pointer"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Open & Send via Gmail ({selectedEnrollmentModal.email})</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </button>

                  <button
                    onClick={() => openInWhatsApp(selectedEnrollmentModal)}
                    className="w-full py-3 px-5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 shadow-xl shadow-emerald-950/40 flex items-center justify-center gap-2.5 transition-all cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send Mubarakbaad via WhatsApp ({selectedEnrollmentModal.whatsapp})</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </button>

                  <div className="flex items-center justify-center gap-4 pt-1">
                    <button
                      onClick={() => openInMailto(selectedEnrollmentModal)}
                      className="text-xs text-slate-400 hover:text-cyan-300 underline cursor-pointer"
                    >
                      Or open with Outlook / Default Mail App
                    </button>
                    <span className="text-slate-600">·</span>
                    <button
                      onClick={() => setSelectedEnrollmentModal(null)}
                      className="text-xs text-slate-400 hover:text-white cursor-pointer"
                    >
                      Done / Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SUB-MODAL 2: Permanent Delete Confirmation */}
        {/* ======================================================== */}
        {deleteConfirmItem && (
          <div className="fixed inset-0 z-70 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
            <div className="relative w-full max-w-md bg-slate-900 border border-rose-500/40 rounded-2xl shadow-2xl p-6 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-rose-950/80 border border-rose-500/50 flex items-center justify-center text-rose-400 mx-auto">
                <Trash2 className="w-6 h-6" />
              </div>

              <div>
                <h4 className="text-lg font-bold text-white font-display">
                  Delete Record Permanently?
                </h4>
                <p className="text-xs text-slate-300 mt-1">
                  Are you sure you want to permanently delete{' '}
                  <strong className="text-white">{deleteConfirmItem.title}</strong>?
                </p>
                {deleteConfirmItem.details && (
                  <p className="text-[11px] text-cyan-400 mt-0.5 font-mono">
                    {deleteConfirmItem.details}
                  </p>
                )}
              </div>

              <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-500/20 text-rose-300 text-[11px] text-left">
                ⚠️ Yeh record cloud database se hamesha ke liye delete ho jayega aur dobara recover nahi ho sakega.
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setDeleteConfirmItem(null)}
                  disabled={isDeleting}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  disabled={isDeleting}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-xs shadow-lg shadow-rose-950/60 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  {isDeleting ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Trash2 className="w-3.5 h-3.5" />
                  )}
                  <span>{isDeleting ? 'Deleting...' : 'Yes, Delete Permanently'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

function Edit3Icon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  );
}
