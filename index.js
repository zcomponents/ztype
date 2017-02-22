#!/usr/bin/env node

'use strict';

const ztlike = require('./lib/like');
const ztprotoList = require('./lib/protoList');
const ztas = require('./lib/as');
const al = require('./lib/al');
const is = require('./lib/is');
const of = require('./lib/of');
const ofs = require('./lib/ofs');

module.exports = function(that, options) {
  return {
    like: function(o) {
      return ztlike.like(that, Object.assign({}, options, o));
    },
    pl: function() {
      return ztprotoList.protoList(that);
    },
    protoList: function() {
      return ztprotoList.protoList(that);
    },
    as: function(o) {
      return ztas.asTypePretty(that, Object.assign({}, options, o));
    },
    al: function(then) {
      return al(that, then);
    },
    is: function(o) {
      return is(that, Object.assign({}, options, o));
    },
    of: function(name, o) {
      return of(that, name, Object.assign({}, options, o));
    },
    ofs: function(name, o) {
      return ofs(that, name, Object.assign({}, options, o));
    }
  }
};

module.exports.like = ztlike.like;

module.exports.pl = ztprotoList.protoList;

module.exports.protoList = ztprotoList.protoList;

module.exports.as = ztas.asTypePretty;

module.exports.al = al;

module.exports.is = is;

module.exports.of = of;

module.exports.ofs = ofs;