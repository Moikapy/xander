const { withAxiom } = require('next-axiom');
/** @type {import('next').NextConfig} */
const nextConfig = withAxiom({
  //output: 'standalone',
    eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
});

module.exports = nextConfig;
