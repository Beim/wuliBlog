'use strict'
const React = require('react')
const ReactDOM = require('react-dom')
var rce = React.createElement.bind()
const myName = '北冥有鱼吃'
// ReactDOM.initializeTouchEvents(true)
let SiteHeader = require('../components/SiteHeader.js')
let Fullstrip = require('../components/Fullstrip.js')

var total = React.createClass({display:'total',

	render : function(){
		return (
			rce('div',{'className': 'home'},
				SiteHeader(),
				rce('div', {'className': 'homepage'},
					rce('div', {'className': 'homepage-null'}),
					rce('div', {'className': 'homepage-content'}, 
						rce('div', {'className': 'homepage-main'}, myName),
						rce('div', {'className': 'homepage-sub'}, 'powered by beim')
					)
				)
			)
		)
	}
})

ReactDOM.render(rce(total,null), document.getElementById('main'))
