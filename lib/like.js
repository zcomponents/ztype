#!/usr/bin/env node
'use strict';

const toString = function(that){
	return String({}.toString.call(that));
};

// options.lower: default = true
const options2lowerCase = function(options){
	options = options || {};
	let l = true;
	switch('boolean'){
		case toString(options.l).toLowerCase(): l = options.l; break;
		case toString(options.lower).toLowerCase(): l = options.lower; break;
		//default: l = true;
	}
	return function(name){
		return l ? String(name).toLowerCase() : name;
	};
};

const like = function(that, options){
	let l = options2lowerCase(options);
	let name = l(toString(that));
	let n = name.match(/^[\[]object[\s]+(.+)[\]]$/i);
	return n ? n[1] : name;
};

module.exports = like;
