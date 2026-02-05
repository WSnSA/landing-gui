import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Mail, Lock } from "lucide-react";
import { motion } from "motion/react";
import { login } from "../../../services/authService";

export default function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // @ts-ignore
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);
      await login(form);
      navigate("/onboarding");
    } catch (err: any) {
      setError(err.message || "Нэвтрэх боломжгүй");
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <motion.form
            onSubmit={submit}
            className="bg-white p-8 rounded-xl shadow w-full max-w-md space-y-4"
        >
          <h1 className="text-2xl font-bold text-center">Нэвтрэх</h1>

          <Input
              icon={<Mail />}
              name="username"
              placeholder="Имэйл эсвэл утас"
              onChange={onChange}
          />

          <Input
              icon={<Lock />}
              name="password"
              type="password"
              placeholder="Нууц үг"
              onChange={onChange}
          />

          {error && <div className="text-red-600 text-sm">{error}</div>}

          <button
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded"
          >
            {loading ? "Түр хүлээнэ үү..." : "Нэвтрэх"}
          </button>

          <div className="text-sm text-center">
            <Link to="/forgot-password" className="text-blue-600">
              Нууц үгээ мартсан уу?
            </Link>
          </div>
        </motion.form>
      </div>
  );
}

function Input(props: any) {
  return (
      <div className="relative">
        <div className="absolute left-3 top-2.5 text-gray-400">
          {props.icon}
        </div>
        <input
            {...props}
            required
            className="w-full pl-10 py-2 border rounded"
        />
      </div>
  );
}
