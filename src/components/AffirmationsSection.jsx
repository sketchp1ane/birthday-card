import { useMemo, useState } from "react";

export function AffirmationsSection({ affirmations, accent }) {
  const quotes = useMemo(() => affirmations ?? [], [affirmations]);
  const [index, setIndex] = useState(0);
  const current = quotes[index] ?? {};

  function nextQuote() {
    if (quotes.length <= 1) return;
    setIndex(prev => (prev + 1) % quotes.length);
  }

  return (
    <section id="whisper" className="mx-auto max-w-4xl px-6">
      <article className="relative overflow-hidden rounded-[40px] border border-white/70 bg-white/70 p-10 shadow-[0_40px_90px_-60px_rgba(15,23,42,0.7)] backdrop-blur">
        <div
          className="quote-glow absolute -left-24 top-[-30%] h-60 w-60 rounded-full"
          style={{ background: `radial-gradient(circle, ${accent}28 0%, transparent 65%)` }}
        />
        <div className="quote-glow absolute -right-28 bottom-[-35%] h-72 w-72 rounded-full" />

        <div className="relative flex flex-col gap-6">
          <header className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-[11px] uppercase tracking-[0.5em] text-slate-400">Daily Whisper</p>
            {quotes.length > 1 && (
              <button
                onClick={nextQuote}
                className="rounded-full border border-white/70 bg-white/80 px-4 py-1 text-xs uppercase tracking-[0.35em] text-slate-500 shadow-sm transition hover:bg-white"
              >
                Next
              </button>
            )}
          </header>

          <blockquote className="quote-script text-[26px] leading-[1.7] text-slate-700">
            “{current.quote ?? "Keep your focus steady."}”
          </blockquote>

          <footer className="flex flex-col gap-1 text-right text-xs uppercase tracking-[0.3em] text-slate-400">
            <span>— {current.author ?? "Unknown"}</span>
            <span className="text-[11px] normal-case tracking-[0.15em] text-slate-400">{current.subline}</span>
          </footer>
        </div>
      </article>
    </section>
  );
}
