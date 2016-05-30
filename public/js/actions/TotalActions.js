let AppDispatcher = require('../dispatcher/AppDispatcher')

let TotalActions = {
	addNum: function () {
		AppDispatcher.dispatch({
			actionType: 'ADD_NUM'
		})
	},

	handleSelect: function(e, select){
		AppDispatcher.dispatch({
			actionType: 'SELECT',
			e: e,
			select: select
		})
	},

	handleChangeDisplay: function(e, nextDisplay = null){
		AppDispatcher.dispatch({
			actionType: 'CHANGE_DISPLAY',
			e: e,
			nextDisplay: nextDisplay
		})
	},

	blogListDidRefreshed: function(){
		new Promise(function(res, rej){
			// while(AppDispatcher.isDispatching()){}
			res()
		}).then(function(){
			AppDispatcher.dispatch({
				actionType: 'BLOGLIST_DID_REFRESHED'
			})
		})
		
	},

	handleMouseOver: function(e){
		AppDispatcher.dispatch({
			actionType: 'MOUSE_OVER',
			e: e
		})
	},

	handleMouseLeave: function(e){
		AppDispatcher.dispatch({
			actionType: 'MOUSE_LEAVE',
			e: e
		})
	},

	showSide: function(){
		AppDispatcher.dispatch({
			actionType: 'SHOW_SIDE'
		})
	}
}

module.exports = TotalActions