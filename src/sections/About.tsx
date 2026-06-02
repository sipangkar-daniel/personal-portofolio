import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, ArrowRight, Mail, MessageSquare } from "lucide-react";
import { BackgroundRipple } from "../components/ui/BackgroundRipple";
import { FlipWords } from "../components/ui/FlipWords";
import { CanvasRevealEffect } from "../components/ui/CanvasRevealEffect";
import { ToolCard } from "../components/ui/ToolCard";
import { AnimatedButton } from "../components/ui/AnimatedButton";
import { aboutData, toolsData } from "../constants/portfolioData";

export const About: React.FC = () => {
  const [showSocials, setShowSocials] = useState(false);

  // Trigger dynamic text file download for Resume
  const triggerResumeDownload = () => {
    const resumeText = `
========================================
DANIEL SIPANGKAR - RESUME
========================================
Role: Backend & Frontend Developer (Full-Stack)
Email: daniel222mu@gmail.com
LinkedIn: https://www.linkedin.com/in/daniel-sipangkar/
WhatsApp: +6282272253799

TECHNICAL SKILLS:
- Languages: Java, JavaScript, TypeScript
- Frameworks: Spring Boot, React, Angular, Express
- Databases: PostgreSQL, OracleDB, Redis
- Streaming & Search: Apache Kafka, Elasticsearch (Elastic)
- Reporting: Jasper Reports

EXPERIENCE SUMMARY:
3+ years of experience engineering high-performance API structures, microservices architectures, data caching strategies, and robust client portals.
    `.trim();

    const blob = new Blob([resumeText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Daniel_Sipangkar_Resume.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="about" className="py-20 md:py-28 px-4 md:px-12 max-w-7xl mx-auto w-full">
      <BackgroundRipple>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          
          {/* Top Left Row - Text content & Buttons */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 text-left">
            <span className="text-blue-500 font-bold uppercase tracking-wider text-xs md:text-sm">
              Welcome to My Portfolio
            </span>
            
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              Hi, I'm <br className="md:hidden" />
              <FlipWords words={["Daniel Sipangkar", "Backend Developer", "Mobile Developer"]} duration={2800} />
            </h1>

            {/* Gently fading description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-slate-400 text-sm md:text-base leading-relaxed"
            >
              {aboutData.description} Specialized in creating microservices pipelines, secure database querying, and data sync engines, whilst implementing responsive user-facing panels to deliver a complete, highly optimized stack.
            </motion.p>

            {/* Actions Grid */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-4">
              {/* Resume download (Moving border style) */}
              <AnimatedButton
                variant="moving-border"
                onClick={triggerResumeDownload}
              >
                <Download className="w-4 h-4 mr-1 text-blue-400 animate-bounce" />
                My Resume
              </AnimatedButton>

              {/* Toggle On Touch social sliding menu */}
              <div className="relative flex flex-col sm:flex-row items-center gap-3">
                <AnimatedButton
                  variant="hover-gradient"
                  onClick={() => setShowSocials(!showSocials)}
                  className="w-full sm:w-auto"
                >
                  On Touch
                  <ArrowRight className={`w-4 h-4 ml-1 transition-transform duration-300 ${showSocials ? "rotate-90" : "rotate-0"}`} />
                </AnimatedButton>

                {/* Sliding sub-buttons */}
                <AnimatePresence>
                  {showSocials && (
                    <motion.div
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      transition={{ type: "spring", stiffness: 200, damping: 18 }}
                      className="flex items-center gap-3 bg-slate-900/90 border border-slate-800 rounded-lg p-1.5 shadow-md"
                    >
                      {/* LinkedIn */}
                      <a
                        href={aboutData.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-md hover:bg-slate-800 text-slate-400 hover:text-blue-400 transition-colors"
                        title="LinkedIn"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </a>
                      
                      {/* Email */}
                      <a
                        href={`mailto:${aboutData.socialLinks.email}`}
                        className="p-2 rounded-md hover:bg-slate-800 text-slate-400 hover:text-red-400 transition-colors"
                        title="Email"
                      >
                        <Mail className="w-4 h-4" />
                      </a>

                      {/* WhatsApp */}
                      <a
                        href={aboutData.socialLinks.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-md hover:bg-slate-800 text-slate-400 hover:text-emerald-400 transition-colors"
                        title="WhatsApp"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Top Right Row - Canvas reveal profile picture */}
          <div className="lg:col-span-5 h-[320px] md:h-[400px] w-full">
            <CanvasRevealEffect>
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center select-none">
                {/* Default Placeholder Avatar */}
                <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border-2 border-slate-700 bg-slate-900 flex items-center justify-center shadow-lg group-hover:scale-95 group-hover:border-blue-500/80 transition-all duration-500 overflow-hidden">
                  <svg className="w-16 h-16 text-slate-400 group-hover:text-blue-400 transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                
                <h3 className="text-white font-bold text-lg mt-4 group-hover:text-blue-400 transition-colors duration-500">
                  {aboutData.name}
                </h3>
                <p className="text-xs text-slate-500 group-hover:text-indigo-400 transition-colors duration-500 mt-1">
                  Full Stack / Backend Systems
                </p>
                <div className="mt-4 px-3 py-1 rounded-full border border-slate-800 bg-slate-900/60 text-[10px] text-slate-400 uppercase tracking-widest group-hover:border-blue-500/40 group-hover:text-blue-300 transition-colors duration-500">
                  Hover to inspect terminal log
                </div>
              </div>
            </CanvasRevealEffect>
          </div>

          {/* Bottom Row - Expertise Grid */}
          <div className="lg:col-span-12 border-t border-slate-800/80 pt-10">
            <h3 className="text-lg font-bold text-white mb-6 text-left tracking-wide">
              Core Technical Stack & Tools
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {toolsData.map((tool) => (
                <ToolCard key={tool.name} name={tool.name} />
              ))}
            </div>
          </div>
          
        </div>
      </BackgroundRipple>
    </section>
  );
};
