import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Menu, Phone, Mail, MapPin, Users, PartyPopper, Trophy, Presentation, Utensils, Gift, X, Images } from 'lucide-react';
import MobileMenu, { scrollAfterClose } from '../components/MobileMenu';
import fotoGamesPanggung from '../assets/foto/dprd-games-panggung.webp';
import fotoHiburan from '../assets/foto/dprd-hiburan-malam.webp';
import fotoSenam from '../assets/foto/dprd-senam-pagi.webp';
import ppsnPanggung from '../assets/foto/ppsn-panggung-pembukaan.webp';
import ppsnFotoBersama from '../assets/foto/ppsn-foto-bersama.webp';
import ppsnPenyambutan from '../assets/foto/ppsn-penyambutan.webp';
import ppsnUpacara from '../assets/foto/ppsn-upacara.webp';
import ppsnTari from '../assets/foto/ppsn-tari-pembukaan.webp';
import ppsnTanamPohon from '../assets/foto/ppsn-tanam-pohon.webp';
import ppsnTanamPohon2 from '../assets/foto/ppsn-tanam-pohon-2.webp';
import ppsnPionering from '../assets/foto/ppsn-pionering.webp';
import ppsnMalam from '../assets/foto/ppsn-malam-pembukaan.webp';
import ppsnParade from '../assets/foto/ppsn-parade-budaya.webp';
import ppsnTenda from '../assets/foto/ppsn-tenda-kontingen.webp';
import ppsnJuara from '../assets/foto/ppsn-juara.webp';
import ppsnClosing from '../assets/foto/ppsn-closing-ceremony.webp';
import ppsnParaJuara from '../assets/foto/ppsn-para-juara.webp';
import dprdJeepGrup from '../assets/foto/dprd-jeep-grup.webp';
import dprdJeepHutan from '../assets/foto/dprd-jeep-hutan.webp';
import dprdJeepKuning from '../assets/foto/dprd-jeep-kuning.webp';
import dprdJeepHotel from '../assets/foto/dprd-jeep-hotel.webp';
import dprdJeepKonvoi from '../assets/foto/dprd-jeep-konvoi.webp';
import dprdPetikStroberi from '../assets/foto/dprd-petik-stroberi.webp';
import dprdViewpoint from '../assets/foto/dprd-viewpoint.webp';
import dprdViewpointGrup from '../assets/foto/dprd-viewpoint-grup.webp';
import dprdPemandangan from '../assets/foto/dprd-pemandangan.webp';
import dprdAmfiteater from '../assets/foto/dprd-amfiteater.webp';
import dprdSenamPagi from '../assets/foto/dprd-senam-pagi.webp';
import dprdTamanHotel from '../assets/foto/dprd-taman-hotel.webp';
import dprdPembukaan from '../assets/foto/dprd-pembukaan.webp';
import dprdFotoPembukaan from '../assets/foto/dprd-foto-pembukaan.webp';
import dprdBbqMalam from '../assets/foto/dprd-bbq-malam.webp';
import dprdMakanMalam from '../assets/foto/dprd-makan-malam.webp';
import dprdHiburanMalam from '../assets/foto/dprd-hiburan-malam.webp';
import dprdGamesPanggung from '../assets/foto/dprd-games-panggung.webp';
import dprdGames from '../assets/foto/dprd-games.webp';
import dprdDoorprize from '../assets/foto/dprd-doorprize.webp';
import fotoBbq from '../assets/foto/dprd-bbq-malam.webp';

interface ArkreaEventProps {
  onBack: () => void;
}

// ─── DATA ────────────────────────────────────────────────────────────────────
// Solid brand colours only — this page deliberately uses no gradients.

const WA_NUMBER = '6285692909283';
const waLink = (text: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
const INK = '#2A2447';
const pop = (offset = 6) => ({ boxShadow: `${offset}px ${offset}px 0 ${INK}` });

const navItems = [
  { label: 'Layanan', id: 'layanan' },
  { label: 'Portofolio', id: 'portofolio' },
  { label: 'Cara Kerja', id: 'cara-kerja' },
  { label: 'Kontak', id: 'kontak' },
];

const services = [
  { icon: Users, title: 'Gathering & Family Day', desc: 'Acara kebersamaan kantor dan keluarga yang hangat dan berkesan.', bg: 'bg-evt-yellow' },
  { icon: Trophy, title: 'Fun Games & Outbound', desc: 'Permainan seru yang bikin tim makin kompak dan peserta ketawa lepas.', bg: 'bg-evt-pink' },
  { icon: PartyPopper, title: 'Gala Dinner & Malam Keakraban', desc: 'Malam penuh hiburan, MC yang asik, dan panggung yang meriah.', bg: 'bg-evt-blue' },
  { icon: Presentation, title: 'Meeting & Fullboard', desc: 'Rapat, seminar, dan acara instansi yang tertata dari awal sampai akhir.', bg: 'bg-evt-green' },
  { icon: Utensils, title: 'BBQ & Makan Bersama', desc: 'Suasana santai dengan hidangan yang pas untuk rombongan.', bg: 'bg-evt-orange' },
  { icon: Gift, title: 'Doorprize & Hiburan', desc: 'Undian, hadiah, dan hiburan yang bikin acara makin pecah.', bg: 'bg-evt-purple' },
];

// Events the Arkrea team has actually run (photos from the documentation archive)
// Travel trips (e.g. the Aldo Frozen Food Bali gathering) belong on the Traventure page, not here.
// `gallery` (optional) opens the full photo set; otherwise only `photos` are shown.
type PortfolioItem = {
  title: string;
  client?: string;
  meta: string;
  photos: string[];
  tags: string[];
  color: string;
  gallery?: { src: string; caption: string }[];
};

const portfolio: PortfolioItem[] = [
  {
    title: 'Perkemahan Pramuka Santri Nusantara VI',
    client: 'Kontingen Jawa Timur, Kanwil Kemenag Provinsi Jawa Timur',
    meta: 'PPSN VI, Oktober 2026',
    photos: [ppsnPanggung, ppsnFotoBersama],
    tags: ['Upacara pembukaan', 'Tanam pohon', 'Pionering', 'Parade budaya', 'Closing ceremony'],
    color: 'bg-evt-green',
    gallery: [
      { src: ppsnPanggung, caption: 'Panggung utama Perkemahan Pramuka Santri Nusantara' },
      { src: ppsnFotoBersama, caption: 'Foto bersama kontingen di depan panggung' },
      { src: ppsnPenyambutan, caption: 'Barisan santri menyambut tamu' },
      { src: ppsnUpacara, caption: 'Upacara pembukaan' },
      { src: ppsnTari, caption: 'Penampilan tari pada pembukaan' },
      { src: ppsnMalam, caption: 'Kemeriahan malam di panggung utama' },
      { src: ppsnTanamPohon, caption: 'Penanaman pohon bersama' },
      { src: ppsnTanamPohon2, caption: 'Santri ikut menanam pohon' },
      { src: ppsnTenda, caption: 'Gerbang tenda kontingen' },
      { src: ppsnPionering, caption: 'Hasil karya pionering kontingen' },
      { src: ppsnParade, caption: 'Parade budaya' },
      { src: ppsnJuara, caption: 'Penyerahan hadiah juara' },
      { src: ppsnClosing, caption: 'Closing ceremony' },
      { src: ppsnParaJuara, caption: 'Para juara di malam penutupan' },
    ],
  },
  {
    title: 'Sekretariat DPRD Provinsi Jawa Timur',
    meta: 'Tawangmangu, 27-29 November 2025',
    photos: [fotoGamesPanggung, fotoBbq],
    tags: ['Games panggung', 'BBQ malam', 'Doorprize'],
    color: 'bg-evt-blue',
    gallery: [
      { src: dprdJeepGrup, caption: 'Foto bersama rombongan jeep di hutan pinus' },
      { src: dprdJeepHutan, caption: 'Barisan jeep di hutan pinus' },
      { src: dprdJeepKuning, caption: 'Berpose di atas jeep' },
      { src: dprdJeepHotel, caption: 'Bersiap naik jeep di depan hotel' },
      { src: dprdJeepKonvoi, caption: 'Konvoi jeep melewati jalan desa' },
      { src: dprdPetikStroberi, caption: 'Petik stroberi bersama' },
      { src: dprdViewpoint, caption: 'Foto bersama di viewpoint' },
      { src: dprdViewpointGrup, caption: 'Berpose dengan latar langit biru' },
      { src: dprdPemandangan, caption: 'Menikmati pemandangan perbukitan' },
      { src: dprdAmfiteater, caption: 'Foto bersama di amfiteater' },
      { src: dprdSenamPagi, caption: 'Senam pagi bersama' },
      { src: dprdTamanHotel, caption: 'Foto bersama di taman hotel' },
      { src: dprdPembukaan, caption: 'Sambutan pembukaan kegiatan' },
      { src: dprdFotoPembukaan, caption: 'Foto bersama peserta kegiatan' },
      { src: dprdBbqMalam, caption: 'BBQ malam bersama' },
      { src: dprdMakanMalam, caption: 'Makan malam bersama' },
      { src: dprdHiburanMalam, caption: 'Hiburan malam bersama' },
      { src: dprdGamesPanggung, caption: 'Games di atas panggung' },
      { src: dprdGames, caption: 'Games dan keseruan peserta' },
      { src: dprdDoorprize, caption: 'Pembagian doorprize' },
    ],
  },
];

// ─── GALLERY ─────────────────────────────────────────────────────────────────

function EventGallery({ item, onClose }: { item: PortfolioItem; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const photos = item.gallery ?? [];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`Dokumentasi ${item.title}`}
      className="fixed inset-0 z-[100] bg-evt-cream overflow-y-auto overscroll-contain"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="sticky top-0 z-10 bg-evt-cream border-b-2 border-evt-ink">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-4 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <h3 className="font-evt font-bold text-3xl md:text-4xl leading-none">{item.title}</h3>
            <p className="text-evt-ink/70 text-xs md:text-sm mt-1">{item.meta} · {photos.length} foto</p>
          </div>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Tutup galeri"
            className="shrink-0 w-11 h-11 rounded-full bg-white border-2 border-evt-ink flex items-center justify-center hover:bg-evt-yellow transition-colors"
            style={pop(3)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 md:px-8 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map(photo => (
          <figure key={photo.caption} className="m-0">
            <div className="overflow-hidden rounded-2xl border-2 border-evt-ink aspect-[4/3] bg-white" style={pop(4)}>
              <img src={photo.src} alt={photo.caption} loading="lazy" decoding="async" className="w-full h-full object-cover" />
            </div>
            <figcaption className="text-sm font-semibold mt-3">{photo.caption}</figcaption>
          </figure>
        ))}
      </div>
    </motion.div>
  );
}

const steps = [
  { no: '1', title: 'Ngobrol Dulu', desc: 'Ceritakan acaramu: tujuan, jumlah peserta, tanggal, dan budget.', bg: 'bg-evt-yellow' },
  { no: '2', title: 'Racik Konsep', desc: 'Kami susun rundown, games, venue, dan kebutuhan teknisnya.', bg: 'bg-evt-pink' },
  { no: '3', title: 'Hari H Seru', desc: 'Tim kami pegang jalannya acara, kamu tinggal menikmati.', bg: 'bg-evt-green' },
  { no: '4', title: 'Kenangan Abadi', desc: 'Dokumentasi foto dan video untuk dibawa pulang.', bg: 'bg-evt-blue' },
];

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export default function ArkreaEvent({ onBack }: ArkreaEventProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const [openItem, setOpenItem] = useState<PortfolioItem | null>(null);
  const closeItem = useCallback(() => setOpenItem(null), []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-evt-cream text-evt-ink font-sans overflow-x-hidden">

      {/* ── Navbar ── */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${scrolled ? 'bg-evt-cream border-b-2 border-evt-ink' : 'bg-transparent'}`}>
        <div className="flex items-center justify-between px-5 md:px-12 py-3.5">
          <button onClick={onBack} aria-label="Kembali ke Arkrea" className="flex items-center gap-3 group">
            <span className="w-10 h-10 rounded-full bg-white border-2 border-evt-ink flex items-center justify-center" style={pop(3)}>
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            </span>
            <span className="font-evt font-bold text-3xl leading-none -rotate-2">Arkrea Event</span>
          </button>

          <nav className="hidden lg:flex items-center gap-2">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="px-4 py-2 rounded-full font-semibold text-sm hover:bg-evt-yellow transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={waLink('Halo Arkrea Event, saya mau bikin acara!')}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex px-5 py-2.5 rounded-full bg-evt-pink text-white font-bold text-sm border-2 border-evt-ink hover:-translate-y-0.5 transition-transform"
              style={pop(3)}
            >
              Bikin Acara!
            </a>
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Buka menu"
              aria-expanded={menuOpen}
              className="lg:hidden w-10 h-10 rounded-full bg-white border-2 border-evt-ink flex items-center justify-center"
              style={pop(3)}
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={closeMenu}
        title="Arkrea Event"
        hideFrom="lg"
        panelClassName="bg-evt-cream text-evt-ink border-evt-ink"
        footer={
          <a
            href={waLink('Halo Arkrea Event, saya mau bikin acara!')}
            target="_blank"
            rel="noreferrer"
            className="w-full flex items-center justify-center py-3 rounded-full bg-evt-pink text-white font-bold border-2 border-evt-ink"
          >
            Bikin Acara!
          </a>
        }
      >
        {navItems.map((item, i) => (
          <button
            key={item.id}
            onClick={() => scrollAfterClose(closeMenu, item.id)}
            className={`w-full text-left px-4 py-3 mb-2 rounded-2xl font-evt font-bold text-3xl border-2 border-evt-ink ${['bg-evt-yellow', 'bg-evt-pink text-white', 'bg-evt-green text-white', 'bg-evt-blue text-white'][i]}`}
          >
            {item.label}
          </button>
        ))}
        <button
          onClick={() => { closeMenu(); onBack(); }}
          className="w-full flex items-center gap-2 text-left px-3 py-3 mt-3 text-sm font-semibold text-evt-ink/70"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Arkrea
        </button>
      </MobileMenu>

      {/* ── Hero ── */}
      <section id="hero" className="relative pt-28 md:pt-32 pb-20 px-5 md:px-12 overflow-hidden">
        {/* Flat confetti shapes */}
        <span className="absolute top-28 right-[8%] w-14 h-14 rounded-full bg-evt-yellow hidden md:block" aria-hidden="true" />
        <span className="absolute top-[55%] left-[3%] w-8 h-8 bg-evt-green rotate-12 hidden md:block" aria-hidden="true" />
        <span className="absolute bottom-16 right-[40%] w-10 h-10 rounded-full bg-evt-purple hidden md:block" aria-hidden="true" />

        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.1fr_1fr] gap-14 items-center">
          <div>
            <motion.span
              className="inline-block px-4 py-1.5 rounded-full bg-evt-green text-white font-bold text-sm border-2 border-evt-ink mb-6 -rotate-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Event Organizer by Arkrea
            </motion.span>
            <motion.h1
              className="font-evt font-bold leading-[0.85] mb-6"
              style={{ fontSize: 'clamp(4rem, 12vw, 9rem)' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              Bikin acara jadi{' '}
              <span className="relative inline-block">
                <span className="absolute inset-x-0 bottom-2 h-6 md:h-9 bg-evt-yellow -rotate-1 -z-0" aria-hidden="true" />
                <span className="relative">seru!</span>
              </span>
            </motion.h1>
            <motion.p
              className="font-evt font-bold text-3xl md:text-4xl text-evt-pink leading-none mb-5 -rotate-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              Satu Sentuhan Seribu Cerita
            </motion.p>
            <motion.p
              className="text-lg text-evt-ink/75 max-w-md leading-relaxed mb-9"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              Gathering, outbound, gala dinner, sampai acara instansi. Kami urus dari konsep sampai hari H, kamu tinggal datang dan bersenang-senang.
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              <a
                href={waLink('Halo Arkrea Event, saya mau bikin acara!')}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-evt-pink text-white font-bold border-2 border-evt-ink hover:-translate-y-1 transition-transform"
                style={pop()}
              >
                Konsultasi Gratis <ArrowRight className="w-4 h-4" />
              </a>
              <button
                onClick={() => scrollTo('portofolio')}
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white font-bold border-2 border-evt-ink hover:-translate-y-1 transition-transform"
                style={pop()}
              >
                Lihat Acara Kami
              </button>
            </motion.div>
          </div>

          {/* Tilted photo stickers */}
          <div className="relative h-[420px] sm:h-[480px]">
            {[
              { src: ppsnPanggung, cls: 'left-0 top-4 w-[62%] -rotate-6 bg-evt-yellow', delay: 0.2 },
              { src: fotoHiburan, cls: 'right-0 top-24 w-[58%] rotate-6 bg-evt-blue', delay: 0.35 },
              { src: fotoSenam, cls: 'left-[14%] bottom-0 w-[55%] rotate-2 bg-evt-pink', delay: 0.5 },
            ].map((p, i) => (
              <motion.div
                key={i}
                className={`absolute p-2.5 rounded-2xl border-2 border-evt-ink ${p.cls}`}
                style={pop()}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 220, damping: 18, delay: p.delay }}
                whileHover={{ rotate: 0, scale: 1.04, zIndex: 10 }}
              >
                <img src={p.src} alt="" className="w-full aspect-[4/3] object-cover rounded-xl border-2 border-evt-ink" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ticker ── */}
      <div className="bg-evt-ink py-4 overflow-hidden -rotate-1 scale-105" aria-hidden="true">
        <motion.div
          className="flex gap-8 whitespace-nowrap w-max"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 22, ease: 'linear', repeat: Infinity }}
        >
          {Array.from({ length: 2 }).flatMap((_, r) =>
            ['Gathering', 'Outbound', 'Gala Dinner', 'Fun Games', 'Family Day', 'BBQ Night', 'Doorprize'].map((t, i) => (
              <span key={`${r}-${i}`} className="font-evt font-bold text-3xl flex items-center gap-8">
                <span className={['text-evt-yellow', 'text-evt-pink', 'text-evt-green', 'text-evt-blue'][i % 4]}>{t}</span>
                <span className="text-white">✦</span>
              </span>
            ))
          )}
        </motion.div>
      </div>

      {/* ── Services ── */}
      <section id="layanan" className="py-24 md:py-28 px-5 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-evt font-bold text-6xl md:text-7xl leading-none mb-4">Mau acara apa?</h2>
            <p className="text-evt-ink/70 max-w-lg mx-auto">Apa pun acaranya, kami siapkan konsep, tim, dan keseruannya.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                className={`${s.bg} ${s.bg === 'bg-evt-yellow' ? 'text-evt-ink' : 'text-white'} p-7 rounded-3xl border-2 border-evt-ink`}
                style={pop()}
                initial={{ opacity: 0, y: 30, rotate: i % 2 ? 2 : -2 }}
                whileInView={{ opacity: 1, y: 0, rotate: i % 2 ? 1 : -1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ type: 'spring', stiffness: 200, damping: 20, delay: (i % 3) * 0.08 }}
                whileHover={{ rotate: 0, y: -6 }}
              >
                <span className="w-12 h-12 rounded-2xl bg-white text-evt-ink border-2 border-evt-ink flex items-center justify-center mb-5">
                  <s.icon className="w-6 h-6" />
                </span>
                <h3 className="font-evt font-bold text-4xl leading-none mb-3">{s.title}</h3>
                <p className="text-sm leading-relaxed opacity-90">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Portfolio ── */}
      <section id="portofolio" className="bg-evt-yellow border-y-2 border-evt-ink py-24 md:py-28 px-5 md:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-evt font-bold text-6xl md:text-7xl leading-none mb-3">Momen yang Kami Wujudkan</h2>
          <p className="text-evt-ink/75 max-w-2xl leading-relaxed mb-4">
            Setiap acara memiliki cerita, tujuan, dan kesan yang berbeda. Bersama Arkrea, setiap detail dirancang dengan sentuhan yang bermakna untuk menciptakan pengalaman yang tak terlupakan.
          </p>
          <p className="font-evt font-bold text-3xl md:text-4xl text-evt-pink leading-none mb-14">-Satu Sentuhan Seribu Cerita-</p>

          <div className="space-y-10">
            {portfolio.map((p, i) => (
              <motion.article
                key={p.title}
                className="bg-white rounded-3xl border-2 border-evt-ink p-5 md:p-7 grid md:grid-cols-[1.3fr_1fr] gap-6 md:gap-8 items-center"
                style={pop(8)}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="grid grid-cols-2 gap-3">
                  {p.photos.map((src, j) => (
                    <img key={j} src={src} alt="" loading="lazy" className="w-full aspect-[4/3] object-cover rounded-2xl border-2 border-evt-ink" />
                  ))}
                </div>
                <div>
                  <span className={`inline-block ${p.color} text-white font-bold text-xs px-3 py-1 rounded-full border-2 border-evt-ink mb-4`}>{p.meta}</span>
                  <h3 className={`font-evt font-bold text-4xl md:text-5xl leading-none ${p.client ? 'mb-2' : 'mb-5'}`}>{p.title}</h3>
                  {p.client && <p className="text-sm font-semibold text-evt-ink/70 mb-5">{p.client}</p>}
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map(t => (
                      <span key={t} className="px-3 py-1.5 rounded-full bg-evt-cream border-2 border-evt-ink text-sm font-semibold">{t}</span>
                    ))}
                  </div>
                  {p.gallery && (
                    <button
                      onClick={() => setOpenItem(p)}
                      className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-evt-yellow font-bold text-sm border-2 border-evt-ink hover:-translate-y-0.5 transition-transform"
                      style={pop(3)}
                    >
                      <Images className="w-4 h-4" /> Lihat {p.gallery.length} foto
                    </button>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {openItem && <EventGallery item={openItem} onClose={closeItem} />}
      </AnimatePresence>

      {/* ── How it works ── */}
      <section id="cara-kerja" className="py-24 md:py-28 px-5 md:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-evt font-bold text-6xl md:text-7xl leading-none text-center mb-14">Gampang banget!</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <motion.div
                key={s.no}
                className="bg-white rounded-3xl border-2 border-evt-ink p-6"
                style={pop()}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <span className={`${s.bg} ${s.bg === 'bg-evt-yellow' ? 'text-evt-ink' : 'text-white'} w-14 h-14 rounded-full border-2 border-evt-ink flex items-center justify-center font-evt font-bold text-4xl mb-5`}>
                  {s.no}
                </span>
                <h3 className="font-evt font-bold text-3xl leading-none mb-2">{s.title}</h3>
                <p className="text-sm text-evt-ink/75 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact CTA ── */}
      <section id="kontak" className="px-5 md:px-12 pb-24">
        <div className="max-w-6xl mx-auto bg-evt-purple text-white rounded-[2rem] border-2 border-evt-ink p-8 md:p-14 grid lg:grid-cols-2 gap-10 items-center relative overflow-hidden" style={pop(10)}>
          <span className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-evt-yellow border-2 border-evt-ink" aria-hidden="true" />
          <div className="relative">
            <h2 className="font-evt font-bold leading-[0.9] mb-4" style={{ fontSize: 'clamp(3.2rem, 7vw, 5.5rem)' }}>
              Yuk, bikin acaramu bareng kami!
            </h2>
            <p className="text-white/85 leading-relaxed">Konsultasi gratis. Cerita dulu, nanti kami bantu rancang acaranya.</p>
          </div>
          <div className="relative bg-white text-evt-ink rounded-3xl border-2 border-evt-ink p-6 md:p-8">
            <div className="space-y-4 mb-7">
              {[
                { icon: Phone, text: '+62 856 9290 9283', href: waLink('Halo Arkrea Event, saya mau bikin acara!') },
                { icon: Mail, text: 'arterikreasinusantara@gmail.com', href: 'mailto:arterikreasinusantara@gmail.com' },
                { icon: MapPin, text: 'Kota Batu, Jawa Timur', href: undefined },
              ].map(c => {
                const inner = (
                  <>
                    <span className="w-9 h-9 rounded-full bg-evt-yellow border-2 border-evt-ink flex items-center justify-center shrink-0">
                      <c.icon className="w-4 h-4" />
                    </span>
                    <span className="font-semibold break-all">{c.text}</span>
                  </>
                );
                return c.href ? (
                  <a key={c.text} href={c.href} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-evt-pink transition-colors">{inner}</a>
                ) : (
                  <p key={c.text} className="flex items-center gap-3">{inner}</p>
                );
              })}
            </div>
            <a
              href={waLink('Halo Arkrea Event, saya mau bikin acara!')}
              target="_blank"
              rel="noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-full bg-evt-pink text-white font-bold border-2 border-evt-ink hover:-translate-y-1 transition-transform"
              style={pop(4)}
            >
              Chat via WhatsApp <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-evt-ink text-white px-5 md:px-12 py-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between md:items-center gap-6">
          <span className="font-evt font-bold text-4xl text-evt-yellow -rotate-2 self-start">Arkrea Event</span>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-white/75">
            {navItems.map(item => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className="hover:text-evt-yellow transition-colors">{item.label}</button>
            ))}
            <button onClick={onBack} className="flex items-center gap-1.5 hover:text-evt-yellow transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> Arkrea
            </button>
          </div>
        </div>
        <p className="max-w-6xl mx-auto mt-8 pt-6 border-t border-white/10 text-xs text-white/50">
          © {new Date().getFullYear()} Arkrea Event, bagian dari Arteri Kreasi Nusantara
        </p>
      </footer>
    </div>
  );
}
