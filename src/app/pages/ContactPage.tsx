import { useState } from "react";
import { Field, Input, Textarea, Button } from "../components/ui";
import PublicNav from "../components/PublicNav";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <PublicNav />

      <main className="mx-auto max-w-2xl px-6 py-16">
        <div className="mb-10">
          <h1 className="text-3xl font-black text-slate-900">Холбоо барих</h1>
          <p className="mt-2 text-slate-500">Асуулт, санал хүсэлт байвал бидэнд илгээнэ үү.</p>
        </div>

        {sent ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
            <div className="text-4xl mb-3">✓</div>
            <div className="font-semibold text-emerald-800">Мессеж илгээгдлээ!</div>
            <div className="text-sm text-emerald-600 mt-1">Бид 1-2 ажлын өдрийн дотор хариулах болно.</div>
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm space-y-4">
            <Field label="Нэр">
              <Input placeholder="Таны нэр" />
            </Field>
            <Field label="Имэйл">
              <Input type="email" placeholder="example@mail.com" />
            </Field>
            <Field label="Мессеж">
              <Textarea rows={5} placeholder="Юу хэрэгтэй байна?" />
            </Field>
            <Button className="w-full" onClick={() => setSent(true)}>Илгээх</Button>
          </div>
        )}

        <div className="mt-10 grid gap-4 sm:grid-cols-3 text-center">
          {[
            { icon: "📧", label: "Имэйл", val: "info@landing.mn" },
            { icon: "📱", label: "Утас", val: "+976 9900-1234" },
            { icon: "📍", label: "Хаяг", val: "Улаанбаатар, Монгол" },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className="text-xs text-slate-400 font-medium">{item.label}</div>
              <div className="text-sm text-slate-700 mt-0.5">{item.val}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
