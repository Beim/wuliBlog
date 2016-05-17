'use strict'
var mongoose = require('mongoose')
var db = mongoose.connect("mongodb://127.0.0.1:27017/blogTest")
db.connection.on("error",function(error){
	console.log("connection error : " + error)
});
// db.connection.on("open",function(){
// 	console.log("------- 数据库连接成功！-------")
// });

let blogSchema = new mongoose.Schema({
	title: String,
	author: String,
	date: {type: Date, default: Date.now},
	article: String,
	excerpt: String,
	tags: Array,
	display: {type: Boolean, default: true},
	zan: {type: Number, default: 0},
	comments: [{
		name: String,
		email: String,
		date: Date
	}]
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
					res(1)
				}

			})
		})
	}
}

exports.search = {
	blogList: (limit, skip = null) => {
		return new Promise((res, rej) => {
			blogModel.find(limit, skip, (err, doc) => {
				if(err){
					console.log('find err : ' + err)
					res(0)
				}
				else{
					res(doc)
				}
			})
			
		})
	},
	blog: (limit, skip = null) => {
		return new Promise((res, rej) => {
			blogModel.findOne(limit, skip, (err, doc) => {
				if(err){
					console.log('find err : ' + err)
					res(0)
				}
				else{
					res(doc)
				}
			})
		})
	}
}
