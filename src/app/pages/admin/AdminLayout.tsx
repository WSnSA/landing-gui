import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui";
import { useAuth } from "../../auth/AuthContext";
import { useEffect } from "react";

function AdminNavItem({ to, label }: { to: string; label: string }) {
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

export default function AdminLayout() {
  const { me, logout } = useAuth();
  const nav = useNavigate();
  const isAdmin = String(me?.role).includes("ADMIN");

  useEffect(() => {
    if (me !== undefined && !isAdmin) nav("/marketplace", { replace: true });
  }, [me, isAdmin, nav]);

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link to="/marketplace" className="flex items-center gap-2 font-bold text-slate-900">
              <div className="h-7 w-7 rounded-lg bg-blue-600" />
              <span className="hidden sm:block">Landing.mn</span>
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-sm font-semibold text-slate-500">Admin панел</span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/marketplace"
              className="hidden md:block text-sm text-slate-500 hover:text-slate-800 transition"
            >
              ← Marketplace
            </Link>
            <span className="hidden sm:block text-xs text-slate-400">{me?.fullName}</span>
            <Button variant="ghost" size="sm" onClick={logout}>Гарах</Button>
          </div>
        </div>

        <div className="border-t border-slate-100 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-2 flex items-center gap-1">
            <span className="text-xs text-slate-400 font-medium px-1 mr-1">Admin:</span>
            <AdminNavItem to="/admin/users" label="Хэрэглэгчид" />
            <AdminNavItem to="/admin/payments" label="Төлбөрүүд" />
            <AdminNavItem to="/admin/templates" label="Templates" />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
