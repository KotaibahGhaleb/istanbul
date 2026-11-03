import { EXTRAS, TIPS } from "../data";
import WikiImage from "./WikiImage";

export function Extras() {
  return (
    <section className="bg-sand px-[5vw] py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-11 text-center">
          <p className="mb-2 text-sm font-bold tracking-[0.2em] text-terra">لو بقي وقت</p>
          <h2 className="text-4xl font-black text-deep md:text-5xl">بدائل اختيارية</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {EXTRAS.map((e) => (
            <div
              key={e.title}
              className="group overflow-hidden rounded-2xl border border-dashed border-[#d8d0be] bg-white shadow-md shadow-night/5 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="h-28 overflow-hidden">
                <WikiImage
                  title={e.wiki}
                  alt={e.title}
                  icon={e.icon}
                  className="h-28 w-full transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="mb-1.5 font-extrabold text-deep">
                  {e.icon} {e.title}
                </h3>
                <p className="text-sm text-muted">{e.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Tips() {
  return (
    <section id="tips" className="mx-auto max-w-6xl px-[5vw] py-20">
      <div className="mb-11 text-center">
        <p className="mb-2 text-sm font-bold tracking-[0.2em] text-terra">قبل ما تسافر</p>
        <h2 className="mb-3 text-4xl font-black text-deep md:text-5xl">نصائح عملية</h2>
        <p className="mx-auto max-w-xl text-muted">
          أشياء تختصر عليكم وقت وفلوس وتخلي الرحلة أسلس.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TIPS.map((t) => (
          <div
            key={t.title}
            className="flex items-start gap-3.5 rounded-2xl bg-white p-5 shadow-md shadow-night/5 transition-transform hover:-translate-y-1"
          >
            <span className="shrink-0 rounded-xl bg-sand px-3 py-2 text-2xl leading-none">
              {t.icon}
            </span>
            <div>
              <h3 className="mb-1 font-extrabold text-deep">{t.title}</h3>
              <p className="text-sm text-muted">{t.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
