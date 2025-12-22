import Link from "next/link";

export default function Page() {
  return (
    <div style={{ padding: "40px" }}>
      <h1>Placeholder</h1>
      <p>This page exists. Content comes later.</p>
      
      <div className="pt-12">
        <Link 
          href="/" 
          className="inline-flex items-center text-muted-foreground hover:text-foreground text-sm transition-colors"
          data-testid="link-back-home"
        >
          <span className="mr-2">&larr;</span> Home
        </Link>
      </div>
    </div>
  );
}
