export function TopNav({ onResetGate }) {
  return (
    <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={event => {
            if (event.shiftKey) {
              onResetGate?.();
            }
          }}
          title="Shift+Click 复位入口小游戏（仅开发用）"
          className="h-9 w-9 rounded-xl border border-black/10 bg-white/80 shadow-sm transition hover:-translate-y-0.5 hover:bg-white overflow-hidden"
        >
          <img
            src="../public/avatar.jpg"
            alt="Avatar"
            className="h-full w-full object-cover rounded-xl"
          />
        </button>
        <span className="text-sm tracking-wide text-slate-600">Birthday · Kaoyan</span>
      </div>
      <span className="rounded-full border border-white/70 bg-white/70 px-3 py-1.5 text-xs uppercase tracking-[0.35em] text-slate-500 shadow-sm">
        Surprise Day
      </span>
    </header>
  );
}
