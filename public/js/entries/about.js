'use strict'
const React = require('react')
const ReactDOM = require('react-dom')
var rce = React.createElement.bind()
const myName = '北冥有鱼吃'
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
				rce('header', {'className': 'site-header'},
					rce('a', {'className': 'site-title', 'href': 'https://github.com/Beim'}, myName),
					rce('nav', {'className': 'site-nav'}, 
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
						rce('div', {'className': 'fullstrip-title'}, 'About')
					)
				),
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
