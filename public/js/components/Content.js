let React = require('react')
const rce = React.createElement.bind()

let Content = (props) => {
	let showData = props.showData
	let currentNum = props.currentNum
	let comments = props.comments
	let display = props.display
	let handlePrev = props.handlePrev
	let totalNum = props.totalNum
	let handleNext = props.handleNext
	let toAbout = props.toAbout
	let blog = props.blog
	let nickname = props.nickname
	let onNicknameChange = props.onNicknameChange
	let email  = props.email
	let onEmailChange = props.onEmailChange
	let handlePostComment = props.handlePostComment
	let _this = props._this
	let zan = props.zan

	let data = showData
	let wraps = data.map(function(value, index){
		if(value){
			let author = value.author
			if(author.indexOf(':') != -1){
				author = author.substring(0, author.indexOf(':'))
			}
			value.date = value.date.substring(0, 10)
			return rce('div', {'key' : 'wraps' + index, 'className': 'post-wrap', 'style': {'display': (index<5*currentNum && index>=5*(currentNum-1)) ? 'block' : 'none' }},
				rce('h1', {'className': 'post-name'},
					rce('a', {'href': '#!/article/'+value._id, /*'onClick': handleShowBlog,*/ 'data-myid': value._id}, value.title)
				),
				rce('div', {'className': 'post-date'}, '#' + value.date + ' By: ' + author),
				rce('div', {'className': 'post-excerpt'}, value.excerpt),
				rce('div', {'className': 'post-tags'},
					rce('span', {'className': 'post-tag'}, 'tags:'),
					value.tags.map(function(value1, index1){
						return rce('span', {'key': 'tags' + Date() + index1, 'className': 'post-tag'},
							// rce('a', {'href': '#'}, value1)
							value1
						)
					})
				)
			)
		}
	})
	// }.bind(_this))
	let style1 = {'color': 'white', 'border': '1px solid white'}
	let style2 = {}
	let styleHasComment = {'display': 'none'}
	let styleNoComment = {}
	// let comments = comments
	let aBlogFooterComment = comments.map((value, index) => {
		let date = value.date.substring(2, 10)

		return rce('div', {'key': 'comment' + index, 'className': 'aBlog-footer'},
			rce('div', {'className': 'aBlog-footer-comment'},
				rce('div', {'className': 'aBlog-footer-comment-info'},
					rce('div', {'className': 'aBlog-footer-comment-info-floor'},
						rce('div', null, value.floor)
					),
					rce('div', {'className': 'aBlog-footer-comment-info-name'},
						rce('div', null, value.name)
					),
					rce('div', {'className': 'aBlog-footer-comment-info-name'},
						rce('div', null, date)
					)
				),
				rce('div', {'className': 'aBlog-footer-comment-content'}, 'content')
			)
		)
	})

	return (
		rce('div', {'style': {'display': display === 0 || display === 2 ? 'block' : 'none'}}, 
			rce('div', {'className': 'mainContainer-content', 'style': {'display': display === 0 ? 'block' : 'none'}},
				wraps,
				rce('div', {'className': 'pagination'},
					rce('div', {'className': 'previous', 'style': currentNum <=1 ? style1 : style2, 'onClick': handlePrev}, '← Newer Posts'),
					rce('span', {'className': 'page_number'}, `Page: ${currentNum} of ${totalNum}`),
					rce('div', {'className': 'next', 'style': currentNum >= totalNum ? style1 : style2, 'onClick': handleNext}, 'Older Posts →')
				),
				rce('div', {'className': 'pagination about-me'},
					rce('div', {'onClick': toAbout}, 'About Me')
				)
			),
			rce('div', {'className': 'mainContenter-content', 'style': {'display': display === 2 ? 'block' : 'none'}},
				rce('div', {'className': 'aBlog', 'id': 'blog'},
					rce('h2', null, blog.title),
					rce('br', null),
					rce('div', {'className': 'blog-article', 'id': 'blog-article'}),
					rce('br', null),
					rce('div', {'className': 'blog-info'},
						rce('div', {'className': 'blog-info-zan', 'onClick': zan, 'onTouchStart': zan}, '有用: ' + blog.zan),
						rce('div', {'className': 'blog-info-tags'}, '标签: ' + blog.tags),
						rce('div', {'className': 'blog-info-date'}, blog.date   )
					)
				),
				rce('div', {'className': 'aBlog-footer'},
					// rce('div', null, 'footer')
					rce('div', {'className': 'aBlog-footer-label'}, 'Comment : '),
					rce('div', {'className': 'aBlog-footer-edit'},
						rce('p' ,{'contentEditable': 'true', 'id': 'aBlog-footer-edit-p'})
					),
					rce('div', {'className': 'aBlog-footer-info-post-wraper'},
						rce('div', {'className': 'aBlog-footer-info'},
							rce('input', {'type': 'text', 'placeholder': '  nickname *', 'value': nickname, 'onChange': onNicknameChange}),
							rce('input', {'type': 'email', 'placeholder': '  Email ', 'value': email, 'onChange': onEmailChange})
						),
						rce('div', {'className': 'aBlog-footer-post', 'onClick': handlePostComment},
							rce('div', null, 'post')
						)
					)
				),
				rce('div', {'className': 'aBlog-footer', 'style': comments.length == 0 ? styleNoComment : styleHasComment},
					rce('div', {'className': 'no-comment'}, 'no comment~')
				),
				aBlogFooterComment,
				rce('div',{'className': 'aBlog-goTop', 'id': 'aBlog-goTop'},
					rce('a', {'href': 'javascript: ;', })
				)

			)
		)
	)
}

module.exports = Content
