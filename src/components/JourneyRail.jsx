import { useEffect, useMemo, useRef, useState } from "react";

const markers = [
  { id: "hero", label: "祝福" },
  { id: "letter", label: "信件" },
  { id: "countdown", label: "倒计时" },
  { id: "whisper", label: "箴言" },
];

export function JourneyRail() {
  const [active, setActive] = useState(markers[0].id);
  const [progress, setProgress] = useState(0);
  const activeRef = useRef(markers[0].id);
  const sectionsRef = useRef([]);

  useEffect(() => {
    function resolveSections() {
      sectionsRef.current = markers
        .map(marker => document.getElementById(marker.id))
        .filter(Boolean);
    }

    resolveSections();

    function updateState() {
      if (sectionsRef.current.length === 0) {
        resolveSections();
      }
      if (sectionsRef.current.length === 0) {
        return;
      }

      const sections = sectionsRef.current;
      const doc = document.documentElement;
      const maxScrollable = Math.max(doc.scrollHeight - window.innerHeight, 1);
      const scrollRatio = window.scrollY / maxScrollable;
      setProgress(Math.min(Math.max(scrollRatio, 0), 1));

      const probeLine = window.innerHeight * 0.35;
      let nextActive = sections[0]?.id ?? activeRef.current;

      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= probeLine && rect.bottom >= probeLine) {
          nextActive = section.id;
          break;
        }
      }

      const first = sections[0];
      const last = sections[sections.length - 1];
      const firstTop = first.getBoundingClientRect().top + window.scrollY;
      const lastBottom = last.getBoundingClientRect().bottom + window.scrollY;

      if (window.scrollY <= firstTop - 40) {
        nextActive = first.id;
      } else if (window.scrollY + window.innerHeight >= lastBottom + 40) {
        nextActive = last.id;
      }

      if (nextActive && nextActive !== activeRef.current) {
        activeRef.current = nextActive;
        setActive(nextActive);
      }
    }

    let ticking = false;
    const onScroll = () => {
      if (ticking) {
        return;
      }
      ticking = true;
      window.requestAnimationFrame(() => {
        updateState();
        ticking = false;
      });
    };

    updateState();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    const timeout = window.setTimeout(updateState, 150);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  const handleClick = useMemo(
    () =>
      markers.reduce((acc, marker) => {
        acc[marker.id] = () => {
          const node = document.getElementById(marker.id);
          node?.scrollIntoView({ behavior: "smooth", block: "start" });
        };
        return acc;
      }, {}),
    [],
  );

  const progressHeight = `${Math.max(0, Math.min(1, progress)) * 100}%`;

  return (
    <nav className="fixed left-[min(1.5rem,4vw)] top-1/2 z-40 hidden -translate-y-1/2 lg:flex">
      <div className="pointer-events-auto relative flex flex-col items-center gap-8 py-6">
        <span className="absolute left-1/2 top-0 h-full w-[5px] -translate-x-1/2 rounded-full bg-white/30" />
        <span
          className="absolute left-1/2 top-0 w-[5px] -translate-x-1/2 rounded-full bg-gradient-to-b from-indigo-200/85 via-indigo-300/85 to-cyan-200/80 transition-[height] duration-500"
          style={{ height: progressHeight }}
        />
        {markers.map(marker => {
          const isActive = active === marker.id;
          return (
            <button
              key={marker.id}
              type="button"
              onClick={handleClick[marker.id]}
              className="group relative flex flex-col items-center"
              style={{ pointerEvents: "auto" }}
              aria-label={marker.label}
            >
              <span className="relative grid h-3.5 w-3.5 place-items-center">
                <span className="absolute inset-0 rounded-full bg-white/85" />
                <span className="absolute inset-[2px] rounded-full bg-slate-300/80" />
                {isActive && (
                  <span className="absolute inset-[-6px] rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.45),transparent_65%)]"></span>
                )}
              </span>
              <span
                className={`absolute left-6 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-white/60 bg-white/80 px-3 py-1 text-[0.62rem] tracking-[0.32em] text-slate-500 shadow-[0_18px_28px_-24px_rgba(15,23,42,0.4)] transition ${
                  isActive ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                }`}
              >
                {marker.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
