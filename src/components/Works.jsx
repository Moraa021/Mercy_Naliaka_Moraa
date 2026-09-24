import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { projects } from "../data";
import { Section, SectionHeading } from "./Section";
import { TiltCard } from "./TiltCard";

const FILTERS = [
  { key: "all", label: "All works" },
  { key: "ai", label: "AI and knowledge graphs" },
  { key: "fintech", label: "FinTech and backend" },
  { key: "systems", label: "Systems and CLI" },
];

export default function Works() {
  const [active, setActive] = useState("all");

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
    <Section id="works">
      <SectionHeading
        kicker="Selected works"
        title="Case studies,"
        accent="composed"
        desc="Every system, a cohesive solution: production architectures built with purpose and technical rigor."
      />

      {/* Plata-Style Animated Sliding Pill Filter Bar */}
      <div className="mb-12 flex flex-wrap items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-panel)] p-1.5 w-fit">
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

      {/* Project Cards Stream with Plata-Style 3D Tilt */}
      <div className="flex flex-col gap-10">
        <AnimatePresence mode="popLayout">
          {visible.map((p, idx) => (
            <motion.div
              key={p.id || p.title}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, ease: [0.2, 0.65, 0.3, 0.9], delay: idx * 0.05 }}
            >
              <TiltCard maxTilt={5}>
                <article className="grid gap-8 rounded-[32px] sm:rounded-[36px] border border-[var(--color-line)] bg-[var(--color-panel)] p-6 sm:p-9 lg:grid-cols-2 lg:items-center lg:gap-12 shadow-[0_20px_50px_-25px_rgba(20,20,19,0.08)] transition-all hover:border-[var(--color-ink)]/50">
                  <div>
                    {/* Type and Tags Badges */}
                    <div className="mb-4 flex flex-wrap gap-2">
                      {p.type && (
                        <span className="rounded-full bg-[var(--color-paper)] px-3 py-1 font-mono text-[11px] text-[var(--color-muted)] border border-[var(--color-line)]/60">
                          {p.type}
                        </span>
                      )}
                      {p.tags?.slice(0, 2).map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-[var(--color-paper)] px-3 py-1 font-mono text-[11px] text-[var(--color-muted)] border border-[var(--color-line)]/60"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <h3 className="font-display text-2xl font-normal tracking-tight text-[var(--color-ink)] sm:text-3xl">
                      {p.title}
                    </h3>
                    {p.subtitle && (
                      <p className="mt-1.5 font-serif text-sm italic text-[var(--color-muted)] sm:text-base">
                        {p.subtitle}
                      </p>
                    )}
                    <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)]">
                      {p.description}
                    </p>

                    {/* Bullet Highlights */}
                    {p.bullets && p.bullets.length > 0 && (
                      <ul className="mt-5 flex flex-col gap-3">
                        {p.bullets.map((b) => (
                          <li key={b.label} className="text-sm leading-relaxed">
                            <strong className="font-medium text-[var(--color-ink)]">
                              {b.label}:
                            </strong>{" "}
                            <span className="text-[var(--color-muted)]">{b.text}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Tech Stack Chips */}
                    {p.tech && p.tech.length > 0 && (
                      <div className="mt-6 flex flex-wrap gap-2">
                        {p.tech.map((t) => (
                          <span
                            key={t}
                            className="rounded-md border border-[var(--color-line)] bg-[var(--color-paper)] px-2.5 py-1 font-mono text-[11px] text-[var(--color-muted)]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Action Link CTAs with Spring Physics */}
                    <div className="mt-8 flex flex-wrap gap-3">
                      {p.liveUrl && (
                        <motion.a
                          href={p.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className="flex items-center gap-1.5 rounded-full bg-[var(--color-ink)] px-5 py-2.5 text-xs sm:text-sm font-medium text-[var(--color-paper)] shadow-sm"
                        >
                          <span>{p.liveLabel || "Open live app"}</span>
                          <ExternalLink size={13} />
                        </motion.a>
                      )}
                      {p.repoUrl && (
                        <motion.a
                          href={p.repoUrl}
                          target="_blank"
                          rel="noreferrer"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className="flex items-center gap-1.5 rounded-full border border-[var(--color-line)] bg-[var(--color-panel)] px-5 py-2.5 text-xs sm:text-sm font-medium text-[var(--color-ink)] transition-colors hover:border-[var(--color-ink)]"
                        >
                          <span>{p.repoLabel || "View repository"}</span>
                          <ExternalLink size={13} />
                        </motion.a>
                      )}
                    </div>
                  </div>

                  {/* Media / Stat Feature Column */}
                  {p.image ? (
                    <div className="overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-panel)]">
                      <img
                        src={p.image}
                        alt={p.imageAlt || p.title}
                        loading="lazy"
                        className="w-full object-cover transition-transform duration-700 hover:scale-[1.04]"
                      />
                    </div>
                  ) : p.stat ? (
                    <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-paper)] p-7 sm:p-9 shadow-inner">
                      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-muted)]">
                        Systems focus
                      </p>
                      <p className="mt-2 font-display text-xl sm:text-2xl font-normal text-[var(--color-ink)]">
                        Go standard library
                      </p>
                      <div className="mt-6 rounded-xl border border-[var(--color-line)] bg-[var(--color-panel)] p-6">
                        <p className="font-display text-4xl sm:text-5xl font-light text-[var(--color-ink)]">
                          {p.stat.value}
                        </p>
                        <p className="mt-2 text-sm text-[var(--color-muted)]">{p.stat.label}</p>
                      </div>
                    </div>
                  ) : null}
                </article>
              </TiltCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Section>
  );
}