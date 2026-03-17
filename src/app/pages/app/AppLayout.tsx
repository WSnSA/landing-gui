import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import { Button, Select } from "../../components/ui";
import { landingService } from "../../services/landingService";
import type { LandingResponse } from "../../types/dto";
import { useAuth } from "../../auth/AuthContext";

function NavItem({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
          isActive
            ? "bg-blue-600 text-white"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        }`
      }
    >
      {label}
    </NavLink>
  );
}

export default function AppLayout() {
  const { projectId } = useParams();
  const id = Number(projectId);
  const nav = useNavigate();
  const { me, logout } = useAuth();

  const [landings, setLandings] = useState<LandingResponse[]>([]);
  const current = useMemo(() => landings.find((x) => x.id === id) || null, [landings, id]);

  const load = async () => {
    const list = await landingService.list();
    setLandings(list);
  };

  useEffect(() => { load(); }, []);
  useEffect(() => {
    if (!Number.isFinite(id)) nav("/marketplace", { replace: true });
  }, [id, nav]);

  const publicUrl = current ? `${window.location.origin}/p/${current.slug}` : null;
  const isAdmin = String(me?.role).includes("ADMIN");

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── System topbar ─────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6 h-14 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/marketplace" className="flex items-center gap-2 font-bold text-slate-900 shrink-0">
            <div className="h-7 w-7 rounded-lg bg-blue-600" />
            <span className="hidden sm:block">Landing.mn</span>
          </Link>

          {/* Site selector */}
          <div className="flex items-center gap-2 flex-1 min-w-0 max-w-sm">
            <Select
              value={String(id)}
              onChange={(e) => nav(`/app/${e.target.value}`, { replace: true })}
              className="text-sm"
            >
              {landings.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.name}
                </option>
              ))}
            </Select>
            {current?.status === "PUBLISHED" && publicUrl && (
              <a
                href={publicUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-1.5 rounded-lg border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700 hover:bg-green-100 transition shrink-0"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                Нийтлэгдсэн
              </a>
            )}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3 shrink-0">
            <Link to="/marketplace" className="hidden md:block text-sm font-medium text-blue-600 hover:text-blue-700 transition">
              + Шинэ сайт
            </Link>
            <Link to="/my-sites" className="hidden md:block text-sm text-slate-500 hover:text-slate-800 transition">
              Миний сайтууд
            </Link>
            <span className="hidden sm:block text-xs text-slate-400">{me?.fullName}</span>
            <Button variant="ghost" size="sm" onClick={logout}>Гарах</Button>
          </div>
        </div>

        {/* ── Navigation bar ───────────────────────────────────────── */}
        <div className="border-t border-slate-100 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-2 flex items-center gap-1 flex-wrap">
            <NavItem to={`/app/${id}`} label="Dashboard" />
            <NavItem to={`/app/${id}/editor`} label="Засах" />
            <NavItem to={`/app/${id}/preview`} label="Preview" />
            <NavItem to={`/app/${id}/templates`} label="Templates" />
            <NavItem to={`/app/${id}/settings`} label="Тохиргоо" />
            <NavItem to={`/app/${id}/billing`} label="Billing" />

            {isAdmin && (
              <>
                <span className="my-auto mx-1 h-4 w-px bg-slate-200" />
                <span className="text-xs text-slate-400 font-medium px-1">Admin:</span>
                <NavItem to={`/app/${id}/admin/users`} label="Хэрэглэгчид" />
                <NavItem to={`/app/${id}/admin/payments`} label="Төлбөрүүд" />
                <NavItem to={`/app/${id}/admin/templates`} label="Templates" />
              </>
            )}
          </div>
        </div>
      </header>

      {/* ── Main content ─────────────────────────────────────────── */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        {!current ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
            Ачаалж байна…
          </div>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
}
