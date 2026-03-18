import type { RegisterRequest, UserSummaryResponse } from "../types/dto";
import { apiFetch } from "./apiClient";

export const adminUserService = {
  listUsers() {
    return apiFetch<UserSummaryResponse[]>("/api/admin/users", { method: "GET" });
  },

  createAdmin(req: RegisterRequest) {
    return apiFetch<void>("/api/admin/users/create-admin", {
      method: "POST",
      body: JSON.stringify(req),
    });
  },

  /** Анхны admin үүсгэх — auth шаардахгүй (backend-д зөвшөөрөгдсөн бол) */
  setupFirstAdmin(req: RegisterRequest) {
    return apiFetch<void>("/api/admin/users/create-admin", {
      method: "POST",
      body: JSON.stringify(req),
    }, false);
  },

  promoteAdmin(userId: number) {
    return apiFetch<void>(`/api/admin/users/${userId}/promote-admin`, {
      method: "POST",
    });
  },
};
