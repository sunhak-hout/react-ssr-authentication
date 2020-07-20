const path = require('path');

module.exports = function (env, argv) {
  const devModeConfig = {
    mode: 'development',
    entry: './src/views/index.tsx',
    watch: true,
    output: {
      filename: 'bundle.js',
      path: path.resolve(process.cwd(), 'dist'),
      publicPath: '/public/',
    },
    devtool: 'cheap-module-eval-source-map',
    resolve: { extensions: ['.ts', '.tsx', '.js', '.json'] },
    module: { rules: [{ test: /\.tsx?$/, use: [{ loader: 'ts-loader' }] }] },
  };

  const prodModeConfig = {
    mode: 'production',
    entry: './src/views/index.tsx',
    output: {
      filename: 'bundle.js',
      path: path.resolve(process.cwd(), 'dist'),
      publicPath: '/public/',
    },
    performance: { hints: false },
    resolve: { extensions: ['.ts', '.tsx', '.js', '.json'] },
    module: { rules: [{ test: /\.tsx?$/, use: [{ loader: 'ts-loader' }] }] },
  };

  return process.env.NODE_ENV === 'production' ? prodModeConfig : devModeConfig;
};
