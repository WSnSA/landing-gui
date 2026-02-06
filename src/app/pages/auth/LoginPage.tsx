import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Card, Field, Input } from "../../../components/ui";
import { authService } from "../../../services/authService";
import { useAuth } from "../../../auth/AuthContext";
import type { ApiError } from "../../../services/apiClient";

export default function LoginPage() {
  const nav = useNavigate();
  const loc = useLocation() as any;
  const { setSessionFromLogin } = useAuth();

  const from = useMemo(() => loc?.state?.from as string | undefined, [loc]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    try {
      const res = await authService.login({ username, password });
      setSessionFromLogin(res);
      nav(from ?? "/onboarding", { replace: true });
    } catch (e: any) {
      const ae = e as ApiError;
      setErr(
        ae?.payload && typeof ae.payload === "object"
          ? JSON.stringify(ae.payload)
          : "Нэвтрэхэд алдаа гарлаа. Мэдээллээ шалгана уу."
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 grid place-items-center px-4">
      <Card className="w-full max-w-md p-6">
        <div className="text-xl font-bold">Нэвтрэх</div>
        <div className="mt-1 text-sm text-slate-600">Email/Phone болон нууц үгээ оруулна уу.</div>

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <Field label="Email эсвэл Утас">
            <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="example@mail.com" />
          </Field>
          <Field label="Нууц үг">
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
          </Field>

          {err ? <div className="rounded-lg bg-rose-50 border border-rose-200 p-3 text-sm text-rose-700">{err}</div> : null}

          <Button type="submit" className="w-full" loading={busy}>
            Нэвтрэх
          </Button>

          <div className="flex items-center justify-between text-sm">
            <Link to="/forgot-password" className="text-blue-700 hover:underline">Нууц үг мартсан?</Link>
            <Link to="/register" className="text-slate-600 hover:underline">Бүртгүүлэх</Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
