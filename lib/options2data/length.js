#!/usr/bin/env node

'use strict';

module.exports = function (options, _defualt) {
	let l = _defualt;
  if (options === false) {
		l = options;
	}
	else if (options instanceof Object) {
		l = options.len === Number(options.len) ? options.len : l;
		l = options.length === Number(options.length) ? options.length : l;
	}
	return function (list) {
		return l !== false && l > 0 ? list.length < l : true;
	};
};
