let React = require('react')
const rce = React.createElement.bind()

let Fullstrip = (props) => {
	let title = props.title
	return (
		rce('div', {'className': 'fullstrip'},
			rce('div', {'className': 'fullstrip-container'},
				rce('div', {'className': 'fullstrip-title'}, title)
			)
		)
	)
}

module.exports = Fullstrip