import * as React from "react";
import { cn } from "../../utils/cn";

interface ShineBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  borderWidth?: number;
  duration?: number;
  shineColor?: string | string[];
  borderRadius?: number;
  children?: React.ReactNode;
}

export function ShineBorder({
  borderWidth = 1,
  duration = 14,
  shineColor = "#000000",
  borderRadius = 16,
  className,
  style,
  children,
  ...props
}: ShineBorderProps) {
  return (
    <div
      style={
        {
          "--border-radius": `${borderRadius}px`,
          ...style,
        } as React.CSSProperties
      }
      className={cn(
        "relative grid place-items-center rounded-[--border-radius]",
        className,
      )}
      {...props}
    >
      <div
        style={
          {
            "--border-width": `${borderWidth}px`,
            "--border-radius": `${borderRadius}px`,
            "--duration": `${duration}s`,
            "--mask-linear-gradient": `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
            "--background-radial-gradient": `radial-gradient(transparent,transparent, ${
              Array.isArray(shineColor) ? shineColor.join(",") : shineColor
            },transparent,transparent)`,
          } as React.CSSProperties
        }
        className={cn(
          "before:absolute before:inset-0 before:aspect-square before:size-full before:rounded-[--border-radius] before:p-[--border-width] before:will-change-[background-position] before:content-[''] before:![-webkit-mask-composite:xor] before:![mask-composite:exclude] before:[background-image:var(--background-radial-gradient)] before:[background-size:300%_300%] before:[mask:var(--mask-linear-gradient)] motion-safe:before:animate-shine before:[animation-play-state:paused] group-hover:before:[animation-play-state:running]",
          "pointer-events-none absolute inset-0 size-full rounded-[inherit] will-change-[background-position] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        )}
      />
      {children}
    </div>
  );
}
