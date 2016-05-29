const path = require('path')
module.exports = {
	entry: {
		index: './public/js/entries/index.js'
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