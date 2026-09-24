import { Star, ExternalLink, Code2, Sparkles, GitPullRequest } from "lucide-react";
import { motion } from "motion/react";
import { openSourceProjects, profile } from "../data";
import { Section, SectionHeading } from "./Section";
import { GithubIcon } from "./BrandIcons";
import { TiltCard } from "./TiltCard";

// Default fallback entries to ensure both Public APIs and Bitcoin are always present
const MANDATED_PROJECTS = [
  {
    name: "public-apis/public-apis",
    title: "Public APIs Repository Contribution",
    description: "Contributed to the web's largest collective list of free APIs. Merged PR #7164 integrating DefiLlama financial API data into the global index.",
    language: "Markdown / Shell",
    stars: 320000,
    repoUrl: "https://github.com/public-apis/public-apis/pull/7164",
    featured: true,
    tags: ["Pull Request #7164", "DefiLlama API", "Open Source", "Merged"],
  },
];

export default function OpenSource() {
  // Combine data from data.js with the mandated Public APIs item
  const allProjects = [...MANDATED_PROJECTS, ...(openSourceProjects || [])];

  // De-duplicate & filter strictly for Public APIs and Bitcoin projects
  const filtered = allProjects
    .filter((p, index, self) => index === self.findIndex((t) => t.name === p.name || t.title === p.title))
    .filter((p) => {
      const searchText = `${p.name} ${p.title} ${p.description} ${(p.tags || []).join(" ")}`.toLowerCase();
      return (
        searchText.includes("public-api") ||
        searchText.includes("public api") ||
        searchText.includes("7164") ||
        searchText.includes("bitcoin")
      );
    });

  return (
    <Section id="opensource" className="bg-[var(--color-panel)]">
      <SectionHeading
        kicker="Code in the open"
        title="Open Source"
        accent="contributions"
        desc="Merged community contributions, public API integrations, and Bitcoin network / regtest developer tools."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((repo) => (
          <TiltCard key={repo.name || repo.title} maxTilt={6}>
            <a
              href={repo.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="group flex h-full flex-col justify-between rounded-[28px] border border-[var(--color-line)] bg-[var(--color-paper)] p-6 transition-all duration-300 hover:border-[var(--color-ink)] hover:shadow-[0_20px_40px_-15px_rgba(20,20,19,0.12)] sm:p-7"
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[var(--color-line)] bg-[var(--color-panel)] text-[var(--color-ink)]">
                      {repo.repoUrl?.includes("pull") ? (
                        <GitPullRequest size={18} strokeWidth={1.8} />
                      ) : (
                        <Code2 size={18} strokeWidth={1.8} />
                      )}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-semibold text-[var(--color-ink)]">
                          {repo.name}
                        </span>
                        {repo.featured && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-ink)] px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-[var(--color-paper)]">
                            <Sparkles size={8} />
                            Featured
                          </span>
                        )}
                      </div>
                      <span className="font-mono text-[11px] text-[var(--color-muted)]">
                        {repo.language}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {repo.stars > 0 && (
                      <span className="inline-flex items-center gap-1 font-mono text-xs text-[var(--color-muted)]">
                        <Star size={12} className="text-[var(--color-ink)]" />
                        {repo.stars > 1000 ? `${(repo.stars / 1000).toFixed(0)}k` : repo.stars}
                      </span>
                    )}
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-line)] text-[var(--color-ink)] transition-colors group-hover:border-[var(--color-ink)] group-hover:bg-[var(--color-panel)]">
                      <ExternalLink size={13} />
                    </span>
                  </div>
                </div>

                <h3 className="mt-4 font-display text-lg font-medium leading-snug text-[var(--color-ink)] transition-colors group-hover:text-black">
                  {repo.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                  {repo.description}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-1.5 border-t border-[var(--color-line)]/60 pt-4">
                {repo.tags?.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-[var(--color-line)] bg-[var(--color-panel)] px-2 py-0.5 font-mono text-[10px] text-[var(--color-muted)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </a>
          </TiltCard>
        ))}
      </div>

      {/* GitHub Profile Banner with Spring Button */}
      <div className="mt-10 flex flex-col items-center justify-between gap-6 rounded-[32px] border border-[var(--color-line)] bg-[var(--color-panel)] p-6 sm:flex-row sm:p-8">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-ink)] text-[var(--color-paper)]">
            <GithubIcon className="h-6 w-6" />
          </div>
          <div>
            <h4 className="font-display text-lg font-medium text-[var(--color-ink)]">
              Explore all repositories on GitHub
            </h4>
            <p className="text-sm text-[var(--color-muted)]">
              Open-source contributions, Bitcoin Core testbeds, and backend tools.
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