export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
}

export const projects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce platform with real-time inventory management, secure payment processing, and an intuitive admin dashboard. Built with modern web technologies for optimal performance.",
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "AWS"],
    image: "/assets/generated/project-1-thumb.dim_800x500.png",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example/project1",
  },
  {
    id: "2",
    title: "Task Management App",
    description:
      "A collaborative task management application featuring real-time updates, team workspaces, and advanced filtering. Designed to streamline project workflows and boost team productivity.",
    technologies: ["TypeScript", "Next.js", "MongoDB", "Socket.io", "Tailwind"],
    image: "/assets/generated/project-2-thumb.dim_800x500.png",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example/project2",
  },
  {
    id: "3",
    title: "Portfolio CMS",
    description:
      "A headless CMS specifically designed for creative professionals to showcase their work. Features drag-and-drop content management, customizable themes, and SEO optimization.",
    technologies: ["Vue.js", "Express", "GraphQL", "Redis", "Docker"],
    image: "/assets/generated/project-3-thumb.dim_800x500.png",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example/project3",
  },
];
