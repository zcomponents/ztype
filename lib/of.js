#!/usr/bin/env node
'use strict';

const like = require('./like');
const is = require('./is');
const as = require('./as');
const al = require('./al');

const of = function(that, name){
	let n = as(name);
	switch(true){
		case n.a:
			return name.some(function(one){
				let o = as(one);
				switch(true){
					case o.a:
					case o.re:
					case o.s:
						return of(that, one);
					default:
						return false;
				}
			});
		case n.nil:
			return as(that);
		case n.o:
			return function(then){
				return al(that, then);
			}
		case n.re:
			return name.test(of(that));
		case n.s:
			return like(that)===name;
		case n.u:
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
