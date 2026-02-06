import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { LoginResponse } from "../types/dto";
import { authService } from "../services/authService";
import { authStorage, type StoredMe } from "../services/authStorage";

type AuthState = {
  isReady: boolean;
  isAuthed: boolean;
  me: StoredMe;
  accessToken: string | null;
  refreshToken: string | null;
};

type AuthContextValue = AuthState & {
  bootstrap: () => Promise<void>;
  setSessionFromLogin: (lr: LoginResponse) => void;
  clearSession: () => void;
  logout: () => Promise<void>;
  refreshMe: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setReady] = useState(false);
  const [me, setMe] = useState<StoredMe>(() => authStorage.getMe());
  const [accessToken, setAccess] = useState<string | null>(() => authStorage.getAccess());
  const [refreshToken, setRefresh] = useState<string | null>(() => authStorage.getRefresh());

  const clearSession = useCallback(() => {
    authStorage.clear();
    setMe(null);
    setAccess(null);
    setRefresh(null);
  }, []);

  const setSessionFromLogin = useCallback((lr: LoginResponse) => {
    authStorage.setAccess(lr.accessToken);
    authStorage.setRefresh(lr.refreshToken);
    authStorage.setMe({ id: lr.id, email: lr.email, fullName: lr.fullName, role: lr.role });
    setAccess(lr.accessToken);
    setRefresh(lr.refreshToken);
    setMe({ id: lr.id, email: lr.email, fullName: lr.fullName, role: lr.role });
  }, []);

  const refreshMe = useCallback(async () => {
    try {
      const data = await authService.me();
      authStorage.setMe(data);
      setMe(data);
    } catch {
      // ignore; might be unauth
    }
  }, []);

  const bootstrap = useCallback(async () => {
    const at = authStorage.getAccess();
    const rt = authStorage.getRefresh();
    setAccess(at);
    setRefresh(rt);
    setMe(authStorage.getMe());
    if (at) await refreshMe();
    setReady(true);
  }, [refreshMe]);

  const logout = useCallback(async () => {
    const rt = authStorage.getRefresh();
    try {
      if (rt) await authService.logout({ refreshToken: rt });
    } catch {
      // ignore
    } finally {
      clearSession();
    }
  }, [clearSession]);

  useEffect(() => {
    bootstrap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    isReady,
    isAuthed: !!accessToken,
    me,
    accessToken,
    refreshToken,
    bootstrap,
    setSessionFromLogin,
    clearSession,
    logout,
    refreshMe,
  }), [accessToken, bootstrap, clearSession, isReady, me, refreshToken, logout, refreshMe, setSessionFromLogin]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
