import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, type MotionValue } from "framer-motion";
import type { Project } from "../../constants/portfolioData";
import { cn } from "../../utils/cn";
import { CachedImage } from "./CachedImage";

interface HeroParallaxProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
  title?: string;
  description?: string;
}

export const HeroParallax: React.FC<HeroParallaxProps> = ({
  projects,
  onProjectClick,
  title,
  description,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeIdxRow1, setActiveIdxRow1] = useState(0);
  const [activeIdxRow2, setActiveIdxRow2] = useState(0);

  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleScrollRow1 = () => {
    if (!row1Ref.current) return;
    const container = row1Ref.current;
    const cardWidth = 280 + 24; // card width + space-x-6 (304px)
    const index = Math.round(container.scrollLeft / cardWidth);
    if (index !== activeIdxRow1) {
      setActiveIdxRow1(index);
    }
  };

  const handleScrollRow2 = () => {
    if (!row2Ref.current) return;
    const container = row2Ref.current;
    const cardWidth = 280 + 24; // card width + space-x-6 (304px)
    const index = Math.round(container.scrollLeft / cardWidth);
    if (index !== activeIdxRow2) {
      setActiveIdxRow2(index);
    }
  };

  // Split projects into two rows of three cards each
  const firstRow = projects.slice(0, 3);
  const secondRow = projects.slice(3, 6);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 100, damping: 30, bounce: 0 };

  // Parallax Header effects
  const headerY = useTransform(scrollYProgress, [0, 0.8], [0, 120]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.8]);

  // Horizontal translation effects
  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [-80, 80]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [80, -80]),
    springConfig
  );

  // 3D Tilt perspective effects
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [8, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.6, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [5, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [120, 0]),
    springConfig
  );

  return (
    <div
      ref={containerRef}
      className="py-10 md:py-20 overflow-hidden bg-slate-950 flex flex-col self-stretch [perspective:1000px] [transform-style:preserve-3d] relative"
    >
      <motion.div style={{ y: isMobile ? 0 : headerY, opacity: isMobile ? 1 : headerOpacity }}>
        <Header title={title} description={description} />
      </motion.div>
      
      <motion.div
        style={{
          rotateX: isMobile ? 0 : rotateX,
          rotateZ: isMobile ? 0 : rotateZ,
          translateY: isMobile ? 0 : translateY,
          opacity: isMobile ? 1 : opacity,
        }}
        className="flex flex-col gap-6 md:gap-16 items-center justify-center w-full"
      >
        {/* Row 1 */}
        <motion.div
          ref={row1Ref}
          onScroll={handleScrollRow1}
          className="flex flex-row md:flex-row-reverse space-x-6 md:space-x-reverse md:space-x-12 overflow-x-auto md:overflow-hidden py-4 w-full snap-x snap-mandatory scrollbar-none px-6 md:px-0 md:justify-center"
        >
          {firstRow.map((project, idx) => (
            <ProjectCard
              project={project}
              translate={translateX}
              isMobile={isMobile}
              index={idx}
              isActive={activeIdxRow1 === idx}
              key={project.id}
              onClick={() => onProjectClick(project)}
            />
          ))}
        </motion.div>

        {/* Row 2 */}
        <motion.div
          ref={row2Ref}
          onScroll={handleScrollRow2}
          className="flex flex-row space-x-6 md:space-x-12 overflow-x-auto md:overflow-hidden py-4 w-full snap-x snap-mandatory scrollbar-none px-6 md:px-0 md:justify-center"
        >
          {secondRow.map((project, idx) => (
            <ProjectCard
              project={project}
              translate={translateXReverse}
              isMobile={isMobile}
              index={idx}
              isActive={activeIdxRow2 === idx}
              key={project.id}
              onClick={() => onProjectClick(project)}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

const Header = ({ title }: { title?: string; description?: string }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 w-full pt-12 pb-6 md:pt-16 md:pb-8 relative z-10 flex flex-col justify-start">
      <h2 className="text-4xl md:text-7xl font-extrabold text-white tracking-tight">
        {title || "Featured Projects"}
      </h2>
    </div>
  );
};

interface ProjectCardProps {
  project: Project;
  translate: MotionValue<number>;
  onClick: () => void;
  isMobile: boolean;
  index: number;
  isActive: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  translate,
  onClick,
  isMobile,
  index,
  isActive,
}) => {
  const mobileAnim = isMobile
    ? {
        initial: { 
          opacity: 0, 
          y: 40,
          borderColor: "rgba(30, 41, 59, 0.4)",
          boxShadow: "0 0 0px rgba(0, 0, 0, 0)"
        },
        whileInView: { 
          opacity: 1, 
          y: 0,
          transition: {
            duration: 0.6,
            delay: index * 0.1,
            ease: "easeOut" as const
          }
        },
        viewport: { once: true, margin: "-30px" },
        animate: {
          scale: isActive ? 1.02 : 0.9,
          opacity: isActive ? 1 : 0.35,
          borderColor: isActive ? "rgba(59, 130, 246, 0.4)" : "rgba(30, 41, 59, 0.4)",
          boxShadow: isActive ? "0 4px 20px rgba(59, 130, 246, 0.12)" : "0 0 0px rgba(0, 0, 0, 0)",
        },
        transition: {
          type: "spring" as const,
          stiffness: 100,
          damping: 18,
        },
      }
    : {};

  return (
    <motion.div
      style={{
        x: isMobile ? 0 : translate,
      }}
      whileHover={isMobile ? {} : {
        y: -10,
      }}
      whileTap={isMobile ? { scale: 0.98 } : {}}
      {...mobileAnim}
      onClick={onClick}
      className={cn(
        "group/product h-64 w-[280px] md:h-80 md:w-[450px] relative flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer bg-slate-900 transition-all duration-300 snap-center border",
        isMobile ? "" : "border-slate-800"
      )}
    >
      <div className="absolute inset-0">
        <CachedImage
          src={project.thumbnail}
          alt={project.title}
          className="object-cover object-center absolute h-full w-full inset-0 group-hover/product:scale-105 transition-transform duration-500"
        />
      </div>
      
      {/* Dark overlay showing on hover */}
      <div className="absolute inset-0 bg-slate-950/60 opacity-80 md:opacity-60 md:group-hover/product:opacity-90 transition-opacity duration-300 z-10" />

      {/* Project Details overlay */}
      <div className="absolute bottom-5 left-5 right-5 z-20 text-left transition-transform duration-300 md:group-hover/product:translate-y-[-5px]">
        <span className="px-2 py-1 text-[10px] uppercase font-bold tracking-wider rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
          {project.category}
        </span>
        <h3 className="text-lg md:text-xl font-bold text-white mt-2 group-hover/product:text-blue-400 transition-colors duration-200">
          {project.title}
        </h3>
        <p className="text-xs text-slate-300 mt-1 line-clamp-2 opacity-90 md:opacity-80 md:group-hover/product:opacity-100 transition-opacity duration-200">
          {project.description}
        </p>
        
        {/* Render dynamic tools inside card */}
        <div className="flex flex-wrap gap-1.5 mt-3 opacity-90 md:opacity-0 md:group-hover/product:opacity-100 transition-opacity duration-300">
          {project.tools.map((t, idx) => (
            <span key={idx} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
