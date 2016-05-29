const path = require('path')
module.exports = {
	entry: './public/main.js',
	output: {
		path: path.join(__dirname, '/public'),
		filename: 'bundle.js'
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