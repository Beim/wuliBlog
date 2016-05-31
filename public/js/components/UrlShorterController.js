let React = require('react')
const rce = React.createElement.bind()
let UrlShorter = require('./UrlShorter.js')

let UrlShorterStore = require('../stores/UrlShorterStore.js')

let UrlShorterController = React.createClass({display: 'UrlShorterController',
	getInitialState: function() {
		return{
			chooseState: UrlShorterStore.getChooseState(),
			longValue: UrlShorterStore.getLongValue(),
			shortValue: UrlShorterStore.getShortValue(),
			hostUrl: UrlShorterStore.getHostUrl(),
			urls: UrlShorterStore.getUrls()
		}
	},
	componentDidMount: function() {
		UrlShorterStore.addChangeListener(this._onChange)
	},
	componentWillUnmount: function() {
		UrlShorterStore.removeChangeListener(this._onChange)
	},
	_onChange: function() {
		this.setState({
			chooseState: UrlShorterStore.getChooseState(),
			longValue: UrlShorterStore.getLongValue(),
			shortValue: UrlShorterStore.getShortValue(),
			urls: UrlShorterStore.getUrls()
		})
	},
	chooseStateHandler: function(e){
		UrlShorterStore.setChooseState(e.target.innerHTML)
		UrlShorterStore.setLongValue('')
		UrlShorterStore.setShortValue('')
		UrlShorterStore.setUrls([])
		UrlShorterStore.emitChange()
	},
	longValueChangeHandler: function(e){
		UrlShorterStore.setLongValue(e.target.value)
		UrlShorterStore.emitChange()
	},
	shortValueChangeHandler: function(e){
		UrlShorterStore.setShortValue(e.target.value)
		UrlShorterStore.emitChange()
	},
	postHandler: function(){
		if(this.state.chooseState == 'create'){
			let predata = {
				longUrl: this.state.longValue,
				shortUrl: this.state.hostUrl + this.state.shortValue
			}
			let data = JSON.stringify(predata)
			let xhr = new XMLHttpRequest()
			xhr.open('POST', '/postMethod/url', true)
			xhr.setRequestHeader('Content-Type', 'application/x-javascript; charset=UTF-8')
			xhr.responseType = 'json'
			xhr.onload = function(e){
				if(this.response.ok == 1){
					let urls = [{
						longUrl: predata.longUrl,
						shortUrl: predata.shortUrl,
						clicks: 0
					}]
					UrlShorterStore.setUrls(urls)
					UrlShorterStore.emitChange()
					alert('create success!\n you can access the site by shortURL now')
				}
			}
			xhr.send(data)
		}
		else if(this.state.chooseState == 'search'){
			let predata = {
				shortUrl: this.state.hostUrl + this.state.shortValue
			}
			let data = JSON.stringify(predata)
			let xhr = new XMLHttpRequest()
			xhr.open('POST', '/postMethod/urls', true)
			xhr.setRequestHeader('Content-Type', 'application/x-javascript; charset=UTF-8')
			xhr.responseType = 'json'
			xhr.onload = function(e){
				if(this.response.urls !== 0 && this.response.urls.length > 0){
					let urls = this.response.urls.map(function(value, index){
						return {
							longUrl: value.longUrl,
							shortUrl: value.shortUrl,
							clicks: value.clicks
						}
					})
					UrlShorterStore.setUrls(urls)
					UrlShorterStore.emitChange()
				}
				else{
					UrlShorterStore.setUrls([])
					UrlShorterStore.emitChange()
					alert('The short URL does not exist~')
				}
			}
			xhr.send(data)
		}
	},
	render: function() {
		return UrlShorter({
			chooseState: this.state.chooseState,
			chooseStateHandler: this.chooseStateHandler,
			longValue: this.state.longValue,
			shortValue: this.state.shortValue,
			longValueChangeHandler: this.longValueChangeHandler,
			shortValueChangeHandler: this.shortValueChangeHandler,
			postHandler: this.postHandler,
			hostUrl: this.state.hostUrl,
			urls: this.state.urls
		})
	}
})

module.exports = UrlShorterController
