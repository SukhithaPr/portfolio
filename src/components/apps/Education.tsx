import { certifications, education } from "@/data/profile";

export default function Education() {
  return (
    <div className="h-full space-y-7 overflow-y-auto p-6">
      <section className="space-y-3">
        {education.map((e) => (
          <div key={e.school} className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <h3 className="font-semibold">{e.school}</h3>
              <span className="text-xs tabular-nums text-white/45">{e.dates}</span>
            </div>
            <p className="text-sm text-emerald-200/80">{e.degree}</p>
            {e.via && <p className="mt-0.5 text-xs text-white/45">via {e.via}</p>}
          </div>
        ))}
      </section>

      <section>
        <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-white/40">
          Certifications & competitions
        </h3>
        <ul className="grid gap-2 sm:grid-cols-2">
          {certifications.map((c) => (
            <li key={c.name} className="flex gap-3 rounded-lg bg-white/[0.04] p-3">
              <span aria-hidden>🏆</span>
              <div>
                <p className="text-sm font-medium">{c.name}</p>
                <p className="text-xs text-white/45">{c.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
