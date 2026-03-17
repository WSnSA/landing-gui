import PublicNav from "../components/PublicNav";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <PublicNav />

      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-black text-slate-900 mb-2">Нууцлалын бодлого</h1>
        <p className="text-sm text-slate-400 mb-10">Сүүлд шинэчлэгдсэн: 2026 оны 1-р сарын 1</p>

        <div className="space-y-8 text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">1. Мэдээлэл цуглуулах</h2>
            <p>Бид таны бүртгэлийн мэдээлэл (нэр, имэйл, утас), хэрэглээний лог, cookie зэргийг цуглуулна. Энэ мэдээллийг зөвхөн үйлчилгээгээ сайжруулах зорилгоор ашиглана.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">2. Мэдээлэл хадгалах</h2>
            <p>Таны өгөгдлийг SSL шифрлэлтээр хамгаалагдсан серверт хадгална. Гуравдагч этгээдэд хуваалцахгүй.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">3. Cookie</h2>
            <p>Нэвтрэлтийн мэдээллийг хадгалахад cookie ашиглана. Хөтчийн тохиргооноос cookie-г идэвхгүй болгох боломжтой.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">4. Холбоо барих</h2>
            <p>Нууцлалтай холбоотой асуулт байвал <a href="mailto:info@landing.mn" className="text-blue-600 hover:underline">info@landing.mn</a>-д илгээнэ үү.</p>
          </section>
        </div>
      </main>
    </div>
  );
}
