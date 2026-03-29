import { projects } from "@/content/projects";
import { ProjectCard } from "./ProjectCard";
import { Section } from "./Section";

export function ProjectsSection() {
  return (
    <Section id="projects">
      <div className="text-center mb-12">
        <h2 className="section-title">Featured Projects</h2>
        <p className="section-subtitle mx-auto mt-4">
          A selection of my recent work showcasing various technologies and
          design approaches.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Section>
  );
}
