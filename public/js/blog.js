'use strict'
var rce = React.createElement.bind()
var socket = io.connect('/')
const myName = '北冥有鱼吃'
React.initializeTouchEvents(true)

var total = React.createClass({display: 'total',
	render : function(){
		return(
			rce('div', {'className': 'blog'},
				rce('div', {'className': 'site-header'},
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
						rce('div', {'className': 'fullstrip-title'}, 'Blog')
					)
				),
				rce('div', {'className': 'mainContainer'},
					rce('div', {'className': 'mainContainer-content'},
						// rce('div', {'className': '2'}, 'main')
						rce('div', {'className': 'post-wrap'},
							rce('h1', {'className': 'post-name'},
								rce('a', {'href': '#'}, 'Anouncing Event Calendar App')
							),
							rce('div', {'className': 'post-date'}, '#2016 05 12'),
							rce('div', {'className': 'post-excerpt'},
								rce('p', null, 'I’ve been building side projects since the day that I began programming. However, only more recently have I taken my side projects seriously and tried to build something useful, something that people will actually use. Horu You may or may not know that just under 6 months ago I released...')
							),
							rce('div', {'className': 'post-tags'},
								rce('span', {'className': 'post-tag'}, 'tags:'),
								rce('span', {'className': 'post-tag'},
									rce('a', {'href': '#'}, 'html')
								),
								rce('span', {'className': 'post-tag'},
									rce('a', {'href': '#'}, 'html')
								),
								rce('span', {'className': 'post-tag'},
									rce('a', {'href': '#'}, 'html')
								)
							)
						),
						rce('div', {'className': 'post-wrap'},
							rce('h1', {'className': 'post-name'},
								rce('a', {'href': '#'}, 'Anouncing Event Calendar App')
							),
							rce('div', {'className': 'post-date'}, '#2016 05 12'),
							rce('div', {'className': 'post-excerpt'},
								rce('p', null, 'I’ve been building side projects since the day that I began programming. However, only more recently have I taken my side projects seriously and tried to build something useful, something that people will actually use. Horu You may or may not know that just under 6 months ago I released...')
							),
							rce('div', {'className': 'post-tags'},
								rce('span', {'className': 'post-tag'}, 'tags:'),
								rce('span', {'className': 'post-tag'},
									rce('a', {'href': '#'}, 'html')
								),
								rce('span', {'className': 'post-tag'},
									rce('a', {'href': '#'}, 'html')
								),
								rce('span', {'className': 'post-tag'},
									rce('a', {'href': '#'}, 'html')
								)
							)
						),
						rce('div', {'className': 'post-wrap'},
							rce('h1', {'className': 'post-name'},
								rce('a', {'href': '#'}, 'Anouncing Event Calendar App')
							),
							rce('div', {'className': 'post-date'}, '#2016 05 12'),
							rce('div', {'className': 'post-excerpt'},
								rce('p', null, 'I’ve been building side projects since the day that I began programming. However, only more recently have I taken my side projects seriously and tried to build something useful, something that people will actually use. Horu You may or may not know that just under 6 months ago I released...')
							),
							rce('div', {'className': 'post-tags'},
								rce('span', {'className': 'post-tag'}, 'tags:'),
								rce('span', {'className': 'post-tag'},
									rce('a', {'href': '#'}, 'html')
								),
								rce('span', {'className': 'post-tag'},
									rce('a', {'href': '#'}, 'html')
								),
								rce('span', {'className': 'post-tag'},
									rce('a', {'href': '#'}, 'html')
								)
							)
						)
					)
				)
			)
		)
	}
})

React.render(rce(total,null), document.body)
