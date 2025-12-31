"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { TrendingDown, TrendingUp, RefreshCw, Info, ArrowRight } from "lucide-react";
import Link from "next/link";

interface RateData {
  rate30yr: number;
  rate15yr: number;
  apr30yr?: number | null;
  apr15yr?: number | null;
  lastUpdated: string;
  source: string;
  message?: string;
}

export default function LiveRates() {
  const [rates, setRates] = useState<RateData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRates = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/rates");
      if (!response.ok) throw new Error("Failed to fetch rates");
      const data = await response.json();
      setRates(data);
    } catch (err) {
      setError("Unable to load rates");
      setRates({
        rate30yr: 6.85,
        rate15yr: 6.10,
        apr30yr: 7.20,
        apr15yr: 6.40,
        lastUpdated: new Date().toISOString(),
        source: "estimate"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", { 
        month: "short", 
        day: "numeric", 
        year: "numeric" 
      });
    } catch {
      return "Today";
    }
  };

  return (
    <section className="relative bg-zinc-950 py-12 border-b border-zinc-800 overflow-hidden" data-testid="section-live-rates">
      {/* Grayscale background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/location/IMG_6078.webp"
          alt=""
          fill
          loading="lazy"
          quality={75}
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-zinc-950/95" />
      </div>
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">Live Rates</span>
            </div>
            <span className="text-zinc-500 text-sm hidden sm:inline">
              Updated {rates ? formatDate(rates.lastUpdated) : "..."}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-12">
            <div className="text-center" data-testid="rate-30yr">
              <p className="text-zinc-400 text-sm uppercase tracking-wider mb-1">30-Year Fixed</p>
              <div className="flex items-center justify-center gap-2">
                {loading ? (
                  <div className="w-20 h-10 bg-zinc-800 animate-pulse rounded" />
                ) : (
                  <>
                    <span className="text-3xl md:text-4xl font-bold text-white">
                      {rates?.rate30yr?.toFixed(2)}%
                    </span>
                    <TrendingDown className="w-5 h-5 text-green-400" />
                  </>
                )}
              </div>
              {rates?.apr30yr && (
                <p className="text-zinc-500 text-xs mt-1">
                  APR: <span className="text-zinc-300 font-semibold">{rates.apr30yr.toFixed(2)}%</span>
                </p>
              )}
            </div>

            <div className="w-px h-12 bg-zinc-700 hidden sm:block" />

            <div className="text-center" data-testid="rate-15yr">
              <p className="text-zinc-400 text-sm uppercase tracking-wider mb-1">15-Year Fixed</p>
              <div className="flex items-center justify-center gap-2">
                {loading ? (
                  <div className="w-20 h-10 bg-zinc-800 animate-pulse rounded" />
                ) : (
                  <>
                    <span className="text-3xl md:text-4xl font-bold text-white">
                      {rates?.rate15yr?.toFixed(2)}%
                    </span>
                    <TrendingDown className="w-5 h-5 text-green-400" />
                  </>
                )}
              </div>
              {rates?.apr15yr && (
                <p className="text-zinc-500 text-xs mt-1">
                  APR: <span className="text-zinc-300 font-semibold">{rates.apr15yr.toFixed(2)}%</span>
                </p>
              )}
            </div>

            <div className="w-px h-12 bg-zinc-700 hidden lg:block" />

            <div className="flex items-center gap-4">
              <button 
                onClick={fetchRates}
                disabled={loading}
                className="p-2 text-zinc-400 hover:text-primary transition-colors disabled:opacity-50"
                aria-label="Refresh rates"
                data-testid="button-refresh-rates"
              >
                <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
              </button>
              <Link
                href="/apply"
                className="btn-luxury text-sm py-2 px-4"
                data-testid="button-lock-rate"
              >
                Lock Your Rate <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {rates?.source === "estimate" && (
          <div className="flex items-center justify-center gap-2 mt-4 text-zinc-500 text-xs">
            <Info className="w-4 h-4" />
            <span>Estimated rates. Actual rates may vary based on your situation.</span>
          </div>
        )}

        {rates?.source === "FRED" && (
          <div className="flex items-center justify-center gap-2 mt-4 text-zinc-500 text-xs">
            <Info className="w-4 h-4" />
            <span>Source: Federal Reserve Bank of St. Louis. Your rate may vary.</span>
          </div>
        )}
      </div>
    </section>
  );
}
