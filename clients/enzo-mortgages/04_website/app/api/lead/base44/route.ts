import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      // Client Code Basic (Universal - all clients)
      firstName,
      lastName,
      email, 
      phone,
      address,
      // Client Code 2 (Industry-specific - mortgage)
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
      // Legacy support (if name comes as single field)
      name,
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
      console.log("Lead captured (Airtable not configured):", { email, firstName, lastName, phone, leadType, source });
      return NextResponse.json({ 
        success: true, 
        message: "Lead received" 
      });
    }

    // Split name if provided as single field (legacy support)
    let finalFirstName = firstName;
    let finalLastName = lastName;
    if (name && !firstName && !lastName) {
      const nameParts = name.trim().split(/\s+/);
      finalFirstName = nameParts[0] || "";
      finalLastName = nameParts.slice(1).join(" ") || "";
    }

    // Client Code Basic - Universal fields (all clients)
    const airtableFields: Record<string, string | number | boolean | null> = {
      Email: email,
      Status: "New",
      Timestamp: new Date().toISOString().split('T')[0],
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
    if (urgency) airtableFields.Urgency = urgency;
    if (source) airtableFields.Source = source;
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
