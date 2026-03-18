import { useRef } from "react";
import { motion, useInView } from "motion/react";
import type { HyperdriveConfig } from "./HyperdriveConfig";

// ── Helpers ────────────────────────────────────────────────────────────────────

const COLORS = [
  "bg-yellow-400",
  "bg-pink-500",
  "bg-blue-500",
  "bg-green-400",
  "bg-orange-500",
];

const TEXT_ON_COLOR: Record<string, string> = {
  "bg-yellow-400": "text-black",
  "bg-pink-500":   "text-white",
  "bg-blue-500":   "text-white",
  "bg-green-400":  "text-black",
  "bg-orange-500": "text-white",
};

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

// ── Main ───────────────────────────────────────────────────────────────────────

export default function PrismCreativePage({ config }: { config: HyperdriveConfig }) {
  const services   = config.services   ?? [];
  const features   = config.features   ?? [];
  const instructors = config.instructors ?? [];
  const hours      = config.hours       ?? [];

  // First service icon emoji fallback for hero square
  const heroEmoji = services[0]?.icon ? "✦" : "✦";

  return (
    <div className="min-h-screen bg-white text-black font-sans antialiased">

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-6 h-14 flex items-center justify-between">
          {/* Brand — first 3 letters colored */}
          <a href="#" className="font-black text-xl tracking-tight flex items-center gap-0">
            {config.brandName.split("").map((ch, i) => {
              const colorMap = ["text-yellow-400", "text-pink-500", "text-blue-500"];
              const cls = i < 3 ? colorMap[i] : "text-black";
              return (
                <span key={i} className={cls}>
                  {ch}
                </span>
              );
            })}
          </a>
          <div className="hidden sm:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#services" className="hover:text-black transition">Үйлчилгээ</a>
            <a href="#work"     className="hover:text-black transition">Ажил</a>
            <a href="#team"     className="hover:text-black transition">Баг</a>
            <a href="#contact"  className="hover:text-black transition">Холбоо</a>
          </div>
          <a
            href="#contact"
            className="bg-yellow-400 text-black text-xs font-black px-4 py-2 rounded-none hover:bg-yellow-300 transition"
          >
            Холбоо барих
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-3 gap-0 items-center">

            {/* Col 1-2: text content */}
            <div className="lg:col-span-2 pr-0 lg:pr-16">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="inline-block bg-yellow-400 text-black text-xs font-black uppercase tracking-widest px-3 py-1 mb-6"
              >
                Creative Agency
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.1 }}
                className="text-7xl font-black leading-[0.95] tracking-tight mb-6"
              >
                <span className="block">{config.brandName}</span>
                <span className="block text-pink-500">{config.taglineHighlight ?? ""}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-gray-500 leading-relaxed mb-8 max-w-lg"
              >
                {config.description ?? ""}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap gap-3"
              >
                <a
                  href="#services"
                  className="bg-black text-white text-sm font-black px-6 py-3 hover:bg-gray-800 transition"
                >
                  Үйлчилгээ харах →
                </a>
                <a
                  href="#contact"
                  className="border-2 border-black text-black text-sm font-black px-6 py-3 hover:bg-black hover:text-white transition"
                >
                  Холбоо барих
                </a>
              </motion.div>
            </div>

            {/* Col 3: colored hero square */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="hidden lg:flex bg-pink-400 rounded-3xl h-80 items-center justify-center text-9xl mt-0"
            >
              {heroEmoji}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SERVICES — colored blocks ── */}
      <section id="services" className="bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
            {services.map((svc, i) => {
              const bg  = COLORS[i % COLORS.length];
              const txt = TEXT_ON_COLOR[bg];
              return (
                <FadeIn key={i} delay={i * 0.06}>
                  <div className={`${bg} h-64 p-8 flex flex-col justify-between relative overflow-hidden`}>
                    {/* Number */}
                    <span className={`text-4xl font-black opacity-20 ${txt} absolute top-4 right-6`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {/* Name */}
                    <div className={`text-2xl font-black ${txt} leading-tight mt-auto`}>
                      {svc.name}
                    </div>
                    {/* Desc + price */}
                    <div className="mt-auto">
                      <p className={`text-sm ${txt} opacity-80 mb-2 leading-snug`}>{svc.desc ?? ""}</p>
                      <span className={`text-xs font-black ${txt} opacity-70`}>
                        {svc.price} · {svc.duration}
                      </span>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── STATS ROW ── */}
      <section className="bg-black py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10">
            {[
              { num: "500+",  label: "Сэтгэл ханамжтай захиалагч" },
              { num: "12+",   label: "Жилийн туршлага" },
              { num: "98%",   label: "Ажил дахин захиалах хувь" },
              { num: "30+",   label: "Шагнал, нэр хүнд" },
            ].map((s, i) => (
              <FadeIn key={i} delay={i * 0.1} direction="none" className="text-center py-4">
                <div className="text-6xl font-black text-white mb-1">{s.num}</div>
                <div className="text-xs font-semibold text-yellow-400 uppercase tracking-wider">{s.label}</div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── WORK / FEATURES GRID ── */}
      <section id="work" className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="mb-10">
            <h2 className="text-5xl font-black">Бидний ажил</h2>
          </FadeIn>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feat, i) => {
              const bg  = COLORS[i % COLORS.length];
              const txt = TEXT_ON_COLOR[bg];
              const tall = i % 2 === 1 ? "h-64" : "h-48";
              return (
                <FadeIn key={i} delay={i * 0.07}>
                  <div className={`${bg} ${tall} rounded-2xl p-6 flex flex-col justify-between overflow-hidden`}>
                    <div className={`text-2xl font-black ${txt} leading-tight`}>
                      {feat.title}
                    </div>
                    <p className={`text-sm ${txt} opacity-80 leading-snug`}>{feat.desc ?? ""}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section id="team" className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="mb-10">
            <h2 className="text-5xl font-black">Баг</h2>
          </FadeIn>
          <div className="flex gap-6 overflow-x-auto pb-4">
            {instructors.map((inst, i) => {
              const bg  = COLORS[i % COLORS.length];
              const txt = TEXT_ON_COLOR[bg];
              return (
                <FadeIn key={i} delay={i * 0.1} className="shrink-0 w-56">
                  <div className="rounded-2xl border border-gray-200 overflow-hidden">
                    {/* Colored top half */}
                    <div className={`${bg} h-28 flex items-center justify-center`}>
                      <span className={`text-5xl font-black ${txt}`}>
                        {inst.name.charAt(0)}
                      </span>
                    </div>
                    {/* White bottom half */}
                    <div className="bg-white p-4">
                      <div className="font-black text-base text-black">{inst.name}</div>
                      <div className="text-sm text-gray-400 mt-0.5">{inst.role}</div>
                      <div className="text-xs text-gray-300 mt-1">{inst.exp}</div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-20 bg-yellow-400">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <FadeIn>
            <h2 className="text-6xl font-black text-black mb-8">
              Холбоо барих →
            </h2>
          </FadeIn>
          <FadeIn delay={0.1} className="flex flex-wrap items-center justify-center gap-4">
            {config.phone && (
              <a
                href={`tel:${config.phone}`}
                className="bg-black text-white font-black text-sm px-6 py-3 rounded-full hover:bg-gray-800 transition"
              >
                📞 {config.phone}
              </a>
            )}
            {config.email && (
              <a
                href={`mailto:${config.email}`}
                className="bg-black text-white font-black text-sm px-6 py-3 rounded-full hover:bg-gray-800 transition"
              >
                ✉ {config.email}
              </a>
            )}
            {config.address && (
              <span className="bg-black text-white font-black text-sm px-6 py-3 rounded-full">
                📍 {config.address}
              </span>
            )}
          </FadeIn>
          {hours.length > 0 && (
            <FadeIn delay={0.2} className="mt-8">
              <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold text-black/70">
                {hours.map((h, i) => (
                  <span key={i}>{h.day}: {h.time}</span>
                ))}
              </div>
            </FadeIn>
          )}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-black py-8">
        <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
          <span className="font-black text-white text-base">{config.brandName}</span>
          <span className="text-gray-500 text-xs">
            Powered by <span className="font-semibold text-yellow-400">Landing.mn</span>
          </span>
          <span className="text-gray-600 text-xs">© 2026 {config.brandName}</span>
        </div>
      </footer>

    </div>
  );
}
