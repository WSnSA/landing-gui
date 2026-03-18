import { useEffect, useState } from "react";
import { Button, Card, EmptyState, Field, Input, Modal, Select, Textarea } from "../../components/ui";
import { adminTemplateService } from "../../services/templateService";
import type { TemplateRequest, TemplateResponse } from "../../types/dto";
import { TEMPLATE_PRESETS } from "../../data/templatePresets";

const TEMPLATE_TYPES = [
  { value: "business", label: "Бизнес" },
  { value: "course", label: "Сургалт" },
  { value: "personal", label: "Хувийн" },
  { value: "product", label: "Бүтээгдэхүүн" },
  { value: "event", label: "Арга хэмжээ" },
  { value: "restaurant", label: "Ресторан" },
  { value: "portfolio", label: "Портфолио" },
  { value: "digital_brochure", label: "Дижитал брошур" },
];

const EMPTY_SCHEMA = JSON.stringify({
  pages: [
    {
      title: "Нүүр хуудас",
      path: "/",
      orderIndex: 0,
      sections: [
        {
          sectionKey: "hero",
          title: "Үндсэн хэсэг",
          orderIndex: 0,
          components: [
            {
              componentType: "TEXT",
              orderIndex: 0,
              propsJson: {
                text: "Таны компанийн нэр",
                fontSize: "48px",
                fontWeight: "bold",
                color: "#111827",
                align: "center",
              },
            },
            {
              componentType: "TEXT",
              orderIndex: 1,
              propsJson: {
                text: "Компанийн үйл ажиллагааны товч тайлбар энд бичигдэнэ. Хэрэглэгчид юу хийдгийг тань ойлгох боломжтой болно.",
                fontSize: "18px",
                fontWeight: "normal",
                color: "#6b7280",
                align: "center",
              },
            },
            {
              componentType: "BUTTON",
              orderIndex: 2,
              propsJson: {
                label: "Холбоо барих",
                href: "#contact",
                variant: "primary",
                size: "lg",
                fullWidth: false,
              },
            },
          ],
        },
        {
          sectionKey: "features",
          title: "Давуу талууд",
          orderIndex: 1,
          components: [
            {
              componentType: "TEXT",
              orderIndex: 0,
              propsJson: {
                text: "Бидний давуу талууд",
                fontSize: "32px",
                fontWeight: "bold",
                color: "#111827",
                align: "center",
              },
            },
            {
              componentType: "LIST",
              orderIndex: 1,
              propsJson: {
                items: [
                  "Мэргэжлийн баг",
                  "Хурдан хүргэлт",
                  "Чанарын баталгаа",
                  "Хэрэглэгчийн дэмжлэг",
                ],
                style: "check",
              },
            },
          ],
        },
        {
          sectionKey: "contact",
          title: "Холбоо барих",
          orderIndex: 2,
          components: [
            {
              componentType: "TEXT",
              orderIndex: 0,
              propsJson: {
                text: "Холбоо барих",
                fontSize: "32px",
                fontWeight: "bold",
                color: "#111827",
                align: "center",
              },
            },
            {
              componentType: "FORM",
              orderIndex: 1,
              propsJson: {
                title: "Бидэнтэй холбоо бариарай",
                fields: [
                  { name: "name", label: "Таны нэр", type: "text", required: true },
                  { name: "email", label: "И-мэйл хаяг", type: "email", required: true },
                  { name: "phone", label: "Утасны дугаар", type: "text", required: false },
                  { name: "message", label: "Мессеж", type: "textarea", required: false },
                ],
                submitLabel: "Илгээх",
              },
            },
          ],
        },
      ],
    },
  ],
}, null, 2);

function emptyForm(): TemplateRequest {
  return {
    name: "",
    type: "business",
    description: "",
    previewImageUrl: "",
    schemaJson: EMPTY_SCHEMA,
  };
}

export default function AdminTemplatesPage() {
  const [templates, setTemplates] = useState<TemplateResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [importing, setImporting] = useState<string | null>(null);

  // Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<TemplateRequest>(emptyForm());
  const [saving, setSaving] = useState(false);
  const [formErr, setFormErr] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setErr(null);
    try {
      setTemplates(await adminTemplateService.list());
    } catch {
      setErr("Template жагсаалт ачаалахад алдаа гарлаа.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const importPreset = async (key: string, preset: TemplateRequest) => {
    setImporting(key);
    try {
      await adminTemplateService.create(preset);
      await load();
    } catch (e: unknown) {
      const err = e as { payload?: string; message?: string };
      setErr(err?.payload ?? err?.message ?? "Импортлоход алдаа гарлаа.");
    } finally {
      setImporting(null);
    }
  };

  const openCreate = () => {
    setEditId(null);
    setForm(emptyForm());
    setFormErr(null);
    setModalOpen(true);
  };

  const openEdit = (t: TemplateResponse) => {
    setEditId(t.id);
    setForm({
      name: t.name,
      type: t.type,
      description: t.description,
      previewImageUrl: t.previewImageUrl ?? "",
      schemaJson: t.schemaJson ?? EMPTY_SCHEMA,
    });
    setFormErr(null);
    setModalOpen(true);
  };

  const save = async () => {
    if (!form.name.trim()) { setFormErr("Нэр оруулна уу."); return; }
    if (!form.description.trim()) { setFormErr("Тайлбар оруулна уу."); return; }

    // schemaJson validate
    try {
      if (form.schemaJson) JSON.parse(form.schemaJson);
    } catch {
      setFormErr("Schema JSON формат буруу байна.");
      return;
    }

    setSaving(true);
    setFormErr(null);
    try {
      if (editId) {
        await adminTemplateService.update(editId, form);
      } else {
        await adminTemplateService.create(form);
      }
      setModalOpen(false);
      await load();
    } catch (e: unknown) {
      const err = e as { payload?: string; message?: string };
      setFormErr(err?.payload ?? err?.message ?? "Хадгалахад алдаа гарлаа.");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (t: TemplateResponse) => {
    if (!confirm(`"${t.name}" template-г устгах уу?`)) return;
    try {
      await adminTemplateService.remove(t.id);
      await load();
    } catch {
      setErr("Устгахад алдаа гарлаа.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-xl font-semibold text-slate-900">Admin · Templates</div>
          <div className="text-sm text-slate-600">
            Template үүсгэх, засах, устгах. Хэрэглэгчид template сонгоход бүтэц автоматаар үүснэ.
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button variant="secondary" onClick={load} loading={loading}>Refresh</Button>
          <Button onClick={openCreate}>+ Шинэ Template</Button>
        </div>
      </div>

      {err && (
        <Card className="p-4 border-rose-200 bg-rose-50">
          <div className="text-sm text-rose-700">{err}</div>
        </Card>
      )}

      {/* Built-in presets */}
      <div>
        <div className="text-sm font-semibold text-slate-700 mb-3">Системд бэлтгэгдсэн template-үүд</div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(TEMPLATE_PRESETS).map(([key, preset]) => {
            const alreadyAdded = templates.some((t) => t.name === preset.name);
            return (
              <div key={key} className={`rounded-xl border p-4 flex items-start justify-between gap-4 ${alreadyAdded ? "border-green-200 bg-green-50" : "border-slate-200 bg-white"}`}>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-slate-900 text-sm truncate">{preset.name}</div>
                  <div className="text-xs text-slate-500 mt-0.5 line-clamp-2">{preset.description}</div>
                </div>
                {alreadyAdded ? (
                  <span className="shrink-0 text-xs font-semibold text-green-600 bg-green-100 px-2.5 py-1 rounded-full">
                    ✓ Нэмэгдсэн
                  </span>
                ) : (
                  <Button
                    size="sm"
                    loading={importing === key}
                    onClick={() => importPreset(key, preset)}
                    className="shrink-0"
                  >
                    + Нэмэх
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="h-px bg-slate-200" />

      {templates.length === 0 && !loading ? (
        <EmptyState
          title="Template байхгүй байна"
          desc="Дээрх товчоор шинэ template нэмнэ үү."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((t) => (
            <Card key={t.id} className="overflow-hidden flex flex-col">
              {t.previewImageUrl ? (
                <div className="h-36 bg-slate-100 overflow-hidden">
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
                <div className="h-36 bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center">
                  <span className="text-3xl text-slate-300">
                    {t.type === "business" ? "🏢"
                      : t.type === "restaurant" ? "🍽️"
                      : t.type === "portfolio" ? "🎨"
                      : t.type === "event" ? "📅"
                      : t.type === "course" ? "📚"
                      : t.type === "product" ? "📦"
                      : "📄"}
                  </span>
                </div>
              )}

              <div className="p-4 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="font-semibold text-slate-900 text-sm">{t.name}</div>
                  <span className="shrink-0 text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                    {t.type}
                  </span>
                </div>
                <div className="mt-1 text-sm text-slate-600 flex-1 line-clamp-2">{t.description}</div>
                <div className="mt-3 text-xs text-slate-400">ID: {t.id}</div>

                <div className="mt-3 flex gap-2">
                  <Button size="sm" variant="secondary" className="flex-1" onClick={() => openEdit(t)}>
                    Засах
                  </Button>
                  <Button size="sm" variant="danger" onClick={() => remove(t)}>
                    Устгах
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Create / Edit Modal */}
      <Modal
        open={modalOpen}
        title={editId ? "Template засах" : "Шинэ Template"}
        onClose={() => !saving && setModalOpen(false)}
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setModalOpen(false)} disabled={saving}>
              Болих
            </Button>
            <Button onClick={save} loading={saving}>
              {editId ? "Хадгалах" : "Үүсгэх"}
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Нэр" hint="Хэрэглэгчдэд харагдах нэр">
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Бизнес Template"
              />
            </Field>
            <Field label="Төрөл">
              <Select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              >
                {TEMPLATE_TYPES.map((tp) => (
                  <option key={tp.value} value={tp.value}>{tp.label}</option>
                ))}
              </Select>
            </Field>
          </div>

          <Field label="Тайлбар" hint="Хэрэглэгчид юу ойлгох вэ">
            <Textarea
              rows={2}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Компанийн танилцуулга, үйлчилгээ, холбоо барих хэсэгтэй template."
            />
          </Field>

          <Field label="Preview зургийн URL" hint="Заавал биш — thumbnail зураг">
            <Input
              value={form.previewImageUrl ?? ""}
              onChange={(e) => setForm({ ...form, previewImageUrl: e.target.value })}
              placeholder="https://example.com/preview.jpg"
            />
          </Field>

          <Field
            label="Schema JSON"
            hint="Pages → Sections → Components бүтэц. Хэрэглэгч template сонгоход энэ бүтцийг Landing-д хуулна."
          >
            <Textarea
              rows={16}
              value={form.schemaJson ?? ""}
              onChange={(e) => setForm({ ...form, schemaJson: e.target.value })}
              className="font-mono text-xs"
            />
          </Field>

          {/* Schema format helper */}
          <div className="rounded-lg bg-slate-50 border border-slate-200 p-3 text-xs text-slate-500 space-y-1">
            <div className="font-semibold text-slate-600">Schema бүтцийн жишээ:</div>
            <pre className="text-xs leading-relaxed overflow-auto max-h-32">{`{
  "pages": [{
    "title": "Нүүр хуудас", "path": "/", "orderIndex": 0,
    "sections": [{
      "sectionKey": "hero", "title": "Үндсэн хэсэг", "orderIndex": 0,
      "components": [{
        "componentType": "TEXT", "orderIndex": 0,
        "propsJson": { "text": "Таны нэр", "fontSize": "48px", "align": "center" }
      }]
    }]
  }]
}`}</pre>
          </div>

          {formErr && (
            <div className="rounded-lg bg-rose-50 border border-rose-200 p-3 text-sm text-rose-700">
              {formErr}
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
