#!/usr/bin/env node

'use strict';

const options2lowerCase = require('./options2lowerCase');

const toString = function (that) {
	return String({}.toString.call(that));
};

const like = function (that, options) {
	// options.lower: default = false
	const l = options2lowerCase(options, false);
	const name = l(toString(that));
	const n = name.match(/^[\[]object[\s]+(.+)[\]]$/i);
	return n ? n[1] : name;
};

module.exports = like;

//module.exports.like = like;

//module.exports.toString = toString;
