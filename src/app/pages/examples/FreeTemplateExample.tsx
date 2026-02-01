import { ArrowLeft, Clock, MapPin, Phone } from "lucide-react";
import { Link } from "react-router";

export default function FreeTemplateExample() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Back Button */}
      <div className="fixed top-4 left-4 z-50">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white text-[#0F172A] rounded-lg shadow-lg hover:shadow-xl transition-all"
        >
          <ArrowLeft className="size-4" />
          <span className="text-sm font-medium">Буцах</span>
        </Link>
      </div>

      {/* Example Badge */}
      <div className="fixed top-4 right-4 z-50">
        <div className="px-4 py-2 bg-[#2563EB] text-white rounded-lg shadow-lg text-sm font-medium">
          FREE Template жишээ
        </div>
      </div>

      {/* Landing Page Content */}
      <div className="max-w-2xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-red-500 text-white rounded-full text-sm font-bold mb-6 animate-pulse">
            ⚡ ЗУНЫ ИХ ХӨНГӨЛӨЛТ
          </div>
          <h1 className="text-5xl font-bold text-[#0F172A] mb-4">
            Бүх цай 50% хөнгөлөлттэй
          </h1>
          <p className="text-xl text-[#64748B]">
            2026 оны 2-р сарын 15 хүртэл
          </p>
        </div>

        {/* Main Image Placeholder */}
        <div className="mb-12">
          <div className="aspect-video bg-gradient-to-br from-orange-200 to-red-200 rounded-2xl flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">☕</div>
              <p className="text-[#64748B] font-medium">Кофе & Цайны дэлгүүр</p>
            </div>
          </div>
        </div>

        {/* Offer Details */}
        <div className="bg-white rounded-2xl p-8 mb-8 shadow-lg">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Урамшууллын дэлгэрэнгүй</h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="size-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-green-600 text-sm">✓</span>
              </div>
              <div>
                <p className="text-[#0F172A] font-medium">Бүх төрлийн цай 50% хямдралтай</p>
                <p className="text-[#64748B] text-sm">Green tea, Black tea, Herbal tea</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="size-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-green-600 text-sm">✓</span>
              </div>
              <div>
                <p className="text-[#0F172A] font-medium">Dessert худалдан авбал цай үнэгүй</p>
                <p className="text-[#64748B] text-sm">Зөвхөн танхимд захиалахад</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="size-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-green-600 text-sm">✓</span>
              </div>
              <div>
                <p className="text-[#0F172A] font-medium">Loyalty карт үүсгэвэл +10% нэмэлт</p>
                <p className="text-[#64748B] text-sm">Урамшуулал давхцана</p>
              </div>
            </div>
          </div>
        </div>

        {/* Location & Contact */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-xl font-bold text-[#0F172A] mb-6">Хаяг & Холбоо барих</h3>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <MapPin className="size-5 text-[#2563EB]" />
              <div>
                <p className="text-[#0F172A] font-medium">Сүхбаатар дүүрэг, 1-р хороо</p>
                <p className="text-[#64748B] text-sm">Peace Avenue 23, Улаанбаатар</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="size-5 text-[#2563EB]" />
              <div>
                <p className="text-[#0F172A] font-medium">Өдөр бүр 08:00 - 22:00</p>
                <p className="text-[#64748B] text-sm">Баасан, Ням гаригт 09:00 - 23:00</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="size-5 text-[#2563EB]" />
              <div>
                <p className="text-[#0F172A] font-medium">+976 9999 9999</p>
                <p className="text-[#64748B] text-sm">Захиалга, лавлах утас</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-8 text-center">
          <button className="px-8 py-4 bg-[#2563EB] text-white rounded-xl hover:bg-[#1D4ED8] transition-all hover:scale-105 text-lg font-medium shadow-lg">
            Одоо захиалах
          </button>
          <p className="text-[#64748B] text-sm mt-4">
            * Урамшуулал 2026.02.15-нд дуусна
          </p>
        </div>
      </div>
    </div>
  );
}
