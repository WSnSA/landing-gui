import {
  FileText,
  Pencil,
  Timer,
  Menu as MenuIcon,
  Heart,
  Calendar,
  Briefcase,
} from "lucide-react";
import { Link } from "react-router";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

export default function HomePage() {
  const prefersReducedMotion = useReducedMotion();

  const [mousePosition, setMousePosition] = useState({ x: 50, y: 35 });

  // rAF throttle to avoid re-render flood
  const rafRef = useRef<number | null>(null);
  const pendingRef = useRef<{ x: number; y: number } | null>(null);

  // Detect coarse pointer (mobile/tablet touch)
  const isCoarsePointerRef = useRef(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    isCoarsePointerRef.current = window.matchMedia("(pointer: coarse)").matches;
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion) return;
    if (isCoarsePointerRef.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    pendingRef.current = { x, y };

    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      if (pendingRef.current) setMousePosition(pendingRef.current);
      rafRef.current = null;
    });
  };

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
      <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 rounded">
              <img
                  src="../../assets/logo_landing.png"
                  alt="Landing Page Logo"
                  className="h-8"
              />
            </Link>

            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                  to="/login"
                  className="px-4 sm:px-5 py-2 text-[#64748B] hover:text-[#0F172A] transition-colors rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
              >
                Нэвтрэх
              </Link>
              <Link
                  to="/register"
                  className="px-4 sm:px-5 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition-colors shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
              >
                Бүртгүүлэх
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        {/* HERO – STRONG VERSION */}
        <section
            className="relative min-h-[100svh] w-full flex items-center justify-center overflow-hidden"
            onMouseMove={handleMouseMove}
            aria-label="Hero section"
        >
          {/* Background emphasis */}
          {!prefersReducedMotion && (
              <div
                  className="absolute inset-0"
                  style={{
                    background: `
          radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%,
            rgba(37,99,235,0.18) 0%,
            rgba(37,99,235,0.10) 25%,
            transparent 55%)
        `,
                  }}
                  aria-hidden="true"
              />
          )}

          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">

            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6
                    rounded-full bg-blue-50 text-[#2563EB] text-sm font-medium">
              Нэг QR код → Нэг дижитал хуудас
            </div>

            {/* Main headline */}
            <motion.h1
                className="text-5xl sm:text-6xl md:text-7xl font-extrabold
                 tracking-tight leading-[1.05] mb-6"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
              Цахим хуудсаа
              <br />
              <span className="text-[#2563EB]">
        өөрөө бүтээ
      </span>
            </motion.h1>

            {/* Value proposition */}
            <motion.p
                className="text-xl sm:text-2xl text-[#475569]
                 max-w-3xl mx-auto mb-10 leading-relaxed"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
            >
              Меню, урилга, урамшуулал, бизнес танилцуулгыг
              <br className="hidden sm:block" />
              <span className="font-semibold text-[#0F172A]">
        5 минутын дотор
      </span>{" "}
              үүсгээд QR кодоор түгээ.
            </motion.p>

            {/* Primary CTA */}
            <motion.div
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
            >
              <Link
                  to="/create"
                  className="px-12 py-4 bg-[#2563EB] text-white rounded-xl
                   text-lg font-semibold shadow-xl
                   hover:bg-[#1D4ED8] transition-colors
                   focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
              >
                Хуудас үүсгэх →
              </Link>

              <Link
                  to="/examples"
                  className="px-10 py-4 text-[#2563EB] font-medium
                   hover:underline underline-offset-4"
              >
                Жишээ харах
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6
                    text-sm text-[#64748B]">
              <span>✓ Код бичих шаардлагагүй</span>
              <span>✓ Хугацаа дуусмагц хаагдана</span>
              <span>✓ Гар утсанд төгс</span>
            </div>
          </div>
        </section>


        {/* How It Works */}
        <section className="bg-white py-18 sm:py-20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-14">
              Хэрхэн ажилладаг вэ?
            </h2>
            <div className="grid md:grid-cols-3 gap-10 md:gap-12">
              {[
                {
                  Icon: FileText,
                  title: "Template сонгоно",
                  desc: "Бэлэн загвараас сонгоод эсвэл хоосон хуудаснаас эхэлнэ",
                },
                {
                  Icon: Pencil,
                  title: "Контентоо оруулна",
                  desc: "Текст, зураг, холбоосоо нэмээд бэлэн болгоно",
                },
                {
                  Icon: Timer,
                  title: "Хугацаа сонгоод ашиглана",
                  desc: "Хэрэгтэй хугацаагаа сонгоод төлөөд ашиглаарай",
                },
              ].map(({ Icon, title, desc }) => (
                  <div key={title} className="text-center">
                    <div className="inline-flex items-center justify-center size-16 bg-blue-50 rounded-2xl mb-6">
                      <Icon className="size-8 text-[#2563EB]" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{title}</h3>
                    <p className="text-[#64748B]">{desc}</p>
                  </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-18 sm:py-20 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-14">Хэрэглээ</h2>
            <div className="grid md:grid-cols-4 gap-6 md:gap-8">
              {[
                { Icon: MenuIcon, title: "Menu / Promotion", desc: "Хурдан урамшууллын хуудас үүсгэх" },
                { Icon: Heart, title: "Wedding invitation", desc: "Хуримын урилга дижитлээр" },
                { Icon: Calendar, title: "Event page", desc: "Арга хэмжээний мэдээлэл" },
                { Icon: Briefcase, title: "Business introduction", desc: "Бизнесээ танилцуулах" },
              ].map(({ Icon, title, desc }) => (
                  <div
                      key={title}
                      className="bg-white border border-gray-200 rounded-2xl p-7 md:p-8 hover:shadow-lg transition-shadow focus-within:ring-2 focus-within:ring-blue-500/40"
                  >
                    <div className="inline-flex items-center justify-center size-12 bg-blue-50 rounded-xl mb-4">
                      <Icon className="size-6 text-[#2563EB]" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{title}</h3>
                    <p className="text-[#64748B] text-sm leading-relaxed">{desc}</p>
                  </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                  to="/examples"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-sm font-medium text-[#0F172A] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
              >
                Бүх жишээ загвар харах →
              </Link>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="bg-white py-18 sm:py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-3">💰 ҮНЭ, БАГЦУУД</h2>
              <p className="text-lg sm:text-xl text-[#64748B] mb-1">Хуудас үүсгэхэд төлбөр байхгүй</p>
              <p className="text-lg sm:text-xl text-[#64748B]">Зөвхөн ашиглах хугацаандаа л төлнө</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto mb-10 sm:mb-12">
              {/* БАГЦ 1 */}
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-7 md:p-8 hover:border-[#2563EB] transition-colors shadow-sm hover:shadow-md">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">БАГЦ 1 — FREE TEMPLATE</h3>
                  <p className="text-[#64748B] font-medium">Өөрөө угсраад, хугацаандаа төл</p>
                </div>

                <div className="mb-6">
                  <p className="text-sm font-semibold mb-2">Хэнд:</p>
                  <p className="text-sm text-[#64748B]">Жижиг зар, түр эвент, энгийн меню, танилцуулга</p>
                </div>

                <div className="mb-6">
                  <p className="text-sm font-semibold mb-3">Юу багтсан бэ</p>
                  <ul className="space-y-2 text-sm text-[#64748B]">
                    <li>✓ Үнэгүй basic template</li>
                    <li>✓ Өөрөө текст, зураг оруулна</li>
                    <li>✓ 1 landing хуудас</li>
                    <li>✓ 1 URL + QR</li>
                    <li>✓ Хугацаа дуусвал автоматаар хаагдана</li>
                  </ul>
                </div>

                <div className="mb-6 p-4 bg-[#F8FAFC] rounded-xl border border-gray-100">
                  <p className="text-sm font-semibold mb-3">Үнэ (зөвхөн хугацаа):</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#64748B]">7 хоног</span>
                      <span className="font-semibold">5,000 ₮</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#64748B]">1 сар</span>
                      <span className="font-semibold">20,000 ₮</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#64748B]">3 сар</span>
                      <span className="font-semibold">50,000 ₮</span>
                    </div>
                  </div>
                </div>

                <Link
                    to="/examples/free"
                    className="block w-full px-6 py-3 text-center bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition-colors font-medium mb-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
                >
                  Жишээ харах
                </Link>
                <Link
                    to="/create?plan=free"
                    className="block w-full px-6 py-3 text-center border-2 border-[#2563EB] text-[#2563EB] rounded-lg hover:bg-blue-50 transition-colors font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
                >
                  Хуудас үүсгэх
                </Link>
              </div>

              {/* БАГЦ 2 */}
              <div className="bg-white border-2 border-[#2563EB] rounded-2xl p-7 md:p-8 relative shadow-lg">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#2563EB] text-white text-sm font-semibold rounded-full shadow">
                  Алдартай
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">БАГЦ 2 — BUSINESS TEMPLATE</h3>
                  <p className="text-[#64748B] font-medium">Жижиг, дунд бизнесэд зориулав</p>
                </div>

                <div className="mb-6">
                  <p className="text-sm font-semibold mb-2">Хэнд:</p>
                  <p className="text-sm text-[#64748B]">Кафе, ресторан, салон, сургалтын төв, ЖДБ</p>
                </div>

                <div className="mb-6">
                  <p className="text-sm font-semibold mb-3">Юу багтсан бэ</p>
                  <ul className="space-y-2 text-sm text-[#64748B]">
                    <li>✓ Бизнес зориулалтын template</li>
                    <li>✓ Mobile-first дизайн</li>
                    <li>✓ Контентоо өөрөө удирдана</li>
                    <li>✓ Илүү цэвэр, мэргэжлийн харагдана</li>
                    <li>✓ Анхны үүсгэлт үнэгүй</li>
                  </ul>
                </div>

                <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <p className="text-sm font-semibold mb-3">Үнэ (хэрэглэх хугацаа):</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#64748B]">1 сар</span>
                      <span className="font-semibold">50,000 ₮</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#64748B]">3 сар</span>
                      <span className="font-semibold">140,000 ₮</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#64748B]">6 сар</span>
                      <span className="font-semibold">250,000 ₮</span>
                    </div>
                  </div>
                </div>

                <Link
                    to="/examples/business"
                    className="block w-full px-6 py-3 text-center bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition-colors font-medium mb-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
                >
                  Жишээ харах
                </Link>
                <Link
                    to="/create?plan=business"
                    className="block w-full px-6 py-3 text-center border-2 border-[#2563EB] text-[#2563EB] rounded-lg hover:bg-blue-50 transition-colors font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
                >
                  Business багц сонгох
                </Link>
              </div>

              {/* БАГЦ 3 */}
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-7 md:p-8 hover:border-[#2563EB] transition-colors shadow-sm hover:shadow-md">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">БАГЦ 3 — DONE FOR YOU</h3>
                  <p className="text-[#64748B] font-medium">Манай баг таны өмнөөс бүгдийг хийнэ</p>
                </div>

                <div className="mb-6">
                  <p className="text-sm font-semibold mb-2">Хэнд:</p>
                  <p className="text-sm text-[#64748B]">Хурим, эвент, байгууллагын танилцуулга</p>
                </div>

                <div className="mb-6">
                  <p className="text-sm font-semibold mb-3">Юу багтсан бэ</p>
                  <ul className="space-y-2 text-sm text-[#64748B]">
                    <li>✓ Custom дизайн</li>
                    <li>✓ Контент оруулж өгнө</li>
                    <li>✓ Brand-д тааруулна</li>
                    <li>✓ QR + URL</li>
                    <li>✓ Богино хугацаанд байршуулалтын төлбөргүй</li>
                  </ul>
                </div>

                <div className="mb-6 p-4 bg-[#F8FAFC] rounded-xl border border-gray-100">
                  <p className="text-sm font-semibold mb-2">⚠️ Энэ багцад хугацааны төлбөр байхгүй</p>
                  <p className="text-sm text-[#64748B] mb-3">Үнэ = дизайн + хөдөлмөр + чанар</p>
                  <p className="text-sm font-semibold mb-2">Жишээ үнэ</p>
                  <div className="space-y-2 text-sm text-[#64748B]">
                    <div>
                      💍 Хуримын урилга — <span className="font-semibold text-[#0F172A]">300k – 900k ₮</span>
                    </div>
                    <div>
                      🎉 Event / Campaign — <span className="font-semibold text-[#0F172A]">500k – 2M ₮</span>
                    </div>
                    <div>
                      🏢 Байгууллагын танилцуулга — <span className="font-semibold text-[#0F172A]">800k – 2M+ ₮</span>
                    </div>
                  </div>
                </div>

                <Link
                    to="/examples/done-for-you"
                    className="block w-full px-6 py-3 text-center bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition-colors font-medium mb-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
                >
                  Жишээ харах
                </Link>
                <Link
                    to="/contact?type=done-for-you"
                    className="block w-full px-6 py-3 text-center border-2 border-[#2563EB] text-[#2563EB] rounded-lg hover:bg-blue-50 transition-colors font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
                >
                  Захиалга өгөх
                </Link>
              </div>
            </div>

            {/* Additional Info */}
            <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <p className="text-sm font-semibold mb-3">🔁 НЭМЭЛТ МЭДЭЭЛЭЛ</p>
              <ul className="space-y-2 text-sm text-[#64748B]">
                <li>• Хугацаа дуусахаас өмнө сунгах боломжтой</li>
                <li>• Контент засахад дахин хэвлэх зардал байхгүй</li>
                <li>• Нэг QR → нэг эх сурвалж</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-18 sm:py-20 bg-[#F8FAFC]">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-5">5 минутын дотор бэлэн</h2>
            <p className="text-lg sm:text-xl text-[#64748B] mb-8">
              Өнөөдөр л эхэлж, дижитал хуудсаа ашиглаарай
            </p>
            <Link
                to="/create"
                className="inline-flex items-center justify-center px-10 py-4 bg-[#2563EB] text-white rounded-xl hover:bg-[#1D4ED8] transition-colors text-lg shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
            >
              Одоо эхлэх →
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-200 bg-white py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div>
                <div className="mb-4">
                  <img
                      src="../../assets/logo_landing.png"
                      alt="landing.mn"
                      className="h-6"
                      loading="lazy"
                  />
                </div>
                <p className="text-[#64748B] text-sm max-w-md leading-relaxed">
                  Цаасан брошурын орчин үеийн дижитал шийдэл. Хурдан, энгийн, хэмнэлттэй.
                </p>
              </div>

              <div className="flex md:justify-end gap-8">
                <Link
                    to="/terms"
                    className="text-[#64748B] hover:text-[#0F172A] transition-colors text-sm rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
                >
                  Terms
                </Link>
                <Link
                    to="/privacy"
                    className="text-[#64748B] hover:text-[#0F172A] transition-colors text-sm rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
                >
                  Privacy
                </Link>
                <Link
                    to="/contact"
                    className="text-[#64748B] hover:text-[#0F172A] transition-colors text-sm rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
                >
                  Contact
                </Link>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200 text-center text-[#64748B] text-sm">
              © 2026 landing.mn. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
  );
}
