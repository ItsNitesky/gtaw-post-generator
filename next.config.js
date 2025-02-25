/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mdc.gta.world',
        pathname: '/img/**',
      },
    ],
  },
};

module.exports = nextConfig;
