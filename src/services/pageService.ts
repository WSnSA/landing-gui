import type { CreatePageRequest, PageResponse, ReorderRequest, UpdatePageRequest } from "../types/dto";
import { apiFetch } from "./apiClient";

export const pageService = {
  create(landingId: number, req: CreatePageRequest) {
    return apiFetch<PageResponse>(`/api/landings/${landingId}/pages`, { method: "POST", body: JSON.stringify(req) });
  },
  list(landingId: number) {
    return apiFetch<PageResponse[]>(`/api/landings/${landingId}/pages`, { method: "GET" });
  },
  reorder(landingId: number, req: ReorderRequest) {
    return apiFetch<void>(`/api/landings/${landingId}/pages/reorder`, { method: "POST", body: JSON.stringify(req) });
  },
  get(pageId: number) {
    return apiFetch<PageResponse>(`/api/pages/${pageId}`, { method: "GET" });
  },
  update(pageId: number, req: UpdatePageRequest) {
    return apiFetch<PageResponse>(`/api/pages/${pageId}`, { method: "PUT", body: JSON.stringify(req) });
  },
  remove(pageId: number) {
    return apiFetch<void>(`/api/pages/${pageId}`, { method: "DELETE" });
  },
};
