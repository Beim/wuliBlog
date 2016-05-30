const EventEmitter = require('events').EventEmitter
const assign = require('object-assign')

let SideStore = assign({}, EventEmitter.prototype, {
	shouldSubtagShow: '',

	getShouldSubtagShow: function(){
		return this.shouldSubtagShow
	} ,

	emitChange: function () {
		this.emit('change')
	},

	addChangeListener: function (callback) {
		this.on('change', callback)
	},

	removeChangeListener: function (callback) {
		this.removeListener('change', callback)
	},

	handleHeaderClick: function(){
		document.getElementById('site-title').click()
	},

	handleAllBlogClick: function(){
		this.shouldSubtagShow = 'blog'
	},

	handleSelectMainTag: function(e){
		this.shouldSubtagShow = e.target.innerHTML
		// this.props.handleSelect(e)
		// this.setState({'shouldSubtagShow': e.target.innerHTML})
	}
})

module.exports = SideStore