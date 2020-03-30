const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Naming and path settings
const appName = "inspiration";
const entryPath = "./src/inspiration.js";
const exportPath = path.resolve(__dirname, "dist");

module.exports = {
  entry: entryPath,
  output: {
    path: exportPath,
    filename: appName + '.[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      hash: true,
      template: './src/index.html',
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'inspiration.[contenthash].css'
    })
  ]
};
