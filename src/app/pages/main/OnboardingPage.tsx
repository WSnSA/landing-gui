import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, EmptyState, Field, Input, Modal, Select, Textarea } from "../../../components/ui";
import {LandingResponse} from "../../../types/dto";
import {useAuth} from "../../../auth/AuthContext";
import {landingService} from "../../../services/landingService";
import {formatDateTime} from "../../../utils/format";

export default function OnboardingPage() {
  const nav = useNavigate();
  const { me, logout } = useAuth();

  const [landings, setLandings] = useState<LandingResponse[] | null>(null);
  const [busy, setBusy] = useState(false);

  const [createOpen, setCreateOpen] = useState(false);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [templateId, setTemplateId] = useState<string>("");
  const [err, setErr] = useState<string | null>(null);

  // @ts-ignore
  const load = async () => {
    setBusy(true);
    try {
      const list = await landingService.list();
      setLandings(list.sort((a, b) => (b.id ?? 0) - (a.id ?? 0)));
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => { load(); }, []);

  const canCreate = useMemo(() => name.trim().length >= 2, [name]);

  // @ts-ignore
  const onCreate = async () => {
    setErr(null);
    if (!canCreate) return;
    setBusy(true);
    try {
      const created = await landingService.create({
        name: name.trim(),
        slug: slug.trim() ? slug.trim() : null,
        templateId: templateId ? Number(templateId) : null,
      });
      setCreateOpen(false);
      setName("");
      setSlug("");
      setTemplateId("");
      nav(`/app/${created.id}`, { replace: true });
    } catch (e: any) {
      setErr(typeof e?.payload === "string" ? e.payload : "Үүсгэхэд алдаа гарлаа.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div>
            <div className="text-sm text-slate-500">Тавтай морил</div>
            <div className="text-lg font-semibold">{me?.fullName ?? "User"}</div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" onClick={() => setCreateOpen(true)}>Шинэ Landing</Button>
            <Button variant="ghost" onClick={logout}>Гарах</Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Төслүүд</h1>
            <p className="mt-1 text-sm text-slate-600">Өөрийн Landing төслүүдээ сонгоод builder руу орно.</p>
          </div>
          <Button onClick={load} variant="ghost" disabled={busy}>Дахин ачаалах</Button>
        </div>

        <div className="mt-6">
          {!landings || landings.length === 0 ? (
            <EmptyState
              title="Одоогоор landing байхгүй байна"
              desc="Шинэ landing үүсгээд builder-ээр эхлээрэй."
              action={<Button onClick={() => setCreateOpen(true)}>Шинэ Landing</Button>}
            />
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {landings.map((l) => (
                <Card key={l.id} className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-base font-semibold">{l.name}</div>
                      <div className="mt-1 text-sm text-slate-600">/{l.slug}</div>
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">{l.status}</span>
                  </div>
                  <div className="mt-4 text-xs text-slate-500">
                    Updated: {formatDateTime(l.updatedAt)}
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button className="flex-1" onClick={() => nav(`/app/${l.id}`)}>Нээх</Button>
                    <Button
                      variant="danger"
                      onClick={async () => {
                        if (!confirm("Устгах уу?")) return;
                        await landingService.remove(l.id);
                        await load();
                      }}
                    >
                      Устгах
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Modal
        open={createOpen}
        title="Шинэ Landing үүсгэх"
        onClose={() => setCreateOpen(false)}
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setCreateOpen(false)}>Болих</Button>
            <Button onClick={onCreate} disabled={!canCreate} loading={busy}>Үүсгэх</Button>
          </div>
        }
      >
        <div className="space-y-4">
          <Field label="Нэр" hint="(min 2 тэмдэг)">
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ж: Cafe Luna" />
          </Field>
          <Field label="Slug" hint="хоосон байж болно → name-ээс үүсгэнэ">
            <Input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="cafe-luna" />
          </Field>
          <Field label="Template ID" hint="(optional)">
            <Input value={templateId} onChange={(e) => setTemplateId(e.target.value)} placeholder="1" />
          </Field>
          {err ? <div className="rounded-lg bg-rose-50 border border-rose-200 p-3 text-sm text-rose-700">{err}</div> : null}
        </div>
      </Modal>
    </div>
  );
}
