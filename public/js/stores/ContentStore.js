const EventEmitter = require('events').EventEmitter
const assign = require('object-assign')


let ContentStore = assign({}, EventEmitter.prototype, {
	data: [],
	showData : [],
	currentNum: 1,
	totalNum: 1,
	blog: '',
	hasZaned: false,
	onePageNum: 5,
	nickname: '',
	email: '',
	comments: [],
	
	getData: function(){
		return this.data
	},
	getShowData: function(){
		return this.showData
	},
	getCurrentNum: function(){
		return this.currentNum
	},
	getTotalNum: function(){
		return this.totalNum
	},
	getBlog: function(){
		return this.blog
	},
	getHasZaned: function(){
		return this.hasZaned
	},
	getOnePageNum: function(){
		return this.onePageNum
	},
	getNickname: function(){
		return this.nickname
	},
	getEmail: function(){
		return this.email	
	},
	getComments: function(){
		return this.comments
	},

	emitChange: function () {
		this.emit('change')
	},
	addChangeListener: function (callback) {
		this.on('change', callback)
	},

	removeChangeListener: function (callback) {
		this.removeListener('change', callback)
	},

	getBlogList: function(data, showData, totalNum){
		this.data = data
		this.showData = showData
		this.totalNum = totalNum
	},

	changeSelect: function(showData, currentNum, totalNum){
		this.showData = showData
		this.currentNum = currentNum
		this.totalNum = totalNum
	},

	changeZanState: function(hasZaned, blog){
		this.hasZaned = hasZaned
		if(!!blog){
			this.blog = blog
		}
	},

	changeCurrentNum: function(currentNum){
		this.currentNum = currentNum
	},

	showBlog: function(blog, comments){
		if(!!blog){
			this.blog = blog
		}
		if(!!comments){
			this.comments = comments
		}
	},

	changeNickname: function(nickname){
		this.nickname = nickname
	},

	changeEmail: function(email){
		this.email = email
	}
})

module.exports = ContentStore