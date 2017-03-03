#!/usr/bin/env node

'use strict';

const _as = require('./as');

const o2d = require('./options2duplicate');
const o2l = require('./options2lowerCase');
const o2r = require('./options2recursion');
const o2p = require('./options2prefix');
const o2j = require('./options2join');

/*
 * @options
 *   duplicate: boolean = true
 *   lower: boolean = false
 *   recursion: { boolean = true | number > 0 }
 *   prefix: { string | boolean = false }
 *   join: { string | boolean = false }
 * */
const is = function (that, options) {
	const d = o2d(options, true);
	const l = o2l(options, false);
	const r = o2r(options, true);
	const p = o2p(options, false);
	const j = o2j(options, false);
	const T = _as(that);
	const name = l(T.like);
	const parents = T.cids.map(function (cid, index, cids) {
		return d(cid, cids.slice(0, index)) ? '' : cid; // no duplicate
	}).filter(function (cid) {
		return cid.length > 0;
	}).map(function (cid) {
		return p(l(cid)); // lowerCase && prefix
	});
	return j(name, r(parents)); // recursion & join
};

module.exports = is;

//module.exports.is = is;
