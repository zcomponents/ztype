#!/usr/bin/env node
'use strict';

const like = require('./like');
const of = require('./of');

const ofs = function(thats, name){
	switch(like(name)){
		case 'array':
		case 'regexp':
		case 'string':
			const f = function(that){
				return !of(that, name);
			};
			return !(of(thats, 'array') ? thats : [thats]).some(f);
		default:
			return false;
	}
};

module.exports = ofs;
