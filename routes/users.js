'use strict'
var router = require('koa-router')()

router.get('/', function *(next) {
	this.body = 'this is a user response!'
})

module.exports = router
