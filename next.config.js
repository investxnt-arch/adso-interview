/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['viqubhgektepoihutvek.supabase.co'],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
}

module.exports = nextConfig
