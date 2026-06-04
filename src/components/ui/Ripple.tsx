import React from "react";
import type { CSSProperties } from "react";
import { cn } from "../../utils/cn";

interface RippleProps {
  mainCircleSize?: number;
  mainCircleOpacity?: number;
  numCircles?: number;
  className?: string;
}

export const Ripple = React.memo(function Ripple({
  mainCircleSize = 210,
  mainCircleOpacity = 0.24,
  numCircles = 8,
  className,
}: RippleProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 bg-transparent [mask-image:radial-gradient(ellipse_at_center,white,transparent)]",
        className,
      )}
    >
      {Array.from({ length: numCircles }, (_, i) => {
        const size = mainCircleSize + i * 70;
        const opacity = mainCircleOpacity - i * 0.03;
        const animationDelay = `${i * 0.06}s`;
        const borderStyle = i === numCircles - 1 ? "dashed" : "solid";
        const borderOpacity = 5 + i * 5;

        return (
          <div
            key={i}
            className={cn(
              "absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] rounded-full border bg-transparent animate-ripple",
            )}
            style={
              {
                width: `${size}px`,
                height: `${size}px`,
                opacity: opacity,
                animationDelay: animationDelay,
                borderStyle: borderStyle,
                borderWidth: "1px",
                borderColor: `rgba(148, 163, 184, ${borderOpacity / 100})`,
                "--i": i,
              } as CSSProperties
            }
          />
        );
      })}
    </div>
  );
});
