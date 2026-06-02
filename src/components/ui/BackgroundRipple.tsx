import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

interface BackgroundRippleProps {
  className?: string;
  children?: React.ReactNode;
}

export const BackgroundRipple: React.FC<BackgroundRippleProps> = ({
  className,
  children,
}) => {
  const rippleCount = 4;
  const ripples = Array.from({ length: rippleCount });

  return (
    <div className={cn("relative w-full overflow-hidden bg-slate-950/80 rounded-3xl border border-slate-800 p-8 md:p-12", className)}>
      {/* Ripple Animation Overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
        {ripples.map((_, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0.1, opacity: 0.6 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: index * 1.5,
              ease: "easeOut",
            }}
            className="absolute rounded-full border border-blue-500/20 bg-blue-500/5 aspect-square"
            style={{
              width: "400px",
              height: "400px",
            }}
          />
        ))}
        {/* Glowing center point */}
        <div className="absolute w-2 h-2 bg-indigo-500 rounded-full blur-[2px]" />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};
