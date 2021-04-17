const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = (env) => {
  return {
    entry: "./src/index.js",
    output: {
      filename: "main.js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
      assetModuleFilename: "[name]-[hash:8][ext]",
    },
    mode: env.mode,
    target: "web",
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        buildTime: new Date().toString(),
      }),
      new MiniCssExtractPlugin({
        filename: "[name]-[hash:8].css",
      }),
      new webpack.ProvidePlugin({
        React: "react",
      }),
    ],
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            format: {
              comments: false,
            },
          },
          extractComments: false,
        }),
      ],
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
            },
          ],
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.s[ac]ss$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
        {
          test: /\.(jpeg|png|gif|bmp)$/,
          type: "asset/resource",
          generator: {
            filename: "images/[name]-[hash:8][ext]",
          },
        },
        {
          test: /\.(ttf|woff|eot|otf)$/,
          type: "asset/resource",
          generator: {
            filename: "fonts/[name]-[hash:8][ext]",
          },
        },
      ],
    },
  };
};
