import { Coffee } from "lucide-react";
import { profile } from "../data";

const LINKS = [
  { label: "LinkedIn", getHref: (p) => p.socials?.linkedin },
  { label: "GitHub", getHref: (p) => p.socials?.github },
  { label: "Dev.to", getHref: (p) => p.socials?.devto },
  { label: "X", getHref: (p) => p.socials?.x },
  { label: "Resume", getHref: (p) => p.resume },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-line)] bg-[var(--color-panel)]">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        {/* Name and Copyright */}
        <p className="text-sm text-[var(--color-muted)]">
          {profile.name} &middot; {year}
        </p>

        {/* Social Links and Support CTA */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
          <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {LINKS.map((l) => {
              const href = l.getHref(profile);
              if (!href) return null;

              return (
                <a
                  key={l.label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
                >
                  {l.label}
                </a>
              );
            })}
          </nav>

          <a
            href="https://www.buymeacoffee.com/mercymoraa"
            target="_blank"
            rel="noreferrer"
            aria-label="Buy me a coffee"
            className="flex items-center gap-1.5 rounded-full bg-[var(--color-ink)] px-4 py-2 text-sm font-medium text-[var(--color-paper)] transition-all hover:opacity-90"
          >
            <Coffee size={14} strokeWidth={2} />
            <span>Buy me a coffee</span>
          </a>
        </div>
      </div>
    </footer>
  );
}