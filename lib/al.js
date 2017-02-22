#!/usr/bin/env node

'use strict';

const ztas = require('./as');

const al = function(that, then) {
  if(ztas.asTypePretty(then).o) {
    const types = ztas.types;
    const asthat = ztas.asTypePretty(that);
    for(const t in then) {
      if('else' === t) continue;
      if(asthat[t] === true){
        return ztas.asTypePretty(then[t]).f ? then[t](that) : then[t];  
      }
      const re = /^cid_(.*)$/i;
      if(re.test(t) && re.exec(t)[1] === asthat.cid){
        return ztas.asTypePretty(then[t]).f ? then[t](that) : then[t];  
      }
    }
    if('else' in then) {
      const t = 'else';
      return ztas.asTypePretty(then[t]).f ? then[t](that) : then[t];
    }
/*
    const at = ztas.asTypePretty(that);
    const types = ztas.types;
    for(const tt in types) {
      const t = types[tt];
      if(!then[tt]) continue;
      if(!at[t]) continue;
      return ztas.asTypePretty(then[tt]).f ? then[tt](that) : then[tt];
    }
    if('else' in then) {
      return ztas.asTypePretty(then['else']).f ? then['else'](that) : then['else'];
    }
*/
  }
  throw 'type as unexpected';
};

module.exports = al;