#!/usr/bin/env node

'use strict';

/*
 * @ name: { string | array | regexp | likeAsBack.then }
 * @options: {
 *   ...
 * }
 *
 * */

const _likeOf = require('./likeOf');

module.exports = function (thats, name, options) {
	return ![].concat(thats).some(function (that) {
		return !_likeOf(that, name, options);
	});
};
