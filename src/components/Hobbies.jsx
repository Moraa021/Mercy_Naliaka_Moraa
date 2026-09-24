import { hobbies } from "../data";
import { Section, SectionHeading } from "./Section";
import { TiltCard } from "./TiltCard";

export default function Hobbies() {
  return (
    <Section id="hobbies">
      <SectionHeading kicker="Off duty" title="Outside" accent="the codebase" />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {hobbies && hobbies.length > 0 ? (
          hobbies.map((h) => (
            <TiltCard key={h.title} maxTilt={6}>
              <div className="group h-full overflow-hidden rounded-[28px] border border-[var(--color-line)] bg-[var(--color-panel)] transition-all duration-300 hover:border-[var(--color-ink)]/50 shadow-sm">
                <div className="overflow-hidden">
                  <img
                    src={h.image}
                    alt={h.title}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-medium text-[var(--color-ink)]">
                    {h.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                    {h.text}
                  </p>
                </div>
              </div>
            </TiltCard>
          ))
        ) : null}
      </div>
    </Section>
  );
}