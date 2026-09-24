import { useState, useEffect } from "react";
import { X, Calendar, MapPin, Award, CheckCircle2, ArrowRight, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { moments, momentFilters, profile } from "../data";
import { Section, SectionHeading } from "./Section";
import { TiltCard } from "./TiltCard";

export default function Moments() {
  const [active, setActive] = useState("all");
  const [selectedMoment, setSelectedMoment] = useState(null);

  const visible =
    active === "all"
      ? moments || []
      : (moments || []).filter((m) => m.category?.includes(active));

  // Handle ESC key to close modal & prevent background scrolling
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedMoment(null);
    };

    if (selectedMoment) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedMoment]);

  return (
    <Section id="moments">
      <SectionHeading
        kicker="Off the screen, in the arena"
        title="Moments &"
        accent="milestones"
        desc="Snapshots from national finals in Nairobi, hackathon podiums, stage pitches, and high-intensity systems coding sprints."
      />

      {/* Plata-Style Animated Sliding Pill Filter Tabs */}
      {momentFilters && momentFilters.length > 0 && (
        <div className="mb-10 flex flex-wrap items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-panel)] p-1.5 w-fit">
          {momentFilters.map((f) => {
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
                    layoutId="momentsActiveFilterPill"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-[var(--color-ink)] shadow-sm"
                  />
                )}
                <span className="relative z-10">{f.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Cards Grid with Plata-Style 3D Tilt */}
      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((m, idx) => (
            <motion.div
              key={m.title}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.2, 0.65, 0.3, 0.9], delay: idx * 0.04 }}
            >
              <TiltCard maxTilt={6} className="h-full">
                <article
                  onClick={() => setSelectedMoment(m)}
                  className="group flex h-full flex-col justify-between cursor-pointer overflow-hidden rounded-[28px] border border-[var(--color-line)] bg-[var(--color-panel)] transition-all duration-300 hover:border-[var(--color-ink)] hover:shadow-[0_20px_40px_-15px_rgba(20,20,19,0.12)]"
                >
                  <div>
                    <div className="relative overflow-hidden">
                      <img
                        src={m.image}
                        alt={m.title}
                        loading="lazy"
                        className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/15" />
                      <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-[var(--color-ink)]/90 px-3 py-1 font-mono text-[10px] text-[var(--color-paper)] opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100 shadow-sm">
                        <span>View story</span>
                        <ArrowRight size={10} />
                      </span>
                    </div>

                    <div className="p-5 sm:p-6">
                      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-muted)]">
                        {m.badge}
                      </p>
                      <h3 className="mt-2 font-display text-lg font-normal leading-snug text-[var(--color-ink)] transition-colors group-hover:text-black">
                        {m.title}
                      </h3>
                      <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-[var(--color-muted)]">
                        {m.text}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-0 sm:px-6 sm:pb-6">
                    <div className="flex flex-wrap gap-1.5 border-t border-[var(--color-line)]/60 pt-3">
                      {m.tags?.map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-[var(--color-line)] bg-[var(--color-paper)] px-2 py-0.5 font-mono text-[10px] text-[var(--color-muted)]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </TiltCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Plata-Style Modal Popup */}
      <AnimatePresence>
        {selectedMoment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMoment(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ scale: 0.94, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.94, y: 20, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.2, 0.65, 0.3, 0.9] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[32px] border border-[var(--color-line)] bg-[var(--color-panel)] p-6 sm:p-8 shadow-2xl"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedMoment(null)}
                aria-label="Close modal"
                className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-line)] bg-[var(--color-panel)] text-[var(--color-ink)] transition-transform hover:scale-105 hover:bg-[var(--color-paper)]"
              >
                <X size={18} />
              </button>

              {/* Event Media */}
              <div className="overflow-hidden rounded-2xl border border-[var(--color-line)] bg-black">
                <img
                  src={selectedMoment.image}
                  alt={selectedMoment.title}
                  className="aspect-video w-full object-cover"
                />
              </div>

              {/* Event Header & Metadata */}
              <div className="mt-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-line)] bg-[var(--color-paper)] px-3.5 py-1 font-mono text-[11px] uppercase tracking-wider text-[var(--color-muted)]">
                    <Award size={13} className="text-[var(--color-ink)]" />
                    {selectedMoment.badge}
                  </span>
                  {selectedMoment.date && (
                    <span className="inline-flex items-center gap-1 font-mono text-xs text-[var(--color-muted)]">
                      <Calendar size={12} />
                      {selectedMoment.date}
                    </span>
                  )}
                  {selectedMoment.location && (
                    <span className="inline-flex items-center gap-1 font-mono text-xs text-[var(--color-muted)]">
                      <MapPin size={12} />
                      {selectedMoment.location}
                    </span>
                  )}
                </div>

                <h3 className="mt-3 font-display text-2xl font-normal tracking-tight text-[var(--color-ink)] sm:text-3xl">
                  {selectedMoment.title}
                </h3>
              </div>

              {/* Story & Background */}
              <div className="mt-5 space-y-4 text-sm leading-relaxed text-[var(--color-muted)]">
                <div>
                  <h4 className="mb-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-[var(--color-ink)]">
                    The Event & Story
                  </h4>
                  <p>{selectedMoment.story || selectedMoment.text}</p>
                </div>

                {selectedMoment.roleAndImpact && (
                  <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-paper)] p-4">
                    <h4 className="mb-1 font-mono text-xs font-semibold uppercase tracking-wider text-[var(--color-ink)]">
                      My Role & System Impact
                    </h4>
                    <p className="text-[var(--color-ink)]/85">{selectedMoment.roleAndImpact}</p>
                  </div>
                )}

                {selectedMoment.achievements && selectedMoment.achievements.length > 0 && (
                  <div>
                    <h4 className="mb-2 font-mono text-xs font-semibold uppercase tracking-wider text-[var(--color-ink)]">
                      Key Outcomes & Milestones
                    </h4>
                    <ul className="space-y-2">
                      {selectedMoment.achievements.map((ach) => (
                        <li key={ach} className="flex items-start gap-2 text-sm text-[var(--color-ink)]/90">
                          <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[var(--color-ink)]" />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedMoment.tech && selectedMoment.tech.length > 0 && (
                  <div>
                    <h4 className="mb-2 font-mono text-xs font-semibold uppercase tracking-wider text-[var(--color-ink)]">
                      Technologies & Disciplines
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedMoment.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-lg border border-[var(--color-line)] bg-[var(--color-paper)] px-3 py-1 font-mono text-xs text-[var(--color-ink)]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Actions */}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--color-line)] pt-4">
                {profile.socials?.linkedin && (
                  <a
                    href={profile.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-xs text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
                  >
                    View full updates on LinkedIn
                    <ExternalLink size={12} />
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setSelectedMoment(null)}
                  className="rounded-full bg-[var(--color-ink)] px-5 py-2.5 text-sm font-medium text-[var(--color-paper)] transition-opacity hover:opacity-90"
                >
                  Close details
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}