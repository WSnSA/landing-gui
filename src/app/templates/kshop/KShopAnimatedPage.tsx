import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import type { KShopConfig } from "./KShopConfig";
import { KSHOP_THEMES } from "./KShopConfig";
import { Phone, ShoppingBag, Instagram, Star, Truck, ArrowRight, ChevronRight } from "lucide-react";

// ── Helpers ───────────────────────────────────────────────────────────────────

function BrandLogo({ config, size = "md" }: { config: KShopConfig; size?: "sm" | "md" }) {
  const theme = KSHOP_THEMES[config.primaryColor];
  const cls = size === "sm" ? "h-6 w-6 rounded-lg text-xs" : "h-9 w-9 rounded-xl text-sm";
  if (config.brandLogo) {
    return <img src={config.brandLogo} alt={config.brandName}
      className={`${size === "sm" ? "h-6 w-6" : "h-9 w-9"} rounded-xl object-cover`}
      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />;
  }
  return (
    <div className={`${cls} bg-gradient-to-br ${theme.accentGradient} flex items-center justify-center text-white font-black shrink-0`}>
      {config.brandName.charAt(0).toUpperCase()}
    </div>
  );
}

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

// ── Product card ──────────────────────────────────────────────────────────────

function ProductCard({ product, theme, index }: {
  product: KShopConfig["products"][0];
  theme: ReturnType<typeof KSHOP_THEMES[keyof typeof KSHOP_THEMES]>;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const tagCls = product.tag === "Sale" ? theme.tagSale
    : product.tag === "Онцлох" ? "bg-amber-500 text-white"
    : theme.tagNew;

  return (
    <FadeIn delay={index * 0.05}>
      <div
        className="group rounded-2xl bg-white border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image area */}
        <div className={`relative h-52 ${theme.accentBg} flex items-center justify-center overflow-hidden`}>
          <motion.div animate={{ scale: hovered ? 1.08 : 1 }} transition={{ duration: 0.3 }}
            className="text-7xl select-none">
            {product.emoji}
          </motion.div>

          {/* Tag */}
          {product.tag && (
            <div className={`absolute top-3 left-3 text-[10px] font-bold px-2 py-1 rounded-full ${tagCls}`}>
              {product.tag}
            </div>
          )}

          {/* Quick action overlay */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-3 left-3 right-3"
          >
            <div className={`flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r ${theme.accentGradient} py-2.5 text-xs font-bold text-white shadow-lg`}>
              <ShoppingBag size={13} /> Захиалах
            </div>
          </motion.div>
        </div>

        {/* Info */}
        <div className="p-4">
          <div className="text-xs text-slate-400 mb-1">{product.category}</div>
          <div className="font-bold text-slate-900 text-sm leading-tight mb-2">{product.name}</div>
          <div className="flex items-center gap-2">
            <span className={`font-black text-base ${theme.accentText}`}>{product.price}</span>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through">{product.originalPrice}</span>
            )}
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function KShopAnimatedPage({ config }: { config: KShopConfig }) {
  const theme = KSHOP_THEMES[config.primaryColor];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased">

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100">
        <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <BrandLogo config={config} size="md" />
            <span className="font-black text-base text-slate-900">{config.brandName}</span>
          </div>
          <div className="hidden sm:flex items-center gap-5 text-sm text-slate-500">
            <a href="#products" className="hover:text-slate-900 transition">Бараанууд</a>
            <a href="#order" className="hover:text-slate-900 transition">Захиалах</a>
            <a href="#contact" className="hover:text-slate-900 transition">Холбоо</a>
          </div>
          <a href="#contact"
            className={`flex items-center gap-1.5 rounded-xl bg-gradient-to-r ${theme.accentGradient} px-4 py-2 text-xs font-bold text-white shadow-sm`}>
            <ShoppingBag size={13} /> Захиалах
          </a>
        </div>
      </nav>

      {/* ── PROMO BANNER ── */}
      <div className={`bg-gradient-to-r ${theme.accentGradient} py-2.5 text-center text-white text-xs font-semibold`}>
        🎁 {config.promoSub}
      </div>

      {/* ── HERO ── */}
      <section className={`relative overflow-hidden bg-gradient-to-br ${theme.heroBg} pt-14 pb-16`}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, #f1f5f9 1.5px, transparent 1.5px)", backgroundSize: "22px 22px" }} />

        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                className={`inline-flex items-center gap-2 rounded-full bg-white border ${theme.accentBorder} px-4 py-1.5 text-xs font-semibold ${theme.accentText} mb-6 shadow-sm`}>
                {config.badge}
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.1 }}
                className="text-5xl sm:text-6xl font-black tracking-tight leading-[1.05] mb-6">
                {config.tagline}<br />
                <span className={`bg-gradient-to-r ${theme.accentGradient} bg-clip-text text-transparent`}>
                  {config.taglineHighlight}
                </span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-slate-500 leading-relaxed mb-8 max-w-md">
                {config.description}
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap gap-3 mb-8">
                <a href="#products"
                  className={`inline-flex items-center gap-2 rounded-xl bg-gradient-to-r ${theme.accentGradient} px-6 py-3.5 text-sm font-bold text-white shadow-lg`}>
                  Бараанууд харах <ArrowRight size={15} />
                </a>
                <a href="#contact"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 hover:border-slate-300 transition shadow-sm">
                  <Phone size={14} /> {config.phone}
                </a>
              </motion.div>

              {/* Delivery info */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }}
                className="flex items-center gap-2 text-sm text-slate-400">
                <Truck size={14} className={theme.accentText} />
                {config.deliveryNote}
              </motion.div>
            </div>

            {/* Right: promo card */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }}
              className="relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-sm">
                {/* Main promo card */}
                <div className={`rounded-3xl bg-gradient-to-br ${theme.accentGradient} p-8 text-white shadow-2xl`}>
                  <div className="text-xs font-semibold uppercase tracking-widest opacity-75 mb-2">Онцгой санал</div>
                  <div className="text-2xl font-black leading-tight mb-3">{config.promoText}</div>
                  <div className="text-sm opacity-80 mb-6">{config.promoSub}</div>
                  <div className="grid grid-cols-3 gap-2">
                    {config.products.slice(0, 3).map((p, i) => (
                      <div key={i} className="rounded-xl bg-white/20 backdrop-blur-sm p-3 text-center">
                        <div className="text-2xl mb-1">{p.emoji}</div>
                        <div className="text-[10px] font-bold leading-tight">{p.name.split(" ")[0]}</div>
                        <div className="text-xs font-black mt-1">{p.price}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Floating badges */}
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl border border-slate-100 px-4 py-2.5 text-center">
                  <div className="text-amber-400 text-xs tracking-widest">★★★★★</div>
                  <div className="font-black text-slate-900 text-sm">4.9/5</div>
                  <div className="text-[10px] text-slate-400">үнэлгээ</div>
                </motion.div>

                <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3.5, repeat: Infinity, delay: 1, ease: "easeInOut" }}
                  className="absolute -bottom-3 -left-4 bg-white rounded-2xl shadow-xl border border-slate-100 px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <Truck size={14} className={theme.accentText} />
                    <div>
                      <div className="text-xs font-bold text-slate-900">Үнэгүй хүргэлт</div>
                      <div className="text-[10px] text-slate-400">50,000₮-с дээш</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="py-10 bg-white border-b border-slate-100">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide">
            {config.categories.map((cat, i) => (
              <button key={i}
                className={`flex items-center gap-2 shrink-0 rounded-2xl border-2 ${theme.accentBorder} ${theme.accentBg} px-5 py-2.5 text-sm font-semibold ${theme.accentText} hover:shadow-md transition-all whitespace-nowrap`}>
                <span className="text-base">{cat.icon}</span>
                {cat.name}
                <ChevronRight size={13} className="opacity-60" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCTS GRID ── */}
      <section id="products" className="py-20 bg-slate-50">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn className="flex items-end justify-between mb-10">
            <div>
              <div className={`text-xs font-bold uppercase tracking-widest ${theme.accentText} mb-2`}>Шинэ бараа</div>
              <h2 className="text-3xl font-black text-slate-900">{config.productsTitle}</h2>
            </div>
            <a href="#contact" className={`text-sm font-semibold ${theme.accentText} flex items-center gap-1 hover:underline`}>
              Бүгдийг харах <ArrowRight size={14} />
            </a>
          </FadeIn>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {config.products.map((p, i) => (
              <ProductCard key={i} product={p} theme={theme} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW TO ORDER ── */}
      <section id="order" className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-6">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl font-black text-slate-900">{config.stepsTitle}</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-3 gap-6 relative">
            {/* Connector */}
            <div className="hidden sm:block absolute top-10 left-[calc(16.66%+1rem)] right-[calc(16.66%+1rem)] h-px border-t-2 border-dashed border-slate-200" />
            {config.steps.map((step, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <div className="text-center relative">
                  <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${theme.accentGradient} flex items-center justify-center text-white font-black text-2xl mx-auto mb-5 shadow-lg`}>
                    {i + 1}
                  </div>
                  <div className="font-black text-slate-900 mb-2">{step.title}</div>
                  <div className="text-sm text-slate-500 leading-relaxed">{step.desc}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      {config.reviews.length > 0 && (
        <section className="py-20 bg-slate-50">
          <div className="mx-auto max-w-5xl px-6">
            <FadeIn className="text-center mb-12">
              <h2 className="text-3xl font-black text-slate-900">Худалдан авагчдын сэтгэгдэл</h2>
            </FadeIn>
            <div className="grid gap-5 md:grid-cols-3">
              {config.reviews.map((r, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-1 mb-3">
                      {[1,2,3,4,5].map((s) => <Star key={s} size={13} className="text-amber-400 fill-amber-400" />)}
                    </div>
                    <div className="text-slate-700 text-sm leading-relaxed mb-4">"{r.text}"</div>
                    <div className="border-t border-slate-100 pt-3">
                      <div className="font-bold text-slate-900 text-sm">{r.name}</div>
                      <div className={`text-xs ${theme.accentText} mt-0.5`}>"{r.product}" авсан</div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CONTACT / SOCIAL ── */}
      <section id="contact" className={`py-20 bg-gradient-to-br ${theme.heroBg}`}>
        <div className="mx-auto max-w-4xl px-6 text-center">
          <FadeIn>
            <h2 className="text-4xl font-black text-slate-900 mb-3">{config.ctaText}</h2>
            <p className="text-slate-500 mb-10">Дурын барааг Facebook эсвэл утасаар захиалж болно</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {config.facebook && (
                <a href={`https://facebook.com/${config.facebook}`} target="_blank" rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r ${theme.accentGradient} px-8 py-4 text-sm font-bold text-white shadow-lg hover:shadow-xl transition-shadow`}>
                  <span className="text-base">📘</span> Facebook: {config.facebook}
                </a>
              )}
              {config.phone && (
                <a href={`tel:${config.phone}`}
                  className="inline-flex items-center justify-center gap-2.5 rounded-2xl border-2 border-slate-200 bg-white px-8 py-4 text-sm font-bold text-slate-800 hover:border-slate-300 transition shadow-sm">
                  <Phone size={16} /> {config.phone}
                </a>
              )}
              {config.instagram && (
                <a href={`https://instagram.com/${config.instagram}`} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 text-sm font-bold text-white shadow-sm">
                  <Instagram size={16} /> @{config.instagram}
                </a>
              )}
            </div>

            {/* Delivery info strip */}
            <div className="mt-10 inline-flex items-center gap-3 rounded-2xl bg-white border border-slate-100 px-6 py-3.5 shadow-sm text-sm text-slate-600">
              <Truck size={16} className={theme.accentText} />
              {config.deliveryNote}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-slate-100 bg-white py-8">
        <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400">
          <div className="flex items-center gap-2 font-black text-slate-900">
            <BrandLogo config={config} size="sm" />
            {config.brandName}
          </div>
          <div className="text-xs">Powered by <span className="font-semibold text-blue-600">Landing.mn</span></div>
          <div className="text-xs">© 2026 {config.brandName}</div>
        </div>
      </footer>
    </div>
  );
}
