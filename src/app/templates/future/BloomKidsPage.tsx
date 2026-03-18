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

const RAINBOW = ["text-yellow-400", "text-pink-500", "text-blue-500", "text-green-500", "text-purple-500", "text-orange-400"];
const CARD_HEADERS = ["bg-yellow-400", "bg-pink-400", "bg-blue-400", "bg-green-400", "bg-purple-400"];
const STAT_COLORS = ["text-yellow-400", "text-pink-400", "text-blue-400", "text-green-400"];
const INSTRUCTOR_BG = ["bg-pink-100", "bg-blue-100", "bg-yellow-100"];
const FLOATING_EMOJIS = ["🌟", "🎨", "📚", "✏️", "🎯"];
const FLOAT_POSITIONS = [
  "top-4 left-8",
  "top-8 right-16",
  "top-20 left-4",
  "bottom-16 right-8",
  "bottom-8 left-20",
];

// ── Main ───────────────────────────────────────────────────────────────────────

export default function BloomKidsPage({ config }: { config: FutureConfig }) {
  return (
    <div className="min-h-screen bg-yellow-50 text-slate-900 font-sans antialiased">

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 bg-white border-b-4 border-black">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          {/* Rainbow brand letters */}
          <div className="flex items-center gap-1">
            {config.brandName.split("").map((ch, i) => (
              <span key={i} className={`text-xl font-black ${RAINBOW[i % RAINBOW.length]}`}>
                {ch}
              </span>
            ))}
          </div>
          <div className="hidden sm:flex items-center gap-6 text-sm font-bold">
            <a href="#courses" className="hover:text-pink-500 transition">Хичээлүүд</a>
            <a href="#steps" className="hover:text-blue-500 transition">Хэрхэн</a>
            <a href="#team" className="hover:text-green-500 transition">Багш нар</a>
          </div>
          <a
            href="#contact"
            className="rounded-xl bg-yellow-400 text-black font-black text-sm px-5 py-2.5 border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,0.15)] hover:translate-x-[2px] hover:translate-y-[2px] transition-transform"
          >
            Бүртгүүлэх
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-yellow-50 py-20 text-center">
        {/* Floating emojis */}
        {FLOATING_EMOJIS.map((emoji, i) => (
          <motion.div
            key={i}
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
            className={`absolute text-4xl pointer-events-none select-none ${FLOAT_POSITIONS[i]}`}
          >
            {emoji}
          </motion.div>
        ))}

        <div className="relative mx-auto max-w-3xl px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block bg-pink-100 border-4 border-pink-300 rounded-full px-5 py-2 text-pink-600 font-black text-sm mb-6"
          >
            {config.badge}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="text-5xl lg:text-7xl font-black leading-tight mb-4"
          >
            {config.brandName}{" "}
            <span className="text-pink-500">{config.taglineHighlight}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-slate-600 leading-relaxed mb-10 max-w-xl mx-auto"
          >
            {config.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <a
              href="#contact"
              className="rounded-2xl bg-yellow-400 text-black font-black text-base px-8 py-4 border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-transform"
            >
              🚀 Бүртгүүлэх
            </a>
            <a
              href="#courses"
              className="rounded-2xl bg-white text-blue-600 font-black text-base px-8 py-4 border-4 border-blue-500 shadow-[4px_4px_0_rgba(0,0,0,0.15)] hover:translate-x-[2px] hover:translate-y-[2px] transition-transform"
            >
              Дэлгэрэнгүй →
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── COURSES ── */}
      <section id="courses" className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn className="text-center mb-12">
            <h2 className="text-4xl font-black">📖 Хичээлүүд</h2>
            <p className="text-slate-500 mt-2">{config.coursesSubtitle}</p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {config.courses.map((course, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <div className="rounded-2xl border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] overflow-hidden flex flex-col h-full">
                  {/* Colored header */}
                  <div className={`${CARD_HEADERS[i % CARD_HEADERS.length]} px-5 py-6 text-center relative`}>
                    <div className="text-5xl mb-2">{course.icon === "Monitor" ? "💻" : course.icon === "Smartphone" ? "📱" : course.icon === "BarChart2" ? "📊" : course.icon === "Sparkles" ? "✨" : course.icon === "Globe" ? "🌍" : "📈"}</div>
                    <span className="inline-block bg-black text-white text-xs font-black px-3 py-1 rounded-full">
                      {course.level}
                    </span>
                  </div>
                  {/* White body */}
                  <div className="bg-white p-5 flex flex-col flex-1">
                    <div className="font-black text-lg text-slate-900 mb-2">{course.name}</div>
                    <div className="text-slate-500 text-sm flex-1 mb-4">{course.desc}</div>
                    <div className="flex items-center justify-between">
                      <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-3 py-1 rounded-full border-2 border-yellow-300">
                        ⏱ {course.duration}
                      </span>
                      <span className="font-black text-pink-500 text-base">{course.price}</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="steps" className="py-16 bg-pink-50">
        <div className="mx-auto max-w-5xl px-6">
          <FadeIn className="text-center mb-12">
            <h2 className="text-4xl font-black">🗺️ {config.stepsTitle}</h2>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {config.steps.map((step, i) => (
              <FadeIn key={i} delay={i * 0.1} direction="up">
                <div className="text-center">
                  <div
                    className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-black text-3xl shadow-[4px_4px_0_rgba(0,0,0,0.15)] border-4 border-black ${CARD_HEADERS[i % CARD_HEADERS.length]}`}
                  >
                    {i + 1}
                  </div>
                  <div className="font-black text-slate-900 mb-1">{step.title}</div>
                  <div className="text-sm text-slate-500">{step.desc}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="py-12 bg-black">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {config.stats.map((s, i) => (
              <FadeIn key={i} delay={i * 0.1} direction="none">
                <div className={`text-4xl font-black ${STAT_COLORS[i % STAT_COLORS.length]} mb-1`}>{s.num}</div>
                <div className="text-sm text-white font-bold">{s.label}</div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSTRUCTORS ── */}
      {(config.instructors?.length ?? 0) > 0 && (
        <section id="team" className="py-16 bg-white">
          <div className="mx-auto max-w-5xl px-6">
            <FadeIn className="text-center mb-12">
              <h2 className="text-4xl font-black">👩‍🏫 Багш нар</h2>
            </FadeIn>

            <div className="grid sm:grid-cols-3 gap-6">
              {config.instructors.map((inst, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="rounded-3xl border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,0.15)] overflow-hidden">
                    <div className={`${INSTRUCTOR_BG[i % INSTRUCTOR_BG.length]} px-5 py-8 flex flex-col items-center`}>
                      <div className="w-20 h-20 rounded-full bg-white border-4 border-black flex items-center justify-center text-4xl mb-3 shadow-[4px_4px_0_rgba(0,0,0,0.15)]">
                        {["👩‍🏫", "👨‍🎨", "👩‍💻"][i % 3]}
                      </div>
                      <div className="font-black text-slate-900 text-lg">{inst.name}</div>
                    </div>
                    <div className="bg-white p-4 text-center">
                      <span className="inline-block bg-purple-100 text-purple-700 font-bold text-xs px-3 py-1 rounded-full border-2 border-purple-300">
                        {inst.subject}
                      </span>
                      <div className="text-slate-500 text-sm mt-2 font-semibold">⏳ {inst.exp} туршлагатай</div>
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
        <section className="py-16 bg-yellow-50">
          <div className="mx-auto max-w-5xl px-6">
            <FadeIn className="text-center mb-12">
              <h2 className="text-4xl font-black">💬 Эцэг эхчүүдийн сэтгэгдэл</h2>
            </FadeIn>

            <div className="grid gap-5 md:grid-cols-3">
              {config.testimonials.map((t, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div
                    className={`bg-white rounded-2xl border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,0.15)] p-6 border-l-8 ${
                      ["border-l-yellow-400", "border-l-pink-500", "border-l-blue-500"][i % 3]
                    }`}
                  >
                    <div className="text-yellow-400 text-lg mb-3 tracking-widest">★★★★★</div>
                    <p className="text-slate-600 text-sm leading-relaxed italic mb-4">"{t.text}"</p>
                    <div className="border-t-2 border-slate-100 pt-3">
                      <div className="font-black text-slate-900 text-sm">{t.name}</div>
                      <div className="text-xs text-pink-500 font-semibold mt-0.5">{t.result}</div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── PRICING ── */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <FadeIn className="text-center mb-12">
            <h2 className="text-4xl font-black">🎁 Үнэ тариф</h2>
          </FadeIn>

          <div className="grid sm:grid-cols-3 gap-6">
            {config.courses.slice(0, 3).map((course, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div
                  className={`rounded-2xl border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] overflow-hidden ${
                    i === 1 ? "scale-105" : ""
                  }`}
                >
                  <div className={`${CARD_HEADERS[i % CARD_HEADERS.length]} px-5 py-4 text-center`}>
                    {i === 1 && (
                      <div className="text-xs font-black bg-black text-white inline-block px-3 py-1 rounded-full mb-1">
                        ⭐ Хамгийн алдартай
                      </div>
                    )}
                    <div className="font-black text-black text-lg">{course.name}</div>
                  </div>
                  <div className="bg-white p-5">
                    <div className="text-3xl font-black text-center mb-4">{course.price}</div>
                    <ul className="space-y-2 text-sm text-slate-600 mb-6">
                      <li className="flex items-center gap-2"><span className="text-green-500 font-black">✓</span> {course.duration} хичээл</li>
                      <li className="flex items-center gap-2"><span className="text-green-500 font-black">✓</span> {course.level} түвшин</li>
                      <li className="flex items-center gap-2"><span className="text-green-500 font-black">✓</span> Гэрчилгээ</li>
                    </ul>
                    <a
                      href="#contact"
                      className="block text-center rounded-xl bg-yellow-400 text-black font-black text-sm px-5 py-3 border-4 border-black hover:translate-y-[2px] transition-transform"
                    >
                      Бүртгүүлэх
                    </a>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="contact" className="py-20 bg-pink-500 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <FadeIn>
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">Өнөөдөр эхлэх!</h2>
            <p className="text-pink-100 text-lg mb-8">{config.ctaSubtext}</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href={`tel:${config.phone}`}
                className="rounded-2xl bg-yellow-400 text-black font-black text-base px-8 py-4 border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,0.3)] hover:translate-x-[2px] hover:translate-y-[2px] transition-transform"
              >
                📞 {config.phone}
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-black py-8">
        <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1">
            {config.brandName.split("").map((ch, i) => (
              <span key={i} className={`text-lg font-black ${RAINBOW[i % RAINBOW.length]}`}>{ch}</span>
            ))}
          </div>
          <div className="text-xs text-zinc-500">Powered by <span className="font-semibold text-blue-400">Landing.mn</span></div>
          <div className="text-xs text-zinc-500">© 2026 {config.brandName}</div>
        </div>
      </footer>
    </div>
  );
}
