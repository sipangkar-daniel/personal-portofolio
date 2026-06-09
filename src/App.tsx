import React, { useEffect } from "react";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { SectionWrapper } from "./components/layout/SectionWrapper";
import { About } from "./sections/About";
import { ExperienceSection } from "./sections/Experience";
import { ProjectSection } from "./sections/Project";
import { ContactSection } from "./sections/Contact";
import { TestimonialsSection } from "./sections/Testimonials";
import { CanvasRevealEffect } from "./components/ui/CanvasRevealEffect";
import { useRouter } from "./hooks/useRouter";
import { useProjects } from "./hooks/useProjects";
import { ProjectDetail } from "./pages/ProjectDetail";
import { ExperienceDetail } from "./pages/ExperienceDetail";
import "./App.css";

const App: React.FC = () => {
  const { currentPath, previousPath } = useRouter();
  const projectsDataState = useProjects();

  useEffect(() => {
    if (currentPath === "/") {
      let targetId = "";
      if (window.location.hash) {
        targetId = window.location.hash;
      } else if (previousPath) {
        if (previousPath.startsWith("/project/")) {
          targetId = "#projects";
        } else if (previousPath.startsWith("/experience/")) {
          targetId = "#experience";
        }
      }

      if (targetId) {
        const timer = setTimeout(() => {
          const element = document.querySelector(targetId);
          if (element) {
            element.scrollIntoView({ behavior: "instant" });
          }
        }, 150);
        return () => clearTimeout(timer);
      }
    }
  }, [currentPath, previousPath]);

  const renderContent = () => {
    // Check for Project Detail Route: /project/:id
    const projectMatch = currentPath.match(/^\/project\/([^/]+)/);
    if (projectMatch) {
      const projectId = projectMatch[1];
      return <ProjectDetail projectId={projectId} />;
    }

    // Check for Experience Detail Route: /experience/:id
    const experienceMatch = currentPath.match(/^\/experience\/([^/]+)/);
    if (experienceMatch) {
      const experienceId = experienceMatch[1];
      return <ExperienceDetail experienceId={experienceId} />;
    }

    // Default: Home Page Sections Layout
    return (
      <main className="flex-1 flex flex-col items-center w-full pt-16 relative z-20">
        {/* About Daniel Sipangkar */}
        <SectionWrapper id="about">
          <About />
        </SectionWrapper>

        {/* Career Milestone Timeline */}
        <SectionWrapper id="experience">
          <ExperienceSection />
        </SectionWrapper>

        {/* 3D Scroll Parallax Projects */}
        <SectionWrapper id="projects">
          <ProjectSection
            projects={projectsDataState.projects}
            loading={projectsDataState.loading}
            error={projectsDataState.error}
          />
        </SectionWrapper>

        {/* Moving Client Testimonials Slider */}
        <SectionWrapper id="testimonials">
          <TestimonialsSection />
        </SectionWrapper>

        {/* Connection Terminal Form */}
        <SectionWrapper id="contact">
          <ContactSection />
        </SectionWrapper>
      </main>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none overflow-x-hidden antialiased">
      {/* Global tech node connection grid background */}
      <CanvasRevealEffect className="border-none bg-transparent min-h-screen flex flex-col w-full">
        {/* Floating resizable Navigation */}
        <Navbar />

        {renderContent()}

        {/* Global Footer */}
        <Footer />
      </CanvasRevealEffect>
    </div>
  );
};

export default App;
