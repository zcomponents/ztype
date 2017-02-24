#!/usr/bin/env node

'use strict';

const uf = require('util').format;
const ztas = require('./as');

const options2prefix = function (options, _default) {
	let p = _default;
	if (options === false) {
		p = options;
	}
	else if (!(options instanceof Object));
	else if (ztas(options.p).s) {
		p = options.p;
	}
	else if (ztas(options.prefix).s) {
		p = options.prefix;
	}
	return function (id) {
		return p !== false && p.length > 0 ? uf(p, id) : id;
	};
};

module.exports = options2prefix;
