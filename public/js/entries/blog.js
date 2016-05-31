'use strict'
const React = require('react')
const ReactDOM = require('react-dom')
const rce = React.createElement.bind()
// let MyButtonController = require('../components/MyButtonController.js')
let TotalController = require('../components/TotalController.js')
let total = React.createClass({display: 'total',
	render: function(){
		return (
			rce(TotalController, null)
		)
	}
})

ReactDOM.render(rce(total, null), document.getElementById('main')) 
