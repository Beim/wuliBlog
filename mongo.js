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
		date: {type: Date, default: Date.now},
		content: String,
		floor: Number
	}]
})
let blogModel = mongoose.model('blogs', blogSchema)

let urlSchema = new mongoose.Schema({
	longUrl: String,
	shortUrl: String,
	clicks: {type: Number, default: 0}
})
let urlModel = mongoose.model('urls', urlSchema)
 

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
			blogModel.create(data, (err, doc) => {
				if(err){
					console.log('create err : ' + err)
					res(0)
				}
				else{
					res(1)
				}

			})
		})
	},

	comment: (limit, data) => {
		return new Promise((res, rej) => {
			blogModel.findOne(limit, (err, doc) => {
				if(err){
					console.log('findOne err : ' + err)
					res(0)
				}
				else{
					data.floor = doc.comments.length + 1
					doc.comments.push(data)
					doc.save((err2) => {
						if(err2){
							console.log('save err : ' + err)
							res(0)
						}
						else{
							res(1)
						}
					})
				}
			})
		})
	},

	url: (data) => {
		return new Promise((res, rej) => {
			urlModel.findOne({'shortUrl': data.shortUrl}, (err, doc) => {
				if(err){
					console.log('findOne err : ' + err)
					res(0)
				}
				else{
					if(doc){
						doc.longUrl = data.longUrl
						doc.clicks = 0
						doc.save((err2) => {
							if(err2){
								console.info('save err : ' + err2)
								res(0)
							}
							else{
								res(1)
							}
						})
					}
					else{
						urlModel.create(data, (err1, doc1) => {
							if(err1){
								console.info('create err : ' + err1)
								res(0)
							}
							else{
								res(1)
							}
						})
					}
				}
			})
		})
	}
}

exports.search = {
	blogList: (limit, skip = null, idx = null) => {
		return new Promise((res, rej) => {
			blogModel.find(limit, skip, idx,(err, doc) => {
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
	},
	urls: (limit, skip = null) => {
		limit.shortUrl = new RegExp(limit.shortUrl , 'i')
		return new Promise((res, rej) => {
			urlModel.find(limit, skip, (err, doc) => {
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
	longUrl: (limit, skip = null) => {
		return new Promise((res, rej) => {
			urlModel.findOne(limit, skip, (err, doc) => {
				if(err){
					console.log('findOne err : ' + err)
					res(0)
				}
				else{
					if(doc){
						doc.clicks += 1
						doc.save((err1) => {
							if(err1){
								console.log('save err : ' + err1)
							}
						})
						res(doc.longUrl)
					}
					else{
						res(0)
					}
				}
			})
		})
	}
}

exports.update = {
	zan: (limit) => {
		return new Promise((res, rej) => {
			blogModel.findOne(limit, (err, doc) => {
				if(err){
					console.log('find err : ' + err)
					res(0)
				}
				else{
					doc.zan += 1
					doc.save((err2) => {
						if(err2){
							res(0)
						}
						else{
							res(1)
						}
					})
				}
			})
		})
	},

	blogArticle: (limit, data) => {
		return new Promise((res, rej) => {
			blogModel.findOne(limit, (err, doc) => {
				if(err){
					console.log('find err : ' + err)
					res(0)
				}
				else{
					doc.article += data.content
					doc.date = new Date
					doc.save((err2) => {
						if(err2){
							res(0)
						}
						else{
							res(2)
						}
					})
				}
			})
		})
	}
}

exports.delete = {
	blog: (limit) => {
		return new Promise((res, rej) => {
			blogModel.remove(limit, (err) => {
				if(err){
					console.log('remove err : ' + err)
					res(0)
				}
				else{
					res(3)
				}
			})
		})
	}
}