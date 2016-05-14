'use strict'
var rce = React.createElement.bind()
var socket = io.connect('/')
React.initializeTouchEvents(true)
const myName = '北冥有鱼吃'
const SelectTag = {
	front: ['html', 'css', 'javascript'],
	back: ['koa', 'node'],
	daily: [],
	movies: [],
	books: []
}

var simulateData = []
for(let i=0; i<6; i++){
	simulateData.push({
		_id: '123',
		name : 'Anouncing Event Calendar App',
		date : '2016 05 12',
		excerpt : 'I’ve been building side projects since the day that I began programming. However, only more recently have I taken my side projects seriously and tried to build something useful, something that people will actually use. Horu You may or may not know that just under 6 months ago I released' + '...',
		tags : ['html', 'css', 'javascript']
	})
}
for(let i=0; i<6; i++){
	simulateData.push({
		_id: '123',
		name : 'Anouncing Event Calendar App',
		date : '2016 05 12',
		excerpt : 'I’ve been building side projects since the day that I began programming. However, only more recently have I taken my side projects seriously and tried to build something useful, something that people will actually use. Horu You may or may not know that just under 6 months ago I released' + '...',
		tags : ['koa']
	})
}



var westEgg = React.createClass({display: 'westEgg',
	getInitialState: function(){
		return{
			titleValue: ''
		}
	},
	handleTitleChange: function(e){
		this.setState({
			titleValue: e.target.value
		})
	},
	handleAddImg: function(){

	},
	render: function(){
		return(
			rce('div', {'className': 'mainContainer-content', 'style': {'display': this.props.display === 1 ? 'block' : 'none'}},
				// rce('div', null, 'hello')

				rce('div', {'className': 'westEgg-title'},
					// rce('div', null, 'hello')
					rce('input', {'placeholder': 'Please fill the title', 'value': this.state.titleValue, 'onChange': this.handleTitleChange})
				),
				rce('div', {'className': 'westEgg-body'},
					// rce('div', null, 'world')
					rce('div', {'className': 'westEgg-body-img'},
						rce('div', {'onClick': this.handleAddImg}, 'Image')
					),
					// rce('div', {'className': 'westEgg-body-nothing'}),
					rce('div', {'className': 'westEgg-body-edit'},
						rce('p' ,{'contentEditable': 'true'})
					)
				),
				rce('div', {'className': 'westEgg-sort-tag'},
					rce('div', null, '945')
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
							rce('div', {'className': 'fullstrip-tag', 'onClick': this.handleSelect}, 'front'),
							rce('div', {'className': 'fullstrip-tag', 'onClick': this.handleSelect}, 'back'),
							rce('div', {'className': 'fullstrip-tag', 'onClick': this.handleSelect}, 'daily'),
							rce('div', {'className': 'fullstrip-tag', 'onClick': this.handleSelect}, 'movies'),
							rce('div', {'className': 'fullstrip-tag', 'onClick': this.handleSelect}, 'books')
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
