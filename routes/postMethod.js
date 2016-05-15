'use strict'
var router = require('koa-router')()
var fparse = require('co-busboy');//parsing HTML form data
var fs = require('fs')
var os = require('os')
var path = require('path')

router.post('/:name', function *(next) {
	if (this.params.name == 'images'){
		let parts = fparse(this)
		// while (part = yield parts) {
		let part = yield parts
		let _path = path.join(__dirname, '/../public/img/save')
		let str = '.hello world.png.jpg'
		let ext = part.filename
		let i = ext.indexOf('.')
		if(i){
			ext = ext.slice(i)
		}
		let name = Math.random().toString() + ext
		let stream = fs.createWriteStream(path.join(_path, name))
		part.pipe(stream)
		// console.log('uploadding %s -> %s', part.filename, stream.path)
		// }
		this.body = 'img/save/' + name
	}
	return yield next
})


module.exports = router