const withPWA = require('next-pwa');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dgalywyr863hv.cloudfront.net',
        port: '',
        pathname: '/pictures/athletes/*/*/*/*',
      },
      //                       src="https://media.licdn.com/dms/image/C4E0BAQHBmWI9w3tzog/company-logo_200_200/0/1544572615288?e=2147483647&v=beta&t=HhwAog-YBLZyc1ULuVv48MZefPUw3EHejmW25OtMwUQ"
      {
        protocol: 'https',
        hostname: 'media.licdn.com',
        port: '',
        pathname: '/dms/image/*/*/*/*',
      }
    ]
  },

  env: {
    STRAVA_CLIENT_ID: process.env.STRAVA_CLIENT_ID,
    STRAVA_CLIENT_SECRET: process.env.STRAVA_CLIENT_SECRET,
    MONGODB_URI: process.env.MONGODB_URI,
  },

  build: {
    env: {
      STRAVA_CLIENT_ID: process.env.STRAVA_CLIENT_ID,
      STRAVA_CLIENT_SECRET: process.env.STRAVA_CLIENT_SECRET,
      MONGODB_URI: process.env.MONGODB_URI,
    }
  },
  webpack: (config, { isServer }) => {
    config.resolve.fallback = {
      tls: false,
      fs: false,
      net: false,
    };

    return config;
  },
  publicDir: 'public',

  ...withPWA({
    pwa: {
      dest: 'public',
      disable: process.env.NODE_ENV === 'development',
      register: true,
      skipWaiting: true,
    },
  }),

}

module.exports = nextConfig;
