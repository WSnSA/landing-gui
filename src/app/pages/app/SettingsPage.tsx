import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, Field, Input } from "../../components/ui";
import { landingService } from "../../services/landingService";
import type { LandingResponse } from "../../types/dto";

const ERRORS: Record<string, string> = {
  LANDING_SLUG_EXISTS: "Энэ URL аль хэдийн ашиглагдаж байна. Өөр URL оруулна уу.",
  DUPLICATE_ENTRY:     "Энэ URL аль хэдийн ашиглагдаж байна. Өөр URL оруулна уу.",
  SLUG_TOO_SHORT:      "URL хамгийн багадаа 3 тэмдэгт байх ёстой.",
  SLUG_TOO_LONG:       "URL хэт урт байна.",
  SLUG_RESERVED:       "Энэ URL ашиглах боломжгүй. Өөр URL оруулна уу.",
  INTERNAL_ERROR:      "Системийн алдаа гарлаа. Дахин оролдоно уу.",
};

function toSlug(val: string) {
  return val.toLowerCase().trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .slice(0, 60);
}

export default function SettingsPage() {
  const { projectId } = useParams();
  const id = Number(projectId);

  const [landing, setLanding] = useState<LandingResponse | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");

  const load = async () => {
    setBusy(true);
    try {
      const l = await landingService.get(id);
      setLanding(l);
      setName(l.name ?? "");
      setSlug(l.slug ?? "");
      setSeoTitle(l.seoTitle ?? "");
      setSeoDescription(l.seoDescription ?? "");
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => { load(); }, [id]);

  const save = async () => {
    setErr(null);
    setSuccess(false);
    if (name.trim().length < 2) { setErr("Сайтын нэр хамгийн багадаа 2 тэмдэгт байх ёстой."); return; }
    if (slug.length < 3) { setErr(ERRORS.SLUG_TOO_SHORT); return; }
    setBusy(true);
    try {
      const updated = await landingService.update(id, {
        name: name.trim(),
        slug: slug,
        seoTitle: seoTitle.trim() || null,
        seoDescription: seoDescription.trim() || null,
      });
      setLanding(updated);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (e: unknown) {
      const payload = (e as { payload?: unknown }).payload;
      const code = typeof payload === "object" && payload !== null
        ? (payload as Record<string, string>).code ?? "INTERNAL_ERROR"
        : typeof payload === "string" ? payload : "INTERNAL_ERROR";
      setErr(ERRORS[code] ?? "Алдаа гарлаа. Дахин оролдоно уу.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="text-xl font-bold text-slate-900">Тохиргоо</div>
        <div className="mt-1 text-sm text-slate-500">Сайтын нэр, URL, SEO мэдээлэл.</div>
      </div>

      <Card className="p-6 space-y-5">
        <Field label="Сайтын нэр">
          <Input
            value={name}
            onChange={(e) => { setName(e.target.value); setErr(null); }}
            placeholder="Ж: Миний компани"
          />
        </Field>

        <Field label="Сайтын URL хаяг">
          <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
            <span className="pl-3 pr-1 text-sm text-slate-400 shrink-0 select-none">landing.mn/p/</span>
            <input
              value={slug}
              onChange={(e) => { setSlug(toSlug(e.target.value)); setErr(null); }}
              className="flex-1 bg-transparent py-2.5 pr-3 text-sm outline-none text-slate-900 min-w-0"
              placeholder="minii-compani"
            />
          </div>
          <p className="mt-1 text-xs text-slate-400">Зөвхөн жижиг үсэг, тоо, зураас (-) ашиглана.</p>
        </Field>

        <div className="border-t border-slate-100 pt-4">
          <div className="text-sm font-semibold text-slate-700 mb-3">SEO тохиргоо</div>
          <div className="space-y-4">
            <Field label="SEO Гарчиг" hint="Хайлтын үр дүнд харагдах гарчиг">
              <Input
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder="Ж: Миний компани — Монголын шилдэг үйлчилгээ"
              />
            </Field>
            <Field label="SEO Тайлбар" hint="Хайлтын үр дүнд харагдах товч тайлбар">
              <Input
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                placeholder="Ж: Бид Монголын хамгийн найдвартай..."
              />
            </Field>
          </div>
        </div>

        {err && (
          <div className="rounded-lg bg-rose-50 border border-rose-200 p-3 text-sm text-rose-700">{err}</div>
        )}
        {success && (
          <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-sm text-emerald-700">
            ✓ Тохиргоо амжилттай хадгалагдлаа.
          </div>
        )}

        <div className="flex gap-2">
          <Button onClick={save} loading={busy}>Хадгалах</Button>
          <Button variant="ghost" onClick={load} disabled={busy}>Буцаах</Button>
        </div>
      </Card>
    </div>
  );
}
