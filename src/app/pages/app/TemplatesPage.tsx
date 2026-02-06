import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card } from "../../../components/ui";
import { landingService } from "../../../services/landingService";
import type { LandingResponse } from "../../../types/dto";

const TEMPLATES = [
  { id: 1, name: "Free", desc: "Энгийн нэг хуудас, хурдан." },
  { id: 2, name: "Business", desc: "Компанийн танилцуулга + үйлчилгээ." },
  { id: 3, name: "Done-for-you", desc: "Нэг дор бүх мэдээлэлтэй хувилбар." },
];

export default function TemplatesPage() {
  const { projectId } = useParams();
  const landingId = Number(projectId);

  const [landing, setLanding] = useState<LandingResponse | null>(null);
  const [busy, setBusy] = useState(false);

  const load = async () => {
    const l = await landingService.get(landingId);
    setLanding(l);
  };

  useEffect(() => { load(); }, [landingId]);

  const setTemplate = async (templateId: number) => {
    setBusy(true);
    try {
      const updated = await landingService.update(landingId, { });
      // backend currently sets templateId on create; update may not include templateId.
      // If update supports it later, wire here. For now just show UX.
      setLanding(updated);
      alert("Template update endpoint backend дээр нэмж өгөх шаардлагатай (templateId update). UX бэлэн.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="text-xl font-bold">Templates</div>
        <div className="mt-1 text-sm text-slate-600">
          Template сонголт. (Хэрвээ backend update templateId дэмжвэл шууд холбогдоно.)
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {TEMPLATES.map((t) => (
          <Card key={t.id} className="p-5">
            <div className="text-base font-semibold">{t.name}</div>
            <div className="mt-1 text-sm text-slate-600">{t.desc}</div>
            <div className="mt-4 text-xs text-slate-500">templateId: {t.id}</div>
            <div className="mt-4">
              <Button className="w-full" variant={landing?.templateId === t.id ? "secondary" : "primary"} disabled={busy} onClick={() => setTemplate(t.id)}>
                {landing?.templateId === t.id ? "Сонгосон" : "Сонгох"}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
