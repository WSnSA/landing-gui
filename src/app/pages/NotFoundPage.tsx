import { Link } from "react-router-dom";
import { Button, Card } from "../../components/ui";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-slate-50 grid place-items-center px-4">
      <Card className="w-full max-w-md p-8 text-center">
        <div className="text-2xl font-extrabold">404</div>
        <div className="mt-2 text-slate-600">Хуудас олдсонгүй.</div>
        <div className="mt-6 flex justify-center gap-2">
          <Link to="/"><Button>Нүүр</Button></Link>
          <Link to="/onboarding"><Button variant="secondary">Onboarding</Button></Link>
        </div>
      </Card>
    </div>
  );
}
