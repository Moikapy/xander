const { withAxiom } = require('next-axiom');
/** @type {import('next').NextConfig} */
const nextConfig = withAxiom({
  experimental: {
    typedRoutes: true,
  },
});

module.exports = nextConfig;
