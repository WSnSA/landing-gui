"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import type { CafeConfig } from "./CafeConfig";
import { Phone, MapPin, Clock, ChevronRight } from "lucide-react";

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function NoirRestaurantPage({ config }: { config: CafeConfig }) {
  const menuCategories = ["Бүгд", "Хоол", "Ундаа", "Десерт"];
  const [activeCategory, setActiveCategory] = useState("Бүгд");

  const filteredItems =
    activeCategory === "Бүгд"
      ? config.menuItems
      : config.menuItems.filter((_, i) =>
          activeCategory === "Хоол"
            ? i < 2
            : activeCategory === "Ундаа"
            ? i >= 2 && i < 4
            : i >= 4
        );

  return (
    <div style={{ backgroundColor: "#0a0a0a" }} className="min-h-screen text-white font-sans">
      {/* ─── Grid overlay SVG definition ─── */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <pattern id="noir-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          </pattern>
        </defs>
      </svg>

      {/* ═══════════════════════════════════════
          NAV
      ═══════════════════════════════════════ */}
      <nav
        className="sticky top-0 z-50 border-b border-white/5"
        style={{ backgroundColor: "#0a0a0a" }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3">
            {config.brandLogo ? (
              <img src={config.brandLogo} alt={config.brandName} className="h-8 w-8 object-contain" />
            ) : (
              <div
                className="h-9 w-9 flex items-center justify-center text-black font-bold text-sm"
                style={{ backgroundColor: "#d4a843" }}
              >
                {config.brandName.charAt(0).toUpperCase()}
              </div>
            )}
            <span className="text-white font-semibold tracking-wide text-sm uppercase">
              {config.brandName}
            </span>
          </div>

          {/* Links */}
          <div className="hidden md:flex items-center gap-8">
            {["Нүүр", "Цэс", "Цаг", "Холбоо"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-white/50 hover:text-white text-sm tracking-wider transition-colors"
              >
                {link}
              </a>
            ))}
          </div>

          {/* CTA */}
          <button
            className="hidden md:block px-5 py-2 text-sm font-medium tracking-wider border transition-colors"
            style={{ borderColor: "#d4a843", color: "#d4a843" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#d4a843";
              (e.currentTarget as HTMLButtonElement).style.color = "#0a0a0a";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
              (e.currentTarget as HTMLButtonElement).style.color = "#d4a843";
            }}
          >
            Захиалах
          </button>
        </div>
      </nav>

      {/* ═══════════════════════════════════════
          HERO
      ═══════════════════════════════════════ */}
      <section
        className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24"
        style={{ backgroundColor: "#0a0a0a" }}
      >
        {/* Grid overlay */}
        <div className="absolute inset-0" style={{ backgroundImage: "url(#noir-grid)" }}>
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="url(#noir-grid)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-5xl">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs tracking-[0.3em] uppercase mb-8"
            style={{ color: "#d4a843" }}
          >
            {config.badge}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-7xl lg:text-9xl font-bold leading-none tracking-tighter mb-6"
          >
            <span className="block text-white">{config.tagline}</span>
            <span className="block" style={{ color: "#d4a843" }}>
              {config.taglineHighlight}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-white/40 text-lg max-w-xl leading-relaxed mb-12"
          >
            {config.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap gap-4 items-center"
          >
            <button
              className="flex items-center gap-2 px-7 py-3.5 font-semibold text-sm tracking-wider transition-opacity hover:opacity-80"
              style={{ backgroundColor: "#d4a843", color: "#0a0a0a" }}
            >
              Цэс харах <ChevronRight size={16} />
            </button>
            <button className="flex items-center gap-2 px-7 py-3.5 text-sm tracking-wider border border-white/20 text-white hover:border-white/50 transition-colors">
              <Phone size={15} />
              {config.phone}
            </button>
          </motion.div>
        </div>

        {/* Delivery badge — bottom left */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.75 }}
          className="absolute bottom-10 left-6 md:left-16 lg:left-24 flex items-center gap-2 border border-white/10 px-4 py-2"
        >
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#d4a843" }} />
          <span className="text-white/50 text-xs tracking-widest uppercase">Хүргэлт боломжтой</span>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════
          SIGNATURE DISHES STRIP
      ═══════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-16" style={{ backgroundColor: "#0d0d0d" }}>
        <FadeIn>
          <p
            className="text-xs tracking-[0.3em] uppercase font-semibold mb-12"
            style={{ color: "#d4a843" }}
          >
            Онцлох хоол
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {config.menuItems.slice(0, 3).map((item, i) => (
            <FadeIn key={item.name} delay={i * 0.1}>
              <div
                className="group border border-transparent hover:border-amber-400/50 transition-colors cursor-pointer"
                style={{ backgroundColor: "#161616" }}
              >
                {/* Emoji area */}
                <div
                  className="h-48 flex items-center justify-center text-6xl"
                  style={{ backgroundColor: "#1e1e1e" }}
                >
                  {item.icon}
                </div>
                {/* Info */}
                <div className="p-6 flex items-end justify-between">
                  <div>
                    <p className="text-white font-semibold text-lg">{item.name}</p>
                    <p className="text-white/40 text-sm mt-1">{item.desc}</p>
                  </div>
                  <span className="text-lg font-bold" style={{ color: "#d4a843" }}>
                    {item.price}
                  </span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FULL MENU
      ═══════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-16" style={{ backgroundColor: "#0a0a0a" }}>
        <FadeIn>
          <h2 className="text-4xl font-bold text-white mb-16 tracking-tight">{config.menuTitle}</h2>
        </FadeIn>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Category tabs */}
          <div className="flex md:flex-col gap-2 flex-wrap md:w-48 shrink-0">
            {menuCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="text-left px-5 py-2.5 text-sm tracking-wider transition-all border"
                style={
                  activeCategory === cat
                    ? { backgroundColor: "#d4a843", color: "#0a0a0a", borderColor: "#d4a843" }
                    : { backgroundColor: "transparent", color: "rgba(255,255,255,0.4)", borderColor: "rgba(255,255,255,0.1)" }
                }
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Menu rows */}
          <div className="flex-1 divide-y divide-white/5">
            {filteredItems.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                className="flex items-center py-5 gap-4"
              >
                <span className="text-2xl w-8 shrink-0">{item.icon}</span>
                <span className="text-white font-medium flex-1 min-w-0">{item.name}</span>
                <span className="text-white/35 text-sm hidden md:block flex-1 text-center truncate">
                  {item.desc}
                </span>
                <span className="font-bold text-right shrink-0" style={{ color: "#d4a843" }}>
                  {item.price}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          QUOTE SECTION
      ═══════════════════════════════════════ */}
      <section className="py-20 px-6 text-center" style={{ backgroundColor: "#d4a843" }}>
        <FadeIn>
          <div className="text-8xl font-serif leading-none text-black/20 select-none mb-4">"</div>
          <p className="text-black font-bold text-2xl md:text-3xl max-w-2xl mx-auto leading-snug tracking-tight">
            {config.description}
          </p>
          <p className="mt-6 text-black/60 text-sm tracking-[0.2em] uppercase font-semibold">
            — {config.brandName}
          </p>
        </FadeIn>
      </section>

      {/* ═══════════════════════════════════════
          HOURS + LOCATION
      ═══════════════════════════════════════ */}
      <section className="py-20 px-6 md:px-16" style={{ backgroundColor: "#0d0d0d" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Hours */}
          <FadeIn>
            <div className="flex items-center gap-2 mb-8">
              <Clock size={16} style={{ color: "#d4a843" }} />
              <span
                className="text-xs tracking-[0.25em] uppercase font-semibold"
                style={{ color: "#d4a843" }}
              >
                Ажиллах цаг
              </span>
            </div>
            <table className="w-full">
              <tbody>
                {config.hours.map((h) => (
                  <tr key={h.day} className="border-b border-white/5">
                    <td className="py-4 text-white/50 text-sm">{h.day}</td>
                    <td className="py-4 text-white font-medium text-sm text-right">{h.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </FadeIn>

          {/* Location & Contact */}
          <FadeIn delay={0.15}>
            <div className="flex items-center gap-2 mb-8">
              <MapPin size={16} style={{ color: "#d4a843" }} />
              <span
                className="text-xs tracking-[0.25em] uppercase font-semibold"
                style={{ color: "#d4a843" }}
              >
                Байршил & Холбоо
              </span>
            </div>
            <div className="space-y-5">
              <div className="flex gap-3">
                <MapPin size={16} className="shrink-0 mt-0.5 opacity-50" />
                <div>
                  <p className="text-white text-sm leading-relaxed">{config.address}</p>
                  {config.addressNote && (
                    <p className="text-white/40 text-xs mt-1">{config.addressNote}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="opacity-50 shrink-0" />
                <a
                  href={`tel:${config.phone}`}
                  className="text-white text-sm hover:text-amber-400 transition-colors"
                >
                  {config.phone}
                </a>
              </div>
              {config.email && (
                <div className="flex items-center gap-3">
                  <span className="text-white/40 text-xs w-4 text-center">@</span>
                  <a
                    href={`mailto:${config.email}`}
                    className="text-white/60 text-sm hover:text-white transition-colors"
                  >
                    {config.email}
                  </a>
                </div>
              )}
              <div className="pt-4">
                <button
                  className="w-full py-3.5 text-sm font-semibold tracking-wider border transition-colors"
                  style={{ borderColor: "#d4a843", color: "#d4a843" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#d4a843";
                    (e.currentTarget as HTMLButtonElement).style.color = "#0a0a0a";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
                    (e.currentTarget as HTMLButtonElement).style.color = "#d4a843";
                  }}
                >
                  {config.ctaText}
                </button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════ */}
      <footer
        className="border-t py-10 text-center"
        style={{ backgroundColor: "#0a0a0a", borderColor: "rgba(255,255,255,0.05)" }}
      >
        <p className="text-white text-sm tracking-[0.25em] uppercase font-semibold">
          {config.brandName}
        </p>
        <p className="text-white/20 text-xs mt-2">
          © {new Date().getFullYear()} · All rights reserved
        </p>
      </footer>
    </div>
  );
}
