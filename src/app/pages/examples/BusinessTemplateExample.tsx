import { ArrowLeft, MapPin, Clock, Phone, Mail, Instagram, Facebook } from "lucide-react";
import { Link } from "react-router";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

export default function BusinessTemplateExample() {
  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="fixed top-4 left-4 z-50">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white text-[#0F172A] rounded-lg shadow-lg hover:shadow-xl transition-all border border-gray-200"
        >
          <ArrowLeft className="size-4" />
          <span className="text-sm font-medium">Буцах</span>
        </Link>
      </div>

      {/* Example Badge */}
      <div className="fixed top-4 right-4 z-50">
        <div className="px-4 py-2 bg-[#2563EB] text-white rounded-lg shadow-lg text-sm font-medium">
          BUSINESS Template жишээ
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1573840357491-06851c72e0d1?w=1080"
          alt="Cafe Luna Interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Cafe Luna</h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-6">
              Орчин үеийн кофе & цайны уутай дэлгүүр
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                ☕ Specialty Coffee
              </span>
              <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                🥐 Fresh Pastries
              </span>
              <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                📶 Free WiFi
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-6 bg-[#F8FAFC]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0F172A] mb-6">Бидний тухай</h2>
          <p className="text-lg text-[#64748B] leading-relaxed mb-4">
            Cafe Luna нь 2020 оноос хойш Улаанбаатар хотын төвд үйл ажиллагаа явуулж буй 
            орчин үеийн кофе шопп юм. Бид дэлхийн хамгийн сайн чанарын кофены үрээ импортлон, 
            өөрсдийн барриста нарын гараар боловсруулж, танд үйлчилж байна.
          </p>
          <p className="text-lg text-[#64748B] leading-relaxed">
            Манай зорилго бол та бүхэнд зөвхөн амттай кофе биш, тохилог орчин, найрсаг 
            уур амьсгалыг бүрдүүлэн өгөх явдал юм.
          </p>
        </div>
      </section>

      {/* Menu Highlights */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0F172A] mb-10 text-center">
            Онцлох бүтээгдэхүүн
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Item 1 */}
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                <span className="text-6xl">☕</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#0F172A] mb-2">Signature Latte</h3>
                <p className="text-[#64748B] text-sm mb-4">
                  Манай онцгой жороор бэлтгэсэн latte
                </p>
                <p className="text-2xl font-bold text-[#2563EB]">8,500₮</p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                <span className="text-6xl">🍵</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#0F172A] mb-2">Matcha Premium</h3>
                <p className="text-[#64748B] text-sm mb-4">
                  Японы certified organic matcha
                </p>
                <p className="text-2xl font-bold text-[#2563EB]">12,000₮</p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center">
                <span className="text-6xl">🥐</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#0F172A] mb-2">Croissant Set</h3>
                <p className="text-[#64748B] text-sm mb-4">
                  Butter croissant + кофе combo
                </p>
                <p className="text-2xl font-bold text-[#2563EB]">15,000₮</p>
              </div>
            </div>
          </div>
          <div className="text-center mt-10">
            <button className="px-8 py-3 bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition-colors font-medium">
              Бүх цэс харах
            </button>
          </div>
        </div>
      </section>

      {/* Location & Hours */}
      <section className="py-16 px-6 bg-[#F8FAFC]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0F172A] mb-10 text-center">
            Байршил & Ажлын цаг
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Location */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-[#0F172A] mb-6">Хаяг</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="size-5 text-[#2563EB] flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-[#0F172A] font-medium">СБД, 1-р хороо</p>
                    <p className="text-[#64748B] text-sm">Seoul Street 45, Улаанбаатар 14200</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="size-5 text-[#2563EB] flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-[#0F172A] font-medium">+976 8888 7777</p>
                    <p className="text-[#64748B] text-sm">Захиалга, лавлах</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="size-5 text-[#2563EB] flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-[#0F172A] font-medium">hello@cafeluna.mn</p>
                    <p className="text-[#64748B] text-sm">Асуулт, санал хүсэлт</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-[#0F172A] mb-6">Ажлын цаг</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[#64748B]">Даваа - Баасан</span>
                  <span className="text-[#0F172A] font-medium">07:00 - 22:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#64748B]">Бямба</span>
                  <span className="text-[#0F172A] font-medium">08:00 - 23:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#64748B]">Ням</span>
                  <span className="text-[#0F172A] font-medium">08:00 - 23:00</span>
                </div>
                <div className="pt-4 mt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="size-4 text-[#2563EB]" />
                    <span className="text-[#0F172A] font-medium text-sm">Одоо нээлттэй</span>
                  </div>
                  <p className="text-[#64748B] text-sm">22:00 цагт хаагдана</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social & CTA */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#0F172A] mb-6">
            Бидэнтэй холбогдох
          </h2>
          <p className="text-lg text-[#64748B] mb-8">
            Шинэ мэдээ, урамшууллын мэдээллийг авахыг хүсвэл биднийг дагаарай
          </p>
          <div className="flex items-center justify-center gap-4 mb-10">
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
            >
              <Instagram className="size-5" />
              <span>Instagram</span>
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Facebook className="size-5" />
              <span>Facebook</span>
            </a>
          </div>
          <button className="px-10 py-4 bg-[#2563EB] text-white rounded-xl hover:bg-[#1D4ED8] transition-all hover:scale-105 text-lg font-medium shadow-lg">
            Ширээ захиалах
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-[#F8FAFC] py-8 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#64748B] text-sm">
            © 2026 Cafe Luna. All rights reserved. • landing.mn-ээр хийгдсэн
          </p>
        </div>
      </footer>
    </div>
  );
}
