/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: { esmExternals: true },
  images: {
    domains: ["pauloxuries.com", "http://api.frutiv.com"],
  },
};

module.exports = nextConfig;
