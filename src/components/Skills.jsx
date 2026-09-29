import { useState, useRef } from "react";
import { Zap, Brain, Database, Wrench, Sparkles, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { skills } from "../data";
import { Section, SectionHeading } from "./Section";
import { TiltCard } from "./TiltCard";

const ICONS = { zap: Zap, brain: Brain, database: Database, tool: Wrench };

export default function Skills() {
  const [filter, setFilter] = useState("all");
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      const step = dir === "left" ? -scrollRef.current.clientWidth * 0.75 : scrollRef.current.clientWidth * 0.75;
      scrollRef.current.scrollBy({ left: step, behavior: "smooth" });
    }
  };

  const categories = [
    { key: "all", label: "Full Technical Matrix" },
    { key: "zap", label: "Backend & Systems" },
    { key: "database", label: "Databases & Storage" },
    { key: "brain", label: "Applied AI & GraphRAG" },
    { key: "tool", label: "DevOps & QA" },
  ];

  const displayedSkills =
    filter === "all" ? skills : skills.filter((s) => s.icon === filter);

  return (
    <Section id="skills" className="bg-[var(--color-panel)] border-y border-[var(--color-line)]">
      <SectionHeading
        kicker="Core competencies & stack"
        title="Backend & Systems"
        accent="competencies"
        desc="Systems programming in Go, concurrent pipelines, scalable Python microservices, relational persistence, and domain-grounded GraphRAG AI."
      />

      {/* Domain Quick Filters & Scroll Controls */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-paper)] p-1.5 w-fit">
          {categories.map((c) => {
            const isActive = filter === c.key;
            return (
              <button
                key={c.key}
                type="button"
                onClick={() => setFilter(c.key)}
                className={`relative rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-colors ${
                  isActive
                    ? "text-[var(--color-paper)] font-semibold"
                    : "text-[var(--color-muted)] hover:text-[var(--color-ink)]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="skillsActiveFilterPill"
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-[var(--color-ink)] shadow-sm"
                  />
                )}
                <span className="relative z-10">{c.label}</span>
              </button>
            );
          })}
        </div>

        {/* Scroll Chevrons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Scroll skills left"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-line)] bg-[var(--color-paper)] text-[var(--color-ink)] transition-colors hover:border-[var(--color-ink)] hover:bg-[var(--color-panel)] shadow-2xs"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Scroll skills right"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-line)] bg-[var(--color-paper)] text-[var(--color-ink)] transition-colors hover:border-[var(--color-ink)] hover:bg-[var(--color-panel)] shadow-2xs"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Horizontally Scrollable Container for Skill Domains */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scroll-smooth no-scrollbar"
      >
        <AnimatePresence mode="popLayout">
          {displayedSkills.map((s) => {
            const Icon = ICONS[s.icon] || Wrench;

            // Separate featured daily drivers from supporting stack
            const dailyDrivers = s.chips.filter((c) => s.featured?.includes(c));
            const supportingStack = s.chips.filter((c) => !s.featured?.includes(c));

            return (
              <motion.div
                key={s.title}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="w-[85vw] sm:w-[380px] lg:w-[440px] shrink-0 snap-start h-auto"
              >
                <TiltCard maxTilt={5} className="h-full">
                  <div className="flex h-full flex-col justify-between rounded-[32px] border border-[var(--color-line)] bg-[var(--color-paper)] p-7 sm:p-8 shadow-sm transition-all duration-300 hover:border-[var(--color-ink)] hover:shadow-[0_20px_45px_-20px_rgba(20,20,19,0.12)]">
                    <div>
                      {/* Header with Icon and Badge */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3.5">
                          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-ink)] text-[var(--color-paper)] shadow-xs">
                            <Icon size={20} strokeWidth={2} />
                          </span>
                          <div>
                            <h3 className="font-display text-xl sm:text-2xl font-normal text-[var(--color-ink)]">
                              {s.title}
                            </h3>
                            <p className="font-sans text-xs font-medium text-[var(--color-muted)]">
                              Production Domain
                            </p>
                          </div>
                        </div>

                        <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-line)] bg-[var(--color-paper)] px-3 py-1 font-sans text-xs font-medium text-[var(--color-muted)]">
                          <CheckCircle2 size={12} className="text-[var(--color-ink)]" />
                          <span>Active Practice</span>
                        </span>
                      </div>

                      {/* Description */}
                      {s.description && (
                        <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)]">
                          {s.description}
                        </p>
                      )}

                      {/* Daily Drivers Group */}
                      <div className="mt-6">
                        <div className="mb-2.5 flex items-center gap-2">
                          <Sparkles size={12} className="text-amber-600" />
                          <span className="font-sans text-xs uppercase tracking-wider text-[var(--color-ink)] font-semibold">
                            Core Daily Drivers:
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {dailyDrivers.map((c) => (
                            <span
                              key={c}
                              className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-ink)] px-3.5 py-1.5 font-sans text-xs font-medium text-[var(--color-paper)] shadow-2xs transition-transform hover:scale-105"
                            >
                              <span>{c}</span>
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Supporting Stack Group */}
                      {supportingStack.length > 0 && (
                        <div className="mt-5">
                          <span className="mb-2.5 block font-sans text-xs uppercase tracking-wider text-[var(--color-muted)] font-semibold">
                            Tooling & Primitives:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {supportingStack.map((c) => (
                              <span
                                key={c}
                                className="rounded-lg border border-[var(--color-line)] bg-[var(--color-panel)] px-2.5 py-1 font-sans text-xs font-medium text-[var(--color-muted)] transition-colors hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]"
                              >
                                {c}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Bottom Architectural Rigor Footer */}
                    <div className="mt-6 flex items-center justify-between border-t border-[var(--color-line)]/60 pt-4 font-sans text-xs text-[var(--color-muted)] font-medium">
                      <span>Standard Library & Defensive Design</span>
                      <span className="text-[var(--color-ink)] font-semibold">Verified in Production</span>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </Section>
  );
}