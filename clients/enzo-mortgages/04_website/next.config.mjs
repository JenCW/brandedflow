import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ['*.worf.replit.dev', '*.replit.dev', '*.replit.app', '*.kirk.replit.dev', '*.picard.replit.dev', '*.spock.replit.dev'],
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  webpack: (config) => {
    config.resolve.alias['@assets'] = path.join(__dirname, 'attached_assets');
    return config;
  },
}

export default nextConfig
