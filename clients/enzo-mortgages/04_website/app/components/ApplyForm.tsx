"use client";

import { useState } from "react";

type LoanGoal = "purchase" | "refinance" | "";

interface FormData {
  loanGoal: LoanGoal;
  loanType: string;
  purchasePrice: string;
  homeValue: string;
  downPayment: string;
  loanBalance: string;
  firstName: string;
  email: string;
  phone: string;
}

export default function ApplyForm() {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    loanGoal: "",
    loanType: "",
    purchasePrice: "",
    homeValue: "",
    downPayment: "",
    loanBalance: "",
    firstName: "",
    email: "",
    phone: "",
  });

  const loanTypes = [
    { value: "conventional", label: "Conventional" },
    { value: "va", label: "VA" },
    { value: "fha", label: "FHA" },
    { value: "jumbo", label: "Jumbo" },
    { value: "foreign-national", label: "Foreign National" },
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

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.loanGoal) newErrors.loanGoal = "Required";
      if (!formData.loanType) newErrors.loanType = "Required";
    }

    if (currentStep === 2) {
      if (formData.loanGoal === "purchase") {
        if (!formData.purchasePrice.trim()) newErrors.purchasePrice = "Required";
        if (!formData.downPayment.trim()) newErrors.downPayment = "Required";
      } else {
        if (!formData.homeValue.trim()) newErrors.homeValue = "Required";
        if (!formData.loanBalance.trim()) newErrors.loanBalance = "Required";
      }
    }

    if (currentStep === 3) {
      if (!formData.firstName.trim()) newErrors.firstName = "Required";
      if (!formData.email.trim()) newErrors.email = "Required";
      if (!formData.phone.trim()) newErrors.phone = "Required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(3)) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="bg-zinc-900 p-8  text-center" data-testid="text-success-message">
        <p className="text-xl font-medium text-zinc-100">
          Application started. We'll review and reach out shortly.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full px-4 py-3 bg-zinc-800 border border-zinc-700  text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-primary";
  const selectClass =
    "w-full px-4 py-3 bg-zinc-800 border border-zinc-700  text-zinc-100 focus:outline-none focus:border-primary";
  const labelClass = "block text-sm font-medium text-zinc-300 mb-2";
  const errorClass = "text-sm text-red-400 mt-1";

  return (
    <div className="bg-zinc-900 p-8 " data-testid="form-apply">
      <div className="flex items-center justify-center gap-2 mb-8">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
              s === step
                ? "bg-primary text-primary-foreground"
                : s < step
                ? "bg-primary/70 text-primary-foreground"
                : "bg-zinc-700 text-zinc-400"
            }`}
            data-testid={`step-indicator-${s}`}
          >
            {s}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-zinc-100 mb-4">Loan Details</h2>

            <div>
              <label className={labelClass}>Loan Goal</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="loanGoal"
                    value="purchase"
                    checked={formData.loanGoal === "purchase"}
                    onChange={handleChange}
                    className="w-4 h-4 accent-primary"
                    data-testid="radio-purchase"
                  />
                  <span className="text-zinc-200">Purchase</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="loanGoal"
                    value="refinance"
                    checked={formData.loanGoal === "refinance"}
                    onChange={handleChange}
                    className="w-4 h-4 accent-primary"
                    data-testid="radio-refinance"
                  />
                  <span className="text-zinc-200">Refinance</span>
                </label>
              </div>
              {errors.loanGoal && <p className={errorClass} data-testid="error-loan-goal">{errors.loanGoal}</p>}
            </div>

            <div>
              <label htmlFor="loanType" className={labelClass}>
                Loan Type
              </label>
              <select
                id="loanType"
                name="loanType"
                value={formData.loanType}
                onChange={handleChange}
                className={selectClass}
                data-testid="select-loan-type"
              >
                <option value="">Select loan type</option>
                {loanTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              {errors.loanType && <p className={errorClass} data-testid="error-loan-type">{errors.loanType}</p>}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-zinc-100 mb-4">Property Details</h2>

            {formData.loanGoal === "purchase" ? (
              <>
                <div>
                  <label htmlFor="purchasePrice" className={labelClass}>
                    Estimated Purchase Price
                  </label>
                  <input
                    type="text"
                    id="purchasePrice"
                    name="purchasePrice"
                    value={formData.purchasePrice}
                    onChange={handleChange}
                    placeholder="$500,000"
                    className={inputClass}
                    data-testid="input-purchase-price"
                  />
                  {errors.purchasePrice && <p className={errorClass} data-testid="error-purchase-price">{errors.purchasePrice}</p>}
                </div>

                <div>
                  <label htmlFor="downPayment" className={labelClass}>
                    Estimated Down Payment
                  </label>
                  <input
                    type="text"
                    id="downPayment"
                    name="downPayment"
                    value={formData.downPayment}
                    onChange={handleChange}
                    placeholder="$100,000"
                    className={inputClass}
                    data-testid="input-down-payment"
                  />
                  {errors.downPayment && <p className={errorClass} data-testid="error-down-payment">{errors.downPayment}</p>}
                </div>
              </>
            ) : (
              <>
                <div>
                  <label htmlFor="homeValue" className={labelClass}>
                    Current Home Value
                  </label>
                  <input
                    type="text"
                    id="homeValue"
                    name="homeValue"
                    value={formData.homeValue}
                    onChange={handleChange}
                    placeholder="$600,000"
                    className={inputClass}
                    data-testid="input-home-value"
                  />
                  {errors.homeValue && <p className={errorClass} data-testid="error-home-value">{errors.homeValue}</p>}
                </div>

                <div>
                  <label htmlFor="loanBalance" className={labelClass}>
                    Current Loan Balance
                  </label>
                  <input
                    type="text"
                    id="loanBalance"
                    name="loanBalance"
                    value={formData.loanBalance}
                    onChange={handleChange}
                    placeholder="$350,000"
                    className={inputClass}
                    data-testid="input-loan-balance"
                  />
                  {errors.loanBalance && <p className={errorClass} data-testid="error-loan-balance">{errors.loanBalance}</p>}
                </div>
              </>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-zinc-100 mb-4">Contact Information</h2>

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
                className={inputClass}
                data-testid="input-first-name"
              />
              {errors.firstName && <p className={errorClass} data-testid="error-first-name">{errors.firstName}</p>}
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
          </div>
        )}

        <div className="flex justify-between pt-4">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="px-6 py-3 bg-zinc-700 text-zinc-200  font-medium"
              data-testid="button-back"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-3 bg-primary text-primary-foreground font-medium"
              data-testid="button-next"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="px-6 py-3 bg-primary text-primary-foreground font-medium"
              data-testid="button-submit"
            >
              Submit Application
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
