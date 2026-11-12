import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/ui/ProjectCard";
import { projects } from "@/data/portfolio";

export default function Projects() {
  return (
    <Section id="projects" index="03" effect="rise">
      <SectionHeading
        caption="Selected work"
        title="Projects I have built."
        description="A closer look at the things I have built while learning and growing as a developer."
      />

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.name} delay={(i % 2) * 0.1} y={40}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
