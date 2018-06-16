const merge = require('webpack-merge');
const CompressionPlugin = require('compression-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin('dist', {
      root: process.cwd(),
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          drop_console: true,
        },
        dead_code: true,
      },
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
});
