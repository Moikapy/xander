const { withAxiom } = require("next-axiom");
/** @type {import('next').NextConfig} */
const nextConfig = withAxiom({
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // webpack: (config, { dev }) => {
  //   if (dev) {
  //     config.watchOptions = {
  //       poll: 1000, // Check for changes every 1 second
  //       aggregateTimeout: 300, // Delay before rebuilding
  //     };
  //   }
  //   return config;
  // },
  env: {
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
  },
});

module.exports = nextConfig;
