import { useEffect } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Days from "./components/Days";
import { Places, Food } from "./components/Cards";
import { Extras, Tips } from "./components/Tips";
import Footer from "./components/Footer";
import { DAYS, EXTRAS, PLACES, RESTAURANTS } from "./data";
import { preloadWikiImages } from "./hooks";

const STATS = [
  ["6", "أيام"],
  ["18+", "معلم سياحي"],
  ["19", "مطعم ومقهى"],
  ["2", "قارتين في رحلة واحدة"],
];

export default function App() {
  // تحميل كل صور المعالم والمطاعم دفعة واحدة
  useEffect(() => {
    preloadWikiImages(
      [
        "Bosphorus",
        ...PLACES.map((p) => p.wiki),
        ...RESTAURANTS.map((r) => r.wiki),
        ...EXTRAS.map((e) => e.wiki),
        ...DAYS.flatMap((d) => d.items.map((i) => i.wiki)).filter(Boolean),
      ],
      800
    );
  }, []);

  return (
    <div className="min-h-screen font-sans">
      <Nav />
      <Hero />

      {/* إحصائيات */}
      <section className="relative z-10 -mt-8 flex flex-wrap justify-center gap-10 px-[5vw] py-9 md:gap-20">
        {STATS.map(([n, l]) => (
          <div key={l} className="text-center">
            <b className="block text-4xl font-black text-sea">{n}</b>
            <span className="text-sm text-muted">{l}</span>
          </div>
        ))}
      </section>

      <Days />
      <Places />
      <Food />
      <Extras />
      <Tips />
      <Footer />
    </div>
  );
}
