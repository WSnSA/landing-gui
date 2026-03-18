import { Link } from "react-router-dom";
import CafeAnimatedPage from "../../templates/cafe/CafeAnimatedPage";
import { DEFAULT_CAFE_CONFIG } from "../../templates/cafe/CafeConfig";

export default function CafeTemplateExample() {
  return (
    <div>
      {/* ── Template preview banner ───────────────────────────── */}
      <div className="sticky top-0 z-[100] bg-white border-b border-slate-200 shadow-sm">
        <div className="mx-auto max-w-7xl px-6 py-2.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1">
              🍽️ Template жишээ
            </span>
            <span className="text-sm text-slate-600 hidden sm:inline">
              Энэ загварыг ашиглаад өөрийн нэр, меню, утас, хаягаар солиж нийтлэнэ.
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Link to="/examples" className="text-xs text-slate-500 hover:text-slate-700 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition">
              ← Жишээнүүд
            </Link>
            <Link to="/register"
              className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 transition">
              Энэ template ашиглах →
            </Link>
          </div>
        </div>
      </div>

      {/* ── Actual animated template ──────────────────────────── */}
      <CafeAnimatedPage config={DEFAULT_CAFE_CONFIG} />
    </div>
  );
}
