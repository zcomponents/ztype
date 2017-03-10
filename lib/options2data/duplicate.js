#!/usr/bin/env node

'use strict';

const _likeProperty = require('../likeProperty');

module.exports = function (options, _default) {
	let d = _default;
	if (options === !!options) {
		d = options;
	}
	else if (options instanceof Object) {
		const check = function (d) {
			return d === !!d;
		};
		d = _likeProperty(options, {
			d: check,
			dubl: check,
			duplicate: check
		}, d);
	}
	return function (pid, pids) {
		return d === true ? false : pids.indexOf(pid) >= 0;
	};
};
