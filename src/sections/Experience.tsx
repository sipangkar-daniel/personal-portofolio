import React, { useState } from "react";
import { Briefcase, Calendar } from "lucide-react";
import { experiencesData, portfolioText } from "../constants/portfolioData";
import { useRouter } from "../hooks/useRouter";

export const ExperienceSection: React.FC = () => {
  const { navigate } = useRouter();
  const [showAllExperiences, setShowAllExperiences] = useState(false);

  const experiencesToShow = showAllExperiences ? experiencesData : experiencesData.slice(0, 3);

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
            + {remainingCount} {portfolioText.experience.moreBadge}
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
      {experiencesData.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 border border-dashed border-slate-800 rounded-2xl bg-slate-900/10 max-w-xl mx-auto text-center mt-8 w-full">
          <div className="w-14 h-14 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 text-xl mb-4 shadow-md">
            💼
          </div>
          <h4 className="text-white font-bold text-lg">No Experiences Recorded Yet</h4>
          <p className="text-slate-400 text-sm mt-3 leading-relaxed">
            Professional milestones and roles are currently being updated in the database. New experiences will be dynamically loaded here shortly.
          </p>
        </div>
      ) : (
        <>
          <div className="relative border-l border-slate-800/80 ml-4 md:ml-8 pl-6 md:pl-10 space-y-12">
            {experiencesToShow.map((exp) => (
              <div key={exp.id} className="relative group text-left">
                {/* Timeline node icon */}
                <div className="absolute -left-[38px] md:-left-[54px] top-1.5 w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-slate-800 bg-slate-950 flex items-center justify-center text-blue-500 group-hover:border-blue-500 group-hover:text-white transition-colors duration-300 z-10 shadow-lg">
                  <Briefcase className="w-3.5 h-3.5 md:w-4 md:h-4" />
                </div>

                {/* Content card */}
                <div
                  onClick={() => navigate(`/experience/${exp.id}`)}
                  className="glass p-6 md:p-8 rounded-2xl border border-slate-800/80 hover:border-slate-700/80 hover:bg-slate-900/40 transition-all duration-300 shadow-md cursor-pointer"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {exp.role}
                      </h3>
                      <span className="text-sm font-semibold text-slate-400">
                        {exp.company}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 bg-slate-900 border border-slate-800/60 px-3 py-1.5 rounded-lg">
                        <Calendar className="w-3.5 h-3.5" />
                        {exp.duration}
                      </div>
                      {exp.employmentType && (
                        <span className="text-xs font-semibold text-slate-400 bg-slate-900 border border-slate-800/60 px-3 py-1.5 rounded-lg">
                          {exp.employmentType}
                        </span>
                      )}
                      {exp.locationType && (
                        <span className="text-xs font-semibold text-slate-400 bg-slate-900 border border-slate-800/60 px-3 py-1.5 rounded-lg">
                          {exp.locationType}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-slate-400 text-sm mt-4 leading-relaxed">
                    {exp.shortDescription}
                  </p>

                  {/* Badges list */}
                  {renderBadgeList(exp.tools)}
                </div>
              </div>
            ))}
          </div>

          {experiencesData.length > 3 && (
            <div className="flex justify-center pt-8">
              <button
                onClick={() => setShowAllExperiences(!showAllExperiences)}
                className="text-sm font-bold text-blue-500 hover:text-blue-400 flex items-center gap-1.5 bg-slate-900/60 border border-slate-800/80 px-6 py-2.5 rounded-xl transition-all duration-300 hover:bg-slate-900 hover:border-slate-700/80 shadow-md focus:outline-none"
              >
                {showAllExperiences ? "Show Less" : `Show More (${experiencesData.length - 3} more)`}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};
