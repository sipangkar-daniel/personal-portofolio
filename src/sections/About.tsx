import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, ArrowRight, Mail, MessageSquare } from "lucide-react";
import { BackgroundRipple } from "../components/ui/BackgroundRipple";
import { FlipWords } from "../components/ui/FlipWords";
import { ToolCard } from "../components/ui/ToolCard";
import { AnimatedButton } from "../components/ui/AnimatedButton";
import { personalDescription, techStack, portfolioText } from "../constants/portfolioData";
import { Ripple } from "../components/ui/Ripple";
import { ShineBorder } from "../components/ui/ShineBorder";
import profileImage from "../assets/image/profile_image.png";

export const About: React.FC = () => {
  const [showSocials, setShowSocials] = useState(false);

  // Trigger dynamic text file download for Resume
  const triggerResumeDownload = () => {
    const resumeText = `
${portfolioText.about.resumeHeaderLine}
${portfolioText.about.resumeHeaderText}
${portfolioText.about.resumeHeaderLine}
${portfolioText.about.resumeRoleLabel}
${portfolioText.about.resumeEmailLabel} ${personalDescription.socialLinks.email}
${portfolioText.about.resumeLinkedInLabel} ${personalDescription.socialLinks.linkedin}
${portfolioText.about.resumeWhatsAppLabel} ${personalDescription.socialLinks.whatsapp}

${portfolioText.about.resumeSkillsLabel}
${portfolioText.about.resumeSkillsList.join("\n")}

${portfolioText.about.resumeSummaryLabel}
${portfolioText.about.resumeSummaryText}
    `.trim();

    const blob = new Blob([resumeText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = portfolioText.about.resumeFilename;
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
              {portfolioText.about.welcomeTag}
            </span>
            
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight min-h-[110px] sm:min-h-[85px] md:min-h-[60px]">
              {portfolioText.about.greetingPrefix} <br className="-bottom-0 md:text-lg" />
              <FlipWords words={personalDescription.flipWords} duration={2800} />
            </h1>

            {/* Gently fading description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-slate-400 text-sm md:text-base leading-relaxed"
            >
              {personalDescription.description} {portfolioText.about.descriptionSuffix}
            </motion.p>

            {/* Actions Grid */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-4">
              {/* Resume download (Moving border style) */}
              <AnimatedButton
                variant="moving-border"
                onClick={triggerResumeDownload}
              >
                <Download className="w-4 h-4 mr-1 text-blue-400 animate-bounce" />
                {portfolioText.about.resumeBtn}
              </AnimatedButton>

              {/* Toggle On Touch social sliding menu (on hover) */}
              <div 
                className="relative flex flex-col sm:flex-row items-center gap-3"
                onMouseEnter={() => setShowSocials(true)}
                onMouseLeave={() => setShowSocials(false)}
              >
                <AnimatedButton
                  variant="hover-gradient"
                  className="w-full sm:w-auto"
                >
                  {portfolioText.about.onTouchBtn}
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
                        href={personalDescription.socialLinks.linkedin}
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
                        href={`mailto:${personalDescription.socialLinks.email}`}
                        className="p-2 rounded-md hover:bg-slate-800 text-slate-400 hover:text-red-400 transition-colors"
                        title="Email"
                      >
                        <Mail className="w-4 h-4" />
                      </a>

                      {/* WhatsApp */}
                      <a
                        href={personalDescription.socialLinks.whatsapp}
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

          {/* Top Right Row - Clean Profile Picture Card */}
          <div className="lg:col-span-5 h-[320px] md:h-[400px] w-full flex items-center justify-center z-20">
            <ShineBorder
              className="w-full h-full bg-slate-900/60 rounded-2xl overflow-hidden group shadow-xl border border-slate-800/80"
              borderRadius={16}
              borderWidth={1.5}
              duration={10}
              shineColor={["#3B82F6", "#8B5CF6", "#10B981"]}
            >
              <div className="relative overflow-hidden w-full h-full flex items-center justify-center">
                {/* Ripple Animation background */}
                <Ripple className="opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none" />
                
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-purple-500/5 opacity-60 pointer-events-none" />
                <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
                
                {/* User Profile Photo (Full Card Cutout) */}
                <img
                  src={profileImage}
                  alt={personalDescription.name}
                  className="absolute bottom-0 inset-x-0 h-[80%] md:h-[100%] w-auto mx-auto object-contain object-bottom select-none transition-transform duration-500 group-hover:scale-105 z-10 scroll-reveal"
                />

                {/* Bottom Shadow Gradient to mask image cut off and improve text readability */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent z-20 pointer-events-none" />

                {/* Name Tag (Absolute Overlay at the bottom) */}
                {/*<div className="absolute bottom-6 left-6 right-6 z-30 text-left">*/}
                {/*  <h3 className="text-white font-bold text-xl group-hover:text-blue-400 transition-colors duration-300">*/}
                {/*    {personalDescription.name}*/}
                {/*  </h3>*/}
                {/*  <p className="text-xs text-slate-400 group-hover:text-indigo-400 transition-colors duration-300 mt-1 font-semibold tracking-wide">*/}
                {/*    {portfolioText.about.profileTitle}*/}
                {/*  </p>*/}
                {/*</div>*/}
              </div>
            </ShineBorder>
          </div>

          {/* Bottom Row - Expertise Grid */}
          <div className="lg:col-span-12 border-t border-slate-800/80 pt-10">
            <h3 className="text-lg font-bold text-white mb-6 text-left tracking-wide">
              {portfolioText.about.techStackTitle}
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {techStack.map((tool) => (
                <ToolCard key={tool.name} name={tool.name} icon={tool.icon} fallbackIcon={tool.fallbackIcon} />
              ))}
            </div>
          </div>
          
        </div>
      </BackgroundRipple>
    </section>
  );
};
