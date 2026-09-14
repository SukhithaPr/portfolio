import { profile } from "@/data/profile";
import type { AppId } from "./types";

export default function Resume({ openApp }: { openApp: (id: AppId) => void }) {
  if (!profile.resumeUrl) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
        <div className="text-5xl" aria-hidden>
          📄
        </div>
        <h3 className="text-lg font-semibold">Resume coming soon</h3>
        <p className="max-w-sm text-sm text-white/60">
          A downloadable PDF will be here shortly. Meanwhile, my full history is on LinkedIn — or just ask.
        </p>
        <div className="flex gap-2">
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-[#1c1440] hover:bg-violet-100"
          >
            LinkedIn ↗
          </a>
          <button
            type="button"
            onClick={() => openApp("contact")}
            className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-semibold hover:bg-white/20"
          >
            Contact me
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-end gap-2 border-b border-white/10 px-3 py-2">
        <a
          href={profile.resumeUrl}
          target="_blank"
          rel="noreferrer"
          className="rounded-md bg-white/10 px-3 py-1 text-xs font-medium hover:bg-white/20"
        >
          Open in new tab ↗
        </a>
        <a href={profile.resumeUrl} download className="rounded-md bg-violet-500 px-3 py-1 text-xs font-semibold hover:bg-violet-400">
          Download PDF
        </a>
      </div>
      <iframe src={profile.resumeUrl} title="Resume" className="min-h-0 flex-1 bg-white" />
    </div>
  );
}
