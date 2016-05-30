let AppDispatcher = require('../dispatcher/AppDispatcher')

let SideActions = {
	handleHeaderClick: function(){
		AppDispatcher.dispatch({
			actionType: 'CLICK_HEADER'
		})
	},
	handleAllBlogClick: function(){
		AppDispatcher.dispatch({
			actionType: 'CLICK_ALL_BLOG'
		})
	},
	handleSelectMainTag: function(e){
		AppDispatcher.dispatch({
			actionType: 'SELECT_MAIN_TAG',
			e: e
		})
	}
}

module.exports = SideActions