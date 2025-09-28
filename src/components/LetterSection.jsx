export function LetterSection({ letter, show, theme, recipientName }) {
  const footerLabel = letter.sender ? `— From ${letter.sender}` : `— For ${recipientName}`;
  return (
    <section id="letter" className="relative">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-slate-400">Letter</span>
          <h2 className="text-lg font-medium text-slate-800">{letter.title}</h2>
        </div>
      </div>
      <div
        className={`overflow-hidden rounded-3xl border border-black/5 bg-white/80 shadow-sm ring-1 ring-white/40 backdrop-blur transition-all duration-500 ${
          show ? "max-h-[60rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-4 px-6 py-6">
          <p className="whitespace-pre-line font-serif leading-relaxed text-[15px] text-slate-700 selection:bg-indigo-100/60">
            {letter.body}
          </p>
          <div className="mt-4 text-right text-sm text-slate-500">{footerLabel}</div>
        </div>
      </div>
      {show && (
        <div
          className="pointer-events-none absolute -left-6 top-0 h-36 w-36 opacity-40 blur-3xl"
          style={{ background: `radial-gradient(circle, ${theme.palette.accent}30, transparent 65%)` }}
        />
      )}
    </section>
  );
}
