import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, EmptyState, Field, Input, Modal } from "../../components/ui";
import { pageService } from "../../services/pageService";
import type { PageResponse } from "../../types/dto";

export default function LandingBuilderPage() {
  const { projectId } = useParams();
  const landingId = Number(projectId);

  const [pages, setPages] = useState<PageResponse[] | null>(null);
  const [busy, setBusy] = useState(false);

  const [createOpen, setCreateOpen] = useState(false);
  const [title, setTitle] = useState("Home");
  const [path, setPath] = useState("/");
  const [err, setErr] = useState<string | null>(null);

  const sorted = useMemo(
    () => (pages ?? []).slice().sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0)),
    [pages]
  );

  const load = async () => {
    setBusy(true);
    try {
      const list = await pageService.list(landingId);
      setPages(list);
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => { load(); }, [landingId]);

  const onCreate = async () => {
    setErr(null);
    setBusy(true);
    try {
      await pageService.create(landingId, {
        title: title.trim(),
        path: path.trim(),
        orderIndex: sorted.length,
      });
      setCreateOpen(false);
      await load();
    } catch (e: unknown) {
      const error = e as { payload?: string };
      setErr(typeof error?.payload === "string" ? error.payload : "Хуудас үүсгэхэд алдаа гарлаа.");
    } finally {
      setBusy(false);
    }
  };

  const reorderAndRefresh = async (next: PageResponse[]) => {
    await pageService.reorder(landingId, next.map((x) => x.id));
    await load();
  };

  const moveUp = async (idx: number) => {
    if (!pages || idx <= 0) return;
    const next = sorted.slice();
    [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
    setBusy(true);
    try { await reorderAndRefresh(next); }
    finally { setBusy(false); }
  };

  const moveDown = async (idx: number) => {
    if (!pages || idx >= sorted.length - 1) return;
    const next = sorted.slice();
    [next[idx + 1], next[idx]] = [next[idx], next[idx + 1]];
    setBusy(true);
    try { await reorderAndRefresh(next); }
    finally { setBusy(false); }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-3">
        <div>
          <div className="text-xl font-bold">Хуудсууд</div>
          <div className="mt-1 text-sm text-slate-600">
            Landing-ийн хуудсуудын жагсаалт. (path: /, /about …)
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => setCreateOpen(true)}>
            + Хуудас нэмэх
          </Button>
          <Button variant="ghost" onClick={load} disabled={busy}>
            Refresh
          </Button>
        </div>
      </div>

      {!pages || pages.length === 0 ? (
        <EmptyState
          title="Хуудас байхгүй байна"
          desc="Эхний хуудсаа үүсгээд Builder руу орно."
          action={
            <Button onClick={() => setCreateOpen(true)}>
              Хуудас үүсгэх
            </Button>
          }
        />
      ) : (
        <div className="grid gap-3">
          {sorted.map((p, idx) => (
            <Card key={p.id} className="p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="font-semibold">{p.title}</div>
                  <div className="text-sm text-slate-500 font-mono">{p.path}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    disabled={busy || idx === 0}
                    onClick={() => moveUp(idx)}
                  >
                    ↑
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    disabled={busy || idx === sorted.length - 1}
                    onClick={() => moveDown(idx)}
                  >
                    ↓
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    disabled={busy}
                    onClick={async () => {
                      if (!confirm("Хуудсыг устгах уу?")) return;
                      await pageService.remove(p.id);
                      await load();
                    }}
                  >
                    Устгах
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal
        open={createOpen}
        title="Шинэ хуудас үүсгэх"
        onClose={() => setCreateOpen(false)}
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setCreateOpen(false)}>
              Болих
            </Button>
            <Button onClick={onCreate} disabled={busy}>
              Үүсгэх
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <Field label="Гарчиг">
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </Field>
          <Field label="Path" hint="Жишээ: / эсвэл /about">
            <Input value={path} onChange={(e) => setPath(e.target.value)} />
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
