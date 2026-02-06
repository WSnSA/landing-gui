import { Link } from "react-router-dom";
import { Button, Card } from "../../components/ui";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="text-lg font-semibold">Үйлчилгээний нөхцөл</div>
          <Link to="/"><Button variant="ghost">Нүүр</Button></Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-10">
        <Card className="p-8 prose max-w-none">
          <h2>1. Ерөнхий</h2>
          <p>
            Энэ бол UX загвар контент. Та өөрийн байгууллагын бодит нөхцлөөр сольж ашиглаарай.
          </p>
          <h2>2. Хэрэглэгчийн үүрэг</h2>
          <ul>
            <li>Бүртгэлийн мэдээллээ үнэн зөв байлгах</li>
            <li>Хортой/хууль бус контент нийтлэхгүй байх</li>
          </ul>
          <h2>3. Төлбөр ба буцаалт</h2>
          <p>
            Төлбөрийн нөхцөл нь plan болон гэрээний дагуу хэрэгжинэ.
          </p>
        </Card>
      </main>
    </div>
  );
}
