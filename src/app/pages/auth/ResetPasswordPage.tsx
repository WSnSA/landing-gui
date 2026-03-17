import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button, Card, Field, Input } from "../../components/ui";
import { authService } from "../../services/authService";
import type { ApiError } from "../../services/apiClient";

export default function ResetPasswordPage() {
  const [sp] = useSearchParams();
  const tokenFromUrl = sp.get("token") ?? "";

  const [token, setToken] = useState(tokenFromUrl);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setMsg(null);
    if (newPassword !== confirmPassword) return setErr("Нууц үг таарахгүй байна.");
    setBusy(true);
    try {
      await authService.reset({ token, newPassword, confirmPassword });
      setMsg("Нууц үг амжилттай шинэчлэгдлээ. Одоо нэвтэрч болно.");
    } catch (e: any) {
      const ae = e as ApiError;
      setErr(ae?.payload ? JSON.stringify(ae.payload) : "Алдаа гарлаа.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 grid place-items-center px-4">
      <Card className="w-full max-w-md p-6">
        <div className="text-xl font-bold">Нууц үг шинэчлэх</div>

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <Field label="Token">
            <Input value={token} onChange={(e) => setToken(e.target.value)} />
          </Field>
          <Field label="Шинэ нууц үг">
            <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          </Field>
          <Field label="Шинэ нууц үг давтах">
            <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </Field>

          {err ? <div className="rounded-lg bg-rose-50 border border-rose-200 p-3 text-sm text-rose-700">{err}</div> : null}
          {msg ? <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-sm text-emerald-700">{msg}</div> : null}

          <Button type="submit" className="w-full" loading={busy}>Хадгалах</Button>

          <div className="text-sm text-slate-600 text-center">
            <Link to="/login" className="text-blue-700 hover:underline">Нэвтрэх</Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
