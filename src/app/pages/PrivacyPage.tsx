import { Link } from "react-router-dom";
import { Button, Card } from "../../components/ui";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="text-lg font-semibold">Нууцлал</div>
          <Link to="/"><Button variant="ghost">Нүүр</Button></Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-10">
        <Card className="p-8 prose max-w-none">
          <h2>Мэдээлэл цуглуулах</h2>
          <p>Энэ бол UX placeholder. Хэрэглэгчийн мэдээлэл, cookie, analytics талаар энд бичнэ.</p>
          <h2>Хадгалалт</h2>
          <p>Сервер дээр хадгалагдах өгөгдөл, лог, хамгаалалтын бодлого.</p>
        </Card>
      </main>
    </div>
  );
}
