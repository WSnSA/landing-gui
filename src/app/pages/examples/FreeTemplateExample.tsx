import { Link } from "react-router-dom";
import { Button, Card } from "../../components/ui";

export default function FreeTemplateExample() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="text-lg font-semibold">Free Template</div>
          <div className="flex gap-2">
            <Link to="/examples"><Button variant="ghost">Бүх жишээ</Button></Link>
            <Link to="/"><Button variant="ghost">Нүүр</Button></Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-10">
        <Card className="p-8">
          <div className="text-3xl font-extrabold tracking-tight">Simple, clean landing</div>
          <p className="mt-3 text-slate-600">Хурдан эхлэхэд зориулсан minimal бүтэц.</p>

          <div className="mt-8 space-y-4">
            <div className="h-12 rounded-xl bg-slate-100" />
            <div className="h-28 rounded-2xl bg-slate-100" />
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="h-24 rounded-2xl bg-slate-100" />
              <div className="h-24 rounded-2xl bg-slate-100" />
            </div>
            <div className="h-12 rounded-xl bg-blue-100" />
          </div>

          <div className="mt-8 text-sm text-slate-600">
            Энэ бол UX demo. Builder-аар таны өгөгдлөөр дүүрнэ.
          </div>
        </Card>
      </main>
    </div>
  );
}
