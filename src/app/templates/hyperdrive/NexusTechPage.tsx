import { useRef } from "react";
import { motion, useInView } from "motion/react";
import type { HyperdriveConfig } from "./HyperdriveConfig";

// ── FadeIn helper ─────────────────────────────────────────────────────────────

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
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const initial =
    direction === "up"
      ? { opacity: 0, y: 36 }
      : direction === "left"
      ? { opacity: 0, x: -36 }
      : direction === "right"
      ? { opacity: 0, x: 36 }
      : { opacity: 0 };
  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function NexusTechPage({ config }: { config: HyperdriveConfig }) {
  const services = config.services ?? [];
  const features = config.features ?? [];
  const instructors = config.instructors ?? [];
  const hours = config.hours ?? [];

  return (
    <div
      className="min-h-screen font-sans antialiased"
      style={{ backgroundColor: "#0f0a1e", color: "#ffffff" }}
    >

      {/* ── NAV ── */}
      <nav
        className="sticky top-0 z-50 border-b"
        style={{ backgroundColor: "#0f0a1e", borderColor: "rgba(88,28,135,0.3)" }}
      >
        <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white font-black text-sm shrink-0">
              {config.brandName.charAt(0).toUpperCase()}
            </div>
            <span className="font-black text-base tracking-tight text-white">
              {config.brandName}
            </span>
          </div>

          {/* Nav links */}
          <div className="hidden sm:flex items-center gap-6 text-sm text-purple-300">
            <a href="#features" className="hover:text-white transition">Онцлог</a>
            <a href="#services" className="hover:text-white transition">Үйлчилгээ</a>
            <a href="#team" className="hover:text-white transition">Баг</a>
            <a href="#contact" className="hover:text-white transition">Холбоо</a>
          </div>

          {/* CTA */}
          <a
            href="#services"
            className="rounded-lg bg-purple-500 hover:bg-purple-600 transition text-white text-xs font-bold px-4 py-2"
          >
            Эхлэх →
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section
        className="relative min-h-screen flex flex-col justify-center overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(rgba(168,85,247,0.04) 1px,transparent 1px)," +
            "linear-gradient(90deg,rgba(168,85,247,0.04) 1px,transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      >
        {/* Glow orbs */}
        <div
          className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full blur-[160px] pointer-events-none"
          style={{ backgroundColor: "rgba(168,85,247,0.15)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-[120px] pointer-events-none"
          style={{ backgroundColor: "rgba(6,182,212,0.1)" }}
        />

        <div className="relative mx-auto max-w-6xl px-6 py-24 w-full text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-10 rounded-full px-5 py-2 text-xs font-semibold text-purple-300"
            style={{ backgroundColor: "rgba(168,85,247,0.15)", border: "1px solid rgba(168,85,247,0.3)" }}
          >
            <span className="text-purple-400">✦</span>
            {config.badge ?? "Шинэ платформ"}
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-6xl lg:text-8xl font-black tracking-tight leading-[0.92] mb-8 text-white"
          >
            {config.tagline}
            <br />
            <span className="text-purple-400">{config.taglineHighlight}</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg leading-relaxed max-w-xl mx-auto mb-10"
            style={{ color: "rgba(233,213,255,0.6)" }}
          >
            {config.description}
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-3 justify-center mb-12"
          >
            <a
              href="#services"
              className="rounded-xl bg-purple-500 hover:bg-purple-600 transition text-white text-sm font-bold px-7 py-3.5"
              style={{ boxShadow: "0 0 30px rgba(168,85,247,0.35)" }}
            >
              Үйлчилгээ харах
            </a>
            <a
              href="#contact"
              className="rounded-xl text-purple-300 text-sm font-bold px-7 py-3.5 hover:bg-purple-900/30 transition"
              style={{ border: "1px solid rgba(168,85,247,0.5)" }}
            >
              Холбоо барих
            </a>
          </motion.div>

          {/* Stat pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="inline-flex flex-wrap gap-6 rounded-2xl px-8 py-4"
            style={{ backgroundColor: "rgba(88,28,135,0.3)" }}
          >
            {[
              { num: "500+", label: "Сурагч" },
              { num: "3", label: "Instructor" },
              { num: "100%", label: "Аюулгүй" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-lg font-black text-purple-300">{s.num}</div>
                <div className="text-xs text-purple-400">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom border */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.4), transparent)" }}
        />
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn className="mb-14 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-3">
              Онцлог шинж чанарууд
            </p>
            <h2 className="text-4xl font-black text-white">{config.featuresTitle}</h2>
          </FadeIn>

          <div className="grid sm:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <FadeIn key={i} delay={i * 0.07} direction="up">
                <div
                  className="rounded-2xl p-6 hover:border-purple-500/50 transition-all group"
                  style={{
                    backgroundColor: "rgba(88,28,135,0.15)",
                    border: "1px solid rgba(88,28,135,0.3)",
                  }}
                >
                  {/* Icon circle */}
                  <div
                    className="h-11 w-11 rounded-xl flex items-center justify-center mb-5 text-purple-400 font-black text-lg"
                    style={{ backgroundColor: "rgba(168,85,247,0.15)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  <div className="font-black text-white text-base mb-2 leading-tight">{f.title}</div>
                  <div className="text-sm leading-relaxed text-purple-300">{f.desc}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn className="mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-3">
              {config.servicesSubtitle ?? "Та хаанаас ч эхэлж болно"}
            </p>
            <h2 className="text-4xl font-black text-white">{config.servicesTitle}</h2>
          </FadeIn>

          {/* Horizontal scroll */}
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-4" style={{ minWidth: "max-content" }}>
              {services.map((svc, i) => (
                <FadeIn key={i} delay={i * 0.06} className="min-w-64 max-w-xs w-64 flex-shrink-0">
                  <div
                    className="rounded-2xl p-6 h-full flex flex-col transition-all hover:scale-[1.02]"
                    style={{
                      backgroundColor: "rgba(88,28,135,0.2)",
                      border: svc.highlight
                        ? "1px solid rgba(168,85,247,0.7)"
                        : "1px solid rgba(88,28,135,0.35)",
                      boxShadow: svc.highlight ? "0 0 20px rgba(168,85,247,0.2)" : "none",
                    }}
                  >
                    {svc.highlight && (
                      <div className="mb-4">
                        <span className="text-[10px] font-bold uppercase tracking-widest bg-purple-500 text-white px-2.5 py-1 rounded-full">
                          Алдартай
                        </span>
                      </div>
                    )}
                    <div className="font-black text-white text-lg leading-tight mb-2">{svc.name}</div>
                    <div className="text-sm text-purple-300 leading-relaxed flex-1 mb-5">{svc.desc}</div>
                    <div className="border-t pt-4" style={{ borderColor: "rgba(88,28,135,0.4)" }}>
                      <div
                        className="text-2xl font-black mb-1"
                        style={{ color: "#06b6d4" }}
                      >
                        {svc.price}
                      </div>
                      <div className="text-xs text-purple-400">{svc.duration}</div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-20 mx-6">
        <FadeIn>
          <div
            className="rounded-3xl py-14 px-6"
            style={{
              background: "linear-gradient(135deg, rgba(88,28,135,0.5) 0%, rgba(88,28,135,0.25) 100%)",
              border: "1px solid rgba(88,28,135,0.4)",
            }}
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center max-w-4xl mx-auto">
              {[
                { num: "500+", label: "Сурагч" },
                { num: "3", label: "Instructor" },
                { num: "10+", label: "Жилийн туршлага" },
                { num: "100%", label: "Аюулгүй" },
              ].map((s, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="text-4xl sm:text-5xl font-black mb-1 text-purple-300">{s.num}</div>
                  <div className="text-sm font-medium" style={{ color: "rgba(192,132,252,0.6)" }}>
                    {s.label}
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── INSTRUCTORS ── */}
      {instructors.length > 0 && (
        <section id="team" className="py-24">
          <div className="mx-auto max-w-6xl px-6">
            <FadeIn className="mb-14">
              <p className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-3">
                Манай баг
              </p>
              <h2 className="text-4xl font-black text-white">Instructor нар</h2>
            </FadeIn>

            <div className="grid sm:grid-cols-3 gap-6">
              {instructors.map((inst, i) => (
                <FadeIn key={i} delay={i * 0.1} direction="up">
                  <div
                    className="rounded-2xl p-6 hover:border-purple-500/50 transition-all"
                    style={{
                      backgroundColor: "rgba(88,28,135,0.15)",
                      border: "1px solid rgba(88,28,135,0.35)",
                    }}
                  >
                    {/* Avatar */}
                    <div
                      className="h-16 w-16 rounded-full flex items-center justify-center text-2xl font-black text-white mb-5"
                      style={{ backgroundColor: "rgba(168,85,247,0.3)" }}
                    >
                      {inst.name.charAt(0)}
                    </div>

                    <div className="font-black text-white text-lg leading-tight">{inst.name}</div>
                    <div className="text-sm font-semibold mt-1" style={{ color: "#06b6d4" }}>
                      {inst.role}
                    </div>
                    <div
                      className="mt-4 pt-4 text-sm"
                      style={{
                        borderTop: "1px solid rgba(88,28,135,0.4)",
                        color: "rgba(216,180,254,0.7)",
                      }}
                    >
                      {inst.exp} туршлагатай
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
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <div
              className="rounded-3xl p-12 lg:p-16 text-center"
              style={{
                backgroundColor: "rgba(88,28,135,0.2)",
                border: "1px solid rgba(88,28,135,0.5)",
                boxShadow: "0 0 60px rgba(168,85,247,0.15)",
              }}
            >
              <p className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-4">
                Холбоо барих
              </p>
              <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight mb-4">
                {config.ctaText}
              </h2>
              <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: "rgba(216,180,254,0.7)" }}>
                {config.ctaSubtext}
              </p>

              <div className="flex flex-wrap gap-4 justify-center mb-10">
                {config.phone && (
                  <a
                    href={`tel:${config.phone}`}
                    className="rounded-xl bg-purple-500 hover:bg-purple-600 transition text-white text-sm font-bold px-8 py-4"
                    style={{ boxShadow: "0 0 30px rgba(168,85,247,0.4)" }}
                  >
                    {config.phone} →
                  </a>
                )}
                {config.email && (
                  <a
                    href={`mailto:${config.email}`}
                    className="rounded-xl text-purple-300 hover:bg-purple-900/30 transition text-sm font-bold px-8 py-4"
                    style={{ border: "1px solid rgba(168,85,247,0.4)" }}
                  >
                    {config.email}
                  </a>
                )}
              </div>

              {/* Address + hours */}
              {(config.address || hours.length > 0) && (
                <div className="grid sm:grid-cols-2 gap-6 text-left max-w-2xl mx-auto">
                  {config.address && (
                    <div
                      className="rounded-2xl p-5"
                      style={{
                        backgroundColor: "rgba(88,28,135,0.25)",
                        border: "1px solid rgba(88,28,135,0.35)",
                      }}
                    >
                      <p className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-2">
                        Байршил
                      </p>
                      <p className="text-sm text-purple-300 leading-relaxed">{config.address}</p>
                    </div>
                  )}
                  {hours.length > 0 && (
                    <div
                      className="rounded-2xl p-5"
                      style={{
                        backgroundColor: "rgba(88,28,135,0.25)",
                        border: "1px solid rgba(88,28,135,0.35)",
                      }}
                    >
                      <p className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-3">
                        Ажлын цаг
                      </p>
                      <div className="space-y-2">
                        {hours.map((h, i) => (
                          <div key={i} className="flex justify-between text-sm">
                            <span className="text-purple-400">{h.day}</span>
                            <span className="font-bold text-purple-300">{h.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="py-8 border-t"
        style={{ borderColor: "rgba(88,28,135,0.3)" }}
      >
        <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <span className="font-black text-white tracking-tight">{config.brandName}</span>
          <span className="text-xs" style={{ color: "rgba(192,132,252,0.5)" }}>
            Powered by{" "}
            <span className="font-semibold" style={{ color: "#a855f7" }}>
              Landing.mn
            </span>
          </span>
          <span className="text-xs" style={{ color: "rgba(192,132,252,0.5)" }}>
            © 2026 {config.brandName}
          </span>
        </div>
      </footer>
    </div>
  );
}
