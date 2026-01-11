/**
 * Tests for the qualification scoring algorithm
 * This algorithm calculates lead urgency based on multiple factors
 */

import { calculateQualificationUrgency, extractStateFromAddress, LeadData } from '../qualification'

describe('Qualification Scoring Algorithm', () => {
  describe('Timeline Factor (0-3 points)', () => {
    it('should give 3 points for "asap" timeline', () => {
      const data: LeadData = {
        timeline: 'asap',
        loanAmount: 300000,
        state: 'CA',
        creditScore: 750
      }
      // asap (3) + loan 300k (1) + CA (1) + credit 750 (2) = 7 points = Hot
      expect(calculateQualificationUrgency(data)).toBe('Hot')
    })

    it('should give 2 points for "1-3months" timeline', () => {
      const data: LeadData = {
        timeline: '1-3months',
        loanAmount: 300000
      }
      // 1-3months (2) + loan 300k (1) = 3 points = High
      expect(calculateQualificationUrgency(data)).toBe('High')
    })

    it('should give 1 point for "3-6months" timeline', () => {
      const data: LeadData = {
        timeline: '3-6months',
        loanAmount: 300000
      }
      // 3-6months (1) + loan 300k (1) = 2 points = Medium
      expect(calculateQualificationUrgency(data)).toBe('Medium')
    })

    it('should subtract 1 point for "exploring" timeline', () => {
      const data: LeadData = {
        timeline: 'exploring'
      }
      // exploring (-1) = -1 points = Nurture
      expect(calculateQualificationUrgency(data)).toBe('Nurture')
    })
  })

  describe('Loan Amount Factor (0-2 points)', () => {
    it('should give 2 points for loans >= $500k', () => {
      const data: LeadData = {
        timeline: '1-3months',
        loanAmount: 600000
      }
      // 1-3months (2) + loan 600k (2) = 4 points = High
      expect(calculateQualificationUrgency(data)).toBe('High')
    })

    it('should give 1 point for loans $200k-$499k', () => {
      const data: LeadData = {
        timeline: '1-3months',
        loanAmount: 300000
      }
      // 1-3months (2) + loan 300k (1) = 3 points = High
      expect(calculateQualificationUrgency(data)).toBe('High')
    })

    it('should give 0 points for loans < $200k', () => {
      const data: LeadData = {
        timeline: '3-6months',
        loanAmount: 150000
      }
      // 3-6months (1) + loan 150k (0) = 1 point = Medium
      expect(calculateQualificationUrgency(data)).toBe('Medium')
    })

    it('should handle string loan amounts with currency formatting', () => {
      const data: LeadData = {
        timeline: '1-3months',
        loanAmount: '$500,000'
      }
      // 1-3months (2) + loan 500k (2) = 4 points = High
      expect(calculateQualificationUrgency(data)).toBe('High')
    })

    it('should use purchasePrice if loanAmount not provided', () => {
      const data: LeadData = {
        timeline: '1-3months',
        purchasePrice: 500000
      }
      expect(calculateQualificationUrgency(data)).toBe('High')
    })

    it('should use homeValue if loanAmount and purchasePrice not provided', () => {
      const data: LeadData = {
        timeline: '1-3months',
        homeValue: 500000
      }
      expect(calculateQualificationUrgency(data)).toBe('High')
    })
  })

  describe('State/Location Factor (0-1 points)', () => {
    it('should give 1 point for California (CA)', () => {
      const data: LeadData = {
        timeline: '1-3months',
        state: 'CA'
      }
      // 1-3months (2) + CA (1) = 3 points = High
      expect(calculateQualificationUrgency(data)).toBe('High')
    })

    it('should give 1 point for California (full name)', () => {
      const data: LeadData = {
        timeline: '1-3months',
        state: 'California'
      }
      expect(calculateQualificationUrgency(data)).toBe('High')
    })

    it('should give 0 points for non-CA states', () => {
      const data: LeadData = {
        timeline: '1-3months',
        state: 'TX'
      }
      // 1-3months (2) + TX (0) = 2 points = Medium
      expect(calculateQualificationUrgency(data)).toBe('Medium')
    })
  })

  describe('Credit Score Factor (-1 to 2 points)', () => {
    it('should give 2 points for excellent credit (>= 740)', () => {
      const data: LeadData = {
        timeline: '1-3months',
        creditScore: 780
      }
      // 1-3months (2) + credit 780 (2) = 4 points = High
      expect(calculateQualificationUrgency(data)).toBe('High')
    })

    it('should give 1 point for good credit (680-739)', () => {
      const data: LeadData = {
        timeline: '1-3months',
        creditScore: 700
      }
      // 1-3months (2) + credit 700 (1) = 3 points = High
      expect(calculateQualificationUrgency(data)).toBe('High')
    })

    it('should give 0 points for fair credit (620-679)', () => {
      const data: LeadData = {
        timeline: '1-3months',
        creditScore: 650
      }
      // 1-3months (2) + credit 650 (0) = 2 points = Medium
      expect(calculateQualificationUrgency(data)).toBe('Medium')
    })

    it('should subtract 1 point for poor credit (< 620)', () => {
      const data: LeadData = {
        timeline: '1-3months',
        creditScore: 580
      }
      // 1-3months (2) + credit 580 (-1) = 1 point = Medium
      expect(calculateQualificationUrgency(data)).toBe('Medium')
    })

    it('should handle string credit scores', () => {
      const data: LeadData = {
        timeline: '1-3months',
        creditScore: '750'
      }
      expect(calculateQualificationUrgency(data)).toBe('High')
    })
  })

  describe('Lead Type Factor (0-1 points)', () => {
    it('should give 1 point for Purchase leads', () => {
      const data: LeadData = {
        timeline: '1-3months',
        leadType: 'Purchase'
      }
      // 1-3months (2) + Purchase (1) = 3 points = High
      expect(calculateQualificationUrgency(data)).toBe('High')
    })

    it('should give 1 point for Home Purchase leads', () => {
      const data: LeadData = {
        timeline: '1-3months',
        leadType: 'Home Purchase'
      }
      expect(calculateQualificationUrgency(data)).toBe('High')
    })

    it('should give 0 points for Refinance leads', () => {
      const data: LeadData = {
        timeline: '1-3months',
        leadType: 'Refinance'
      }
      // 1-3months (2) + Refinance (0) = 2 points = Medium
      expect(calculateQualificationUrgency(data)).toBe('Medium')
    })
  })

  describe('Down Payment/LTV Factor (-1 to 2 points)', () => {
    it('should give 2 points for >= 20% down payment', () => {
      const data: LeadData = {
        timeline: '1-3months',
        downPayment: 100000,
        purchasePrice: 500000
      }
      // 1-3months (2) + loan 500k (2) + 20% down (2) = 6 points = Hot
      expect(calculateQualificationUrgency(data)).toBe('Hot')
    })

    it('should give 1 point for 10-19% down payment', () => {
      const data: LeadData = {
        timeline: '1-3months',
        downPayment: 60000,
        purchasePrice: 500000
      }
      // 1-3months (2) + loan 500k (2) + 12% down (1) = 5 points = Hot
      expect(calculateQualificationUrgency(data)).toBe('Hot')
    })

    it('should give 0 points for 5-9% down payment', () => {
      const data: LeadData = {
        timeline: '1-3months',
        downPayment: 35000,
        purchasePrice: 500000
      }
      // 1-3months (2) + loan 500k (2) + 7% down (0) = 4 points = High
      expect(calculateQualificationUrgency(data)).toBe('High')
    })

    it('should subtract 1 point for < 5% down payment', () => {
      const data: LeadData = {
        timeline: '1-3months',
        downPayment: 15000,
        purchasePrice: 500000
      }
      // 1-3months (2) + loan 500k (2) + 3% down (-1) = 3 points = High
      expect(calculateQualificationUrgency(data)).toBe('High')
    })

    it('should work with homeValue instead of purchasePrice', () => {
      const data: LeadData = {
        timeline: '1-3months',
        downPayment: 100000,
        homeValue: 500000
      }
      // 1-3months (2) + home 500k (2) + 20% down (2) = 6 points = Hot
      expect(calculateQualificationUrgency(data)).toBe('Hot')
    })
  })

  describe('Property Type Factor (-0.5 to 1 points)', () => {
    it('should give 1 point for primary residence', () => {
      const data: LeadData = {
        timeline: '1-3months',
        propertyType: 'Primary Residence'
      }
      // 1-3months (2) + primary residence (1) = 3 points = High
      expect(calculateQualificationUrgency(data)).toBe('High')
    })

    it('should give 1 point for owner occupied', () => {
      const data: LeadData = {
        timeline: '1-3months',
        propertyType: 'Owner Occupied'
      }
      expect(calculateQualificationUrgency(data)).toBe('High')
    })

    it('should subtract 0.5 points for investment property', () => {
      const data: LeadData = {
        timeline: 'asap',
        propertyType: 'Investment Property'
      }
      // asap (3) + investment (-0.5) = 2.5 points = Medium
      expect(calculateQualificationUrgency(data)).toBe('Medium')
    })

    it('should subtract 0.5 points for rental property', () => {
      const data: LeadData = {
        timeline: 'asap',
        propertyType: 'Rental'
      }
      expect(calculateQualificationUrgency(data)).toBe('Medium')
    })
  })

  describe('Refinance LTV Factor (0-1 points)', () => {
    it('should give 1 point for LTV <= 80%', () => {
      const data: LeadData = {
        timeline: '1-3months',
        leadType: 'Refinance',
        homeValue: 500000,
        loanBalance: 400000
      }
      // 1-3months (2) + home 500k (2) + LTV 80% (1) = 5 points = Hot
      expect(calculateQualificationUrgency(data)).toBe('Hot')
    })

    it('should give 0 points for LTV 80-95%', () => {
      const data: LeadData = {
        timeline: '1-3months',
        leadType: 'Refinance',
        homeValue: 500000,
        loanBalance: 450000
      }
      // 1-3months (2) + home 500k (2) + LTV 90% (0) = 4 points = High
      expect(calculateQualificationUrgency(data)).toBe('High')
    })

    it('should subtract 1 point for LTV > 95%', () => {
      const data: LeadData = {
        timeline: '1-3months',
        leadType: 'Refinance',
        homeValue: 500000,
        loanBalance: 480000
      }
      // 1-3months (2) + home 500k (2) + LTV 96% (-1) = 3 points = High
      expect(calculateQualificationUrgency(data)).toBe('High')
    })
  })

  describe('Income Factor (0-1 points)', () => {
    it('should give 1 point for income >= $100k', () => {
      const data: LeadData = {
        timeline: '1-3months',
        income: 120000
      }
      // 1-3months (2) + income 120k (1) = 3 points = High
      expect(calculateQualificationUrgency(data)).toBe('High')
    })

    it('should give 0 points for income < $100k', () => {
      const data: LeadData = {
        timeline: '1-3months',
        income: 75000
      }
      // 1-3months (2) + income 75k (0) = 2 points = Medium
      expect(calculateQualificationUrgency(data)).toBe('Medium')
    })

    it('should handle string income with formatting', () => {
      const data: LeadData = {
        timeline: '1-3months',
        income: '$150,000'
      }
      expect(calculateQualificationUrgency(data)).toBe('High')
    })
  })

  describe('Urgency Level Thresholds', () => {
    it('should classify as "Hot" for >= 5 points', () => {
      const data: LeadData = {
        timeline: 'asap', // 3
        loanAmount: 500000, // 2
        state: 'CA', // 1
        creditScore: 750 // 2
        // Total: 8 points
      }
      expect(calculateQualificationUrgency(data)).toBe('Hot')
    })

    it('should classify as "High" for 3-4 points', () => {
      const data: LeadData = {
        timeline: '1-3months', // 2
        loanAmount: 300000 // 1
        // Total: 3 points
      }
      expect(calculateQualificationUrgency(data)).toBe('High')
    })

    it('should classify as "Medium" for 1-2 points', () => {
      const data: LeadData = {
        timeline: '3-6months' // 1
        // Total: 1 point
      }
      expect(calculateQualificationUrgency(data)).toBe('Medium')
    })

    it('should classify as "Low" for 0 points', () => {
      const data: LeadData = {
        loanAmount: 100000 // 0 points, low loan amount
        // Total: 0 points
      }
      expect(calculateQualificationUrgency(data)).toBe('Low')
    })

    it('should classify as "Nurture" for negative points', () => {
      const data: LeadData = {
        timeline: 'exploring', // -1
        creditScore: 580 // -1
        // Total: -2 points
      }
      expect(calculateQualificationUrgency(data)).toBe('Nurture')
    })
  })

  describe('Real-World Scenarios', () => {
    it('should score hot lead: First-time buyer with good credit and urgency', () => {
      const data: LeadData = {
        timeline: 'asap', // 3
        leadType: 'Purchase', // 1
        loanAmount: 450000, // 1
        creditScore: 760, // 2
        downPayment: 90000, // 20% = 2
        purchasePrice: 450000,
        state: 'CA', // 1
        propertyType: 'Primary Residence', // 1
        income: 150000 // 1
        // Total: 12 points = Hot
      }
      expect(calculateQualificationUrgency(data)).toBe('Hot')
    })

    it('should score nurture lead: Exploring refinance with poor credit', () => {
      const data: LeadData = {
        timeline: 'exploring', // -1
        leadType: 'Refinance', // 0
        homeValue: 300000,
        loanBalance: 280000,
        creditScore: 590, // -1
        propertyType: 'Investment Property' // -0.5
        // Total: -2.5 points = Nurture
      }
      expect(calculateQualificationUrgency(data)).toBe('Nurture')
    })

    it('should score high lead: Conventional buyer with good terms', () => {
      const data: LeadData = {
        timeline: '1-3months', // 2
        leadType: 'Purchase', // 1
        loanAmount: 350000, // 1
        creditScore: 720, // 1
        downPayment: 70000, // 20% = 2
        purchasePrice: 350000,
        propertyType: 'Primary Residence' // 1
        // Total: 8 points = Hot
      }
      expect(calculateQualificationUrgency(data)).toBe('Hot')
    })
  })

  describe('extractStateFromAddress', () => {
    it('should extract state code from full address', () => {
      expect(extractStateFromAddress('123 Main St, Los Angeles, CA 90210')).toBe('CA')
    })

    it('should extract state code from address with different format', () => {
      expect(extractStateFromAddress('456 Oak Ave, Irvine, CA 92618')).toBe('CA')
    })

    it('should return undefined if no state found', () => {
      expect(extractStateFromAddress('123 Main Street')).toBeUndefined()
    })

    it('should return undefined for undefined input', () => {
      expect(extractStateFromAddress(undefined)).toBeUndefined()
    })

    it('should handle different states', () => {
      expect(extractStateFromAddress('789 Pine Rd, Austin, TX 78701')).toBe('TX')
    })
  })
})
