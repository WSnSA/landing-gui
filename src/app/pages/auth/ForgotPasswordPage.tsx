import { useState } from "react";
import { Mail } from "lucide-react";
import {forgotPassword} from "../../../services/authService";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // @ts-ignore
    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            await forgotPassword(email);
            setSent(true);
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
                <h1 className="text-xl font-bold text-center">Нууц үг сэргээх</h1>

                {sent ? (
                    <p className="text-green-600 text-sm">
                        Имэйл илгээгдлээ. Inbox шалгана уу.
                    </p>
                ) : (
                    <>
                        <div className="relative">
                            <Mail className="absolute left-3 top-2.5 text-gray-400" />
                            <input
                                type="email"
                                required
                                placeholder="Имэйл хаяг"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 py-2 border rounded"
                            />
                        </div>

                        {error && <div className="text-red-600 text-sm">{error}</div>}

                        <button className="w-full bg-blue-600 text-white py-2 rounded">
                            Илгээх
                        </button>
                    </>
                )}
            </form>
        </div>
    );
}
