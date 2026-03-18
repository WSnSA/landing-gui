import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Phone, MapPin } from "lucide-react";
import type { CafeConfig } from "./CafeConfig";

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const STATS = [
  { value: "500+", label: "захиалга" },
  { value: "4.9★", label: "үнэлгээ" },
  { value: "30 мин", label: "хүргэлт" },
  { value: "100%", label: "амт" },
];

export default function StreetFoodPage({ config }: { config: CafeConfig }) {
  const heroEmoji =
    config.menuItems?.[0]?.icon === "Coffee"
      ? "☕"
      : config.menuItems?.[0]?.name
      ? "🍜"
      : "🍜";

  // Build ticker text
  const tickerUnit = `${config.badge ?? ""} • ${config.brandName} • `;
  const tickerContent = tickerUnit.repeat(8);

  return (
    <div className="min-h-screen bg-amber-50 text-slate-900 font-sans overflow-x-hidden">
      {/* Promo ticker */}
      <div className="w-full bg-amber-500 border-b-4 border-black overflow-hidden py-2">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap text-sm font-black text-black tracking-wide"
          style={{ width: "max-content" }}
        >
          <span className="inline-block px-2">{tickerContent}</span>
          <span className="inline-block px-2">{tickerContent}</span>
        </motion.div>
      </div>

      {/* Nav */}
      <nav className="bg-white border-b-4 border-black sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-6 h-14 flex items-center justify-between">
          <span className="font-black text-xl tracking-tight text-black">
            {config.brandName}
          </span>
          <div className="hidden sm:flex items-center gap-6 text-sm font-bold text-black">
            <a href="#menu" className="hover:text-amber-600 transition">
              Меню
            </a>
            <a href="#features" className="hover:text-amber-600 transition">
              Тухай
            </a>
            <a href="#contact" className="hover:text-amber-600 transition">
              Холбоо
            </a>
          </div>
          <a
            href="#contact"
            className="rounded-full bg-red-500 border-2 border-black px-5 py-1.5 text-xs font-black text-white hover:bg-red-600 transition shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            Захиалах
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-white py-20 border-b-4 border-black">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "backOut" }}
            className="text-9xl leading-none mb-6 select-none"
            aria-hidden="true"
          >
            {heroEmoji}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-5xl sm:text-6xl font-black text-black leading-tight tracking-tight"
          >
            {config.tagline}{" "}
            <span className="text-amber-500">{config.taglineHighlight}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-5 text-lg text-gray-600 leading-relaxed max-w-xl mx-auto"
          >
            {config.description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-8 flex flex-wrap gap-3 justify-center"
          >
            <a
              href="#menu"
              className="rounded-3xl bg-amber-500 border-4 border-black px-7 py-3 text-sm font-black text-black hover:bg-amber-400 transition shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              Меню үзэх →
            </a>
            <a
              href="#contact"
              className="rounded-3xl bg-white border-4 border-red-500 px-7 py-3 text-sm font-black text-red-500 hover:bg-red-50 transition shadow-[4px_4px_0px_0px_rgba(239,68,68,0.4)]"
            >
              Захиалах
            </a>
          </motion.div>
        </div>
      </section>

      {/* Feature cards */}
      <section id="features" className="py-16 bg-amber-50 border-b-4 border-black">
        <div className="mx-auto max-w-6xl px-6">
          <FadeUp className="text-center mb-10">
            <h2 className="text-3xl font-black text-black">
              {config.featuresTitle}
            </h2>
            {config.featuresSubtitle && (
              <p className="mt-2 text-gray-600 font-semibold">
                {config.featuresSubtitle}
              </p>
            )}
          </FadeUp>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {config.features.slice(0, 3).map((f, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className="bg-white border-4 border-black rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-200">
                  <div className="text-4xl mb-3" aria-hidden="true">
                    {i === 0 ? "🔥" : i === 1 ? "⚡" : "🎯"}
                  </div>
                  <div className="font-black text-lg text-black mb-1">
                    {f.title}
                  </div>
                  <div className="text-sm text-gray-600 leading-relaxed">
                    {f.desc}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Menu grid */}
      <section id="menu" className="py-16 bg-white border-b-4 border-black">
        <div className="mx-auto max-w-6xl px-6">
          <FadeUp className="text-center mb-10">
            <h2 className="text-3xl font-black text-black">{config.menuTitle}</h2>
            {config.menuSubtitle && (
              <p className="mt-1 text-gray-500 font-semibold">{config.menuSubtitle}</p>
            )}
          </FadeUp>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {config.menuItems.map((item, i) => (
              <FadeUp key={i} delay={i * 0.06}>
                <div className="rounded-2xl border-2 border-black bg-white p-4 text-center hover:bg-amber-50 transition cursor-pointer group">
                  <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-200" aria-hidden="true">
                    🍽️
                  </div>
                  <div className="font-black text-sm text-black mb-1">
                    {item.name}
                  </div>
                  <div className="text-xs text-gray-500 mb-2 leading-snug">
                    {item.desc}
                  </div>
                  <div className="font-black text-red-500 text-base">
                    {item.price}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Stats row */}
      <section className="bg-amber-500 border-b-4 border-black py-12">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {STATS.map((s, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <div>
                  <div className="text-4xl font-black text-white leading-none">
                    {s.value}
                  </div>
                  <div className="mt-1 text-sm font-bold text-black/70">
                    {s.label}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 bg-white border-b-4 border-black">
        <div className="mx-auto max-w-5xl px-6">
          <FadeUp className="text-center mb-10">
            <h2 className="text-3xl font-black text-black">
              Үйлчлүүлэгчид юу хэлдэг вэ?
            </h2>
          </FadeUp>
          <div className="grid gap-5 md:grid-cols-3">
            {config.reviews.map((r, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className="bg-amber-50 border-2 border-black rounded-2xl p-5 relative">
                  <div className="text-5xl font-black text-red-500 leading-none mb-2 select-none" aria-hidden="true">
                    "
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed mb-4">
                    {r.text}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5 text-amber-500 text-xs">
                      {"★★★★★"}
                    </div>
                  </div>
                  <div className="mt-2 font-black text-sm text-black">{r.name}</div>
                  <div className="text-xs text-gray-500">{r.role}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + Contact */}
      <section id="contact" className="bg-red-500 border-b-4 border-black py-16">
        <FadeUp className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-4xl font-black text-white mb-3">{config.ctaText}</h2>
          {config.ctaSubtext && (
            <p className="text-white/80 font-semibold mb-6">{config.ctaSubtext}</p>
          )}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {config.phone && (
              <a
                href={`tel:${config.phone.replace(/-/g, "")}`}
                className="inline-flex items-center justify-center gap-2 rounded-3xl bg-white border-4 border-black px-7 py-3 text-sm font-black text-black hover:bg-amber-50 transition shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <Phone size={15} />
                {config.phone}
              </a>
            )}
            {config.address && (
              <div className="inline-flex items-center justify-center gap-2 rounded-3xl bg-white/20 border-4 border-white/60 px-7 py-3 text-sm font-black text-white">
                <MapPin size={15} />
                {config.addressNote ?? config.address}
              </div>
            )}
          </div>
        </FadeUp>
      </section>

      {/* Footer */}
      <footer className="bg-black py-8">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <div className="font-black text-white text-lg tracking-tight mb-1">
            {config.brandName}
          </div>
          <div className="text-gray-500 text-xs">
            Powered by{" "}
            <span className="text-amber-400 font-semibold">Landing.mn</span>
            {" "}· © 2026 {config.brandName}
          </div>
        </div>
      </footer>
    </div>
  );
}
