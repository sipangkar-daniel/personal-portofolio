import React from "react";
import { Terminal, Heart } from "lucide-react";
import { aboutData } from "../../constants/portfolioData";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-slate-950 border-t border-slate-900/80 py-10 md:py-14 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand Left */}
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-blue-500" />
          <span className="text-slate-400 text-xs font-semibold tracking-wider font-mono">
            SYSTEM CORE: ACTIVE | RESPONDING 200 OK
          </span>
        </div>

        {/* Copyright Center */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <span>&copy; {currentYear} {aboutData.name}. Crafted with</span>
          <Heart className="w-3 h-3 text-red-500 fill-current animate-pulse" />
          <span>using React & Spring Boot.</span>
        </div>

        {/* Social Anchors Right */}
        <div className="flex items-center gap-5 text-xs font-semibold text-slate-400">
          <a
            href={aboutData.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${aboutData.socialLinks.email}`}
            className="hover:text-red-400 transition-colors"
          >
            Email
          </a>
          <a
            href={aboutData.socialLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-400 transition-colors"
          >
            WhatsApp
          </a>
        </div>

      </div>
    </footer>
  );
};
