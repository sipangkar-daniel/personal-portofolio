import React from "react";
import { HeroParallax } from "../components/ui/HeroParallax";
import { portfolioText } from "../constants/portfolioData";
import type { Project } from "../constants/portfolioData";
import { useRouter } from "../hooks/useRouter";

interface ProjectSectionProps {
  projects: Project[];
  loading: boolean;
  error: any;
}

export const ProjectSection: React.FC<ProjectSectionProps> = ({ projects, loading, error }) => {
  const { navigate } = useRouter();

  if (loading) {
    return (
      <section id="projects" className="w-full bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 w-full py-16 md:py-24 text-left">
          <h2 className="text-4xl md:text-7xl font-extrabold text-white tracking-tight">
            {portfolioText.projects.title}
          </h2>
          <p className="max-w-2xl text-base md:text-xl mt-6 text-slate-400 leading-relaxed">
            {portfolioText.projects.description}
          </p>

          <div className="flex flex-col items-center justify-center p-12 border border-dashed border-slate-800 rounded-2xl bg-slate-900/10 max-w-xl mx-auto text-center mt-12 w-full">
            <div className="w-14 h-14 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 text-xl mb-4 shadow-md">
              <svg className="animate-spin h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
            <h4 className="text-white font-bold text-lg">Loading Projects...</h4>
            <p className="text-slate-400 text-sm mt-3 leading-relaxed">
              Fetching repository information from GitHub API. Please wait a moment.
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="w-full bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 w-full py-16 md:py-24 text-left">
          <h2 className="text-4xl md:text-7xl font-extrabold text-white tracking-tight">
            {portfolioText.projects.title}
          </h2>
          <p className="max-w-2xl text-base md:text-xl mt-6 text-slate-400 leading-relaxed">
            {portfolioText.projects.description}
          </p>

          <div className="flex flex-col items-center justify-center p-12 border border-dashed border-red-900/50 rounded-2xl bg-red-950/10 max-w-xl mx-auto text-center mt-12 w-full">
            <div className="w-14 h-14 rounded-full bg-slate-900 border border-red-900/50 flex items-center justify-center text-red-500 text-xl mb-4 shadow-md animate-pulse">
              ⚠️
            </div>
            <h4 className="text-red-500 font-bold text-lg">Error Loading Projects</h4>
            <p className="text-slate-400 text-sm mt-3 leading-relaxed">
              {error instanceof Error
                ? error.message
                : String(error) || "Failed to fetch repositories from GitHub."}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="w-full bg-slate-950">
      {projects.length === 0 ? (
        <div className="max-w-7xl mx-auto px-4 w-full py-16 md:py-24 text-left">
          <h2 className="text-4xl md:text-7xl font-extrabold text-white tracking-tight">
            {portfolioText.projects.title}
          </h2>
          <p className="max-w-2xl text-base md:text-xl mt-6 text-slate-400 leading-relaxed">
            {portfolioText.projects.description}
          </p>

          <div className="flex flex-col items-center justify-center p-12 border border-dashed border-slate-800 rounded-2xl bg-slate-900/10 max-w-xl mx-auto text-center mt-12 w-full">
            <div className="w-14 h-14 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 text-xl mb-4 shadow-md">
              💻
            </div>
            <h4 className="text-white font-bold text-lg">No Projects Available Yet</h4>
            <p className="text-slate-400 text-sm mt-3 leading-relaxed">
              Project logs and source codes are being migrated. Case studies and live previews will stream live once initial deployments conclude.
            </p>
          </div>
        </div>
      ) : (
        <HeroParallax
          projects={projects}
          onProjectClick={(p) => navigate(`/project/${p.id}`)}
          title={portfolioText.projects.title}
          description={portfolioText.projects.description}
        />
      )}
    </section>
  );
};
