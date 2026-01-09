"use client";

import { useState } from "react";

export default function LeadForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    const res = await fetch("/api/lead/intake", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setStatus(res.ok ? "success" : "error");
    if (res.ok) form.reset();
  }

  return (
    <section style={{ border: "1px solid #e5e5e5", borderRadius: 12, padding: 16 }}>
      <h2 style={{ fontSize: 18, marginBottom: 12 }}>Lead Intake (Template)</h2>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 10 }}>
        <input name="first_name" placeholder="First name" required />
        <input name="last_name" placeholder="Last name" />
        <input name="email" placeholder="Email" type="email" required />
        <input name="phone" placeholder="Phone" />
        <input name="lead_type" placeholder="lead_type (e.g. mortgage_rate_quote)" />
        <input name="source" placeholder="source (e.g. website_form)" />
        <input name="landing_page_url" placeholder="landing_page_url" />
        <button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Submitting…" : "Submit"}
        </button>
        {status === "success" && <div>Submitted.</div>}
        {status === "error" && <div>Something went wrong.</div>}
      </form>
    </section>
  );
}

