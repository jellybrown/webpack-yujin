const path = require("path");
const webpack = require("webpack");
const childProcess = require("child_process");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/app.js",
  },
  output: {
    path: path.resolve("./dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: "url-loader",
        options: {
          //  publicPath: "./dist/",
          name: "[name].[ext]?[hash]", //hash 무력화
          limit: 40000,
        },
      },
    ],
  },
  plugins: [
    //
    new webpack.BannerPlugin({
      // toLocaleString: 사용자의 문화권에 맞는 시간표기법으로 년,월,일 시간을 리턴
      banner: `
        Build Date: ${new Date().toLocaleString()} 
        Commit Version : ${childProcess.execSync(`git rev-parse --short HEAD`)}
        Author: ${childProcess.execSync(`git config user.name`)}
        `,
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      templateParameters: {
        env: process.env.NODE_ENV === "development" ? "(개발용)" : "",
      },
      minify:
        process.env.NODE_ENV === "production"
          ? {
              collapseWhitespace: true,
              removeComments: true,
            }
          : false,
    }),
    new CleanWebpackPlugin(),
  ],
};
