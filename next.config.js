/* eslint-disable no-undef */
/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["prueba-tecnica-api-tienda-moviles.onrender.com"]
  },

  webpack(config, { isServer }) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@styles": path.resolve(__dirname, "styles"),
    };

    if (process.env.NEXT_PUBLIC_APP_ENV === "production") {
      config.optimization.minimize = true;
      config.optimization.splitChunks = {
        chunks: 'all',
      };
    } else {
      config.optimization.minimize = false;
      config.optimization.splitChunks = false;
    }

    return config;
  },
};

module.exports = nextConfig;
