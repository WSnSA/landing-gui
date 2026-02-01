import { ArrowLeft, MapPin, Calendar, Clock, Heart } from "lucide-react";
import { Link } from "react-router";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

export default function DoneForYouExample() {
  return (
      <div className="min-h-screen bg-[#FAF9F7] text-[#1F2937]">

        {/* Back */}
        <div className="fixed top-4 left-4 z-50">
          <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border shadow-sm hover:shadow-md transition"
          >
            <ArrowLeft className="size-4" />
            <span className="text-sm">Буцах</span>
          </Link>
        </div>

        {/* HERO */}
        <section className="pt-28 pb-20 text-center px-6">
          <Heart className="size-10 text-rose-400 mx-auto mb-6" />
          <h1 className="font-serif text-5xl md:text-6xl font-semibold tracking-tight mb-4">
            Болд & Сарнай
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Та бүхнийг бидний амьдралын хамгийн нандин өдрийг хамтдаа тэмдэглэхийг урьж байна
          </p>
        </section>

        {/* IMAGE */}
        <section className="px-6 mb-20">
          <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-xl">
            <ImageWithFallback
                src="https://images.unsplash.com/photo-1761574044344-394d47e1a96c?w=1600"
                alt="Wedding"
                className="w-full aspect-[4/3] object-cover"
            />
          </div>
        </section>

        {/* EVENT INFO */}
        <section className="px-6 mb-24">
          <div className="max-w-3xl mx-auto grid gap-12">

            <InfoRow
                icon={<Calendar />}
                title="Огноо"
                main="2026 оны 6-р сарын 15"
                sub="Бямба гараг"
            />

            <InfoRow
                icon={<Clock />}
                title="Цаг"
                main="17:00"
                sub="Зочид 16:30-аас ирнэ"
            />

            <InfoRow
                icon={<MapPin />}
                title="Байршил"
                main="Shangri-La Hotel"
                sub="Olympic Street 19, Сүхбаатар дүүрэг, Улаанбаатар"
            />
          </div>
        </section>

        {/* QUOTE */}
        <section className="px-6 mb-24 text-center">
          <p className="max-w-2xl mx-auto font-serif text-2xl text-gray-600 italic leading-relaxed">
            “Хайр бол хамтдаа ирээдүйг бүтээх зориг юм.”
          </p>
        </section>

        {/* SCHEDULE */}
        <section className="px-6 mb-24">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl mb-10 text-center">
              Ёслолын дараалал
            </h2>

            <div className="space-y-6">
              <Schedule time="16:30" title="Зочид угтах" />
              <Schedule time="17:00" title="Хуримын ёслол эхлэх" />
              <Schedule time="18:00" title="Оройн зоог" />
              <Schedule time="19:00" title="Анхны бүжиг" />
              <Schedule time="20:00" title="Чөлөөт цэнгүүн" />
            </div>
          </div>
        </section>

        {/* RSVP */}
        <section className="px-6 mb-24 text-center">
          <h2 className="font-serif text-3xl mb-4">
            Ирэх эсэхээ мэдэгдэнэ үү
          </h2>
          <p className="text-gray-500 mb-8">
            2026 оны 5-р сарын 30-наас өмнө
          </p>

          <div className="flex justify-center gap-4">
            <button className="px-10 py-3 rounded-full bg-[#1F2937] text-white hover:opacity-90 transition">
              Ирнэ
            </button>
            <button className="px-10 py-3 rounded-full border border-gray-300 hover:bg-gray-100 transition">
              Ирэх боломжгүй
            </button>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="pb-24 text-center text-sm text-gray-400">
          Энэхүү урилга 2026.06.30-нд автоматаар хаагдана<br />
          landing.mn · DONE FOR YOU
        </footer>
      </div>
  );
}

/* ---------- helpers ---------- */

function InfoRow({
                   icon,
                   title,
                   main,
                   sub,
                 }: {
  icon: React.ReactNode;
  title: string;
  main: string;
  sub: string;
}) {
  return (
      <div className="flex gap-6 items-start">
        <div className="text-gray-400">{icon}</div>
        <div>
          <p className="text-sm text-gray-400 mb-1">{title}</p>
          <p className="text-xl font-medium">{main}</p>
          <p className="text-gray-500">{sub}</p>
        </div>
      </div>
  );
}

function Schedule({
                    time,
                    title,
                  }: {
  time: string;
  title: string;
}) {
  return (
      <div className="flex gap-6">
        <div className="w-20 text-gray-400 font-medium">{time}</div>
        <div className="text-gray-700">{title}</div>
      </div>
  );
}
