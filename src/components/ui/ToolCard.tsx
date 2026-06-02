import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

interface ToolCardProps {
  name: string;
  className?: string;
}

// Custom colored SVG icons for Daniel's skillset
const getToolIcon = (name: string) => {
  const normalized = name.toLowerCase();
  
  if (normalized.includes("java") && !normalized.includes("spring")) {
    return (
      <svg className="w-10 h-10 text-red-500 fill-current" viewBox="0 0 24 24">
        <path d="M2 19.5c0 .83.67 1.5 1.5 1.5h17c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5H3.5c-.83 0-1.5.67-1.5 1.5zm19-5.5h-2c-.55 0-1 .45-1 1s.45 1 1 1h2c.55 0 1-.45 1-1s-.45-1-1-1zm-6-2.5h-2c-.55 0-1 .45-1 1s.45 1 1 1h2c.55 0 1-.45 1-1s-.45-1-1-1zm-5.5-3c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-2c0-.55-.45-1-1-1h-2zM15 4c0-1.1-.9-2-2-2h-2c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2V4zm-5 13.5c0-.83-.67-1.5-1.5-1.5H5.41c-.42 0-.62-.51-.33-.8l4.09-4.09c.29-.29.29-.77 0-1.06L8.1 9.1c-.29-.29-.77-.29-1.06 0L2.95 13.2c-.59.59-.2 1.6.64 1.6H7c.55 0 1 .45 1 1v1.7c0 .55.45 1 1 1h1V17.5z" />
      </svg>
    );
  }
  if (normalized.includes("springboot")) {
    return (
      <svg className="w-10 h-10 text-emerald-500 fill-current" viewBox="0 0 24 24">
        <path d="M12.4 2C6.4 2 2 6.4 2 12.4c0 4.6 2.8 8.6 6.8 10.1v-3.7C6.1 17.5 4.8 15 4.8 12.4 4.8 8 8 4.8 12.4 4.8s7.6 3.2 7.6 7.6c0 2.6-1.3 5.1-4 6.4v3.7c4-1.5 6.8-5.5 6.8-10.1C22.8 6.4 18.4 2 12.4 2zm-1.8 14.3v-4.1h-4v4.1h4zm3.6-5.8v-4.1h-4v4.1h4zm0 5.8v-4.1h-4v4.1h4z" />
      </svg>
    );
  }
  if (normalized.includes("javascript")) {
    return (
      <svg className="w-10 h-10 text-yellow-500 fill-current" viewBox="0 0 24 24">
        <path d="M3 3h18v18H3V3zm12.54 11.23c0-.83-.4-1.42-1.22-1.85-.56-.28-1.16-.48-1.8-.6-.43-.08-.85-.2-1.25-.37-.34-.14-.52-.39-.52-.76 0-.44.38-.72.93-.72.58 0 .97.23 1.13.7l1.9-.78c-.33-.87-1.14-1.63-2.47-1.82V6h-1.92v2.32c-1.33.15-2.43.99-2.43 2.37 0 .98.54 1.63 1.5 2.05.6.25 1.25.43 1.91.56.55.1 1.09.28 1.6.53.4.2.59.5.59.95 0 .54-.47.88-1.24.88-.73 0-1.24-.34-1.46-.86l-1.93.73c.37 1.05 1.29 1.83 2.76 2v2.37h1.92V15.7c1.47-.15 2.45-.96 2.45-2.47z" />
      </svg>
    );
  }
  if (normalized.includes("react")) {
    return (
      <svg className="w-10 h-10 text-blue-400 fill-none stroke-current stroke-2 animate-pulse-slow" viewBox="0 0 24 24">
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(90 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(150 12 12)" />
        <circle cx="12" cy="12" r="1.5" className="fill-current" />
      </svg>
    );
  }
  if (normalized.includes("angular")) {
    return (
      <svg className="w-10 h-10 text-red-600 fill-current" viewBox="0 0 24 24">
        <path d="M12 2L2 5.5l1.5 12.5L12 22l8.5-4L22 5.5zM12 4.2l7.2 2.6-1.1 10.4-6.1 2.9-6.1-2.9-1.1-10.4zm0 2.6L7 16h2.2l1.1-2.8h3.4l1.1 2.8H17zM12 9l1.1 2.8h-2.2z" />
      </svg>
    );
  }
  if (normalized.includes("oracledb") || normalized.includes("oracle")) {
    return (
      <svg className="w-10 h-10 text-red-500 fill-current" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-4-9h8v2H8z" />
      </svg>
    );
  }
  if (normalized.includes("postgresql") || normalized.includes("postgres")) {
    return (
      <svg className="w-10 h-10 text-blue-500 fill-current" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
      </svg>
    );
  }
  if (normalized.includes("redis")) {
    return (
      <svg className="w-10 h-10 text-red-500 fill-current" viewBox="0 0 24 24">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
      </svg>
    );
  }
  if (normalized.includes("kafka")) {
    return (
      <svg className="w-10 h-10 text-purple-400 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
        <circle cx="12" cy="6" r="3" className="fill-current" />
        <circle cx="6" cy="16" r="3" className="fill-current" />
        <circle cx="18" cy="16" r="3" className="fill-current" />
        <path d="M12 9l-4 4m6-4l4 4" />
      </svg>
    );
  }
  if (normalized.includes("jasper")) {
    return (
      <svg className="w-10 h-10 text-orange-400 fill-current" viewBox="0 0 24 24">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
      </svg>
    );
  }
  if (normalized.includes("elastic")) {
    return (
      <svg className="w-10 h-10 text-emerald-400 fill-current" viewBox="0 0 24 24">
        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
      </svg>
    );
  }

  // Fallback
  return (
    <svg className="w-10 h-10 text-slate-400 fill-current" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
    </svg>
  );
};

export const ToolCard: React.FC<ToolCardProps> = ({ name, className }) => {
  return (
    <div
      className={cn(
        "group relative flex items-center justify-center rounded-xl border border-slate-800 bg-slate-900/60 p-4 h-24 w-full cursor-pointer overflow-hidden transition-all duration-300 hover:border-blue-500/80 hover:bg-slate-900/90 shadow-md",
        className
      )}
    >
      {/* Background glow matching the tool theme on hover */}
      <div className="absolute inset-0 bg-radial-gradient opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />

      {/* Tool details */}
      <div className="flex flex-col items-center justify-center w-full h-full text-center relative">
        {/* Animated Icon Wrapper */}
        <motion.div
          variants={{
            initial: { scale: 1, y: 0 },
            hover: { scale: 1.6, y: 0 },
          }}
          initial="initial"
          whileHover="hover"
          transition={{ type: "spring", stiffness: 150, damping: 12 }}
          className="flex items-center justify-center z-10 pointer-events-none"
        >
          {getToolIcon(name)}
        </motion.div>

        {/* Text Label (Fades out completely on hover) */}
        <span className="text-xs font-semibold text-slate-300 mt-2 select-none tracking-wide transition-all duration-300 ease-out opacity-100 group-hover:opacity-0 group-hover:scale-50 z-0 pointer-events-none">
          {name}
        </span>
      </div>
    </div>
  );
};
