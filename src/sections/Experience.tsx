import React from "react";
import { Briefcase, Calendar, Plus, ExternalLink, Image as ImageIcon } from "lucide-react";
import { useModal } from "../hooks/useModal";
import { Modal } from "../components/ui/Modal";
import { experiencesData, portfolioText } from "../constants/portfolioData";
import type { Experience } from "../constants/portfolioData";
import { AnimatedButton } from "../components/ui/AnimatedButton";

export const ExperienceSection: React.FC = () => {
  const { isOpen, data: selectedExp, openModal, closeModal } = useModal<Experience>();

  const renderBadgeList = (tools: string[]) => {
    const shouldTruncate = tools.length > 4;
    const itemsToShow = shouldTruncate ? tools.slice(0, 3) : tools;
    const remainingCount = tools.length - itemsToShow.length;

    return (
      <div className="flex flex-wrap gap-2 mt-4">
        {itemsToShow.map((tool, idx) => (
          <span
            key={idx}
            className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-blue-300 border border-slate-700/60"
          >
            {tool}
          </span>
        ))}
        {shouldTruncate && (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-950/60 text-indigo-300 border border-indigo-500/20 flex items-center gap-0.5">
            <Plus className="w-3 h-3" />
            {remainingCount} {portfolioText.experience.moreBadge}
          </span>
        )}
      </div>
    );
  };

  return (
    <section id="experience" className="py-20 md:py-28 px-4 md:px-12 max-w-7xl mx-auto w-full">
      <div className="text-left mb-12 md:mb-16">
        <span className="text-blue-500 font-bold uppercase tracking-wider text-xs md:text-sm">
          {portfolioText.experience.journeyTag}
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-2">
          {portfolioText.experience.title}
        </h2>
        <p className="text-slate-400 text-sm md:text-base mt-4 max-w-2xl leading-relaxed">
          {portfolioText.experience.description}
        </p>
      </div>

      {/* Vertical Timeline Card Layout */}
      <div className="relative border-l border-slate-800/80 ml-4 md:ml-8 pl-6 md:pl-10 space-y-12">
        {experiencesData.map((exp) => (
          <div key={exp.id} className="relative group text-left">
            {/* Timeline node icon */}
            <div className="absolute -left-[38px] md:-left-[54px] top-1.5 w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-slate-800 bg-slate-950 flex items-center justify-center text-blue-500 group-hover:border-blue-500 group-hover:text-white transition-colors duration-300 z-10 shadow-lg">
              <Briefcase className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </div>

            {/* Content card */}
            <div className="glass p-6 md:p-8 rounded-2xl border border-slate-800/80 hover:border-slate-700/80 hover:bg-slate-900/40 transition-all duration-300 shadow-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    {exp.role}
                  </h3>
                  <span className="text-sm font-semibold text-slate-400">
                    {exp.company}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 bg-slate-900 border border-slate-800/60 px-3 py-1.5 rounded-lg self-start md:self-auto">
                  <Calendar className="w-3.5 h-3.5" />
                  {exp.duration}
                </div>
              </div>

              <p className="text-slate-400 text-sm mt-4 leading-relaxed">
                {exp.shortDescription}
              </p>

              {/* Badges list */}
              {renderBadgeList(exp.tools)}

              {/* Detail button triggers modal overlay */}
              <div className="mt-6">
                <AnimatedButton
                  variant="hover-gradient"
                  onClick={() => openModal(exp)}
                  className="px-4 py-2 text-xs font-semibold"
                >
                  {portfolioText.experience.viewDetailsBtn}
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </AnimatedButton>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Reusable Modal detail portal */}
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title={selectedExp ? `${selectedExp.role} @ ${selectedExp.company}` : ""}
      >
        {selectedExp && (
          <div className="space-y-6 text-left">
            <div className="flex items-center gap-2 text-sm text-slate-400 font-medium">
              <Calendar className="w-4 h-4 text-blue-500" />
              <span>{selectedExp.duration}</span>
            </div>

            <div className="space-y-3">
              <h4 className="text-white font-bold tracking-wide">{portfolioText.experience.modalScopeTitle}</h4>
              <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                {selectedExp.longDescription}
              </p>
            </div>

            {/* Display complete tools list */}
            <div>
              <h4 className="text-white font-bold tracking-wide mb-3">{portfolioText.experience.modalTechTitle}</h4>
              <div className="flex flex-wrap gap-2">
                {selectedExp.tools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-950 text-blue-400 border border-slate-850"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Screenshots Placeholder block */}
            <div className="pt-2">
              <h4 className="text-white font-bold tracking-wide mb-3">{portfolioText.experience.modalScreenshotsTitle}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col items-center justify-center p-6 border border-dashed border-slate-800 rounded-xl bg-slate-950/80 text-center text-slate-500 h-32 select-none">
                  <ImageIcon className="w-6 h-6 mb-2 text-slate-600" />
                  <span className="text-xs font-semibold text-slate-400">{portfolioText.experience.placeholder1Title}</span>
                  <span className="text-[10px] text-slate-600 mt-1">{portfolioText.experience.placeholder1Subtitle}</span>
                </div>
                <div className="flex flex-col items-center justify-center p-6 border border-dashed border-slate-800 rounded-xl bg-slate-950/80 text-center text-slate-500 h-32 select-none">
                  <ImageIcon className="w-6 h-6 mb-2 text-slate-600" />
                  <span className="text-xs font-semibold text-slate-400">{portfolioText.experience.placeholder2Title}</span>
                  <span className="text-[10px] text-slate-600 mt-1">{portfolioText.experience.placeholder2Subtitle}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};
