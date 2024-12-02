const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.timlukfab.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // webpack(config) {
  //   config.resolve.alias['@'] = path.resolve(__dirname, './');
  //   return config;
  // },
};

module.exports = nextConfig;
