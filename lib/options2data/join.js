#!/usr/bin/env node

'use strict';

const uf = require('util').format;
const _likeProperty = require('../likeProperty');

module.exports = function (options, _default) {
	const check = function (O, k) {
		if (k) return String(O[k]) == O[k] ? true : O[k] === true ? '-->' : false;
		else return O === true ? '-->' : O === false ? O : _default;
	};
	const j = _likeProperty(options, {
		j: check,
		join: check
	}, check);
	return function (id, pids) {
		return j !== false && j.length > 0 ? uf('%s: %s', id, pids.join(j)) : id;
	};
};
