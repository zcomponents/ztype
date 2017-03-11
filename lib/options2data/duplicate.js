#!/usr/bin/env node

'use strict';

const _likeProperty = require('../likeProperty');

module.exports = function (options, _default) {
	const check = function (O, k) {
		if (k) return O[k] === !!O[k] ? true : false;
		else return O === !!O ? O : _default;
	};
	const d = _likeProperty(options, {
		d: check,
		dubl: check,
		duplicate: check
	}, check);
	return function (pid, pids) {
		return d === true ? false : pids.indexOf(pid) >= 0;
	};
};
