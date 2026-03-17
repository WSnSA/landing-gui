import type { ComponentResponse, CreateComponentRequest, ReorderRequest, UpdateComponentRequest } from "../types/dto";
import { apiFetch } from "./apiClient";

export const componentService = {
  create(sectionId: number, req: CreateComponentRequest) {
    return apiFetch<ComponentResponse>(`/api/sections/${sectionId}/components`, { method: "POST", body: JSON.stringify(req) });
  },
  list(sectionId: number) {
    return apiFetch<ComponentResponse[]>(`/api/sections/${sectionId}/components`, { method: "GET" });
  },
  // Backend expects: { ids: [componentId1, componentId2, ...] }
  reorder(sectionId: number, ids: number[]) {
    const req: ReorderRequest = { ids };
    return apiFetch<void>(`/api/sections/${sectionId}/components/reorder`, { method: "POST", body: JSON.stringify(req) });
  },
  get(componentId: number) {
    return apiFetch<ComponentResponse>(`/api/components/${componentId}`, { method: "GET" });
  },
  update(componentId: number, req: UpdateComponentRequest) {
    return apiFetch<ComponentResponse>(`/api/components/${componentId}`, { method: "PUT", body: JSON.stringify(req) });
  },
  remove(componentId: number) {
    return apiFetch<void>(`/api/components/${componentId}`, { method: "DELETE" });
  },
};
