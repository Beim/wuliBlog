'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var rce = React.createElement.bind();
// var socket = io.connect('/')
React.initializeTouchEvents(true);
var myName = '北冥有鱼吃';
var SelectTag = {
	front: ['html', 'css', 'javascript', 'react', 'f-others'],
	back: ['node', 'koa', 'es6', 'b-others'],
	daily: ['d-nice', 'd-bad', 'between', 'd-others'],
	movie: ['recommend', 'm-nice', 'intend', 'm-bad', 'm-others'],
	book: ['novel', 'bk-others']
};

var getDate = function getDate() {
	var _date = new Date();
	var y = _date.getFullYear();
	var m = _date.getMonth() + 1 + '';
	m = m.length == 1 ? '0' + m : m;
	var d = _date.getDate() + '';
	d = d.length == 1 ? '0' + d : d;
	return _date = y + '-' + m + '-' + d;
};

var simulateData = [];
for (var i = 0; i < 1; i++) {
	simulateData.push({
		_id: '123',
		name: 'Anouncing Event Calendar App',
		author: 'beim',
		date: '2016 05 12',
		excerpt: 'I’ve been building side projects since the day that I began programming. However, only more recently have I taken my side projects seriously and tried to build something useful, something that people will actually use. Horu You may or may not know that just under 6 months ago I released' + '...',
		tags: ['html', 'css', 'javascript']
	});
}

var westEgg = React.createClass({
	displayName: 'westEgg',
	display: 'westEgg',
	getInitialState: function getInitialState() {
		return this.init();
	},
	init: function init() {
		var stateTags = SelectTag;
		var stateTag = [];
		var chooseTag = {};
		for (var _i in SelectTag) {
			if (SelectTag[_i]) {
				stateTag = stateTag.concat(SelectTag[_i]);
			}
		}
		for (var _i2 in stateTag) {
			chooseTag[stateTag[_i2]] = 0;
		}
		return {
			titleValue: '',
			authorValue: '',
			stateTags: stateTags,
			chooseTag: chooseTag
		};
	},
	handleTitleChange: function handleTitleChange(e) {
		this.setState({
			titleValue: e.target.value
		});
	},
	handleAuthorChange: function handleAuthorChange(e) {
		this.setState({
			authorValue: e.target.value
		});
	},
	handleAddImg: function handleAddImg() {
		$('#fileInput').click();
	},
	onAddImg: function onAddImg(e) {
		var fileObj = document.getElementById('fileInput').files[0];
		var form = new FormData();
		form.append('file', fileObj);
		form.append('hello', 'world');

		var xhr = new XMLHttpRequest();
		xhr.open('post', 'postMethod/images', true);
		// xhr.setRequestHeader('Content-type', 'multipart/form-data')
		xhr.responstType = 'text';
		xhr.onload = function (e) {
			var url = this.response;
			var p = document.getElementById('westEgg-body-edit-p');
			var div = document.createElement('div');
			var img = document.createElement('img');
			img.src = url;
			div.appendChild(img);
			p.appendChild(div);
			p.lastChild.focus();
		};
		xhr.send(form);
	},
	handleSelectTag: function handleSelectTag(e) {
		var tagName = e.target.innerHTML;
		var chooseTag = this.state.chooseTag;
		if (chooseTag[tagName] != undefined) {
			chooseTag[tagName] = chooseTag[tagName] === 0 ? 1 : 0;
		}
		this.setState({ chooseTag: chooseTag });
	},
	onPost: function onPost() {
		var _this = this;
		var title = this.state.titleValue;
		var author = this.state.authorValue;
		// let _date = new Date()
		// let m = (_date.getMonth() + "").length == 1 ? "0" + _date.getMonth() : _date.getMonth()
		// let d = (_date.getDate() + "").length == 1 ? "0" + _date.getDate() : _date.getDate()
		// let date = _date.getFullYear() + "-" + m + "-" + d
		var article = document.getElementById('westEgg-body-edit-p').innerHTML;
		var index = article.indexOf('<div>');
		if (index > 0) {
			var articleArray = [].concat(_toConsumableArray(article));
			articleArray.splice(index, 0, '</div>');
			article = articleArray.join('');
			article = '<div>' + article;
		}
		var excerpt = article.substring(5, article.indexOf('</div>'));
		if (excerpt.length > 250) {
			excerpt = excerpt.substring(0, 250) + '...';
		}
		var tags = this.state.chooseTag;
		var data = {
			'title': title,
			'author': author,
			'article': article,
			'excerpt': excerpt,
			'tags': tags
		};
		// data = JSON.parse(data)
		data = JSON.stringify(data);
		var xhr = new XMLHttpRequest();
		xhr.open('POST', '/postMethod/newBlog', true);
		xhr.responseType = 'json';
		xhr.setRequestHeader('Content-Type', 'application/x-javascript; charset=UTF-8');
		xhr.onload = function (e) {
			if (this.response.ok == -2) {
				alert(' 没那麼简单 就能找到 聊得来的伴');
			} else if (this.response.ok == 0) {
				alert('sorry ~~~post failed');
			} else if (this.response.ok == 1) {
				_this.props.handleChangeDisplay.call(null, 'blogList');
				_this.setState(_this.init());
				document.getElementById('westEgg-body-edit-p').innerHTML = '';
			}
		};
		xhr.send(data);
		// $.post('/postMethod/newBlog', data, function(data, status){
		// 	console.info('helo wworld')
		// })
	},
	render: function render() {
		var style1 = { 'color': '#444', 'border': '1px solid #444' };
		// let style1 = {'color': '#3E606F', 'border': '1px solid #3E606F'}
		var style2 = {};
		var stateTags = this.state.stateTags;
		var handleSelectTag = this.handleSelectTag;
		var chooseTag = this.state.chooseTag;
		var tagWrap = [];

		var _loop = function _loop(_i3) {
			var tagName = _i3;
			var tagDetail = stateTags[_i3];
			var _tags = [];
			tagDetail.forEach(function (elem) {
				_tags.push(rce('div', { 'key': '_tagspush' + elem + _i3, 'onClick': handleSelectTag, 'style': chooseTag[elem] === 0 ? style2 : style1 }, elem));
			});
			tagWrap.push(rce('div', { 'key': 'tagWrap-div' + _i3, 'className': 'westEgg-sort-tag-div' }, rce('div', { 'key': 'tagWrap-div1' + _i3, 'className': 'westEgg-sort-tag-div1' }, rce('b', null, _i3)), rce('div', { 'key': 'tagWrap-div2' + _i3, 'className': 'westEgg-sort-tag-div2' }, _tags)));
		};

		for (var _i3 in stateTags) {
			_loop(_i3);
		}
		return rce('div', { 'className': 'mainContainer-content', 'style': { 'display': this.props.display === 1 ? 'block' : 'none' } }, rce('div', { 'className': 'westEgg-title' }, rce('input', { 'placeholder': 'Please fill the title', 'value': this.state.titleValue, 'onChange': this.handleTitleChange })), rce('div', { 'className': 'westEgg-body' }, rce('div', { 'className': 'westEgg-body-img' }, rce('div', { 'onClick': this.handleAddImg, 'type': 'file' }, 'Image'), rce('input', { 'type': 'file', 'id': 'fileInput', 'accept': 'image/gif, image/jpeg, image/x-png', 'style': { 'display': 'none' }, 'onChange': this.onAddImg })), rce('div', { 'className': 'westEgg-body-edit' }, rce('p', { 'contentEditable': 'true', 'id': 'westEgg-body-edit-p' }))), rce('div', { 'className': 'westEgg-sort' }, rce('div', { 'className': 'westEgg-sort-tag' }, tagWrap)), rce('div', { 'className': 'westEgg-post' }, rce('div', { 'className': 'westEgg-post-author' }, rce('input', { 'placeholder': 'author', 'value': this.state.authorValue, 'onChange': this.handleAuthorChange })), rce('div', { 'className': 'westEgg-post-btn', 'onClick': this.onPost }, 'button')));
	}
});

var content = React.createClass({
	displayName: 'content',
	display: 'content',
	getInitialState: function getInitialState() {
		return {
			data: [],
			showData: [],
			currentNum: 1,
			totalNum: 1,
			blog: '',
			hasZaned: false,
			onePageNum: 5,
			nickname: '',
			email: '',
			comments: []
		};
	},
	componentDidMount: function componentDidMount() {
		this.getBlogList();
	},
	getBlogList: function getBlogList() {
		var _this = this;
		var xhr = new XMLHttpRequest();
		var onePageNum = this.state.onePageNum;
		xhr.open('GET', '/getMethod/blogList', true);
		xhr.responseType = 'json';
		xhr.onload = function (e) {
			if (this.response.ok == 1) {
				simulateData = this.response.data;
				_this.setState({
					data: simulateData,
					showData: simulateData,
					totalNum: Math.ceil(simulateData.length / onePageNum)
				});
			}
		};
		xhr.send();
	},
	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		var simuData = [];
		this.state.data.forEach(function (value) {
			if (nextProps.select === 'Blog') {
				simuData.push(value);
			} else {
				for (var _i4 = 0; _i4 < value.tags.length; _i4++) {
					if (SelectTag[nextProps.select].indexOf(value.tags[_i4]) !== -1) {
						simuData.push(value);
						break;
					}
				}
			}
		});
		var onePageNum = this.state.onePageNum;
		this.setState({
			showData: simuData,
			currentNum: Math.ceil(simuData.length / onePageNum) ? 1 : 0,
			totalNum: Math.ceil(simuData.length / onePageNum)
		});
		if (nextProps.shouldRefreshBlogList) {
			this.getBlogList();
			this.props.blogListDidRefreshed();
		}
	},
	shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
		if (this.state.blog !== nextState.blog) {
			this.showBlogArticle(nextState);
		}
		return true;
	},
	// componentWillUpdate: function(nextProps, nextState){
	// 	console.info('will')
	// },
	componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
		var _this2 = this;

		if (this.state.comments.length !== prevState.comments.length) {
			(function () {
				var divs = document.getElementsByClassName('aBlog-footer-comment-content');
				var comments = Object.assign([], _this2.state.comments);
				comments.forEach(function (value, index) {
					divs[index].innerHTML = value.content;
				});
			})();
		}
	},
	showBlogArticle: function showBlogArticle(nextState) {
		this.setState({ hasZaned: false });
		document.getElementById('blog-article').innerHTML = nextState.blog.article;
	},
	handlePrev: function handlePrev() {
		if (this.state.currentNum > 1) {
			this.setState({
				currentNum: this.state.currentNum - 1
			});
			$('html, body').animate({ scrollTop: '0px' }, 500);
		}
	},
	handleNext: function handleNext() {
		if (this.state.currentNum < this.state.totalNum) {
			this.setState({
				currentNum: this.state.currentNum + 1
			});
			$('html, body').animate({ scrollTop: '0px' }, 500);
		}
	},
	handleShowBlog: function handleShowBlog(e) {
		var _this = this;
		var id = e.target.getAttribute('data-myid');
		id = JSON.stringify({ _id: id });
		this.props.handleChangeDisplay.call(null, 'showBlog');
		var xhr = new XMLHttpRequest();
		xhr.open('POST', '/postMethod/blog', true);
		xhr.setRequestHeader('Content-Type', 'application/x-javascript; charset=UTF-8');
		xhr.responseType = 'json';
		xhr.onload = function (e) {
			if (this.response.ok == 1) {
				var blog = this.response.data;
				blog.date = blog.date.substring(0, 10);
				_this.setState({
					blog: blog,
					comments: blog.comments
				});
			}
		};
		xhr.send(id);
	},
	zan: function zan() {
		var _this3 = this;

		if (!this.state.hasZaned) {
			(function () {
				var _this = _this3;
				var id = JSON.stringify({ _id: _this3.state.blog._id });
				var xhr = new XMLHttpRequest();
				xhr.open('POST', 'postMethod/zan', true);
				xhr.setRequestHeader('Content-Type', 'application/x-javascript; charset=UTF-8');
				xhr.responseType = 'json';
				xhr.onload = function (e) {
					if (this.response.ok == 1) {
						// console.info('zan success')
						var blog = _this.state.blog;
						blog.zan += 1;
						_this.setState({ blog: blog, hasZaned: true });
					}
				};
				xhr.send(id);
			})();
		}
	},
	onNicknameChange: function onNicknameChange(e) {
		this.setState({ nickname: e.target.value });
	},
	onEmailChange: function onEmailChange(e) {
		this.setState({ email: e.target.value });
	},
	handlePostComment: function handlePostComment() {
		var _this4 = this;

		if (this.state.nickname == '' || this.state.nickname == '昵称不能为空*') {
			this.setState({ nickname: '昵称不能为空*' });
		} else {
			(function () {
				var _this = _this4;
				var content = document.getElementById('aBlog-footer-edit-p').innerHTML;
				var index = content.indexOf('<div>');
				if (index > 0) {
					var contentArray = [].concat(_toConsumableArray(content));
					contentArray.splice(index, 0, '</div>');
					content = contentArray.join('');
					content = '<div>' + content;
				} else if (index == -1) {
					content = '<div>' + content + '</div>';
				}
				var name = _this4.state.nickname;
				var email = _this4.state.email;
				var _date = getDate();
				var predata = {
					_id: _this4.state.blog._id,
					author: _this4.state.blog.author,
					content: content,
					name: name,
					email: email,
					date: _date
				};
				var data = JSON.stringify(predata);
				var xhr = new XMLHttpRequest();
				xhr.open('POST', '/postMethod/comment', true);
				xhr.setRequestHeader('Content-Type', 'application/x-javascript; charset=UTF-8');
				xhr.responseType = 'json';
				xhr.onload = function (e) {
					if (this.response.ok == 1) {
						var comments = Object.assign([], _this.state.comments);
						predata.floor = comments.length + 1;
						comments.push(predata);
						_this.setState({
							comments: comments
						});
						document.getElementById('aBlog-footer-edit-p').innerHTML = '';
					} else if (this.response.ok == 2) {
						var blog = Object.assign({}, _this.state.blog);
						predata.content = '</br><div>--------' + predata.author + ' 修改于 ' + predata.date + '--------</div></br>' + predata.content;
						blog.article += predata.content;
						_this.setState({
							blog: blog
						});
					} else {
						alert('sorrty~');
					}
				};
			})();
		}
		xhr.send(data);
	},
	toAbout: function toAbout() {
		window.location = 'about.html';
	},
	render: function render() {
		var data = this.state.showData;
		var wraps = data.map(function (value, index) {
			if (value) {
				var author = value.author;
				if (author.indexOf(':') != -1) {
					author = author.substring(0, author.indexOf(':'));
				}
				value.date = value.date.substring(0, 10);
				return rce('div', { 'key': 'wraps' + index, 'className': 'post-wrap', 'style': { 'display': index < 5 * this.state.currentNum && index >= 5 * (this.state.currentNum - 1) ? 'block' : 'none' } }, rce('h1', { 'className': 'post-name' }, rce('a', { 'href': '#', 'onClick': this.handleShowBlog, 'data-myid': value._id }, value.title)), rce('div', { 'className': 'post-date' }, '#' + value.date + ' By: ' + author), rce('div', { 'className': 'post-excerpt' }, rce('p', null, value.excerpt)), rce('div', { 'className': 'post-tags' }, rce('span', { 'className': 'post-tag' }, 'tags:'), value.tags.map(function (value1, index1) {
					return rce('span', { 'key': 'tags' + Date() + index1, 'className': 'post-tag' }, rce('a', { 'href': '#' }, value1));
				})));
			}
		}.bind(this));
		var style1 = { 'color': 'white', 'border': '1px solid white' };
		var style2 = {};
		var styleHasComment = { 'display': 'none' };
		var styleNoComment = {};
		var comments = this.state.comments;
		var aBlogFooterComment = comments.map(function (value, index) {
			var date = value.date.substring(2, 10);

			return rce('div', { 'key': 'comment' + index, 'className': 'aBlog-footer' }, rce('div', { 'className': 'aBlog-footer-comment' }, rce('div', { 'className': 'aBlog-footer-comment-info' }, rce('div', { 'className': 'aBlog-footer-comment-info-floor' }, rce('div', null, value.floor)), rce('div', { 'className': 'aBlog-footer-comment-info-name' }, rce('div', null, value.name)), rce('div', { 'className': 'aBlog-footer-comment-info-name' }, rce('div', null, date))), rce('div', { 'className': 'aBlog-footer-comment-content' }, 'content')));
		});
		return rce('div', { 'style': { 'display': this.props.display === 0 || this.props.display === 2 ? 'block' : 'none' } }, rce('div', { 'className': 'mainContainer-content', 'style': { 'display': this.props.display === 0 ? 'block' : 'none' } }, wraps, rce('div', { 'className': 'pagination' }, rce('div', { 'className': 'previous', 'style': this.state.currentNum <= 1 ? style1 : style2, 'onClick': this.handlePrev }, '← Newer Posts'), rce('span', { 'className': 'page_number' }, 'Page: ' + this.state.currentNum + ' of ' + this.state.totalNum), rce('div', { 'className': 'next', 'style': this.state.currentNum >= this.state.totalNum ? style1 : style2, 'onClick': this.handleNext }, 'Older Posts →')), rce('div', { 'className': 'pagination about-me' }, rce('div', { 'onClick': this.toAbout }, 'About Me'))), rce('div', { 'className': 'mainContenter-content', 'style': { 'display': this.props.display === 2 ? 'block' : 'none' } }, rce('div', { 'className': 'aBlog', 'id': 'blog' }, rce('h2', null, this.state.blog.title), rce('br', null), rce('div', { 'className': 'blog-article', 'id': 'blog-article' }), rce('br', null), rce('div', { 'className': 'blog-info' }, rce('div', { 'className': 'blog-info-zan', 'onClick': this.zan, 'onTouchStart': this.zan }, '有用: ' + this.state.blog.zan), rce('div', { 'className': 'blog-info-tags' }, '标签: ' + this.state.blog.tags), rce('div', { 'className': 'blog-info-date' }, this.state.blog.date))), rce('div', { 'className': 'aBlog-footer' },
		// rce('div', null, 'footer')
		rce('div', { 'className': 'aBlog-footer-label' }, 'Comment : '), rce('div', { 'className': 'aBlog-footer-edit' }, rce('p', { 'contentEditable': 'true', 'id': 'aBlog-footer-edit-p' })), rce('div', { 'className': 'aBlog-footer-info-post-wraper' }, rce('div', { 'className': 'aBlog-footer-info' }, rce('input', { 'type': 'text', 'placeholder': '  nickname *', 'value': this.state.nickname, 'onChange': this.onNicknameChange }), rce('input', { 'type': 'email', 'placeholder': '  Email ', 'value': this.state.email, 'onChange': this.onEmailChange })), rce('div', { 'className': 'aBlog-footer-post', 'onClick': this.handlePostComment }, rce('div', null, 'post')))), rce('div', { 'className': 'aBlog-footer', 'style': this.state.comments.length == 0 ? styleNoComment : styleHasComment }, rce('div', { 'className': 'no-comment' }, 'no comment~')), aBlogFooterComment));
	}
});

var total = React.createClass({
	displayName: 'total',
	display: 'total',
	getInitialState: function getInitialState() {
		return {
			select: 'Blog',
			shouldRefreshBlogList: false,
			display: 0 //0 blog list  1 secret  2 blog
		};
	},
	handleSelect: function handleSelect(e) {
		this.handleChangeDisplay.call(null, 'blogList');
		this.setState({
			select: e.target.innerHTML
		});
	},
	handleChangeDisplay: function handleChangeDisplay(e) {
		var nextDisplay = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

		if (e === 'secret') {
			nextDisplay = this.state.display === 0 ? 1 : 0;
		} else if (e === 'showBlog') {
			nextDisplay = 2;
		} else if (e === 'blogList') {
			nextDisplay = 0;
			if (this.state.display != nextDisplay) {
				this.setState({
					shouldRefreshBlogList: true
				});
			}
		}
		this.setState({
			display: nextDisplay
		});
	},
	blogListDidRefreshed: function blogListDidRefreshed() {
		this.setState({
			shouldRefreshBlogList: false
		});
	},
	render: function render() {
		var _tags = [];
		for (var _i5 in SelectTag) {
			_tags.push(rce('div', { 'key': '_tags' + _i5, 'className': 'fullstrip-tag', 'onClick': this.handleSelect }, _i5));
		}
		return rce('div', { 'className': 'blog' }, rce('div', { 'className': 'site-header' }, rce('a', { 'className': 'site-title', 'href': 'https://github.com/Beim' }, myName), rce('nav', { 'className': 'site-nav' }, rce('a', { 'className': 'site-link', 'href': '#', 'style': { 'color': 'white' }, 'onClick': this.handleChangeDisplay.bind(null, 'secret') }, 'secret'), rce('a', { 'className': 'site-link', 'href': '../index.html' }, 'HOME'), rce('a', { 'className': 'site-link', 'href': '../about.html' }, 'ABOUT'), rce('a', { 'className': 'site-link', 'href': '../blog.html' }, 'BLOG'), rce('a', { 'className': 'site-link', 'href': '#' }, 'TieBa'), rce('a', { 'className': 'site-link', 'href': '#' }, 'CharRoom'), rce('a', { 'className': 'site-link', 'href': '#' }, 'MORE'))), rce('div', { 'className': 'fullstrip' }, rce('div', { 'className': 'fullstrip-container' }, rce('div', { 'className': 'fullstrip-title' }, rce('div', { 'className': 'fullstrip-super-tag', 'onClick': this.handleSelect }, 'Blog'), _tags))), rce('div', { 'className': 'mainContainer' },
		// rce('div', {'className': 'mainContainer-content'},
		rce(content, {
			'select': this.state.select,
			'display': this.state.display,
			'handleChangeDisplay': this.handleChangeDisplay,
			'shouldRefreshBlogList': this.state.shouldRefreshBlogList,
			'blogListDidRefreshed': this.blogListDidRefreshed
		}), rce(westEgg, { 'display': this.state.display, 'handleChangeDisplay': this.handleChangeDisplay })
		// )
		));
	}
});

React.render(rce(total, null), document.body);