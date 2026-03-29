import { Section } from "./Section";

export function AboutSection() {
  return (
    <Section id="about" className="bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="section-title text-center">About Me</h2>
        <div className="mt-8 space-y-6 text-lg text-foreground/80 leading-relaxed">
          <p>
            I'm a passionate developer and designer with a love for creating
            elegant solutions to complex problems. With years of experience in
            web development, I specialize in building responsive, user-friendly
            applications that prioritize both aesthetics and functionality.
          </p>
          <p>
            My journey in tech began with a curiosity about how things work,
            which evolved into a career dedicated to crafting digital
            experiences. I believe in the power of clean code, thoughtful
            design, and continuous learning.
          </p>
          <p>
            When I'm not coding, you can find me exploring new technologies,
            contributing to open-source projects, or sharing knowledge with the
            developer community. I'm always excited to collaborate on projects
            that push boundaries and create meaningful impact.
          </p>
        </div>
      </div>
    </Section>
  );
}
