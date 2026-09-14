"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { education, experience, profile, projects, skills } from "@/data/profile";
import { APP_IDS, type AppId } from "./types";

type Entry = { id: number; cmd?: string; out: ReactNode };

const COMMANDS: Record<string, string> = {
  help: "list commands",
  whoami: "who is this?",
  about: "short bio",
  skills: "tech I use",
  experience: "where I've worked",
  education: "where I study",
  projects: "things I've built",
  contact: "how to reach me",
  resume: "open my resume",
  github: "open my GitHub in the browser",
  linkedin: "open my LinkedIn in the browser",
  browse: "browse <url> — open a site in the browser",
  open: "open <app> — " + APP_IDS.join(", "),
  neofetch: "system info, but it's me",
  clear: "clear the screen",
};

const PROMPT = (
  <span>
    <span className="text-emerald-400">sukhitha@portfolio</span> <span className="text-sky-400">~</span>{" "}
    <span className="text-white/60">%</span>
  </span>
);

const A = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} target="_blank" rel="noreferrer" className="text-sky-300 underline underline-offset-2">
    {children}
  </a>
);

function execute(
  name: string,
  args: string[],
  openApp: (id: AppId) => void,
  openUrl: (url: string) => void,
): ReactNode {
  switch (name) {
    case "help":
      return (
        <div className="grid grid-cols-[7rem_1fr] gap-x-3">
          {Object.entries(COMMANDS).map(([c, d]) => (
            <div key={c} className="contents">
              <span className="text-violet-300">{c}</span>
              <span className="text-white/55">{d}</span>
            </div>
          ))}
        </div>
      );
    case "whoami":
      return `${profile.name} — ${profile.title}`;
    case "about":
      return profile.bio;
    case "skills":
      return (
        <div>
          {skills.map((g) => (
            <div key={g.group}>
              <span className="text-violet-300">{g.group.padEnd(20)}</span>
              {g.items.map((s, i) => (
                <span key={s.name} className={s.strong ? "text-white" : "text-white/50"}>
                  {s.name}
                  {i < g.items.length - 1 ? ", " : ""}
                </span>
              ))}
            </div>
          ))}
        </div>
      );
    case "experience":
      return (
        <div>
          {experience.map((j) => (
            <div key={j.role + j.org}>
              <span className="text-amber-300">{j.role}</span> @ {j.org}{" "}
              <span className="text-white/40">({j.dates})</span>
            </div>
          ))}
        </div>
      );
    case "education":
      return (
        <div>
          {education.map((e) => (
            <div key={e.school}>
              <span className="text-emerald-300">{e.school}</span> — {e.degree}{" "}
              <span className="text-white/40">({e.dates})</span>
            </div>
          ))}
        </div>
      );
    case "projects":
      return (
        <div>
          {projects.map((p) => (
            <div key={p.name}>
              <span className="text-violet-300">{p.name}</span>
              <span className="text-white/50"> — {p.nda ? "under NDA" : p.description}</span>
            </div>
          ))}
          <div className="mt-1 text-white/40">Tip: `open projects` for the full gallery.</div>
        </div>
      );
    case "contact":
      return (
        <div>
          <div>email    <A href={`mailto:${profile.email}`}>{profile.email}</A></div>
          <div>github   <A href={profile.github}>{profile.github.replace("https://", "")}</A></div>
          <div>linkedin <A href={profile.linkedin}>{profile.linkedin.replace("https://www.", "")}</A></div>
        </div>
      );
    case "resume":
      openApp("resume");
      return "Opening Resume…";
    case "open": {
      const target = args[0] as AppId | undefined;
      if (target && (APP_IDS as readonly string[]).includes(target)) {
        openApp(target);
        return `Opening ${target}…`;
      }
      return `usage: open <${APP_IDS.join("|")}>`;
    }
    case "github":
      openUrl(profile.github);
      return "Opening GitHub in Browser…";
    case "linkedin":
      openUrl(profile.linkedin);
      return "Opening LinkedIn in Browser…";
    case "browse": {
      const target = args[0];
      if (!target) return "usage: browse <url>";
      openUrl(/^https?:\/\//i.test(target) ? target : `https://${target}`);
      return `Opening ${target}…`;
    }
    case "ls":
      return "about.txt  skills/  experience.log  education.md  projects/  resume.pdf  contact.vcf";
    case "neofetch":
      return (
        <div className="grid grid-cols-[6rem_1fr] gap-x-3">
          <span className="text-violet-300">user</span><span>{profile.shortName.toLowerCase()}</span>
          <span className="text-violet-300">role</span><span>{profile.currently}</span>
          <span className="text-violet-300">location</span><span>{profile.location}</span>
          <span className="text-violet-300">stack</span><span>Flutter · Spring Boot · React · Next.js</span>
          <span className="text-violet-300">uptime</span><span>coding since uni, designing since 2020</span>
          <span className="text-violet-300">mode</span><span>Dattebayo 🗿</span>
        </div>
      );
    case "date":
      return new Date().toString();
    case "echo":
      return args.join(" ");
    case "sudo":
      return "Permission denied. Try `sudo hire sukhitha` — just kidding, run `contact` 😄";
    case "dattebayo":
      return "Dattebayo 🗿 — I never go back on my word.";
    default:
      return (
        <span>
          zsh: command not found: {name}. Type <span className="text-violet-300">help</span>.
        </span>
      );
  }
}

export default function Terminal({
  openApp,
  openUrl,
}: {
  openApp: (id: AppId) => void;
  openUrl: (url: string) => void;
}) {
  const [entries, setEntries] = useState<Entry[]>([
    {
      id: 0,
      out: (
        <div className="text-white/60">
          Last login: today on ttys001
          <br />
          Welcome! Type <span className="text-violet-300">help</span> to see what I can do.
        </div>
      ),
    },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const nextId = useRef(1);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [entries]);

  // Focus the prompt once the window has finished opening.
  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 80);
    return () => clearTimeout(t);
  }, []);

  function run(raw: string) {
    const cmd = raw.trim();
    setCursor(-1);
    if (cmd) setHistory((h) => [...h, cmd]);
    const [name = "", ...args] = cmd.split(/\s+/);
    if (name === "clear") {
      setEntries([]);
      return;
    }
    const id = nextId.current++;
    const out = cmd ? execute(name.toLowerCase(), args, openApp, openUrl) : null;
    setEntries((e) => [...e, { id, cmd: raw, out }]);
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowUp" && history.length) {
      e.preventDefault();
      const i = cursor === -1 ? history.length - 1 : Math.max(0, cursor - 1);
      setCursor(i);
      setInput(history[i]);
    } else if (e.key === "ArrowDown" && cursor !== -1) {
      e.preventDefault();
      const i = cursor + 1;
      setCursor(i >= history.length ? -1 : i);
      setInput(i >= history.length ? "" : history[i]);
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = Object.keys(COMMANDS).find((c) => c.startsWith(input.trim()));
      if (input.trim() && match) setInput(match + " ");
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setEntries([]);
    }
  }

  return (
    <div
      className="h-full overflow-y-auto bg-black/40 p-4 font-mono text-[13px] leading-relaxed text-white/90"
      onClick={() => inputRef.current?.focus()}
    >
      {entries.map((e) => (
        <div key={e.id} className="mb-1.5">
          {e.cmd !== undefined && (
            <div>
              {PROMPT} {e.cmd}
            </div>
          )}
          {e.out && <div className="whitespace-pre-wrap">{e.out}</div>}
        </div>
      ))}
      <form
        ref={endRef}
        className="flex items-center gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          run(input);
          setInput("");
        }}
      >
        {PROMPT}
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          autoFocus
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          aria-label="Terminal input"
          className="min-w-0 flex-1 bg-transparent caret-violet-300 outline-none"
        />
      </form>
    </div>
  );
}
