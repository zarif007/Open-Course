/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ['i.ibb.co'],
  },
  experimental: {
    serverActions: true,
    serverActionsBodySizeLimit: '2mb',
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't include undici in client-side bundles
      config.resolve.fallback = {
        ...config.resolve.fallback,
        undici: false,
      };
    } else {
      // Transpile undici for server-side
      config.module.rules.push({
        test: /\.js$/,
        include: /node_modules\/undici/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['next/babel'],
          },
        },
      });
    }
    return config;
  },
};

module.exports = nextConfig;
