import React from "react";
import { cn } from "../../utils/cn";

interface ToolCardProps {
  name: string;
  icon: string;
  fallbackIcon?: string;
  className?: string;
}

export const ToolCard: React.FC<ToolCardProps> = ({ name, icon, fallbackIcon, className }) => {
  // Safe fallback if primary image asset fails to load
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    if (fallbackIcon) {
      target.src = fallbackIcon;
    }
  };

  return (
    <div
      className={cn(
        "group/tool relative flex items-center justify-center rounded-xl border border-slate-800/30 bg-slate-950/10 p-4 h-24 w-full cursor-pointer overflow-hidden transition-all duration-500 hover:border-blue-500/40 hover:bg-slate-900/80 hover:shadow-lg hover:shadow-blue-950/20 shadow-sm",
        className
      )}
    >
      {/* Background glow matching the tool theme on hover */}
      <div className="absolute inset-0 bg-radial-gradient opacity-0 group-hover/tool:opacity-10 transition-opacity duration-500 pointer-events-none" />

      {/* Tool details */}
      <div className="flex flex-col items-center justify-center w-full h-full text-center relative">
        {/* Animated Icon Wrapper (Centered by default, shifts up and scales down on hover) */}
        <div
          className="flex items-center justify-center z-10 pointer-events-none transition-all duration-300 ease-out translate-y-0 scale-[1.3] group-hover/tool:translate-y-[-10px] group-hover/tool:scale-[1.0]"
        >
          <div className="w-8 h-8 flex items-center justify-center">
            <img
              src={icon}
              alt={name}
              onError={handleImageError}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>

        {/* Text Label (Hidden by default, slides up and fades in on hover) */}
        <span className="absolute bottom-2 text-[11px] font-semibold text-slate-400 select-none tracking-wide transition-all duration-300 ease-out opacity-0 translate-y-2 group-hover/tool:opacity-100 group-hover/tool:translate-y-0 z-0 pointer-events-none">
          {name}
        </span>
      </div>
    </div>
  );
};
