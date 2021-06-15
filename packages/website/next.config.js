const withTranspileModules = require('next-transpile-modules')([
  '@project/ui',
  '@project/database',
  '@project/utils',
]);

module.exports = withTranspileModules();
