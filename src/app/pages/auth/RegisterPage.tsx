import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Field, Input } from "../../../components/ui";
import { authService } from "../../../services/authService";
import type { ApiError } from "../../../services/apiClient";

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
  const [ok, setOk] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setOk(null);

    if (!terms) return setErr("Үйлчилгээний нөхцлийг зөвшөөрнө үү.");
    if (password !== confirmPassword) return setErr("Нууц үг таарахгүй байна.");

    setBusy(true);
    try {
      await authService.register({ fullname, email, registerNumber, phone, password, confirmPassword, terms });
      setOk("Бүртгэл амжилттай. Одоо нэвтэрнэ үү.");
      nav("/login", { replace: true });
    } catch (e: any) {
      const ae = e as ApiError;
      setErr(
        ae?.payload && typeof ae.payload === "object"
          ? JSON.stringify(ae.payload)
          : "Бүртгүүлэхэд алдаа гарлаа."
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 grid place-items-center px-4">
      <Card className="w-full max-w-xl p-6">
        <div className="text-xl font-bold">Бүртгүүлэх</div>
        <div className="mt-1 text-sm text-slate-600">Мэдээллээ бөглөөд account үүсгэнэ.</div>

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Овог нэр">
              <Input value={fullname} onChange={(e) => setFullname(e.target.value)} />
            </Field>
            <Field label="Email">
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </Field>
            <Field label="Регистр">
              <Input value={registerNumber} onChange={(e) => setRegisterNumber(e.target.value)} />
            </Field>
            <Field label="Утас">
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Нууц үг">
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Field>
            <Field label="Нууц үг давтах">
              <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </Field>
          </div>

          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} />
            <span>
              Би <Link to="/terms" className="text-blue-700 hover:underline">Үйлчилгээний нөхцөл</Link> зөвшөөрч байна.
            </span>
          </label>

          {err ? <div className="rounded-lg bg-rose-50 border border-rose-200 p-3 text-sm text-rose-700">{err}</div> : null}
          {ok ? <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-sm text-emerald-700">{ok}</div> : null}

          <Button type="submit" className="w-full" loading={busy}>Бүртгүүлэх</Button>

          <div className="text-sm text-slate-600 text-center">
            Account байна уу? <Link to="/login" className="text-blue-700 hover:underline">Нэвтрэх</Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
