import { useState } from "react";
import { Play, Target, Network, Smartphone } from "lucide-react";
import { motion } from "motion/react";
import { reel } from "../data";
import { Section, SectionHeading } from "./Section";
import { TiltCard } from "./TiltCard";

const ICONS = { target: Target, network: Network, device: Smartphone };

export default function Reel() {
  const [playing, setPlaying] = useState(false);

  return (
    <Section id="reel" className="bg-[var(--color-panel)]">
      <SectionHeading
        kicker="Pitch reel and stage talks"
        title="In action:"
        accent="the reel"
        desc="System architectures, agritech pitches, and engineering discussions, in the moment."
      />

      <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <TiltCard maxTilt={5}>
          <div className="overflow-hidden rounded-[32px] border border-[var(--color-line)] bg-[var(--color-ink)] shadow-xl">
            <div className="relative aspect-video">
              {playing ? (
                <video
                  controls
                  playsInline
                  autoPlay
                  poster={reel?.poster}
                  className="h-full w-full object-cover"
                >
                  {reel?.sources?.map((s) => (
                    <source key={s} src={s} type="video/mp4" />
                  ))}
                  Your browser does not support HTML5 video.
                </video>
              ) : (
                <button
                  onClick={() => setPlaying(true)}
                  className="group relative block h-full w-full text-left"
                  aria-label="Play presentation reel"
                >
                  <img
                    src={reel?.poster}
                    alt={reel?.title || "Presentation reel"}
                    className="h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
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
                    <span className="font-sans text-xs text-[var(--color-paper)] font-medium">
                      Play presentation reel
                    </span>
                  </span>
                </button>
              )}
            </div>
            <div className="px-6 py-4 border-t border-white/10">
              <p className="text-sm font-medium text-[var(--color-paper)]">{reel?.title}</p>
              <p className="mt-0.5 text-xs text-[var(--color-paper)]/60">{reel?.subtitle}</p>
            </div>
          </div>
        </TiltCard>

        {reel?.companion && (
          <TiltCard maxTilt={5}>
            <div className="h-full rounded-[32px] border border-[var(--color-line)] bg-[var(--color-paper)] p-3 sm:p-4 shadow-sm">
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={reel.companion.image}
                  alt={reel.companion.title}
                  loading="lazy"
                  className="aspect-video w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="p-5 sm:p-6">
                <p className="font-sans text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">
                  {reel.companion.eyebrow}
                </p>
                <h3 className="mt-2 font-display text-lg sm:text-xl font-medium text-[var(--color-ink)]">
                  {reel.companion.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                  {reel.companion.text}
                </p>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {reel.companion.topics?.map((t) => (
                    <li key={t.label} className="text-sm leading-relaxed">
                      <strong className="font-medium text-[var(--color-ink)]">
                        {t.label}:
                      </strong>{" "}
                      <span className="text-[var(--color-muted)]">{t.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TiltCard>
        )}
      </div>

      {reel?.bullets && reel.bullets.length > 0 && (
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {reel.bullets.map((b) => {
            const Icon = ICONS[b.icon] || Target;
            return (
              <TiltCard key={b.label} maxTilt={5}>
                <div className="h-full rounded-[24px] border border-[var(--color-line)] bg-[var(--color-paper)] p-5 transition-all hover:border-[var(--color-ink)]/40 shadow-xs">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-panel)] text-[var(--color-ink)]">
                    <Icon size={18} strokeWidth={1.8} />
                  </span>
                  <p className="mt-3 text-sm font-medium text-[var(--color-ink)]">{b.label}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-muted)]">
                    {b.text}
                  </p>
                </div>
              </TiltCard>
            );
          })}
        </div>
      )}
    </Section>
  );
}