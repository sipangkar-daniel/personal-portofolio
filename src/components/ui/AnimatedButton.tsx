import React from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { cn } from "../../utils/cn";

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "moving-border" | "hover-gradient";
  className?: string;
  children: React.ReactNode;
  isPrivate?: boolean;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  variant = "hover-gradient",
  className,
  children,
  onClick,
  disabled,
  isPrivate = false,
  type = "button",
  ...props
}) => {
  const isDisabled = disabled || isPrivate;

  // Render disabled lock state button
  if (isDisabled) {
    return (
      <button
        disabled
        type={type}
        className={cn(
          "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-slate-800 bg-slate-900/60 text-slate-500 cursor-not-allowed select-none transition-all duration-300 w-full md:w-auto font-medium text-sm",
          className
        )}
        {...props}
      >
        {isPrivate && <Lock className="w-4 h-4 text-slate-500 animate-pulse" />}
        {children}
      </button>
    );
  }

  // Variant: Moving Border
  if (variant === "moving-border") {
    return (
      <button
        type={type}
        onClick={onClick}
        className={cn(
          "relative p-[1px] overflow-hidden rounded-lg group bg-slate-800 hover:bg-slate-700 transition-all duration-300 w-full md:w-auto inline-block",
          className
        )}
        {...props}
      >
        {/* Rotating gradient background border */}
        <span className="absolute inset-0">
          <motion.span
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute w-[250%] h-[250%] bg-[conic-gradient(from_0deg,#3b82f6,#8b5cf6,#10b981,#3b82f6)]"
            style={{
              left: "50%",
              top: "50%",
              x: "-50%",
              y: "-50%",
            }}
          />
        </span>
        
        {/* Inner button overlay */}
        <div className="relative px-5 py-2.5 bg-slate-950/90 rounded-[7px] text-white hover:text-slate-100 font-medium text-sm transition-colors duration-200 flex items-center justify-center gap-2">
          {children}
        </div>
      </button>
    );
  }

  // Variant: Hover Gradient
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        "relative overflow-hidden rounded-lg px-5 py-2.5 bg-slate-900 border border-slate-700/80 hover:border-blue-500 text-white font-medium text-sm transition-all duration-300 shadow-md flex items-center justify-center gap-2 group w-full md:w-auto",
        className
      )}
      {...props}
    >
      {/* Background sliding hover glow */}
      <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
      <span className="relative flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
};
