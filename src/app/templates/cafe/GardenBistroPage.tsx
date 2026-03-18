import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Phone, MapPin, CheckCircle, ArrowRight } from "lucide-react";
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

const PLATE_POSITIONS = [
  "absolute -top-6 left-1/2 -translate-x-1/2",
  "absolute top-1/2 -translate-y-1/2 -right-6",
  "absolute -bottom-6 left-1/2 -translate-x-1/2",
];

const NATURE_EMOJIS = ["🌿", "🥗", "🌱", "🍃", "🫚", "🥦"];

export default function GardenBistroPage({ config }: { config: CafeConfig }) {
  const plateEmojis = config.menuItems
    .slice(0, 3)
    .map((_, i) => NATURE_EMOJIS[i + 1] ?? "🌱");

  return (
    <div className="min-h-screen bg-green-50 text-slate-900 font-sans">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-green-100">
        <div className="mx-auto max-w-7xl px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-green-600 inline-block" />
            <span className="font-black text-lg tracking-tight text-slate-900">
              {config.brandName}
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-7 text-sm font-medium text-slate-600">
            <a href="#menu" className="hover:text-green-600 transition underline-offset-4 hover:underline">
              Меню
            </a>
            <a href="#about" className="hover:text-green-600 transition underline-offset-4 hover:underline">
              Тухай
            </a>
            <a href="#contact" className="hover:text-green-600 transition underline-offset-4 hover:underline">
              Холбоо
            </a>
          </div>
          <a
            href="#menu"
            className="text-sm font-semibold text-green-600 hover:text-green-700 transition flex items-center gap-1"
          >
            Цэс харах <ArrowRight size={14} />
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-white py-24 border-b border-green-100">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: text */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 rounded-full border border-green-100 bg-green-50 px-4 py-1.5 text-xs font-semibold text-green-700 mb-6"
              >
                🌿 {config.badge}
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.1 }}
                className="text-5xl sm:text-6xl font-black leading-tight tracking-tight text-slate-900"
              >
                <span className="text-green-600">{config.tagline}</span>{" "}
                {config.taglineHighlight}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.2 }}
                className="mt-6 text-lg text-slate-500 leading-relaxed max-w-lg"
              >
                {config.description}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.3 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <a
                  href="#menu"
                  className="rounded-xl bg-green-600 hover:bg-green-700 px-6 py-3 text-sm font-semibold text-white transition shadow-sm"
                >
                  Меню үзэх →
                </a>
                <a
                  href="#contact"
                  className="rounded-xl bg-white border border-green-200 px-6 py-3 text-sm font-medium text-green-700 hover:bg-green-50 transition shadow-sm"
                >
                  Захиалга өгөх
                </a>
              </motion.div>
            </div>

            {/* Right: decorative plate */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="relative w-80 h-80">
                <div className="w-full h-full rounded-full bg-green-50 border-4 border-green-100 flex items-center justify-center text-8xl select-none">
                  🥗
                </div>
                {plateEmojis.map((emoji, i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      duration: 3 + i * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.4,
                    }}
                    className={`${PLATE_POSITIONS[i]} text-3xl select-none`}
                    aria-hidden="true"
                  >
                    {emoji}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Seasonal specials — timeline */}
      <section className="bg-green-50 py-20 border-b border-green-100">
        <div className="mx-auto max-w-3xl px-6">
          <FadeUp className="text-center mb-12">
            <div className="text-xs font-semibold uppercase tracking-widest text-green-600 mb-2">
              Онцлох хоол
            </div>
            <h2 className="text-3xl font-black text-slate-900">{config.menuTitle}</h2>
            {config.menuSubtitle && (
              <p className="mt-1 text-slate-500">{config.menuSubtitle}</p>
            )}
          </FadeUp>
          <div className="relative pl-8">
            {/* Vertical line */}
            <div className="absolute left-3 top-0 bottom-0 border-l-2 border-green-200" />
            <div className="space-y-8">
              {config.menuItems.slice(0, 4).map((item, i) => (
                <FadeUp key={i} delay={i * 0.1}>
                  <div className="relative flex gap-5 items-start">
                    {/* Dot on the line */}
                    <div className="absolute -left-5 mt-1.5 h-3 w-3 rounded-full bg-green-500 border-2 border-white shadow-sm" />
                    <div className="text-3xl select-none" aria-hidden="true">
                      🌿
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <div className="font-bold text-slate-900">{item.name}</div>
                        <div className="text-sm font-semibold text-green-600 shrink-0">
                          {item.price}
                        </div>
                      </div>
                      <p className="text-sm text-slate-500 mt-0.5 leading-relaxed">
                        {item.desc}
                      </p>
                      <span className="inline-block mt-1.5 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
                        Онцлох
                      </span>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About / Philosophy */}
      <section id="about" className="bg-white py-20 border-b border-green-100">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <FadeUp>
              {/* Organic blob shape */}
              <div
                className="bg-green-100 w-full h-72 flex items-center justify-center text-8xl select-none"
                style={{
                  borderRadius: "40% 60% 60% 40% / 40% 40% 60% 60%",
                }}
                aria-hidden="true"
              >
                🌱
              </div>
            </FadeUp>
            <FadeUp delay={0.15}>
              <div className="text-xs font-semibold uppercase tracking-widest text-green-600 mb-3">
                Бидний тухай
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-4">
                {config.featuresTitle}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {config.description}
              </p>
              {config.hours && config.hours.length > 0 && (
                <div className="space-y-2 mb-4">
                  {config.hours.map((h, i) => (
                    <div key={i} className="flex items-center justify-between text-sm border-b border-green-50 pb-1">
                      <span className="text-slate-500">{h.day}</span>
                      <span className="font-semibold text-slate-800">{h.time}</span>
                    </div>
                  ))}
                </div>
              )}
              {config.phone && (
                <a
                  href={`tel:${config.phone.replace(/-/g, "")}`}
                  className="inline-flex items-center gap-2 text-green-600 font-semibold text-sm hover:text-green-700 transition"
                >
                  <Phone size={14} /> {config.phone}
                </a>
              )}
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Full menu */}
      <section id="menu" className="bg-green-50 py-20 border-b border-green-100">
        <div className="mx-auto max-w-6xl px-6">
          <FadeUp className="text-center mb-10">
            <div className="text-xs font-semibold uppercase tracking-widest text-green-600 mb-2">
              Бүрэн цэс
            </div>
            <h2 className="text-3xl font-black text-slate-900">{config.menuTitle}</h2>
          </FadeUp>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {config.menuItems.map((item, i) => (
              <FadeUp key={i} delay={i * 0.06}>
                <div className="border border-green-100 bg-white rounded-2xl p-4 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200">
                  <div className="text-3xl mb-2 select-none" aria-hidden="true">
                    {NATURE_EMOJIS[i % NATURE_EMOJIS.length]}
                  </div>
                  <div className="font-bold text-slate-900 mb-0.5">{item.name}</div>
                  <div className="text-xs text-slate-500 mb-2 leading-relaxed">
                    {item.desc}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-green-600">{item.price}</span>
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700 font-medium">
                      Органик
                    </span>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Features — list style */}
      <section className="bg-white py-16 border-b border-green-100">
        <div className="mx-auto max-w-3xl px-6">
          <FadeUp className="text-center mb-10">
            <h2 className="text-3xl font-black text-slate-900">{config.featuresTitle}</h2>
            {config.featuresSubtitle && (
              <p className="mt-1 text-slate-500">{config.featuresSubtitle}</p>
            )}
          </FadeUp>
          <div className="space-y-6">
            {config.features.slice(0, 3).map((f, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className="flex items-start gap-4">
                  <div className="mt-0.5 h-8 w-8 rounded-full bg-green-600 flex items-center justify-center shrink-0">
                    <CheckCircle size={16} className="text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 mb-0.5">
                      {f.title}
                    </div>
                    <div className="text-sm text-slate-500 leading-relaxed">{f.desc}</div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews — 2-col masonry-like */}
      <section className="bg-green-50 py-16 border-b border-green-100">
        <div className="mx-auto max-w-5xl px-6">
          <FadeUp className="text-center mb-10">
            <h2 className="text-3xl font-black text-slate-900">
              Үйлчлүүлэгчид юу хэлдэг вэ?
            </h2>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {config.reviews.map((r, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className="bg-white border-l-4 border-green-500 rounded-2xl p-5 shadow-sm">
                  <p className="text-slate-700 text-sm leading-relaxed italic mb-4">
                    "{r.text}"
                  </p>
                  <div className="font-semibold text-slate-900 text-sm">{r.name}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{r.role}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Reservation CTA */}
      <section id="contact" className="bg-white py-20 border-b border-green-100">
        <FadeUp className="mx-auto max-w-xl px-6 text-center">
          <div className="text-4xl mb-4 select-none" aria-hidden="true">🌿</div>
          <h2 className="text-3xl font-black text-green-600 mb-3">
            {config.ctaText}
          </h2>
          {config.ctaSubtext && (
            <p className="text-slate-500 mb-6">{config.ctaSubtext}</p>
          )}
          {config.phone && (
            <a
              href={`tel:${config.phone.replace(/-/g, "")}`}
              className="inline-flex items-center gap-2 rounded-xl bg-green-600 hover:bg-green-700 px-8 py-3.5 text-base font-bold text-white transition shadow-sm mb-4"
            >
              <Phone size={16} />
              {config.phone}
            </a>
          )}
          {config.address && (
            <div className="mt-3 flex items-center justify-center gap-2 text-sm text-slate-500">
              <MapPin size={14} className="text-green-500 shrink-0" />
              <span>{config.address}</span>
            </div>
          )}
          {config.addressNote && (
            <div className="mt-1 text-xs text-slate-400">{config.addressNote}</div>
          )}
        </FadeUp>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-green-100 py-8">
        <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-400">
          <div className="font-black text-green-600 text-base flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-green-500 inline-block" />
            {config.brandName}
          </div>
          <div className="text-xs">
            Powered by{" "}
            <span className="font-semibold text-blue-600">Landing.mn</span>
          </div>
          <div className="text-xs">© 2026 {config.brandName}</div>
        </div>
      </footer>
    </div>
  );
}
