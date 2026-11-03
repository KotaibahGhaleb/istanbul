import { useState } from "react";
import { DAYS } from "../data";
import WikiGallery from "./WikiGallery";

const mapsUrl = (q) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q + " Istanbul")}`;

export default function Days() {
  const [active, setActive] = useState(0);
  const day = DAYS[active];

  return (
    <section id="days" className="mx-auto max-w-6xl px-[5vw] py-20">
      <div className="mb-11 text-center">
        <p className="mb-2 text-sm font-bold tracking-[0.2em] text-terra">اليوم بيوم</p>
        <h2 className="mb-3 text-4xl font-black text-deep md:text-5xl">برنامج الـ 6 أيام</h2>
        <p className="mx-auto max-w-xl text-muted">
          منظم حسب القرب الجغرافي من سكنكم في السلطان أحمد — كل يوم منطقة، بدون إضاعة وقت بالتنقل.
        </p>
      </div>

      {/* تبويبات الأيام */}
      <div className="mb-9 flex flex-wrap justify-center gap-2.5">
        {DAYS.map((d, i) => (
          <button
            key={d.num}
            onClick={() => setActive(i)}
            className={`rounded-full border-[1.5px] px-5 py-2.5 text-sm font-bold transition-all ${
              i === active
                ? "border-sea bg-gradient-to-br from-sea to-turq text-white shadow-lg shadow-sea/25"
                : "border-turq bg-white text-sea hover:bg-sand"
            }`}
          >
            {d.icon} اليوم {d.num}
          </button>
        ))}
      </div>

      {/* محتوى اليوم */}
      <div key={active} className="anim-fade-up">
        <div className="mb-7 flex flex-wrap items-center gap-4 rounded-2xl bg-gradient-to-br from-deep to-turq p-6 text-white shadow-lg shadow-sea/20">
          <span className="text-4xl">{day.icon}</span>
          <div className="flex-1">
            <h3 className="text-2xl font-extrabold">{day.title}</h3>
            <p className="text-sm text-white/75">{day.subtitle}</p>
          </div>
          <span className="rounded-xl border border-gold/50 bg-white/15 px-4 py-2 font-extrabold text-goldlight">
            اليوم {day.num}
          </span>
        </div>

        <div className="timeline relative ps-9">
          {day.items.map((it, i) => (
            <div key={i} className="tl-dot relative mb-5">
              <div className="overflow-hidden rounded-2xl border-s-4 border-turq bg-white shadow-md shadow-night/5 transition-transform last:border-gold hover:-translate-x-1 hover:shadow-xl">
                {it.wiki && (
                  <WikiGallery
                    title={it.wiki}
                    alt={it.name}
                    icon={day.icon}
                    imgClass="h-52 sm:h-60"
                  />
                )}
                <div className="min-w-0 flex-1 p-5 pt-4">
                  <div className="mb-1.5 flex flex-wrap items-center gap-3">
                    <span className="rounded-lg bg-sand px-3 py-0.5 text-xs font-extrabold tabular-nums text-sea">
                      {it.time}
                    </span>
                    <h4 className="text-lg font-extrabold text-deep">{it.name}</h4>
                    {it.map && (
                      <a
                        href={mapsUrl(it.map)}
                        target="_blank"
                        rel="noopener"
                        className="ms-auto whitespace-nowrap text-xs font-bold text-terra hover:underline"
                      >
                        📍 الخريطة
                      </a>
                    )}
                  </div>
                  <p className="text-[0.95rem] text-muted">{it.desc}</p>
                  {it.tip && (
                    <div className="mt-2.5 rounded-lg border-s-[3px] border-gold bg-gold/10 px-3.5 py-2 text-[0.85rem] text-[#7a6410]">
                      💡 {it.tip}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
