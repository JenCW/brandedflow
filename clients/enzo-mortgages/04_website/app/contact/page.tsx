"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Clock, CheckCircle, Phone, Mail, MapPin } from "lucide-react";
import ValuationForm from "@/app/components/ValuationForm";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
    if (!formData.email.trim()) newErrors.email = "Required";
    if (!formData.phone.trim()) newErrors.phone = "Required";
    if (!formData.message.trim()) newErrors.message = "Required";
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
          leadType: "Contact Form",
          source: "Contact Page",
          timeline: "1-3months", // Contact forms are typically exploratory
          message: formData.message,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-primary rounded-lg transition-colors";
  const labelClass = "block text-sm font-medium text-zinc-300 mb-2";
  const errorClass = "text-sm text-red-400 mt-1";

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/context/va-loans-hero.png"
            alt="Contact Us"
            fill
            className="object-cover grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 px-4 py-2 mb-6 rounded-lg">
              <Mail className="w-5 h-5 text-primary" />
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                Get In Touch
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 uppercase tracking-wide">
              Contact <span className="text-primary">Enzo</span>
            </h1>
            <p className="text-xl text-zinc-200 mb-8 leading-relaxed">
              Have questions? We're here to help. Get in touch and we'll respond within 5 minutes.
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
              <div className="text-zinc-300">
                <Shield className="w-5 h-5 inline mr-2 text-primary" />
                NMLS #1984772
              </div>
              <div className="text-zinc-300">
                <Clock className="w-5 h-5 inline mr-2 text-primary" />
                24/7 Available
              </div>
              <div className="text-zinc-300">
                <CheckCircle className="w-5 h-5 inline mr-2 text-primary" />
                5-Minute Response
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="relative bg-zinc-900 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-zinc-900/95 backdrop-blur-sm border border-zinc-700 rounded-2xl p-8 md:p-12 shadow-2xl"
          >
            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-primary mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-white mb-4 uppercase tracking-wide">
                  Thank You!
                </h2>
                <p className="text-xl text-zinc-300 mb-8">
                  We'll get back to you within 5 minutes.
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded hover:bg-primary/90 transition-colors"
                >
                  Back to Home <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-white mb-2 uppercase tracking-wide">
                    Send Us a Message
                  </h2>
                  <p className="text-zinc-400">Fill out the form below and we'll respond quickly</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
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
                      required
                    />
                    {errors.firstName && <p className={errorClass}>{errors.firstName}</p>}
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
                      required
                    />
                    {errors.lastName && <p className={errorClass}>{errors.lastName}</p>}
                  </div>
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
                    required
                  />
                  {errors.email && <p className={errorClass}>{errors.email}</p>}
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
                    placeholder="(949) 522-0606"
                    className={inputClass}
                    required
                  />
                  {errors.phone && <p className={errorClass}>{errors.phone}</p>}
                </div>

                <div>
                  <label htmlFor="message" className={labelClass}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    rows={5}
                    className={inputClass}
                    required
                  />
                  {errors.message && <p className={errorClass}>{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full btn-luxury justify-center disabled:opacity-50"
                >
                  {submitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="bg-zinc-950 py-16 border-t border-zinc-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <Phone className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Call Us</h3>
              <a href="tel:+19495220606" className="text-zinc-400 hover:text-primary transition-colors">
                (949) 522-0606
              </a>
            </div>
            <div>
              <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Email Us</h3>
              <a href="mailto:smahmoud@emortgagecapital.com" className="text-zinc-400 hover:text-primary transition-colors block">
                smahmoud@emortgagecapital.com
              </a>
            </div>
            <div>
              <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Visit Us</h3>
              <p className="text-zinc-400">Orange County, California</p>
            </div>
          </div>
        </div>
      </section>

      {/* Hidden Valuation Form */}
      <section className="bg-zinc-900/50 py-16 border-t border-zinc-800">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 uppercase tracking-wide">
              Get Your Home's Value Instantly
            </h2>
            <p className="text-zinc-400 text-lg">
              See what your property is worth in today's market. Free, no obligation.
            </p>
          </div>
          <div className="bg-zinc-800/50 rounded-lg p-6 border border-zinc-700">
            <ValuationForm />
          </div>
        </div>
      </section>
    </div>
  );
}
