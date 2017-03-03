#!/usr/bin/env node

'use strict';

module.exports = function (options, _default) {
	let d = _default;
	if (options === !!options) {
		d = options;
	}
	else if (options instanceof Object) {
		d = options.d === !!options.d ? options.d : d;
		d = options.dupl === !!options.dupl ? options.dupl : d;
		d = options.duplicate === !!options.duplicate ? options.duplicate : d;
	}
	return function (pid, pids) {
		return d === true ? false : pids.indexOf(pid) >= 0;
	};
};
