let AppDispatcher = require('../dispatcher/AppDispatcher')

let ButtonActions = {
	addNum: function () {
		AppDispatcher.dispatch({
			actionType: 'ADD_NUM'
		})
	}
}

module.exports = ButtonActions