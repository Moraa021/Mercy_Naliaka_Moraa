import { useEffect, useState } from "react";
import { Menu, X, Download, Coffee } from "lucide-react";
import { motion } from "motion/react";
import { profile } from "../data";

const LINKS = [
  { href: "#about", id: "about", label: "About" },
  { href: "#impact-slider", id: "impact-slider", label: "Impact" },
  { href: "#journey", id: "journey", label: "Journey" },
  { href: "#works", id: "works", label: "Works" },
  { href: "#opensource", id: "opensource", label: "Open Source" },
  { href: "#moments", id: "moments", label: "Moments" },
  { href: "#skills", id: "skills", label: "Skills" },
  { href: "#writing", id: "writing", label: "Writing" },
  { href: "#contact", id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  // Track active section on scroll for the gliding pill animation
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);

      const sections = [
        { id: "hero", el: document.getElementById("hero") },
        ...LINKS.map((link) => ({ id: link.id, el: document.getElementById(link.id) })),
      ].filter((item) => item.el !== null);

      for (let i = sections.length - 1; i >= 0; i--) {
        const rect = sections[i].el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.35) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scrolling when mobile navigation drawer is active
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Derive initial avatar letter from shortName or full name
  const avatarLetter = (profile.shortName || profile.name || "M").charAt(0).toUpperCase();

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-[var(--color-line)] bg-[var(--color-paper)]/85 backdrop-blur-xl shadow-[0_12px_32px_-12px_rgba(20,20,19,0.08)] py-1"
          : "border-b border-transparent bg-[var(--color-paper)] py-2"
      }`}
    >
      <nav className="mx-auto flex h-14 w-full max-w-[1440px] items-center justify-between px-5 sm:px-8">
        {/* Brand Logo & Pulsating Status Dot */}
        <motion.a
          href="#hero"
          onClick={() => setActiveSection("hero")}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex shrink-0 items-center gap-2.5 group"
        >
          <div className="relative">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-ink)] font-display text-sm font-semibold text-[var(--color-paper)] shadow-xs transition-transform group-hover:rotate-6">
              {avatarLetter}
            </span>
            <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3 items-center justify-center rounded-full bg-[var(--color-paper)]">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            </span>
          </div>

          <div className="flex flex-col">
            <span className="font-display text-sm sm:text-base font-semibold tracking-tight text-[var(--color-ink)]">
              {profile.shortName || profile.name}
            </span>
            <span className="hidden sm:inline-block font-mono text-[10px] uppercase tracking-wider text-[var(--color-muted)]">
              Systems Engineer
            </span>
          </div>
        </motion.a>

        {/* Desktop Navigation Links with Plata Animated Sliding Pill */}
        <ul className="hidden items-center gap-1 rounded-full border border-[var(--color-line)]/70 bg-[var(--color-panel)]/80 p-1 shadow-xs backdrop-blur-md lg:flex">
          {LINKS.map((l) => {
            const isActive = activeSection === l.id;
            return (
              <li key={l.href} className="relative">
                <a
                  href={l.href}
                  onClick={() => setActiveSection(l.id)}
                  className={`relative block rounded-full px-3.5 py-1.5 font-mono text-[12px] font-medium tracking-tight transition-colors ${
                    isActive
                      ? "text-[var(--color-paper)] font-semibold"
                      : "text-[var(--color-muted)] hover:text-[var(--color-ink)]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navbarActivePill"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-[var(--color-ink)] shadow-sm"
                    />
                  )}
                  <span className="relative z-10">{l.label}</span>
                </a>
              </li>
            );
          })}
        </ul>

        {/* Desktop Action CTAs with Spring Physics */}
        <div className="hidden items-center gap-2.5 lg:flex">
          {profile.resume && (
            <motion.a
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              download
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-1.5 rounded-full border border-[var(--color-line)] bg-[var(--color-panel)] px-3.5 py-1.5 text-xs font-medium text-[var(--color-ink)] transition-colors hover:border-[var(--color-ink)] shadow-xs"
            >
              <Download size={13} strokeWidth={2} />
              <span>Resume</span>
            </motion.a>
          )}
          <motion.a
            href="https://www.buymeacoffee.com/mercymoraa"
            target="_blank"
            rel="noreferrer"
            aria-label="Buy me a coffee"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-1.5 rounded-full border border-[var(--color-line)] bg-[var(--color-panel)] px-3.5 py-1.5 text-xs font-medium text-[var(--color-ink)] transition-colors hover:border-[var(--color-ink)] shadow-xs"
          >
            <Coffee size={13} strokeWidth={2} />
            <span>Coffee</span>
          </motion.a>
          <motion.a
            href="#contact"
            onClick={() => setActiveSection("contact")}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="rounded-full bg-[var(--color-ink)] px-4 py-1.5 text-xs font-medium text-[var(--color-paper)] shadow-sm"
          >
            Let&apos;s talk
          </motion.a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-line)] bg-[var(--color-panel)] text-[var(--color-ink)] lg:hidden"
        >
          {open ? <X size={17} /> : <Menu size={17} />}
        </button>
      </nav>

      {/* Mobile Drawer Dropdown */}
      {open && (
        <div className="border-t border-[var(--color-line)] bg-[var(--color-paper)]/95 backdrop-blur-xl px-5 py-4 lg:hidden animate-modal-in">
          <ul className="flex flex-col gap-1">
            {LINKS.map((l) => {
              const isActive = activeSection === l.id;
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => {
                      setActiveSection(l.id);
                      setOpen(false);
                    }}
                    className={`block rounded-xl px-3 py-2.5 font-mono text-sm transition-colors ${
                      isActive
                        ? "bg-[var(--color-ink)] text-[var(--color-paper)] font-semibold"
                        : "text-[var(--color-ink)] hover:bg-[var(--color-panel)]"
                    }`}
                  >
                    {l.label}
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="mt-3 flex flex-col gap-2 border-t border-[var(--color-line)] pt-3">
            {profile.resume && (
              <a
                href={profile.resume}
                target="_blank"
                rel="noreferrer"
                download
                className="flex items-center justify-center gap-1.5 rounded-full border border-[var(--color-line)] px-4 py-2.5 text-sm font-medium text-[var(--color-ink)]"
              >
                <Download size={14} strokeWidth={2} />
                <span>Download resume</span>
              </a>
            )}
            <a
              href="https://www.buymeacoffee.com/mercymoraa"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-1.5 rounded-full border border-[var(--color-line)] px-4 py-2.5 text-sm font-medium text-[var(--color-ink)]"
            >
              <Coffee size={14} strokeWidth={2} />
              <span>Buy me a coffee</span>
            </a>
            <a
              href="#contact"
              onClick={() => {
                setActiveSection("contact");
                setOpen(false);
              }}
              className="rounded-full bg-[var(--color-ink)] px-4 py-2.5 text-center text-sm font-medium text-[var(--color-paper)] shadow-xs"
            >
              Let&apos;s talk
            </a>
          </div>
        </div>
      )}
    </header>
  );
}