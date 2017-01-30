#!/usr/bin/env node
'use strict';

//const like = require('./like');
//const is = require('./is');
const as = require('./as');

const THENS = {
	a: 'array', a: 'a',
	b: 'boolean', b: 'b',
	d: 'date', d: 'd',
	dl: 'double', dl: 'dl',
	fl: 'float', fl: 'fl',
	f: 'function', f: 'func', f: 'f',
	i: 'int', i: 'i',
	n: 'number', n: 'n',
	nil: 'null', nil: 'nil',
	o: 'object', o: 'o',
	pr: 'promise', pr: 'pr',
	re: 'regexp', re: 're',
	s: 'string', s: 's',
	u: 'undefined', u: 'u',
};

const al = function(that, then){
	if(as(then).o){
		let at = as(that);
		for(let t in THENS){
			let tt = THENS[t];
			if(!then[tt]) continue;
			if(!at[t]) continue;
			return as(then[tt]).f ? then[tt](that) : then[tt];
		}		
	}
	throw 'type as unexpected';
}

module.exports = al;
