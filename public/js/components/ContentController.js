let React = require('react')
const rce = React.createElement.bind()
let Content = require('./Content.js')
let ContentActions = require('../actions/ContentActions.js')
let ContentStore = require('../stores/ContentStore.js')
let TotalStore = require('../stores/TotalStore.js')

const changeHash = (e) => {
	window.location.hash = e
}

let getDate = () => {
	let _date = new Date()
	let y = _date.getFullYear()
	let m = (_date.getMonth() + 1) + ''
	m = m.length == 1 ? '0' + m : m
	let d = _date.getDate() + ''
	d = d.length	 == 1 ? '0' + d : d
	return _date = y + '-' + m + '-' + d
}

var simulateData = []
for(let i=0; i<1; i++){
	simulateData.push({
		_id: '123',
		name : 'Anouncing Event Calendar App',
		author: 'beim',
		date : '2016 05 12',
		excerpt : 'I’ve been building side projects since the day that I began programming. However, only more recently have I taken my side projects seriously and tried to build something useful, something that people will actually use. Horu You may or may not know that just under 6 months ago I released' + '...',
		tags : ['html', 'css', 'javascript']
	})
}

let ContentController = React.createClass({display: 'ContentController',
	getInitialState: function() {
		return{
			data: ContentStore.getData(),
			showData : ContentStore.getShowData(),
			currentNum: ContentStore.getCurrentNum(),
			totalNum: ContentStore.getTotalNum(),
			blog: ContentStore.getBlog(),
			hasZaned: ContentStore.getHasZaned(),
			onePageNum: ContentStore.getOnePageNum(),
			nickname: ContentStore.getNickname(),
			email: ContentStore.getEmail(),
			comments: ContentStore.getComments(),
			SelectTag: TotalStore.getSelectTag()
		}
	},
	componentWillMount: function(){

		ContentStore.addChangeListener(this._onChange)
	},
	componentDidMount: function() {
		ContentStore.addChangeListener(this._onChange)
	},
	componentWillUnmount: function() {
		ContentStore.removeChangeListener(this._onChange)
	},
	_onChange: function() {
		this.setState({
			data: ContentStore.getData(),
			showData : ContentStore.getShowData(),
			currentNum: ContentStore.getCurrentNum(),
			totalNum: ContentStore.getTotalNum(),
			blog: ContentStore.getBlog(),
			hasZaned: ContentStore.getHasZaned(),
			onePageNum: ContentStore.getOnePageNum(),
			nickname: ContentStore.getNickname(),
			email: ContentStore.getEmail(),
			comments: ContentStore.getComments()
		})
	},

	handleHashChange: function(){
		let hashArr = window.location.hash.split('/')
		if(hashArr[1] === 'article'){
			this.handleShowBlog(null, hashArr[2])
		}
		else if (hashArr[1] === 'list'){
			this.props.handleSelect(null, hashArr[2])
		}
	},
	componentDidMount : function(){
		this.getBlogList()
		window.onhashchange = this.handleHashChange
		$(window).scroll(function(){
			if($(window).scrollTop() > 100){
				$('#aBlog-goTop').fadeIn(1000)
			}
			else{
				$('#aBlog-goTop').fadeOut(1000)
			}
		})
		$('#aBlog-goTop').click(function(){
			$('body, html').animate({scrollTop: 0}, 300)
			return false
		})
	},
	directToHash: function(){
		if(window.location.hash){
			this.handleHashChange()
		}
		else{
			changeHash('#!/list/Blog')
		}
	},
	getBlogList: function(){
		if(this.state.showData.length == 0){
			let _this = this
			let xhr = new XMLHttpRequest()
			let onePageNum = this.state.onePageNum
			xhr.open('GET', '/getMethod/blogList', true)
			xhr.responseType = 'json'
			xhr.onload = function(e){
				if(this.response.ok == 1){
					simulateData = this.response.data
					// _this.setState({
					// 	data: simulateData,
					// 	showData: simulateData,
					// 	totalNum: Math.ceil(simulateData.length / onePageNum)
					// })
					ContentActions.getBlogList(simulateData, simulateData, Math.ceil(simulateData.length / onePageNum))
					_this.directToHash()
				}
			}
			xhr.send()
		}
	},
	componentWillReceiveProps: function(nextProps){
		let SelectTag = TotalStore.getSelectTag()
		if(this.props.select !== nextProps.select){
			let simuData = []
			this.state.data.forEach(function(value){
				if(nextProps.select === 'Blog'){
					simuData.push(value)
				}
				else if(SelectTag[nextProps.select]){
					for (let i=0; i < value.tags.length; i++) {
						if (SelectTag[nextProps.select].indexOf(value.tags[i]) !== -1) {
							simuData.push(value)
							break
						}
					}
				}
				else{
					if (value.tags.indexOf(nextProps.select) !== -1) {
						simuData.push(value)
					}
				}
			})
			let onePageNum = this.state.onePageNum
			// this.setState({
			// 	showData: simuData,
			// 	currentNum: Math.ceil(simuData.length / onePageNum) ? 1 : 0,
			// 	totalNum: Math.ceil(simuData.length / onePageNum)
			// })
			ContentActions.changeSelect(simuData, Math.ceil(simuData.length / onePageNum) ? 1 : 0, Math.ceil(simuData.length / onePageNum))
		}
		if(nextProps.shouldRefreshBlogList){
			this.getBlogList()
			this.props.blogListDidRefreshed()
		}

	},
	shouldComponentUpdate: function(nextProps, nextState){
		if(this.state.blog !== nextState.blog){
			this.showBlogArticle(nextState)
		}
		return true
	},
	// componentWillUpdate: function(nextProps, nextState){
	// 	console.info('will')
	// },
	componentDidUpdate: function(prevProps, prevState){
		if(this.state.comments.length !== prevState.comments.length){
			let divs = document.getElementsByClassName('aBlog-footer-comment-content')
			let comments = Object.assign([], this.state.comments)
			comments.forEach((value, index) => {
				divs[index].innerHTML = value.content
			})
		}

	},
	showBlogArticle: function(nextState){
		ContentActions.changeZanState(false)
		// this.setState({hasZaned: false})
		document.getElementById('blog-article').innerHTML = nextState.blog.article
	},
	handlePrev: function(){
		if(this.state.currentNum > 1){
			ContentActions.changeCurrentNum(this.state.currentNum - 1)
			// this.setState({
			// 	currentNum: this.state.currentNum - 1
			// })
			$('html, body').animate({scrollTop: '0px'}, 500)
		}
	},
	handleNext: function(){
		if(this.state.currentNum < this.state.totalNum){
			ContentActions.changeCurrentNum(this.state.currentNum +1)
			// this.setState({
			// 	currentNum: this.state.currentNum + 1
			// })
			$('html, body').animate({scrollTop: '0px'}, 500)
		}
	},
	handleShowBlog: function(e, id = ''){
		let _this = this
		if(!!e){
			id = e.target.getAttribute('data-myid')
		}
		id =  JSON.stringify({_id: id})
		this.props.handleChangeDisplay.call(null, 'showBlog')
		let xhr = new XMLHttpRequest()
		xhr.open('POST', '/postMethod/blog', true)
		xhr.setRequestHeader('Content-Type', 'application/x-javascript; charset=UTF-8')
		xhr.responseType = 'json'
		xhr.onload = function(e){
			if(this.response.ok == 1){
				let blog = this.response.data
				blog.date = blog.date.substring(0, 10)
				ContentActions.showBlog(blog, blog.comments)
				// _this.setState({
				// 	blog: blog,
				// 	comments: blog.comments
				// })
			}
		}
		xhr.send(id)
	},
	zan: function(){
		if(!this.state.hasZaned){
			let _this = this
			let id = JSON.stringify({_id: this.state.blog._id})
			let xhr = new XMLHttpRequest()
			xhr.open('POST', 'postMethod/zan', true)
			xhr.setRequestHeader('Content-Type', 'application/x-javascript; charset=UTF-8')
			xhr.responseType = 'json'
			xhr.onload = function(e){
				if(this.response.ok == 1){
					let blog = _this.state.blog
					blog.zan += 1
					ContentActions.changeZanState(true, blog)
					// _this.setState({blog: blog, hasZaned: true})
				}
			}
			xhr.send(id)
		}
	},
	onNicknameChange: function(e){
		ContentActions.changeNickname(e.target.value)
		// this.setState({nickname: e.target.value})
	},
	onEmailChange: function(e){
		ContentActions.changeEmail(e.target.value)
		// this.setState({email: e.target.value})
	},
	handlePostComment: function(){
		if(this.state.nickname == '' || this.state.nickname == '昵称不能为空*'){
			ContentActions.changeNickname('昵称不能为空*')
			// this.setState({nickname: '昵称不能为空*'})
		}
		else{
			let _this = this
			let content = document.getElementById('aBlog-footer-edit-p').innerHTML
			let index = content.indexOf('<div>') 
			if(index > 0){
				let contentArray = [...content]
				contentArray.splice(index, 0, '</div>')
				content = contentArray.join('')
				content = '<div>' + content
			}
			else if (index == -1) {
				content = '<div>' + content + '</div>'
			}
			let name = this.state.nickname
			let email = this.state.email
			let _date = getDate()
			let predata = {
				_id: this.state.blog._id,
				author: this.state.blog.author,
				content: content,
				name: name,
				email: email,
				date: _date
			}
			let data = JSON.stringify(predata)
			let xhr = new XMLHttpRequest()
			xhr.open('POST', '/postMethod/comment', true)
			xhr.setRequestHeader('Content-Type', 'application/x-javascript; charset=UTF-8')
			xhr.responseType = 'json'
			xhr.onload = function(e){
				if(this.response.ok == 1){
					let comments = Object.assign([], _this.state.comments)
					predata.floor = comments.length + 1
					comments.push(predata)
					ContentActions.showBlog(null, comments)
					// _this.setState({
					// 	comments: comments
					// })
					document.getElementById('aBlog-footer-edit-p').innerHTML = ''
				}
				else if(this.response.ok == 2){
					let blog = Object.assign({}, _this.state.blog)
					predata.content = `</br><div>--------${predata.author} 修改于 ${predata.date}--------</div></br>` + predata.content
					blog.article += predata.content
					ContentActions.showBlog(blog, null)
					// _this.setState({
					// 	blog: blog
					// })
				}
				else if(this.response.ok == 3){
					window.location = 'blog.html'
				}
				else{
					alert('sorrty~')
				}
			}
			xhr.send(data)
		}
	},
	toAbout: function(){
		window.location = 'about.html'
	},


	render: function() {
		return Content({
			showData: this.state.showData,
			currentNum: this.state.currentNum,
			comments: this.state.comments,
			onePageNum: this.state.onePageNum,
			display: this.props.display,
			handlePrev: this.handlePrev,
			totalNum: this.state.totalNum,
			handleNext: this.handleNext,
			toAbout: this.toAbout,
			blog: this.state.blog,
			nickname: this.state.nickname,
			onNicknameChange: this.onNicknameChange,
			email: this.state.email,
			onEmailChange: this.onEmailChange,
			handlePostComment: this.handlePostComment,
			_this: this,
			zan: this.zan
		})
	}
})

module.exports = ContentController
