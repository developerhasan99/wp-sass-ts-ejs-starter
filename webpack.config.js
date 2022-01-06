const path = require("path");
const webpack = require("webpack");
const htmlWebpackPlugin = require("html-webpack-plugin");
const miniCssExtractorPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/ts/index.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.scss?$/,
        use: [miniCssExtractorPlugin.loader, "css-loader", "sass-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.html?$/,
        loader: "html-loader",
      },
      {
        test: /\.ejs$/,
        use: {
          loader: "ejs-compiled-loader",
          options: {
            htmlmin: true,
            htmlminOptions: {
              removeComments: true,
            },
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              esModule: false,
              name: "images/[name][hash].[ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new miniCssExtractorPlugin(),
    // Every Page will add a new Instance for htmlWebpackPlugin
    new htmlWebpackPlugin({
      template: "src/pages/index.ejs",
      filename: "index.html",
    }),
    // new htmlWebpackPlugin({
    //   template: "src/pages/about.ejs",
    //   filename: "about.html",
    // }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 9000,
    open: true,
    hot: true,
    watchFiles: ["src/**/*.ejs"],
  },
  // devtool: false,
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
