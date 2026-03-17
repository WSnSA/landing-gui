import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import { useEffect, useState } from "react";
import PublicNav from "../components/PublicNav";

function useMouseTilt(strength = 12) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      setTilt({
        x: ((e.clientY - cy) / (r.height / 2)) * -strength,
        y: ((e.clientX - cx) / (r.width / 2)) * strength,
      });
    };
    const onLeave = () => setTilt({ x: 0, y: 0 });
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); };
  }, [strength]);
  return { ref, tilt };
}

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Glassmorphism floating badge
function GlassBadge({ label, sub, className }: { label: string; sub: string; className: string }) {
  return (
    <motion.div
      animate={{ y: [0, -7, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      className={`absolute rounded-2xl bg-white/70 backdrop-blur-md border border-white/90 px-4 py-3 shadow-lg ${className}`}
    >
      <div className="text-sm font-semibold text-slate-800">{label}</div>
      <div className="text-xs text-slate-400 mt-0.5">{sub}</div>
    </motion.div>
  );
}

function BrowserMockup() {
  const { ref, tilt } = useMouseTilt();
  return (
    <div ref={ref} style={{ perspective: "1200px" }} className="relative px-16 py-8">
      <motion.div
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: "spring", stiffness: 180, damping: 22 }}
        style={{ transformStyle: "preserve-3d" }}
        className="rounded-2xl overflow-hidden border border-white/80 bg-white/60 backdrop-blur-xl shadow-[0_32px_64px_rgba(99,102,241,0.15)]"
      >
        <div className="bg-slate-100/80 border-b border-slate-200/60 px-4 py-3 flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-rose-400" />
            <div className="h-3 w-3 rounded-full bg-amber-400" />
            <div className="h-3 w-3 rounded-full bg-emerald-400" />
          </div>
          <div className="flex-1 rounded-md bg-white/80 border border-slate-200/60 px-3 py-1.5 text-xs text-slate-400 text-center">
            landing.mn/p/cafe-luna
          </div>
        </div>
        <div className="bg-white">
          <div className="bg-blue-600 px-8 py-10 text-center text-white">
            <div className="text-xl font-bold">Cafe Luna</div>
            <div className="mt-2 text-sm text-blue-100">Монголын хамгийн затишный кофе шоп</div>
            <div className="mt-4 inline-block rounded-xl bg-white px-5 py-2 text-sm font-semibold text-blue-700">
              Цагийн захиалга →
            </div>
          </div>
          <div className="grid grid-cols-3">
            {["☕ Specialty coffee", "🥐 Нэрийн бялуу", "📍 СБД, 1-р хороо"].map((t) => (
              <div key={t} className="p-4 text-center text-xs text-slate-600 border-r border-slate-100 last:border-0">{t}</div>
            ))}
          </div>
        </div>
      </motion.div>

      <GlassBadge label="✓ Нийтлэгдсэн" sub="landing.mn/p/cafe-luna" className="-left-2 top-16" />
      <GlassBadge label="📈 128 үзэлт" sub="Өнөөдөр" className="-right-2 bottom-20" />
    </div>
  );
}

const STEPS = [
  { n: "01", title: "Template сонгох", desc: "50+ мэргэжлийн template-с өөрийн чиглэлд тохирсоныг сонго." },
  { n: "02", title: "Текстээ солих", desc: "Нэр, утас, зураг, хаяг — хажуугийн preview дээр шууд харж засна." },
  { n: "03", title: "Нийтлэх", desc: "Нэг товчоор нийтэлнэ. URL-аа QR код болгоно. Хуваалцана." },
];

const FEATURES = [
  { icon: "⚡", title: "5 минутад бэлэн", desc: "Кодчилол мэдэхгүй ч гэсэн мэргэжлийн вэбсайт хийнэ." },
  { icon: "🎨", title: "Мэргэжлийн дизайн", desc: "График дизайнер боловсруулсан 50+ template." },
  { icon: "📱", title: "Бүх төхөөрөмжид", desc: "Утас, tablet, компьютер — автоматаар зохицно." },
  { icon: "🔗", title: "Өөрийн URL", desc: "landing.mn/p/tanaincompani — богино, санахад хялбар." },
  { icon: "📊", title: "Үзэлтийн статистик", desc: "Хэдэн хүн сайтаа үзсэнийг хянана." },
  { icon: "🚀", title: "Нэг товчоор нийтлэх", desc: "Publish дарахад л шууд интернетэд гарна." },
];

const TESTIMONIALS = [
  { text: "5 минутад вэбсайтаа хийчихлээ. Их хялбар байна!", name: "Б. Дөлгөөн", role: "Гоо сайхны салон эзэн" },
  { text: "Кафегийнхаа QR кодыг менюд хийчихлаа. Хэрэглэгчид тааллаа.", name: "Э. Мөнхзул", role: "Cafe Nomad" },
  { text: "Ноорогтоо template сонгоод хагас цагт нийтэлсэн.", name: "Г. Батболд", role: "IT freelancer" },
];

export default function HomePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <PublicNav />

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-[calc(100vh-56px)] flex items-center overflow-hidden bg-slate-50">
        {/* Colored blobs behind glass elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 h-[600px] w-[600px] rounded-full bg-blue-400 blur-[160px] opacity-20" />
          <div className="absolute top-1/3 -right-32 h-[500px] w-[500px] rounded-full bg-indigo-400 blur-[140px] opacity-15" />
          <div className="absolute -bottom-20 left-1/3 h-[400px] w-[400px] rounded-full bg-sky-300 blur-[120px] opacity-20" />
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative mx-auto max-w-7xl px-6 pt-16 pb-20 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur-md border border-white/80 shadow-sm px-4 py-1.5 text-xs font-semibold text-blue-600 mb-6"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                Монголд #1 landing page builder
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.1 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] text-slate-900"
              >
                Таны вэб,{" "}
                <span className="text-blue-600">5 минутад.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.2 }}
                className="mt-6 text-lg text-slate-500 leading-relaxed max-w-lg"
              >
                Template сонгоно. Текстээ солино. Нийтэлнэ.
                Кодчилол, дизайнер, хүлээх хугацаа — бүгдийг арилгасан.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.3 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <Link
                  to="/register"
                  className="group inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition shadow-sm"
                >
                  Үнэгүй эхлэх
                  <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                </Link>
                <Link
                  to="/examples"
                  className="inline-flex items-center gap-2 rounded-xl bg-white/70 backdrop-blur-md border border-white/80 px-6 py-3 text-sm font-medium text-slate-700 hover:bg-white transition shadow-sm"
                >
                  Жишээ харах
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mt-10 flex items-center gap-6 text-sm text-slate-400"
              >
                {["Бүртгэл үнэгүй", "Карт шаардахгүй", "5 минутад бэлэн"].map((t) => (
                  <span key={t} className="flex items-center gap-1.5">
                    <span className="text-emerald-500">✓</span> {t}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Right — 3D glassmorphism mockup */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <BrowserMockup />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-300"
        >
          <div className="text-xs">доош гүйлгэ</div>
          <div className="h-5 w-0.5 bg-slate-200 rounded-full" />
        </motion.div>
      </section>

      {/* ── How it works ─────────────────────────────────────────── */}
      <section id="how" className="py-24 bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <FadeUp className="text-center mb-14">
            <div className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">Хэрхэн ажилладаг вэ?</div>
            <h2 className="text-4xl font-black text-slate-900">3 алхамаар бэлэн</h2>
          </FadeUp>

          <div className="grid gap-6 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <FadeUp key={s.n} delay={i * 0.12}>
                <div className="relative p-8 rounded-2xl bg-slate-50 border border-slate-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                  <div className="text-4xl font-black text-slate-200 mb-4 select-none">{s.n}</div>
                  <div className="text-base font-bold text-slate-900 mb-2">{s.title}</div>
                  <div className="text-sm text-slate-500 leading-relaxed">{s.desc}</div>
                  {i < STEPS.length - 1 && (
                    <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-slate-300 text-xl z-10">→</div>
                  )}
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────── */}
      <section id="features" className="py-24 bg-slate-50 relative overflow-hidden">
        {/* Very soft blob */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-full bg-blue-100 blur-[160px] opacity-60" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6">
          <FadeUp className="text-center mb-14">
            <div className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">Боломжууд</div>
            <h2 className="text-4xl font-black text-slate-900">
              Хэрэгтэй бүхэн <span className="text-blue-600">нэг дороос</span>
            </h2>
          </FadeUp>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => (
              <FadeUp key={f.title} delay={i * 0.07}>
                <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                  <div className="text-2xl mb-3">{f.icon}</div>
                  <div className="font-semibold text-slate-900 mb-1.5">{f.title}</div>
                  <div className="text-sm text-slate-500 leading-relaxed">{f.desc}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <FadeUp className="text-center mb-12">
            <h2 className="text-3xl font-black text-slate-900">Хэрэглэгчид юу хэлдэг вэ?</h2>
          </FadeUp>
          <div className="grid gap-4 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <FadeUp key={t.name} delay={i * 0.1}>
                <div className="rounded-2xl border border-slate-200 bg-white p-6">
                  <div className="text-sm text-yellow-400 mb-3 tracking-widest">★★★★★</div>
                  <div className="text-slate-700 text-sm leading-relaxed mb-4">"{t.text}"</div>
                  <div className="font-semibold text-slate-900 text-sm">{t.name}</div>
                  <div className="text-slate-400 text-xs mt-0.5">{t.role}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="py-28 bg-blue-600">
        <FadeUp className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Өнөөдөр эхэл.</h2>
          <p className="text-blue-100 mb-8">Бүртгэл үнэгүй. 5 минутад вэбсайтаа нийтэлнэ.</p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-blue-700 hover:bg-blue-50 transition shadow-sm"
          >
            Үнэгүй эхлэх →
          </Link>
        </FadeUp>
      </section>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer className="border-t border-slate-200 bg-white py-10">
        <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <div className="h-5 w-5 rounded-md bg-blue-600" />
            Landing.mn
          </div>
          <div className="flex gap-6">
            <Link to="/terms" className="hover:text-slate-700 transition">Үйлчилгээний нөхцөл</Link>
            <Link to="/privacy" className="hover:text-slate-700 transition">Нууцлал</Link>
            <Link to="/contact" className="hover:text-slate-700 transition">Холбоо барих</Link>
          </div>
          <div>© 2026 Landing.mn</div>
        </div>
      </footer>
    </div>
  );
}
