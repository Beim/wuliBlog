const React = require('react')
const ReactDOM = require('react-dom')
const rce = React.createElement.bind()
let MyButtonController = require('../components/MyButtonController.js')
let total = React.createClass({display: 'total',
	render: function(){
		return (
			rce(MyButtonController, null)
		)
	}
})

ReactDOM.render(rce(total, null), document.getElementById('main')) 
