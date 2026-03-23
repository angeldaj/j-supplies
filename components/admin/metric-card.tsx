"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { TrendingUp } from "lucide-react";

function useCountUp(target: string, inView: boolean) {
  const [display, setDisplay] = useState(target);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    const numericMatch = target.match(/[\d,]+/);
    if (!numericMatch) return;

    const numericStr = numericMatch[0].replace(/,/g, "");
    const numericValue = parseInt(numericStr, 10);
    if (isNaN(numericValue)) return;

    const prefix = target.slice(0, target.indexOf(numericMatch[0]));
    const suffix = target.slice(target.indexOf(numericMatch[0]) + numericMatch[0].length);
    const duration = 1000;
    const steps = 40;
    const stepTime = duration / steps;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(numericValue * eased);
      const formatted = current.toLocaleString("en-US");
      setDisplay(`${prefix}${formatted}${suffix}`);

      if (step >= steps) {
        clearInterval(interval);
        setDisplay(target);
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, [inView, target]);

  return display;
}

export function MetricCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const animatedValue = useCountUp(value, isInView);

  return (
    <div ref={ref} className="rounded-lg border border-border bg-card p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="mt-3 font-display text-4xl leading-none tracking-[-0.04em] text-foreground">{animatedValue}</p>
        </div>
        <div className="flex size-8 items-center justify-center rounded-md bg-secondary text-primary">
          <TrendingUp className="size-3.5" />
        </div>
      </div>
      <p className="mt-3 text-xs text-primary">{detail}</p>
    </div>
  );
}
