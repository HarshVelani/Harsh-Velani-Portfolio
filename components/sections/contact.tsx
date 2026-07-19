"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Github,
  Linkedin,
  MapPin,
  Phone,
  Send,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { Section } from "@/components/section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { contact } from "@/lib/data";
import { siteConfig } from "@/lib/config";

type Channel = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
};

// Phone is included only when NEXT_PUBLIC_PHONE is set.
const channels: Channel[] = [
  { icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
  ...(contact.phone
    ? [
        {
          icon: Phone,
          label: "Phone",
          value: contact.phone,
          href: `tel:${contact.phone.replace(/\s+/g, "")}`,
        } as Channel,
      ]
    : []),
  { icon: Linkedin, label: "LinkedIn", value: "Connect", href: contact.linkedin },
  { icon: Github, label: "GitHub", value: "Follow", href: contact.github },
  { icon: MapPin, label: "Location", value: contact.location, href: undefined },
];

export function Contact() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [status, setStatus] = React.useState<
    "idle" | "sending" | "success" | "fallback"
  >("idle");
  const botRef = React.useRef<HTMLInputElement>(null); // honeypot

  // Fallback: open the visitor's mail app with the message prefilled. This is
  // the original behaviour, used whenever Web3Forms is unavailable.
  const openMailApp = () => {
    const subject = encodeURIComponent(
      `Portfolio message from ${name || "a visitor"}`
    );
    const body = encodeURIComponent(
      `${message}\n\n- ${name}${email ? ` (${email})` : ""}`
    );
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
  };

  // Primary path: submit to Web3Forms (client-side). If it is not configured or
  // fails for any reason (network down, bad key, blocked domain, API error),
  // fall back to opening the mail app with the details prefilled.
  const send = async () => {
    if (!message.trim() || status === "sending") return;

    const key = siteConfig.web3formsKey;
    const configured = key && key !== "your-web3forms-access-key";

    // Web3Forms not set up yet -> straight to the email-app fallback.
    if (!configured) {
      openMailApp();
      setStatus("fallback");
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: key,
          subject: `Portfolio message from ${name || "a visitor"}`,
          from_name: name || "Portfolio visitor",
          name,
          email,
          message,
          // Honeypot: real users leave this unchecked; bots that tick it are rejected.
          botcheck: botRef.current?.checked ?? false,
        }),
      });
      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        // Reachable but rejected (bad key, blocked domain, spam) -> fallback.
        openMailApp();
        setStatus("fallback");
      }
    } catch {
      // Network error or API down -> fallback. Keep the typed text intact.
      openMailApp();
      setStatus("fallback");
    }
  };

  const inputCls =
    "w-full rounded-xl border border-border bg-elevated/40 px-4 py-3 text-sm text-fg placeholder:text-muted/70 outline-none transition-colors focus:border-secondary";

  return (
    <Section
      id="contact"
      index={7}
      eyebrow="Contact"
      title={
        <>
          Let&apos;s build something{" "}
          <span className="text-gradient">intelligent</span>.
        </>
      }
      intro="Open to AI/ML roles and interesting problems. The fastest way to reach me is email."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        {/* Channels */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45 }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1"
        >
          {channels.map((c) => {
            const Inner = (
              <Card className="flex items-center gap-4 hover:-translate-y-1">
                <span className="icon-tile h-11 w-11">
                  <c.icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <div className="text-xs uppercase tracking-wide text-muted">
                    {c.label}
                  </div>
                  <div className="truncate text-sm text-fg">{c.value}</div>
                </div>
              </Card>
            );
            return c.href ? (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
              >
                {Inner}
              </a>
            ) : (
              <div key={c.label}>{Inner}</div>
            );
          })}
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, delay: 0.1 }}
        >
          <Card className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="c-name" className="mb-1.5 block text-xs text-muted">
                  Name
                </label>
                <input
                  id="c-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className={inputCls}
                />
              </div>
              <div>
                <label htmlFor="c-email" className="mb-1.5 block text-xs text-muted">
                  Email
                </label>
                <input
                  id="c-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={inputCls}
                />
              </div>
            </div>
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label htmlFor="c-msg" className="block text-xs text-muted">
                  Message
                </label>
                <span
                  className={`font-mono text-[0.7rem] ${
                    message.length >= 900 ? "text-secondary" : "text-dim"
                  }`}
                >
                  {message.length} / 1000
                </span>
              </div>
              <textarea
                id="c-msg"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                maxLength={1000}
                placeholder="What would you like to build?"
                className={`${inputCls} resize-none`}
              />
            </div>
            {/* Honeypot: hidden from people, catches bots that tick it. */}
            <input
              ref={botRef}
              type="checkbox"
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="sr-only"
            />

            <div className="flex flex-wrap items-center gap-3">
              <Button
                onClick={send}
                disabled={!message.trim() || status === "sending"}
                className="w-full sm:w-auto"
              >
                {status === "sending" ? (
                  <>
                    Sending <Loader2 className="h-4 w-4 animate-spin" />
                  </>
                ) : (
                  <>
                    Send message <Send className="h-4 w-4" />
                  </>
                )}
              </Button>

              {status === "success" && (
                <span className="inline-flex items-center gap-1.5 text-sm text-secondary">
                  <CheckCircle2 className="h-4 w-4" /> Message sent. I will get
                  back to you.
                </span>
              )}
              {status === "fallback" && (
                <span className="inline-flex items-center gap-1.5 text-sm text-muted">
                  <Mail className="h-4 w-4" /> Opening your email app. If nothing
                  opens, email me at{" "}
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-secondary underline underline-offset-2"
                  >
                    {contact.email}
                  </a>
                  .
                </span>
              )}
            </div>

            <p className="text-xs text-muted">
              Your message goes straight to my inbox.
            </p>
          </Card>
        </motion.div>
      </div>
    </Section>
  );
}
