const webpack = require('webpack');
const path = require('path');
const outputPath = path.resolve(__dirname, './dist');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const webpackConfig = {
    entry: {
        app: [
            'babel-polyfill',
            path.resolve(__dirname, './src/index.js')
        ]
    },
    output: {
        path: outputPath,
        filename: './[name].js',
        publicPath: '/'
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
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'),
            filename: 'index.html',
            path: outputPath
        }),
        new webpack.NamedModulesPlugin,
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('./style.css'),
        new CopyWebpackPlugin([{ from: 'src/assets', to: 'assets' }]),
        
    ],
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        port: 8083,
        historyApiFallback: true,
        hot: true,
    },
    devtool: process.env.NODE_ENV === 'production' ? 'eval' : 'sourcemap'
}

console.log(process.env.NODE_ENV)

if (process.env.NODE_ENV === 'production') {
    webpackConfig.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                screw_ie8: true
            }
        })
    )
} 

module.exports = webpackConfig;