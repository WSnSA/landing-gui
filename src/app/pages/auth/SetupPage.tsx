import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Field, Input } from "../../components/ui";
import { adminUserService } from "../../services/adminUserService";
import { useAuth } from "../../auth/AuthContext";
import PublicNav from "../../components/PublicNav";

type Step = "form" | "success" | "need-login";

export default function SetupPage() {
  const nav = useNavigate();
  const { me } = useAuth();
  const isAlreadyAdmin = String(me?.role ?? "").includes("ADMIN");

  const [step, setStep] = useState<Step>("form");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    registerNumber: "AA00000000",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const set = (k: keyof typeof form, v: string) => {
    setForm((p) => ({ ...p, [k]: v }));
    setErr(null);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullname.trim()) { setErr("Нэр оруулна уу."); return; }
    if (!form.email.trim()) { setErr("Имэйл оруулна уу."); return; }
    if (form.password.length < 6) { setErr("Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой."); return; }
    if (form.password !== form.confirmPassword) { setErr("Нууц үг таарахгүй байна."); return; }

    setBusy(true);
    setErr(null);
    try {
      if (isAlreadyAdmin) {
        // Аль хэдийн admin нэвтэрсэн → auth-тай endpoint
        await adminUserService.createAdmin({ ...form, terms: true });
      } else {
        // Анхны admin setup — auth шаардахгүй
        await adminUserService.setupFirstAdmin({ ...form, terms: true });
      }
      setStep("success");
    } catch (e: any) {
      const status = e?.status;
      const payload = e?.payload;
      const code = typeof payload === "object" && payload !== null
        ? (payload as Record<string, string>).code ?? ""
        : typeof payload === "string" ? payload : "";

      if (status === 401 || status === 403) {
        setStep("need-login");
      } else if (code === "EMAIL_ALREADY_EXISTS" || code === "DUPLICATE_ENTRY") {
        setErr("Энэ имэйл аль хэдийн бүртгэлтэй байна.");
      } else {
        setErr(
          code
            ? `Алдаа: ${code}`
            : "Admin үүсгэхэд алдаа гарлаа. Backend-н тохиргоог шалгана уу."
        );
      }
    } finally {
      setBusy(false);
    }
  };

  /* ── Success ── */
  if (step === "success") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="text-5xl mb-4">✅</div>
          <h1 className="text-2xl font-black text-slate-900 mb-2">Admin үүслээ!</h1>
          <p className="text-slate-500 text-sm mb-6">
            <span className="font-semibold text-slate-700">{form.email}</span> имэйлээр нэвтэрч
            admin панелд хандах боломжтой боллоо.
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => nav("/login")}
              className="w-full rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white hover:bg-blue-700 transition"
            >
              Нэвтрэх →
            </button>
            <button
              onClick={() => { setStep("form"); setForm({ fullname: "", email: "", registerNumber: "AA00000000", phone: "", password: "", confirmPassword: "" }); }}
              className="w-full rounded-xl border border-slate-200 px-6 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
            >
              Дахин admin нэмэх
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── Need login first ── */
  if (step === "need-login") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-center">
            <div className="text-4xl mb-3">🔐</div>
            <h2 className="text-lg font-bold text-slate-900 mb-2">Admin эрх шаардлагатай</h2>
            <p className="text-sm text-slate-600 mb-4">
              Шинэ admin үүсгэхийн тулд эхлээд одоо байгаа admin эрхээр нэвтэрнэ үү.
            </p>
            <div className="flex flex-col gap-2">
              <Link
                to="/login"
                state={{ from: "/setup" }}
                className="w-full rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white hover:bg-blue-700 transition text-center"
              >
                Admin-аар нэвтрэх →
              </Link>
              <button
                onClick={() => setStep("form")}
                className="text-sm text-slate-500 hover:text-slate-700 transition py-2"
              >
                ← Буцах
              </button>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
            <div className="text-xs font-semibold text-slate-600 mb-2">Backend-ээс анхны admin үүсгэх:</div>
            <pre className="text-xs text-slate-500 bg-slate-50 rounded-lg p-3 overflow-auto leading-relaxed">{`-- SQL хийх (Spring Boot ашиглаж байгаа бол):
INSERT INTO users (full_name, email, password, role)
VALUES ('Admin', 'admin@mail.com', '{bcrypt}$2a$...', 'ADMIN');

-- Эсвэл application.yml / seed data:
admin:
  email: admin@mail.com
  password: yourpassword`}</pre>
          </div>
        </div>
      </div>
    );
  }

  /* ── Form ── */
  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-blue-300 blur-[160px] opacity-20" />
        <div className="absolute -bottom-20 -right-20 h-[400px] w-[400px] rounded-full bg-indigo-300 blur-[140px] opacity-15" />
      </div>
      <PublicNav />

      <div className="relative flex min-h-[calc(100vh-56px)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">
          <div className="rounded-2xl border border-white/80 bg-white/70 backdrop-blur-xl p-8 shadow-lg shadow-slate-200/50">

            {/* Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 mb-3">
                🛡️ Admin тохиргоо
              </div>
              <h1 className="text-2xl font-black text-slate-900">
                {isAlreadyAdmin ? "Шинэ Admin нэмэх" : "Анхны Admin үүсгэх"}
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                {isAlreadyAdmin
                  ? "Шинэ admin хэрэглэгч үүсгэнэ. Систем рүү нэвтэрч бүх боломжийг ашиглах эрхтэй болно."
                  : "Системд анхны admin хэрэглэгч үүсгэнэ. Дараа нь admin панелаас бусад хэрэглэгчийг admin болгож болно."}
              </p>
            </div>

            {/* Status banner */}
            {isAlreadyAdmin && (
              <div className="mb-4 rounded-xl bg-green-50 border border-green-200 p-3 flex items-center gap-2 text-sm text-green-700">
                <span>✅</span>
                <span><span className="font-semibold">{me?.fullName}</span> — admin эрхээр нэвтэрсэн байна.</span>
              </div>
            )}

            <form className="space-y-4" onSubmit={submit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Field label="Бүтэн нэр">
                    <Input value={form.fullname} onChange={(e) => set("fullname", e.target.value)} placeholder="Admin Нэр" autoFocus />
                  </Field>
                </div>
                <Field label="Имэйл">
                  <Input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="admin@example.com" />
                </Field>
                <Field label="Утас">
                  <Input value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="99999999" />
                </Field>
                <Field label="Нууц үг">
                  <Input type="password" value={form.password} onChange={(e) => set("password", e.target.value)} placeholder="••••••••" />
                </Field>
                <Field label="Нууц үг давтах">
                  <Input type="password" value={form.confirmPassword} onChange={(e) => set("confirmPassword", e.target.value)} placeholder="••••••••" />
                </Field>
              </div>

              {err && (
                <div className="rounded-xl bg-rose-50 border border-rose-200 p-3 text-sm text-rose-700">{err}</div>
              )}

              <Button type="submit" className="w-full" loading={busy}>
                🛡️ Admin үүсгэх
              </Button>

              <div className="flex items-center justify-between text-sm">
                <Link to="/login" className="text-blue-600 hover:underline">← Нэвтрэх</Link>
                <Link to="/" className="text-slate-400 hover:text-slate-600">Нүүр хуудас</Link>
              </div>
            </form>
          </div>

          {/* Info box */}
          <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 text-xs text-slate-500 space-y-1">
            <div className="font-semibold text-slate-600">Admin эрхийн боломжууд:</div>
            <div className="grid grid-cols-2 gap-1 mt-2">
              {[
                "Template үүсгэх/засах",
                "Хэрэглэгчдийг удирдах",
                "Төлбөрүүд харах",
                "Хэрэглэгчийг admin болгох",
              ].map((t) => (
                <div key={t} className="flex items-center gap-1">
                  <span className="text-blue-500">✓</span> {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
