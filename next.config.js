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
