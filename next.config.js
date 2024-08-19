/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: { esmExternals: true },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pauloxuries.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "api.frutiv.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
