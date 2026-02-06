import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, Field, Input, Textarea } from "../../../components/ui";
import { landingService } from "../../../services/landingService";
import type { LandingResponse } from "../../../types/dto";
import type { ApiError } from "../../../services/apiClient";

export default function SettingsPage() {
  const { projectId } = useParams();
  const id = Number(projectId);

  const [landing, setLanding] = useState<LandingResponse | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [configJson, setConfigJson] = useState("{}");

  const load = async () => {
    setBusy(true);
    try {
      const l = await landingService.get(id);
      setLanding(l);
      setName(l.name ?? "");
      setSlug(l.slug ?? "");
      setSeoTitle(l.seoTitle ?? "");
      setSeoDescription(l.seoDescription ?? "");
      // backend has configJson on UpdateLandingRequest, but LandingResponse doesn't include configJson
      setConfigJson("{}");
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => { load(); }, [id]);

  const save = async () => {
    setBusy(true);
    setErr(null);
    try {
      const updated = await landingService.update(id, {
        name: name.trim() || null,
        slug: slug.trim() || null,
        seoTitle: seoTitle.trim() || null,
        seoDescription: seoDescription.trim() || null,
        configJson: configJson || null,
      });
      setLanding(updated);
      alert("Хадгаллаа.");
    } catch (e: any) {
      const ae = e as ApiError;
      setErr(ae?.payload ? JSON.stringify(ae.payload) : "Алдаа гарлаа.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="text-xl font-bold">Settings</div>
        <div className="mt-1 text-sm text-slate-600">Landing-ийн нэр, slug, SEO, configJson.</div>
      </div>

      <Card className="p-6 space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Name">
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </Field>
          <Field label="Slug" hint="^[a-zA-Z0-9-\s_]*$">
            <Input value={slug} onChange={(e) => setSlug(e.target.value)} />
          </Field>
          <Field label="SEO Title">
            <Input value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} />
          </Field>
          <Field label="SEO Description">
            <Input value={seoDescription} onChange={(e) => setSeoDescription(e.target.value)} />
          </Field>
        </div>

        <Field label="configJson" hint="Builder config state (string)">
          <Textarea rows={10} value={configJson} onChange={(e) => setConfigJson(e.target.value)} />
        </Field>

        {err ? <div className="rounded-lg bg-rose-50 border border-rose-200 p-3 text-sm text-rose-700">{err}</div> : null}

        <div className="flex gap-2">
          <Button onClick={save} loading={busy}>Save</Button>
          <Button variant="ghost" onClick={load} disabled={busy}>Reset</Button>
        </div>
      </Card>
    </div>
  );
}
