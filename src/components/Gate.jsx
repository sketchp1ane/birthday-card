import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const KEY_ROWS = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
];

const REVEAL_STEP_DELAY = 220;

export function Gate({ secret, onUnlock, revealText = "" }) {
  const slotCount = secret.length;
  const slots = useMemo(() => Array.from({ length: slotCount }), [slotCount]);
  const revealSequence = useMemo(() => {
    const chars = Array.from(revealText);
    return Array.from({ length: slotCount }, (_, index) => chars[index] ?? "");
  }, [revealText, slotCount]);
  const [letters, setLetters] = useState(() => Array.from({ length: slotCount }, () => ""));
  const [error, setError] = useState("");
  const [shaking, setShaking] = useState(false);
  const [revealing, setRevealing] = useState(false);
  const [revealedChars, setRevealedChars] = useState(() => Array.from({ length: slotCount }, () => ""));
  const unlockTimeoutRef = useRef(null);

  const clearError = useCallback(() => {
    setError("");
    setShaking(false);
  }, []);

  useEffect(() => {
    setRevealedChars(Array.from({ length: slotCount }, () => ""));
  }, [slotCount]);

  const handleInput = useCallback(
    char => {
      if (revealing) {
        return;
      }
      clearError();
      setLetters(prev => {
        const next = [...prev];
        const firstEmpty = next.findIndex(letter => letter === "");
        if (firstEmpty !== -1) {
          next[firstEmpty] = char.toLowerCase();
        }
        return next;
      });
    },
    [clearError, revealing],
  );

  const handleBackspace = useCallback(() => {
    if (revealing) {
      return;
    }
    clearError();
    setLetters(prev => {
      const next = [...prev];
      const lastFilled = [...next].reverse().findIndex(letter => letter !== "");
      if (lastFilled !== -1) {
        const index = next.length - 1 - lastFilled;
        next[index] = "";
      }
      return next;
    });
  }, [clearError, revealing]);

  const submit = useCallback(() => {
    if (revealing) {
      return;
    }
    const answer = letters.join("");
    if (answer.length < secret.length) {
      setError("还差几个字母～");
      return;
    }
    if (answer === secret) {
      clearError();
      setRevealing(true);
      const totalDelay = Math.max(revealSequence.length, 1) * REVEAL_STEP_DELAY + 440;
      if (unlockTimeoutRef.current) {
        window.clearTimeout(unlockTimeoutRef.current);
      }
      unlockTimeoutRef.current = window.setTimeout(() => {
        unlockTimeoutRef.current = null;
        onUnlock?.();
      }, totalDelay);
    } else {
      setError("不对哦，再试试~");
      setShaking(true);
    }
  }, [clearError, letters, onUnlock, revealSequence, revealing, secret]);

  useEffect(() => {
    function handleKey(event) {
      if (revealing) {
        event.preventDefault();
        return;
      }
      const { key } = event;
      if (/^[a-zA-Z]$/.test(key)) {
        handleInput(key);
      } else if (key === "Backspace") {
        handleBackspace();
      } else if (key === "Enter") {
        submit();
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleBackspace, handleInput, revealing, submit]);

  useEffect(() => {
    if (!revealing) {
      return;
    }
    const timers = [];
    setRevealedChars(Array.from({ length: slotCount }, () => ""));
    revealSequence.forEach((character, index) => {
      const timer = window.setTimeout(() => {
        setRevealedChars(prev => {
          const next = [...prev];
          next[index] = character;
          return next;
        });
      }, index * REVEAL_STEP_DELAY);
      timers.push(timer);
    });
    return () => {
      timers.forEach(timer => window.clearTimeout(timer));
    };
  }, [revealSequence, revealing, slotCount]);

  useEffect(() => {
    return () => {
      if (unlockTimeoutRef.current) {
        window.clearTimeout(unlockTimeoutRef.current);
      }
    };
  }, []);

  const filledCount = letters.filter(Boolean).length;

  return (
    <div className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-slate-100 via-indigo-50 to-emerald-50 text-slate-900">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-15%] top-12 h-72 w-72 rounded-full bg-indigo-200/40 blur-3xl" />
        <div className="absolute right-[-5%] top-1/3 h-80 w-80 rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="absolute left-1/2 bottom-[-20%] h-96 w-[120vw] -translate-x-1/2 rounded-[999px] bg-gradient-to-r from-white/30 via-indigo-200/20 to-cyan-200/25 blur-3xl" />
      </div>

      <div className="w-full max-w-3xl px-6 sm:px-10">
        <div className="relative overflow-hidden rounded-[40px] border border-white/60 bg-white/55 px-8 py-12 shadow-[0_40px_90px_-60px_rgba(15,23,42,0.8)] backdrop-blur">
          <div className="pointer-events-none absolute inset-px rounded-[38px] border border-white/60" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/40 via-white/20 to-transparent" />

          <div className="relative flex flex-col gap-8">
            <div>
              <p className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">祝你生日快乐：</p>
            </div>

            <div
              className={`grid gap-4 transition-all duration-300 ${
                shaking ? "animate-[pulse_0.4s]" : ""
              }`}
              style={{ gridTemplateColumns: `repeat(${slots.length}, minmax(0, 1fr))` }}
            >
              {slots.map((_, index) => {
                const rawValue = letters[index];
                const displayValue = rawValue.toUpperCase();
                const revealChar = revealedChars[index];
                const isFilled = Boolean(rawValue);
                const isCurrent = !isFilled && filledCount === index;
                const boxClass = [
                  "relative grid h-20 place-items-center rounded-[26px] border text-3xl font-semibold transition",
                  isFilled
                    ? "border-indigo-200/70 bg-gradient-to-br from-white/90 via-indigo-50/50 to-white/30 text-slate-900 shadow-[0_18px_40px_-24px_rgba(79,70,229,0.65)]"
                    : "border-white/70 bg-white/40 text-slate-400",
                  isCurrent ? "ring-2 ring-indigo-200/80 shadow-[0_22px_50px_-28px_rgba(167,139,250,0.65)]" : "",
                ].join(" ");
                return (
                  <div key={index} className={boxClass}>
                    <span
                      className={`relative z-10 uppercase tracking-[0.6em] transition-all duration-200 ${
                        revealing && revealChar ? "-translate-y-1 opacity-0" : "translate-y-0 opacity-100"
                      }`}
                    >
                      {displayValue}
                    </span>
                    <span
                      aria-hidden={!revealing}
                      className={`pointer-events-none absolute inset-0 grid place-items-center text-[34px] font-semibold transition-all duration-300 ${
                        revealChar ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                      }`}
                    >
                      {revealChar}
                    </span>
                    <span className="pointer-events-none absolute inset-0 rounded-[26px] bg-gradient-to-b from-white/10 to-transparent" />
                  </div>
                );
              })}
            </div>
            <div className="space-y-3 text-sm font-medium uppercase">
              {KEY_ROWS.map((row, rowIndex) => (
                <div key={rowIndex} className="flex justify-center gap-2">
                  {row.map(char => (
                    <button
                      key={char}
                      onClick={() => handleInput(char)}
                      className="rounded-2xl border border-white/70 bg-white/60 px-3 py-2 text-slate-600 shadow-[0_14px_30px_-25px_rgba(15,23,42,0.7)] transition hover:-translate-y-0.5 hover:bg-white"
                    >
                      {char.toUpperCase()}
                    </button>
                  ))}
                </div>
              ))}
              <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center">
                <button
                  onClick={handleBackspace}
                  className="w-full rounded-2xl border border-rose-200/60 bg-rose-50/80 px-4 py-2 text-rose-500 shadow-[0_14px_30px_-22px_rgba(244,114,182,0.6)] transition hover:-translate-y-0.5 hover:bg-rose-50 sm:w-auto"
                >
                  ⌫ 退格
                </button>
                <button
                  onClick={submit}
                  className="w-full rounded-2xl border border-emerald-200/70 bg-gradient-to-r from-emerald-400/80 to-teal-400/80 px-6 py-2 text-white shadow-[0_18px_40px_-24px_rgba(16,185,129,0.6)] transition hover:-translate-y-0.5 hover:brightness-110 sm:w-auto"
                >
                  解锁
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-3xl border border-rose-200/60 bg-rose-50/90 px-5 py-3 text-sm text-rose-600 shadow-sm">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
