import { NextRequest, NextResponse } from "next/server";

interface ValuationRequest {
  address: string;
  zipCode: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface ZillowResponse {
  zpid?: string;
  zestimate?: {
    amount: {
      currency: string;
      value: number;
    };
    "last-updated": string;
    "valuation-range": {
      low: { value: number };
      high: { value: number };
    };
  };
  address?: {
    street: string;
    zipcode: string;
    city: string;
    state: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: ValuationRequest = await request.json();
    const { address, zipCode, firstName, lastName, email } = body;

    if (!address || !zipCode || !email || !firstName || !lastName) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    // First, capture the lead info in the background (non-blocking)
    // Use internal API call - don't wait for it
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"}/api/lead/base44`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        address: `${address}, ${zipCode}`,
        leadType: "Property Valuation",
        source: "Home Valuation Tool",
        urgency: "Medium",
      }),
    }).catch((error) => {
      // Don't fail the valuation if lead capture fails
      console.error("Lead capture error:", error);
    });

    // Get Zillow API key from environment
    const zillowApiKey = process.env.ZILLOW_API_KEY;
    
    if (!zillowApiKey) {
      // If no API key, return a mock valuation for development
      // In production, you should have the API key set
      const mockValuation = generateMockValuation(address, zipCode);
      return NextResponse.json({
        success: true,
        valuation: mockValuation,
        source: "mock",
        message: "Zillow API key not configured. Showing mock data.",
      });
    }

    // Call Zillow API via RapidAPI or direct API
    // Note: Zillow's direct API requires specific authentication
    // You may need to use a service like RapidAPI that wraps Zillow
    
    // Option 1: Using RapidAPI Zillow wrapper
    const rapidApiKey = process.env.RAPIDAPI_KEY;
    if (rapidApiKey) {
      try {
        const response = await fetch(
          `https://zillow-com1.p.rapidapi.com/propertyExtendedSearch?location=${encodeURIComponent(address)}&home_type=Houses`,
          {
            method: "GET",
            headers: {
              "X-RapidAPI-Key": rapidApiKey,
              "X-RapidAPI-Host": "zillow-com1.p.rapidapi.com",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.props && data.props.length > 0) {
            const property = data.props[0];
            const valuation = {
              value: property.price || property.zestimate || 0,
              low: property.price ? property.price * 0.9 : 0,
              high: property.price ? property.price * 1.1 : 0,
              lastUpdated: new Date().toISOString(),
              address: property.address || address,
              zpid: property.zpid,
              source: "Zillow",
            };

            return NextResponse.json({
              success: true,
              valuation,
              source: "zillow",
            });
          }
        }
      } catch (error) {
        console.error("RapidAPI Zillow error:", error);
      }
    }

    // Option 2: Using Zillow Zestimate API (requires ZWSID)
    const zwsid = process.env.ZILLOW_ZWSID;
    if (zwsid) {
      try {
        // Parse address components
        const addressParts = address.split(",");
        const street = addressParts[0]?.trim() || address;
        const cityState = addressParts[1]?.trim() || "";
        const city = cityState.split(" ")[0] || "";
        const state = cityState.split(" ")[1] || "CA";

        const zillowUrl = `https://www.zillow.com/webservice/GetSearchResults.htm?zws-id=${zwsid}&address=${encodeURIComponent(street)}&citystatezip=${encodeURIComponent(`${city}, ${state} ${zipCode}`)}`;
        
        const response = await fetch(zillowUrl);
        const xmlText = await response.text();
        
        // Parse XML response (simplified - you may want to use an XML parser)
        const zestimateMatch = xmlText.match(/<zestimate><amount currency="USD">(\d+)<\/amount>/);
        const lowMatch = xmlText.match(/<low currency="USD">(\d+)<\/low>/);
        const highMatch = xmlText.match(/<high currency="USD">(\d+)<\/high>/);
        
        if (zestimateMatch) {
          const valuation = {
            value: parseInt(zestimateMatch[1]),
            low: lowMatch ? parseInt(lowMatch[1]) : parseInt(zestimateMatch[1]) * 0.9,
            high: highMatch ? parseInt(highMatch[1]) : parseInt(zestimateMatch[1]) * 1.1,
            lastUpdated: new Date().toISOString(),
            address: address,
            source: "Zillow Zestimate",
          };

          return NextResponse.json({
            success: true,
            valuation,
            source: "zillow",
          });
        }
      } catch (error) {
        console.error("Zillow Zestimate API error:", error);
      }
    }

    // Fallback: Return mock data if API calls fail
    const mockValuation = generateMockValuation(address, zipCode);
    return NextResponse.json({
      success: true,
      valuation: mockValuation,
      source: "mock",
      message: "Unable to fetch from Zillow API. Showing estimated valuation.",
    });

  } catch (error) {
    console.error("Valuation API error:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}

function generateMockValuation(address: string, zipCode: string) {
  // Generate a realistic mock valuation based on zip code
  // California zip codes typically have higher values
  const baseValue = zipCode.startsWith("9") ? 800000 : 600000;
  const variation = Math.random() * 200000 - 100000; // ±$100k variation
  const value = Math.round(baseValue + variation);
  
  return {
    value,
    low: Math.round(value * 0.9),
    high: Math.round(value * 1.1),
    lastUpdated: new Date().toISOString(),
    address: address,
    source: "Estimated",
  };
}
