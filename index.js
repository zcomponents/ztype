#!/usr/bin/env node
'use strict';

const like = require('./lib/like');
const pl = require('./lib/pl');
const is = require('./lib/is');
const as = require('./lib/as');
const al = require('./lib/al');
const of = require('./lib/of');
const ofs = require('./lib/ofs');

module.exports = function(that){
	return {
		al: function(then){
			return al(that, then);
		}
	}
}
module.exports.like = like;
module.exports.pl = pl;
module.exports.is = is;
module.exports.as = as;
module.exports.al = al;
module.exports.of = of;
module.exports.ofs = ofs;
