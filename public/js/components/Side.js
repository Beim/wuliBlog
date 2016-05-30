let React = require('react')
const rce = React.createElement.bind()

let Side = (props) => {
	let handleSelect = props.handleSelect
	let handleSelectMainTag = props.handleSelectMainTag
	let shouldSubtagShow = props.shouldSubtagShow
	let handleHeaderClick = props.handleHeaderClick
	let handleAllBlogClick = props.handleAllBlogClick
	let SelectTag = props.SelectTag
	let myName = props.myName

	let style1 = {'display': 'none'}
	let style2 = {}
	let _tags = []

	for(let i in SelectTag){
		let _subTags = []
		for(let j in SelectTag[i]){
			_subTags.push(rce('div', {'key': '_subTags'+i+j, 'onTouchStart': handleSelect}, SelectTag[i][j]))
		}
		_tags.push(
			rce('div', {'key': '_tags-mob' + i, 'className': 'side-content-wrap'},
				rce('div', {'className': 'side-content-wrap-main'},
					rce('div', {'onTouchStart': handleSelectMainTag}, i)
				),
				rce('div', {'className': 'side-content-wrap-sub', 'style': shouldSubtagShow == i ? style2 : style1},
					_subTags
				)
			)
		)
	}
	return(
		rce('div', {'className': 'side-container'},
			rce('div', {'className': 'side-header'},
				rce('div', {'onTouchStart': handleHeaderClick}, myName)
			),
			rce('div', {'className': 'side-content'},
				rce('div', {'className': 'side-content-wrap'},
					rce('div', {'className': 'side-content-wrap-main'},
						rce('div', {'onTouchStart': handleAllBlogClick}, 'All')
					)
				),
				_tags
			),
			rce('div', {'className': 'side-footer'})
		)
	)

}

 module.exports = Side