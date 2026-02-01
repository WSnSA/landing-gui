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
import { motion } from "motion/react";
import { useState } from "react";
import logo from "figma:asset/dee2a0a671c744517d913c328202b0eb534c6702.png";

export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="LANDING.MN" className="h-8" />
          </Link>
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="px-5 py-2 text-[#64748B] hover:text-[#0F172A] transition-colors"
            >
              Нэвтрэх
            </Link>
            <Link
              to="/register"
              className="px-5 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition-colors"
            >
              Бүртгүүлэх
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="relative max-w-7xl mx-auto px-6 py-32 text-center overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        {/* Dynamic Background with Mouse Tracking */}
        <div
          className="absolute inset-0 transition-all duration-300 ease-out"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(37, 99, 235, 0.08) 0%, rgba(59, 130, 246, 0.05) 25%, transparent 50%)`,
          }}
        ></div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating gradient orbs */}
          <motion.div
            className="absolute w-96 h-96 bg-blue-100/40 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ top: "10%", right: "10%" }}
          />
          <motion.div
            className="absolute w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"
            animate={{
              x: [0, -80, 0],
              y: [0, 60, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ bottom: "15%", left: "5%" }}
          />
        </div>

        <div className="relative z-10">
          {/* Paper to Digital Animation */}
          <div className="mb-12 flex items-center justify-center gap-6">
            {/* Paper Stack Animation */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-col gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-16 h-20 bg-white border-2 border-gray-300 rounded-sm shadow-md"
                    animate={{
                      rotate: [0, -2, 0],
                      y: [0, -2, 0],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{
                      marginTop: i === 0 ? 0 : -16,
                      zIndex: 3 - i,
                    }}
                  >
                    <div className="p-2">
                      <div className="w-full h-1 bg-gray-200 rounded mb-1"></div>
                      <div className="w-3/4 h-1 bg-gray-200 rounded mb-1"></div>
                      <div className="w-full h-1 bg-gray-200 rounded"></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Arrow Animation */}
            <motion.div
              animate={{
                x: [0, 10, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="text-[#2563EB]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </motion.div>

            {/* Digital Screen Animation */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.div
                className="w-20 h-24 bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] rounded-lg shadow-xl overflow-hidden"
                animate={{
                  boxShadow: [
                    "0 10px 30px rgba(37, 99, 235, 0.3)",
                    "0 15px 40px rgba(37, 99, 235, 0.4)",
                    "0 10px 30px rgba(37, 99, 235, 0.3)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="p-3 flex flex-col gap-1">
                  <motion.div
                    className="w-full h-1 bg-white/80 rounded"
                    animate={{ width: ["50%", "100%", "50%"] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  ></motion.div>
                  <div className="w-3/4 h-1 bg-white/60 rounded"></div>
                  <div className="w-full h-1 bg-white/60 rounded"></div>
                  <div className="mt-2 grid grid-cols-2 gap-1">
                    <div className="h-8 bg-white/40 rounded"></div>
                    <div className="h-8 bg-white/40 rounded"></div>
                  </div>
                </div>
                {/* Screen glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-transparent"
                  animate={{
                    y: ["-100%", "200%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-[#2563EB] rounded-full text-sm font-medium mb-8 border border-blue-100"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.span
              className="size-2 bg-[#2563EB] rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [1, 0.7, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            ></motion.span>
            Цаасгүй ирээдүй
          </motion.div>

          <motion.h1
            className="text-6xl md:text-7xl font-bold text-[#0F172A] mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Цаасан брошурын оронд
            <br />
            <span className="bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] bg-clip-text text-transparent">
              дижитал landing хуудас
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-[#64748B] mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            HTML микро-хуудас үүсгээд, ашиглах хугацаандаа л төл.
            <br />
            <span className="text-[#2563EB] font-medium">
              Хурдан. Хялбар. Хэмнэлттэй.
            </span>
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <motion.button
              className="px-10 py-4 bg-[#2563EB] text-white rounded-xl hover:bg-[#1D4ED8] transition-all text-lg font-medium shadow-lg"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(37, 99, 235, 0.3)" }}
              whileTap={{ scale: 0.98 }}
            >
              Хуудас үүсгэх →
            </motion.button>
            <motion.button
              className="px-10 py-4 text-[#64748B] hover:text-[#2563EB] transition-colors text-lg font-medium flex items-center gap-2"
              whileHover={{ x: 5 }}
            >
              Загваруудыг харах
              <span className="text-[#2563EB]">→</span>
            </motion.button>
          </motion.div>

          {/* Stats or trust indicators */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-8 text-sm text-[#64748B]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="flex items-center gap-2">
              <div className="size-5 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="size-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span>5 минутад бэлэн</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-5 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="size-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span>Код бичих шаардлагагүй</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-5 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="size-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span>Автомат хаалт</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#0F172A] text-center mb-16">
            Хэрхэн ажилладаг вэ?
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center size-16 bg-blue-50 rounded-2xl mb-6">
                <FileText className="size-8 text-[#2563EB]" />
              </div>
              <h3 className="text-xl font-semibold text-[#0F172A] mb-3">
                Template сонгоно
              </h3>
              <p className="text-[#64748B]">
                Бэлэн загвараас сонгоод эсвэл хоосон хуудаснаас эхэлнэ
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center size-16 bg-blue-50 rounded-2xl mb-6">
                <Pencil className="size-8 text-[#2563EB]" />
              </div>
              <h3 className="text-xl font-semibold text-[#0F172A] mb-3">
                Контентоо оруулна
              </h3>
              <p className="text-[#64748B]">
                Текст, зураг, холбоосоо нэмээд бэлэн болгоно
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center size-16 bg-blue-50 rounded-2xl mb-6">
                <Timer className="size-8 text-[#2563EB]" />
              </div>
              <h3 className="text-xl font-semibold text-[#0F172A] mb-3">
                Хугацаа сонгоод ашиглана
              </h3>
              <p className="text-[#64748B]">
                Хэрэгтэй хугацаагаа сонгоод төлөөд ашиглаарай
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#0F172A] text-center mb-16">
            Хэрэглээ
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center size-12 bg-blue-50 rounded-xl mb-4">
                <MenuIcon className="size-6 text-[#2563EB]" />
              </div>
              <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
                Menu / Promotion
              </h3>
              <p className="text-[#64748B] text-sm">
                Хурдан урамшууллын хуудас үүсгэх
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center size-12 bg-blue-50 rounded-xl mb-4">
                <Heart className="size-6 text-[#2563EB]" />
              </div>
              <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
                Wedding invitation
              </h3>
              <p className="text-[#64748B] text-sm">
                Хуримын урилга дижитлээр
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center size-12 bg-blue-50 rounded-xl mb-4">
                <Calendar className="size-6 text-[#2563EB]" />
              </div>
              <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
                Event page
              </h3>
              <p className="text-[#64748B] text-sm">
                Арга хэмжээний мэдээлэл
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center size-12 bg-blue-50 rounded-xl mb-4">
                <Briefcase className="size-6 text-[#2563EB]" />
              </div>
              <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
                Business introduction
              </h3>
              <p className="text-[#64748B] text-sm">
                Бизнесээ танилцуулах
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#0F172A] mb-4">
              💰 ҮНЭ, БАГЦУУД
            </h2>
            <p className="text-xl text-[#64748B] mb-2">
              Хуудас үүсгэхэд төлбөр байхгүй
            </p>
            <p className="text-xl text-[#64748B]">
              Зөвхөн ашиглах хугацаандаа л төлнө
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
            {/* БАГЦ 1 - FREE TEMPLATE */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-[#2563EB] transition-colors">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-[#0F172A] mb-2">
                  БАГЦ 1 — FREE TEMPLATE
                </h3>
                <p className="text-[#64748B] font-medium">
                  Өөрөө угсраад, хугацаандаа төл
                </p>
              </div>

              <div className="mb-6">
                <p className="text-sm font-semibold text-[#0F172A] mb-2">Хэнд:</p>
                <p className="text-sm text-[#64748B]">
                  Жижиг зар, түр эвент, энгийн меню, танилцуулга
                </p>
              </div>

              <div className="mb-6">
                <p className="text-sm font-semibold text-[#0F172A] mb-3">Юу багтсан бэ</p>
                <ul className="space-y-2 text-sm text-[#64748B]">
                  <li>✓ Үнэгүй basic template</li>
                  <li>✓ Өөрөө текст, зураг оруулна</li>
                  <li>✓ 1 landing хуудас</li>
                  <li>✓ 1 URL + QR</li>
                  <li>✓ Хугацаа дуусвал автоматаар хаагдана</li>
                </ul>
              </div>

              <div className="mb-6 p-4 bg-[#F8FAFC] rounded-xl">
                <p className="text-sm font-semibold text-[#0F172A] mb-3">
                  Үнэ (зөвхөн хугацаа):
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">7 хоног</span>
                    <span className="font-semibold text-[#0F172A]">5,000 ₮</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">1 сар</span>
                    <span className="font-semibold text-[#0F172A]">20,000 ₮</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">3 сар</span>
                    <span className="font-semibold text-[#0F172A]">50,000 ₮</span>
                  </div>
                </div>
              </div>

              <Link
                to="/examples/free"
                className="block w-full px-6 py-3 text-center bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition-colors font-medium mb-3"
              >
                Жишээ харах
              </Link>
              <button className="w-full px-6 py-3 border-2 border-[#2563EB] text-[#2563EB] rounded-lg hover:bg-blue-50 transition-colors font-medium">
                Хуудас үүсгэх
              </button>
            </div>

            {/* БАГЦ 2 - BUSINESS TEMPLATE */}
            <div className="bg-white border-2 border-[#2563EB] rounded-2xl p-8 relative shadow-lg">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#2563EB] text-white text-sm font-semibold rounded-full">
                Алдартай
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-[#0F172A] mb-2">
                  БАГЦ 2 — BUSINESS TEMPLATE
                </h3>
                <p className="text-[#64748B] font-medium">
                  Жижиг, дунд бизнесэд зориулав
                </p>
              </div>

              <div className="mb-6">
                <p className="text-sm font-semibold text-[#0F172A] mb-2">Хэнд:</p>
                <p className="text-sm text-[#64748B]">
                  Кафе, ресторан, салон, сургалтын төв, ЖДБ
                </p>
              </div>

              <div className="mb-6">
                <p className="text-sm font-semibold text-[#0F172A] mb-3">Юу багтсан бэ</p>
                <ul className="space-y-2 text-sm text-[#64748B]">
                  <li>✓ Бизнес зориулалтын template</li>
                  <li>✓ Mobile-first дизайн</li>
                  <li>✓ Контентоо өөрөө удирдана</li>
                  <li>✓ Илүү цэвэр, мэргэжлийн харагдана</li>
                  <li>✓ Анхны үүсгэлт үнэгүй</li>
                </ul>
              </div>

              <div className="mb-6 p-4 bg-blue-50 rounded-xl">
                <p className="text-sm font-semibold text-[#0F172A] mb-3">
                  Үнэ (хэрэглэх хугацаа):
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">1 сар</span>
                    <span className="font-semibold text-[#0F172A]">50,000 ₮</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">3 сар</span>
                    <span className="font-semibold text-[#0F172A]">140,000 ₮</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">6 сар</span>
                    <span className="font-semibold text-[#0F172A]">250,000 ₮</span>
                  </div>
                </div>
              </div>

              <Link
                to="/examples/business"
                className="block w-full px-6 py-3 text-center bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition-colors font-medium mb-3"
              >
                Жишээ харах
              </Link>
              <button className="w-full px-6 py-3 border-2 border-[#2563EB] text-[#2563EB] rounded-lg hover:bg-blue-50 transition-colors font-medium">
                Business багц сонгох
              </button>
            </div>

            {/* БАГЦ 3 - DONE FOR YOU */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-[#2563EB] transition-colors">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-[#0F172A] mb-2">
                  БАГЦ 3 — DONE FOR YOU
                </h3>
                <p className="text-[#64748B] font-medium">
                  Манай баг таны өмнөөс бүгдийг хийнэ
                </p>
              </div>

              <div className="mb-6">
                <p className="text-sm font-semibold text-[#0F172A] mb-2">Хэнд:</p>
                <p className="text-sm text-[#64748B]">
                  Хурим, эвент, байгууллагын танилцуулга
                </p>
              </div>

              <div className="mb-6">
                <p className="text-sm font-semibold text-[#0F172A] mb-3">Юу багтсан бэ</p>
                <ul className="space-y-2 text-sm text-[#64748B]">
                  <li>✓ Custom дизайн</li>
                  <li>✓ Контент оруулж өгнө</li>
                  <li>✓ Brand-д тааруулна</li>
                  <li>✓ QR + URL</li>
                  <li>✓ Богино хугацаанд байршуулалтын төлбөргүй</li>
                </ul>
              </div>

              <div className="mb-6 p-4 bg-[#F8FAFC] rounded-xl">
                <p className="text-sm font-semibold text-[#0F172A] mb-2">
                  ⚠️ Энэ багцад хугацааны төлбөр байхгүй
                </p>
                <p className="text-sm text-[#64748B] mb-3">
                  Үнэ = дизайн + хөдөлмөр + чанар
                </p>
                <p className="text-sm font-semibold text-[#0F172A] mb-2">Жишээ үнэ</p>
                <div className="space-y-2 text-sm text-[#64748B]">
                  <div>
                    💍 Хуримын урилга —{" "}
                    <span className="font-semibold text-[#0F172A]">300k – 900k ₮</span>
                  </div>
                  <div>
                    🎉 Event / Campaign —{" "}
                    <span className="font-semibold text-[#0F172A]">500k – 2M ₮</span>
                  </div>
                  <div>
                    🏢 Байгууллагын танилцуулга —{" "}
                    <span className="font-semibold text-[#0F172A]">800k – 2M+ ₮</span>
                  </div>
                </div>
              </div>

              <Link
                to="/examples/done-for-you"
                className="block w-full px-6 py-3 text-center bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition-colors font-medium mb-3"
              >
                Жишээ харах
              </Link>
              <button className="w-full px-6 py-3 border-2 border-[#2563EB] text-[#2563EB] rounded-lg hover:bg-blue-50 transition-colors font-medium">
                Захиалга өгөх
              </button>
            </div>
          </div>

          {/* Additional Info */}
          <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-xl p-6">
            <p className="text-sm font-semibold text-[#0F172A] mb-3">
              🔁 НЭМЭЛТ МЭДЭЭЛЭЛ
            </p>
            <ul className="space-y-2 text-sm text-[#64748B]">
              <li>• Хугацаа дуусахаас өмнө сунгах боломжтой</li>
              <li>• Контент засахад дахин хэвлэх зардал байхгүй</li>
              <li>• Нэг QR → нэг эх сурвалж</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-[#0F172A] mb-6">
            5 минутын дотор бэлэн
          </h2>
          <p className="text-xl text-[#64748B] mb-8">
            Өнөөдөр л эхэлж, дижитал хуудсаа ашиглаарай
          </p>
          <button className="px-10 py-4 bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition-colors text-lg">
            Одоо эхлэх
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="mb-4">
                <img src={logo} alt="landing.mn" className="h-6" />
              </div>
              <p className="text-[#64748B] text-sm max-w-md">
                Цаасан брошурын орчин үеийн дижитал шийдэл. Хурдан, энгийн, хэмнэлттэй.
              </p>
            </div>
            <div className="flex justify-end gap-8">
              <a href="#" className="text-[#64748B] hover:text-[#0F172A] transition-colors text-sm">
                Terms
              </a>
              <a href="#" className="text-[#64748B] hover:text-[#0F172A] transition-colors text-sm">
                Privacy
              </a>
              <a href="#" className="text-[#64748B] hover:text-[#0F172A] transition-colors text-sm">
                Contact
              </a>
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