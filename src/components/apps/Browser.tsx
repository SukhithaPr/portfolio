"use client";

import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { education, experience, profile, projects } from "@/data/profile";
import { AppIcon } from "../icons";

export type BrowserRequest = { url: string; id: number };
export const START_URL = "portfolio://start";

const GITHUB_USER = new URL(profile.github).pathname.split("/").filter(Boolean)[0] ?? "";
const LINKEDIN_HANDLE = new URL(profile.linkedin).pathname.split("/").filter(Boolean)[1] ?? "";

// These sites send X-Frame-Options / frame-ancestors, so they can never load in an iframe.
const BLOCKED_HOSTS = ["github.com", "linkedin.com", "google.com", "x.com", "twitter.com", "facebook.com", "instagram.com"];

type Page =
  | { kind: "start" }
  | { kind: "github"; repo?: string }
  | { kind: "linkedin" }
  | { kind: "blocked"; url: string; host: string }
  | { kind: "web"; url: string }
  | { kind: "invalid"; url: string };

function resolve(url: string): Page {
  if (url === START_URL) return { kind: "start" };
  let u: URL;
  try {
    u = new URL(url);
  } catch {
    return { kind: "invalid", url };
  }
  if (u.protocol !== "https:" && u.protocol !== "http:") return { kind: "invalid", url };
  const host = u.hostname.replace(/^www\./, "");
  const parts = u.pathname.split("/").filter(Boolean);
  if (host === "github.com" && parts[0]?.toLowerCase() === GITHUB_USER.toLowerCase()) {
    return { kind: "github", repo: parts[1] };
  }
  if (host === "linkedin.com" && parts[0] === "in" && parts[1]?.toLowerCase() === LINKEDIN_HANDLE.toLowerCase()) {
    return { kind: "linkedin" };
  }
  if (BLOCKED_HOSTS.some((h) => host === h || host.endsWith("." + h))) return { kind: "blocked", url, host };
  return { kind: "web", url: u.toString() };
}

function normalize(input: string) {
  const t = input.trim();
  if (!t) return START_URL;
  if (t === START_URL || /^https?:\/\//i.test(t)) return t;
  if (/^[\w-]+(\.[\w-]+)+(\/.*)?$/.test(t)) return "https://" + t;
  return t;
}

const liveProjects = projects.flatMap((p) =>
  p.links.filter((l) => l.label === "Live").map((l) => ({ name: p.name, url: l.href })),
);

const bookmarks = [
  { label: "GitHub", url: profile.github },
  { label: "LinkedIn", url: profile.linkedin },
  ...liveProjects.map((p) => ({ label: p.name, url: p.url })),
];

export default function Browser({ request }: { request: BrowserRequest }) {
  const [history, setHistory] = useState<string[]>([request.url]);
  const [index, setIndex] = useState(0);
  const [handled, setHandled] = useState(request.id);
  const [reloadKey, setReloadKey] = useState(0);
  const [draft, setDraft] = useState<string | null>(null);
  const url = history[index];
  const page = resolve(url);

  function push(to: string) {
    const next = [...history.slice(0, index + 1), to];
    setHistory(next);
    setIndex(next.length - 1);
    setDraft(null);
  }

  // A link was opened from somewhere else on the desktop (dock, projects, terminal).
  if (request.id !== handled) {
    setHandled(request.id);
    if (request.url !== url) push(request.url);
  }

  function go(to: string) {
    if (to === url) setReloadKey((k) => k + 1);
    else push(to);
  }

  function step(delta: number) {
    setIndex((i) => i + delta);
    setDraft(null);
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    go(normalize(draft ?? url));
    (document.activeElement as HTMLElement | null)?.blur();
  }

  const external = page.kind !== "start" && page.kind !== "invalid";

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
        <NavButton label="Back" disabled={index === 0} onClick={() => step(-1)}>
          ‹
        </NavButton>
        <NavButton label="Forward" disabled={index === history.length - 1} onClick={() => step(1)}>
          ›
        </NavButton>
        <NavButton label="Reload" onClick={() => setReloadKey((k) => k + 1)}>
          ↻
        </NavButton>
        <NavButton label="Start page" onClick={() => go(START_URL)}>
          ⌂
        </NavButton>
        <form onSubmit={submit} className="mx-1 flex min-w-0 flex-1 items-center gap-2 rounded-lg bg-white/[0.07] px-3 py-1.5 ring-1 ring-inset ring-white/5 focus-within:ring-violet-400/60">
          <span className="text-[11px] text-white/40" aria-hidden>
            {url.startsWith("https://") ? "🔒" : "☆"}
          </span>
          <input
            value={draft ?? (url === START_URL ? "" : url)}
            onChange={(e) => setDraft(e.target.value)}
            onFocus={(e) => e.target.select()}
            onBlur={() => setDraft(null)}
            placeholder="Enter a website address"
            spellCheck={false}
            autoCapitalize="off"
            aria-label="Address"
            className="min-w-0 flex-1 bg-transparent text-[13px] text-white/85 outline-none placeholder:text-white/35"
          />
        </form>
        {external && (
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            title="Open in a new tab"
            aria-label="Open in a new tab"
            className="flex h-7 w-7 items-center justify-center rounded-md text-white/60 hover:bg-white/10 hover:text-white"
          >
            ↗
          </a>
        )}
      </div>

      <nav className="flex gap-1 overflow-x-auto border-b border-white/[0.06] px-3 py-1.5 text-xs" aria-label="Bookmarks">
        {bookmarks.map((b) => (
          <button
            key={b.url}
            type="button"
            onClick={() => go(b.url)}
            className={`shrink-0 rounded-md px-2 py-1 transition ${
              b.url === url ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5 hover:text-white"
            }`}
          >
            {b.label}
          </button>
        ))}
      </nav>

      <div className="relative min-h-0 flex-1 overflow-hidden bg-[#141222]">
        <PageView key={`${url}#${reloadKey}`} page={page} go={go} />
      </div>
    </div>
  );
}

function NavButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-lg leading-none text-white/70 hover:bg-white/10 hover:text-white disabled:opacity-25 disabled:hover:bg-transparent"
    >
      {children}
    </button>
  );
}

function PageView({ page, go }: { page: Page; go: (url: string) => void }) {
  switch (page.kind) {
    case "start":
      return <StartPage go={go} />;
    case "github":
      return page.repo ? <RepoPage repo={page.repo} go={go} /> : <GitHubPage go={go} />;
    case "linkedin":
      return <LinkedInPage />;
    case "blocked":
      return <BlockedPage url={page.url} host={page.host} />;
    case "web":
      return <WebFrame url={page.url} />;
    case "invalid":
      return (
        <Centered>
          <p className="text-4xl" aria-hidden>
            🧭
          </p>
          <h3 className="text-lg font-semibold">Can&apos;t open “{page.url}”</h3>
          <p className="text-sm text-white/55">Try a full address like pledgeit-marketing.vercel.app</p>
        </Centered>
      );
  }
}

function Centered({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 overflow-y-auto p-8 text-center">{children}</div>
  );
}

const tileColors = [
  "from-violet-500 to-indigo-700",
  "from-amber-400 to-rose-600",
  "from-emerald-400 to-cyan-700",
  "from-fuchsia-500 to-purple-700",
];

function StartPage({ go }: { go: (url: string) => void }) {
  const code = projects.flatMap((p) =>
    p.links.filter((l) => l.href.includes("github.com")).map((l) => ({ name: p.name, label: l.label, url: l.href })),
  );

  return (
    <div className="h-full overflow-y-auto px-6 py-10">
      <div className="mx-auto max-w-2xl">
        <h2 className="mb-5 text-xl font-bold">Favorites</h2>
        <div className="grid grid-cols-3 gap-5 sm:grid-cols-5">
          <Tile label="GitHub" onClick={() => go(profile.github)}>
            <AppIcon kind="github" />
          </Tile>
          <Tile label="LinkedIn" onClick={() => go(profile.linkedin)}>
            <AppIcon kind="linkedin" />
          </Tile>
          {liveProjects.map((p, i) => (
            <Tile key={p.url} label={p.name} onClick={() => go(p.url)}>
              <div
                className={`flex h-full w-full items-center justify-center rounded-[24%] bg-gradient-to-br text-xl font-black shadow-lg shadow-black/40 ${
                  tileColors[i % tileColors.length]
                }`}
              >
                {p.name.slice(0, 2)}
              </div>
            </Tile>
          ))}
        </div>

        <h2 className="mb-3 mt-10 text-xl font-bold">Source code</h2>
        <ul className="divide-y divide-white/[0.06] rounded-xl border border-white/10 bg-white/[0.03]">
          {code.map((c) => (
            <li key={c.url}>
              <button
                type="button"
                onClick={() => go(c.url)}
                className="flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left hover:bg-white/[0.04]"
              >
                <span className="text-sm">
                  {c.name}
                  {c.label !== "GitHub" && <span className="text-white/40"> · {c.label}</span>}
                </span>
                <span className="truncate text-xs text-white/35">{c.url.replace("https://", "")}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Tile({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) {
  return (
    <button type="button" onClick={onClick} className="group flex flex-col items-center gap-2">
      <div className="h-16 w-16 transition group-hover:-translate-y-0.5 group-hover:scale-105">{children}</div>
      <span className="line-clamp-2 text-center text-xs text-white/70 group-hover:text-white">{label}</span>
    </button>
  );
}

function WebFrame({ url }: { url: string }) {
  const [loading, setLoading] = useState(true);
  return (
    <>
      {loading && <div className="absolute inset-x-0 top-0 z-10 h-0.5 animate-pulse bg-violet-400" />}
      <iframe
        src={url}
        title={url}
        onLoad={() => setLoading(false)}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
        referrerPolicy="no-referrer"
        className="h-full w-full border-0 bg-white"
      />
    </>
  );
}

function BlockedPage({ url, host }: { url: string; host: string }) {
  return (
    <Centered>
      <p className="text-4xl" aria-hidden>
        🚧
      </p>
      <h3 className="text-lg font-semibold">{host} can&apos;t be shown here</h3>
      <p className="max-w-sm text-sm text-white/55">
        This site doesn&apos;t allow itself to be opened inside other websites. You can open it in a new tab instead.
      </p>
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-[#1c1440] hover:bg-violet-100"
      >
        Open {host} ↗
      </a>
    </Centered>
  );
}

/* ---------- GitHub ---------- */

type GhUser = {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
};

type GhRepo = {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  html_url: string;
  homepage: string | null;
  updated_at: string;
  fork: boolean;
};

const langColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Java: "#b07219",
  Kotlin: "#A97BFF",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Dart: "#00B4AB",
  Vue: "#41b883",
};

// Used when the GitHub API is unreachable or rate-limited (60 requests/hour per visitor).
const fallbackRepos: GhRepo[] = projects.flatMap((p) =>
  p.links
    .filter((l) => l.href.includes("github.com"))
    .map((l) => ({
      name: l.href.split("/").pop() ?? p.name,
      description: p.description,
      language: null,
      stargazers_count: 0,
      html_url: l.href,
      homepage: p.links.find((x) => x.label === "Live")?.href ?? null,
      updated_at: "",
      fork: false,
    })),
);

function GitHubPage({ go }: { go: (url: string) => void }) {
  const [user, setUser] = useState<GhUser | null>(null);
  const [repos, setRepos] = useState<GhRepo[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USER}`),
      fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`),
    ])
      .then(async ([u, r]) => {
        if (!u.ok || !r.ok) throw new Error("GitHub API error");
        return [(await u.json()) as GhUser, (await r.json()) as GhRepo[]] as const;
      })
      .then(([u, r]) => {
        if (!alive) return;
        setUser(u);
        setRepos(r.filter((x) => !x.fork));
      })
      .catch(() => alive && setFailed(true));
    return () => {
      alive = false;
    };
  }, []);

  const list = repos ?? (failed ? fallbackRepos : null);

  return (
    <div className="h-full overflow-y-auto bg-[#0d1117] text-[#e6edf3]">
      <div className="mx-auto flex max-w-4xl flex-col gap-8 p-6 md:flex-row">
        <aside className="shrink-0 md:w-56">
          {user ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.avatar_url} alt="" className="h-40 w-40 rounded-full ring-1 ring-white/10 md:h-56 md:w-56" />
          ) : (
            <div className="h-40 w-40 animate-pulse rounded-full bg-white/5 md:h-56 md:w-56" />
          )}
          <h2 className="mt-4 text-2xl font-bold">{user?.name ?? profile.name}</h2>
          <p className="text-lg text-[#7d8590]">{GITHUB_USER}</p>
          {user?.bio && <p className="mt-3 text-sm">{user.bio}</p>}
          {user && (
            <p className="mt-3 text-sm text-[#7d8590]">
              <b className="text-[#e6edf3]">{user.followers}</b> followers · <b className="text-[#e6edf3]">{user.following}</b>{" "}
              following
            </p>
          )}
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="mt-4 block rounded-md border border-[#30363d] bg-[#21262d] px-3 py-1.5 text-center text-sm font-medium hover:bg-[#30363d]"
          >
            Follow on GitHub ↗
          </a>
        </aside>

        <section className="min-w-0 flex-1">
          <h3 className="mb-3 border-b border-[#30363d] pb-2 text-sm font-semibold">
            Repositories {user && <span className="ml-1 rounded-full bg-[#30363d] px-2 text-xs">{user.public_repos}</span>}
          </h3>
          {failed && (
            <p className="mb-3 text-xs text-[#7d8590]">Couldn&apos;t reach GitHub right now, so this is a saved list.</p>
          )}
          {!list ? (
            <div className="space-y-3">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="h-20 animate-pulse rounded-md bg-white/5" />
              ))}
            </div>
          ) : (
            <ul className="divide-y divide-[#30363d]">
              {list.map((r) => (
                <li key={r.html_url} className="py-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => go(r.html_url)}
                      className="text-lg font-semibold text-[#4493f8] hover:underline"
                    >
                      {r.name}
                    </button>
                    <span className="rounded-full border border-[#30363d] px-2 text-xs text-[#7d8590]">Public</span>
                  </div>
                  {r.description && <p className="mt-1 text-sm text-[#7d8590]">{r.description}</p>}
                  <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-[#7d8590]">
                    {r.language && (
                      <span className="flex items-center gap-1.5">
                        <span
                          className="h-3 w-3 rounded-full"
                          style={{ background: langColors[r.language] ?? "#8b949e" }}
                        />
                        {r.language}
                      </span>
                    )}
                    {r.stargazers_count > 0 && <span>★ {r.stargazers_count}</span>}
                    {r.updated_at && <span>Updated {new Date(r.updated_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>}
                    {r.homepage && (
                      <button type="button" onClick={() => go(r.homepage!)} className="text-[#4493f8] hover:underline">
                        Live site →
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}

function RepoPage({ repo, go }: { repo: string; go: (url: string) => void }) {
  const [info, setInfo] = useState<GhRepo | null>(null);
  const [readme, setReadme] = useState<string | null>(null);
  const [state, setState] = useState<"loading" | "ok" | "failed">("loading");

  useEffect(() => {
    let alive = true;
    const base = `https://api.github.com/repos/${GITHUB_USER}/${repo}`;
    fetch(base)
      .then((r) => {
        if (!r.ok) throw new Error("repo");
        return r.json() as Promise<GhRepo>;
      })
      .then(async (data) => {
        const res = await fetch(`${base}/readme`, { headers: { Accept: "application/vnd.github.raw" } });
        const text = res.ok ? await res.text() : null;
        if (!alive) return;
        setInfo(data);
        setReadme(text);
        setState("ok");
      })
      .catch(() => alive && setState("failed"));
    return () => {
      alive = false;
    };
  }, [repo]);

  const htmlUrl = `https://github.com/${GITHUB_USER}/${repo}`;

  return (
    <div className="h-full overflow-y-auto bg-[#0d1117] text-[#e6edf3]">
      <div className="mx-auto max-w-4xl p-6">
        <button type="button" onClick={() => go(profile.github)} className="text-sm text-[#4493f8] hover:underline">
          ← {GITHUB_USER}
        </button>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl">
            <span className="text-[#7d8590]">{GITHUB_USER} / </span>
            <b>{info?.name ?? repo}</b>
          </h2>
          <div className="flex gap-2">
            {info?.homepage && (
              <button
                type="button"
                onClick={() => go(info.homepage!)}
                className="rounded-md bg-[#238636] px-3 py-1.5 text-sm font-medium hover:bg-[#2ea043]"
              >
                Live site
              </button>
            )}
            <a
              href={htmlUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-[#30363d] bg-[#21262d] px-3 py-1.5 text-sm font-medium hover:bg-[#30363d]"
            >
              View on GitHub ↗
            </a>
          </div>
        </div>
        {info?.description && <p className="mt-2 text-[#7d8590]">{info.description}</p>}

        <div className="mt-6 rounded-md border border-[#30363d]">
          <div className="border-b border-[#30363d] px-4 py-2 text-sm font-semibold">README.md</div>
          <div className="p-5">
            {state === "loading" && <div className="h-40 animate-pulse rounded bg-white/5" />}
            {state === "failed" && (
              <p className="text-sm text-[#7d8590]">Couldn&apos;t load this repository right now. Try “View on GitHub”.</p>
            )}
            {state === "ok" &&
              (readme ? (
                <pre className="whitespace-pre-wrap break-words font-mono text-[13px] leading-relaxed text-[#c9d1d9]">
                  {readme}
                </pre>
              ) : (
                <p className="text-sm text-[#7d8590]">This repository has no README yet.</p>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- LinkedIn ---------- */

function LinkedInPage() {
  const initials = profile.name
    .split(" ")
    .map((p) => p[0])
    .join("");

  return (
    <div className="h-full overflow-y-auto bg-[#1b1f23] text-white/90">
      <div className="mx-auto max-w-3xl space-y-3 p-4 sm:p-6">
        <div className="overflow-hidden rounded-lg bg-[#262a2e]">
          <div className="h-28 bg-gradient-to-r from-[#0a66c2] via-indigo-600 to-violet-600" />
          <div className="px-5 pb-5">
            {profile.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profile.photo}
                alt=""
                className="-mt-14 h-28 w-28 rounded-full border-4 border-[#262a2e] object-cover"
              />
            ) : (
              <div className="-mt-14 flex h-28 w-28 items-center justify-center rounded-full border-4 border-[#262a2e] bg-gradient-to-br from-violet-400 to-indigo-600 text-3xl font-bold">
                {initials}
              </div>
            )}
            <h2 className="mt-3 text-2xl font-semibold">{profile.name}</h2>
            <p className="text-sm">{profile.title}</p>
            <p className="mt-1 text-sm text-white/50">{profile.location}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-[#71b7fb] px-4 py-1.5 text-sm font-semibold text-[#1b1f23] hover:bg-[#9fcffd]"
              >
                View full profile ↗
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="rounded-full border border-[#71b7fb] px-4 py-1.5 text-sm font-semibold text-[#71b7fb] hover:bg-[#71b7fb]/10"
              >
                Contact
              </a>
            </div>
          </div>
        </div>

        <Section title="About">
          <p className="text-sm leading-relaxed text-white/75">{profile.bio}</p>
        </Section>

        <Section title="Experience">
          <ul className="space-y-4">
            {experience.slice(0, 5).map((j) => (
              <li key={j.role + j.org} className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-white/10 text-sm font-bold">
                  {j.org[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold">{j.role}</p>
                  <p className="text-sm text-white/70">{j.org}</p>
                  <p className="text-xs text-white/45">{j.dates}</p>
                </div>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Education">
          <ul className="space-y-4">
            {education.map((e) => (
              <li key={e.school} className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-white/10 text-sm font-bold">
                  {e.school[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold">{e.school}</p>
                  <p className="text-sm text-white/70">{e.degree}</p>
                  <p className="text-xs text-white/45">{e.dates}</p>
                </div>
              </li>
            ))}
          </ul>
        </Section>

        <p className="pb-2 text-center text-xs text-white/35">
          Preview built from this portfolio · LinkedIn doesn&apos;t allow its pages inside other sites
        </p>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-lg bg-[#262a2e] p-5">
      <h3 className="mb-3 text-lg font-semibold">{title}</h3>
      {children}
    </section>
  );
}
