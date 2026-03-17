import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Field, Input } from "../../components/ui";
import { authService } from "../../services/authService";
import { useAuth } from "../../auth/AuthContext";
import type { ApiError } from "../../services/apiClient";
import PublicNav from "../../components/PublicNav";

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
      nav(from ?? "/marketplace", { replace: true });
    } catch (e: any) {
      const ae = e as ApiError;
      const payload = ae?.payload;
      const code = typeof payload === "object" && payload !== null
        ? (payload as Record<string, string>).code ?? ""
        : "";
      const ERRORS: Record<string, string> = {
        INVALID_CREDENTIALS: "Имэйл эсвэл нууц үг буруу байна.",
        USER_NOT_FOUND: "Бүртгэл олдсонгүй.",
        ACCOUNT_DISABLED: "Таны бүртгэл идэвхгүй болсон байна.",
      };
      setErr(ERRORS[code] ?? "Нэвтрэхэд алдаа гарлаа. Мэдээллээ шалгана уу.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <PublicNav />

      <div className="flex min-h-[calc(100vh-56px)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-slate-900">Нэвтрэх</h1>
              <p className="mt-1 text-sm text-slate-500">Имэйл/утас болон нууц үгээ оруулна уу.</p>
            </div>

            <form className="space-y-4" onSubmit={onSubmit}>
              <Field label="Имэйл эсвэл утас">
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="example@mail.com"
                  autoComplete="username"
                />
              </Field>
              <Field label="Нууц үг">
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
              </Field>

              {err && (
                <div className="rounded-xl bg-rose-50 border border-rose-200 p-3 text-sm text-rose-700">{err}</div>
              )}

              <Button type="submit" className="w-full" loading={busy}>Нэвтрэх</Button>

              <div className="flex items-center justify-between text-sm">
                <Link to="/forgot-password" className="text-blue-600 hover:text-blue-700 hover:underline">
                  Нууц үг мартсан?
                </Link>
                <Link to="/register" className="text-slate-500 hover:text-slate-700">
                  Бүртгүүлэх →
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
