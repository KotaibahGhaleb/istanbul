import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useInView, useWikiGallery, useWikiImage } from "../hooks";

/* لايت بوكس — عرض الصورة كاملة مع تنقل وسحب باللمس */
function Lightbox({ images, idx, setIdx, onClose }) {
  const touchX = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") setIdx((i) => (i + 1) % images.length);
      if (e.key === "ArrowRight") setIdx((i) => (i - 1 + images.length) % images.length);
    };
    addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [images.length, onClose, setIdx]);

  const swipe = (e) => {
    if (touchX.current == null) return;
    const d = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(d) > 40)
      setIdx((i) => (d > 0 ? (i + 1) % images.length : (i - 1 + images.length) % images.length));
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col bg-night/95 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      {/* شريط علوي */}
      <div className="flex items-center justify-between px-5 py-4 text-white">
        <span className="text-sm tabular-nums text-white/70">
          {idx + 1} / {images.length}
        </span>
        <button
          onClick={onClose}
          className="rounded-full bg-white/15 px-5 py-2 text-xl transition-colors hover:bg-gold hover:text-night"
          aria-label="إغلاق"
        >
          ✕
        </button>
      </div>

      {/* الصورة */}
      <div
        className="relative flex min-h-0 flex-1 items-center justify-center px-3"
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={swipe}
      >
        <img
          src={images[idx]}
          alt=""
          onClick={(e) => e.stopPropagation()}
          draggable="false"
          className="max-h-full max-w-full select-none rounded-xl object-contain shadow-2xl"
        />
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIdx((i) => (i - 1 + images.length) % images.length);
              }}
              className="absolute end-2 top-1/2 -translate-y-1/2 rounded-full bg-white/15 px-4 py-3 text-2xl text-white backdrop-blur transition-colors hover:bg-gold hover:text-night sm:end-5"
              aria-label="السابق"
            >
              ‹
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIdx((i) => (i + 1) % images.length);
              }}
              className="absolute start-2 top-1/2 -translate-y-1/2 rounded-full bg-white/15 px-4 py-3 text-2xl text-white backdrop-blur transition-colors hover:bg-gold hover:text-night sm:start-5"
              aria-label="التالي"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* مصغّرات */}
      {images.length > 1 && (
        <div
          className="flex justify-start gap-2 overflow-x-auto px-4 pb-5 pt-3 sm:justify-center"
          dir="ltr"
          onClick={(e) => e.stopPropagation()}
        >
          {images.map((u, i) => (
            <button
              key={u}
              onClick={() => setIdx(i)}
              className={`h-12 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                i === idx ? "border-gold" : "border-transparent opacity-50 hover:opacity-100"
              }`}
            >
              <img src={u} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * معرض صور المكان — صورة رئيسية + شريط مصغّرات للتبديل.
 * يحمل الصور الإضافية فقط عندما يظهر على الشاشة.
 */
export default function WikiGallery({ title, alt, icon = "🏙️", imgClass = "h-44" }) {
  const [ref, inView] = useInView();
  const extra = useWikiGallery(title, inView);
  const { src: pageImg } = useWikiImage(title);
  const [idx, setIdx] = useState(0);
  const [open, setOpen] = useState(false);
  const [broken, setBroken] = useState({});

  const images =
    Array.isArray(extra) && extra.length ? extra : pageImg ? [pageImg] : [];
  const cur = images[Math.min(idx, images.length - 1)] ?? null;

  return (
    <div ref={ref}>
      {/* الصورة الرئيسية */}
      <div className={`relative overflow-hidden bg-night ${imgClass} w-full`}>
        {cur && !broken[cur] ? (
          <>
            {/* خلفية ضبابية من نفس الصورة — تغطي الفراغات بشكل جمالي */}
            <img
              src={cur}
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full scale-110 object-cover opacity-40 blur-xl"
            />
            <img
              src={cur}
              alt={alt}
              loading="lazy"
              onError={() => setBroken((b) => ({ ...b, [cur]: true }))}
              onClick={() => setOpen(true)}
              className="relative h-full w-full cursor-zoom-in object-contain transition-opacity duration-500"
            />
          </>
        ) : extra === null ? (
          <div className="h-full w-full animate-pulse bg-gradient-to-br from-sea/70 to-night" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-sea to-night">
            <span className="text-5xl opacity-60">{icon}</span>
          </div>
        )}
      </div>

      {/* شريط المصغّرات */}
      {images.length > 1 && (
        <div className="flex justify-center gap-1.5 bg-sand px-2 py-2" dir="ltr">
          {images.map((u, i) => (
            <button
              key={u}
              onClick={() => setIdx(i)}
              aria-label={`صورة ${i + 1}`}
              className={`h-10 w-14 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                i === idx
                  ? "border-gold shadow"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <img src={u} alt="" loading="lazy" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* لايت بوكس — يُرندر على مستوى الصفحة عبر Portal عشان ما ينقص داخل البطاقة */}
      {open &&
        cur &&
        createPortal(
          <Lightbox images={images} idx={idx} setIdx={setIdx} onClose={() => setOpen(false)} />,
          document.body
        )}
    </div>
  );
}
