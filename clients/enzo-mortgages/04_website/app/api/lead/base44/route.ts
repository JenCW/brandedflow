import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      name, 
      email, 
      phone, 
      leadType, 
      loanType, 
      urgency, 
      source, 
      address, 
      propertyType,
      loanAmount,
      creditScore,
      propertyValue,
      downPayment
    } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      );
    }

    const airtableApiKey = process.env.AIRTABLE_API_KEY;
    const airtableBaseId = process.env.AIRTABLE_BASE_ID;
    const airtableTableName = process.env.AIRTABLE_TABLE_NAME || "leads";

    if (!airtableApiKey || !airtableBaseId) {
      console.log("Lead captured (Airtable not configured):", { email, name, phone, leadType, source });
      return NextResponse.json({ 
        success: true, 
        message: "Lead received" 
      });
    }

    const airtableFields: Record<string, string | number | boolean | null> = {
      Email: email,
      Status: "New",
      Timestamp: new Date().toISOString().split('T')[0],
    };

    if (name) airtableFields.Name = name;
    if (phone) airtableFields.Phone = phone;
    if (leadType) airtableFields["Lead Type"] = leadType;
    if (loanType) airtableFields["Loan Type"] = loanType;
    if (urgency) airtableFields.Urgency = urgency;
    if (source) airtableFields.Source = source;
    if (address) airtableFields.Location = address;
    if (propertyType) airtableFields["Property Type"] = propertyType;
    if (loanAmount) airtableFields["Loan Amount"] = loanAmount;
    if (creditScore) airtableFields["Credit Score"] = creditScore;
    if (propertyValue) airtableFields["Property Value"] = propertyValue;
    if (downPayment) airtableFields["Down Payment"] = downPayment;

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
      }, { status: 500 });
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
