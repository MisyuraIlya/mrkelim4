const webpack = require('webpack')
const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    compress: true,
    port: 3000,
    historyApiFallback: {
      index: 'index.html',
      disableDotRule: true,
    },
    hot: true,
    open: true,
  },
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, '../.env.dev'),
    }),
  ],
}