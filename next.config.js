/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ["i.ibb.co"],
  },
  experimental: {
    serverActions: true,
    serverActionsBodySizeLimit: "2mb",
  },
};

module.exports = nextConfig;
