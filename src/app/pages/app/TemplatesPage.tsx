import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, EmptyState } from "../../components/ui";
import { landingService } from "../../services/landingService";
import { templateService } from "../../services/templateService";
import type { LandingResponse, TemplateResponse } from "../../types/dto";
import { safeJsonParse } from "../../utils/format";

const TYPE_LABELS: Record<string, string> = {
  business: "Бизнес",
  course: "Сургалт",
  personal: "Хувийн",
  product: "Бүтээгдэхүүн",
  event: "Арга хэмжээ",
  restaurant: "Ресторан",
  portfolio: "Портфолио",
  digital_brochure: "Дижитал брошур",
};

// ── Template mini-preview ─────────────────────────────────────────────────────

function CafeMiniPreview() {
  return (
    <div className="w-full h-40 bg-stone-50 overflow-hidden relative flex flex-col">
      {/* Nav */}
      <div className="bg-white/80 border-b border-stone-200 px-4 py-2 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-1.5">
          <div className="h-4 w-4 rounded-full bg-amber-400" />
          <div className="h-2 w-16 bg-slate-200 rounded-full" />
        </div>
        <div className="h-5 w-14 rounded-lg bg-amber-500" />
      </div>
      {/* Hero */}
      <div className="flex-1 flex items-center px-4 gap-4 relative">
        <div className="absolute -top-8 -left-8 h-32 w-32 rounded-full bg-amber-400/20 blur-2xl pointer-events-none" />
        <div className="flex-1 space-y-1.5">
          <div className="h-2 w-10 bg-amber-400 rounded-full opacity-70" />
          <div className="h-3 w-28 bg-slate-800 rounded-full" />
          <div className="h-3 w-20 bg-amber-500 rounded-full" />
          <div className="h-2 w-24 bg-slate-300 rounded-full mt-1" />
          <div className="flex gap-1.5 mt-2">
            <div className="h-5 w-16 rounded-lg bg-amber-500" />
            <div className="h-5 w-16 rounded-lg bg-white border border-slate-200" />
          </div>
        </div>
        {/* Browser mockup */}
        <div className="w-28 shrink-0 rounded-lg border border-slate-200 bg-white/70 overflow-hidden shadow-sm">
          <div className="bg-slate-100 px-2 py-1 flex gap-0.5">
            <div className="h-1.5 w-1.5 rounded-full bg-rose-300" />
            <div className="h-1.5 w-1.5 rounded-full bg-amber-300" />
            <div className="h-1.5 w-1.5 rounded-full bg-green-300" />
          </div>
          <div className="p-1.5 space-y-1">
            <div className="h-1.5 w-full bg-amber-100 rounded" />
            <div className="grid grid-cols-3 gap-0.5">
              {[1,2,3].map(i => <div key={i} className="h-3 rounded bg-stone-100 border border-stone-200" />)}
            </div>
          </div>
        </div>
      </div>
      {/* Label */}
      <div className="absolute bottom-1.5 left-3 text-[9px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-full border border-amber-200">
        Light · Glassmorphism
      </div>
    </div>
  );
}

function HyperdriveMiniPreview() {
  return (
    <div className="w-full h-40 bg-zinc-950 overflow-hidden relative flex flex-col">
      {/* Grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
      {/* Speed lines */}
      {[20,35,50,65,78].map((top, i) => (
        <div key={i} className="absolute h-px bg-orange-500/30" style={{ top: `${top}%`, left: 0, right: 0 }} />
      ))}
      {/* Glow */}
      <div className="absolute -top-6 -left-6 h-24 w-24 rounded-full bg-orange-500/20 blur-2xl pointer-events-none" />
      {/* Nav */}
      <div className="bg-zinc-900/90 border-b border-white/10 px-4 py-2 flex items-center justify-between shrink-0 relative">
        <div className="flex items-center gap-1.5">
          <div className="h-4 w-4 rounded bg-orange-500" />
          <div className="h-2 w-16 bg-zinc-700 rounded-full" />
        </div>
        <div className="h-5 w-14 rounded-lg bg-orange-500" />
      </div>
      {/* Hero */}
      <div className="flex-1 flex items-center px-4 gap-4 relative">
        <div className="flex-1 space-y-1.5">
          <div className="h-2 w-10 bg-orange-500/60 rounded-full" />
          <div className="h-3 w-28 bg-white rounded-full" />
          <div className="h-3 w-20 bg-orange-400 rounded-full" />
          <div className="h-2 w-24 bg-zinc-600 rounded-full mt-1" />
          <div className="flex gap-1.5 mt-2">
            <div className="h-5 w-16 rounded-lg bg-orange-500" />
            <div className="h-5 w-16 rounded-lg bg-white/10 border border-white/20" />
          </div>
        </div>
        {/* Browser mockup */}
        <div className="w-28 shrink-0 rounded-lg border border-white/10 bg-zinc-900 overflow-hidden shadow-lg">
          <div className="bg-zinc-800 px-2 py-1 flex gap-0.5">
            <div className="h-1.5 w-1.5 rounded-full bg-rose-400" />
            <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
          </div>
          <div className="p-1.5 space-y-1">
            <div className="h-1.5 w-full bg-orange-500/30 rounded" />
            <div className="grid grid-cols-3 gap-0.5">
              {[1,2,3].map(i => <div key={i} className="h-3 rounded bg-zinc-800 border border-white/10" />)}
            </div>
          </div>
        </div>
      </div>
      {/* Label */}
      <div className="absolute bottom-1.5 left-3 text-[9px] font-bold text-orange-400 bg-orange-500/10 px-1.5 py-0.5 rounded-full border border-orange-500/20">
        Dark · Racing
      </div>
    </div>
  );
}

function TemplateMiniPreview({ template }: { template: TemplateResponse }) {
  if (template.previewImageUrl) {
    return (
      <div className="h-40 bg-slate-100 overflow-hidden">
        <img src={template.previewImageUrl} alt={template.name}
          className="w-full h-full object-cover"
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
      </div>
    );
  }

  const schema = safeJsonParse<Record<string, unknown>>(template.schemaJson, {});
  const templateType = schema.__templateType as string | undefined;

  if (templateType === "animated_cafe") return <CafeMiniPreview />;
  if (templateType === "driving_center") return <HyperdriveMiniPreview />;

  // Generic fallback
  const emoji = template.type === "restaurant" ? "🍽️"
    : template.type === "portfolio" ? "🎨"
    : template.type === "event" ? "📅"
    : template.type === "course" ? "📚"
    : template.type === "product" ? "📦"
    : "📄";
  return (
    <div className="h-40 bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center">
      <div className="text-4xl text-slate-300">{emoji}</div>
    </div>
  );
}

export default function TemplatesPage() {
  const { projectId } = useParams();
  const landingId = Number(projectId);
  const navigate = useNavigate();

  const [landing, setLanding] = useState<LandingResponse | null>(null);
  const [templates, setTemplates] = useState<TemplateResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      landingService.get(landingId),
      templateService.list(),
    ]).then(([l, tpls]) => {
      setLanding(l);
      setTemplates(tpls);
    }).catch(() => {
      setErr("Мэдээлэл ачаалахад алдаа гарлаа.");
    }).finally(() => setLoading(false));
  }, [landingId]);

  /**
   * Template сонгоход:
   * 1. Одоогийн landing-г устгана
   * 2. Шинэ landing-г template-тэйгээр үүсгэнэ → Page/Section/Component автоматаар үүснэ
   * 3. Шинэ landing руу navigate хийнэ
   */
  const applyTemplate = async (tpl: TemplateResponse) => {
    if (!landing) return;
    if (!confirm(`"${tpl.name}" template сонгох уу? Одоогийн бүтэц template-ийн бүтцээр солигдоно.`)) return;

    setBusy(true);
    setErr(null);
    try {
      // Шинэ landing үүсгэж template apply хийнэ
      const created = await landingService.create({
        name: landing.name,
        slug: landing.slug + "-" + Date.now(),
        templateId: tpl.id,
      });

      // Animated template бол configJson initialize хийнэ
      const schema = safeJsonParse<Record<string, unknown>>(tpl.schemaJson, {});
      if (schema.__templateType && schema.defaultConfig) {
        await landingService.update(created.id, {
          configJson: JSON.stringify({ ...(schema.defaultConfig as object), __type: schema.__templateType }),
        });
      }

      // Хуучин landing устгана
      await landingService.remove(landingId);

      navigate(`/app/${created.id}/editor`, { replace: true });
    } catch (e: unknown) {
      const err = e as { payload?: string; message?: string };
      setErr(err?.payload ?? err?.message ?? "Алдаа гарлаа.");
    } finally {
      setBusy(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40 text-sm text-slate-500">
        Ачаалж байна...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xl font-bold text-slate-900">Template сонгох</div>
        <div className="mt-1 text-sm text-slate-600">
          Template сонгоход тухайн template-н хуудас, хэсэг, компонентууд автоматаар үүснэ.
          Та дараа нь Builder-т утгуудыг өөрчилж болно.
        </div>
      </div>

      {err && (
        <Card className="p-4 border-rose-200 bg-rose-50">
          <div className="text-sm text-rose-700">{err}</div>
        </Card>
      )}

      {templates.length === 0 ? (
        <EmptyState
          title="Template байхгүй байна"
          desc="Admin хэсэгт template нэмнэ үү."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((t) => (
            <Card key={t.id} className="overflow-hidden flex flex-col">
              <TemplateMiniPreview template={t} />

              <div className="p-4 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="text-base font-semibold text-slate-900">{t.name}</div>
                  <span className="shrink-0 text-xs font-medium bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                    {TYPE_LABELS[t.type] ?? t.type}
                  </span>
                </div>
                <div className="mt-1 text-sm text-slate-600 flex-1">{t.description}</div>

                <div className="mt-4">
                  <Button
                    className="w-full"
                    variant={landing?.templateId === t.id ? "secondary" : "primary"}
                    disabled={busy}
                    onClick={() => applyTemplate(t)}
                  >
                    {landing?.templateId === t.id ? "Одоо ашиглаж байна" : "Энэ template сонгох"}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
