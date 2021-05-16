module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-essentials',
  ],
  webpackFinal: (config) => {
    config.module.rules.push({
      // test: /\.(js|ts|tsx)$/,
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: '@linaria/webpack-loader',
          options: {
            sourceMap: process.env.NODE_ENV !== 'production',
            // ignore: /node_modules\/(?!@project)/,
            // rules: [
            //   {
            //     test: /node_modules\/(?!@project)/,
            //     action: 'ignore',
            //   },
            // ],
            babelOptions: {
              // rootMode: 'upward',
              presets: [
                // '@babel/preset-env',
                '@babel/preset-typescript',
                '@babel/preset-react',
                '@linaria'
              ]
            }
          },
        }
      ],
    });

    return config;
  },
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
