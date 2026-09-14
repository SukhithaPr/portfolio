"use client";

import { AnimatePresence } from "motion/react";
import { useCallback, useRef, useState } from "react";
import { profile } from "@/data/profile";
import Wallpaper from "./Wallpaper";
import MenuBar from "./MenuBar";
import Dock from "./Dock";
import Window, { type Rect } from "./Window";
import { APP_BY_ID } from "./apps/registry";
import { START_URL, type BrowserRequest } from "./apps/Browser";
import type { AppId } from "./apps/types";
import { useMediaQuery } from "./hooks";

export default function Desktop() {
  const bounds = useRef<HTMLDivElement>(null);
  const mobile = useMediaQuery("(max-width: 767px)");
  // Window stacking order: last item is on top.
  const [order, setOrder] = useState<AppId[]>([]);
  const [minimized, setMinimized] = useState<AppId[]>([]);
  const [rects, setRects] = useState<Partial<Record<AppId, Rect>>>({});
  // Latest "open this URL" request for the Browser window.
  const [browserRequest, setBrowserRequest] = useState<BrowserRequest>({ url: START_URL, id: 0 });

  const place = useCallback((id: AppId, n: number): Rect => {
    const area = bounds.current?.getBoundingClientRect();
    const W = area?.width ?? 1280;
    const H = (area?.height ?? 800) - 96;
    const { w: prefW, h: prefH } = APP_BY_ID[id].size;
    const w = Math.min(prefW, W - 32);
    const h = Math.min(prefH, H - 16);
    const shift = (n % 5) - 2;
    return {
      w,
      h,
      x: Math.max(16, Math.min(W - w - 16, (W - w) / 2 + shift * 28)),
      y: Math.max(12, Math.min(H - h, (H - h) / 2 + shift * 22)),
    };
  }, []);

  const openApp = useCallback(
    (id: AppId) => {
      setMinimized((m) => m.filter((a) => a !== id));
      setRects((r) => (r[id] ? r : { ...r, [id]: place(id, Object.keys(r).length) }));
      setOrder((o) => (o[o.length - 1] === id ? o : [...o.filter((a) => a !== id), id]));
    },
    [place],
  );

  const openUrl = useCallback(
    (url: string) => {
      setBrowserRequest((r) => ({ url, id: r.id + 1 }));
      openApp("browser");
    },
    [openApp],
  );

  const closeApp = (id: AppId) => {
    setOrder((o) => o.filter((a) => a !== id));
    setMinimized((m) => m.filter((a) => a !== id));
  };

  const minimizeApp = (id: AppId) => setMinimized((m) => (m.includes(id) ? m : [...m, id]));

  const visible = order.filter((id) => !minimized.includes(id));
  const focused = visible[visible.length - 1];

  return (
    <div className="relative h-dvh w-full overflow-hidden text-white">
      <Wallpaper />
      <MenuBar activeTitle={focused ? APP_BY_ID[focused].title : profile.shortName} onOpen={openApp} />

      <div ref={bounds} className="absolute inset-x-0 bottom-0 top-7">
        <Hero onOpen={openApp} />
        <AnimatePresence>
          {order.map((id, i) => {
            const rect = rects[id];
            if (!rect) return null;
            const app = APP_BY_ID[id];
            return (
              <Window
                key={id}
                title={app.title}
                rect={rect}
                z={10 + i}
                focused={id === focused}
                minimized={minimized.includes(id)}
                mobile={mobile}
                bounds={bounds}
                onFocus={() => openApp(id)}
                onClose={() => closeApp(id)}
                onMinimize={() => minimizeApp(id)}
              >
                {app.render({ openApp, openUrl, browserRequest })}
              </Window>
            );
          })}
        </AnimatePresence>
      </div>

      <Dock open={order} mobile={mobile} onOpen={openApp} onOpenUrl={openUrl} />
    </div>
  );
}

function Hero({ onOpen }: { onOpen: (id: AppId) => void }) {
  return (
    <section className="absolute inset-x-0 top-[14%] px-6 sm:left-[8%] sm:right-auto sm:top-[22%] sm:px-0">
      <p className="text-sm font-medium tracking-wide text-violet-200/70">Hello, I&apos;m</p>
      <h1 className="mt-1 text-4xl font-bold tracking-tight text-white sm:text-6xl">{profile.name}</h1>
      <p className="mt-3 max-w-xl text-base text-white/70 sm:text-lg">{profile.title}</p>
      <p className="mt-1 text-sm text-white/45">
        {profile.currently} · {profile.location}
      </p>
      <div className="mt-7 flex flex-wrap gap-2.5">
        <button
          type="button"
          onClick={() => onOpen("about")}
          className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#1c1440] shadow-lg shadow-violet-900/40 transition hover:bg-violet-100"
        >
          About me
        </button>
        <button
          type="button"
          onClick={() => onOpen("projects")}
          className="rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold backdrop-blur transition hover:bg-white/20"
        >
          View projects
        </button>
        <button
          type="button"
          onClick={() => onOpen("terminal")}
          className="rounded-full border border-white/20 bg-white/5 px-5 py-2 font-mono text-sm backdrop-blur transition hover:bg-white/15"
        >
          &gt;_ terminal
        </button>
      </div>
      <p className="mt-6 text-xs text-white/35">Everything lives in the dock below ↓</p>
    </section>
  );
}
