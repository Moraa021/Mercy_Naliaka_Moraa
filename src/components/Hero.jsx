import { Mail, ArrowRight, Play, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { profile } from "../data";
import { GithubIcon, LinkedinIcon, XIcon } from "./BrandIcons";
import AnimeAvatar from "./AnimeAvatar";
import { KineticTitle, RotatingKineticBadge } from "./KineticText";
import { TiltCard } from "./TiltCard";

export default function Hero() {
  const mailtoUrl = profile.email ? `mailto:${profile.email}` : "#";

  return (
    <section id="hero" className="relative overflow-hidden">
      {/* Background Glow Elements */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] h-[560px] w-[560px] rounded-full bg-black opacity-[0.04] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 left-[-8%] h-[420px] w-[420px] rounded-full opacity-[0.18] blur-3xl"
        style={{ background: "radial-gradient(circle, #dfd7cb, transparent 70%)" }}
      />

      <div className="mx-auto grid w-full max-w-[1440px] gap-12 px-5 pt-14 pb-16 sm:px-8 sm:pt-20 sm:pb-24 lg:grid-cols-[1.35fr_1fr] lg:items-center lg:pt-24">
        <div>
          {/* Availability & Plata-Style Kinetic Rotating Badge */}
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-panel)] px-4 py-1.5 font-mono text-[12px] uppercase tracking-wider text-[var(--color-muted)] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for work</span>
            </div>

            <RotatingKineticBadge
              prefix="SYSTEM FOCUS"
              words={[
                "Go Concurrency",
                "GraphRAG AI",
                "Idempotent APIs",
                "Memory Safety",
                "Zero-Defect QA",
              ]}
            />
          </div>

          {/* Plata-Style Kinetic Main Headline */}
          <div className="font-display text-[12vw] font-bold leading-[0.98] tracking-[-0.03em] sm:text-6xl md:text-7xl lg:text-[80px]">
            <KineticTitle text="Software engineer," as="span" />
            <br />
            <span className="font-bold text-[var(--color-ink)]">
              <KineticTitle text="systems minded." as="span" delay={0.25} />
            </span>
          </div>

          {/* Full-Body Anime Miniature */}
          <AnimeAvatar />

          {/* Intro Bio */}
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-[var(--color-muted)]">
            {profile.bio}
          </p>

          {/* Plata-Style Spring Action CTAs */}
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <motion.a
              href="#works"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="group flex items-center gap-2 rounded-full bg-[var(--color-ink)] px-6 py-3.5 text-sm font-medium text-[var(--color-paper)] shadow-sm"
            >
              <span>Explore selected works</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </motion.a>
            <motion.a
              href="#impact-slider"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-panel)] px-5 py-3.5 text-sm font-medium text-[var(--color-ink)] transition-colors hover:border-[var(--color-ink)]"
            >
              <Sparkles size={14} className="text-[var(--color-ink)]" />
              <span>Field impact</span>
            </motion.a>
            <motion.a
              href="#reel"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="flex items-center gap-2 rounded-full border border-[var(--color-line)] px-5 py-3.5 text-sm font-medium transition-colors hover:border-[var(--color-ink)]"
            >
              <Play size={14} />
              <span>Watch pitch reel</span>
            </motion.a>
          </div>

          {/* Social Icons Bar */}
          <div className="mt-10 flex items-center gap-4 text-[var(--color-ink)]/70">
            {profile.socials?.linkedin && (
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn Profile"
                className="transition-colors hover:text-[var(--color-ink)]"
              >
                <LinkedinIcon className="h-5 w-5" />
              </a>
            )}
            {profile.socials?.github && (
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Profile"
                className="transition-colors hover:text-[var(--color-ink)]"
              >
                <GithubIcon className="h-5 w-5" />
              </a>
            )}
            {profile.socials?.x && (
              <a
                href={profile.socials.x}
                target="_blank"
                rel="noreferrer"
                aria-label="X (Twitter) Profile"
                className="transition-colors hover:text-[var(--color-ink)]"
              >
                <XIcon className="h-4.5 w-4.5" />
              </a>
            )}
            <a
              href={mailtoUrl}
              aria-label="Send Email"
              className="transition-colors hover:text-[var(--color-ink)]"
            >
              <Mail size={19} strokeWidth={1.8} />
            </a>
          </div>
        </div>

        {/* Hero Photo & Location Card */}
        <div className="lg:justify-self-end">
          <TiltCard maxTilt={8} className="relative mx-auto max-w-[340px]">
            <div className="overflow-hidden rounded-3xl border border-[var(--color-line)] bg-[var(--color-panel)] shadow-[0_20px_50px_-25px_rgba(20,20,19,0.18)]">
              <img
                src="/assets/hero-cover.jpg"
                alt={profile.name}
                className="aspect-[4/5] w-full object-cover object-top transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="mt-4 rounded-2xl border border-[var(--color-line)] bg-[var(--color-panel)] px-4 py-3 shadow-sm">
              <p className="font-mono text-[11px] uppercase tracking-wide text-[var(--color-muted)]">
                Based in
              </p>
              <p className="mt-0.5 text-sm font-medium text-[var(--color-ink)]">
                {profile.location}
              </p>
            </div>
          </TiltCard>
        </div>
      </div>

      {/* Recognition Banner */}
      {profile.awards && profile.awards.length > 0 && (
        <div className="border-y border-[var(--color-line)] bg-[var(--color-panel)]/80">
          <div className="mx-auto flex w-full max-w-[1440px] flex-wrap items-center gap-x-6 gap-y-2 px-5 py-3.5 sm:px-8">
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--color-ink)]">
              Recognition
            </span>
            <span className="text-[var(--color-line)]">/</span>
            {profile.awards.map((award, i) => (
              <span key={award} className="flex items-center gap-6 text-sm text-[var(--color-muted)]">
                <span>{award}</span>
                {i !== profile.awards.length - 1 && (
                  <span className="text-[var(--color-line)]">&middot;</span>
                )}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}