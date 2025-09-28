import { useMemo, useState } from "react";

export function HeroCard({ celebrant, theme, isBirthday, onToggleLetter, showLetter }) {
  const [pointer, setPointer] = useState({ x: 50, y: 50 });
  const todayLabel = useMemo(() => new Date().toLocaleDateString(), []);

  return (
    <div
      className="relative overflow-hidden rounded-[32px] border border-black/10 bg-white/70 p-8 shadow-xl backdrop-blur-lg"
      style={{ background: theme.gradients.card }}
      onPointerMove={event => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        setPointer({ x, y });
      }}
      onPointerLeave={() => setPointer({ x: 50, y: 50 })}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-60 transition-opacity"
        style={{
          background: `radial-gradient(45% 55% at ${pointer.x}% ${pointer.y}%, rgba(167, 139, 250, 0.25), transparent 70%)`,
        }}
      />

      <div className="absolute right-6 top-6 h-12 w-12 rounded-full border border-black/10 bg-white/70" />

      <div className="mb-6 text-sm tracking-wider text-slate-500">{todayLabel}</div>
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl" style={{ color: theme.palette.primary }}>
        {celebrant.headline}
      </h1>
      <p className="mt-3 max-w-prose text-slate-600">{celebrant.subline}</p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-3 py-1.5 text-sm text-slate-700">
          <span className="inline-block h-2 w-2 rounded-full" style={{ background: theme.palette.accent }} />
          为 {celebrant.name} 的生日祝福
        </span>
        {isBirthday ? (
          <span className="inline-flex animate-pulse rounded-full bg-emerald-500/90 px-3 py-1.5 text-sm text-white shadow-sm">
            今天是你的生日，快乐加倍！
          </span>
        ) : (
          <span className="inline-flex rounded-full bg-black/80 px-3 py-1.5 text-sm text-white shadow-sm">
            生日旅程继续前行 ✨
          </span>
        )}
        <button
          onClick={onToggleLetter}
          className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-1.5 text-xs text-slate-700 backdrop-blur transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-slate-400" />
          {showLetter ? "收起信件" : "展开信件"}
        </button>
      </div>
    </div>
  );
}
