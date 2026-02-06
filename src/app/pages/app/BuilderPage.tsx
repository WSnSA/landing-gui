import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, EmptyState, Field, Input, Modal, Select, Textarea } from "../../../components/ui";
import { pageService } from "../../../services/pageService";
import { sectionService } from "../../../services/sectionService";
import { componentService } from "../../../services/componentService";
import type { ComponentResponse, PageResponse, SectionResponse } from "../../../types/dto";
import { safeJsonParse, safeJsonStringify } from "../../../utils/format";

const DEFAULT_SECTION_KEYS = [
  "hero",
  "features",
  "about",
  "pricing",
  "faq",
  "contact",
];

const DEFAULT_COMPONENT_TYPES = [
  "TEXT",
  "IMAGE",
  "BUTTON",
  "LIST",
  "FORM",
  "GALLERY",
];

export default function BuilderPage() {
  const { projectId } = useParams();
  const landingId = Number(projectId);

  const [pages, setPages] = useState<PageResponse[]>([]);
  const [sections, setSections] = useState<SectionResponse[]>([]);
  const [components, setComponents] = useState<ComponentResponse[]>([]);

  const [selectedPageId, setSelectedPageId] = useState<number | null>(null);
  const [selectedSectionId, setSelectedSectionId] = useState<number | null>(null);
  const [selectedComponentId, setSelectedComponentId] = useState<number | null>(null);

  const [busy, setBusy] = useState(false);

  const selComponent = useMemo(() => components.find((c) => c.id === selectedComponentId) || null, [components, selectedComponentId]);

  const loadPages = async () => {
    const p = await pageService.list(landingId);
    const sorted = p.slice().sort((a, b) => a.orderIndex - b.orderIndex);
    setPages(sorted);
    if (!selectedPageId && sorted[0]) setSelectedPageId(sorted[0].id);
  };

  const loadSections = async (pageId: number) => {
    const s = await sectionService.list(pageId);
    const sorted = s.slice().sort((a, b) => a.orderIndex - b.orderIndex);
    setSections(sorted);
    setSelectedSectionId(sorted[0]?.id ?? null);
    setComponents([]);
    setSelectedComponentId(null);
  };

  const loadComponents = async (sectionId: number) => {
    const c = await componentService.list(sectionId);
    const sorted = c.slice().sort((a, b) => a.orderIndex - b.orderIndex);
    setComponents(sorted);
    setSelectedComponentId(sorted[0]?.id ?? null);
  };

  useEffect(() => { loadPages(); }, [landingId]);

  useEffect(() => {
    if (selectedPageId) loadSections(selectedPageId);
  }, [selectedPageId]);

  useEffect(() => {
    if (selectedSectionId) loadComponents(selectedSectionId);
  }, [selectedSectionId]);

  // Create Section modal
  const [secOpen, setSecOpen] = useState(false);
  const [sectionKey, setSectionKey] = useState(DEFAULT_SECTION_KEYS[0]);
  const [sectionTitle, setSectionTitle] = useState("");
  const [secErr, setSecErr] = useState<string | null>(null);

  const onCreateSection = async () => {
    if (!selectedPageId) return;
    setBusy(true);
    setSecErr(null);
    try {
      await sectionService.create(selectedPageId, {
        sectionKey,
        title: sectionTitle.trim() ? sectionTitle.trim() : null,
        orderIndex: sections.length,
      });
      setSecOpen(false);
      setSectionTitle("");
      await loadSections(selectedPageId);
    } catch (e: any) {
      setSecErr(typeof e?.payload === "string" ? e.payload : "Section үүсгэхэд алдаа гарлаа.");
    } finally {
      setBusy(false);
    }
  };

  // Create Component modal
  const [cmpOpen, setCmpOpen] = useState(false);
  const [componentType, setComponentType] = useState(DEFAULT_COMPONENT_TYPES[0]);
  const [propsJson, setPropsJson] = useState("{\n  \"text\": \"Hello\"\n}");
  const [cmpErr, setCmpErr] = useState<string | null>(null);

  const onCreateComponent = async () => {
    if (!selectedSectionId) return;
    setBusy(true);
    setCmpErr(null);
    try {
      await componentService.create(selectedSectionId, {
        componentType,
        propsJson,
        orderIndex: components.length,
      });
      setCmpOpen(false);
      await loadComponents(selectedSectionId);
    } catch (e: any) {
      setCmpErr(typeof e?.payload === "string" ? e.payload : "Component үүсгэхэд алдаа гарлаа.");
    } finally {
      setBusy(false);
    }
  };

  // Inspector state
  const [editType, setEditType] = useState("");
  const [editProps, setEditProps] = useState("");

  useEffect(() => {
    if (!selComponent) return;
    setEditType(selComponent.componentType);
    setEditProps(selComponent.propsJson ?? "{}");
  }, [selComponent?.id]);

  const onSaveComponent = async () => {
    if (!selComponent) return;
    setBusy(true);
    try {
      // validate json
      safeJsonParse(editProps, {});
      await componentService.update(selComponent.id, {
        componentType: editType,
        propsJson: editProps,
        orderIndex: selComponent.orderIndex,
      });
      await loadComponents(selComponent.sectionId);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="grid gap-4 lg:grid-cols-12">
      <Card className="p-4 lg:col-span-4">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold">Structure</div>
          <Button size="sm" variant="ghost" onClick={() => loadPages()} disabled={busy}>Refresh</Button>
        </div>

        <div className="mt-4 space-y-3">
          <Field label="Page">
            <Select
              value={selectedPageId ?? ""}
              onChange={(e) => setSelectedPageId(Number(e.target.value))}
            >
              {pages.map((p) => (
                <option key={p.id} value={p.id}>{p.title} ({p.path})</option>
              ))}
            </Select>
          </Field>

          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold">Sections</div>
            <Button size="sm" variant="secondary" onClick={() => setSecOpen(true)} disabled={!selectedPageId}>+ Add</Button>
          </div>

          {sections.length === 0 ? (
            <EmptyState title="Section байхгүй" desc="Section нэмээд компонент оруулна." />
          ) : (
            <div className="space-y-2">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedSectionId(s.id)}
                  className={`w-full text-left rounded-xl border px-3 py-2 text-sm transition ${
                    s.id === selectedSectionId ? "border-blue-500 bg-blue-50" : "border-slate-200 bg-white hover:bg-slate-50"
                  }`}
                >
                  <div className="font-medium">{s.title || s.sectionKey}</div>
                  <div className="text-xs text-slate-500">{s.sectionKey}</div>
                </button>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <div className="text-sm font-semibold">Components</div>
            <Button size="sm" variant="secondary" onClick={() => setCmpOpen(true)} disabled={!selectedSectionId}>+ Add</Button>
          </div>

          {components.length === 0 ? (
            <EmptyState title="Component байхгүй" desc="Component нэмээд props JSON-оо тохируулна." />
          ) : (
            <div className="space-y-2">
              {components.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedComponentId(c.id)}
                  className={`w-full text-left rounded-xl border px-3 py-2 text-sm transition ${
                    c.id === selectedComponentId ? "border-blue-500 bg-blue-50" : "border-slate-200 bg-white hover:bg-slate-50"
                  }`}
                >
                  <div className="font-medium">{c.componentType}</div>
                  <div className="text-xs text-slate-500">order: {c.orderIndex}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      </Card>

      <Card className="p-4 lg:col-span-8">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-sm font-semibold">Inspector</div>
            <div className="mt-1 text-xs text-slate-500">Component-ийн type болон propsJson-ийг засна.</div>
          </div>
          {selComponent ? (
            <div className="flex gap-2">
              <Button variant="danger" size="sm" disabled={busy} onClick={async () => {
                if (!confirm("Component устгах уу?")) return;
                await componentService.remove(selComponent.id);
                if (selectedSectionId) await loadComponents(selectedSectionId);
              }}>
                Delete
              </Button>
              <Button size="sm" onClick={onSaveComponent} loading={busy}>Save</Button>
            </div>
          ) : null}
        </div>

        {!selComponent ? (
          <div className="mt-6">
            <EmptyState title="Component сонгоогүй байна" desc="Зүүн талаас component сонго." />
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            <Field label="Component Type" hint="max 60 chars">
              <Input value={editType} onChange={(e) => setEditType(e.target.value)} />
            </Field>

            <Field label="Props JSON" hint="String хэлбэрээр хадгалагдана">
              <Textarea rows={14} value={editProps} onChange={(e) => setEditProps(e.target.value)} />
            </Field>

            <Card className="p-4 bg-slate-50 border-slate-200">
              <div className="text-xs font-semibold text-slate-700">Parsed preview (debug)</div>
              <pre className="mt-2 text-xs overflow-auto">{safeJsonStringify(safeJsonParse(editProps, {}))}</pre>
            </Card>
          </div>
        )}
      </Card>

      <Modal
        open={secOpen}
        title="Section нэмэх"
        onClose={() => setSecOpen(false)}
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setSecOpen(false)}>Болих</Button>
            <Button onClick={onCreateSection} loading={busy}>Нэмэх</Button>
          </div>
        }
      >
        <div className="space-y-4">
          <Field label="Section Key" hint="max 120 chars">
            <Select value={sectionKey} onChange={(e) => setSectionKey(e.target.value)}>
              {DEFAULT_SECTION_KEYS.map((k) => <option key={k} value={k}>{k}</option>)}
            </Select>
          </Field>
          <Field label="Title" hint="optional">
            <Input value={sectionTitle} onChange={(e) => setSectionTitle(e.target.value)} />
          </Field>
          {secErr ? <div className="rounded-lg bg-rose-50 border border-rose-200 p-3 text-sm text-rose-700">{secErr}</div> : null}
        </div>
      </Modal>

      <Modal
        open={cmpOpen}
        title="Component нэмэх"
        onClose={() => setCmpOpen(false)}
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setCmpOpen(false)}>Болих</Button>
            <Button onClick={onCreateComponent} loading={busy}>Нэмэх</Button>
          </div>
        }
      >
        <div className="space-y-4">
          <Field label="Component Type" hint="max 60 chars">
            <Select value={componentType} onChange={(e) => setComponentType(e.target.value)}>
              {DEFAULT_COMPONENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </Select>
          </Field>
          <Field label="Props JSON" hint="String хэлбэрээр хадгалагдана">
            <Textarea rows={10} value={propsJson} onChange={(e) => setPropsJson(e.target.value)} />
          </Field>
          {cmpErr ? <div className="rounded-lg bg-rose-50 border border-rose-200 p-3 text-sm text-rose-700">{cmpErr}</div> : null}
        </div>
      </Modal>
    </div>
  );
}
