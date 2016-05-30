let React = require('react')
const rce = React.createElement.bind()
let Total = require('./Total.js')
let TotalActions = require('../actions/TotalActions.js')
let TotalStore = require('../stores/TotalStore.js')

let TotalController = React.createClass({displayName: 'TotalController',
	getInitialState: function(){
		return {
			myName: TotalStore.getMyName(),
			SelectTag: TotalStore.getSelectTag(),
			select: TotalStore.getSelect(),
			isSideShow: TotalStore.getIsSideShow(),
			shouldRefreshBlogList: TotalStore.getShouldRefreshBlogList(),
			styleDisplayNone: TotalStore.getStyleDisplayNone(),
			display: TotalStore.getDisplay() //0 blog list  1 secret  2 blog
		}
	},
	_onChange: function(){
		this.setState({
			isSideShow: TotalStore.getIsSideShow(),
			shouldRefreshBlogList: TotalStore.getShouldRefreshBlogList(),
			styleDisplayNone: TotalStore.getStyleDisplayNone(),
			display: TotalStore.getDisplay(),
			select: TotalStore.getSelect()
		})
	},
	componentDidMount: function(){
		TotalStore.addChangeListener(this._onChange)
	},
	componentWillUnmount: function(){
		TotalStore.removeChangeListener(this._onChange)
	},
	handleSelect: function(e, select = 'Blog'){
		TotalActions.handleSelect(e, select)
		TotalActions.handleChangeDisplay.call(null, 'blogList')
		// this.handleChangeDisplay.call(null, 'blogList')
		// if(!!e){
		// 	this.setState({
		// 		select: e.target.innerHTML
		// 	})
		// 	changeHash('#!/list/' + e.target.innerHTML)
		// }
		// else{
		// 	this.setState({
		// 		select: select
		// 	})
		// }
	},
	handleChangeDisplay: function(e, nextDisplay = null){
		TotalActions.handleChangeDisplay(e, nextDisplay)
		// if(e === 'secret'){
		// 	nextDisplay = this.state.display === 0 ? 1 : 0
		// }
		// else if (e === 'showBlog'){
		// 	nextDisplay = 2
		// }
		// else if (e === 'blogList') {
		// 	nextDisplay = 0
		// 	if(this.state.display != nextDisplay){
		// 		this.setState({
		// 			shouldRefreshBlogList: true
		// 		})
		// 	}
		// }
		// this.setState({
		// 	display: nextDisplay
		// })
	},
	blogListDidRefreshed: function(){
		TotalActions.blogListDidRefreshed()
		// this.setState({
		// 	shouldRefreshBlogList: false
		// })
	},
	handleMouseOver: function(e){
		TotalActions.handleMouseOver(e)
		// let styleDisplayNone = this.state.styleDisplayNone
		// let currentTag = e.target.parentNode.firstChild.innerHTML
		// styleDisplayNone[currentTag] = 1
		// this.setState({'styleDisplayNone': styleDisplayNone})
	},
	handleMouseLeave: function(e){
		TotalActions.handleMouseLeave(e)
		// let styleDisplayNone = this.state.styleDisplayNone
		// let currentTag = e.target.parentNode.firstChild.innerHTML
		// styleDisplayNone[currentTag] = 0
		// this.setState({'styleDisplayNone': styleDisplayNone})
	},
	showSide: function(){
		TotalActions.showSide()
		// if(this.state.isSideShow){
		// 	document.getElementById('site-side').style.left = '-50%'
		// 	document.getElementById('site-side').style.boxShadow = ''
		// 	document.getElementById('blogContent').style.left = 0
		// 	document.getElementById('site-hide').style.display = 'none'
		// 	this.setState({isSideShow: false})
		// }
		// else{
		// 	document.getElementById('site-side').style.left = 0 
		// 	document.getElementById('site-side').style.boxShadow = '2px 0 2px #aaaaaa'
		// 	document.getElementById('blogContent').style.left = '50%'
		// 	document.getElementById('site-hide').style.display = 'block'
		// 	this.setState({isSideShow: true})
		// }
	},
	render: function(){
		return Total({
			myName: this.state.myName,
			select: this.state.select,
			styleDisplayNone: this.state.styleDisplayNone,
			display: this.state.display,
			shouldRefreshBlogList: this.state.shouldRefreshBlogList,
			SelectTag: this.state.SelectTag,
			
			handleSelect: this.handleSelect,
			showSide: this.showSide,
			handleChangeDisplay: this.handleChangeDisplay,
			blogListDidRefreshed: this.blogListDidRefreshed,
			handleMouseOver: this.handleMouseOver,
			handleMouseLeave: this.handleMouseLeave,

		})
	}
})

module.exports = TotalController
