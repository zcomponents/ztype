#!/usr/bin/env node

'use strict';

module.exports = function (thats, name, options) {
	return ![].concat(thats).some(function (that) {
		return !require('./of')(that, name, options);
	});
};
