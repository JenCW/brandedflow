import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ['*.worf.replit.dev', '*.replit.dev', '*.replit.app', '*.kirk.replit.dev', '*.picard.replit.dev', '*.spock.replit.dev'],
  images: {
    unoptimized: true,
  },
  turbopack: {
    resolveAlias: {
      '@assets': path.join(__dirname, 'attached_assets'),
    },
  },
  webpack: (config) => {
    config.resolve.alias['@assets'] = path.join(__dirname, 'attached_assets');
    return config;
  },
}

export default nextConfig
