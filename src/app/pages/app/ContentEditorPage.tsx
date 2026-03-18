import { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Button, Card, EmptyState, Field, Input, Select, Textarea } from "../../components/ui";
import { pageService } from "../../services/pageService";
import { sectionService } from "../../services/sectionService";
import { componentService } from "../../services/componentService";
import { LandingRenderer, type RendererPage } from "../../components/LandingRenderer";
import type { ComponentResponse, SectionResponse } from "../../types/dto";
import { safeJsonParse, safeJsonStringify } from "../../utils/format";

const SECTION_LABELS: Record<string, string> = {
  hero: "Үндсэн хэсэг", features: "Давуу талууд", about: "Бидний тухай",
  pricing: "Үнэ тариф", faq: "Түгээмэл асуултууд", contact: "Холбоо барих",
  gallery: "Галерей", team: "Баг", testimonials: "Сэтгэгдэл", cta: "Уриалга",
};

type SectionWithComponents = SectionResponse & { components: ComponentResponse[] };

function ComponentEditor({ component, onSave }: { component: ComponentResponse; onSave: (propsJson: string) => Promise<void> }) {
  const [props, setProps] = useState<Record<string, unknown>>(safeJsonParse(component.propsJson, {}));
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const set = (key: string, val: unknown) => { setProps((p) => ({ ...p, [key]: val })); setSaved(false); };

  const save = async () => {
    setSaving(true);
    try {
      await onSave(JSON.stringify(props));
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally { setSaving(false); }
  };

  const type = component.componentType;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-mono bg-slate-100 text-slate-500 px-2 py-0.5 rounded">{type}</span>
        <Button size="sm" onClick={save} loading={saving}>
          {saved ? "✓ Хадгалагдлаа" : "Хадгалах"}
        </Button>
      </div>

      {type === "TEXT" && (
        <div className="space-y-3">
          <Field label="Текст">
            <Textarea rows={3} value={String(props.text ?? "")} onChange={(e) => set("text", e.target.value)} />
          </Field>
          <div className="grid grid-cols-3 gap-2">
            <Field label="Хэмжээ">
              <Input value={String(props.fontSize ?? "16px")} onChange={(e) => set("fontSize", e.target.value)} />
            </Field>
            <Field label="Жин">
              <Select value={String(props.fontWeight ?? "normal")} onChange={(e) => set("fontWeight", e.target.value)}>
                <option value="normal">Энгийн</option>
                <option value="500">Дунд</option>
                <option value="bold">Тод</option>
                <option value="800">Маш тод</option>
              </Select>
            </Field>
            <Field label="Зэрэгцэх">
              <Select value={String(props.align ?? "left")} onChange={(e) => set("align", e.target.value)}>
                <option value="left">Зүүн</option>
                <option value="center">Голлуулах</option>
                <option value="right">Баруун</option>
              </Select>
            </Field>
          </div>
          <Field label="Өнгө">
            <div className="flex gap-2 items-center">
              <input type="color" value={String(props.color ?? "#111827")}
                onChange={(e) => set("color", e.target.value)}
                className="w-10 h-9 rounded border border-slate-200 p-0.5 cursor-pointer" />
              <Input value={String(props.color ?? "#111827")} onChange={(e) => set("color", e.target.value)} />
            </div>
          </Field>
        </div>
      )}

      {type === "IMAGE" && (
        <div className="space-y-3">
          <Field label="Зургийн URL">
            <Input value={String(props.src ?? "")} onChange={(e) => set("src", e.target.value)} placeholder="https://..." />
          </Field>
          {props.src && (
            <img src={String(props.src)} alt="" className="w-full max-h-40 object-cover rounded-lg border border-slate-200"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
          )}
          <Field label="Alt текст">
            <Input value={String(props.alt ?? "")} onChange={(e) => set("alt", e.target.value)} />
          </Field>
        </div>
      )}

      {type === "BUTTON" && (
        <div className="space-y-3">
          <Field label="Товчны текст">
            <Input value={String(props.label ?? "")} onChange={(e) => set("label", e.target.value)} />
          </Field>
          <Field label="Холбоос">
            <Input value={String(props.href ?? "#")} onChange={(e) => set("href", e.target.value)} />
          </Field>
          <div className="grid grid-cols-2 gap-2">
            <Field label="Хэлбэр">
              <Select value={String(props.variant ?? "primary")} onChange={(e) => set("variant", e.target.value)}>
                <option value="primary">Үндсэн</option>
                <option value="outline">Хүрээтэй</option>
                <option value="ghost">Тунгалаг</option>
                <option value="secondary">Хоёрдогч</option>
              </Select>
            </Field>
            <Field label="Хэмжээ">
              <Select value={String(props.size ?? "md")} onChange={(e) => set("size", e.target.value)}>
                <option value="sm">Жижиг</option>
                <option value="md">Дунд</option>
                <option value="lg">Том</option>
              </Select>
            </Field>
          </div>
        </div>
      )}

      {type === "LIST" && (
        <div className="space-y-3">
          <Field label="Мөрүүд (мөр тус бүр = нэг item)">
            <Textarea rows={5}
              value={Array.isArray(props.items) ? (props.items as string[]).join("\n") : ""}
              onChange={(e) => set("items", e.target.value.split("\n").map((s) => s.trim()).filter(Boolean))} />
          </Field>
          <Field label="Хэлбэр">
            <Select value={String(props.style ?? "bullet")} onChange={(e) => set("style", e.target.value)}>
              <option value="bullet">Цэгтэй (•)</option>
              <option value="numbered">Дугаартай</option>
              <option value="check">Тэмдэглэгээтэй (✓)</option>
              <option value="none">Хэлбэргүй</option>
            </Select>
          </Field>
        </div>
      )}

      {type === "FORM" && (
        <div className="space-y-3">
          <Field label="Гарчиг">
            <Input value={String(props.title ?? "")} onChange={(e) => set("title", e.target.value)} />
          </Field>
          <Field label="Илгээх товчны текст">
            <Input value={String(props.submitLabel ?? "Илгээх")} onChange={(e) => set("submitLabel", e.target.value)} />
          </Field>
        </div>
      )}

      {type === "VIDEO" && (
        <Field label="YouTube embed URL">
          <Input value={String(props.src ?? "")} onChange={(e) => set("src", e.target.value)} placeholder="https://www.youtube.com/embed/..." />
        </Field>
      )}

      {type === "MAP" && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <Field label="Өргөрөг (lat)">
              <Input type="number" value={String(props.lat ?? 47.9184676)} onChange={(e) => set("lat", parseFloat(e.target.value))} />
            </Field>
            <Field label="Уртраг (lng)">
              <Input type="number" value={String(props.lng ?? 106.9177016)} onChange={(e) => set("lng", parseFloat(e.target.value))} />
            </Field>
          </div>
        </div>
      )}

      {!["TEXT","IMAGE","BUTTON","LIST","FORM","VIDEO","MAP","DIVIDER","SPACER"].includes(type) && (
        <Field label="Props JSON">
          <Textarea rows={5} value={safeJsonStringify(props)}
            onChange={(e) => { const p = safeJsonParse<Record<string, unknown>>(e.target.value, props); setProps(p); }}
            className="font-mono text-xs" />
        </Field>
      )}
    </div>
  );
}

function toRendererPages(sections: SectionWithComponents[]): RendererPage[] {
  return [{
    id: 0, title: "Хуудас", path: "/", orderIndex: 0,
    sections: sections.map((s) => ({
      id: s.id, sectionKey: s.sectionKey, title: s.title ?? null, orderIndex: s.orderIndex,
      components: s.components.map((c) => ({
        id: c.id, componentType: c.componentType, propsJson: c.propsJson ?? null, orderIndex: c.orderIndex,
      })),
    })),
  }];
}

export default function ContentEditorPage() {
  const { projectId } = useParams();
  const landingId = Number(projectId);

  const [sections, setSections] = useState<SectionWithComponents[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setErr(null);
    try {
      const pages = await pageService.list(landingId);
      if (pages.length === 0) { setSections([]); return; }
      const firstPage = pages.slice().sort((a, b) => a.orderIndex - b.orderIndex)[0];
      const secs = await sectionService.list(firstPage.id);
      const sorted = secs.slice().sort((a, b) => a.orderIndex - b.orderIndex);
      const result: SectionWithComponents[] = [];
      for (const s of sorted) {
        const comps = await componentService.list(s.id);
        result.push({ ...s, components: comps.slice().sort((a, b) => a.orderIndex - b.orderIndex) });
      }
      setSections(result);
    } catch { setErr("Мэдээлэл ачаалахад алдаа гарлаа."); }
    finally { setLoading(false); }
  }, [landingId]);

  useEffect(() => { load(); }, [load]);

  const saveComponent = async (comp: ComponentResponse, propsJson: string) => {
    await componentService.update(comp.id, { componentType: comp.componentType, propsJson, orderIndex: comp.orderIndex });
    setSections((prev) =>
      prev.map((s) => ({ ...s, components: s.components.map((c) => c.id === comp.id ? { ...c, propsJson } : c) }))
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-60 text-sm text-slate-400">
        Ачаалж байна...
      </div>
    );
  }

  if (sections.length === 0) {
    return (
      <EmptyState
        title="Агуулга байхгүй байна"
        desc="Templates хэсгээс template сонгоход контент автоматаар үүснэ."
        action={
          <Link to={`/app/${landingId}/templates`}>
            <Button>Template сонгох →</Button>
          </Link>
        }
      />
    );
  }

  const previewPages = toRendererPages(sections);

  return (
    <div className="h-[calc(100vh-112px)] -mx-6 -my-8">
      <PanelGroup direction="horizontal">
        {/* Left: Editor */}
        <Panel defaultSize={40} minSize={30}>
          <div className="h-full overflow-y-auto border-r border-slate-200 bg-slate-50">
            <div className="p-6 space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-base font-bold text-slate-900">Контент засах</div>
                  <div className="text-xs text-slate-500 mt-0.5">Хадгалах дарахад preview автоматаар шинэчлэгдэнэ.</div>
                </div>
                <Button variant="ghost" size="sm" onClick={load}>↺</Button>
              </div>

              {err && (
                <div className="rounded-lg bg-rose-50 border border-rose-200 p-3 text-sm text-rose-700">{err}</div>
              )}

              {sections.map((section) => (
                <div key={section.id}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-px flex-1 bg-slate-200" />
                    <span className="text-xs font-semibold text-slate-400 shrink-0 uppercase tracking-wide">
                      {section.title || SECTION_LABELS[section.sectionKey] || section.sectionKey}
                    </span>
                    <div className="h-px flex-1 bg-slate-200" />
                  </div>
                  <div className="space-y-3">
                    {section.components.map((comp) => (
                      <ComponentEditor
                        key={comp.id}
                        component={comp}
                        onSave={(propsJson) => saveComponent(comp, propsJson)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Panel>

        {/* Resize handle */}
        <PanelResizeHandle className="w-1.5 bg-slate-200 hover:bg-blue-400 transition-colors cursor-col-resize" />

        {/* Right: Live preview */}
        <Panel defaultSize={60} minSize={35}>
          <div className="h-full overflow-y-auto bg-white">
            {/* Browser bar */}
            <div className="sticky top-0 z-10 border-b border-slate-200 bg-slate-50 px-4 py-2.5 flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-rose-400" />
                <div className="h-3 w-3 rounded-full bg-amber-400" />
                <div className="h-3 w-3 rounded-full bg-emerald-400" />
              </div>
              <div className="flex-1 rounded-md bg-white border border-slate-200 px-3 py-1 text-xs text-slate-400 text-center">
                Preview — бодит харагдах байдал
              </div>
            </div>
            {/* Render */}
            <LandingRenderer pages={previewPages} />
          </div>
        </Panel>
      </PanelGroup>
    </div>
  );
}
