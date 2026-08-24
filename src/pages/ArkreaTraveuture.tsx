import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight, ChevronDown, Phone, Mail, Globe, MapPin, ChevronRight } from 'lucide-react';

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

const heroImage = 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1800&q=90&fit=crop';

const destinations = [
  {
    name: 'RAJA AMPAT',
    region: 'Papua Barat',
    image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&q=80&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=700&q=80&fit=crop',
    desc: 'Kedalaman laut Nusantara bersama instruktur bersertifikat',
  },
  {
    name: 'TREKKING &\nHIKING',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&q=80&fit=crop',
    desc: 'Jalur-jalur terbaik dengan panduan lokal berpengalaman',
  },
  {
    name: 'CULTURAL\nIMMERSION',
    image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=700&q=80&fit=crop',
    desc: 'Berinteraksi langsung dengan komunitas dan ritual adat',
  },
  {
    name: 'ECO\nPHOTOGRAPHY',
    image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=700&q=80&fit=crop',
    desc: 'Abadikan keajaiban alam bersama fotografer profesional',
  },
  {
    name: 'SUNRISE\nEXPEDITION',
    image: 'https://images.unsplash.com/photo-1570789210967-2cac24afeb00?w=700&q=80&fit=crop',
    desc: 'Golden hour terbaik dari titik-titik tersembunyi',
  },
];

// Horizontal carousel
function Carousel({ items, darkBg = true }: {
  items: typeof destinations;
  darkBg?: boolean;
}) {
  const [idx, setIdx] = useState(0);
  const visible = 3;
  const max = items.length - visible;

  const prev = () => setIdx(p => Math.max(0, p - 1));
  const next = () => setIdx(p => Math.min(max, p + 1));

  return (
    <div className={`${darkBg ? 'bg-[#252420]' : 'bg-white'} py-16 overflow-hidden`}>
      <div className="px-8 md:px-16 flex items-center justify-between mb-8">
        <span className={`text-[10px] uppercase tracking-[0.35em] font-medium ${darkBg ? 'text-white/40' : 'text-[#1C1A14]/40'}`}>
          Jelajahi Destinasi
        </span>
        <div className="flex gap-2">
          <button
            onClick={prev}
            disabled={idx === 0}
            className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all disabled:opacity-30 ${
              darkBg
                ? 'border-white/20 text-white hover:border-white'
                : 'border-[#1C1A14]/20 text-[#1C1A14] hover:border-[#6B7740]'
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
                : 'border-[#1C1A14]/20 text-[#1C1A14] hover:border-[#6B7740]'
            }`}
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="px-8 md:px-16">
        <motion.div
          className="flex gap-5"
          animate={{ x: `calc(-${idx * (100 / visible)}% - ${idx * 20 / visible}px)` }}
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
              <h3 className={`font-serif font-bold text-xl leading-tight mb-1 whitespace-pre-line ${darkBg ? 'text-white' : 'text-[#1C1A14]'}`}>
                {item.name}
              </h3>
              <p className={`text-xs mb-3 ${darkBg ? 'text-white/40' : 'text-[#1C1A14]/40'}`}>{item.region || item.desc}</p>
              <button className="flex items-center gap-1.5 text-[#6B7740] text-[11px] font-semibold uppercase tracking-[0.2em] group-hover:gap-2.5 transition-all">
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

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#1C1A14] font-sans overflow-x-hidden">

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
            className={`flex items-center gap-3 group transition-colors ${scrolled ? 'text-[#1C1A14]' : 'text-white'}`}
          >
            <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all group-hover:scale-110 ${scrolled ? 'border-[#1C1A14]/25' : 'border-white/40'}`}>
              <ArrowLeft className="w-3.5 h-3.5" />
            </div>
            <div className="hidden md:block text-left">
              <div className={`text-[9px] uppercase tracking-[0.4em] leading-none mb-0.5 ${scrolled ? 'text-[#1C1A14]/40' : 'text-white/50'}`}>
                ARKREA
              </div>
              <div className={`font-serif text-sm font-semibold tracking-[0.1em] leading-none ${scrolled ? 'text-[#6B7740]' : 'text-white'}`}>
                TRAVENTURE
              </div>
            </div>
          </button>

          {/* Center nav */}
          <nav className={`hidden lg:flex items-center gap-8 text-[11px] font-medium uppercase tracking-[0.15em] transition-colors ${scrolled ? 'text-[#1C1A14]/70' : 'text-white/80'}`}>
            {[
              { label: 'Destinasi', id: 'destinasi' },
              { label: 'Pengalaman', id: 'pengalaman' },
              { label: 'Tentang', id: 'tentang' },
              { label: 'Kontak', id: 'kontak' },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })}
                className="hover:text-[#6B7740] transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA pill button */}
          <a
            href="https://wa.me/6285692909283?text=Halo%20Arkrea%20Traventure%2C%20saya%20ingin%20bertanya%20mengenai%20wisata."
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 bg-[#6B7740] hover:bg-[#5a6535] text-white text-[11px] font-semibold uppercase tracking-[0.18em] rounded-full transition-all hover:scale-105 shadow-sm"
          >
            Hubungi Kami
          </a>
        </div>
      </motion.header>

      {/* ── Hero ── */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        <motion.img
          src={heroImage}
          alt="Arkrea Traventure"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ y: heroImgY }}
        />
        <div className="absolute inset-0 bg-[#1C1A14]/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/55" />

        {/* Hero text — bottom left, ALL-CAPS bold serif like 23hotel */}
        <div className="absolute bottom-20 left-8 md:left-14 z-10">
          <motion.h1
            className="font-serif font-bold text-white leading-[0.92] mb-4"
            style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)' }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            JELAJAHI<br />
            <span className="text-[#C4B47A]">NUSANTARA.</span>
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
          <p className="text-[#6B7740] text-[10px] uppercase tracking-[0.4em] mb-6">
            Divisi Travel & Wisata — Arteri Kreasi Nusantara
          </p>
          <h2 className="font-serif text-2xl md:text-4xl lg:text-[2.6rem] font-light text-[#1C1A14] leading-[1.35]">
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
                src="https://images.unsplash.com/photo-1528181304800-259b08848526?w=700&q=80&fit=crop"
                alt="Arkrea Traventure"
                className="w-full h-full object-cover"
              />
            </div>
            {/* floating badge */}
            <div className="absolute -bottom-5 right-0 bg-[#6B7740] text-white text-xs px-5 py-3 font-medium uppercase tracking-wider">
              Berdiri sejak 2017
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={aboutInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <h3 className="font-serif text-2xl md:text-3xl font-light text-[#1C1A14] mb-5 leading-snug">
              Arkrea Traventure menghadirkan pengalaman immersif di mana para traveler menemukan alam dan budaya Indonesia yang sesungguhnya.
            </h3>
            <p className="text-[#1C1A14]/50 text-sm leading-relaxed mb-4">
              Ketenangan adalah hal pertama yang Anda rasakan. Sunyi, istirahat, damai. Jauh dari kebisingan namun cukup dekat dengan getaran dan vitalitas alam Nusantara.
            </p>
            <p className="text-[#1C1A14]/40 text-sm leading-relaxed mb-10">
              Sebuah keseimbangan antara pemutusan dari rutinitas dan inspirasi yang membara — itulah yang selalu kami hadirkan di setiap perjalanan.
            </p>
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#1C1A14]/8">
              {[
                { val: '200+', lbl: 'Destinasi' },
                { val: '5.000+', lbl: 'Traveler' },
                { val: '8+', lbl: 'Tahun' },
              ].map(s => (
                <div key={s.lbl}>
                  <div className="font-serif text-3xl font-light text-[#6B7740]">{s.val}</div>
                  <div className="text-[#1C1A14]/35 text-[10px] uppercase tracking-widest mt-0.5">{s.lbl}</div>
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
            <h3 className="font-serif text-2xl md:text-3xl font-light text-[#1C1A14] mb-5 leading-snug">
              Keajaiban alam hadir dalam setiap detail perjalanan yang kami rancang.
            </h3>
            <p className="text-[#1C1A14]/50 text-sm leading-relaxed mb-4">
              Cahaya, iklim, warna, dan tekstur alam Nusantara membangkitkan sensasi berada di tempat yang tak tergantikan di dunia manapun.
            </p>
            <p className="text-[#1C1A14]/35 text-sm leading-relaxed mb-10">
              Setiap itinerary kami dirancang bukan sekadar rute perjalanan, melainkan sebuah karya yang menyentuh indra dan jiwa setiap traveler.
            </p>
            <button
              onClick={() => document.getElementById('destinasi')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2 text-[#6B7740] text-[11px] font-semibold uppercase tracking-[0.2em] hover:gap-3 transition-all"
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
      <section id="destinasi" className="bg-[#252420] relative overflow-hidden">
        <DarkTexture opacity={0.05} id="curvePattern-destinasi" />
        <div className="relative z-10 pt-14 pb-4 px-8 md:px-14">
          <p className="text-white/35 text-[10px] uppercase tracking-[0.35em] mb-2 font-medium">JELAJAHI</p>
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
                src="https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=700&q=80&fit=crop"
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
            <p className="text-[#6B7740] text-[10px] uppercase tracking-[0.4em] mb-5">Filosofi Kami</p>
            <h3 className="font-serif text-2xl md:text-3xl font-light text-[#1C1A14] mb-8 leading-snug">
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
                className="flex gap-4 py-4 border-b border-[#1C1A14]/8 last:border-0"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#6B7740] mt-2 shrink-0" />
                <div>
                  <div className="text-[#1C1A14] text-sm font-semibold mb-1">{v.lbl}</div>
                  <p className="text-[#1C1A14]/45 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Experience Carousel — white bg ── */}
      <section id="pengalaman" className="bg-[#F7F5F0]">
        <div className="pt-14 pb-4 px-8 md:px-14">
          <p className="text-[#1C1A14]/35 text-[10px] uppercase tracking-[0.35em] mb-2 font-medium">LAYANAN</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1C1A14]">PENGALAMAN KAMI</h2>
        </div>

        {/* Custom light carousel */}
        <div className="bg-[#F7F5F0] py-8 pb-16 overflow-hidden px-8 md:px-14">
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
                <h3 className="font-serif font-bold text-base leading-tight mb-1.5 whitespace-pre-line text-[#1C1A14]">
                  {exp.name}
                </h3>
                <p className="text-[#1C1A14]/40 text-xs leading-relaxed mb-3">{exp.desc}</p>
                <button className="flex items-center gap-1.5 text-[#6B7740] text-[10px] font-semibold uppercase tracking-[0.2em] group-hover:gap-2.5 transition-all">
                  SEE MORE <ChevronRight className="w-3 h-3" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
        <div className="absolute inset-0 bg-[#1C1A14]/35" />
        <div className="absolute inset-0 flex items-end justify-start px-8 md:px-14 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <p className="text-white/50 text-[10px] uppercase tracking-[0.4em] mb-3">Indonesia</p>
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
            <p className="text-[#6B7740] text-[10px] uppercase tracking-[0.4em] mb-5">Hubungi Kami</p>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-[#1C1A14] mb-6 leading-snug">
              Mulai Rencanakan<br />Petualangan Anda.
            </h2>
            <p className="text-[#1C1A14]/45 text-sm leading-relaxed mb-10">
              Tim kami siap berdiskusi dan merancang perjalanan impian Anda ke seluruh penjuru Nusantara.
            </p>
            <div className="space-y-5">
              {[
                { icon: Phone, text: '+62 856 9290 9283', href: 'https://wa.me/6285692909283' },
                { icon: Mail, text: 'traventure@arkrea.id', href: 'mailto:traventure@arkrea.id' },
                { icon: Globe, text: 'www.arkrea.id', href: '#' },
                { icon: MapPin, text: 'Indonesia', href: '#' },
              ].map(c => (
                <a key={c.text} href={c.href} target="_blank" rel="noreferrer"
                  className="flex items-center gap-3 text-[#1C1A14]/45 hover:text-[#6B7740] transition-colors group"
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
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80&fit=crop"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            <form
              className="space-y-5"
              onSubmit={(e) => { e.preventDefault(); window.open('https://wa.me/6285692909283?text=Halo%20Arkrea%20Traventure%2C%20saya%20ingin%20bertanya.', '_blank'); }}
            >
              <div className="grid grid-cols-2 gap-5">
                <input type="text" placeholder="Nama" className="w-full bg-transparent border-b border-[#1C1A14]/15 focus:border-[#6B7740] py-3 text-sm text-[#1C1A14] placeholder-[#1C1A14]/30 focus:outline-none transition-colors" />
                <input type="email" placeholder="Email" className="w-full bg-transparent border-b border-[#1C1A14]/15 focus:border-[#6B7740] py-3 text-sm text-[#1C1A14] placeholder-[#1C1A14]/30 focus:outline-none transition-colors" />
              </div>
              <textarea rows={3} placeholder="Destinasi impian Anda..." className="w-full bg-transparent border-b border-[#1C1A14]/15 focus:border-[#6B7740] py-3 text-sm text-[#1C1A14] placeholder-[#1C1A14]/30 focus:outline-none transition-colors resize-none" />
              <button
                type="submit"
                className="flex items-center gap-2 text-[#6B7740] text-[11px] font-semibold uppercase tracking-[0.25em] hover:gap-3 transition-all"
              >
                Kirim Pesan <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[#1C1A14] relative overflow-hidden py-14 px-8 md:px-14">
        <DarkTexture opacity={0.04} id="curvePattern-footer" />
        <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 mb-10">
          <div>
            <div className="text-white/25 text-[9px] uppercase tracking-[0.4em] mb-1">ARKREA</div>
            <div className="font-serif text-[#C4B47A] text-lg font-bold tracking-[0.1em] mb-4">TRAVENTURE</div>
            <p className="text-white/25 text-xs leading-relaxed">Divisi Travel & Wisata<br />Arteri Kreasi Nusantara</p>
          </div>

          <div>
            <p className="text-white/25 text-[9px] uppercase tracking-[0.35em] mb-4">Navigasi</p>
            <ul className="space-y-2">
              {[
                { lbl: 'Beranda', id: 'hero' },
                { lbl: 'Destinasi', id: 'destinasi' },
                { lbl: 'Pengalaman', id: 'pengalaman' },
                { lbl: 'Tentang', id: 'tentang' },
                { lbl: 'Kontak', id: 'kontak' },
              ].map(item => (
                <li key={item.id}>
                  <button onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })} className="text-white/40 hover:text-[#C4B47A] text-sm transition-colors">
                    {item.lbl}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-white/25 text-[9px] uppercase tracking-[0.35em] mb-4">Kontak</p>
            <div className="space-y-1.5 text-white/40 text-sm">
              <p>+62 856 9290 9283</p>
              <p>traventure@arkrea.id</p>
            </div>
          </div>

          <div>
            <p className="text-white/25 text-[9px] uppercase tracking-[0.35em] mb-4">Lainnya</p>
            <button onClick={onBack} className="flex items-center gap-1.5 text-white/40 hover:text-[#C4B47A] text-sm transition-colors group">
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              Kembali ke Arkrea
            </button>
          </div>
        </div>

        <div className="relative z-10 border-t border-white/[0.06] pt-6 flex justify-between items-center">
          <p className="text-white/15 text-xs">© 2024 Arkrea Traventure — Arteri Kreasi Nusantara</p>
          <p className="text-white/10 text-xs">All rights reserved</p>
        </div>
      </footer>
    </div>
  );
}
