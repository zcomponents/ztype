#!/usr/bin/env node

'use strict';

const toString = function(that) {
  return String({}.toString.call(that));
};

// options.lower: default = false
const options2lowerCase = function(options) {
  let l = false;
  if(options === !!options) {
    l = options;
  }
  else if(!(options instanceof Object));
  else if(options.l === !!options.l) {
    l = options.l;
  }
  else if(options.lower === !!options.lower) {
    l = options.lower;
  }
  return function(name) {
    return l ? String(name).toLowerCase() : name;
  };
};

const like = function(that, options) {
  const l = options2lowerCase(options);
  const name = l(toString(that));
  const n = name.match(/^[\[]object[\s]+(.+)[\]]$/i);
  return n ? n[1] : name;
};

module.exports = like;
module.exports.toString = toString;
module.exports.options2lowerCase = options2lowerCase;