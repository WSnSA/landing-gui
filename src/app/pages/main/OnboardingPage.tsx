import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, EmptyState } from "../../components/ui";
import { landingService } from "../../services/landingService";
import type { LandingResponse } from "../../types/dto";
import { formatDateTime } from "../../utils/format";
import { useAuth } from "../../auth/AuthContext";

export default function OnboardingPage() {
  const nav = useNavigate();
  const { me, logout } = useAuth();

  const [landings, setLandings] = useState<LandingResponse[] | null>(null);
  const [busy, setBusy] = useState(false);

  const load = async () => {
    setBusy(true);
    try {
      const list = await landingService.list();
      setLandings(list.sort((a, b) => b.id - a.id));
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => { load(); }, []);

  const remove = async (l: LandingResponse) => {
    if (!confirm(`"${l.name}" сайтыг устгах уу?`)) return;
    await landingService.remove(l.id);
    await load();
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between gap-4">
          <Link to="/marketplace" className="flex items-center gap-2 font-bold text-lg">
            <div className="h-8 w-8 rounded-lg bg-blue-600" />
            <span>Landing.mn</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-sm text-slate-500">{me?.fullName}</span>
            <Button variant="ghost" size="sm" onClick={logout}>Гарах</Button>
          </div>
        </div>

        {/* Sub-nav */}
        <div className="border-t border-slate-100">
          <div className="mx-auto max-w-7xl px-6 py-2 flex gap-1">
            <Link
              to="/marketplace"
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 transition"
            >
              Marketplace
            </Link>
            <Link
              to="/my-sites"
              className="rounded-lg px-3 py-2 text-sm font-medium bg-blue-600 text-white transition"
            >
              Миний сайтууд
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Миний сайтууд</h1>
          <p className="mt-1 text-sm text-slate-500">
            Өөрийн вэбсайтуудаа удирдах.
          </p>
        </div>

        {!landings ? (
          <div className="text-sm text-slate-400">Ачаалж байна…</div>
        ) : landings.length === 0 ? (
          <EmptyState
            title="Одоогоор сайт байхгүй байна"
            desc="Marketplace-с template сонгоод анхны сайтаа үүсгээрэй."
            action={
              <Button onClick={() => nav("/marketplace")}>
                Template сонгох →
              </Button>
            }
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {landings.map((l) => (
              <Card key={l.id} className="p-5 flex flex-col gap-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-semibold text-slate-900 truncate">{l.name}</div>
                    <div className="mt-0.5 text-sm text-slate-500 truncate">
                      landing.mn/p/{l.slug}
                    </div>
                  </div>
                  <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                    l.status === "PUBLISHED"
                      ? "bg-green-100 text-green-700"
                      : "bg-slate-100 text-slate-600"
                  }`}>
                    {l.status === "PUBLISHED" ? "Нийтлэгдсэн" : "Ноорог"}
                  </span>
                </div>

                <div className="text-xs text-slate-400">
                  Засварласан: {formatDateTime(l.updatedAt)}
                </div>

                <div className="flex gap-2">
                  <Button
                    className="flex-1"
                    onClick={() => nav(`/app/${l.id}`)}
                  >
                    Нээх
                  </Button>
                  {l.status === "PUBLISHED" && (
                    <Button
                      variant="secondary"
                      onClick={() => window.open(`/p/${l.slug}`, "_blank")}
                    >
                      Харах
                    </Button>
                  )}
                  <Button variant="danger" onClick={() => remove(l)}>✕</Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
