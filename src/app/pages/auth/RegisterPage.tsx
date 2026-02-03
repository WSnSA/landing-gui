import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  Mail,
  Lock,
  User,
  ArrowLeft,
  Phone,
  IdCard,
} from "lucide-react";
import {registerUser} from "../../../services/authService";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    registerNumber: "",
    phone: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // @ts-ignore
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (form.password.length < 8) {
      setError("Нууц үг дор хаяж 8 тэмдэгт байх ёстой");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Нууц үг таарахгүй байна");
      return;
    }

    if (!form.terms) {
      setError("Үйлчилгээний нөхцөлийг зөвшөөрнө үү");
      return;
    }

    try {
      setLoading(true);
      await registerUser(form);
      navigate("/login");
    } catch (err: any) {
      setError(err.message || "Бүртгэл амжилтгүй");
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <img
                  src="../../../assets/logo_landing.png"
                  alt="LANDING.MN"
                  className="h-8"
              />
            </Link>
            <Link
                to="/"
                className="inline-flex items-center gap-2 text-[#64748B] hover:text-[#0F172A]"
            >
              <ArrowLeft className="size-4" />
              Нүүр хуудас
            </Link>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <motion.div
              className="w-full max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-white rounded-2xl shadow-xl border p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-[#0F172A]">
                  Бүртгүүлэх
                </h1>
                <p className="text-[#64748B] mt-1">
                  Өөрийн анхны landing хуудсаа үүсгэх
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full name */}
                <Input
                    label="Овог нэр"
                    icon={<User />}
                    name="fullname"
                    value={form.fullname}
                    onChange={onChange}
                    placeholder="Б. Болд"
                />

                {/* Email */}
                <Input
                    label="Имейл хаяг"
                    icon={<Mail />}
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    placeholder="example@email.com"
                />

                {/* Register number */}
                <Input
                    label="Регистрийн дугаар"
                    icon={<IdCard />}
                    name="registerNumber"
                    value={form.registerNumber}
                    onChange={onChange}
                    placeholder="УБ99112233"
                />

                {/* Phone */}
                <Input
                    label="Утасны дугаар"
                    icon={<Phone />}
                    name="phone"
                    value={form.phone}
                    onChange={onChange}
                    placeholder="99112233"
                />

                {/* Password */}
                <Input
                    label="Нууц үг"
                    icon={<Lock />}
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={onChange}
                    placeholder="••••••••"
                />

                {/* Confirm password */}
                <Input
                    label="Нууц үг баталгаажуулах"
                    icon={<Lock />}
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={onChange}
                    placeholder="••••••••"
                />

                {/* Terms */}
                <label className="flex gap-2 text-sm text-[#64748B]">
                  <input
                      type="checkbox"
                      name="terms"
                      checked={form.terms}
                      onChange={onChange}
                  />
                  Би үйлчилгээний нөхцөл болон нууцлалын бодлогыг зөвшөөрч байна
                </label>

                {error && (
                    <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">
                      {error}
                    </div>
                )}

                <motion.button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-[#2563EB] text-white rounded-lg font-medium disabled:opacity-60"
                    whileTap={{ scale: 0.98 }}
                >
                  {loading ? "Бүртгэж байна..." : "Бүртгүүлэх"}
                </motion.button>
              </form>

              <p className="mt-6 text-sm text-center text-[#64748B]">
                Аль хэдийн бүртгэлтэй юу?{" "}
                <Link to="/login" className="text-[#2563EB] font-medium">
                  Нэвтрэх
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
  );
}

/* ---------- Reusable Input ---------- */
function Input({
                 label,
                 icon,
                 ...props
               }: {
  label: string;
  icon: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
      <div>
        <label className="block text-sm font-medium mb-1 text-[#0F172A]">
          {label}
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center text-[#64748B]">
            {icon}
          </div>
          <input
              {...props}
              required
              className="w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-[#2563EB] outline-none"
          />
        </div>
      </div>
  );
}
