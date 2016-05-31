const path = require('path')
module.exports = {
	entry: {
		index: './public/js/entries/index.js',
		about: './public/js/entries/about.js',
		blog: './public/js/entries/blog.js',
		url: './public/js/entries/url.js'
	},
	output: {
		path: path.join(__dirname, '/public/js'),
		filename: '[name].js'
	},
	module: {
		loaders: [
			{
				test: /\.js[x]?$/,
				exclude: /node_modules/,
				loader: 'babel',
				query: {
					presets: ['es2015', 'react']
				}
			}
		]
	}
}