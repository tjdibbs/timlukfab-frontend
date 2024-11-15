const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pauloxuries.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'api.frutiv.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.timlukfab.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack(config) {
    config.resolve.alias['@'] = path.resolve(__dirname, './');
    return config;
  },
};

module.exports = nextConfig;
