#!/usr/bin/env node

'use strict';

const o2proto = require('./object2data/proto');
const o2len = require('./options2data/length');

module.exports = function (that, options) {
  let protoList = [];
  let len = o2len(options);
  for (let it = 0, proto = that; proto && len(protoList); it += 1) {
    proto = o2proto(proto, it);
    if (proto === false) break;
    protoList.push(proto);
  }
  return protoList;
};
