import { NextRequest, NextResponse } from "next/server";

type IntakePayload = Record<string, unknown>;

function toString(v: unknown): string | undefined {
  if (typeof v === "string" && v.trim()) return v.trim();
  return undefined;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as IntakePayload;

    const email = toString(body.email);
    if (!email) {
      return NextResponse.json({ ok: false, error: "email is required" }, { status: 400 });
    }

    const airtableApiKey = process.env.AIRTABLE_API_KEY;
    const airtableBaseId = process.env.AIRTABLE_BASE_ID;
    const airtableTableName = process.env.AIRTABLE_TABLE_NAME || "Leads";

    // Client config: default client_id can be set per-site in Netlify env vars.
    const clientId = toString(body.client_id) || process.env.CLIENT_ID || "unknown-client";

    // If Airtable isn’t configured, accept the lead but don’t fail the UX.
    if (!airtableApiKey || !airtableBaseId) {
      return NextResponse.json({ ok: true, message: "Lead received (Airtable not configured)" });
    }

    const fields: Record<string, string | number | boolean | null> = {
      Email: email,
      Status: "New",
      "Client ID": clientId,
      "Lead Type": toString(body.lead_type) || "unknown",
      Source: toString(body.source) || "unknown",
      "Landing Page URL": toString(body.landing_page_url) || null,
      "Needs Processing": true,
      "Raw Payload": JSON.stringify(body),
    };

    const firstName = toString(body.first_name);
    const lastName = toString(body.last_name);
    const phone = toString(body.phone);

    if (firstName) fields["First Name"] = firstName;
    if (lastName) fields["Last Name"] = lastName;
    if (phone) fields.Phone = phone;

    // Optional UTMs
    for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const) {
      const v = toString(body[key]);
      if (v) fields[key.toUpperCase().replace("UTM_", "UTM ")] = v;
    }

    const response = await fetch(
      `https://api.airtable.com/v0/${airtableBaseId}/${encodeURIComponent(airtableTableName)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${airtableApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fields }),
      }
    );

    if (!response.ok) {
      const details = await response.text();
      return NextResponse.json(
        { ok: false, error: "Failed to save lead to Airtable", details },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}

