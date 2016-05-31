'use strict'
const React = require('react')
const ReactDOM = require('react-dom')
var rce = React.createElement.bind()
let SiteHeader = require('../components/SiteHeader.js')
let Fullstrip = require('../components/Fullstrip.js')
let UrlShorterController = require('../components/UrlShorterController.js')
var total = React.createClass({
	render : function(){
		return(
			rce('div',{'className': 'url'},
				SiteHeader(),
				Fullstrip({title: 'ShortURL'}),

				rce('div', {'className': 'mainContainer'},
					rce(UrlShorterController, null)
				)

			)
		)
	}
})


ReactDOM.render(rce(total,null), document.getElementById('main'))
