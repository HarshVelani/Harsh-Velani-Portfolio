import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { PortfolioProjects } from "@/components/portfolio-projects";
import { TechStack } from "@/components/sections/tech-stack";
import { Education } from "@/components/sections/education";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <PortfolioProjects />
      <TechStack />
      <Education />
      <Contact />
      <Footer />
    </main>
  );
}
