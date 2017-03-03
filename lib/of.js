#!/usr/bin/env node

'use strict';

const _is = require('./is');
const _al = require('./al');
const _as = require('./as');

const _of = function (that, name, options) {
  if (name instanceof Array) {
    return name.some(function (n) {
      return _of(that, n, options);
    });
  }
  else if (name instanceof RegExp) {
    return name.test(_is(that, options));
  }
  else if (name === String(name)) {
    const T = _as(that, options);
    return T.like === name || T.has(name);
  }
  else if (name instanceof Object) {
    return _al(that, name);
  }
  /*
  	else if(name === null){
  		return _al(that, options);
  	}
  	else if(name === undefined){
  		return _is(that, options);
  	}
  */
  return false;
};

module.exports = _of ;
