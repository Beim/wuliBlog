const EventEmitter = require('events').EventEmitter
const assign = require('object-assign')

let UrlShorterStore = assign({}, EventEmitter.prototype, {
	chooseState: 'create',
	longValue: '',
	shortValue: '',
	hostUrl: 'http://140.115.204.185:2333/url/',
	urls: [],

	getChooseState: function(){
		return this.chooseState
	},
	getLongValue: function(){
		return this.longValue
	},
	getShortValue: function(){
		return this.shortValue
	},
	getHostUrl: function(){
		return this.hostUrl
	},
	getUrls: function(){
		return this.urls
	},

	setChooseState: function(value){
		this.chooseState = value
	},
	setLongValue: function(value){
		this.longValue = value
	},
	setShortValue: function(value){
		this.shortValue = value
	},
	setUrls: function(value){
		this.urls = value
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

module.exports = UrlShorterStore