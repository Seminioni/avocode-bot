const nodeExternals = require("webpack-node-externals");
const NodemonPlugin = require("nodemon-webpack-plugin");
const path = require("path");

const config = {
  mode: "production",
  entry: "./index.js",
  target: "node",
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
  },
  externals: {
    puppeteer: 'require("puppeteer")',
    fs: 'require("fs")',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.mjs$/,
        type: "javascript/auto",
      },
    ],
  },
  resolve: {
    extensions: [".js"],
  },
  plugins: [new NodemonPlugin()],
};

module.exports = config;
