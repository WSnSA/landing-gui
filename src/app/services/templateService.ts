import type { TemplateRequest, TemplateResponse } from "../types/dto";
import { apiFetch } from "./apiClient";

/** Бүртгэлтэй хэрэглэгч template жагсаалт харах */
export const templateService = {
  list() {
    return apiFetch<TemplateResponse[]>("/api/templates", { method: "GET" });
  },
};

/** Admin template удирдах */
export const adminTemplateService = {
  list() {
    return apiFetch<TemplateResponse[]>("/api/admin/templates", { method: "GET" });
  },
  get(id: number) {
    return apiFetch<TemplateResponse>(`/api/admin/templates/${id}`, { method: "GET" });
  },
  create(req: TemplateRequest) {
    return apiFetch<TemplateResponse>("/api/admin/templates", {
      method: "POST",
      body: JSON.stringify(req),
    });
  },
  update(id: number, req: TemplateRequest) {
    return apiFetch<TemplateResponse>(`/api/admin/templates/${id}`, {
      method: "PUT",
      body: JSON.stringify(req),
    });
  },
  remove(id: number) {
    return apiFetch<void>(`/api/admin/templates/${id}`, { method: "DELETE" });
  },
};
