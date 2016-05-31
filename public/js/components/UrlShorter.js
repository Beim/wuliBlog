let React = require('react')
const rce = React.createElement.bind()
let cutStr = (Str, length) => {
	if(Str.length <= length){
		return Str
	}
	else{
		return Str.slice(0, length) + '...'
	}
}
let UrlShorter = (props) => {
	let styleChoose = {'borderBottom': '2px solid #777', 'color': '#777'}
	let styleUnChoose = {'color': '#d1d1d1'}

	let chooseState = props.chooseState
	let chooseStateHandler = props.chooseStateHandler
	let longValue = props.longValue
	let shortValue = props.shortValue
	let longValueChangeHandler = props.longValueChangeHandler
	let shortValueChangeHandler = props.shortValueChangeHandler
	let postHandler = props.postHandler
	let hostUrl = props.hostUrl
	let urls = props.urls
	let urlList = urls.map(function(value, index){
		return(
			rce('div', {'key': 'url' + index, 'className': 'results-body'},
				rce('div', {'className': 'longUrl'}, 
					rce('a', {'href': value.longUrl}, cutStr(value.longUrl, 20))
				),
				rce('div', {'className': 'shortUrl'},
					rce('a', {'href': value.shortUrl}, cutStr(value.shortUrl, 20))
				),
				rce('div', {'className': 'clicks'}, value.clicks)
			)
		)
	})

	return (
		rce('div', {'className': 'UrlShorterContent'}, 
			rce('div', {'className': 'conditions'},
				rce('div', {'className': 'type'},
					rce('div', {'className': 'type-create', 'onClick': chooseStateHandler, 'style': chooseState === 'create' ? styleChoose : styleUnChoose}, 'create'),
					rce('div', {'className': 'type-search', 'onClick': chooseStateHandler, 'style': chooseState === 'search' ? styleChoose : styleUnChoose}, 'search')
				),
				rce('div', {'className': 'urls'},
					rce('div', {'style': chooseState === 'create' ? {'display': 'block'} : {'display': 'none'} }, 
						rce('b', null, 'Paste your long URL here:')
					),
					rce('div', {'className': 'inputLongURL', 'style': chooseState === 'create' ? {'display': 'block'} : {'display': 'none'}},
						rce('input', {'value': longValue, 'onChange': longValueChangeHandler})
					),
					rce('div', null, 
						rce('b', null, 'short URL:')
					),
					rce('div', {'className': 'inputShortURL'},
						rce('span', null, hostUrl),
						rce('input', {'value': shortValue, 'onChange': shortValueChangeHandler})
					),
					rce('div', {'className': 'urlPost', 'onClick': postHandler}, 'post')
				)
			),
			rce('div', {'className': 'results'},
				rce('div', {'className': 'results-head'},
					rce('div', {'className': 'longUrl'}, 'LONG URL'),
					rce('div', {'className': 'shortUrl'}, 'SHORT URL'),
					rce('div', {'className': 'clicks'}, 'CLICKS')
				),
				urlList
			)
		)
	)
}

module.exports = UrlShorter
