/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  poweredByHeader: false,
  transpilePackages: ["@cv/ui", "@cv/common"],
  webpack: (config) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    config.module.rules.push({
      test: /\.html$/,
      use: "raw-loader",
    });

    return config;
  },
};

module.exports = nextConfig;
