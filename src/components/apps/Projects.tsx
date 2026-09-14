import { projects, type Project } from "@/data/profile";

const covers = [
  "from-violet-500 to-indigo-700",
  "from-fuchsia-500 to-purple-700",
  "from-sky-500 to-indigo-600",
  "from-amber-400 to-rose-600",
  "from-emerald-400 to-cyan-700",
  "from-rose-400 to-violet-700",
];

type OpenUrl = (url: string) => void;

export default function Projects({ openUrl }: { openUrl: OpenUrl }) {
  const featured = projects.filter((p) => p.featured);
  const more = projects.filter((p) => !p.featured);

  return (
    <div className="h-full space-y-8 overflow-y-auto p-6">
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((p, i) => (
          <Card key={p.name} project={p} cover={covers[i % covers.length]} openUrl={openUrl} />
        ))}
      </section>

      <section>
        <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-white/40">More on GitHub</h3>
        <ul className="divide-y divide-white/[0.06] rounded-xl border border-white/10 bg-white/[0.03]">
          {more.map((p) => (
            <li key={p.name} className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5">
              <div className="min-w-0">
                <p className="text-sm font-medium">{p.name}</p>
                <p className="text-xs text-white/45">
                  {p.description} · {p.stack.join(", ")}
                </p>
              </div>
              <Links project={p} openUrl={openUrl} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function Card({ project: p, cover, openUrl }: { project: Project; cover: string; openUrl: OpenUrl }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] transition hover:border-white/25 hover:bg-white/[0.07]">
      <div className={`relative flex h-28 items-center justify-center bg-gradient-to-br ${cover}`}>
        <span className="text-4xl font-black text-white/90 drop-shadow">{p.name.slice(0, 2)}</span>
        {p.nda && (
          <span className="absolute right-2 top-2 rounded-full bg-black/40 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider backdrop-blur">
            🔒 NDA
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-semibold">{p.name}</h3>
        <p className="flex-1 text-sm text-white/65">{p.description}</p>
        {p.stack.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {p.stack.map((s) => (
              <span key={s} className="rounded bg-white/[0.07] px-1.5 py-0.5 text-[11px] text-white/70">
                {s}
              </span>
            ))}
          </div>
        )}
        {p.nda ? (
          <p className="text-xs italic text-white/40">Details under NDA</p>
        ) : (
          <Links project={p} openUrl={openUrl} />
        )}
      </div>
    </article>
  );
}

// Links open in the built-in Browser window.
function Links({ project, openUrl }: { project: Project; openUrl: OpenUrl }) {
  return (
    <div className="flex gap-2">
      {project.links.map((l) => (
        <button
          key={l.href}
          type="button"
          onClick={() => openUrl(l.href)}
          className="rounded-md bg-white/10 px-2.5 py-1 text-xs font-medium hover:bg-violet-500/60"
        >
          {l.label} →
        </button>
      ))}
    </div>
  );
}
