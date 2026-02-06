const ACCESS_KEY = "landing.accessToken";
const REFRESH_KEY = "landing.refreshToken";
const USER_KEY = "landing.me";

export type StoredMe = { id: number; email: string; fullName: string; role: unknown } | null;

export const authStorage = {
  getAccess(): string | null {
    return localStorage.getItem(ACCESS_KEY);
  },
  setAccess(token: string | null) {
    if (!token) localStorage.removeItem(ACCESS_KEY);
    else localStorage.setItem(ACCESS_KEY, token);
  },
  getRefresh(): string | null {
    return localStorage.getItem(REFRESH_KEY);
  },
  setRefresh(token: string | null) {
    if (!token) localStorage.removeItem(REFRESH_KEY);
    else localStorage.setItem(REFRESH_KEY, token);
  },
  getMe(): StoredMe {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try { return JSON.parse(raw) as StoredMe; } catch { return null; }
  },
  setMe(me: StoredMe) {
    if (!me) localStorage.removeItem(USER_KEY);
    else localStorage.setItem(USER_KEY, JSON.stringify(me));
  },
  clear() {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(USER_KEY);
  },
};
