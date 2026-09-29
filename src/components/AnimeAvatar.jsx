import { useState, useEffect } from "react";
import { Sparkles, Hand, Zap, Award, Rocket } from "lucide-react";

const POSES = [
  {
    image: "/assets/anime-pose-1.png",
    greeting: "Hi, I'm Mercy Moraa!",
    icon: Hand,
    text: "Software Engineer & Backend Developer building scalable APIs, concurrent Go pipelines, and GraphRAG systems.",
    tag: "Backend Developer",
    positionClass: "translate-x-0 translate-y-0",
  },
  {
    image: "/assets/anime-pose-2.png",
    greeting: "Go Concurrency & Systems",
    icon: Zap,
    text: "Deep in goroutines, worker pools, memory profiling, and thread safety at Zone01 Kisumu.",
    tag: "Systems Engineering",
    positionClass: "translate-x-2 sm:translate-x-4 -translate-y-2",
  },
  {
    image: "/assets/anime-pose-3.png",
    greeting: "Kenya AI Challenge Finalist!",
    icon: Award,
    text: "Engineered sub-second bilingual GraphRAG with Neo4j to eliminate generative hallucinations on DigiCow AI.",
    tag: "AI Architecture",
    positionClass: "-translate-x-1 sm:-translate-x-3 translate-y-1",
  },
  {
    image: "/assets/anime-pose-1.png",
    greeting: "Production-Grade APIs",
    icon: Rocket,
    text: "Built idempotent Paystack & M-Pesa webhooks with zero double-counting on LedgerMate.",
    tag: "FinTech & APIs",
    positionClass: "translate-x-1 sm:translate-x-2 -translate-y-1",
  },
];

export default function AnimeAvatar() {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);

  // Automatically cycle postures, positions, and dialogue every 4.2 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % POSES.length);
        setFading(false);
      }, 350);
    }, 4200);

    return () => clearInterval(timer);
  }, []);

  const current = POSES[index];
  const HeadingIcon = current.icon;

  return (
    <div className="relative my-4 flex items-end gap-3 sm:gap-4 transition-all duration-700 ease-out">
      {/* Full-Body Anime Miniature Character */}
      <div
        className={`relative z-20 shrink-0 transition-all duration-700 ease-in-out transform ${current.positionClass}`}
      >
        <div className="relative h-44 w-28 sm:h-52 sm:w-32 transition-transform duration-500 hover:scale-105">
          {/* Ambient Shadow */}
          <div
            aria-hidden
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-3 w-16 rounded-full bg-[var(--color-ink)]/15 blur-sm"
          />

          {/* Full Body Anime Figure */}
          <img
            key={current.image}
            src={current.image}
            alt="Anime miniature of Mercy Moraa"
            className={`h-full w-full object-contain filter drop-shadow-[0_10px_20px_rgba(20,20,19,0.18)] transition-opacity duration-300 ${
              fading ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
          />
        </div>
      </div>

      {/* Interactive Speech Bubble */}
      <div
        className={`relative z-10 max-w-[280px] sm:max-w-[320px] rounded-2xl border border-[var(--color-line)] bg-[var(--color-panel)] p-3.5 shadow-[0_10px_30px_-10px_rgba(20,20,19,0.12)] transition-all duration-300 ${
          fading ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
        }`}
      >
        {/* Pointer arrow pointing to the avatar */}
        <div
          aria-hidden
          className="absolute -left-2 bottom-6 h-3.5 w-3.5 rotate-45 border-b border-l border-[var(--color-line)] bg-[var(--color-panel)]"
        />

        <div className="flex items-center justify-between gap-2 border-b border-[var(--color-line)]/60 pb-1.5 mb-1.5">
          <span className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">
            <Sparkles size={11} className="text-[var(--color-ink)]" />
            {current.tag}
          </span>
          <span className="inline-flex items-center gap-1 font-sans text-[11px] font-medium text-[var(--color-muted)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-ink)]" />
          </span>
        </div>

        <p className="font-display text-sm font-medium leading-snug text-[var(--color-ink)] flex items-center gap-1.5">
          <span>{current.greeting}</span>
          <HeadingIcon size={15} className="inline-block shrink-0 text-[var(--color-ink)]" />
        </p>
        <p className="mt-1 text-xs leading-relaxed text-[var(--color-muted)]">
          {current.text}
        </p>
      </div>
    </div>
  );
}