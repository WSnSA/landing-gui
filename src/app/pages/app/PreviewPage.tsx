import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "../../components/ui";
import { landingService } from "../../services/landingService";
import { pageService } from "../../services/pageService";
import { sectionService } from "../../services/sectionService";
import { componentService } from "../../services/componentService";
import { LandingRenderer, type RendererPage } from "../../components/LandingRenderer";
import type { LandingResponse } from "../../types/dto";

export default function PreviewPage() {
  const { projectId } = useParams();
  const id = Number(projectId);

  const [landing, setLanding] = useState<LandingResponse | null>(null);
  const [pages, setPages] = useState<RendererPage[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const l = await landingService.get(id);
      setLanding(l);

      const rawPages = await pageService.list(id);
      const sorted = rawPages.slice().sort((a, b) => a.orderIndex - b.orderIndex);

      const result: RendererPage[] = [];
      for (const p of sorted) {
        const secs = await sectionService.list(p.id);
        const secsSorted = secs.slice().sort((a, b) => a.orderIndex - b.orderIndex);
        const rendererSections = [];
        for (const s of secsSorted) {
          const comps = await componentService.list(s.id);
          rendererSections.push({
            id: s.id,
            sectionKey: s.sectionKey,
            title: s.title ?? null,
            orderIndex: s.orderIndex,
            components: comps.slice().sort((a, b) => a.orderIndex - b.orderIndex).map((c) => ({
              id: c.id,
              componentType: c.componentType,
              propsJson: c.propsJson ?? null,
              orderIndex: c.orderIndex,
            })),
          });
        }
        result.push({
          id: p.id,
          title: p.title,
          path: p.path ?? "/",
          orderIndex: p.orderIndex,
          sections: rendererSections,
        });
      }
      setPages(result);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [id]);

  const isPublished = landing?.status === "PUBLISHED";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-xl font-bold text-slate-900">Preview</div>
          <div className="mt-1 text-sm text-slate-500">
            Сайт нийтлэгдсэний дараа яг ийм харагдана.
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
          {isPublished && landing && (
            <a
              href={`/p/${landing.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 transition"
            >
              🚀 Нийтлэгдсэн сайт харах
            </a>
          )}
          <Button variant="ghost" onClick={load} disabled={loading}>↺ Refresh</Button>
        </div>
      </div>

      {!isPublished && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
          Энэ нь ноорог preview — нийтлэхийн тулд Dashboard дээр <strong>Нийтлэх</strong> дарна уу.
        </div>
      )}

      {loading ? (
        <div className="rounded-2xl border border-slate-200 bg-white h-96 flex items-center justify-center text-sm text-slate-400">
          Ачаалж байна…
        </div>
      ) : pages.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white h-60 flex flex-col items-center justify-center gap-3 text-slate-400">
          <div className="text-4xl">📄</div>
          <div className="text-sm">Агуулга байхгүй байна.</div>
          <Link
            to={`/app/${id}/templates`}
            className="text-sm text-blue-600 hover:underline"
          >
            Template сонгох →
          </Link>
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-sm">
          {/* Browser chrome mockup */}
          <div className="border-b border-slate-200 bg-slate-50 px-4 py-2.5 flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-rose-400" />
              <div className="h-3 w-3 rounded-full bg-amber-400" />
              <div className="h-3 w-3 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 rounded-md bg-white border border-slate-200 px-3 py-1 text-xs text-slate-500 text-center truncate">
              landing.mn/p/{landing?.slug}
            </div>
          </div>
          {/* Actual render */}
          <div className="max-h-[75vh] overflow-y-auto">
            <LandingRenderer pages={pages} />
          </div>
        </div>
      )}
    </div>
  );
}
