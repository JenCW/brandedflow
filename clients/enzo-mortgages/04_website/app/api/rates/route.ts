import { NextResponse } from "next/server";

interface FREDObservation {
  date: string;
  value: string;
}

interface FREDResponse {
  observations: FREDObservation[];
}

interface RateData {
  rate30yr: number | null;
  rate15yr: number | null;
  rate20yr: number | null;
  rateFHA: number | null;
  rateVA: number | null;
  rateJumbo: number | null;
  lastUpdated: string;
  source: string;
  weeklyChange?: number;
}

const CACHE_DURATION = 60 * 60 * 1000;
let cachedData: RateData | null = null;
let cacheTimestamp: number = 0;

async function fetchFromFRED(apiKey: string): Promise<RateData | null> {
  try {
    const [response30yr, response15yr] = await Promise.all([
      fetch(
        `https://api.stlouisfed.org/fred/series/observations?series_id=MORTGAGE30US&api_key=${apiKey}&file_type=json&sort_order=desc&limit=2`
      ),
      fetch(
        `https://api.stlouisfed.org/fred/series/observations?series_id=MORTGAGE15US&api_key=${apiKey}&file_type=json&sort_order=desc&limit=1`
      )
    ]);

    if (!response30yr.ok || !response15yr.ok) {
      throw new Error("FRED API request failed");
    }

    const data30yr: FREDResponse = await response30yr.json();
    const data15yr: FREDResponse = await response15yr.json();

    const rate30yr = data30yr.observations?.[0]?.value 
      ? parseFloat(data30yr.observations[0].value) 
      : null;
    const prevRate30yr = data30yr.observations?.[1]?.value 
      ? parseFloat(data30yr.observations[1].value) 
      : null;
    const rate15yr = data15yr.observations?.[0]?.value 
      ? parseFloat(data15yr.observations[0].value) 
      : null;

    const weeklyChange = rate30yr && prevRate30yr ? rate30yr - prevRate30yr : undefined;

    return {
      rate30yr: rate30yr && !isNaN(rate30yr) ? rate30yr : null,
      rate15yr: rate15yr && !isNaN(rate15yr) ? rate15yr : null,
      rate20yr: rate30yr ? rate30yr - 0.125 : null,
      rateFHA: rate30yr ? rate30yr - 0.25 : null,
      rateVA: rate30yr ? rate30yr - 0.375 : null,
      rateJumbo: rate30yr ? rate30yr + 0.25 : null,
      lastUpdated: data30yr.observations?.[0]?.date || new Date().toISOString(),
      source: "FRED (Freddie Mac Weekly)",
      weeklyChange
    };
  } catch (error) {
    console.error("FRED API error:", error);
    return null;
  }
}

function getEstimatedRates(): RateData {
  const baseRate = 6.85;
  return {
    rate30yr: baseRate,
    rate15yr: baseRate - 0.75,
    rate20yr: baseRate - 0.125,
    rateFHA: baseRate - 0.25,
    rateVA: baseRate - 0.375,
    rateJumbo: baseRate + 0.25,
    lastUpdated: new Date().toISOString(),
    source: "estimate"
  };
}

export async function GET() {
  try {
    if (cachedData && Date.now() - cacheTimestamp < CACHE_DURATION) {
      return NextResponse.json(cachedData);
    }

    const fredApiKey = process.env.FRED_API_KEY;
    
    let rateData: RateData | null = null;

    if (fredApiKey) {
      rateData = await fetchFromFRED(fredApiKey);
    }

    if (!rateData) {
      rateData = getEstimatedRates();
    }

    cachedData = rateData;
    cacheTimestamp = Date.now();

    return NextResponse.json(rateData);
  } catch (error) {
    console.error("Rate API error:", error);
    
    return NextResponse.json(getEstimatedRates());
  }
}
