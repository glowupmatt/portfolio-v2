import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  // Keep Sanity Studio packages out of RSC server bundling
  serverExternalPackages: ['sanity', '@sanity/ui'],
}

export default nextConfig
