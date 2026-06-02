import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../utils/cn";

interface CanvasRevealEffectProps {
  className?: string;
  children?: React.ReactNode;
}

export const CanvasRevealEffect: React.FC<CanvasRevealEffectProps> = ({
  className,
  children,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    // Particle class representing nodes in the tech grid
    class Particle {
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      size: number;
      color: string;
      speed: number;
      angle: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.targetX = x;
        this.targetY = y;
        this.size = Math.random() * 2 + 1;
        this.color = `rgba(${59 + Math.random() * 50}, ${130 + Math.random() * 50}, 246, ${Math.random() * 0.4 + 0.3})`;
        this.speed = Math.random() * 0.5 + 0.2;
        this.angle = Math.random() * Math.PI * 2;
      }

      update(mouseX: number, mouseY: number, hovered: boolean) {
        // Slow float
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        // Bounce off canvas boundaries
        if (this.x < 0 || this.x > width) this.angle = Math.PI - this.angle;
        if (this.y < 0 || this.y > height) this.angle = -this.angle;

        // Pull towards mouse if hovered and close
        if (hovered) {
          const dx = mouseX - this.x;
          const dy = mouseY - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            this.x += dx * 0.05;
            this.y += dy * 0.05;
          }
        }
      }

      draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();
      }
    }

    const particles: Particle[] = [];
    const particleCount = 45;

    // Initialize particles randomly
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(Math.random() * width, Math.random() * height));
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint connections between close particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(mouse.x, mouse.y, isHovered);
        particles[i].draw(ctx);

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 80) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            // Dynamic opacity based on distance
            const alpha = (1 - dist / 80) * 0.15;
            ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [mouse, isHovered]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMouse({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative overflow-hidden w-full h-full bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-center cursor-pointer group",
        className
      )}
    >
      {/* Background Tech Dashboard Mockup (Becomes visible on hover) */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.12 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 font-mono text-[9px] text-green-500 overflow-hidden leading-tight p-3 select-none pointer-events-none"
          >
            <div>// CORE DASHBOARD ONLINE</div>
            <div>CPU COMPILING: JAVA SPRING BOOT...</div>
            <div>API ROUTER: /api/v1/microservices [OK]</div>
            <div>REDIS MEMCACHE: 98% HIT RATE</div>
            <div>KAFKA STREAM: active-events-topic</div>
            <div>DB CONNECTIONS POOL: 18/20 ACTIVE</div>
            <div className="mt-2 text-indigo-400">SELECT * FROM experiences;</div>
            <div>[Row 1] 2024 Senior Developer [FinTech]</div>
            <div>[Row 2] 2023 Full-Stack [Enterprise]</div>
            <div>[Row 3] 2022 Backend Eng [Pionir]</div>
            <div className="mt-2 text-blue-400">sys.config.load_dashboard()</div>
            <div>System status: resilient</div>
            <div>Response Latency: 4ms</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Node Canvas Layer */}
      <canvas
        ref={canvasRef}
        className={cn(
          "absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-500 z-10",
          isHovered ? "opacity-100" : "opacity-30"
        )}
      />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      {/* Subtle glowing radial hover background */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at ${mouse.x}px ${mouse.y}px, rgba(59, 130, 246, 0.1), transparent 80%)`,
        }}
      />

      {/* Main Avatar / Content slots */}
      <div className="relative z-20 w-full h-full">
        {children}
      </div>
    </div>
  );
};
