#!/usr/bin/env node

'use strict';

const options2duplicate = function (options, _default) {
	let d = _default;
	if (options === !!options) {
		d = options;
	}
	else if (!(options instanceof Object));
	else if (options.d === !!options.d) {
		d = options.d;
	}
	else if (options.dupl === !!options.dupl) {
		d = options.dupl;
	}
	else if (options.duplicate === !!options.duplicate) {
		d = options.duplicate;
	}
	return function (pid, pids) {
		return d === true ? false : pids.indexOf(pid) >= 0;
	};
};

module.exports = options2duplicate;
