'use strict'
var rce = React.createElement.bind()
var socket = io.connect('/')
React.initializeTouchEvents(true)
const myName = '北冥有鱼吃'
const SelectTag = {
	front: ['html', 'css', 'javascript'],
	back: ['koa', 'node'],
	daily: ['daily'],
	movies: ['recommend', 'nice', 'intend'],
	books: ['novel']
}

var simulateData = []
for(let i=0; i<6; i++){
	simulateData.push({
		_id: '123',
		name : 'Anouncing Event Calendar App',
		author: 'beim',
		date : '2016 05 12',
		excerpt : 'I’ve been building side projects since the day that I began programming. However, only more recently have I taken my side projects seriously and tried to build something useful, something that people will actually use. Horu You may or may not know that just under 6 months ago I released' + '...',
		tags : ['html', 'css', 'javascript']
	})
}


var westEgg = React.createClass({display: 'westEgg',
	getInitialState: function(){
		// let stateTags = SelectTag
		// let stateTag = []
		// let chooseTag = {}
		// for (let i in SelectTag) {
		// 	if (SelectTag[i]) {
		// 		stateTag = stateTag.concat(SelectTag[i])
		// 	}
		// }
		// for (let i in stateTag) {
		// 	chooseTag[stateTag[i]] = 0
		// }
		// return{
		// 	titleValue: '',
		// 	authorValue: '',
		// 	stateTags: stateTags,
		// 	chooseTag: chooseTag
		// }
		return this.init()
	},
	init: function(){
		let stateTags = SelectTag
		let stateTag = []
		let chooseTag = {}
		for (let i in SelectTag) {
			if (SelectTag[i]) {
				stateTag = stateTag.concat(SelectTag[i])
			}
		}
		for (let i in stateTag) {
			chooseTag[stateTag[i]] = 0
		}
		return{
			titleValue: '',
			authorValue: '',
			stateTags: stateTags,
			chooseTag: chooseTag
		}
		
	},
	handleTitleChange: function(e){
		this.setState({
			titleValue: e.target.value
		})
	},
	handleAuthorChange: function(e){
		this.setState({
			authorValue: e.target.value
		})
	},
	handleAddImg: function(){
		$('#fileInput').click()
	},
	onAddImg: function(e){
		let fileObj = document.getElementById('fileInput').files[0]
		let form = new FormData()
		form.append('file', fileObj)
		form.append('hello', 'world')

		let xhr = new XMLHttpRequest()
		xhr.open('post', 'postMethod/images', true)
		// xhr.setRequestHeader('Content-type', 'multipart/form-data')
		xhr.responstType = 'text'
		xhr.onload = function (e) {
			let url = this.response
			let p = document.getElementById('westEgg-body-edit-p')
			let div = document.createElement('div')
			let img = document.createElement('img')
			img.src = url
			div.appendChild(img)
			p.appendChild(div)
			p.lastChild.focus()
		}
		xhr.send(form)
	},
	handleSelectTag: function (e) {
		let tagName = e.target.innerHTML
		let chooseTag = this.state.chooseTag
		if(chooseTag[tagName] != undefined){
			chooseTag[tagName] = chooseTag[tagName] === 0 ? 1 : 0
		}
		this.setState({chooseTag: chooseTag})
	},
	onPost: function(){
		let _this = this
		let title = this.state.titleValue
		let author = this.state.authorValue
		// let _date = new Date()
		// let m = (_date.getMonth() + "").length == 1 ? "0" + _date.getMonth() : _date.getMonth()
		// let d = (_date.getDate() + "").length == 1 ? "0" + _date.getDate() : _date.getDate()
		// let date = _date.getFullYear() + "-" + m + "-" + d
		let article = document.getElementById('westEgg-body-edit-p').innerHTML
		let index = article.indexOf('<div>') 
		if(index > 0){
			let articleArray = [...article]
			articleArray.splice(index, 0, '</div>')
			article = articleArray.join('')
			article = '<div>' + article
		}
		let excerpt = article.substring(5, article.indexOf('</div>'))
		if(excerpt.length > 250){
			excerpt = excerpt.substring(0, 250) + '...'
		}
		let tags = this.state.chooseTag
		var data = {
			'title': title,
			'author': author,
			'article': article,
			'excerpt': excerpt,
			'tags': tags
		}
		// data = JSON.parse(data)
		data = JSON.stringify(data)
		let xhr = new XMLHttpRequest()
		xhr.open('POST', '/postMethod/newBlog', true)
		xhr.responseType = 'json'
		xhr.setRequestHeader('Content-Type', 'application/x-javascript; charset=UTF-8')
		xhr.onload = function(e){
			if(this.response.ok == -2){
				alert(' 没那麼简单 就能找到 聊得来的伴')
			}
			else if(this.response.ok == 0){
				alert('sorry ~~~post failed')
			}
			else if(this.response.ok == 1){
				_this.props.handleChangeDisplay.call(null, 'blogList')
				_this.setState(_this.init())
				document.getElementById('westEgg-body-edit-p').innerHTML = ''
			}
		}
		xhr.send(data)
		// $.post('/postMethod/newBlog', data, function(data, status){
		// 	console.info('helo wworld')
		// })
	},
	render: function(){
		let style1 = {'color': '#444', 'border': '1px solid #444'}
		// let style1 = {'color': '#3E606F', 'border': '1px solid #3E606F'}
		let style2 = {}
		let stateTags = this.state.stateTags
		let handleSelectTag = this.handleSelectTag
		let chooseTag = this.state.chooseTag
		let tagWrap = []
		for(let i in stateTags){
			let tagName = i
			let tagDetail = stateTags[i]
			let _tags = []
			tagDetail.forEach(function (elem){
				_tags.push(
					rce('div', {'key': '_tagspush' + elem + i, 'onClick': handleSelectTag, 'style': chooseTag[elem] === 0 ? style2 : style1}, elem)
				)
			})
			tagWrap.push(
				rce('div', {'key': 'tagWrap-div' + i, 'className': 'westEgg-sort-tag-div'},
					rce('div', {'key': 'tagWrap-div1' + i, 'className': 'westEgg-sort-tag-div1'}, 
						rce('b', null, i)
					),
					rce('div', {'key': 'tagWrap-div2' + i, 'className': 'westEgg-sort-tag-div2'}, 
						_tags
					)
				)
			)
		}
		return(
			rce('div', {'className': 'mainContainer-content', 'style': {'display': this.props.display === 1 ? 'block' : 'none'}},
				rce('div', {'className': 'westEgg-title'},
					rce('input', {'placeholder': 'Please fill the title', 'value': this.state.titleValue, 'onChange': this.handleTitleChange})
				),
				rce('div', {'className': 'westEgg-body'},
					rce('div', {'className': 'westEgg-body-img'},
						rce('div', {'onClick': this.handleAddImg, 'type': 'file'}, 'Image'),
						rce('input', {'type': 'file', 'id': 'fileInput', 'accept': 'image/gif, image/jpeg, image/x-png', 'style': {'display': 'none'}, 'onChange': this.onAddImg})
					),
					// rce('div', {'className': 'westEgg-body-nothing'}),
					rce('div', {'className': 'westEgg-body-edit'},
						rce('p' ,{'contentEditable': 'true', 'id': 'westEgg-body-edit-p'})
					)
				),
				rce('div', {'className': 'westEgg-sort'},
					rce('div', {'className': 'westEgg-sort-tag'}, 
						tagWrap
					)
				),
				rce('div', {'className': 'westEgg-post'},
					rce('div', {'className': 'westEgg-post-author'}, 
						rce('input', {'placeholder': 'author', 'value': this.state.authorValue, 'onChange': this.handleAuthorChange})
					),
					rce('div', {'className': 'westEgg-post-btn', 'onClick': this.onPost},
						'button'
					)
				)
			)
		)
	}
})

var content = React.createClass({display : 'content',
	getInitialState : function(){
		return{
			data: [],
			showData : [],
			currentNum: 1,
			totalNum: 1,
			blog: '',
			hasZaned: false,
			onePageNum: 5,
			nickname: '',
			email: '',
			comments: []
		}
	},
	componentDidMount : function(){
		this.getBlogList()
	},
	getBlogList: function(){
		let _this = this
		let xhr = new XMLHttpRequest()
		let onePageNum = this.state.onePageNum
		xhr.open('GET', '/getMethod/blogList', true)
		xhr.responseType = 'json'
		xhr.onload = function(e){
			if(this.response.ok == 1){
				// console.info(this.response)
				simulateData = this.response.data
				_this.setState({
					data: simulateData,
					showData: simulateData,
					totalNum: Math.ceil(simulateData.length / onePageNum)
				})
			}
		}
		xhr.send()
	},
	componentWillReceiveProps: function(nextProps){
		let simuData = []
		this.state.data.forEach(function(value){
			if(nextProps.select === 'Blog'){
				simuData.push(value)
			}
			else{
				for (let i=0; i < value.tags.length; i++) {
					if (SelectTag[nextProps.select].indexOf(value.tags[i]) !== -1) {
						simuData.push(value)
						break
					}
				}
			}
		})
		let onePageNum = this.state.onePageNum
		this.setState({
			showData: simuData,
			currentNum: Math.ceil(simuData.length / onePageNum) ? 1 : 0,
			totalNum: Math.ceil(simuData.length / onePageNum)
		})
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
		this.setState({hasZaned: false})
		document.getElementById('blog-article').innerHTML = nextState.blog.article
	},
	handlePrev: function(){
		if(this.state.currentNum > 1){
			this.setState({
				currentNum: this.state.currentNum - 1
			})
			$('html, body').animate({scrollTop: '0px'}, 500)
		}
	},
	handleNext: function(){
		if(this.state.currentNum < this.state.totalNum){
			this.setState({
				currentNum: this.state.currentNum + 1
			})
			$('html, body').animate({scrollTop: '0px'}, 500)
		}
	},
	handleShowBlog: function(e){
		let _this = this
		let id = e.target.getAttribute('data-myid')
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
				_this.setState({
					blog: blog,
					comments: blog.comments
				})
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
					// console.info('zan success')
					let blog = _this.state.blog
					blog.zan += 1
					_this.setState({blog: blog, hasZaned: true})
				}
			}
			xhr.send(id)
		}
	},
	onNicknameChange: function(e){
		this.setState({nickname: e.target.value})
	},
	onEmailChange: function(e){
		this.setState({email: e.target.value})
	},
	handlePostComment: function(){
		let _this = this
		let content = document.getElementById('aBlog-footer-edit-p').innerHTML
		let index = content.indexOf('<div>') 
		if(index > 0){
			let contentArray = [...content]
			contentArray.splice(index, 0, '</div>')
			content = contentArray.join('')
			content = '<div>' + content
		}
		let name = this.state.nickname
		let email = this.state.email
		let predata = {
			_id: this.state.blog._id,
			content: content,
			name: name,
			email: email
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
				let _date = new Date()
				let y = _date.getFullYear()
				let m = (_date.getMonth() + 1) + ''
				m = m.length == 1 ? '0' + m : m
				let d = _date.getDate() + ''
				d = d.length	 == 1 ? '0' + d : d
				predata.date = (y + '-' + m + '-' + d)
				comments.push(predata)
				_this.setState({
					comments: comments,
					email: '',
					nickname: ''
				})
				document.getElementById('aBlog-footer-edit-p').innerHTML = ''
			}
		}
		xhr.send(data)
	},
	render : function(){
		let data = this.state.showData
		let wraps = data.map(function(value, index){
			if(value){
				let author = value.author
				if(author.indexOf(':') != -1){
					author = author.substring(0, author.indexOf(':'))
				}
				return rce('div', {'key' : 'wraps' + index, 'className': 'post-wrap', 'style': {'display': (index<5*this.state.currentNum && index>=5*(this.state.currentNum-1)) ? 'block' : 'none' }},
					rce('h1', {'className': 'post-name'},
						rce('a', {'href': '#', 'onClick': this.handleShowBlog, 'data-myid': value._id}, value.title)
					),
					rce('div', {'className': 'post-date'}, '#' + value.date + ' By: ' + author),
					rce('div', {'className': 'post-excerpt'},
						rce('p', null, value.excerpt)
					),
					rce('div', {'className': 'post-tags'},
						rce('span', {'className': 'post-tag'}, 'tags:'),
						value.tags.map(function(value1, index1){
							return rce('span', {'key': 'tags' + Date() + index1, 'className': 'post-tag'},
								rce('a', {'href': '#'}, value1)
							)
						})
					)
				)
			}
		}.bind(this))
		let style1 = {'color': 'white', 'border': '1px solid white'}
		let style2 = {}

		let comments = this.state.comments
		let aBlogFooterComment = comments.map((value, index) => {
			let date = value.date.substring(2, 10)

			return rce('div', {'key': 'comment' + index, 'className': 'aBlog-footer'},
				rce('div', {'className': 'aBlog-footer-comment'},
					rce('div', {'className': 'aBlog-footer-comment-info'},
						rce('div', {'className': 'aBlog-footer-comment-info-floor'},
							rce('div', null, value.floor)
						),
						rce('div', {'className': 'aBlog-footer-comment-info-name'},
							rce('div', null, value.name)
						),
						rce('div', {'className': 'aBlog-footer-comment-info-name'},
							rce('div', null, date)
						)
					),
					rce('div', {'className': 'aBlog-footer-comment-content'}, 'content')
				)
			)
		})
		return (
			rce('div', {'style': {'display': this.props.display === 0 || this.props.display === 2 ? 'block' : 'none'}}, 
				rce('div', {'className': 'mainContainer-content', 'style': {'display': this.props.display === 0 ? 'block' : 'none'}},
					wraps,
					rce('div', {'className': 'pagination'},
						rce('div', {'className': 'previous', 'style': this.state.currentNum <=1 ? style1 : style2, 'onClick': this.handlePrev}, '← Newer Posts'),
						rce('span', {'className': 'page_number'}, `Page: ${this.state.currentNum} of ${this.state.totalNum}`),
						rce('div', {'className': 'next', 'style': this.state.currentNum >= this.state.totalNum ? style1 : style2, 'onClick': this.handleNext}, 'Older Posts →')
					)
				),
				rce('div', {'className': 'mainContenter-content', 'style': {'display': this.props.display === 2 ? 'block' : 'none'}},
					rce('div', {'className': 'aBlog', 'id': 'blog'},
						rce('h2', null, this.state.blog.title),
						rce('br', null),
						rce('div', {'className': 'blog-article', 'id': 'blog-article'}),
						rce('br', null),
						rce('div', {'className': 'blog-info'},
							rce('div', {'className': 'blog-info-zan', 'onClick': this.zan}, '有用: ' + this.state.blog.zan),
							rce('div', {'className': 'blog-info-tags'}, '标签: ' + this.state.blog.tags),
							rce('div', {'className': 'blog-info-date'}, this.state.blog.date   )
						)
					),
					rce('div', {'className': 'aBlog-footer'},
						// rce('div', null, 'footer')
						rce('div', {'className': 'aBlog-footer-label'}, 'Comment : '),
						rce('div', {'className': 'aBlog-footer-edit'},
							rce('p' ,{'contentEditable': 'true', 'id': 'aBlog-footer-edit-p'})
						),
						rce('div', {'className': 'aBlog-footer-info-post-wraper'},
							rce('div', {'className': 'aBlog-footer-info'},
								rce('input', {'type': 'text', 'placeholder': 'nickname *', 'value': this.state.nickname, 'onChange': this.onNicknameChange}),
								rce('input', {'type': 'text', 'placeholder': 'Email ', 'value': this.state.email, 'onChange': this.onEmailChange})
							),
							rce('div', {'className': 'aBlog-footer-post', 'onClick': this.handlePostComment},
								rce('div', null, 'post')
							)
						)
					),
					aBlogFooterComment

				)
			)
		)
	}
})

var total = React.createClass({display: 'total',
	getInitialState: function(){
		return{
			select: 'Blog',
			shouldRefreshBlogList: false,
			display: 0 //0 blog list  1 secret  2 blog
		}
	},
	handleSelect: function(e){
		this.handleChangeDisplay.call(null, 'blogList')
		this.setState({
			select: e.target.innerHTML
		})
	},
	handleChangeDisplay: function(e, nextDisplay = null){
		if(e === 'secret'){
			nextDisplay = this.state.display === 0 ? 1 : 0
		}
		else if (e === 'showBlog'){
			nextDisplay = 2
		}
		else if (e === 'blogList') {
			nextDisplay = 0
			if(this.state.display != nextDisplay){
				this.setState({
					shouldRefreshBlogList: true
				})
			}
		}
		this.setState({
			display: nextDisplay
		})
	},
	blogListDidRefreshed: function(){
		this.setState({
			shouldRefreshBlogList: false
		})
	},
	render : function(){
		let _tags = []
		for (let i in SelectTag) {
			_tags.push(rce('div', {'key': '_tags'+i, 'className': 'fullstrip-tag', 'onClick': this.handleSelect}, i))
		}
		return(
			rce('div', {'className': 'blog'},
				rce('div', {'className': 'site-header'},
					rce('a', {'className': 'site-title', 'href': 'https://github.com/Beim'}, myName),
					rce('nav', {'className': 'site-nav'}, 
						rce('a', {'className': 'site-link', 'href': '#', 'style': {'color': 'white'}, 'onClick': this.handleChangeDisplay.bind(null, 'secret')}, 'secret'),
						rce('a',{'className': 'site-link', 'href': '../index.html'}, 'HOME'),
						rce('a',{'className': 'site-link', 'href': '../about.html'}, 'ABOUT'),
						rce('a',{'className': 'site-link', 'href': '../blog.html'}, 'BLOG'),
						rce('a',{'className': 'site-link', 'href': '#'}, 'TieBa'),
						rce('a',{'className': 'site-link', 'href': '#'}, 'CharRoom'),
						rce('a',{'className': 'site-link', 'href': '#'}, 'MORE')
					)
				),
				rce('div', {'className': 'fullstrip'},
					rce('div', {'className': 'fullstrip-container'},
						rce('div', {'className': 'fullstrip-title'}, 
							rce('div', {'className': 'fullstrip-super-tag', 'onClick': this.handleSelect}, 'Blog'),
							_tags
						)
					)
				),
				rce('div', {'className': 'mainContainer'},
					// rce('div', {'className': 'mainContainer-content'},
						rce(content, {
							'select': this.state.select,
							'display': this.state.display, 
							'handleChangeDisplay': this.handleChangeDisplay, 
							'shouldRefreshBlogList': this.state.shouldRefreshBlogList, 
							'blogListDidRefreshed': this.blogListDidRefreshed
						}),
						rce(westEgg, {'display': this.state.display, 'handleChangeDisplay': this.handleChangeDisplay})
					// )
				)
			)
		)
	}
})

React.render(rce(total,null), document.body)
