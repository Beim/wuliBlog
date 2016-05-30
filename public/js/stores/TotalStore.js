const EventEmitter = require('events').EventEmitter
const assign = require('object-assign')

let TotalStore = assign({}, EventEmitter.prototype, {
	myName: '北冥有鱼吃',
	select: 'Blog',
	isSideShow: false,
	shouldRefreshBlogList: false,
	styleDisplayNone: {},
	display: 0, //0 blog list  1 secret  2 blog
	SelectTag: {
		front: ['html', 'css', 'javascript', 'react', 'f-others'],
		back: ['node', 'koa', 'es6', 'mongo', 'b-others'],
		daily: ['d-nice', 'd-bad', 'between', 'd-others'],
		movie: ['recommend', 'm-nice', 'intend', 'm-bad', 'm-others'],
		other: ['tech', 'linux', 'o-others']
	},

	changeHash: function (e) {
		window.location.hash = e;
	},

	getMyName: function(){
		return this.myName
	},
	getSelect: function(){
		return this.select
	},
	getIsSideShow: function(){
		return this.isSideShow
	},
	getShouldRefreshBlogList: function(){
		return this.shouldRefreshBlogList
	},
	getStyleDisplayNone: function(){
		return this.styleDisplayNone
	},
	getDisplay: function(){
		return this.display
	},
	getSelectTag: function(){
		return this.SelectTag
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

	handleSelect: function(e, select){
		if(!!e){
			this.select = e.target.innerHTML
			this.changeHash('#!/list/' + e.target.innerHTML)
		}
		else{
			this.select = select
		}
	},

	handleChangeDisplay: function(e, nextDisplay){
		if(e === 'secret'){
			nextDisplay = this.display === 0 ? 1 : 0
		}
		else if (e === 'showBlog'){
			nextDisplay = 2
		}
		else if (e === 'blogList') {
			nextDisplay = 0
			if(this.display != nextDisplay){
				this.shouldRefreshBlogList = true
			}
		}
		this.display = nextDisplay
	},

	blogListDidRefreshed: function(){
		this.shouldRefreshBlogList = false
		// this.setState({
		// 	shouldRefreshBlogList: false
		// })
	},

	handleMouseOver: function(e){
		let currentTag = e.target.parentNode.firstChild.innerHTML
		this.styleDisplayNone[currentTag] = 1
		// let styleDisplayNone = this.state.styleDisplayNone
		// let currentTag = e.target.parentNode.firstChild.innerHTML
		// styleDisplayNone[currentTag] = 1
		// this.setState({'styleDisplayNone': styleDisplayNone})
	},

	handleMouseLeave: function(e){
		let currentTag = e.target.parentNode.firstChild.innerHTML
		this.styleDisplayNone[currentTag] = 0
		// let styleDisplayNone = this.state.styleDisplayNone
		// let currentTag = e.target.parentNode.firstChild.innerHTML
		// styleDisplayNone[currentTag] = 0
		// this.setState({'styleDisplayNone': styleDisplayNone})
	},

	showSide: function(){
		if(this.isSideShow){
			document.getElementById('site-side').style.left = '-50%'
			document.getElementById('site-side').style.boxShadow = ''
			document.getElementById('blogContent').style.left = 0
			document.getElementById('site-hide').style.display = 'none'
			this.isSideShow = false
		}
		else{
			document.getElementById('site-side').style.left = 0 
			document.getElementById('site-side').style.boxShadow = '2px 0 2px #aaaaaa'
			document.getElementById('blogContent').style.left = '50%'
			document.getElementById('site-hide').style.display = 'block'
			this.isSideShow = true
		}
	}
})

module.exports = TotalStore