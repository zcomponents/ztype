#!/usr/bin/env node

'use strict';

const uf = require('util').format;
const ztas = require('./as');

const options2join = function (options, _default) {
	let j = _default;
	if (options === false) {
		j = options;
	}
	else if (options === true) {
		j = '-->';
	}
	else if (!(options instanceof Object));
	else if (options.j === true || options.join === true) {
		j = '-->';
	}
	else if (ztas(options.j).s) {
		j = options.j;
	}
	else if (ztas(options.join).s) {
		j = options.join;
	}
	return function (id, pids) {
		return j !== false && j.length > 0 ? uf('%s: %s', id, pids.join(j)) : id;
	};
};

module.exports = options2join;
