/* eslint-disable no-unused-vars */
// const webpack = require('webpack');
// const Dotenv = require('dotenv-webpack'); // required for accessing .env from front-end. used in plugins.
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const CompressionPlugin = require("compression-webpack-plugin");
// const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const { ESBuildMinifyPlugin } = require("esbuild-loader");



module.exports = {
  
    entry: [
    // entry point of our app
        "./client/index.js",
    ],
    optimization: {
      concatenateModules: true,
      minimizer: [
        new ESBuildMinifyPlugin({
          target: "es2015", // Syntax to compile to (see options below for possible values)
        }),
      
      ],
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "/",
        filename: "bundle.js",
    },
    devtool: "eval",
    mode: "production",
    devServer: {
        host: "localhost",
        port: 8080,
        // match the output path
        static: {
            directory: path.resolve(__dirname, "dist"),
            // match the output 'publicPath'
            publicPath: "/",
        },
        // enable HMR on the devServer
        hot: true,
        // fallback to root for other urls
        historyApiFallback: true,
        headers: { "Access-Control-Allow-Origin": "*" },
        /**
     *
     * proxy is required in order to make api calls to
     * express server while using hot-reload webpack server
     * routes api fetch requests from localhost:8080/api/* (webpack dev server)
     * to localhost:3000/api/* (where our Express server is running)
     */
        proxy: {
            "*": {
                target: "http://localhost:3000/",
                secure: false,
            },
        },
    },
    module: {
        rules: [
            {
                test: /.m?(js|jsx)$/,
                include: path.resolve(__dirname, "client"),
                exclude: /node_modules/,
                use: {
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                        plugins: ["@babel/plugin-transform-runtime"]
                    },
                    loader: "babel-loader",
                    options: {cacheCompression: false,
                      cacheDirectory: true,
                      presets: ["@babel/preset-env", "@babel/preset-react"],},
                },
            },
            {
                test: /.(css|scss)$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.(png|jpg|)$/,
                use: [
                    {
                        // loads files as base64 encoded data url if image file is less than set limit
                        loader: "url-loader",
                        options: {
                            // if file is greater than the limit (bytes), file-loader is used as fallback
                            limit: 8192,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./client/index.html",
            favicon: "./client/assets/cheffy.png",
        }),
    ],
    resolve: {
    // Enable importing JS / JSX files without specifying their extension
        extensions: [".js", ".jsx"],
    },
};
