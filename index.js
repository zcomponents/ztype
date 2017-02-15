#!/usr/bin/env node

'use strict';

const like = require('./lib/like');
const pl = require('./lib/pl');
const is = require('./lib/is');
const as = require('./lib/as');
const al = require('./lib/al');
const of = require('./lib/of');
const ofs = require('./lib/ofs');

module.exports = function(that, options){
	return {
		like: function(o){
			return like(that, Object.assign({}, options, o));
		},
		pl: function(){
			return pl(that);
		},
		as: function(o){
			return as(that, Object.assign({}, options, o));
		},
		al: function(then){
			return al(that, then);
		},
		is: function(o){
			return is(that, Object.assign({}, options, o));
		},
		of: function(name, o){
			return of(that, name, Object.assign({}, options, o));
		},
		ofs: function(name, o){
			return ofs(that, name, Object.assign({}, options, o));
		}
	}
};

module.exports.like = like;
module.exports.pl = pl;
module.exports.is = is;
module.exports.as = as;
module.exports.al = al;
module.exports.of = of;
module.exports.ofs = ofs;
