'use strict'
var rce = React.createElement.bind()
var socket = io.connect('/')
const myName = '北冥有鱼吃'
React.initializeTouchEvents(true)


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
						rce('div', {'className': 'homepage-sub'}, 'power by beim the one')
					)
				)
			)
		)
	}
})

React.render(rce(total,null), document.body)
