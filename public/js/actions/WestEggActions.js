let AppDispatcher = require('../dispatcher/AppDispatcher')

let WestEggActions = {
	addNum: function () {
		AppDispatcher.dispatch({
			actionType: 'ADD_NUM'
		})
	},
	handleTitleChange: function(e){
		AppDispatcher.dispatch({
			actionType: 'CHANGE_TITLE',
			e: e
		})
	},
	handleAuthorChange: function(e){
		AppDispatcher.dispatch({
			actionType: 'CHANGE_AUTHOR',
			e: e
		})
	},
	handleSelectTag: function(e){
		AppDispatcher.dispatch({
			actionType: 'SELECT_TAG',
			e: e
		})
	},
	init: function(){
		AppDispatcher.dispatch({
			actionType: 'INIT_WESTEGG'
		})
	}
}

module.exports = WestEggActions