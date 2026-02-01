import { templatesDB } from "../../../data/template.db";
import { projectsDB } from "../../../data/projects.db";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function BuilderPage() {
    const template = templatesDB[0]; // түр
    const navigate = useNavigate();

    const [content, setContent] = useState({
        hero: { title: "", subtitle: "", image: "" },
        about: { text: "", image: "" },
        menu: [],
    });

    const createLanding = () => {
        const projectId = crypto.randomUUID();

        projectsDB.push({
            id: projectId,
            name: content.hero.title || "New Landing",
            templateId: template.id,
            content,
        });

        navigate(`/app/${projectId}/preview`);
    };

    return (
        <div className="max-w-3xl mx-auto p-6 space-y-6">
            <h1 className="text-2xl font-bold">Landing build хийх</h1>

            <input
                placeholder="Hero title"
                className="border p-3 rounded w-full"
                onChange={(e) =>
                    setContent({
                        ...content,
                        hero: { ...content.hero, title: e.target.value },
                    })
                }
            />

            <textarea
                placeholder="About text"
                className="border p-3 rounded w-full"
                onChange={(e) =>
                    setContent({
                        ...content,
                        about: { ...content.about, text: e.target.value },
                    })
                }
            />

            <button
                onClick={createLanding}
                className="bg-blue-600 text-white px-6 py-3 rounded"
            >
                Landing үүсгэх →
            </button>
        </div>
    );
}
