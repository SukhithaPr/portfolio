"use client";

import { useState, type ReactNode } from "react";
import { profile } from "@/data/profile";
import { GitHubGlyph, LinkedInGlyph, MailGlyph } from "../icons";

export default function Contact({ openUrl }: { openUrl: (url: string) => void }) {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  }

  return (
    <div className="h-full space-y-5 overflow-y-auto p-6">
      <div>
        <h3 className="text-xl font-bold">Let&apos;s talk 👋</h3>
        <p className="mt-1 text-sm text-white/60">
          Open to software engineering roles, collaborations and design work.
        </p>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
        <p className="text-[11px] uppercase tracking-wider text-white/40">Email</p>
        <p className="mt-1 break-all font-medium">{profile.email}</p>
        <div className="mt-3 flex gap-2">
          <a
            href={`mailto:${profile.email}`}
            className="rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-[#1c1440] hover:bg-violet-100"
          >
            Send email
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-semibold hover:bg-white/20"
          >
            {copied ? "Copied ✓" : "Copy"}
          </button>
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <LinkCard
          onClick={() => openUrl(profile.github)}
          label="GitHub"
          handle="@SukhithaPr"
          icon={<GitHubGlyph className="h-5 w-5" />}
        />
        <LinkCard
          onClick={() => openUrl(profile.linkedin)}
          label="LinkedIn"
          handle="in/sukhithapr"
          icon={<LinkedInGlyph className="h-5 w-5" />}
        />
      </div>
      <p className="flex items-center gap-2 text-xs text-white/40">
        <MailGlyph className="h-3.5 w-3.5" /> Usually replies within a day · {profile.location}
      </p>
    </div>
  );
}

function LinkCard({
  onClick,
  label,
  handle,
  icon,
}: {
  onClick: () => void;
  label: string;
  handle: string;
  icon: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3 text-left transition hover:border-white/25 hover:bg-white/[0.08]"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">{icon}</span>
      <span>
        <span className="block text-sm font-medium">{label}</span>
        <span className="block text-xs text-white/45">{handle}</span>
      </span>
    </button>
  );
}
