import { useEffect, useState } from "react";
import { TRIP_DATE } from "../data";
import { useWikiImage } from "../hooks";

function useCountdown() {
  const target = new Date(TRIP_DATE).getTime();
  const [diff, setDiff] = useState(Math.max(0, target - Date.now()));

  useEffect(() => {
    const t = setInterval(() => setDiff(Math.max(0, target - Date.now())), 1000);
    return () => clearInterval(t);
  }, [target]);

  return {
    days: Math.floor(diff / 864e5),
    hours: Math.floor(diff / 36e5) % 24,
    mins: Math.floor(diff / 6e4) % 60,
    secs: Math.floor(diff / 1e3) % 60,
    done: diff <= 0,
    valid: !isNaN(target),
  };
}

export default function Hero() {
  const cd = useCountdown();
  const { src: bg } = useWikiImage("Bosphorus", 1600);

  const units = [
    [cd.days, "يوم"],
    [cd.hours, "ساعة"],
    [cd.mins, "دقيقة"],
    [cd.secs, "ثانية"],
  ];

  return (
    <header id="top" className="relative flex min-h-svh items-center justify-center overflow-hidden bg-night px-[5vw] pb-28 pt-24 text-center text-white">
      {/* صورة خلفية: البوسفور */}
      {bg && (
        <img
          src={bg}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-night/80 via-sea/60 to-night" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_15%,rgba(201,162,39,0.22),transparent_45%)]" />

      <div className="relative z-10 max-w-3xl">
        <p className="mb-3 font-medium tracking-[0.2em] text-goldlight anim-fade-up">
          ✈️ رحلتنا الخاصة
        </p>
        <h1 className="mb-4 text-6xl font-black leading-tight md:text-8xl anim-fade-up">
          اسطنبول
          <span className="mt-2 block font-display text-3xl text-goldlight md:text-5xl">
            مدينة القارتين
          </span>
        </h1>
        <p className="mb-10 text-white/80 md:text-xl anim-fade-up">
          6 أيام · معالم تاريخية · إطلالات ساحرة · تسوق · أطباق تركية أسطورية
        </p>

        {cd.valid && (
          <>
            <div className="mb-2 flex justify-center gap-3 anim-fade-up">
              {units.map(([v, label]) => (
                <div
                  key={label}
                  className="min-w-[72px] rounded-2xl border border-gold/40 bg-white/10 px-2 py-3 backdrop-blur-sm md:min-w-[86px]"
                >
                  <span className="block text-2xl font-extrabold tabular-nums text-goldlight md:text-3xl">
                    {v}
                  </span>
                  <small className="text-xs text-white/65">{label}</small>
                </div>
              ))}
            </div>
            <p className="mb-9 text-sm text-white/60">
              {cd.done ? "الرحلة بدأت — بالتوفيق! ✈️" : "حتى موعد الرحلة"}
            </p>
          </>
        )}

        <div className="flex flex-wrap justify-center gap-3.5 anim-fade-up">
          <a
            href="#days"
            className="rounded-full bg-gradient-to-br from-gold to-[#a8841c] px-8 py-3.5 font-bold text-night shadow-lg shadow-gold/30 transition-transform hover:-translate-y-0.5"
          >
            شوف البرنامج 📅
          </a>
          <a
            href="#food"
            className="rounded-full border-[1.5px] border-white/40 px-8 py-3.5 font-bold text-white transition-all hover:-translate-y-0.5 hover:border-gold hover:text-goldlight"
          >
            وين ناكل؟ 🍽️
          </a>
        </div>
      </div>
    </header>
  );
}
