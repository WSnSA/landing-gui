import { authStorage } from "./authStorage";
import type { RefreshTokenResponse } from "../types/dto";
import {API_CONFIG} from "./apiConfig";

export class ApiError extends Error {
  status: number;
  payload: unknown;
  constructor(status: number, payload: unknown) {
    super(typeof payload === "string" ? payload : "API_ERROR");
    this.status = status;
    this.payload = payload;
  }
}

const BASE = API_CONFIG.BASE_URL ?? "/";

function joinUrl(path: string) {
  const b = String(BASE).replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${b}${p}`;
}

async function readPayload(res: Response) {
  const ct = res.headers.get("content-type") || "";
  if (ct.includes("application/json")) return await res.json().catch(() => null);
  return await res.text().catch(() => null);
}


let refreshing: Promise<RefreshTokenResponse | null> | null = null;

// @ts-ignore
async function refreshToken(): Promise<RefreshTokenResponse | null> {
  const rt = authStorage.getRefresh();
  if (!rt) return null;
  const url = joinUrl("/api/auth/refresh");
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken: rt }),
  });
  if (!res.ok) return null;
  const data = (await res.json()) as RefreshTokenResponse;
  authStorage.setAccess(data.accessToken);
  authStorage.setRefresh(data.refreshToken);
  return data;
}

// @ts-ignore
export async function apiFetch<T>(path: string, init: RequestInit = {}, auth: boolean = true): Promise<T> {
  const url = joinUrl(path);
  const headers = new Headers(init.headers || {});
  if (!headers.has("Content-Type") && init.body) headers.set("Content-Type", "application/json");

  if (auth) {
    const at = authStorage.getAccess();
    if (at) headers.set("Authorization", `Bearer ${at}`);
  }

  const doReq = async () => {
    const res = await fetch(url, { ...init, headers });
    if (res.ok) return res;
    const payload = await readPayload(res);
    throw new ApiError(res.status, payload);
  };

  try {
    const res = await doReq();
    if (res.status === 204) return undefined as unknown as T;
    const payload = await readPayload(res);
    return payload as T;
  } catch (e: any) {
    if (!auth) throw e;
    // Retry once on 401 by refreshing
    if (e instanceof ApiError && e.status === 401) {
      if (!refreshing) refreshing = refreshToken().finally(() => (refreshing = null));
      const ref = await refreshing;
      if (!ref) {
        authStorage.clear();
        throw e;
      }
      // Update auth header and retry
      const at2 = authStorage.getAccess();
      if (at2) headers.set("Authorization", `Bearer ${at2}`);
      const res2 = await fetch(url, { ...init, headers });
      if (res2.ok) {
        if (res2.status === 204) return undefined as unknown as T;
        const payload2 = await readPayload(res2);
        return payload2 as T;
      }
      const payload2 = await readPayload(res2);
      throw new ApiError(res2.status, payload2);
    }
    throw e;
  }
}
