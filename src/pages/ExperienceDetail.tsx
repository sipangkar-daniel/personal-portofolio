import React from "react";
import { Calendar } from "lucide-react";
import { experiencesData } from "../constants/portfolioData";
import { DetailLayout } from "../components/ui/DetailLayout";

interface ExperienceDetailProps {
  experienceId: string;
}

export const ExperienceDetail: React.FC<ExperienceDetailProps> = ({ experienceId }) => {
  const experience = experiencesData.find((e) => e.id === experienceId);

  if (!experience) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-center px-4 w-full">
        <div className="w-14 h-14 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 text-xl mb-4 shadow-md">
          🔍
        </div>
        <h4 className="text-white font-bold text-lg">Experience Not Found</h4>
        <p className="text-slate-400 text-sm mt-3 leading-relaxed">
          The requested experience milestone could not be found or has been removed.
        </p>
      </div>
    );
  }

  // Construct meta tags for Experience details
  const metaItems = [
    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
      <Calendar className="w-3.5 h-3.5 text-blue-500" />
      <span>{experience.duration}</span>
    </div>,
    ...(experience.employmentType
      ? [
          <span className="text-xs font-semibold text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
            {experience.employmentType}
          </span>,
        ]
      : []),
    ...(experience.locationType
      ? [
          <span className="text-xs font-semibold text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
            {experience.locationType}
          </span>,
        ]
      : []),
  ];

  return (
    <DetailLayout
      title={`${experience.role} @ ${experience.company}`}
      subtitle="Career Journey"
      description={experience.longDescription}
      tools={experience.tools}
      screenshots={experience.screenshots}
      backPath="/#experience"
      metaItems={metaItems}
      relatedProjects={experience.projects}
    />
  );
};
