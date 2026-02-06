import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import { Button, Card, Select } from "../../../components/ui";
import { landingService } from "../../../services/landingService";
import type { LandingResponse } from "../../../types/dto";
import { useAuth } from "../../../auth/AuthContext";

function NavItem({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      end={to.endsWith("")}
      className={({ isActive }) =>
        `rounded-lg px-3 py-2 text-sm font-medium transition ${
          isActive ? "bg-blue-600 text-white" : "text-slate-700 hover:bg-slate-100"
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
    if (!Number.isFinite(id)) nav("/onboarding", { replace: true });
  }, [id, nav]);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between gap-4">
          <Link to="/onboarding" className="flex items-center gap-2 font-semibold">
            <div className="h-8 w-8 rounded-lg bg-blue-600" />
            <span>Landing.mn</span>
          </Link>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-xs text-slate-500">Project</div>
            <Select
              value={String(id)}
              onChange={(e) => nav(`/app/${e.target.value}`, { replace: true })}
              className="min-w-[220px]"
            >
              {landings.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.name} ({l.status})
                </option>
              ))}
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:block text-sm text-slate-600">{me?.email}</div>
            <Button variant="ghost" onClick={logout}>Гарах</Button>
          </div>
        </div>

        <div className="border-t border-slate-200">
          <div className="mx-auto max-w-7xl px-6 py-3 flex flex-wrap gap-2">
            <NavItem to={`/app/${id}`} label="Dashboard" />
            <NavItem to={`/app/${id}/landing`} label="Pages" />
            <NavItem to={`/app/${id}/builder`} label="Builder" />
            <NavItem to={`/app/${id}/preview`} label="Preview" />
            <NavItem to={`/app/${id}/templates`} label="Templates" />
            <NavItem to={`/app/${id}/billing`} label="Billing" />
            <NavItem to={`/app/${id}/analytics`} label="Analytics" />
            <NavItem to={`/app/${id}/settings`} label="Settings" />
            {String(me?.role).includes("ADMIN") ? (
              <NavItem to={`/app/${id}/admin/payments`} label="Admin Payments" />
            ) : null}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        {!current ? (
          <Card className="p-6">
            <div className="text-sm text-slate-600">Project ачаалж байна…</div>
          </Card>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
}
