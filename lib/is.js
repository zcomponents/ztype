#!/usr/bin/env node

'use strict';

const ztas = require('./as');

const options2duplicate = require('./options2duplicate');
const options2lowerCase = require('./options2lowerCase');
const options2recursion = require('./options2recursion');
const options2prefix = require('./options2prefix');
const options2join = require('./options2join');

/*
 * @options
 *   duplicate: boolean = true
 *   lower: boolean = false
 *   recursion: { boolean = true | number > 0 }
 *   prefix: { string | boolean = false }
 *   join: { string | boolean = false }
 * */
const is = function (that, options) {
	const d = options2duplicate(options, true);
	const l = options2lowerCase(options, false);
	const r = options2recursion(options, true);
	const p = options2prefix(options, false);
	const j = options2join(options, false);
	const T = ztas(that);
	const name = l(T.like);
	let parents = T.cids.map(function (cid, index, cids) {
		return d(cid, cids.slice(0, index)) ? '' : cid; // no duplicate
	}).filter(function (cid) {
		return cid.length > 0;
	}).map(function (cid) {
		return p(l(cid)); // lowerCase && prefix
	});
	parents = r(parents); // recursion
	const is = j(name, parents); // join
	return is;
};

module.exports = is;

//module.exports.is = is;
