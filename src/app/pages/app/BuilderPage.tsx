import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, EmptyState, Field, Input, Modal, Select, Textarea } from "../../components/ui";
import { pageService } from "../../services/pageService";
import { sectionService } from "../../services/sectionService";
import { componentService } from "../../services/componentService";
import type { ComponentResponse, PageResponse, SectionResponse } from "../../types/dto";
import { safeJsonParse, safeJsonStringify } from "../../utils/format";

// ── Section key сонголтууд ──────────────────────────────────────────────────
const SECTION_KEYS = [
  "hero",
  "features",
  "about",
  "pricing",
  "faq",
  "contact",
  "gallery",
  "team",
  "testimonials",
  "cta",
];

// ── Component type сонголтууд ───────────────────────────────────────────────
const COMPONENT_TYPES = [
  "TEXT",
  "IMAGE",
  "BUTTON",
  "LIST",
  "FORM",
  "GALLERY",
  "VIDEO",
  "MAP",
  "DIVIDER",
  "SPACER",
];

// ── Component type-д тохирсон default props ─────────────────────────────────
const DEFAULT_PROPS: Record<string, object> = {
  TEXT: {
    text: "Энд текстээ бичнэ үү",
    fontSize: "16px",
    fontWeight: "normal",
    color: "#111827",
    align: "left",
  },
  IMAGE: {
    src: "https://placehold.co/800x400",
    alt: "Зураг",
    width: "100%",
    borderRadius: "8px",
  },
  BUTTON: {
    label: "Товч",
    href: "#",
    variant: "primary",
    size: "md",
    fullWidth: false,
  },
  LIST: {
    items: ["Эхний мөр", "Хоёрдугаар мөр", "Гуравдугаар мөр"],
    style: "bullet",
  },
  FORM: {
    title: "Холбоо барих",
    fields: [
      { name: "name", label: "Нэр", type: "text", required: true },
      { name: "email", label: "И-мэйл", type: "email", required: true },
      { name: "message", label: "Мессеж", type: "textarea", required: false },
    ],
    submitLabel: "Илгээх",
  },
  GALLERY: {
    images: [
      { src: "https://placehold.co/400x300", alt: "Зураг 1" },
      { src: "https://placehold.co/400x300", alt: "Зураг 2" },
      { src: "https://placehold.co/400x300", alt: "Зураг 3" },
    ],
    columns: 3,
  },
  VIDEO: {
    src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    title: "Видео",
    aspectRatio: "16/9",
  },
  MAP: {
    lat: 47.9184676,
    lng: 106.9177016,
    zoom: 14,
    label: "Байршил",
  },
  DIVIDER: {
    color: "#e5e7eb",
    thickness: "1px",
    margin: "24px 0",
  },
  SPACER: {
    height: "40px",
  },
};

// ── Component-д тохирсон visual form ────────────────────────────────────────
function ComponentVisualForm({
  type,
  props,
  onChange,
}: {
  type: string;
  props: Record<string, unknown>;
  onChange: (updated: Record<string, unknown>) => void;
}) {
  const set = (key: string, value: unknown) => onChange({ ...props, [key]: value });

  switch (type) {
    case "TEXT":
      return (
        <div className="space-y-3">
          <Field label="Текст">
            <Textarea
              rows={4}
              value={String(props.text ?? "")}
              onChange={(e) => set("text", e.target.value)}
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Фонт хэмжээ">
              <Input
                value={String(props.fontSize ?? "16px")}
                onChange={(e) => set("fontSize", e.target.value)}
              />
            </Field>
            <Field label="Зэрэгцээ">
              <Select
                value={String(props.align ?? "left")}
                onChange={(e) => set("align", e.target.value)}
              >
                <option value="left">Зүүн</option>
                <option value="center">Голлуулах</option>
                <option value="right">Баруун</option>
              </Select>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Өнгө">
              <div className="flex gap-2 items-center">
                <input
                  type="color"
                  value={String(props.color ?? "#111827")}
                  onChange={(e) => set("color", e.target.value)}
                  className="w-10 h-9 rounded border border-slate-200 cursor-pointer p-0.5"
                />
                <Input
                  value={String(props.color ?? "#111827")}
                  onChange={(e) => set("color", e.target.value)}
                />
              </div>
            </Field>
            <Field label="Жин">
              <Select
                value={String(props.fontWeight ?? "normal")}
                onChange={(e) => set("fontWeight", e.target.value)}
              >
                <option value="normal">Энгийн</option>
                <option value="500">Дунд</option>
                <option value="bold">Тод</option>
              </Select>
            </Field>
          </div>
        </div>
      );

    case "IMAGE":
      return (
        <div className="space-y-3">
          <Field label="Зургийн URL">
            <Input
              value={String(props.src ?? "")}
              onChange={(e) => set("src", e.target.value)}
            />
          </Field>
          {props.src && (
            <div className="rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
              <img
                src={String(props.src)}
                alt={String(props.alt ?? "")}
                className="w-full object-cover max-h-40"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://placehold.co/800x400";
                }}
              />
            </div>
          )}
          <Field label="Alt текст">
            <Input
              value={String(props.alt ?? "")}
              onChange={(e) => set("alt", e.target.value)}
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Өргөн">
              <Input
                value={String(props.width ?? "100%")}
                onChange={(e) => set("width", e.target.value)}
              />
            </Field>
            <Field label="Булан радиус">
              <Input
                value={String(props.borderRadius ?? "8px")}
                onChange={(e) => set("borderRadius", e.target.value)}
              />
            </Field>
          </div>
        </div>
      );

    case "BUTTON":
      return (
        <div className="space-y-3">
          <Field label="Товчны текст">
            <Input
              value={String(props.label ?? "")}
              onChange={(e) => set("label", e.target.value)}
            />
          </Field>
          <Field label="Холбоос (href)">
            <Input
              value={String(props.href ?? "#")}
              onChange={(e) => set("href", e.target.value)}
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Хэлбэр">
              <Select
                value={String(props.variant ?? "primary")}
                onChange={(e) => set("variant", e.target.value)}
              >
                <option value="primary">Үндсэн</option>
                <option value="secondary">Хоёрдогч</option>
                <option value="outline">Хүрээтэй</option>
                <option value="ghost">Тунгалаг</option>
              </Select>
            </Field>
            <Field label="Хэмжээ">
              <Select
                value={String(props.size ?? "md")}
                onChange={(e) => set("size", e.target.value)}
              >
                <option value="sm">Жижиг</option>
                <option value="md">Дунд</option>
                <option value="lg">Том</option>
              </Select>
            </Field>
          </div>
          {/* Preview */}
          <div className="mt-2 p-4 rounded-lg bg-slate-50 border border-slate-200 flex justify-center">
            <button
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                props.variant === "primary"
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : props.variant === "outline"
                  ? "border border-blue-600 text-blue-600 hover:bg-blue-50"
                  : props.variant === "ghost"
                  ? "text-blue-600 hover:bg-blue-50"
                  : "bg-slate-200 text-slate-800 hover:bg-slate-300"
              } ${props.size === "lg" ? "text-base px-6 py-3" : props.size === "sm" ? "text-xs px-3 py-1.5" : ""}`}
            >
              {String(props.label ?? "Товч")}
            </button>
          </div>
        </div>
      );

    case "LIST":
      return (
        <div className="space-y-3">
          <Field label="Жагсаалтын мөрүүд (мөр бүр = нэг item)">
            <Textarea
              rows={6}
              value={Array.isArray(props.items) ? (props.items as string[]).join("\n") : ""}
              onChange={(e) =>
                set(
                  "items",
                  e.target.value
                    .split("\n")
                    .map((s) => s.trim())
                    .filter(Boolean)
                )
              }
            />
          </Field>
          <Field label="Хэлбэр">
            <Select
              value={String(props.style ?? "bullet")}
              onChange={(e) => set("style", e.target.value)}
            >
              <option value="bullet">Цэгтэй (•)</option>
              <option value="numbered">Дугаартай (1.)</option>
              <option value="check">Тэмдэглэгээтэй (✓)</option>
              <option value="none">Хэлбэргүй</option>
            </Select>
          </Field>
        </div>
      );

    case "DIVIDER":
      return (
        <div className="space-y-3">
          <Field label="Өнгө">
            <div className="flex gap-2 items-center">
              <input
                type="color"
                value={String(props.color ?? "#e5e7eb")}
                onChange={(e) => set("color", e.target.value)}
                className="w-10 h-9 rounded border border-slate-200 cursor-pointer p-0.5"
              />
              <Input
                value={String(props.color ?? "#e5e7eb")}
                onChange={(e) => set("color", e.target.value)}
              />
            </div>
          </Field>
          <Field label="Зузаан">
            <Input
              value={String(props.thickness ?? "1px")}
              onChange={(e) => set("thickness", e.target.value)}
            />
          </Field>
        </div>
      );

    case "SPACER":
      return (
        <Field label="Өндөр">
          <Input
            value={String(props.height ?? "40px")}
            onChange={(e) => set("height", e.target.value)}
          />
        </Field>
      );

    default:
      // Бусад type-д JSON editor харуулна
      return null;
  }
}

// ── Component preview ────────────────────────────────────────────────────────
function ComponentPreview({ type, props }: { type: string; props: Record<string, unknown> }) {
  switch (type) {
    case "TEXT":
      return (
        <div
          style={{
            fontSize: String(props.fontSize ?? "16px"),
            fontWeight: String(props.fontWeight ?? "normal"),
            color: String(props.color ?? "#111827"),
            textAlign: (props.align as "left" | "center" | "right") ?? "left",
            lineHeight: 1.6,
          }}
        >
          {String(props.text ?? "")}
        </div>
      );
    case "IMAGE":
      return (
        <img
          src={String(props.src ?? "https://placehold.co/800x400")}
          alt={String(props.alt ?? "")}
          style={{
            width: String(props.width ?? "100%"),
            borderRadius: String(props.borderRadius ?? "8px"),
            maxHeight: "200px",
            objectFit: "cover",
          }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://placehold.co/800x400";
          }}
        />
      );
    case "BUTTON":
      return (
        <button
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            props.variant === "primary"
              ? "bg-blue-600 text-white"
              : props.variant === "outline"
              ? "border border-blue-600 text-blue-600"
              : props.variant === "ghost"
              ? "text-blue-600"
              : "bg-slate-200 text-slate-800"
          } ${props.size === "lg" ? "text-base px-6 py-3" : props.size === "sm" ? "text-xs px-3 py-1.5" : ""}`}
        >
          {String(props.label ?? "Товч")}
        </button>
      );
    case "LIST": {
      const items = Array.isArray(props.items) ? (props.items as string[]) : [];
      const listStyle = String(props.style ?? "bullet");
      return (
        <ul className="space-y-1 text-sm text-slate-700">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">
                {listStyle === "numbered"
                  ? `${i + 1}.`
                  : listStyle === "check"
                  ? "✓"
                  : listStyle === "none"
                  ? ""
                  : "•"}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    }
    case "DIVIDER":
      return (
        <hr
          style={{
            borderColor: String(props.color ?? "#e5e7eb"),
            borderTopWidth: String(props.thickness ?? "1px"),
            margin: String(props.margin ?? "8px 0"),
          }}
        />
      );
    case "SPACER":
      return (
        <div
          className="flex items-center justify-center text-xs text-slate-400 border border-dashed border-slate-200 rounded"
          style={{ height: String(props.height ?? "40px") }}
        >
          Зай: {String(props.height ?? "40px")}
        </div>
      );
    default:
      return (
        <div className="text-xs text-slate-500 bg-slate-50 rounded p-3 font-mono">
          {type}: {safeJsonStringify(props)}
        </div>
      );
  }
}

// ── Үндсэн BuilderPage ───────────────────────────────────────────────────────
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
  const [useJsonEditor, setUseJsonEditor] = useState(false);

  const selComponent = useMemo(
    () => components.find((c) => c.id === selectedComponentId) ?? null,
    [components, selectedComponentId]
  );

  // ── Load functions ──────────────────────────────────────────────────────────
  const loadPages = async () => {
    const p = await pageService.list(landingId);
    const sorted = p.slice().sort((a, b) => a.orderIndex - b.orderIndex);
    setPages(sorted);
    if (!selectedPageId && sorted[0]) setSelectedPageId(sorted[0].id);
  };

  const loadSections = async (pageId: number, preserveSectionId?: number | null) => {
    const s = await sectionService.list(pageId);
    const sorted = s.slice().sort((a, b) => a.orderIndex - b.orderIndex);
    setSections(sorted);
    setSelectedSectionId(preserveSectionId ?? sorted[0]?.id ?? null);
    setComponents([]);
    setSelectedComponentId(null);
  };

  const loadComponents = async (sectionId: number, preserveComponentId?: number | null) => {
    const c = await componentService.list(sectionId);
    const sorted = c.slice().sort((a, b) => a.orderIndex - b.orderIndex);
    setComponents(sorted);
    setSelectedComponentId(preserveComponentId ?? sorted[0]?.id ?? null);
  };

  useEffect(() => { loadPages(); }, [landingId]);
  useEffect(() => { if (selectedPageId) loadSections(selectedPageId); }, [selectedPageId]);
  useEffect(() => { if (selectedSectionId) loadComponents(selectedSectionId); }, [selectedSectionId]);

  // ── Reorder ─────────────────────────────────────────────────────────────────
  const reorderSections = async (next: SectionResponse[]) => {
    if (!selectedPageId) return;
    const keep = selectedSectionId;
    setBusy(true);
    try {
      await sectionService.reorder(selectedPageId, next.map((x) => x.id));
      await loadSections(selectedPageId, keep);
    } finally { setBusy(false); }
  };

  const reorderComponents = async (next: ComponentResponse[]) => {
    if (!selectedSectionId) return;
    const keep = selectedComponentId;
    setBusy(true);
    try {
      await componentService.reorder(selectedSectionId, next.map((x) => x.id));
      await loadComponents(selectedSectionId, keep);
    } finally { setBusy(false); }
  };

  // ── Section Modal ───────────────────────────────────────────────────────────
  const [secOpen, setSecOpen] = useState(false);
  const [sectionKey, setSectionKey] = useState(SECTION_KEYS[0]);
  const [sectionTitle, setSectionTitle] = useState("");
  const [secErr, setSecErr] = useState<string | null>(null);

  const onCreateSection = async () => {
    if (!selectedPageId) return;
    setBusy(true);
    setSecErr(null);
    try {
      await sectionService.create(selectedPageId, {
        sectionKey,
        title: sectionTitle.trim() || null,
        orderIndex: sections.length,
      });
      setSecOpen(false);
      setSectionTitle("");
      await loadSections(selectedPageId);
    } catch (e: unknown) {
      const err = e as { payload?: string };
      setSecErr(typeof err?.payload === "string" ? err.payload : "Section үүсгэхэд алдаа гарлаа.");
    } finally { setBusy(false); }
  };

  // ── Component Modal ─────────────────────────────────────────────────────────
  const [cmpOpen, setCmpOpen] = useState(false);
  const [newCmpType, setNewCmpType] = useState(COMPONENT_TYPES[0]);
  const [cmpErr, setCmpErr] = useState<string | null>(null);

  const onCreateComponent = async () => {
    if (!selectedSectionId) return;
    setBusy(true);
    setCmpErr(null);
    try {
      const defaultProps = DEFAULT_PROPS[newCmpType] ?? {};
      await componentService.create(selectedSectionId, {
        componentType: newCmpType,
        propsJson: JSON.stringify(defaultProps, null, 2),
        orderIndex: components.length,
      });
      setCmpOpen(false);
      await loadComponents(selectedSectionId);
    } catch (e: unknown) {
      const err = e as { payload?: string };
      setCmpErr(typeof err?.payload === "string" ? err.payload : "Component үүсгэхэд алдаа гарлаа.");
    } finally { setBusy(false); }
  };

  // ── Inspector state ─────────────────────────────────────────────────────────
  const [editType, setEditType] = useState("");
  const [editProps, setEditProps] = useState("{}");
  const [editPropsObj, setEditPropsObj] = useState<Record<string, unknown>>({});

  useEffect(() => {
    if (!selComponent) return;
    setEditType(selComponent.componentType);
    const raw = selComponent.propsJson ?? "{}";
    setEditProps(raw);
    setEditPropsObj(safeJsonParse(raw, {}));
  }, [selComponent?.id]);

  const handleVisualChange = (updated: Record<string, unknown>) => {
    setEditPropsObj(updated);
    setEditProps(JSON.stringify(updated, null, 2));
  };

  const handleJsonChange = (raw: string) => {
    setEditProps(raw);
    const parsed = safeJsonParse<Record<string, unknown>>(raw, {});
    setEditPropsObj(parsed);
  };

  const onSaveComponent = async () => {
    if (!selComponent) return;
    setBusy(true);
    try {
      await componentService.update(selComponent.id, {
        componentType: editType,
        propsJson: editProps,
        orderIndex: selComponent.orderIndex,
      });
      await loadComponents(selComponent.sectionId);
    } finally { setBusy(false); }
  };

  const hasVisualForm = ["TEXT", "IMAGE", "BUTTON", "LIST", "DIVIDER", "SPACER"].includes(editType);

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="grid gap-4 lg:grid-cols-12">

      {/* ── Зүүн тал: Structure panel ── */}
      <Card className="p-4 lg:col-span-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold">Бүтэц</div>
          <Button size="sm" variant="ghost" onClick={loadPages} disabled={busy}>
            Refresh
          </Button>
        </div>

        {/* Page сонголт */}
        <Field label="Хуудас">
          <Select
            value={selectedPageId ?? ""}
            onChange={(e) => setSelectedPageId(Number(e.target.value))}
          >
            {pages.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title} ({p.path})
              </option>
            ))}
          </Select>
        </Field>

        {/* Sections */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-semibold text-slate-700">Хэсгүүд</div>
            <Button size="sm" variant="secondary" onClick={() => setSecOpen(true)} disabled={!selectedPageId}>
              + Нэмэх
            </Button>
          </div>
          {sections.length === 0 ? (
            <EmptyState title="Хэсэг байхгүй" desc="Хэсэг нэмээд компонент оруулна." />
          ) : (
            <div className="space-y-1.5">
              {sections.map((s, idx) => (
                <div
                  key={s.id}
                  className={`rounded-xl border text-sm transition-colors ${
                    s.id === selectedSectionId
                      ? "border-blue-500 bg-blue-50"
                      : "border-slate-200 bg-white hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center">
                    <button
                      onClick={() => setSelectedSectionId(s.id)}
                      className="flex-1 text-left px-3 py-2"
                    >
                      <div className="font-medium truncate">{s.title || s.sectionKey}</div>
                      <div className="text-xs text-slate-400">{s.sectionKey}</div>
                    </button>
                    <div className="flex items-center gap-1 pr-2">
                      <Button
                        size="sm" variant="secondary"
                        disabled={busy || idx === 0}
                        onClick={async () => {
                          const next = sections.slice();
                          [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
                          await reorderSections(next);
                        }}
                      >↑</Button>
                      <Button
                        size="sm" variant="secondary"
                        disabled={busy || idx === sections.length - 1}
                        onClick={async () => {
                          const next = sections.slice();
                          [next[idx + 1], next[idx]] = [next[idx], next[idx + 1]];
                          await reorderSections(next);
                        }}
                      >↓</Button>
                      <Button
                        size="sm" variant="danger"
                        disabled={busy}
                        onClick={async () => {
                          if (!confirm("Хэсгийг устгах уу?")) return;
                          setBusy(true);
                          try {
                            await sectionService.remove(s.id);
                            await loadSections(selectedPageId!);
                          } finally { setBusy(false); }
                        }}
                      >✕</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Components */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-semibold text-slate-700">Компонентууд</div>
            <Button size="sm" variant="secondary" onClick={() => setCmpOpen(true)} disabled={!selectedSectionId}>
              + Нэмэх
            </Button>
          </div>
          {components.length === 0 ? (
            <EmptyState title="Компонент байхгүй" desc="Компонент нэмээд props тохируулна." />
          ) : (
            <div className="space-y-1.5">
              {components.map((c, idx) => (
                <div
                  key={c.id}
                  className={`rounded-xl border text-sm transition-colors ${
                    c.id === selectedComponentId
                      ? "border-blue-500 bg-blue-50"
                      : "border-slate-200 bg-white hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center">
                    <button
                      onClick={() => setSelectedComponentId(c.id)}
                      className="flex-1 text-left px-3 py-2"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                          {c.componentType}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">#{c.orderIndex + 1}</div>
                    </button>
                    <div className="flex items-center gap-1 pr-2">
                      <Button
                        size="sm" variant="secondary"
                        disabled={busy || idx === 0}
                        onClick={async () => {
                          const next = components.slice();
                          [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
                          await reorderComponents(next);
                        }}
                      >↑</Button>
                      <Button
                        size="sm" variant="secondary"
                        disabled={busy || idx === components.length - 1}
                        onClick={async () => {
                          const next = components.slice();
                          [next[idx + 1], next[idx]] = [next[idx], next[idx + 1]];
                          await reorderComponents(next);
                        }}
                      >↓</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>

      {/* ── Баруун тал: Inspector + Preview ── */}
      <div className="lg:col-span-8 space-y-4">

        {/* Inspector */}
        <Card className="p-4">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div>
              <div className="text-sm font-semibold">Inspector</div>
              <div className="mt-0.5 text-xs text-slate-400">
                Компонентийн утгуудыг засна.
              </div>
            </div>
            {selComponent && (
              <div className="flex gap-2">
                {hasVisualForm && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setUseJsonEditor(!useJsonEditor)}
                  >
                    {useJsonEditor ? "Visual" : "JSON"}
                  </Button>
                )}
                <Button
                  variant="danger"
                  size="sm"
                  disabled={busy}
                  onClick={async () => {
                    if (!confirm("Компонент устгах уу?")) return;
                    await componentService.remove(selComponent.id);
                    if (selectedSectionId) await loadComponents(selectedSectionId);
                  }}
                >
                  Устгах
                </Button>
                <Button size="sm" onClick={onSaveComponent} disabled={busy}>
                  Хадгалах
                </Button>
              </div>
            )}
          </div>

          {!selComponent ? (
            <EmptyState
              title="Компонент сонгоогүй байна"
              desc="Зүүн талаас компонент сонго."
            />
          ) : (
            <div className="space-y-4">
              {/* Component type */}
              <Field label="Компонент төрөл">
                <Select
                  value={editType}
                  onChange={(e) => {
                    const t = e.target.value;
                    setEditType(t);
                    const def = DEFAULT_PROPS[t] ?? {};
                    setEditPropsObj(def);
                    setEditProps(JSON.stringify(def, null, 2));
                  }}
                >
                  {COMPONENT_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </Select>
              </Field>

              {/* Visual form эсвэл JSON editor */}
              {hasVisualForm && !useJsonEditor ? (
                <ComponentVisualForm
                  type={editType}
                  props={editPropsObj}
                  onChange={handleVisualChange}
                />
              ) : (
                <Field label="Props JSON" hint="JSON форматаар шууд засах">
                  <Textarea
                    rows={12}
                    value={editProps}
                    onChange={(e) => handleJsonChange(e.target.value)}
                    className="font-mono text-xs"
                  />
                </Field>
              )}
            </div>
          )}
        </Card>

        {/* Live Preview */}
        {selComponent && (
          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-semibold">Урьдчилж харах</div>
              <span className="text-xs font-mono bg-slate-100 text-slate-500 px-2 py-0.5 rounded">
                {editType}
              </span>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-4 min-h-16">
              <ComponentPreview type={editType} props={editPropsObj} />
            </div>
          </Card>
        )}
      </div>

      {/* ── Section үүсгэх Modal ── */}
      <Modal
        open={secOpen}
        title="Шинэ хэсэг нэмэх"
        onClose={() => setSecOpen(false)}
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setSecOpen(false)}>Болих</Button>
            <Button onClick={onCreateSection} disabled={busy}>Нэмэх</Button>
          </div>
        }
      >
        <div className="space-y-4">
          <Field label="Хэсгийн төрөл">
            <Select value={sectionKey} onChange={(e) => setSectionKey(e.target.value)}>
              {SECTION_KEYS.map((k) => (
                <option key={k} value={k}>{k}</option>
              ))}
            </Select>
          </Field>
          <Field label="Гарчиг" hint="Заавал биш">
            <Input value={sectionTitle} onChange={(e) => setSectionTitle(e.target.value)} />
          </Field>
          {secErr && (
            <div className="rounded-lg bg-rose-50 border border-rose-200 p-3 text-sm text-rose-700">
              {secErr}
            </div>
          )}
        </div>
      </Modal>

      {/* ── Component үүсгэх Modal ── */}
      <Modal
        open={cmpOpen}
        title="Шинэ компонент нэмэх"
        onClose={() => setCmpOpen(false)}
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setCmpOpen(false)}>Болих</Button>
            <Button onClick={onCreateComponent} disabled={busy}>Нэмэх</Button>
          </div>
        }
      >
        <div className="space-y-4">
          <Field label="Компонент төрөл">
            <Select value={newCmpType} onChange={(e) => setNewCmpType(e.target.value)}>
              {COMPONENT_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </Select>
          </Field>
          {/* Default props preview */}
          <div className="rounded-lg bg-slate-50 border border-slate-200 p-3">
            <div className="text-xs font-semibold text-slate-500 mb-2">
              Default props:
            </div>
            <pre className="text-xs text-slate-600 overflow-auto max-h-32">
              {safeJsonStringify(DEFAULT_PROPS[newCmpType] ?? {})}
            </pre>
          </div>
          {cmpErr && (
            <div className="rounded-lg bg-rose-50 border border-rose-200 p-3 text-sm text-rose-700">
              {cmpErr}
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
