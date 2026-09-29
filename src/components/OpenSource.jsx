import { Star, ExternalLink, GitPullRequest } from "lucide-react";
import { motion } from "motion/react";
import { openSourceProjects, profile } from "../data";
import { Section, SectionHeading } from "./Section";
import { GithubIcon, BitcoinIcon } from "./BrandIcons";
import { TiltCard } from "./TiltCard";

export default function OpenSource() {
  return (
    <Section id="opensource" className="bg-[var(--color-panel)] border-b border-[var(--color-line)]">
      <SectionHeading
        kicker="Open source contributions"
        title="Open Source"
        accent="contributions"
        desc="Verifiable public contributions: an upstream merged pull request on the web's largest developer API repository and an experimental Bitcoin Lightning payment gateway."
      />

      {/* 2-Card Layout for the two verified projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {openSourceProjects.map((repo) => {
          const isPR = repo.isPr || repo.repoUrl?.includes("pull");

          return (
            <TiltCard key={repo.name} maxTilt={5} className="h-full">
              <a
                href={repo.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col justify-between rounded-[28px] border border-[var(--color-line)] bg-[var(--color-paper)] p-6 sm:p-8 transition-all duration-300 hover:border-[var(--color-ink)] hover:shadow-[0_20px_40px_-15px_rgba(20,20,19,0.12)]"
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--color-line)] bg-[var(--color-panel)] text-[var(--color-ink)] shrink-0 shadow-2xs">
                        {isPR ? (
                          <GitPullRequest size={20} strokeWidth={2} />
                        ) : (
                          <BitcoinIcon className="h-5 w-5 text-[var(--color-ink)]" />
                        )}
                      </span>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-sans text-sm font-semibold text-[var(--color-ink)]">
                            {repo.name}
                          </span>
                          <span className="inline-flex items-center rounded-full bg-[var(--color-ink)] px-2.5 py-0.5 font-sans text-[11px] font-medium text-[var(--color-paper)]">
                            {repo.type}
                          </span>
                        </div>
                        <span className="font-sans text-xs text-[var(--color-muted)]">
                          {repo.language}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {repo.stars > 0 && (
                        <span className="inline-flex items-center gap-1 font-sans text-xs font-semibold text-[var(--color-muted)]">
                          <Star size={13} className="text-amber-500 fill-amber-500" />
                          {repo.stars > 1000 ? `${(repo.stars / 1000).toFixed(0)}k+` : repo.stars}
                        </span>
                      )}
                      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-line)] text-[var(--color-ink)] transition-colors group-hover:border-[var(--color-ink)] group-hover:bg-[var(--color-panel)]">
                        <ExternalLink size={13} />
                      </span>
                    </div>
                  </div>

                  <h3 className="mt-5 font-display text-xl font-semibold leading-snug text-[var(--color-ink)] transition-colors group-hover:text-black">
                    {repo.title}
                  </h3>

                  <p className="mt-2.5 text-sm leading-relaxed text-[var(--color-muted)]">
                    {repo.description}
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-2 border-t border-[var(--color-line)]/70 pt-4">
                  {repo.tags?.map((t) => (
                    <span
                      key={t}
                      className="rounded-lg border border-[var(--color-line)] bg-[var(--color-panel)] px-2.5 py-1 font-sans text-xs font-medium text-[var(--color-muted)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </a>
            </TiltCard>
          );
        })}
      </div>

      {/* GitHub Profile Banner */}
      <div className="mt-10 flex flex-col items-center justify-between gap-6 rounded-[32px] border border-[var(--color-line)] bg-[var(--color-paper)] p-6 sm:flex-row sm:p-8 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-ink)] text-[var(--color-paper)] shadow-xs">
            <GithubIcon className="h-6 w-6" />
          </div>
          <div>
            <h4 className="font-display text-lg font-medium text-[var(--color-ink)]">
              Explore all repositories on GitHub
            </h4>
            <p className="text-sm text-[var(--color-muted)]">
              Open-source contributions, Bitcoin Core experiments, and concurrent Go systems.
            </p>
          </div>
        </div>

        {profile.socials?.github && (
          <motion.a
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex shrink-0 items-center gap-2 rounded-full bg-[var(--color-ink)] px-6 py-3 text-sm font-medium text-[var(--color-paper)] shadow-sm"
          >
            <span>View GitHub Profile</span>
            <ExternalLink size={14} />
          </motion.a>
        )}
      </div>
    </Section>
  );
}