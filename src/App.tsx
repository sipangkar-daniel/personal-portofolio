import React from "react";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { SectionWrapper } from "./components/layout/SectionWrapper";
import { About } from "./sections/About";
import { ExperienceSection } from "./sections/Experience";
import { ProjectSection } from "./sections/Project";
import { ContactSection } from "./sections/Contact";
import { TestimonialsSection } from "./sections/Testimonials";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none overflow-x-hidden antialiased">
      {/* Floating resizable Navigation */}
      <Navbar />

      {/* Main Sections Assembly */}
      <main className="flex-1 flex flex-col items-center w-full pt-16">
        
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
          <ProjectSection />
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

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

export default App;
