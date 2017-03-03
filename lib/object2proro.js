#!/usr/bin/env node

'use strict';

module.exports = function (that, it) {
	if (that instanceof Function && (it === 0 || arguments.length === 1)) {
		return that.__proto__; // that.prototype;
	}
	else if (that instanceof Object) {
		return that.__proto__;
	}
	else {
		return false;
	}
};
