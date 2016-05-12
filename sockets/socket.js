'use strict'

module.exports = function (server){
	var socketIo = require('socket.io')
	var io = socketIo.listen(server)
	
	io.on('connection', function(socket){
		console.log('connected~')
		// socket.on('event', function(data){
		// 	socket.name = data.name
		//    to all
		// 	io.sockets.emit('event1', {
		// 		name : socket.name
		// 	})
		//    to all execept one
		// 	socket.broadcast.emit('event2', {
		// 		name : socket.name
		// 	})
		// })
		socket.on('disconnect', function(){
			console.log('disconnect')
		})
	})
}
