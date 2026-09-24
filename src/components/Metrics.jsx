import { metrics } from "../data";

export default function Metrics() {
  return (
    <div className="border-b border-[var(--color-line)] bg-[var(--color-ink)] text-[var(--color-paper)]">
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-2 gap-6 px-5 py-12 sm:px-8 md:grid-cols-4 md:gap-8">
        {metrics && metrics.length > 0
          ? metrics.map((m) => (
              <div key={m.label} className="flex flex-col group">
                <p className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[var(--color-paper)] transition-transform duration-300 group-hover:-translate-y-1">
                  {m.num}
                </p>
                <p className="mt-2.5 font-mono text-xs uppercase tracking-wider text-[var(--color-paper)]/65">
                  {m.label}
                </p>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}