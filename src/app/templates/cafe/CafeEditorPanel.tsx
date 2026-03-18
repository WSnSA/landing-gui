import { useState, useRef } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Button, Field, Input, Textarea } from "../../components/ui";
import CafeAnimatedPage from "./CafeAnimatedPage";
import type { CafeConfig, CafeMenuItem, CafeFeature, CafeReview, CafeHours, CafePrimaryColor } from "./CafeConfig";
import { ICON_MAP, ICON_CATEGORIES } from "./CafeIcons";
import {
  Tag, Utensils, Sparkles, MessageSquare, MapPin, Megaphone,
  Save, ChevronDown, ChevronUp, Upload, X, Search, LucideIcon,
} from "lucide-react";

// ── Icon picker ──────────────────────────────────────────────────────────────

function CafeIcon({ name, size = 16, className = "" }: { name: string; size?: number; className?: string }) {
  const Icon = ICON_MAP[name] as LucideIcon | undefined;
  if (!Icon) { const FB = ICON_MAP["UtensilsCrossed"] as LucideIcon; return <FB size={size} className={className} />; }
  return <Icon size={size} className={className} />;
}

function IconPicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = query.trim()
    ? Object.keys(ICON_MAP).filter((n) => n.toLowerCase().includes(query.toLowerCase()))
    : null;

  return (
    <div className="relative">
      <button type="button" onClick={() => setOpen((p) => !p)}
        className="flex items-center justify-center gap-1.5 w-full h-9 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition px-2">
        <CafeIcon name={value} size={16} className="text-slate-600" />
        <ChevronDown size={12} className="text-slate-400" />
      </button>

      {open && (
        <div className="absolute z-50 top-11 left-0 bg-white border border-slate-200 rounded-2xl shadow-xl w-72 overflow-hidden">
          {/* Search */}
          <div className="p-2 border-b border-slate-100">
            <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-1.5">
              <Search size={13} className="text-slate-400 shrink-0" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Хайх... (Coffee, Truck...)"
                className="flex-1 bg-transparent text-xs outline-none text-slate-700 placeholder:text-slate-400"
              />
              {query && <button onClick={() => setQuery("")}><X size={12} className="text-slate-400" /></button>}
            </div>
          </div>

          <div className="max-h-64 overflow-y-auto p-2">
            {filtered ? (
              <div className="grid grid-cols-8 gap-1">
                {filtered.map((name) => (
                  <button key={name} type="button" title={name}
                    onClick={() => { onChange(name); setOpen(false); setQuery(""); }}
                    className={`h-8 w-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition ${value === name ? "bg-blue-100 text-blue-600" : "text-slate-500"}`}>
                    <CafeIcon name={name} size={15} />
                  </button>
                ))}
                {filtered.length === 0 && (
                  <div className="col-span-8 text-center py-4 text-xs text-slate-400">Олдсонгүй</div>
                )}
              </div>
            ) : (
              ICON_CATEGORIES.map((cat) => (
                <div key={cat.label} className="mb-3">
                  <div className="text-xs font-semibold text-slate-400 px-1 mb-1">{cat.label}</div>
                  <div className="grid grid-cols-8 gap-1">
                    {cat.icons.map((name) => (
                      <button key={name} type="button" title={name}
                        onClick={() => { onChange(name); setOpen(false); }}
                        className={`h-8 w-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition ${value === name ? "bg-blue-100 text-blue-600" : "text-slate-500"}`}>
                        <CafeIcon name={name} size={15} />
                      </button>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Logo upload ──────────────────────────────────────────────────────────────

function LogoUpload({ value, brandName, onChange }: { value: string; brandName: string; onChange: (v: string) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [err, setErr] = useState<string | null>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) { setErr("Зөвхөн зураг файл"); return; }
    if (file.size > 512 * 1024) { setErr("Хамгийн ихдээ 512 KB"); return; }
    setErr(null);
    const reader = new FileReader();
    reader.onload = (e) => onChange(String(e.target?.result ?? ""));
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        {/* Preview */}
        {value ? (
          <div className="relative shrink-0">
            <img src={value} alt="" className="h-12 w-12 rounded-xl object-cover border border-slate-200" />
            <button onClick={() => onChange("")}
              className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-rose-500 text-white flex items-center justify-center hover:bg-rose-600 transition">
              <X size={10} />
            </button>
          </div>
        ) : (
          <div className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-lg shrink-0 border-2 border-dashed border-slate-200">
            {brandName.charAt(0).toUpperCase() || "?"}
          </div>
        )}

        {/* Upload button */}
        <button type="button" onClick={() => fileRef.current?.click()}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-3 py-2 text-sm text-slate-600 transition">
          <Upload size={14} />
          {value ? "Солих" : "Лого upload"}
        </button>
        <input ref={fileRef} type="file" accept="image/*" className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
      </div>
      {err && <div className="text-xs text-rose-500">{err}</div>}
      <div className="text-xs text-slate-400">PNG, JPG, SVG · Хамгийн ихдээ 512 KB</div>
    </div>
  );
}

// ── Section header ───────────────────────────────────────────────────────────

const SECTION_ICONS: Record<string, LucideIcon> = {
  brand: Tag, menu: Utensils, features: Sparkles,
  reviews: MessageSquare, contact: MapPin, cta: Megaphone,
};

function SectionHeader({ id, title, open, onToggle }: { id: string; title: string; open: boolean; onToggle: () => void }) {
  const Icon = (SECTION_ICONS[id] ?? Tag) as LucideIcon;
  return (
    <button onClick={onToggle}
      className="w-full flex items-center justify-between py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 transition text-sm font-semibold text-slate-700">
      <span className="flex items-center gap-2"><Icon size={14} className="text-slate-500" />{title}</span>
      {open ? <ChevronUp size={14} className="text-slate-400" /> : <ChevronDown size={14} className="text-slate-400" />}
    </button>
  );
}

// ── Color options ────────────────────────────────────────────────────────────

const COLOR_OPTIONS: { value: CafePrimaryColor; label: string; dot: string }[] = [
  { value: "amber",   label: "Amber",   dot: "bg-amber-500" },
  { value: "blue",    label: "Blue",    dot: "bg-blue-500" },
  { value: "emerald", label: "Emerald", dot: "bg-emerald-500" },
  { value: "rose",    label: "Rose",    dot: "bg-rose-500" },
  { value: "violet",  label: "Violet",  dot: "bg-violet-500" },
];

// ── Main ─────────────────────────────────────────────────────────────────────

export default function CafeEditorPanel({
  config, onChange, saving, onSave,
}: {
  config: CafeConfig; onChange: (c: CafeConfig) => void; saving: boolean; onSave: () => void;
}) {
  const [openSection, setOpenSection] = useState<string>("brand");
  const toggle = (k: string) => setOpenSection((p) => (p === k ? "" : k));
  const set = <K extends keyof CafeConfig>(key: K, val: CafeConfig[K]) => onChange({ ...config, [key]: val });

  const setMenuItem = (i: number, field: keyof CafeMenuItem, val: string) =>
    set("menuItems", config.menuItems.map((m, idx) => idx === i ? { ...m, [field]: val } : m));
  const addMenuItem = () => set("menuItems", [...config.menuItems, { icon: "UtensilsCrossed", name: "Шинэ бүтээгдэхүүн", price: "0₮", desc: "" }]);
  const removeMenuItem = (i: number) => set("menuItems", config.menuItems.filter((_, idx) => idx !== i));

  const setFeature = (i: number, field: keyof CafeFeature, val: string) =>
    set("features", config.features.map((f, idx) => idx === i ? { ...f, [field]: val } : f));
  const addFeature = () => set("features", [...config.features, { icon: "Star", title: "Шинэ онцлог", desc: "" }]);
  const removeFeature = (i: number) => set("features", config.features.filter((_, idx) => idx !== i));

  const setReview = (i: number, field: keyof CafeReview, val: string) =>
    set("reviews", config.reviews.map((r, idx) => idx === i ? { ...r, [field]: val } : r));
  const addReview = () => set("reviews", [...config.reviews, { text: "Маш сайн байна!", name: "Нэр", role: "Үйлчлүүлэгч" }]);
  const removeReview = (i: number) => set("reviews", config.reviews.filter((_, idx) => idx !== i));

  const setHours = (i: number, field: keyof CafeHours, val: string) =>
    set("hours", config.hours.map((h, idx) => idx === i ? { ...h, [field]: val } : h));
  const addHours = () => set("hours", [...config.hours, { day: "Гараг", time: "09:00 – 18:00" }]);
  const removeHours = (i: number) => set("hours", config.hours.filter((_, idx) => idx !== i));

  return (
    <PanelGroup direction="horizontal">
      <Panel defaultSize={38} minSize={28}>
        <div className="h-full overflow-y-auto border-r border-slate-200 bg-slate-50">
          <div className="p-5 space-y-3">

            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="text-sm font-bold text-slate-900">Animated Cafe засах</div>
                <div className="text-xs text-slate-400 mt-0.5">Өөрчлөлт баруун талд шууд харагдана</div>
              </div>
              <Button size="sm" onClick={onSave} loading={saving}>
                <Save size={13} className="mr-1" />{saving ? "..." : "Хадгалах"}
              </Button>
            </div>

            {/* Brand */}
            <SectionHeader id="brand" title="Бренд" open={openSection === "brand"} onToggle={() => toggle("brand")} />
            {openSection === "brand" && (
              <div className="space-y-3 px-1">
                <Field label="Лого" hint="Browser tab болон nav-д харагдана">
                  <LogoUpload value={config.brandLogo} brandName={config.brandName} onChange={(v) => set("brandLogo", v)} />
                </Field>
                <Field label="Брэндийн нэр">
                  <Input value={config.brandName} onChange={(e) => set("brandName", e.target.value)} placeholder="Copper Cup Coffee" />
                </Field>
                <Field label="Badge (дээд мөр)">
                  <Input value={config.badge} onChange={(e) => set("badge", e.target.value)} />
                </Field>
                <Field label="Гарчиг">
                  <Input value={config.tagline} onChange={(e) => set("tagline", e.target.value)} />
                </Field>
                <Field label="Гарчиг (өнгөт хэсэг)">
                  <Input value={config.taglineHighlight} onChange={(e) => set("taglineHighlight", e.target.value)} />
                </Field>
                <Field label="Тайлбар">
                  <Textarea rows={3} value={config.description} onChange={(e) => set("description", e.target.value)} />
                </Field>
                <Field label="URL preview">
                  <div className="flex items-center rounded-xl border border-slate-200 bg-white overflow-hidden">
                    <span className="pl-3 pr-1 text-xs text-slate-400 shrink-0">landing.mn/p/</span>
                    <input value={config.slugPreview} onChange={(e) => set("slugPreview", e.target.value)}
                      className="flex-1 py-2 pr-3 text-xs outline-none text-slate-900" placeholder="copper-cup" />
                  </div>
                </Field>
                <Field label="Өнгөний загвар">
                  <div className="grid grid-cols-5 gap-2">
                    {COLOR_OPTIONS.map((c) => (
                      <button key={c.value} onClick={() => set("primaryColor", c.value)}
                        className={`flex flex-col items-center gap-1 p-2 rounded-xl border-2 transition text-xs ${config.primaryColor === c.value ? "border-slate-900" : "border-slate-200 hover:border-slate-400"}`}>
                        <div className={`h-5 w-5 rounded-full ${c.dot}`} />
                        <span className="text-slate-600">{c.label}</span>
                      </button>
                    ))}
                  </div>
                </Field>
              </div>
            )}

            {/* Menu */}
            <SectionHeader id="menu" title="Меню / Бүтээгдэхүүн" open={openSection === "menu"} onToggle={() => toggle("menu")} />
            {openSection === "menu" && (
              <div className="space-y-3 px-1">
                <div className="grid grid-cols-2 gap-2">
                  <Field label="Гарчиг"><Input value={config.menuTitle} onChange={(e) => set("menuTitle", e.target.value)} /></Field>
                  <Field label="Дэд гарчиг"><Input value={config.menuSubtitle} onChange={(e) => set("menuSubtitle", e.target.value)} /></Field>
                </div>
                {config.menuItems.map((item, i) => (
                  <div key={i} className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-500">#{i + 1}</span>
                      <button onClick={() => removeMenuItem(i)} className="text-xs text-rose-400 hover:text-rose-600">✕</button>
                    </div>
                    <div className="grid grid-cols-4 gap-1.5 items-end">
                      <div>
                        <div className="text-xs text-slate-500 mb-1">Icon</div>
                        <IconPicker value={item.icon} onChange={(v) => setMenuItem(i, "icon", v)} />
                      </div>
                      <Input value={item.name} onChange={(e) => setMenuItem(i, "name", e.target.value)} placeholder="Нэр" className="col-span-2" />
                      <Input value={item.price} onChange={(e) => setMenuItem(i, "price", e.target.value)} placeholder="0₮" />
                    </div>
                    <Input value={item.desc} onChange={(e) => setMenuItem(i, "desc", e.target.value)} placeholder="Тайлбар" />
                  </div>
                ))}
                <Button size="sm" variant="secondary" onClick={addMenuItem} className="w-full">+ Бүтээгдэхүүн нэмэх</Button>
              </div>
            )}

            {/* Features */}
            <SectionHeader id="features" title="Онцлогууд" open={openSection === "features"} onToggle={() => toggle("features")} />
            {openSection === "features" && (
              <div className="space-y-3 px-1">
                <div className="grid grid-cols-2 gap-2">
                  <Field label="Гарчиг"><Input value={config.featuresTitle} onChange={(e) => set("featuresTitle", e.target.value)} /></Field>
                  <Field label="Дэд гарчиг"><Input value={config.featuresSubtitle} onChange={(e) => set("featuresSubtitle", e.target.value)} /></Field>
                </div>
                {config.features.map((f, i) => (
                  <div key={i} className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-500">#{i + 1}</span>
                      <button onClick={() => removeFeature(i)} className="text-xs text-rose-400 hover:text-rose-600">✕</button>
                    </div>
                    <div className="grid grid-cols-4 gap-1.5 items-end">
                      <div>
                        <div className="text-xs text-slate-500 mb-1">Icon</div>
                        <IconPicker value={f.icon} onChange={(v) => setFeature(i, "icon", v)} />
                      </div>
                      <Input value={f.title} onChange={(e) => setFeature(i, "title", e.target.value)} placeholder="Гарчиг" className="col-span-3" />
                    </div>
                    <Input value={f.desc} onChange={(e) => setFeature(i, "desc", e.target.value)} placeholder="Тайлбар" />
                  </div>
                ))}
                <Button size="sm" variant="secondary" onClick={addFeature} className="w-full">+ Онцлог нэмэх</Button>
              </div>
            )}

            {/* Reviews */}
            <SectionHeader id="reviews" title="Сэтгэгдэл" open={openSection === "reviews"} onToggle={() => toggle("reviews")} />
            {openSection === "reviews" && (
              <div className="space-y-3 px-1">
                {config.reviews.map((r, i) => (
                  <div key={i} className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-500">#{i + 1}</span>
                      <button onClick={() => removeReview(i)} className="text-xs text-rose-400 hover:text-rose-600">✕</button>
                    </div>
                    <Textarea rows={2} value={r.text} onChange={(e) => setReview(i, "text", e.target.value)} placeholder="Сэтгэгдэл..." />
                    <div className="grid grid-cols-2 gap-1.5">
                      <Input value={r.name} onChange={(e) => setReview(i, "name", e.target.value)} placeholder="Нэр" />
                      <Input value={r.role} onChange={(e) => setReview(i, "role", e.target.value)} placeholder="Мэргэжил" />
                    </div>
                  </div>
                ))}
                <Button size="sm" variant="secondary" onClick={addReview} className="w-full">+ Сэтгэгдэл нэмэх</Button>
              </div>
            )}

            {/* Contact */}
            <SectionHeader id="contact" title="Холбоо барих" open={openSection === "contact"} onToggle={() => toggle("contact")} />
            {openSection === "contact" && (
              <div className="space-y-3 px-1">
                <Field label="Хаяг"><Input value={config.address} onChange={(e) => set("address", e.target.value)} /></Field>
                <Field label="Тэмдэглэл"><Input value={config.addressNote} onChange={(e) => set("addressNote", e.target.value)} /></Field>
                <div className="grid grid-cols-2 gap-2">
                  <Field label="Утас"><Input value={config.phone} onChange={(e) => set("phone", e.target.value)} placeholder="09-XXXX-XXXX" /></Field>
                  <Field label="И-мэйл"><Input value={config.email} onChange={(e) => set("email", e.target.value)} placeholder="info@..." /></Field>
                </div>
                <div className="text-xs font-semibold text-slate-500 pt-1">Ажлын цаг</div>
                {config.hours.map((h, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Input value={h.day} onChange={(e) => setHours(i, "day", e.target.value)} placeholder="Гараг" className="flex-1" />
                    <Input value={h.time} onChange={(e) => setHours(i, "time", e.target.value)} placeholder="09:00–18:00" className="flex-1" />
                    <button onClick={() => removeHours(i)} className="text-xs text-rose-400 hover:text-rose-600 shrink-0">✕</button>
                  </div>
                ))}
                <Button size="sm" variant="secondary" onClick={addHours} className="w-full">+ Цаг нэмэх</Button>
              </div>
            )}

            {/* CTA */}
            <SectionHeader id="cta" title="Уриалга" open={openSection === "cta"} onToggle={() => toggle("cta")} />
            {openSection === "cta" && (
              <div className="space-y-3 px-1">
                <Field label="CTA гарчиг"><Input value={config.ctaText} onChange={(e) => set("ctaText", e.target.value)} /></Field>
                <Field label="CTA дэд текст"><Input value={config.ctaSubtext} onChange={(e) => set("ctaSubtext", e.target.value)} /></Field>
              </div>
            )}

          </div>
        </div>
      </Panel>

      <PanelResizeHandle className="w-1.5 bg-slate-200 hover:bg-blue-400 transition-colors cursor-col-resize" />

      <Panel defaultSize={62} minSize={40}>
        <div className="h-full overflow-y-auto bg-white">
          <div className="sticky top-0 z-10 border-b border-slate-200 bg-slate-50 px-4 py-2.5 flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-rose-400" />
              <div className="h-3 w-3 rounded-full bg-amber-400" />
              <div className="h-3 w-3 rounded-full bg-emerald-400" />
            </div>
            <div className="flex-1 rounded-md bg-white border border-slate-200 px-3 py-1 text-xs text-slate-400 text-center">
              landing.mn/p/{config.slugPreview} — Live preview
            </div>
          </div>
          <CafeAnimatedPage config={config} />
        </div>
      </Panel>
    </PanelGroup>
  );
}
