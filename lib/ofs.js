#!/usr/bin/env node
'use strict';

const as = require('./as');
const of = require('./of');

const ofs = function(thats, name){
	const N = as(name);
	switch(true){
		case N.scalar:
			let tt = as(thats).a ? thats : [thats];
			return !tt.some(function(that){
				return !of(that, name);
			});
		default:
			return false;
	}
};

module.exports = ofs;
