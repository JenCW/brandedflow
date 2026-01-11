import { NextRequest, NextResponse } from "next/server";
import { rateLimit, RateLimitPresets } from "../../lib/rate-limit";
import { calculateQualificationUrgency, extractStateFromAddress } from "./qualification";
import { leadIntakeSchema, validateInput } from "../../../lib/validation";
import { ZodError } from "zod";

// CORS headers helper
function getCorsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
  };
}

// Handle preflight OPTIONS requests
export async function OPTIONS() {
  return NextResponse.json({}, { headers: getCorsHeaders() });
}

export async function POST(request: NextRequest) {
  // Apply rate limiting: 5 requests per minute per IP
  const rateLimitResponse = await rateLimit(request, RateLimitPresets.STRICT);
  if (rateLimitResponse) {
    // Add CORS headers to rate limit response
    const headers = new Headers(rateLimitResponse.headers);
    Object.entries(getCorsHeaders()).forEach(([key, value]) => {
      headers.set(key, value);
    });
    return new NextResponse(rateLimitResponse.body, {
      status: rateLimitResponse.status,
      statusText: rateLimitResponse.statusText,
      headers,
    });
  }

  try {
    const body = await request.json();

    // Validate and sanitize input data
    let validatedData;
    try {
      validatedData = leadIntakeSchema.parse(body);
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
        console.warn('Validation error:', errorMessages, 'Data:', body);
        return NextResponse.json(
          {
            success: false,
            error: "Invalid input data",
            details: error.errors
          },
          { status: 400, headers: getCorsHeaders() }
        );
      }
      throw error;
    }

    // Check for suspicious content in text fields
    try {
      if (validatedData.message) validateInput(validatedData.message, 'message');
      if (validatedData.firstName) validateInput(validatedData.firstName, 'firstName');
      if (validatedData.lastName) validateInput(validatedData.lastName, 'lastName');
    } catch (error) {
      console.error('Security validation failed:', error);
      return NextResponse.json(
        { success: false, error: "Invalid input detected" },
        { status: 400, headers: getCorsHeaders() }
      );
    }

    const {
      email,
      firstName,
      lastName,
      name,
      phone,
      address,
      leadType,
      loanType,
      urgency,
      source,
      propertyType,
      loanAmount,
      creditScore,
      propertyValue,
      downPayment,
      currentRate,
      refinanceGoal,
      purchasePrice,
      homeValue,
      loanBalance,
      message,
      timeline,
      state,
      income,
    } = validatedData;

    const airtableApiKey = process.env.AIRTABLE_API_KEY;
    const airtableBaseId = process.env.AIRTABLE_BASE_ID;
    const airtableTableName = process.env.AIRTABLE_TABLE_NAME || "leads";

    if (!airtableApiKey || !airtableBaseId) {
      console.log("Lead captured (Airtable not configured):", { email, firstName, lastName, phone, leadType, source });
      return NextResponse.json({ 
        success: true, 
        message: "Lead received" 
      }, { headers: getCorsHeaders() });
    }

    // Split name if provided as single field (legacy support)
    let finalFirstName = firstName;
    let finalLastName = lastName;
    if (name && !firstName && !lastName) {
      const nameParts = name.trim().split(/\s+/);
      finalFirstName = nameParts[0] || "";
      finalLastName = nameParts.slice(1).join(" ") || "";
    }

    // Extract state from address if not provided
    const finalState = state || extractStateFromAddress(address);

    // Calculate qualification urgency using the tested algorithm
    const calculatedUrgency = urgency || calculateQualificationUrgency({
      timeline,
      loanAmount,
      purchasePrice,
      homeValue,
      loanBalance,
      state: finalState,
      creditScore,
      leadType,
      downPayment,
      propertyType,
      income,
    });

    // Client Code Basic - Universal fields (all clients)
    const airtableFields: Record<string, string | number | boolean | null> = {
      Email: email,
      Status: "New",
      Timestamp: new Date().toISOString().split('T')[0],
      // Processing fields (initialized as null, n8n will set these)
      "Processed At": null,
      "Processing Error": null,
    };

    // Add Client Code Basic fields
    if (finalFirstName) airtableFields["First Name"] = finalFirstName;
    if (finalLastName) airtableFields["Last Name"] = finalLastName;
    if (phone) airtableFields.Phone = phone;
    if (address) airtableFields.Address = address;

    // Client Code 2 - Mortgage-specific fields
    // These will be used by n8n to create linked record in "Client Enzo Mortgages CRM" subtable
    if (leadType) airtableFields["Lead Type"] = leadType;
    if (loanType) airtableFields["Loan Type"] = loanType;
    // Use calculated urgency (based on qualification factors) instead of hardcoded value
    if (calculatedUrgency) airtableFields.Urgency = calculatedUrgency;
    if (source) airtableFields.Source = source;
    // Qualification factors (for proper qualification, not just urgency)
    if (timeline) airtableFields["Timeline"] = timeline;
    if (finalState) airtableFields["State"] = finalState;
    if (income) airtableFields["Income"] = income;
    if (propertyType) airtableFields["Property Type"] = propertyType;
    if (loanAmount) airtableFields["Loan Amount"] = loanAmount;
    if (creditScore) airtableFields["Credit Score"] = creditScore;
    if (propertyValue) airtableFields["Property Value"] = propertyValue;
    if (downPayment) airtableFields["Down Payment"] = downPayment;
    if (currentRate) airtableFields["Current Rate"] = currentRate;
    if (refinanceGoal) airtableFields["Refinance Goal"] = refinanceGoal;
    if (purchasePrice) airtableFields["Purchase Price"] = purchasePrice;
    if (homeValue) airtableFields["Home Value"] = homeValue;
    if (loanBalance) airtableFields["Loan Balance"] = loanBalance;
    if (message) airtableFields["Message"] = message;

    // Store Client Code 2 data as JSON for n8n to process into subtable
    const clientCode2Data: Record<string, any> = {
      leadType,
      loanType,
      urgency: calculatedUrgency, // Use calculated urgency
      source,
      propertyType,
      loanAmount,
      creditScore,
      propertyValue,
      downPayment,
      currentRate,
      refinanceGoal,
      purchasePrice,
      homeValue,
      loanBalance,
      message,
      // Qualification factors
      timeline,
      state: finalState,
      income,
    };
    
    // Remove null/undefined values
    Object.keys(clientCode2Data).forEach(key => {
      if (clientCode2Data[key] === null || clientCode2Data[key] === undefined) {
        delete clientCode2Data[key];
      }
    });

    // Store Client Code 2 as JSON string for n8n to process
    if (Object.keys(clientCode2Data).length > 0) {
      airtableFields["Client Code 2 Data"] = JSON.stringify(clientCode2Data);
    }

    // Add flag to indicate this needs subtable processing
    airtableFields["Needs CRM Processing"] = true;
    airtableFields["Client"] = "Enzo Mortgages"; // For filtering in n8n

    const response = await fetch(
      `https://api.airtable.com/v0/${airtableBaseId}/${encodeURIComponent(airtableTableName)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${airtableApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fields: airtableFields }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Airtable API error:", {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
        fields: airtableFields,
        baseId: airtableBaseId,
        tableName: airtableTableName
      });
      return NextResponse.json({
        success: false,
        error: "Failed to save lead to Airtable",
        details: errorData
      }, { status: 500, headers: getCorsHeaders() });
    }

    return NextResponse.json({ success: true }, { headers: getCorsHeaders() });

  } catch (error) {
    console.error("Lead API error:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500, headers: getCorsHeaders() }
    );
  }
}