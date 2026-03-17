import { useEffect, useMemo, useState } from "react";
import { Button, Card, Field, Input, Modal } from "../../components/ui";
import { adminUserService } from "../../services/adminUserService";
import type { RegisterRequest, UserSummaryResponse } from "../../types/dto";
import { ApiError } from "../../services/apiClient";

function isAdmin(u: UserSummaryResponse) {
  return String(u.role ?? "").toUpperCase().includes("ADMIN");
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserSummaryResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<RegisterRequest>({
    fullname: "",
    email: "",
    registerNumber: "",
    phone: "",
    password: "",
    confirmPassword: "",
    terms: true,
  });
  const [saving, setSaving] = useState(false);

  const admins = useMemo(() => users.filter(isAdmin), [users]);
  const nonAdmins = useMemo(() => users.filter((u) => !isAdmin(u)), [users]);

  const load = async () => {
    setLoading(true);
    setErr(null);
    try {
      const list = await adminUserService.listUsers();
      setUsers(list);
    } catch (e: any) {
      if (e instanceof ApiError) setErr(`${e.status}: ${String(e.message)}`);
      else setErr("Алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const createAdmin = async () => {
    setSaving(true);
    setErr(null);
    try {
      await adminUserService.createAdmin({ ...form, terms: true });
      setOpen(false);
      setForm({ fullname: "", email: "", registerNumber: "", phone: "", password: "", confirmPassword: "", terms: true });
      await load();
    } catch (e: any) {
      if (e instanceof ApiError) setErr(`${e.status}: ${String(e.message)}`);
      else setErr("Алдаа гарлаа");
    } finally {
      setSaving(false);
    }
  };

  const promote = async (u: UserSummaryResponse) => {
    if (!confirm(`${u.email} хэрэглэгчийг ADMIN болгох уу?`)) return;
    setErr(null);
    try {
      await adminUserService.promoteAdmin(u.id);
      await load();
    } catch (e: any) {
      if (e instanceof ApiError) setErr(`${e.status}: ${String(e.message)}`);
      else setErr("Алдаа гарлаа");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-xl font-semibold text-slate-900">Admin Users</div>
          <div className="text-sm text-slate-600">Админ хэрэглэгч үүсгэх, хэрэглэгчийг админ болгох.</div>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={load} loading={loading}>Refresh</Button>
          <Button onClick={() => setOpen(true)}>+ Create Admin</Button>
        </div>
      </div>

      {err ? (
        <Card className="p-4 border-rose-200 bg-rose-50">
          <div className="text-sm text-rose-700">{err}</div>
        </Card>
      ) : null}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-5">
          <div className="text-sm font-semibold text-slate-900">Admins</div>
          <div className="mt-3 space-y-2">
            {admins.length === 0 ? (
              <div className="text-sm text-slate-600">Админ хэрэглэгч олдсонгүй.</div>
            ) : (
              admins.map((u) => (
                <div key={u.id} className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 p-3">
                  <div>
                    <div className="text-sm font-medium text-slate-900">{u.fullName || "(no name)"}</div>
                    <div className="text-xs text-slate-600">{u.email} • {String(u.role)}</div>
                  </div>
                  <div className="text-xs rounded-full bg-blue-100 text-blue-700 px-2 py-1">ADMIN</div>
                </div>
              ))
            )}
          </div>
        </Card>

        <Card className="p-5">
          <div className="text-sm font-semibold text-slate-900">Users</div>
          <div className="mt-3 space-y-2">
            {nonAdmins.length === 0 ? (
              <div className="text-sm text-slate-600">Админ биш хэрэглэгч олдсонгүй.</div>
            ) : (
              nonAdmins.map((u) => (
                <div key={u.id} className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 p-3">
                  <div>
                    <div className="text-sm font-medium text-slate-900">{u.fullName || "(no name)"}</div>
                    <div className="text-xs text-slate-600">{u.email} • {String(u.role)}</div>
                  </div>
                  <Button size="sm" variant="secondary" onClick={() => promote(u)}>Promote</Button>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

      <Modal
        open={open}
        title="Create Admin"
        onClose={() => !saving && setOpen(false)}
        footer={(
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setOpen(false)} disabled={saving}>Cancel</Button>
            <Button onClick={createAdmin} loading={saving}>Create</Button>
          </div>
        )}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Full name">
            <Input value={form.fullname} onChange={(e) => setForm({ ...form, fullname: e.target.value })} placeholder="Admin Name" />
          </Field>
          <Field label="Email">
            <Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="admin@mail.com" />
          </Field>
          <Field label="Register number">
            <Input value={form.registerNumber} onChange={(e) => setForm({ ...form, registerNumber: e.target.value })} placeholder="AA12345678" />
          </Field>
          <Field label="Phone">
            <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="99999999" />
          </Field>
          <Field label="Password">
            <Input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </Field>
          <Field label="Confirm password">
            <Input type="password" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} />
          </Field>
        </div>
        <div className="mt-4 text-xs text-slate-500">
          * Энэ API нь зөвхөн ADMIN эрхтэй хэрэглэгчээр нэвтэрсэн үед ажиллана.
        </div>
      </Modal>
    </div>
  );
}
