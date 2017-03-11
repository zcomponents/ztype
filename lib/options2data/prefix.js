#!/usr/bin/env node

'use strict';

const uf = require('util').format;
const _likeProperty = require('../likeProperty');

module.exports = function (options, _default) {
	const check = function (O, k) {
		if (k) return O[k] == String(O[k]) ? true : false;
		else return O === false ? O : _default;
	};
	const p = _likeProperty(options, {
		p: check,
		prefix: check
	}, check);
	return function (id) {
		return p !== false && p.length > 0 ? uf(p, id) : id;
	};
};
