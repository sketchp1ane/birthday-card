import { useEffect, useState } from "react";

function formatValue(value) {
  return String(value).padStart(2, "0");
}

export function FlipStat({ label, value }) {
  const [current, setCurrent] = useState(() => formatValue(value));
  const [previous, setPrevious] = useState(() => formatValue(value));
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    const formatted = formatValue(value);
    if (formatted === current) {
      return;
    }
    setPrevious(current);
    setCurrent(formatted);
    setFlipping(true);

    const timeout = window.setTimeout(() => setFlipping(false), 600);
    return () => window.clearTimeout(timeout);
  }, [value, current]);

  return (
    <div className="flip-unit relative flex w-full max-w-[7.5rem] flex-col items-center">
      <div className="relative h-28 w-full overflow-hidden rounded-[28px] border border-white/70 bg-white/75 shadow-sm backdrop-blur">
        <div className={`flip-card h-full w-full ${flipping ? "is-flipping" : ""}`}>
          <div className="flip-card-face flex items-center justify-center text-4xl font-semibold tracking-tight text-slate-900">
            {flipping ? previous : current}
          </div>
          <div className="flip-card-face flip-card-back flex items-center justify-center text-4xl font-semibold tracking-tight text-slate-900">
            {current}
          </div>
        </div>
        <div className="flip-card-shadow pointer-events-none" />
      </div>
      <span className="mt-3 text-xs uppercase tracking-[0.3em] text-slate-400">{label}</span>
    </div>
  );
}
