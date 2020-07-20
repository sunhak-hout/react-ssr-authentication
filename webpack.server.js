const path = require('path');
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin');

module.exports = function (env, argv) {
  const devModeConfig = {
    mode: 'development',
    entry: './src/index.ts',
    target: 'node',
    externals: [nodeExternals()],
    watch: true,
    output: {
      filename: 'index.js',
      path: path.resolve(process.cwd(), 'dist'),
      publicPath: '/public/',
    },
    devtool: 'cheap-module-eval-source-map',
    resolve: { extensions: ['.ts', '.tsx', '.js', '.json'] },
    module: { rules: [{ test: /\.tsx?$/, use: [{ loader: 'ts-loader' }] }] },
    plugins: [
      new NodemonPlugin({
        script: './dist/index.js',
        watch: path.resolve('./dist'),
        ext: 'js',
        delay: '200',
      }),
    ],
  };

  const prodModeConfig = {
    mode: 'production',
    entry: './src/index.ts',
    target: 'node',
    externals: [nodeExternals()],
    output: {
      filename: 'index.js',
      path: path.resolve(process.cwd(), 'dist'),
      publicPath: '/public/',
    },
    resolve: { extensions: ['.ts', '.tsx', '.js', '.json'] },
    module: { rules: [{ test: /\.tsx?$/, use: [{ loader: 'ts-loader' }] }] },
  };

  return process.env.NODE_ENV === 'production' ? prodModeConfig : devModeConfig;
};
