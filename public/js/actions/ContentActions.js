let AppDispatcher = require('../dispatcher/AppDispatcher')

let ContentActions = {
	getBlogList: function(data, showData, totalNum){
		AppDispatcher.dispatch({
			actionType: 'GET_BLOG_LIST',
			data: data,
			showData: showData,
			totalNum: totalNum
		})
	},

	changeSelect: function(showData, currentNum, totalNum){
		new Promise(function(res, rej){
			// while(AppDispatcher.isDispatching()){}
			res()
		}).then(function(){
			AppDispatcher.dispatch({
				actionType: 'CHANGE_SELECT',
				showData: showData,
				currentNum: currentNum,
				totalNum: totalNum
			})
		})

	},

	changeZanState: function(hasZaned, blog = null){
		new Promise(function(res, rej){
			// while(AppDispatcher.isDispatching()){}
			res()
		}).then(function(){
			AppDispatcher.dispatch({
				actionType: 'CHANGE_ZAN_STATE',
				hasZaned: hasZaned,
				blog: blog
			})
		})

	},

	changeCurrentNum: function(currentNum){
		AppDispatcher.dispatch({
			actionType: 'CHANGE_CURRENT_NUM',
			currentNum: currentNum
		})
	},

	showBlog: function(blog, comments){
		AppDispatcher.dispatch({
			actionType: 'SHOW_BLOG',
			blog: blog,
			comments: comments
		})
	},

	changeNickname: function(nickname){
		AppDispatcher.dispatch({
			actionType: 'CHANGE_NICKNAME',
			nickname: nickname
		})
	},

	changeEmail: function(email){
		AppDispatcher.dispatch({
			actionType: 'CHANGE_EMAIL',
			email: email
		})
	}
}

module.exports = ContentActions