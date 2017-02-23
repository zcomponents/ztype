#!/usr/bin/env node

'use strict';

const ztlike = require('./like');
const ztas = require('./as');
const uf = require('util').format;

const options2duplicate = function(options, _default) {
  let d = _default;
  if(options === !!options) {
    d = options;
  }
  else if(!(options instanceof Object));
  else if(options.d === !!options.d) {
    d = options.d;
  }
  else if(options.dupl === !!options.dupl) {
    d = options.dupl;
  }
  else if(options.duplicate === !!options.duplicate) {
    d = options.duplicate;
  }
  return function(pid, pids) {
    return d === true ? false : pids.indexOf(pid) >= 0;
  };
};

const options2recursion = function(options, _default) {
  let r = _default;
  if(options === !!options) {
    r = options;
  }
  else if(!(options instanceof Object));
  else if(options.r === !!options.r) {
    r = options.r;
  }
  else if(options.recursion === !!options.recursion) {
    r = options.recursion;
  }
  else if(options.r > 0) {
    r = options.r;
  }
  else if(options.recursion > 0) {
    r = options.recursion;
  }
  return function(pids) {
    if(r === false) {
      return [];
    }
    else if(r === true || pids.length < r) {
      return pids;
    }
    else {
      return pids.slice(0, r);
    }
  };
};

const options2prefix = function(options, _default) {
  let p = _default;
  if(options === false) {
    p = options;
  }
  else if(!(options instanceof Object));
  else if(ztas.asType(options.p).s) {
    p = options.p;
  }
  else if(ztas.asType(options.prefix).s) {
    p = options.prefix;
  }
  return function(id) {
    return p !== false && p.length > 0 ? uf(p, id) : id;
  };
};

const options2join = function(options, _default) {
  let j = _default;
  if(options === false) {
    j = options;
  }
  else if(options === true) {
    j = '-->';
  }
  else if(!(options instanceof Object));
  else if(options.j === true || options.join === true) {
    j = '-->';
  }
  else if(ztas.asType(options.j).s) {
    j = options.j;
  }
  else if(ztas.asType(options.join).s) {
    j = options.join;
  }
  return function(id, pids) {
    return j !== false && j.length > 0 ? uf('%s: %s', id, pids.join(j)) : id;
  };
};

/*
 * @options
 *   duplicate: boolean = true
 *   lower: boolean = false
 *   recursion: { boolean = true | number > 0 }
 *   prefix: { string | boolean = false }
 *   join: { string | boolean = false }
 * */
const is = function(that, options) {
  const d = options2duplicate(options, true);
  const l = ztlike.options2lowerCase(options, false);
  const r = options2recursion(options, true);
  const p = options2prefix(options, false);
  const j = options2join(options, false);
  const T = ztas.asType(that);
  const name = l(T.like);
  let parents = T.cids.map(function(cid, index, cids) {
    return d(cid, cids.slice(0, index)) ? '' : cid; // no duplicate
  }).filter(function(cid) {
    return cid.length > 0;
  }).map(function(cid) {
    return p(l(cid)); // lowerCase && prefix
  });
  parents = r(parents); // recursion
  const is = j(name, parents); // join
  return is;
};

module.exports = is;

module.exports.is = is;