import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card } from "../../../components/ui";
import { landingService } from "../../../services/landingService";
import { pageService } from "../../../services/pageService";
import { sectionService } from "../../../services/sectionService";
import { componentService } from "../../../services/componentService";
import { publicService } from "../../../services/publicService";
import type { ComponentResponse, LandingResponse, PageResponse, PublicLandingResponse, SectionResponse } from "../../../types/dto";
import { safeJsonParse } from "../../../utils/format";

type Tree = {
  landing: LandingResponse;
  pages: Array<{
    page: PageResponse;
    sections: Array<{
      section: SectionResponse;
      components: ComponentResponse[];
    }>;
  }>;
};

function renderComponent(type: string, propsJson: string | null) {
  const props = safeJsonParse<any>(propsJson, {});
  if (type === "TEXT") return <p className="text-slate-700">{props.text ?? "…"}</p>;
  if (type === "BUTTON") return (
    <a className="inline-flex rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
       href={props.href ?? "#"}>{props.label ?? "Button"}</a>
  );
  if (type === "IMAGE") return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
      IMAGE: {props.src ?? "(src байхгүй)"}
    </div>
  );
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 text-sm">
      <div className="font-medium">{type}</div>
      <pre className="mt-2 text-xs overflow-auto">{JSON.stringify(props, null, 2)}</pre>
    </div>
  );
}

export default function PreviewPage() {
  const { projectId } = useParams();
  const id = Number(projectId);

  const [landing, setLanding] = useState<LandingResponse | null>(null);
  const [publicData, setPublicData] = useState<PublicLandingResponse | null>(null);
  const [tree, setTree] = useState<Tree | null>(null);
  const [busy, setBusy] = useState(false);

  const load = async () => {
    setBusy(true);
    try {
      const l = await landingService.get(id);
      setLanding(l);

      // Try public preview by slug first (if published)
      try {
        const pub = await publicService.bySlug(l.slug);
        setPublicData(pub);
        setTree(null);
        return;
      } catch {
        setPublicData(null);
      }

      // Internal preview
      const pages = await pageService.list(id);
      const pagesSorted = pages.slice().sort((a, b) => a.orderIndex - b.orderIndex);

      const out: Tree = { landing: l, pages: [] };
      for (const p of pagesSorted) {
        const secs = await sectionService.list(p.id);
        const secsSorted = secs.slice().sort((a, b) => a.orderIndex - b.orderIndex);

        const sNodes: Tree["pages"][0]["sections"] = [];
        for (const s of secsSorted) {
          const comps = await componentService.list(s.id);
          const compsSorted = comps.slice().sort((a, b) => a.orderIndex - b.orderIndex);
          sNodes.push({ section: s, components: compsSorted });
        }
        out.pages.push({ page: p, sections: sNodes });
      }
      setTree(out);
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => { load(); }, [id]);

  const title = useMemo(() => landing?.seoTitle || landing?.name || "Preview", [landing]);

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-3">
        <div>
          <div className="text-xl font-bold">Preview</div>
          <div className="mt-1 text-sm text-slate-600">
            Public endpoint ажиллавал тэрийг нь, үгүй бол дотоод бүтэц дээр render хийнэ.
          </div>
        </div>
        <div className="flex gap-2">
          {landing ? (
            <Button variant="secondary" onClick={() => window.open(`/public/${landing.slug}`, "_blank")}>
              Public link
            </Button>
          ) : null}
          <Button variant="ghost" onClick={load} disabled={busy}>Refresh</Button>
        </div>
      </div>

      <Card className="p-6">
        <div className="text-2xl font-extrabold tracking-tight">{title}</div>
        {landing?.seoDescription ? <div className="mt-2 text-slate-600">{landing.seoDescription}</div> : null}
      </Card>

      {publicData ? (
        <Card className="p-6">
          <div className="text-sm font-semibold">Public render (/{publicData.slug})</div>
          <div className="mt-6 space-y-10">
            {publicData.pages
              .slice()
              .sort((a, b) => a.orderIndex - b.orderIndex)
              .map((p) => (
                <div key={p.id} className="space-y-4">
                  <div className="text-lg font-bold">{p.title}</div>
                  {p.sections
                    .slice()
                    .sort((a, b) => a.orderIndex - b.orderIndex)
                    .map((s) => (
                      <div key={s.id} className="rounded-2xl border border-slate-200 p-5 bg-white">
                        <div className="text-sm font-semibold">{s.title || s.sectionKey}</div>
                        <div className="mt-4 space-y-3">
                          {s.components
                            .slice()
                            .sort((a, b) => a.orderIndex - b.orderIndex)
                            .map((c) => (
                              <div key={c.id}>{renderComponent(c.componentType, c.propsJson)}</div>
                            ))}
                        </div>
                      </div>
                    ))}
                </div>
              ))}
          </div>
        </Card>
      ) : tree ? (
        <Card className="p-6">
          <div className="text-sm font-semibold">Internal render (draft OK)</div>
          <div className="mt-6 space-y-10">
            {tree.pages.map((pn) => (
              <div key={pn.page.id} className="space-y-4">
                <div className="text-lg font-bold">{pn.page.title}</div>
                {pn.sections.map((sn) => (
                  <div key={sn.section.id} className="rounded-2xl border border-slate-200 p-5 bg-white">
                    <div className="text-sm font-semibold">{sn.section.title || sn.section.sectionKey}</div>
                    <div className="mt-4 space-y-3">
                      {sn.components.map((c) => (
                        <div key={c.id}>{renderComponent(c.componentType, c.propsJson)}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Card>
      ) : (
        <Card className="p-6 text-slate-600">Ачаалж байна…</Card>
      )}
    </div>
  );
}
