import { useEffect, useState } from "react";

export default function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(scrollY > 600);
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <footer className="bg-gradient-to-b from-deep to-night px-[5vw] pb-10 pt-14 text-center text-white/85">
        <p className="mb-2.5 text-2xl font-black text-goldlight">🌙 رحلة اسطنبول</p>
        <p>6 أيام بين قارتين — انشالله رحلة عمر 💛</p>
        <p className="mt-4 text-xs text-white/45">
          الأسعار وساعات العمل تقديرية وتتغير — تحقق من المواقع الرسمية قبل الزيارة ·
          الصور من Wikimedia Commons
        </p>
      </footer>

      <button
        onClick={() => scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="العودة للأعلى"
        className={`fixed bottom-6 end-6 z-40 h-12 w-12 rounded-full bg-sea text-xl text-white shadow-xl transition-all hover:-translate-y-1 hover:bg-turq ${
          showTop ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        ↑
      </button>
    </>
  );
}
