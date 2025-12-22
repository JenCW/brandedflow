"use client";

import { useState } from "react";

export default function ValuationForm() {
  const [formData, setFormData] = useState({
    address: "",
    propertyType: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const propertyTypes = [
    { value: "single-family", label: "Single Family" },
    { value: "condo", label: "Condo" },
    { value: "townhome", label: "Townhome" },
    { value: "multi-unit", label: "Multi-Unit" },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.address.trim()) newErrors.address = "Required";
    if (!formData.propertyType) newErrors.propertyType = "Required";
    if (!formData.email.trim()) newErrors.email = "Required";
    if (!formData.phone.trim()) newErrors.phone = "Required";
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
      const response = await fetch("/api/lead/base44", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          phone: formData.phone,
          leadType: "Valuation",
          address: formData.address,
          propertyType: formData.propertyType,
          flags: { valuation: true },
          urgency: "Medium",
          source: "Home Valuation Tool",
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

  const inputClass =
    "w-full px-4 py-3 bg-zinc-800 border border-zinc-700  text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500";
  const selectClass =
    "w-full px-4 py-3 bg-zinc-800 border border-zinc-700  text-zinc-100 focus:outline-none focus:border-zinc-500";
  const labelClass = "block text-sm font-medium text-zinc-300 mb-2";
  const errorClass = "text-sm text-red-400 mt-1";

  if (submitted) {
    return (
      <div className="bg-zinc-900 p-8  text-center" data-testid="text-success-message">
        <p className="text-lg text-zinc-100">
          Thanks. We'll review your property and follow up with a personalized valuation.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 p-8 " data-testid="form-valuation">
      <form onSubmit={handleSubmit} className="space-y-5">
        {submitError && (
          <div className="p-3 bg-red-900/50 text-red-300  text-sm" data-testid="text-submit-error">
            {submitError}
          </div>
        )}

        <div>
          <label htmlFor="address" className={labelClass}>
            Property Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="123 Main St, City, State ZIP"
            className={inputClass}
            data-testid="input-address"
          />
          {errors.address && <p className={errorClass} data-testid="error-address">{errors.address}</p>}
        </div>

        <div>
          <label htmlFor="propertyType" className={labelClass}>
            Property Type
          </label>
          <select
            id="propertyType"
            name="propertyType"
            value={formData.propertyType}
            onChange={handleChange}
            className={selectClass}
            data-testid="select-property-type"
          >
            <option value="">Select property type</option>
            {propertyTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          {errors.propertyType && <p className={errorClass} data-testid="error-property-type">{errors.propertyType}</p>}
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={inputClass}
            data-testid="input-email"
          />
          {errors.email && <p className={errorClass} data-testid="error-email">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={inputClass}
            data-testid="input-phone"
          />
          {errors.phone && <p className={errorClass} data-testid="error-phone">{errors.phone}</p>}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 bg-zinc-700 text-zinc-100  font-medium mt-2 disabled:opacity-50"
          data-testid="button-submit"
        >
          {submitting ? "Submitting..." : "Request Valuation"}
        </button>
      </form>
    </div>
  );
}
