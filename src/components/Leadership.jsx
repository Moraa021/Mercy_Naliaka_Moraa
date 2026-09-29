import { Mic, Sparkles, MapPin, ArrowRight, Presentation, Cpu, Users, Award } from "lucide-react";
import { motion } from "motion/react";
import { Section, SectionHeading } from "./Section";
import { TiltCard } from "./TiltCard";

export default function Leadership() {
  return (
    <Section id="leadership" className="bg-[var(--color-paper)] border-b border-[var(--color-line)]">
      <SectionHeading
        kicker="Stage talks & technical leadership"
        title="Beyond the code:"
        accent="speaking & leadership"
        desc="Articulating distributed architectures on stage, competing as national finalists, and mentoring developer teams in concurrency and defensive engineering."
      />

      <div className="grid gap-8 lg:grid-cols-[1.1fr_1.3fr] lg:items-center">
        {/* Left Column: Authentic Leadership Photo Showcase */}
        <div>
          <TiltCard maxTilt={4}>
            <div className="group relative overflow-hidden rounded-[32px] border border-[var(--color-line)] bg-[var(--color-panel)] p-3 sm:p-4 shadow-xl">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src="/assets/fireside-interview.jpg"
                  alt="Mercy Moraa - Interview: AI and software engineering"
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                {/* Floating Badges over Photo */}
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-ink)]/90 px-3.5 py-1.5 font-sans text-xs font-medium text-[var(--color-paper)] backdrop-blur-md shadow-md">
                    <Sparkles size={12} className="text-amber-400" />
                    <span>Fireside Keynote & Discussion</span>
                  </span>
                  <span className="inline-flex items-center gap-1 font-sans text-xs font-medium text-white/90 drop-shadow-sm">
                    <MapPin size={12} />
                    <span>Kisumu, Kenya</span>
                  </span>
                </div>
              </div>

              {/* Leadership Callout */}
              <div className="p-4 sm:p-5">
                <p className="font-sans text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">
                  Leadership Philosophy
                </p>
                <p className="mt-1.5 text-sm sm:text-[15px] font-medium leading-relaxed text-[var(--color-ink)] italic">
                  &ldquo;Software engineering leadership isn&apos;t just about what runs in the terminal—it&apos;s about how clearly you defend architectural decisions, mentor peers, and inspire teams to build with conviction.&rdquo;
                </p>
                <div className="mt-3 flex items-center justify-between border-t border-[var(--color-line)]/60 pt-3">
                  <span className="font-sans text-xs font-semibold text-[var(--color-ink)]">
                    Mercy Moraa
                  </span>
                  <span className="font-sans text-xs text-[var(--color-muted)]">
                    Software Engineer & Backend Developer
                  </span>
                </div>
              </div>
            </div>
          </TiltCard>
        </div>

        {/* Right Column: Stage Talks & Leadership Pillars */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-panel)] px-3.5 py-1 font-sans text-xs font-semibold uppercase tracking-wider text-[var(--color-ink)] shadow-2xs">
            <Mic size={13} className="text-amber-600" />
            <span>Interview: AI & Software Engineering</span>
          </div>

          <div>
            <h3 className="font-display text-2xl sm:text-3xl font-semibold leading-tight text-[var(--color-ink)]">
              Articulating Systems Architecture & Leading Technical Teams
            </h3>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-[var(--color-muted)]">
              When deploying generative models and high-throughput microservices, technical leadership requires ensuring zero hallucinations, deterministic contracts, and thread-safe concurrency. Whether presenting to national judging panels or mentoring developers, I bridge engineering execution with clear architectural vision.
            </p>
          </div>

          {/* 3 Leadership Pillars */}
          <div className="space-y-3.5">
            <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-panel)] p-4 transition-all hover:border-[var(--color-ink)]/30 shadow-2xs">
              <div className="flex items-start gap-3.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--color-paper)] text-[var(--color-ink)] border border-[var(--color-line)]/60">
                  <Presentation size={18} />
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-[var(--color-ink)]">
                    Stage Demonstrations & National Finals Pitching
                  </h4>
                  <p className="mt-1 text-xs sm:text-sm leading-relaxed text-[var(--color-muted)]">
                    Selected as a <strong>National Finalist</strong> at the Kenya AI Challenge in Nairobi and medalist at KijaniSpace Copernicus Hackathon. Fielded live architectural questions from agricultural scientists and venture leaders on sub-second API latency and domain-grounded pipelines.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-panel)] p-4 transition-all hover:border-[var(--color-ink)]/30 shadow-2xs">
              <div className="flex items-start gap-3.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--color-paper)] text-[var(--color-ink)] border border-[var(--color-line)]/60">
                  <Cpu size={18} />
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-[var(--color-ink)]">
                    Grounding AI in Resilient Backend Foundations
                  </h4>
                  <p className="mt-1 text-xs sm:text-sm leading-relaxed text-[var(--color-muted)]">
                    Led discussions on why non-deterministic LLMs demand deterministic foundations: low-latency Go worker pools, ACID-compliant PostgreSQL, and Neo4j GraphRAG pipelines that eradicate generative hallucinations.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-panel)] p-4 transition-all hover:border-[var(--color-ink)]/30 shadow-2xs">
              <div className="flex items-start gap-3.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--color-paper)] text-[var(--color-ink)] border border-[var(--color-line)]/60">
                  <Users size={18} />
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-[var(--color-ink)]">
                    Peer Mentorship & 100+ Code Audits
                  </h4>
                  <p className="mt-1 text-xs sm:text-sm leading-relaxed text-[var(--color-muted)]">
                    Completed 100+ peer code reviews and architectural audits at Zone01 Kisumu, mentoring fellow apprentices in concurrency primitives, race condition prevention, and zero-defect API design.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <motion.a
              href="#moments"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-ink)] px-5 py-2.5 text-xs sm:text-sm font-medium text-[var(--color-paper)] shadow-sm"
            >
              <Award size={14} className="text-amber-400" />
              <span>Watch Nairobi Stage Pitch & Milestones</span>
              <ArrowRight size={13} />
            </motion.a>

            <motion.a
              href="#works"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-panel)] px-4 py-2.5 text-xs sm:text-sm font-medium text-[var(--color-ink)] transition-colors hover:border-[var(--color-ink)] shadow-2xs"
            >
              <span>Explore Featured Systems</span>
            </motion.a>
          </div>
        </div>
      </div>
    </Section>
  );
}
