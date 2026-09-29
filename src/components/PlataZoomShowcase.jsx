import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Terminal, Shield, Zap, ArrowUpRight } from "lucide-react";
import { KineticTitle, RotatingKineticBadge } from "./KineticText";

/**
 * Plata-style Concentric Zoom Bento Section
 * Mimics plata.careers "Slider about Orange" layered card scale & depth
 */
export default function PlataZoomShowcase() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Layer 1 (Outer frame)
  const scaleOuter = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0.85, 1, 0.95]);
  const opacityOuter = useTransform(scrollYProgress, [0.05, 0.3], [0.3, 1]);

  // Layer 2 (Middle concentric frame)
  const scaleMiddle = useTransform(scrollYProgress, [0.15, 0.55], [0.88, 1]);

  // Layer 3 (Inner content elevation)
  const contentY = useTransform(scrollYProgress, [0.1, 0.5], [40, 0]);

  return (
    <section
      ref={containerRef}
      id="architecture"
      className="relative overflow-hidden py-24 sm:py-32 bg-[var(--color-paper)]"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8">
        {/* Layer 1: Outer Concentric Card Frame */}
        <motion.div
          style={{
            scale: scaleOuter,
            opacity: opacityOuter,
          }}
          className="relative rounded-[40px] sm:rounded-[64px] lg:rounded-[80px] border border-[var(--color-line)] bg-gradient-to-br from-[#1b1c19] via-[#141413] to-[#0e0f0d] p-3 sm:p-5 shadow-[0_40px_100px_-30px_rgba(20,20,19,0.35)]"
        >
          {/* Layer 2: Middle Concentric Layer */}
          <motion.div
            style={{ scale: scaleMiddle }}
            className="relative rounded-[32px] sm:rounded-[52px] lg:rounded-[68px] border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-6 sm:p-10 lg:p-14 text-[var(--color-paper)] overflow-hidden"
          >
            {/* Ambient Background Radial Glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-40 right-10 h-[480px] w-[480px] rounded-full bg-amber-500/10 blur-[120px]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-32 -left-20 h-[400px] w-[400px] rounded-full bg-orange-600/10 blur-[100px]"
            />

            {/* Inner Content Stack */}
            <motion.div style={{ y: contentY }} className="relative z-10">
              {/* Plata-style Rotating Badge */}
              <div className="mb-6">
                <RotatingKineticBadge
                  prefix="CORE ENGINEERING CULTURE"
                  words={[
                    "Concurrent Pipelines",
                    "GraphRAG Intelligence",
                    "Idempotent Webhooks",
                    "Memory Profiling",
                    "Zero-Defect QA",
                  ]}
                  className="!text-stone-300"
                />
              </div>

              {/* Plata-style Kinetic Staggered Headline */}
              <div className="max-w-4xl">
                <KineticTitle
                  text="CONSTRUCTING RESILIENT ARCHITECTURES"
                  tag="h2"
                  className="font-display text-3xl sm:text-5xl lg:text-[62px] font-normal leading-[1.05] tracking-tight text-white"
                />
                <p className="mt-4 font-serif italic text-xl sm:text-2xl text-stone-400">
                  Where memory safety meets domain-grounded artificial intelligence.
                </p>
              </div>

              {/* 3 Concentric Bento Highlights */}
              <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* Tenet 1 */}
                <div className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-all hover:bg-white/[0.06] hover:border-amber-400/30">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-300">
                    <Zap size={20} />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-normal text-white">
                    Go Concurrency First
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-400">
                    Worker pools, mutex sync, and channel pipelines engineered from scratch.
                    Zero reliance on bloated runtime dependencies.
                  </p>
                  <div className="mt-4 flex items-center gap-2 font-mono text-[11px] text-amber-300/80">
                    <span>100% Stdlib</span>
                    <span>&middot;</span>
                    <span>Zone01 Apprenticeship</span>
                  </div>
                </div>

                {/* Tenet 2 */}
                <div className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-all hover:bg-white/[0.06] hover:border-emerald-400/30">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-300">
                    <Shield size={20} />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-normal text-white">
                    GraphRAG Grounding
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-400">
                    Directly anchoring LLM inference with Neo4j knowledge graphs over verified
                    veterinary research to completely eliminate generative hallucinations.
                  </p>
                  <div className="mt-4 flex items-center gap-2 font-mono text-[11px] text-emerald-300/80">
                    <span>0% Hallucination</span>
                    <span>&middot;</span>
                    <span>National Finalist</span>
                  </div>
                </div>

                {/* Tenet 3 */}
                <div className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-all hover:bg-white/[0.06] hover:border-sky-400/30">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-500/15 text-sky-300">
                    <Terminal size={20} />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-normal text-white">
                    Production Rigor
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-400">
                    Cryptographic Paystack/M-Pesa webhooks, defensive API contracts, automated
                    regression benchmarks, and full ledger reconciliation.
                  </p>
                  <div className="mt-4 flex items-center gap-2 font-mono text-[11px] text-sky-300/80">
                    <span>Idempotent</span>
                    <span>&middot;</span>
                    <span>Audited Systems</span>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Strip */}
              <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
                <div className="flex items-center gap-6 text-xs font-mono text-stone-400">
                  <span>Maseno Univ. &rarr; Zone01 Kisumu</span>
                  <span>&bull;</span>
                  <span>Open to Worldwide Remote & Relocation</span>
                </div>

                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-semibold text-black transition-transform hover:scale-105"
                >
                  <span>Start a conversation</span>
                  <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
