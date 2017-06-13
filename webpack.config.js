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
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
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
        ]),
        new ExtractTextPlugin('styles.css')
    ],
    devtool: "source-map",
    resolve: {
        extensions: [".js", ".json", ".css"]
    }
}