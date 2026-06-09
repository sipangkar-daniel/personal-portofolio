import { useState, useEffect } from "react";
import { fetchRepos } from "github-portfolio-fetcher";
import type { Project } from "../constants/portfolioData";

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const myRepos = [
    { type: "github" as const, owner: "sipangkar-daniel", repo: "personal-portofolio" },
    { type: "github" as const, owner: "sipangkar-daniel", repo: "timesheet-builder" },
  ];

  useEffect(() => {
    fetchRepos(myRepos)
      .then((data) => {
        const mapped = data.map((repo, idx) => {
          const isPrivate = (repo as any).isPrivate || (repo.raw && repo.raw.private) || false;
          return {
            id: `repo-${idx}-${repo.name}`,
            title:
              repo.title ||
              (repo.name
                ? repo.name
                    .split(/[-_]+/)
                    .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
                    .join(" ")
                : "Untitled Project"),
            description: repo.shortDescription || repo.description || "No description provided.",
            longDescription: repo.longDescription || repo.description || "No description provided.",
            thumbnail:
              (repo.imageUrls && repo.imageUrls[0]) ||
              (repo as any).imageUrl ||
              "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=800",
            tools:
              repo.technologies && repo.technologies.length > 0
                ? repo.technologies
                : repo.topics && repo.topics.length > 0
                ? repo.topics
                : repo.language && repo.language !== "Unknown"
                ? [repo.language]
                : [],
            isPrivate: isPrivate,
            repoUrl: repo.githubUrl || repo.htmlUrl,
            liveUrl: repo.liveUrl || (repo.raw && repo.raw.homepage) || repo.htmlUrl,
            category: repo.category || (isPrivate ? "Private Project" : "Personal Project"),
            imageUrls: repo.imageUrls,
          };
        });
        setProjects(mapped);
      })
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { projects, loading, error };
};
