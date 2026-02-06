import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card } from "../../../components/ui";
import { landingService } from "../../../services/landingService";
import { pageService } from "../../../services/pageService";
import type { LandingResponse, PageResponse } from "../../../types/dto";
import { formatDateTime } from "../../../utils/format";

export default function DashboardPage() {
  const { projectId } = useParams();
  const id = Number(projectId);

  const [landing, setLanding] = useState<LandingResponse | null>(null);
  const [pages, setPages] = useState<PageResponse[]>([]);
  const [busy, setBusy] = useState(false);

  const load = async () => {
    setBusy(true);
    try {
      const [l, p] = await Promise.all([landingService.get(id), pageService.list(id)]);
      setLanding(l);
      setPages(p);
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

  if (!landing) {
    return <Card className="p-6 text-slate-600">Ачаалж байна…</Card>;
  }

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Card className="p-6 lg:col-span-2">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-xs text-slate-500">Landing</div>
            <div className="text-xl font-bold">{landing.name}</div>
            <div className="mt-1 text-sm text-slate-600">/{landing.slug}</div>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">{landing.status}</span>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-xs text-slate-500">Pages</div>
            <div className="mt-1 text-2xl font-bold">{pages.length}</div>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-xs text-slate-500">Updated</div>
            <div className="mt-1 text-sm font-semibold">{formatDateTime(landing.updatedAt)}</div>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-xs text-slate-500">Published</div>
            <div className="mt-1 text-sm font-semibold">{landing.publishedAt ? formatDateTime(landing.publishedAt) : "-"}</div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <Button onClick={togglePublish} loading={busy}>
            {landing.status === "PUBLISHED" ? "Unpublish" : "Publish"}
          </Button>
          <Button variant="secondary" onClick={load} disabled={busy}>Refresh</Button>
        </div>
      </Card>

      <Card className="p-6">
        <div className="text-sm font-semibold">Quick actions</div>
        <div className="mt-4 space-y-2">
          <Button variant="secondary" className="w-full" onClick={() => window.open(`/public/${landing.slug}`, "_blank")}>
            Public link нээх
          </Button>
          <Button variant="ghost" className="w-full" onClick={() => navigator.clipboard.writeText(`${window.location.origin}/public/${landing.slug}`)}>
            Link хуулах
          </Button>
        </div>
        <div className="mt-5 text-xs text-slate-500">
          Public endpoint: <code>/public/{landing.slug}</code>
        </div>
      </Card>
    </div>
  );
}
