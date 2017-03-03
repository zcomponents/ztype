#!/usr/bin/env node

'use strict';

const options2lowerCase = require('./options2lowerCase');

const re = /^[\[]object[\s]+(.+)[\]]$/i;

const toString = function (that) {
	return String({}.toString.call(that));
};

const like = function (that, options) {
	// options.lower: default = false
	const l = options2lowerCase(options, false);
	const name = l(toString(that));
	return re.test(name) ? name.replace(re, '$1') : name;
};

module.exports = like;
//module.exports.like = like;
//module.exports.toString = toString;
