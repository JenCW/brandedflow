import type { Metadata } from "next";
import dynamic from "next/dynamic";

// Dynamic import for calculator component (heavy recharts dependency)
const CalculatorClient = dynamic(() => import("./CalculatorClient"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  )
});

export const metadata: Metadata = {
  title: "Mortgage Calculator | Enzo Mortgages",
  description: "Calculate your monthly mortgage payment, see how much home you can afford, or estimate your refinance savings with our free mortgage calculators.",
};

export default function CalculatorPage() {
  return <CalculatorClient />;
}
