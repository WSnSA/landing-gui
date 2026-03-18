import { useRef } from "react";
import { motion, useInView } from "motion/react";
import type { HyperdriveConfig } from "./HyperdriveConfig";
import { HYPERDRIVE_THEMES } from "./HyperdriveConfig";
import { MapPin, Clock, Phone, Mail, Zap, CheckCircle, LucideIcon } from "lucide-react";
import { ICON_MAP } from "../cafe/CafeIcons";

// ── Helpers ───────────────────────────────────────────────────────────────────

function HdIcon({ name, size = 20, className = "" }: { name: string; size?: number; className?: string }) {
  const Icon = ICON_MAP[name] as LucideIcon | undefined;
  if (!Icon) return <Zap size={size} className={className} />;
  return <Icon size={size} className={className} />;
}

function BrandLogo({ config, size = "md" }: { config: HyperdriveConfig; size?: "sm" | "md" }) {
  const theme = HYPERDRIVE_THEMES[config.primaryColor];
  const cls = size === "sm" ? "h-6 w-6 rounded-md text-xs" : "h-9 w-9 rounded-lg text-sm";
  if (config.brandLogo) {
    return <img src={config.brandLogo} alt={config.brandName}
      className={`${size === "sm" ? "h-6 w-6" : "h-9 w-9"} rounded-lg object-cover`}
      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />;
  }
  return (
    <div className={`${cls} ${theme.accent} flex items-center justify-center text-white font-black shrink-0`}>
      {config.brandName.charAt(0).toUpperCase()}
    </div>
  );
}

function FadeIn({ children, delay = 0, className = "", direction = "up" }: {
  children: React.ReactNode; delay?: number; className?: string; direction?: "up" | "left" | "right" | "none";
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const initial = direction === "up" ? { opacity: 0, y: 40 }
    : direction === "left" ? { opacity: 0, x: -40 }
    : direction === "right" ? { opacity: 0, x: 40 }
    : { opacity: 0 };
  return (
    <motion.div ref={ref} initial={initial} animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }} className={className}>
      {children}
    </motion.div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function HyperdriveAnimatedPage({ config }: { config: HyperdriveConfig }) {
  const theme = HYPERDRIVE_THEMES[config.primaryColor];

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans antialiased">

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/95 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <BrandLogo config={config} size="md" />
            <span className="font-black text-base tracking-tight">{config.brandName}</span>
          </div>
          <div className="hidden sm:flex items-center gap-6 text-sm text-zinc-400">
            <a href="#services" className="hover:text-white transition">Сургалт</a>
            <a href="#about" className="hover:text-white transition">Тухай</a>
            <a href="#team" className="hover:text-white transition">Багш</a>
            <a href="#contact" className="hover:text-white transition">Холбоо</a>
          </div>
          <a href="#contact"
            className={`rounded-lg ${theme.accent} ${theme.accentHover} px-4 py-2 text-xs font-bold text-white transition`}>
            Бүртгүүлэх →
          </a>
        </div>
      </nav>

      {/* ── HERO: full-screen, no mockup ── */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-zinc-950">
          <div className="absolute inset-0"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
          <div className={`absolute top-0 left-0 right-0 h-px ${theme.accent} opacity-60`} />
          {/* Diagonal accent line */}
          <div className={`absolute -top-20 -left-20 w-[140%] h-[3px] ${theme.accent} opacity-10 rotate-6`} />
          <div className={`absolute top-1/3 right-0 h-[400px] w-[400px] rounded-full ${theme.accentBg} blur-[140px] opacity-40`} />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 pt-12 pb-16 w-full">
          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className={`inline-flex items-center gap-2 mb-8 rounded-full border ${theme.accentBorder} ${theme.accentBg} px-4 py-1.5 text-xs font-semibold ${theme.accentText}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${theme.accent} animate-pulse`} />
            {config.badge}
          </motion.div>

          {/* Giant headline */}
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-6xl sm:text-7xl lg:text-[88px] font-black tracking-tight leading-[0.95] mb-8 max-w-4xl">
            {config.tagline}
            <br />
            <span className={theme.highlight}>{config.taglineHighlight}</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-zinc-400 leading-relaxed max-w-xl mb-10">
            {config.description}
          </motion.p>

          {/* CTA row */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-3 mb-16">
            <a href="#services"
              className={`inline-flex items-center gap-2 rounded-xl ${theme.accent} ${theme.accentHover} px-7 py-3.5 text-sm font-bold text-white transition shadow-lg`}>
              Сургалтын багцууд харах
              <span className="text-base leading-none">→</span>
            </a>
            {config.phone && (
              <a href={`tel:${config.phone}`}
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 px-7 py-3.5 text-sm font-semibold text-zinc-200 transition">
                <Phone size={14} /> {config.phone}
              </a>
            )}
          </motion.div>

          {/* Feature checkmarks strip */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap gap-x-8 gap-y-3">
            {config.features.slice(0, 4).map((f) => (
              <span key={f.title} className="flex items-center gap-2 text-sm text-zinc-400">
                <CheckCircle size={14} className={theme.accentText} />
                {f.title}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Bottom border accent */}
        <div className={`absolute bottom-0 left-0 right-0 h-px ${theme.accent} opacity-20`} />
      </section>

      {/* ── SERVICES: large bold rows ── */}
      <section id="services" className="bg-zinc-900">
        {/* Header */}
        <div className={`border-b border-white/10 ${theme.accentBg}`}>
          <div className="mx-auto max-w-6xl px-6 py-10">
            <FadeIn>
              <div className={`text-xs font-bold uppercase tracking-widest ${theme.accentText} mb-2`}>
                {config.servicesSubtitle}
              </div>
              <h2 className="text-3xl font-black text-white">{config.servicesTitle}</h2>
            </FadeIn>
          </div>
        </div>

        {/* Service rows */}
        <div className="divide-y divide-white/5">
          {config.services.map((svc, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div className={`mx-auto max-w-6xl px-6 py-6 flex items-center gap-6 group hover:${theme.accentBg} transition-colors duration-200 ${svc.highlight ? theme.accentBg : ""}`}>
                {/* Index */}
                <div className={`text-4xl font-black tabular-nums ${svc.highlight ? theme.accentText : "text-zinc-800"} shrink-0 w-10 text-right`}>
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* Icon */}
                <div className={`h-12 w-12 rounded-xl ${theme.accentBg} border ${theme.accentBorder} flex items-center justify-center shrink-0`}>
                  <HdIcon name={svc.icon} size={22} className={theme.accentText} />
                </div>

                {/* Name + desc */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-black text-white text-lg">{svc.name}</span>
                    {svc.highlight && (
                      <span className={`text-[10px] font-bold uppercase tracking-wide ${theme.accent} text-white px-2 py-0.5 rounded-full`}>
                        Алдартай
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-zinc-500 mt-0.5 leading-relaxed">{svc.desc}</div>
                </div>

                {/* Duration */}
                <div className="shrink-0 text-right hidden sm:block">
                  <div className="flex items-center gap-1 text-xs text-zinc-500 justify-end">
                    <Clock size={11} /> {svc.duration}
                  </div>
                </div>

                {/* Price */}
                <div className={`shrink-0 text-right font-black text-xl ${svc.highlight ? theme.accentText : "text-white"}`}>
                  {svc.price}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── STATS strip ── */}
      <section className={`${theme.accentBg} border-y ${theme.accentBorder}`}>
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {[
              { num: "500+", label: "Сурагч" },
              { num: "3", label: "Instructor" },
              { num: "10+", label: "Жилийн туршлага" },
              { num: "100%", label: "Аюулгүй" },
            ].map((s, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className={`text-4xl sm:text-5xl font-black ${theme.highlight} mb-1`}>{s.num}</div>
                <div className="text-sm text-zinc-400 font-medium">{s.label}</div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES: icon + text list ── */}
      <section id="about" className="py-24 bg-zinc-950">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn className="mb-14">
            <h2 className="text-4xl font-black text-white">{config.featuresTitle}</h2>
          </FadeIn>

          <div className="grid sm:grid-cols-2 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/10">
            {config.features.map((f, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className="bg-zinc-950 p-8 flex gap-5 hover:bg-zinc-900 transition-colors">
                  <div className={`h-12 w-12 rounded-xl ${theme.accent} flex items-center justify-center shrink-0 shadow-lg`}>
                    <HdIcon name={f.icon} size={22} className="text-white" />
                  </div>
                  <div>
                    <div className="font-black text-white text-base mb-1.5">{f.title}</div>
                    <div className="text-sm text-zinc-500 leading-relaxed">{f.desc}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSTRUCTORS ── */}
      {config.instructors.length > 0 && (
        <section id="team" className="py-20 bg-zinc-900 border-t border-white/5">
          <div className="mx-auto max-w-6xl px-6">
            <FadeIn className="mb-12">
              <div className={`text-xs font-bold uppercase tracking-widest ${theme.accentText} mb-2`}>Манай баг</div>
              <h2 className="text-3xl font-black text-white">Instructor нар</h2>
            </FadeIn>

            <div className="grid sm:grid-cols-3 gap-4">
              {config.instructors.map((inst, i) => (
                <FadeIn key={i} delay={i * 0.1} direction="up">
                  <div className={`rounded-2xl border border-white/10 bg-zinc-950 overflow-hidden hover:border-white/20 hover:${theme.accentBorder} transition-all`}>
                    {/* Top bar */}
                    <div className={`h-2 w-full ${theme.accent}`} />
                    <div className="p-6">
                      <div className={`h-16 w-16 rounded-2xl ${theme.accent} flex items-center justify-center text-white font-black text-2xl mb-4 shadow-lg`}>
                        {inst.name.charAt(0)}
                      </div>
                      <div className="font-black text-white text-lg leading-tight">{inst.name}</div>
                      <div className={`text-sm font-semibold ${theme.accentText} mt-1`}>{inst.role}</div>
                      <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-1.5 text-xs text-zinc-500">
                        <Clock size={11} /> {inst.exp} туршлагатай
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CONTACT: 2-col ── */}
      <section id="contact" className="py-20 bg-zinc-950 border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left: CTA */}
            <FadeIn direction="left">
              <div className={`text-xs font-bold uppercase tracking-widest ${theme.accentText} mb-4`}>Холбоо барих</div>
              <h2 className="text-4xl font-black text-white leading-tight mb-4">{config.ctaText}</h2>
              <p className="text-zinc-400 mb-8 leading-relaxed">{config.ctaSubtext}</p>
              <div className="flex flex-col gap-3">
                {config.phone && (
                  <a href={`tel:${config.phone}`}
                    className={`inline-flex items-center gap-3 rounded-xl ${theme.accent} ${theme.accentHover} px-6 py-4 text-sm font-bold text-white transition w-fit`}>
                    <Phone size={16} /> {config.phone}
                  </a>
                )}
                {config.email && (
                  <a href={`mailto:${config.email}`}
                    className="inline-flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 px-6 py-4 text-sm font-semibold text-zinc-200 transition w-fit">
                    <Mail size={16} /> {config.email}
                  </a>
                )}
              </div>
            </FadeIn>

            {/* Right: Address + Hours */}
            <FadeIn direction="right">
              <div className="space-y-6">
                {/* Address */}
                <div className="rounded-2xl border border-white/10 bg-zinc-900 p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin size={16} className={theme.accentText} />
                    <span className="font-bold text-white text-sm">Байршил</span>
                  </div>
                  <div className="text-zinc-400 text-sm leading-relaxed">
                    {config.address}
                    {config.addressNote && (
                      <><br /><span className="text-zinc-600">{config.addressNote}</span></>
                    )}
                  </div>
                </div>

                {/* Hours */}
                <div className="rounded-2xl border border-white/10 bg-zinc-900 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock size={16} className={theme.accentText} />
                    <span className="font-bold text-white text-sm">Ажлын цаг</span>
                  </div>
                  <div className="space-y-2.5">
                    {config.hours.map((h, i) => (
                      <div key={i} className="flex items-center justify-between text-sm">
                        <span className="text-zinc-400">{h.day}</span>
                        <span className={`font-bold ${theme.accentText}`}>{h.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/10 bg-zinc-900 py-8">
        <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-600">
          <div className="flex items-center gap-2 font-black text-white text-sm">
            <BrandLogo config={config} size="sm" />
            {config.brandName}
          </div>
          <div className="text-xs">Powered by <span className="font-semibold text-blue-500">Landing.mn</span></div>
          <div className="text-xs">© 2026 {config.brandName}</div>
        </div>
      </footer>
    </div>
  );
}
