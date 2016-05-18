'use strict'
/*
	module dependencies
*/
var app = require('../app')
var debug = require('debug')('demo:server')
var http = require('http')
// var socket = require('../sockets/socket.js')

var port = normalizePort(process.env.PORT || '2333')
// app.set('port', port)

/*
* create http server
*/
var server = http.createServer(app.callback())

/*
*	connect io
*/
// socket(server)

/*
*	listen on privided port, on all netwok interfaces
*/
server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

/*
*	nomalize a port to
*	number string or false
*/
function normalizePort (val) {
  var port = parseInt(val, 10)

  if (isNaN(port)) {
    //  named pipe
    return val
  }

  if (port >= 0) {
	//  port number
  	return port
  }
  return false
}

/*
*	event litener for http server 'error' event
*/
function onError(error){
	if(error.syscall !== 'listen'){
		throw error
	}

	var bind = typeof port ==='string' ? 'Pipe ' + port : 'Port ' + port

	//handle specific listen errors with friendly messages
	switch(error.code) {
		case 'EACCES':
			console.error(bind + 'requires elevated privileges')
			process.exit(1)
			break
		case 'EADDRINUSE':
			console.error(bind + ' is already in use')
			process.exit(1)
			break
		default:
			throw error
	}
}

/*
*	event listener for http server 'listening' event
*/
function onListening(){
	var addr = server.address()
	var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
	debug('Listening on ' + bind)
}
