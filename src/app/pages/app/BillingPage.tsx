import { useEffect, useState } from "react";
import { Card } from "../../components/ui";
import { paymentService } from "../../services/paymentService";
import type { PaymentSummaryResponse } from "../../types/dto";
import { formatDateTime } from "../../utils/format";

export default function BillingPage() {
  const [payments, setPayments] = useState<PaymentSummaryResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    paymentService.myPayments()
      .then(setPayments)
      .catch(() => setPayments([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-4">
      <div>
        <div className="text-xl font-bold text-slate-900">Billing</div>
        <div className="mt-1 text-sm text-slate-500">Төлбөр, subscription мэдээлэл.</div>
      </div>

      {/* Current plan */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-slate-500 font-medium">Одоогийн тарифф</div>
            <div className="mt-1 text-2xl font-bold text-slate-900">Үнэгүй</div>
          </div>
          <span className="rounded-full bg-green-100 text-green-700 px-3 py-1 text-sm font-medium">
            Идэвхтэй
          </span>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          {[
            { label: "Сайтын тоо", value: "Хязгааргүй" },
            { label: "Нийтлэх", value: "Боломжтой" },
            { label: "Үнэ", value: "Үнэгүй" },
          ].map((item) => (
            <div key={item.label} className="rounded-xl bg-slate-50 p-3">
              <div className="text-xs text-slate-500">{item.label}</div>
              <div className="mt-1 text-sm font-semibold text-slate-900">{item.value}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Payment history */}
      <Card className="p-6">
        <div className="text-sm font-semibold text-slate-900 mb-4">Төлбөрийн түүх</div>
        {loading ? (
          <div className="text-sm text-slate-400">Ачаалж байна…</div>
        ) : payments.length === 0 ? (
          <div className="text-sm text-slate-400 py-4 text-center">Төлбөрийн түүх хоосон байна.</div>
        ) : (
          <div className="space-y-2">
            {payments.map((p) => (
              <div key={p.id} className="rounded-xl border border-slate-200 p-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-sm font-medium text-slate-900">
                    {p.amount?.toLocaleString()} {p.currency}
                  </div>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    p.status === "PAID"
                      ? "bg-green-100 text-green-700"
                      : p.status === "PENDING"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-slate-100 text-slate-600"
                  }`}>
                    {p.status === "PAID" ? "Төлсөн" : p.status === "PENDING" ? "Хүлээгдэж байна" : p.status}
                  </span>
                </div>
                <div className="mt-1 text-xs text-slate-400">{formatDateTime(p.createdAt)}</div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
