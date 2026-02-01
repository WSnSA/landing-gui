import { useState } from "react";
import { useNavigate } from "react-router";

type Project = {
    id: string;
    name: string;
    published: boolean;
};

export default function OnboardingPage() {
    const navigate = useNavigate();

    // ⬇️ түр өгөгдөл (дараа backend-с ирнэ)
    const [projects, setProjects] = useState<Project[]>([]);

    return (
        <div className="min-h-[100svh] flex flex-col bg-[#F8FAFC]">
            {/* Topbar */}
            <header className="h-16 bg-white border-b flex items-center justify-between px-6">
                <img src="/logo.png" className="h-7" />
                <button className="text-sm text-[#64748B]">Гарах</button>
            </header>

            <main className="flex-1 flex items-center justify-center px-6">
                {projects.length === 0 ? (
                    <CreateProjectForm onCreate={(project) =>
                        setProjects([project])
                    } />
                ) : (
                    <ProjectList
                        projects={projects}
                        onOpen={(id) => navigate(`/app/${id}/builder`)}
                    />
                )}
            </main>
        </div>
    );
}


function ProjectList({
                         projects,
                         onOpen,
                     }: {
    projects: Project[];
    onOpen: (id: string) => void;
}) {
    return (
        <div className="w-full max-w-3xl">
            <h1 className="text-2xl font-bold mb-6">Миний төслүүд</h1>

            <div className="grid gap-4">
                {projects.map((p) => (
                    <button
                        key={p.id}
                        onClick={() => onOpen(p.id)}
                        className="flex items-center justify-between bg-white border rounded-xl p-5 hover:shadow-md transition"
                    >
                        <div>
                            <p className="font-semibold">{p.name}</p>
                            <p className="text-sm text-[#64748B]">
                                {p.published ? "Байршуулсан" : "Draft"}
                            </p>
                        </div>

                        <span className="text-[#2563EB] text-sm">
              Нээх →
            </span>
                    </button>
                ))}
            </div>
        </div>
    );
}


function CreateProjectForm({
                               onCreate,
                           }: {
    onCreate: (p: { id: string; name: string; published: boolean }) => void;
}) {
    const [name, setName] = useState("");

    return (
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8">
            <h1 className="text-2xl font-bold mb-2">Эхний төслөө үүсгэе</h1>
            <p className="text-[#64748B] mb-6">
                Төсөл үүсгэснээр та хуудсаа удирдах боломжтой болно
            </p>

            <div className="space-y-4">
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Төслийн нэр"
                    className="w-full border rounded-lg px-4 py-3"
                />

                <button
                    disabled={!name}
                    onClick={() =>
                        onCreate({
                            id: crypto.randomUUID(),
                            name,
                            published: false,
                        })
                    }
                    className="w-full bg-[#2563EB] text-white py-3 rounded-lg disabled:opacity-50"
                >
                    Төсөл үүсгэх →
                </button>
            </div>
        </div>
    );
}