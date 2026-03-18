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
      transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function AtlasAgencyPage({ config }: { config: HyperdriveConfig }) {
  const services = config.services ?? [];
  const features = config.features ?? [];
  const instructors = config.instructors ?? [];
  const hours = config.hours ?? [];

  return (
    <div className="min-h-screen bg-white text-black font-sans antialiased">

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 bg-white border-b-2 border-black">
        <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
          {/* Brand */}
          <span className="font-black text-base tracking-tight uppercase">
            {config.brandName}
          </span>

          {/* Nav links */}
          <div className="hidden sm:flex items-center gap-8 text-sm font-medium">
            <a href="#services" className="underline underline-offset-4 hover:text-gray-500 transition">
              Үйлчилгээ
            </a>
            <a href="#features" className="underline underline-offset-4 hover:text-gray-500 transition">
              Давуу тал
            </a>
            <a href="#team" className="underline underline-offset-4 hover:text-gray-500 transition">
              Баг
            </a>
            <a href="#contact" className="underline underline-offset-4 hover:text-gray-500 transition">
              Холбоо
            </a>
          </div>

          {/* CTA */}
          <a
            href="#contact"
            className="bg-black text-white text-xs font-bold px-4 py-2 hover:bg-gray-800 transition"
          >
            Холбоо барих →
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative bg-white py-28 overflow-hidden">
        <div className="mx-auto max-w-6xl px-6">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-start">

            {/* Left: headline */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-xs font-semibold text-gray-500 tracking-widest uppercase mb-6"
              >
                — Мэргэжлийн үйлчилгээ
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-7xl lg:text-9xl font-black tracking-tighter leading-[0.9] mb-8"
              >
                {config.brandName}
                <br />
                <span className="text-gray-400">{config.tagline}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="text-base text-gray-500 leading-relaxed max-w-md mb-10"
              >
                {config.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="flex flex-wrap gap-3"
              >
                <a
                  href="#services"
                  className="bg-black text-white text-sm font-bold px-6 py-3 hover:bg-gray-800 transition"
                >
                  Үйлчилгээ харах
                </a>
                <a
                  href="#contact"
                  className="border-2 border-black text-black text-sm font-bold px-6 py-3 hover:bg-black hover:text-white transition"
                >
                  Холбоо барих
                </a>
              </motion.div>
            </div>

            {/* Right: stats card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="hidden lg:block mt-4"
            >
              <div className="border-2 border-black p-8 bg-white">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">
                  Үр дүн
                </p>
                <div className="space-y-6">
                  {[
                    { num: "500+", label: "Амжилттай сурагч" },
                    { num: "10+", label: "Жилийн туршлага" },
                    { num: "100%", label: "Аюулгүй орчин" },
                  ].map((s) => (
                    <div key={s.label} className="border-t border-gray-200 pt-6">
                      <div className="text-5xl font-black leading-none mb-1">{s.num}</div>
                      <div className="text-sm text-gray-500 font-medium">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative large circle */}
        <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full border border-gray-100 pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full border border-gray-200 pointer-events-none" />
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-20 border-t-4 border-black">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn className="mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
              Манай ажлууд
            </p>
            <h2 className="text-4xl font-black tracking-tight">{config.servicesTitle}</h2>
          </FadeIn>

          <div className="divide-y divide-gray-100">
            {services.map((svc, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className="flex items-start gap-6 py-7 group hover:bg-gray-50 transition-colors -mx-6 px-6">
                  {/* Number */}
                  <div className="text-6xl font-black text-gray-100 shrink-0 w-16 text-right leading-none pt-1 group-hover:text-gray-200 transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="text-2xl font-bold leading-tight mb-1">{svc.name}</div>
                    <div className="text-sm text-gray-500 leading-relaxed max-w-md">
                      {svc.desc}
                    </div>
                  </div>

                  {/* Duration + price */}
                  <div className="shrink-0 text-right hidden sm:block">
                    <div className="text-xs text-gray-400 font-medium mb-1">{svc.duration}</div>
                    <div className="text-xl font-black">{svc.price}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES GRID ── */}
      <section id="features" className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn className="mb-14 text-center">
            <div className="border-t-4 border-black pt-6 inline-block w-full">
              <h2 className="text-4xl font-black tracking-tight mb-4">{config.featuresTitle}</h2>
              <div className="border-b-4 border-black pb-6" />
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 gap-px bg-gray-200">
            {features.map((f, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className="bg-white border border-gray-200 p-8 hover:bg-gray-50 transition-colors">
                  <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="text-xl font-black mb-3">{f.title}</div>
                  <div className="text-sm text-gray-500 leading-relaxed">{f.desc}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="py-20 border-t-4 border-b-4 border-black">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-gray-300">
            {[
              { num: "500+", label: "Сурагч" },
              { num: "3", label: "Мэргэжилтэн" },
              { num: "10+", label: "Жилийн туршлага" },
              { num: "100%", label: "Аюулгүй" },
            ].map((s, i) => (
              <FadeIn key={i} delay={i * 0.1} className="text-center px-8 py-6">
                <div className="text-5xl font-black leading-none mb-2">{s.num}</div>
                <div className="text-sm text-gray-500 font-medium">{s.label}</div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSTRUCTORS ── */}
      {instructors.length > 0 && (
        <section id="team" className="py-20">
          <div className="mx-auto max-w-6xl px-6">
            <FadeIn className="mb-14">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                Манай мэргэжилтнүүд
              </p>
              <h2 className="text-4xl font-black tracking-tight">Instructor нар</h2>
            </FadeIn>

            <div className="grid sm:grid-cols-3 gap-8">
              {instructors.map((inst, i) => (
                <FadeIn key={i} delay={i * 0.1} direction="up">
                  <div className="flex items-start gap-5 border border-gray-200 p-6 hover:border-black transition-colors">
                    {/* Avatar */}
                    <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center text-3xl font-black shrink-0 text-gray-400">
                      {inst.name.charAt(0)}
                    </div>

                    {/* Info */}
                    <div className="pt-1">
                      <div className="font-black text-lg leading-tight">{inst.name}</div>
                      <div className="text-sm text-gray-500 font-medium mt-0.5">{inst.role}</div>
                      <div className="mt-3 text-xs text-gray-400 border-t border-gray-100 pt-2">
                        {inst.exp} туршлагатай
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CONTACT ── */}
      <section id="contact" className="py-20 border-t-4 border-black">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">

            {/* Left */}
            <FadeIn direction="left">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                Холбоо барих
              </p>
              <h2 className="text-5xl font-black tracking-tighter leading-[0.95] mb-6">
                Холбоо<br />барих
              </h2>
              {config.phone && (
                <div className="text-2xl font-black mb-2">{config.phone}</div>
              )}
              {config.address && (
                <div className="text-sm text-gray-500 leading-relaxed max-w-xs">
                  {config.address}
                </div>
              )}
            </FadeIn>

            {/* Right */}
            <FadeIn direction="right">
              <div className="space-y-4">
                {config.email && (
                  <a
                    href={`mailto:${config.email}`}
                    className="block border-2 border-black px-6 py-4 text-sm font-bold hover:bg-black hover:text-white transition w-fit"
                  >
                    {config.email} →
                  </a>
                )}
                {config.phone && (
                  <a
                    href={`tel:${config.phone}`}
                    className="block border-2 border-black px-6 py-4 text-sm font-bold hover:bg-black hover:text-white transition w-fit"
                  >
                    {config.phone} →
                  </a>
                )}
                {hours.length > 0 && (
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                      Ажлын цаг
                    </p>
                    <div className="space-y-2">
                      {hours.map((h, i) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span className="text-gray-500">{h.day}</span>
                          <span className="font-bold">{h.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t-2 border-black bg-white py-8">
        <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <span className="font-black uppercase tracking-tight">{config.brandName}</span>
          <span className="text-gray-400 text-xs">
            Powered by <span className="font-semibold text-blue-600">Landing.mn</span>
          </span>
          <span className="text-gray-400 text-xs">© 2026 {config.brandName}</span>
        </div>
      </footer>
    </div>
  );
}
