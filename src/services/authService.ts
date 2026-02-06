import type {
  LoginRequest, LoginResponse,
  RegisterRequest, RegisterResponse,
  ForgotPasswordRequest, ResetPasswordRequest,
  RefreshTokenRequest, RefreshTokenResponse,
  LogoutRequest,
} from "../types/dto";
import { apiFetch } from "./apiClient";

export const authService = {
  login(req: LoginRequest) {
    return apiFetch<LoginResponse>("/api/auth/login", { method: "POST", body: JSON.stringify(req) }, false);
  },
  register(req: RegisterRequest) {
    return apiFetch<RegisterResponse>("/api/auth/register", { method: "POST", body: JSON.stringify(req) }, false);
  },
  refresh(req: RefreshTokenRequest) {
    return apiFetch<RefreshTokenResponse>("/api/auth/refresh", { method: "POST", body: JSON.stringify(req) }, false);
  },
  logout(req: LogoutRequest) {
    return apiFetch<void>("/api/auth/logout", { method: "POST", body: JSON.stringify(req) });
  },
  forgot(req: ForgotPasswordRequest) {
    return apiFetch<void>("/api/auth/forgot-password", { method: "POST", body: JSON.stringify(req) }, false);
  },
  reset(req: ResetPasswordRequest) {
    return apiFetch<void>("/api/auth/reset-password", { method: "POST", body: JSON.stringify(req) }, false);
  },
  me() {
    return apiFetch<any>("/api/auth/me", { method: "GET" });
  },
};
