'use strict';

const to = function(that){
	return String({}.toString.call(that)).toLowerCase();
};

const long2short = /^[\[]object[\s]+([a-zA-Z]+)[\]]$/i;

const like = function(that){
	let long = to(that);
	let short = long.match(long2short);
	return short ? short[1] : long;
};

module.exports = like;
