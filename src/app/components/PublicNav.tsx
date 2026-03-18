import { Link } from "react-router-dom";

export default function PublicNav() {
  return (
    <header className="sticky top-0 z-50 bg-white/60 backdrop-blur-2xl border-b border-white/70 shadow-sm">
      <div className="mx-auto max-w-7xl px-6 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-slate-900">
          <div className="h-7 w-7 rounded-lg bg-blue-600 shadow-sm" />
          <span className="text-base">Landing.mn</span>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-1">
          <a href="/#features" className="rounded-lg px-3 py-1.5 text-sm text-slate-600 hover:text-slate-900 hover:bg-white/70 transition">Боломжууд</a>
          <a href="/#how" className="rounded-lg px-3 py-1.5 text-sm text-slate-600 hover:text-slate-900 hover:bg-white/70 transition">Хэрхэн</a>
          <Link to="/contact" className="rounded-lg px-3 py-1.5 text-sm text-slate-600 hover:text-slate-900 hover:bg-white/70 transition">Холбоо барих</Link>
        </nav>

        {/* Auth */}
        <div className="flex items-center gap-2">
          {/* Ghost glass button */}
          <Link
            to="/login"
            className="rounded-xl bg-white/60 backdrop-blur-md border border-white/80 px-4 py-1.5 text-sm font-medium text-slate-700 hover:bg-white/90 transition shadow-sm"
          >
            Нэвтрэх
          </Link>
          {/* Primary solid button */}
          <Link
            to="/register"
            className="rounded-xl bg-blue-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-blue-700 transition shadow-sm"
          >
            Үнэгүй эхлэх
          </Link>
        </div>
      </div>
    </header>
  );
}
