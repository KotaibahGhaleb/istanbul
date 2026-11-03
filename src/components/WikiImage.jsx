import { useState } from "react";
import { useWikiImage } from "../hooks";

/** صورة من ويكيبيديا مع حالة تحميل وبديل أنيق عند الفشل */
export default function WikiImage({ title, alt, icon = "🏙️", className = "", size = 800 }) {
  const { src, loading } = useWikiImage(title, size);
  const [broken, setBroken] = useState(false);

  const fallback = (
    <div
      className={`flex items-center justify-center bg-gradient-to-br from-sea to-night ${className}`}
      role="img"
      aria-label={alt}
    >
      <span className="text-5xl opacity-60">{icon}</span>
    </div>
  );

  if (!src) {
    if (loading) {
      return (
        <div
          className={`animate-pulse bg-gradient-to-br from-sea/70 to-night ${className}`}
          aria-label={alt}
        />
      );
    }
    return fallback;
  }

  if (broken) return fallback;

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setBroken(true)}
      className={`object-cover ${className}`}
    />
  );
}
