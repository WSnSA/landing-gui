import { Link } from "react-router-dom";
import { Button, Card, EmptyState, Field, Input, Modal, Select, Textarea } from "../../components/ui";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="text-lg font-semibold">Холбоо барих</div>
          <Link to="/"><Button variant="ghost">Нүүр</Button></Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-10">
        <Card className="p-8 space-y-4">
          <div className="text-sm text-slate-600">
            Энэ бол UX загвар. Production дээр backend endpoint холбож message илгээх боломжтой.
          </div>
          <Field label="Нэр"><Input placeholder="Таны нэр" /></Field>
          <Field label="Email"><Input placeholder="example@mail.com" /></Field>
          <Field label="Мессеж"><Textarea rows={6} placeholder="Юу хэрэгтэй байна?" /></Field>
          <Button>Илгээх (stub)</Button>
        </Card>
      </main>
    </div>
  );
}
