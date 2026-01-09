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
      urgency, // Legacy - will be calculated from qualification factors
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
      // Qualification factors (replaces urgency-only logic)
      timeline, // how soon: "asap", "1-3months", "3-6months", "6plus", "exploring"
      state, // licensed area (extracted from address or provided)
      income, // annual income or income band
      // Legacy support (if name comes as single field)
      name,
    } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400, headers: getCorsHeaders() }
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
    let finalState = state;
    if (!finalState && address) {
      // Try to extract state from address (e.g., "123 Main St, Los Angeles, CA 90210")
      const stateMatch = address.match(/\b([A-Z]{2})\s+\d{5}/);
      if (stateMatch) {
        finalState = stateMatch[1];
      }
    }

    // Calculate qualification urgency based on multiple factors (not just timeline)
    // Factors: timeline, loan amount/price range, state (licensed area), credit/income, purchase vs refinance
    let calculatedUrgency = urgency; // Fallback to provided urgency if calculation fails
    
    if (timeline || finalState || creditScore || loanAmount || purchasePrice || homeValue || leadType) {
      let urgencyScore = 0;
      
      // Timeline factor (0-3 points)
      if (timeline === "asap") urgencyScore += 3;
      else if (timeline === "1-3months") urgencyScore += 2;
      else if (timeline === "3-6months") urgencyScore += 1;
      else if (timeline === "exploring") urgencyScore -= 1;
      
      // Loan amount/price range factor (0-2 points)
      const effectiveLoanAmount = loanAmount || purchasePrice || homeValue || loanBalance;
      if (effectiveLoanAmount) {
        const amount = typeof effectiveLoanAmount === 'string' ? parseFloat(effectiveLoanAmount.replace(/[^0-9.]/g, '')) : effectiveLoanAmount;
        if (amount >= 500000) urgencyScore += 2; // High-value loans
        else if (amount >= 200000) urgencyScore += 1; // Medium-value loans
      }
      
      // State/licensed area factor (0-1 point) - CA is primary market
      if (finalState === "CA" || finalState === "California") urgencyScore += 1;
      
      // Credit score factor (0-2 points)
      if (creditScore) {
        const score = typeof creditScore === 'string' ? parseFloat(creditScore) : creditScore;
        if (score >= 740) urgencyScore += 2; // Excellent credit
        else if (score >= 680) urgencyScore += 1; // Good credit
        else if (score < 620) urgencyScore -= 1; // Poor credit (may need special handling)
      }
      
      // Purchase vs refinance factor (0-1 point)
      if (leadType === "Purchase" || leadType === "Home Purchase") urgencyScore += 1; // Purchases often more time-sensitive
      
      // Down payment / LTV factor (0-2 points) - Higher down payment = lower risk
      if (downPayment && (purchasePrice || homeValue)) {
        const downPaymentNum = typeof downPayment === 'string' ? parseFloat(downPayment.replace(/[^0-9.]/g, '')) : downPayment;
        const propertyValueNum = typeof (purchasePrice || homeValue) === 'string' ? parseFloat((purchasePrice || homeValue).toString().replace(/[^0-9.]/g, '')) : (purchasePrice || homeValue);
        if (propertyValueNum > 0) {
          const downPaymentPercent = (downPaymentNum / propertyValueNum) * 100;
          if (downPaymentPercent >= 20) urgencyScore += 2; // 20%+ down = conventional, lower risk
          else if (downPaymentPercent >= 10) urgencyScore += 1; // 10-20% down = FHA/VA territory
          else if (downPaymentPercent < 5) urgencyScore -= 1; // <5% down = higher risk, may need special programs
        }
      }
      
      // Property type factor (0-1 point) - Primary residence preferred
      if (propertyType) {
        const propType = propertyType.toLowerCase();
        if (propType.includes("primary") || propType.includes("owner") || propType.includes("residence")) {
          urgencyScore += 1; // Primary residence = lower risk
        } else if (propType.includes("investment") || propType.includes("rental")) {
          urgencyScore -= 0.5; // Investment properties = higher risk, different programs
        }
      }
      
      // Loan-to-value (LTV) factor for refinances (0-1 point)
      if (leadType && (leadType.includes("Refinance") || leadType.includes("Refi")) && homeValue && loanBalance) {
        const homeValueNum = typeof homeValue === 'string' ? parseFloat(homeValue.replace(/[^0-9.]/g, '')) : homeValue;
        const loanBalanceNum = typeof loanBalance === 'string' ? parseFloat(loanBalance.replace(/[^0-9.]/g, '')) : loanBalance;
        if (homeValueNum > 0) {
          const ltv = (loanBalanceNum / homeValueNum) * 100;
          if (ltv <= 80) urgencyScore += 1; // LTV ≤80% = conventional refi, lower risk
          else if (ltv > 95) urgencyScore -= 1; // LTV >95% = underwater, may need special handling
        }
      }
      
      // Income/DTI indicator (0-1 point) - If income provided, it shows serious intent
      if (income) {
        const incomeNum = typeof income === 'string' ? parseFloat(income.replace(/[^0-9.]/g, '')) : income;
        if (incomeNum >= 100000) urgencyScore += 1; // Higher income = better qualification potential
      }
      
      // Convert score to urgency level
      if (urgencyScore >= 5) calculatedUrgency = "Hot";
      else if (urgencyScore >= 3) calculatedUrgency = "High";
      else if (urgencyScore >= 1) calculatedUrgency = "Medium";
      else if (urgencyScore >= 0) calculatedUrgency = "Low";
      else calculatedUrgency = "Nurture";
    }

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