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
		let title = this.state.titleValue
		let author = this.state.authorValue
		let _date = new Date()
		let m = (_date.getMonth() + "").length == 1 ? "0" + _date.getMonth() : _date.getMonth()
		let d = (_date.getDate() + "").length == 1 ? "0" + _date.getDate() : _date.getDate()
		let date = _date.getFullYear() + "-" + m + "-" + d
		let article = document.getElementById('westEgg-body-edit-p').innerHTML
		let tags = this.state.chooseTag
		var data = {
			'title': title,
			'author': author,
			'date': date,
			'article': article,
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
			totalNum: 1
		}
	},
	componentDidMount : function(){
		this.setState({
			data: simulateData,
			showData: simulateData,
			totalNum: Math.ceil(simulateData.length / 5)
		})
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
		this.setState({
			showData: simuData,
			currentNum: Math.ceil(simuData.length / 5) ? 1 : 0,
			totalNum: Math.ceil(simuData.length / 5)
		})

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
	render : function(){
		let data = this.state.showData
		let wraps = data.map(function(value, index){
			if(value)
			return rce('div', {'key' : 'wraps' + index, 'className': 'post-wrap', 'style': {'display': (index<5*this.state.currentNum && index>=5*(this.state.currentNum-1)) ? 'block' : 'none' }},
				rce('h1', {'className': 'post-name'},
					rce('a', {'href': '#'}, value.name)
				),
				rce('div', {'className': 'post-date'}, '#' + value.date),
				rce('div', {'className': 'post-excerpt'},
					rce('p', null, value.excerpt + '...')
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
		}.bind(this))
		let style1 = {'color': 'white', 'border': '1px solid white'}
		let style2 = {}
		return (
			rce('div', {'className': 'mainContainer-content', 'style': {'display': this.props.display === 0 ? 'block' : 'none'}},
				wraps,
				rce('div', {'className': 'pagination'},
					rce('div', {'className': 'previous', 'style': this.state.currentNum <=1 ? style1 : style2, 'onClick': this.handlePrev}, '← Newer Posts'),
					rce('span', {'className': 'page_number'}, `Page: ${this.state.currentNum} of ${this.state.totalNum}`),
					rce('div', {'className': 'next', 'style': this.state.currentNum >= this.state.totalNum ? style1 : style2, 'onClick': this.handleNext}, 'Older Posts →')
				)
			)
		)
	}
})

var total = React.createClass({display: 'total',
	getInitialState: function(){
		return{
			select: 'Blog',
			display: 1
		}
	},
	handleSelect: function(e){
		this.setState({
			select: e.target.innerHTML
		})
	},
	handleChangeDisplay: function(){
		let nextDisplay = this.state.display === 0 ? 1 : 0
		// console.info('display' + nextDisplay)
		this.setState({
			display: nextDisplay
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
						rce('a', {'className': 'site-link', 'href': '#', 'style': {'color': 'white'}, 'onClick': this.handleChangeDisplay}, 'secret'),
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
						rce(content, {'select': this.state.select, 'display': this.state.display}),
						rce(westEgg, {'display': this.state.display})
					// )
				)
			)
		)
	}
})

React.render(rce(total,null), document.body)
