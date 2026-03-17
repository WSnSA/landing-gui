import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isReady, isAuthed } = useAuth();
  const loc = useLocation();
  if (!isReady) return <div className="min-h-screen grid place-items-center text-slate-600">Loading…</div>;
  if (!isAuthed) return <Navigate to="/login" replace state={{ from: loc.pathname }} />;
  return <>{children}</>;
}
