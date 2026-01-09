"use client";

import { useState } from "react";

interface QuickLeadFormProps {
  source?: string;
}

export default function QuickLeadForm({ source }: QuickLeadFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    loanType: "",
    timeline: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const loanTypes = [
    { value: "Conventional", label: "Conventional Purchase" },
    { value: "FHA", label: "FHA Loan" },
    { value: "VA", label: "VA Loan" },
    { value: "Jumbo", label: "Jumbo Loan" },
    { value: "Refinance", label: "Refinance" },
    { value: "Cash-Out", label: "Cash-Out Refinance" },
    { value: "DSCR", label: "DSCR / Investment Property" },
    { value: "Bank Statement", label: "Bank Statement Loan" },
    { value: "Foreign National", label: "Foreign National" },
  ];

  const timelines = [
    { value: "asap", label: "As soon as possible" },
    { value: "1-3months", label: "1-3 months" },
    { value: "3-6months", label: "3-6 months" },
    { value: "6plus", label: "6+ months" },
    { value: "exploring", label: "Just exploring" },
  ];

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = "Required";
    if (!formData.lastName.trim()) newErrors.lastName = "Required";
    if (!formData.email.trim()) newErrors.email = "Required";
    if (!formData.phone.trim()) newErrors.phone = "Required";
    if (!formData.loanType) newErrors.loanType = "Required";
    if (!formData.timeline) newErrors.timeline = "Required";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSubmitError("");
    setSubmitting(true);

    try {
      const response = await fetch("/api/lead/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          leadType: "Quick Lead",
          loanType: formData.loanType,
          timeline: formData.timeline, // Qualification factor: how soon
          source: source || "Unknown",
        }),
      });

      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setSubmitError("Something went wrong. Please try again.");
      }
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  if (submitted) {
    return (
      <div className="p-6 text-center" data-testid="text-success-message">
        <p className="text-lg font-medium text-foreground">
          Thanks — we'll be in touch shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" data-testid="form-quick-lead">
      {submitError && (
        <div className="p-3 bg-red-100 text-red-700  text-sm" data-testid="text-submit-error">
          {submitError}
        </div>
      )}

      <div>
        <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-1">
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-border  bg-background text-foreground"
          data-testid="input-first-name"
        />
        {errors.firstName && (
          <p className="text-sm text-red-500 mt-1" data-testid="error-first-name">{errors.firstName}</p>
        )}
      </div>

      <div>
        <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-1">
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-border  bg-background text-foreground"
          data-testid="input-last-name"
        />
        {errors.lastName && (
          <p className="text-sm text-red-500 mt-1" data-testid="error-last-name">{errors.lastName}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-border  bg-background text-foreground"
          data-testid="input-email"
        />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1" data-testid="error-email">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-border  bg-background text-foreground"
          data-testid="input-phone"
        />
        {errors.phone && (
          <p className="text-sm text-red-500 mt-1" data-testid="error-phone">{errors.phone}</p>
        )}
      </div>

      <div>
        <label htmlFor="loanType" className="block text-sm font-medium text-foreground mb-1">
          Loan Type
        </label>
        <select
          id="loanType"
          name="loanType"
          value={formData.loanType}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-border  bg-background text-foreground"
          data-testid="select-loan-type"
        >
          <option value="">Select a loan type</option>
          {loanTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        {errors.loanType && (
          <p className="text-sm text-red-500 mt-1" data-testid="error-loan-type">{errors.loanType}</p>
        )}
      </div>

      <div>
        <label htmlFor="timeline" className="block text-sm font-medium text-foreground mb-1">
          Timeline
        </label>
        <select
          id="timeline"
          name="timeline"
          value={formData.timeline}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-border  bg-background text-foreground"
          data-testid="select-timeline"
        >
          <option value="">Select a timeline</option>
          {timelines.map((time) => (
            <option key={time.value} value={time.value}>
              {time.label}
            </option>
          ))}
        </select>
        {errors.timeline && (
          <p className="text-sm text-red-500 mt-1" data-testid="error-timeline">{errors.timeline}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-2 px-4 bg-primary text-primary-foreground  font-medium disabled:opacity-50"
        data-testid="button-submit"
      >
        {submitting ? "Submitting..." : "Get Started"}
      </button>
    </form>
  );
}
