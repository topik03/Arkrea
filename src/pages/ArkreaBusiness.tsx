import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Menu, Phone, Mail, MapPin } from 'lucide-react';
import MobileMenu, { scrollAfterClose } from '../components/MobileMenu';
import fotoHero from '../assets/foto/dewahyu-training-2.webp';
import fotoTentang from '../assets/foto/nirwana-training.webp';
import fotoSesi from '../assets/foto/dewahyu-sesi-interaktif.webp';
import logoAldo from '../assets/klien/aldo-frozen-food.png';

interface ArkreaBusinessProps {
  onBack: () => void;
}

// ─── DATA ────────────────────────────────────────────────────────────────────

const WA_NUMBER = '6285692909283';
const waLink = (text: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

const navItems = [
  { label: 'Tentang', id: 'tentang' },
  { label: 'Paket', id: 'paket' },
  { label: 'Proses', id: 'proses' },
  { label: 'Kontak', id: 'kontak' },
];

const keywords = ['Business Planning', 'Coaching', 'Analisa Kelayakan', 'Media Sosial & Marketing', 'HRD', 'Sistem Keuangan', 'Operasional'];

// The two service packages, taken from the Arkrea service lines on the home page
const packages = [
  {
    no: '01',
    name: 'Konsultan Bisnis & Manajemen',
    tagline: 'Anda yang menjalankan, kami yang mengarahkan.',
    desc: 'Pendampingan strategis untuk membangun fondasi bisnis yang kokoh, mulai dari perencanaan hingga tim yang solid.',
    features: ['Business Planning', 'Coaching untuk pemilik & tim', 'Analisa kelayakan usaha', 'Strategi media sosial & marketing', 'Penataan HRD'],
  },
  {
    no: '02',
    name: 'Operator Bisnis (Arkrea Biz)',
    tagline: 'Anda tentukan tujuannya, kami yang mengemudikan.',
    desc: 'Kami terjun langsung mengelola bisnis Anda sehari-hari, sehingga Anda bisa fokus pada arah dan pertumbuhan.',
    features: ['Pengelolaan manajerial', 'Operasional harian', 'Sistem keuangan', 'HRD & rekrutmen', 'Eksekusi marketing'],
    featured: true,
  },
];

const steps = [
  { no: '01', title: 'Penemuan & Audit', desc: 'Audit menyeluruh terhadap struktur bisnis, keuangan, dan hambatan operasional Anda.' },
  { no: '02', title: 'Peta Jalan Strategi', desc: 'Rencana strategis yang bisa langsung dijalankan, dengan KPI jelas dan jadwal yang realistis.' },
  { no: '03', title: 'Eksekusi Langsung', desc: 'Kami bergabung dengan tim internal Anda untuk menjalankan strategi dan merapikan alur kerja.' },
  { no: '04', title: 'Pertumbuhan', desc: 'Hasil ditinjau secara terukur, sistem disempurnakan, dan profitabilitas dijaga untuk jangka panjang.' },
];

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export default function ArkreaBusiness({ onBack }: ArkreaBusinessProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-biz-paper text-biz-ink font-sans overflow-x-hidden">

      {/* ── Navbar ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled ? 'bg-biz-paper/95 backdrop-blur-md border-b border-biz-mist' : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-5 md:px-12 py-4">
          <button onClick={onBack} aria-label="Kembali ke Arkrea" className="flex items-center gap-3 group">
            <span className={`w-9 h-9 border flex items-center justify-center transition-colors ${scrolled ? 'border-biz-ink/25 text-biz-ink' : 'border-white/40 text-white'}`}>
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            </span>
            <span className={`font-biz uppercase leading-none text-left ${scrolled ? 'text-biz-ink' : 'text-white'}`}>
              <span className="block text-xs tracking-[0.35em] opacity-70">Arkrea</span>
              <span className="block text-lg font-semibold tracking-[0.12em]">Business</span>
            </span>
          </button>

          <nav className={`hidden lg:flex items-center gap-9 font-biz uppercase text-sm tracking-[0.15em] ${scrolled ? 'text-biz-slate' : 'text-white/80'}`}>
            {navItems.map(item => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className="uppercase hover:text-biz-accent transition-colors">
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={waLink('Halo Arkrea Business, saya ingin berkonsultasi mengenai bisnis saya.')}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-biz-accent hover:bg-biz-ink text-white font-biz uppercase text-sm tracking-[0.15em] transition-colors"
            >
              Konsultasi <ArrowUpRight className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Buka menu"
              aria-expanded={menuOpen}
              className={`lg:hidden w-10 h-10 border flex items-center justify-center transition-colors ${scrolled ? 'border-biz-ink/25 text-biz-ink' : 'border-white/40 text-white'}`}
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={closeMenu}
        title="Arkrea Business"
        hideFrom="lg"
        panelClassName="bg-biz-paper text-biz-ink border-biz-mist"
        footer={
          <a
            href={waLink('Halo Arkrea Business, saya ingin berkonsultasi mengenai bisnis saya.')}
            target="_blank"
            rel="noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3 bg-biz-accent text-white font-biz uppercase tracking-[0.15em]"
          >
            Konsultasi <ArrowUpRight className="w-4 h-4" />
          </a>
        }
      >
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => scrollAfterClose(closeMenu, item.id)}
            className="w-full text-left px-3 py-3 font-biz uppercase text-xl tracking-[0.1em] hover:bg-biz-mist transition-colors"
          >
            {item.label}
          </button>
        ))}
        <button
          onClick={() => { closeMenu(); onBack(); }}
          className="w-full flex items-center gap-2 text-left px-3 py-3 mt-4 text-sm text-biz-slate hover:bg-biz-mist transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Arkrea
        </button>
      </MobileMenu>

      {/* ── Hero ── */}
      <section id="hero" className="relative min-h-dvh bg-biz-steel overflow-hidden flex items-end">
        <img src={fotoHero} alt="" className="absolute inset-0 w-full h-full object-cover opacity-35 grayscale" />
        <div className="absolute inset-0 bg-biz-steel/55" />
        {/* Diagonal accent band — the "dynamic" counterpart to the formal greys */}
        <motion.div
          className="absolute -right-24 top-24 w-[55vw] h-28 bg-biz-accent/90 -rotate-12 origin-right hidden md:block"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        />

        <div className="relative z-10 w-full px-5 md:px-12 pb-16 md:pb-24 pt-32">
          <motion.p
            className="font-biz uppercase text-biz-accent tracking-[0.4em] text-sm mb-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Divisi Bisnis Arteri Kreasi Nusantara
          </motion.p>
          <motion.h1
            className="font-biz uppercase font-bold text-white leading-[0.92] tracking-tight"
            style={{ fontSize: 'clamp(3.2rem, 11vw, 9.5rem)' }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            Bangun Bisnis<br />
            <span className="text-biz-mist/60">yang</span> Bertumbuh.
          </motion.h1>
          <motion.div
            className="mt-10 flex flex-col md:flex-row md:items-end justify-between gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="text-white/75 max-w-md leading-relaxed">
              Konsultasi dan operator bisnis untuk UMKM hingga perusahaan. Strategi yang jelas, eksekusi yang nyata.
            </p>
            <button
              onClick={() => scrollTo('paket')}
              className="self-start md:self-auto inline-flex items-center gap-3 px-7 py-4 bg-white text-biz-ink font-biz uppercase tracking-[0.15em] hover:bg-biz-accent hover:text-white transition-colors"
            >
              Lihat Paket <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── Keyword marquee ── */}
      <div className="bg-biz-ink py-4 overflow-hidden" aria-hidden="true">
        <motion.div
          className="flex gap-10 whitespace-nowrap w-max"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
        >
          {[...keywords, ...keywords].map((k, i) => (
            <span key={i} className="font-biz uppercase text-biz-gray tracking-[0.2em] text-lg flex items-center gap-10">
              {k} <span className="w-2 h-2 bg-biz-accent rotate-45" />
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── About ── */}
      <section id="tentang" className="py-24 md:py-32 px-5 md:px-12">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-biz uppercase text-biz-accent tracking-[0.35em] text-sm mb-5">Tentang Kami</p>
            <h2 className="font-biz uppercase font-semibold text-4xl md:text-6xl leading-[0.95] mb-8">
              Mitra bisnis yang ikut turun ke lapangan.
            </h2>
            <p className="text-biz-slate leading-relaxed mb-5">
              Arkrea Business adalah divisi Arteri Kreasi Nusantara yang mendampingi pemilik usaha dalam merencanakan, membenahi, dan menjalankan bisnis.
            </p>
            <p className="text-biz-slate leading-relaxed">
              Kami tidak berhenti di laporan. Bersama tim Anda, kami memastikan strategi benar-benar berjalan, mulai dari manajemen, keuangan, SDM, hingga pemasaran.
            </p>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="absolute -top-4 -left-4 w-full h-full border-2 border-biz-accent" />
            <img src={fotoTentang} alt="Sesi pelatihan bersama tim Arkrea" className="relative w-full aspect-[4/5] object-cover" />
          </motion.div>
        </div>
      </section>

      {/* ── Packages ── */}
      <section id="paket" className="bg-biz-steel text-white py-24 md:py-32 px-5 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <p className="font-biz uppercase text-biz-accent tracking-[0.35em] text-sm mb-4">Pilihan Layanan</p>
              <h2 className="font-biz uppercase font-semibold text-4xl md:text-6xl leading-[0.95]">Dua Paket,<br />Satu Tujuan.</h2>
            </div>
            <p className="text-white/65 max-w-sm leading-relaxed">
              Pilih tingkat keterlibatan yang sesuai: didampingi, atau dijalankan langsung oleh tim kami.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {packages.map((pkg, i) => (
              <motion.article
                key={pkg.no}
                className={`relative flex flex-col p-8 md:p-10 border ${pkg.featured ? 'bg-biz-paper text-biz-ink border-biz-paper' : 'bg-biz-ink/40 border-white/15'}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6 }}
              >
                {pkg.featured && (
                  <span className="absolute top-0 right-8 -translate-y-1/2 bg-biz-accent text-white font-biz uppercase text-xs tracking-[0.2em] px-3 py-1.5">
                    Paling Lengkap
                  </span>
                )}
                <span className={`font-biz font-bold text-6xl leading-none mb-6 ${pkg.featured ? 'text-biz-mist' : 'text-white/15'}`}>{pkg.no}</span>
                <h3 className="font-biz uppercase font-semibold text-2xl md:text-3xl leading-tight mb-2">{pkg.name}</h3>
                <p className="text-biz-accent font-medium text-sm mb-5">{pkg.tagline}</p>
                <p className={`leading-relaxed mb-8 ${pkg.featured ? 'text-biz-slate' : 'text-white/65'}`}>{pkg.desc}</p>
                <ul className="space-y-3 mb-10">
                  {pkg.features.map(f => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <Check className="w-4 h-4 mt-0.5 shrink-0 text-biz-accent" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={waLink(`Halo Arkrea Business, saya tertarik dengan paket ${pkg.name}.`)}
                  target="_blank"
                  rel="noreferrer"
                  className={`mt-auto inline-flex items-center justify-center gap-2 py-4 font-biz uppercase tracking-[0.15em] transition-colors ${
                    pkg.featured ? 'bg-biz-accent text-white hover:bg-biz-ink' : 'bg-white text-biz-ink hover:bg-biz-accent hover:text-white'
                  }`}
                >
                  Tanya Paket Ini <ArrowUpRight className="w-4 h-4" />
                </a>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section id="proses" className="py-24 md:py-32 px-5 md:px-12">
        <div className="max-w-6xl mx-auto">
          <p className="font-biz uppercase text-biz-accent tracking-[0.35em] text-sm mb-4">Cara Kami Bekerja</p>
          <h2 className="font-biz uppercase font-semibold text-4xl md:text-6xl leading-[0.95] mb-14">4 Langkah Menuju Kejelasan.</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 border-t-2 border-biz-ink">
            {steps.map((s, i) => (
              <motion.div
                key={s.no}
                className="group relative py-8 sm:pr-6 border-b sm:border-b-0 border-biz-mist"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <span className="absolute top-0 left-0 h-[3px] w-0 bg-biz-accent group-hover:w-full transition-all duration-500 -translate-y-[2px]" />
                <span className="font-biz font-bold text-5xl text-biz-gray group-hover:text-biz-accent transition-colors">{s.no}</span>
                <h3 className="font-biz uppercase font-semibold text-xl mt-4 mb-3">{s.title}</h3>
                <p className="text-biz-slate text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Client quote ── */}
      <section className="bg-biz-mist py-20 md:py-28 px-5 md:px-12">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_1.4fr] gap-12 items-center">
          <img src={fotoSesi} alt="Sesi interaktif bersama peserta" className="w-full aspect-[4/3] object-cover grayscale hover:grayscale-0 transition-all duration-700" />
          <div>
            <p className="font-biz uppercase text-biz-accent tracking-[0.35em] text-sm mb-6">Kata Klien</p>
            <blockquote className="font-biz text-2xl md:text-4xl leading-snug text-biz-ink mb-8">
              “Arkrea membantu manajemen media sosial dan HRD kami secara profesional. Branding digital kami semakin kuat dan jangkauan pasar meningkat signifikan.”
            </blockquote>
            <div className="flex items-center gap-4">
              <span className="w-14 h-14 bg-white flex items-center justify-center p-2 shrink-0">
                <img src={logoAldo} alt="" className="max-w-full max-h-full object-contain" />
              </span>
              <div>
                <p className="font-semibold">Aldo Frozen Food</p>
                <p className="text-sm text-biz-slate">Klien: Manajemen Media Sosial &amp; HRD</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact CTA ── */}
      <section id="kontak" className="bg-biz-ink text-white py-24 md:py-32 px-5 md:px-12 relative overflow-hidden">
        <div className="absolute -left-20 -bottom-6 w-[60vw] h-16 bg-biz-accent/80 rotate-3 hidden md:block" aria-hidden="true" />
        <div className="relative max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-end">
          <h2 className="font-biz uppercase font-bold leading-[0.92]" style={{ fontSize: 'clamp(2.8rem, 7vw, 6rem)' }}>
            Siap Membenahi<br />Bisnis Anda?
          </h2>
          <div>
            <p className="text-white/70 leading-relaxed mb-8">
              Ceritakan kondisi bisnis Anda. Tim kami akan menghubungi untuk sesi konsultasi awal.
            </p>
            <div className="space-y-4 mb-10">
              {[
                { icon: Phone, text: '+62 856 9290 9283', href: waLink('Halo Arkrea Business, saya ingin berkonsultasi.') },
                { icon: Mail, text: 'arterikreasinusantara@gmail.com', href: 'mailto:arterikreasinusantara@gmail.com' },
                { icon: MapPin, text: 'Kota Batu, Jawa Timur', href: undefined },
              ].map(c => {
                const inner = (
                  <>
                    <c.icon className="w-4 h-4 text-biz-accent shrink-0" />
                    <span>{c.text}</span>
                  </>
                );
                return c.href ? (
                  <a key={c.text} href={c.href} target="_blank" rel="noreferrer" className="flex items-center gap-4 text-white/80 hover:text-biz-accent transition-colors">
                    {inner}
                  </a>
                ) : (
                  <p key={c.text} className="flex items-center gap-4 text-white/80">{inner}</p>
                );
              })}
            </div>
            <a
              href={waLink('Halo Arkrea Business, saya ingin berkonsultasi mengenai bisnis saya.')}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-biz-accent hover:bg-white hover:text-biz-ink font-biz uppercase tracking-[0.15em] transition-colors"
            >
              Mulai Konsultasi <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-biz-steel text-white/70 px-5 md:px-12 py-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between md:items-center gap-6">
          <div className="font-biz uppercase leading-none">
            <span className="block text-xs tracking-[0.35em] text-white/50">Arkrea</span>
            <span className="block text-xl font-semibold tracking-[0.12em] text-white">Business</span>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 font-biz uppercase text-sm tracking-[0.12em]">
            {navItems.map(item => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className="uppercase hover:text-biz-accent transition-colors">{item.label}</button>
            ))}
            <button onClick={onBack} className="flex items-center gap-1.5 uppercase hover:text-biz-accent transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> Arkrea
            </button>
          </div>
        </div>
        <p className="max-w-6xl mx-auto mt-8 pt-6 border-t border-white/10 text-xs text-white/45">
          © {new Date().getFullYear()} Arkrea Business, bagian dari Arteri Kreasi Nusantara
        </p>
      </footer>
    </div>
  );
}
