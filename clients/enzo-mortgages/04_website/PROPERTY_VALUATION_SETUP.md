# Property Valuation Tool Setup

This document explains how to set up the Zillow-integrated property valuation tool.

## Overview

The property valuation tool allows users to:
- Enter their property address, zip code, email, first name, and last name
- Receive an instant property valuation from Zillow
- Have their contact information automatically captured as a lead

## API Options

The tool supports multiple Zillow API integration methods:

### Option 1: RapidAPI Zillow Wrapper (Recommended)

1. Sign up for RapidAPI: https://rapidapi.com/
2. Subscribe to the Zillow API: https://rapidapi.com/apimaker/api/zillow-com1
3. Get your RapidAPI key
4. Add to `.env.local`:
   ```
   RAPIDAPI_KEY=your_rapidapi_key_here
   ```

### Option 2: Zillow Zestimate API (Direct)

1. Sign up for Zillow Web Services: https://www.zillow.com/howto/api/APIOverview.htm
2. Get your ZWSID (Zillow Web Services ID)
3. Add to `.env.local`:
   ```
   ZILLOW_ZWSID=your_zwsid_here
   ```

### Option 3: Mock Data (Development)

If no API keys are configured, the tool will return mock valuation data for development/testing purposes.

## Environment Variables

Add these to your `.env.local` file:

```bash
# Zillow API Configuration (choose one)
RAPIDAPI_KEY=your_rapidapi_key_here
# OR
ZILLOW_ZWSID=your_zwsid_here

# Base URL for lead capture (optional, defaults to localhost:3000)
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

## How It Works

1. User fills out the form with:
   - First Name
   - Last Name
   - Property Address
   - Zip Code
   - Email

2. Form submission triggers:
   - Lead capture (saves to Airtable via `/api/lead/intake`)
   - Property valuation API call (fetches from Zillow)
   - Displays valuation result to user

3. Valuation result shows:
   - Estimated property value
   - Low and high range
   - Source (Zillow or Estimated)
   - Last updated date

## Files

- **API Route**: `app/api/property/valuation/route.ts`
- **Component**: `app/components/ValuationForm.tsx`
- **Usage**: Integrated into landing pages via `HiddenValuationForm` component

## Testing

To test without API keys:
1. The tool will automatically use mock data
2. Mock valuations are based on zip code (California zip codes get higher values)
3. All lead information is still captured properly

## Notes

- Lead capture happens in the background and won't block the valuation display
- If API calls fail, the tool gracefully falls back to mock data
- All user information is captured as leads regardless of API success/failure
