'use strict'
var router = require('koa-router')()
var fparse = require('co-busboy');//parsing HTML form data
var parse = require('co-body')
var fs = require('fs')
var os = require('os')
var path = require('path')
var db = require('../mongo.js')
const postAuthentication = ['beim', '北冥有鱼吃']


router.post('/:name', function *(next) {
	if (this.params.name === 'images'){
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

	else if (this.params.name === 'newBlog'){
		let body = this.request.body
		let author = body.author
		if(author.indexOf(':') != -1){
			author = author.slice(author.indexOf(':') + 1)
		}
		if(postAuthentication.indexOf(author) == -1){
			this.body = {
				ok: -2
			}
		}
		else{
			let response = yield db.insert['blog'](body)
			this.body = {
				ok: response
			}
		}
	}
	return yield next
})


module.exports = router