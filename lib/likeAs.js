#!/usr/bin/env node

'use strict';

/*
 * LikeAs {
 *   a -> array
 *   b -> boolean
 *   db -> double
 *   decimal -> real
 *   dm -> real
 *   double -> real
 *   dt -> date
 *   f -> function
 *   fl -> float
 *   float -> real
 *   func -> function
 *   i -> integer
 *   int -> integer
 *   n -> number
 *   num -> number
 *   nil -> null
 *   o -> object
 *   pr -> promise
 *   re -> regexp
 *   s -> string
 *   sc -> scalar
 *   str -> string
 *   u -> undefined
 *   undef -> undefined
 *   cid -> class
 *   cids -> classes
 *   l -> like
 *   parent -> super
 *   pid -> super
 *
 *   callable: boolean  { function | promise }
 *   empty: boolean  { nil | u | a=[] | s='' | b=false | i|n|r=0 | o={} }
 *   iterable: boolean  { array | object }
 *   scalar: boolean  { b | i | n | r | s | d | re }
 *
 *   array: boolean
 *   boolean: boolean
 *   date: boolean
 *   function: boolean
 *   integer: boolean
 *   null: boolean
 *   number: boolean
 *   object: boolean
 *   promise: boolean
 *   real: boolean
 *   regexp: boolean
 *   string: boolean
 *   undefined: boolean
 *   class: string
 *   classes: []
 *   like: string
 *   super: string
 *
 *   constructor(that, options)
 *
 *   __options: {}
 *   __that
 *   __classes: []
 *
 *   has(className)
 * }
 *
 * @options: {
 *   lower: boolean = false
 * }
 *
 * */

const o2n = require('./object2data/name');
const o2l = require('./options2data/lowerCase');
const _inherit = require('./inherit');
const _like = require('./like');

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

class LikeAs {
	get a() {
		return this.array;
	}

	get b() {
		return this.boolean;
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

	get empty() {
		if (this.null || this.undefined) {
			return true;
		}
		else if (this.array || this.string) {
			return this.__that.length === 0;
		}
		else if (this.boolean) {
			return this.__that === false;
		}
		else if (this.integer || this.number || this.real) {
			return this.__that == 0;
		}
		else if (this.object) {
			return Object.keys(this.__that).length === 0;
		}
		else {
			return false;
		}
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

	get array() {
		if (this._array === undefined) {
			this._array = this.__classes.indexOf('Array') >= 0;
			Object.freeze(this._array);
		}
		return this._array;
	}

	get boolean() {
		if (this._boolean === undefined) {
			this._boolean = this.__classes.indexOf('Boolean') >= 0;
			Object.freeze(this._boolean);
		}
		return this._boolean;
	}

	get date() {
		if (this._date === undefined) {
			this._date = this.__classes.indexOf('Date') >= 0;
			Object.freeze(this._date);
		}
		return this._date;
	}

	get function() {
		if (this._function === undefined) {
			this._function = this.__classes.indexOf('Function') >= 0;
			Object.freeze(this._function);
		}
		return this._function;
	}

	get integer() {
		if (this._integer === undefined) {
			const re = /^[\-\+]?[\d]+$/;
			this._integer = re.test(String(this.__that));
			Object.freeze(this._integer);
		}
		return this._integer;
	}

	get null() {
		if (this._null === undefined) {
			this._null = this.__that === null;
			Object.freeze(this._null);
		}
		return this._null;
	}

	get number() {
		if (this._number === undefined) {
			this._number = this.__classes.indexOf('Number') >= 0;
			Object.freeze(this._number);
		}
		return this._number;
	}

	get object() {
		if (this._object === undefined) {
			this._object = this.__classes.indexOf('Object') >= 0;
			Object.freeze(this._object);
		}
		return this._object;
	}

	get promise() {
		if (this._promise === undefined) {
			this._promise = this.__classes.indexOf('Promise') >= 0;
			Object.freeze(this._promise);
		}
		return this._promise;
	}

	get real() {
		if (this._real === undefined) {
			const re = /^[\-\+]?[\d]+(?:[\.\,][\d]*)?$/;
			this._real = re.test(String(this.__that));
			Object.freeze(this._real);
		}
		return this._real;
	}

	get regexp() {
		if (this._regexp === undefined) {
			this._regexp = this.__classes.indexOf('RegExp') >= 0;
			Object.freeze(this._regexp);
		}
		return this._regexp;
	}

	get string() {
		if (this._string === undefined) {
			this._string = this.__classes.indexOf('String') >= 0;
			Object.freeze(this._string);
		}
		return this._string;
	}

	get undefined() {
		if (this._undefined === undefined) {
			this._undefined = this.__that === undefined;
			Object.freeze(this._undefined);
		}
		return this._undefined;
	}

	get class() {
		if (this._class === undefined) {
			this._class = this.classes.concat(['?'])[0];
			Object.freeze(this._class);
		}
		return this._class;
	}

	get classes() {
		if (this._classes === undefined) {
			const l = o2l(this.__options, false);
			this._classes = this.__classes.map(c => l(c));
			Object.freeze(this._classes);
		}
		return this._classes.slice();
	}

	get like() {
		if (this._like === undefined) {
			this._like = _like(this.__that, this.__options);
			Object.freeze(this._like);
		}
		return this._like;
	}

	get super() {
		if (this._super === undefined) {
			this._super = this.classes.concat(['?', '?'])[1];
			Object.freeze(this._super);
		}
		return this._super;
	}

	constructor(that, options) {
		const _List = _inherit(that).map(l => o2n(l));
		const _Like = _like(that, false);
		this.__options = options;
		this.__that = that;
		this.__classes = _List.length > 0 ? _List : [_Like];
	}

	has(className) {
		return has(this.classes, className);
	}
}

module.exports = function (that, options) {
	return new LikeAs(that, options);
};
