import type { CreateSectionRequest, ReorderRequest, SectionResponse, UpdateSectionRequest } from "../types/dto";
import { apiFetch } from "./apiClient";

export const sectionService = {
  create(pageId: number, req: CreateSectionRequest) {
    return apiFetch<SectionResponse>(`/api/pages/${pageId}/sections`, { method: "POST", body: JSON.stringify(req) });
  },
  list(pageId: number) {
    return apiFetch<SectionResponse[]>(`/api/pages/${pageId}/sections`, { method: "GET" });
  },
  // Backend expects: { ids: [sectionId1, sectionId2, ...] }
  reorder(pageId: number, ids: number[]) {
    const req: ReorderRequest = { ids };
    return apiFetch<void>(`/api/pages/${pageId}/sections/reorder`, { method: "POST", body: JSON.stringify(req) });
  },
  get(sectionId: number) {
    return apiFetch<SectionResponse>(`/api/sections/${sectionId}`, { method: "GET" });
  },
  update(sectionId: number, req: UpdateSectionRequest) {
    return apiFetch<SectionResponse>(`/api/sections/${sectionId}`, { method: "PUT", body: JSON.stringify(req) });
  },
  remove(sectionId: number) {
    return apiFetch<void>(`/api/sections/${sectionId}`, { method: "DELETE" });
  },
};
