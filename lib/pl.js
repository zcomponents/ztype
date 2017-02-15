#!/usr/bin/env node

'use strict';

// to proto
const to = function(that, it) {
  if(it === 0 && that instanceof Function) {
    return that.__proto__; // that.prototype;
  }
  else if(that instanceof Object) {
    return that.__proto__;
  }
  else {
    return false;
  }
}

const pl = function(that) {
  let protos = [];
  for(let it = 0, proto = that; proto; it += 1) {
    proto = to(proto, it);
    if(proto!==false) protos.push(proto);
  }
  return protos;
};

module.exports = pl;
module.exports.to = to;