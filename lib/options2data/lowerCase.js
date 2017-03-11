#!/usr/bin/env node

'use strict';

const _likeProperty = require('../likeProperty');

module.exports = function (options, _default) {
	const check = function (O, k) {
		if (k) return O[k] === !!O[k] ? true : false;
		else return O === !!O ? O : _default;
	};
	const l = _likeProperty(options, {
		l: check,
		lower: check,
		lowerCase: check
	}, check);
	return function (name) {
		return l ? String(name).toLowerCase() : name;
	};
};
