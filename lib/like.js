#!/usr/bin/env node
'use strict';

const to = function(that){
	return String({}.toString.call(that)).toLowerCase();
};

const re = [
	/^[\[]object[\s]+([a-zA-Z]+)[\]]$/i
];

const like = function(that){
	let nameLong = to(that);
	let nameShort = nameLong.match(re[0]);
	return nameShort ? nameShort[1] : nameLong;
};

module.exports = like;
