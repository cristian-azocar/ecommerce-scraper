const withTranspileModules = require('next-transpile-modules')([
  '@project/ui',
  '@project/database',
  '@project/utils',
]);

module.exports = withTranspileModules({
  webpack: (config) => {
    // eslint-disable-next-line no-param-reassign
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };

    return config;
  },
});
