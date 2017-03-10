#!/usr/bin/env node

'use strict';

const _likeProperty = require('../likeProperty');

module.exports = function (options, _defualt) {
	let l = _defualt;
  if (options === false) {
		l = options;
	}
	else if (options instanceof Object) {
		const check = function (l) {
			return l == Number(l);
		};
		l = _likeProperty(options, {
			len: check,
			length: check
		}, l);
	}
	return function (list) {
		return l !== false && l > 0 ? list.length < l : true;
	};
};
