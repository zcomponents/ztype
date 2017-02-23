#!/usr/bin/env node

'use strict';

const ztlike = require('./lib/like');
const ztprotoList = require('./lib/protoList');
const ztas = require('./lib/as');
const ztal = require('./lib/al');
const ztis = require('./lib/is');
const ztof = require('./lib/of');
const ztofs = require('./lib/ofs');

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
      return ztas.asType(that, Object.assign({}, options, o));
    },
    al: function(then) {
      return ztal.al(that, then);
    },
    is: function(o) {
      return ztis.is(that, Object.assign({}, options, o));
    },
    of: function(name, o) {
      return ztof.of(that, name, Object.assign({}, options, o));
    },
    ofs: function(name, o) {
      return ztofs.ofs(that, name, Object.assign({}, options, o));
    }
  }
};

module.exports.like = ztlike.like;

module.exports.pl = ztprotoList.protoList;

module.exports.protoList = ztprotoList.protoList;

module.exports.as = ztas.asType;

module.exports.al = ztal.al;

module.exports.is = ztis.is;

module.exports.of = ztof.of;

module.exports.ofs = ztofs.ofs;