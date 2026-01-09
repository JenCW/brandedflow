import { NextRequest, NextResponse } from "next/server";

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
  try {
    const body = await request.json();
    const { name, email, phone, leadType, loanType, urgency, source, address, propertyType, flags } = body;

    if (!email || !phone || !leadType) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400, headers: getCorsHeaders() }
      );
    }

    const airtableApiKey = process.env.AIRTABLE_API_KEY;
    const airtableBaseId = process.env.AIRTABLE_BASE_ID;
    const airtableTableName = process.env.AIRTABLE_TABLE_NAME || "leads";

    if (!airtableApiKey || !airtableBaseId) {
      return NextResponse.json(
        { success: false, error: "Airtable not configured" },
        { status: 500, headers: getCorsHeaders() }
      );
    }

    const response = await fetch(
      `https://api.airtable.com/v0/${airtableBaseId}/${encodeURIComponent(airtableTableName)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${airtableApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            Name: name || "",
            Email: email,
            Phone: phone,
            "Lead Type": leadType,
            "Loan Type": loanType || "",
            Urgency: urgency || "",
            Source: source || "",
            Location: address || "",
            "Property Type": propertyType || "",
            Status: "New",
            Timestamp: new Date().toISOString().split('T')[0],
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Airtable API error:", {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
        baseId: airtableBaseId,
        tableName: airtableTableName
      });
      return NextResponse.json(
        { success: false, error: "Failed to save lead to Airtable", details: errorData },
        { status: 500, headers: getCorsHeaders() }
      );
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
