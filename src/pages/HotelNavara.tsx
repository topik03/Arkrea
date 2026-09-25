import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight, Phone, Mail, MapPin, CheckCircle2 } from 'lucide-react';
import navaraLogo from '../assets/navara-logo.png';
import nirwanaImg from '../assets/nirwana-hotel.jpg';

interface HotelNavaraProps {
  onBack: () => void;
}

// ─── DATA ────────────────────────────────────────────────────────────────────

const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1800&q=90&fit=crop',
    tag: 'Hospitality Management',
    line1: 'Membangun',
    line2: 'Pengalaman.',
  },
  {
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1800&q=90&fit=crop',
    tag: 'Hotel & Resort Management',
    line1: 'Menciptakan',
    line2: 'Destinasi.',
  },
  {
    image: 'https://images.unsplash.com/photo-1551882547-ff40c4a49f7d?w=1800&q=90&fit=crop',
    tag: 'Service Excellence',
    line1: 'Meninggalkan',
    line2: 'Kesan.',
  },
];

const mainServices = [
  {
    no: '01',
    title: 'Pengelolaan Hotel & Resort',
    desc: 'Manajemen operasional penuh untuk hotel, resort, dan villa — dari standar pelayanan hingga efisiensi bisnis.',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=900&q=80&fit=crop',
  },
  {
    no: '02',
    title: 'Konsultasi Bisnis Hospitality',
    desc: 'Pendampingan strategis untuk pengembangan bisnis hospitality, positioning brand, dan peningkatan revenue.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80&fit=crop',
  },
  {
    no: '03',
    title: 'Manajemen F&B',
    desc: 'Pengelolaan bisnis food & beverage yang mengintegrasikan konsep kuliner dengan standar hospitality premium.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80&fit=crop',
  },
  {
    no: '04',
    title: 'Training & Pengembangan SDM',
    desc: 'Program pelatihan intensif untuk membentuk sumber daya manusia hospitality yang kompeten dan berkarakter.',
    image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=900&q=80&fit=crop',
  },
];

const detailServices = [
  { label: 'Manajemen dan Operasional Hotel, Resort, dan Villa' },
  { label: 'Sales, Marketing & Revenue Management' },
  { label: 'Pengembangan Brand dan Positioning Hospitality' },
  { label: 'Standarisasi Pelayanan dan Service Excellence' },
  { label: 'Rekrutmen, Pelatihan, dan Pengembangan SDM Hospitality' },
  { label: 'Pengelolaan MICE, Gathering, dan Event Hospitality' },
  { label: 'Konsultasi Pengembangan Properti dan Destinasi Wisata' },
  { label: 'Audit Operasional dan Peningkatan Kinerja Bisnis Hospitality' },
];

const clients = [
  {
    name: 'Nirwana Hotel',
    tagline: 'Hotel Partner',
    desc: 'Nirwana Hotel adalah properti berkarakter yang kami kelola dengan pendekatan manajemen hospitality terpadu — mengedepankan keramahan autentik dan standar pelayanan yang konsisten.',
    image: nirwanaImg,
    detail: 'Managed by Navara',
  },
  {
    name: 'De Wahyu Hotel',
    tagline: 'Hotel Partner',
    desc: 'De Wahyu Hotel menghadirkan pengalaman menginap yang hangat dan personal. Bersama Navara, hotel ini terus bertumbuh dalam kualitas layanan, operasional, dan pengalaman tamu.',
    image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1000&q=80&fit=crop',
    detail: 'Managed by Navara',
  },
];

// ─── SUB-COMPONENTS ──────────────────────────────────────────────────────────

function RevealText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const words = text.split(' ');
  return (
    <div ref={ref} className={`overflow-hidden ${className || ''}`}>
      <div className="flex flex-wrap gap-x-3">
        {words.map((word, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={{ y: '100%' }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.8, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

function ServiceCard({ svc, index }: { svc: typeof mainServices[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden cursor-pointer group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ aspectRatio: '4/3' }}
    >
      <motion.img
        src={svc.image}
        alt={svc.title}
        className="absolute inset-0 w-full h-full object-cover"
        animate={{ scale: hovered ? 1.07 : 1 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
      <motion.div
        className="absolute inset-0 bg-black/25"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />

      <div className="absolute top-6 left-6">
        <span className="font-serif text-nav-gold/50 text-4xl font-extralight">{svc.no}</span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <h3 className="text-white font-serif text-xl md:text-2xl font-light mb-2">{svc.title}</h3>
        <motion.p
          className="text-white/60 text-sm leading-relaxed"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: hovered ? 'auto' : 0, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.35 }}
        >
          {svc.desc}
        </motion.p>
      </div>
    </motion.div>
  );
}

function ClientCard({ client, index }: { client: typeof clients[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className={`grid lg:grid-cols-2 items-center gap-0 ${!isEven ? 'lg:flex-row-reverse' : ''}`}
    >
      {/* Image side */}
      <div className={`relative overflow-hidden group ${!isEven ? 'lg:order-2' : ''}`}>
        <div className="relative aspect-[4/3] overflow-hidden">
          <motion.img
            src={client.image}
            alt={client.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute bottom-6 left-6">
            <span className="text-nav-gold text-xs uppercase tracking-[0.35em] border border-nav-gold/40 px-3 py-1.5">
              {client.detail}
            </span>
          </div>
        </div>
      </div>

      {/* Text side */}
      <div className={`px-10 md:px-16 py-14 ${!isEven ? 'lg:order-1' : ''}`}>
        <div className="flex items-center gap-4 mb-6">
          <div className="h-[1px] w-10 bg-nav-gold" />
          <span className="text-nav-gold text-xs uppercase tracking-[0.4em]">{client.tagline}</span>
        </div>
        <h3 className="font-serif text-3xl md:text-4xl font-extralight text-nav-ivory mb-6 leading-tight">
          {client.name}
        </h3>
        <p className="text-nav-ivory/55 leading-relaxed text-sm">{client.desc}</p>
      </div>
    </motion.div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export default function HotelNavara({ onBack }: HotelNavaraProps) {
  const [heroIdx, setHeroIdx] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const navBg = useTransform(scrollY, [0, 100], ['rgba(0,0,0,0)', 'rgba(0,0,0,0.92)']);

  useEffect(() => {
    const t = setInterval(() => setHeroIdx(p => (p + 1) % heroSlides.length), 6000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    if (menuOpen) window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  return (
    <div className="min-h-screen bg-nav-night text-nav-ivory font-sans overflow-x-hidden">

      {/* ── Full-page Menu Overlay ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[200] bg-nav-deep flex flex-col"
          >
            <div className="absolute inset-0 opacity-15">
              <img src={heroSlides[heroIdx].image} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="relative z-10 flex justify-between items-center px-8 md:px-16 py-6">
              <img src={navaraLogo} alt="Navara" className="h-10 object-contain" style={{ filter: 'brightness(0) invert(1)' }} />
              <button
                onClick={() => setMenuOpen(false)}
                className="text-nav-ivory hover:text-nav-gold transition-colors text-sm uppercase tracking-widest"
              >
                Tutup ✕
              </button>
            </div>
            <div className="relative z-10 flex flex-col items-center justify-center flex-1 gap-6">
              {[
                { label: 'Beranda', id: 'hero' },
                { label: 'Tentang', id: 'tentang' },
                { label: 'Layanan', id: 'layanan' },
                { label: 'Klien', id: 'klien' },
                { label: 'Kontak', id: 'kontak' },
              ].map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.6 }}
                  onClick={() => {
                    setMenuOpen(false);
                    setTimeout(() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' }), 300);
                  }}
                  className="font-serif text-5xl md:text-7xl font-extralight text-nav-ivory hover:text-nav-gold transition-colors duration-300"
                >
                  {item.label}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                onClick={onBack}
                className="mt-8 flex items-center gap-2 text-nav-ivory/50 hover:text-nav-gold text-sm uppercase tracking-widest transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Kembali ke Arkrea
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Fixed Navbar ── */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 px-8 md:px-16 py-5 flex justify-between items-center"
        style={{ backgroundColor: navBg }}
      >
        <button onClick={onBack} aria-label="Kembali ke Arkrea" className="flex items-center gap-2 text-nav-ivory/70 hover:text-nav-gold transition-colors group">
          <div className="w-7 h-7 border border-current rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <ArrowLeft className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs uppercase tracking-widest hidden md:block">Arkrea</span>
        </button>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="absolute left-1/2 -translate-x-1/2 text-center"
        >
          <img src={navaraLogo} alt="Navara Hospitality Management" className="h-12 object-contain" style={{ filter: 'brightness(0) invert(1)' }} />
        </motion.div>

        <button
          onClick={() => setMenuOpen(true)}
          className="flex flex-col gap-1.5 group cursor-pointer"
          aria-label="Buka menu"
          aria-expanded={menuOpen}
        >
          <span className="block w-6 h-[1.5px] bg-nav-ivory group-hover:bg-nav-gold transition-colors" />
          <span className="block w-4 h-[1.5px] bg-nav-ivory group-hover:bg-nav-gold transition-colors" />
          <span className="block w-6 h-[1.5px] bg-nav-ivory group-hover:bg-nav-gold transition-colors" />
        </button>
      </motion.header>

      {/* ── Hero Slider ── */}
      <section id="hero" className="relative h-dvh overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={heroIdx}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          >
            <img src={heroSlides[heroIdx].image} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50" />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 md:px-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={heroIdx}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center w-full max-w-4xl mx-auto"
            >
              <motion.div
                className="inline-flex items-center gap-3 mb-8"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                <div className="h-[1px] w-10 bg-nav-gold/50" />
                <span className="text-nav-gold/80 text-xs uppercase tracking-[0.45em] font-light">
                  {heroSlides[heroIdx].tag}
                </span>
                <div className="h-[1px] w-10 bg-nav-gold/50" />
              </motion.div>

              <h2
                className="font-serif font-extralight text-white text-center w-full leading-[1.1]"
                style={{ fontSize: 'clamp(2.6rem, 6vw, 5.5rem)' }}
              >
                {heroSlides[heroIdx].line1}{' '}
                <span className="text-nav-gold italic">{heroSlides[heroIdx].line2}</span>
              </h2>

              <motion.p
                className="text-white/60 text-xs uppercase tracking-[0.35em] mt-8 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Arteri Kreasi Nusantara — Divisi Hospitality
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide controls */}
        <div className="absolute bottom-16 right-8 md:right-16 z-10 flex items-center gap-5">
          <button
            onClick={() => setHeroIdx(p => (p - 1 + heroSlides.length) % heroSlides.length)}
            className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center hover:border-nav-gold hover:text-nav-gold text-white transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="text-white/50 text-sm tabular-nums">
            {String(heroIdx + 1).padStart(2, '0')} / {String(heroSlides.length).padStart(2, '0')}
          </span>
          <button
            onClick={() => setHeroIdx(p => (p + 1) % heroSlides.length)}
            className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center hover:border-nav-gold hover:text-nav-gold text-white transition-all"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <motion.div
            className="w-[1px] h-12 bg-gradient-to-b from-white/0 to-white/40"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.2, delay: 1.5 }}
          />
        </div>
      </section>

      {/* ── About / Tentang Navara ── */}
      <section id="tentang" className="py-32 px-8 md:px-16 bg-nav-night">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[1px] w-10 bg-nav-gold" />
              <span className="text-nav-gold text-xs uppercase tracking-[0.4em]">Tentang Navara</span>
            </div>
            <RevealText
              text="Menghadirkan layanan pengelolaan hospitality yang mengedepankan kualitas, keramahan, serta nilai pengalaman."
              className="font-serif text-3xl md:text-4xl font-extralight leading-tight text-nav-ivory mb-10"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-nav-ivory/55 leading-relaxed text-sm mb-6"
            >
              Sebagai bagian dari ARKREA, Navara Hospitality Management menghadirkan layanan pengelolaan dan pengembangan perhotelan yang mengedepankan kualitas, keramahan, serta nilai pengalaman.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="text-nav-ivory/60 leading-relaxed text-sm mb-10"
            >
              Kami menciptakan destinasi yang tidak hanya nyaman untuk disinggahi, tetapi juga meninggalkan kesan dan cerita bagi setiap tamu yang hadir.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex gap-12"
            >
              {[
                { val: '2+', lbl: 'Hotel Klien' },
                { val: '8+', lbl: 'Layanan' },
                { val: '100%', lbl: 'Komitmen' },
              ].map(s => (
                <div key={s.lbl}>
                  <div className="font-serif text-4xl font-extralight text-nav-gold">{s.val}</div>
                  <div className="text-nav-ivory/60 text-xs uppercase tracking-widest mt-1">{s.lbl}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80&fit=crop"
              alt="Navara Hospitality"
              className="w-full aspect-[4/5] object-cover"
            />
            <div className="absolute -bottom-6 -left-6 w-2/3 aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80&fit=crop"
                alt=""
                className="w-full h-full object-cover border-4 border-nav-night"
              />
            </div>
            {/* Badge */}
            <div className="absolute -top-6 -right-6 w-28 h-28 bg-nav-gold flex flex-col items-center justify-center text-center">
              <div className="font-serif text-nav-night text-xs uppercase tracking-widest leading-tight">Bagian dari</div>
              <div className="font-serif text-nav-night text-lg font-light tracking-[0.2em] uppercase mt-1">Arkrea</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Main Services ── */}
      <section id="layanan" className="bg-nav-deep pt-24 pb-0">
        <div className="overflow-hidden px-4 md:px-8 mb-12">
          <motion.h2
            className="font-serif font-extralight text-[14vw] leading-none select-none text-center"
            style={{ color: 'transparent', WebkitTextStroke: '1px rgba(232,224,213,0.12)' }}
            initial={{ y: 80, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            Services
          </motion.h2>
        </div>

        <div className="px-8 md:px-16 mb-6">
          <div className="flex items-center gap-4">
            <div className="h-[1px] w-10 bg-nav-gold" />
            <span className="text-nav-gold text-xs uppercase tracking-[0.4em]">Layanan Utama</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5 bg-nav-black">
          {mainServices.map((svc, i) => (
            <ServiceCard key={svc.no} svc={svc} index={i} />
          ))}
        </div>
      </section>

      {/* ── Detailed Services ── */}
      <section className="py-28 px-8 md:px-16 bg-nav-night border-t border-nav-ivory/[0.05]">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="h-[1px] w-10 bg-nav-gold" />
                <span className="text-nav-gold text-xs uppercase tracking-[0.4em]">Hospitality Management</span>
              </div>
              <RevealText
                text="Solusi manajemen hospitality yang menyeluruh — dari operasional hingga pengembangan bisnis."
                className="font-serif text-3xl md:text-4xl font-extralight leading-tight text-nav-ivory"
              />
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-nav-ivory/45 text-sm leading-relaxed mt-8"
              >
                Navara hadir sebagai mitra strategis dalam setiap aspek pengelolaan bisnis hospitality, memastikan standar kualitas dan keberlanjutan operasional yang optimal.
              </motion.p>
            </div>

            <div className="space-y-0">
              {detailServices.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: i * 0.07 }}
                  className="flex items-start gap-5 py-5 border-b border-nav-ivory/[0.07] group hover:border-nav-gold/30 transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4 text-nav-gold shrink-0 mt-0.5" />
                  <span className="text-nav-ivory/70 text-sm group-hover:text-nav-ivory transition-colors leading-relaxed">
                    {item.label}
                  </span>
                  <span className="ml-auto text-nav-gold/30 text-xs font-serif shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Clients / Hotel Partners ── */}
      <section id="klien" className="bg-nav-deep">
        <div className="overflow-hidden px-4 md:px-8 pt-20 mb-8">
          <motion.h2
            className="font-serif font-extralight text-[14vw] leading-none select-none text-center"
            style={{ color: 'transparent', WebkitTextStroke: '1px rgba(232,224,213,0.10)' }}
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            Clients
          </motion.h2>
        </div>

        <div className="px-8 md:px-16 mb-12">
          <div className="flex items-center gap-4">
            <div className="h-[1px] w-10 bg-nav-gold" />
            <span className="text-nav-gold text-xs uppercase tracking-[0.4em]">Hotel Partners</span>
          </div>
        </div>

        <div className="divide-y divide-nav-ivory/[0.06]">
          {clients.map((client, i) => (
            <ClientCard key={client.name} client={client} index={i} />
          ))}
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="kontak" className="bg-nav-night pt-20 pb-0">
        <div className="overflow-hidden px-4 mb-16">
          <motion.h2
            className="font-serif font-extralight text-[14vw] leading-none select-none text-center"
            style={{ color: 'transparent', WebkitTextStroke: '1px rgba(232,224,213,0.10)' }}
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            Contact
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-2">
          {/* Image */}
          <div className="relative overflow-hidden h-64 lg:h-auto">
            <img
              src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=900&q=80&fit=crop"
              alt="Navara Office"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center px-8">
                <div className="font-serif text-white/60 text-sm italic mb-2">
                  "Membangun Pengalaman, Menciptakan Destinasi"
                </div>
                <div className="text-nav-gold/70 text-xs uppercase tracking-[0.3em]">— Navara Hospitality</div>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="px-10 md:px-16 py-20">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[1px] w-10 bg-nav-gold" />
              <span className="text-nav-gold text-xs uppercase tracking-[0.4em]">Hubungi Kami</span>
            </div>
            <h3 className="font-serif text-3xl font-extralight text-nav-ivory mb-8 leading-tight">
              Konsultasikan<br />Kebutuhan Anda
            </h3>

            <div className="space-y-4 mb-8">
              {[
                { icon: Phone, text: '+62 856 9290 9283', href: 'https://wa.me/6285692909283' },
                { icon: Mail, text: 'info@navarahospitality.id', href: 'mailto:info@navarahospitality.id' },
                { icon: MapPin, text: 'Indonesia', href: '#' },
              ].map(c => (
                <a key={c.text} href={c.href} target="_blank" rel="noreferrer"
                  className="flex items-center gap-4 text-nav-ivory/55 hover:text-nav-gold transition-colors group"
                >
                  <c.icon className="w-4 h-4 shrink-0 group-hover:text-nav-gold transition-colors" />
                  <span className="text-sm">{c.text}</span>
                </a>
              ))}
            </div>

            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                window.open('https://wa.me/6285692909283?text=Halo%20Navara%20Hospitality%2C%20saya%20ingin%20berkonsultasi.', '_blank');
              }}
            >
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Nama"
                  className="w-full bg-transparent border-b border-nav-ivory/15 focus:border-nav-gold py-3 text-sm text-nav-ivory placeholder-nav-ivory/25 focus:outline-none transition-colors"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full bg-transparent border-b border-nav-ivory/15 focus:border-nav-gold py-3 text-sm text-nav-ivory placeholder-nav-ivory/25 focus:outline-none transition-colors"
                />
              </div>
              <input
                type="text"
                placeholder="Jenis Layanan yang Dibutuhkan"
                className="w-full bg-transparent border-b border-nav-ivory/15 focus:border-nav-gold py-3 text-sm text-nav-ivory placeholder-nav-ivory/25 focus:outline-none transition-colors"
              />
              <textarea
                rows={3}
                placeholder="Ceritakan kebutuhan Anda..."
                className="w-full bg-transparent border-b border-nav-ivory/15 focus:border-nav-gold py-3 text-sm text-nav-ivory placeholder-nav-ivory/25 focus:outline-none transition-colors resize-none"
              />
              <button type="submit" className="flex items-center gap-3 group mt-4">
                <span className="text-nav-gold text-sm uppercase tracking-[0.25em] border-b border-nav-gold/40 group-hover:border-nav-gold transition-colors pb-0.5">
                  Kirim Pesan
                </span>
                <ArrowRight className="w-4 h-4 text-nav-gold group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-nav-black border-t border-nav-ivory/[0.06] py-14 px-8 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
            {/* Brand */}
            <div>
              <img
                src={navaraLogo}
                alt="Navara Hospitality Management"
                className="h-10 object-contain mb-3"
                style={{ filter: 'brightness(0) invert(1)', opacity: 0.7 }}
              />
              <p className="text-nav-ivory/60 text-xs leading-relaxed">Hospitality Management<br />Arteri Kreasi Nusantara</p>
            </div>

            {/* Sitemap */}
            <div>
              <p className="text-nav-ivory/60 text-xs uppercase tracking-[0.3em] mb-4">Halaman</p>
              <ul className="space-y-2">
                {[
                  { lbl: 'Beranda', id: 'hero' },
                  { lbl: 'Tentang', id: 'tentang' },
                  { lbl: 'Layanan', id: 'layanan' },
                  { lbl: 'Klien', id: 'klien' },
                  { lbl: 'Kontak', id: 'kontak' },
                ].map(item => (
                  <li key={item.id}>
                    <button
                      onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })}
                      className="text-nav-ivory/50 hover:text-nav-gold text-sm transition-colors"
                    >
                      {item.lbl}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <p className="text-nav-ivory/60 text-xs uppercase tracking-[0.3em] mb-4">Layanan</p>
              <ul className="space-y-2 text-nav-ivory/50 text-xs">
                <li>Hotel & Resort Management</li>
                <li>Konsultasi Bisnis</li>
                <li>F&B Management</li>
                <li>Training SDM</li>
              </ul>
            </div>

            {/* Back + Contact */}
            <div>
              <p className="text-nav-ivory/60 text-xs uppercase tracking-[0.3em] mb-4">Navigasi</p>
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-nav-ivory/50 hover:text-nav-gold transition-colors text-sm group mb-4"
              >
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                Kembali ke Arkrea
              </button>
              <p className="text-nav-ivory/60 text-xs">+62 856 9290 9283</p>
            </div>
          </div>

          <div className="border-t border-nav-ivory/[0.05] pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-nav-ivory/60 text-xs">© {new Date().getFullYear()} Navara Hospitality Management — Arteri Kreasi Nusantara</p>
            <p className="text-nav-ivory/15 text-xs">All rights reserved</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
