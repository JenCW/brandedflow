require('@testing-library/jest-dom')

// Polyfill for Web APIs in Node.js environment
const { TextEncoder, TextDecoder } = require('util')

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

// Mock environment variables for tests
process.env.AIRTABLE_API_KEY = 'test_key'
process.env.AIRTABLE_BASE_ID = 'test_base'
process.env.AIRTABLE_TABLE_NAME = 'leads'
process.env.FRED_API_KEY = 'test_fred_key'
