#!/usr/bin/env node

'use strict';

module.exports = function (options, _defualt) {
	let l = _defualt;
	if (options === !!options) {
		l = options;
	}
	else if (options instanceof Object) {
		l = options.l === !!options.l ? options.l : l;
		l = options.lower === !!options.lower ? options.lower : l;
	}
	return function (name) {
		return l ? String(name).toLowerCase() : name;
	};
};
