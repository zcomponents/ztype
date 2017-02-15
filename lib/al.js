#!/usr/bin/env node

'use strict';

const as = require('./as');

const al = function(that, then) {
  if(as(then).o) {
    const at = as(that);
    const types = as.types;
    for(const tt in types) {
      const t = types[tt];
      if(!then[tt]) continue;
      if(!at[t]) continue;
      return as(then[tt]).f ? then[tt](that) : then[tt];
    }
    if('else' in then) {
      return as(then['else']).f ? then['else'](that) : then['else'];
    }
  }
  throw 'type as unexpected';
};

module.exports = al;