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
      }
    ]
  },

  env: {
    STRAVA_CLIENT_ID: process.env.STRAVA_CLIENT_ID,
    STRAVA_CLIENT_SECRET: process.env.STRAVA_CLIENT_SECRET,
    MONGODB_URI: process.env.MONGODB_URI,
  },

  webpack: (config, isServer) => {
    config.resolve.fallback = { 
      tls: false,
      fs: false,
      net: false,
    };


      return config;
    }
  }

module.exports = nextConfig
