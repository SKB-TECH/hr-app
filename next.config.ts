import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";
import type { Configuration } from "webpack";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 100],
    remotePatterns: [
      { protocol: "https", hostname: "i.pravatar.cc" },
      { protocol: "https", hostname: "flagcdn.com" },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/files/**",
      },
    ],
  },

  webpack: (config: Configuration) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
};

export default withNextIntl(nextConfig);
