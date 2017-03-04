#!/usr/bin/env node

'use strict';

/*
 * @options: {
 *   lower: boolean = false
 * }
 *
 * */

const o2s = require('./object2data/string');
const o2l = require('./options2data/lowerCase');

const re = /^[\[]object[\s]+(.+)[\]]$/i;

// options.lower: default = false
module.exports = function (that, options) {
  const l = o2l(options, false);
  const name = l(o2s(that));
  return re.test(name) ? name.replace(re, '$1') : name;
};
