#!/usr/bin/env node

'use strict';

const as = require('./as');
const al = require('./al');
const is = require('./is');

const of = function(that, name, options) {
  const N = as(name);
  if(N.a) {
    return name.some(function(n) {
      return of(that, n, options);
    });
  }
  else if(N.re) {
    return name.test(is(that, options));
  }
  else if(N.s) {
    const T = as(that, options);
    return T.like === name || T.cids.indexOf(name) >= 0;
  }
  else if(N.o) {
    return al(that, name);
  }
/*
	else if(N.nil){
		return as(that, options);
	}
	else if(N.u){
		return is(that, options);
	}
*/
  else {
    return false;
  }
};

module.exports = of;