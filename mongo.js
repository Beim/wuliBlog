'use strict'
var mongoose = require('mongoose')
var db = mongoose.connect("mongodb://127.0.0.1:27017/blogTest")
db.connection.on("error",function(error){
	console.log("connection error : " + error)
});
db.connection.on("open",function(){
	console.log("------- 数据库连接成功！-------")
});

let blogSchema = new mongoose.Schema({
	title: String,
	author: String,
	date: String,
	article: String,
	tags: Array
})
let blogModel = mongoose.model('blogs', blogSchema)


exports.insert = {
	blog: (data) =>{
		let tags = []
		for(let i in data.tags){
			if(data.tags[i] != 0){
				tags.push(i)
			}
		}
		data.tags = tags
		return new Promise((res, rej) => {
			blogModel.create(data, function(err, doc){
				if(err){
					console.log('create err : ' + err)
					res(0)
				}
				else{
					console.log('create success : \n' + doc)
					res(1)
				}

			})
		})
	}
}
