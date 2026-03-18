import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import type { KShopConfig } from "./KShopConfig";

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }} className={className}>
      {children}
    </motion.div>
  );
}

export default function ZestFoodPage({ config }: { config: KShopConfig }) {
  const [activeCategory, setActiveCategory] = useState<string>("Бүгд");

  const filteredProducts = activeCategory === "Бүгд"
    ? config.products
    : config.products.filter((p) => (p.categories ?? []).includes(activeCategory));

  const featuredProducts = config.products.slice(0, 4);

  return (
    <div className="min-h-screen bg-[#fff7ed] text-gray-900 font-sans antialiased">

      {/* ── PROMO STRIP ── */}
      <div className="bg-orange-600 text-white text-center py-2 text-xs font-semibold tracking-wide">
        🚚 {config.promoSub}
      </div>

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 bg-white border-b border-orange-100">
        <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-orange-600 flex items-center justify-center text-white font-black text-sm shrink-0">
              {config.brandLogo ? (
                <img src={config.brandLogo} alt={config.brandName} className="w-9 h-9 rounded-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
              ) : (
                config.brandName.charAt(0).toUpperCase()
              )}
            </div>
            <span className="font-black text-base text-gray-900">{config.brandName}</span>
          </div>

          <div className="hidden sm:flex items-center gap-6 text-sm text-gray-500">
            <a href="#products" className="hover:text-orange-600 transition">Бараанууд</a>
            <a href="#order" className="hover:text-orange-600 transition">Захиалга</a>
            <a href="#contact" className="hover:text-orange-600 transition">Холбоо</a>
          </div>

          <a href="#contact"
            className="bg-orange-600 text-white rounded-full px-5 py-2 text-xs font-bold hover:bg-orange-700 transition shadow-sm">
            Захиалах
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="bg-orange-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-green-700 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
                🌱 Шинэ · Байгалийн
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
                className="text-5xl sm:text-6xl font-black tracking-tight leading-[1.05] mb-6">
                {config.tagline}
                <br />
                <span className="text-orange-600">{config.taglineHighlight}</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base text-gray-500 leading-relaxed mb-8 max-w-md">
                {config.description}
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap gap-3">
                <a href="#products"
                  className="inline-flex items-center gap-2 bg-orange-600 text-white rounded-2xl px-6 py-3.5 text-sm font-bold shadow-md hover:bg-orange-700 transition">
                  Бараанууд харах →
                </a>
                <a href="#contact"
                  className="inline-flex items-center gap-2 border-2 border-green-700 text-green-700 rounded-2xl px-6 py-3.5 text-sm font-bold hover:bg-green-700 hover:text-white transition">
                  📞 {config.phone}
                </a>
              </motion.div>
            </div>

            {/* Right: 2x2 featured grid */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }}
              className="grid grid-cols-2 gap-4">
              {featuredProducts.map((p, i) => {
                const img = p.images?.[0];
                return (
                  <div key={i} className="rounded-2xl bg-white border border-orange-100 p-4 shadow-sm text-center">
                    <div className="h-20 flex items-center justify-center mb-2">
                      {img ? (
                        <img src={img} alt={p.name} className="w-full h-20 object-cover rounded-xl"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                      ) : (
                        <span className="text-4xl select-none">{p.emoji}</span>
                      )}
                    </div>
                    <div className="text-xs font-bold text-gray-800 leading-tight mb-1">{p.name}</div>
                    <div className="text-sm font-black text-orange-600">{p.price}</div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="py-12 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
              <button onClick={() => setActiveCategory("Бүгд")}
                className={`flex items-center gap-2 shrink-0 rounded-full border-2 px-5 py-2.5 text-sm font-semibold transition-all whitespace-nowrap ${
                  activeCategory === "Бүгд"
                    ? "bg-orange-600 border-orange-600 text-white shadow-md"
                    : "border-orange-200 text-orange-700 bg-orange-50 hover:border-orange-400"
                }`}>
                🛒 Бүгд
              </button>
              {config.categories.map((cat, i) => (
                <button key={i} onClick={() => setActiveCategory(cat.name)}
                  className={`flex items-center gap-2 shrink-0 rounded-full border-2 px-5 py-2.5 text-sm font-semibold transition-all whitespace-nowrap ${
                    activeCategory === cat.name
                      ? "bg-orange-600 border-orange-600 text-white shadow-md"
                      : "border-orange-200 text-orange-700 bg-orange-50 hover:border-orange-400"
                  }`}>
                  <span className="text-base">{cat.icon}</span>
                  {cat.name}
                </button>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── PRODUCTS GRID ── */}
      <section id="products" className="py-20 bg-[#fff7ed]">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn className="mb-10">
            <div className="text-xs font-bold uppercase tracking-widest text-orange-600 mb-2">Шинэ бараа</div>
            <h2 className="text-3xl font-black text-gray-900">{config.productsTitle}</h2>
          </FadeIn>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 text-gray-400 text-sm">Энэ ангиллалд бараа байхгүй байна</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {filteredProducts.map((product, i) => {
                const img = product.images?.[0];
                const orderMsg = encodeURIComponent(
                  `Сайн байна уу! "${product.name}" захиалмаар байна.\nҮнэ: ${product.price}`
                );
                const messengerUrl = config.facebook
                  ? `https://m.me/${config.facebook}?text=${orderMsg}`
                  : "#contact";

                return (
                  <FadeIn key={`${activeCategory}-${i}`} delay={i * 0.05}>
                    <div className="bg-white rounded-2xl border border-orange-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                      {/* Image area */}
                      <div className="relative bg-orange-50 h-40 flex items-center justify-center overflow-hidden">
                        {img ? (
                          <img src={img} alt={product.name} className="w-full h-full object-cover"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                        ) : (
                          <div className="text-6xl select-none">{product.emoji}</div>
                        )}
                        {product.tag && (
                          <div className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-1 rounded-full ${
                            product.tag === "Sale" ? "bg-red-500 text-white"
                              : product.tag === "Онцлох" ? "bg-amber-500 text-white"
                              : "bg-green-700 text-white"
                          }`}>
                            {product.tag}
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="p-4">
                        <div className="flex flex-wrap gap-1 mb-1.5">
                          {(product.categories ?? []).map((c, ci) => (
                            <span key={ci} className="text-[10px] font-semibold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
                              {c}
                            </span>
                          ))}
                        </div>
                        <div className="font-bold text-gray-900 text-sm leading-tight mb-2">{product.name}</div>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="font-black text-orange-600">{product.price}</span>
                          {product.originalPrice && (
                            <span className="text-xs text-gray-400 line-through">{product.originalPrice}</span>
                          )}
                        </div>
                        <a href={messengerUrl} target="_blank" rel="noopener noreferrer"
                          className="block w-full text-center bg-orange-600 text-white rounded-xl py-2 text-xs font-bold hover:bg-orange-700 transition">
                          Захиалах
                        </a>
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <FadeIn className="text-center mb-10">
            <h2 className="text-3xl font-black text-gray-900">Яагаад биднийг сонгох вэ?</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { bg: "bg-green-50", border: "border-green-200", icon: "🌱", title: "Байгалийн", desc: "100% байгалийн гаралтай, чанарын баталгаатай бүтээгдэхүүн" },
              { bg: "bg-orange-50", border: "border-orange-200", icon: "🚚", title: "Хурдан хүргэлт", desc: config.deliveryNote },
              { bg: "bg-yellow-50", border: "border-yellow-200", icon: "💯", title: "Баталгаат чанар", desc: "Бүтээгдэхүүн таалагдаагүй тохиолдолд буцааж өгнө" },
            ].map((f, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className={`${f.bg} border ${f.border} rounded-2xl p-6 text-center`}>
                  <div className="text-4xl mb-4">{f.icon}</div>
                  <div className="font-black text-gray-900 mb-2">{f.title}</div>
                  <div className="text-sm text-gray-500 leading-relaxed">{f.desc}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW TO ORDER ── */}
      <section id="order" className="py-16 bg-orange-50">
        <div className="mx-auto max-w-4xl px-6">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900">{config.stepsTitle}</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-3 gap-8">
            {config.steps.map((step, i) => (
              <FadeIn key={i} delay={i * 0.12}>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-orange-600 flex items-center justify-center text-white font-black text-2xl mx-auto mb-5 shadow-lg shadow-orange-200">
                    {i + 1}
                  </div>
                  <div className="font-black text-gray-900 mb-2">{step.title}</div>
                  <div className="text-sm text-gray-500 leading-relaxed">{step.desc}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      {config.reviews.length > 0 && (
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-5xl px-6">
            <FadeIn className="text-center mb-10">
              <h2 className="text-3xl font-black text-gray-900">Худалдан авагчдын сэтгэгдэл</h2>
            </FadeIn>
            <div className="grid md:grid-cols-3 gap-5">
              {config.reviews.map((r, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6">
                    <div className="text-green-700 text-2xl font-black leading-none mb-3">"</div>
                    <div className="flex gap-0.5 mb-3">
                      {[1,2,3,4,5].map((s) => (
                        <span key={s} className="text-amber-400 text-sm">★</span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed italic mb-4">{r.text}</p>
                    <div className="border-t border-orange-200 pt-3">
                      <div className="font-bold text-gray-900 text-sm">{r.name}</div>
                      <div className="text-xs text-orange-600 mt-0.5">"{r.product}" авсан</div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section id="contact" className="py-20 bg-orange-600">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <FadeIn>
            <h2 className="text-4xl font-black text-white mb-3">{config.ctaText}</h2>
            <p className="text-orange-100 mb-10 text-sm">Facebook эсвэл утасаар захиалж болно</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {config.facebook && (
                <a href={`https://facebook.com/${config.facebook}`} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white text-orange-600 rounded-2xl px-8 py-4 text-sm font-bold hover:bg-orange-50 transition shadow-sm">
                  📘 Facebook
                </a>
              )}
              {config.phone && (
                <a href={`tel:${config.phone}`}
                  className="inline-flex items-center justify-center gap-2 border-2 border-white text-white rounded-2xl px-8 py-4 text-sm font-bold hover:bg-white hover:text-orange-600 transition">
                  📞 {config.phone}
                </a>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-orange-100 bg-white py-8">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <div className="font-black text-gray-900 mb-1">{config.brandName}</div>
          <div className="text-xs text-gray-400">© 2026 {config.brandName} · Powered by Landing.mn</div>
        </div>
      </footer>
    </div>
  );
}
