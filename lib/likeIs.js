#!/usr/bin/env node

'use strict';

/*
 * @options: {
 *   duplicate: boolean = true
 *   lower: boolean = false
 *   recursion: { boolean = true | number > 0 }
 *   prefix: { string | boolean = false }
 *   join: { string | boolean = false }
 * }
 *
 * */

const o2d = require('./options2data/duplicate');
const o2l = require('./options2data/lowerCase');
const o2r = require('./options2data/recursion');
const o2p = require('./options2data/prefix');
const o2j = require('./options2data/join');
const _likeAs = require('./likeAs');

module.exports = function (that, options) {
	const d = o2d(options, true);
	const l = o2l(options, false);
	const r = o2r(options, true);
	const p = o2p(options, false);
	const j = o2j(options, false);
	const T = _likeAs(that, false);
	const name = l(T.like);
	const parents = T.cids.filter(function (cid, index, cids) {
		return !d(cid, cids.slice(0, index)); // no duplicate
	}).filter(function (cid, index) {
		return r(index); // recursion
	}).map(function (cid, index, cids) {
		return p(l(cid)); // lowerCase && prefix
	});
	return j(name, parents); // join
};
