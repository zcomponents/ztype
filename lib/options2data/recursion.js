#!/usr/bin/env node

'use strict';

const _likeProperty = require('../likeProperty');

module.exports = function (options, _default) {
	let r = _default;
	if (options === !!options) {
		r = options;
	}
	else if (options instanceof Object) {
		const check = function (r) {
			return r === !!r || r > 0;
		};
		r = _likeProperty(options, {
			r: check,
			recursion: check
		}, r);
	}
	return function (index) {
		return r === !!r ? r : r > index;
	};
};
