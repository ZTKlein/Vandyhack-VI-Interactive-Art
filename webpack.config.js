const { WebpackPluginServe: Serve } = require("webpack-plugin-serve");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { join } = require("path");
const outputPath = join(process.cwd(), "/docs");

module.exports = {
  mode: "production",
  // an example entry definition
  entry: {
    app: "./src/index.js",
    serve: "webpack-plugin-serve/client" // ← important: this is required, where the magic happens in the browser
  },
  output: {
    filename: "[name].bundle.js",
    path: outputPath
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new Serve({ static: outputPath }),
    new HtmlWebpackPlugin({ title: "Vandyhack Art" }),
    new CleanWebpackPlugin()
  ],
  watch: true // ← important: webpack and the server will continue to run in watch mode
};
