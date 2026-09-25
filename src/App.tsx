import React, { useState, useEffect, useRef } from 'react';
import arkreLogo from './assets/logo-transparent.png';
import { motion, useScroll, useTransform, useMotionValue, AnimatePresence, useInView } from 'framer-motion';
import {
  Moon, Sun, Briefcase, TrendingUp, Map, ArrowRight,
  CheckCircle2, Mail, Phone, MapPin, Users, Award, Target, Send,
  Star, ChevronDown,
  Calendar, Clock, X, Activity, ShieldCheck, CheckCircle,
  Compass, Hotel, UserCircle2, ChevronRight, Menu
} from 'lucide-react';
import clsx from 'clsx';
import ArkreaTraveuture from './pages/ArkreaTraveuture';
import HotelNavara from './pages/HotelNavara';
import OurProfile from './pages/OurProfile';
import MobileMenu, { scrollAfterClose } from './components/MobileMenu';

type PageType = 'home' | 'traventure' | 'navara' | 'profile';

const navSections = [
  { id: 'services', label: 'Layanan' },
  { id: 'about', label: 'Tentang' },
  { id: 'pricing', label: 'Harga' },
  { id: 'contact', label: 'Kontak' },
];

const divisions = [
  { icon: Compass, label: 'Arkrea Traventure', desc: 'Travel & Wisata Nusantara', page: 'traventure' as PageType, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  { icon: Hotel, label: 'Navara Hospitality', desc: 'Hospitality Management', page: 'navara' as PageType, color: 'text-stone-600', bg: 'bg-stone-500/10' },
  { icon: UserCircle2, label: 'Our Profile', desc: 'Tim & Perjalanan Arkrea', page: 'profile' as PageType, color: 'text-violet-500', bg: 'bg-violet-500/10' },
];

// Shared by the pricing cards, the diagnostic quiz result, and the booking modal
const pricingPlans = [
  {
    name: 'Standard Report',
    tagline: 'Untuk bisnis yang baru mulai',
    price: { monthly: 2500000, annual: 2000000 },
    popular: false,
    color: 'from-slate-500/10 to-slate-400/5',
    features: [
      'Laporan kondisi bisnis bulanan',
      'Analisis pasar lokal',
      'Rekomendasi operasional',
      '1x konsultasi online/bulan',
      'Email support',
    ],
  },
  {
    name: 'Full Report',
    tagline: 'Paling banyak dipilih',
    price: { monthly: 5000000, annual: 4000000 },
    popular: true,
    color: 'from-blue-500/15 to-indigo-500/10',
    features: [
      'Semua fitur Standard',
      'Analisis kompetitor mendalam',
      'Strategi marketing & branding',
      'Insight industri pariwisata',
      'Ringkasan laporan keuangan',
      '2x konsultasi online/bulan',
      'Priority support',
    ],
  },
  {
    name: 'Beneficial Owner',
    tagline: 'Untuk kebutuhan kepatuhan bisnis',
    price: { monthly: 8000000, annual: 6400000 },
    popular: false,
    color: 'from-violet-500/10 to-purple-400/5',
    features: [
      'Pemetaan struktur kepemilikan',
      'Analisis stakeholder & investor',
      'Compliance & regulatory check',
      'Due diligence assessment',
      'Dedicated consultant',
      'Quarterly strategy session',
    ],
  },
  {
    name: 'Financial Report',
    tagline: 'Insight keuangan level CFO',
    price: { monthly: 12000000, annual: 9600000 },
    popular: false,
    color: 'from-amber-500/10 to-orange-400/5',
    features: [
      'Semua fitur Full Report',
      'Analisis P&L komprehensif',
      'Proyeksi & pemodelan keuangan',
      'Budget planning & forecasting',
      'Tax planning overview',
      'Monthly CFO advisory session',
      'Laporan tahunan eksklusif',
    ],
  },
];

const DISCOVERY_SESSION = 'Sesi Diskusi Awal (45 menit)';
const WHATSAPP_NUMBER = '6285692909283';

const formatRupiah = (n: number) => `Rp${n.toLocaleString('id-ID')}`;

// Close a modal with the Escape key
function useEscapeKey(active: boolean, onEscape: () => void) {
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onEscape();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, onEscape]);
}

// The next `count` working days (Mon–Fri), starting tomorrow
function nextWorkingDays(count: number) {
  const days: string[] = [];
  const d = new Date();
  while (days.length < count) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 0 && d.getDay() !== 6) {
      days.push(d.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short' }));
    }
  }
  return days;
}

const slides = [
  {
    id: 'business',
    title: 'Struktur Bisnis',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80&fit=crop',
    color: 'from-blue-500/20 to-purple-500/20'
  },
  {
    id: 'marketing',
    title: 'Strategi Pemasaran',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&q=80&fit=crop',
    color: 'from-emerald-500/20 to-teal-500/20'
  },
  {
    id: 'tourism',
    title: 'Pariwisata & Perhotelan',
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&q=80&fit=crop',
    color: 'from-orange-500/20 to-amber-500/20'
  }
];

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let cur = 0;
    const step = Math.max(1, Math.floor(value / 40));
    const id = setInterval(() => {
      cur += step;
      if (cur >= value) { setN(value); clearInterval(id); }
      else setN(cur);
    }, 25);
    return () => clearInterval(id);
  }, [inView, value]);
  return <span ref={ref}>{n}{suffix}</span>;
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border/50 py-6">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center text-left text-lg md:text-xl font-medium text-foreground hover:text-primary transition-colors py-2 gap-4 cursor-pointer"
      >
        <span>{question}</span>
        <div className={clsx("w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 transition-transform duration-300", open ? "rotate-180 bg-primary text-primary-foreground" : "text-primary")}>
          <ChevronDown className="w-4 h-4" />
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-muted-foreground leading-relaxed pt-3 pb-2 text-base max-w-3xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Feature 2: Diagnostic Quiz Modal ─── */
function DiagnosticQuizModal({
  isOpen,
  onClose,
  onOpenBooking,
}: {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: (tier: string) => void;
}) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({ challenge: '', scale: '', timeline: '' });

  useEscapeKey(isOpen, onClose);

  if (!isOpen) return null;

  // Recommendation maps to a real package from `pricingPlans`
  const getResult = () => {
    if (answers.scale === 'startup') {
      return {
        plan: pricingPlans[0],
        summary: 'Bisnis Anda sedang berada di titik penting. Standard Report memberi gambaran kondisi bisnis dan rekomendasi operasional bulanan agar Anda bisa menembus batas omzet awal tanpa harus merekrut tim manajemen penuh.',
      };
    } else if (answers.scale === 'umkm') {
      return {
        plan: pricingPlans[1],
        summary: 'Sebagai usaha yang sedang bertumbuh, hambatan operasional dan pemasaran mulai menahan margin Anda. Full Report menggabungkan analisis kompetitor, strategi marketing, dan ringkasan keuangan untuk mempercepat pertumbuhan.',
      };
    } else {
      return {
        plan: pricingPlans[3],
        summary: 'Untuk organisasi yang sudah mapan, profit yang berkelanjutan membutuhkan analisis keuangan mendalam dan perencanaan anggaran yang matang. Financial Report memberi insight keuangan setingkat CFO setiap bulan.',
      };
    }
  };

  const result = getResult();

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Diagnosa bisnis 1 menit"
      className="fixed inset-0 z-[200] bg-black/75 backdrop-blur-md flex items-center justify-center p-4 md:p-6 overflow-y-auto"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="bg-card/95 dark:bg-card/98 backdrop-blur-2xl border border-border/70 rounded-[2.5rem] w-full max-w-2xl p-7 md:p-10 shadow-2xl relative my-auto"
      >
        <button
          onClick={onClose}
          aria-label="Tutup"
          className="absolute top-7 right-7 w-10 h-10 rounded-full bg-background/80 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:scale-105 transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-xl bg-primary/15 flex items-center justify-center text-primary">
            <Activity className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Diagnosa Bisnis 1 Menit
          </span>
        </div>

        {step < 4 ? (
          <div>
            <div className="flex items-center justify-between text-xs font-medium text-muted-foreground mb-3">
              <span>Langkah {step} dari 3</span>
              <span>{Math.round((step / 3) * 100)}% selesai</span>
            </div>
            <div className="w-full bg-border/40 h-2 rounded-full overflow-hidden mb-8">
              <div
                className="bg-primary h-full transition-all duration-500 rounded-full"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>

            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h3 className="text-2xl font-display font-medium mb-2 text-foreground">
                  Apa tantangan utama yang menghambat pertumbuhan bisnis Anda?
                </h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Pilih hambatan utama yang perlu menjadi fokus konsultan kami.
                </p>
                <div className="grid sm:grid-cols-2 gap-3.5">
                  {[
                    { id: 'revenue', title: 'Omzet & Penjualan Stagnan', desc: 'Perlu menembus plateau dan meningkatkan margin keuntungan.' },
                    { id: 'operations', title: 'Operasional Berbelit', desc: 'Alur kerja tersendat, banyak pekerjaan manual, SOP belum jelas.' },
                    { id: 'financial', title: 'Audit Keuangan & Legal', desc: 'Merapikan arus kas, optimasi pajak, dan persiapan audit.' },
                    { id: 'marketing', title: 'Positioning Brand', desc: 'Memperkuat nilai jual dan masuk ke segmen pasar baru.' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setAnswers({ ...answers, challenge: item.title });
                        setStep(2);
                      }}
                      className={clsx(
                        'p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between group',
                        answers.challenge === item.title
                          ? 'border-primary bg-primary/10 shadow-md'
                          : 'border-border/60 bg-background/40 hover:border-primary/50 hover:bg-card'
                      )}
                    >
                      <h4 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors text-base">
                        {item.title}
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h3 className="text-2xl font-display font-medium mb-2 text-foreground">
                  Seberapa besar skala tim atau organisasi Anda saat ini?
                </h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Ini membantu kami menentukan paket yang paling sesuai.
                </p>
                <div className="space-y-3.5">
                  {[
                    { id: 'startup', label: 'Tahap Awal / Startup (1 – 10 orang)', desc: 'Tim gesit yang butuh struktur KPI dasar dan kerangka penjualan.' },
                    { id: 'umkm', label: 'UMKM Berkembang (11 – 50 orang)', desc: 'Usaha yang butuh sistem untuk bertumbuh, delegasi, dan rapi secara keuangan.' },
                    { id: 'enterprise', label: 'Perusahaan Mapan (50+ orang)', desc: 'Organisasi kompleks yang butuh restrukturisasi dan perencanaan keuangan.' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setAnswers({ ...answers, scale: item.id });
                        setStep(3);
                      }}
                      className={clsx(
                        'w-full p-5 rounded-2xl border text-left transition-all cursor-pointer group',
                        answers.scale === item.id
                          ? 'border-primary bg-primary/10 shadow-md'
                          : 'border-border/60 bg-background/40 hover:border-primary/50 hover:bg-card'
                      )}
                    >
                      <h4 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors text-base">
                        {item.label}
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="mt-6 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  ← Kembali ke langkah sebelumnya
                </button>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h3 className="text-2xl font-display font-medium mb-2 text-foreground">
                  Kapan Anda perlu mulai menjalankan solusi strategis?
                </h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Kami menjadwalkan konsultan berdasarkan tingkat urgensi.
                </p>
                <div className="space-y-3.5">
                  {[
                    { id: 'immediate', label: 'Segera (1 – 2 minggu)', desc: 'Prioritas, tim kami langsung mendampingi.' },
                    { id: 'month', label: 'Jangka pendek (dalam 30 hari)', desc: 'Siap memulai audit dan sesi strategi bulan depan.' },
                    { id: 'quarter', label: 'Jangka panjang (3 – 6 bulan)', desc: 'Merencanakan pertumbuhan dan anggaran tahunan.' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setAnswers({ ...answers, timeline: item.label });
                        setStep(4);
                      }}
                      className={clsx(
                        'w-full p-5 rounded-2xl border text-left transition-all cursor-pointer group',
                        answers.timeline === item.label
                          ? 'border-primary bg-primary/10 shadow-md'
                          : 'border-border/60 bg-background/40 hover:border-primary/50 hover:bg-card'
                      )}
                    >
                      <h4 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors text-base">
                        {item.label}
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="mt-6 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  ← Kembali ke langkah sebelumnya
                </button>
              </motion.div>
            )}
          </div>
        ) : (
          /* Step 4: Diagnostic Results */
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-semibold text-xs mb-3">
                <CheckCircle className="w-3.5 h-3.5" /> Diagnosa Selesai
              </div>
              <h3 className="text-3xl font-display font-medium text-foreground mb-1">
                Rekomendasi untuk bisnis Anda.
              </h3>
              <p className="text-sm text-muted-foreground">
                Disesuaikan dengan jawaban Anda
              </p>
            </div>

            <div className="bg-gradient-to-br from-primary/15 via-primary/5 to-transparent border border-primary/30 p-6 rounded-3xl mb-6">
              <div className="pb-5 border-b border-primary/20 mb-5">
                <p className="text-xs font-bold uppercase tracking-wider text-primary mb-1">
                  Paket yang Direkomendasikan
                </p>
                <h4 className="text-2xl font-bold text-foreground">{result.plan.name}</h4>
                <p className="text-sm text-muted-foreground">
                  Mulai {formatRupiah(result.plan.price.monthly)} / bulan
                </p>
              </div>

              <p className="text-sm text-foreground/90 leading-relaxed mb-4">
                {result.summary}
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                <span>Harga final dan cakupan disesuaikan setelah sesi diskusi awal. Data Anda dijaga kerahasiaannya.</span>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3.5">
              <button
                onClick={() => {
                  onClose();
                  onOpenBooking(result.plan.name);
                }}
                className="w-full py-3.5 px-5 bg-primary text-primary-foreground font-semibold text-sm rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-primary/25 cursor-pointer text-center"
              >
                Jadwalkan Konsultasi →
              </button>
              <button
                onClick={() => {
                  onClose();
                  scrollTo('pricing');
                }}
                className="w-full py-3.5 px-5 bg-background border border-border font-semibold text-sm text-foreground rounded-2xl hover:bg-card hover:border-primary/40 transition-all cursor-pointer text-center"
              >
                Lihat Semua Paket
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

/* ─── Feature 3: Calendly-Style Booking Modal ─── */
const sessionOptions = [DISCOVERY_SESSION, ...pricingPlans.map((p) => p.name)];
const timeSlots = ['09:00', '11:00', '14:00', '16:00'];

function BookingModal({
  isOpen,
  onClose,
  initialTier,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialTier: string;
}) {
  const [dateOptions] = useState(() => nextWorkingDays(4));
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    sessionType: initialTier || DISCOVERY_SESSION,
    date: dateOptions[0],
    timeSlot: timeSlots[0],
    name: '',
    company: '',
    email: '',
    whatsapp: '',
    notes: '',
  });

  // Pre-select the package chosen from the quiz or a pricing card each time the modal opens
  useEffect(() => {
    if (isOpen && initialTier) {
      setBookingData((prev) => ({ ...prev, sessionType: initialTier }));
    }
  }, [isOpen, initialTier]);

  const handleClose = () => {
    setStep(1);
    onClose();
  };
  useEscapeKey(isOpen, handleClose);

  if (!isOpen) return null;

  const handleGoogleCalendar = () => {
    const title = encodeURIComponent(`Konsultasi Arkrea: ${bookingData.sessionType}`);
    const details = encodeURIComponent(
      `Sesi konsultasi dengan Arteri Kreasi Nusantara.\nKlien: ${bookingData.name} (${bookingData.company})\nEmail: ${bookingData.email}\nWhatsApp: ${bookingData.whatsapp}\nCatatan: ${bookingData.notes}`
    );
    const location = encodeURIComponent('Online (link meeting dikirim via WhatsApp)');
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
    window.open(url, '_blank');
  };

  const handleWhatsAppConfirm = () => {
    const text = encodeURIComponent(
      `Halo Pak Azariel!\n\n` +
      `Saya ingin memesan sesi konsultasi melalui website Arkrea. Berikut detail booking saya:\n\n` +
      `*DETAIL BOOKING*\n` +
      `Sesi      : ${bookingData.sessionType}\n` +
      `Tanggal   : ${bookingData.date}\n` +
      `Waktu     : ${bookingData.timeSlot} WIB\n\n` +
      `*DATA KLIEN*\n` +
      `Nama         : ${bookingData.name}\n` +
      `Perusahaan   : ${bookingData.company}\n` +
      `Email        : ${bookingData.email}\n` +
      `No. WhatsApp : ${bookingData.whatsapp}\n\n` +
      `${bookingData.notes ? `*Catatan:* ${bookingData.notes}\n\n` : ``}` +
      `Mohon konfirmasi ketersediaan dan link meeting-nya. Terima kasih!`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Booking konsultasi"
      className="fixed inset-0 z-[200] bg-black/75 backdrop-blur-md flex items-center justify-center p-4 md:p-6 overflow-y-auto"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="bg-card/95 dark:bg-card/98 backdrop-blur-2xl border border-border/70 rounded-[2.5rem] w-full max-w-2xl p-7 md:p-10 shadow-2xl relative my-auto"
      >
        <button
          onClick={handleClose}
          aria-label="Tutup"
          className="absolute top-7 right-7 w-10 h-10 rounded-full bg-background/80 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:scale-105 transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-xl bg-primary/15 flex items-center justify-center text-primary">
            <Calendar className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Booking Konsultasi
          </span>
        </div>

        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h3 className="text-2xl font-display font-medium mb-2 text-foreground">
              Jadwalkan sesi konsultasi Anda.
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              Pilih fokus sesi, tanggal, dan jam (WIB) yang Anda inginkan.
            </p>

            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2.5">
                1. Fokus Sesi / Paket
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {sessionOptions.map((tier) => (
                  <button
                    key={tier}
                    onClick={() => setBookingData({ ...bookingData, sessionType: tier })}
                    className={clsx(
                      'p-3 rounded-xl border text-xs font-medium text-left transition-all cursor-pointer',
                      bookingData.sessionType === tier
                        ? 'border-primary bg-primary/15 text-primary font-bold shadow-sm'
                        : 'border-border/60 bg-background/50 text-foreground hover:border-primary/40'
                    )}
                  >
                    {tier}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2.5">
                2. Pilih Tanggal
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {dateOptions.map((d) => (
                  <button
                    key={d}
                    onClick={() => setBookingData({ ...bookingData, date: d })}
                    className={clsx(
                      'p-3 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer',
                      bookingData.date === d
                        ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                        : 'border-border/60 bg-background/50 text-foreground hover:border-primary/40'
                    )}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2.5">
                3. Pilih Jam (WIB)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {timeSlots.map((t) => (
                  <button
                    key={t}
                    onClick={() => setBookingData({ ...bookingData, timeSlot: t })}
                    className={clsx(
                      'p-3 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer flex items-center justify-center gap-1.5',
                      bookingData.timeSlot === t
                        ? 'border-primary bg-primary/15 text-primary font-bold'
                        : 'border-border/60 bg-background/50 text-foreground hover:border-primary/40'
                    )}
                  >
                    <Clock className="w-3.5 h-3.5 shrink-0" /> {t}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-4 bg-primary text-primary-foreground font-semibold text-sm rounded-2xl hover:scale-[1.01] active:scale-[0.99] transition-all shadow-lg shadow-primary/25 cursor-pointer"
            >
              Lanjut: Isi Data Anda →
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h3 className="text-2xl font-display font-medium mb-2 text-foreground">
              Data Anda.
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              Kami akan menghubungi Anda melalui kontak ini untuk konfirmasi jadwal.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setStep(3);
              }}
              className="space-y-4"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="bk-name" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Nama Lengkap *
                  </label>
                  <input
                    id="bk-name"
                    type="text"
                    required
                    placeholder="cth. Raditya Pratama"
                    value={bookingData.name}
                    onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                    className="w-full bg-background/60 border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="bk-company" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Nama Perusahaan *
                  </label>
                  <input
                    id="bk-company"
                    type="text"
                    required
                    placeholder="cth. PT Nusantara Group"
                    value={bookingData.company}
                    onChange={(e) => setBookingData({ ...bookingData, company: e.target.value })}
                    className="w-full bg-background/60 border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="bk-email" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Email *
                  </label>
                  <input
                    id="bk-email"
                    type="email"
                    required
                    placeholder="raditya@perusahaan.com"
                    value={bookingData.email}
                    onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                    className="w-full bg-background/60 border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="bk-wa" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Nomor WhatsApp *
                  </label>
                  <input
                    id="bk-wa"
                    type="tel"
                    required
                    placeholder="0812 3456 7890"
                    value={bookingData.whatsapp}
                    onChange={(e) => setBookingData({ ...bookingData, whatsapp: e.target.value })}
                    className="w-full bg-background/60 border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="bk-notes" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Catatan Singkat (Opsional)
                </label>
                <textarea
                  id="bk-notes"
                  rows={2}
                  placeholder="Ceritakan singkat hal yang ingin dibahas dalam sesi..."
                  value={bookingData.notes}
                  onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                  className="w-full bg-background/60 border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                />
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-3.5 bg-background border border-border rounded-xl text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  ← Kembali
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3.5 bg-primary text-primary-foreground font-semibold text-sm rounded-xl hover:scale-[1.01] active:scale-[0.99] transition-all shadow-lg shadow-primary/25 cursor-pointer"
                >
                  Lanjut ke Konfirmasi →
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4">
            <div className="w-16 h-16 rounded-3xl bg-emerald-500/15 text-emerald-500 mx-auto flex items-center justify-center mb-5">
              <Phone className="w-8 h-8" />
            </div>
            <h3 className="text-3xl font-display font-medium text-foreground mb-2">
              Satu langkah lagi.
            </h3>
            <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6 leading-relaxed">
              Kirim detail <span className="font-semibold text-foreground">{bookingData.sessionType}</span> untuk{' '}
              <span className="font-semibold text-primary">{bookingData.date}</span> pukul{' '}
              <span className="font-semibold text-primary">{bookingData.timeSlot} WIB</span> ke admin kami via WhatsApp.
              Jadwal terkunci setelah admin mengonfirmasi.
            </p>

            <div className="bg-background/60 border border-border/70 p-5 rounded-2xl max-w-md mx-auto mb-6 text-left space-y-2 text-xs">
              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">Peserta:</span>
                <span className="font-semibold text-foreground text-right">{bookingData.name} ({bookingData.company})</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">Kontak:</span>
                <span className="font-semibold text-foreground text-right">{bookingData.whatsapp}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">Format:</span>
                <span className="font-semibold text-foreground text-right">Online (link dikirim setelah konfirmasi)</span>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 max-w-md mx-auto mb-6">
              <button
                onClick={handleWhatsAppConfirm}
                className="py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer sm:order-2"
              >
                <Phone className="w-4 h-4" /> Kirim via WhatsApp
              </button>
              <button
                onClick={handleGoogleCalendar}
                className="py-3 px-4 bg-background border border-border text-foreground font-semibold text-xs rounded-xl hover:bg-card hover:border-primary/40 transition-all flex items-center justify-center gap-2 cursor-pointer sm:order-1"
              >
                <Calendar className="w-4 h-4 text-primary" /> Simpan ke Google Calendar
              </button>
            </div>

            <button
              onClick={handleClose}
              className="text-xs font-semibold text-muted-foreground hover:text-foreground underline cursor-pointer"
            >
              Tutup dan kembali ke website
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}


export default function App() {
  // Dark mode: remembered per visitor, defaults to the OS preference
  const [isDark, setIsDark] = useState(() => {
    try {
      const saved = localStorage.getItem('arkrea-theme');
      if (saved) return saved === 'dark';
    } catch { /* storage unavailable */ }
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isAnnual, setIsAnnual] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingInitialTier, setBookingInitialTier] = useState(DISCOVERY_SESSION);

  // Scroll to top when navigating to home
  useEffect(() => {
    if (currentPage === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [currentPage]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'services', 'about', 'pricing', 'contact'];
      const scrollPosition = window.scrollY + 250;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    try { localStorage.setItem('arkrea-theme', isDark ? 'dark' : 'light'); } catch { /* storage unavailable */ }
  }, [isDark]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const { scrollYProgress } = useScroll();
  // subtle scale effect for hero parallax
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 1.04]);

  // Pointer position (-0.5 … 0.5) kept in motion values so moving the mouse
  // animates the hero without re-rendering the whole page
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const orbX = useTransform(mouseX, (v) => v * -100);
  const orbY = useTransform(mouseY, (v) => v * -100);
  const tiltX = useTransform(mouseY, (v) => v * 10);
  const tiltY = useTransform(mouseX, (v) => v * -10);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Halo Pak Azariel!\n\n` +
      `Saya ingin berkonsultasi / mengirimkan pesan melalui website Arkrea:\n\n` +
      `*DATA PENGIRIM*\n` +
      `Nama  : ${formData.name}\n` +
      `Email : ${formData.email}\n\n` +
      `*PESAN*\n` +
      `${formData.message}\n\n` +
      `Mohon konfirmasi dan informasinya. Terima kasih!`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
    setFormSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  // ── Route to sub-pages ──
  if (currentPage === 'traventure') {
    return <ArkreaTraveuture onBack={() => setCurrentPage('home')} />;
  }
  if (currentPage === 'navara') {
    return <HotelNavara onBack={() => setCurrentPage('home')} />;
  }
  if (currentPage === 'profile') {
    return <OurProfile onBack={() => setCurrentPage('home')} isDark={isDark} onToggleDark={() => setIsDark(!isDark)} />;
  }

  return (
    <div className="min-h-screen font-sans selection:bg-primary selection:text-primary-foreground overflow-hidden">
      {/* Modals */}
      <DiagnosticQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onOpenBooking={(tier) => {
          setBookingInitialTier(tier);
          setIsBookingOpen(true);
        }}
      />
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialTier={bookingInitialTier}
      />

      {/* ─── Scroll Progress Bar ─── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] z-[100] origin-left"
        style={{
          scaleX: scrollYProgress,
          background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4)',
        }}
      />

      {/* Dynamic Soft Background */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">

        {/* Frosted glass base */}
        <div className="absolute inset-0 bg-background/60 backdrop-blur-[40px]" />

        {/* Primary slide-synced orb (centre, mouse-tracked) */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3.5, ease: 'easeInOut' }}
            className={clsx(
              'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] max-w-[1200px] max-h-[1200px] rounded-full blur-[80px] opacity-60 bg-gradient-to-tr',
              slides[activeSlide].color
            )}
            style={{ x: orbX, y: orbY }}
          />
        </AnimatePresence>

        {/* Floating orb — top-left accent */}
        <motion.div
          className="absolute -top-20 -left-20 w-[480px] h-[480px] rounded-full blur-[90px] bg-gradient-to-br from-violet-500/50 to-indigo-500/50"
          animate={{ x: [0, 50, -25, 0], y: [0, -40, 60, 0], scale: [1, 1.1, 0.93, 1] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Floating orb — bottom-right accent */}
        <motion.div
          className="absolute -bottom-24 -right-24 w-[560px] h-[560px] rounded-full blur-[90px] bg-gradient-to-tl from-sky-500/45 to-teal-500/45"
          animate={{ x: [0, -55, 35, 0], y: [0, 45, -35, 0], scale: [1, 0.9, 1.12, 1] }}
          transition={{ duration: 50, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
        />

        {/* Dot-grid texture */}
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Drifting diagonal lines */}
        <motion.div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'repeating-linear-gradient(135deg, currentColor 0px, currentColor 1px, transparent 1px, transparent 56px)',
            width: '200%',
            left: '-50%',
          }}
          animate={{ x: ['0%', '25%'] }}
          transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
        />
      </div>


      {/* Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center backdrop-blur-md bg-background/30 border-b border-border/50 transition-colors duration-300"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <button
          onClick={() => scrollTo('hero')}
          className="cursor-pointer"
          aria-label="Arkrea — kembali ke atas"
        >
          <div
            style={{
              maskImage: `url(${arkreLogo})`,
              WebkitMaskImage: `url(${arkreLogo})`,
              maskSize: 'contain',
              maskRepeat: 'no-repeat',
              maskPosition: 'left center',
              height: '28px',
              width: '140px',
            }}
            className="bg-foreground"
          />
        </button>

        <div className="flex items-center gap-3 md:gap-5">
          <div className="hidden md:flex gap-5 text-base font-medium">
            {navSections.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={clsx(
                  "relative py-1 transition-colors cursor-pointer text-sm",
                  activeSection === id ? "text-primary font-semibold" : "text-muted-foreground hover:text-primary"
                )}
              >
                {label}
                {activeSection === id && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* ── Layanan Dropdown ── */}
          <div className="relative">
            <button
              onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
              onBlur={() => setTimeout(() => setIsServicesDropdownOpen(false), 150)}
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border/60 bg-background/50 text-foreground text-xs font-semibold hover:border-primary/50 hover:bg-card transition-all cursor-pointer backdrop-blur-md"
            >
              <Briefcase className="w-3.5 h-3.5" />
              Layanan Kami
              <ChevronRight className={clsx('w-3 h-3 transition-transform duration-300', isServicesDropdownOpen ? 'rotate-90' : '')} />
            </button>

            <AnimatePresence>
              {isServicesDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="absolute top-full right-0 mt-2 w-64 bg-card/95 backdrop-blur-2xl border border-border/70 rounded-2xl shadow-2xl shadow-black/10 overflow-hidden z-50"
                >
                  <div className="p-2">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground px-3 pt-2 pb-1">Divisi Bisnis</p>
                    {divisions.map((svc) => (
                      <button
                        key={svc.page}
                        onClick={() => {
                          setCurrentPage(svc.page);
                          setIsServicesDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-muted transition-colors text-left group cursor-pointer"
                      >
                        <div className={clsx('w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all', svc.bg)}>
                          <svc.icon className={clsx('w-4 h-4', svc.color)} />
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">{svc.label}</div>
                          <div className="text-xs text-muted-foreground">{svc.desc}</div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => setIsQuizOpen(true)}
            className="hidden sm:inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-primary/15 text-primary text-xs font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-pointer shadow-sm shrink-0 leading-none"
          >
            <Activity className="w-3.5 h-3.5 shrink-0 animate-pulse" />
            <span className="leading-none pt-[1px]">Diagnosa 1 Menit</span>
          </button>

          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-full bg-background/50 border border-border/50 hover:bg-muted transition-colors backdrop-blur-md cursor-pointer"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-2 rounded-full bg-background/50 border border-border/50 hover:bg-muted transition-colors backdrop-blur-md cursor-pointer"
            aria-label="Buka menu"
            aria-expanded={isMobileMenuOpen}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu — outside <motion.nav> so `fixed` covers the viewport */}
      <MobileMenu
        open={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        title="Menu"
        footer={
          <>
            <button
              onClick={() => { setIsMobileMenuOpen(false); setIsQuizOpen(true); }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-primary/15 text-primary font-semibold text-sm cursor-pointer"
            >
              <Activity className="w-4 h-4" /> Diagnosa 1 Menit
            </button>
            <button
              onClick={() => { setIsMobileMenuOpen(false); setIsBookingOpen(true); }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm cursor-pointer"
            >
              <Calendar className="w-4 h-4" /> Booking Konsultasi
            </button>
          </>
        }
      >
        {navSections.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => scrollAfterClose(() => setIsMobileMenuOpen(false), id)}
            className={clsx(
              'w-full text-left px-3 py-3 rounded-xl text-base transition-colors cursor-pointer',
              activeSection === id ? 'bg-primary/10 text-primary font-semibold' : 'hover:bg-muted'
            )}
          >
            {label}
          </button>
        ))}
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground px-3 pt-6 pb-2">
          Divisi Bisnis
        </p>
        {divisions.map((svc) => (
          <button
            key={svc.page}
            onClick={() => { setIsMobileMenuOpen(false); setCurrentPage(svc.page); }}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-muted transition-colors text-left cursor-pointer"
          >
            <div className={clsx('w-10 h-10 rounded-xl flex items-center justify-center shrink-0', svc.bg)}>
              <svc.icon className={clsx('w-5 h-5', svc.color)} />
            </div>
            <div>
              <div className="font-semibold text-sm">{svc.label}</div>
              <div className="text-xs text-muted-foreground">{svc.desc}</div>
            </div>
          </button>
        ))}
      </MobileMenu>

      <main>
        {/* ─── Hero Section ─── */}
        <section id="hero" className="relative min-h-screen flex items-center pt-24 pb-12">

          <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="z-10"
            >
              <h1 className="text-5xl md:text-7xl font-display font-semibold leading-[1.1] mb-6 tracking-tight">
                Anda visioner.<br />
                <span className="font-light text-muted-foreground">Kami yang bereskan.</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed">
                Memulai dan menjalankan bisnis itu penuh tantangan. Kami mengambil alih kerumitan
                konsultasi agar Anda bisa fokus pada impian, bukan tekanan.
              </p>

              {/* Dynamic Service Indicator */}
              <div className="h-12 overflow-hidden mb-8 relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSlide}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -40, opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="absolute inset-0 flex items-center gap-3 text-lg font-medium"
                  >
                    <div className="w-8 h-[2px] bg-primary" />
                    Berfokus pada {slides[activeSlide].title}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => {
                    setBookingInitialTier('Penemuan & Audit (45 Menit)');
                    setIsBookingOpen(true);
                  }}
                  className="relative group overflow-hidden px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium flex items-center gap-2 hover:scale-105 transition-transform duration-300 shadow-lg shadow-primary/15 cursor-pointer"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Mulai Sekarang <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                </button>
                <button
                  onClick={() => scrollTo('services')}
                  className="relative group overflow-hidden px-8 py-4 bg-background/50 border border-border/80 rounded-full font-medium flex items-center gap-2 hover:scale-105 hover:border-primary/50 hover:bg-background/80 transition-all duration-300 backdrop-blur-md shadow-sm cursor-pointer"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Layanan Kami <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </span>
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-primary/10 to-transparent pointer-events-none" />
                </button>
              </div>

              {/* Trusted By */}
              <motion.div
                className="mt-12 pt-8 border-t border-border/30"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground/60 mb-5">
                  Klien Kami
                </p>
                <div className="flex flex-wrap gap-3">
                  {[
                    { name: 'Aldo Frozen Food', abbr: 'AF' },
                    { name: 'De Wahyu Hotel', abbr: 'DW' },
                    { name: 'Nirwana Hotel', abbr: 'NH' },
                    { name: 'Mahkamah Agung RI', abbr: 'MA' },
                  ].map((brand, i) => (
                    <motion.div
                      key={brand.name}
                      className="flex items-center gap-2.5 px-4 py-2.5 bg-background/40 backdrop-blur-md border border-border/40 rounded-full hover:bg-background/70 hover:border-border/70 transition-all duration-300 cursor-default group"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.9 + i * 0.08 }}
                      whileHover={{ scale: 1.04 }}
                    >
                      <div className="w-5 h-5 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                        <span className="text-[8px] font-bold text-primary leading-none">{brand.abbr}</span>
                      </div>
                      <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                        {brand.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right Visuals */}
            <div className="relative h-[600px] w-full hidden lg:block perspective-[1000px]">
              <motion.div
                className="w-full h-full relative preserve-3d"
                style={{
                  rotateX: tiltX,
                  rotateY: tiltY,
                  scale: heroScale,
                }}
                transition={{ type: 'spring', stiffness: 75, damping: 15 }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSlide}
                    initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                  >
                    <div className="w-full h-full p-2 bg-background/40 backdrop-blur-xl border border-border/50 rounded-[2.5rem] shadow-2xl overflow-hidden">
                      <img
                        src={slides[activeSlide].image}
                        alt={slides[activeSlide].title}
                        className="w-full h-full object-cover rounded-[2rem]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent rounded-[2rem]" />
                      <motion.div
                        className="absolute bottom-8 left-8 right-8 bg-background/60 backdrop-blur-md border border-border/50 p-6 rounded-2xl"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">
                              Keahlian
                            </p>
                            <h3 className="text-xl font-display font-medium">
                              {slides[activeSlide].title}
                            </h3>
                          </div>
                          <button
                            onClick={() => scrollTo('services')}
                            title={`Explore ${slides[activeSlide].title} services`}
                            className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:scale-110 active:scale-95 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 cursor-pointer group/btn shrink-0"
                          >
                            <ArrowRight className="w-5 h-5 -rotate-45 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                          </button>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Slide Indicators */}
                <div className="absolute -left-6 top-1/2 -translate-y-1/2 flex flex-col gap-3">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveSlide(i)}
                      className={clsx(
                        'w-2 rounded-full transition-all duration-500',
                        i === activeSlide ? 'h-12 bg-primary' : 'h-2 bg-border hover:bg-primary/50'
                      )}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>


        {/* ─── Divisions Section ─── */}
        <section id="divisions" className="py-24 relative">
          <div className="container mx-auto px-6">
            <motion.div
              className="mb-14"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary mb-3">
                Ekosistem Bisnis
              </p>
              <h2 className="text-4xl md:text-5xl font-display font-medium mb-4">
                Divisi Kami
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
                Arteri Kreasi Nusantara hadir melalui tiga divisi utama — klik untuk menjelajahi masing-masing.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-5">
              {[
                {
                  page: 'traventure' as PageType,
                  tag: 'Travel & Wisata',
                  name: 'Arkrea\nTraventure',
                  desc: 'Destinasi autentik Nusantara — dari Raja Ampat hingga Bali, bersama pemandu lokal berpengalaman.',
                  image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=900&q=80&fit=crop',
                  accent: '#C4A882',
                  accentBg: 'from-amber-900/70',
                },
                {
                  page: 'navara' as PageType,
                  tag: 'Hospitality Management',
                  name: 'Navara\nHospitality',
                  desc: 'Pengelolaan dan pengembangan bisnis hospitality yang mengedepankan kualitas, keramahan, dan nilai pengalaman.',
                  image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=80&fit=crop',
                  accent: '#C9A96E',
                  accentBg: 'from-stone-900/70',
                },
                {
                  page: 'profile' as PageType,
                  tag: 'Tim & Profil',
                  name: 'Our\nProfile',
                  desc: 'Kenali orang-orang di balik Arteri Kreasi Nusantara — visi, misi, dan perjalanan kami.',
                  image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80&fit=crop',
                  accent: '#a78bfa',
                  accentBg: 'from-violet-900/70',
                },
              ].map((div, i) => (
                <motion.button
                  key={div.page}
                  onClick={() => setCurrentPage(div.page)}
                  className="relative group overflow-hidden rounded-[2rem] text-left focus:outline-none"
                  style={{ aspectRatio: '3/4' }}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Background photo */}
                  <motion.img
                    src={div.image}
                    alt={div.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${div.accentBg} via-black/30 to-transparent`} />

                  {/* Hover highlight */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `radial-gradient(circle at 50% 80%, ${div.accent}25 0%, transparent 70%)` }}
                  />

                  {/* Border glow on hover */}
                  <div
                    className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ boxShadow: `inset 0 0 0 1.5px ${div.accent}60` }}
                  />

                  {/* Content */}
                  <div className="absolute inset-0 p-7 flex flex-col justify-between">
                    {/* Top tag */}
                    <div className="flex items-start justify-between">
                      <span
                        className="text-xs font-semibold uppercase tracking-[0.3em] px-3 py-1.5 rounded-full backdrop-blur-md bg-black/30"
                        style={{ color: div.accent, border: `1px solid ${div.accent}40` }}
                      >
                        {div.tag}
                      </span>
                      <motion.div
                        className="w-9 h-9 rounded-full border border-white/25 flex items-center justify-center text-white backdrop-blur-md bg-black/20"
                        animate={{ opacity: 1 }}
                        initial={{ opacity: 0 }}
                        whileHover={{ scale: 1.1, backgroundColor: `${div.accent}40` }}
                      >
                        <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-400" />
                      </motion.div>
                    </div>

                    {/* Bottom content */}
                    <div>
                      <h3
                        className="font-display font-semibold text-white leading-tight mb-3 whitespace-pre-line"
                        style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
                      >
                        {div.name}
                      </h3>
                      <p className="text-white/60 text-sm leading-relaxed mb-5 max-w-[240px]">
                        {div.desc}
                      </p>
                      <div
                        className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider"
                        style={{ color: div.accent }}
                      >
                        <span>Jelajahi</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Services Section ─── */}
        <section id="services" className="py-32 relative">
          <div className="container mx-auto px-6">
            <motion.div
              className="max-w-2xl mb-20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-display font-medium mb-6">Bidang Layanan Kami</h2>
              <p className="text-muted-foreground text-xl leading-relaxed">
                Kami mengintegrasikan dua fungsi utama dalam satu entitas. Anda tentukan tujuannya; kami yang membangun peta dan mengemudikan mobilnya.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Briefcase,
                  title: 'Konsultan Bisnis & Manajemen',
                  desc: 'Business Planning, Coaching, Analisa Kelayakan, Media Sosial & Marketing, serta HRD untuk fondasi bisnis yang kokoh.',
                },
                {
                  icon: TrendingUp,
                  title: 'Operator Bisnis (Arkrea Biz)',
                  desc: 'Kami terjun langsung mengelola manajerial, operasional, sistem keuangan, HRD, dan marketing bisnis Anda.',
                },
                {
                  icon: Map,
                  title: 'Event & Hospitality',
                  desc: 'Event organizer profesional serta manajemen hotel, resort, dan villa dengan standar pelayanan terbaik.',
                },
              ].map((service, i) => (
                <motion.div
                  key={i}
                  onClick={() => scrollTo('contact')}
                  className="bg-background/40 backdrop-blur-md border border-border/50 p-10 rounded-[2.5rem] hover:bg-card/80 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-2 transition-all duration-500 group flex flex-col justify-between cursor-pointer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <div>
                    <div className="w-14 h-14 bg-background border border-border/50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 transition-all duration-500">
                      <service.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-medium mb-4">{service.title}</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed mb-6">{service.desc}</p>
                  </div>
                  <div className="flex items-center gap-1 text-sm font-medium text-primary/80 group-hover:text-primary transition-colors pt-4 border-t border-border/30">
                    <span>Pelajari lebih lanjut</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Our Process Section ─── */}
        <section id="process" className="py-28 relative">
          <div className="container mx-auto px-6">
            <motion.div
              className="max-w-2xl mb-20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-sm font-medium text-primary uppercase tracking-widest mb-4">
                Cara Kami Bekerja
              </p>
              <h2 className="text-4xl md:text-5xl font-display font-medium mb-6">
                Perjalanan 4 Langkah Menuju Kejelasan.
              </h2>
              <p className="text-muted-foreground text-xl leading-relaxed">
                Kami mengubah tantangan yang kompleks menjadi peta jalan eksekusi yang jelas dan terukur.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-border/80 to-transparent -translate-y-12 z-0" />

              {[
                {
                  step: '01',
                  title: 'Penemuan & Audit',
                  desc: 'Kami melakukan audit komprehensif terhadap struktur bisnis, keuangan, dan hambatan operasional Anda.',
                },
                {
                  step: '02',
                  title: 'Peta Jalan Strategi',
                  desc: 'Kami merancang rencana strategis yang dapat ditindaklanjuti, dilengkapi KPI yang jelas dan jadwal yang realistis.',
                },
                {
                  step: '03',
                  title: 'Eksekusi Langsung',
                  desc: 'Kami bergabung dengan tim internal Anda untuk mengeksekusi strategi, menghilangkan hambatan, dan mengoptimalkan alur kerja.',
                },
                {
                  step: '04',
                  title: 'Pertumbuhan & Penskalaan',
                  desc: 'Kami meninjau hasil yang terukur, menyempurnakan sistem, dan memastikan profitabilitas jangka panjang yang berkelanjutan.',
                },
              ].map((item, i) => (
                <motion.div
                  key={item.step}
                  className="bg-background/40 backdrop-blur-md border border-border/50 p-8 rounded-[2.5rem] relative z-10 flex flex-col justify-between hover:bg-card/80 hover:-translate-y-2 transition-all duration-500 group shadow-lg shadow-primary/5"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                >
                  <div>
                    <div className="mb-8">
                      <span className="text-4xl font-display font-bold text-primary/80 group-hover:text-primary transition-colors">
                        {item.step}
                      </span>
                    </div>
                    <h3 className="text-xl font-medium mb-3">{item.title}</h3>
                    <p className="text-muted-foreground text-base leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Diagnostic Quiz Banner Callout */}
            <motion.div
              className="mt-16 bg-gradient-to-r from-primary/15 via-purple-500/10 to-cyan-500/15 p-8 md:p-10 rounded-[2.5rem] backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shrink-0 shadow-md">
                  <Activity className="w-7 h-7 animate-pulse" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-2">
                    ⚡ Kejelasan Strategis Instan
                  </div>
                  <h3 className="text-2xl md:text-3xl font-display font-medium text-foreground">
                    Tidak yakin apa yang dibutuhkan bisnis Anda terlebih dahulu?
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground mt-1">
                    Ikuti Kuis Diagnosa 1 Menit kami untuk mendapatkan rekomendasi dan estimasi harga yang disesuaikan.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsQuizOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-primary text-primary-foreground rounded-2xl font-semibold text-sm hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/25 shrink-0 cursor-pointer leading-none"
              >
                <span className="leading-none pt-[1px]">Mulai Kuis Diagnosa</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            </motion.div>
          </div>
        </section>

        {/* ─── About Section ─── */}
        <section id="about" className="py-32 relative">
          <div className="container mx-auto px-6">

            {/* Header */}
            <motion.div
              className="max-w-2xl mb-20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4">
                Siapa Kami
              </p>
              <h2 className="text-4xl md:text-5xl font-display font-medium mb-6">
                Dibangun oleh praktisi,<br />
                <span className="italic text-muted-foreground">bukan teoritisi.</span>
              </h2>
              <p className="text-muted-foreground text-xl leading-relaxed">
                PT Arteri Kreasi Nusantara, dikenal sebagai Arkrea, didirikan atas semangat kolaborasi, strategi, dan kreativitas. Berkantor di Kota Batu, Jawa Timur, kami hadir sebagai mitra strategis UMKM.
              </p>
            </motion.div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
              {[
                { icon: Users,     num: 10, suffix: '+', label: 'Klien Dilayani' },
                { icon: Award,     num: 3,  suffix: '',  label: 'Official Partners' },
                { icon: Target,    num: 3,  suffix: '',  label: 'Hotel Dikelola' },
                { icon: Briefcase, num: 5,  suffix: '+', label: 'Sektor Industri' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="bg-background/40 backdrop-blur-md border border-border/50 p-8 rounded-[2rem] text-center group hover:bg-card/80 hover:-translate-y-1 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary transition-all duration-300">
                    <stat.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                  </div>
                  <p className="text-3xl font-display font-medium mb-1">
                    <Counter value={stat.num} suffix={stat.suffix} />
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Mission + Visual */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                className="bg-background/40 backdrop-blur-md border border-border/50 p-12 rounded-[2.5rem]"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8 }}
              >
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-6">
                  Visi Kami
                </p>
                <blockquote className="text-3xl md:text-4xl font-display font-medium leading-tight mb-8">
                  "Menjadi mitra strategis terpercaya dalam membangun, mengembangkan, dan mengakselerasi pertumbuhan bisnis kecil dan menengah."
                </blockquote>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Kami memahami bahwa menjalankan bisnis bukan sekadar tentang bertahan, tetapi juga tentang berkembang dan bertransformasi. Dibangun oleh profesional lintas industri — dari event, periklanan, perhotelan, hukum, hingga F&B.
                </p>
              </motion.div>

              <motion.div
                className="relative h-[500px]"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8 }}
              >
                <div className="w-full h-full p-2 bg-background/40 backdrop-blur-xl border border-border/50 rounded-[2.5rem] shadow-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80&fit=crop"
                    alt="Our team collaborating"
                    className="w-full h-full object-cover rounded-[2rem]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent rounded-[2rem]" />
                  <div className="absolute bottom-8 left-8 right-8 bg-background/60 backdrop-blur-md border border-border/50 p-5 rounded-2xl">
                    <p className="text-sm text-muted-foreground mb-1">Berkantor di</p>
                    <p className="font-display text-xl font-medium">Kota Batu, Jawa Timur 🇮🇩</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── Testimonials Section ─── */}
        <section id="testimonials" className="py-28 relative">
          <div className="container mx-auto px-6">
            <motion.div
              className="max-w-2xl mb-20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-sm font-medium text-primary uppercase tracking-widest mb-4">
                Klien Kami
              </p>
              <h2 className="text-4xl md:text-5xl font-display font-medium mb-6">
                Dipercaya oleh berbagai instansi.
              </h2>
              <p className="text-muted-foreground text-xl leading-relaxed">
                Berikut sebagian klien yang telah mempercayakan pengembangan bisnis mereka kepada Arkrea.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  quote: "Arkrea membantu manajemen media sosial dan HRD kami secara profesional. Branding digital kami semakin kuat dan jangkauan pasar meningkat signifikan.",
                  name: "Aldo Frozen Food",
                  role: "Klien — Manajemen Media Sosial & HRD"
                },
                {
                  quote: "Melalui Arkrea Traventure, kegiatan fullboard meeting dan fun outbound kami berjalan lancar. Peserta sangat antusias dan mendapat pengalaman yang berkesan.",
                  name: "Kemenag Provinsi Jawa Timur",
                  role: "Klien — Tour & Travel"
                },
                {
                  quote: "Navara Hospitality Management memberikan standar pelayanan yang tinggi. Operasional hotel kami berjalan lebih efisien dan tamu merasa lebih puas.",
                  name: "De Wahyu Hotel & Convention",
                  role: "Klien — Hospitality Management"
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="bg-background/40 backdrop-blur-md border border-border/50 p-10 rounded-[2.5rem] flex flex-col justify-between hover:bg-card/80 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-2 transition-all duration-500 group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                >
                  <div>
                    <div className="flex items-center gap-1 text-amber-400 mb-6">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-foreground text-lg leading-relaxed mb-8 italic">
                      "{item.quote}"
                    </p>
                  </div>
                  <div className="flex items-center gap-4 pt-6 border-t border-border/30">
                    {/* Initials instead of stock portraits — swap in the client's real logo when available */}
                    <div aria-hidden="true" className="w-12 h-12 shrink-0 rounded-full bg-primary/10 border border-border/60 flex items-center justify-center text-sm font-semibold text-primary">
                      {item.name.split(' ').slice(0, 2).map((w) => w[0]).join('')}
                    </div>
                    <div>
                      <h4 className="font-medium text-base text-foreground">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">{item.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Value Proposition ─── */}
        <section className="py-32 relative overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="bg-background/50 backdrop-blur-xl border border-border/60 rounded-[3rem] p-12 lg:p-24 relative overflow-hidden shadow-2xl shadow-primary/5">

              {/* Subtle orb accents — senada dengan hero background */}
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-violet-400/20 to-indigo-400/15 rounded-full blur-[80px] -translate-y-1/3 translate-x-1/4 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-teal-400/20 to-sky-400/15 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

              <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="text-4xl md:text-6xl font-display font-medium mb-8 text-foreground">Mengapa bermitra dengan kami?</h2>
                  <p className="text-xl text-muted-foreground mb-12">
                    Karena "mencoba sendiri sambil berjalan" adalah strategi bisnis yang paling mahal.
                  </p>
                  <button
                    onClick={() => scrollTo('contact')}
                    className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium flex items-center gap-2 hover:scale-105 transition-transform duration-300"
                  >
                    Pesan Konsultasi <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8 }}
                  className="flex flex-col gap-4"
                >
                  {[
                    'Tanpa tebak-tebakan. Kami menyediakan peta jalan yang dapat ditindaklanjuti.',
                    'Tim lintas disiplin: event, periklanan, perhotelan, hukum, hingga F&B.',
                    'Kami mengeksekusi. Kami tidak hanya meninggalkan Anda dengan laporan PDF.',
                    'Harga transparan. Tidak ada biaya retainer tersembunyi.',
                  ].map((text, i) => (
                    <motion.div
                      key={i}
                      className="flex gap-4 items-center bg-card/95 p-5 rounded-2xl border border-border/60 shadow-sm"
                      whileHover={{ x: 6, scale: 1.01 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    >
                      <div className="shrink-0 w-10 h-10 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                      </div>
                      <p className="text-base font-medium leading-snug text-foreground">{text}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FAQ Section ─── */}
        <section id="faq" className="py-28 relative">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              {/* Left Column: Sticky & Compact Stack */}
              <motion.div
                className="lg:col-span-5 lg:sticky lg:top-32 space-y-6 h-fit"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8 }}
              >
                <div>
                  <p className="text-sm font-medium text-primary uppercase tracking-widest mb-4">
                    Punya Pertanyaan?
                  </p>
                  <h2 className="text-4xl md:text-5xl font-display font-medium mb-5 text-foreground leading-tight">
                    Pertanyaan yang Sering Diajukan.
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Semua yang perlu Anda ketahui tentang keterlibatan konsultasi, harga, dan metodologi eksekusi kami.
                  </p>
                </div>

                <div className="space-y-3.5">
                  <div className="bg-background/40 backdrop-blur-md border border-border/50 p-5 rounded-2xl">
                    <h4 className="font-medium text-foreground mb-1 text-sm">Punya pertanyaan spesifik?</h4>
                    <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                      Konsultan strategis kami siap meninjau tantangan bisnis unik Anda.
                    </p>
                    <button
                      onClick={() => scrollTo('contact')}
                      className="inline-flex items-center gap-2 text-xs font-semibold text-primary hover:text-primary/80 transition-colors group cursor-pointer"
                    >
                      Bicara dengan konsultan kami <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  {/* Trust & Response Time Badges */}
                  <div className="grid grid-cols-2 gap-3.5">
                    <div className="bg-background/40 backdrop-blur-md border border-border/50 p-4 rounded-2xl flex flex-col justify-between">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Online Sekarang</span>
                      </div>
                      <p className="text-xs font-semibold text-foreground">Di bawah 2 Jam</p>
                      <p className="text-xs text-muted-foreground">Rata-rata waktu respons</p>
                    </div>

                    <div className="bg-background/40 backdrop-blur-md border border-border/50 p-4 rounded-2xl flex flex-col justify-between">
                      <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-2">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <p className="text-xs font-semibold text-foreground">NDA Ketat</p>
                      <p className="text-xs text-muted-foreground">100% Rahasia</p>
                    </div>
                  </div>

                  {/* Senior Partners Stack */}
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent flex items-center justify-between gap-3 shadow-sm">
                    <div className="flex items-center gap-2.5">
                      <div className="flex -space-x-2 overflow-hidden shrink-0">
                        <img className="inline-block h-8 w-8 rounded-full ring-2 ring-background object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80&fit=crop" alt="Advisor" />
                        <img className="inline-block h-8 w-8 rounded-full ring-2 ring-background object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80&fit=crop" alt="Advisor" />
                        <img className="inline-block h-8 w-8 rounded-full ring-2 ring-background object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80&fit=crop" alt="Advisor" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-foreground leading-none mb-1">3 Mitra Online</p>
                        <p className="text-xs text-muted-foreground leading-none">Siap untuk audit</p>
                      </div>
                    </div>
                    <button
                      onClick={() => scrollTo('contact')}
                      className="px-3.5 py-2 bg-primary text-primary-foreground text-xs font-semibold rounded-xl hover:scale-105 active:scale-95 transition-all shadow-sm shrink-0 cursor-pointer"
                    >
                      Pesan Sesi
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Accordion List */}
              <motion.div
                className="lg:col-span-7 bg-background/40 backdrop-blur-md border border-border/50 p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-primary/5 h-fit"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8 }}
              >
                <div className="space-y-1">
                  {[
                    {
                      q: "Bagaimana proses konsultasi awal berjalan?",
                      a: "Sesi pertama kami adalah sesi penemuan 45 menit di mana kami meninjau tantangan bisnis, keuangan, atau tujuan operasional Anda saat ini. Jika kami menentukan bahwa kami adalah mitra yang tepat, kami akan mempresentasikan peta jalan strategi yang disesuaikan dengan ruang lingkup pekerjaan yang transparan."
                    },
                    {
                      q: "Apakah Anda hanya bekerja dengan korporasi besar yang mapan?",
                      a: "Sama sekali tidak. Kami merancang paket kami khusus untuk mendukung startup/UMKM yang berkembang pesat maupun perusahaan regional yang mapan. Kami menyesuaikan keterlibatan strategis kami sesuai dengan tahap pertumbuhan Anda."
                    },
                    {
                      q: "Apa yang membedakan Arkrea dari firma konsultan tradisional?",
                      a: "Konsultan tradisional menyerahkan presentasi 100 halaman lalu pergi. Kami adalah tim operator yang langsung turun tangan. Kami tetap tertanam bersama tim Anda selama implementasi untuk menyelesaikan hambatan, menyesuaikan strategi, dan memastikan dampak pendapatan yang terukur."
                    },
                    {
                      q: "Bisakah kami mengkustomisasi atau menggabungkan layanan lintas disiplin?",
                      a: "Tentu! Sebagian besar tantangan bisnis saling terkait. Misalnya, merestrukturisasi bisnis pariwisata sering membutuhkan strategi gabungan dari aspek operasional, SDM, dan pemasaran digital. Kami menyesuaikan keterlibatan kami tepat sesuai kebutuhan Anda."
                    },
                    {
                      q: "Berapa lama biasanya keterlibatan konsultasi berlangsung?",
                      a: "Sementara beberapa audit bertarget selesai dalam 4 hingga 6 minggu, sebagian besar klien bermitra dengan kami dalam retainer 6 hingga 12 bulan untuk memastikan keselarasan strategis yang berkelanjutan dan penskalaan operasional."
                    }
                  ].map((faq, idx) => (
                    <FAQItem key={idx} question={faq.q} answer={faq.a} />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── Pricing Section ─── */}
        <section id="pricing" className="py-32 relative">
          <div className="container mx-auto px-6">

            {/* Header */}
            <motion.div
              className="max-w-2xl mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4">
                Paket Langganan
              </p>
              <h2 className="text-4xl md:text-5xl font-display font-medium mb-6">
                Pilih paket yang<br />
                <span className="italic text-muted-foreground">sesuai kebutuhan Anda.</span>
              </h2>
              <p className="text-muted-foreground text-xl leading-relaxed">
                Langganan laporan konsultasi bulanan kami dan dapatkan insight mendalam untuk mengembangkan bisnis Anda.
              </p>
            </motion.div>

            {/* Billing Toggle */}
            <motion.div
              className="flex items-center gap-4 mb-16"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className={clsx('text-sm font-medium transition-colors', !isAnnual ? 'text-foreground' : 'text-muted-foreground')}>
                Bulanan
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={clsx(
                  'relative w-14 h-7 rounded-full transition-colors duration-300',
                  isAnnual ? 'bg-primary' : 'bg-border'
                )}
                aria-label="Tampilkan harga tahunan" aria-pressed={isAnnual}
              >
                <motion.div
                  className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm"
                  animate={{ left: isAnnual ? '1.75rem' : '0.25rem' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              </button>
              <span className={clsx('text-sm font-medium transition-colors', isAnnual ? 'text-foreground' : 'text-muted-foreground')}>
                Tahunan
              </span>
              <AnimatePresence>
                {isAnnual && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8, x: -8 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: -8 }}
                    className="px-3 py-1 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-xs font-semibold rounded-full border border-emerald-500/20"
                  >
                    Hemat 20%
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Pricing Cards */}
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
              {pricingPlans.map((plan, i) => (
                <motion.div
                  key={plan.name}
                  className={clsx(
                    'relative flex flex-col rounded-[2rem] border p-8',
                    plan.popular
                      ? 'bg-primary text-primary-foreground border-primary shadow-2xl shadow-primary/25'
                      : 'bg-background/40 backdrop-blur-md border-border/50'
                  )}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{
                    y: -10,
                    scale: plan.popular ? 1.04 : 1.02,
                    boxShadow: plan.popular
                      ? '0 32px 64px -12px rgba(0,0,0,0.4)'
                      : '0 20px 48px -8px rgba(0,0,0,0.15)',
                  }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{
                    opacity: { duration: 0.6, delay: i * 0.08 },
                    y: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
                    scale: { type: 'spring', stiffness: 280, damping: 22 },
                    boxShadow: { type: 'spring', stiffness: 280, damping: 22 },
                  }}
                >
                  {/* Popular badge */}
                  {plan.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="px-4 py-1.5 bg-background text-primary text-xs font-bold rounded-full shadow-lg">
                        ✦ PALING POPULER
                      </span>
                    </div>
                  )}

                  {/* Gradient accent */}
                  {!plan.popular && (
                    <div className={clsx('absolute inset-0 rounded-[2rem] bg-gradient-to-br opacity-60', plan.color)} />
                  )}

                  <div className="relative flex flex-col flex-1">
                    <p className={clsx(
                      'text-xs font-semibold uppercase tracking-widest mb-2',
                      plan.popular ? 'text-primary-foreground/70' : 'text-muted-foreground'
                    )}>
                      {plan.tagline}
                    </p>
                    <h3 className="text-xl font-display font-medium mb-6">{plan.name}</h3>

                    {/* Price */}
                    <div className="mb-8">
                      <div className="flex items-end gap-1">
                        <span className="text-sm font-medium opacity-70">Rp</span>
                        <AnimatePresence mode="wait">
                          <motion.span
                            key={isAnnual ? 'annual' : 'monthly'}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="text-3xl font-bold leading-none"
                          >
                            {(isAnnual ? plan.price.annual : plan.price.monthly).toLocaleString('id-ID')}
                          </motion.span>
                        </AnimatePresence>
                      </div>
                      <p className={clsx('text-sm mt-1', plan.popular ? 'text-primary-foreground/60' : 'text-muted-foreground')}>
                        per bulan{isAnnual ? ', dibayar tahunan' : ''}
                      </p>
                    </div>

                    {/* Features */}
                    <ul className="flex flex-col gap-3 mb-8 flex-1">
                      {plan.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-3">
                          <CheckCircle2 className={clsx(
                            'w-4 h-4 mt-0.5 shrink-0',
                            plan.popular ? 'text-primary-foreground' : 'text-primary'
                          )} />
                          <span className={clsx(
                            'text-sm leading-snug',
                            plan.popular ? 'text-primary-foreground/90' : 'text-muted-foreground'
                          )}>
                            {feat}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <motion.button
                      onClick={() => {
                        setBookingInitialTier(plan.name);
                        setIsBookingOpen(true);
                      }}
                      className={clsx(
                        'w-full py-3.5 rounded-xl font-semibold text-sm cursor-pointer',
                        plan.popular
                          ? 'bg-background text-primary'
                          : 'bg-primary text-primary-foreground'
                      )}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                    >
                      Mulai Langganan
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom note */}
            <motion.p
              className="text-center text-sm text-muted-foreground mt-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Semua paket dapat dikustomisasi. Hubungi kami untuk kebutuhan enterprise.
            </motion.p>
          </div>
        </section>

        {/* ─── Contact Section ─── */}
        <section id="contact" className="py-32 relative">
          <div className="container mx-auto px-6">

            {/* Header */}
            <motion.div
              className="max-w-2xl mb-20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-sm font-semibold text-foreground/60 uppercase tracking-widest mb-4">
                Hubungi Kami
              </p>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Mari bangun sesuatu<br />
                <span className="text-muted-foreground">yang luar biasa bersama.</span>
              </h2>
              <p className="text-foreground/70 text-xl leading-relaxed">
                Siap mengambil langkah pertama? Kirimkan pesan dan kami akan membalas dalam 24 jam.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

              {/* Contact Form */}
              <motion.div
                className="lg:col-span-3 bg-background/40 backdrop-blur-md border border-border/50 p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8 }}
              >
                <AnimatePresence mode="wait">
                  {formSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex flex-col items-center justify-center min-h-[300px] text-center gap-4"
                    >
                      <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground mb-2">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-display font-medium">WhatsApp sudah dibuka</h3>
                      <p className="text-muted-foreground max-w-sm">Tekan <strong>Kirim</strong> di WhatsApp agar pesan Anda sampai ke tim kami. Kami membalas dalam 24 jam.</p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleFormSubmit}
                      className="flex flex-col gap-6"
                    >
                      <div className="grid md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                          <label htmlFor="ct-name" className="text-sm font-semibold text-foreground/80">Nama Lengkap</label>
                          <input
                            id="ct-name"
                            type="text"
                            required
                            placeholder="Nama Anda"
                            value={formData.name}
                            onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                            className="px-5 py-3.5 bg-background/80 border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/60 transition-all"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label htmlFor="ct-email" className="text-sm font-semibold text-foreground/80">Alamat Email</label>
                          <input
                            id="ct-email"
                            type="email"
                            required
                            placeholder="nama@perusahaan.com"
                            value={formData.email}
                            onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                            className="px-5 py-3.5 bg-background/80 border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/60 transition-all"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="ct-message" className="text-sm font-semibold text-foreground/80">Pesan Anda</label>
                        <textarea
                          required
                          id="ct-message"
                          rows={5}
                          placeholder="Ceritakan bisnis Anda dan apa yang ingin Anda capai bersama Arkrea..."
                          value={formData.message}
                          onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                          className="px-5 py-3.5 bg-background/80 border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/60 transition-all resize-none"
                        />
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <button
                          type="submit"
                          className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium flex items-center justify-center gap-2 hover:scale-105 transition-transform duration-300 self-start cursor-pointer"
                        >
                          Kirim via WhatsApp <Send className="w-4 h-4" />
                        </button>
                        <p className="text-xs text-muted-foreground">
                          Pesan akan dibuka di WhatsApp, lalu tekan Kirim.
                        </p>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Info Cards */}
              <motion.div
                className="lg:col-span-2 flex flex-col gap-5"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, delay: 0.15 }}
              >
                {[
                  {
                    icon: Mail,
                    label: 'Email Kami',
                    value: 'arterikreasinusantara@gmail.com',
                    sub: 'Klik untuk kirim Email via Gmail',
                    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=arterikreasinusantara@gmail.com',
                    target: '_blank',
                  },
                  {
                    icon: Phone,
                    label: 'WhatsApp',
                    value: '0856 9290 9283',
                    sub: 'Azariel (Klik untuk chat WA)',
                    href: 'https://wa.me/6285692909283',
                    target: '_blank',
                  },
                  {
                    icon: MapPin,
                    label: 'Kantor',
                    value: 'Kota Batu, Jawa Timur',
                    sub: 'Melayani seluruh Indonesia',
                    href: 'https://maps.app.goo.gl/fnjZN3ufFZc5YMtq6',
                    target: '_blank',
                  },
                ].map((info, i) => (
                  <motion.a
                    key={i}
                    href={info.href}
                    target={info.target}
                    rel="noopener noreferrer"
                    className="bg-card/70 backdrop-blur-md border border-border p-7 rounded-[2rem] flex gap-5 items-start group hover:bg-card hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-pointer block text-left text-inherit no-underline"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <div className="shrink-0 w-12 h-12 bg-primary/15 rounded-xl flex items-center justify-center group-hover:bg-primary transition-all duration-300">
                      <info.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-foreground/50 uppercase tracking-widest mb-1">
                        {info.label}
                      </p>
                      <p className="font-semibold text-foreground mb-0.5 group-hover:text-primary transition-colors break-all">{info.value}</p>
                      <p className="text-sm text-foreground/60">{info.sub}</p>
                    </div>
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── Footer ─── */}
        <footer className="pt-24 pb-12 relative">
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
              <div className="lg:col-span-2">
                <div className="text-3xl font-display font-bold tracking-tight mb-6">
                  ARK<span className="opacity-50">REA · PT Arteri Kreasi Nusantara</span>
                </div>
                <p className="text-muted-foreground text-lg max-w-sm">
                  Mitra strategis terpercaya bagi UMKM dan pelaku usaha kecil dan menengah di Indonesia.
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-6 text-lg">Navigasi</h4>
                <div className="flex flex-col gap-4 text-muted-foreground">
                  <button
                    onClick={() => scrollTo('about')}
                    className="hover:text-primary transition-colors text-left"
                  >
                    Tentang Kami
                  </button>
                  <button
                    onClick={() => scrollTo('services')}
                    className="hover:text-primary transition-colors text-left"
                  >
                    Layanan
                  </button>
                  <button
                    onClick={() => scrollTo('contact')}
                    className="hover:text-primary transition-colors text-left"
                  >
                    Kontak
                  </button>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-6 text-lg">Partner</h4>
                <div className="flex flex-col gap-4 text-muted-foreground">
                  <span>Lightup Digital Ideas</span>
                  <button onClick={() => setCurrentPage('traventure')} className="hover:text-primary transition-colors text-left cursor-pointer">
                    Arkrea Traventure
                  </button>
                  <button onClick={() => setCurrentPage('navara')} className="hover:text-primary transition-colors text-left cursor-pointer">
                    Navara Hospitality
                  </button>
                </div>
              </div>
            </div>

            {/* TODO: add LinkedIn / Instagram icons here once the real profile URLs are available */}
            <div className="pt-8 border-t border-border/50 text-muted-foreground flex flex-col md:flex-row justify-between items-center gap-4">
              <p>© {new Date().getFullYear()} PT Arteri Kreasi Nusantara. Semua hak dilindungi.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
