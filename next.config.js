/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'viqubhgektepoihutvek.supabase.co',
      },
    ],
  },
}

module.exports = nextConfig
