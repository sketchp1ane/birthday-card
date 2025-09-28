import { useEffect, useMemo, useState } from "react";

export function useCountdown(target) {
  const targetMs = useMemo(() => new Date(target).getTime(), [target]);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const diff = Math.max(0, targetMs - now);
  const dayMs = 86_400_000;
  const hourMs = 3_600_000;
  const minuteMs = 60_000;

  const days = Math.floor(diff / dayMs);
  const hours = Math.floor((diff % dayMs) / hourMs);
  const minutes = Math.floor((diff % hourMs) / minuteMs);
  const seconds = Math.floor((diff % minuteMs) / 1000);
  const totalHours = Math.floor(diff / hourMs);

  return {
    diff,
    days,
    hours,
    minutes,
    seconds,
    totalHours,
  };
}
