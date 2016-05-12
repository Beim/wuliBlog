'use strict'
var mongoose = require('mongoose')
var db = mongoose.connect("mongodb://127.0.0.1:27017/test")
db.connection.on("error",function(error){
	console.log("connection error : " + error)
});
db.connection.on("open",function(){
	console.log("------- 数据库连接成功！-------")
});

// var testSchema = new mongoose.Schema({
// 	name : String
// })
// var testModel = db.model('collections', testSchema)