import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { publicService } from "../../services/publicService";
import type { PublicLandingResponse } from "../../types/dto";
import { safeJsonParse } from "../../utils/format";
import CafeAnimatedPage from "../../templates/cafe/CafeAnimatedPage";
import { DEFAULT_CAFE_CONFIG } from "../../templates/cafe/CafeConfig";
import type { CafeConfig } from "../../templates/cafe/CafeConfig";
import HyperdriveAnimatedPage from "../../templates/hyperdrive/HyperdriveAnimatedPage";
import { DEFAULT_HYPERDRIVE_CONFIG } from "../../templates/hyperdrive/HyperdriveConfig";
import type { HyperdriveConfig } from "../../templates/hyperdrive/HyperdriveConfig";
import FutureAnimatedPage from "../../templates/future/FutureAnimatedPage";
import { DEFAULT_FUTURE_CONFIG } from "../../templates/future/FutureConfig";
import type { FutureConfig } from "../../templates/future/FutureConfig";

// ── Component render ─────────────────────────────────────────────────────────

function RenderText({ props }: { props: Record<string, unknown> }) {
  return (
    <div
      style={{
        fontSize: String(props.fontSize ?? "16px"),
        fontWeight: String(props.fontWeight ?? "normal"),
        color: String(props.color ?? "#111827"),
        textAlign: (props.align as "left" | "center" | "right") ?? "left",
        lineHeight: 1.7,
        whiteSpace: "pre-wrap",
      }}
    >
      {String(props.text ?? "")}
    </div>
  );
}

function RenderImage({ props }: { props: Record<string, unknown> }) {
  return (
    <img
      src={String(props.src ?? "https://placehold.co/800x400")}
      alt={String(props.alt ?? "")}
      style={{
        width: String(props.width ?? "100%"),
        borderRadius: String(props.borderRadius ?? "8px"),
        maxWidth: "100%",
        objectFit: "cover",
      }}
      onError={(e) => {
        (e.target as HTMLImageElement).src = "https://placehold.co/800x400?text=Зураг";
      }}
    />
  );
}

function RenderButton({ props }: { props: Record<string, unknown> }) {
  const variant = String(props.variant ?? "primary");
  const size = String(props.size ?? "md");

  const base = "inline-flex items-center justify-center font-semibold rounded-xl transition-all";
  const variantCls =
    variant === "primary"
      ? "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
      : variant === "outline"
      ? "border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
      : variant === "ghost"
      ? "text-blue-600 hover:bg-blue-50"
      : "bg-slate-200 text-slate-800 hover:bg-slate-300";
  const sizeCls =
    size === "lg"
      ? "px-8 py-3.5 text-base"
      : size === "sm"
      ? "px-4 py-1.5 text-sm"
      : "px-6 py-2.5 text-sm";

  return (
    <div className={props.fullWidth ? "w-full" : ""}>
      <a
        href={String(props.href ?? "#")}
        className={`${base} ${variantCls} ${sizeCls} ${props.fullWidth ? "w-full" : ""}`}
      >
        {String(props.label ?? "Товч")}
      </a>
    </div>
  );
}

function RenderList({ props }: { props: Record<string, unknown> }) {
  const items = Array.isArray(props.items) ? (props.items as string[]) : [];
  const style = String(props.style ?? "bullet");
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

function RenderForm({ props }: { props: Record<string, unknown> }) {
  type FormField = { name: string; label: string; type: string; required?: boolean };
  const fields = Array.isArray(props.fields) ? (props.fields as FormField[]) : [];

  return (
    <form
      className="space-y-4 max-w-lg mx-auto"
      onSubmit={(e) => {
        e.preventDefault();
        alert("Мессеж илгээгдлээ. Баярлалаа!");
      }}
    >
      {props.title && (
        <div className="text-xl font-bold text-slate-900">{String(props.title)}</div>
      )}
      {fields.map((f) => (
        <div key={f.name} className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-700">
            {f.label} {f.required && <span className="text-rose-500">*</span>}
          </label>
          {f.type === "textarea" ? (
            <textarea
              name={f.name}
              required={f.required}
              rows={4}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <input
              type={f.type}
              name={f.name}
              required={f.required}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
        </div>
      ))}
      <button
        type="submit"
        className="w-full rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition"
      >
        {String(props.submitLabel ?? "Илгээх")}
      </button>
    </form>
  );
}

function RenderVideo({ props }: { props: Record<string, unknown> }) {
  return (
    <div
      className="overflow-hidden rounded-2xl w-full"
      style={{ aspectRatio: String(props.aspectRatio ?? "16/9") }}
    >
      <iframe
        src={String(props.src ?? "")}
        title={String(props.title ?? "Видео")}
        className="w-full h-full"
        allowFullScreen
      />
    </div>
  );
}

function RenderMap({ props }: { props: Record<string, unknown> }) {
  const lat = Number(props.lat ?? 47.9184676);
  const lng = Number(props.lng ?? 106.9177016);
  const zoom = Number(props.zoom ?? 14);
  return (
    <div className="overflow-hidden rounded-2xl w-full h-72">
      <iframe
        src={`https://maps.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`}
        className="w-full h-full border-0"
        loading="lazy"
        title={String(props.label ?? "Байршил")}
      />
    </div>
  );
}

function RenderGallery({ props }: { props: Record<string, unknown> }) {
  type GalleryItem = { src: string; alt?: string };
  const images = Array.isArray(props.images) ? (props.images as GalleryItem[]) : [];
  const cols = Number(props.columns ?? 3);
  return (
    <div
      className="grid gap-3"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {images.map((img, i) => (
        <img
          key={i}
          src={img.src}
          alt={img.alt ?? ""}
          className="w-full h-48 object-cover rounded-xl"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://placehold.co/400x300?text=Зураг";
          }}
        />
      ))}
    </div>
  );
}

function RenderComponent({ type, propsJson }: { type: string; propsJson: string | null }) {
  const props = safeJsonParse<Record<string, unknown>>(propsJson, {});

  switch (type) {
    case "TEXT":     return <RenderText props={props} />;
    case "IMAGE":    return <RenderImage props={props} />;
    case "BUTTON":   return <RenderButton props={props} />;
    case "LIST":     return <RenderList props={props} />;
    case "FORM":     return <RenderForm props={props} />;
    case "VIDEO":    return <RenderVideo props={props} />;
    case "MAP":      return <RenderMap props={props} />;
    case "GALLERY":  return <RenderGallery props={props} />;
    case "DIVIDER":
      return (
        <hr
          style={{
            borderColor: String(props.color ?? "#e5e7eb"),
            borderTopWidth: String(props.thickness ?? "1px"),
          }}
        />
      );
    case "SPACER":
      return <div style={{ height: String(props.height ?? "40px") }} />;
    default:
      return null;
  }
}

// ── Section wrapper ──────────────────────────────────────────────────────────

const SECTION_PADDING: Record<string, string> = {
  hero:         "py-20 md:py-28",
  features:     "py-16",
  about:        "py-16",
  pricing:      "py-16",
  faq:          "py-16",
  contact:      "py-16",
  gallery:      "py-12",
  team:         "py-16",
  testimonials: "py-16",
  cta:          "py-16",
};

const SECTION_BG: Record<string, string> = {
  hero:         "bg-white",
  features:     "bg-slate-50",
  about:        "bg-white",
  pricing:      "bg-slate-50",
  faq:          "bg-white",
  contact:      "bg-slate-50",
  gallery:      "bg-white",
  team:         "bg-slate-50",
  testimonials: "bg-white",
  cta:          "bg-blue-600",
};

// ── Үндсэн Public Page ───────────────────────────────────────────────────────

export default function PublicRenderPage() {
  const { slug } = useParams<{ slug: string }>();
  const [data, setData] = useState<PublicLandingResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    publicService
      .bySlug(slug)
      .then(setData)
      .catch(() => setError("Вэбсайт олдсонгүй эсвэл нийтлэгдээгүй байна."));
  }, [slug]);

  // Animated template шалгах
  const configObj = safeJsonParse<Record<string, unknown>>(data?.configJson ?? null, {});
  const isAnimatedCafe = configObj.__type === "animated_cafe";
  const isDrivingCenter = configObj.__type === "driving_center";
  const isEducationCenter = configObj.__type === "education_center";

  // SEO meta + favicon
  useEffect(() => {
    if (!data) return;
    document.title = data.seoTitle || data.name;
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (meta && data.seoDescription) meta.content = data.seoDescription;

    // Favicon: animated template-д brandLogo ашиглана
    const logoUrl = (isAnimatedCafe || isDrivingCenter || isEducationCenter) ? (configObj.brandLogo as string | undefined) : null;
    if (logoUrl) {
      let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.href = logoUrl;
    }
  }, [data, isAnimatedCafe, isDrivingCenter, isEducationCenter, configObj.brandLogo]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="text-6xl font-black text-slate-200">404</div>
          <div className="mt-4 text-lg font-semibold text-slate-700">Вэбсайт олдсонгүй</div>
          <div className="mt-2 text-sm text-slate-500">{error}</div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-sm text-slate-400">Ачаалж байна...</div>
      </div>
    );
  }

  if (isAnimatedCafe) {
    const cafeConfig: CafeConfig = { ...DEFAULT_CAFE_CONFIG, ...configObj } as CafeConfig;
    return <CafeAnimatedPage config={cafeConfig} />;
  }

  if (isDrivingCenter) {
    const hdConfig: HyperdriveConfig = { ...DEFAULT_HYPERDRIVE_CONFIG, ...configObj } as HyperdriveConfig;
    return <HyperdriveAnimatedPage config={hdConfig} />;
  }

  if (isEducationCenter) {
    const ftConfig: FutureConfig = { ...DEFAULT_FUTURE_CONFIG, ...configObj } as FutureConfig;
    return <FutureAnimatedPage config={ftConfig} />;
  }

  // Эхний page-г render хийнэ (multi-page дараа нэмж болно)
  const firstPage = data.pages
    .slice()
    .sort((a, b) => a.orderIndex - b.orderIndex)[0];

  if (!firstPage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-sm text-slate-400">Агуулга байхгүй байна.</div>
      </div>
    );
  }

  const sections = firstPage.sections.slice().sort((a, b) => a.orderIndex - b.orderIndex);

  return (
    <div className="min-h-screen font-sans antialiased">
      {sections.map((section) => {
        const padding = SECTION_PADDING[section.sectionKey] ?? "py-16";
        const bg = SECTION_BG[section.sectionKey] ?? "bg-white";
        const isCta = section.sectionKey === "cta";

        return (
          <section
            key={section.id}
            id={section.sectionKey}
            className={`${bg} ${padding} px-4`}
          >
            <div className="mx-auto max-w-3xl space-y-6">
              {section.components
                .slice()
                .sort((a, b) => a.orderIndex - b.orderIndex)
                .map((c) => (
                  <div
                    key={c.id}
                    className={isCta ? "text-white [&_a]:bg-white [&_a]:text-blue-600 [&_a:hover]:bg-blue-50" : ""}
                  >
                    <RenderComponent type={c.componentType} propsJson={c.propsJson} />
                  </div>
                ))}
            </div>
          </section>
        );
      })}

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 px-4 text-center text-xs text-slate-400">
        Powered by <span className="font-semibold text-blue-600">Landing.mn</span>
      </footer>
    </div>
  );
}
