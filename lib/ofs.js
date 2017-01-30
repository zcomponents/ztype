#!/usr/bin/env node
'use strict';

const as = require('./as');
const of = require('./of');

const ofs = function(thats, name){
	let n = as(name);
	switch(true){
		case n.a:
		case n.b:
		case n.d:
		case n.db:
		case n.fl:
		case n.f:
		case n.i:
		case n.n:
		case n.nil:
		case n.o:
		case n.pr:
		case n.re:
		case n.s:
		case n.u:
			let tt = as(thats).a ? thats : [thats];
			return !tt.some(function(that){
				return !of(that, name);
			});
		default:
			return false;
	}
};

module.exports = ofs;
