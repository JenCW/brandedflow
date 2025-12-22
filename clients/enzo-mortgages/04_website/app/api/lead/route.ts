import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, leadType, loanType, urgency, source, address, propertyType, flags } = body;

    if (!email || !phone || !leadType) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const airtableApiKey = process.env.AIRTABLE_API_KEY;
    const airtableBaseId = process.env.AIRTABLE_BASE_ID;
    const airtableTableName = process.env.AIRTABLE_TABLE_NAME || "Leads";

    if (!airtableApiKey || !airtableBaseId) {
      return NextResponse.json(
        { success: false, error: "Airtable not configured" },
        { status: 500 }
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
            Address: address || "",
            "Property Type": propertyType || "",
            Flags: flags ? JSON.stringify(flags) : "",
            Status: "New",
            Timestamp: new Date().toISOString(),
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Airtable error:", errorData);
      return NextResponse.json(
        { success: false, error: "Failed to save lead" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead API error:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
