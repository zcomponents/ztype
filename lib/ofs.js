#!/usr/bin/env node

'use strict';

const _of = require('./of');

module.exports = function (thats, name, options) {
	return ![].concat(thats).some(function (that) {
		return !_of(that, name, options);
	});
};
