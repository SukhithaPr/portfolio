"use client";

import { motion, useDragControls, useMotionValue } from "motion/react";
import { useState, type ReactNode, type RefObject } from "react";

export type Rect = { x: number; y: number; w: number; h: number };

type Props = {
  title: string;
  rect: Rect;
  z: number;
  focused: boolean;
  minimized: boolean;
  mobile: boolean;
  bounds: RefObject<HTMLDivElement | null>;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  children: ReactNode;
};

export default function Window({
  title,
  rect,
  z,
  focused,
  minimized,
  mobile,
  bounds,
  onFocus,
  onClose,
  onMinimize,
  children,
}: Props) {
  const controls = useDragControls();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [maximized, setMaximized] = useState(false);
  const [saved, setSaved] = useState({ x: 0, y: 0 });
  const full = maximized || mobile;

  function toggleMaximize() {
    if (mobile) return;
    if (maximized) {
      x.set(saved.x);
      y.set(saved.y);
    } else {
      setSaved({ x: x.get(), y: y.get() });
      x.set(0);
      y.set(0);
    }
    setMaximized(!maximized);
  }

  const box = full
    ? { left: 0, top: 0, width: "100%", height: mobile ? "calc(100% - 72px)" : "calc(100% - 88px)" }
    : { left: rect.x, top: rect.y, width: rect.w, height: rect.h };

  return (
    <motion.div
      role="dialog"
      aria-label={title}
      inert={minimized}
      drag={!full}
      dragControls={controls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={bounds}
      onPointerDown={onFocus}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={minimized ? { opacity: 0, scale: 0.4 } : { opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
      style={{ x, y, zIndex: z, transformOrigin: minimized ? "50% 110%" : "50% 50%", ...box }}
      className={`absolute flex flex-col overflow-hidden border border-white/10 bg-[#1b1830]/80 text-white backdrop-blur-2xl transition-[left,top,width,height,border-radius] duration-200 ${
        full ? "rounded-none sm:rounded-b-xl" : "rounded-xl"
      } ${focused ? "shadow-[0_30px_80px_-10px_rgba(0,0,0,0.7)]" : "shadow-[0_15px_40px_-10px_rgba(0,0,0,0.5)]"}`}
    >
      <div
        onPointerDown={(e) => {
          if (!full) controls.start(e);
        }}
        onDoubleClick={toggleMaximize}
        className={`relative flex h-11 shrink-0 items-center border-b border-white/[0.06] px-4 select-none ${
          full ? "" : "cursor-grab active:cursor-grabbing"
        }`}
      >
        <div className="group flex gap-2" onPointerDown={(e) => e.stopPropagation()}>
          <TrafficLight
            color="bg-[#ff5f57]"
            hoverColor="group-hover:bg-[#ff5f57]"
            label="Close"
            onClick={onClose}
            glyph="×"
            active={focused}
          />
          <TrafficLight
            color="bg-[#febc2e]"
            hoverColor="group-hover:bg-[#febc2e]"
            label="Minimize"
            onClick={onMinimize}
            glyph="−"
            active={focused}
          />
          <TrafficLight
            color="bg-[#28c840]"
            hoverColor="group-hover:bg-[#28c840]"
            label={maximized ? "Restore" : "Zoom"}
            onClick={toggleMaximize}
            glyph="+"
            active={focused}
            disabled={mobile}
          />
        </div>
        <p
          className={`pointer-events-none absolute inset-x-24 truncate text-center text-[13px] font-semibold ${
            focused ? "text-white/90" : "text-white/40"
          }`}
        >
          {title}
        </p>
      </div>
      <div className="min-h-0 flex-1">{children}</div>
    </motion.div>
  );
}

function TrafficLight({
  color,
  hoverColor,
  label,
  glyph,
  active,
  disabled,
  onClick,
}: {
  color: string;
  hoverColor: string;
  label: string;
  glyph: string;
  active: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={`flex h-3 w-3 items-center justify-center rounded-full text-[10px] leading-none font-bold text-black/60 disabled:opacity-40 ${
        active ? color : `bg-white/20 ${hoverColor}`
      }`}
    >
      <span className="opacity-0 group-hover:opacity-100">{glyph}</span>
    </button>
  );
}
