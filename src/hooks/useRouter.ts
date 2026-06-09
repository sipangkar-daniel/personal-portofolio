import { useState, useEffect } from "react";

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

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", handleLocationChange);
    return () => {
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);

  return {
    currentPath,
    navigate: navigateTo,
  };
};
