import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import { useEffect, useState } from "react";
import type { CafeConfig } from "./CafeConfig";
import { COLOR_THEMES } from "./CafeConfig";
import { MapPin, Clock, Phone, Mail, TrendingUp, CheckCircle, UtensilsCrossed, LucideIcon } from "lucide-react";
import { ICON_MAP } from "./CafeIcons";

function CafeIcon({ name, size = 22, className = "" }: { name: string; size?: number; className?: string }) {
  const Icon = ICON_MAP[name];
  if (!Icon) return <UtensilsCrossed size={size} className={className} />;
  return <Icon size={size} className={className} />;
}

function BrandLogo({ config, size = "md" }: { config: CafeConfig; size?: "sm" | "md" }) {
  const dim = size === "sm" ? "h-5 w-5 text-xs" : "h-8 w-8 text-sm";
  const theme = COLOR_THEMES[config.primaryColor];
  if (config.brandLogo) {
    return (
      <img
        src={config.brandLogo}
        alt={config.brandName}
        className={`${size === "sm" ? "h-5 w-5" : "h-8 w-8"} rounded-full object-cover`}
        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
      />
    );
  }
  return (
    <div className={`${dim} rounded-full ${theme.footerIconBg} flex items-center justify-center text-white font-bold shrink-0`}>
      {config.brandName.charAt(0).toUpperCase()}
    </div>
  );
}

function useMouseTilt(strength = 10) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      setTilt({
        x: ((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) * -strength,
        y: ((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) * strength,
      });
    };
    const onLeave = () => setTilt({ x: 0, y: 0 });
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); };
  }, [strength]);
  return { ref, tilt };
}

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }} className={className}>
      {children}
    </motion.div>
  );
}

function GlassBadge({ icon, label, sub, className }: { icon: React.ReactNode; label: string; sub: string; className: string }) {
  return (
    <motion.div animate={{ y: [0, -7, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      className={`absolute rounded-2xl bg-white/75 backdrop-blur-md border border-white/90 px-4 py-3 shadow-lg ${className}`}>
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">{icon}{label}</div>
      <div className="text-xs text-slate-400 mt-0.5">{sub}</div>
    </motion.div>
  );
}

function BrowserMockup({ config, themeObj }: { config: CafeConfig; themeObj: ReturnType<typeof COLOR_THEMES[keyof typeof COLOR_THEMES]> }) {
  const topItems = config.menuItems.slice(0, 3);
  const { ref, tilt } = useMouseTilt();
  return (
    <div ref={ref} style={{ perspective: "1200px" }} className="relative px-10 py-8">
      <motion.div animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: "spring", stiffness: 180, damping: 22 }}
        style={{ transformStyle: "preserve-3d" }}
        className="rounded-2xl overflow-hidden border border-white/80 bg-white/60 backdrop-blur-xl shadow-[0_32px_64px_rgba(0,0,0,0.12)]">
        <div className="bg-slate-100/80 border-b border-slate-200/60 px-4 py-3 flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-rose-400" />
            <div className="h-3 w-3 rounded-full bg-amber-400" />
            <div className="h-3 w-3 rounded-full bg-emerald-400" />
          </div>
          <div className="flex-1 rounded-md bg-white/80 border border-slate-200/60 px-3 py-1.5 text-xs text-slate-400 text-center">
            landing.mn/p/{config.slugPreview}
          </div>
        </div>
        <div className="bg-white">
          <div className="flex items-center justify-between px-6 py-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <BrandLogo config={config} size="sm" />
              <span className="font-bold text-sm text-slate-900">{config.brandName}</span>
            </div>
            <div className="flex gap-3 text-xs text-slate-500">
              <span>Меню</span><span>Тухай</span><span>Холбоо</span>
            </div>
          </div>
          <div className={`${themeObj.ctaBg} px-6 py-8 text-center text-white`}>
            <div className="text-xs uppercase tracking-widest opacity-75 mb-1">{config.badge}</div>
            <div className="text-lg font-black leading-tight">{config.tagline}<br />{config.taglineHighlight}</div>
            <div className="mt-3 inline-block rounded-xl bg-white px-5 py-1.5 text-xs font-bold" style={{ color: 'inherit' }}>
              Захиалга өгөх →
            </div>
          </div>
          <div className="grid divide-x divide-slate-100 border-t border-slate-100" style={{ gridTemplateColumns: `repeat(${topItems.length}, 1fr)` }}>
            {topItems.map((m) => (
              <div key={m.name} className="p-3 text-center text-xs text-slate-600 flex flex-col items-center gap-1">
                <CafeIcon name={m.icon} size={14} className="text-slate-400" />
                {m.name}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
      <GlassBadge
        icon={<CheckCircle size={14} className="text-emerald-500" />}
        label="Нийтлэгдсэн"
        sub={`landing.mn/p/${config.slugPreview}`}
        className="-left-2 top-14"
      />
      <GlassBadge
        icon={<TrendingUp size={14} className="text-blue-500" />}
        label="284 үзэлт"
        sub="Энэ 7 хоногт"
        className="-right-2 bottom-16"
      />
    </div>
  );
}

export default function CafeAnimatedPage({ config }: { config: CafeConfig }) {
  const theme = COLOR_THEMES[config.primaryColor];
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="min-h-screen bg-stone-50 text-slate-900 font-sans">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
        <div className="mx-auto max-w-7xl px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <BrandLogo config={config} size="md" />
            <span className="font-black text-lg tracking-tight text-slate-900">{config.brandName}</span>
          </div>
          <div className="hidden sm:flex items-center gap-7 text-sm font-medium text-slate-600">
            <a href="#menu" className="hover:text-slate-900 transition">Меню</a>
            <a href="#about" className="hover:text-slate-900 transition">Тухай</a>
            <a href="#contact" className="hover:text-slate-900 transition">Холбоо</a>
          </div>
          <a href="#contact" className={`rounded-xl ${theme.btnBg} ${theme.btnHover} px-4 py-2 text-xs font-bold text-white transition`}>
            Захиалга өгөх
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-[calc(100vh-56px)] flex items-center overflow-hidden bg-stone-50">
        <div className="absolute inset-0 pointer-events-none">
          <div className={`absolute -top-24 -left-24 h-[520px] w-[520px] rounded-full ${theme.blob1} blur-[160px] opacity-20`} />
          <div className={`absolute top-1/3 -right-24 h-[400px] w-[400px] rounded-full ${theme.blob2} blur-[130px] opacity-15`} />
          <div className={`absolute -bottom-16 left-1/3 h-[350px] w-[350px] rounded-full ${theme.blob3} blur-[110px] opacity-25`} />
        </div>
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative mx-auto max-w-7xl px-6 pt-16 pb-20 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                className={`inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur-md border border-white/80 shadow-sm px-4 py-1.5 text-xs font-semibold ${theme.badgeText} mb-6`}>
                <span className={`h-1.5 w-1.5 rounded-full ${theme.badgeDot} animate-pulse`} />
                {config.badge}
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.1 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] text-slate-900">
                {config.tagline}{" "}
                <span className={theme.h1Highlight}>{config.taglineHighlight}</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.2 }}
                className="mt-6 text-lg text-slate-500 leading-relaxed max-w-lg">
                {config.description}
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.3 }}
                className="mt-8 flex flex-wrap gap-3">
                <a href="#menu" className={`group inline-flex items-center gap-2 rounded-xl ${theme.btnBg} ${theme.btnHover} px-6 py-3 text-sm font-semibold text-white transition shadow-sm`}>
                  Меню үзэх <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                </a>
                <a href="#contact" className="inline-flex items-center gap-2 rounded-xl bg-white/70 backdrop-blur-md border border-white/80 px-6 py-3 text-sm font-medium text-slate-700 hover:bg-white transition shadow-sm">
                  Захиалга өгөх
                </a>
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }}
                className="mt-10 flex items-center gap-6 text-sm text-slate-400">
                {config.features.slice(0, 3).map((f) => (
                  <span key={f.title} className="flex items-center gap-1.5">
                    <span className={theme.checkmark}>✓</span> {f.title}
                  </span>
                ))}
              </motion.div>
            </div>
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <BrowserMockup config={config} themeObj={theme} />
            </motion.div>
          </div>
        </motion.div>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-300">
          <div className="text-xs">доош гүйлгэ</div>
          <div className="h-5 w-0.5 bg-stone-200 rounded-full" />
        </motion.div>
      </section>

      {/* Menu */}
      <section id="menu" className="py-24 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <FadeUp className="text-center mb-14">
            <div className={`text-xs font-semibold uppercase tracking-widest ${theme.sectionLabel} mb-3`}>Манай меню</div>
            <h2 className="text-4xl font-black text-slate-900">{config.menuTitle} — <span className={theme.h1Highlight}>{config.menuSubtitle}</span></h2>
          </FadeUp>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {config.menuItems.map((item, i) => (
              <FadeUp key={i} delay={i * 0.07}>
                <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex items-start gap-4">
                  <div className={`h-10 w-10 rounded-xl ${theme.featureBlob} flex items-center justify-center shrink-0`}>
                    <CafeIcon name={item.icon} size={20} className={theme.sectionLabel} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <div className="font-bold text-slate-900">{item.name}</div>
                      <div className={`text-sm font-semibold ${theme.priceText} shrink-0`}>{item.price}</div>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="about" className="py-24 bg-stone-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-full ${theme.featureBlob} blur-[160px] opacity-50`} />
        </div>
        <div className="relative mx-auto max-w-6xl px-6">
          <FadeUp className="text-center mb-14">
            <div className={`text-xs font-semibold uppercase tracking-widest ${theme.sectionLabel} mb-3`}>{config.featuresSubtitle}</div>
            <h2 className="text-4xl font-black text-slate-900">{config.featuresTitle} — <span className={theme.h1Highlight}>туршлага</span></h2>
          </FadeUp>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {config.features.map((f, i) => (
              <FadeUp key={i} delay={i * 0.07}>
                <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                  <div className={`h-10 w-10 rounded-xl ${theme.featureBlob} flex items-center justify-center mb-3`}>
                    <CafeIcon name={f.icon} size={20} className={theme.sectionLabel} />
                  </div>
                  <div className="font-semibold text-slate-900 mb-1.5">{f.title}</div>
                  <div className="text-sm text-slate-500 leading-relaxed">{f.desc}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <FadeUp className="text-center mb-12">
            <h2 className="text-3xl font-black text-slate-900">Үйлчлүүлэгчид юу хэлдэг вэ?</h2>
          </FadeUp>
          <div className="grid gap-4 md:grid-cols-3">
            {config.reviews.map((r, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className="rounded-2xl border border-stone-200 bg-white p-6 hover:shadow-sm transition">
                  <div className={`text-sm ${theme.starsColor} mb-3 tracking-widest`}>★★★★★</div>
                  <div className="text-slate-700 text-sm leading-relaxed mb-4">"{r.text}"</div>
                  <div className="font-semibold text-slate-900 text-sm">{r.name}</div>
                  <div className="text-slate-400 text-xs mt-0.5">{r.role}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Location + Hours */}
      <section className="py-20 bg-stone-50">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-6 md:grid-cols-2">
            <FadeUp>
              <div className="rounded-2xl bg-white border border-stone-200 p-8">
                <div className={`h-10 w-10 rounded-xl ${theme.featureBlob} flex items-center justify-center mb-4`}>
                  <MapPin size={20} className={theme.sectionLabel} />
                </div>
                <div className="font-black text-xl text-slate-900 mb-2">Хаяг</div>
                <div className="text-slate-600 text-sm leading-relaxed">
                  {config.address}<br />
                  <span className="text-slate-400 mt-1 inline-block">{config.addressNote}</span>
                </div>
              </div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <div className="rounded-2xl bg-white border border-stone-200 p-8">
                <div className={`h-10 w-10 rounded-xl ${theme.featureBlob} flex items-center justify-center mb-4`}>
                  <Clock size={20} className={theme.sectionLabel} />
                </div>
                <div className="font-black text-xl text-slate-900 mb-4">Ажлын цаг</div>
                <div className="space-y-2">
                  {config.hours.map((h, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">{h.day}</span>
                      <span className="font-semibold text-slate-900">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className={`py-28 ${theme.ctaBg}`}>
        <FadeUp className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-4xl font-black text-white mb-4">{config.ctaText}</h2>
          <p className="text-white/80 mb-8">{config.ctaSubtext} {config.phone && `Хүргэлт: ${config.phone}`}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {config.phone && (
              <a href={`tel:${config.phone.replace(/-/g, "")}`}
                className={`inline-flex items-center justify-center gap-2 rounded-xl ${theme.ctaBtnBg} ${theme.ctaBtnHover} px-7 py-3.5 text-sm font-bold ${theme.ctaBtnText} transition shadow-sm`}>
                <Phone size={15} /> {config.phone}
              </a>
            )}
            {config.email && (
              <a href={`mailto:${config.email}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/20 hover:bg-white/30 px-7 py-3.5 text-sm font-bold text-white transition shadow-sm">
                <Mail size={15} /> {config.email}
              </a>
            )}
          </div>
        </FadeUp>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white py-10">
        <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <BrandLogo config={config} size="sm" />
            {config.brandName}
          </div>
          <div className="text-xs">Powered by <span className="font-semibold text-blue-600">Landing.mn</span></div>
          <div>© 2026 {config.brandName}</div>
        </div>
      </footer>
    </div>
  );
}
