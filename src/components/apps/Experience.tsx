import { experience } from "@/data/profile";

export default function Experience() {
  return (
    <div className="h-full overflow-y-auto p-6">
      <ol className="relative space-y-6 border-l border-white/10 pl-6">
        {experience.map((job) => (
          <li key={`${job.role}-${job.org}`} className="relative">
            <span
              className={`absolute -left-[31px] top-1.5 h-3 w-3 rounded-full ring-4 ring-[#1b1830] ${
                job.current ? "bg-emerald-400" : "bg-white/30"
              }`}
            />
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <h3 className="font-semibold">{job.role}</h3>
              <span className="text-xs tabular-nums text-white/45">{job.dates}</span>
            </div>
            <p className="text-sm text-violet-200/80">{job.org}</p>
            <ul className="mt-2 space-y-1 text-sm text-white/70">
              {job.bullets.map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="text-white/30">•</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
