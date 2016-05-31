let React = require('react')
const rce = React.createElement.bind()
const myName = '北冥有鱼吃'
let SiteHeader = (props) => {
	return (
		rce('header', {'className': 'site-header'},
			rce('div', {'className': 'header-content'},
				rce('a', {'className': 'site-title', 'href': 'https://github.com/Beim'}, myName),
				rce('nav', {'className': 'site-nav'}, 
					rce('a',{'className': 'site-link', 'href': '../index.html'}, 'HOME'),
					rce('a',{'className': 'site-link', 'href': '../about.html'}, 'ABOUT'),
					rce('a',{'className': 'site-link', 'href': '../blog.html'}, 'BLOG'),
					// rce('a',{'className': 'site-link', 'href': '#'}, 'TieBa'),
					rce('a',{'className': 'site-link', 'href': '../url.html'}, 'ShortURL'),
					rce('a',{'className': 'site-link', 'href': '#'}, 'MORE')
				)
			)
		)
	)
}

module.exports = SiteHeader