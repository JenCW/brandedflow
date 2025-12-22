import Link from "next/link";
import ApplyForm from "../components/ApplyForm";

export default function Page() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-foreground mb-8 text-center">
        Start Your Application
      </h1>
      <ApplyForm />
      
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
