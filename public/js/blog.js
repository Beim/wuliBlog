'use strict'
var rce = React.createElement.bind()
var socket = io.connect('/')
const myName = '北冥有鱼吃'
React.initializeTouchEvents(true)

var total = React.createClass({display: 'total',
	render : function(){
		return(
			rce('div', null, 'blog')
		)
	}
})

React.render(rce(total,null), document.body)
