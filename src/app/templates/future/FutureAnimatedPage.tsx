import { useRef } from "react";
import { motion, useInView } from "motion/react";
import type { FutureConfig } from "./FutureConfig";
import { FUTURE_THEMES } from "./FutureConfig";
import { Phone, Mail, MapPin, Clock, CheckCircle, ArrowRight, LucideIcon } from "lucide-react";
import { ICON_MAP } from "../cafe/CafeIcons";

// ── Helpers ───────────────────────────────────────────────────────────────────

function FtIcon({ name, size = 20, className = "" }: { name: string; size?: number; className?: string }) {
  const Icon = ICON_MAP[name] as LucideIcon | undefined;
  if (!Icon) return <CheckCircle size={size} className={className} />;
  return <Icon size={size} className={className} />;
}

function BrandLogo({ config, size = "md" }: { config: FutureConfig; size?: "sm" | "md" }) {
  const theme = FUTURE_THEMES[config.primaryColor];
  const cls = size === "sm" ? "h-6 w-6 rounded-md text-xs" : "h-9 w-9 rounded-xl text-sm";
  if (config.brandLogo) {
    return <img src={config.brandLogo} alt={config.brandName}
      className={`${size === "sm" ? "h-6 w-6" : "h-9 w-9"} rounded-xl object-cover`}
      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />;
  }
  return (
    <div className={`${cls} bg-gradient-to-br ${theme.accentGradient} flex items-center justify-center text-white font-black shrink-0`}>
      {config.brandName.charAt(0).toUpperCase()}
    </div>
  );
}

function FadeIn({ children, delay = 0, className = "", direction = "up" }: {
  children: React.ReactNode; delay?: number; className?: string; direction?: "up" | "left" | "right" | "none";
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const initial = direction === "up" ? { opacity: 0, y: 32 }
    : direction === "left" ? { opacity: 0, x: -32 }
    : direction === "right" ? { opacity: 0, x: 32 }
    : { opacity: 0 };
  return (
    <motion.div ref={ref} initial={initial} animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }} className={className}>
      {children}
    </motion.div>
  );
}

// ── Hero course card ───────────────────────────────────────────────────────────

function HeroCourseCard({ config, theme }: { config: FutureConfig; theme: ReturnType<typeof FUTURE_THEMES[keyof typeof FUTURE_THEMES]> }) {
  const top = config.courses.slice(0, 3);
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateY: -8 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative"
    >
      {/* Glow behind card */}
      <div className={`absolute inset-0 bg-gradient-to-br ${theme.accentGradient} blur-3xl opacity-20 scale-110 rounded-3xl`} />

      <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        {/* Card header */}
        <div className={`bg-gradient-to-r ${theme.accentGradient} px-6 py-5 text-white`}>
          <div className="text-xs font-semibold uppercase tracking-widest opacity-80 mb-1">Дараагийн эхлэл</div>
          <div className="text-xl font-black">2 долоо хоногийн дараа</div>
          <div className="text-sm opacity-80 mt-0.5">Бүртгэл хаагдах хүртэл</div>
        </div>

        {/* Course list */}
        <div className="divide-y divide-slate-100">
          {top.map((c, i) => (
            <div key={i} className="px-5 py-4 flex items-center gap-3">
              <div className={`h-9 w-9 rounded-xl ${theme.accentBg} flex items-center justify-center shrink-0`}>
                <FtIcon name={c.icon} size={18} className={theme.accentText} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-slate-900 text-sm truncate">{c.name}</div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${theme.levelColor[c.level]}`}>{c.level}</span>
                  <span className="text-xs text-slate-400">{c.duration}</span>
                </div>
              </div>
              <div className={`text-sm font-bold ${theme.accentText} shrink-0`}>{c.price}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="px-5 pb-5 pt-3">
          <a href="#courses"
            className={`flex items-center justify-center gap-2 w-full rounded-2xl bg-gradient-to-r ${theme.accentGradient} px-5 py-3.5 text-sm font-bold text-white shadow-lg`}>
            Бүх хөтөлбөр харах <ArrowRight size={15} />
          </a>
        </div>
      </div>

      {/* Floating badge */}
      <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl border border-slate-100 px-4 py-2.5">
        <div className="text-xs text-slate-500">Нийт төгсөгч</div>
        <div className={`text-xl font-black ${theme.accentText}`}>1,200+</div>
      </motion.div>

      <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3.5, repeat: Infinity, delay: 1, ease: "easeInOut" }}
        className="absolute -bottom-3 -left-4 bg-white rounded-2xl shadow-xl border border-slate-100 px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="text-amber-400 text-sm">★★★★★</span>
          <span className="font-bold text-slate-900 text-sm">4.9</span>
        </div>
        <div className="text-xs text-slate-400">Дундаж үнэлгээ</div>
      </motion.div>
    </motion.div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function FutureAnimatedPage({ config }: { config: FutureConfig }) {
  const theme = FUTURE_THEMES[config.primaryColor];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased">

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <BrandLogo config={config} size="md" />
            <span className="font-black text-base text-slate-900">{config.brandName}</span>
          </div>
          <div className="hidden sm:flex items-center gap-6 text-sm text-slate-500">
            <a href="#courses"  className="hover:text-slate-900 transition">Хөтөлбөрүүд</a>
            <a href="#steps"    className="hover:text-slate-900 transition">Хэрхэн элсэх</a>
            <a href="#team"     className="hover:text-slate-900 transition">Багш нар</a>
            <a href="#contact"  className="hover:text-slate-900 transition">Холбоо</a>
          </div>
          <a href="#contact"
            className={`rounded-xl bg-gradient-to-r ${theme.accentGradient} px-4 py-2 text-xs font-bold text-white shadow-sm`}>
            Бүртгүүлэх
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white pt-16 pb-24">
        {/* Subtle bg dots */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, #e2e8f0 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className={`absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl ${theme.accentGradient} opacity-5 rounded-full blur-3xl pointer-events-none`} />

        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                className={`inline-flex items-center gap-2 rounded-full ${theme.accentBg} border ${theme.accentBorder} px-4 py-1.5 text-xs font-semibold ${theme.badgeText} mb-6`}>
                {config.badge}
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.1 }}
                className="text-5xl sm:text-6xl font-black tracking-tight leading-[1.05] text-slate-900 mb-6">
                {config.tagline}{" "}
                <span className={`bg-gradient-to-r ${theme.accentGradient} bg-clip-text text-transparent`}>
                  {config.taglineHighlight}
                </span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-slate-500 leading-relaxed mb-8">
                {config.description}
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap gap-3 mb-10">
                <a href="#courses"
                  className={`inline-flex items-center gap-2 rounded-xl bg-gradient-to-r ${theme.accentGradient} px-6 py-3.5 text-sm font-bold text-white shadow-lg`}>
                  Хөтөлбөр харах <ArrowRight size={15} />
                </a>
                <a href="#contact"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 hover:border-slate-300 transition">
                  Асуулт байна уу?
                </a>
              </motion.div>

              {/* Quick stats */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-wrap gap-6">
                {config.stats.slice(0, 3).map((s) => (
                  <div key={s.label}>
                    <div className={`text-2xl font-black ${theme.accentText}`}>{s.num}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: Course card */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="w-full max-w-sm">
                <HeroCourseCard config={config} theme={theme} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COURSES ── */}
      <section id="courses" className="py-24 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn className="text-center mb-14">
            <div className={`text-xs font-bold uppercase tracking-widest ${theme.badgeText} mb-3`}>{config.coursesSubtitle}</div>
            <h2 className="text-4xl font-black text-slate-900">{config.coursesTitle}</h2>
          </FadeIn>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {config.courses.map((c, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <div className={`relative rounded-2xl border-2 p-6 flex flex-col h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                  c.highlight
                    ? `${theme.accentBorder} shadow-md`
                    : "border-slate-100 hover:border-slate-200"
                }`}>
                  {c.highlight && (
                    <div className={`absolute -top-3 left-5 text-xs font-bold bg-gradient-to-r ${theme.accentGradient} text-white px-3 py-1 rounded-full shadow`}>
                      Хамгийн алдартай
                    </div>
                  )}

                  {/* Icon + level */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`h-12 w-12 rounded-2xl ${theme.accentBg} flex items-center justify-center`}>
                      <FtIcon name={c.icon} size={24} className={theme.accentText} />
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${theme.levelColor[c.level]}`}>
                      {c.level}
                    </span>
                  </div>

                  <div className="font-black text-slate-900 text-lg leading-tight mb-1">{c.name}</div>
                  <div className="text-sm text-slate-500 leading-relaxed flex-1 mb-4">{c.desc}</div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Clock size={12} /> {c.duration}
                    </div>
                    <div className={`font-black text-base ${c.highlight ? theme.accentText : "text-slate-900"}`}>
                      {c.price}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── STEPS ── */}
      <section id="steps" className={`py-24 bg-gradient-to-b from-slate-50 to-white`}>
        <div className="mx-auto max-w-5xl px-6">
          <FadeIn className="text-center mb-14">
            <h2 className="text-4xl font-black text-slate-900">{config.stepsTitle}</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {config.steps.map((step, i) => (
              <FadeIn key={i} delay={i * 0.1} direction="up">
                <div className="relative text-center">
                  {/* Connector line */}
                  {i < config.steps.length - 1 && (
                    <div className="hidden lg:block absolute top-7 left-1/2 w-full h-px bg-slate-200" />
                  )}
                  <div className="relative inline-flex">
                    <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${theme.accentGradient} flex items-center justify-center text-white font-black text-xl shadow-lg mx-auto mb-4`}>
                      {i + 1}
                    </div>
                  </div>
                  <div className="font-black text-slate-900 mb-2">{step.title}</div>
                  <div className="text-sm text-slate-500 leading-relaxed">{step.desc}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className={`py-16 bg-gradient-to-r ${theme.accentGradient}`}>
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {config.stats.map((s, i) => (
              <FadeIn key={i} delay={i * 0.1} direction="none">
                <div className="text-4xl sm:text-5xl font-black text-white mb-1">{s.num}</div>
                <div className="text-sm text-white/80 font-medium">{s.label}</div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSTRUCTORS ── */}
      {config.instructors.length > 0 && (
        <section id="team" className="py-24 bg-white">
          <div className="mx-auto max-w-5xl px-6">
            <FadeIn className="text-center mb-12">
              <h2 className="text-3xl font-black text-slate-900">{config.instructorsTitle}</h2>
            </FadeIn>
            <div className="grid sm:grid-cols-3 gap-6">
              {config.instructors.map((inst, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 text-center hover:shadow-md hover:-translate-y-0.5 transition-all">
                    <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${theme.accentGradient} flex items-center justify-center text-white font-black text-2xl mx-auto mb-4 shadow-lg`}>
                      {inst.name.charAt(0)}
                    </div>
                    <div className="font-black text-slate-900 text-base">{inst.name}</div>
                    <div className={`text-sm font-semibold ${theme.accentText} mt-0.5`}>{inst.subject}</div>
                    <div className="text-xs text-slate-400 mt-2 flex items-center justify-center gap-1">
                      <Clock size={11} /> {inst.exp} туршлагатай
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── TESTIMONIALS ── */}
      {config.testimonials.length > 0 && (
        <section className="py-20 bg-slate-50">
          <div className="mx-auto max-w-5xl px-6">
            <FadeIn className="text-center mb-12">
              <h2 className="text-3xl font-black text-slate-900">Төгсөгчид юу хэлдэг вэ?</h2>
            </FadeIn>
            <div className="grid gap-5 md:grid-cols-3">
              {config.testimonials.map((t, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-amber-400 text-sm mb-3 tracking-widest">★★★★★</div>
                    <div className="text-slate-700 text-sm leading-relaxed mb-5">"{t.text}"</div>
                    <div className="border-t border-slate-100 pt-4">
                      <div className="font-bold text-slate-900 text-sm">{t.name}</div>
                      <div className={`text-xs font-semibold ${theme.accentText} mt-0.5`}>{t.result}</div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA + CONTACT ── */}
      <section id="contact" className="py-24 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: CTA */}
            <FadeIn direction="left">
              <h2 className="text-4xl font-black text-slate-900 leading-tight mb-4">{config.ctaText}</h2>
              <p className="text-slate-500 leading-relaxed mb-8">{config.ctaSubtext}</p>
              <div className="flex flex-col gap-3">
                {config.phone && (
                  <a href={`tel:${config.phone}`}
                    className={`inline-flex items-center gap-3 rounded-xl bg-gradient-to-r ${theme.accentGradient} px-6 py-4 text-sm font-bold text-white w-fit shadow-lg`}>
                    <Phone size={16} /> {config.phone}
                  </a>
                )}
                {config.email && (
                  <a href={`mailto:${config.email}`}
                    className="inline-flex items-center gap-3 rounded-xl border-2 border-slate-200 bg-white px-6 py-4 text-sm font-semibold text-slate-700 hover:border-slate-300 transition w-fit">
                    <Mail size={16} /> {config.email}
                  </a>
                )}
              </div>
            </FadeIn>

            {/* Right: Info card */}
            <FadeIn direction="right">
              <div className={`rounded-2xl bg-gradient-to-br from-slate-50 to-white border-2 ${theme.accentBorder} p-8 shadow-sm`}>
                <div className="space-y-5">
                  {config.address && (
                    <div className="flex items-start gap-3">
                      <div className={`h-9 w-9 rounded-xl ${theme.accentBg} flex items-center justify-center shrink-0 mt-0.5`}>
                        <MapPin size={16} className={theme.accentText} />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm">Байршил</div>
                        <div className="text-sm text-slate-500 mt-0.5">{config.address}</div>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-3">
                    <div className={`h-9 w-9 rounded-xl ${theme.accentBg} flex items-center justify-center shrink-0 mt-0.5`}>
                      <Clock size={16} className={theme.accentText} />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-sm">Ажлын цаг</div>
                      <div className="text-sm text-slate-500 mt-0.5">Даваа – Баасан: 09:00 – 18:00</div>
                    </div>
                  </div>
                  <div className={`rounded-xl bg-gradient-to-r ${theme.accentGradient} p-4 text-white text-sm font-semibold text-center`}>
                    🎁 Эхний 7 хоногийн хичээл үнэгүй!
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-slate-100 bg-slate-50 py-8">
        <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400">
          <div className="flex items-center gap-2 font-black text-slate-900">
            <BrandLogo config={config} size="sm" />
            {config.brandName}
          </div>
          <div className="text-xs">Powered by <span className="font-semibold text-blue-600">Landing.mn</span></div>
          <div className="text-xs">© 2026 {config.brandName}</div>
        </div>
      </footer>
    </div>
  );
}
