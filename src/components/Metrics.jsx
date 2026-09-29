import { useRef, useState, useEffect } from "react";
import { useInView } from "motion/react";
import { Sparkles, Trophy, Zap, Terminal, Database, Shield, Globe } from "lucide-react";
import { metrics } from "../data";

const MARQUEE_ITEMS = [
  { icon: Terminal, text: "Go Concurrency & Goroutine Pipelines" },
  { icon: Trophy, text: "Kenya AI Challenge National Finalist" },
  { icon: Shield, text: "Idempotent Paystack & M-Pesa Webhooks" },
  { icon: Database, text: "Neo4j GraphRAG & PostgreSQL Backends" },
  { icon: Zap, text: "Sub-Second Bilingual Agritech Inference" },
  { icon: Globe, text: "Open to Worldwide Remote Work & Relocation" },
  { icon: Sparkles, text: "Zero Double-Counting FinTech Reconciliation" },
];

function AnimatedCounter({ value, isInView }) {
  const [displayNumber, setDisplayNumber] = useState(0);
  const numMatch = value.match(/\d+/);
  const target = numMatch ? parseInt(numMatch[0], 10) : null;
  const suffix = value.replace(/\d+/, "");

  useEffect(() => {
    if (!isInView || target === null) return;

    let startTime = null;
    const duration = 1800; // ms

    const animateNumber = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * easeOut);
      setDisplayNumber(current);

      if (progress < 1) {
        requestAnimationFrame(animateNumber);
      }
    };

    const animFrame = requestAnimationFrame(animateNumber);
    return () => cancelAnimationFrame(animFrame);
  }, [isInView, target]);

  if (target === null) {
    return (
      <span className="inline-flex items-center gap-2">
        <Trophy size={28} className="text-amber-400 shrink-0" />
        <span>{value}</span>
      </span>
    );
  }

  return (
    <span>
      {displayNumber}
      {suffix}
    </span>
  );
}

export default function Metrics() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <div
      ref={sectionRef}
      className="border-b border-[var(--color-line)] bg-[var(--color-ink)] text-[var(--color-paper)] overflow-hidden"
    >
      {/* 1. Animated Stats Counter Grid */}
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-2 gap-6 px-5 py-12 sm:px-8 md:grid-cols-4 md:gap-8">
        {metrics && metrics.length > 0
          ? metrics.map((m) => (
              <div key={m.label} className="flex flex-col group">
                <p className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--color-paper)] transition-transform duration-300 group-hover:-translate-y-1">
                  <AnimatedCounter value={m.num} isInView={isInView} />
                </p>
                <p className="mt-2.5 font-sans text-xs font-semibold uppercase tracking-wider text-[var(--color-paper)]/75">
                  {m.label}
                </p>
              </div>
            ))
          : null}
      </div>

      {/* 2. Infinite Continuous Marquee Banner */}
      <div className="border-t border-white/10 bg-black/30 py-3.5 overflow-hidden select-none">
        <div className="animate-marquee flex items-center gap-8 text-xs font-sans font-medium uppercase tracking-wider text-stone-300">
          {/* First loop */}
          {MARQUEE_ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={`m1-${i}`} className="inline-flex items-center gap-2.5 shrink-0 px-2">
                <Icon size={13} className="text-amber-400 shrink-0" />
                <span>{item.text}</span>
                <span className="text-stone-600 ml-4">&bull;</span>
              </div>
            );
          })}

          {/* Seamless duplicate loop for continuous marquee effect */}
          {MARQUEE_ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={`m2-${i}`} className="inline-flex items-center gap-2.5 shrink-0 px-2">
                <Icon size={13} className="text-amber-400 shrink-0" />
                <span>{item.text}</span>
                <span className="text-stone-600 ml-4">&bull;</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}