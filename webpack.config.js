const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');

const IS_DEV = process.env.NODE_ENV;

module.exports = {
	mode: IS_DEV,
	entry: path.join(__dirname, 'src', 'index.jsx'),
	output: {
		path: path.join(__dirname, 'dist'),
		publicPath: '/',
		filename: 'bundle.js',
		chunkFilename: '[name].js',
	},
	module: {
		rules: [
			{
				test: /.jsx?$/,
				exclude: [path.resolve(__dirname, 'node_modules')],
				loader: 'babel-loader',
				query: {
					presets: ['@babel/env', '@babel/preset-react'],
				},
			},
			{
				test: /.scss$/,
				use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'sass-loader' }],
			},
		],
	},
	resolve: {
		extensions: ['.json', '.js', '.jsx'],
	},
	plugins: [new HTMLPlugin({ template: path.join(__dirname, 'public', 'index.html') })],
	devtool: 'source-map',
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		inline: true,
		host: 'localhost',
		port: 6969,
	},
};
