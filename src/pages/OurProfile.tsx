import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  ArrowLeft, Link2, Image, Mail, Target, Eye, Heart,
  TrendingUp, Users, Award, Briefcase, Star, Menu, Moon, Sun
} from 'lucide-react';
import MobileMenu, { scrollAfterClose } from '../components/MobileMenu';

interface OurProfileProps {
  onBack: () => void;
  isDark: boolean;
  onToggleDark: () => void;
}

const teamMembers = [
  {
    name: 'Azariel Prasetyo',
    role: 'Founder & Chief Executive Officer',
    dept: 'Leadership',
    bio: 'Visioner di balik Arteri Kreasi Nusantara. Dengan pengalaman lebih dari 10 tahun di bidang bisnis dan manajemen, Azariel memimpin perusahaan dengan prinsip inovasi dan integritas.',
    avatar: 'AP',
    color: 'from-violet-500 to-indigo-600',
    skills: ['Business Strategy', 'Leadership', 'Innovation'],
    linkedin: '#',
    instagram: '#',
    email: 'azariel@arkrea.id',
  },
  {
    name: 'Rizky Maulana',
    role: 'Chief Operating Officer',
    dept: 'Operations',
    bio: 'Ahli operasional yang memastikan setiap proses berjalan dengan efisien dan terstruktur. Spesialis dalam sistem manajemen dan optimasi bisnis.',
    avatar: 'RM',
    color: 'from-emerald-500 to-teal-600',
    skills: ['Operations', 'Process Optimization', 'SOP Development'],
    linkedin: '#',
    instagram: '#',
    email: 'rizky@arkrea.id',
  },
  {
    name: 'Nadia Salsabila',
    role: 'Chief Marketing Officer',
    dept: 'Marketing',
    bio: 'Kreator strategi pemasaran yang inovatif. Nadia memimpin tim marketing dalam membangun brand awareness Arkrea di level nasional.',
    avatar: 'NS',
    color: 'from-pink-500 to-rose-600',
    skills: ['Brand Strategy', 'Digital Marketing', 'Content Creation'],
    linkedin: '#',
    instagram: '#',
    email: 'nadia@arkrea.id',
  },
  {
    name: 'Dimas Arfian',
    role: 'Head of Business Consulting',
    dept: 'Consulting',
    bio: 'Konsultan bisnis berpengalaman yang telah membantu puluhan UMKM dan korporasi bertransformasi dan berkembang secara berkelanjutan.',
    avatar: 'DA',
    color: 'from-amber-500 to-orange-600',
    skills: ['Business Analysis', 'Financial Planning', 'Advisory'],
    linkedin: '#',
    instagram: '#',
    email: 'dimas@arkrea.id',
  },
  {
    name: 'Putri Handayani',
    role: 'Hotel & Hospitality Manager',
    dept: 'Hospitality',
    bio: 'Manajer hospitality yang memastikan standar pelayanan tertinggi di setiap properti yang dikelola Arkrea, termasuk Hotel Navara.',
    avatar: 'PH',
    color: 'from-sky-500 to-blue-600',
    skills: ['Hotel Management', 'Guest Relations', 'Service Excellence'],
    linkedin: '#',
    instagram: '#',
    email: 'putri@arkrea.id',
  },
  {
    name: 'Fajar Ramadhan',
    role: 'Head of Travel & Tourism',
    dept: 'Travel',
    bio: 'Petualang sejati yang mengubah passion-nya menjadi bisnis. Fajar memimpin Arkrea Traventure dalam memberikan pengalaman perjalanan terbaik.',
    avatar: 'FR',
    color: 'from-green-500 to-emerald-600',
    skills: ['Tour Planning', 'Destination Management', 'Eco Tourism'],
    linkedin: '#',
    instagram: '#',
    email: 'fajar@arkrea.id',
  },
];

const timeline = [
  {
    year: '2018',
    title: 'Awal Perjalanan',
    desc: 'Arteri Kreasi Nusantara didirikan oleh Azariel Prasetyo dengan visi menjadi mitra terpercaya bisnis di Indonesia.',
    icon: Star,
  },
  {
    year: '2019',
    title: 'Ekspansi Konsultasi',
    desc: 'Meluncurkan divisi konsultasi bisnis formal dan berhasil membantu 15+ klien UMKM berkembang.',
    icon: TrendingUp,
  },
  {
    year: '2021',
    title: 'Hotel Navara',
    desc: 'Membuka Hotel Navara, penanda masuknya Arkrea ke industri hospitality premium.',
    icon: Award,
  },
  {
    year: '2022',
    title: 'Arkrea Traventure',
    desc: 'Meluncurkan divisi travel & tourism untuk memperluas layanan ke sektor pariwisata Indonesia.',
    icon: Briefcase,
  },
  {
    year: '2024',
    title: 'Saat Ini',
    desc: 'Melayani 200+ klien aktif, dengan 3 divisi utama yang terus berkembang pesat secara nasional.',
    icon: Users,
  },
];

const values = [
  {
    icon: Target,
    title: 'Berorientasi Hasil',
    desc: 'Setiap langkah yang kami ambil terukur dan berorientasi pada pencapaian tujuan klien.',
  },
  {
    icon: Heart,
    title: 'Integritas Penuh',
    desc: 'Kejujuran dan transparansi adalah fondasi dari setiap hubungan bisnis yang kami bangun.',
  },
  {
    icon: Eye,
    title: 'Visi Jangka Panjang',
    desc: 'Kami tidak hanya melihat tantangan hari ini, tetapi merancang solusi untuk 5 tahun ke depan.',
  },
  {
    icon: Users,
    title: 'Kolaboratif',
    desc: 'Kami percaya bahwa kesuksesan terbaik adalah ketika tumbuh bersama klien dan komunitas.',
  },
];

function TeamCard({ member, index }: { member: typeof teamMembers[0], index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8 }}
      className="group bg-white dark:bg-white/5 border border-border/40 rounded-3xl p-7 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 flex flex-col"
    >
      {/* Avatar */}
      <div className="flex items-start justify-between mb-6">
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center shadow-lg`}>
          <span className="text-white font-bold text-xl">{member.avatar}</span>
        </div>
        <span className="text-xs font-semibold text-muted-foreground bg-muted px-3 py-1 rounded-full">
          {member.dept}
        </span>
      </div>

      {/* Info */}
      <h3 className="text-lg font-semibold text-foreground mb-1">{member.name}</h3>
      <p className="text-sm text-primary font-medium mb-4">{member.role}</p>
      <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-6">{member.bio}</p>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {member.skills.map((skill) => (
          <span
            key={skill}
            className="px-2.5 py-1 text-xs font-medium bg-primary/10 text-primary rounded-lg"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Social */}
      <div className="flex items-center gap-3 pt-4 border-t border-border/40">
        {/* Social links only render once a real URL replaces the '#' placeholder */}
        {member.linkedin !== '#' && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`LinkedIn ${member.name}`}
            className="w-8 h-8 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-300"
          >
            <Link2 className="w-3.5 h-3.5" />
          </a>
        )}
        {member.instagram !== '#' && (
          <a
            href={member.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Instagram ${member.name}`}
            className="w-8 h-8 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-300"
          >
            <Image className="w-3.5 h-3.5" />
          </a>
        )}
        <a
          href={`mailto:${member.email}`}
          aria-label={`Email ${member.name}`}
          className="w-8 h-8 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-300"
        >
          <Mail className="w-3.5 h-3.5" />
        </a>
        <span className="text-muted-foreground text-xs ml-auto">{member.email}</span>
      </div>
    </motion.div>
  );
}

const profileSections = [
  { id: 'tim', label: 'Tim' },
  { id: 'perjalanan', label: 'Perjalanan' },
  { id: 'nilai', label: 'Nilai' },
];

export default function OurProfile({ onBack, isDark, onToggleDark }: OurProfileProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden">
      {/* ── Navbar ── */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center backdrop-blur-md bg-background/80 border-b border-border/50"
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <button
          onClick={onBack}
          aria-label="Kembali ke Arkrea"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
        >
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="text-sm font-medium hidden sm:inline">Kembali ke Arkrea</span>
        </button>

        <div className="font-semibold text-lg">
          <span className="text-primary">Our</span> Profile
        </div>

        <div className="flex items-center gap-3 md:gap-6">
          <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            {profileSections.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
                className="hover:text-foreground transition-colors cursor-pointer"
              >
                {label}
              </button>
            ))}
          </div>
          <button
            onClick={onToggleDark}
            className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
            aria-label="Buka menu"
            aria-expanded={menuOpen}
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>
      </motion.nav>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        title="Our Profile"
        footer={
          <button
            onClick={() => { setMenuOpen(false); onBack(); }}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke Arkrea
          </button>
        }
      >
        {profileSections.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => scrollAfterClose(() => setMenuOpen(false), id)}
            className="w-full text-left px-3 py-3 rounded-xl text-base hover:bg-muted transition-colors cursor-pointer"
          >
            {label}
          </button>
        ))}
      </MobileMenu>

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        {/* Background orbs */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-violet-500/15 to-indigo-500/10 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-tl from-sky-500/10 to-teal-500/10 blur-[80px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest mb-8">
              <Users className="w-3.5 h-3.5" />
              Arteri Kreasi Nusantara
            </div>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold text-foreground leading-[1.1] mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Orang-Orang di<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-indigo-500 to-sky-500">
              Balik Arkrea
            </span>
          </motion.h1>

          <motion.p
            className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Kami adalah tim yang penuh semangat, berdedikasi untuk membangun bisnis
            yang bermakna dan memberikan dampak nyata bagi Indonesia.
          </motion.p>

          {/* Stats Row */}
          <motion.div
            className="flex flex-wrap justify-center gap-8 md:gap-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {[
              { value: '6+', label: 'Tim Inti' },
              { value: '5+', label: 'Tahun Berdiri' },
              { value: '200+', label: 'Klien Dilayani' },
              { value: '3', label: 'Divisi Bisnis' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-muted-foreground text-xs uppercase tracking-wider mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Values ── */}
      <section id="nilai" className="py-20 px-6 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-14"
          >
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Nilai Kami</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Prinsip yang Memandu Kami
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="bg-background border border-border/50 rounded-2xl p-6 hover:shadow-lg hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <val.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{val.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team Section ── */}
      <section id="tim" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Tim Kami</p>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground max-w-md leading-tight">
                Berkenalan dengan<br />Tim Arkrea
              </h2>
              <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
                Setiap anggota tim kami membawa keahlian unik yang menjadikan Arkrea
                sebagai mitra bisnis yang komprehensif dan terpercaya.
              </p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {teamMembers.map((member, i) => (
              <TeamCard key={member.name} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline / Journey ── */}
      <section id="perjalanan" className="py-24 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Perjalanan Kami</p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">Sejarah Arkrea</h2>
          </motion.div>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/80 via-primary/40 to-transparent" />

            <div className="space-y-12">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  className={`relative flex gap-6 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'} pl-14 md:pl-0`}>
                    <div className={`bg-background border border-border/50 rounded-2xl p-6 hover:shadow-lg hover:border-primary/20 transition-all duration-300 ${i % 2 === 0 ? '' : 'md:ml-0'}`}>
                      <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold mb-3">
                        {item.year}
                      </div>
                      <h3 className="font-semibold text-foreground text-lg mb-2">{item.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="absolute left-[20px] md:left-1/2 top-6 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-2 border-background shadow-lg shadow-primary/30 z-10" />

                  {/* Spacer for opposite side */}
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Join Us CTA ── */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-indigo-500/5 to-sky-500/10 pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-4">Bergabung</p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Ingin Tumbuh<br />Bersama Kami?
            </h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              Kami selalu terbuka untuk kolaborasi, kemitraan, dan orang-orang berbakat
              yang ingin berkontribusi pada pertumbuhan Arkrea.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://wa.me/6285692909283?text=Halo%20Arkrea%2C%20saya%20tertarik%20untuk%20bergabung!"
                target="_blank"
                rel="noreferrer"
                className="px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full transition-all hover:scale-105 shadow-lg shadow-primary/25 flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Hubungi Kami
              </a>
              <button
                onClick={onBack}
                className="px-8 py-4 bg-background border border-border hover:border-primary/50 hover:bg-muted text-foreground font-semibold rounded-full transition-all hover:scale-105 flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Kembali ke Beranda
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-8 px-6 border-t border-border/50 bg-muted/30">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 max-w-6xl mx-auto">
          <span className="text-muted-foreground text-sm">Arteri Kreasi Nusantara — Semua divisi, satu visi.</span>
          <button onClick={onBack} className="text-muted-foreground hover:text-foreground text-sm transition-colors">
            ← Kembali ke Arkrea
          </button>
        </div>
      </footer>
    </div>
  );
}
