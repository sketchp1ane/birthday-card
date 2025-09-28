export function AuroraBackdrop({ accent, glow, reducedMotion }) {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        className={`absolute left-1/2 top-[-20%] h-[55vh] w-[120vw] -translate-x-1/2 rounded-[999px] blur-3xl ${
          reducedMotion ? "bg-slate-200/45" : "animate-[aurora_14s_ease-in-out_infinite]"
        }`}
        style={{ background: `radial-gradient(circle at 30% 20%, ${glow} 0%, transparent 55%)` }}
      />
      <div
        className={`absolute left-[-15%] top-1/3 h-[45vh] w-[70vw] rotate-12 rounded-[999px] bg-gradient-to-r from-rose-200/40 via-emerald-200/30 to-cyan-200/40 blur-3xl ${
          reducedMotion ? "" : "animate-[aurora_18s_ease-in-out_infinite_reverse]"
        }`}
      />
      <div
        className={`absolute right-[-10%] top-1/2 h-[50vh] w-[60vw] -rotate-6 rounded-[999px] blur-3xl ${
          reducedMotion ? "bg-indigo-200/40" : "animate-[aurora_20s_ease-in-out_infinite]"
        }`}
        style={{ background: `radial-gradient(circle at 40% 40%, ${accent}20 0%, transparent 60%)` }}
      />
    </div>
  );
}
