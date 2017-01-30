#!/usr/bin/env node
'use strict';

const like = require('./like');
const is = require('./is');
const as = require('./as');

const of = function(that, name){
	switch(like(name)){
		case 'array':
			return name.some(function(one){
				switch(like(one)){
					case 'array':
					case 'regexp':
					case 'string':
						return of(that, one);
					default:
						return false;
				}
			});
		case 'null':
			return as(that);
		case 'regexp':
			return name.test(of(that));
		case 'string':
			return like(that)===name;
		case 'undefined':
		default:
			const options = {
				d: false,
				l: true,
				r: true,
				p: false,
				j: '-->'
			};
			return is(that, options);
	}
};

module.exports = of;
