#!/usr/bin/env node

'use strict';

module.exports = function (that) {
  return String({}.toString.call(that));
};
