import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { ArrowUpRight, Sparkles, Award, ShieldCheck, Cpu, Database, Users } from "lucide-react";
import { TiltCard } from "./TiltCard";

const IMPACT_CARDS = [
  {
    id: "digicow-impact",
    col: 1,
    offset: "start", // top-aligned
    tag: "National Finalist, Kenya AI Challenge",
    icon: ShieldCheck,
    title: "DigiCow AI: 0% Hallucination Guarantee",
    highlight: "100% Grounded",
    description:
      "Engineered GraphRAG retrieval grounded strictly in KALRO and ILRI peer-reviewed manuals, serving verified veterinary advisories in English and Swahili.",
    quote: "Eliminated generative risk for rural extension agents across Kenya.",
    author: "Mercy Moraa",
    role: "Lead Knowledge Graph Architect",
    link: "https://digicow-ai-farmer-intelligence-ui.onrender.com/",
    accent: "from-amber-500/15 via-orange-500/5 to-transparent",
    badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
  },
  {
    id: "ledgermate-impact",
    col: 1,
    offset: "end", // bottom-aligned
    tag: "FinTech Automation",
    icon: Database,
    title: "LedgerMate: Zero Double-Counting",
    highlight: "14 REST APIs",
    description:
      "Automated M-Pesa STK Push and Paystack webhook pipelines with HMAC signature validation and idempotent transaction processing.",
    quote: "Saved SMEs dozens of weekly hours previously lost to manual ledger audits.",
    author: "Production Deployment",
    role: "Full-Stack FinTech Engine",
    link: "https://ledger-mate-ecru.vercel.app/",
    accent: "from-emerald-500/15 via-teal-500/5 to-transparent",
    badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-300",
  },
  {
    id: "zone01-impact",
    col: 2,
    offset: "center", // centered
    tag: "Systems Rigor",
    icon: Cpu,
    title: "PamojaBuild & Go Concurrency Engine",
    highlight: "100% Go Stdlib",
    description:
      "Architected concurrent worker pools, channel multiplexing, and mutex synchronization with zero external runtime dependencies.",
    quote: "Rethinking high-throughput task pipelines from first principles.",
    author: "Zone01 Kisumu",
    role: "Systems Engineering Sprint",
    link: "https://github.com/Moraa021/pamojabuild1",
    accent: "from-blue-500/15 via-indigo-500/5 to-transparent",
    badgeColor: "bg-blue-100 text-blue-900 border-blue-300",
  },
  {
    id: "peer-quote",
    col: 2,
    offset: "start",
    tag: "Collaborative Culture",
    icon: Users,
    title: "Peer-Review & Defensive Programming",
    highlight: "100+ Code Reviews",
    description:
      "“Mercy brings unwavering discipline to race condition prevention, memory allocation profiling, and defensive API contracts.”",
    quote: "Building defensible software where edge cases are tested before deployment.",
    author: "Zone01 Kisumu Peer Reviewers",
    role: "Collaborative Sprint Evaluation",
    accent: "from-purple-500/15 via-violet-500/5 to-transparent",
    badgeColor: "bg-purple-100 text-purple-900 border-purple-300",
  },
  {
    id: "kijanispace-impact",
    col: 3,
    offset: "center",
    tag: "Climate-Smart Agritech",
    icon: Award,
    title: "Nemo Copernicus Earth Observation",
    highlight: "Medalist Podium",
    description:
      "Ingested multi-spectral Sentinel-2 satellite telemetry to model localized soil moisture deficits for Western Kenya farmer clusters.",
    quote: "Awarded hackathon honors for satellite analytics and climate resilience.",
    author: "KijaniSpace Copernicus Hackathon",
    role: "Satellite Pipeline Lead",
    link: "https://github.com/Moraa021",
    accent: "from-sky-500/15 via-cyan-500/5 to-transparent",
    badgeColor: "bg-sky-100 text-sky-900 border-sky-300",
  },
  {
    id: "lakehub-carbon",
    col: 3,
    offset: "end",
    tag: "Carbon Sequestration",
    icon: Sparkles,
    title: "Biochar Carbon Verification Ledger",
    highlight: "Traceable Milestones",
    description:
      "Cryptographic audit endpoints validating smallholder durable biochar conversion, opening up voluntary carbon credits for rural cooperatives.",
    quote: "Presented live to venture mentors and regional climate tech leaders at LakeHub Demo Day.",
    author: "LakeHub Kisumu Demo Day",
    role: "Verification Backend",
    accent: "from-stone-500/15 via-amber-500/5 to-transparent",
    badgeColor: "bg-stone-200 text-stone-900 border-stone-300",
  },
];

export default function PlataHorizontalSlider() {
  const containerRef = useRef(null);

  // Track vertical scroll progress inside this dedicated tall section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth physics spring for the horizontal translation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.8,
  });

  // Plata translates from 0 to negative horizontal offset
  const x = useTransform(smoothProgress, [0, 1], ["0%", "-64%"]);
  const progressPercent = useTransform(smoothProgress, [0, 1], [0, 100]);

  return (
    <section
      ref={containerRef}
      id="impact-slider"
      className="relative h-[280vh] bg-[var(--color-paper)] border-y border-[var(--color-line)]"
    >
      {/* Sticky Fullscreen Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">
        {/* Ambient Plata-style soft background glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -left-20 h-[500px] w-[500px] rounded-full bg-amber-500/5 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 right-10 h-[480px] w-[480px] rounded-full bg-orange-500/5 blur-3xl"
        />

        <div className="mx-auto w-full max-w-[1560px] px-5 sm:px-8">
          {/* Top Info Bar */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-[var(--color-line)] pb-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
                Plata-Style Kinetic Showcase · Field Impact
              </span>
            </div>

            {/* Scroll Indicator */}
            <div className="hidden sm:flex items-center gap-3 font-mono text-xs text-[var(--color-muted)]">
              <span>Scroll to explore</span>
              <div className="h-1.5 w-28 rounded-full bg-[var(--color-line)] overflow-hidden">
                <motion.div
                  className="h-full bg-[var(--color-ink)]"
                  style={{ width: useTransform(progressPercent, (v) => `${v}%`) }}
                />
              </div>
            </div>
          </div>

          {/* Grid Layout: Left stationary title, Right horizontal slider */}
          <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] xl:grid-cols-[420px_1fr] gap-8 items-center">
            {/* Left Stationary Content */}
            <div className="flex flex-col justify-center pr-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-panel)] px-3.5 py-1 font-mono text-[11px] uppercase tracking-wider text-[var(--color-muted)] w-fit mb-4">
                <Sparkles size={12} className="text-[var(--color-ink)]" />
                <span>You&apos;re in good company</span>
              </div>

              <h2 className="font-display text-4xl sm:text-5xl lg:text-[54px] font-bold tracking-tight leading-[1.02] text-[var(--color-ink)]">
                Systems built for{" "}
                <span className="font-semibold text-amber-700">measurable</span> outcomes.
              </h2>

              <p className="mt-5 text-[15px] leading-relaxed text-[var(--color-muted)]">
                For everything we architect, we consider real-world impact — on smallholder farmers,
                Kenyan SMEs, and collaborative engineering teams.
              </p>

              <div className="mt-8 flex flex-col gap-3 font-mono text-xs">
                <div className="flex items-center gap-2 text-[var(--color-ink)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-ink)]" />
                  <span>Sub-second GraphRAG veterinary retrieval</span>
                </div>
                <div className="flex items-center gap-2 text-[var(--color-ink)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-ink)]" />
                  <span>Idempotent payment webhooks with zero loss</span>
                </div>
                <div className="flex items-center gap-2 text-[var(--color-ink)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-ink)]" />
                  <span>Memory-safe Go concurrency worker pipelines</span>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-3">
                <a
                  href="#works"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--color-ink)] px-5 py-2.5 text-xs font-medium text-[var(--color-paper)] transition-transform hover:-translate-y-0.5"
                >
                  <span>Explore case studies</span>
                  <ArrowUpRight size={14} />
                </a>
                <a
                  href="#moments"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] px-5 py-2.5 text-xs font-medium text-[var(--color-ink)] hover:border-[var(--color-ink)]"
                >
                  <span>View moments</span>
                </a>
              </div>
            </div>

            {/* Right Horizontal Sliding Track */}
            <div className="relative overflow-visible">
              <motion.div
                style={{ x }}
                className="flex gap-6 sm:gap-8 items-center cursor-grab active:cursor-grabbing w-max py-4"
              >
                {IMPACT_CARDS.map((card) => {
                  const Icon = card.icon;
                  const isTop = card.offset === "start";
                  const isBottom = card.offset === "end";

                  return (
                    <div
                      key={card.id}
                      className={`w-[320px] sm:w-[380px] lg:w-[410px] shrink-0 transition-transform ${
                        isTop
                          ? "-translate-y-4"
                          : isBottom
                          ? "translate-y-4"
                          : "translate-y-0"
                      }`}
                    >
                      <TiltCard maxTilt={8}>
                        <div
                          className={`relative h-full flex flex-col justify-between rounded-[32px] sm:rounded-[36px] border border-[var(--color-line)] bg-[var(--color-panel)] p-6 sm:p-7 shadow-[0_20px_40px_-20px_rgba(20,20,19,0.08)] bg-gradient-to-b ${card.accent}`}
                        >
                          <div>
                            {/* Card Header */}
                            <div className="flex items-center justify-between gap-3">
                              <span
                                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-wider font-semibold ${card.badgeColor}`}
                              >
                                <Icon size={12} />
                                {card.tag}
                              </span>
                              <span className="font-mono text-xs font-bold text-[var(--color-ink)]">
                                {card.highlight}
                              </span>
                            </div>

                            {/* Card Title */}
                            <h3 className="mt-5 font-display text-xl sm:text-2xl font-normal tracking-tight text-[var(--color-ink)]">
                              {card.title}
                            </h3>

                            <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[var(--color-muted)]">
                              {card.description}
                            </p>

                            {/* Pull Quote */}
                            <div className="mt-5 rounded-2xl border border-[var(--color-line)]/70 bg-[var(--color-paper)]/70 p-4 backdrop-blur-sm">
                              <p className="font-serif italic text-xs sm:text-sm leading-relaxed text-[var(--color-ink)]/90">
                                {card.quote}
                              </p>
                            </div>
                          </div>

                          {/* Footer Info */}
                          <div className="mt-6 flex items-center justify-between border-t border-[var(--color-line)]/60 pt-4">
                            <div>
                              <p className="text-xs font-medium text-[var(--color-ink)]">
                                {card.author}
                              </p>
                              <p className="font-mono text-[10px] text-[var(--color-muted)]">
                                {card.role}
                              </p>
                            </div>

                            {card.link && (
                              <a
                                href={card.link}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={`Open link for ${card.title}`}
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-line)] bg-[var(--color-paper)] text-[var(--color-ink)] transition-transform hover:scale-110"
                              >
                                <ArrowUpRight size={14} />
                              </a>
                            )}
                          </div>
                        </div>
                      </TiltCard>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
