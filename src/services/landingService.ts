import type { CreateLandingRequest, LandingResponse, UpdateLandingRequest } from "../types/dto";
import { apiFetch } from "./apiClient";

export const landingService = {
  create(req: CreateLandingRequest) {
    return apiFetch<LandingResponse>("/api/landings", { method: "POST", body: JSON.stringify(req) });
  },
  list() {
    return apiFetch<LandingResponse[]>("/api/landings", { method: "GET" });
  },
  get(id: number) {
    return apiFetch<LandingResponse>(`/api/landings/${id}`, { method: "GET" });
  },
  update(id: number, req: UpdateLandingRequest) {
    return apiFetch<LandingResponse>(`/api/landings/${id}`, { method: "PUT", body: JSON.stringify(req) });
  },
  remove(id: number) {
    return apiFetch<void>(`/api/landings/${id}`, { method: "DELETE" });
  },
  publish(id: number) {
    return apiFetch<LandingResponse>(`/api/landings/${id}/publish`, { method: "POST" });
  },
  unpublish(id: number) {
    return apiFetch<LandingResponse>(`/api/landings/${id}/unpublish`, { method: "POST" });
  },
};
