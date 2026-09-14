"use client";

import { profile } from "@/data/profile";
import { useClock } from "./hooks";
import { GitHubGlyph, LinkedInGlyph } from "./icons";
import type { AppId } from "./apps/types";

const shortcuts: { id: AppId; label: string }[] = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export default function MenuBar({
  activeTitle,
  onOpen,
}: {
  activeTitle: string;
  onOpen: (id: AppId) => void;
}) {
  const clock = useClock();

  return (
    <header className="absolute inset-x-0 top-0 z-[1000] flex h-7 items-center justify-between bg-black/25 px-3 text-[13px] text-white/90 backdrop-blur-xl sm:px-4">
      <nav className="flex min-w-0 items-center gap-4">
        <span className="flex h-4 w-4 items-center justify-center" aria-hidden>
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5">
            <path d="M8 1 15 8 8 15 1 8z" fill="#c4b5fd" />
            <path d="M8 4.5 11.5 8 8 11.5 4.5 8z" fill="#1c1440" />
          </svg>
        </span>
        <span className="truncate font-semibold">{activeTitle}</span>
        <div className="hidden items-center gap-4 md:flex">
          {shortcuts.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => onOpen(s.id)}
              className="rounded px-1 text-white/75 hover:bg-white/10 hover:text-white"
            >
              {s.label}
            </button>
          ))}
        </div>
      </nav>
      <div className="flex shrink-0 items-center gap-3.5">
        <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="opacity-80 hover:opacity-100">
          <GitHubGlyph className="h-3.5 w-3.5" />
        </a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="opacity-80 hover:opacity-100">
          <LinkedInGlyph className="h-3.5 w-3.5" />
        </a>
        <span className="tabular-nums whitespace-pre" suppressHydrationWarning>
          {clock}
        </span>
      </div>
    </header>
  );
}
