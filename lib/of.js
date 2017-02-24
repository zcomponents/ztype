#!/usr/bin/env node

'use strict';

const ztas = require('./as');
const ztal = require('./al');
const ztis = require('./is');

const of = function (that, name, options) {
	const N = ztas(name);
	if (N.a) {
		return name.some(function (n) {
			return of(that, n, options);
		});
	}
	else if (N.re) {
		return name.test(ztis(that, options));
	}
	else if (N.s) {
		const T = ztas(that, options);
		return T.like === name || T.cids.indexOf(name) >= 0;
	}
	else if (N.o) {
		return ztal(that, name);
	}
	/*
		else if(N.nil){
			return ztas.asType(that, options);
		}
		else if(N.u){
			return ztis.is(that, options);
		}
	*/
	else {
		return false;
	}
};

module.exports = of ;

//module.exports.of = of ;
