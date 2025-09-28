import { useMemo } from "react";

function createSparkles(count) {
  return Array.from({ length: count }, (_, index) => ({
    id: index,
    x: Math.random() * 100,
    y: Math.random() * 100,
    r: Math.random() * 1.4 + 0.4,
    duration: (Math.random() * 3 + 2).toFixed(2),
  }));
}

export function SparkleField({ count = 18, reducedMotion }) {
  const sparkles = useMemo(() => createSparkles(count), [count]);

  return (
    <svg className="absolute inset-0 -z-10 h-full w-full opacity-60" aria-hidden>
      {sparkles.map(sparkle => (
        <circle
          key={sparkle.id}
          cx={`${sparkle.x}%`}
          cy={`${sparkle.y}%`}
          r={sparkle.r}
          className="fill-white/40"
        >
          {!reducedMotion && (
            <animate
              attributeName="opacity"
              values="0;1;0"
              dur={`${sparkle.duration}s`}
              repeatCount="indefinite"
            />
          )}
        </circle>
      ))}
    </svg>
  );
}
