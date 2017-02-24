#!/usr/bin/env node

'use strict';

const options2recursion = function (options, _default) {
	let r = _default;
	if (options === !!options) {
		r = options;
	}
	else if (!(options instanceof Object));
	else if (options.r === !!options.r) {
		r = options.r;
	}
	else if (options.recursion === !!options.recursion) {
		r = options.recursion;
	}
	else if (options.r > 0) {
		r = options.r;
	}
	else if (options.recursion > 0) {
		r = options.recursion;
	}
	return function (pids) {
		if (r === false) {
			return [];
		}
		else if (r === true || pids.length < r) {
			return pids;
		}
		else {
			return pids.slice(0, r);
		}
	};
};

module.exports = options2recursion;
