#!/usr/bin/env node

'use strict';

const ztal = require('./al');
const ztof = require('./of');

const ofs = function (thats, name, options) {
	const T = ztal(thats, {
		a: thats,
		else: [thats]
	});
	return !T.some(function (that) {
		return !ztof(that, name, options);
	});
};

module.exports = ofs;

//module.exports.ofs = ofs;
