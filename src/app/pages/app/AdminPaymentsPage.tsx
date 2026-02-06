import { useEffect, useState } from "react";
import { Button, Card } from "../../../components/ui";
import { paymentService } from "../../../services/paymentService";
import type { PaymentSummaryResponse } from "../../../types/dto";
import { formatDateTime } from "../../../utils/format";

export default function AdminPaymentsPage() {
  const [items, setItems] = useState<PaymentSummaryResponse[]>([]);
  const [busy, setBusy] = useState(false);

  const load = async () => {
    setBusy(true);
    try {
      const list = await paymentService.adminPending();
      setItems(list);
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="space-y-4">
      <div>
        <div className="text-xl font-bold">Admin · Pending payments</div>
        <div className="mt-1 text-sm text-slate-600">/api/admin/payments/pending</div>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between gap-3">
          <div className="text-sm font-semibold">Pending list</div>
          <Button variant="ghost" onClick={load} disabled={busy}>Refresh</Button>
        </div>

        {items.length === 0 ? (
          <div className="mt-4 text-sm text-slate-600">Pending төлбөр алга.</div>
        ) : (
          <div className="mt-4 space-y-2">
            {items.map((p) => (
              <div key={p.id} className="rounded-xl border border-slate-200 bg-white p-4 text-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="font-medium">#{p.id} · {p.status}</div>
                  <div className="text-slate-600">{p.amount} {p.currency}</div>
                </div>
                <div className="mt-1 text-xs text-slate-500">
                  provider: {p.provider} · invoice: {p.invoiceId ?? "-"} · created: {formatDateTime(p.createdAt)}
                </div>
                <div className="mt-3 flex justify-end">
                  <Button
                    size="sm"
                    onClick={async () => {
                      if (!confirm("Mark paid хийх үү?")) return;
                      await paymentService.adminMarkPaid(p.id);
                      await load();
                    }}
                  >
                    Mark paid
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
