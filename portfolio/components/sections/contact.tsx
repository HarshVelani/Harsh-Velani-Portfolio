"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, MapPin, Send } from "lucide-react";
import { Section } from "@/components/section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { contact } from "@/lib/data";

const channels = [
  { icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
  { icon: Linkedin, label: "LinkedIn", value: "Connect", href: contact.linkedin },
  { icon: Github, label: "GitHub", value: "Follow", href: contact.github },
  { icon: MapPin, label: "Location", value: contact.location, href: undefined },
];

export function Contact() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");

  // No backend required: build a prefilled mailto and let the OS mail client send.
  const send = () => {
    const subject = encodeURIComponent(`Portfolio contact from ${name || "someone"}`);
    const body = encodeURIComponent(
      `${message}\n\n— ${name}${email ? ` (${email})` : ""}`
    );
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
  };

  const inputCls =
    "w-full rounded-xl border border-border bg-elevated/40 px-4 py-3 text-sm text-fg placeholder:text-muted/70 outline-none transition-colors focus:border-secondary";

  return (
    <Section
      id="contact"
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
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 text-secondary">
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
              <label htmlFor="c-msg" className="mb-1.5 block text-xs text-muted">
                Message
              </label>
              <textarea
                id="c-msg"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                placeholder="What would you like to build?"
                className={`${inputCls} resize-none`}
              />
            </div>
            <Button onClick={send} disabled={!message} className="w-full sm:w-auto">
              Send message <Send className="h-4 w-4" />
            </Button>
            <p className="text-xs text-muted">
              Opens your mail app with the message ready to send.
            </p>
          </Card>
        </motion.div>
      </div>
    </Section>
  );
}
