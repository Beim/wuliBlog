let React = require('react')
const rce = React.createElement.bind()

let Side = require('./Side.js')
let SideActions = require('../actions/SideActions.js')
let SideStore = require('../stores/SideStore.js')

let SideController = React.createClass({display: 'SideController',
	getInitialState: function(){
		return{
			'shouldSubtagShow': SideStore.getShouldSubtagShow()
		}
	},
	_onChange: function(){
		this.setState({
			shouldSubtagShow: SideStore.getShouldSubtagShow()
		})
	},
	componentDidMount: function(){
		SideStore.addChangeListener(this._onChange)
	},
	componentWillUnmount: function(){
		SideStore.removeChangeListener(this._onChange)
	},
	handleHeaderClick: function(){
		SideActions.handleHeaderClick()
	},
	handleAllBlogClick: function(){
		SideActions.handleAllBlogClick()
		document.getElementById('allBlog').click()
		// this.setState({'shouldSubtagShow': 'blog'})
	},
	handleSelectMainTag: function(e){
		this.props.handleSelect(e)
		SideActions.handleSelectMainTag(e)
	},
	render: function(){
		return Side({
			handleSelect: this.props.handleSelect,
			handleSelectMainTag: this.handleSelectMainTag,
			shouldSubtagShow: this.state.shouldSubtagShow,
			handleHeaderClick: this.handleHeaderClick,
			handleAllBlogClick: this.handleAllBlogClick,
			SelectTag: this.props.SelectTag,
			myName: this.props.myName
		})
	}
})

module.exports = SideController