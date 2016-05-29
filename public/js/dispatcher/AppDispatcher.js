let Dispatcher = require('flux').Dispatcher
let AppDispatcher = new Dispatcher()
let NumStore = require('../stores/NumStore.js')

AppDispatcher.register(function (action) {
	switch(action.actionType) {
		case 'ADD_NUM':
			NumStore.addNumHandler()
			NumStore.emitChange()
			break
		default:
		  // no op
	}
})

module.exports = AppDispatcher
