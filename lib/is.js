'use strict';

var like = require('./like');
var uf = require('util').format;

/*
 * @options
 *   duplicate: boolean = true
 *   lowerClass: boolean = false
 *   prefix: string = undefined
 *   join: string = ' --> '
 *   depth: boolean = false
 * */
var is = function(that, options){
	let name = like(that), isO = name.match(/^object$/i), isF = name.match(/^function$/i);
	if(isO || isF){
		let classes = [];
		let pThat = isF ? that.prototype : that.__proto__, pDepth = 0;
		while(pThat){
			let className = pThat.constructor.name;
			pThat = pThat.__proto__;
			if(options && options.duplicate===false && classes.indexOf(className)>=0) continue; // no duplicate
			pDepth++;
			if(options && options.lowerClass) className = String(className).toLowerCase(); // classes in lowerCase
			if(options && options.prefix) className = uf('%s %s', options.prefix, className);
			classes.push(className);
		}
		if(options && options.depth){ // (isF && pDepth>2) || (isO && pDepth>1)
			name = uf('%s: %s', name, classes.join(options && options.join || '-->'));
		}
	}
	return name;
};
module.exports = is;
