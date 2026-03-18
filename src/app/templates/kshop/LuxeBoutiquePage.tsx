import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import type { KShopConfig } from "./KShopConfig";

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }} className={className}>
      {children}
    </motion.div>
  );
}

export default function LuxeBoutiquePage({ config }: { config: KShopConfig }) {
  const [activeCategory, setActiveCategory] = useState<string>("Бүгд");

  const filteredProducts = activeCategory === "Бүгд"
    ? config.products
    : config.products.filter((p) => (p.categories ?? []).includes(activeCategory));

  const firstProduct = config.products[0];
  const heroImg = firstProduct?.images?.[0];

  return (
    <div className="min-h-screen bg-[#faf9f7] text-[#1c1c1c] font-sans antialiased">

      {/* ── ANNOUNCEMENT BAR ── */}
      <div className="bg-[#1c1c1c] text-white text-center py-2.5 text-xs tracking-widest font-medium">
        {config.promoText}
      </div>

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 bg-[#faf9f7]/95 backdrop-blur-md border-b border-[#1c1c1c]/10">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between relative">
          {/* Left links */}
          <div className="hidden md:flex items-center gap-8 text-sm text-[#1c1c1c]/60">
            <a href="#products" className="hover:text-[#1c1c1c] transition tracking-wide">Бараанууд</a>
            <a href="#story" className="hover:text-[#1c1c1c] transition tracking-wide">Тухай</a>
          </div>

          {/* Center brand */}
          <div className="absolute left-1/2 -translate-x-1/2 text-center">
            <div className="font-black text-xl tracking-tighter text-[#1c1c1c]">{config.brandName}</div>
            <div className="text-[9px] tracking-widest text-[#c9a84c] uppercase -mt-0.5">Collection</div>
          </div>

          {/* Right */}
          <div className="hidden md:flex items-center gap-6 text-sm text-[#1c1c1c]/60">
            {config.instagram && (
              <a href={`https://instagram.com/${config.instagram}`} target="_blank" rel="noopener noreferrer"
                className="hover:text-[#1c1c1c] transition text-base">📷</a>
            )}
            {config.facebook && (
              <a href={`https://facebook.com/${config.facebook}`} target="_blank" rel="noopener noreferrer"
                className="hover:text-[#1c1c1c] transition text-base">📘</a>
            )}
            <a href="#contact" className="tracking-wide hover:text-[#1c1c1c] transition border-b border-[#c9a84c]/50">
              Захиалах
            </a>
          </div>

          {/* Mobile cta */}
          <a href="#contact" className="md:hidden text-xs font-bold tracking-widest border-b border-[#c9a84c]">
            ЗАХИАЛАХ
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="py-28 bg-[#faf9f7]">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                className="text-xs tracking-widest text-[#c9a84c] font-bold mb-6 uppercase">
                New Collection
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
                className="text-6xl lg:text-8xl font-black tracking-tighter leading-none mb-8">
                {config.tagline}
                <br />
                <span className="text-[#1c1c1c]/30">{config.taglineHighlight}</span>
              </motion.h1>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.15 }}
                className="border-b border-[#c9a84c]/30 mb-8" />

              <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base text-[#1c1c1c]/50 leading-relaxed mb-10 max-w-sm">
                {config.description}
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap gap-4">
                <a href="#products"
                  className="inline-flex items-center gap-2 bg-[#1c1c1c] text-white px-8 py-3.5 text-sm font-semibold tracking-wide hover:bg-black transition">
                  Цуглуулга харах
                </a>
                <a href="#contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-[#1c1c1c] border-b border-[#1c1c1c] pb-0.5 hover:border-[#c9a84c] hover:text-[#c9a84c] transition">
                  Захиалах →
                </a>
              </motion.div>
            </div>

            {/* Right: editorial image */}
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md h-[500px] rounded-3xl bg-[#1c1c1c]/5 border border-[#1c1c1c]/10 flex items-center justify-center overflow-hidden">
                {heroImg ? (
                  <img src={heroImg} alt={firstProduct?.name ?? ""} className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                ) : (
                  <div className="text-9xl select-none">{firstProduct?.emoji ?? "🛍️"}</div>
                )}
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm px-5 py-3 rounded-2xl border border-[#1c1c1c]/10">
                  <div className="text-[10px] tracking-widest text-[#c9a84c] uppercase">Цуглуулга</div>
                  <div className="font-black text-sm text-[#1c1c1c]">{config.badge}</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PRODUCTS — EDITORIAL ROWS ── */}
      <section id="products" className="py-20 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn className="mb-14">
            <div className="text-xs tracking-widest text-[#c9a84c] uppercase mb-2">Бараанууд</div>
            <h2 className="text-4xl font-black tracking-tighter text-[#1c1c1c]">Цуглуулга</h2>
            <div className="mt-4 h-px w-20 bg-[#c9a84c]" />
          </FadeIn>

          <div className="space-y-0">
            {filteredProducts.map((product, i) => {
              const img = product.images?.[0];
              const isEven = i % 2 === 0;
              const orderMsg = encodeURIComponent(
                `Сайн байна уу! "${product.name}" захиалмаар байна.\nҮнэ: ${product.price}`
              );
              const messengerUrl = config.facebook
                ? `https://m.me/${config.facebook}?text=${orderMsg}`
                : "#contact";

              return (
                <FadeIn key={i} delay={i * 0.08}>
                  <div className={`border-b border-[#1c1c1c]/10 py-12 grid lg:grid-cols-2 gap-12 items-center ${!isEven ? "lg:[direction:rtl]" : ""}`}>
                    {/* Image */}
                    <div className={`${!isEven ? "[direction:ltr]" : ""}`}>
                      <div className="rounded-2xl aspect-[3/4] bg-[#f5f5f5] overflow-hidden flex items-center justify-center max-w-xs mx-auto lg:mx-0">
                        {img ? (
                          <img src={img} alt={product.name} className="w-full h-full object-cover"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                        ) : (
                          <div className="text-8xl select-none">{product.emoji}</div>
                        )}
                      </div>
                    </div>

                    {/* Info */}
                    <div className={`${!isEven ? "[direction:ltr]" : ""}`}>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {(product.categories ?? []).map((c, ci) => (
                          <span key={ci} className="text-[10px] font-bold tracking-widest uppercase text-[#c9a84c] border border-[#c9a84c]/40 px-3 py-1 rounded-full">
                            {c}
                          </span>
                        ))}
                        {product.tag && (
                          <span className="text-[10px] font-bold tracking-widest uppercase bg-[#1c1c1c] text-white px-3 py-1 rounded-full">
                            {product.tag}
                          </span>
                        )}
                      </div>

                      <h3 className="text-4xl font-black tracking-tighter text-[#1c1c1c] mb-4 leading-tight">
                        {product.name}
                      </h3>

                      <div className="flex items-baseline gap-3 mb-6">
                        <span className="text-2xl font-black text-[#1c1c1c]">{product.price}</span>
                        {product.originalPrice && (
                          <span className="text-base text-[#1c1c1c]/30 line-through">{product.originalPrice}</span>
                        )}
                      </div>

                      <a href={messengerUrl} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#1c1c1c] text-white px-8 py-3.5 text-sm font-semibold tracking-wide hover:bg-[#c9a84c] transition-colors">
                        Захиалах →
                      </a>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── BRAND STORY ── */}
      <section id="story" className="py-20 bg-[#faf9f7]">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <FadeIn>
            <div className="border-t border-[#c9a84c]/30 mb-12" />
            <p className="text-2xl lg:text-3xl font-black tracking-tight text-[#1c1c1c] italic leading-snug mb-8">
              "{config.description}"
            </p>
            <div className="text-[#c9a84c] font-black tracking-widest text-sm uppercase">
              — {config.brandName}
            </div>
            <div className="border-b border-[#c9a84c]/30 mt-12" />
          </FadeIn>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="py-16 bg-[#faf9f7]">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn className="mb-8">
            <div className="text-xs tracking-widest text-[#c9a84c] uppercase">Ангилал</div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => setActiveCategory("Бүгд")}
                className={`px-6 py-3 rounded-full text-sm font-semibold tracking-wide border transition-all ${
                  activeCategory === "Бүгд"
                    ? "bg-[#1c1c1c] text-white border-[#1c1c1c]"
                    : "border-[#1c1c1c]/20 text-[#1c1c1c]/60 hover:border-[#1c1c1c]/40"
                }`}>
                Бүгд
              </button>
              {config.categories.map((cat, i) => (
                <button key={i} onClick={() => setActiveCategory(cat.name)}
                  className={`px-6 py-3 rounded-full text-sm font-semibold tracking-wide border transition-all ${
                    activeCategory === cat.name
                      ? "bg-[#1c1c1c] text-white border-[#1c1c1c]"
                      : "border-[#1c1c1c]/20 text-[#1c1c1c]/60 hover:border-[#1c1c1c]/40"
                  }`}>
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── HOW TO ORDER ── */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <FadeIn className="mb-14 text-center">
            <div className="text-xs tracking-widest text-[#c9a84c] uppercase mb-2">Процесс</div>
            <h2 className="text-3xl font-black tracking-tighter text-[#1c1c1c]">{config.stepsTitle}</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-3 gap-10">
            {config.steps.map((step, i) => (
              <FadeIn key={i} delay={i * 0.12}>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full border-2 border-[#c9a84c] flex items-center justify-center font-black text-[#c9a84c] text-lg mx-auto mb-5">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="font-black text-[#1c1c1c] mb-2 tracking-tight">{step.title}</div>
                  <div className="text-sm text-[#1c1c1c]/50 leading-relaxed">{step.desc}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      {config.reviews.length > 0 && (
        <section className="py-20 bg-[#faf9f7]">
          <div className="mx-auto max-w-5xl px-6">
            <FadeIn className="mb-14 text-center">
              <div className="text-xs tracking-widest text-[#c9a84c] uppercase mb-2">Сэтгэгдэл</div>
              <h2 className="text-3xl font-black tracking-tighter text-[#1c1c1c]">Худалдан авагчид</h2>
            </FadeIn>
            <div className="grid md:grid-cols-3 gap-6">
              {config.reviews.map((r, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="bg-white border border-[#1c1c1c]/8 rounded-2xl p-8">
                    <div className="text-4xl text-[#c9a84c]/40 font-black leading-none mb-4">"</div>
                    <p className="text-sm text-[#1c1c1c]/70 leading-relaxed italic mb-6">{r.text}</p>
                    <div className="border-t border-[#1c1c1c]/8 pt-4">
                      <div className="font-black text-sm text-[#1c1c1c]">{r.name}</div>
                      <div className="text-xs text-[#c9a84c] tracking-wide mt-0.5">"{r.product}"</div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CONTACT ── */}
      <section id="contact" className="py-24 bg-[#1c1c1c]">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <FadeIn>
            <div className="text-xs tracking-widest text-[#c9a84c] uppercase mb-6">Холбоо барих</div>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-white mb-10">
              {config.ctaText}
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {config.facebook && (
                <a href={`https://facebook.com/${config.facebook}`} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-8 py-4 text-sm font-semibold tracking-wide hover:bg-white hover:text-[#1c1c1c] transition-all">
                  📘 Facebook
                </a>
              )}
              {config.phone && (
                <a href={`tel:${config.phone}`}
                  className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-8 py-4 text-sm font-semibold tracking-wide hover:bg-white hover:text-[#1c1c1c] transition-all">
                  📞 {config.phone}
                </a>
              )}
              {config.instagram && (
                <a href={`https://instagram.com/${config.instagram}`} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-8 py-4 text-sm font-semibold tracking-wide hover:bg-white hover:text-[#1c1c1c] transition-all">
                  📷 Instagram
                </a>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[#1c1c1c]/10 bg-[#faf9f7] py-8">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <div className="font-black text-[#1c1c1c] tracking-tighter mb-1">{config.brandName}</div>
          <div className="text-xs text-[#1c1c1c]/30">© 2026 {config.brandName} · Powered by Landing.mn</div>
        </div>
      </footer>
    </div>
  );
}
