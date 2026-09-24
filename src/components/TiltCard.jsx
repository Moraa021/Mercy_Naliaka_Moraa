import { useRef, useState } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "motion/react";

/**
 * Plata-style 3D Spring Tilt Card
 * Adds physical depth, tilt angle, and dynamic glare highlight on hover
 */
export function TiltCard({
  children,
  className = "",
  maxTilt = 7, // degrees
  glare = true,
  onClick,
  ...props
}) {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  // Raw mouse coordinates relative to card center (-1 to 1)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs with Plata's damping & stiffness
  const mouseXSpring = useSpring(x, { stiffness: 350, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 350, damping: 30 });

  // Map mouse coordinate to rotate angles
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-maxTilt, maxTilt]);

  // Glare position
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div
      style={{ perspective: 1100 }}
      className={`relative ${className}`}
      onClick={onClick}
      {...props}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.985 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="relative h-full w-full transform-gpu overflow-hidden"
      >
        {children}

        {/* Dynamic ambient cursor glare highlight */}
        {glare && (
          <motion.div
            aria-hidden
            style={{
              left: glareX,
              top: glareY,
              transform: "translate(-50%, -50%)",
            }}
            className={`pointer-events-none absolute h-64 w-64 rounded-full bg-white/10 blur-2xl transition-opacity duration-300 ${
              hovered ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
      </motion.div>
    </div>
  );
}
