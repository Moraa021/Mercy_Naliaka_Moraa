import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

/**
 * Plata-style Kinetic Typography Component
 * Mimics plata.careers character stagger and spring cubic-bezier reveal:
 * ease: [0.2, 0.65, 0.3, 0.9], stagger: 0.04s - 0.06s
 */
export function KineticTitle({
  text,
  className = "",
  delay = 0,
  stagger = 0.035,
  as: Component = "h1",
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const words = text.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 36,
      rotateX: -20,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.5,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
  };

  return (
    <Component
      ref={ref}
      className={`overflow-hidden inline-flex flex-wrap items-baseline ${className}`}
      aria-label={text}
    >
      <motion.span
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="inline-flex flex-wrap items-baseline"
      >
        {words.map((word, wIdx) => (
          <span key={wIdx} className="inline-flex mr-[0.28em] whitespace-nowrap overflow-hidden">
            {word.split("").map((char, cIdx) => (
              <motion.span
                key={`${wIdx}-${cIdx}`}
                variants={letterVariants}
                className="inline-block transform-gpu"
              >
                {char}
              </motion.span>
            ))}
          </span>
        ))}
      </motion.span>
    </Component>
  );
}

/**
 * Plata-style Rotating Kinetic Words
 * Mimics plata.careers "WE ARE: Passionate / visionary / innovative / efficient"
 */
export function RotatingKineticBadge({
  prefix = "BUILDING SYSTEMS THAT ARE",
  words = ["Concurrent & Fast", "Domain-Grounded", "Fault-Tolerant", "Memory-Safe", "Production-Grade"],
  className = "",
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [words.length]);

  const currentWord = words[index];

  return (
    <div className={`inline-flex flex-wrap items-center gap-2 font-sans text-xs font-semibold uppercase tracking-wider ${className}`}>
      <span className="text-[var(--color-muted)]">{prefix}</span>
      <span className="relative inline-flex h-6 items-center overflow-hidden rounded-full border border-[var(--color-ink)]/20 bg-[var(--color-ink)] px-3 font-sans text-xs font-medium text-[var(--color-paper)]">
        <motion.span
          key={currentWord}
          initial={{ y: 22, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -22, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.2, 0.65, 0.3, 0.9] }}
          className="inline-block whitespace-nowrap"
        >
          {currentWord}
        </motion.span>
      </span>
    </div>
  );
}
