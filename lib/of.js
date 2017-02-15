#!/usr/bin/env node

'use strict';

const like = require('./like');
const as = require('./as');
const al = require('./al');
const is = require('./is');

const of = function(that, name) {
  const N = as(name);
  if(N.a) {
    return name.some(function(n) {
      return of(that, n);
    });
  }
  else if(N.re) {
    return name.test(is(that));
  }
  else if(N.s) {
    return as(that).like === name;
  }
  else if(N.o) {
    return al(that, name);
  }
/*
	else if(N.nil){
		return as(that);
	}
	else if(N.u){
		const options = {
			join: '-->'
		};
		return is(that, options);
	}
*/
  else {
    return false;
  }
};

module.exports = of;