"use client";

import { useState } from "react";
import { Download, CheckCircle, ArrowRight, FileText, Loader2 } from "lucide-react";

interface LeadMagnetProps {
  title: string;
  description: string;
  magnetType: "guide" | "checklist" | "calculator" | "consultation";
  source: string;
}

export default function LeadMagnet({ title, description, magnetType, source }: LeadMagnetProps) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/lead/base44", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          leadType: "Lead Magnet",
          loanType: magnetType,
          source: source,
          urgency: "Nurture",
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const magnetIcons = {
    guide: FileText,
    checklist: CheckCircle,
    calculator: Download,
    consultation: ArrowRight,
  };

  const Icon = magnetIcons[magnetType];

  if (isSuccess) {
    return (
      <div className="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 p-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 border border-primary/30 mb-6">
          <CheckCircle className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">Check Your Email!</h3>
        <p className="text-zinc-300 mb-6">
          We've sent your free {magnetType === "guide" ? "guide" : magnetType === "checklist" ? "checklist" : "resource"} to {email}.
        </p>
        <p className="text-zinc-400 text-sm">
          One of our loan officers will also reach out within 24 hours to answer any questions.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-zinc-800 border border-zinc-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/20 to-primary/10 border-b border-primary/20 p-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-primary/20 border border-primary/30 flex items-center justify-center">
            <Icon className="w-7 h-7 text-primary" />
          </div>
          <div>
            <span className="text-primary text-xs font-semibold uppercase tracking-wider">Free Download</span>
            <h3 className="text-xl font-bold text-white">{title}</h3>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <p className="text-zinc-400 text-sm">{description}</p>

        <div>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="w-full bg-zinc-900 border border-zinc-600 text-white px-4 py-3 placeholder-zinc-500 focus:border-primary focus:outline-none transition-colors"
            data-testid="input-lead-first-name"
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="w-full bg-zinc-900 border border-zinc-600 text-white px-4 py-3 placeholder-zinc-500 focus:border-primary focus:outline-none transition-colors"
            data-testid="input-lead-last-name"
          />
        </div>

        <div>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-zinc-900 border border-zinc-600 text-white px-4 py-3 placeholder-zinc-500 focus:border-primary focus:outline-none transition-colors"
            data-testid="input-lead-email"
          />
        </div>

        <div>
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full bg-zinc-900 border border-zinc-600 text-white px-4 py-3 placeholder-zinc-500 focus:border-primary focus:outline-none transition-colors"
            data-testid="input-lead-phone"
          />
        </div>

        {error && (
          <p className="text-red-400 text-sm">{error}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full btn-luxury justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          data-testid="button-lead-submit"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              Get Free {magnetType === "guide" ? "Guide" : magnetType === "checklist" ? "Checklist" : "Download"}
            </>
          )}
        </button>

        <p className="text-zinc-500 text-xs text-center">
          By submitting, you agree to receive communications from Enzo Mortgages.
        </p>
      </form>
    </div>
  );
}
