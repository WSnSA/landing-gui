import type { ManualMarkPaidRequest, PaymentCheckoutRequest, PaymentCheckoutResponse, PaymentSummaryResponse } from "../types/dto";
import { apiFetch } from "./apiClient";

export const paymentService = {
  checkout(req: PaymentCheckoutRequest) {
    return apiFetch<PaymentCheckoutResponse>("/api/payments/checkout", { method: "POST", body: JSON.stringify(req) });
  },
  myPayments() {
    return apiFetch<PaymentSummaryResponse[]>("/api/payments/me", { method: "GET" });
  },
  adminPending() {
    return apiFetch<PaymentSummaryResponse[]>("/api/admin/payments/pending", { method: "GET" });
  },
  adminMarkPaid(paymentId: number) {
    // Note: AdminPaymentController uses path var, not body; but ManualMarkPaidRequest exists too.
    // We'll use path var version.
    return apiFetch<void>(`/api/admin/payments/${paymentId}/mark-paid`, { method: "POST" });
  },
  adminMarkPaidBody(req: ManualMarkPaidRequest) {
    return apiFetch<void>(`/api/admin/payments/${req.paymentId}/mark-paid`, { method: "POST" });
  },
};
