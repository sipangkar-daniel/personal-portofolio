import { useState, useEffect, useRef } from "react";

// Helper function to push history state and trigger event
export const navigateTo = (path: string) => {
  window.history.pushState({}, "", path);
  // Dispatch a popstate event so all router hooks are notified of the path change
  const navEvent = new PopStateEvent("popstate");
  window.dispatchEvent(navEvent);
  window.scrollTo({ top: 0, behavior: "instant" });
};

export const useRouter = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [previousPath, setPreviousPath] = useState<string | null>(null);
  const pathRef = useRef(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      const newPath = window.location.pathname;
      if (newPath !== pathRef.current) {
        setPreviousPath(pathRef.current);
        pathRef.current = newPath;
        setCurrentPath(newPath);
      }
    };

    window.addEventListener("popstate", handleLocationChange);
    return () => {
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);

  return {
    currentPath,
    previousPath,
    navigate: navigateTo,
  };
};
