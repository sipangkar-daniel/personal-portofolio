import React from "react";
import { ExternalLink, Lock } from "lucide-react";
import { useModal } from "../hooks/useModal";
import { Modal } from "../components/ui/Modal";
import { HeroParallax } from "../components/ui/HeroParallax";
import { projectsData, portfolioText } from "../constants/portfolioData";
import type { Project } from "../constants/portfolioData";
import { AnimatedButton } from "../components/ui/AnimatedButton";

export const ProjectSection: React.FC = () => {
  const { isOpen, data: selectedProj, openModal, closeModal } = useModal<Project>();

  return (
    <section id="projects" className="w-full bg-slate-950">
      {/* Parallax Hero container which triggers modal */}
      <HeroParallax
        projects={projectsData}
        onProjectClick={openModal}
        title={portfolioText.projects.title}
        description={portfolioText.projects.description}
      />

      {/* Reusable Modal for Project detail popups */}
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title={selectedProj ? selectedProj.title : ""}
      >
        {selectedProj && (
          <div className="space-y-6 text-left">
            {/* Visual Thumbnail overlay */}
            <div className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden border border-slate-800">
              <img
                src={selectedProj.thumbnail}
                alt={selectedProj.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 px-2.5 py-1 text-xs font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded">
                {selectedProj.category}
              </span>
            </div>

            {/* Description details */}
            <div className="space-y-3">
              <h4 className="text-white font-bold tracking-wide">{portfolioText.projects.modalTitle}</h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                {selectedProj.longDescription}
              </p>
            </div>

            {/* Technologies list */}
            <div>
              <h4 className="text-white font-bold tracking-wide mb-3">{portfolioText.projects.modalStackTitle}</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProj.tools.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded bg-slate-950 text-xs font-semibold text-slate-300 border border-slate-850"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal actions grid */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-4 border-t border-slate-800/80 mt-6">
              {/* Preview Button (Disabled & locked if private) */}
              <AnimatedButton
                variant="moving-border"
                isPrivate={selectedProj.isPrivate}
                disabled={selectedProj.isPrivate}
                onClick={() => {
                  if (selectedProj.liveUrl) {
                    window.open(selectedProj.liveUrl, "_blank", "noopener,noreferrer");
                  }
                }}
                className="w-full sm:w-auto"
              >
                {selectedProj.isPrivate ? (
                  <>
                    {portfolioText.projects.modalPrivateRepo}
                  </>
                ) : (
                  <>
                    {portfolioText.projects.modalLivePreview}
                    <ExternalLink className="w-3.5 h-3.5 ml-1" />
                  </>
                )}
              </AnimatedButton>

              {/* Source code (Also gated if private) */}
              {!selectedProj.isPrivate ? (
                <a
                  href={selectedProj.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-slate-700 hover:border-blue-500/80 bg-slate-900 text-white font-medium text-sm transition-all duration-300 hover:bg-slate-850 shadow-md w-full sm:w-auto"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  {portfolioText.projects.modalSourceCode}
                </a>
              ) : (
                <div className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-slate-850 bg-slate-950 text-slate-600 font-medium text-sm select-none w-full sm:w-auto">
                  <Lock className="w-3.5 h-3.5" />
                  {portfolioText.projects.modalSourceGated}
                </div>
              )}
            </div>
            
            {/* Private explanation message if gated */}
            {selectedProj.isPrivate && (
              <div className="p-3.5 rounded-lg bg-yellow-950/20 border border-yellow-500/20 text-xs text-yellow-500/80 flex items-start gap-2 mt-4 leading-relaxed">
                <span>{portfolioText.projects.modalPrivateWarning}</span>
              </div>
            )}
          </div>
        )}
      </Modal>
    </section>
  );
};
