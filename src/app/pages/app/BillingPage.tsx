import { useEffect, useState } from "react";
import { Button, Card } from "../../../components/ui";
import { subscriptionService } from "../../../services/subscriptionService";
import { paymentService } from "../../../services/paymentService";
import type { PaymentSummaryResponse, SubscriptionMeResponse } from "../../../types/dto";
import { formatDateTime } from "../../../utils/format";

const PLANS = [
  { code: "FREE", name: "Free", desc: "Туршилт/жижиг хэрэглээ" },
  { code: "PRO", name: "Pro", desc: "Илүү олон landing + publish" },
  { code: "BUSINESS", name: "Business", desc: "Домайн, өндөр лимит" },
];

export default function BillingPage() {
  const [sub, setSub] = useState<SubscriptionMeResponse | null>(null);
  const [payments, setPayments] = useState<PaymentSummaryResponse[]>([]);
  const [busy, setBusy] = useState(false);

  const load = async () => {
    setBusy(true);
    try {
      const [s, p] = await Promise.all([
        subscriptionService.me(),
        paymentService.myPayments().catch(() => [] as PaymentSummaryResponse[]),
      ]);
      setSub(s);
      setPayments(p);
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => { load(); }, []);

  const checkout = async (planCode: string) => {
    setBusy(true);
    try {
      const res = await paymentService.checkout({ planCode });
      alert(`Checkout created. paymentId=${res.paymentId} invoiceId=${res.invoiceId} status=${res.status}`);
      await load();
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="text-xl font-bold">Billing</div>
        <div className="mt-1 text-sm text-slate-600">Plan, лимит, төлбөрийн түүх.</div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-1">
          <div className="text-sm font-semibold">Current subscription</div>
          {!sub ? (
            <div className="mt-3 text-sm text-slate-600">Loading…</div>
          ) : (
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-slate-600">Plan</span><span className="font-medium">{sub.planCode}</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Status</span><span className="font-medium">{sub.status}</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Start</span><span className="font-medium">{formatDateTime(sub.startAt)}</span></div>
              <div className="flex justify-between"><span className="text-slate-600">End</span><span className="font-medium">{formatDateTime(sub.endAt)}</span></div>
              <div className="pt-3 border-t border-slate-200">
                <div className="text-xs font-semibold text-slate-700">Limits</div>
                <div className="mt-2 space-y-1 text-xs text-slate-600">
                  <div>maxLandings: {sub.maxLandings}</div>
                  <div>maxDomains: {sub.maxDomains}</div>
                  <div>allowCustomDomain: {String(sub.allowCustomDomain)}</div>
                  <div>allowPublish: {String(sub.allowPublish)}</div>
                </div>
              </div>
            </div>
          )}
          <div className="mt-4">
            <Button variant="ghost" onClick={load} disabled={busy}>Refresh</Button>
          </div>
        </Card>

        <Card className="p-6 lg:col-span-2">
          <div className="text-sm font-semibold">Upgrade / Checkout</div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {PLANS.map((p) => (
              <div key={p.code} className="rounded-2xl border border-slate-200 p-4">
                <div className="font-semibold">{p.name}</div>
                <div className="mt-1 text-sm text-slate-600">{p.desc}</div>
                <div className="mt-4">
                  <Button className="w-full" onClick={() => checkout(p.code)} disabled={busy}>Choose {p.code}</Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <div className="text-sm font-semibold">Payment history</div>
            {payments.length === 0 ? (
              <div className="mt-2 text-sm text-slate-600">Төлбөрийн түүх хоосон.</div>
            ) : (
              <div className="mt-3 space-y-2">
                {payments.map((p) => (
                  <div key={p.id} className="rounded-xl border border-slate-200 bg-white p-4 text-sm">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="font-medium">#{p.id} · {p.status}</div>
                      <div className="text-slate-600">{p.amount} {p.currency}</div>
                    </div>
                    <div className="mt-1 text-xs text-slate-500">
                      provider: {p.provider} · invoice: {p.invoiceId ?? "-"} · created: {formatDateTime(p.createdAt)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
