/* eslint-disable no-undef */
/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["prueba-tecnica-api-tienda-moviles.onrender.com"]
  },
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@styles": path.resolve(__dirname, "styles"),
    };
    return config;
  },
};

module.exports = nextConfig;
