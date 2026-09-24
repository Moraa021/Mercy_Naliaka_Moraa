import { journey } from "../data";
import { Section, SectionHeading } from "./Section";
import { TiltCard } from "./TiltCard";
import { Sparkles } from "lucide-react";

export default function Journey() {
  return (
    <Section id="journey" className="bg-[var(--color-panel)]">
      <SectionHeading
        kicker="The path"
        title="Journey"
        accent="so far"
        desc="Practical software engineering experience, systems apprenticeships, and academic grounding."
      />

      <div className="relative border-l border-[var(--color-line)] pl-6 sm:pl-10 ml-3 sm:ml-6 space-y-8 sm:space-y-10">
        {journey.map((j, i) => (
          <div key={j.role + j.period} className="relative">
            {/* Timeline Number Node */}
            <span
              className={`absolute -left-[35px] sm:-left-[51px] top-1.5 flex h-7 w-7 items-center justify-center rounded-full border-2 font-mono text-xs font-semibold shadow-sm transition-transform hover:scale-110 ${
                j.featured
                  ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-paper)]"
                  : "border-[var(--color-line)] bg-[var(--color-paper)] text-[var(--color-muted)]"
              }`}
            >
              {i + 1}
            </span>

            <TiltCard maxTilt={5}>
              <div
                className={`rounded-[28px] border p-6 sm:p-7 transition-all shadow-sm ${
                  j.featured
                    ? "border-[var(--color-ink)]/50 bg-[var(--color-paper)] shadow-md"
                    : "border-[var(--color-line)] bg-[var(--color-paper)]"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-muted)]">
                    {j.period}
                  </span>
                  {j.badge && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-[var(--color-line)] bg-[var(--color-panel)] px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-[var(--color-ink)]">
                      {j.featured && <Sparkles size={10} className="text-amber-500" />}
                      {j.badge}
                    </span>
                  )}
                </div>

                <h3 className="mt-3 font-display text-xl sm:text-2xl font-normal text-[var(--color-ink)]">
                  {j.role}
                </h3>
                <p className="font-serif italic text-sm text-[var(--color-ink)]/80">
                  {j.company} &middot; <span className="not-italic font-mono text-xs">{j.location}</span>
                </p>

                <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
                  {j.summary}
                </p>

                {j.skills && j.skills.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5 pt-3 border-t border-[var(--color-line)]/60">
                    {j.skills.map((s) => (
                      <span
                        key={s}
                        className="rounded-md border border-[var(--color-line)] bg-[var(--color-panel)] px-2.5 py-1 font-mono text-[10px] text-[var(--color-muted)]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </TiltCard>
          </div>
        ))}
      </div>
    </Section>
  );
}
