import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, type MotionValue } from "framer-motion";
import type { Project } from "../../constants/portfolioData";

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

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Split projects into two rows of three cards each
  const firstRow = projects.slice(0, 3);
  const secondRow = projects.slice(3, 6);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 100, damping: 30, bounce: 0 };

  // Horizontal translation effects
  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [-250, 250]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [250, -250]),
    springConfig
  );

  // 3D Tilt perspective effects
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.4, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [10, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-400, 0]),
    springConfig
  );

  return (
    <div
      ref={containerRef}
      className="py-10 md:py-20 overflow-hidden bg-slate-950 flex flex-col self-stretch [perspective:1000px] [transform-style:preserve-3d] relative"
    >
      <Header title={title} description={description} />
      
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
        <motion.div className="flex flex-row md:flex-row-reverse space-x-6 md:space-x-reverse md:space-x-12 overflow-x-auto md:overflow-hidden py-4 w-full snap-x snap-mandatory scrollbar-none px-6 md:px-0 md:justify-center">
          {firstRow.map((project) => (
            <ProjectCard
              project={project}
              translate={translateX}
              isMobile={isMobile}
              key={project.id}
              onClick={() => onProjectClick(project)}
            />
          ))}
        </motion.div>

        {/* Row 2 */}
        <motion.div className="flex flex-row space-x-6 md:space-x-12 overflow-x-auto md:overflow-hidden py-4 w-full snap-x snap-mandatory scrollbar-none px-6 md:px-0 md:justify-center">
          {secondRow.map((project) => (
            <ProjectCard
              project={project}
              translate={translateXReverse}
              isMobile={isMobile}
              key={project.id}
              onClick={() => onProjectClick(project)}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

const Header = ({ title, description }: { title?: string; description?: string }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 w-full py-12 md:py-20 relative z-10 flex flex-col justify-start">
      <h2 className="text-4xl md:text-7xl font-extrabold text-white tracking-tight">
        {title || "Featured Projects"}
      </h2>
      <p className="max-w-2xl text-base md:text-xl mt-6 text-slate-400 leading-relaxed">
        {description || "Explore a curated collection of high-performance microservices, API engines, caching layers, and responsive full-stack solutions built using Java Spring Boot and React."}
      </p>
    </div>
  );
};

interface ProjectCardProps {
  project: Project;
  translate: MotionValue<number>;
  onClick: () => void;
  isMobile: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  translate,
  onClick,
  isMobile,
}) => {
  return (
    <motion.div
      style={{
        x: isMobile ? 0 : translate,
      }}
      whileHover={isMobile ? {} : {
        y: -10,
      }}
      onClick={onClick}
      className="group/product h-64 w-[280px] md:h-80 md:w-[450px] relative flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer shadow-lg border border-slate-800 bg-slate-900 transition-all duration-300 snap-center"
    >
      <div className="absolute inset-0">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="object-cover object-center absolute h-full w-full inset-0 group-hover/product:scale-105 transition-transform duration-500"
        />
      </div>
      
      {/* Dark overlay showing on hover */}
      <div className="absolute inset-0 bg-slate-950/60 opacity-60 group-hover/product:opacity-90 transition-opacity duration-300 z-10" />

      {/* Project Details overlay */}
      <div className="absolute bottom-5 left-5 right-5 z-20 text-left transition-transform duration-300 group-hover/product:translate-y-[-5px]">
        <span className="px-2 py-1 text-[10px] uppercase font-bold tracking-wider rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
          {project.category}
        </span>
        <h3 className="text-lg md:text-xl font-bold text-white mt-2 group-hover/product:text-blue-400 transition-colors duration-200">
          {project.title}
        </h3>
        <p className="text-xs text-slate-300 mt-1 line-clamp-2 opacity-80 group-hover/product:opacity-100 transition-opacity duration-200">
          {project.description}
        </p>
        
        {/* Render dynamic tools inside card */}
        <div className="flex flex-wrap gap-1.5 mt-3 opacity-0 group-hover/product:opacity-100 transition-opacity duration-300">
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
