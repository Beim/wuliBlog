const EventEmitter = require('events').EventEmitter
const assign = require('object-assign')
let TotalStore = require('../stores/TotalStore.js')

let WestEggStore = assign({}, EventEmitter.prototype, {
	// SelectTag: TotalStore.getSelectTag(),
	titleValue: '',
	authorValue: '',
	stateTags: TotalStore.getSelectTag(),
	chooseTag: {},

	getTitleValue: function(){
		return this.titleValue
	},
	getAuthorValue: function(){
		return this.authorValue
	},
	getStateTags: function(){
		return this.stateTags
	},
	getChooseTag: function(){
		return this.chooseTag
	},

	init: function(){
		let stateTags = this.stateTags
		let stateTag = []
		let chooseTag = {}
		for(let i in stateTags){
			if(stateTags[i]){
				stateTag = stateTag.concat(stateTags[i])
			}
		}
		for(let i in stateTag){
			chooseTag[stateTag[i]] = 0
		}
		this.titleValue = ''
		this.authorValue = ''
		this.stateTags = stateTags
		this.chooseTag = chooseTag
		return{
			titleValue: '',
			authorValue: '',
			stateTags: stateTags,
			chooseTag: chooseTag
		}
	},

	emitChange: function () {
		this.emit('change')
	},

	addChangeListener: function (callback) {
		this.on('change', callback)
	},

	removeChangeListener: function (callback) {
		this.removeListener('change', callback)
	},

	handleTitleChange: function(e){
		this.titleValue = e.target.value
	},

	handleAuthorChange: function(e){
		this.authorValue = e.target.value
	},

	handleSelectTag: function(e){
		let tagName = e.target.innerHTML
		let chooseTag = this.chooseTag
		if(chooseTag[tagName] != undefined){
			chooseTag[tagName] = chooseTag[tagName] === 0 ? 1 : 0
		}
		this.chooseTag = chooseTag
	}

})

module.exports = WestEggStore
