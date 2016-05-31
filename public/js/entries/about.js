'use strict'
const React = require('react')
const ReactDOM = require('react-dom')
var rce = React.createElement.bind()
let SiteHeader = require('../components/SiteHeader.js')
let Fullstrip = require('../components/Fullstrip.js')
// ReactDOM.initializeTouchEvents(true)

var total = React.createClass({display: 'total',
	handleClickMyImg : function(){
		window.open('https://github.com/Beim')
	},
	toBlog: function(){
		window.location = 'blog.html'
	},
	render : function(){
		return(
			rce('div',{'className': 'about'},
				SiteHeader(),
				Fullstrip({title: 'About'}),
				rce('div', {'className': 'mainContainer'},
					rce('div', {'className': 'mainContainer-content'},
						rce('div', {'className': 'mainContainer-left'},
							// rce('div', {}, 'left')
							rce('div', {'className': 'bio-image'}, 
								rce('img', {'className': 'myImage', 'src': '../img/myImg.png', 'onClick': this.handleClickMyImg})
							),
							rce('div', {'className': 'title'}, `Things I'm good at`),
							rce('div', {'className': 'content-area' },
								rce('div', {'className': 'skill html'}, 'zero'),
								rce('div', {'className': 'skill css'}, 'zero'),
								rce('div', {'className': 'skill javascript'}, 'zero'),
								rce('div', {'className': 'skill koa'}, 'zero'),
								rce('div', {'className': 'skill nodejs'}, 'zero')
							),
							rce('div', {'className': 'title'}, `Things I love`),
							rce('div', {'className': 'content-area' },
								rce('div', {'className': 'skill html'}, 'zero'),
								rce('div', {'className': 'skill css'}, 'zero'),
								rce('div', {'className': 'skill javascript'}, 'zero'),
								rce('div', {'className': 'skill koa'}, 'zero'),
								rce('div', {'className': 'skill nodejs'}, 'zero')
							)
						),
						rce('div', {'className': 'mainContainer-right'},
							rce('h2', {'className': 'to-blog', 'onClick': this.toBlog, 'onTouchStart': this.toBlog}, 'To my Blog'),
							rce('br', null),
							rce('h2', null, 'Who are you?'),
							rce('p', null, 'who are you'),
							rce('h2', null, 'Where are you ?'),
							rce('p', null, 'where are you'),
							rce('h2', null, 'What are you up to at the moment?'),
							rce('p', null, 'what are you up to at the moment?')
						)
					)
				)

			)
		)
	}
})


ReactDOM.render(rce(total,null), document.getElementById('main'))
