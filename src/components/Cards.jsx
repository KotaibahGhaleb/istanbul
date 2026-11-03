import { useState } from "react";
import { PLACES, RESTAURANTS } from "../data";
import WikiGallery from "./WikiGallery";

const mapsUrl = (q) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q + " Istanbul")}`;

const TAG_COLORS = {
  "تاريخي": "border-turq",
  "إطلالة": "border-mist",
  "طبيعة": "border-mist",
  "تسوق": "border-gold",
  "تصوير": "border-terra",
  "محلي": "border-terra",
};

function Chips({ options, active, onChange }) {
  return (
    <div className="mb-8 flex flex-wrap justify-center gap-2.5">
      {options.map(([key, label]) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`rounded-full border-[1.5px] px-5 py-2 text-sm font-bold transition-all ${
            key === active
              ? "border-sea bg-sea text-white"
              : "border-[#d8d0be] bg-white text-muted hover:border-turq hover:text-sea"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function SectionHead({ kicker, title, lead }) {
  return (
    <div className="mb-11 text-center">
      <p className="mb-2 text-sm font-bold tracking-[0.2em] text-terra">{kicker}</p>
      <h2 className="mb-3 text-4xl font-black text-deep md:text-5xl">{title}</h2>
      {lead && <p className="mx-auto max-w-xl text-muted">{lead}</p>}
    </div>
  );
}

/* ---------- المعالم ---------- */
const PLACE_TAGS = ["الكل", "تاريخي", "إطلالة", "طبيعة", "تسوق", "تصوير", "محلي"];

export function Places() {
  const [tag, setTag] = useState("الكل");
  const list = PLACES.filter((p) => tag === "الكل" || p.tag === tag);

  return (
    <section id="places" className="bg-sand px-[5vw] py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          kicker="وين نروح"
          title="المعالم والأماكن"
          lead="كل معلم برابط مباشر لخرائط قوقل — اضغط 📍 للملاحة."
        />
        <Chips
          options={PLACE_TAGS.map((t) => [t, t])}
          active={tag}
          onChange={setTag}
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <article
              key={p.name}
              className="anim-fade-up group overflow-hidden rounded-2xl bg-white shadow-md shadow-night/5 transition-all hover:-translate-y-1.5 hover:shadow-xl"
            >
              {/* معرض الصور */}
              <div className="relative">
                <WikiGallery title={p.wiki} alt={p.name} icon={p.icon} imgClass="h-44" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-t from-night/60 to-transparent" />
                <span className="absolute right-3 top-3 rounded-lg bg-white/90 px-2.5 py-1 text-[0.7rem] font-extrabold text-sea backdrop-blur-sm">
                  {p.tag}
                </span>
                <span className="absolute bottom-3 left-3 text-2xl drop-shadow">{p.icon}</span>
              </div>

              <div className={`border-t-4 p-5 ${TAG_COLORS[p.tag] ?? "border-turq"}`}>
                <div className="mb-1 flex items-baseline justify-between gap-2">
                  <h3 className="text-lg font-extrabold text-deep">{p.name}</h3>
                  <span className="shrink-0 text-xs italic text-muted" dir="ltr">
                    {p.tr}
                  </span>
                </div>
                <p className="mb-2 text-sm font-bold text-terra">📌 {p.area}</p>
                <p className="text-sm text-muted">{p.desc}</p>
                {p.tip && (
                  <div className="mt-3 rounded-lg border-s-[3px] border-gold bg-gold/10 px-3 py-2 text-xs text-[#7a6410]">
                    💡 {p.tip}
                  </div>
                )}
                <div className="mt-4 flex items-center justify-between border-t border-dashed border-[#e5ddcb] pt-3.5">
                  <a
                    href={mapsUrl(p.tr)}
                    target="_blank"
                    rel="noopener"
                    className="text-sm font-bold text-terra hover:underline"
                  >
                    📍 افتح بالخريطة
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- المطاعم ---------- */
const FOOD_CATS = [
  ["all", "الكل"],
  ["breakfast", "🍳 فطور"],
  ["lunch", "🍽️ غداء"],
  ["dinner", "🌙 عشاء"],
  ["dessert", "🍮 حلويات"],
  ["coffee", "☕ قهوة"],
];

export function Food() {
  const [cat, setCat] = useState("all");
  const list = RESTAURANTS.filter((r) => cat === "all" || r.cat.includes(cat));

  return (
    <section id="food" className="mx-auto max-w-6xl px-[5vw] py-20">
      <SectionHead
        kicker="وين ناكل"
        title="المطاعم والمقاهي"
        lead="من فطور تركي أسطوري إلى بقلاوة لا تُنسى — منتقاة حسب الأيام."
      />
      <Chips options={FOOD_CATS} active={cat} onChange={setCat} />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((r) => (
          <article
            key={r.name}
            className="anim-fade-up group overflow-hidden rounded-2xl bg-white shadow-md shadow-night/5 transition-all hover:-translate-y-1.5 hover:shadow-xl"
          >
            <div className="relative">
              <WikiGallery title={r.wiki} alt={r.name} icon={r.icon} imgClass="h-40" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-t from-night/60 to-transparent" />
              <span className="absolute right-3 top-3 rounded-lg bg-white/90 px-2.5 py-1 text-[0.7rem] font-extrabold text-sea backdrop-blur-sm">
                {r.area}
              </span>
            </div>

            <div className="border-t-4 border-gold p-5">
              <div className="mb-1 flex items-baseline justify-between gap-2">
                <h3 className="text-lg font-extrabold text-deep">{r.name}</h3>
                <span className="shrink-0 text-xs italic text-muted" dir="ltr">
                  {r.tr}
                </span>
              </div>
              <p className="text-sm text-muted">{r.desc}</p>
              {r.must && (
                <p className="mt-3 text-sm font-bold text-sea">⭐ {r.must}</p>
              )}
              <div className="mt-4 flex items-center justify-between border-t border-dashed border-[#e5ddcb] pt-3.5">
                <span className="font-extrabold tracking-widest text-sea">{r.price}</span>
                <a
                  href={mapsUrl(r.tr)}
                  target="_blank"
                  rel="noopener"
                  className="text-sm font-bold text-terra hover:underline"
                >
                  📍 افتح بالخريطة
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
