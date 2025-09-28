export function Stat({ label, value }) {
  return (
    <div className="flex min-w-[5.75rem] flex-col items-center justify-center rounded-2xl border border-white/60 bg-white/70 px-4 py-3 text-center shadow-sm ring-1 ring-black/5 backdrop-blur">
      <div className="text-2xl font-semibold tabular-nums tracking-tight text-slate-900">
        {String(value).padStart(2, "0")}
      </div>
      <div className="mt-1 text-[11px] uppercase tracking-[.18em] text-slate-500">{label}</div>
    </div>
  );
}
