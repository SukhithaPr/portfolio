"use client";

import { useState } from "react";
import { profile, skills, softSkills } from "@/data/profile";

const tabs = ["About", "Skills"] as const;
type Tab = (typeof tabs)[number];

export default function About() {
  const [tab, setTab] = useState<Tab>("About");

  return (
    <div className="flex h-full flex-col sm:flex-row">
      <nav className="flex shrink-0 gap-1 border-b border-white/10 bg-white/[0.03] p-2 sm:w-44 sm:flex-col sm:border-b-0 sm:border-r">
        <p className="hidden px-2 pb-1 pt-1 text-[11px] font-semibold uppercase tracking-wider text-white/35 sm:block">
          Favorites
        </p>
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`rounded-md px-2.5 py-1.5 text-left text-[13px] transition ${
              tab === t ? "bg-violet-500/80 text-white" : "text-white/70 hover:bg-white/5"
            }`}
          >
            {t}
          </button>
        ))}
      </nav>
      <div className="min-h-0 flex-1 overflow-y-auto p-6">
        {tab === "About" ? <AboutPane /> : <SkillsPane />}
      </div>
    </div>
  );
}

function AboutPane() {
  const initials = profile.name
    .split(" ")
    .map((p) => p[0])
    .join("");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-5">
        {profile.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={profile.photo} alt={profile.name} className="h-24 w-24 rounded-2xl object-cover ring-1 ring-white/15" />
        ) : (
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-400 via-fuchsia-500 to-indigo-600 text-3xl font-bold shadow-lg">
            {initials}
          </div>
        )}
        <div>
          <h2 className="text-2xl font-bold">{profile.name}</h2>
          <p className="text-sm text-white/65">{profile.title}</p>
          <p className="mt-1 text-xs text-white/40">📍 {profile.location}</p>
        </div>
      </div>

      <p className="leading-relaxed text-white/80">{profile.bio}</p>

      <dl className="grid gap-3 sm:grid-cols-2">
        <Fact label="Currently" value={profile.currently} />
        <Fact label="Studying" value="BSc (Hons) Computer Science · Westminster" />
      </dl>

      <div>
        <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-white/40">Soft skills</h3>
        <div className="flex flex-wrap gap-1.5">
          {softSkills.map((s) => (
            <span key={s} className="rounded-full bg-white/[0.07] px-3 py-1 text-xs text-white/75">
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
      <dt className="text-[11px] uppercase tracking-wider text-white/40">{label}</dt>
      <dd className="mt-0.5 text-sm">{value}</dd>
    </div>
  );
}

function SkillsPane() {
  return (
    <div className="space-y-5">
      <p className="text-xs text-white/45">
        <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-violet-400 align-middle" />
        Highlighted = what I work with most
      </p>
      {skills.map((g) => (
        <section key={g.group}>
          <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-white/40">{g.group}</h3>
          <div className="flex flex-wrap gap-1.5">
            {g.items.map((s) => (
              <span
                key={s.name}
                className={`rounded-md px-2.5 py-1 text-xs ${
                  s.strong
                    ? "bg-violet-500/25 text-violet-100 ring-1 ring-inset ring-violet-400/50"
                    : "bg-white/[0.06] text-white/70"
                }`}
              >
                {s.name}
              </span>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
