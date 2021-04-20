const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    assetModuleFilename: "[name]-[hash:8][ext]",
  },
  target: "web",
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
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      buildTime: new Date().toString(),
    }),
    new MiniCssExtractPlugin({
      filename: "[name]-[contenthash:8].css",
    }),
    new webpack.ProvidePlugin({
      React: "react",
    }),
  ],
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
        include: [path.join(__dirname, "src"), /node_modules/],
      },
      {
        test: /\.s[a|c]ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(jpg|jpeg|png|gif|bmp|svg)$/,
        type: "asset/resource",
        generator: {
          filename: "images/[name]-[contenthash:8][ext]",
        },
      },
      {
        test: /\.(ttf|woff|woff2|eot|otf)$/,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name]-[contenthash:8][ext]",
        },
      },
    ],
  },
};
