import { useState, useRef } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Button, Field, Input, Textarea } from "../../components/ui";
import FutureAnimatedPage from "./FutureAnimatedPage";
import type { FutureConfig, FutureCourse, FutureInstructor, FutureTestimonial, FutureStat, FutureStep, FuturePrimaryColor } from "./FutureConfig";
import { ICON_MAP, ICON_CATEGORIES } from "../cafe/CafeIcons";
import {
  Tag, BookOpen, ListOrdered, BarChart2, Users, MessageSquare, Megaphone,
  Save, ChevronDown, ChevronUp, Upload, X, Search, LucideIcon,
} from "lucide-react";

function FtIcon({ name, size = 16, className = "" }: { name: string; size?: number; className?: string }) {
  const Icon = ICON_MAP[name] as LucideIcon | undefined;
  if (!Icon) { const FB = ICON_MAP["BookOpen"] as LucideIcon; return <FB size={size} className={className} />; }
  return <Icon size={size} className={className} />;
}

function IconPicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const filtered = query.trim() ? Object.keys(ICON_MAP).filter((n) => n.toLowerCase().includes(query.toLowerCase())) : null;
  return (
    <div className="relative">
      <button type="button" onClick={() => setOpen((p) => !p)}
        className="flex items-center justify-center gap-1.5 w-full h-9 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition px-2">
        <FtIcon name={value} size={16} className="text-slate-600" />
        <ChevronDown size={12} className="text-slate-400" />
      </button>
      {open && (
        <div className="absolute z-50 top-11 left-0 bg-white border border-slate-200 rounded-2xl shadow-xl w-72 overflow-hidden">
          <div className="p-2 border-b border-slate-100">
            <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-1.5">
              <Search size={13} className="text-slate-400 shrink-0" />
              <input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Хайх..."
                className="flex-1 bg-transparent text-xs outline-none text-slate-700 placeholder:text-slate-400" />
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
                    <FtIcon name={name} size={15} />
                  </button>
                ))}
                {filtered.length === 0 && <div className="col-span-8 text-center py-4 text-xs text-slate-400">Олдсонгүй</div>}
              </div>
            ) : ICON_CATEGORIES.map((cat) => (
              <div key={cat.label} className="mb-3">
                <div className="text-xs font-semibold text-slate-400 px-1 mb-1">{cat.label}</div>
                <div className="grid grid-cols-8 gap-1">
                  {cat.icons.map((name) => (
                    <button key={name} type="button" title={name}
                      onClick={() => { onChange(name); setOpen(false); }}
                      className={`h-8 w-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition ${value === name ? "bg-blue-100 text-blue-600" : "text-slate-500"}`}>
                      <FtIcon name={name} size={15} />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

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
      <div className="text-xs text-slate-400">PNG, JPG, SVG · 512 KB хүртэл</div>
    </div>
  );
}

const SECTION_ICONS: Record<string, LucideIcon> = {
  brand: Tag, courses: BookOpen, steps: ListOrdered,
  stats: BarChart2, instructors: Users, testimonials: MessageSquare, cta: Megaphone,
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

const COLOR_OPTIONS: { value: FuturePrimaryColor; label: string; dot: string }[] = [
  { value: "indigo", label: "Indigo", dot: "bg-indigo-600" },
  { value: "blue",   label: "Blue",   dot: "bg-blue-600" },
  { value: "violet", label: "Violet", dot: "bg-violet-600" },
  { value: "cyan",   label: "Cyan",   dot: "bg-cyan-600" },
  { value: "rose",   label: "Rose",   dot: "bg-rose-600" },
];

const LEVEL_OPTIONS = ["Эхлэгч", "Дунд", "Ахисан"] as const;

export default function FutureEditorPanel({
  config, onChange, saving, onSave,
}: {
  config: FutureConfig; onChange: (c: FutureConfig) => void; saving: boolean; onSave: () => void;
}) {
  const [openSection, setOpenSection] = useState<string>("brand");
  const toggle = (k: string) => setOpenSection((p) => (p === k ? "" : k));
  const set = <K extends keyof FutureConfig>(key: K, val: FutureConfig[K]) => onChange({ ...config, [key]: val });

  const setCourse = (i: number, field: keyof FutureCourse, val: string | boolean) =>
    set("courses", config.courses.map((c, idx) => idx === i ? { ...c, [field]: val } : c));
  const addCourse = () =>
    set("courses", [...config.courses, { icon: "BookOpen", name: "Шинэ хөтөлбөр", level: "Эхлэгч", duration: "1 сар", price: "0₮", desc: "", highlight: false }]);
  const removeCourse = (i: number) => set("courses", config.courses.filter((_, idx) => idx !== i));

  const setStep = (i: number, field: keyof FutureStep, val: string) =>
    set("steps", config.steps.map((s, idx) => idx === i ? { ...s, [field]: val } : s));
  const addStep = () => set("steps", [...config.steps, { title: "Шинэ алхам", desc: "" }]);
  const removeStep = (i: number) => set("steps", config.steps.filter((_, idx) => idx !== i));

  const setStat = (i: number, field: keyof FutureStat, val: string) =>
    set("stats", config.stats.map((s, idx) => idx === i ? { ...s, [field]: val } : s));

  const setInstructor = (i: number, field: keyof FutureInstructor, val: string) =>
    set("instructors", config.instructors.map((inst, idx) => idx === i ? { ...inst, [field]: val } : inst));
  const addInstructor = () => set("instructors", [...config.instructors, { name: "Шинэ багш", subject: "Сэдэв", exp: "1 жил" }]);
  const removeInstructor = (i: number) => set("instructors", config.instructors.filter((_, idx) => idx !== i));

  const setTestimonial = (i: number, field: keyof FutureTestimonial, val: string) =>
    set("testimonials", config.testimonials.map((t, idx) => idx === i ? { ...t, [field]: val } : t));
  const addTestimonial = () => set("testimonials", [...config.testimonials, { text: "Маш сайн сургалт!", name: "Нэр", result: "Амжилт олсон" }]);
  const removeTestimonial = (i: number) => set("testimonials", config.testimonials.filter((_, idx) => idx !== i));

  return (
    <PanelGroup direction="horizontal">
      <Panel defaultSize={38} minSize={28}>
        <div className="h-full overflow-y-auto border-r border-slate-200 bg-slate-50">
          <div className="p-5 space-y-3">
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="text-sm font-bold text-slate-900">Future Сургалт засах</div>
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
                <Field label="Брэндийн нэр">
                  <Input value={config.brandName} onChange={(e) => set("brandName", e.target.value)} />
                </Field>
                <Field label="Badge">
                  <Input value={config.badge} onChange={(e) => set("badge", e.target.value)} />
                </Field>
                <Field label="Гарчиг">
                  <Input value={config.tagline} onChange={(e) => set("tagline", e.target.value)} />
                </Field>
                <Field label="Гарчиг (gradient хэсэг)">
                  <Input value={config.taglineHighlight} onChange={(e) => set("taglineHighlight", e.target.value)} />
                </Field>
                <Field label="Тайлбар">
                  <Textarea rows={3} value={config.description} onChange={(e) => set("description", e.target.value)} />
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

            {/* Courses */}
            <SectionHeader id="courses" title="Хөтөлбөрүүд" open={openSection === "courses"} onToggle={() => toggle("courses")} />
            {openSection === "courses" && (
              <div className="space-y-3 px-1">
                <div className="grid grid-cols-2 gap-2">
                  <Field label="Гарчиг"><Input value={config.coursesTitle} onChange={(e) => set("coursesTitle", e.target.value)} /></Field>
                  <Field label="Дэд гарчиг"><Input value={config.coursesSubtitle} onChange={(e) => set("coursesSubtitle", e.target.value)} /></Field>
                </div>
                {config.courses.map((c, i) => (
                  <div key={i} className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-500">#{i + 1}</span>
                      <div className="flex items-center gap-2">
                        <label className="flex items-center gap-1 text-xs text-slate-500 cursor-pointer">
                          <input type="checkbox" checked={!!c.highlight} onChange={(e) => setCourse(i, "highlight", e.target.checked)} className="rounded" />
                          Алдартай
                        </label>
                        <button onClick={() => removeCourse(i)} className="text-xs text-rose-400 hover:text-rose-600">✕</button>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-1.5 items-end">
                      <div>
                        <div className="text-xs text-slate-500 mb-1">Icon</div>
                        <IconPicker value={c.icon} onChange={(v) => setCourse(i, "icon", v)} />
                      </div>
                      <Input value={c.name} onChange={(e) => setCourse(i, "name", e.target.value)} placeholder="Нэр" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-3 gap-1.5">
                      <select value={c.level} onChange={(e) => setCourse(i, "level", e.target.value as FutureCourse["level"])}
                        className="rounded-xl border border-slate-200 bg-white px-2 py-2 text-xs text-slate-700 outline-none">
                        {LEVEL_OPTIONS.map((l) => <option key={l} value={l}>{l}</option>)}
                      </select>
                      <Input value={c.duration} onChange={(e) => setCourse(i, "duration", e.target.value)} placeholder="3 сар" />
                      <Input value={c.price} onChange={(e) => setCourse(i, "price", e.target.value)} placeholder="0₮" />
                    </div>
                    <Input value={c.desc} onChange={(e) => setCourse(i, "desc", e.target.value)} placeholder="Тайлбар" />
                  </div>
                ))}
                <Button size="sm" variant="secondary" onClick={addCourse} className="w-full">+ Хөтөлбөр нэмэх</Button>
              </div>
            )}

            {/* Steps */}
            <SectionHeader id="steps" title="Элсэх алхамууд" open={openSection === "steps"} onToggle={() => toggle("steps")} />
            {openSection === "steps" && (
              <div className="space-y-3 px-1">
                <Field label="Гарчиг"><Input value={config.stepsTitle} onChange={(e) => set("stepsTitle", e.target.value)} /></Field>
                {config.steps.map((s, i) => (
                  <div key={i} className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-500">Алхам {i + 1}</span>
                      <button onClick={() => removeStep(i)} className="text-xs text-rose-400 hover:text-rose-600">✕</button>
                    </div>
                    <Input value={s.title} onChange={(e) => setStep(i, "title", e.target.value)} placeholder="Гарчиг" />
                    <Input value={s.desc} onChange={(e) => setStep(i, "desc", e.target.value)} placeholder="Тайлбар" />
                  </div>
                ))}
                <Button size="sm" variant="secondary" onClick={addStep} className="w-full">+ Алхам нэмэх</Button>
              </div>
            )}

            {/* Stats */}
            <SectionHeader id="stats" title="Статистик" open={openSection === "stats"} onToggle={() => toggle("stats")} />
            {openSection === "stats" && (
              <div className="space-y-2 px-1">
                {config.stats.map((s, i) => (
                  <div key={i} className="flex gap-2">
                    <Input value={s.num} onChange={(e) => setStat(i, "num", e.target.value)} placeholder="1,200+" className="w-24 shrink-0" />
                    <Input value={s.label} onChange={(e) => setStat(i, "label", e.target.value)} placeholder="Төгсөгч" className="flex-1" />
                  </div>
                ))}
              </div>
            )}

            {/* Instructors */}
            <SectionHeader id="instructors" title="Багш нар" open={openSection === "instructors"} onToggle={() => toggle("instructors")} />
            {openSection === "instructors" && (
              <div className="space-y-3 px-1">
                <Field label="Гарчиг"><Input value={config.instructorsTitle} onChange={(e) => set("instructorsTitle", e.target.value)} /></Field>
                {config.instructors.map((inst, i) => (
                  <div key={i} className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-slate-500">#{i + 1}</span>
                      <button onClick={() => removeInstructor(i)} className="text-xs text-rose-400 hover:text-rose-600">✕</button>
                    </div>
                    <Input value={inst.name} onChange={(e) => setInstructor(i, "name", e.target.value)} placeholder="Нэр" />
                    <div className="grid grid-cols-2 gap-1.5">
                      <Input value={inst.subject} onChange={(e) => setInstructor(i, "subject", e.target.value)} placeholder="Сэдэв" />
                      <Input value={inst.exp} onChange={(e) => setInstructor(i, "exp", e.target.value)} placeholder="5 жил" />
                    </div>
                  </div>
                ))}
                <Button size="sm" variant="secondary" onClick={addInstructor} className="w-full">+ Багш нэмэх</Button>
              </div>
            )}

            {/* Testimonials */}
            <SectionHeader id="testimonials" title="Сэтгэгдэл" open={openSection === "testimonials"} onToggle={() => toggle("testimonials")} />
            {openSection === "testimonials" && (
              <div className="space-y-3 px-1">
                {config.testimonials.map((t, i) => (
                  <div key={i} className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-slate-500">#{i + 1}</span>
                      <button onClick={() => removeTestimonial(i)} className="text-xs text-rose-400 hover:text-rose-600">✕</button>
                    </div>
                    <Textarea rows={2} value={t.text} onChange={(e) => setTestimonial(i, "text", e.target.value)} placeholder="Сэтгэгдэл..." />
                    <div className="grid grid-cols-2 gap-1.5">
                      <Input value={t.name} onChange={(e) => setTestimonial(i, "name", e.target.value)} placeholder="Нэр" />
                      <Input value={t.result} onChange={(e) => setTestimonial(i, "result", e.target.value)} placeholder="Үр дүн" />
                    </div>
                  </div>
                ))}
                <Button size="sm" variant="secondary" onClick={addTestimonial} className="w-full">+ Сэтгэгдэл нэмэх</Button>
              </div>
            )}

            {/* CTA */}
            <SectionHeader id="cta" title="CTA / Холбоо" open={openSection === "cta"} onToggle={() => toggle("cta")} />
            {openSection === "cta" && (
              <div className="space-y-3 px-1">
                <Field label="CTA гарчиг"><Input value={config.ctaText} onChange={(e) => set("ctaText", e.target.value)} /></Field>
                <Field label="CTA дэд текст"><Input value={config.ctaSubtext} onChange={(e) => set("ctaSubtext", e.target.value)} /></Field>
                <div className="grid grid-cols-2 gap-2">
                  <Field label="Утас"><Input value={config.phone} onChange={(e) => set("phone", e.target.value)} /></Field>
                  <Field label="И-мэйл"><Input value={config.email} onChange={(e) => set("email", e.target.value)} /></Field>
                </div>
                <Field label="Хаяг"><Input value={config.address} onChange={(e) => set("address", e.target.value)} /></Field>
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
          <FutureAnimatedPage config={config} />
        </div>
      </Panel>
    </PanelGroup>
  );
}
