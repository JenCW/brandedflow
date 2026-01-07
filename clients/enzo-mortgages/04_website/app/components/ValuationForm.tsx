"use client";

import { useState } from "react";
import { DollarSign, TrendingUp, TrendingDown, CheckCircle, Loader2, Home } from "lucide-react";

interface ValuationFormProps {
  onSuccess?: () => void;
}

interface ValuationResult {
  value: number;
  low: number;
  high: number;
  lastUpdated: string;
  address: string;
  source: string;
}

export default function ValuationForm({ onSuccess }: ValuationFormProps = {}) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    zipCode: "",
    email: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [valuation, setValuation] = useState<ValuationResult | null>(null);
  const [showValuation, setShowValuation] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = "Required";
    if (!formData.lastName.trim()) newErrors.lastName = "Required";
    if (!formData.address.trim()) newErrors.address = "Required";
    if (!formData.zipCode.trim()) newErrors.zipCode = "Required";
    if (!formData.email.trim()) newErrors.email = "Required";
    // Validate zip code format
    if (formData.zipCode.trim() && !/^\d{5}(-\d{4})?$/.test(formData.zipCode.trim())) {
      newErrors.zipCode = "Invalid zip code format";
    }
    return newErrors;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
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
    setValuation(null);
    setShowValuation(false);

    try {
      const response = await fetch("/api/property/valuation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          address: formData.address,
          zipCode: formData.zipCode,
        }),
      });

      const data = await response.json();
      if (data.success && data.valuation) {
        setValuation(data.valuation);
        setShowValuation(true);
        // Call onSuccess callback if provided (for landing page flow)
        if (onSuccess) {
          setTimeout(() => {
            onSuccess();
          }, 3000); // Give user time to see the valuation
        }
      } else {
        setSubmitError(data.error || "Unable to get property valuation. Please try again.");
      }
    } catch (error) {
      console.error("Valuation error:", error);
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-primary rounded-lg transition-colors";
  const labelClass = "block text-sm font-medium text-zinc-300 mb-2";
  const errorClass = "text-sm text-red-400 mt-1";

  if (showValuation && valuation) {
    return (
      <div className="bg-zinc-900 p-8 rounded-lg border border-zinc-700" data-testid="valuation-result">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 border border-primary/30 rounded-full mb-4">
            <Home className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-wide">
            Your Property Valuation
          </h3>
          <p className="text-zinc-400 text-sm">{valuation.address}</p>
        </div>

        <div className="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 rounded-xl p-6 mb-6">
          <div className="text-center">
            <p className="text-zinc-400 text-sm mb-2 uppercase tracking-wide">Estimated Value</p>
            <p className="text-4xl md:text-5xl font-bold text-primary mb-4">
              {formatCurrency(valuation.value)}
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-zinc-300">
              <div className="flex items-center gap-1">
                <TrendingDown className="w-4 h-4 text-zinc-400" />
                <span>Low: {formatCurrency(valuation.low)}</span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-zinc-400" />
                <span>High: {formatCurrency(valuation.high)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-zinc-300 text-sm">
                <strong className="text-white">Thank you, {formData.firstName}!</strong> We've received your information and will follow up with a personalized analysis.
              </p>
              <p className="text-zinc-500 text-xs mt-2">
                Source: {valuation.source} • Updated: {new Date(valuation.lastUpdated).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {onSuccess && (
          <div className="text-center">
            <p className="text-zinc-400 text-sm">Continuing to next step...</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 p-8 rounded-lg border border-zinc-700" data-testid="form-valuation">
      <form onSubmit={handleSubmit} className="space-y-5">
        {submitError && (
          <div className="p-3 bg-red-900/50 text-red-300 text-sm rounded-lg" data-testid="text-submit-error">
            {submitError}
          </div>
        )}

        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">
            Get Your Home's Value
          </h3>
          <p className="text-zinc-400 text-sm">
            Enter your property details to receive an instant valuation
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className={labelClass}>
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className={inputClass}
              data-testid="input-first-name"
              required
            />
            {errors.firstName && <p className={errorClass} data-testid="error-first-name">{errors.firstName}</p>}
          </div>
          <div>
            <label htmlFor="lastName" className={labelClass}>
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className={inputClass}
              data-testid="input-last-name"
              required
            />
            {errors.lastName && <p className={errorClass} data-testid="error-last-name">{errors.lastName}</p>}
          </div>
        </div>

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
            placeholder="123 Main Street"
            className={inputClass}
            data-testid="input-address"
            required
          />
          {errors.address && <p className={errorClass} data-testid="error-address">{errors.address}</p>}
        </div>

        <div>
          <label htmlFor="zipCode" className={labelClass}>
            Zip Code
          </label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            placeholder="92660"
            className={inputClass}
            data-testid="input-zip-code"
            maxLength={10}
            required
          />
          {errors.zipCode && <p className={errorClass} data-testid="error-zip-code">{errors.zipCode}</p>}
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
            placeholder="your@email.com"
            className={inputClass}
            data-testid="input-email"
            required
          />
          {errors.email && <p className={errorClass} data-testid="error-email">{errors.email}</p>}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          data-testid="button-submit"
        >
          {submitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Getting Valuation...
            </>
          ) : (
            <>
              <DollarSign className="w-5 h-5" />
              Get My Property Value
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
