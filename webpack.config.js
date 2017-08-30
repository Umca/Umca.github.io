const webpack = require('webpack');
const path = require('path');
const outputPath = path.resolve(__dirname, './dist');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const webpackConfig = {
    entry: {
        app: [
            path.resolve(__dirname, './src/index.js')
        ]
    },
    output: {
        path: outputPath,
        filename: 'dist/[name].js'
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader', 'sass-loader']
                  })
            },
            { 
                test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                           fallback: "style-loader",
                           use: "css-loader"
                })
              },
            {
                test: /\.(gif|png|jpg|jpeg|svg)$/,
                include: path.resolve(__dirname, './src/assets/'),
                use: 'url-loader?limit=1000&name=assets/[name]-[hash].[ext]'
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'),
            filename: 'index.html',
            path: outputPath
        }),
        new webpack.NamedModulesPlugin,
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('style.css')
    ],
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        port: 8082,
        historyApiFallback: true,
        hot: true,
    },
    devtool: 'sourcemap'
}

module.exports = webpackConfig;