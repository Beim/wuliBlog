let React = require('react')
const rce = React.createElement.bind()

let MyButton = (props) => {
	let num = props.num
	return (
		rce('div', null,
			rce('div', null, num),
			rce('button', {'onClick': props.onClick}, 'addNum')
		)
	)
}

module.exports = MyButton
