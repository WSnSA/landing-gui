import { Link } from "react-router-dom";
import PublicNav from "../components/PublicNav";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <PublicNav />

      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-black text-slate-900 mb-2">Үйлчилгээний нөхцөл</h1>
        <p className="text-sm text-slate-400 mb-10">Сүүлд шинэчлэгдсэн: 2026 оны 1-р сарын 1</p>

        <div className="space-y-8 text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">1. Ерөнхий</h2>
            <p>Landing.mn-г ашигласнаар та энэ нөхцлийг зөвшөөрч байна. Та 18 нас хүрсэн буюу хууль ёсны этгээд байх ёстой.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">2. Хэрэглэгчийн үүрэг</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>Бүртгэлийн мэдээллээ үнэн зөв байлгах</li>
              <li>Нууц үгээ найдвартай хадгалах</li>
              <li>Хортой, хууль бус контент нийтлэхгүй байх</li>
              <li>Бусад хэрэглэгчийн эрхийг хүндэтгэх</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">3. Үйлчилгээний хязгаарлалт</h2>
            <p>Бид үйлчилгээг сайжруулах, аюулгүйн шалтгааны улмаас хандалтыг түр зогсоох эрхтэй.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">4. Холбоо барих</h2>
            <p>Асуулт байвал <Link to="/contact" className="text-blue-600 hover:underline">холбоо барих</Link> хэсгийг ашиглана уу.</p>
          </section>
        </div>
      </main>
    </div>
  );
}
