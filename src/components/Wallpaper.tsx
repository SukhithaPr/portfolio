// Vorssaint-style wallpaper: deep purple glow with soft drifting light waves.

const waves = [
  { d: "M-200 420 C 150 300, 450 560, 800 430 S 1400 250, 1700 380", o: 0.35, w: 1.6 },
  { d: "M-200 520 C 200 420, 500 660, 850 520 S 1400 360, 1700 470", o: 0.5, w: 2 },
  { d: "M-200 600 C 250 500, 560 720, 900 610 S 1450 450, 1700 560", o: 0.3, w: 1.4 },
  { d: "M-200 700 C 200 620, 600 800, 950 700 S 1450 560, 1700 660", o: 0.22, w: 1.2 },
];

export default function Wallpaper() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_20%,#3b2a7a_0%,#1c1440_45%,#0b0918_100%)]" />
      <div className="absolute -left-1/4 top-1/4 h-[60vmax] w-[60vmax] rounded-full bg-violet-600/20 blur-[120px]" />
      <div className="absolute -right-1/4 -top-1/4 h-[50vmax] w-[50vmax] rounded-full bg-indigo-500/15 blur-[120px]" />
      <svg
        className="wave-drift absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="waveStroke" x1="0" x2="1">
            <stop offset="0" stopColor="#c4b5fd" stopOpacity="0" />
            <stop offset="0.35" stopColor="#e9e5ff" />
            <stop offset="0.7" stopColor="#a5b4fc" />
            <stop offset="1" stopColor="#c4b5fd" stopOpacity="0.1" />
          </linearGradient>
          <filter id="waveGlow" x="-10%" y="-50%" width="120%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {waves.map((w, i) => (
          <path
            key={i}
            d={w.d}
            fill="none"
            stroke="url(#waveStroke)"
            strokeWidth={w.w}
            strokeOpacity={w.o}
            filter="url(#waveGlow)"
            className={i % 2 ? "wave-b" : "wave-a"}
          />
        ))}
      </svg>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.45)_100%)]" />
    </div>
  );
}
