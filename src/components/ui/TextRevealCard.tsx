import React, { useState, useEffect, useRef } from "react";
import { cn } from "../../utils/cn";

interface TextRevealCardProps {
  text: string; // The hidden/revealed text
  revealText: string; // The text shown on reveal
  className?: string;
}

export const TextRevealCard: React.FC<TextRevealCardProps> = ({
  text,
  revealText,
  className,
}) => {
  const [widthPercentage, setWidthPercentage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Handle mouse move to calculate clip-path percentage
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const { left, width } = cardRef.current.getBoundingClientRect();
      const relativeX = event.clientX - left;
      const percentage = Math.min(Math.max((relativeX / width) * 100, 0), 100);
      setWidthPercentage(percentage);
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setWidthPercentage(0);
  };

  // Auto reveal interval if not hovered
  useEffect(() => {
    const triggerAutoReveal = () => {
      if (isHovered) return;

      // Animate percentage to 100% (reveal) then back to 0% after a delay
      let progress = 0;
      const revealInterval = setInterval(() => {
        progress += 4;
        if (progress >= 100) {
          progress = 100;
          clearInterval(revealInterval);
          
          // Hold the reveal for 1.5 seconds, then animate back
          setTimeout(() => {
            if (isHovered) return;
            const hideInterval = setInterval(() => {
              progress -= 4;
              if (progress <= 0) {
                progress = 0;
                clearInterval(hideInterval);
              }
              setWidthPercentage(progress);
            }, 30);
          }, 1500);
        }
        setWidthPercentage(progress);
      }, 20);
    };

    // Set interval to trigger every 5 seconds of inactivity
    const interval = setInterval(triggerAutoReveal, 5500);

    return () => {
      clearInterval(interval);
    };
  }, [isHovered]);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative overflow-hidden w-full rounded-xl border border-slate-800 bg-[#0c101d] p-6 shadow-xl select-none min-h-[140px] flex flex-col justify-center",
        className
      )}
    >
      <div className="relative flex items-center overflow-hidden">
        {/* Background Hidden/Reveal Text */}
        <h4 className="text-lg font-semibold text-slate-500 uppercase tracking-widest">
          {text}
        </h4>

        {/* Revealed/Overlay Text */}
        <h4
          style={{
            clipPath: `polygon(0 0, ${widthPercentage}% 0, ${widthPercentage}% 100%, 0 100%)`,
            transition: isHovered ? "none" : "clip-path 0.5s ease-out",
          }}
          className="absolute inset-0 text-lg font-bold text-white uppercase tracking-widest bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent pointer-events-none whitespace-nowrap"
        >
          {revealText}
        </h4>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-slate-400/80">
        <span>Hover to reveal focus areas</span>
        <div className="flex gap-1">
          <span className={cn("w-2 h-2 rounded-full", isHovered || widthPercentage > 0 ? "bg-blue-500 animate-pulse" : "bg-slate-700")} />
        </div>
      </div>
    </div>
  );
};
