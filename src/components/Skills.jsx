import { useState } from "react";
import { Zap, Brain, Database, Wrench, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { skills } from "../data";
import { Section, SectionHeading } from "./Section";
import { TiltCard } from "./TiltCard";

const ICONS = { zap: Zap, brain: Brain, database: Database, tool: Wrench };

export default function Skills() {
  const [activeTab, setActiveTab] = useState(0);

  const currentSkill = skills[activeTab] || skills[0];
  const CurrentIcon = ICONS[currentSkill.icon] || Wrench;

  return (
    <Section id="skills" className="bg-[var(--color-panel)]">
      <SectionHeading
        kicker="Core arsenal & capabilities"
        title="What I bring"
        accent="to the table"
        desc="Systems programming rigor, applied machine learning, and clean architectural design."
      />

      {/* Plata-Style Interactive Category Switcher ("More ways to build") */}
      <div className="mb-10 flex flex-wrap gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-paper)] p-1.5 w-fit">
        {skills.map((s, idx) => {
          const Icon = ICONS[s.icon] || Wrench;
          const isActive = activeTab === idx;

          return (
            <button
              key={s.title}
              type="button"
              onClick={() => setActiveTab(idx)}
              className={`relative flex items-center gap-2 rounded-full px-4 py-2.5 text-xs sm:text-sm font-medium transition-colors ${
                isActive
                  ? "text-[var(--color-paper)]"
                  : "text-[var(--color-muted)] hover:text-[var(--color-ink)]"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="skillsTabActivePill"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  className="absolute inset-0 rounded-full bg-[var(--color-ink)] shadow-sm"
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <Icon size={14} />
                <span>{s.title}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Plata-Style Active Focus Highlight Box */}
      <div className="mb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSkill.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.2, 0.65, 0.3, 0.9] }}
            className="rounded-[32px] border border-[var(--color-line)] bg-[var(--color-paper)] p-6 sm:p-10 shadow-sm"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--color-line)] pb-6 mb-6">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-ink)] text-[var(--color-paper)]">
                  <CurrentIcon size={22} />
                </span>
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl font-normal text-[var(--color-ink)]">
                    {currentSkill.title}
                  </h3>
                  <p className="font-mono text-xs text-[var(--color-muted)]">
                    High-impact technical focus
                  </p>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 px-3.5 py-1 font-mono text-xs font-semibold">
                <Sparkles size={12} />
                <span>Production Rigor</span>
              </div>
            </div>

            {/* Chips Grid */}
            <div className="flex flex-wrap gap-2.5">
              {currentSkill.chips?.map((c) => {
                const isFeatured = currentSkill.featured?.includes(c);
                return (
                  <span
                    key={c}
                    className={`rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-all ${
                      isFeatured
                        ? "bg-[var(--color-ink)] text-[var(--color-paper)] shadow-sm scale-105"
                        : "border border-[var(--color-line)] bg-[var(--color-panel)] text-[var(--color-muted)] hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]"
                    }`}
                  >
                    {c}
                  </span>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Grid of All 4 Skill Domains with 3D Tilt Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {skills?.map((s) => {
          const Icon = ICONS[s.icon] || Wrench;
          return (
            <TiltCard key={s.title} maxTilt={6}>
              <div className="h-full rounded-[28px] border border-[var(--color-line)] bg-[var(--color-paper)] p-6 sm:p-7 transition-all hover:border-[var(--color-ink)]/50 shadow-sm">
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-panel)] text-[var(--color-ink)]">
                    <Icon size={18} strokeWidth={1.8} />
                  </span>
                  <h3 className="font-display text-lg font-medium text-[var(--color-ink)]">
                    {s.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {s.chips?.map((c) => {
                    const isFeatured = s.featured?.includes(c);
                    return (
                      <span
                        key={c}
                        className={`rounded-full px-3 py-1.5 text-[12px] sm:text-[13px] font-medium transition-colors ${
                          isFeatured
                            ? "bg-[var(--color-ink)] text-[var(--color-paper)]"
                            : "border border-[var(--color-line)] bg-[var(--color-panel)] text-[var(--color-muted)] hover:border-[var(--color-ink)]/40 hover:text-[var(--color-ink)]"
                        }`}
                      >
                        {c}
                      </span>
                    );
                  })}
                </div>
              </div>
            </TiltCard>
          );
        })}
      </div>
    </Section>
  );
}