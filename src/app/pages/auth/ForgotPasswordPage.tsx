import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Field, Input } from "../../../components/ui";
import {authService} from "../../../services/authService";
import {ApiError} from "../../../services/apiClient";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  // @ts-ignore
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setMsg(null);
    setBusy(true);
    try {
      await authService.forgot({ email });
      setMsg("И-мэйл рүү сэргээх линк илгээгдлээ (хэрэв бүртгэлтэй бол).");
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
        <div className="text-xl font-bold">Нууц үг сэргээх</div>
        <div className="mt-1 text-sm text-slate-600">Бүртгэлтэй имэйлээ оруулна уу.</div>

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <Field label="Email">
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </Field>

          {err ? <div className="rounded-lg bg-rose-50 border border-rose-200 p-3 text-sm text-rose-700">{err}</div> : null}
          {msg ? <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-sm text-emerald-700">{msg}</div> : null}

          <Button type="submit" className="w-full" loading={busy}>Илгээх</Button>

          <div className="text-sm text-slate-600 text-center">
            <Link to="/login" className="text-blue-700 hover:underline">Нэвтрэх рүү буцах</Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
