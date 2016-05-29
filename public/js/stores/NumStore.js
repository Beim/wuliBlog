const EventEmitter = require('events').EventEmitter
const assign = require('object-assign')

let NumStore = assign({}, EventEmitter.prototype, {
	num: 0,

	getNum: function () {
		return this.num
	},

	addNumHandler: function () {
		this.num++
	},

	emitChange: function () {
		this.emit('change')
	},

	addChangeListener: function (callback) {
		this.on('change', callback)
	},

	removeChangeListener: function (callback) {
		this.removeListener('change', callback)
	}
})

module.exports = NumStore