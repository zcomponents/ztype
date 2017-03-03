#!/usr/bin/env node

'use strict';

const uf = require('util').format;

module.exports = function (options, _default) {
	let p = _default;
	if (options === false) {
		p = options;
	}
	else if (options instanceof Object) {
		p = options.p === String(options.p) ? options.p : p;
		p = options.prefix === String(options.prefix) ? options.prefix : p;
	}
	return function (id) {
		return p !== false && p.length > 0 ? uf(p, id) : id;
	};
};
