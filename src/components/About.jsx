import { Target, Link2, Sparkles } from "lucide-react";
import { pillars, quickFacts } from "../data";
import { Section, SectionHeading } from "./Section";
import { TiltCard } from "./TiltCard";

const ICONS = { target: Target, link: Link2 };

export default function About() {
  return (
    <Section id="about">
      <SectionHeading kicker="Philosophy" title="Minimal, concurrent," accent="and grounded" />

      <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16 items-start">
        <div>
          <p className="text-lg leading-relaxed text-[var(--color-ink)]/85">
            I build for performance, reliability, and domain grounding. Graduated from Maseno
            University in ICT Management, sharpened by an intensive Go systems apprenticeship at{" "}
            <strong className="font-semibold text-[var(--color-ink)]">Zone01 Kisumu</strong>.
          </p>
          <p className="mt-4 leading-relaxed text-[var(--color-muted)]">
            I specialize in bridging high-throughput backend infrastructure with applied artificial
            intelligence: optimizing Go routines for memory safety, and grounding LLMs with Neo4j
            knowledge graphs to prevent hallucinations in agricultural advisories. Software should be
            fast, explainable, and resilient.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {pillars.map((p) => {
              const IconComponent = ICONS[p.icon] || Target;
              return (
                <TiltCard key={p.title} maxTilt={6}>
                  <div className="h-full rounded-[28px] border border-[var(--color-line)] bg-[var(--color-panel)] p-6 sm:p-7 transition-all hover:border-[var(--color-ink)]/40 shadow-sm">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--color-paper)] text-[var(--color-ink)] shadow-xs">
                      <IconComponent size={20} strokeWidth={1.8} />
                    </span>
                    <h3 className="mt-5 font-display text-lg font-medium">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{p.text}</p>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </div>

        <TiltCard maxTilt={5}>
          <div className="rounded-[32px] border border-[var(--color-line)] bg-[var(--color-ink)] p-7 sm:p-9 text-[var(--color-paper)] shadow-xl">
            <div className="mb-4 flex items-center gap-2 font-mono text-xs text-[var(--color-paper)]/60 uppercase tracking-widest border-b border-[var(--color-paper)]/15 pb-4">
              <Sparkles size={13} className="text-amber-300" />
              <span>Technical Quick Profile</span>
            </div>
            <dl className="flex flex-col divide-y divide-[var(--color-paper)]/10">
              {quickFacts.map((f) => (
                <div key={f.label} className="py-4 first:pt-1 last:pb-0">
                  <dt className="font-mono text-[11px] uppercase tracking-wide text-[var(--color-paper)]/50">
                    {f.label}
                  </dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-stone-200">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </TiltCard>
      </div>
    </Section>
  );
}