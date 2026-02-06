import { Card } from "../../../components/ui";

export default function AnalyticsPage() {
  return (
    <div className="space-y-4">
      <div>
        <div className="text-xl font-bold">Analytics</div>
        <div className="mt-1 text-sm text-slate-600">
          Энэ хэсэгт view/click зэрэг статистик нэмэгдэнэ. (Backend event tracking endpoint нэмэгдэхэд шууд холбох бүтэцтэй.)
        </div>
      </div>

      <Card className="p-6">
        <div className="text-sm font-semibold">Coming soon</div>
        <div className="mt-2 text-sm text-slate-600">
          MVP дээр: page views, QR scans, CTA clicks гэх мэт event-үүдийг цуглуулах хэрэгтэй.
        </div>
      </Card>
    </div>
  );
}
