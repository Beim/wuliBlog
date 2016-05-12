'use strict'
var rce = React.createElement.bind()
var socket = io.connect('/')
React.initializeTouchEvents(true)


var total = React.createClass({display:'total',

	render : function(){
		return (
			rce('div',null,'welcome')
		)
	}
})

React.render(rce(total,null), document.body)

