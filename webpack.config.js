const path = require("path");
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
        use: [
          miniCssExtractorPlugin.loader,
          // "style-loader",
          "css-loader",
          "sass-loader",
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.html?$/,
        loader: "html-loader",
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
      template: "./src/index.ejs",
      filename: "index.html",
    }),
    new htmlWebpackPlugin({
      template: "./src/about.ejs",
      filename: "about.html",
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 9000,
    open: true,
  },
  // devtool: "inline-source-map",
  // mode: "development",
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
