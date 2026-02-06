import { Link } from "react-router-dom";
import { Button, Card } from "../../components/ui";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <div className="h-8 w-8 rounded-lg bg-blue-600" />
            <span>Landing.mn</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link to="/examples" className="text-sm text-slate-600 hover:text-slate-900">
              Жишээ
            </Link>
            <Link to="/login">
              <Button variant="ghost">Нэвтрэх</Button>
            </Link>
            <Link to="/register">
              <Button>Бүртгүүлэх</Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-7xl px-6 py-14">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                Нэг QR код → Нэг дижитал хуудас
              </div>
              <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
                Таны ландинг, танай өнгө. <span className="text-blue-600">Хэдхэн минутанд.</span>
              </h1>
              <p className="mt-4 text-base text-slate-600">
                Хурим, бизнес, CV, үйлчилгээ — нэг стандарт бүтэц дээрээ шууд бүтээж, нийтэлж, хуваалцаарай.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link to="/register"><Button>Эхлэх</Button></Link>
                <Link to="/examples"><Button variant="secondary">Жишээг үзэх</Button></Link>
                <Link to="/contact" className="text-sm text-slate-600 hover:text-slate-900">Холбоо барих</Link>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <Card className="p-4">
                  <div className="text-sm font-semibold">Builder</div>
                  <div className="mt-1 text-sm text-slate-600">Page → Section → Component бүтэцтэй.</div>
                </Card>
                <Card className="p-4">
                  <div className="text-sm font-semibold">Publish</div>
                  <div className="mt-1 text-sm text-slate-600">Draft/Published төлөв.</div>
                </Card>
                <Card className="p-4">
                  <div className="text-sm font-semibold">Billing</div>
                  <div className="mt-1 text-sm text-slate-600">Plan + төлбөрийн түүх.</div>
                </Card>
              </div>
            </div>

            <Card className="p-6">
              <div className="text-sm font-semibold">Ямар харагдах вэ?</div>
              <div className="mt-4 space-y-3">
                <div className="h-10 rounded-lg bg-slate-100" />
                <div className="h-24 rounded-xl bg-slate-100" />
                <div className="grid grid-cols-2 gap-3">
                  <div className="h-16 rounded-xl bg-slate-100" />
                  <div className="h-16 rounded-xl bg-slate-100" />
                </div>
                <div className="h-10 rounded-lg bg-blue-100" />
              </div>
              <div className="mt-4 text-xs text-slate-500">
                Энэ бол UX-ийн урьдчилсан preview. Builder-ээр бодитоор өөрчилнө.
              </div>
            </Card>
          </div>
        </section>

        <section className="border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-slate-600">© {new Date().getFullYear()} Landing.mn</div>
            <div className="flex gap-4 text-sm">
              <Link className="text-slate-600 hover:text-slate-900" to="/terms">Үйлчилгээний нөхцөл</Link>
              <Link className="text-slate-600 hover:text-slate-900" to="/privacy">Нууцлал</Link>
              <Link className="text-slate-600 hover:text-slate-900" to="/contact">Холбоо барих</Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
