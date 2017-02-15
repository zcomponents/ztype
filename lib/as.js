#!/usr/bin/env node

'use strict';

const like = require('./like');
const pl = require('./pl');

const re = [
  /^[\-\+]?[\d]+(?:[\.\,][\d]*)?$/,
  /^[\-\+]?[\d]+$/,
  /^null$/i,
  /^undefined$/i
];

const synonyms = {
  array: ['Array'],
  boolean: ['Boolean'],
  date: ['Date'],
  function: ['Function'],
  integer: ['Number', 'Object'],
  number: ['Number'],
  object: ['Object'],
  promise: ['Promise'],
  real: ['Number', 'Object'],
  regexp: ['RegExp'],
  string: ['String']
};

const TYPES = {
  array: 'a',
  a: 'a',
  boolean: 'b',
  b: 'b',
  date: 'dt',
  dt: 'dt',
  double: 'dl',
  dl: 'dl',
  float: 'fl',
  fl: 'fl',
  function: 'f',
  func: 'f',
  f: 'f',
  integer: 'i',
  int: 'i',
  i: 'i',
  null: 'nil',
  nil: 'nil',
  number: 'n',
  num: 'n',
  n: 'n',
  object: 'o',
  o: 'o',
  promise: 'pr',
  pr: 'pr',
  real: 'r',
  r: 'r',
  regexp: 're',
  re: 're',
  scalar: 'sc',
  sc: 'sc',
  string: 's',
  str: 's',
  s: 's',
  undefined: 'u',
  undef: 'u',
  u: 'u',
};

const has = function(classes, value) {
  if(value instanceof Array) {
    return value.some(function(v) {
      return has(classes, v);
    });
  }
  else if(classes instanceof Array) {
    return classes.indexOf(value) >= 0;
  }
  else {
    return false;
  }
};

class TypeAs {
  get types() {
    return TYPES;
  }

  constructor(that, options) {
    const l = like.options2lowerCase(options);
    const _classesList = pl(that).map(function(t) {
      return l(t.constructor.name);
    });
    const _classLike = l(like(that, false));
    const _classes = _classesList.length ? _classesList : [_classLike];

    this._array = has(_classes, synonyms.array);
    this._boolean = has(_classes, synonyms.boolean);
    this._date = has(_classes, synonyms.date);
    this._function = has(_classes, synonyms.function);
    this._integer = has(_classes, synonyms.integer) && re[1].test(String(that));
    this._null = re[2].test(String(that));
    this._number = has(_classes, synonyms.number) || re[1].test(String(that));
    this._object = has(_classes, synonyms.object);
    this._promise = has(_classes, synonyms.promise);
    this._real = has(_classes, synonyms.real) && re[0].test(String(that));
    this._regexp = has(_classes, synonyms.regexp);
    this._string = has(_classes, synonyms.string);
    this._undefined = re[3].test(String(that));

    this._class = _classes.concat(['?'])[0];
    this._classes = _classes.slice();
    this._like = _classLike;
    this._super = _classes.concat(['?', '?'])[1];
    this._that = that;
    Object.freeze(this);
  }

  has(className) {
    return this._classes.indexOf(className) >= 0;
  }
}

class Type extends TypeAs {
  get array() {
    return this._array;
  }

  get boolean() {
    return this._boolean;
  }

  get date() {
    return this._date;
  }

  get decimal() {
    return this._real;
  }

  get double() {
    return this._real;
  }

  get float() {
    return this._real;
  }

  get function() {
    return this._function;
  }

  get integer() {
    return this._integer;
  }

  get number() {
    return this._number;
  }

  get null() {
    return this._null;
  }

  get object() {
    return this._object;
  }

  get promise() {
    return this._promise;
  }

  get real() {
    return this._real;
  }

  get regexp() {
    return this._regexp;
  }

  get scalar() {
    if(this.array){
      return true;
    }
    else if(this.boolean){
      return true;
    }
    else if(this.date || this.promise){
      return true;
    }
    else if(this.function){
      return false;
    }
    else if(this.integer || this.number || this.real){
      return true;
    }
    else if(this.null || this.undefined){
      return true;
    }
    else if(this.object){
      return true;
    }
    else if(this.regexp || this.string){
      return true;
    }
    else{
      return false;
    }
  }

  get string() {
    return this._string;
  }

  get undefined() {
    return this._undefined;
  }

  get class() {
    return this._class;
  }

  get classes() {
    return this._classes.slice();
  }

  get like() {
    return this._like;
  }

  get parent() {
    return this._super;
  }

  get super() {
    return this._super;
  }

  constructor(that, options) {
    super(that, options);
    Object.freeze(this);
  }
}

class As extends Type {
  get a() {
    return this.array;
  }

  get b() {
    return this.boolean;
  }

  get db() {
    return this.double;
  }

  get dt() {
    return this.date;
  }

  get dm() {
    return this.real;
  }

  get fl() {
    return this.float;
  }

  get f() {
    return this.function;
  }

  get func() {
    return this.function;
  }

  get i() {
    return this.integer;
  }

  get int() {
    return this.integer;
  }

  get n() {
    return this.number;
  }

  get num() {
    return this.number;
  }

  get nil() {
    return this.null;
  }

  get o() {
    return this.object;
  }

  get pr() {
    return this.promise;
  }

  get re() {
    return this.regexp;
  }

  get s() {
    return this.string;
  }

  get sc() {
    return this.scalar;
  }

  get str() {
    return this.string;
  }

  get u() {
    return this.undefined;
  }

  get undef() {
    return this.undefined;
  }

  get cid() {
    return this._class;
  }

  get cids() {
    return this._classes.slice();
  }

  get l() {
    return this._like;
  }

  get pid() {
    return this._super;
  }

  constructor(that, options) {
    super(that, options);
    Object.freeze(this);
  }
}

const as = function(that, options) {
  return new As(that, options);
};

module.exports = as;
module.exports.types = TYPES;