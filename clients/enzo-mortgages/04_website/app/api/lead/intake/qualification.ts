/**
 * Lead Qualification Scoring Logic
 *
 * Calculates lead urgency based on multiple factors:
 * - Timeline (0-3 points)
 * - Loan amount (0-2 points)
 * - State/location (0-1 points)
 * - Credit score (-1 to 2 points)
 * - Lead type (0-1 points)
 * - Down payment/LTV (-1 to 2 points)
 * - Property type (-0.5 to 1 points)
 * - Income (0-1 points)
 *
 * Urgency Thresholds:
 * - Hot: >= 5 points
 * - High: 3-4 points
 * - Medium: 1-2 points
 * - Low: 0 points
 * - Nurture: < 0 points
 */

export interface LeadData {
  timeline?: string
  loanAmount?: number | string
  purchasePrice?: number | string
  homeValue?: number | string
  loanBalance?: number | string
  state?: string
  creditScore?: number | string
  leadType?: string
  downPayment?: number | string
  propertyType?: string
  income?: number | string
}

/**
 * Parses a numeric value that might be formatted as a currency string
 */
function parseNumericValue(value: number | string | undefined): number {
  if (value === undefined || value === null) return 0
  if (typeof value === 'number') return value
  return parseFloat(value.replace(/[^0-9.]/g, '')) || 0
}

/**
 * Calculates the qualification urgency score for a lead
 * @returns Urgency level: "Hot" | "High" | "Medium" | "Low" | "Nurture"
 */
export function calculateQualificationUrgency(data: LeadData): string {
  let urgencyScore = 0

  // Timeline factor (0-3 points)
  if (data.timeline === "asap") urgencyScore += 3
  else if (data.timeline === "1-3months") urgencyScore += 2
  else if (data.timeline === "3-6months") urgencyScore += 1
  else if (data.timeline === "exploring") urgencyScore -= 1

  // Loan amount/price range factor (0-2 points)
  const effectiveLoanAmount =
    data.loanAmount || data.purchasePrice || data.homeValue || data.loanBalance
  if (effectiveLoanAmount) {
    const amount = parseNumericValue(effectiveLoanAmount)
    if (amount >= 500000) urgencyScore += 2 // High-value loans
    else if (amount >= 200000) urgencyScore += 1 // Medium-value loans
  }

  // State/licensed area factor (0-1 point) - CA is primary market
  if (data.state === "CA" || data.state === "California") urgencyScore += 1

  // Credit score factor (-1 to 2 points)
  if (data.creditScore) {
    const score = parseNumericValue(data.creditScore)
    if (score >= 740) urgencyScore += 2 // Excellent credit
    else if (score >= 680) urgencyScore += 1 // Good credit
    else if (score < 620) urgencyScore -= 1 // Poor credit (may need special handling)
  }

  // Purchase vs refinance factor (0-1 point)
  if (data.leadType === "Purchase" || data.leadType === "Home Purchase") {
    urgencyScore += 1 // Purchases often more time-sensitive
  }

  // Down payment / LTV factor (-1 to 2 points) - Higher down payment = lower risk
  if (data.downPayment && (data.purchasePrice || data.homeValue)) {
    const downPaymentNum = parseNumericValue(data.downPayment)
    const propertyValueNum = parseNumericValue(data.purchasePrice || data.homeValue)
    if (propertyValueNum > 0) {
      const downPaymentPercent = (downPaymentNum / propertyValueNum) * 100
      if (downPaymentPercent >= 20) urgencyScore += 2 // 20%+ down = conventional, lower risk
      else if (downPaymentPercent >= 10) urgencyScore += 1 // 10-20% down = FHA/VA territory
      else if (downPaymentPercent < 5) urgencyScore -= 1 // <5% down = higher risk, may need special programs
    }
  }

  // Property type factor (-0.5 to 1 points) - Primary residence preferred
  if (data.propertyType) {
    const propType = data.propertyType.toLowerCase()
    if (propType.includes("primary") || propType.includes("owner") || propType.includes("residence")) {
      urgencyScore += 1 // Primary residence = lower risk
    } else if (propType.includes("investment") || propType.includes("rental")) {
      urgencyScore -= 0.5 // Investment properties = higher risk, different programs
    }
  }

  // Loan-to-value (LTV) factor for refinances (0-1 point)
  if (data.leadType &&
      (data.leadType.includes("Refinance") || data.leadType.includes("Refi")) &&
      data.homeValue && data.loanBalance) {
    const homeValueNum = parseNumericValue(data.homeValue)
    const loanBalanceNum = parseNumericValue(data.loanBalance)
    if (homeValueNum > 0) {
      const ltv = (loanBalanceNum / homeValueNum) * 100
      if (ltv <= 80) urgencyScore += 1 // LTV ≤80% = conventional refi, lower risk
      else if (ltv > 95) urgencyScore -= 1 // LTV >95% = underwater, may need special handling
    }
  }

  // Income/DTI indicator (0-1 point) - If income provided, it shows serious intent
  if (data.income) {
    const incomeNum = parseNumericValue(data.income)
    if (incomeNum >= 100000) urgencyScore += 1 // Higher income = better qualification potential
  }

  // Convert score to urgency level
  if (urgencyScore >= 5) return "Hot"
  else if (urgencyScore >= 3) return "High"
  else if (urgencyScore >= 1) return "Medium"
  else if (urgencyScore >= 0) return "Low"
  else return "Nurture"
}

/**
 * Extracts state code from an address string
 * Example: "123 Main St, Los Angeles, CA 90210" => "CA"
 */
export function extractStateFromAddress(address: string | undefined): string | undefined {
  if (!address) return undefined
  const stateMatch = address.match(/\b([A-Z]{2})\s+\d{5}/)
  return stateMatch ? stateMatch[1] : undefined
}
