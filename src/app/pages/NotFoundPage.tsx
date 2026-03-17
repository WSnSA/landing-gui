import { Link } from "react-router-dom";
import PublicNav from "../components/PublicNav";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-white">
      <PublicNav />

      <div className="flex min-h-[calc(100vh-56px)] items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-8xl font-black text-slate-100 mb-4">404</div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Хуудас олдсонгүй</h1>
          <p className="text-slate-500 mb-8">Таны хайсан хуудас байхгүй байна. Буцаж нүүр хуудасруу очно уу.</p>
          <div className="flex justify-center gap-3">
            <Link
              to="/"
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition"
            >
              Нүүр хуудас
            </Link>
            <Link
              to="/marketplace"
              className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
            >
              Dashboard →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
