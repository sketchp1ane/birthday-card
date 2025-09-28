import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

export function FloatingNotes({ notes, accent, reducedMotion }) {
  const safeNotes = useMemo(() => {
    const trimmed = notes.filter(Boolean);
    return trimmed.length > 0 ? trimmed : ["深呼吸"];
  }, [notes]);

  const [message, setMessage] = useState(safeNotes[0]);
  const [visible, setVisible] = useState(reducedMotion);
  const nextNoteIndex = useRef(0);
  const [portalTarget, setPortalTarget] = useState(null);

  useEffect(() => {
    setMessage(safeNotes[0]);
    nextNoteIndex.current = 0;
  }, [safeNotes]);

  useEffect(() => {
    setVisible(reducedMotion);
  }, [reducedMotion]);

  const accentColor = accent ?? "#a78bfa";

  const bubbleClasses = [
    "assistant-chat relative self-end -translate-y-6 w-[17.25rem] max-w-[18rem] overflow-hidden rounded-[20px] border border-white/55 bg-white/85 px-6 py-5 text-[1.05rem] leading-relaxed text-slate-600 shadow-[0_26px_48px_-30px_rgba(15,23,42,0.62)] backdrop-blur-xl ring-1 ring-white/45",
    visible ? "assistant-chat-in" : "assistant-chat-out",
  ].join(" ");

  function handlePointerEnter() {
    if (safeNotes.length === 0) {
      return;
    }
    if (!reducedMotion) {
      const nextIndex = nextNoteIndex.current ?? 0;
      const nextMessage = safeNotes[nextIndex] ?? safeNotes[0];
      setMessage(nextMessage);
      nextNoteIndex.current = safeNotes.length > 1 ? (nextIndex + 1) % safeNotes.length : nextIndex;
      setVisible(true);
    }
  }

  function handlePointerLeave() {
    if (!reducedMotion) {
      setVisible(false);
    }
  }

  useEffect(() => {
    setPortalTarget(document.body);
  }, []);

  if (!portalTarget) {
    return null;
  }

  return createPortal(
    <div className="fixed bottom-8 right-5 z-40">
      <div
        className="flex items-end gap-4"
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      >
        <div className={`${bubbleClasses} ${visible ? "" : "pointer-events-none"}`} aria-hidden={!visible}>
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-white/96 via-white/78 to-white/52" />
            <div
              className="absolute -right-10 -bottom-12 h-28 w-28 rounded-full opacity-35 blur-[72px]"
              style={{ background: accentColor }}
            />
            <div className="absolute -left-16 -top-12 h-24 w-24 rounded-full bg-slate-100/40 blur-3xl" />
          </div>
          <span
            className="absolute right-5 top-4 h-1.5 w-1.5 rounded-full"
            style={{ background: accentColor }}
          />
          <div className="flex items-center gap-5">
            <span
              className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-white/95 via-white/60 to-white/35 ring-1 ring-inset ring-white/60 shadow-[0_18px_28px_-20px_rgba(15,23,42,0.55)]"
              style={{ color: accentColor }}
            >
              <SparkIcon />
            </span>
            <div className="flex-1 text-right">
              <div className="flex items-center justify-end gap-2 text-[0.78rem] font-semibold tracking-[0.22em] text-slate-500/75">
                <span>小助理</span>
                <span className="inline-flex h-1.5 w-1.5 rounded-full" style={{ background: accentColor }} />
              </div>
              <p className="mt-4 text-[1.22rem] font-semibold leading-snug text-slate-600/95">{message}</p>
            </div>
          </div>
        </div>
        <div
          className={`relative flex h-16 w-16 items-center justify-center rounded-full border border-white/40 bg-white/70 shadow-[0_28px_48px_-32px_rgba(15,23,42,0.7)] backdrop-blur-lg ring-1 ring-white/60 ${
            reducedMotion ? "" : "animate-floating"
          }`}
          style={{ color: accentColor }}
        >
          <FriendAvatar accent={accentColor} />
          <span className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full bg-emerald-300 shadow-[0_0_0_1.5px_rgba(255,255,255,0.75)]" />
        </div>
      </div>
    </div>,
    portalTarget,
  );
}

function SparkIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9 1.5 10.12 6c.12.48.5.86.98.98L15.5 8l-4.4 1.02a1.44 1.44 0 0 0-.98.98L9 14.5l-1.12-4.5a1.44 1.44 0 0 0-.98-.98L2.5 8l4.4-1.02c.48-.12.86-.5.98-.98L9 1.5Z"
        fill="currentColor"
        fillOpacity="0.75"
      />
    </svg>
  );
}

function FriendAvatar({ accent }) {
  const gradientId = useMemo(() => `friend-face-${Math.random().toString(36).slice(2, 9)}`, []);
  return (
    <svg
      className="h-10 w-10"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradientId} x1="18" y1="12" x2="46" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={accent} stopOpacity="0.9" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.85" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="28" fill={`url(#${gradientId})`} opacity="0.92" />
      <path
        d="M19 25c2-4.6 6.1-7.4 13-7.4s11 2.8 13 7.4"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeOpacity="0.55"
      />
      <path
        d="M21 38c2.2 4.8 6.6 7.5 11 7.5s8.8-2.7 11-7.5"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeOpacity="0.7"
      />
      <ellipse cx="23.5" cy="29.5" rx="2.6" ry="3.2" fill="#f8fafc" opacity="0.9" />
      <ellipse cx="40.5" cy="29.5" rx="2.6" ry="3.2" fill="#f8fafc" opacity="0.9" />
      <path
        d="M31.6 42.4c1.9 0 3.4 1.54 3.4 3.45 0 1.66-1.53 3.45-3.4 3.45-1.87 0-3.4-1.79-3.4-3.45 0-1.91 1.5-3.45 3.4-3.45Z"
        fill="#f8fafc"
        opacity="0.9"
      />
      <path d="M18.4 16.8c-2.3-0.4-3.5-1.8-3.1-3.6 0.4-1.9 2.6-2.9 4.9-2.5 2 0.3 3.6 1.4 4 3.1" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeOpacity="0.45" />
      <path d="M45.7 16.8c2.3-0.4 3.5-1.8 3.1-3.6-0.4-1.9-2.6-2.9-4.9-2.5-2 0.3-3.6 1.4-4 3.1" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeOpacity="0.45" />
      <path
        d="M13 36.6c-1.45 0-2.6-1.19-2.6-2.66 0-1.47 1.15-2.66 2.6-2.66 1.43 0 2.6 1.19 2.6 2.66 0 1.47-1.17 2.66-2.6 2.66ZM51 36.6c-1.45 0-2.6-1.19-2.6-2.66 0-1.47 1.15-2.66 2.6-2.66 1.43 0 2.6 1.19 2.6 2.66 0 1.47-1.17 2.66-2.6 2.66Z"
        fill="#f8fafc"
        opacity="0.65"
      />
    </svg>
  );
}
