let Dispatcher = require('flux').Dispatcher
let AppDispatcher = new Dispatcher()
let TotalStore = require('../stores/TotalStore.js')
let SideStore = require('../stores/SideStore.js')
let WestEggStore = require('../stores/WestEggStore.js')
let ContentStore = require('../stores/ContentStore.js')


AppDispatcher.register(function (action) {
	switch(action.actionType) {
		case 'SELECT':
			TotalStore.handleSelect(action.e, action.select)
			TotalStore.emitChange()
			break
		case 'CHANGE_DISPLAY':
			TotalStore.handleChangeDisplay(action.e, action.nextDisplay)
			TotalStore.emitChange()
			break
		case 'BLOGLIST_DID_REFRESHED':
			TotalStore.blogListDidRefreshed()
			TotalStore.emitChange()
			break
		case 'MOUSE_OVER':
			TotalStore.handleMouseOver(action.e)
			TotalStore.emitChange()
			break
		case 'MOUSE_LEAVE':
			TotalStore.handleMouseLeave(action.e)
			TotalStore.emitChange()
			break
		case 'SHOW_SIDE':
			TotalStore.showSide()
			TotalStore.emitChange()
			break

		case 'CLICK_HEADER':
			SideStore.handleHeaderClick()
			break
		case 'CLICK_ALL_BLOG':
			SideStore.handleAllBlogClick()
			SideStore.emitChange()
			break
		case 'SELECT_MAIN_TAG':
			SideStore.handleSelectMainTag(action.e)
			SideStore.emitChange()
			break

		case 'CHANGE_TITLE':
			WestEggStore.handleTitleChange(action.e)
			WestEggStore.emitChange()
			break
		case 'CHANGE_AUTHOR':
			WestEggStore.handleAuthorChange(action.e)
			WestEggStore.emitChange()
			break
		case 'SELECT_TAG':
			WestEggStore.handleSelectTag(action.e)
			WestEggStore.emitChange()
			break	
		case 'INIT_WESTEGG':
			WestEggStore.init()
			WestEggStore.emitChange()
			break

		case 'GET_BLOG_LIST':
			ContentStore.getBlogList(action.data, action.showData, action.totalNum)
			ContentStore.emitChange()
			break
		case 'CHANGE_SELECT':
			ContentStore.changeSelect(action.showData, action.currentNum, action.totalNum)
			ContentStore.emitChange()
			break	
		case 'CHANGE_ZAN_STATE':
			ContentStore.changeZanState(action.hasZaned, action.blog)
			ContentStore.emitChange()
			break	
		case 'CHANGE_CURRENT_NUM':
			ContentStore.changeCurrentNum(action.currentNum)
			ContentStore.emitChange()
			break
		case 'SHOW_BLOG':
			ContentStore.showBlog(action.blog, action.comments)
			ContentStore.emitChange()
			break
		case 'CHANGE_NICKNAME':
			ContentStore.changeNickname(action.nickname)
			ContentStore.emitChange()
			break	
		case 'CHANGE_EMAIL':
			ContentStore.changeEmail(action.email)
			ContentStore.emitChange()
			break
		default:
		  // no op
	}
})

module.exports = AppDispatcher
