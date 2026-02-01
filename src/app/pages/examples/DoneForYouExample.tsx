import { ArrowLeft, Calendar, MapPin, Clock, Heart, Gift } from "lucide-react";
import { Link } from "react-router";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

export default function DoneForYouExample() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50">
      {/* Back Button */}
      <div className="fixed top-4 left-4 z-50">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white text-[#0F172A] rounded-lg shadow-lg hover:shadow-xl transition-all border border-rose-200"
        >
          <ArrowLeft className="size-4" />
          <span className="text-sm font-medium">Буцах</span>
        </Link>
      </div>

      {/* Example Badge */}
      <div className="fixed top-4 right-4 z-50">
        <div className="px-4 py-2 bg-[#2563EB] text-white rounded-lg shadow-lg text-sm font-medium">
          DONE FOR YOU жишээ
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-8">
            <Heart className="size-12 text-rose-500 mx-auto mb-4" />
          </div>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#0F172A] mb-6">
            Болд & Сарнай
          </h1>
          <div className="inline-block px-6 py-3 bg-rose-100 text-rose-700 rounded-full mb-8">
            <p className="text-lg font-medium">Та бүхнийг хуримын ёслолдоо урьж байна</p>
          </div>
        </div>
      </section>

      {/* Photo Section */}
      <section className="px-6 mb-16">
        <div className="max-w-3xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1761574044344-394d47e1a96c?w=1080"
              alt="Bold & Sarnai"
              className="w-full aspect-[4/3] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="px-6 mb-16">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-2xl md:text-3xl font-serif italic text-[#64748B] leading-relaxed">
            "Хайр бол хоёр хүний сэтгэлийг холбосон хамгийн үнэт зүйл"
          </p>
        </div>
      </section>

      {/* Event Details */}
      <section className="px-6 mb-16">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-rose-100">
            <div className="bg-gradient-to-r from-rose-500 to-pink-500 text-white py-6 px-8">
              <h2 className="text-3xl font-bold text-center">Хуримын ёслол</h2>
            </div>
            
            <div className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Date & Time */}
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="size-12 bg-rose-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Calendar className="size-6 text-rose-600" />
                    </div>
                    <div>
                      <p className="text-sm text-[#64748B] mb-1">Огноо</p>
                      <p className="text-xl font-bold text-[#0F172A]">2026 оны 6-р сарын 15</p>
                      <p className="text-[#64748B]">Бямба гараг</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="size-12 bg-rose-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="size-6 text-rose-600" />
                    </div>
                    <div>
                      <p className="text-sm text-[#64748B] mb-1">Цаг</p>
                      <p className="text-xl font-bold text-[#0F172A]">17:00 цаг</p>
                      <p className="text-[#64748B]">Оролцогчид 16:30-аас ирж эхэлнэ</p>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="size-12 bg-rose-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="size-6 text-rose-600" />
                    </div>
                    <div>
                      <p className="text-sm text-[#64748B] mb-1">Байршил</p>
                      <p className="text-xl font-bold text-[#0F172A] mb-2">
                        Шангри-Ла Hotel
                      </p>
                      <p className="text-[#64748B]">
                        Olympic Street 19,<br />
                        Сүхбаатар дүүрэг,<br />
                        Улаанбаатар
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="size-12 text-[#2563EB] mx-auto mb-3" />
                    <p className="text-[#64748B] font-medium">Зураглал харах</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="px-6 mb-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0F172A] text-center mb-10">
            Өдрийн хөтөлбөр
          </h2>
          <div className="bg-white rounded-2xl p-8 border-2 border-rose-100 shadow-lg">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="text-rose-600 font-bold text-lg w-20 flex-shrink-0">16:30</div>
                <div>
                  <p className="font-semibold text-[#0F172A] mb-1">Зочид ирж эхлэнэ</p>
                  <p className="text-[#64748B] text-sm">Welcome drinks & хүлээн авалт</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-rose-600 font-bold text-lg w-20 flex-shrink-0">17:00</div>
                <div>
                  <p className="font-semibold text-[#0F172A] mb-1">Ёслол эхлэх</p>
                  <p className="text-[#64748B] text-sm">Сүйт хос гарч ирнэ</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-rose-600 font-bold text-lg w-20 flex-shrink-0">17:30</div>
                <div>
                  <p className="font-semibold text-[#0F172A] mb-1">Төрсөн өдрийн мэндчилгээ</p>
                  <p className="text-[#64748B] text-sm">Гэр бүлийн төлөөлөл</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-rose-600 font-bold text-lg w-20 flex-shrink-0">18:00</div>
                <div>
                  <p className="font-semibold text-[#0F172A] mb-1">Оройн хоол эхлэх</p>
                  <p className="text-[#64748B] text-sm">Зочдод үйлчлэх</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-rose-600 font-bold text-lg w-20 flex-shrink-0">19:00</div>
                <div>
                  <p className="font-semibold text-[#0F172A] mb-1">Анхны бүжиг</p>
                  <p className="text-[#64748B] text-sm">Сүйт хосын тусгай бүжиг</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-rose-600 font-bold text-lg w-20 flex-shrink-0">20:00</div>
                <div>
                  <p className="font-semibold text-[#0F172A] mb-1">Цэнгүүн</p>
                  <p className="text-[#64748B] text-sm">Хөгжилтэй үдэш</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gift Info */}
      <section className="px-6 mb-16">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-8 border-2 border-amber-200">
            <div className="flex items-start gap-4 mb-4">
              <Gift className="size-8 text-amber-600 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-2">
                  Бэлэг дурсгалын тухай
                </h3>
                <p className="text-[#64748B] leading-relaxed">
                  Таны ирсэн нь бидний хувьд хамгийн том бэлэг. Хэрэв та бэлэг өгөхийг хүсвэл 
                  мөнгөн бэлгийг илүүд үзнэ. Манай шинэ амьдралын эхлэлд дэмжлэг болно.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RSVP */}
      <section className="px-6 mb-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#0F172A] mb-6">
            Ирэх эсэхээ мэдэгдэнэ үү
          </h2>
          <p className="text-lg text-[#64748B] mb-8">
            2026 оны 5-р сарын 30-ны өмнө баталгаажуулна уу
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition-all hover:scale-105 text-lg font-medium shadow-lg">
              Ирнэ ✓
            </button>
            <button className="px-8 py-4 bg-white border-2 border-gray-300 text-[#0F172A] rounded-xl hover:bg-gray-50 transition-colors text-lg font-medium">
              Үлдэх болсон
            </button>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="px-6 mb-16">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 border border-gray-200 text-center">
          <h3 className="text-xl font-bold text-[#0F172A] mb-4">Холбоо барих</h3>
          <p className="text-[#64748B] mb-4">
            Асуух зүйл байвал доорх утасруу залгаарай
          </p>
          <div className="space-y-2">
            <p className="text-[#0F172A]">
              <span className="font-semibold">Болд:</span> +976 9999 1111
            </p>
            <p className="text-[#0F172A]">
              <span className="font-semibold">Сарнай:</span> +976 9999 2222
            </p>
          </div>
        </div>
      </section>

      {/* Closing Message */}
      <section className="px-6 pb-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-6">
            <Heart className="size-8 text-rose-500 mx-auto" />
          </div>
          <p className="text-2xl font-serif text-[#64748B] mb-8">
            Таны оролцоо бидний хувьд маш их утга учиртай.
            <br />
            Та бүхнийг хүлээж байна!
          </p>
          <p className="text-sm text-[#64748B]">
            Энэхүү хуудас 2026.06.30-нд автоматаар хаагдана
          </p>
          <p className="text-xs text-[#64748B] mt-4">
            landing.mn DONE FOR YOU багцаар хийгдсэн
          </p>
        </div>
      </section>
    </div>
  );
}
