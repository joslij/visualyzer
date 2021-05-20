const webpack = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  plugins: [
    new webpack.DefinePlugin({
      APPCONFIG_APIURL: JSON.stringify("http://localhost:3000/api"),
    }),
  ],
  devServer: {
    contentBase: "./dist",
    historyApiFallback: true,
  },
});
