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
var getMethod = require('./routes/getMethod')
var postMethod = require('./routes/postMethod')
var myUrl = require('./routes/url')

/*
	middleware
*/
app.keys = ['scret', 'keys'] //	key of session
const opts = {'maxAge': 60 * 60 * 1000}//	maxAge of session
app.use(session(app, opts))
app.use(parser({
	// detectJSON: function (ctx) {
	//     return /\.json$/i.test(ctx.path);
	// },
	extendTypes: {
	    json: ['application/x-javascript'] // will parse application/x-javascript type body as a JSON string
	  }
}))
app.use(json())
// app.use(logger())

app.use(function * (next) {
  var start = new Date()
  if(this.url == '/' || this.url == '/index.html'){
      let deviceAgent = this.header['user-agent'].toLowerCase();
      let agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/);
      if(agentID){
      	//指到手机、pad的网页
      	this.redirect('blog.html')
      }else{
      	//指到pc网页
      }
  }
  yield next
  var ms = new Date() - start
  // console.log('%s%s - %s', this.method, this.url, ms)
})

app.use(koaStatic(path.join(__dirname, '/public')))

koaRouter.use('/', index.routes(), index.allowedMethods())
koaRouter.use('/users', users.routes(), users.allowedMethods())
koaRouter.use('/getMethod', getMethod.routes(), getMethod.allowedMethods())
koaRouter.use('/postMethod', postMethod.routes(), postMethod.allowedMethods())
koaRouter.use('/url', myUrl.routes(), myUrl.allowedMethods())

app.use(koaRouter.routes())

// app.on('error', function (err, ctx) {
//   logger.error('server error', err, ctx)
// })

module.exports = app
