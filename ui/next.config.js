// next.config.js
const nextConfig = {
  // ... other configurations
  /*
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000, // Check for changes every 1 second
      aggregateTimeout: 300, // Delay before rebuilding
    };
    return config;
  },
 */
 async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'http://localhost:3001/api/:path*',
          },
        ]
      },
};

module.exports = nextConfig;
