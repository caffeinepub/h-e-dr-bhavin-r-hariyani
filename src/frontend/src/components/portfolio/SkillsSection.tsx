import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, Code2, Database, Palette } from "lucide-react";
import { Section } from "./Section";

const skillCategories = [
  {
    title: "Frontend",
    icon: Code2,
    skills: [
      "React",
      "TypeScript",
      "Next.js",
      "Vue.js",
      "Tailwind CSS",
      "HTML/CSS",
    ],
  },
  {
    title: "Backend",
    icon: Database,
    skills: [
      "Node.js",
      "Express",
      "PostgreSQL",
      "MongoDB",
      "GraphQL",
      "REST APIs",
    ],
  },
  {
    title: "Design",
    icon: Palette,
    skills: [
      "UI/UX Design",
      "Figma",
      "Adobe XD",
      "Responsive Design",
      "Accessibility",
    ],
  },
  {
    title: "DevOps",
    icon: Cloud,
    skills: ["Docker", "AWS", "CI/CD", "Git", "Linux", "Nginx"],
  },
];

export function SkillsSection() {
  return (
    <Section id="skills" className="bg-secondary/30">
      <div className="text-center mb-12">
        <h2 className="section-title">Skills & Technologies</h2>
        <p className="section-subtitle mx-auto mt-4">
          A comprehensive toolkit built through years of hands-on experience and
          continuous learning.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillCategories.map((category) => {
          const Icon = category.icon;
          return (
            <Card
              key={category.title}
              className="hover:shadow-soft transition-shadow duration-300"
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="text-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
