import type { ReactNode } from "react";

type IconKind =
  | "about"
  | "experience"
  | "education"
  | "projects"
  | "browser"
  | "terminal"
  | "resume"
  | "contact"
  | "github"
  | "linkedin";

const tiles: Record<IconKind, string> = {
  about: "bg-gradient-to-b from-sky-400 to-blue-600",
  experience: "bg-gradient-to-b from-amber-300 to-orange-600",
  education: "bg-gradient-to-b from-emerald-300 to-teal-600",
  projects: "bg-gradient-to-b from-violet-400 to-purple-700",
  browser: "bg-gradient-to-b from-sky-300 to-indigo-600",
  terminal: "bg-gradient-to-b from-zinc-700 to-zinc-950 ring-1 ring-inset ring-white/15",
  resume: "bg-gradient-to-b from-rose-400 to-red-600",
  contact: "bg-gradient-to-b from-cyan-300 to-sky-600",
  github: "bg-gradient-to-b from-zinc-800 to-black ring-1 ring-inset ring-white/15",
  linkedin: "bg-gradient-to-b from-sky-500 to-blue-800",
};

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function GitHubGlyph({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

export function LinkedInGlyph({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.5c0-1.3-.02-3-1.83-3-1.83 0-2.1 1.43-2.1 2.9V21H9z" />
    </svg>
  );
}

export function MailGlyph({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

const glyphs: Record<IconKind, ReactNode> = {
  about: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <circle cx="12" cy="8.5" r="3.5" />
      <path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5" />
    </svg>
  ),
  experience: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18" />
    </svg>
  ),
  education: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <path d="M2 9.5 12 4.5l10 5-10 5-10-5z" />
      <path d="M6 11.5v4.5c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5" />
    </svg>
  ),
  projects: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </svg>
  ),
  browser: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5 13.2 13.2 8.5 15.5l2.3-4.7z" fill="currentColor" />
    </svg>
  ),
  terminal: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <path d="m6 8 4 4-4 4M12.5 16H18" />
    </svg>
  ),
  resume: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <path d="M7 3h7l5 5v13H7z" />
      <path d="M14 3v5h5M10 13h6M10 17h4" />
    </svg>
  ),
  contact: <MailGlyph className="h-full w-full" />,
  github: <GitHubGlyph className="h-full w-full" />,
  linkedin: <LinkedInGlyph className="h-full w-full" />,
};

export function AppIcon({ kind }: { kind: IconKind }) {
  return (
    <div
      className={`flex h-full w-full items-center justify-center rounded-[24%] text-white shadow-lg shadow-black/40 ${tiles[kind]}`}
    >
      <div className="h-[52%] w-[52%] drop-shadow">{glyphs[kind]}</div>
    </div>
  );
}
