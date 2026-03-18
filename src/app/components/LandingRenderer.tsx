/**
 * Landing/Template-н бүтцийг бодит вэбсайт шиг render хийх shared component.
 * PublicRenderPage болон TemplatePreview хоёуланд ашиглана.
 */
import { safeJsonParse } from "../utils/format";

export type RendererPage = {
  id: number;
  title: string;
  path: string;
  orderIndex: number;
  sections: RendererSection[];
};

export type RendererSection = {
  id: number;
  sectionKey: string;
  title: string | null;
  orderIndex: number;
  components: RendererComponent[];
};

export type RendererComponent = {
  id: number;
  componentType: string;
  propsJson: string | null;
  orderIndex: number;
};

// ── Component renderers ──────────────────────────────────────────────────────

function RenderText({ p }: { p: Record<string, unknown> }) {
  return (
    <div
      style={{
        fontSize: String(p.fontSize ?? "16px"),
        fontWeight: String(p.fontWeight ?? "normal"),
        color: String(p.color ?? "#111827"),
        textAlign: (p.align as "left" | "center" | "right") ?? "left",
        lineHeight: 1.7,
        whiteSpace: "pre-wrap",
      }}
    >
      {String(p.text ?? "")}
    </div>
  );
}

function RenderImage({ p }: { p: Record<string, unknown> }) {
  return (
    <img
      src={String(p.src ?? "https://placehold.co/800x400")}
      alt={String(p.alt ?? "")}
      style={{
        width: String(p.width ?? "100%"),
        borderRadius: String(p.borderRadius ?? "8px"),
        maxWidth: "100%",
        objectFit: "cover",
      }}
      onError={(e) => {
        (e.target as HTMLImageElement).src = "https://placehold.co/800x400?text=Зураг";
      }}
    />
  );
}

function RenderButton({ p }: { p: Record<string, unknown> }) {
  const variant = String(p.variant ?? "primary");
  const size = String(p.size ?? "md");
  const variantCls =
    variant === "primary"   ? "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
    : variant === "outline" ? "border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
    : variant === "ghost"   ? "text-blue-600 hover:bg-blue-50"
    :                         "bg-slate-200 text-slate-800 hover:bg-slate-300";
  const sizeCls =
    size === "lg" ? "px-8 py-3.5 text-base"
    : size === "sm" ? "px-4 py-1.5 text-sm"
    :                 "px-6 py-2.5 text-sm";
  return (
    <div className={p.fullWidth ? "w-full" : ""}>
      <a
        href={String(p.href ?? "#")}
        onClick={(e) => e.preventDefault()}
        className={`inline-flex items-center justify-center font-semibold rounded-xl transition-all ${variantCls} ${sizeCls} ${p.fullWidth ? "w-full" : ""}`}
      >
        {String(p.label ?? "Товч")}
      </a>
    </div>
  );
}

function RenderList({ p }: { p: Record<string, unknown> }) {
  const items = Array.isArray(p.items) ? (p.items as string[]) : [];
  const style = String(p.style ?? "bullet");
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-slate-700">
          <span className="mt-0.5 text-blue-600 font-semibold shrink-0">
            {style === "numbered" ? `${i + 1}.` : style === "check" ? "✓" : style === "none" ? "" : "•"}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function RenderForm({ p }: { p: Record<string, unknown> }) {
  type F = { name: string; label: string; type: string; required?: boolean };
  const fields = Array.isArray(p.fields) ? (p.fields as F[]) : [];
  return (
    <div className="space-y-4 max-w-lg mx-auto">
      {p.title && <div className="text-xl font-bold text-slate-900">{String(p.title)}</div>}
      {fields.map((f) => (
        <div key={f.name} className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-700">
            {f.label} {f.required && <span className="text-rose-500">*</span>}
          </label>
          {f.type === "textarea" ? (
            <textarea rows={4} disabled className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm bg-slate-50" />
          ) : (
            <input type={f.type} disabled className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm bg-slate-50" />
          )}
        </div>
      ))}
      <div className="w-full rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white text-center">
        {String(p.submitLabel ?? "Илгээх")}
      </div>
    </div>
  );
}

function RenderVideo({ p }: { p: Record<string, unknown> }) {
  return (
    <div className="overflow-hidden rounded-2xl w-full" style={{ aspectRatio: String(p.aspectRatio ?? "16/9") }}>
      <iframe src={String(p.src ?? "")} title={String(p.title ?? "Видео")} className="w-full h-full" />
    </div>
  );
}

function RenderGallery({ p }: { p: Record<string, unknown> }) {
  type G = { src: string; alt?: string };
  const images = Array.isArray(p.images) ? (p.images as G[]) : [];
  const cols = Number(p.columns ?? 3);
  return (
    <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
      {images.map((img, i) => (
        <img key={i} src={img.src} alt={img.alt ?? ""} className="w-full h-48 object-cover rounded-xl"
          onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/400x300?text=Зураг"; }} />
      ))}
    </div>
  );
}

function RenderComponent({ type, propsJson }: { type: string; propsJson: string | null }) {
  const p = safeJsonParse<Record<string, unknown>>(propsJson, {});
  switch (type) {
    case "TEXT":    return <RenderText p={p} />;
    case "IMAGE":   return <RenderImage p={p} />;
    case "BUTTON":  return <RenderButton p={p} />;
    case "LIST":    return <RenderList p={p} />;
    case "FORM":    return <RenderForm p={p} />;
    case "VIDEO":   return <RenderVideo p={p} />;
    case "GALLERY": return <RenderGallery p={p} />;
    case "MAP":
      return (
        <div className="overflow-hidden rounded-2xl w-full h-72">
          <iframe
            src={`https://maps.google.com/maps?q=${p.lat ?? 47.9184676},${p.lng ?? 106.9177016}&z=${p.zoom ?? 14}&output=embed`}
            className="w-full h-full border-0" loading="lazy" title="Байршил" />
        </div>
      );
    case "DIVIDER":
      return <hr style={{ borderColor: String(p.color ?? "#e5e7eb"), borderTopWidth: String(p.thickness ?? "1px") }} />;
    case "SPACER":
      return <div style={{ height: String(p.height ?? "40px") }} />;
    default:
      return null;
  }
}

// ── Section padding / background ─────────────────────────────────────────────

const SECTION_PADDING: Record<string, string> = {
  hero: "py-20 md:py-28", features: "py-16", about: "py-16",
  pricing: "py-16", faq: "py-16", contact: "py-16",
  gallery: "py-12", team: "py-16", testimonials: "py-16", cta: "py-16",
};
const SECTION_BG: Record<string, string> = {
  hero: "bg-white", features: "bg-slate-50", about: "bg-white",
  pricing: "bg-slate-50", faq: "bg-white", contact: "bg-slate-50",
  gallery: "bg-white", team: "bg-slate-50", testimonials: "bg-white",
  cta: "bg-blue-600",
};

// ── Main export ───────────────────────────────────────────────────────────────

export function LandingRenderer({ pages }: { pages: RendererPage[] }) {
  const firstPage = pages.slice().sort((a, b) => a.orderIndex - b.orderIndex)[0];
  if (!firstPage) return null;

  const sections = firstPage.sections.slice().sort((a, b) => a.orderIndex - b.orderIndex);

  return (
    <div className="font-sans antialiased">
      {sections.map((section) => {
        const padding = SECTION_PADDING[section.sectionKey] ?? "py-16";
        const bg = SECTION_BG[section.sectionKey] ?? "bg-white";
        const isCta = section.sectionKey === "cta";
        return (
          <section key={section.id} id={section.sectionKey} className={`${bg} ${padding} px-4`}>
            <div className="mx-auto max-w-3xl space-y-6">
              {section.components
                .slice()
                .sort((a, b) => a.orderIndex - b.orderIndex)
                .map((c) => (
                  <div key={c.id} className={isCta ? "text-white [&_a]:bg-white [&_a]:text-blue-600" : ""}>
                    <RenderComponent type={c.componentType} propsJson={c.propsJson} />
                  </div>
                ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

// ── schemaJson → RendererPage[] parse ────────────────────────────────────────

export function parseSchemaJson(schemaJson: string | null): RendererPage[] {
  if (!schemaJson) return [];
  try {
    const root = JSON.parse(schemaJson) as { pages?: unknown[] };
    const rawPages = Array.isArray(root.pages) ? root.pages : [];
    return rawPages.map((rp: any, pi) => ({
      id: pi,
      title: String(rp.title ?? "Хуудас"),
      path: String(rp.path ?? "/"),
      orderIndex: Number(rp.orderIndex ?? pi),
      sections: Array.isArray(rp.sections)
        ? rp.sections.map((rs: any, si: number) => ({
            id: si,
            sectionKey: String(rs.sectionKey ?? "section"),
            title: rs.title ?? null,
            orderIndex: Number(rs.orderIndex ?? si),
            components: Array.isArray(rs.components)
              ? rs.components.map((rc: any, ci: number) => ({
                  id: ci,
                  componentType: String(rc.componentType ?? "TEXT"),
                  propsJson: rc.propsJson
                    ? typeof rc.propsJson === "string"
                      ? rc.propsJson
                      : JSON.stringify(rc.propsJson)
                    : null,
                  orderIndex: Number(rc.orderIndex ?? ci),
                }))
              : [],
          }))
        : [],
    }));
  } catch {
    return [];
  }
}
