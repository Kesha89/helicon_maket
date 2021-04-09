const path = require('path');
const miniCss = require('mini-css-extract-plugin');
const minify = require('optimize-css-assets-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	mode: 'production',
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index.js'
	},
    module: {
        rules: [
        {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                presets: ['@babel/preset-env']
                }
            }
        },
        {
            test:/.(s*)css$/,
            use: [
                miniCss.loader,
                'css-loader?url=false',
            ]
        }],
    },
    plugins: [
        new UglifyJSPlugin(),
		new miniCss()
	],
    optimization: {
        minimizer: [
            new minify({})
        ],
    }
};