const path = require("path");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        "app": "./app.js"
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "[name].bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: "/node_modules/",
                query: {
                    presets: ["es2015"]
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader'
            },
            {
                test: /\.css$/,
                loader: 'css-loader',
                query: {
                    modules: true,
                    localIdentName: '[name]__[local]___[hash:base64:5]'
                }
            }
        ]
    },
    plugins: [
        // new UglifyJSPlugin({
        //     compress: true,
        //     sourceMap: true
        // }),
        CopyWebpackPlugin([
            { from: "./index.html" },
            { from: "./css/*" }         
        ])       
    ],
    devtool: "source-map",
    resolve: {
        extensions: [".js", ".json", ".css"]
    }
}