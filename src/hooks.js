import { useEffect, useReducer, useRef, useState } from "react";

/* مخزن صور مشترك — يجمّع كل العناوين في طلب ويكيبيديا واحد
   (الـ API يسمح بـ 50 عنواناً للطلب، ويوفر حدّ الطلبات) */
const cache = new Map(); // title -> url | null
const subs = new Set();
const emit = () => subs.forEach((f) => f());

export function preloadWikiImages(titles, size = 800) {
  const missing = [...new Set(titles)].filter((t) => t && !cache.has(t));
  if (!missing.length) return;

  for (let i = 0; i < missing.length; i += 50) {
    const chunk = missing.slice(i, i + 50);
    fetch(
      `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&piprop=thumbnail&pithumbsize=${size}&titles=${encodeURIComponent(
        chunk.join("|")
      )}&format=json&origin=*&redirects=1`
    )
      .then((r) => r.json())
      .then((j) => {
        const pages = {};
        Object.values(j?.query?.pages ?? {}).forEach((p) => {
          pages[p.title] = p?.thumbnail?.source ?? null;
        });
        const norm = j?.query?.normalized ?? [];
        const redir = j?.query?.redirects ?? [];

        chunk.forEach((orig) => {
          let t = orig;
          const n = norm.find((x) => x.from === t);
          if (n) t = n.to;
          const r = redir.find((x) => x.from === t);
          if (r) t = r.to;
          cache.set(orig, pages[t] ?? null);
        });
        emit();
      })
      .catch(() => {
        chunk.forEach((t) => cache.set(t, null));
        emit();
      });
  }
}

/**
 * يسحب صورة مقال ويكيبيديا الإنجليزي (صورة الصفحة الرئيسية).
 * يرجع { src, loading }.
 */
export function useWikiImage(title, size = 800) {
  const [, force] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    const f = () => force();
    subs.add(f);
    return () => subs.delete(f);
  }, []);

  useEffect(() => {
    if (title && !cache.has(title)) preloadWikiImages([title], size);
  }, [title, size]);

  return { src: title ? cache.get(title) ?? null : null, loading: !!title && !cache.has(title) };
}

/* ---------- معرض صور: كل صور مقال ويكيبيديا ---------- */
const galleryCache = new Map(); // title -> string[] | "pending"
const gallerySubs = new Set();
const emitG = () => gallerySubs.forEach((f) => f());

export function fetchWikiGallery(title) {
  if (!title || galleryCache.has(title)) return;
  galleryCache.set(title, "pending");
  fetch(
    `https://en.wikipedia.org/w/api.php?action=query&generator=images&titles=${encodeURIComponent(
      title
    )}&prop=imageinfo&iiprop=url&iiurlwidth=800&gimlimit=40&format=json&origin=*`
  )
    .then((r) => r.json())
    .then((j) => {
      const urls = Object.values(j?.query?.pages ?? {})
        .filter((p) => /\.(jpe?g|png|webp)$/i.test(p?.title ?? ""))
        .filter(
          (p) =>
            !/(logo|icon|locator|location|map|flag|seal|emblem|coat|symbol|arrow|edit|wikidata|commons-logo|question|book|sound|audio|video)/i.test(
              p?.title ?? ""
            )
        )
        .map((p) => p?.imageinfo?.[0]?.thumburl ?? p?.imageinfo?.[0]?.url)
        .filter(Boolean);
      galleryCache.set(title, urls.slice(0, 6));
      emitG();
    })
    .catch(() => {
      galleryCache.set(title, []);
      emitG();
    });
}

export function useWikiGallery(title, enabled = true) {
  const [, force] = useReducer((x) => x + 1, 0);
  useEffect(() => {
    const f = () => force();
    gallerySubs.add(f);
    return () => gallerySubs.delete(f);
  }, []);
  useEffect(() => {
    if (enabled) fetchWikiGallery(title);
  }, [title, enabled]);
  const v = galleryCache.get(title);
  return Array.isArray(v) ? v : null; // null = لسه تحميل
}

/* ---------- يكتشف ظهور العنصر على الشاشة (لتحميل الصور بكسل) ---------- */
export function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const ob = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          ob.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);
  return [ref, inView];
}
