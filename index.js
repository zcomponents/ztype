#!/usr/bin/env node

'use strict';

const _inherit = require('./lib/inherit');
const _like = require('./lib/like');
const _likeAs = require('./lib/likeAs');
const _likeAsBack = require('./lib/likeAsBack');
const _likeIs = require('./lib/likeIs');
const _likeOf = require('./lib/likeOf');
const _likeOfs = require('./lib/likeOfs');
const _self = require('./lib/self');

module.exports = function (that, options) {
	return {
		inherit: function () {
			return _inherit(that);
		},
		like: function (_options) {
			return _like(that, Object.assign({}, options, _options));
		},
		likeAs: function (_options) {
			return _likeAs(that, Object.assign({}, options, _options));
		},
		likeAsBack: function (then) {
			return _likeAsBack(that, then);
		},
		likeIs: function (_options) {
			return _likeIs(that, Object.assign({}, options, _options));
		},
		likeOf: function (name, _options) {
			return _likeOf(that, name, Object.assign({}, options, _options));
		},
		likeOfs: function (name, _options) {
			return _likeOfs(that, name, Object.assign({}, options, _options));
		},
		self: function () {
			return _self(that);
		},
		in: function () {
			return _inherit(that);
		},
		as: function (_options) {
			return _likeAs(that, Object.assign({}, options, _options));
		},
		ab: function (then) {
			return _likeAsBack(that, then);
		},
		is: function (_options) {
			return _likeIs(that, Object.assign({}, options, _options));
		},
		of: function (name, _options) {
			return _likeOf(that, name, Object.assign({}, options, _options));
		}
	}
};

module.exports.inherit = _inherit;
module.exports.like = _like;
module.exports.likeAs = _likeAs;
module.exports.likeAsBack = _likeAsBack;
module.exports.likeIs = _likeIs;
module.exports.likeOf = _likeOf;
module.exports.likeOfs = _likeOfs;
module.exports.self = _self;
module.exports.in = _inherit;
module.exports.as = _likeAs;
module.exports.ab = _likeAsBack;
module.exports.is = _likeIs;
module.exports.of = _likeOf;
