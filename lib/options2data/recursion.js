#!/usr/bin/env node

'use strict';

const _likeProperty = require('../likeProperty');

module.exports = function (options, _default) {
	const check = function (O, k) {
		if (k) return O[k] === !!O[k] || O[k] > 0 ? true : false;
		else return O === !!O ? O : _default;
	};
	const r = _likeProperty(options, {
		r: check,
		recursion: check
	}, check);
	return function (index) {
		return r === !!r ? r : r > index;
	};
};
