#!/usr/bin/env node

'use strict';

const _likeProperty = require('../likeProperty');

module.exports = function (options, _default) {
	const check = function (O, k) {
		if (k) return O[k] == Number(O[k]) ? true : false;
		else return O === false ? O : _default;
	};
	const l = _likeProperty(options, {
		len: check,
		length: check
	}, check);
	return function (list) {
		return l !== false && l > 0 ? list.length < l : true;
	};
};
