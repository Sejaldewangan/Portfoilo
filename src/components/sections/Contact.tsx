"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Copy, Check, ArrowUpRight } from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  XIcon,
} from "@/components/ui/BrandIcons";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";
import { SITE, PROJECT_TYPES } from "@/lib/content";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { burst } from "@/lib/confetti";

type Status = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactInput) => {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      reset();
      burst();
    } catch {
      setStatus("error");
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked — no-op */
    }
  };

  return (
    <section
      id="contact"
      className="shell py-28 md:py-40"
      style={{ background: "var(--bg-void)" }}
    >
      <h2 className="display-xl mb-16 max-w-[16ch]">
        Let&apos;s build something worth remembering.
      </h2>

      <div className="grid gap-12 lg:grid-cols-[40%_60%]">
        {/* email + socials */}
        <div className="flex flex-col gap-6">
          <button
            onClick={copyEmail}
            data-cursor="Copy"
            className="group flex items-center justify-between rounded-xl border p-6 text-left transition-colors hover:border-[var(--border-active)]"
            style={{
              background: "var(--bg-surface)",
              borderColor: "var(--border-subtle)",
            }}
          >
            <span>
              <span className="caption block">Email</span>
              <span className="mt-1 block text-lg text-[var(--text-bright)]">
                {SITE.email}
              </span>
            </span>
            {copied ? (
              <Check size={20} style={{ color: "var(--accent-primary)" }} />
            ) : (
              <Copy size={20} style={{ color: "var(--text-mid)" }} />
            )}
          </button>

          <div
            role="status"
            aria-live="polite"
            className="caption h-4"
            style={{ color: "var(--accent-primary)" }}
          >
            {copied ? "Copied to clipboard" : ""}
          </div>

          <div className="flex gap-3">
            <Social href={SITE.socials.github} label="GitHub" handle={SITE.handles.github}>
              <GithubIcon />
            </Social>
            <Social href={SITE.socials.linkedin} label="LinkedIn" handle={SITE.handles.linkedin}>
              <LinkedinIcon />
            </Social>
            <Social href={SITE.socials.twitter} label="Twitter" handle={SITE.handles.twitter}>
              <XIcon />
            </Social>
          </div>

          <p className="caption mt-auto flex items-center gap-2 pt-6">
            <span className="anim-pulse-dot" style={{ color: "var(--accent-primary)" }}>
              ●
            </span>
            Available for freelance &amp; full-time · {SITE.city} · {SITE.utc}
          </p>
        </div>

        {/* form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="grid gap-5 rounded-xl border p-8"
          style={{ background: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}
        >
          <Field label="Your name" error={errors.name?.message}>
            <input
              {...register("name")}
              className="field"
              autoComplete="name"
              placeholder="Ada Lovelace"
            />
          </Field>

          <Field label="Your email" error={errors.email?.message}>
            <input
              {...register("email")}
              type="email"
              className="field"
              autoComplete="email"
              placeholder="ada@example.com"
            />
          </Field>

          <Field label="What's the project?" error={errors.projectType?.message}>
            <select {...register("projectType")} className="field" defaultValue="">
              <option value="" disabled>
                Select one…
              </option>
              {PROJECT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Tell me more" error={errors.message?.message}>
            <textarea
              {...register("message")}
              rows={4}
              className="field resize-none"
              placeholder="What are you building, and where do I fit?"
            />
          </Field>

          <div className="flex items-center gap-4">
            <MagneticButton
              onClick={() => {}}
              ariaLabel="Send message"
              className="!cursor-pointer"
            >
              <button
                type="submit"
                disabled={status === "sending"}
                className="-mx-6 -my-3 flex items-center gap-1 rounded-full px-7 py-3 font-semibold disabled:opacity-60"
                style={{ background: "var(--accent-primary)", color: "var(--bg-void)" }}
              >
                {status === "sending" ? "Sending…" : "Send message"}
                <ArrowUpRight size={16} />
              </button>
            </MagneticButton>

            <p role="status" aria-live="polite" className="caption">
              {status === "sent" && (
                <span style={{ color: "var(--accent-primary)" }}>
                  Message sent! I&apos;ll reply within 24h.
                </span>
              )}
              {status === "error" && (
                <span style={{ color: "#ff6b6b" }}>
                  Something went wrong. Email me directly.
                </span>
              )}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="caption mb-2 block">{label}</span>
      {children}
      {error && (
        <span className="mt-1 block text-xs" style={{ color: "#ff6b6b" }}>
          {error}
        </span>
      )}
    </label>
  );
}

function Social({
  href,
  label,
  handle,
  children,
}: {
  href: string;
  label: string;
  handle: string;
  children: React.ReactNode;
}) {
  return (
    <MagneticButton
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      ariaLabel={`${label} ${handle}`}
      className="border"
    >
      <span
        className="-mx-6 -my-3 flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm"
        style={{ borderColor: "var(--border-subtle)" }}
      >
        {children}
        <span className="hidden sm:inline">{handle}</span>
      </span>
    </MagneticButton>
  );
}
