import { useState } from "react";
import { ArrowUpRight, BookOpen, Clock, Calendar, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { articles, profile } from "../data";
import { Section, SectionHeading } from "./Section";
import { TiltCard } from "./TiltCard";

export default function Writings() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const articlesList = articles || [];

  const CATEGORIES = [
    { key: "all", label: `All articles (${articlesList.length})` },
    { key: "ai", label: "AI & GraphRAG" },
    { key: "systems", label: "Systems & Go" },
    { key: "qa", label: "QA & Testing" },
    { key: "git", label: "Git & Security" },
    { key: "bitcoin", label: "Bitcoin" },
  ];

  const filteredArticles = articlesList.filter((a) => {
    if (selectedCategory === "all") return true;
    const tags = (a.tags || []).map((t) => t.toLowerCase());

    if (selectedCategory === "ai")
      return tags.some((t) => t.includes("ai") || t.includes("rag"));
    if (selectedCategory === "systems")
      return tags.some((t) => t.includes("go") || t.includes("systems"));
    if (selectedCategory === "qa")
      return tags.some((t) => t.includes("qa") || t.includes("testing"));
    if (selectedCategory === "git")
      return tags.some((t) => t.includes("git") || t.includes("security"));
    if (selectedCategory === "bitcoin")
      return tags.some((t) => t.includes("bitcoin") || t.includes("blockchain"));
    return true;
  });

  const devtoUrl = profile?.socials?.devto || "https://dev.to/memoraa";

  return (
    <Section id="writing" className="bg-[var(--color-panel)]">
      <SectionHeading
        kicker="Technical writing on dev.to"
        title="Articles &"
        accent="engineering notes"
        desc={
          <>
            Real-world technical breakthroughs, systems debugging, and architectural explorations published on{" "}
            <a
              href={devtoUrl}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-[var(--color-ink)] underline decoration-[var(--color-line)] underline-offset-4 hover:decoration-[var(--color-ink)]"
            >
              dev.to/memoraa
            </a>
            .
          </>
        }
      />

      {/* Plata-Style Animated Sliding Pill Filter */}
      <div className="mb-10 flex flex-wrap items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-paper)] p-1.5 w-fit">
        {CATEGORIES.map((c) => {
          const isActive = selectedCategory === c.key;
          return (
            <button
              key={c.key}
              type="button"
              onClick={() => setSelectedCategory(c.key)}
              className={`relative rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-colors ${
                isActive
                  ? "text-[var(--color-paper)]"
                  : "text-[var(--color-muted)] hover:text-[var(--color-ink)]"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="writingCategoryPill"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="absolute inset-0 rounded-full bg-[var(--color-ink)] shadow-sm"
                />
              )}
              <span className="relative z-10">{c.label}</span>
            </button>
          );
        })}
      </div>

      {/* Articles Grid with Plata-Style 3D Tilt */}
      <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredArticles.map((a, idx) => (
            <motion.div
              key={a.title}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.2, 0.65, 0.3, 0.9], delay: idx * 0.04 }}
            >
              <TiltCard maxTilt={6} className="h-full">
                <a
                  href={a.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-full cursor-pointer flex-col justify-between overflow-hidden rounded-[28px] border border-[var(--color-line)] bg-[var(--color-paper)] p-6 transition-all duration-300 hover:border-[var(--color-ink)] hover:shadow-[0_20px_40px_-15px_rgba(20,20,19,0.12)]"
                >
                  <div>
                    {/* Cover Image Preview */}
                    {a.image && (
                      <div className="mb-4 overflow-hidden rounded-2xl border border-[var(--color-line)]/60 bg-black/5">
                        <img
                          src={a.image}
                          alt={a.title}
                          loading="lazy"
                          className="aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    )}

                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-muted)]">
                        {a.tag}
                      </span>
                      <div className="flex items-center gap-2 font-mono text-xs text-[var(--color-muted)]">
                        {a.readingTime && (
                          <span className="flex items-center gap-1">
                            <Clock size={11} />
                            {a.readingTime}
                          </span>
                        )}
                        {a.date && (
                          <span className="flex items-center gap-1">
                            <Calendar size={11} />
                            {a.date}
                          </span>
                        )}
                      </div>
                    </div>

                    <h3 className="mt-3 font-display text-lg font-medium leading-snug text-[var(--color-ink)] group-hover:text-black">
                      {a.title}
                    </h3>

                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[var(--color-muted)]">
                      {a.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-[var(--color-line)]/60 pt-4">
                    {a.tags && a.tags.length > 0 && (
                      <div className="mb-3 flex flex-wrap gap-1">
                        {a.tags.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="rounded-md border border-[var(--color-line)] bg-[var(--color-panel)] px-2 py-0.5 font-mono text-[10px] text-[var(--color-muted)]"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between text-xs font-medium text-[var(--color-ink)]">
                      <span className="font-mono group-hover:underline">
                        Read full article on Dev.to
                      </span>
                      <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--color-line)] bg-[var(--color-panel)] transition-colors group-hover:border-[var(--color-ink)] group-hover:bg-[var(--color-ink)] group-hover:text-[var(--color-paper)]">
                        <ArrowUpRight size={13} />
                      </span>
                    </div>
                  </div>
                </a>
              </TiltCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Dev.to Author Callout Banner with Spring Button */}
      <div className="mt-10 flex flex-col items-center justify-between gap-6 rounded-[32px] border border-[var(--color-line)] bg-[var(--color-paper)] p-6 sm:flex-row sm:p-8">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-ink)] text-[var(--color-paper)]">
            <BookOpen size={22} />
          </div>
          <div>
            <h4 className="font-display text-lg font-medium text-[var(--color-ink)]">
              Follow @memoraa on Dev.to
            </h4>
            <p className="text-sm text-[var(--color-muted)]">
              Read all technical write-ups, code walkthroughs, and engineering notes.
            </p>
          </div>
        </div>

        <motion.a
          href={devtoUrl}
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex shrink-0 items-center gap-2 rounded-full bg-[var(--color-ink)] px-6 py-3 text-sm font-medium text-[var(--color-paper)] shadow-sm"
        >
          <span>View all on Dev.to</span>
          <ExternalLink size={14} />
        </motion.a>
      </div>
    </Section>
  );
}