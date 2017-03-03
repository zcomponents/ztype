#!/usr/bin/env node

'use strict';

const uf = require('util').format;

module.exports = function (options, _default) {
	let j = _default;
	if (options === false) {
		j = options;
	}
	else if (options === true) {
		j = '-->';
	}
	else if (options instanceof Object) {
		j = options.j === true ? '-->' : j;
		j = options.join === true ? '-->' : j;
		j = options.j === String(options.j) ? options.j : j;
		j = options.join === String(options.join) ? options.join : j;
	}
	return function (id, pids) {
		return j !== false && j.length > 0 ? uf('%s: %s', id, pids.join(j)) : id;
	};
};
