import { useSearchParams, useNavigate } from "react-router";
import { useState } from "react";
import { Lock } from "lucide-react";
import {resetPassword} from "../../../services/authService";

export default function ResetPasswordPage() {
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const token = params.get("token");

    const [form, setForm] = useState({
        newPassword: "",
        confirmPassword: "",
    });

    const [error, setError] = useState<string | null>(null);

    if (!token) {
        return <div className="p-10">Token байхгүй</div>;
    }

    // @ts-ignore
    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            await resetPassword({
                token,
                newPassword: form.newPassword,
                confirmPassword: form.confirmPassword,
            });
            navigate("/login");
        } catch (err: any) {
            setError(err.message || "Алдаа гарлаа");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <form
                onSubmit={submit}
                className="bg-white p-8 rounded-xl shadow w-full max-w-md space-y-4"
            >
                <h1 className="text-xl font-bold text-center">Нууц үг солих</h1>

                <Input
                    type="password"
                    placeholder="Шинэ нууц үг"
                    onChange={(e: any) =>
                        setForm({ ...form, newPassword: e.target.value })
                    }
                />

                <Input
                    type="password"
                    placeholder="Баталгаажуулах"
                    onChange={(e: any) =>
                        setForm({ ...form, confirmPassword: e.target.value })
                    }
                />

                {error && <div className="text-red-600 text-sm">{error}</div>}

                <button className="w-full bg-blue-600 text-white py-2 rounded">
                    Хадгалах
                </button>
            </form>
        </div>
    );
}

function Input(props: any) {
    return (
        <div className="relative">
            <Lock className="absolute left-3 top-2.5 text-gray-400" />
            <input {...props} required className="w-full pl-10 py-2 border rounded" />
        </div>
    );
}
