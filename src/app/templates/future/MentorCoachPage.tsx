import { useRef } from "react";
import { motion, useInView } from "motion/react";
import type { FutureConfig } from "./FutureConfig";

// ── Helpers ────────────────────────────────────────────────────────────────────

function FadeIn({
  children,
  delay = 0,
  className = "",
  direction = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right" | "none";
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const initial =
    direction === "up"    ? { opacity: 0, y: 32 }
    : direction === "left"  ? { opacity: 0, x: -32 }
    : direction === "right" ? { opacity: 0, x: 32 }
    : { opacity: 0 };
  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const LEVEL_COLORS: Record<string, string> = {
  "Эхлэгч": "bg-emerald-900/50 text-emerald-400",
  "Дунд":   "bg-amber-900/50 text-amber-400",
  "Ахисан": "bg-rose-900/50 text-rose-400",
};

// ── Main ───────────────────────────────────────────────────────────────────────

export default function MentorCoachPage({ config }: { config: FutureConfig }) {
  const courses      = config.courses      ?? [];
  const steps        = config.steps        ?? [];
  const stats        = config.stats        ?? [];
  const instructors  = config.instructors  ?? [];
  const testimonials = config.testimonials ?? [];

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans antialiased">

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-800">
        <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {/* Cyan logo box */}
            <div className="h-9 w-9 rounded-xl bg-cyan-400 flex items-center justify-center text-black font-black text-sm shrink-0">
              {config.brandName.charAt(0).toUpperCase()}
            </div>
            <span className="font-black text-base text-white">{config.brandName}</span>
          </div>

          <div className="hidden sm:flex items-center gap-6 text-sm text-slate-400">
            <a href="#courses"      className="hover:text-white transition">Хөтөлбөрүүд</a>
            <a href="#steps"        className="hover:text-white transition">Алхамууд</a>
            <a href="#team"         className="hover:text-white transition">Багш нар</a>
            <a href="#testimonials" className="hover:text-white transition">Сэтгэгдэл</a>
            <a href="#contact"      className="hover:text-white transition">Холбоо</a>
          </div>

          <a
            href="#contact"
            className="bg-cyan-400 text-black text-xs font-black px-4 py-2 rounded-xl hover:bg-cyan-300 transition"
          >
            Бүртгүүлэх
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Decorative blurs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-6xl px-6 py-20 w-full">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center gap-2 bg-cyan-900/50 border border-cyan-800 text-cyan-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-6"
          >
            ⚡ Шилдэг сургагч
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="text-6xl lg:text-7xl font-black tracking-tight leading-[1.0] text-white mb-6"
          >
            {config.brandName}
            <br />
            <span className="text-cyan-400">{config.taglineHighlight ?? ""}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-slate-300 leading-relaxed mb-8 max-w-xl"
          >
            {config.description ?? ""}
          </motion.p>

          {/* Inline stats */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-3 mb-8"
          >
            {stats.slice(0, 3).map((s, i) => (
              <span
                key={i}
                className="bg-slate-800 border border-slate-700 text-sm font-semibold text-white px-4 py-2 rounded-full"
              >
                <span className="text-cyan-400 font-black">{s.num}</span>{" "}
                <span className="text-slate-300">{s.label}</span>
              </span>
            ))}
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-3"
          >
            <a
              href="#courses"
              className="inline-flex items-center gap-2 bg-cyan-400 text-black text-sm font-black px-6 py-3.5 rounded-xl hover:bg-cyan-300 transition shadow-lg shadow-cyan-400/20"
            >
              Хөтөлбөр харах →
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 border-2 border-cyan-400/50 text-cyan-400 text-sm font-semibold px-6 py-3.5 rounded-xl hover:border-cyan-400 transition"
            >
              Холбоо барих
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── COURSES ── */}
      <section id="courses" className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn className="mb-14">
            <div className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-2">
              {config.coursesSubtitle ?? ""}
            </div>
            <h2 className="text-4xl font-black text-white">{config.coursesTitle ?? "Хөтөлбөрүүд"}</h2>
          </FadeIn>

          {/* Horizontal scroll cards */}
          <div className="flex gap-4 overflow-x-auto pb-4">
            {courses.map((c, i) => (
              <FadeIn key={i} delay={i * 0.07} className="min-w-72 shrink-0">
                <div
                  className={`bg-slate-800 border rounded-2xl p-6 h-full flex flex-col relative ${
                    c.highlight ? "border-cyan-400/50 shadow-lg shadow-cyan-400/10" : "border-slate-700"
                  }`}
                >
                  {c.highlight && (
                    <div className="absolute -top-3 left-5 text-xs font-bold bg-cyan-400 text-black px-3 py-1 rounded-full">
                      Хамгийн алдартай
                    </div>
                  )}
                  {/* Course number top-right */}
                  <div className="text-4xl font-black text-slate-600 text-right mb-2">
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  <div className="font-black text-white text-lg leading-tight mb-3 flex-1">
                    {c.name}
                  </div>

                  <p className="text-sm text-slate-400 leading-relaxed mb-4">{c.desc ?? ""}</p>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-cyan-900/50 text-cyan-400 text-xs font-semibold px-2.5 py-1 rounded-full">
                      {c.duration}
                    </span>
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        LEVEL_COLORS[c.level] ?? "bg-slate-700 text-slate-300"
                      }`}
                    >
                      {c.level}
                    </span>
                  </div>

                  <div className="font-black text-lg text-white">{c.price}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── STEPS / PROCESS ── */}
      <section id="steps" className="py-24">
        <div className="mx-auto max-w-3xl px-6">
          <FadeIn className="mb-14">
            <h2 className="text-4xl font-black text-white">{config.stepsTitle ?? "Элсэх алхамууд"}</h2>
          </FadeIn>

          <div className="flex flex-col gap-0">
            {steps.map((step, i) => (
              <FadeIn key={i} delay={i * 0.1} direction="left">
                <div className="flex gap-6 relative pb-10 last:pb-0">
                  {/* Vertical line */}
                  {i < steps.length - 1 && (
                    <div className="absolute left-6 top-12 bottom-0 w-px bg-cyan-400/20" />
                  )}
                  {/* Cyan dot + number */}
                  <div className="shrink-0 ml-0 flex flex-col items-center">
                    <div className="h-12 w-12 rounded-xl bg-cyan-400/10 border border-cyan-400/40 flex items-center justify-center text-cyan-400 font-black text-lg">
                      {i + 1}
                    </div>
                  </div>
                  {/* Content */}
                  <div className="pt-2">
                    <div className="font-black text-white text-lg mb-1">{step.title}</div>
                    <div className="text-sm text-slate-400 leading-relaxed">{step.desc ?? ""}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="py-16 bg-slate-800/50 border-y border-slate-700">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {stats.map((s, i) => (
              <FadeIn key={i} delay={i * 0.1} direction="none">
                <div className="text-4xl sm:text-5xl font-black text-cyan-400 mb-1">{s.num}</div>
                <div className="text-sm text-white font-medium">{s.label}</div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSTRUCTORS ── */}
      {instructors.length > 0 && (
        <section id="team" className="py-24">
          <div className="mx-auto max-w-5xl px-6">
            <FadeIn className="mb-12">
              <h2 className="text-3xl font-black text-white">
                {config.instructorsTitle ?? "Манай багш нар"}
              </h2>
            </FadeIn>
            <div className="grid sm:grid-cols-3 gap-6">
              {instructors.map((inst, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 text-center hover:border-slate-600 hover:-translate-y-0.5 transition-all">
                    {/* Avatar circle */}
                    <div className="h-16 w-16 rounded-full bg-cyan-900 border-2 border-cyan-800 flex items-center justify-center text-white font-black text-2xl mx-auto mb-4">
                      {inst.name.charAt(0)}
                    </div>
                    <div className="font-black text-white text-base">{inst.name}</div>
                    <div className="text-sm font-semibold text-cyan-400 mt-0.5">{inst.subject}</div>
                    <div className="text-xs text-slate-300 mt-2">{inst.exp} туршлагатай</div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── TESTIMONIALS ── */}
      {testimonials.length > 0 && (
        <section id="testimonials" className="py-24 bg-slate-800/30">
          <div className="mx-auto max-w-5xl px-6">
            <FadeIn className="mb-12">
              <h2 className="text-3xl font-black text-white">Төгсөгчид юу хэлдэг вэ?</h2>
            </FadeIn>
            <div className="grid gap-5 md:grid-cols-3">
              {testimonials.map((t, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 hover:border-slate-600 transition-colors">
                    {/* Cyan quote mark */}
                    <div className="text-4xl text-cyan-400 leading-none mb-3">"</div>
                    <div className="text-slate-300 text-sm leading-relaxed mb-5">{t.text}</div>
                    <div className="border-t border-slate-700 pt-4">
                      <div className="font-bold text-white text-sm">{t.name}</div>
                      <div className="text-xs font-semibold text-cyan-400/70 mt-0.5">{t.result}</div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section id="contact" className="py-24">
        <div className="mx-auto max-w-4xl px-6">
          <FadeIn>
            <div className="bg-cyan-400/10 border border-cyan-400/20 rounded-3xl p-12 md:p-16 text-center">
              <h2 className="text-4xl font-black text-white mb-4">{config.ctaText ?? ""}</h2>
              <p className="text-slate-300 leading-relaxed mb-8 max-w-lg mx-auto">
                {config.ctaSubtext ?? ""}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {config.phone && (
                  <a
                    href={`tel:${config.phone}`}
                    className="inline-flex items-center gap-2 bg-cyan-400 text-black text-sm font-black px-8 py-4 rounded-xl hover:bg-cyan-300 transition shadow-lg shadow-cyan-400/20"
                  >
                    📞 {config.phone}
                  </a>
                )}
                {config.email && (
                  <a
                    href={`mailto:${config.email}`}
                    className="inline-flex items-center gap-2 border border-slate-700 text-slate-300 text-sm font-semibold px-8 py-4 rounded-xl hover:border-slate-500 hover:text-white transition"
                  >
                    ✉ {config.email}
                  </a>
                )}
              </div>
              {config.address && (
                <p className="mt-6 text-sm text-slate-500">
                  📍 {config.address}
                </p>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-slate-900 border-t border-slate-800 py-8">
        <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
          <div className="flex items-center gap-2 font-black text-white">
            <div className="h-6 w-6 rounded-md bg-cyan-400 flex items-center justify-center text-black text-xs font-black">
              {config.brandName.charAt(0).toUpperCase()}
            </div>
            {config.brandName}
          </div>
          <div className="text-xs text-slate-500">
            Powered by <span className="font-semibold text-cyan-400">Landing.mn</span>
          </div>
          <div className="text-xs text-slate-500">© 2026 {config.brandName}</div>
        </div>
      </footer>

    </div>
  );
}
