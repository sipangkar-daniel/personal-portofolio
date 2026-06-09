import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { navigateTo } from "../../hooks/useRouter";
import { cn } from "../../utils/cn";
import { CachedImage } from "./CachedImage";

export interface DetailLayoutProps {
  title: string;
  subtitle?: string; // e.g. company name, or category
  metaItems?: React.ReactNode[]; // duration, employment type, location
  description: string;
  tools: string[];
  screenshots?: string[];
  backPath: string; // e.g. "/#projects" or "/#experience"
  actionButtons?: React.ReactNode;
  relatedProjects?: string[];
}

export const DetailLayout: React.FC<DetailLayoutProps> = ({
  title,
  subtitle,
  metaItems,
  description,
  tools,
  screenshots,
  backPath,
  actionButtons,
  relatedProjects,
}) => {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [showAllImages, setShowAllImages] = useState(false);

  useEffect(() => {
    if (screenshots && screenshots.length > 0) {
      setActiveImage(screenshots[0]);
      setShowAllImages(false);
    } else {
      setActiveImage(null);
      setShowAllImages(false);
    }
  }, [screenshots]);

  const hasScreenshots = screenshots && screenshots.length > 0;

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    navigateTo(backPath);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-16 md:py-24 px-4 md:px-12 max-w-7xl mx-auto w-full">
      {/* Back Button Link */}
      <div className="mb-8 md:mb-12">
        <a
          href={backPath}
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-blue-400 transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </a>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 text-left">
        {/* Left Side: Text Description, Badges, Action Buttons */}
        <div className={cn("space-y-8", hasScreenshots ? "lg:col-span-7" : "lg:col-span-12 max-w-3xl")}>
          <div className="space-y-4">
            {subtitle && (
              <span className="px-3 py-1 rounded bg-blue-500/10 text-xs font-bold text-blue-400 border border-blue-500/20">
                {subtitle}
              </span>
            )}
            <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mt-2 leading-tight">
              {title}
            </h1>

            {/* Metadata Row */}
            {metaItems && metaItems.length > 0 && (
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {metaItems.map((item, idx) => (
                  <div key={idx} className="flex items-center">
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Description Block */}
          <div className="space-y-3 border-t border-slate-900 pt-6">
            <h4 className="text-white font-bold tracking-wide text-sm uppercase text-slate-400">
              Detailed Scope & Contributions
            </h4>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed whitespace-pre-line">
              {description}
            </p>
          </div>

          {/* Technologies Badges */}
          <div className="space-y-3 border-t border-slate-900 pt-6">
            <h4 className="text-white font-bold tracking-wide text-sm uppercase text-slate-400">
              Technologies Implemented
            </h4>
            <div className="flex flex-wrap gap-2">
              {tools.map((tool, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-900 text-blue-400 border border-slate-800"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Related Projects (names list) */}
          {relatedProjects && relatedProjects.length > 0 && (
            <div className="space-y-3 border-t border-slate-900 pt-6">
              <h4 className="text-white font-bold tracking-wide text-sm uppercase text-slate-400">
                Related Projects
              </h4>
              <ul className="list-disc list-inside text-slate-300 text-sm space-y-1.5 pl-1">
                {relatedProjects.map((projName, idx) => (
                  <li key={idx} className="hover:text-blue-400 transition-colors">
                    {projName}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Page Action Buttons (Projects only) */}
          {actionButtons && (
            <div className="pt-6 border-t border-slate-900">
              {actionButtons}
            </div>
          )}
        </div>

        {/* Right Side: Screenshots Gallery */}
        {hasScreenshots && screenshots && (
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <h4 className="text-white font-bold tracking-wide text-sm uppercase text-slate-400">
                Screenshots / Gallery
              </h4>

              {/* Main Preview Screen */}
              <div className="relative w-full h-56 md:h-72 rounded-2xl overflow-hidden border border-slate-800/80 bg-slate-900/40 shadow-lg">
                <CachedImage
                  src={activeImage || screenshots[0]}
                  alt="active screenshot"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Thumbnails Navigation List */}
              <div className="flex flex-wrap items-center gap-3">
                {screenshots.slice(0, 3).map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(imgUrl)}
                    className={cn(
                      "relative w-20 h-14 rounded-lg overflow-hidden border transition-all duration-200 focus:outline-none",
                      (activeImage || screenshots[0]) === imgUrl
                        ? "border-blue-500 scale-105 shadow-md shadow-blue-500/20"
                        : "border-slate-850 hover:border-slate-700"
                    )}
                  >
                    <CachedImage src={imgUrl} alt={`thumbnail-${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}

                {screenshots.length > 3 && (
                  <button
                    onClick={() => setShowAllImages(true)}
                    className={cn(
                      "w-20 h-14 rounded-lg border border-slate-850 hover:border-slate-700 bg-slate-900/40 hover:bg-slate-900/80 flex items-center justify-center text-slate-300 font-bold text-sm transition-all focus:outline-none",
                      showAllImages ? "hidden" : "flex"
                    )}
                  >
                    +{screenshots.length - 3}
                  </button>
                )}

                {showAllImages && screenshots.slice(3).map((imgUrl, idx) => (
                  <button
                    key={idx + 3}
                    onClick={() => setActiveImage(imgUrl)}
                    className={cn(
                      "relative w-20 h-14 rounded-lg overflow-hidden border transition-all duration-200 focus:outline-none",
                      (activeImage || screenshots[0]) === imgUrl
                        ? "border-blue-500 scale-105 shadow-md shadow-blue-500/20"
                        : "border-slate-850 hover:border-slate-700"
                    )}
                  >
                    <CachedImage src={imgUrl} alt={`thumbnail-${idx + 3}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
