const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = function (env, argv) {
  const devModeConfig = {
    mode: 'development',
    entry: './src/views/index.tsx',
    watch: true,
    output: {
      filename: 'bundle.js',
      path: path.resolve(process.cwd(), 'dist'),
    },
    devtool: 'cheap-module-eval-source-map',
    resolve: { extensions: ['.ts', '.tsx', '.js', '.json'] },
    module: {
      rules: [
        { test: /\.tsx?$/, use: [{ loader: 'ts-loader' }] },
        { test: /\.(png|svg|jpe?g|gif)$/i, loader: 'file-loader' },
      ],
    },
  };

  const prodModeConfig = {
    mode: 'production',
    optimization: { minimizer: [new TerserPlugin()] },
    entry: './src/views/index.tsx',
    output: {
      filename: 'bundle.js',
      path: path.resolve(process.cwd(), 'dist'),
    },

    performance: { hints: false },
    resolve: { extensions: ['.ts', '.tsx', '.js', '.json'] },
    module: {
      rules: [
        { test: /\.tsx?$/, use: [{ loader: 'ts-loader' }] },
        { test: /\.(png|svg|jpe?g|gif)$/i, loader: 'file-loader' },
      ],
    },
  };

  return process.env.NODE_ENV === 'production' ? prodModeConfig : devModeConfig;
};
