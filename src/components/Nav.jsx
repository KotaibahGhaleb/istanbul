import { useEffect, useState } from "react";

const LINKS = [
  ["#days", "البرنامج"],
  ["#places", "المعالم"],
  ["#food", "المطاعم"],
  ["#tips", "نصائح"],
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(scrollY > 40);
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-night/85 px-[5vw] py-3.5 text-white backdrop-blur-md transition-shadow ${
        scrolled ? "shadow-lg shadow-black/25" : ""
      }`}
    >
      <a href="#top" className="text-xl font-extrabold tracking-wide">
        🌙 اسطنبول<span className="text-goldlight font-medium text-base"> ٢٠٢٦</span>
      </a>

      <div
        className={`${
          open ? "flex" : "hidden"
        } absolute inset-x-0 top-full flex-col gap-4 bg-night px-[5vw] pb-6 pt-4 md:static md:flex md:flex-row md:gap-7 md:bg-transparent md:p-0`}
      >
        {LINKS.map(([href, label]) => (
          <a
            key={href}
            href={href}
            onClick={() => setOpen(false)}
            className="relative font-medium text-white/85 transition-colors after:absolute after:-bottom-1.5 after:inset-x-0 after:h-0.5 after:origin-right after:scale-x-0 after:bg-gold after:transition-transform hover:text-goldlight hover:after:scale-x-100"
          >
            {label}
          </a>
        ))}
      </div>

      <button
        onClick={() => setOpen((v) => !v)}
        className="text-2xl md:hidden"
        aria-label="القائمة"
      >
        ☰
      </button>
    </nav>
  );
}
