import { useRef, useState } from "react";
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
    direction === "up"
      ? { opacity: 0, y: 32 }
      : direction === "left"
      ? { opacity: 0, x: -32 }
      : direction === "right"
      ? { opacity: 0, x: 32 }
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

const CERT_EMOJIS = ["🏆", "📜", "🎖️", "🥇"];
const COURSE_EMOJIS = ["💻", "📱", "📊", "✨", "🌍", "📈"];

// ── Terminal card ──────────────────────────────────────────────────────────────

function TerminalCard({ config }: { config: FutureConfig }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="bg-zinc-950 border border-zinc-700 rounded-xl p-6 font-mono text-sm shadow-2xl"
    >
      {/* Terminal top bar */}
      <div className="flex items-center gap-2 mb-5 pb-4 border-b border-zinc-800">
        <div className="w-3 h-3 rounded-full bg-red-500/70" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <div className="w-3 h-3 rounded-full bg-green-500/70" />
        <span className="ml-2 text-zinc-500 text-xs">academy.sh</span>
      </div>

      {/* Terminal lines */}
      <div className="space-y-2.5">
        <div className="text-zinc-500"># {config.brandName} — overview</div>
        {config.stats.slice(0, 4).map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-zinc-600">&gt;</span>
            <span className="text-zinc-400">{s.label.toLowerCase()}:</span>
            <span className="text-green-400 font-bold">{s.num}</span>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <span className="text-zinc-600">&gt;</span>
          <span className="text-zinc-400">courses available:</span>
          <span className="text-green-400 font-bold">{config.courses?.length ?? 0}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-zinc-600">&gt;</span>
          <span className="text-zinc-400">instructors:</span>
          <span className="text-green-400 font-bold">{config.instructors?.length ?? 0}</span>
        </div>
        {/* Blinking cursor line */}
        <div className="flex items-center gap-2 mt-3">
          <span className="text-zinc-600">&gt;</span>
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="inline-block w-2.5 h-4 bg-green-400"
          />
        </div>
      </div>
    </motion.div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────────

export default function SlateAcademyPage({ config }: { config: FutureConfig }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 font-sans antialiased">

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 bg-zinc-950 border-b border-zinc-800">
        <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Monospace logo box */}
            <div className="bg-zinc-800 rounded px-2 py-1 font-mono text-zinc-100 text-sm font-bold tracking-wider">
              [{config.brandName?.charAt(0) ?? "A"}]
            </div>
            <span className="font-black text-zinc-100">{config.brandName}</span>
          </div>
          <div className="hidden sm:flex items-center gap-6 text-sm text-zinc-500">
            <a href="#curriculum" className="hover:text-zinc-200 transition">Хөтөлбөр</a>
            <a href="#certs" className="hover:text-zinc-200 transition">Гэрчилгээ</a>
            <a href="#team" className="hover:text-zinc-200 transition">Багш нар</a>
            <a href="#contact" className="hover:text-zinc-200 transition">Холбоо</a>
          </div>
          <a
            href="#contact"
            className="border border-zinc-600 text-zinc-200 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-zinc-800 transition"
          >
            Эхлэх
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-[80vh] bg-zinc-900 flex items-center py-20">
        <div className="mx-auto max-w-6xl px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="font-mono text-zinc-500 text-xs uppercase tracking-widest mb-5"
              >
                // CERTIFICATION PROGRAM
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.1 }}
                className="text-5xl lg:text-7xl font-black leading-[1.0] text-zinc-100 mb-4"
              >
                {config.brandName}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-zinc-400 mb-2"
              >
                {config.tagline}{" "}
                <span className="text-amber-600 font-bold">{config.taglineHighlight}</span>
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="text-zinc-400 leading-relaxed mb-10 max-w-lg"
              >
                {config.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="flex flex-wrap gap-4"
              >
                <a
                  href="#contact"
                  className="bg-amber-600 text-black font-bold text-sm px-6 py-3 rounded-lg hover:bg-amber-500 transition"
                >
                  Одоо элсэх
                </a>
                <a
                  href="#curriculum"
                  className="bg-zinc-700 text-zinc-200 font-semibold text-sm px-6 py-3 rounded-lg hover:bg-zinc-600 transition"
                >
                  Хөтөлбөр харах
                </a>
              </motion.div>
            </div>

            {/* Right: Terminal */}
            <div className="relative">
              <TerminalCard config={config} />
            </div>
          </div>
        </div>
      </section>

      {/* ── CURRICULUM ACCORDION ── */}
      <section id="curriculum" className="py-24 bg-zinc-900">
        <div className="mx-auto max-w-4xl px-6">
          <FadeIn className="mb-12">
            <div className="font-mono text-amber-600 text-xs uppercase tracking-widest mb-2">// 01</div>
            <h2 className="text-3xl font-black text-zinc-100">Хөтөлбөр</h2>
          </FadeIn>

          <div className="border-t border-zinc-800">
            {config.courses.map((course, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className="border-b border-zinc-800">
                  <button
                    onClick={() => setOpenIdx(openIdx === i ? null : i)}
                    className="w-full py-5 flex items-center justify-between gap-4 text-left hover:bg-zinc-800/30 px-2 rounded transition"
                  >
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <span className="font-mono text-amber-600 text-sm w-8 shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-black text-zinc-100 text-base truncate">{course.name}</span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="hidden sm:inline-block text-xs bg-zinc-700 text-zinc-300 px-2.5 py-1 rounded font-mono">
                        {course.level}
                      </span>
                      <span className="text-zinc-400 font-mono text-sm">
                        {openIdx === i ? "−" : "+"}
                      </span>
                    </div>
                  </button>

                  {openIdx === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="px-2 pb-5 overflow-hidden"
                    >
                      <div className="ml-12 border-l-2 border-zinc-700 pl-5">
                        <p className="text-zinc-400 text-sm leading-relaxed mb-3">{course.desc}</p>
                        <div className="flex items-center gap-4 font-mono text-xs">
                          <span className="text-zinc-500">duration: <span className="text-zinc-300">{course.duration}</span></span>
                          <span className="text-zinc-500">price: <span className="text-amber-500">{course.price}</span></span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-20 bg-zinc-800/50">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 text-center">
            {config.stats.map((s, i) => (
              <FadeIn key={i} delay={i * 0.1} direction="none">
                <div className="font-mono text-xs text-zinc-500 mb-1">&gt;</div>
                <div className="text-3xl sm:text-4xl font-black text-zinc-100 mb-1">{s.num}</div>
                <div className="text-sm text-zinc-500">{s.label}</div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ── */}
      <section id="certs" className="py-24 bg-zinc-900">
        <div className="mx-auto max-w-5xl px-6">
          <FadeIn className="mb-12">
            <div className="font-mono text-amber-600 text-xs uppercase tracking-widest mb-2">// 02</div>
            <h2 className="text-3xl font-black text-zinc-100">Гэрчилгээ</h2>
          </FadeIn>

          <div className="grid sm:grid-cols-2 gap-5">
            {config.courses.slice(0, 4).map((course, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-6 hover:border-zinc-600 transition">
                  <div className="text-3xl mb-3">{CERT_EMOJIS[i % CERT_EMOJIS.length]}</div>
                  <div className="font-black text-zinc-100 text-base mb-1">{course.name} — Certificate</div>
                  <div className="text-zinc-400 text-sm mb-2">{config.brandName}</div>
                  <div className="text-zinc-500 text-sm leading-relaxed">{course.desc}</div>
                  <div className="mt-4 font-mono text-xs text-amber-600">{course.level} · {course.duration}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSTRUCTORS ── */}
      {(config.instructors?.length ?? 0) > 0 && (
        <section id="team" className="py-24 bg-zinc-900">
          <div className="mx-auto max-w-5xl px-6">
            <FadeIn className="mb-12">
              <div className="font-mono text-amber-600 text-xs uppercase tracking-widest mb-2">// 03</div>
              <h2 className="text-3xl font-black text-zinc-100">Багш нар</h2>
            </FadeIn>

            <div className="flex flex-col gap-4">
              {config.instructors.map((inst, i) => (
                <FadeIn key={i} delay={i * 0.08}>
                  <div className="bg-zinc-700 rounded-xl p-4 flex items-center gap-5 hover:bg-zinc-600/60 transition">
                    <div className="w-14 h-14 rounded-xl bg-zinc-800 flex items-center justify-center text-2xl shrink-0">
                      {COURSE_EMOJIS[i % COURSE_EMOJIS.length]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-black text-zinc-100">{inst.name}</div>
                      <div className="text-amber-600 text-sm font-semibold">{inst.subject}</div>
                      <div className="text-zinc-400 text-xs mt-0.5">{inst.exp} туршлага</div>
                    </div>
                    <div className="hidden sm:block font-mono text-xs text-zinc-600 shrink-0">
                      expert
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── TESTIMONIALS ── */}
      {(config.testimonials?.length ?? 0) > 0 && (
        <section className="py-24 bg-zinc-800/30">
          <div className="mx-auto max-w-5xl px-6">
            <FadeIn className="mb-12">
              <div className="font-mono text-amber-600 text-xs uppercase tracking-widest mb-2">// 04</div>
              <h2 className="text-3xl font-black text-zinc-100">Төгсөгчид</h2>
            </FadeIn>

            <div className="grid gap-5 md:grid-cols-3">
              {config.testimonials.map((t, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="rounded-xl border border-zinc-700/50 p-6 hover:border-zinc-600 transition">
                    <div className="font-mono text-4xl text-zinc-600 leading-none mb-3">"</div>
                    <p className="text-zinc-300 text-sm leading-relaxed mb-5">{t.text}</p>
                    <div className="border-t border-zinc-800 pt-4">
                      <div className="font-bold text-zinc-100 text-sm">{t.name}</div>
                      <div className="font-mono text-xs text-zinc-500 mt-0.5">{t.result}</div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section id="contact" className="py-24 bg-zinc-950 border-t border-b border-zinc-800">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <FadeIn direction="left">
              <div className="font-mono text-amber-600 text-xs uppercase tracking-widest mb-3">// Эхлэх цаг болсон</div>
              <h2 className="text-4xl lg:text-5xl font-black text-zinc-100 leading-tight max-w-md">
                {config.ctaText}
              </h2>
              <p className="text-zinc-400 mt-3 max-w-sm text-sm leading-relaxed">{config.ctaSubtext}</p>
            </FadeIn>

            <FadeIn direction="right" className="flex flex-col items-center md:items-end gap-4">
              {config.phone && (
                <a
                  href={`tel:${config.phone}`}
                  className="bg-amber-600 text-black font-bold text-sm px-8 py-4 rounded-xl hover:bg-amber-500 transition min-w-[200px] text-center"
                >
                  📞 {config.phone}
                </a>
              )}
              {config.email && (
                <a
                  href={`mailto:${config.email}`}
                  className="font-mono text-zinc-300 text-sm hover:text-zinc-100 transition"
                >
                  {config.email}
                </a>
              )}
              {config.address && (
                <div className="font-mono text-xs text-zinc-500">{config.address}</div>
              )}
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-zinc-950 border-t border-zinc-800 py-8">
        <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <div className="font-black text-zinc-200">{config.brandName}</div>
          <div className="text-xs text-zinc-600">Powered by <span className="font-semibold text-blue-400">Landing.mn</span></div>
          <div className="text-xs text-zinc-600">© 2026 {config.brandName}</div>
        </div>
      </footer>
    </div>
  );
}
