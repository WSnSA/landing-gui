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
              {/* Preview зураг */}
              {t.previewImageUrl ? (
                <div className="h-40 bg-slate-100 overflow-hidden">
                  <img
                    src={t.previewImageUrl}
                    alt={t.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              ) : (
                <div className="h-40 bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center">
                  <div className="text-4xl text-slate-300">
                    {t.type === "business" ? "🏢"
                      : t.type === "restaurant" ? "🍽️"
                      : t.type === "portfolio" ? "🎨"
                      : t.type === "event" ? "📅"
                      : t.type === "course" ? "📚"
                      : t.type === "product" ? "📦"
                      : "📄"}
                  </div>
                </div>
              )}

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
