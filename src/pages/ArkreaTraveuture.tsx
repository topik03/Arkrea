import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ChevronDown, Phone, Mail, Globe, MapPin, ChevronRight, X, Images, Menu } from 'lucide-react';
import InstagramIcon from '../components/InstagramIcon';
import MobileMenu, { scrollAfterClose } from '../components/MobileMenu';
import bromoDrone from '../assets/foto/bromo-drone.webp';
import bromoSunrise from '../assets/foto/bromo-sunrise.webp';
import bromoGrupSpanduk from '../assets/foto/bromo-grup-spanduk.webp';
import bromoJeep from '../assets/foto/bromo-jeep.webp';
import bromoSavana from '../assets/foto/bromo-savana.webp';
import baliGwk from '../assets/foto/bali-gwk.webp';
import baliPura from '../assets/foto/bali-pura.webp';
import baliPenglipuran from '../assets/foto/bali-penglipuran.webp';
import baliAdat from '../assets/foto/bali-adat.webp';
import baliViewpoint from '../assets/foto/bali-viewpoint.webp';
import baliCruise from '../assets/foto/bali-cruise.webp';
import baliHotel from '../assets/foto/bali-hotel.webp';
import bromoJeepUdara from '../assets/foto/bromo-jeep-udara.webp';
import bromoSunriseUdara from '../assets/foto/bromo-sunrise-udara.webp';
import bromoGrupCeria from '../assets/foto/bromo-grup-ceria.webp';
import bromoPenanjakan from '../assets/foto/bromo-penanjakan.webp';
import bromoGrupWanita from '../assets/foto/bromo-grup-wanita.webp';
import bromoGrupPria from '../assets/foto/bromo-grup-pria.webp';
import bromoKeluargaJeep from '../assets/foto/bromo-keluarga-jeep.webp';
import bromoMalamJeep from '../assets/foto/bromo-malam-jeep.webp';
import baliKeluargaKapal from '../assets/foto/bali-keluarga-kapal.webp';
import baliDekKapal from '../assets/foto/bali-dek-kapal.webp';
import baliBusanaAdat from '../assets/foto/bali-busana-adat.webp';
import baliGalaDinner from '../assets/foto/bali-gala-dinner.webp';
import baliMakanSiang from '../assets/foto/bali-makan-siang.webp';
import baliKopi from '../assets/foto/bali-kopi.webp';
import baliKabinKapal from '../assets/foto/bali-kabin-kapal.webp';
import baliGamesKapal from '../assets/foto/bali-games-kapal.webp';
import baliPrasmananMalam from '../assets/foto/bali-prasmanan-malam.webp';
import baliMakanSiangAdat from '../assets/foto/bali-makan-siang-adat.webp';
import baliPenglipuranAdat from '../assets/foto/bali-penglipuran-adat.webp';
import baliMakanPemandangan from '../assets/foto/bali-makan-pemandangan.webp';
import baliTurunBus from '../assets/foto/bali-turun-bus.webp';
import bromoSelfieSunrise from '../assets/foto/bromo-selfie-sunrise.webp';
import bromoMenantiFajar from '../assets/foto/bromo-menanti-fajar.webp';
import bromoKeluargaFajar from '../assets/foto/bromo-keluarga-fajar.webp';
import bromoGrupJeep from '../assets/foto/bromo-grup-jeep.webp';
import bromoPoseJeep from '../assets/foto/bromo-pose-jeep.webp';
import bromoBatok from '../assets/foto/bromo-batok.webp';
import bromoBatokCeria from '../assets/foto/bromo-batok-ceria.webp';
import bromoBarisanJeep from '../assets/foto/bromo-barisan-jeep.webp';
import dprdJeepGrup from '../assets/foto/dprd-jeep-grup.webp';
import dprdJeepHutan from '../assets/foto/dprd-jeep-hutan.webp';
import dprdJeepKuning from '../assets/foto/dprd-jeep-kuning.webp';
import dprdJeepKonvoi from '../assets/foto/dprd-jeep-konvoi.webp';
import dprdPetikStroberi from '../assets/foto/dprd-petik-stroberi.webp';
import dprdViewpoint from '../assets/foto/dprd-viewpoint.webp';
import dprdAmfiteater from '../assets/foto/dprd-amfiteater.webp';
import dprdSenamPagi from '../assets/foto/dprd-senam-pagi.webp';
import dprdTamanHotel from '../assets/foto/dprd-taman-hotel.webp';
import dprdPembukaan from '../assets/foto/dprd-pembukaan.webp';
import dprdFotoPembukaan from '../assets/foto/dprd-foto-pembukaan.webp';
import dprdBbqMalam from '../assets/foto/dprd-bbq-malam.webp';
import dprdHiburanMalam from '../assets/foto/dprd-hiburan-malam.webp';
import dprdGames from '../assets/foto/dprd-games.webp';
import dprdDoorprize from '../assets/foto/dprd-doorprize.webp';
import dprdJeepHotel from '../assets/foto/dprd-jeep-hotel.webp';
import dprdViewpointGrup from '../assets/foto/dprd-viewpoint-grup.webp';
import dprdPemandangan from '../assets/foto/dprd-pemandangan.webp';
import dprdMakanMalam from '../assets/foto/dprd-makan-malam.webp';
import dprdGamesPanggung from '../assets/foto/dprd-games-panggung.webp';

const INSTAGRAM_URL = 'https://www.instagram.com/arkreatraventure/';
const VILLA_RASA_INSTAGRAM_URL = 'https://www.instagram.com/villadanrasa/';
const TRAVENTURE_WA_URL = 'https://wa.me/6285692909283?text=Halo%20Arkrea%20Traventure%2C%20saya%20ingin%20bertanya%20mengenai%20wisata.';

// Header sections, shared by the desktop nav and the mobile menu
const navItems = [
  { label: 'Destinasi', id: 'destinasi' },
  { label: 'Pengalaman', id: 'pengalaman' },
  { label: 'Villa & Rasa', id: 'villa-rasa' },
  { label: 'Tentang', id: 'tentang' },
  { label: 'Kontak', id: 'kontak' },
];

// ── Subtle curved-line texture overlay (matching reference image style)
function DarkTexture({ opacity = 0.045, id = 'curvePattern' }: { opacity?: number; id?: string }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none select-none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <pattern id={id} x="0" y="0" width="520" height="320" patternUnits="userSpaceOnUse">
          <path d="M-60 160 C 60 80, 160 240, 280 160 S 460 80, 580 160" fill="none" stroke="white" strokeWidth="0.8" />
          <path d="M-60 220 C 80 130, 180 310, 300 220 S 480 130, 600 220" fill="none" stroke="white" strokeWidth="0.8" />
          <path d="M-60 90 C 70 20, 170 170, 280 90 S 460 20, 580 90" fill="none" stroke="white" strokeWidth="0.6" />
          <path d="M0 -20 C 100 60, 200 -40, 320 30 S 480 100, 600 30" fill="none" stroke="white" strokeWidth="0.5" />
          <path d="M-80 280 C 60 200, 200 360, 320 280 S 500 200, 620 280" fill="none" stroke="white" strokeWidth="0.7" />
          <path d="M-100 350 C 150 180, 350 520, 600 350" fill="none" stroke="white" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} opacity={opacity} />
    </svg>
  );
}

// ── Abstract organic line texture for light (white) sections
function LightTexture({ opacity = 0.055, id = 'lightPattern' }: { opacity?: number; id?: string }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none select-none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <pattern id={id} x="0" y="0" width="900" height="600" patternUnits="userSpaceOnUse">
          {/* Large sweeping S-curve */}
          <path d="M-150 300 C 50 80, 300 520, 550 280 S 850 40, 1100 280" fill="none" stroke="#6B7740" strokeWidth="1" />
          {/* Gentle long arc top */}
          <path d="M-100 80 C 150 -60, 450 220, 700 60 S 1000 -80, 1200 60" fill="none" stroke="#6B7740" strokeWidth="0.6" />
          {/* Flowing curve bottom */}
          <path d="M-100 520 C 200 350, 400 700, 650 480 S 950 260, 1150 480" fill="none" stroke="#6B7740" strokeWidth="0.7" />
          {/* Diagonal subtle sweep */}
          <path d="M0 600 C 200 380, 500 580, 700 340 S 900 100, 1100 320" fill="none" stroke="#1C1A14" strokeWidth="0.4" />
          {/* Tight mid wave */}
          <path d="M50 420 C 180 320, 300 500, 430 400 S 620 300, 720 390" fill="none" stroke="#6B7740" strokeWidth="0.5" />
          {/* Circular arc fragment */}
          <path d="M700 -40 A 300 300 0 0 1 980 240" fill="none" stroke="#6B7740" strokeWidth="0.6" />
          {/* Small organic loop hint */}
          <path d="M80 140 C 160 60, 260 200, 340 120 S 460 40, 520 130" fill="none" stroke="#1C1A14" strokeWidth="0.35" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} opacity={opacity} />
    </svg>
  );
}

interface ArkreaTraveutureProps {
  onBack: () => void;
}

// ── Palette (23hotel.co inspired)
// bg: #FFFFFF, dark section: #252420, olive: #6B7740, text: #1C1A14

// Real Arkrea Traventure trip: Mahkamah Agung (MA 13) tour, Bromo at sunrise (drone)
const heroImage = bromoDrone;

// Documentation of trips Arkrea Traventure has run; the first photo is the card cover
type Trip = { title: string; meta: string; photos: { src: string; caption: string }[] };

const trips: Trip[] = [
  {
    title: 'Mahkamah Agung',
    meta: 'Malang · Batu · Bromo — 13–15 Juni 2026',
    photos: [
      { src: bromoGrupSpanduk, caption: 'Foto bersama di kawasan Bromo' },
      { src: bromoMalamJeep, caption: 'Berangkat dini hari dengan jeep' },
      { src: bromoSunriseUdara, caption: 'Sunrise di Bromo dari udara' },
      { src: bromoSunrise, caption: 'Menanti sunrise di Penanjakan' },
      { src: bromoSelfieSunrise, caption: 'Swafoto saat fajar menyingsing' },
      { src: bromoMenantiFajar, caption: 'Senyum peserta menanti fajar' },
      { src: bromoKeluargaFajar, caption: 'Keluarga peserta di Penanjakan' },
      { src: bromoPenanjakan, caption: 'Berpose di depan kawah Bromo' },
      { src: bromoGrupWanita, caption: 'Peserta dengan latar kawah Bromo' },
      { src: bromoGrupPria, caption: 'Foto bersama di Penanjakan' },
      { src: bromoGrupCeria, caption: 'Keseruan rombongan di Bromo' },
      { src: bromoJeepUdara, caption: 'Rombongan jeep di lautan pasir' },
      { src: bromoGrupJeep, caption: 'Foto bersama di depan jeep' },
      { src: bromoBarisanJeep, caption: 'Barisan jeep di kaki Gunung Batok' },
      { src: bromoPoseJeep, caption: 'Berpose di atas jeep' },
      { src: bromoBatok, caption: 'Berlatar Gunung Batok' },
      { src: bromoBatokCeria, caption: 'Keceriaan di depan Gunung Batok' },
      { src: bromoKeluargaJeep, caption: 'Keluarga peserta di atas jeep' },
      { src: bromoJeep, caption: 'Lompat bersama di depan Gunung Batok' },
      { src: bromoSavana, caption: 'Peserta dengan latar Gunung Bromo' },
    ],
  },
  {
    title: 'Guyub Rukun Dolan Bareng × Aldo Frozen Food',
    meta: 'Bali — gathering Aldo Frozen Food, 3 hari',
    photos: [
      { src: baliGwk, caption: 'Foto bersama di GWK' },
      { src: baliCruise, caption: 'Dinner cruise' },
      { src: baliKabinKapal, caption: 'Bersantai di kabin kapal' },
      { src: baliGamesKapal, caption: 'Games seru di atas kapal' },
      { src: baliKeluargaKapal, caption: 'Keluarga peserta di dek kapal' },
      { src: baliDekKapal, caption: 'Senja dari atas kapal' },
      { src: baliPrasmananMalam, caption: 'Makan malam prasmanan' },
      { src: baliTurunBus, caption: 'Tiba di destinasi berikutnya' },
      { src: baliPenglipuran, caption: 'Desa Penglipuran' },
      { src: baliPenglipuranAdat, caption: 'Berbusana adat di Desa Penglipuran' },
      { src: baliPura, caption: 'Kunjungan ke pura' },
      { src: baliBusanaAdat, caption: 'Mencoba busana adat Bali' },
      { src: baliAdat, caption: 'Berbusana adat Bali di pura' },
      { src: baliViewpoint, caption: 'Foto bersama di viewpoint' },
      { src: baliGalaDinner, caption: 'Gala dinner bersama' },
      { src: baliHotel, caption: 'Foto bersama di hotel' },
      { src: baliMakanSiang, caption: 'Makan siang bersama' },
      { src: baliMakanSiangAdat, caption: 'Makan siang di restoran khas Bali' },
      { src: baliMakanPemandangan, caption: 'Makan siang dengan pemandangan alam' },
      { src: baliKopi, caption: 'Mencicipi kopi khas Bali' },
    ],
  },
  {
    title: 'Sekretariat DPRD Provinsi Jawa Timur',
    meta: 'Tawangmangu — Nava Hotel, 27–29 November 2025',
    photos: [
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

const destinations = [
  {
    name: 'RAJA AMPAT',
    region: 'Papua Barat',
    image: 'https://images.unsplash.com/photo-1745917784423-023fb69188f1?w=800&q=80&fit=crop',
    desc: 'Terumbu karang terkaya di dunia',
  },
  {
    name: 'LABUAN BAJO',
    region: 'Nusa Tenggara Timur',
    image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&q=80&fit=crop',
    desc: 'Pulau Komodo & sunset dramatis',
  },
  {
    name: 'DANAU TOBA',
    region: 'Sumatera Utara',
    image: 'https://images.unsplash.com/photo-1601058497548-f247dfe349d6?w=800&q=80&fit=crop',
    desc: 'Danau vulkanik terbesar dunia',
  },
  {
    name: 'BROMO',
    region: 'Jawa Timur',
    image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=800&q=80&fit=crop',
    desc: 'Golden sunrise di atas lautan pasir',
  },
  {
    name: 'WAKATOBI',
    region: 'Sulawesi Tenggara',
    image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&q=80&fit=crop',
    desc: 'Taman nasional laut terbaik',
  },
  {
    name: 'BALI',
    region: 'Pulau Dewata',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80&fit=crop',
    desc: 'Spiritual, seni & budaya autentik',
  },
];

const experiences = [
  {
    name: 'DIVING &\nSNORKELING',
    image: 'https://images.unsplash.com/photo-1724258207520-7870359e112a?w=700&q=80&fit=crop',
    desc: 'Kedalaman laut Nusantara bersama instruktur bersertifikat',
  },
  {
    name: 'TREKKING &\nHIKING',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&q=80&fit=crop',
    desc: 'Jalur-jalur terbaik dengan panduan lokal berpengalaman',
  },
  {
    name: 'CULTURAL\nIMMERSION',
    image: baliAdat,
    desc: 'Berinteraksi langsung dengan komunitas dan ritual adat',
  },
  {
    name: 'ECO\nPHOTOGRAPHY',
    image: bromoSunriseUdara,
    desc: 'Abadikan keajaiban alam bersama fotografer profesional',
  },
  {
    name: 'SUNRISE\nEXPEDITION',
    image: bromoSunrise,
    desc: 'Golden hour terbaik dari titik-titik tersembunyi',
  },
];

// Horizontal carousel
function Carousel({ items, darkBg = true }: {
  items: typeof destinations;
  darkBg?: boolean;
}) {
  const [idx, setIdx] = useState(0);
  // Cards per view: show a peek of the next card on small screens instead of squeezing three
  const getVisible = () => (window.innerWidth < 640 ? 1.3 : window.innerWidth < 1024 ? 2.2 : 3);
  const [visible, setVisible] = useState(getVisible);
  const max = Math.max(0, items.length - visible);

  useEffect(() => {
    const onResize = () => setVisible(getVisible());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Keep the position valid when the card count per view changes
  useEffect(() => setIdx(p => Math.min(p, max)), [max]);

  const prev = () => setIdx(p => Math.max(0, p - 1));
  const next = () => setIdx(p => Math.min(max, p + 1));
  // `idx` can end on a fraction (e.g. 4.7) so the last card lands flush with the edge
  const shift = Math.min(idx, max);

  return (
    <div className={`${darkBg ? 'bg-trv-night' : 'bg-white'} py-16 overflow-hidden`}>
      <div className="px-8 md:px-16 flex items-center justify-between mb-8">
        <span className={`text-xs uppercase tracking-[0.35em] font-medium ${darkBg ? 'text-white/60' : 'text-trv-ink/60'}`}>
          Jelajahi Destinasi
        </span>
        <div className="flex gap-2">
          <button
            onClick={prev}
            disabled={idx === 0}
            className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all disabled:opacity-30 ${
              darkBg
                ? 'border-white/20 text-white hover:border-white'
                : 'border-trv-ink/20 text-trv-ink hover:border-trv-olive'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={next}
            disabled={idx >= max}
            className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all disabled:opacity-30 ${
              darkBg
                ? 'border-white/20 text-white hover:border-white'
                : 'border-trv-ink/20 text-trv-ink hover:border-trv-olive'
            }`}
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="px-8 md:px-16">
        <motion.div
          className="flex gap-5"
          // Cards shrink to make room for the 20px gaps, so one step is (track + 20px) / count
          animate={{ x: `calc(-${shift * (100 / items.length)}% - ${shift * 20 / items.length}px)` }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: `${(items.length / visible) * 100}%` }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              className="group cursor-pointer"
              style={{ width: `${100 / items.length}%` }}
            >
              {/* Photo */}
              <div className="relative overflow-hidden mb-5" style={{ aspectRatio: '3/4' }}>
                <motion.img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.7 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              </div>

              {/* Name */}
              <h3 className={`font-serif font-bold text-xl leading-tight mb-1 whitespace-pre-line ${darkBg ? 'text-white' : 'text-trv-ink'}`}>
                {item.name}
              </h3>
              <p className={`text-xs mb-3 ${darkBg ? 'text-white/60' : 'text-trv-ink/60'}`}>{item.region || item.desc}</p>
              <button className="flex items-center gap-1.5 text-trv-olive text-xs font-semibold uppercase tracking-[0.2em] group-hover:gap-2.5 transition-all">
                SEE MORE
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// ── Full-screen gallery listing every photo of one trip
function TripGallery({ trip, onClose }: { trip: Trip; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

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
      aria-label={`Dokumentasi ${trip.title}`}
      className="fixed inset-0 z-[100] bg-white overflow-y-auto overscroll-contain"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-trv-ink/10">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-4 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <h3 className="font-serif text-xl md:text-2xl font-bold text-trv-ink leading-tight">{trip.title}</h3>
            <p className="text-trv-ink/60 text-xs md:text-sm mt-0.5">{trip.meta} · {trip.photos.length} foto</p>
          </div>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Tutup galeri"
            className="shrink-0 w-11 h-11 rounded-full border border-trv-ink/15 flex items-center justify-center text-trv-ink hover:bg-trv-ink hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 md:px-8 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {trip.photos.map((photo) => (
          <figure key={photo.caption} className="m-0">
            <div className="overflow-hidden rounded-xl aspect-[4/3] bg-trv-ink/5">
              <img src={photo.src} alt={photo.caption} loading="lazy" decoding="async" className="w-full h-full object-cover object-[50%_30%]" />
            </div>
            <figcaption className="text-trv-ink/60 text-sm mt-3">{photo.caption}</figcaption>
          </figure>
        ))}
      </div>
    </motion.div>
  );
}

export default function ArkreaTraveuture({ onBack }: ArkreaTraveutureProps) {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const heroRef = useRef<HTMLDivElement>(null);
  const heroImgY = useTransform(scrollY, [0, 600], [0, 120]);

  const aboutRef = useRef<HTMLDivElement>(null);
  const aboutInView = useInView(aboutRef, { once: true, margin: '-80px' });

  const featureRef = useRef<HTMLDivElement>(null);
  const featureInView = useInView(featureRef, { once: true, margin: '-80px' });

  const archRef = useRef<HTMLDivElement>(null);
  const archInView = useInView(archRef, { once: true, margin: '-80px' });

  const [openTrip, setOpenTrip] = useState<Trip | null>(null);
  const closeTrip = useCallback(() => setOpenTrip(null), []);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <div className="min-h-screen bg-white text-trv-ink font-sans overflow-x-hidden">

      {/* ── Navbar ── */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.06)]'
            : 'bg-transparent'
        }`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center justify-between px-8 md:px-14 py-4">
          {/* Logo / Back */}
          <button
            onClick={onBack}
            aria-label="Kembali ke Arkrea"
            className={`flex items-center gap-3 group transition-colors ${scrolled ? 'text-trv-ink' : 'text-white'}`}
          >
            <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all group-hover:scale-110 ${scrolled ? 'border-trv-ink/25' : 'border-white/40'}`}>
              <ArrowLeft className="w-3.5 h-3.5" />
            </div>
            <div className="hidden md:block text-left">
              <div className={`text-xs uppercase tracking-[0.4em] leading-none mb-0.5 ${scrolled ? 'text-trv-ink/60' : 'text-white/50'}`}>
                ARKREA
              </div>
              <div className={`font-serif text-sm font-semibold tracking-[0.1em] leading-none ${scrolled ? 'text-trv-olive' : 'text-white'}`}>
                TRAVENTURE
              </div>
            </div>
          </button>

          {/* Center nav */}
          <nav className={`hidden lg:flex items-center gap-8 text-xs font-medium uppercase tracking-[0.15em] transition-colors ${scrolled ? 'text-trv-ink/70' : 'text-white/80'}`}>
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })}
                className="hover:text-trv-olive transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* CTA pill button */}
            <a
              href={TRAVENTURE_WA_URL}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 bg-trv-olive hover:bg-trv-olive-dark text-white text-xs font-semibold uppercase tracking-[0.18em] rounded-full transition-all hover:scale-105 shadow-sm"
            >
              Hubungi Kami
            </a>
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Buka menu"
              aria-expanded={menuOpen}
              className={`lg:hidden w-10 h-10 rounded-full border flex items-center justify-center transition-colors ${scrolled ? 'border-trv-ink/25 text-trv-ink' : 'border-white/40 text-white'}`}
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu — outside <motion.header> so `fixed` covers the viewport */}
      <MobileMenu
        open={menuOpen}
        onClose={closeMenu}
        title="Arkrea Traventure"
        hideFrom="lg"
        panelClassName="bg-white text-trv-ink border-trv-ink/10"
        footer={
          <a
            href={TRAVENTURE_WA_URL}
            target="_blank"
            rel="noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-trv-olive text-white text-xs font-semibold uppercase tracking-[0.18em]"
          >
            Hubungi Kami
          </a>
        }
      >
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => scrollAfterClose(closeMenu, item.id)}
            className="w-full text-left px-3 py-3 rounded-xl font-serif text-lg hover:bg-trv-cream transition-colors"
          >
            {item.label}
          </button>
        ))}
        <button
          onClick={() => { closeMenu(); onBack(); }}
          className="w-full flex items-center gap-2 text-left px-3 py-3 mt-4 rounded-xl text-sm text-trv-ink/60 hover:bg-trv-cream transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Arkrea
        </button>
      </MobileMenu>

      {/* ── Hero ── */}
      <section ref={heroRef} className="relative h-dvh overflow-hidden">
        <motion.img
          src={heroImage}
          alt="Arkrea Traventure"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ y: heroImgY }}
        />
        <div className="absolute inset-0 bg-trv-ink/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/55" />

        {/* Hero text — bottom left, ALL-CAPS bold serif like 23hotel */}
        <div className="absolute bottom-20 left-8 md:left-14 z-10">
          <motion.h1
            className="font-serif font-bold text-white leading-[0.92] mb-4"
            style={{ fontSize: 'clamp(2.75rem, 12vw, 9rem)' }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            JELAJAHI<br />
            <span className="text-trv-sand">NUSANTARA.</span>
          </motion.h1>
          <motion.p
            className="text-white/65 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            Divisi perjalanan autentik — Arteri Kreasi Nusantara
          </motion.p>
        </div>

        {/* Down arrow */}
        <motion.button
          className="absolute bottom-8 left-8 md:left-14 z-10 w-9 h-9 rounded-full border border-white/40 flex items-center justify-center text-white hover:border-white transition-colors"
          onClick={() => document.getElementById('tentang')?.scrollIntoView({ behavior: 'smooth' })}
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.button>
      </section>

      {/* ── Intro — center-aligned large text (23hotel style) ── */}
      <section id="tentang" className="bg-white py-24 md:py-32 px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="text-trv-olive text-xs uppercase tracking-[0.4em] mb-6">
            Divisi Travel & Wisata — Arteri Kreasi Nusantara
          </p>
          <h2 className="font-serif text-2xl md:text-4xl lg:text-[2.6rem] font-light text-trv-ink leading-[1.35]">
            Lebih dari sekadar perjalanan — sebuah janji tentang petualangan, keajaiban alam, dan kenangan abadi di tanah Nusantara yang tiada habisnya.
          </h2>
        </motion.div>
      </section>

      {/* ── About — ARCH photo left + text right (23hotel signature) ── */}
      <section ref={aboutRef} className="bg-white pb-24 px-8 md:px-14 relative overflow-hidden">
        <LightTexture opacity={0.055} id="lightPattern-about" />
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          {/* Arch-shaped photo */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto"
            style={{ maxWidth: 420 }}
          >
            {/* Arch clip */}
            <div
              className="overflow-hidden w-full"
              style={{
                aspectRatio: '3/4',
                borderRadius: '50% 50% 0 0 / 30% 30% 0 0',
              }}
            >
              <img
                src={baliAdat}
                alt="Arkrea Traventure"
                className="w-full h-full object-cover"
              />
            </div>
            {/* floating badge */}
            <div className="absolute -bottom-5 right-0 bg-trv-olive text-white text-xs px-5 py-3 font-medium uppercase tracking-wider">
              Berdiri sejak 2024
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={aboutInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <h3 className="font-serif text-2xl md:text-3xl font-light text-trv-ink mb-5 leading-snug">
              Arkrea Traventure menghadirkan pengalaman immersif di mana para traveler menemukan alam dan budaya Indonesia yang sesungguhnya.
            </h3>
            <p className="text-trv-ink/50 text-sm leading-relaxed mb-4">
              Ketenangan adalah hal pertama yang Anda rasakan. Sunyi, istirahat, damai. Jauh dari kebisingan namun cukup dekat dengan getaran dan vitalitas alam Nusantara.
            </p>
            <p className="text-trv-ink/60 text-sm leading-relaxed mb-10">
              Sebuah keseimbangan antara pemutusan dari rutinitas dan inspirasi yang membara — itulah yang selalu kami hadirkan di setiap perjalanan.
            </p>
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-trv-ink/8">
              {[
                { val: '200+', lbl: 'Destinasi' },
                { val: '5.000+', lbl: 'Traveler' },
                { val: '2+', lbl: 'Tahun' },
              ].map(s => (
                <div key={s.lbl}>
                  <div className="font-serif text-3xl font-light text-trv-olive">{s.val}</div>
                  <div className="text-trv-ink/60 text-xs uppercase tracking-widest mt-0.5">{s.lbl}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Second arch section — second arched photo bottom-right (23hotel has two) ── */}
      <section className="bg-white pb-24 px-8 md:px-14 relative overflow-hidden">
        <LightTexture opacity={0.05} id="lightPattern-feature" />
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* Text left */}
          <motion.div
            ref={featureRef}
            initial={{ opacity: 0, x: -30 }}
            animate={featureInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9 }}
          >
            <h3 className="font-serif text-2xl md:text-3xl font-light text-trv-ink mb-5 leading-snug">
              Keajaiban alam hadir dalam setiap detail perjalanan yang kami rancang.
            </h3>
            <p className="text-trv-ink/50 text-sm leading-relaxed mb-4">
              Cahaya, iklim, warna, dan tekstur alam Nusantara membangkitkan sensasi berada di tempat yang tak tergantikan di dunia manapun.
            </p>
            <p className="text-trv-ink/60 text-sm leading-relaxed mb-10">
              Setiap itinerary kami dirancang bukan sekadar rute perjalanan, melainkan sebuah karya yang menyentuh indra dan jiwa setiap traveler.
            </p>
            <button
              onClick={() => document.getElementById('destinasi')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2 text-trv-olive text-xs font-semibold uppercase tracking-[0.2em] hover:gap-3 transition-all"
            >
              Lihat Destinasi <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>

          {/* Rounded-rectangle photo — big rounded corners, 23hotel signature */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={featureInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative"
          >
            <div
              className="overflow-hidden w-full"
              style={{
                aspectRatio: '4/3',
                borderRadius: '40px',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1570789210967-2cac24afeb00?w=800&q=80&fit=crop"
                alt="Nusantara Experience"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Destination Carousel — dark bg (23hotel room section) ── */}
      <section id="destinasi" className="bg-trv-night relative overflow-hidden">
        <DarkTexture opacity={0.05} id="curvePattern-destinasi" />
        <div className="relative z-10 pt-14 pb-4 px-8 md:px-14">
          <p className="text-white/60 text-xs uppercase tracking-[0.35em] mb-2 font-medium">JELAJAHI</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">DESTINASI KAMI</h2>
        </div>
        <div className="relative z-10">
          <Carousel items={destinations} darkBg={true} />
        </div>
      </section>

      {/* ── Third arch photo — full section (23hotel second arch shape) ── */}
      <section ref={archRef} className="bg-white py-24 px-8 md:px-14 relative overflow-hidden">
        <LightTexture opacity={0.05} id="lightPattern-arch" />
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* Second arch photo — right side this time */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={archInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1 }}
            className="relative mx-auto order-2 lg:order-1"
            style={{ maxWidth: 420 }}
          >
            <div
              className="overflow-hidden w-full"
              style={{
                aspectRatio: '3/4',
                borderRadius: '50% 50% 20px 20px / 30% 30% 20px 20px',
              }}
            >
              <img
                src={dprdPemandangan}
                alt="Pengalaman"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Text — values */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={archInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <p className="text-trv-olive text-xs uppercase tracking-[0.4em] mb-5">Filosofi Kami</p>
            <h3 className="font-serif text-2xl md:text-3xl font-light text-trv-ink mb-8 leading-snug">
              Perjalanan yang bertanggung jawab adalah warisan terbaik kita.
            </h3>
            {[
              { lbl: 'Eco-Responsible', desc: 'Setiap itinerary meminimalkan jejak karbon dan mendukung komunitas lokal secara langsung.' },
              { lbl: 'Authentic First', desc: 'Menghindari tourist trap — setiap momen adalah perjumpaan nyata dengan alam dan manusia lokal.' },
              { lbl: 'Safety Certified', desc: 'Panduan bersertifikat nasional dengan protokol keselamatan internasional di setiap destinasi.' },
            ].map((v, i) => (
              <motion.div
                key={v.lbl}
                initial={{ opacity: 0, y: 15 }}
                animate={archInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                className="flex gap-4 py-4 border-b border-trv-ink/8 last:border-0"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-trv-olive mt-2 shrink-0" />
                <div>
                  <div className="text-trv-ink text-sm font-semibold mb-1">{v.lbl}</div>
                  <p className="text-trv-ink/45 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Experience Carousel — white bg ── */}
      <section id="pengalaman" className="bg-trv-cream">
        <div className="pt-14 pb-4 px-8 md:px-14">
          <p className="text-trv-ink/60 text-xs uppercase tracking-[0.35em] mb-2 font-medium">LAYANAN</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-trv-ink">PENGALAMAN KAMI</h2>
        </div>

        {/* Custom light carousel */}
        <div className="bg-trv-cream py-8 pb-16 overflow-hidden px-8 md:px-14">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
                className="group cursor-default"
              >
                <div
                  className="overflow-hidden mb-4"
                  style={{ aspectRatio: '3/4', borderRadius: '12px' }}
                >
                  <motion.img
                    src={exp.image}
                    alt={exp.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.7 }}
                  />
                </div>
                <h3 className="font-serif font-bold text-base leading-tight mb-1.5 whitespace-pre-line text-trv-ink">
                  {exp.name}
                </h3>
                <p className="text-trv-ink/60 text-xs leading-relaxed mb-3">{exp.desc}</p>
                <button className="flex items-center gap-1.5 text-trv-olive text-xs font-semibold uppercase tracking-[0.2em] group-hover:gap-2.5 transition-all">
                  SEE MORE <ChevronRight className="w-3 h-3" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Villa & Rasa — villa stays and local cuisine by Arkrea ── */}
      <section id="villa-rasa" className="bg-trv-night relative overflow-hidden py-24 px-8 md:px-14">
        <DarkTexture opacity={0.05} id="curvePattern-villa" />
        <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1 }}
            className="relative mx-auto w-full"
            style={{ maxWidth: 460 }}
          >
            <div
              className="overflow-hidden w-full"
              style={{ aspectRatio: '3/4', borderRadius: '50% 50% 20px 20px / 30% 30% 20px 20px' }}
            >
              <img
                src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=900&q=80&fit=crop"
                alt="Villa & Rasa"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 bg-trv-olive px-4 py-2 text-white text-xs font-semibold uppercase tracking-[0.15em]">
              Layanan Baru
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <p className="text-trv-sand text-xs uppercase tracking-[0.4em] mb-5">Arkrea Traventure Presents</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">Villa &amp; Rasa</h2>
            <p className="font-serif text-xl md:text-2xl font-light text-white/85 mb-6 leading-snug">
              Villa nyaman &amp; hangat di setiap momen.
            </p>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              Pilihan villa di Kota Batu untuk staycation keluarga hingga rombongan — dari 10 sampai 25 orang, dengan 3 hingga 5 kamar tidur.
            </p>
            <p className="text-white/60 text-sm leading-relaxed mb-8">
              Lengkapi liburan dengan BBQ service kami, untuk liburan tanpa repot.
            </p>
            <div className="flex flex-wrap gap-2 mb-10">
              {['Villa Iboeku', 'Villa Pondok Kelapa', 'Villa Ebenhaezer', 'BBQ Service'].map(tag => (
                <span key={tag} className="px-3 py-1.5 border border-white/15 rounded-full text-white/70 text-xs tracking-wide">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={VILLA_RASA_INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-trv-olive hover:bg-trv-olive-dark text-white text-xs font-semibold uppercase tracking-[0.18em] rounded-full transition-all hover:scale-105"
              >
                <InstagramIcon className="w-4 h-4" />
                @villadanrasa
              </a>
              <a
                href="https://wa.me/6285710098888?text=Halo%20Villa%20%26%20Rasa%2C%20saya%20ingin%20bertanya%20mengenai%20villa."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-trv-sand text-xs font-semibold uppercase tracking-[0.2em] hover:gap-3 transition-all"
              >
                Reservasi <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Trip documentation (real photos) ── */}
      <section id="dokumentasi" className="bg-white py-24 px-8 md:px-14">
        <p className="text-trv-ink/60 text-xs uppercase tracking-[0.35em] mb-2 font-medium">DOKUMENTASI</p>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-trv-ink mb-14">PERJALANAN BERSAMA KAMI</h2>

        {/* One cover card per trip; the full set opens in TripGallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trips.map((trip, i) => (
            <motion.button
              key={trip.title}
              type="button"
              onClick={() => setOpenTrip(trip)}
              aria-label={`Lihat ${trip.photos.length} foto ${trip.title}`}
              className="group relative block w-full overflow-hidden rounded-2xl aspect-[4/3] text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <img
                src={trip.photos[0].src}
                alt=""
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-trv-ink/95 via-trv-ink/50 to-trv-ink/5" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <p className="text-white/80 text-xs md:text-sm mb-2">{trip.meta}</p>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-white leading-tight mb-4">{trip.title}</h3>
                <span className="inline-flex items-center gap-2 text-white text-xs uppercase tracking-[0.25em] font-semibold border-b border-white/50 pb-1 group-hover:border-trv-sand group-hover:text-trv-sand transition-colors">
                  <Images className="w-4 h-4" />
                  Lihat {trip.photos.length} foto
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {openTrip && <TripGallery trip={openTrip} onClose={closeTrip} />}
      </AnimatePresence>

      {/* ── Full-bleed photo + quote ── */}
      <div className="relative h-[55vw] max-h-[580px] overflow-hidden">
        <motion.img
          src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1800&q=85&fit=crop"
          alt="Nusantara"
          className="w-full h-full object-cover"
          initial={{ scale: 1.06 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: 'easeOut' }}
        />
        <div className="absolute inset-0 bg-trv-ink/35" />
        <div className="absolute inset-0 flex items-end justify-start px-8 md:px-14 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <p className="text-white/50 text-xs uppercase tracking-[0.4em] mb-3">Indonesia</p>
            <p className="font-serif text-white text-2xl md:text-4xl font-light max-w-xl leading-tight">
              "Tanah yang memanggil jiwa<br />para penjelajah sejati."
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Contact Section ── */}
      <section id="kontak" className="bg-white py-24 px-8 md:px-14">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-trv-olive text-xs uppercase tracking-[0.4em] mb-5">Hubungi Kami</p>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-trv-ink mb-6 leading-snug">
              Mulai Rencanakan<br />Petualangan Anda.
            </h2>
            <p className="text-trv-ink/45 text-sm leading-relaxed mb-10">
              Tim kami siap berdiskusi dan merancang perjalanan impian Anda ke seluruh penjuru Nusantara.
            </p>
            <div className="space-y-5">
              {[
                { icon: Phone, text: '+62 856 9290 9283', href: 'https://wa.me/6285692909283' },
                { icon: Mail, text: 'traventure@arkrea.id', href: 'mailto:traventure@arkrea.id' },
                { icon: InstagramIcon, text: '@arkreatraventure', href: INSTAGRAM_URL },
                { icon: Globe, text: 'www.arkrea.id', href: '#' },
                { icon: MapPin, text: 'Indonesia', href: '#' },
              ].map(c => (
                <a key={c.text} href={c.href} target="_blank" rel="noreferrer"
                  className="flex items-center gap-3 text-trv-ink/45 hover:text-trv-olive transition-colors group"
                >
                  <c.icon className="w-4 h-4 shrink-0" />
                  <span className="text-sm">{c.text}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Rounded-rectangle photo + form */}
          <div>
            <div
              className="overflow-hidden mb-8 w-full"
              style={{ aspectRatio: '16/9', borderRadius: '24px' }}
            >
              <img
                src={bromoJeepUdara}
                alt="Rombongan jeep di depan Gunung Batok, Bromo"
                className="w-full h-full object-cover"
              />
            </div>

            <form
              className="space-y-5"
              onSubmit={(e) => { e.preventDefault(); window.open('https://wa.me/6285692909283?text=Halo%20Arkrea%20Traventure%2C%20saya%20ingin%20bertanya.', '_blank'); }}
            >
              <div className="grid grid-cols-2 gap-5">
                <input type="text" placeholder="Nama" className="w-full bg-transparent border-b border-trv-ink/15 focus:border-trv-olive py-3 text-sm text-trv-ink placeholder-trv-ink/30 focus:outline-none transition-colors" />
                <input type="email" placeholder="Email" className="w-full bg-transparent border-b border-trv-ink/15 focus:border-trv-olive py-3 text-sm text-trv-ink placeholder-trv-ink/30 focus:outline-none transition-colors" />
              </div>
              <textarea rows={3} placeholder="Destinasi impian Anda..." className="w-full bg-transparent border-b border-trv-ink/15 focus:border-trv-olive py-3 text-sm text-trv-ink placeholder-trv-ink/30 focus:outline-none transition-colors resize-none" />
              <button
                type="submit"
                className="flex items-center gap-2 text-trv-olive text-xs font-semibold uppercase tracking-[0.25em] hover:gap-3 transition-all"
              >
                Kirim Pesan <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-trv-ink relative overflow-hidden py-14 px-8 md:px-14">
        <DarkTexture opacity={0.04} id="curvePattern-footer" />
        <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 mb-10">
          <div>
            <div className="text-white/60 text-xs uppercase tracking-[0.4em] mb-1">ARKREA</div>
            <div className="font-serif text-trv-sand text-lg font-bold tracking-[0.1em] mb-4">TRAVENTURE</div>
            <p className="text-white/60 text-xs leading-relaxed">Divisi Travel & Wisata<br />Arteri Kreasi Nusantara</p>
          </div>

          <div>
            <p className="text-white/60 text-xs uppercase tracking-[0.35em] mb-4">Navigasi</p>
            <ul className="space-y-2">
              {[
                { lbl: 'Beranda', id: 'hero' },
                { lbl: 'Destinasi', id: 'destinasi' },
                { lbl: 'Pengalaman', id: 'pengalaman' },
                { lbl: 'Villa & Rasa', id: 'villa-rasa' },
                { lbl: 'Tentang', id: 'tentang' },
                { lbl: 'Kontak', id: 'kontak' },
              ].map(item => (
                <li key={item.id}>
                  <button onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })} className="text-white/60 hover:text-trv-sand text-sm transition-colors">
                    {item.lbl}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-white/60 text-xs uppercase tracking-[0.35em] mb-4">Kontak</p>
            <div className="space-y-1.5 text-white/60 text-sm">
              <p>+62 856 9290 9283</p>
              <p>traventure@arkrea.id</p>
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-trv-sand transition-colors">
                <InstagramIcon className="w-3.5 h-3.5" />
                @arkreatraventure
              </a>
            </div>
          </div>

          <div>
            <p className="text-white/60 text-xs uppercase tracking-[0.35em] mb-4">Lainnya</p>
            <button onClick={onBack} className="flex items-center gap-1.5 text-white/60 hover:text-trv-sand text-sm transition-colors group">
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              Kembali ke Arkrea
            </button>
          </div>
        </div>

        <div className="relative z-10 border-t border-white/[0.06] pt-6 flex flex-col md:flex-row justify-between md:items-center gap-2">
          <p className="text-white/40 text-xs">© {new Date().getFullYear()} Arkrea Traventure — Arteri Kreasi Nusantara</p>
          <p className="text-white/30 text-xs">All rights reserved</p>
        </div>
      </footer>
    </div>
  );
}
