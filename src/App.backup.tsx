import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring, useInView } from 'framer-motion';
import {
  Moon, Sun, Briefcase, TrendingUp, Map, ArrowRight,
  CheckCircle2, Mail, Phone, MapPin, Users, Award, Target, Send
} from 'lucide-react';
import clsx from 'clsx';

const slides = [
  {
    id: 'business',
    title: 'Business Structure',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80&fit=crop',
    color: 'from-blue-500/20 to-purple-500/20'
  },
  {
    id: 'marketing',
    title: 'Marketing Strategy',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&q=80&fit=crop',
    color: 'from-emerald-500/20 to-teal-500/20'
  },
  {
    id: 'tourism',
    title: 'Tourism & Hospitality',
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

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isAnnual, setIsAnnual] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

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
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
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

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setFormSubmitted(false), 4000);
  };

  return (
    <div className="min-h-screen font-sans selection:bg-primary selection:text-primary-foreground overflow-hidden">

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
            style={{ x: mousePosition.x * -100, y: mousePosition.y * -100 }}
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
          className="text-2xl font-display font-bold tracking-tight"
        >
          ARTERI<span className="text-muted-foreground/50">KREASI</span>
        </button>

        <div className="flex items-center gap-8">
          <div className="hidden md:flex gap-8 text-base font-medium">
            {['services', 'about', 'pricing', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className={clsx(
                  "relative py-1 transition-colors capitalize",
                  activeSection === item ? "text-primary font-semibold" : "text-muted-foreground hover:text-primary"
                )}
              >
                {item}
                {activeSection === item && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-full bg-background/50 border border-border/50 hover:bg-muted transition-colors backdrop-blur-md"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

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
                Your business vision.<br />
                <span className="font-light text-muted-foreground">Our headache.</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed">
                Starting and running a business is overwhelming. We take the complexity out of
                consulting so you can focus on the dream, not the stress.
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
                    Focusing on {slides[activeSlide].title}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => scrollTo('contact')}
                  className="relative group overflow-hidden px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium flex items-center gap-2 hover:scale-105 transition-transform duration-300 shadow-lg shadow-primary/15"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Get Started <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                </button>
                <button
                  onClick={() => scrollTo('services')}
                  className="relative group overflow-hidden px-8 py-4 bg-background/50 border border-border/80 rounded-full font-medium flex items-center gap-2 hover:scale-105 hover:border-primary/50 hover:bg-background/80 transition-all duration-300 backdrop-blur-md shadow-sm"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Our Services <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
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
                  Dipercaya oleh
                </p>
                <div className="flex flex-wrap gap-3">
                  {[
                    { name: 'Nusantara Grup', abbr: 'NG' },
                    { name: 'Bali Resort Co.', abbr: 'BR' },
                    { name: 'Archipelago Biz', abbr: 'AB' },
                    { name: 'Mandiri Startup', abbr: 'MS' },
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
                  rotateX: mousePosition.y * 10,
                  rotateY: mousePosition.x * -10,
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
                              Expertise
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
              <h2 className="text-4xl md:text-5xl font-display font-medium mb-6">Our Expertise</h2>
              <p className="text-muted-foreground text-xl leading-relaxed">
                We cover the three pillars of growth. You tell us the destination; we build the map and drive the car.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Briefcase,
                  title: 'Business Consulting',
                  desc: 'From legal structures to operational efficiency, we untangle the red tape and build a solid foundation.',
                },
                {
                  icon: TrendingUp,
                  title: 'Marketing Strategy',
                  desc: "We don't just run ads. We build brand narratives that convert attention into sustainable revenue.",
                },
                {
                  icon: Map,
                  title: 'Tourism & Hospitality',
                  desc: 'Specialized insights for the tourism sector, maximizing guest experience and operational margins.',
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
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                  </div>
                </motion.div>
              ))}
            </div>
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
                Who We Are
              </p>
              <h2 className="text-4xl md:text-5xl font-display font-medium mb-6">
                Built by practitioners,<br />
                <span className="italic text-muted-foreground">not theorists.</span>
              </h2>
              <p className="text-muted-foreground text-xl leading-relaxed">
                Arteri Kreasi Nusantara was founded on one belief: great advice is useless without great
                execution. We're a team of operators, marketers, and strategists who've been in the trenches.
              </p>
            </motion.div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
              {[
                { icon: Users,     num: 50, suffix: '+', label: 'Clients Served' },
                { icon: Award,     num: 7,  suffix: '+', label: 'Years Experience' },
                { icon: Target,    num: 95, suffix: '%', label: 'Success Rate' },
                { icon: Briefcase, num: 3,  suffix: '',  label: 'Core Disciplines' },
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
                  Our Mission
                </p>
                <blockquote className="text-3xl md:text-4xl font-display font-medium leading-tight mb-8">
                  "To transform complexity into clarity — for every business, in every sector."
                </blockquote>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  We believe every entrepreneur deserves access to world-class strategic thinking — not just
                  the ones with enterprise budgets. That's why we work across scales, from early-stage
                  startups to established regional players.
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
                    <p className="text-sm text-muted-foreground mb-1">Based in</p>
                    <p className="font-display text-xl font-medium">Indonesia 🇮🇩</p>
                  </div>
                </div>
              </motion.div>
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
                  <h2 className="text-4xl md:text-6xl font-display font-medium mb-8 text-foreground">Why work with us?</h2>
                  <p className="text-xl text-muted-foreground mb-12">
                    Because "figuring it out as you go" is the most expensive business strategy.
                  </p>
                  <button
                    onClick={() => scrollTo('contact')}
                    className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium flex items-center gap-2 hover:scale-105 transition-transform duration-300"
                  >
                    Book a Consultation <ArrowRight className="w-4 h-4" />
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
                    'Zero guesswork. We provide actionable roadmaps.',
                    'Cross-disciplinary team covering ops, marketing, and niche markets.',
                    "We execute. We don't just leave you with a PDF report.",
                    'Transparent pricing. No hidden retainer fees.',
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
                Subscription Plans
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
                Monthly
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={clsx(
                  'relative w-14 h-7 rounded-full transition-colors duration-300',
                  isAnnual ? 'bg-primary' : 'bg-border'
                )}
                aria-label="Toggle annual billing"
              >
                <motion.div
                  className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm"
                  animate={{ left: isAnnual ? '1.75rem' : '0.25rem' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              </button>
              <span className={clsx('text-sm font-medium transition-colors', isAnnual ? 'text-foreground' : 'text-muted-foreground')}>
                Annual
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
              {[
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
              ].map((plan, i) => (
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
                        ✦ MOST POPULAR
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
                        <span className="text-sm font-medium opacity-70">IDR</span>
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
                      onClick={() => scrollTo('contact')}
                      className={clsx(
                        'w-full py-3.5 rounded-xl font-semibold text-sm',
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
                Get In Touch
              </p>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Let's build something<br />
                <span className="text-muted-foreground">great together.</span>
              </h2>
              <p className="text-foreground/70 text-xl leading-relaxed">
                Ready to take the first step? Drop us a message and we'll get back to you within 24 hours.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-5 gap-12">

              {/* Contact Form */}
              <motion.div
                className="lg:col-span-3 bg-background/40 backdrop-blur-md border border-border/50 p-10 rounded-[2.5rem]"
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
                      <h3 className="text-2xl font-display font-medium">Message Sent!</h3>
                      <p className="text-muted-foreground">We'll get back to you within 24 hours.</p>
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
                          <label className="text-sm font-semibold text-foreground/80">Full Name</label>
                          <input
                            type="text"
                            required
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                            className="px-5 py-3.5 bg-background/80 border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/60 transition-all"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-semibold text-foreground/80">Email Address</label>
                          <input
                            type="email"
                            required
                            placeholder="john@company.com"
                            value={formData.email}
                            onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                            className="px-5 py-3.5 bg-background/80 border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/60 transition-all"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-foreground/80">Your Message</label>
                        <textarea
                          required
                          rows={5}
                          placeholder="Tell us about your business and what you're looking to achieve..."
                          value={formData.message}
                          onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                          className="px-5 py-3.5 bg-background/80 border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/60 transition-all resize-none"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium flex items-center gap-2 hover:scale-105 transition-transform duration-300 self-start"
                      >
                        Send Message <Send className="w-4 h-4" />
                      </button>
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
                    label: 'Email Us',
                    value: 'hello@arterikreasi.com',
                    sub: 'We reply within 24 hours',
                  },
                  {
                    icon: Phone,
                    label: 'WhatsApp',
                    value: '+62 812 3456 7890',
                    sub: 'Mon–Fri, 9am–6pm WIB',
                  },
                  {
                    icon: MapPin,
                    label: 'Office',
                    value: 'Jakarta, Indonesia',
                    sub: 'Available for remote & on-site',
                  },
                ].map((info, i) => (
                  <motion.div
                    key={i}
                    className="bg-card/70 backdrop-blur-md border border-border p-7 rounded-[2rem] flex gap-5 items-start group hover:bg-card hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
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
                      <p className="font-semibold text-foreground mb-0.5">{info.value}</p>
                      <p className="text-sm text-foreground/60">{info.sub}</p>
                    </div>
                  </motion.div>
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
                  ARTERI<span className="opacity-50">KREASI NUSANTARA</span>
                </div>
                <p className="text-muted-foreground text-lg max-w-sm">
                  Transferring the complexity of modern business into elegant, actionable strategies for growth.
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-6 text-lg">Company</h4>
                <div className="flex flex-col gap-4 text-muted-foreground">
                  <button
                    onClick={() => scrollTo('about')}
                    className="hover:text-primary transition-colors text-left"
                  >
                    About Us
                  </button>
                  <button
                    onClick={() => scrollTo('pricing')}
                    className="hover:text-primary transition-colors text-left"
                  >
                    Pricing
                  </button>
                  <button
                    onClick={() => scrollTo('contact')}
                    className="hover:text-primary transition-colors text-left"
                  >
                    Contact
                  </button>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-6 text-lg">Legal</h4>
                <div className="flex flex-col gap-4 text-muted-foreground">
                  <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                  <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-border/50 text-muted-foreground flex flex-col md:flex-row justify-between items-center gap-4">
              <p>© {new Date().getFullYear()} Arteri Kreasi Nusantara. All rights reserved.</p>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                  in
                </div>
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                  ig
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
