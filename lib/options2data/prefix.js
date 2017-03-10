#!/usr/bin/env node

'use strict';

const uf = require('util').format;
const _likeProperty = require('../likeProperty');

module.exports = function (options, _default) {
	let p = _default;
	if (options === false) {
		p = options;
	}
	else if (options instanceof Object) {
		const check = function (p) {
			return p == String(p);
		};
		p = _likeProperty(options, {
			p: check,
			prefix: check
		}, p);
	}
	return function (id) {
		return p !== false && p.length > 0 ? uf(p, id) : id;
	};
};
