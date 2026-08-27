"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

function subscribeReducedMotion(callback: () => void) {
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

export function CodeReveal({ code }: { code: string }) {
  const ref = useRef<HTMLPreElement>(null);
  const [intersected, setIntersected] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || reducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersected(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion]);

  const lines = code.split("\n");
  const revealed = intersected || reducedMotion;
  const staggered = intersected && !reducedMotion;

  return (
    <pre ref={ref} className="py-3 font-mono text-xs leading-relaxed text-ink">
      <code>
        {lines.map((line, i) => (
          <span
            key={i}
            className="block"
            style={{
              opacity: revealed ? 1 : 0,
              transform: revealed ? "none" : "translateY(4px)",
              transition: `opacity var(--dur-reveal) var(--ease-out), transform var(--dur-reveal) var(--ease-out)`,
              transitionDelay: staggered ? `${i * 35}ms` : "0ms",
            }}
          >
            {line || " "}
          </span>
        ))}
      </code>
    </pre>
  );
}
