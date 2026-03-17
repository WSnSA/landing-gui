import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Field, Input } from "../../components/ui";
import { authService } from "../../services/authService";
import type { ApiError } from "../../services/apiClient";
import PublicNav from "../../components/PublicNav";

export default function RegisterPage() {
  const nav = useNavigate();

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [registerNumber, setRegisterNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [terms, setTerms] = useState(false);

  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    if (!terms) return setErr("Үйлчилгээний нөхцлийг зөвшөөрнө үү.");
    if (password !== confirmPassword) return setErr("Нууц үг таарахгүй байна.");

    setBusy(true);
    try {
      await authService.register({ fullname, email, registerNumber, phone, password, confirmPassword, terms });
      nav("/login", { replace: true });
    } catch (e: any) {
      const ae = e as ApiError;
      const payload = ae?.payload;
      const code = typeof payload === "object" && payload !== null
        ? (payload as Record<string, string>).code ?? ""
        : "";
      const ERRORS: Record<string, string> = {
        USER_EMAIL_EXISTS:  "Энэ имэйл аль хэдийн бүртгэлтэй байна.",
        USER_PHONE_EXISTS:  "Энэ утасны дугаар аль хэдийн бүртгэлтэй байна.",
        VALIDATION_ERROR:   "Мэдээллээ бүрэн зөв оруулна уу.",
        INTERNAL_ERROR:     "Системийн алдаа гарлаа. Дахин оролдоно уу.",
      };
      setErr(ERRORS[code] ?? "Бүртгүүлэхэд алдаа гарлаа. Мэдээллээ шалгана уу.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <PublicNav />

      <div className="flex min-h-[calc(100vh-56px)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-xl">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-slate-900">Бүртгүүлэх</h1>
              <p className="mt-1 text-sm text-slate-500">Мэдээллээ бөглөөд account үүсгэнэ.</p>
            </div>

            <form className="space-y-4" onSubmit={onSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Овог нэр">
                  <Input value={fullname} onChange={(e) => setFullname(e.target.value)} placeholder="Батболд" />
                </Field>
                <Field label="Имэйл">
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@mail.com" />
                </Field>
                <Field label="Регистр">
                  <Input value={registerNumber} onChange={(e) => setRegisterNumber(e.target.value)} placeholder="УБ12345678" />
                </Field>
                <Field label="Утас">
                  <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="99001234" />
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Нууц үг">
                  <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
                </Field>
                <Field label="Нууц үг давтах">
                  <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" />
                </Field>
              </div>

              <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={terms}
                  onChange={(e) => setTerms(e.target.checked)}
                  className="rounded"
                />
                <span>
                  Би{" "}
                  <Link to="/terms" className="text-blue-600 hover:underline font-medium">
                    Үйлчилгээний нөхцөл
                  </Link>
                  -ийг зөвшөөрч байна.
                </span>
              </label>

              {err && (
                <div className="rounded-xl bg-rose-50 border border-rose-200 p-3 text-sm text-rose-700">{err}</div>
              )}

              <Button type="submit" className="w-full" loading={busy}>Бүртгүүлэх</Button>

              <div className="text-sm text-slate-500 text-center">
                Account байна уу?{" "}
                <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                  Нэвтрэх →
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
