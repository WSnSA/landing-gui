import { useState, useRef } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Button, Field, Input, Textarea } from "../../components/ui";
import KShopAnimatedPage from "./KShopAnimatedPage";
import type { KShopConfig, KShopProduct, KShopStep, KShopReview, KShopCategory, KShopPrimaryColor } from "./KShopConfig";
import {
  Tag, ShoppingBag, ListOrdered, MessageSquare, Phone, Megaphone,
  Save, ChevronDown, ChevronUp, Upload, X, LucideIcon,
} from "lucide-react";

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
        {value ? (
          <div className="relative shrink-0">
            <img src={value} alt="" className="h-12 w-12 rounded-xl object-cover border border-slate-200" />
            <button onClick={() => onChange("")} className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-rose-500 text-white flex items-center justify-center hover:bg-rose-600 transition">
              <X size={10} />
            </button>
          </div>
        ) : (
          <div className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-lg shrink-0 border-2 border-dashed border-slate-200">
            {brandName.charAt(0).toUpperCase() || "?"}
          </div>
        )}
        <button type="button" onClick={() => fileRef.current?.click()}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-3 py-2 text-sm text-slate-600 transition">
          <Upload size={14} /> {value ? "Солих" : "Лого upload"}
        </button>
        <input ref={fileRef} type="file" accept="image/*" className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
      </div>
      {err && <div className="text-xs text-rose-500">{err}</div>}
    </div>
  );
}

const SECTION_ICONS: Record<string, LucideIcon> = {
  brand: Tag, products: ShoppingBag, categories: Tag,
  steps: ListOrdered, reviews: MessageSquare, contact: Phone, cta: Megaphone,
};

function SectionHeader({ id, title, open, onToggle }: { id: string; title: string; open: boolean; onToggle: () => void }) {
  const Icon = (SECTION_ICONS[id] ?? Tag) as LucideIcon;
  return (
    <button onClick={onToggle} className="w-full flex items-center justify-between py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 transition text-sm font-semibold text-slate-700">
      <span className="flex items-center gap-2"><Icon size={14} className="text-slate-500" />{title}</span>
      {open ? <ChevronUp size={14} className="text-slate-400" /> : <ChevronDown size={14} className="text-slate-400" />}
    </button>
  );
}

const COLOR_OPTIONS: { value: KShopPrimaryColor; label: string; dot: string }[] = [
  { value: "pink",   label: "Pink",   dot: "bg-pink-500" },
  { value: "rose",   label: "Rose",   dot: "bg-rose-500" },
  { value: "violet", label: "Violet", dot: "bg-violet-500" },
  { value: "amber",  label: "Amber",  dot: "bg-amber-500" },
  { value: "slate",  label: "Slate",  dot: "bg-slate-700" },
];

const TAG_OPTIONS = ["", "Шинэ", "Sale", "Онцлох"];

export default function KShopEditorPanel({
  config, onChange, saving, onSave,
}: {
  config: KShopConfig; onChange: (c: KShopConfig) => void; saving: boolean; onSave: () => void;
}) {
  const [openSection, setOpenSection] = useState<string>("brand");
  const toggle = (k: string) => setOpenSection((p) => (p === k ? "" : k));
  const set = <K extends keyof KShopConfig>(key: K, val: KShopConfig[K]) => onChange({ ...config, [key]: val });

  const setProduct = (i: number, field: keyof KShopProduct, val: string) =>
    set("products", config.products.map((p, idx) => idx === i ? { ...p, [field]: val } : p));

  const uploadProductImage = (i: number, slot: number, file: File) => {
    if (!file.type.startsWith("image/")) return;
    if (file.size > 1024 * 1024) return; // 1MB max
    const reader = new FileReader();
    reader.onload = (e) => {
      const current = config.products[i].images ?? [];
      const updated = [...current];
      updated[slot] = String(e.target?.result ?? "");
      set("products", config.products.map((p, idx) => idx === i ? { ...p, images: updated } : p));
    };
    reader.readAsDataURL(file);
  };

  const removeProductImage = (i: number, slot: number) => {
    const current = config.products[i].images ?? [];
    const updated = current.filter((_, si) => si !== slot);
    set("products", config.products.map((p, idx) => idx === i ? { ...p, images: updated } : p));
  };
  const addProduct = () =>
    set("products", [...config.products, { name: "Шинэ бараа", price: "0₮", originalPrice: "", tag: "Шинэ", category: "Бусад", emoji: "🛍️" }]);
  const removeProduct = (i: number) => set("products", config.products.filter((_, idx) => idx !== i));

  const setCategory = (i: number, field: keyof KShopCategory, val: string) =>
    set("categories", config.categories.map((c, idx) => idx === i ? { ...c, [field]: val } : c));
  const addCategory = () => set("categories", [...config.categories, { icon: "🛍️", name: "Шинэ" }]);
  const removeCategory = (i: number) => set("categories", config.categories.filter((_, idx) => idx !== i));

  const setStep = (i: number, field: keyof KShopStep, val: string) =>
    set("steps", config.steps.map((s, idx) => idx === i ? { ...s, [field]: val } : s));

  const setReview = (i: number, field: keyof KShopReview, val: string) =>
    set("reviews", config.reviews.map((r, idx) => idx === i ? { ...r, [field]: val } : r));
  const addReview = () => set("reviews", [...config.reviews, { text: "Маш сайн байна!", name: "Нэр", product: "Бараа" }]);
  const removeReview = (i: number) => set("reviews", config.reviews.filter((_, idx) => idx !== i));

  return (
    <PanelGroup direction="horizontal">
      <Panel defaultSize={38} minSize={28}>
        <div className="h-full overflow-y-auto border-r border-slate-200 bg-slate-50">
          <div className="p-5 space-y-3">
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="text-sm font-bold text-slate-900">Online Shop засах</div>
                <div className="text-xs text-slate-400 mt-0.5">Өөрчлөлт шууд харагдана</div>
              </div>
              <Button size="sm" onClick={onSave} loading={saving}>
                <Save size={13} className="mr-1" />{saving ? "..." : "Хадгалах"}
              </Button>
            </div>

            {/* Brand */}
            <SectionHeader id="brand" title="Бренд" open={openSection === "brand"} onToggle={() => toggle("brand")} />
            {openSection === "brand" && (
              <div className="space-y-3 px-1">
                <Field label="Лого">
                  <LogoUpload value={config.brandLogo} brandName={config.brandName} onChange={(v) => set("brandLogo", v)} />
                </Field>
                <Field label="Дэлгүүрийн нэр">
                  <Input value={config.brandName} onChange={(e) => set("brandName", e.target.value)} />
                </Field>
                <Field label="Badge">
                  <Input value={config.badge} onChange={(e) => set("badge", e.target.value)} />
                </Field>
                <Field label="Гарчиг">
                  <Input value={config.tagline} onChange={(e) => set("tagline", e.target.value)} />
                </Field>
                <Field label="Гарчиг (gradient)">
                  <Input value={config.taglineHighlight} onChange={(e) => set("taglineHighlight", e.target.value)} />
                </Field>
                <Field label="Тайлбар">
                  <Textarea rows={3} value={config.description} onChange={(e) => set("description", e.target.value)} />
                </Field>
                <Field label="Promo гарчиг">
                  <Input value={config.promoText} onChange={(e) => set("promoText", e.target.value)} />
                </Field>
                <Field label="Promo дэд текст">
                  <Input value={config.promoSub} onChange={(e) => set("promoSub", e.target.value)} />
                </Field>
                <Field label="Хүргэлтийн мэдээлэл">
                  <Input value={config.deliveryNote} onChange={(e) => set("deliveryNote", e.target.value)} />
                </Field>
                <Field label="URL preview">
                  <div className="flex items-center rounded-xl border border-slate-200 bg-white overflow-hidden">
                    <span className="pl-3 pr-1 text-xs text-slate-400 shrink-0">landing.mn/p/</span>
                    <input value={config.slugPreview} onChange={(e) => set("slugPreview", e.target.value)}
                      className="flex-1 py-2 pr-3 text-xs outline-none text-slate-900" />
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

            {/* Categories */}
            <SectionHeader id="categories" title="Категориуд" open={openSection === "categories"} onToggle={() => toggle("categories")} />
            {openSection === "categories" && (
              <div className="space-y-2 px-1">
                {config.categories.map((cat, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Input value={cat.icon} onChange={(e) => setCategory(i, "icon", e.target.value)} placeholder="👗" className="w-14 shrink-0 text-center" />
                    <Input value={cat.name} onChange={(e) => setCategory(i, "name", e.target.value)} placeholder="Эмэгтэй" className="flex-1" />
                    <button onClick={() => removeCategory(i)} className="text-xs text-rose-400 hover:text-rose-600 shrink-0">✕</button>
                  </div>
                ))}
                <Button size="sm" variant="secondary" onClick={addCategory} className="w-full">+ Категори нэмэх</Button>
              </div>
            )}

            {/* Products */}
            <SectionHeader id="products" title="Бараанууд" open={openSection === "products"} onToggle={() => toggle("products")} />
            {openSection === "products" && (
              <div className="space-y-3 px-1">
                <Field label="Хэсгийн гарчиг">
                  <Input value={config.productsTitle} onChange={(e) => set("productsTitle", e.target.value)} />
                </Field>
                {config.products.map((p, i) => (
                  <div key={i} className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-500">#{i + 1}</span>
                      <button onClick={() => removeProduct(i)} className="text-xs text-rose-400 hover:text-rose-600">✕</button>
                    </div>
                    {/* Product name */}
                    <div className="flex gap-2 items-center">
                      <Input value={p.emoji} onChange={(e) => setProduct(i, "emoji", e.target.value)} placeholder="👗" className="w-12 shrink-0 text-center text-xl" />
                      <Input value={p.name} onChange={(e) => setProduct(i, "name", e.target.value)} placeholder="Барааны нэр" className="flex-1" />
                    </div>
                    {/* 3-slot image upload */}
                    <div>
                      <div className="text-[10px] font-semibold text-slate-400 mb-1.5">Зургууд (хамгийн ихдээ 3)</div>
                      <div className="flex gap-2">
                        {[0, 1, 2].map((slot) => {
                          const imgSrc = p.images?.[slot];
                          return (
                            <div key={slot} className="relative">
                              <label className="cursor-pointer block">
                                <div className="h-16 w-16 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 hover:bg-slate-100 overflow-hidden flex items-center justify-center transition">
                                  {imgSrc ? (
                                    <img src={imgSrc} alt="" className="w-full h-full object-cover" />
                                  ) : (
                                    <div className="flex flex-col items-center gap-0.5 text-slate-300">
                                      <Upload size={12} />
                                      <span className="text-[9px]">{slot + 1}-р</span>
                                    </div>
                                  )}
                                </div>
                                <input type="file" accept="image/*" className="hidden"
                                  onChange={(e) => e.target.files?.[0] && uploadProductImage(i, slot, e.target.files[0])} />
                              </label>
                              {imgSrc && (
                                <button onClick={() => removeProductImage(i, slot)}
                                  className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-rose-500 text-white flex items-center justify-center hover:bg-rose-600 transition z-10">
                                  <X size={8} />
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      <Input value={p.price} onChange={(e) => setProduct(i, "price", e.target.value)} placeholder="0₮" />
                      <Input value={p.originalPrice ?? ""} onChange={(e) => setProduct(i, "originalPrice", e.target.value)} placeholder="Хуучин үнэ" />
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      <select value={p.tag ?? ""} onChange={(e) => setProduct(i, "tag", e.target.value)}
                        className="rounded-xl border border-slate-200 bg-white px-2 py-2 text-xs text-slate-700 outline-none">
                        {TAG_OPTIONS.map((t) => <option key={t} value={t}>{t || "— Tag байхгүй"}</option>)}
                      </select>
                      <Input value={p.category} onChange={(e) => setProduct(i, "category", e.target.value)} placeholder="Категори" />
                    </div>
                  </div>
                ))}
                <Button size="sm" variant="secondary" onClick={addProduct} className="w-full">+ Бараа нэмэх</Button>
              </div>
            )}

            {/* Steps */}
            <SectionHeader id="steps" title="Захиалах алхамууд" open={openSection === "steps"} onToggle={() => toggle("steps")} />
            {openSection === "steps" && (
              <div className="space-y-3 px-1">
                <Field label="Гарчиг"><Input value={config.stepsTitle} onChange={(e) => set("stepsTitle", e.target.value)} /></Field>
                {config.steps.map((s, i) => (
                  <div key={i} className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
                    <span className="text-xs font-semibold text-slate-500">Алхам {i + 1}</span>
                    <Input value={s.title} onChange={(e) => setStep(i, "title", e.target.value)} placeholder="Гарчиг" />
                    <Input value={s.desc} onChange={(e) => setStep(i, "desc", e.target.value)} placeholder="Тайлбар" />
                  </div>
                ))}
              </div>
            )}

            {/* Reviews */}
            <SectionHeader id="reviews" title="Сэтгэгдэл" open={openSection === "reviews"} onToggle={() => toggle("reviews")} />
            {openSection === "reviews" && (
              <div className="space-y-3 px-1">
                {config.reviews.map((r, i) => (
                  <div key={i} className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-xs font-semibold text-slate-500">#{i + 1}</span>
                      <button onClick={() => removeReview(i)} className="text-xs text-rose-400 hover:text-rose-600">✕</button>
                    </div>
                    <Textarea rows={2} value={r.text} onChange={(e) => setReview(i, "text", e.target.value)} placeholder="Сэтгэгдэл..." />
                    <div className="grid grid-cols-2 gap-1.5">
                      <Input value={r.name} onChange={(e) => setReview(i, "name", e.target.value)} placeholder="Нэр" />
                      <Input value={r.product} onChange={(e) => setReview(i, "product", e.target.value)} placeholder="Авсан бараа" />
                    </div>
                  </div>
                ))}
                <Button size="sm" variant="secondary" onClick={addReview} className="w-full">+ Сэтгэгдэл нэмэх</Button>
              </div>
            )}

            {/* Contact */}
            <SectionHeader id="contact" title="Холбоо / Нийгмийн сүлжээ" open={openSection === "contact"} onToggle={() => toggle("contact")} />
            {openSection === "contact" && (
              <div className="space-y-3 px-1">
                <Field label="CTA товч текст"><Input value={config.ctaText} onChange={(e) => set("ctaText", e.target.value)} /></Field>
                <Field label="Утас"><Input value={config.phone} onChange={(e) => set("phone", e.target.value)} /></Field>
                <Field label="Facebook (username)">
                  <div className="flex items-center rounded-xl border border-slate-200 bg-white overflow-hidden">
                    <span className="pl-3 pr-1 text-xs text-slate-400 shrink-0">facebook.com/</span>
                    <input value={config.facebook} onChange={(e) => set("facebook", e.target.value)}
                      className="flex-1 py-2 pr-3 text-xs outline-none text-slate-900" />
                  </div>
                </Field>
                <Field label="Instagram (username)">
                  <div className="flex items-center rounded-xl border border-slate-200 bg-white overflow-hidden">
                    <span className="pl-3 pr-1 text-xs text-slate-400 shrink-0">@</span>
                    <input value={config.instagram} onChange={(e) => set("instagram", e.target.value)}
                      className="flex-1 py-2 pr-3 text-xs outline-none text-slate-900" />
                  </div>
                </Field>
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
          <KShopAnimatedPage config={config} />
        </div>
      </Panel>
    </PanelGroup>
  );
}
