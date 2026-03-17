import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card } from "../../components/ui";
import { landingService } from "../../services/landingService";
import type { LandingResponse } from "../../types/dto";
import { formatDateTime } from "../../utils/format";

export default function DashboardPage() {
  const { projectId } = useParams();
  const id = Number(projectId);

  const [landing, setLanding] = useState<LandingResponse | null>(null);
  const [busy, setBusy] = useState(false);

  const load = async () => {
    setBusy(true);
    try {
      setLanding(await landingService.get(id));
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => { load(); }, [id]);

  const togglePublish = async () => {
    if (!landing) return;
    setBusy(true);
    try {
      const next =
        landing.status === "PUBLISHED"
          ? await landingService.unpublish(id)
          : await landingService.publish(id);
      setLanding(next);
    } finally {
      setBusy(false);
    }
  };

  const copyLink = () => {
    if (!landing) return;
    navigator.clipboard.writeText(`${window.location.origin}/p/${landing.slug}`);
    alert("Холбоос хуулагдлаа!");
  };

  if (!landing) {
    return <Card className="p-6 text-slate-600 text-sm">Ачаалж байна…</Card>;
  }

  const publicUrl = `/p/${landing.slug}`;
  const isPublished = landing.status === "PUBLISHED";

  return (
    <div className="space-y-4">

      {/* Нийтлэгдсэн бол онцлон харуулах */}
      {isPublished && (
        <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-blue-200 text-sm font-medium">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              Таны сайт нийтлэгдсэн байна
            </div>
            <div className="mt-1 text-xl font-bold">{landing.name}</div>
            <div className="mt-0.5 text-sm text-blue-200 break-all">
              {window.location.origin}{publicUrl}
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={copyLink}
              className="rounded-xl border border-white/30 px-4 py-2 text-sm font-medium hover:bg-white/10 transition"
            >
              Холбоос хуулах
            </button>
            <a
              href={publicUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50 transition"
            >
              🚀 Сайт руу үсрэх
            </a>
          </div>
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Үндсэн мэдээлэл */}
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-xs text-slate-500 font-medium">Сайтын нэр</div>
              <div className="text-xl font-bold mt-0.5">{landing.name}</div>
              <div className="mt-1 text-sm text-slate-500">landing.mn/p/{landing.slug}</div>
            </div>
            <span className={`rounded-full px-3 py-1 text-xs font-medium ${
              isPublished
                ? "bg-green-100 text-green-700"
                : "bg-amber-100 text-amber-700"
            }`}>
              {isPublished ? "Нийтлэгдсэн" : "Ноорог"}
            </span>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs text-slate-500">Статус</div>
              <div className="mt-1 text-sm font-semibold">
                {isPublished ? "🟢 Live" : "⚪ Draft"}
              </div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs text-slate-500">Засварласан</div>
              <div className="mt-1 text-sm font-semibold">{formatDateTime(landing.updatedAt)}</div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs text-slate-500">Нийтлэгдсэн</div>
              <div className="mt-1 text-sm font-semibold">
                {landing.publishedAt ? formatDateTime(landing.publishedAt) : "—"}
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Button onClick={togglePublish} loading={busy} variant={isPublished ? "secondary" : "primary"}>
              {isPublished ? "Буцааж нууцлах" : "🚀 Нийтлэх"}
            </Button>
            <Button variant="ghost" onClick={load} disabled={busy}>Refresh</Button>
          </div>
        </Card>

        {/* Quick actions */}
        <Card className="p-5">
          <div className="text-sm font-semibold text-slate-900 mb-4">Хурдан үйлдлүүд</div>
          <div className="space-y-2">
            <a
              href={publicUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 w-full rounded-xl py-2.5 text-sm font-medium transition ${
                isPublished
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-slate-100 text-slate-400 cursor-not-allowed pointer-events-none"
              }`}
            >
              🌐 Сайт харах
              {!isPublished && <span className="text-xs">(нийтлэгдээгүй)</span>}
            </a>
            <button
              onClick={copyLink}
              disabled={!isPublished}
              className="flex items-center justify-center gap-2 w-full rounded-xl bg-slate-100 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-200 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              🔗 Холбоос хуулах
            </button>
          </div>
          {!isPublished && (
            <p className="mt-4 text-xs text-slate-400 text-center">
              Нийтлэхийн тулд "Нийтлэх" товч дарна уу.
            </p>
          )}
        </Card>
      </div>
    </div>
  );
}
