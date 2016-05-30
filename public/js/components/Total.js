let React = require('react')
const rce = React.createElement.bind()
let SideController = require('./SideController.js')
let WestEggController = require('./WestEggController.js')
let ContentController = require('./ContentController.js')

let Total = (props) => {
	let SelectTag = props.SelectTag
	let handleSelect = props.handleSelect
	let showSide = props.showSide
	let myName = props.myName
	let handleChangeDisplay = props.handleChangeDisplay
	let select = props.select
	let display = props.display
	let shouldRefreshBlogList = props.shouldRefreshBlogList
	let blogListDidRefreshed = props.blogListDidRefreshed
	let styleDisplayNone = props.styleDisplayNone
	let handleMouseOver = props.handleMouseOver
	let handleMouseLeave = props.handleMouseLeave

	let style1 = {'display': 'none'}//styleDisplayNone !== 1
	let style2 = {'opacity': '1'}//styleDisplayNone === 1
	let style3 = {'background': 'rgba(0,0,0,0.4)'}
	let _tags = []
	for (let i in SelectTag) {
		let _subTags = []
		for(let j in SelectTag[i]){
			_subTags.push(rce('div', {'key': '_subTags'+i + j, 'className': 'fullstrip-tag-li', 'onClick': handleSelect,  'style': styleDisplayNone[i] !== 1 ? style1 : style2}, SelectTag[i][j]))
		}
		_tags.push(rce('div', {'key': '_tags'+i, 'className': 'fullstrip-title-div', 'style': styleDisplayNone[i] !== 1 ? style2 : style3, 'onMouseOverCapture': handleMouseOver, 'onMouseLeave': handleMouseLeave},
			rce('div', {'className': 'fullstrip-tag', 'onClick': handleSelect}, i),
			_subTags
		))
	}
	return (
		rce('div', {'className': 'blog'},
			rce('div', {'className': 'site-side', 'id': 'site-side'}, 
				rce(SideController, {'handleSelect': handleSelect, 'SelectTag': SelectTag, 'myName': myName})
			),
			rce('div', {'className': 'site-hide', 'id': 'site-hide', 'onClick': showSide}),
			rce('div', {'className': 'blogContent', 'id': 'blogContent'},
				rce('div', {'className': 'site-header'},
					rce('a', {'className': 'site-title','id': 'site-title', 'href': 'https://github.com/Beim'}, myName),
					rce('nav', {'className': 'site-nav'}, 
						rce('a', {'className': 'site-link', 'href': '#', 'style': {'color': 'white'}, 'onClick': handleChangeDisplay.bind(null, 'secret')}, 'secret'),
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
						rce('div', {'className': 'fullstrip-title-mob'}, 
							rce('div', {'className': 'fullstrip-super-tag fullstrip-title-div', 'onClick': showSide}, 'Blog')
						),
						rce('div', {'className': 'fullstrip-title'}, 
							rce('div', {'className': 'fullstrip-super-tag fullstrip-title-div', 'id': 'allBlog', 'onClick': handleSelect}, 'Blog'),
							_tags
						)
					)
				),
				rce('div', {'className': 'mainContainer'},
					rce(ContentController, {
						'select': select,
						'handleSelect': handleSelect,
						'display': display, 
						'handleChangeDisplay': handleChangeDisplay, 
						'shouldRefreshBlogList': shouldRefreshBlogList, 
						'blogListDidRefreshed': blogListDidRefreshed
					}),
					rce(WestEggController, {'display': display, 'handleChangeDisplay': handleChangeDisplay})
				)
			)
		)
	)
}

module.exports = Total
