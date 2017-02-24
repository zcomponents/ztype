#!/usr/bin/env node

'use strict';

const options2lowerCase = function (options, _defualt) {
	let l = _defualt;
	if (options === !!options) {
		l = options;
	}
	else if (!(options instanceof Object));
	else if (options.l === !!options.l) {
		l = options.l;
	}
	else if (options.lower === !!options.lower) {
		l = options.lower;
	}
	return function (name) {
		return l ? String(name).toLowerCase() : name;
	};
};

module.exports = options2lowerCase;
