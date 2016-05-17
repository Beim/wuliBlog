'use strict'
var router = require('koa-router')()
const db = require('../mongo.js')

router.get('/:name', function *(next){
	if(this.params.name == 'blogList'){
		let skip = {
			'article': 0,
			'__v': 0
		}
		let idx = {sort: {date: -1}}
		let response = yield db.search['blogList'](null, skip, idx)
		let ok = 0
		if(!!response){
			ok = 1
		}
		this.body = {
			ok: ok,
			data: response
		}

	}
	return yield next
})


module.exports = router