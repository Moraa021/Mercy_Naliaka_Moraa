export function Section({ id, className = "", children }) {
  return (
    <section id={id} className={`w-full py-20 sm:py-24 ${className}`}>
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8">{children}</div>
    </section>
  );
}

export function SectionHeading({ kicker, title, accent, desc, className = "" }) {
  return (
    <div className={`mb-12 max-w-2xl ${className}`}>
      {kicker && (
        <div className="mb-3.5 inline-flex items-center rounded-full border border-[var(--color-line)] bg-[var(--color-panel)] px-3.5 py-1 font-sans text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)] shadow-2xs">
          <span>{kicker}</span>
        </div>
      )}
      <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight leading-tight text-[var(--color-ink)]">
        {title} {accent && <span className="font-semibold text-stone-600">{accent}</span>}
      </h2>
      {desc && (
        <p className="mt-3.5 text-[15px] sm:text-[16px] leading-relaxed text-[var(--color-muted)]">{desc}</p>
      )}
    </div>
  );
}