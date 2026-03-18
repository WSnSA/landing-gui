import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Field, Input, Modal } from "../../components/ui";
import { templateService } from "../../services/templateService";
import { landingService } from "../../services/landingService";
import type { TemplateResponse } from "../../types/dto";
import { useAuth } from "../../auth/AuthContext";
import { LandingRenderer, parseSchemaJson } from "../../components/LandingRenderer";
import { safeJsonParse } from "../../utils/format";
import CafeAnimatedPage from "../../templates/cafe/CafeAnimatedPage";
import { DEFAULT_CAFE_CONFIG } from "../../templates/cafe/CafeConfig";
import type { CafeConfig } from "../../templates/cafe/CafeConfig";
import HyperdriveAnimatedPage from "../../templates/hyperdrive/HyperdriveAnimatedPage";
import { DEFAULT_HYPERDRIVE_CONFIG } from "../../templates/hyperdrive/HyperdriveConfig";
import type { HyperdriveConfig } from "../../templates/hyperdrive/HyperdriveConfig";
import FutureAnimatedPage from "../../templates/future/FutureAnimatedPage";
import { DEFAULT_FUTURE_CONFIG } from "../../templates/future/FutureConfig";
import type { FutureConfig } from "../../templates/future/FutureConfig";

const TYPES: { value: string; label: string }[] = [
  { value: "all",            label: "Бүгд" },
  { value: "business",       label: "Бизнес" },
  { value: "restaurant",     label: "Ресторан" },
  { value: "portfolio",      label: "Портфолио" },
  { value: "product",        label: "Бүтээгдэхүүн" },
  { value: "event",          label: "Арга хэмжээ" },
  { value: "course",         label: "Сургалт" },
  { value: "personal",       label: "Хувийн" },
  { value: "digital_brochure", label: "Дижитал брошур" },
];

const TYPE_ICONS: Record<string, string> = {
  business:        "🏢",
  restaurant:      "🍽️",
  portfolio:       "🎨",
  product:         "📦",
  event:           "📅",
  course:          "📚",
  personal:        "👤",
  digital_brochure:"📄",
};

// Animated template-г schemaJson-аас шалгаж render хийх
function AnimatedTemplatePreview({ schemaJson }: { schemaJson: string | null }) {
  const schema = safeJsonParse<Record<string, unknown>>(schemaJson, {});
  const type = schema.__templateType as string | undefined;
  const cfg = schema.defaultConfig as Record<string, unknown> | undefined;

  if (type === "animated_cafe") {
    const config = { ...DEFAULT_CAFE_CONFIG, ...(cfg ?? {}) } as CafeConfig;
    return <CafeAnimatedPage config={config} />;
  }
  if (type === "driving_center") {
    const config = { ...DEFAULT_HYPERDRIVE_CONFIG, ...(cfg ?? {}) } as HyperdriveConfig;
    return <HyperdriveAnimatedPage config={config} />;
  }
  if (type === "education_center") {
    const config = { ...DEFAULT_FUTURE_CONFIG, ...(cfg ?? {}) } as FutureConfig;
    return <FutureAnimatedPage config={config} />;
  }
  return null;
}

function isAnimatedTemplate(schemaJson: string | null): boolean {
  const schema = safeJsonParse<Record<string, unknown>>(schemaJson, {});
  return ["animated_cafe", "driving_center", "education_center"].includes(schema.__templateType as string);
}

export default function MarketplacePage() {
  const nav = useNavigate();
  const { me, logout } = useAuth();

  const [templates, setTemplates] = useState<TemplateResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  // Modal: template сонгосны дараа нэр оруулах
  const [selected, setSelected] = useState<TemplateResponse | null>(null);
  const [siteName, setSiteName] = useState("");
  const [slug, setSlug] = useState("");
  const [slugEdited, setSlugEdited] = useState(false);
  const [creating, setCreating] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // Preview overlay
  const [previewing, setPreviewing] = useState<TemplateResponse | null>(null);

  useEffect(() => {
    templateService
      .list()
      .then(setTemplates)
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === "all"
    ? templates
    : templates.filter((t) => t.type === filter);

  function toSlug(val: string) {
    return val.toLowerCase().trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-")
      .slice(0, 60);
  }

  const ERRORS: Record<string, string> = {
    SLUG_REQUIRED:        "URL хоосон байна. Доорх URL талбарыг бөглөнө үү.",
    SLUG_TOO_SHORT:       "URL хамгийн багадаа 3 тэмдэгт байх ёстой.",
    SLUG_TOO_LONG:        "URL хэт урт байна (120-с дээш тэмдэгт).",
    SLUG_RESERVED:        "Энэ URL ашиглах боломжгүй. Өөр URL сонгоно уу.",
    LANDING_SLUG_EXISTS:  "Энэ URL аль хэдийн ашиглагдаж байна. Өөр URL оруулна уу.",
    DUPLICATE_ENTRY:      "Энэ URL аль хэдийн ашиглагдаж байна. Өөр URL оруулна уу.",
    TEMPLATE_NOT_FOUND:   "Template олдсонгүй. Дахин сонгоно уу.",
    INTERNAL_ERROR:       "Системийн алдаа гарлаа. Дахин оролдоно уу.",
  };

  const openModal = (tpl: TemplateResponse) => {
    setSelected(tpl);
    setSiteName("");
    setSlug("");
    setSlugEdited(false);
    setErr(null);
  };

  const handleNameChange = (val: string) => {
    setSiteName(val);
    if (!slugEdited) setSlug(toSlug(val));
    setErr(null);
  };

  const handleSlugChange = (val: string) => {
    setSlug(toSlug(val));
    setSlugEdited(true);
    setErr(null);
  };

  const create = async () => {
    if (!selected) return;
    if (siteName.trim().length < 2) { setErr("Сайтын нэр хамгийн багадаа 2 тэмдэгт байх ёстой."); return; }
    if (slug.length < 3) { setErr(ERRORS.SLUG_TOO_SHORT); return; }
    setCreating(true);
    setErr(null);
    try {
      const landing = await landingService.create({
        name: siteName.trim(),
        slug: slug,
        templateId: selected.id,
      });
      // animated template бол configJson-г шууд тохируул
      const schema = safeJsonParse<Record<string, unknown>>(selected.schemaJson, {});
      if (schema.__templateType && schema.defaultConfig) {
        await landingService.update(landing.id, {
          configJson: JSON.stringify({ ...(schema.defaultConfig as object), __type: schema.__templateType }),
        });
      }
      nav(`/app/${landing.id}/editor`, { replace: true });
    } catch (e: unknown) {
      const payload = (e as { payload?: unknown }).payload;
      const code = typeof payload === "object" && payload !== null
        ? (payload as Record<string, string>).code ?? "INTERNAL_ERROR"
        : typeof payload === "string" ? payload : "INTERNAL_ERROR";
      setErr(ERRORS[code] ?? "Алдаа гарлаа. Дахин оролдоно уу.");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
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
          <div className="mx-auto max-w-7xl px-6 py-2 flex gap-1 items-center">
            <Link
              to="/marketplace"
              className="rounded-lg px-3 py-2 text-sm font-medium bg-blue-600 text-white transition"
            >
              Marketplace
            </Link>
            <Link
              to="/my-sites"
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 transition"
            >
              Миний сайтууд
            </Link>
            {String(me?.role).includes("ADMIN") && (
              <>
                <span className="mx-1 h-4 w-px bg-slate-200" />
                <Link
                  to="/admin"
                  className="rounded-lg px-3 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50 transition"
                >
                  🛡️ Admin панел
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10 flex gap-8">
        {/* Sidebar filter */}
        <aside className="hidden md:block w-52 shrink-0">
          <div className="sticky top-24 space-y-1">
            <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Төрөл
            </div>
            {TYPES.map((t) => (
              <button
                key={t.value}
                onClick={() => setFilter(t.value)}
                className={`w-full text-left rounded-lg px-3 py-2 text-sm font-medium transition ${
                  filter === t.value
                    ? "bg-blue-600 text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                {t.value !== "all" && (
                  <span className="mr-2">{TYPE_ICONS[t.value]}</span>
                )}
                {t.label}
              </button>
            ))}
          </div>
        </aside>

        {/* Mobile filter */}
        <div className="md:hidden w-full mb-4 flex gap-2 overflow-x-auto pb-1">
          {TYPES.map((t) => (
            <button
              key={t.value}
              onClick={() => setFilter(t.value)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition ${
                filter === t.value
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Template grid */}
        <main className="flex-1 min-w-0">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900">Template сонгох</h1>
            <p className="mt-1 text-sm text-slate-500">
              Таны бизнест тохирсон template сонгоод 5 минутад вэбсайтаа бэлэн болго.
            </p>
          </div>

          {loading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="rounded-2xl border border-slate-200 bg-white overflow-hidden animate-pulse">
                  <div className="h-44 bg-slate-100" />
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-slate-100 rounded w-2/3" />
                    <div className="h-3 bg-slate-100 rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center text-slate-500 text-sm">
              Энэ төрлийн template одоогоор байхгүй байна.
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((tpl) => (
                <div
                  key={tpl.id}
                  className="group rounded-2xl border border-slate-200 bg-white overflow-hidden flex flex-col hover:border-blue-300 hover:shadow-md transition-all"
                >
                  {/* Preview thumbnail */}
                  {tpl.previewImageUrl ? (
                    <div className="h-44 overflow-hidden bg-slate-100">
                      <img
                        src={tpl.previewImageUrl}
                        alt={tpl.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                      />
                    </div>
                  ) : isAnimatedTemplate(tpl.schemaJson) ? (
                    <div className="h-44 overflow-hidden relative border-b border-slate-100">
                      <div style={{ transform: "scale(0.28)", transformOrigin: "top left", width: "357%", pointerEvents: "none" }}>
                        <AnimatedTemplatePreview schemaJson={tpl.schemaJson} />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/40" />
                    </div>
                  ) : tpl.schemaJson ? (
                    <div className="h-44 overflow-hidden bg-white relative border-b border-slate-100">
                      <div style={{ transform: "scale(0.28)", transformOrigin: "top left", width: "357%", pointerEvents: "none" }}>
                        <LandingRenderer pages={parseSchemaJson(tpl.schemaJson)} />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/60" />
                    </div>
                  ) : (
                    <div className="h-44 bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-50 flex items-center justify-center">
                      <span className="text-5xl">{TYPE_ICONS[tpl.type] ?? "📄"}</span>
                    </div>
                  )}

                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-semibold text-slate-900">{tpl.name}</div>
                      <span className="shrink-0 text-xs bg-blue-50 text-blue-700 font-medium px-2 py-0.5 rounded-full">
                        {TYPES.find((t) => t.value === tpl.type)?.label ?? tpl.type}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm text-slate-500 flex-1 line-clamp-2">
                      {tpl.description}
                    </p>
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => setPreviewing(tpl)}
                        className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
                      >
                        Харах
                      </button>
                      <button
                        onClick={() => openModal(tpl)}
                        className="flex-1 rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition"
                      >
                        Ашиглах
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Template preview overlay */}
      {previewing && (
        <div className="fixed inset-0 z-50 flex flex-col bg-slate-900/80 backdrop-blur-sm">
          <div className="flex items-center justify-between px-6 py-3 bg-white border-b border-slate-200 shrink-0">
            <div>
              <span className="font-semibold text-slate-900">{previewing.name}</span>
              <span className="ml-2 text-sm text-slate-500">— урьдчилж харах</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => { setPreviewing(null); openModal(previewing); }}
                className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition"
              >
                Ашиглах
              </button>
              <button
                onClick={() => setPreviewing(null)}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
              >
                ✕ Хаах
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto bg-white">
            {isAnimatedTemplate(previewing.schemaJson) ? (
              <AnimatedTemplatePreview schemaJson={previewing.schemaJson} />
            ) : parseSchemaJson(previewing.schemaJson).length > 0 ? (
              <LandingRenderer pages={parseSchemaJson(previewing.schemaJson)} />
            ) : (
              <div className="flex items-center justify-center h-full text-slate-400 text-sm">
                Энэ template-д preview байхгүй байна.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal: сайтын нэр */}
      <Modal
        open={!!selected}
        title={`"${selected?.name}" ашиглах`}
        onClose={() => !creating && setSelected(null)}
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setSelected(null)} disabled={creating}>
              Болих
            </Button>
            <Button onClick={create} loading={creating} disabled={siteName.trim().length < 2 || slug.length < 3}>
              Үүсгэх →
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <Field label="Сайтын нэр">
            <Input
              autoFocus
              value={siteName}
              onChange={(e) => handleNameChange(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") create(); }}
              placeholder="Ж: Cafe Luna, Миний Компани"
            />
          </Field>
          <Field label="Сайтын URL хаяг">
            <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
              <span className="pl-3 pr-1 text-sm text-slate-400 shrink-0 select-none">landing.mn/p/</span>
              <input
                value={slug}
                onChange={(e) => handleSlugChange(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") create(); }}
                placeholder="cafe-luna"
                className="flex-1 bg-transparent py-2.5 pr-3 text-sm outline-none text-slate-900 min-w-0"
              />
            </div>
            <p className="mt-1 text-xs text-slate-400">Зөвхөн жижиг үсэг, тоо, зураас (-) ашиглана.</p>
          </Field>
          {err && (
            <div className="rounded-lg bg-rose-50 border border-rose-200 p-3 text-sm text-rose-700">
              {err}
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
