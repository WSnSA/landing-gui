import { Link } from "react-router-dom";
import { Button, Card } from "../../components/ui";

const items = [
  { to: "/examples/free", name: "Free template", desc: "Minimal нэг хуудас" },
  { to: "/examples/business", name: "Business template", desc: "Компанийн танилцуулга" },
  { to: "/examples/done-for-you", name: "Done-for-you", desc: "Дэлгэрэнгүй бүтэц" },
];

export default function ExamplesIndexPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="text-lg font-semibold">Examples</div>
          <Link to="/"><Button variant="ghost">Нүүр</Button></Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-4 md:grid-cols-3">
          {items.map((x) => (
            <Card key={x.to} className="p-6">
              <div className="font-semibold">{x.name}</div>
              <div className="mt-1 text-sm text-slate-600">{x.desc}</div>
              <div className="mt-4">
                <Link to={x.to}><Button className="w-full">Нээх</Button></Link>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
