import React, { useState } from "react";
import { Menu, X, Terminal } from "lucide-react";
import { useScrollResize } from "../../hooks/useScrollResize";
import { cn } from "../../utils/cn";
import { personalDescription, portfolioText } from "../../constants/portfolioData";

export const Navbar: React.FC = () => {
  const isScrolled = useScrollResize(60);
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = portfolioText.navbar.navLinks;

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300 flex items-center justify-between px-6 md:px-12 w-full border-b border-transparent",
        isScrolled
          ? "py-3 bg-slate-950 md:bg-slate-950/80 md:backdrop-blur-md border-slate-800/60 shadow-lg shadow-black/10"
          : "py-6 bg-transparent"
      )}
    >
      {/* Brand Logo */}
      <a href="#" className="flex items-center gap-2 group">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold group-hover:bg-blue-500 transition-colors duration-200 shadow-md">
          <Terminal className="w-4 h-4" />
        </div>
        <span className="text-white font-bold text-lg tracking-wider group-hover:text-blue-400 transition-colors duration-200">
          {portfolioText.navbar.brandName}
        </span>
      </a>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-4">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-slate-300 hover:text-blue-400 hover:bg-blue-950/20 hover:border-blue-900/30 border border-transparent px-3 py-1.5 rounded-lg font-medium text-sm transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.15)]"
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* CTA Button (Desktop) */}
      <div className="hidden md:block">
        <a
          href="#contact"
          className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-all duration-200 shadow-md shadow-blue-900/20"
        >
          {portfolioText.navbar.ctaText}
        </a>
      </div>

      {/* Hamburger Toggle (Mobile) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-slate-300 hover:text-white transition-colors duration-200"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Drawer Menu */}
      <div
        className={cn(
          "fixed top-0 bottom-0 right-0 w-64 bg-slate-900 border-l border-slate-800 z-50 p-6 flex flex-col gap-8 transition-transform duration-300 md:hidden",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
          <span className="text-white font-bold tracking-wider">{portfolioText.navbar.drawerTitle}</span>
          <button
            onClick={() => setIsOpen(false)}
            className="text-slate-400 hover:text-white transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-slate-300 hover:text-blue-400 font-semibold text-base transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="mt-auto border-t border-slate-800/80 pt-6">
          <a
            href={personalDescription.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center text-xs font-semibold text-white bg-blue-600 py-2.5 rounded-lg hover:bg-blue-500 transition-all duration-200"
          >
            {portfolioText.navbar.linkedinBtn}
          </a>
        </div>
      </div>
      
      {/* Background shadow for mobile overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
        />
      )}
    </nav>
  );
};
