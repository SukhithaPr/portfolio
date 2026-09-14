"use client";

import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react";
import { useRef, type ReactNode } from "react";
import { profile } from "@/data/profile";
import { AppIcon } from "./icons";
import { APPS } from "./apps/registry";
import type { AppId } from "./apps/types";

export default function Dock({
  open,
  mobile,
  onOpen,
  onOpenUrl,
}: {
  open: AppId[];
  mobile: boolean;
  onOpen: (id: AppId) => void;
  onOpenUrl: (url: string) => void;
}) {
  const mouseX = useMotionValue(Infinity);
  const base = mobile ? 40 : 50;
  const peak = mobile ? 40 : 76;

  return (
    <div className="absolute inset-x-0 bottom-2 z-[1000] flex justify-center px-2 sm:bottom-3">
      <nav
        aria-label="Dock"
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="flex items-end gap-1.5 rounded-2xl border border-white/15 bg-white/10 px-2 pb-2 pt-2 shadow-2xl shadow-black/50 backdrop-blur-2xl sm:gap-2 sm:px-2.5"
      >
        {APPS.map((app) => (
          <DockItem
            key={app.id}
            mouseX={mouseX}
            base={base}
            peak={peak}
            label={app.title}
            running={open.includes(app.id)}
            onClick={() => onOpen(app.id)}
          >
            <AppIcon kind={app.id} />
          </DockItem>
        ))}
        {!mobile && (
          <>
            <div className="mx-1 w-px self-stretch bg-white/20" aria-hidden />
            <DockItem mouseX={mouseX} base={base} peak={peak} label="GitHub" onClick={() => onOpenUrl(profile.github)}>
              <AppIcon kind="github" />
            </DockItem>
            <DockItem
              mouseX={mouseX}
              base={base}
              peak={peak}
              label="LinkedIn"
              onClick={() => onOpenUrl(profile.linkedin)}
            >
              <AppIcon kind="linkedin" />
            </DockItem>
          </>
        )}
      </nav>
    </div>
  );
}

function DockItem({
  mouseX,
  base,
  peak,
  label,
  running,
  href,
  onClick,
  children,
}: {
  mouseX: MotionValue<number>;
  base: number;
  peak: number;
  label: string;
  running?: boolean;
  href?: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const distance = useTransform(mouseX, (v) => {
    const b = ref.current?.getBoundingClientRect();
    return b ? v - b.x - b.width / 2 : Infinity;
  });
  const target = useTransform(distance, [-150, 0, 150], [base, peak, base]);
  const size = useSpring(target, { mass: 0.1, stiffness: 170, damping: 14 });

  const inner = (
    <>
      <span className="pointer-events-none absolute -top-9 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-[#1b1830]/90 px-2.5 py-1 text-xs text-white opacity-0 shadow-lg backdrop-blur transition-opacity group-hover:opacity-100 sm:block">
        {label}
      </span>
      {children}
      {running && (
        <span className="absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-white/80" />
      )}
    </>
  );

  return (
    <motion.div
      ref={ref}
      style={base === peak ? { width: base, height: base } : { width: size, height: size }}
      className="group relative"
    >
      {href ? (
        <a href={href} target="_blank" rel="noreferrer" aria-label={label} className="block h-full w-full">
          {inner}
        </a>
      ) : (
        <button type="button" onClick={onClick} aria-label={`Open ${label}`} className="block h-full w-full">
          {inner}
        </button>
      )}
    </motion.div>
  );
}
