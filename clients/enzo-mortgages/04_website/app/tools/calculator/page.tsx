import type { Metadata } from "next";
import CalculatorClient from "./CalculatorClient";

export const metadata: Metadata = {
  title: "Mortgage Calculator | Enzo Mortgages",
  description: "Calculate your monthly mortgage payment, see how much home you can afford, or estimate your refinance savings with our free mortgage calculators.",
};

export default function CalculatorPage() {
  return <CalculatorClient />;
}
