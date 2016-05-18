'use strict';

var rce = React.createElement.bind();
// var socket = io.connect('/')
var myName = '北冥有鱼吃';
React.initializeTouchEvents(true);

var total = React.createClass({
	displayName: 'total',
	display: 'total',
	handleClickMyImg: function handleClickMyImg() {
		window.open('https://github.com/Beim');
	},
	render: function render() {
		return rce('div', { 'className': 'about' }, rce('header', { 'className': 'site-header' }, rce('a', { 'className': 'site-title', 'href': 'https://github.com/Beim' }, myName), rce('nav', { 'className': 'site-nav' }, rce('a', { 'className': 'site-link', 'href': '../index.html' }, 'HOME'), rce('a', { 'className': 'site-link', 'href': '../about.html' }, 'ABOUT'), rce('a', { 'className': 'site-link', 'href': '../blog.html' }, 'BLOG'), rce('a', { 'className': 'site-link', 'href': '#' }, 'TieBa'), rce('a', { 'className': 'site-link', 'href': '#' }, 'CharRoom'), rce('a', { 'className': 'site-link', 'href': '#' }, 'MORE'))), rce('div', { 'className': 'fullstrip' }, rce('div', { 'className': 'fullstrip-container' }, rce('div', { 'className': 'fullstrip-title' }, 'About'))), rce('div', { 'className': 'mainContainer' }, rce('div', { 'className': 'mainContainer-content' }, rce('div', { 'className': 'mainContainer-left' },
		// rce('div', {}, 'left')
		rce('div', { 'className': 'bio-image' }, rce('img', { 'className': 'myImage', 'src': '../img/myImg.png', 'onClick': this.handleClickMyImg })), rce('div', { 'className': 'title' }, 'Things I\'m good at'), rce('div', { 'className': 'content-area' }, rce('div', { 'className': 'skill html' }, 'zero'), rce('div', { 'className': 'skill css' }, 'zero'), rce('div', { 'className': 'skill javascript' }, 'zero'), rce('div', { 'className': 'skill koa' }, 'zero'), rce('div', { 'className': 'skill nodejs' }, 'zero')), rce('div', { 'className': 'title' }, 'Things I love'), rce('div', { 'className': 'content-area' }, rce('div', { 'className': 'skill html' }, 'zero'), rce('div', { 'className': 'skill css' }, 'zero'), rce('div', { 'className': 'skill javascript' }, 'zero'), rce('div', { 'className': 'skill koa' }, 'zero'), rce('div', { 'className': 'skill nodejs' }, 'zero'))), rce('div', { 'className': 'mainContainer-right' }, rce('h2', null, 'Who are you?'), rce('p', null, 'who are you'), rce('h2', null, 'Where are you ?'), rce('p', null, 'where are you'), rce('h2', null, 'What are you up to at the moment?'), rce('p', null, 'what are you up to at the moment?')))));
	}
});

React.render(rce(total, null), document.body);