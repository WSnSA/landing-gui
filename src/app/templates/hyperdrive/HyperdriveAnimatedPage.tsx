import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import { useEffect, useState } from "react";
import type { HyperdriveConfig } from "./HyperdriveConfig";
import { HYPERDRIVE_THEMES } from "./HyperdriveConfig";
import { MapPin, Clock, Phone, Mail, Zap, LucideIcon } from "lucide-react";
import { ICON_MAP } from "../cafe/CafeIcons";

// ── Icon helper ───────────────────────────────────────────────────────────────

function HdIcon({ name, size = 20, className = "" }: { name: string; size?: number; className?: string }) {
  const Icon = ICON_MAP[name] as LucideIcon | undefined;
  if (!Icon) return <Zap size={size} className={className} />;
  return <Icon size={size} className={className} />;
}

// ── Brand logo ────────────────────────────────────────────────────────────────

function BrandLogo({ config, size = "md" }: { config: HyperdriveConfig; size?: "sm" | "md" }) {
  const theme = HYPERDRIVE_THEMES[config.primaryColor];
  const dim = size === "sm" ? "h-6 w-6 text-xs" : "h-9 w-9 text-sm";
  if (config.brandLogo) {
    return (
      <img
        src={config.brandLogo}
        alt={config.brandName}
        className={`${size === "sm" ? "h-6 w-6" : "h-9 w-9"} rounded-lg object-cover`}
        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
      />
    );
  }
  return (
    <div className={`${dim} rounded-lg ${theme.accent} flex items-center justify-center text-white font-black shrink-0`}>
      {config.brandName.charAt(0).toUpperCase()}
    </div>
  );
}

// ── Scroll animations ─────────────────────────────────────────────────────────

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }} className={className}>
      {children}
    </motion.div>
  );
}

// ── Speed lines background ────────────────────────────────────────────────────

function SpeedLines({ count = 12, accent }: { count?: number; accent: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className={`absolute h-px ${accent} opacity-20`}
          style={{
            top: `${8 + i * 7.5}%`,
            left: 0,
            right: 0,
          }}
          animate={{ scaleX: [0.3, 1, 0.3], opacity: [0.05, 0.25, 0.05] }}
          transition={{ duration: 3 + (i % 4), repeat: Infinity, delay: i * 0.25, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

// ── Hero browser mockup ───────────────────────────────────────────────────────

function HeroBrowserMockup({ config, theme }: { config: HyperdriveConfig; theme: ReturnType<typeof HYPERDRIVE_THEMES[keyof typeof HYPERDRIVE_THEMES]> }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      setTilt({
        x: ((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) * -8,
        y: ((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) * 8,
      });
    };
    const onLeave = () => setTilt({ x: 0, y: 0 });
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); };
  }, []);

  const topServices = config.services.slice(0, 3);

  return (
    <div ref={ref} style={{ perspective: "1200px" }} className="relative px-6 py-8">
      <motion.div
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: "spring", stiffness: 180, damping: 22 }}
        style={{ transformStyle: "preserve-3d" }}
        className="rounded-2xl overflow-hidden border border-white/10 bg-zinc-900/90 backdrop-blur-xl shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
      >
        {/* Browser bar */}
        <div className="bg-zinc-800/80 border-b border-white/10 px-4 py-3 flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-rose-400" />
            <div className="h-3 w-3 rounded-full bg-amber-400" />
            <div className="h-3 w-3 rounded-full bg-emerald-400" />
          </div>
          <div className="flex-1 rounded-md bg-zinc-700/60 border border-white/10 px-3 py-1.5 text-xs text-zinc-400 text-center">
            landing.mn/p/{config.slugPreview}
          </div>
        </div>

        {/* Content */}
        <div className="bg-zinc-950">
          {/* Nav row */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-white/5">
            <div className="flex items-center gap-2">
              <BrandLogo config={config} size="sm" />
              <span className="font-black text-sm text-white">{config.brandName}</span>
            </div>
            <div className="flex gap-3 text-xs text-zinc-400">
              <span>Сургалт</span><span>Тухай</span><span>Холбоо</span>
            </div>
          </div>

          {/* Hero area */}
          <div className={`${theme.accentBg} border-b border-white/5 px-5 py-7 relative overflow-hidden`}>
            <SpeedLines count={6} accent={`bg-${config.primaryColor}-500`} />
            <div className={`text-xs uppercase tracking-widest ${theme.accentText} opacity-75 mb-1.5`}>{config.badge}</div>
            <div className="text-base font-black text-white leading-tight">
              {config.tagline}{" "}
              <span className={theme.highlight}>{config.taglineHighlight}</span>
            </div>
            <div className={`mt-3 inline-block rounded-lg ${theme.accent} px-4 py-1.5 text-xs font-bold text-white`}>
              Бүртгүүлэх →
            </div>
          </div>

          {/* Services preview */}
          <div className="grid divide-x divide-white/5 border-t border-white/5" style={{ gridTemplateColumns: `repeat(${topServices.length}, 1fr)` }}>
            {topServices.map((s) => (
              <div key={s.name} className="p-3 text-center text-xs text-zinc-400 flex flex-col items-center gap-1">
                <HdIcon name={s.icon} size={13} className="text-zinc-500" />
                <div className="text-zinc-300 font-medium truncate w-full text-center">{s.name}</div>
                <div className={`${theme.accentText} font-bold text-xs`}>{s.price}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Floating badges */}
      <motion.div animate={{ y: [0, -7, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-2 top-14 rounded-2xl bg-zinc-800/90 backdrop-blur-md border border-white/10 px-4 py-3 shadow-xl">
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <span className={`h-2 w-2 rounded-full ${theme.accent} animate-pulse`} />
          Нийтлэгдсэн
        </div>
        <div className="text-xs text-zinc-500 mt-0.5">landing.mn/p/{config.slugPreview}</div>
      </motion.div>

      <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 4, repeat: Infinity, delay: 1, ease: "easeInOut" }}
        className="absolute -right-2 bottom-16 rounded-2xl bg-zinc-800/90 backdrop-blur-md border border-white/10 px-4 py-3 shadow-xl">
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <Zap size={13} className={theme.accentText} /> 342 үзэлт
        </div>
        <div className="text-xs text-zinc-500 mt-0.5">Энэ 7 хоногт</div>
      </motion.div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function HyperdriveAnimatedPage({ config }: { config: HyperdriveConfig }) {
  const theme = HYPERDRIVE_THEMES[config.primaryColor];
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans">

      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-zinc-950/90 backdrop-blur-md border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <BrandLogo config={config} size="md" />
            <span className="font-black text-lg tracking-tight text-white">{config.brandName}</span>
          </div>
          <div className="hidden sm:flex items-center gap-7 text-sm font-medium text-zinc-400">
            <a href="#services" className="hover:text-white transition">Сургалт</a>
            <a href="#features" className="hover:text-white transition">Тухай</a>
            <a href="#contact" className="hover:text-white transition">Холбоо</a>
          </div>
          <a href="#contact" className={`rounded-xl ${theme.accent} ${theme.accentHover} px-4 py-2 text-xs font-bold text-white transition`}>
            Бүртгүүлэх
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-[calc(100vh-56px)] flex items-center overflow-hidden bg-zinc-950">
        {/* Background grid */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

        {/* Speed lines */}
        <SpeedLines count={14} accent={`bg-${config.primaryColor}-400`} />

        {/* Glow orbs */}
        <div className={`absolute -top-32 -left-32 h-[600px] w-[600px] rounded-full ${theme.accentBg} blur-[180px] opacity-30 pointer-events-none`} />
        <div className={`absolute top-1/2 -right-32 h-[400px] w-[400px] rounded-full ${theme.accentBg} blur-[140px] opacity-20 pointer-events-none`} />

        <motion.div style={{ y: heroY, opacity: heroOpacity }}
          className="relative mx-auto max-w-7xl px-6 pt-16 pb-20 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              {/* Badge */}
              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                className={`inline-flex items-center gap-2 rounded-full bg-white/5 backdrop-blur-md border ${theme.accentBorder} px-4 py-1.5 text-xs font-semibold ${theme.badgeText} mb-6`}>
                <span className={`h-1.5 w-1.5 rounded-full ${theme.accent} animate-pulse`} />
                {config.badge}
              </motion.div>

              {/* Headline */}
              <motion.h1 initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.1 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] text-white">
                {config.tagline}{" "}
                <span className={theme.highlight}>{config.taglineHighlight}</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.2 }}
                className="mt-6 text-lg text-zinc-400 leading-relaxed max-w-lg">
                {config.description}
              </motion.p>

              {/* CTAs */}
              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.3 }}
                className="mt-8 flex flex-wrap gap-3">
                <a href="#services" className={`group inline-flex items-center gap-2 rounded-xl ${theme.accent} ${theme.accentHover} px-6 py-3 text-sm font-semibold text-white transition shadow-lg ${theme.accentGlow}`}>
                  Сургалт үзэх <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                </a>
                <a href="#contact" className="inline-flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-6 py-3 text-sm font-medium text-zinc-300 hover:bg-white/10 transition">
                  Бүртгүүлэх
                </a>
              </motion.div>

              {/* Feature pills */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }}
                className="mt-10 flex flex-wrap items-center gap-4 text-sm text-zinc-500">
                {config.features.slice(0, 3).map((f) => (
                  <span key={f.title} className="flex items-center gap-1.5">
                    <span className={theme.accentText}>✓</span> {f.title}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Browser mockup */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <HeroBrowserMockup config={config} theme={theme} />
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-600">
          <div className="text-xs">доош гүйлгэ</div>
          <div className="h-5 w-0.5 bg-zinc-800 rounded-full" />
        </motion.div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 bg-zinc-900 relative overflow-hidden">
        <div className={`absolute inset-0 ${theme.accentBg} opacity-5 pointer-events-none`} />
        <div className="relative mx-auto max-w-6xl px-6">
          <FadeUp className="text-center mb-14">
            <div className={`text-xs font-semibold uppercase tracking-widest ${theme.accentText} mb-3`}>{config.servicesSubtitle}</div>
            <h2 className="text-4xl font-black text-white">
              {config.servicesTitle} — <span className={theme.highlight}>багцууд</span>
            </h2>
          </FadeUp>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {config.services.map((svc, i) => (
              <FadeUp key={i} delay={i * 0.07}>
                <div className={`p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 relative overflow-hidden ${
                  svc.highlight
                    ? `${theme.accentBorder} ${theme.accentBg} shadow-lg ${theme.accentGlow}`
                    : "border-white/10 bg-zinc-800/50 hover:border-white/20"
                }`}>
                  {svc.highlight && (
                    <div className={`absolute top-3 right-3 text-xs font-bold ${theme.accent} text-white px-2 py-0.5 rounded-full`}>
                      Хамгийн алдартай
                    </div>
                  )}
                  <div className={`h-11 w-11 rounded-xl ${theme.accentBg} border ${theme.accentBorder} flex items-center justify-center mb-4`}>
                    <HdIcon name={svc.icon} size={22} className={theme.accentText} />
                  </div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="font-black text-white text-lg leading-tight">{svc.name}</div>
                    <div className={`${theme.accentText} font-black text-sm shrink-0`}>{svc.price}</div>
                  </div>
                  <div className={`inline-flex items-center gap-1 text-xs ${theme.accentText} ${theme.accentBg} border ${theme.accentBorder} rounded-full px-2.5 py-1 mb-3 font-semibold`}>
                    <Clock size={11} /> {svc.duration}
                  </div>
                  <div className="text-sm text-zinc-400 leading-relaxed">{svc.desc}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-zinc-950 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="relative mx-auto max-w-6xl px-6">
          <FadeUp className="text-center mb-14">
            <h2 className="text-4xl font-black text-white">{config.featuresTitle}</h2>
          </FadeUp>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {config.features.map((f, i) => (
              <FadeUp key={i} delay={i * 0.07}>
                <div className="p-6 rounded-2xl bg-zinc-900 border border-white/10 hover:border-white/20 hover:-translate-y-0.5 transition-all duration-300">
                  <div className={`h-11 w-11 rounded-xl ${theme.accentBg} border ${theme.accentBorder} flex items-center justify-center mb-4`}>
                    <HdIcon name={f.icon} size={22} className={theme.accentText} />
                  </div>
                  <div className="font-bold text-white mb-1.5">{f.title}</div>
                  <div className="text-sm text-zinc-400 leading-relaxed">{f.desc}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Instructors */}
      {config.instructors.length > 0 && (
        <section className="py-20 bg-zinc-900">
          <div className="mx-auto max-w-5xl px-6">
            <FadeUp className="text-center mb-12">
              <h2 className="text-3xl font-black text-white">Манай багш нар</h2>
            </FadeUp>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {config.instructors.map((inst, i) => (
                <FadeUp key={i} delay={i * 0.1}>
                  <div className={`rounded-2xl bg-zinc-800 border border-white/10 p-6 hover:border-white/20 hover:${theme.accentBorder} transition-all duration-300`}>
                    <div className={`h-14 w-14 rounded-2xl ${theme.accent} flex items-center justify-center text-white font-black text-xl mb-4`}>
                      {inst.name.charAt(0)}
                    </div>
                    <div className="font-black text-white text-lg">{inst.name}</div>
                    <div className={`text-sm ${theme.accentText} mt-0.5 font-semibold`}>{inst.role}</div>
                    <div className="text-sm text-zinc-500 mt-2">{inst.exp} туршлагатай</div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact + Hours */}
      <section className="py-20 bg-zinc-950">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-6 md:grid-cols-2">
            <FadeUp>
              <div className="rounded-2xl bg-zinc-900 border border-white/10 p-8">
                <div className={`h-11 w-11 rounded-xl ${theme.accentBg} border ${theme.accentBorder} flex items-center justify-center mb-4`}>
                  <MapPin size={20} className={theme.accentText} />
                </div>
                <div className="font-black text-xl text-white mb-2">Байршил</div>
                <div className="text-zinc-400 text-sm leading-relaxed">
                  {config.address}<br />
                  <span className="text-zinc-600 mt-1 inline-block">{config.addressNote}</span>
                </div>
              </div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <div className="rounded-2xl bg-zinc-900 border border-white/10 p-8">
                <div className={`h-11 w-11 rounded-xl ${theme.accentBg} border ${theme.accentBorder} flex items-center justify-center mb-4`}>
                  <Clock size={20} className={theme.accentText} />
                </div>
                <div className="font-black text-xl text-white mb-4">Ажлын цаг</div>
                <div className="space-y-2">
                  {config.hours.map((h, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <span className="text-zinc-400">{h.day}</span>
                      <span className="font-semibold text-white">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className={`py-28 relative overflow-hidden ${theme.accentBg}`}>
        <SpeedLines count={10} accent={`bg-${config.primaryColor}-400`} />
        <FadeUp className="relative mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-4xl font-black text-white mb-4">{config.ctaText}</h2>
          <p className="text-white/70 mb-10 text-lg">{config.ctaSubtext}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {config.phone && (
              <a href={`tel:${config.phone.replace(/-/g, "")}`}
                className={`inline-flex items-center justify-center gap-2 rounded-xl ${theme.accent} ${theme.accentHover} px-8 py-4 text-sm font-bold text-white transition shadow-lg`}>
                <Phone size={15} /> {config.phone}
              </a>
            )}
            {config.email && (
              <a href={`mailto:${config.email}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 px-8 py-4 text-sm font-bold text-white transition">
                <Mail size={15} /> {config.email}
              </a>
            )}
          </div>
        </FadeUp>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-zinc-950 py-10">
        <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-600">
          <div className="flex items-center gap-2 font-black text-white">
            <BrandLogo config={config} size="sm" />
            {config.brandName}
          </div>
          <div className="text-xs">Powered by <span className="font-semibold text-blue-500">Landing.mn</span></div>
          <div>© 2026 {config.brandName}</div>
        </div>
      </footer>
    </div>
  );
}
