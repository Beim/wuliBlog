'use strict'
var router = require('koa-router')()
const db = require('../mongo.js')

router.get('/', function *(next){
	this.redirect('url.html')
})

router.get('/:name', function *(next){
	let limit = {
		shortUrl: this.url.slice('/url/'.length)
	}
	let response = yield db.search['longUrl'](limit)
	if(response !== 0){
		this.redirect(response)
	}
	else{
		this.body = 'no such shortUrl'
	}
})

module.exports = router
