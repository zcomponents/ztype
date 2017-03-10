#!/usr/bin/env node

'use strict';

const _likeProperty = require('../likeProperty');

module.exports = function (options, _defualt) {
	let l = _defualt;
	if (options === !!options) {
		l = options;
	}
	else if (options instanceof Object) {
		const check = function (l) {
			return l === !!l;
		};
		l = _likeProperty(options, {
			l: check,
			lower: check
		}, l);
	}
	return function (name) {
		return l ? String(name).toLowerCase() : name;
	};
};
