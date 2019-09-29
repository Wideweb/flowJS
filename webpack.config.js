const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            inject: false,
            template: require('html-webpack-template'),
            title: 'flOw',
            googleAnalytics: {
                trackingId: 'UA-145856924-1',
                pageViewOnLoad: true,
            },
        }),
        new CopyPlugin([
            { from: 'src/assets', to: 'assets' },
        ])
    ],
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    }
};