#!/usr/bin/env node

'use strict';

module.exports = function (that, it) {
  if (that instanceof Object) {
    let key = '__proto__';
    // key = it === 0 && that instanceof Function ? 'prototype' : key;
    return that[key];
  }
  return false;
};
