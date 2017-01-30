#!/usr/bin/env node
'use strict';

const toString = function(that){
	return String({}.toString.call(that)).toLowerCase();
};

const like = function(that){
	let name = toString(that);
	let n = name.match(/^[\[]object[\s]+(.+)[\]]$/i);
	return n ? n[1] : name;
};

module.exports = like;
