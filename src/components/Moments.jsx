import { useState, useEffect, useRef } from "react";
import { X, Calendar, MapPin, Award, CheckCircle2, ArrowRight, ExternalLink, Play, Sparkles, ChevronUp, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { moments, reel, profile } from "../data";
import { Section, SectionHeading } from "./Section";
import { TiltCard } from "./TiltCard";

const MOMENT_FILTERS = [
  { key: "all", label: "All Milestones" },
  { key: "awards", label: "Finals & Hackathons" },
  { key: "talks", label: "Stage Talks & Pitches" },
  { key: "sprints", label: "Systems Sprints" },
];

export default function Moments() {
  const [active, setActive] = useState("all");
  const [selectedMoment, setSelectedMoment] = useState(null);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      const step = dir === "up" ? -460 : 460;
      scrollRef.current.scrollBy({ top: step, behavior: "smooth" });
    }
  };

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
    <Section id="moments" className="bg-[var(--color-panel)] border-b border-[var(--color-line)]">
      <SectionHeading
        kicker="Milestones & stage talks"
        title="Milestones &"
        accent="Stage Pitches"
        desc="National finals in Nairobi, hackathon podiums, stage demonstrations, and high-intensity systems engineering sprints."
      />

      {/* Featured Stage Pitch Reel Card */}
      {reel && (
        <div className="mb-12">
          <TiltCard maxTilt={3}>
            <div className="overflow-hidden rounded-[32px] border border-[var(--color-line)] bg-[var(--color-ink)] shadow-xl grid lg:grid-cols-[1.3fr_1fr] items-center">
              <div className="relative aspect-video">
                {videoPlaying ? (
                  <video
                    controls
                    playsInline
                    autoPlay
                    poster={reel.poster}
                    className="h-full w-full object-cover"
                  >
                    {reel.sources?.map((s) => (
                      <source key={s} src={s} type="video/mp4" />
                    ))}
                    Your browser does not support HTML5 video.
                  </video>
                ) : (
                  <button
                    type="button"
                    onClick={() => setVideoPlaying(true)}
                    className="group relative block h-full w-full text-left"
                    aria-label="Play Kenya AI Challenge stage pitch reel"
                  >
                    <img
                      src={reel.poster}
                      alt={reel.title || "Stage presentation reel"}
                      className="h-full w-full object-cover opacity-85 transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[var(--color-ink)]/40 backdrop-blur-[2px]">
                      <motion.span
                        whileHover={{ scale: 1.12 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-paper)] shadow-lg"
                      >
                        <Play size={24} className="ml-1 text-[var(--color-ink)]" />
                      </motion.span>
                      <span className="font-sans text-xs text-[var(--color-paper)] font-semibold">
                        Watch Stage Pitch (Nairobi Finals)
                      </span>
                    </span>
                  </button>
                )}
              </div>

              <div className="p-6 sm:p-8 text-[var(--color-paper)]">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 font-sans text-xs uppercase tracking-wider text-amber-300 mb-3 border border-white/10 font-semibold">
                  <Sparkles size={11} />
                  <span>National Finalist Pitch</span>
                </div>
                <h3 className="font-display text-2xl font-normal leading-tight">
                  {reel.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-stone-300 leading-relaxed">
                  {reel.subtitle}
                </p>
                <div className="mt-5 space-y-2 text-xs text-stone-300">
                  <div className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span>Neo4j GraphRAG pipeline eliminating LLM hallucinations</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span>Low-latency FastAPI services serving English & Swahili</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span>Live pitch before agricultural scientists and tech leaders</span>
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>
        </div>
      )}

      {/* Filter Tabs & Scroll Navigation Controls */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-panel)] p-1.5 w-fit">
          {MOMENT_FILTERS.map((f) => {
            const isActive = active === f.key;
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => setActive(f.key)}
                className={`relative rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-colors ${
                  isActive
                    ? "text-[var(--color-paper)] font-semibold"
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

        {/* Scroll Chevrons for Up/Down */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scroll("up")}
            aria-label="Scroll milestones up"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-line)] bg-[var(--color-paper)] text-[var(--color-ink)] transition-colors hover:border-[var(--color-ink)] hover:bg-[var(--color-panel)] shadow-2xs cursor-pointer"
          >
            <ChevronUp size={16} />
          </button>
          <button
            type="button"
            onClick={() => scroll("down")}
            aria-label="Scroll milestones down"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-line)] bg-[var(--color-paper)] text-[var(--color-ink)] transition-colors hover:border-[var(--color-ink)] hover:bg-[var(--color-panel)] shadow-2xs cursor-pointer"
          >
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      {/* 3x2 Vertically Scrollable Grid for Milestones */}
      <div
        ref={scrollRef}
        className="custom-scrollbar max-h-[860px] overflow-y-auto pr-2 pb-4 scroll-smooth focus:outline-none"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {visible.map((m, idx) => (
              <motion.div
                key={m.title}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: [0.2, 0.65, 0.3, 0.9], delay: idx * 0.04 }}
                className="h-full"
              >
                <TiltCard maxTilt={5} className="h-full">
                  <article
                    onClick={() => setSelectedMoment(m)}
                    className="group flex h-full flex-col justify-between cursor-pointer overflow-hidden rounded-[26px] border border-[var(--color-line)] bg-[var(--color-panel)] transition-all duration-300 hover:border-[var(--color-ink)] hover:shadow-[0_20px_40px_-15px_rgba(20,20,19,0.12)]"
                  >
                    <div>
                      <div className="relative overflow-hidden aspect-[16/10]">
                        <img
                          src={m.image}
                          alt={m.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/15" />
                        <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-[var(--color-ink)]/90 px-3 py-1 font-sans text-xs text-[var(--color-paper)] opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100 shadow-sm font-medium">
                          <span>View story</span>
                          <ArrowRight size={10} />
                        </span>
                      </div>

                      <div className="p-5 sm:p-6">
                        <p className="font-sans text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">
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
                            className="rounded-md border border-[var(--color-line)] bg-[var(--color-paper)] px-2 py-0.5 font-sans text-xs font-medium text-[var(--color-muted)]"
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
        </div>
      </div>

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
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-line)] bg-[var(--color-paper)] px-3.5 py-1 font-sans text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">
                    <Award size={13} className="text-[var(--color-ink)]" />
                    {selectedMoment.badge}
                  </span>
                  {selectedMoment.date && (
                    <span className="inline-flex items-center gap-1 font-sans text-xs font-medium text-[var(--color-muted)]">
                      <Calendar size={12} />
                      {selectedMoment.date}
                    </span>
                  )}
                  {selectedMoment.location && (
                    <span className="inline-flex items-center gap-1 font-sans text-xs font-medium text-[var(--color-muted)]">
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
                  <h4 className="mb-1.5 font-sans text-xs font-semibold uppercase tracking-wider text-[var(--color-ink)]">
                    The Event & Story
                  </h4>
                  <p>{selectedMoment.story || selectedMoment.text}</p>
                </div>

                {selectedMoment.roleAndImpact && (
                  <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-paper)] p-4">
                    <h4 className="mb-1 font-sans text-xs font-semibold uppercase tracking-wider text-[var(--color-ink)]">
                      My Role & System Impact
                    </h4>
                    <p className="text-[var(--color-ink)]/85">{selectedMoment.roleAndImpact}</p>
                  </div>
                )}

                {selectedMoment.achievements && selectedMoment.achievements.length > 0 && (
                  <div>
                    <h4 className="mb-2 font-sans text-xs font-semibold uppercase tracking-wider text-[var(--color-ink)]">
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
                    <h4 className="mb-2 font-sans text-xs font-semibold uppercase tracking-wider text-[var(--color-ink)]">
                      Technologies & Disciplines
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedMoment.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-lg border border-[var(--color-line)] bg-[var(--color-paper)] px-3 py-1 font-sans text-xs font-medium text-[var(--color-ink)]"
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
                    className="inline-flex items-center gap-2 font-sans text-xs font-semibold text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
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