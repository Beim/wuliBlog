'use strict'
const React = require('react')
const ReactDOM = require('react-dom')
var rce = React.createElement.bind()
const myName = '北冥有鱼吃'
// ReactDOM.initializeTouchEvents(true)


var total = React.createClass({display:'total',

	render : function(){
		return (
			rce('div',{'className': 'home'},
				// rce('img', {src: '../img/background.jpg'})
				rce('header', {'className': 'site-header'},
					// rce('p', null, 'hello')
					rce('div', {'className': 'header-content'},
						rce('nav', {'className': 'site-nav'}, 
							rce('a',{'className': 'site-link', 'href': '../index.html'}, 'HOME'),
							rce('a',{'className': 'site-link', 'href': '../about.html'}, 'ABOUT'),
							rce('a',{'className': 'site-link', 'href': '../blog.html'}, 'BLOG'),
							rce('a',{'className': 'site-link', 'href': '#'}, 'TieBa'),
							rce('a',{'className': 'site-link', 'href': '#'}, 'CharRoom'),
							rce('a',{'className': 'site-link', 'href': '#'}, 'MORE')
						)
					)
				),
				rce('div', {'className': 'homepage'},
					rce('div', {'className': 'homepage-null'}),
					rce('div', {'className': 'homepage-content'}, 
						rce('div', {'className': 'homepage-main'}, myName),
						rce('div', {'className': 'homepage-sub'}, 'powered by beim')
					)
				)
			)
		)
	}
})

ReactDOM.render(rce(total,null), document.getElementById('main'))
