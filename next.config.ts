import createNextIntlPlugin from 'next-intl/plugin';
import type { Configuration } from 'webpack';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig = {
  webpack: (config: Configuration) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }
    return config
  },
};

export default withNextIntl(nextConfig);