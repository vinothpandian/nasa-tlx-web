const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');

const filePath = {
  src: path.resolve(__dirname, '../src'),
  dist: path.resolve(__dirname, '../dist'),
};

module.exports = {
  entry: {
    main: path.resolve(filePath.src, 'index.js'),
  },
  output: {
    path: filePath.dist,
    filename: '[name].bundle.[chunkhash].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        include: path.resolve('node_modules', 'lodash'),
        sideEffects: false,
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)|(bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/index.html',
      filename: 'index.html',
    }),
    new WebpackMd5Hash(),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
