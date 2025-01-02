import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['dummyjson.com'],
  },
  async redirects() {
    return [
      {
        source: '/auth/login',
        has: [
          {
            type: 'cookie',
            key: 'next-auth.session-token',
          },
        ],
        permanent: false,
        destination: '/',
      },
      {
        source: '/auth/signup',
        has: [
          {
            type: 'cookie',
            key: 'next-auth.session-token',
          },
        ],
        permanent: false,
        destination: '/',
      },
    ];
  },
};

export default nextConfig;
