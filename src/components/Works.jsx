import { useState, useRef } from "react";
import { ExternalLink, ChevronUp, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { projects } from "../data";
import { Section, SectionHeading } from "./Section";
import { TiltCard } from "./TiltCard";

const FILTERS = [
  { key: "all", label: "All Featured Systems" },
  { key: "ai", label: "AI & GraphRAG" },
  { key: "fintech", label: "FinTech & APIs" },
  { key: "systems", label: "Go Systems & CLI" },
];

export default function Works() {
  const [active, setActive] = useState("all");
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      const step = dir === "up" ? -420 : 420;
      scrollRef.current.scrollBy({ top: step, behavior: "smooth" });
    }
  };

  // Normalize project entries and map Go Concurrency project title -> "Pamoja Build"
  const processedProjects = (projects || []).map((p) => {
    const isGoConcurrency =
      p.id?.toLowerCase().includes("go") ||
      p.title?.toLowerCase().includes("concurrency") ||
      p.category === "systems";

    if (isGoConcurrency) {
      return {
        ...p,
        title: "Pamoja Build",
        subtitle: p.subtitle || p.title || "Go Concurrency Engine & Build Tool",
      };
    }
    return p;
  });

  const visible =
    active === "all"
      ? processedProjects
      : processedProjects.filter((p) => p.category === active);

  return (
    <Section id="works" className="border-b border-[var(--color-line)]">
      <SectionHeading
        kicker="Featured Case Studies"
        title="Production Systems &"
        accent="Backend Architectures"
        desc="Deep architectural dives into deployed services: high-throughput Go pipelines, Paystack/M-Pesa idempotent APIs, and zero-hallucination GraphRAG."
      />

      {/* Filter Bar with Vertical Scroll Navigation Controls */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-panel)] p-1.5 w-fit">
          {FILTERS.map((f) => {
            const isActive = active === f.key;
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => setActive(f.key)}
                className={`relative rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-colors ${
                  isActive
                    ? "text-[var(--color-paper)]"
                    : "text-[var(--color-muted)] hover:text-[var(--color-ink)]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="worksActiveFilterPill"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-[var(--color-ink)] shadow-sm"
                  />
                )}
                <span className="relative z-10">{f.label}</span>
              </button>
            );
          })}
        </div>

        {/* Scroll Navigation Chevrons for Up/Down */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scroll("up")}
            aria-label="Scroll projects up"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-line)] bg-[var(--color-panel)] text-[var(--color-ink)] transition-colors hover:border-[var(--color-ink)] hover:bg-[var(--color-paper)] shadow-2xs cursor-pointer"
          >
            <ChevronUp size={16} />
          </button>
          <button
            type="button"
            onClick={() => scroll("down")}
            aria-label="Scroll projects down"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-line)] bg-[var(--color-panel)] text-[var(--color-ink)] transition-colors hover:border-[var(--color-ink)] hover:bg-[var(--color-paper)] shadow-2xs cursor-pointer"
          >
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      {/* 2x2 Vertically Scrollable Grid for Case Studies */}
      <div
        ref={scrollRef}
        className="custom-scrollbar max-h-[840px] overflow-y-auto pr-2 pb-4 scroll-smooth focus:outline-none"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {visible.map((p, idx) => (
              <motion.div
                key={p.id || p.title}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.2, 0.65, 0.3, 0.9], delay: idx * 0.04 }}
                className="h-full"
              >
                <TiltCard maxTilt={3} className="h-full">
                  <article className="flex h-full flex-col justify-between rounded-[24px] sm:rounded-[28px] border border-[var(--color-line)] bg-[var(--color-panel)] p-5 sm:p-6 shadow-sm transition-all duration-300 hover:border-[var(--color-ink)]/50 hover:shadow-md">
                    <div>
                      {/* Compact Top Media / Stat Feature */}
                      {p.image ? (
                        <div className="overflow-hidden rounded-xl border border-[var(--color-line)]/70 bg-black/5 aspect-[21/9] sm:aspect-[2.3/1] mb-4">
                          <img
                            src={p.image}
                            alt={p.imageAlt || p.title}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                          />
                        </div>
                      ) : p.stat ? (
                        <div className="overflow-hidden rounded-xl border border-[var(--color-line)]/70 bg-[var(--color-paper)] p-3.5 mb-4 flex items-center justify-between">
                          <div>
                            <span className="font-sans text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">
                              Go Concurrency Engine
                            </span>
                            <p className="font-display text-sm font-medium text-[var(--color-ink)]">
                              Zero Third-Party Dependencies
                            </p>
                          </div>
                          <div className="rounded-lg bg-[var(--color-panel)] border border-[var(--color-line)] px-3 py-1.5 text-right">
                            <span className="font-display text-xl font-bold text-[var(--color-ink)] leading-none">
                              {p.stat.value}
                            </span>
                            <p className="font-sans text-[11px] text-[var(--color-muted)] mt-0.5">
                              {p.stat.label}
                            </p>
                          </div>
                        </div>
                      ) : null}

                      {/* Badges */}
                      <div className="mb-2.5 flex flex-wrap items-center gap-1.5">
                        {p.type && (
                          <span className="rounded-full bg-[var(--color-paper)] px-2.5 py-0.5 font-sans text-xs font-medium text-[var(--color-muted)] border border-[var(--color-line)]/60">
                            {p.type}
                          </span>
                        )}
                        {p.tags?.slice(0, 2).map((t) => (
                          <span
                            key={t}
                            className="rounded-full bg-[var(--color-paper)] px-2.5 py-0.5 font-sans text-xs font-medium text-[var(--color-muted)] border border-[var(--color-line)]/60"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Title & Subtitle */}
                      <h3 className="font-display text-lg sm:text-xl font-medium tracking-tight text-[var(--color-ink)]">
                        {p.title}
                      </h3>
                      {p.subtitle && (
                        <p className="mt-0.5 font-serif text-xs italic text-[var(--color-muted)] line-clamp-1">
                          {p.subtitle}
                        </p>
                      )}

                      {/* Description */}
                      <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-[var(--color-muted)] line-clamp-2">
                        {p.description}
                      </p>

                      {/* Compact Bullets */}
                      {p.bullets && p.bullets.length > 0 && (
                        <div className="mt-3 space-y-1.5 border-t border-[var(--color-line)]/50 pt-2.5">
                          {p.bullets.slice(0, 2).map((b) => (
                            <p key={b.label} className="text-[11px] sm:text-xs leading-relaxed text-[var(--color-muted)] line-clamp-1">
                              <strong className="font-medium text-[var(--color-ink)]">{b.label}:</strong> {b.text}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Card Footer: Tech Chips & Actions */}
                    <div className="mt-4 pt-3 border-t border-[var(--color-line)]/50">
                      {/* Tech Chips */}
                      {p.tech && p.tech.length > 0 && (
                        <div className="mb-3 flex flex-wrap items-center gap-1.5">
                          {p.tech.slice(0, 4).map((t) => (
                            <span
                              key={t}
                              className="rounded-md border border-[var(--color-line)] bg-[var(--color-paper)] px-2.5 py-0.5 font-sans text-xs font-medium text-[var(--color-muted)]"
                            >
                              {t}
                            </span>
                          ))}
                          {p.tech.length > 4 && (
                            <span className="font-sans text-xs font-medium text-[var(--color-muted)]">
                              +{p.tech.length - 4}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Action CTAs */}
                      <div className="flex flex-wrap items-center gap-2">
                        {p.liveUrl && (
                          <motion.a
                            href={p.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-ink)] px-3.5 py-1.5 font-sans text-xs font-medium text-[var(--color-paper)] shadow-2xs"
                          >
                            <span>{p.liveLabel || "Live Demo"}</span>
                            <ExternalLink size={12} />
                          </motion.a>
                        )}
                        {p.repoUrl && (
                          <motion.a
                            href={p.repoUrl}
                            target="_blank"
                            rel="noreferrer"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-line)] bg-[var(--color-paper)] px-3.5 py-1.5 font-sans text-xs font-medium text-[var(--color-ink)] transition-colors hover:border-[var(--color-ink)]"
                          >
                            <span>{p.repoLabel || "Repository"}</span>
                            <ExternalLink size={12} />
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </article>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}