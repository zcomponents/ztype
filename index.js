#!/usr/bin/env node

'use strict';

const ztlike = require('./lib/like');
const ztprotoList = require('./lib/protoList');
const ztas = require('./lib/as');
const ztal = require('./lib/al');
const ztis = require('./lib/is');
const ztof = require('./lib/of');
const ztofs = require('./lib/ofs');

module.exports = function (that, options) {
	return {
		like: function (_options) {
			return ztlike(that, Object.assign({}, options, _options));
		},
		pl: function () {
			return ztprotoList(that);
		},
		protoList: function () {
			return ztprotoList(that);
		},
		as: function (_options) {
			return ztas(that, Object.assign({}, options, _options));
		},
		al: function (then) {
			return ztal(that, then);
		},
		is: function (_options) {
			return ztis(that, Object.assign({}, options, _options));
		},
		of: function (name, _options) {
			return ztof(that, name, Object.assign({}, options, _options));
		},
		ofs: function (name, _options) {
			return ztofs(that, name, Object.assign({}, options, _options));
		}
	}
};

module.exports.like = ztlike;

module.exports.pl = ztprotoList;

module.exports.protoList = ztprotoList;

module.exports.as = ztas;

module.exports.al = ztal;

module.exports.is = ztis;

module.exports.of = ztof;

module.exports.ofs = ztofs;
