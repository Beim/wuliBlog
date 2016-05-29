let React = require('react')
const rce = React.createElement.bind()
let MyButton = require('./MyButton.js')
let ButtonActions = require('../actions/ButtonActions.js')
let NumStore = require('../stores/NumStore.js')

let MyButtonController = React.createClass({display: 'MyButtonController',
	getInitialState: function() {
		return{
			num: NumStore.getNum()
		}
	},
	componentDidMount: function() {
		NumStore.addChangeListener(this._onChange)
	},
	componentWillUnmount: function() {
		NumStore.removeChangeListener(this._onChange)
	},
	_onChange: function() {
		this.setState({
			num: NumStore.getNum()
		})
	},
	addNum: function(){
		ButtonActions.addNum()
	},
	render: function() {
		return MyButton({
			num: this.state.num,
			onClick: this.addNum
		})
	}
})

module.exports = MyButtonController
