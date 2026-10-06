import React, { useState } from 'react';
import { saveInquiryToDatabase } from '../firebase';
import { useWebsiteSettings } from '../context/WebsiteSettingsContext';
import {
  Mail,
  Phone,
  MessageSquare,
  Send,
  CheckCircle2,
  Clock,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Building,
  Loader2,
  Database
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { settings } = useWebsiteSettings();
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [inquirySent, setInquirySent] = useState(false);
  const [inquirySaving, setInquirySaving] = useState(false);
  const [inquiryDocId, setInquiryDocId] = useState<string | null>(null);

  const cleanWa = (settings.whatsapp || '030000196900').replace(/[^0-9]/g, '');

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryMessage.trim()) return;

    setInquirySaving(true);
    let docId: string | null = null;
    try {
      docId = await saveInquiryToDatabase({
        name: inquiryName,
        phone: inquiryPhone,
        email: inquiryEmail,
        message: inquiryMessage
      });
      setInquiryDocId(docId);
    } catch (err) {
      console.warn('Inquiry saved locally or continuing via WhatsApp:', err);
    } finally {
      setInquirySaving(false);
    }

    const text =
      `*General Inquiry - Veer Accountancy*\n` +
      (docId ? `*Inquiry Ref:* #${docId}\n\n` : `\n`) +
      `*Name:* ${inquiryName}\n` +
      (inquiryPhone ? `*Phone:* ${inquiryPhone}\n` : '') +
      (inquiryEmail ? `*Email:* ${inquiryEmail}\n` : '') +
      `*Message:* ${inquiryMessage}\n\n` +
      `_Sent via Veer Accountancy Contact Desk_`;

    window.open(`https://wa.me/9230000196900?text=${encodeURIComponent(text)}`, '_blank');
    setInquirySent(true);
  };

  return (
    <section className="py-16 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2 flex items-center justify-center gap-1.5">
            <Building className="w-3.5 h-3.5" />
            <span>Connect with Admissions</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Contact Veer Accountancy
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
            Have questions regarding course schedules, online vs physical attendance, or software setup? Reach out directly via WhatsApp, phone, or email.
          </p>
        </div>

        {/* 3 Main Action Cards: WhatsApp, Call, Email */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Card 1: WhatsApp */}
          <div className="glass-panel rounded-2xl p-6 sm:p-7 border border-emerald-500/40 hover:border-emerald-400 transition-all flex flex-col justify-between shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center text-emerald-400 mb-4 shadow-lg shadow-emerald-950/60">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider">
                Instant Chat
              </div>
              <h3 className="text-xl font-bold text-white font-display mt-1 mb-2">WhatsApp Us</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Chat directly with our admissions counselor for immediate assistance, course syllabus PDFs, and fee details.
              </p>
              <div className="font-mono text-sm text-emerald-300 font-semibold mb-6">
                {settings.whatsapp || '+92 300 00196900'}
              </div>
            </div>

            <a
              href={`https://wa.me/${cleanWa}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl font-semibold text-xs text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-950/60 flex items-center justify-center gap-2 transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Us Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 2: Phone */}
          <div className="glass-panel rounded-2xl p-6 sm:p-7 border border-cyan-500/40 hover:border-cyan-400 transition-all flex flex-col justify-between shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-500/50 flex items-center justify-center text-cyan-400 mb-4 shadow-lg shadow-cyan-950/60">
                <Phone className="w-6 h-6" />
              </div>
              <div className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider">
                Voice Support
              </div>
              <h3 className="text-xl font-bold text-white font-display mt-1 mb-2">Call Us</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Speak directly with our team to discuss your background, batch schedules, and recommended learning pathways.
              </p>
              <div className="font-mono text-sm text-cyan-300 font-semibold mb-6">
                {settings.phone || '+92 300 00196900'}
              </div>
            </div>

            <a
              href={`tel:${(settings.phone || '').replace(/[^0-9+]/g, '')}`}
              className="w-full py-3 px-4 rounded-xl font-semibold text-xs text-white bg-cyan-600 hover:bg-cyan-500 shadow-md shadow-cyan-950/60 flex items-center justify-center gap-2 transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>Call {settings.phone || '+92 300 00196900'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 3: Email */}
          <div className="glass-panel rounded-2xl p-6 sm:p-7 border border-blue-500/40 hover:border-blue-400 transition-all flex flex-col justify-between shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-950/80 border border-blue-500/50 flex items-center justify-center text-blue-400 mb-4 shadow-lg shadow-blue-950/60">
                <Mail className="w-6 h-6" />
              </div>
              <div className="text-xs font-mono font-semibold text-blue-400 uppercase tracking-wider">
                Official Inquiries
              </div>
              <h3 className="text-xl font-bold text-white font-display mt-1 mb-2">Email Us</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Send formal admission inquiries, corporate group training requests, or custom syllabus consultations.
              </p>
              <div className="font-mono text-xs sm:text-sm text-blue-300 font-semibold mb-6 break-all">
                {settings.email || 'tanveeruddin0714@gmail.com'}
              </div>
            </div>

            <a
              href={`mailto:${settings.email || 'tanveeruddin0714@gmail.com'}`}
              className="w-full py-3 px-4 rounded-xl font-semibold text-xs text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-950/60 flex items-center justify-center gap-2 transition-all"
            >
              <Mail className="w-4 h-4" />
              <span>Email Us</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Quick Message Form & Schedule Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800">
            <h3 className="text-lg font-bold text-white font-display mb-2">
              Send a Quick Inquiry
            </h3>
            <p className="text-xs text-slate-300 mb-6">
              Leave your message and our admissions coordinator will respond via WhatsApp or Email.
            </p>

            <form onSubmit={handleInquirySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={inquiryName}
                  onChange={(e) => setInquiryName(e.target.value)}
                  placeholder="e.g. Asad Khan"
                  className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-500 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    value={inquiryPhone}
                    onChange={(e) => setInquiryPhone(e.target.value)}
                    placeholder="e.g. 0300 0000000"
                    className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-500 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email</label>
                  <input
                    type="email"
                    value={inquiryEmail}
                    onChange={(e) => setInquiryEmail(e.target.value)}
                    placeholder="e.g. asad@gmail.com"
                    className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-500 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Your Question / Message</label>
                <textarea
                  required
                  rows={4}
                  value={inquiryMessage}
                  onChange={(e) => setInquiryMessage(e.target.value)}
                  placeholder="Ask about batch timings, software prerequisites, online classes..."
                  className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-500 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={inquirySaving}
                className="py-3 px-6 rounded-xl font-semibold text-xs text-white bg-cyan-600 hover:bg-cyan-500 disabled:opacity-70 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
              >
                {inquirySaving ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Saving to Database...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit & Transmit via WhatsApp</span>
                  </>
                )}
              </button>

              {inquirySent && (
                <div className="p-3 rounded-lg bg-emerald-950/50 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>
                    Inquiry saved to database {inquiryDocId ? `(Ref: #${inquiryDocId})` : ''} & dispatched to WhatsApp!
                  </span>
                </div>
              )}
            </form>
          </div>

          {/* Operational Hours & Guidelines (5 cols) */}
          <div className="lg:col-span-5 glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
            <div>
              <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">
                Veer Accountancy
              </div>
              <h4 className="text-lg font-bold text-white font-display mb-2">
                Admissions & Student Support
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                We accommodate both working professionals seeking evening/weekend classes and full-time learners opting for weekday batches.
              </p>
            </div>

            <div className="space-y-3 pt-3 border-t border-slate-800 text-xs">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Admissions Desk Hours</div>
                  <div className="text-slate-400">Monday – Saturday: 9:00 AM – 9:00 PM (PKT)</div>
                  <div className="text-slate-400">Sunday: 11:00 AM – 6:00 PM (Online Inquiries)</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 pt-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Direct Guidance</div>
                  <div className="text-slate-400">
                    Get honest course recommendations aligned with your exact career level and goals.
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-2">
              <div className="font-semibold text-cyan-300">Direct Contact Summary</div>
              <div className="text-slate-300 font-mono text-[11px] space-y-1">
                <div>Email: tanveeruddin0714@gmail.com</div>
                <div>Phone: +92 300 00196900</div>
                <div>WhatsApp: +92 300 00196900</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
