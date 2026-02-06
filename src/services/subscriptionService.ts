import type { SubscriptionMeResponse } from "../types/dto";
import { apiFetch } from "./apiClient";

export const subscriptionService = {
  me() {
    return apiFetch<SubscriptionMeResponse>("/api/subscription/me", { method: "GET" });
  },
};
