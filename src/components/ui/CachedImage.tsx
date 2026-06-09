import React, { useState, useEffect } from "react";

// Hook to cache image locally using the Cache Storage API
export const useCachedImage = (src: string | null | undefined) => {
  const [imageSrc, setImageSrc] = useState<string>("");

  useEffect(() => {
    if (!src) {
      setImageSrc("");
      return;
    }

    // Don't try to fetch data URLs (base64)
    if (src.startsWith("data:")) {
      setImageSrc(src);
      return;
    }

    let isMounted = true;
    let objectUrl: string | null = null;

    const loadAndCacheImage = async () => {
      // Check if Cache API is supported (standard in HTTPS and localhost)
      if (!("caches" in window)) {
        if (isMounted) setImageSrc(src);
        return;
      }

      const cacheName = "portfolio-image-cache";

      try {
        const cache = await caches.open(cacheName);
        const cachedResponse = await cache.match(src);

        if (cachedResponse) {
          const blob = await cachedResponse.blob();
          objectUrl = URL.createObjectURL(blob);
          if (isMounted) {
            setImageSrc(objectUrl);
          }
          return;
        }

        // Fetch the image with CORS
        const response = await fetch(src, { mode: "cors" });
        if (response.ok) {
          await cache.put(src, response.clone());
          const blob = await response.blob();
          objectUrl = URL.createObjectURL(blob);
          if (isMounted) {
            setImageSrc(objectUrl);
          }
        } else {
          if (isMounted) setImageSrc(src);
        }
      } catch (error) {
        // Fallback to direct src if fetch/CORS fails (e.g. CORS block or offline)
        if (isMounted) setImageSrc(src);
      }
    };

    loadAndCacheImage();

    return () => {
      isMounted = false;
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [src]);

  return imageSrc || src || "";
};

interface CachedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
}

export const CachedImage: React.FC<CachedImageProps> = ({ src, alt, ...props }) => {
  const cachedSrc = useCachedImage(src);
  return <img src={cachedSrc} alt={alt} {...props} />;
};
