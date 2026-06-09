import React, { useEffect, useState, useRef } from "react";
import { cn } from "../../utils/cn";
import { CachedImage } from "./CachedImage";

interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
}

interface InfiniteMovingCardsProps {
  items: TestimonialItem[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}

export const InfiniteMovingCards: React.FC<InfiniteMovingCardsProps> = ({
  items,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);
  const duplicatedRef = useRef(false);

  useEffect(() => {
    const getDirection = () => {
      if (containerRef.current) {
        if (direction === "left") {
          containerRef.current.style.setProperty(
            "--animation-direction",
            "normal"
          );
        } else {
          containerRef.current.style.setProperty(
            "--animation-direction",
            "reverse"
          );
        }
      }
    };

    const getSpeed = () => {
      if (containerRef.current) {
        if (speed === "fast") {
          containerRef.current.style.setProperty("--animation-duration", "20s");
        } else if (speed === "normal") {
          containerRef.current.style.setProperty("--animation-duration", "40s");
        } else {
          containerRef.current.style.setProperty("--animation-duration", "80s");
        }
      }
    };

    const addAnimation = () => {
      if (containerRef.current && scrollerRef.current) {
        if (!duplicatedRef.current) {
          const scrollerContent = Array.from(scrollerRef.current.children);

          // Duplicate elements to ensure smooth infinite loop
          scrollerContent.forEach((item) => {
            const duplicatedItem = item.cloneNode(true);
            if (scrollerRef.current) {
              scrollerRef.current.appendChild(duplicatedItem);
            }
          });
          duplicatedRef.current = true;
        }

        getDirection();
        getSpeed();
        setStart(true);
      }
    };

    addAnimation();
  }, [direction, speed]);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 border border-dashed border-slate-800 rounded-xl bg-slate-900/30 max-w-lg mx-auto text-center">
        <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 text-lg mb-4">
          💬
        </div>
        <h4 className="text-white font-semibold">No Testimonials Yet</h4>
        <p className="text-slate-400 text-sm mt-2 leading-relaxed">
          Daniel's portfolio database is prepped for database mirror synchronizations. Dynamic client reviews will stream here once backend integrations complete.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-6 py-4 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            className="w-[350px] max-w-full relative rounded-2xl border border-b-0 border-slate-800 px-8 py-6 flex-shrink-0 bg-gradient-to-b from-slate-900 to-slate-950/90 shadow-md flex flex-col justify-between"
            key={item.id + "-" + idx}
          >
            <blockquote>
              <div
                aria-hidden="true"
                className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
              />
              <span className="relative z-20 text-sm leading-[1.6] text-slate-300 font-normal">
                "{item.content}"
              </span>
              <div className="relative z-20 mt-6 flex flex-row items-center gap-3 border-t border-slate-800/80 pt-4">
                {item.avatar && (
                  <CachedImage
                    src={item.avatar}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-700"
                  />
                )}
                <div className="flex flex-col">
                  <span className="text-sm leading-[1.6] text-white font-bold">
                    {item.name}
                  </span>
                  <span className="text-xs leading-[1.6] text-slate-400 font-normal">
                    {item.role} @ {item.company}
                  </span>
                </div>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
