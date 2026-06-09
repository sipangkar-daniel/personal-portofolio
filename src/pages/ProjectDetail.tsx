import React from "react";
import { ExternalLink, Lock } from "lucide-react";
import { useProjects } from "../hooks/useProjects";
import { DetailLayout } from "../components/ui/DetailLayout";
import { AnimatedButton } from "../components/ui/AnimatedButton";
import { portfolioText } from "../constants/portfolioData";

interface ProjectDetailProps {
  projectId: string;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ projectId }) => {
  const { projects, loading, error } = useProjects();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-center px-4 w-full">
        <div className="w-14 h-14 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 text-xl mb-4 shadow-md">
          <svg className="animate-spin h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <h4 className="text-white font-bold text-lg">Loading Project Details...</h4>
        <p className="text-slate-400 text-sm mt-3 leading-relaxed">
          Fetching metadata and assets. Please wait a moment.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-center px-4 w-full">
        <div className="w-14 h-14 rounded-full bg-slate-900 border border-red-900/50 flex items-center justify-center text-red-500 text-xl mb-4 shadow-md animate-pulse">
          ⚠️
        </div>
        <h4 className="text-red-500 font-bold text-lg">Error Loading Project</h4>
        <p className="text-slate-400 text-sm mt-3 leading-relaxed">
          {error instanceof Error ? error.message : String(error) || "Failed to load project details."}
        </p>
      </div>
    );
  }

  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-center px-4 w-full">
        <div className="w-14 h-14 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 text-xl mb-4 shadow-md">
          🔍
        </div>
        <h4 className="text-white font-bold text-lg">Project Not Found</h4>
        <p className="text-slate-400 text-sm mt-3 leading-relaxed">
          The requested project could not be found or has been removed.
        </p>
      </div>
    );
  }

  // Define action buttons for Project details
  const actionButtons = (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Preview Button (Disabled & locked if private) */}
        <AnimatedButton
          variant="moving-border"
          isPrivate={project.isPrivate}
          disabled={project.isPrivate}
          onClick={() => {
            if (project.liveUrl) {
              window.open(project.liveUrl, "_blank", "noopener,noreferrer");
            }
          }}
          className="w-full sm:w-auto"
        >
          {project.isPrivate ? (
            <>{portfolioText.projects.modalPrivateRepo}</>
          ) : (
            <>
              {portfolioText.projects.modalLivePreview}
              <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </>
          )}
        </AnimatedButton>

        {/* Source code (Also gated if private) */}
        {!project.isPrivate ? (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-slate-700 hover:border-blue-500/80 bg-slate-900 text-white font-medium text-sm transition-all duration-300 hover:bg-slate-850 shadow-md w-full sm:w-auto"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
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
      {project.isPrivate && (
        <div className="p-3.5 rounded-lg bg-yellow-950/20 border border-yellow-500/20 text-xs text-yellow-500/80 flex items-start gap-2 mt-4 leading-relaxed">
          <span>{portfolioText.projects.modalPrivateWarning}</span>
        </div>
      )}
    </div>
  );

  return (
    <DetailLayout
      title={project.title}
      subtitle={project.category}
      description={project.longDescription}
      tools={project.tools}
      screenshots={project.imageUrls}
      backPath="/#projects"
      actionButtons={actionButtons}
    />
  );
};
