let React = require('react')
const rce = React.createElement.bind()

let WestEgg = require('./WestEgg.js')
let WestEggActions = require('../actions/WestEggActions.js')
let WestEggStore = require('../stores/WestEggStore.js')

let WestEggController = React.createClass({display: 'WestEggController',
	getInitialState: function(){
		return WestEggStore.init()
	},

	_onChange: function(){
		this.setState({
			titleValue: WestEggStore.getTitleValue(),
			authorValue: WestEggStore.getAuthorValue(),
			chooseTag: WestEggStore.getChooseTag()
		})
	},
	componentDidMount: function(){
		WestEggStore.addChangeListener(this._onChange)
	},
	componentWillUnmount: function(){
		WestEggStore.removeChangeListener(this._onChange)
	},

	handleTitleChange: function(e){
		WestEggActions.handleTitleChange(e)
	},
	handleAuthorChange: function(e){
		WestEggActions.handleAuthorChange(e)
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
		WestEggActions.handleSelectTag(e)
	},
	onPost: function(){
		let _this = this
		let title = this.state.titleValue
		let author = this.state.authorValue
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
				// _this.setState(_this.init())
				WestEggActions.init()
				document.getElementById('westEgg-body-edit-p').innerHTML = ''
			}
		}
		xhr.send(data)
	},
	handleAddPre: function(){
		let preHTML = `<div><pre class=" language-javascript" style="padding: 0em 0em 0.5em; word-spacing: normal; list-style-type: none; border: none; text-shadow: white 0px 1px; font-family: Consolas, Monaco, 'Andale Mono', monospace; direction: ltr; tab-size: 4; overflow: auto; letter-spacing: -0.12px; line-height: 21.6px; background: rgb(245, 242, 240);"><font color="#708090"><span style="font-size: 14.4px;">#</span></font></pre></div>`
		let p = document.getElementById('westEgg-body-edit-p')
		p.innerHTML += '<div>&nbsp;&nbsp;</div>'	 + preHTML + '<div>&nbsp;&nbsp;</div>'		
	},
	handleAddH2: function(){
		let preHTML = `<div><h2><font color="#444"><span>#</span></font></h2></div>`
		let p = document.getElementById('westEgg-body-edit-p')
		p.innerHTML += '<div>&nbsp;&nbsp;</div>'	 + preHTML + '<div>&nbsp;&nbsp;</div>'		
	},

	render: function(){
		return WestEgg({
			stateTags: this.state.stateTags,
			handleSelectTag: this.handleSelectTag,
			chooseTag: this.state.chooseTag,
			display: this.props.display,
			titleValue: this.state.titleValue,
			handleTitleChange: this.handleTitleChange,
			handleAddImg: this.handleAddImg,
			handleAddPre: this.handleAddPre,
			handleAddH2: this.handleAddH2,
			authorValue: this.state.authorValue,
			onPost: this.onPost,
			onAddImg: this.onAddImg,
			handleAuthorChange: this.handleAuthorChange
		})
	}
})

module.exports = WestEggController