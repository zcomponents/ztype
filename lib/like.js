#!/usr/bin/env node

'use strict';

const toString = function(that) {
  return String({}.toString.call(that));
};

const options2lowerCase = function(options, _defualt) {
  let l = _defualt;
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
  // options.lower: default = false
  const l = options2lowerCase(options, false);
  const name = l(toString(that));
  const n = name.match(/^[\[]object[\s]+(.+)[\]]$/i);
  return n ? n[1] : name;
};

module.exports = like;

module.exports.like = like;

module.exports.toString = toString;

module.exports.options2lowerCase = options2lowerCase;