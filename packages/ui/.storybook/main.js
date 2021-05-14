module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-essentials',
  ],
  // webpackFinal: async (config) => {
  //   config.module.rules.push({
  //     // test: /\.(js|ts|tsx)$/,
  //     test: /\.tsx?$/,
  //     exclude: /node_modules/,
  //     use: [
  //       {
  //         loader: '@linaria/webpack-loader',
  //         options: {
  //           sourceMap: process.env.NODE_ENV !== 'production',
  //           babelOptions: {
  //             presets: [
  //               '@babel/preset-env',
  //               '@babel/preset-react',
  //               '@babel/preset-typescript',
  //               '@linaria'
  //             ]
  //           }
  //         },
  //       }
  //     ],
  //   });

  //   return config;
  // },
  typescript: {
    check: true,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
};
