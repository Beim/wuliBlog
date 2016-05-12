'use strict'
var app = require('koa')()
var koaRouter = require('koa-router')()
var parser = require('koa-bodyparser')
var json = require('koa-json')
var path = require('path')
var session = require('koa-session')
var logger = require('koa-logger')
var koaStatic = require('koa-static')
var db = require('./mongo.js')
// var views = require('koa-views')
// var onerror = require('koa-onerror')
// var fs = require('fs')

/* routes*/
var index = require('./routes/index')
var users = require('./routes/users')

/*
	middleware
*/
app.keys = ['scret', 'keys'] //	key of session
const opts = {'maxAge': 60 * 60 * 1000}//	maxAge of session
app.use(session(app, opts))
app.use(parser())
app.use(json())
// app.use(logger())

app.use(function * (next) {
  var start = new Date()
  yield next
  var ms = new Date() - start
  console.log('%s%s - %s', this.method, this.url, ms)
})

app.use(koaStatic(path.join(__dirname, '/public')))

koaRouter.use('/', index.routes(), index.allowedMethods())
koaRouter.use('/users', users.routes(), users.allowedMethods())

app.use(koaRouter.routes())

app.on('error', function (err, ctx) {
  logger.error('server error', err, ctx)
})

module.exports = app
