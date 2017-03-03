#!/usr/bin/env node

'use strict';

const o2l = require('./options2data/lowerCase');
const _like = require('./like');
const _pl = require('./protoList');

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

const has = function (classes, value) {
  if (value instanceof Array) {
    return value.some(function (v) {
      return has(classes, v);
    });
  }
  else if (classes instanceof Array) {
    return classes.indexOf(value) >= 0;
  }
  else {
    return false;
  }
};
/*
const r2d = function (type, property, key, freeze) {
	if (? === undefined) {
		if (key in request2data) {
			zrequest[zproperty] = request2data[key](zrequest);
		}
		else {
			zrequest[zproperty] = undefined;
		}
		if (freeze) {
			Object.freeze(zrequest[zproperty]);
		}
	}
	return zrequest[zproperty];
};
*/
class AsType {
  get array() {
    return this._array;
  }

  get boolean() {
    return this._boolean;
  }

  get date() {
    return this._date;
  }

  get function() {
    return this._function;
  }

  get integer() {
    return this._integer;
  }

  get null() {
    return this._null;
  }

  get number() {
    return this._number;
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

  get super() {
    return this._super;
  }

  constructor(that, options) {
    const l = o2l(options);
    const _classesList = _pl(that).map(function (p) {
      return l(p.constructor.name);
    });
    const _classLike = l(_like(that, false));
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
  }

  has(className) {
    return has(this._classes, className);
  }
}

class As extends AsType {
  get a() {
    return this.array;
  }

  get b() {
    return this.boolean;
  }

  get callable() {
    if (this.function) {
      return true;
    }
    else if (this.promise) {
      return true;
    }
    else {
      return false;
    }
  }

  get db() {
    return this.double;
  }

  get decimal() {
    return this.real;
  }

  get dm() {
    return this.real;
  }

  get double() {
    return this.real;
  }

  get dt() {
    return this.date;
  }

  get empty() {
    if (this.null || this.undefined) {
      return true;
    }
    else if (this.array || this.string) {
      return this._that.length === 0;
    }
    else if (this.boolean) {
      return this._that === false;
    }
    else if (this.integer || this.number || this.real) {
      return this._that == 0;
    }
    else if (this.object) {
      return Object.keys(this._that).length === 0;
    }
    else {
      return false;
    }
  }

  get f() {
    return this.function;
  }

  get fl() {
    return this.float;
  }

  get float() {
    return this.real;
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

  get iterable() {
    if (this.array) {
      return true;
    }
    else if (this.object) {
      return true;
    }
    else {
      return false;
    }
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

  get scalar() {
    if (this.boolean) {
      return true;
    }
    else if (this.integer || this.number || this.real) {
      return true;
    }
    else if (this.string) {
      return true;
    }
    else if (this.date || this.regexp) {
      return true;
    }
    else {
      return false;
    }
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
    return this.class;
  }

  get cids() {
    return this.classes;
  }

  get l() {
    return this.like;
  }

  get parent() {
    return this.super;
  }

  get pid() {
    return this.super;
  }

  constructor(that, options) {
    super(that, options);
    Object.freeze(this);
  }
}

const callAsType = function (that, options) {
  return new AsType(that, options);
};

const callAs = function (that, options) {
  return new As(that, options);
};

module.exports = callAs;
//module.exports.asType = callAsType;
//module.exports.as = callAs;
//module.exports.AsType = AsType;
//module.exports.As = As;
