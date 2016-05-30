let React = require('react')
const rce = React.createElement.bind()

let WestEgg = (props) => {
	let stateTags = props.stateTags
	let handleSelectTag = props.handleSelectTag
	let chooseTag = props.chooseTag
	let display = props.display
	let titleValue = props.titleValue
	let handleTitleChange = props.handleTitleChange
	let handleAddImg = props.handleAddImg
	let handleAddPre = props.handleAddPre
	let handleAddH2 = props.handleAddH2
	let authorValue = props.authorValue
	let onPost = props.onPost
	let onAddImg = props.onAddImg
	let handleAuthorChange = props.handleAuthorChange

	let style1 = {'color': '#444', 'border': '1px solid #444'}
	let style2 = {}
	let tagWrap = []
	for(let i in stateTags){
		let tagName = i
		let tagDetail = stateTags[i]
		let _tags = []
		tagDetail.forEach(function (elem){
			_tags.push(
				rce('div', {'key': '_tagspush' + elem + i, 'onClick': handleSelectTag, 'style': chooseTag[elem] === 0 ? style2 : style1}, elem)
			)
		})
		tagWrap.push(
			rce('div', {'key': 'tagWrap-div' + i, 'className': 'westEgg-sort-tag-div'},
				rce('div', {'key': 'tagWrap-div1' + i, 'className': 'westEgg-sort-tag-div1'}, 
					rce('b', null, i)
				),
				rce('div', {'key': 'tagWrap-div2' + i, 'className': 'westEgg-sort-tag-div2'}, 
					_tags
				)
			)
		)
	}

	return(
		rce('div', {'className': 'mainContainer-content', 'style': {'display': display === 1 ? 'block' : 'none'}},
			rce('div', {'className': 'westEgg-title'},
				rce('input', {'placeholder': 'Please fill the title', 'value': titleValue, 'onChange': handleTitleChange})
			),
			rce('div', {'className': 'westEgg-body'},
				rce('div', {'className': 'westEgg-body-img'},
					rce('div', {'onClick': handleAddImg, 'type': 'file'}, 'Image'),
					rce('input', {'type': 'file', 'id': 'fileInput', 'accept': 'image/gif, image/jpeg, image/x-png', 'style': {'display': 'none'}, 'onChange': onAddImg}),
					rce('div', {'onClick': handleAddPre }, 'AddPre'),
					rce('div', {'onClick': handleAddH2 }, 'AddH2')
				),
				rce('div', {'className': 'westEgg-body-edit'},
					rce('p' ,{'contentEditable': 'true', 'id': 'westEgg-body-edit-p'})
				)
			),
			rce('div', {'className': 'westEgg-sort'},
				rce('div', {'className': 'westEgg-sort-tag'}, 
					tagWrap
				)
			),
			rce('div', {'className': 'westEgg-post'},
				rce('div', {'className': 'westEgg-post-author'}, 
					rce('input', {'placeholder': 'author', 'value': authorValue, 'onChange': handleAuthorChange})
				),
				rce('div', {'className': 'westEgg-post-btn', 'onClick': onPost},
					'button'
				)
			)
		)
	)
}

module.exports = WestEgg
