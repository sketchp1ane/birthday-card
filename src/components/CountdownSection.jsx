import { FlipStat } from "./FlipStat.jsx";

const DAY_MS = 86_400_000;

function computeProgress(examDate) {
  const examTime = examDate.getTime();
  const planStart = new Date(examTime - 180 * DAY_MS);
  const today = Date.now();

  if (today <= planStart.getTime()) {
    return 0;
  }
  if (today >= examTime) {
    return 100;
  }

  const elapsed = today - planStart.getTime();
  const total = examTime - planStart.getTime();
  return Math.min(100, Math.max(0, (elapsed / total) * 100));
}

export function CountdownSection({ exam, examDate, reducedMotion }) {
  const examDateObj = new Date(examDate);
  const progress = computeProgress(examDateObj);
  const examDateText = examDateObj.toLocaleString();
  const widthPercent = Math.max(progress, 2);
  const indicatorPosition = Math.min(98, Math.max(2, widthPercent));

  return (
    <section id="countdown" className="relative">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-slate-400">Countdown</span>
          <h2 className="text-lg font-medium text-slate-800">考研倒计时</h2>
        </div>
        <div className="hidden text-xs text-slate-500 md:block">目标时间：{examDateText}</div>
      </div>

      <div className="relative overflow-hidden rounded-[32px] border border-white/60 bg-white/70 p-8 shadow-[0_32px_80px_-60px_rgba(15,23,42,0.75)] backdrop-blur">
        <div className="absolute inset-0 opacity-70" style={{ background: "radial-gradient(110% 110% at 10% -20%, rgba(167,139,250,0.18), transparent), radial-gradient(110% 110% at 90% 10%, rgba(125,211,252,0.18), transparent)" }} />
        <div className="relative flex flex-col gap-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/70 bg-white/80 px-4 py-2 shadow-sm">
              <span className="h-2.5 w-2.5 rounded-full bg-indigo-400/90" />
              <span className="text-xs uppercase tracking-[0.4em] text-slate-500">Focus Meter</span>
            </div>
            <div className="text-right text-xs text-slate-400">
              <div className="text-base font-medium text-indigo-500">{Math.max(exam.days, 0)}</div>
              <div className="mt-0.5">Days to go</div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-4">
            {[
              { label: "Days", value: exam.days },
              { label: "Hours", value: exam.hours },
              { label: "Minutes", value: exam.minutes },
              { label: "Seconds", value: exam.seconds },
            ].map(stat => (
              <div key={stat.label} className="flex justify-center">
                <FlipStat label={stat.label} value={stat.value} />
              </div>
            ))}
          </div>

          <div>
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-400">
              <span>Progress</span>
              <span>{progress.toFixed(0)}%</span>
            </div>
            <div className="relative mt-3 h-4 w-full overflow-hidden rounded-full border border-white/70 bg-white/55 shadow-[inset_0_10px_24px_-24px_rgba(15,23,42,0.45)]">
              <div
                className={`absolute inset-y-0 left-0 overflow-hidden rounded-full bg-gradient-to-r from-slate-900/75 via-slate-900/45 to-slate-900/20 ${
                  reducedMotion ? "transition-[width] duration-300" : "transition-[width] duration-700"
                }`}
                style={{ width: `${widthPercent}%` }}
              >
                {!reducedMotion && (
                  <div className="animate-progress-sheen absolute inset-y-[-35%] left-[-40%] w-1/2 min-w-[140px] rounded-full bg-white/35 blur-lg" />
                )}
              </div>
              <div
                className="progress-indicator absolute top-1/2 h-6 w-6 -translate-y-1/2 -translate-x-1/2 rounded-full border border-white/70 bg-gradient-to-br from-indigo-500/80 to-slate-400/70 shadow-[0_18px_32px_-18px_rgba(79,70,229,0.45)]"
                style={{ left: `${indicatorPosition}%` }}
              >
                <span className="absolute inset-0 grid place-items-center text-xs text-white/90">•</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
