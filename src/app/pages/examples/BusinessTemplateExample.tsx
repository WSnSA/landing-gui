import {
  ArrowLeft,
  MapPin,
  Clock,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Star,
  Coffee,
  Wifi,
  Croissant,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

function Section({
                   id,
                   title,
                   subtitle,
                   children,
                   className = "",
                 }: {
  id?: string;
  title?: string;
  subtitle?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
      <section id={id} className={`py-16 md:py-20 px-6 ${className}`}>
        <div className="max-w-6xl mx-auto">
          {(title || subtitle) && (
              <div className="mb-10 md:mb-12">
                {title && (
                    <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A]">
                      {title}
                    </h2>
                )}
                {subtitle && (
                    <p className="mt-3 text-lg text-[#64748B] max-w-3xl">
                      {subtitle}
                    </p>
                )}
              </div>
          )}
          {children}
        </div>
      </section>
  );
}

function Pill({
                icon: Icon,
                label,
              }: {
  icon: any;
  label: string;
}) {
  return (
      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white backdrop-blur-sm">
      <Icon className="size-4" />
      <span className="text-sm font-medium">{label}</span>
    </span>
  );
}

function Stat({
                value,
                label,
              }: {
  value: string;
  label: string;
}) {
  return (
      <div className="rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm p-5">
        <div className="text-2xl font-bold text-white">{value}</div>
        <div className="text-sm text-white/70 mt-1">{label}</div>
      </div>
  );
}

function InfoItem({
                    icon: Icon,
                    title,
                    desc,
                  }: {
  icon: any;
  title: string;
  desc: string;
}) {
  return (
      <div className="flex items-start gap-3">
        <div className="size-10 rounded-xl bg-[#2563EB]/10 flex items-center justify-center flex-shrink-0">
          <Icon className="size-5 text-[#2563EB]" />
        </div>
        <div className="pt-0.5">
          <div className="font-semibold text-[#0F172A]">{title}</div>
          <div className="text-sm text-[#64748B] leading-relaxed">{desc}</div>
        </div>
      </div>
  );
}

function MenuRow({
                   name,
                   desc,
                   price,
                   tag,
                 }: {
  name: string;
  desc: string;
  price: string;
  tag?: string;
}) {
  return (
      <div className="p-5 rounded-2xl border border-gray-200 bg-white hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-[#0F172A]">{name}</h4>
              {tag && (
                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-[#2563EB]/10 text-[#2563EB]">
                {tag}
              </span>
              )}
            </div>
            <p className="text-sm text-[#64748B] mt-1 leading-relaxed">{desc}</p>
          </div>
          <div className="text-[#2563EB] font-bold whitespace-nowrap">{price}</div>
        </div>
      </div>
  );
}

function ReviewCard({
                      name,
                      rating,
                      text,
                    }: {
  name: string;
  rating: number;
  text: string;
}) {
  return (
      <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div className="font-semibold text-[#0F172A]">{name}</div>
          <div className="flex items-center gap-1 text-amber-500">
            {Array.from({ length: 5 }).map((_, i) => (
                <Star
                    key={i}
                    className={`size-4 ${i < rating ? "fill-current" : ""}`}
                />
            ))}
          </div>
        </div>
        <p className="text-sm text-[#64748B] mt-3 leading-relaxed">{text}</p>
      </div>
  );
}

export default function BusinessTemplateExample() {
  return (
      <div className="min-h-screen bg-white text-[#0F172A]">
        {/* Top Bar */}
        <div className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
            <Link
                to="/"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              <ArrowLeft className="size-4" />
              <span className="text-sm font-semibold">Буцах</span>
            </Link>

            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-[#334155]">
              <a href="#about" className="hover:text-[#2563EB] transition">
                Танилцуулга
              </a>
              <a href="#menu" className="hover:text-[#2563EB] transition">
                Цэс
              </a>
              <a href="#gallery" className="hover:text-[#2563EB] transition">
                Зураг
              </a>
              <a href="#contact" className="hover:text-[#2563EB] transition">
                Холбоо барих
              </a>
            </div>

            <a
                href="#reserve"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#2563EB] text-white rounded-lg font-semibold hover:bg-[#1D4ED8] transition"
            >
              Ширээ захиалах <ArrowRight className="size-4" />
            </a>
          </div>
        </div>

        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <ImageWithFallback
                src="https://images.unsplash.com/photo-1573840357491-06851c72e0d1?w=1800"
                alt="Cafe Luna"
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-black/75" />
          </div>

          <div className="relative px-6">
            <div className="max-w-6xl mx-auto py-16 md:py-24">
              <div className="grid lg:grid-cols-2 gap-10 items-end">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-sm font-semibold">
                    <span className="size-2 rounded-full bg-emerald-400" />
                    BUSINESS Template жишээ
                  </div>

                  <h1 className="mt-5 text-5xl md:text-6xl font-extrabold tracking-tight text-white">
                    Cafe Luna
                  </h1>
                  <p className="mt-4 text-lg md:text-xl text-white/80 leading-relaxed max-w-xl">
                    Тохилог орчин + чанартай түүхий эд + тогтвортой үйлчилгээ.
                    Уулзалт, ажил, амралтад яг тохирно.
                  </p>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <Pill icon={Coffee} label="Specialty Coffee" />
                    <Pill icon={Croissant} label="Fresh Pastries" />
                    <Pill icon={Wifi} label="Free WiFi" />
                  </div>

                  <div className="mt-10 flex flex-wrap gap-4">
                    <a
                        href="#reserve"
                        className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#2563EB] text-white rounded-xl font-semibold hover:bg-[#1D4ED8] transition shadow-lg shadow-black/20"
                    >
                      Ширээ захиалах <ArrowRight className="size-5" />
                    </a>
                    <a
                        href="#menu"
                        className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 text-white rounded-xl font-semibold border border-white/20 backdrop-blur-sm hover:bg-white/15 transition"
                    >
                      Цэс харах
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 md:gap-4">
                  <Stat value="4.8★" label="Дундаж үнэлгээ" />
                  <Stat value="7:00–23:00" label="Ажлын цаг" />
                  <Stat value="Төв" label="Байршил" />
                </div>
              </div>
            </div>
          </div>

          <div className="h-10 bg-gradient-to-t from-white to-transparent" />
        </section>

        {/* About */}
        <Section
            id="about"
            title="Танилцуулга"
            subtitle="Сүүлийн үед “premium, гэхдээ хэт сүртэй биш” мэдрэмжийг хүмүүс хамгийн их сонгож байна. Cafe Luna яг тэр форматаар бүтээгдсэн."
            className="bg-white"
        >
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div className="rounded-3xl overflow-hidden border border-gray-200 bg-gray-50">
              <ImageWithFallback
                  src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1600"
                  alt="Coffee"
                  className="w-full h-[320px] md:h-[420px] object-cover"
              />
            </div>

            <div>
              <div className="bg-[#F8FAFC] border border-gray-200 rounded-3xl p-7 md:p-8">
                <p className="text-[#64748B] leading-relaxed text-lg">
                  2020 оноос хойш хотын төвд үйл ажиллагаа явуулж буй орчин үеийн
                  кофе шоп. Бид сайн үр, зөв хандлага, тогтвортой үйлчилгээгээр
                  ялгардаг.
                </p>

                <div className="mt-7 grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white border border-gray-200">
                    <div className="font-semibold">Шинэхэн үр</div>
                    <div className="text-sm text-[#64748B] mt-1">
                      Импорт + тогтмол шинэчлэлт
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-gray-200">
                    <div className="font-semibold">Тохилог орчин</div>
                    <div className="text-sm text-[#64748B] mt-1">
                      Ажил, уулзалтад тохиромжтой
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-gray-200">
                    <div className="font-semibold">Хурдан үйлчилгээ</div>
                    <div className="text-sm text-[#64748B] mt-1">
                      Захиалга 5–8 минут
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-gray-200">
                    <div className="font-semibold">WiFi + залгуур</div>
                    <div className="text-sm text-[#64748B] mt-1">
                      Удаан суухад асуудалгүй
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                      href="#contact"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-gray-200 font-semibold hover:shadow-sm transition"
                  >
                    Холбоо барих <ArrowRight className="size-4" />
                  </a>
                  <a
                      href="#gallery"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0F172A] text-white font-semibold hover:bg-[#0B1220] transition"
                  >
                    Дотор орчин үзэх <ArrowRight className="size-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Menu */}
        <Section
            id="menu"
            title="Цэс"
            subtitle="Хэт олон карт биш — уншихад амар, сонгоход хурдан бүтэц."
            className="bg-[#F8FAFC]"
        >
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Кофе</h3>
              <MenuRow
                  name="Signature Latte"
                  desc="Зөөлөн амт, баланстай сүүтэй latte"
                  price="8,500₮"
                  tag="Best"
              />
              <MenuRow
                  name="Americano"
                  desc="Классик, цэвэр амт"
                  price="6,500₮"
              />
              <MenuRow
                  name="Cappuccino"
                  desc="Хөөсөрхөг, хүчтэй амт"
                  price="8,000₮"
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold">Цай & Bakery</h3>
              <MenuRow
                  name="Matcha Premium"
                  desc="Certified organic matcha, өтгөн амт"
                  price="12,000₮"
                  tag="New"
              />
              <MenuRow
                  name="Butter Croissant"
                  desc="Өдөр бүр шинэ, шаржигнуур"
                  price="7,500₮"
              />
              <MenuRow
                  name="Croissant Set"
                  desc="Croissant + кофе combo"
                  price="15,000₮"
                  tag="Combo"
              />
            </div>
          </div>

          <div className="mt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-gray-200">
            <div>
              <div className="font-bold text-[#0F172A]">
                Өдөр тутмын урамшуулал
              </div>
              <div className="text-sm text-[#64748B] mt-1">
                08:00–11:00 хооронд “Breakfast set” 10% хямдралтай
              </div>
            </div>
            <a
                href="#reserve"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2563EB] text-white font-semibold hover:bg-[#1D4ED8] transition"
            >
              Захиалга өгөх <ArrowRight className="size-4" />
            </a>
          </div>
        </Section>

        {/* Gallery */}
        <Section
            id="gallery"
            title="Дотор орчин"
            subtitle="Бодитоор очихоос өмнө орчноо мэдрээрэй."
            className="bg-white"
        >
          <div className="grid md:grid-cols-3 gap-6">
            {[
              "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1400",
              "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1400",
              "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=1400",
            ].map((src, i) => (
                <div
                    key={i}
                    className="rounded-3xl overflow-hidden border border-gray-200 bg-gray-50"
                >
                  <ImageWithFallback
                      src={src}
                      alt={`Gallery ${i + 1}`}
                      className="w-full h-64 object-cover hover:scale-[1.03] transition-transform duration-300"
                  />
                </div>
            ))}
          </div>
        </Section>

        {/* Contact */}
        <Section
            id="contact"
            title="Байршил & Холбоо барих"
            subtitle="Хаяг, цаг, холбоо барих мэдээллийг нэг дороос."
            className="bg-[#F8FAFC]"
        >
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="bg-white border border-gray-200 rounded-3xl p-8">
              <div className="space-y-5">
                <InfoItem
                    icon={MapPin}
                    title="СБД, 1-р хороо"
                    desc="Seoul Street 45, Улаанбаатар 14200"
                />
                <InfoItem
                    icon={Phone}
                    title="+976 8888 7777"
                    desc="Захиалга, лавлах"
                />
                <InfoItem
                    icon={Mail}
                    title="hello@cafeluna.mn"
                    desc="Асуулт, санал хүсэлт"
                />
              </div>

              <div className="mt-7 pt-7 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <Clock className="size-5 text-[#2563EB]" />
                  <div className="font-semibold">Ажлын цаг</div>
                </div>
                <div className="mt-3 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Даваа–Баасан</span>
                    <span className="font-semibold">07:00–22:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Бямба</span>
                    <span className="font-semibold">08:00–23:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Ням</span>
                    <span className="font-semibold">08:00–23:00</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-3xl p-8">
              <div className="font-bold text-xl">Сошиал</div>
              <p className="text-[#64748B] mt-2">
                Шинэ мэдээ, урамшуулал, эвент мэдээллийг авахыг хүсвэл дагаарай.
              </p>

              <div className="mt-6 grid sm:grid-cols-2 gap-3">
                <a
                    href="#"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-pink-500 text-white font-semibold hover:bg-pink-600 transition"
                >
                  <Instagram className="size-5" /> Instagram
                </a>
                <a
                    href="#"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                >
                  <Facebook className="size-5" /> Facebook
                </a>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="font-semibold">Түгээмэл асуулт</div>
                <div className="mt-3 space-y-3 text-sm text-[#64748B]">
                  <div>
                  <span className="font-semibold text-[#0F172A]">
                    • WiFi бий юу?
                  </span>{" "}
                    Тийм, үнэгүй.
                  </div>
                  <div>
                  <span className="font-semibold text-[#0F172A]">
                    • Суудал захиалж болох уу?
                  </span>{" "}
                    Тийм, доорх товчоор.
                  </div>
                  <div>
                  <span className="font-semibold text-[#0F172A]">
                    • Takeaway боломжтой юу?
                  </span>{" "}
                    Боломжтой.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Reviews */}
        <Section
            title="Үйлчлүүлэгчдийн сэтгэгдэл"
            subtitle="Итгэл төрүүлэх мэдээлэл дутахаар “landing” сул болдог. Тиймээс богино, тод сэтгэгдэл нэмлээ."
            className="bg-white"
        >
          <div className="grid md:grid-cols-3 gap-6">
            <ReviewCard
                name="Нараа"
                rating={5}
                text="Тохилог орчинтой, кофе нь үнэхээр гоё. Өглөө ажил хийхэд хамгийн тохиромжтой."
            />
            <ReviewCard
                name="Тэмүүжин"
                rating={5}
                text="Matcha нь цэвэр амттай, pastry нь өдөр бүр шинэ байдаг нь таалагддаг."
            />
            <ReviewCard
                name="Сараа"
                rating={4}
                text="Үйлчилгээ хурдан, суудал тав тухтай. Орой найзтайгаа уулзахад сайхан газар."
            />
          </div>
        </Section>

        {/* Final CTA */}
        <Section id="reserve" className="bg-[#0F172A]">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
                  Өнөөдөр ширээгээ захиалаад
                  <br />
                  тайван зочлоорой ☕
                </h2>
                <p className="mt-4 text-white/70 text-lg max-w-xl">
                  Богино форм, хурдан холбоо. Хүсвэл утсаар ч захиалж болно.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <button className="px-8 py-4 rounded-xl bg-[#2563EB] text-white font-semibold hover:bg-[#1D4ED8] transition">
                    Ширээ захиалах
                  </button>
                  <a
                      href="tel:+97688887777"
                      className="px-8 py-4 rounded-xl bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/15 transition"
                  >
                    +976 8888 7777
                  </a>
                </div>
              </div>

              <div className="rounded-3xl bg-white/5 border border-white/10 p-8">
                <div className="text-white font-bold text-xl">Хурдан товч</div>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-3 text-white/85">
                    <MapPin className="size-5" />
                    <span>СБД, 1-р хороо • Seoul Street 45</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/85">
                    <Clock className="size-5" />
                    <span>Даваа–Баасан 07:00–22:00 • Амралт 08:00–23:00</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/85">
                    <Mail className="size-5" />
                    <span>hello@cafeluna.mn</span>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-3">
                  <a
                      href="#"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-pink-500 text-white font-semibold hover:bg-pink-600 transition"
                  >
                    <Instagram className="size-5" /> Insta
                  </a>
                  <a
                      href="#"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                  >
                    <Facebook className="size-5" /> FB
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Footer */}
        <footer className="bg-[#0B1220] text-gray-400 py-10 px-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm">
              © 2026 Cafe Luna. All rights reserved. • landing.mn-ээр хийгдсэн
            </p>
            <div className="flex items-center gap-4 text-sm">
              <a href="#about" className="hover:text-white transition">
                Танилцуулга
              </a>
              <a href="#menu" className="hover:text-white transition">
                Цэс
              </a>
              <a href="#contact" className="hover:text-white transition">
                Холбоо
              </a>
            </div>
          </div>
        </footer>
      </div>
  );
}
