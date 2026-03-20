import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import type { KShopConfig } from "./KShopConfig";

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }} className={className}>
      {children}
    </motion.div>
  );
}

export default function MonoStorePage({ config }: { config: KShopConfig }) {
  const [activeCategory, setActiveCategory] = useState<string>("Бүгд");

  const filteredProducts = activeCategory === "Бүгд"
    ? config.products
    : config.products.filter((p) => (p.categories ?? []).includes(activeCategory));

  return (
    <div className="min-h-screen bg-white text-black font-sans antialiased">

      {/* ── ANNOUNCEMENT ── */}
      <div className="bg-black text-white text-center py-2 text-[11px] tracking-[0.2em] font-light uppercase">
        {config.promoText}
      </div>

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 bg-white border-b border-black">
        <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            {config.brandLogo ? (
              <img src={config.brandLogo} alt={config.brandName} className="h-6 w-auto object-contain" />
            ) : (
              <span className="text-sm font-bold tracking-[0.15em] uppercase">{config.brandName}</span>
            )}
          </div>

          {/* Links */}
          <div className="hidden md:flex items-center gap-8 text-xs tracking-[0.12em] uppercase text-black/50">
            <a href="#products" className="hover:text-black transition">Бараанууд</a>
            <a href="#steps" className="hover:text-black transition">Захиалах</a>
            <a href="#contact" className="hover:text-black transition">Холбоо</a>
          </div>

          {/* CTA */}
          <a
            href={`https://facebook.com/${config.facebook}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-[0.12em] uppercase bg-black text-white px-4 py-2 hover:bg-black/80 transition"
          >
            {config.ctaText}
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <div className="space-y-6">
              <div className="text-[11px] tracking-[0.25em] uppercase text-black/40 border border-black/20 inline-block px-3 py-1">
                {config.badge}
              </div>
              <h1 className="text-5xl md:text-7xl font-black leading-[0.95] tracking-tight uppercase">
                {config.tagline}<br />
                <span className="border-b-4 border-black">{config.taglineHighlight}</span>
              </h1>
              <p className="text-sm text-black/50 leading-relaxed max-w-sm">{config.description}</p>
              <div className="flex gap-3 pt-2">
                <a href="#products"
                  className="bg-black text-white text-xs tracking-[0.12em] uppercase px-6 py-3 hover:bg-black/80 transition">
                  Бараанууд харах
                </a>
                <a href={`tel:${config.phone}`}
                  className="border border-black text-xs tracking-[0.12em] uppercase px-6 py-3 hover:bg-black hover:text-white transition">
                  {config.phone}
                </a>
              </div>
            </div>
          </FadeIn>

          {/* Right: stacked product cards */}
          <FadeIn delay={0.15} className="relative hidden md:block">
            <div className="grid grid-cols-2 gap-3">
              {config.products.slice(0, 4).map((p, i) => (
                <motion.div
                  key={i}
                  className="border border-black/10 bg-black/[0.02] p-4 flex flex-col gap-2"
                  whileHover={{ scale: 1.02, borderColor: "#000" }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-3xl text-center py-4 bg-black/5">{p.emoji}</div>
                  <div className="text-xs font-semibold truncate">{p.name}</div>
                  <div className="text-xs text-black/50">{p.price}</div>
                  {p.tag && (
                    <span className="text-[9px] tracking-widest uppercase bg-black text-white inline-block px-2 py-0.5 w-fit">
                      {p.tag}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="border-t border-b border-black/10 py-4 overflow-hidden">
        <div className="flex gap-12 text-[10px] tracking-[0.2em] uppercase text-black/30 whitespace-nowrap animate-marquee-slow">
          {[...config.categories, ...config.categories].map((c, i) => (
            <span key={i}>{c.icon} {c.name}</span>
          ))}
        </div>
      </div>

      {/* ── PRODUCTS ── */}
      <section id="products" className="mx-auto max-w-6xl px-6 py-20">
        <FadeIn>
          <div className="flex items-end justify-between mb-10">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
              {config.productsTitle}
            </h2>
            <span className="text-xs text-black/30 tracking-widest uppercase">{filteredProducts.length} бараа</span>
          </div>
        </FadeIn>

        {/* Category filters */}
        <FadeIn delay={0.05} className="flex flex-wrap gap-2 mb-10">
          {["Бүгд", ...config.categories.map((c) => c.name)].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-[10px] tracking-[0.15em] uppercase px-4 py-2 border transition ${
                activeCategory === cat
                  ? "bg-black text-white border-black"
                  : "border-black/20 text-black/50 hover:border-black hover:text-black"
              }`}
            >
              {cat}
            </button>
          ))}
        </FadeIn>

        {/* Products grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-black/10">
          {filteredProducts.map((p, i) => (
            <FadeIn key={i} delay={i * 0.04}>
              <motion.div
                className="bg-white p-5 flex flex-col gap-3 group cursor-pointer"
                whileHover={{ backgroundColor: "#f5f5f5" }}
              >
                <div className="relative overflow-hidden bg-black/[0.03] aspect-square flex items-center justify-center text-5xl">
                  {p.images?.[0] ? (
                    <img src={p.images[0]} alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  ) : (
                    <span className="group-hover:scale-110 transition duration-300">{p.emoji}</span>
                  )}
                  {p.tag && (
                    <span className="absolute top-2 left-2 text-[9px] tracking-widest uppercase bg-black text-white px-2 py-1">
                      {p.tag}
                    </span>
                  )}
                </div>
                <div>
                  <div className="text-xs font-semibold truncate">{p.name}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-bold">{p.price}</span>
                    {p.originalPrice && (
                      <span className="text-xs line-through text-black/30">{p.originalPrice}</span>
                    )}
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── STEPS ── */}
      <section id="steps" className="bg-black text-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-16 text-center">
              {config.stepsTitle}
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-px bg-white/10">
            {config.steps.map((s, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-black p-10 text-center">
                  <div className="text-6xl font-black text-white/10 mb-4 leading-none">0{i + 1}</div>
                  <div className="text-sm font-bold uppercase tracking-wider mb-3">{s.title}</div>
                  <div className="text-xs text-white/50 leading-relaxed">{s.desc}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <FadeIn>
          <h2 className="text-3xl font-black uppercase tracking-tight mb-12 text-center">Сэтгэгдлүүд</h2>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-px bg-black/10">
          {config.reviews.map((r, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="bg-white p-8 space-y-4">
                <div className="text-xs tracking-[0.2em] uppercase text-black/30">{r.product}</div>
                <p className="text-sm leading-relaxed text-black/70 italic">"{r.text}"</p>
                <div className="flex items-center gap-3 pt-2 border-t border-black/10">
                  <div className="w-8 h-8 bg-black text-white flex items-center justify-center text-xs font-bold shrink-0">
                    {r.name.charAt(0)}
                  </div>
                  <span className="text-xs font-semibold">{r.name}</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="border-t border-black">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">Захиалга<br />өгөх</h2>
                <p className="text-sm text-black/50 leading-relaxed">{config.deliveryNote}</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="space-y-3">
                <a href={`tel:${config.phone}`}
                  className="flex items-center justify-between border border-black p-5 group hover:bg-black hover:text-white transition">
                  <span className="text-xs tracking-widest uppercase">Утас</span>
                  <span className="font-bold">{config.phone}</span>
                </a>
                <a href={`https://facebook.com/${config.facebook}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between border border-black p-5 group hover:bg-black hover:text-white transition">
                  <span className="text-xs tracking-widest uppercase">Facebook</span>
                  <span className="font-bold">{config.facebook}</span>
                </a>
                <a href={`https://instagram.com/${config.instagram}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between border border-black p-5 group hover:bg-black hover:text-white transition">
                  <span className="text-xs tracking-widest uppercase">Instagram</span>
                  <span className="font-bold">@{config.instagram}</span>
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-black text-white py-6 px-6">
        <div className="mx-auto max-w-6xl flex items-center justify-between text-[10px] tracking-widest uppercase text-white/30">
          <span>{config.brandName}</span>
          <span>Powered by Landing.mn</span>
        </div>
      </footer>
    </div>
  );
}
