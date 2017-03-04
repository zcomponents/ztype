#!/usr/bin/env node

'use strict';

/*
 * @ name: { array | regexp | string | likeAsBack.then }
 *
 * @options: {
 *   ...
 * }
 *
 * */

const _likeAs = require('./likeAs');
const _likeAsBack = require('./likeAsBack');
const _likeIs = require('./likeIs');

const _of = function (that, name, options) {
	if (name instanceof Array) {
		return name.some(function (n) {
			return _of(that, n, options);
		});
	}
	else if (name instanceof RegExp) {
		return name.test(_likeIs(that, options));
	}
	else if (name === String(name)) {
		const T = _likeAs(that, options);
		return T.like === name || T.has(name);
	}
	else if (name instanceof Object) {
		return _likeAsBack(that, name, options);
	}
	return false;
};

module.exports = _of;
