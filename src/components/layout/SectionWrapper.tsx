import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

interface SectionWrapperProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  id,
  className,
  children,
}) => {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={cn("w-full py-4 relative", className)}
    >
      {children}
    </motion.div>
  );
};
