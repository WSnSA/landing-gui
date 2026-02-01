import { useParams } from "react-router";
import { projectsDB } from "../../../data/projects.db";
import { templatesDB } from "../../../data/template.db";
import { templateRenderer } from "../../../templates/renderer/templateRenderer";

export default function PreviewPage() {
    const { projectId } = useParams();

    // @ts-ignore
    const project = projectsDB.find((p) => p.id === projectId);
    if (!project) return <div>Not found</div>;

    // @ts-ignore
    const templateMeta = templatesDB.find(
        (t) => t.id === project.templateId
    )!;

    const TemplateComponent =
        templateRenderer[templateMeta.component];

    return <TemplateComponent data={project.content} />;
}
