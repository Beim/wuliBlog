'use strict'
var router = require('koa-router')()
var fparse = require('co-busboy');//parsing HTML form data
var parse = require('co-body')
var fs = require('fs')
var os = require('os')
var path = require('path')
const db = require('../mongo.js')
const postAuthentication = ['beim', '北冥有鱼吃', 'test']


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
			author = author.substring(0, author.indexOf(':'))
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

	else if (this.params.name == 'blog'){
		let limit = this.request.body
		let response = yield db.search['blog'](limit)
		this.body = {
			ok: 1,
			data: response
		}
	}

	else if (this.params.name == 'zan'){
		let limit = this.request.body
		let response = yield db.update['zan'](limit)
		this.body = {
			ok: response
		}
	}
	
	else if (this.params.name == 'comment'){
		let limit = {
			_id: this.request.body._id
		}
		let data = {
			content: this.request.body.content,
			name: this.request.body.name,
			email: this.request.body.email
		}
		let response = yield db.insert['comment'](limit, data)
		this.body = {
			ok: response
		}
	}
	return yield next
})


module.exports = router