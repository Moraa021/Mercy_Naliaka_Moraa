import { useState } from "react";
import { Mail, MapPin, Copy, Check, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { profile } from "../data";
import { Section, SectionHeading } from "./Section";
import { WhatsappIcon } from "./BrandIcons";
import { TiltCard } from "./TiltCard";

const whatsappNumber = profile.phone ? profile.phone.replace(/[^\d]/g, "") : "";
const whatsappUrl = `https://wa.me/${whatsappNumber}`;
const mailtoUrl = `mailto:${profile.email}`;

function ContactRow({ icon: Icon, label, value, copyValue, action }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard fallback */
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[var(--color-line)] bg-[var(--color-paper)] px-4 py-3.5 shadow-xs transition-colors hover:border-[var(--color-ink)]/40">
      <div className="flex items-center gap-3">
        <Icon className="h-4.5 w-4.5 shrink-0 text-[var(--color-muted)]" />
        <div>
          <p className="font-sans text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">
            {label}
          </p>
          <p className="text-sm font-medium text-[var(--color-ink)]">{value}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {action && (
          <motion.a
            href={action.href}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1 rounded-full bg-[var(--color-ink)] px-3.5 py-1.5 text-xs font-medium text-[var(--color-paper)] shadow-xs"
          >
            {action.label}
            <ArrowUpRight size={12} />
          </motion.a>
        )}
        {copyValue && (
          <motion.button
            type="button"
            onClick={handleCopy}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Copy ${label}`}
            className="flex items-center gap-1.5 rounded-full border border-[var(--color-line)] px-3 py-1.5 text-xs font-medium text-[var(--color-ink)] transition-colors hover:border-[var(--color-ink)]"
          >
            {copied ? <Check size={12} className="text-[var(--color-ink)]" /> : <Copy size={12} />}
            {copied ? "Copied" : "Copy"}
          </motion.button>
        )}
      </div>
    </div>
  );
}

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.name.value;
    const email = form.email.value;
    const subject = form.subject.value;
    const message = form.message.value;

    const body = `${message}\n\n— ${name} (${email})`;
    const link = `${mailtoUrl}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = link;
    setSent(true);
  };

  return (
    <Section id="contact">
      <SectionHeading kicker="Let's connect" title="In sync?" accent="Let's talk" />

      <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] items-start">
        {/* Contact Quick Info Panel */}
        <TiltCard maxTilt={5}>
          <div className="h-full rounded-[32px] border border-[var(--color-line)] bg-[var(--color-panel)] p-7 sm:p-9 shadow-sm">
            <p className="text-sm leading-relaxed text-[var(--color-muted)]">
              Whether you&apos;re looking for an engineer who excels at Go backend systems, applied GraphRAG
              pipelines, or full-stack integrations, my inbox is open.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <ContactRow
                icon={Mail}
                label="Direct email"
                value={profile.email}
                copyValue={profile.email}
                action={{ label: "Email me", href: mailtoUrl }}
              />
              <ContactRow
                icon={WhatsappIcon}
                label="Phone & WhatsApp"
                value={profile.phone}
                copyValue={profile.phone}
                action={{ label: "WhatsApp", href: whatsappUrl }}
              />
              <ContactRow
                icon={MapPin}
                label="Current location"
                value={`${profile.location} (${profile.locationNote})`}
              />
            </div>
          </div>
        </TiltCard>

        {/* Form Panel */}
        <TiltCard maxTilt={4}>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 rounded-[32px] border border-[var(--color-line)] bg-[var(--color-panel)] p-7 sm:p-9 shadow-sm"
          >
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-[var(--color-ink)]">
                Your name
              </label>
              <input
                id="name"
                name="name"
                required
                placeholder="e.g. Sarah Jenkins"
                className="w-full rounded-2xl border border-[var(--color-line)] bg-[var(--color-paper)] px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--color-ink)] shadow-xs"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[var(--color-ink)]">
                Your email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="e.g. sarah@company.com"
                className="w-full rounded-2xl border border-[var(--color-line)] bg-[var(--color-paper)] px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--color-ink)] shadow-xs"
              />
            </div>

            <div>
              <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-[var(--color-ink)]">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                required
                placeholder="Engineering role / project collaboration"
                className="w-full rounded-2xl border border-[var(--color-line)] bg-[var(--color-paper)] px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--color-ink)] shadow-xs"
              />
            </div>

            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-[var(--color-ink)]">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                placeholder="Hi Mercy, I enjoyed your work on DigiCow AI..."
                className="w-full resize-none rounded-2xl border border-[var(--color-line)] bg-[var(--color-paper)] px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--color-ink)] shadow-xs"
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-2 rounded-full bg-[var(--color-ink)] px-6 py-3.5 text-sm font-medium text-[var(--color-paper)] shadow-sm"
            >
              {sent ? "Opening mail client..." : "Send message"}
            </motion.button>

            {sent && (
              <p className="text-xs leading-relaxed text-[var(--color-muted)]">
                This opens your mail app with the pre-filled message addressed to {profile.email}. If nothing
                opens, feel free to copy the email address directly above.
              </p>
            )}
          </form>
        </TiltCard>
      </div>
    </Section>
  );
}