import type { PublicLandingResponse } from "../types/dto";
import { apiFetch } from "./apiClient";

export const publicService = {
  bySlug(slug: string) {
    return apiFetch<PublicLandingResponse>(`/public/${encodeURIComponent(slug)}`, { method: "GET" }, false);
  },
};
