import LeadForm from "./components/LeadForm";

export default function Page() {
  return (
    <main style={{ maxWidth: 760, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: 40, marginBottom: 8 }}>Client Website Template</h1>
      <p style={{ opacity: 0.8, marginBottom: 24 }}>
        This is the minimal Next.js starter. Replace with client-specific pages
        and styling. Lead intake is Airtable-first via <code>/api/lead/intake</code>.
      </p>
      <LeadForm />
    </main>
  );
}

