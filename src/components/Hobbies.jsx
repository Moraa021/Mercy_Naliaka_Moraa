import { useRef } from "react";
import { ChevronLeft, ChevronRight, GitPullRequest, BookOpen, Activity } from "lucide-react";
import { hobbies } from "../data";
import { Section, SectionHeading } from "./Section";
import { TiltCard } from "./TiltCard";

const HOBBY_ICONS = {
  "Open-source contribution": GitPullRequest,
  "Technical writing": BookOpen,
  "Playing soccer": Activity,
};

export default function Hobbies() {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      const step = dir === "left" ? -scrollRef.current.clientWidth * 0.75 : scrollRef.current.clientWidth * 0.75;
      scrollRef.current.scrollBy({ left: step, behavior: "smooth" });
    }
  };

  return (
    <Section id="hobbies">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <SectionHeading kicker="Life outside code" title="Outside" accent="the codebase" className="!mb-0" />

        {/* Scroll Chevrons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Scroll hobbies left"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-line)] bg-[var(--color-paper)] text-[var(--color-ink)] transition-colors hover:border-[var(--color-ink)] hover:bg-[var(--color-panel)] shadow-2xs"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Scroll hobbies right"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-line)] bg-[var(--color-paper)] text-[var(--color-ink)] transition-colors hover:border-[var(--color-ink)] hover:bg-[var(--color-panel)] shadow-2xs"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-4 pt-2 snap-x snap-mandatory scroll-smooth no-scrollbar"
      >
        {hobbies && hobbies.length > 0
          ? hobbies.map((h) => {
              const HobbyIcon = HOBBY_ICONS[h.title] || Activity;
              return (
                <div key={h.title} className="w-[80vw] sm:w-[320px] lg:w-[360px] shrink-0 snap-start">
                  <TiltCard maxTilt={5} className="h-full">
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
                        <div className="flex items-center gap-2.5 mb-2">
                          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-paper)] border border-[var(--color-line)] text-[var(--color-ink)] shrink-0">
                            <HobbyIcon size={14} />
                          </span>
                          <h3 className="font-display text-lg font-medium text-[var(--color-ink)]">
                            {h.title}
                          </h3>
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                          {h.text}
                        </p>
                      </div>
                    </div>
                  </TiltCard>
                </div>
              );
            })
          : null}
      </div>
    </Section>
  );
}